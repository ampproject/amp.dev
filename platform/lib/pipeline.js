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

const { spawn } = require('child_process');
const log = require('loglevel');
const del = require('del');
const config = require('./config.js');
const gulp = require('gulp');
const sass = require('gulp-sass');
const stripCssComments = require('gulp-strip-css-comments');

const GROW_PODSPEC_PATH = '../pages/podspec.yaml';
const GROW_SERVER_READY_STDOUT = 'Server ready.';
const GROW_TRACEBACK_STDOUT = 'Traceback (most recent call last):';

const TRANSPILE_PAGES_SCSS_SRC = '../frontend/source/scss/**/[^_]*.scss';
const TRANSPILE_PAGES_SCSS_DEST = '../pages/css';

const PAGES_TEMPLATES_SRC = '../frontend/source/j2/**/*';
const PAGES_TEMPLATES_DEST = '../pages'

class Pipeline {

  constructor() {
    log.info(`Starting pipeline for environment ${config.environment} ...`);
  }

  /**
   * Cleans remainings from previous builds
   * @return {Promise}
   */
  clean() {
    del.sync([
      GROW_PODSPEC_PATH,
      TRANSPILE_PAGES_SCSS_DEST,

      `${PAGES_TEMPLATES_DEST}/macros`,
      `${PAGES_TEMPLATES_DEST}/partials`,
      `${PAGES_TEMPLATES_DEST}/templates`,
      `${PAGES_TEMPLATES_DEST}/views`
    ], {'force': true});
  }

  /**
   * Transpiles SCSS files to CSS, moves templates icons and more
   * @return {Promise}
   */
  buildPagesFrontend() {
    // Build styles
    this._transpilePagesScss();
    this._movePagesTemplates();
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

  _movePagesTemplates() {
    log.info(`Moving templates from ${TRANSPILE_PAGES_SCSS_SRC} ...`);

    return new Promise((resolve, reject) => {
      let stream = gulp.src(PAGES_TEMPLATES_SRC)
                   .pipe(gulp.dest(PAGES_TEMPLATES_DEST));

      stream.on('error', () => {
        log.error('There was an error moving the pages templates.');
      });

      stream.on('end', () => {
        log.info(`Moved page templates to ${PAGES_TEMPLATES_SRC}.`);
        resolve();
      });
    });
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
      return this._startGrowDevServer();
    } else {
      return this._buildPages();
    }
  }

  _startGrowDevServer() {
    log.info('Starting Grow development server ...', '\n');

    return new Promise((resolve, reject) => {
      let grow = spawn('grow',
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

        if (data.indexOf(GROW_SERVER_READY_STDOUT) !== -1) {
          resolve();
          log.info('\nStarted Grow development server.');
        }
      }

      grow.stdout.on('data', growStdIo);
      grow.stderr.on('data', growStdIo);
    });
  }

  _buildPages() {

  }

  samples() {
    log.warn('Building samples is not yet supported.')
  }
};

module.exports = Pipeline;
