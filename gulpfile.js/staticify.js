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

const Cheerio = require('cheerio');
const Vinyl = require('vinyl');
const config = require('@lib/config');
const filter = require('gulp-filter');
const gulp = require('gulp');
const nunjucks = require('nunjucks');
const path = require('path');
const through = require('through2');
const {project} = require('@lib/utils');
const {survey} = require('@lib/templates/SurveyFilter.js');
const {importBlog} = require('@lib/templates/ImportBlogFilter.js');
const {
  importYouTubeChannel,
} = require('@lib/templates/ImportYouTubeChannel.js');
const {
  SupportedFormatsExtension,
} = require('@lib/templates/SupportedFormatsExtension.js');
const {
  FORMAT_WEBSITES,
  SUPPORTED_FORMATS,
} = require('@lib/amp/formatHelper.js');

const getUpdatedURL = (u, requestedFormat, forcedFormat) => {
  return u.replace(
    /(.*documentation\/[^/]+)[\/.]([^?]+)(?:\?(?:[^=]*)=(.*))?/,
    (match, section, page) => {
      if (page === 'html') {
        page = 'index.html';
      }

      const hasFormat = forcedFormat || requestedFormat;
      const fmt = hasFormat ? `${hasFormat}/` : '';
      return `${section}/${fmt}${page}`;
    }
  );
};

/**
 * creates a new nunjucks environment for rendering
 *
 */
function nunjucksEnv() {
  const env = new nunjucks.Environment(null, {
    tags: {
      blockStart: '[%',
      blockEnd: '%]',
      variableStart: '[=',
      variableEnd: '=]',
      commentStart: '[[[[#',
      commentEnd: '#]]]]',
    },
  });

  env.addExtension(
    'SupportedFormatsExtension',
    new SupportedFormatsExtension()
  );
  env.addFilter('importBlog', importBlog, true);

  env.addFilter('importYouTubeChannel', importYouTubeChannel, true);
  env.addFilter('survey', survey, true);

  return env;
}

/**
 * Compiles the pages into standalone static files
 *
 * @return {Promise}
 */
