/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const gulp = require('gulp');
const {sh} = require('@lib/utils/sh');
const grow = require('@lib/utils/grow');
const mkdirp = require('mkdirp').sync;
const config = require('@lib/config');
const signale = require('signale');
const del = require('del');
const fs = require('fs');
const os = require('os');
const path = require('path');
const globby = require('globby');
const through = require('through2');
const archiver = require('archiver');
const yaml = require('js-yaml');
const {samplesBuilder} = require('@lib/build/samplesBuilder');
const {project, travis} = require('@lib/utils');
const git = require('@lib/utils/git');
const ComponentReferenceImporter = require('@lib/pipeline/componentReferenceImporter');
const SpecImporter = require('@lib/pipeline/specImporter');
const BlogImporter = require('@lib/pipeline/blogImporter');
// TODO: Fails on Travis with HttpError: Requires authentication
// const roadmapImporter = require('@lib/pipeline/roadmapImporter');
const {pageTransformer} = require('@lib/build/pageTransformer');
const gulpSass = require('gulp-sass');
const test = require('./test.js');

// The Google Cloud Storage bucket used to store build job artifacts
const TRAVIS_GCS_PATH = 'gs://amp-dev-ci/travis/';

// Path of the grow test pages for filtering in the grow podspec.yaml
const TEST_CONTENT_PATH_REGEX = '^/tests/';

/**
 * Cleans all directories/files that get created by any of the following
 * tasks
 *
 * @return {Promise}
 */
function clean() {
  return del([
    project.absolute('.cache/**/*'),

    project.paths.DIST,
    project.paths.BUILD,

    project.absolute('boilerplate/dist'),

    project.paths.CSS,
    project.absolute('pages/extensions/**/*.pyc'),
    project.absolute('pages/content/amp-dev/documentation/examples/documentation/**/*.html'),
    project.absolute('pages/content/amp-dev/documentation/examples/previews/**/*.html'),
    project.absolute('pages/icons'),
    project.absolute('pages/layouts'),
    project.absolute('pages/macros'),
    project.absolute('pages/views'),
    project.absolute('pages/.depcache.json'),
    project.absolute('pages/podspec.yaml'),

    project.absolute('examples/static/samples/samples.json'),

    project.paths.GROW_BUILD_DEST,
    project.paths.STATICS_DEST,
    project.absolute('platform/static'),

    project.absolute('playground/dist'),
  ], {'force': true});
}


/**
 * Compiles all SCSS partials to CSS
 *
 * @return {Stream}
 */
function sass() {
  const options = {
    'outputStyle': 'compressed',
    'includePaths': project.paths.SCSS,
  };

  return gulp.src(`${project.paths.SCSS}/**/[^_]*.scss`)
      .pipe(gulpSass(options))
      .on('error', function(e) {
        console.error(e);
        // eslint-disable-next-line no-invalid-this
        this.emit('end');
      })
      .pipe(gulp.dest(project.paths.CSS));
}

/**
 * Copies the templates into the Grow pod
 *
 * @return {Stream}
 */
function templates() {
  return gulp.src(`${project.paths.FRONTEND_TEMPLATES}/**/*`)
      .pipe(gulp.dest(project.paths.GROW_POD));
}

/**
 * Copies the icons into the Grow pod
 *
 * @return {Stream}
 */
function icons() {
  return gulp.src(`${project.paths.ICONS}/**/*`)
      .pipe(gulp.dest(`${project.paths.GROW_POD}/icons`));
}

/**
 * Runs all tasks needed to build the frontend
 * @return {undefined}
 */
function buildFrontend(done) {
  return (gulp.parallel(sass, templates, icons))(done);
}

/**
 * Builds the playground
 * @return {Promise}
 */
async function buildPlayground() {
  await sh('mkdir -p playground/dist');
  return sh('npm run build:playground');
}

/**
 * Builds the boilerplate generator
 * @return {Promise}
 */
function buildBoilerplate() {
  return sh('node build.js', {
    workingDir: project.absolute('boilerplate'),
  });
}


/**
 * Builds documentation pages, preview pages and source files by parsing
 * the samples sources
 *
 * @return {Promise}
 */
function buildSamples() {
  return samplesBuilder.build(true);
}

/**
 * Zips templates for download.
 */
function zipTemplates() {
  const templateDir = path.join(project.paths.DIST, 'static/files/templates/');
  mkdirp(templateDir);
  return gulp.src(project.paths.TEMPLATES + '/*/*/')
      .pipe(through.obj(async (file, encoding, callback) => {
        const archive = archiver('zip', {
          'zlib': {'level': 9},
        });
        const zipFilePath = path.join(templateDir, file.basename + '.zip');
        const zipFileStream = fs.createWriteStream(zipFilePath);
        archive.directory(file.path + '/', false)
            .pipe(zipFileStream)
            .on('close', () => {
              signale.success(`Zipped template ${zipFilePath}`);
              callback();
            })
            .on('error', (e) => {
              signale.error(`Writing template zip ${zipFilePath} failed`, e);
              callback(e);
            });
        archive.finalize();
      }));
}


