/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
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

const { spawn, exec } = require('child_process');
const log = require('loglevel');
const del = require('del');
const config = require('./config.js');
const gulp = require('gulp');
const sass = require('gulp-sass');
const crass = require('crass');
const stripCssComments = require('gulp-strip-css-comments');
const through = require('through2');
const minifyHtml = require('html-minifier').minify;

const GROW_PODSPEC_PATH = '../pages/podspec.yaml';

const TRANSPILE_PAGES_SCSS_SRC = '../frontend/scss/**/[^_]*.scss';
const TRANSPILE_PAGES_SCSS_DEST = '../pages/css';

const PAGES_TEMPLATES_SRC = '../frontend/templates/**/*';
const PAGES_TEMPLATES_DEST = '../pages'

const ICONS_SRC = '../frontend/icons/**/*';
const ICONS_DEST = '../pages/icons';

const PAGES_DEST = '../platform/pages';

const STATICS_SRC = ['../pages/static/**/*'];
const STATIC_DEST = '../platform/static';

class Pipeline {

  constructor() {
    log.info(`Starting pipeline for environment ${config.environment} ...`);
  }

  /**
   * Cleans remainings from previous builds
   * @return {Array} Containing deleted paths.
   */
  clean() {
    del.sync([
      GROW_PODSPEC_PATH,
      TRANSPILE_PAGES_SCSS_DEST,

      `${PAGES_TEMPLATES_DEST}/macros`,
      `${PAGES_TEMPLATES_DEST}/partials`,
      `${PAGES_TEMPLATES_DEST}/templates`,
      `${PAGES_TEMPLATES_DEST}/views`,

      PAGES_DEST,
      STATIC_DEST
    ], {'force': true});
  }

  /**
   * Transpiles SCSS files to CSS, moves templates icons and more
   * @return {Promise}
   */
  buildPagesFrontend() {
    this._transpilePagesScss();
    this._collectPagesTemplates();
    this._collectIcons();

    // TODO(matthiasrohmer): Watch for changes
  }

  _transpilePagesScss() {
    log.info(`Transpiling SCSS from ${TRANSPILE_PAGES_SCSS_SRC} ...`);

    let options = {
      'outputStyle': 'compact' ? config.environment === 'development' : 'compressed'
    };

    return new Promise((resolve, reject) => {
      let stream = gulp.src(TRANSPILE_PAGES_SCSS_SRC)
                   .pipe(sass(options)
                   .on('error', sass.logError))
                   .pipe(stripCssComments())
                   .pipe(gulp.dest(TRANSPILE_PAGES_SCSS_DEST));

      stream.on('error', () => {
        log.error('There was an error transpiling the pages SCSS.');
        reject();
      });

      stream.on('end', () => {
        log.info(`Transpiled SCSS files to ${TRANSPILE_PAGES_SCSS_DEST}.`);
        resolve();
      });
    });
  }

  /**
   * Promisified gulp.src/gulp.dest pipeline to move around files
   * @param  {String} entity Simple description of files moved for logging
   * @param  {Array} src    Glob style path
   * @param  {Array} dest   Destination path
   * @return {Promise}
   */
  _collect(entity, src, dest) {
    log.info(`Collecting ${entity} from ${src} ...`);

    return new Promise((resolve, reject) => {
      let stream = gulp.src(src)
                   .pipe(gulp.dest(dest));

      stream.on('error', () => {
        log.error(`There was an error moving ${entity}`);
        reject();
      });

      stream.on('end', () => {
        log.info(`Moved ${entity} to ${dest}.`);
        resolve();
      });
    });

  }

  _collectPagesTemplates() {
      return this._collect('pages templates', PAGES_TEMPLATES_SRC, PAGES_TEMPLATES_DEST);
  }

  _collectIcons() {
    return this._collect('icons', ICONS_SRC, ICONS_DEST);
  }

  /**
   * Starts a Grow instance that either builds all pages to the configured
   * path or starts a Grow development server
   * @return {Promise}
   */
  generatePages() {
    // Write podspec for Grow to run flawlessly
    config.writeGrowConfig();

    if (config.environment === 'development') {
      return this._startDevelopmentServer();
    } else {
      return this._buildPages();
    }
  }

  _startDevelopmentServer() {
    let pending = true;

    log.info('Starting Grow development server ...');
    return new Promise((resolve, reject) => {
      let grow = spawn(
        'grow',
        ['run', '--port', `${config.hosts.pages.port}`, '--no-preprocess'],
        {
          'stdio': 'pipe',
          // TODO(matthiasrohmer): Move this path to configuration
          'cwd': '../pages'
        }
      );

      function growStdIo(data) {
        data = data.toString();

        if (log.getLevel() <= log.levels.INFO) {
          process.stdout.write(data);
        }

        if (data.indexOf('Server ready.') !== -1 && pending) {
          pending = false;
          resolve(data);
        }
      }

      grow.stdout.on('data', growStdIo);
      grow.stderr.on('data', growStdIo);
    }).then(() => {
      log.info('Started Grow development server.');
    }).catch(() => {
      log.error('Grow dev server could not be started.');
    });
  }

  _buildPages() {
    log.info('Building pages via Grow ...');

    return new Promise((resolve, reject) => {
      let grow = exec(
        'grow deploy --noconfirm',
        {'cwd': '../pages'},
        (error, stdout, stderr) => {
          error ? reject(error, stdout, stderr) : resolve(stdout, stderr);
        }
      );
    }).then((stdout, stderr) => {
      log.info('Built pages.');
    }).catch(() => {
      log.error('Something went wrong building the pages.');
    });
  }

  samples() {
    log.warn('Building samples is not yet supported.')
  }

  async optimizeBuild() {
    log.info('Optimizing built pages ...');

    await this._minifyPages();
  }

  _minifyCss(css, type) {
    // Leave alone inline styles and the AMP boilerplate
    if (type !== 'inline' && css.indexOf('body{-webkit-') == -1) {
      let cssOm = crass.parse(css);
      cssOm = cssOm.optimize();

      return cssOm.toString();
    }

    return css;
  }

  _minifyPages() {
    log.info('Minifying page\'s source ...');

    return new Promise((resolve, reject) => {
      const minifyCss = this._minifyCss;

      let stream = gulp.src(`${PAGES_DEST}/**/*.html`, {'base': './'})
                   .pipe(through.obj(function (page, encoding, callback) {
                     let html = page.contents.toString();

                     log.debug(`Minifying page ${page.path} ...`);
                     html = minifyHtml(html, {
                       'minifyCSS': minifyCss,
                       'minifyJS': true,
                       'collapseWhitespace': true,
                       'removeEmptyElements': false,
                       'removeRedundantAttributes': true,
                     });

                     page.contents = Buffer.from(html);

                     this.push(page);
                     callback();
                   }))
                   .pipe(gulp.dest('./'));

      stream.on('error', (error) => {
        log.error(`Something went wrong while minifying HTML: ${error}`);
        reject(error);
      });

      stream.on('end', () => {
        log.info(`Minified page's HTML.`);
        resolve();
      });
    });
  }

  collectStatics() {
    return this._collect('static files', STATICS_SRC, STATIC_DEST);
  }
};

module.exports = Pipeline;
