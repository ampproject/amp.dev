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
const mkdirp = require('mkdirp').sync;
const config = require('@lib/config');
const signale = require('signale');
const del = require('del');
const fs = require('fs');
const path = require('path');
const through = require('through2');
const archiver = require('archiver');
const yaml = require('js-yaml');
const {samplesBuilder} = require('@lib/build/samplesBuilder');
const {project} = require('@lib/utils');
const git = require('@lib/utils/git');
const ComponentReferenceImporter = require('@lib/pipeline/componentReferenceImporter');
const SpecImporter = require('@lib/pipeline/specImporter');
const RecentGuides = require('@lib/pipeline/recentGuides');
const gulpSass = require('gulp-sass');
gulpSass.compiler = require('sass');
const importRoadmap = require('./import/importRoadmap.js');
const importWorkingGroups = require('./import/importWorkingGroups.js');
const importAdVendorList = require('./import/importAdVendorList.js');
const {thumborImageIndex} = require('./thumbor.js');
const {PIXI_CLOUD_ROOT} = require('@lib/utils/project').paths;

/**
 * Cleans all directories/files that get created by any of the following
 * tasks
 *
 * @return {Promise}
 */
function clean() {
  return del(
    [
      project.absolute('.cache/**/*'),

      project.paths.DIST,
      project.paths.BUILD,

      project.absolute('boilerplate/dist'),

      project.paths.CSS,
      project.absolute('pages/extensions/**/*.pyc'),
      project.absolute(
        'pages/content/amp-dev/documentation/examples/documentation/**/*.html'
      ),
      project.absolute(
        'pages/content/amp-dev/documentation/examples/previews/**/*.html'
      ),
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
    ],
    {'force': true}
  );
}

/**
 * Compiles all SCSS partials to CSS
 *
 * @return {Stream}
 */
function sass() {
  const options = {
    'outputStyle': 'compressed',
    'includePaths': [project.paths.SCSS],
  };

  return gulp
    .src(`${project.paths.SCSS}/**/[^_]*.scss`)
    .pipe(gulpSass.sync(options))
    .on('error', function (e) {
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
  return gulp
    .src(`${project.paths.FRONTEND_TEMPLATES}/**/*`)
    .pipe(gulp.dest(project.paths.GROW_POD));
}

/**
 * Copies the icons into the Grow pod
 *
 * @return {Stream}
 */
function icons() {
  return gulp
    .src(`${project.paths.ICONS}/**/*`)
    .pipe(gulp.dest(`${project.paths.GROW_POD}/icons`));
}

function buildFrontend21() {
  return sh('npm run build:frontend');
}

/**
 * Runs all tasks needed to build the frontend
 * @return {undefined}
 */
function buildFrontend(done) {
  return gulp.parallel(sass, templates, icons, buildFrontend21)(done);
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
 * Builds Pixi
 * @return {Promise}
 */
async function buildPixi() {
  await sh('mkdir -p pixi/dist');
  return sh('npm run build:pixi');
}

/**
 * Builds the pixi cloud functions project
 */
function buildPixiFunctions() {
  return sh('npm install', {
    workingDir: PIXI_CLOUD_ROOT,
  });
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
  return samplesBuilder.build();
}

/**
 * Zips templates for download.
 */
function zipTemplates() {
  const templateDir = path.join(project.paths.DIST, 'static/files/templates/');
  mkdirp(templateDir);
  return gulp.src(project.paths.TEMPLATES + '/*/*/').pipe(
    through.obj(async (file, encoding, callback) => {
      const archive = archiver('zip', {
        'zlib': {'level': 9},
      });
      const zipFilePath = path.join(templateDir, file.basename + '.zip');
      const zipFileStream = fs.createWriteStream(zipFilePath);
      archive
        .directory(file.path + '/', false)
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
    })
  );
}

/**
 * Runs all importers
 *
 * @return {Promise}
 */
function importAll() {
  return Promise.all([
    new ComponentReferenceImporter().import(),
    new SpecImporter().import(),
    new RecentGuides().import(),
    importRoadmap.importRoadmap(),
    importWorkingGroups.importWorkingGroups(),
    importAdVendorList.importAdVendorList(),

    // TODO: Fails on Travis with HttpError: Requires authentication
    // roadmapImporter.importRoadmap(),
  ]);
}

/**
 * Imports just the reference docs.
 *
 * @return {Promise}
 */
function importComponents() {
  return new ComponentReferenceImporter().import();
}

/**
 * Builds playground and boilerplate generator, imports all remote documents,
 * builds samples, lints Grow pod and JavaScript.
 *
 * @return {undefined}
 */
function build(done) {
  return gulp.series(
    clean,
    gulp.parallel(
      buildPlayground,
      buildBoilerplate,
      buildPixi,
      buildSamples,
      buildFrontend,
      importAll,
      zipTemplates
    ),
    collectStatics,
    // eslint-disable-next-line prefer-arrow-callback
    function exit(_done) {
      done();
      _done();
      process.exit(0);
    }
  )(done);
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

  gulp
    .src([
      project.absolute('pages/static/**/*'),
      project.absolute('examples/static/**/*'),
      project.absolute('frontend21/dist/static/**/*'),
    ])
    .pipe(
      through.obj(async function (file, encoding, callback) {
        // Skip potential archive parent directories to have the path writable later
        if (file.stat.isDirectory() && file.path.endsWith('.zip')) {
          callback();
          return;
        }

        // Check if file could be part of a ZIP and not already is one itself
        if (file.path.includes('.zip') && !file.path.endsWith('.zip')) {
          // If the file should be part of a ZIP file pass it over to archiver
          const relativePath = file.relative.slice(
            0,
            file.relative.indexOf('.zip') + 4
          );
          const archive =
            archives[relativePath] ||
            archiver('zip', {
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
      })
    )
    .pipe(gulp.dest(project.paths.STATICS_DEST))
    .on('end', async () => {
      signale.await('Writing ZIPs ...');

      const writes = [];
      for (const [archivePath, contents] of Object.entries(archives)) {
        contents.finalize();

        const dest = path.join(project.paths.STATICS_DEST, archivePath);
        const archive = fs.createWriteStream(dest);

        writes.push(
          new Promise((resolve, reject) => {
            contents.pipe(archive).on('close', () => {
              signale.success(`Wrote archive ${archivePath}`);
              resolve();
            });
          })
        );
      }

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
    'number': process.env.GITHUB_RUN_ID || null,
    'at': new Date(),
    'by': process.env.GITHUB_ACTOR || git.user(),
    'environment': config.environment,
    'commit': {
      'sha': process.env.GITHUB_SHA || git.version(),
      'message': git.message(),
    },
  };

  fs.writeFile(project.paths.BUILD_INFO, yaml.dump(buildInfo), done);
}

exports.clean = clean;
exports.sass = sass;
exports.icons = icons;
exports.templates = templates;
exports.importAll = importAll;
exports.importComponents = importComponents;
exports.buildPlayground = buildPlayground;
exports.buildPixi = buildPixi;
exports.buildBoilerplate = buildBoilerplate;
exports.buildFrontend = buildFrontend;
exports.buildSamples = buildSamples;
exports.zipTemplates = zipTemplates;
exports.build = build;
exports.collectStatics = collectStatics;
exports.buildPixiFunctions = buildPixiFunctions;
exports.buildFinalize = gulp.series(
  gulp.parallel(collectStatics, persistBuildInfo),
  thumborImageIndex
);

exports.buildForGrowTests = gulp.series(buildBoilerplate);