/**
 * Runs all importers
 *
 * @return {Promise}
 */
function importAll() {
  return Promise.all([
    (new ComponentReferenceImporter()).import(),
    (new SpecImporter()).import(),
    (new BlogImporter()).import(),
    // TODO: Fails on Travis with HttpError: Requires authentication
    // roadmapImporter.importRoadmap(),
  ]);
}


/**
 * Builds playground and boilerplate generator, imports all remote documents,
 * builds samples, lints Grow pod and JavaScript.
 *
 * @return {undefined}
 */
function buildPrepare(done) {
  gulp.series(
      test.lintNode,
      // Build playground and boilerplate that early in the flow as they are
      // fairly quick to build and would be annoying to eventually fail downstream
      gulp.parallel(buildPlayground, buildBoilerplate, buildSamples, importAll, zipTemplates),
      // TODO: Fix working but malformatted references before reenabling
      // test.lintGrow,
      // eslint-disable-next-line prefer-arrow-callback
      async function storeArtifcats() {
        if (!travis.onTravis()) {
          return;
        }

        // If on Travis store everything built so far for later stages to pick up
        // Local path to the archive containing artifacts of the first stage
        const SETUP_ARCHIVE = 'build/setup.tar.gz';
        // All paths that contain altered files at build setup time
        const SETUP_STORED_PATHS = [
          './pages/content/',
          './dist/',
          './boilerplate/dist/',
          './playground/dist/',
          './.cache/',
          './examples/static/samples/samples.json',
        ];

        await sh('mkdir -p build');
        await sh(`tar cfj ${SETUP_ARCHIVE} ${SETUP_STORED_PATHS.join(' ')}`);
        await sh(`gsutil cp ${SETUP_ARCHIVE} ` +
        `${TRAVIS_GCS_PATH}${travis.build.number}/setup.tar.gz`);
      })(done);
}

/**
 * Fetches remote artifacts that have been built in earlier stages
 *
 * @return {Promise}
 */
async function fetchArtifacts() {
  await sh('mkdir -p build');
  if (travis.onTravis() || config.options['travis-build']) {
    const buildNumber = config.options['travis-build'] || travis.build.number;
    try {
      await sh(`gsutil cp -r ${TRAVIS_GCS_PATH}${buildNumber} ${project.paths.BUILD}`);
      await sh('find build -type f -exec tar xf {} \;');
    } catch (e) {
      // If fetching the pages fails, force exit here to make sure
      // especially Travis gets the correct exit code
      process.exit(1);
    }
  }
}

/**
 * Starts Grow to build the pages
 *
 * @return {Promise}
 */
async function buildPages(done) {
  gulp.series(fetchArtifacts, buildFrontend,
      // eslint-disable-next-line prefer-arrow-callback
      async function buildGrow() {
        const options = {};
        if (config.isTestMode()) {
          options.include_paths = TEST_CONTENT_PATH_REGEX;
          options.locales = 'en';
        } else if (config.isProdMode()) {
          options.ignore_paths = TEST_CONTENT_PATH_REGEX;
        }
        config.configureGrow(options);

        try {
          await grow('deploy --noconfirm --threaded');
        } catch (e) {
        // If building the pages fails, force exit here to make sure
        // especially Travis gets the correct exit code
          process.exit(1);
        }
      }, transformPages,
      // eslint-disable-next-line prefer-arrow-callback
      function sharedPages() {
      // Copy shared pages separated from PageTransformer as they should
      // not be transformed
        return gulp.src(`${project.paths.GROW_BUILD_DEST}/shared/*.html`)
            .pipe(gulp.dest(`${project.paths.PAGES_DEST}/shared`));
      },
      // eslint-disable-next-line prefer-arrow-callback
      function sitemap() {
      // Copy XML files written by Grow
        return gulp.src(`${project.paths.GROW_BUILD_DEST}/**/*.xml`)
            .pipe(gulp.dest(`${project.paths.PAGES_DEST}`));
      },
      // eslint-disable-next-line prefer-arrow-callback
      async function storeArtifacts() {
      // ... and again if on Travis store all built files for a later stage to pick up
        if (travis.onTravis()) {
          const archive = `build/pages-${travis.build.job}.tar.gz`;
          await sh(`tar cfj ${archive} ./dist/pages ./dist/inline-examples`);
          await sh(`gsutil cp ${archive} ` +
          `${TRAVIS_GCS_PATH}${travis.build.number}/pages-${travis.build.job}.tar.gz`);
        }
      })(done);
}

/**
 * Transforms already built pages and does so while spawning multiple child
 * processes to speed up processing
 *
 * @return {Promise}
 */