async function staticify(done) {
  const logger = require('@lib/utils/log')('Static File Generator');

  const requestPathRegex = new RegExp(
    `${project.paths.PAGES_DEST}|(index)?.html`,
    'g'
  );

  const generatedFormats = SUPPORTED_FORMATS.map((format) => {
    const f = (cb) => {
      const env = nunjucksEnv();

      const f = filter([`${project.paths.PAGES_DEST}/**/*html`, 'index'], {
        restore: true,
      });

      return gulp
        .src(`${project.paths.PAGES_DEST}/**/*.html`)
        .pipe(f)
        .pipe(
          // Render a static version of all of our pages

          through.obj(async (file, enc, callback) => {
            const configObj = {
              requestPath: `${file.path.replace(requestPathRegex, '')}/`,
              format,
              requestedFormat: format,
            };

            const srcHTML = file.contents.toString();

            env.renderString(srcHTML, configObj, (err, result) => {
              if (err) {
                logger.error(`Error rendering ${file.path}`);
                return callback(err);
              }

              file.contents = Buffer.from(result);
              callback(null, file);
            });
          })
        )
        .pipe(
          through.obj(async function (file, enc, callback) {
            // Rewrite links inside of each of the pages

            const $ = Cheerio.load(file.contents.toString());

            $('a.nav-link, a.ap-m-format-toggle-link').each(function () {
              // eslint-disable-next-line no-invalid-this
              const $this = $(this);
              const origURL = $this.attr('href');

              $this.attr('href', getUpdatedURL(origURL, format));
            });

            const renderedPage = $.root().html();

            if (
              format === FORMAT_WEBSITES &&
              !file.path.endsWith('tools.html')
            ) {
              // covering the case where /documentation/tools.html, which matches differently than all other paths
              const defaultFormatVersion = new Vinyl({
                path: getUpdatedURL(file.path),
                contents: Buffer.from(renderedPage),
              });

              // eslint-disable-next-line no-invalid-this
              this.push(defaultFormatVersion);
            }

            file.path = getUpdatedURL(file.path, format);
            file.contents = Buffer.from(renderedPage);

            callback(null, file);
          })
        )
        .pipe(
          gulp.dest((f) => {
            logger.log(
              `staticified ${path.relative(project.absolute('.'), f.path)}`
            );
            return f.base;
          })
        )
        .on('end', cb);
    };

    Object.defineProperty(f, 'name', {
      value: `generatePagesFor${format}`,
      writable: false,
    });
    return f;
  });

  const generatedLevels = ['beginner', 'advanced'].map((level) => {
    const coursesPath = '/documentation/courses';
    const coursesRegex = new RegExp(`^(.+)(?:${coursesPath})(.*)$`);

    const f = (cb) => {
      const env = nunjucksEnv();

      return gulp
        .src(`${project.paths.PAGES_DEST}${coursesPath}/**/*.html`)
        .pipe(
          through.obj((file, enc, callback) => {
            const srcHTML = file.contents.toString();
            const configObj = {
              requestPath: `${file.path.replace(requestPathRegex, '')}/`,
              level,
              format: FORMAT_WEBSITES,
            };

            env.renderString(srcHTML, configObj, (err, result) => {
              if (err) {
                return callback(err);
              }

              file.contents = Buffer.from(result);
              callback(null, file);
            });
          })
        )
        .pipe(
          through.obj(function (file, enc, callback) {
            let renderedPage = file.contents.toString();

            const $ = Cheerio.load(renderedPage);

            $('.nav-link').each(function () {
              // eslint-disable-next-line no-invalid-this
              const $this = $(this);
              const origURL = $this.attr('href');
              const updatedURL = origURL.replace(
                coursesRegex,
                (match, a, b) => `${a}/${coursesPath}/${level}${b}`
              );

              $this.attr('href', updatedURL);
            });

            renderedPage = $.root().html();

            if (level === 'beginner') {
              // eslint-disable-next-line no-invalid-this
              this.push(
                new Vinyl({
                  path: `${file.path}`,
                  contents: Buffer.from(renderedPage),
                })
              );
            }

            file.path = file.path.replace(
              coursesRegex,
              (match, a, b) => `${a}/${coursesPath}/${level}${b}`
            );
            file.contents = Buffer.from(renderedPage);
            callback(null, file);
          })
        )
        .pipe(gulp.dest((f) => f.base))
        .on('end', cb);
    };

    Object.defineProperty(f, 'name', {
      value: `generateCoursesFor${level}`,
      writable: false,
    });
    return f;
  });

  await gulp
    .src(`${project.paths.STATICS_DEST}/files/search-promoted-pages/*json`)
    .pipe(
      through.obj((file, encoding, callback) => {
        const rawJSON = file.contents.toString();
        const data = JSON.parse(rawJSON);

        for (const page of data.pages) {
          page.url = new URL(page.url, config.hosts.platform.base).toString();
        }

        for (const page of data.components) {
          page.url = new URL(page.url, config.hosts.platform.base).toString();
        }

        file.contents = Buffer.from(
          JSON.stringify({
            result: data,
            initial: true,
          })
        );

        callback(null, file);
      })
    )
    .pipe(gulp.dest(() => `${project.paths.PAGES_DEST}/search/highlights/`));

  await gulp
    .src([
      project.absolute('pages/static/**/*'),
      project.absolute('examples/static/**/*'),
      project.absolute('frontend21/dist/static/**/*'),
    ])
    .pipe(gulp.dest(`${project.paths.PAGES_DEST}/static`));

  await gulp
    .src(`${project.paths.STATICS_DEST}/**/*`)
    .pipe(gulp.dest(() => `${project.paths.PAGES_DEST}/static`));

  return new Promise((resolve, reject) => {
    gulp.series(
      gulp.parallel(...generatedFormats),
      gulp.parallel(...generatedLevels),
      (seriesDone) => {
        seriesDone();
        resolve();
        done();
      }
    )();
  });
}

exports.staticify = staticify;