async function transformPages() {
  let paths = await globby([
    `${project.paths.GROW_BUILD_DEST}/**/*.html`,
    `!${project.paths.GROW_BUILD_DEST}/{*/shared,shared}/*.html`,
  ]);
  let shardCount = os.cpus().length;
  if (paths.length < shardCount) {
    shardCount = paths.length;
  }
  const shardPathCount = Math.trunc(paths.length / shardCount);

  // If there is no shard option it means this is the initial call to the task
  // that spawns the subprocesses
  if (config.options.shard === undefined) {
    signale.info(`Spawning ${shardCount} processes to transform ${paths.length} pages ...`);
    const shards = [];

    while (shards.length < shardCount) {
      const shardId = shards.length;
      const shard = sh(`gulp transformPages --env ${config.environment} \
          --shard ${shardId}`);
      signale.success(`Started shard ${shardId} ...`);
      shards.push(shard);
    }

    return Promise.all(shards);
  }

  // Otherwise it's the actual shard processing a subset of paths
  const shardId = config.options.shard;
  const startIndex = shardId * shardPathCount;
  const endIndex = shardId == shardCount - 1 ? paths.length : (shardId + 1) * shardPathCount;
  paths = paths.slice(startIndex, endIndex);

  signale.await(`Shard ${shardId} [${startIndex} - ${endIndex}]: \
      processing ${paths.length} files ...`);
  // After the pages have been built by Grow create transformed versions
  return new Promise((resolve, reject) => {
    const stream = pageTransformer.start(paths, {
      'base': `${project.paths.GROW_BUILD_DEST}`,
    });

    stream.on('end', resolve);
    stream.on('error', reject);
  });
}

/**
 * Collects the static files of all sub projcts to dist while creating ZIPs
 * from folders ending on .zip
 *
 * @return {Stream}
 */
function collectStatics(done) {
  // Used to keep track of unfinished archives
  const archives = {};

  gulp.src([
    project.absolute('pages/static/**/*'),
    project.absolute('examples/static/**/*'),
  ]).pipe(through.obj(async function(file, encoding, callback) {
    // Skip potential archive parent directories to have the path writable later
    if (file.stat.isDirectory() && file.path.endsWith('.zip')) {
      callback();
      return;
    }

    // Check if file could be part of a ZIP and not already is one itself
    if (file.path.includes('.zip') && !file.path.endsWith('.zip')) {
      // If the file should be part of a ZIP file pass it over to archiver
      const relativePath = file.relative.slice(0, file.relative.indexOf('.zip') + 4);
      const archive = archives[relativePath] || archiver('zip', {
        'zlib': {'level': 9},
      });

      // Only append real files, directories will be created automatically
      const filePath = file.relative.replace(relativePath, '');
      if (!file.stat.isDirectory() && filePath) {
        archive.append(file.contents, {'name': filePath});
      }

      archives[relativePath] = archive;
      callback();
      return;
    }

    // ... and simply copy all other files
    // eslint-disable-next-line no-invalid-this
    this.push(file);
    callback();
  }))
      .pipe(gulp.dest(project.paths.STATICS_DEST))
      .on('end', async () => {
        signale.await('Writing ZIPs ...');

        const writes = [];
        for (const [archivePath, contents] of Object.entries(archives)) {
          contents.finalize();

          const dest = path.join(project.paths.STATICS_DEST, archivePath);
          const archive = fs.createWriteStream(dest);

          writes.push(new Promise((resolve, reject) => {
            contents.pipe(archive).on('close', () => {
              signale.success(`Wrote archive ${archivePath}`);
              resolve();
            });
          }));
        };

        await Promise.all(writes);
        signale.await('Finished collecting static files!');
        done();
      });
}

/**
 * Writes information about the current build to a file to be able to
 * inspect the current version on /who-am-i
 *
 * @return {undefined}
 */
function persistBuildInfo(done) {
  const buildInfo = {
    'number': travis.build.number || null,
    'at': new Date(),
    'by': git.user,
    'environment': config.environment,
    'commit': {
      'sha': git.version,
      'message': git.message,
    },
  };

  fs.writeFile(project.paths.BUILD_INFO, yaml.safeDump(buildInfo), done);
}

exports.clean = clean;
exports.sass = sass;
exports.icons = icons;
exports.templates = templates;
exports.importAll = importAll;
exports.buildPlayground = buildPlayground;
exports.buildBoilerplate = buildBoilerplate;
exports.buildFrontend = buildFrontend;
exports.buildSamples = buildSamples;
exports.zipTemplates = zipTemplates;
exports.buildPages = buildPages;

exports.buildPrepare = buildPrepare;
exports.transformPages = transformPages;
exports.fetchArtifacts = fetchArtifacts;
exports.collectStatics = collectStatics;
exports.buildFinalize = gulp.series(fetchArtifacts,
    gulp.parallel(collectStatics, persistBuildInfo));

exports.build = gulp.series(clean, buildPrepare, buildPages,
    gulp.parallel(collectStatics, persistBuildInfo));

exports.buildForGrowTests = gulp.series(buildBoilerplate, buildPages);
