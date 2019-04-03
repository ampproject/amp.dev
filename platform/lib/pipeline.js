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

/* eslint-disable no-invalid-this */
'use strict';

const signale = require('signale');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const stripCssComments = require('gulp-strip-css-comments');

const config = require('./config');
const utils = require('@lib/utils');
const Grow = require('./pipeline/grow');
const ComponentReferenceImporter = require('./pipeline/componentReferenceImporter');
const SpecImporter = require('./pipeline/specImporter');
const {samplesBuilder} = require('./build/samplesBuilder');
const roadmapImporter = require('./pipeline/roadmapImporter');
const {pageMinifier} = require('./build/pageMinifier');

const TRANSPILE_SCSS_SRC = '../frontend/scss/**/[^_]*.scss';
const TRANSPILE_SCSS_WATCH_SRC = '../frontend/scss/**/*.scss';
const TRANSPILE_SCSS_DEST = '../pages/css';
const TEMPLATES_SRC = '../frontend/templates/**/*';
const TEMPLATES_WATCH_SRC = TEMPLATES_SRC;
const TEMPLATES_DEST = '../pages';
const ICONS_SRC = '../frontend/icons/**/*';
const ICONS_WATCH_SRC = ICONS_SRC;
const ICONS_DEST = '../pages/icons';
const PAGES_DEST = '../platform/pages';
const STATICS_SRC = ['../pages/static/**/*', '../examples/static/**/*'];
const STATIC_DEST = '../platform/static';

class Pipeline {
  constructor() {
    signale.await(`Starting pipeline for environment ${config.environment} ...`);
  }

  /**
   * Checks that all dependencies needed for the build are met
   * @return {Promise}
   */
  check() {
    // TODO: Maybe Check node and Grow verison, so long just return a noop promise
    return Promise.resolve();
  }

  /**
   * Cleans remainings from previous builds
   * @return {Array} Containing deleted paths.
   */
  clean() {
    del.sync([
      TRANSPILE_SCSS_DEST,

      `${TEMPLATES_DEST}/macros`,
      `${TEMPLATES_DEST}/partials`,
      `${TEMPLATES_DEST}/templates`,
      `${TEMPLATES_DEST}/views`,

      PAGES_DEST,
      STATIC_DEST,
    ], {'force': true});
  }


  /**
   * Simply copies the various static files from examples and pages ...
   * @return {Promise}
   */
  collectStatics() {
    return this._collect('static files', STATICS_SRC, STATIC_DEST);
  }

  /**
   * Transpiles SCSS files to CSS, moves templates icons and more
   * @return {Promise}
   */
  async buildFrontend() {
    await this._transpileScss();
    this._collectTemplates();
    this._collectIcons();

    if (config.isDevMode()) {
      this._watchFrontendChanges();
      signale.watch('Watching frontend source and static files for changes ...');
    }
  }

  _watchFrontendChanges() {
    gulp.watch(TEMPLATES_WATCH_SRC, this._collectTemplates.bind(this));
    gulp.watch(ICONS_WATCH_SRC, this._collectIcons.bind(this));
    gulp.watch(TRANSPILE_SCSS_WATCH_SRC, this._transpileScss.bind(this));
    gulp.watch(STATICS_SRC, this.collectStatics.bind(this));
  }

  _transpileScss() {
    const log = signale.scope('Transpile SCSS');
    log.start(`Transpiling SCSS from ${TRANSPILE_SCSS_SRC} ...`);

    const options = {
      'outputStyle': config.isDevMode() ? 'compact' : 'compressed',
      'includePaths': '../frontend/scss/',
    };

    return new Promise((resolve, reject) => {
      const stream = gulp.src(TRANSPILE_SCSS_SRC)
          .pipe(sass(options).on('error', log.error))
          .pipe(stripCssComments())
          .pipe(gulp.dest(TRANSPILE_SCSS_DEST));

      stream.on('error', (error) => {
        log.fatal('There was an error transpiling the pages SCSS.', error);
        reject(error);
      });

      stream.on('end', () => {
        log.success(`Transpiled SCSS files to ${TRANSPILE_SCSS_DEST}.`);
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
    const log = signale.scope(`Collect ${entity}`);
    log.start(`Collecting ${entity} from ${src} ...`);

    return new Promise((resolve, reject) => {
      const stream = gulp.src(src)
          .pipe(gulp.dest(dest));

      stream.on('error', (error) => {
        log.error(`There was an error moving ${entity}`);
        reject(error);
      });

      stream.on('end', () => {
        log.success(`Moved ${entity} to ${dest}.`);
        resolve();
      });
    });
  }

  _collectTemplates() {
    // TODO(matthiasrohmer): Eventually preminify templates
    return this._collect('templates', TEMPLATES_SRC, TEMPLATES_DEST);
  }

  _collectIcons() {
    // TODO(matthiasrohmer): Pipe icons through SVGO
    return this._collect('icons', ICONS_SRC, ICONS_DEST);
  }

  /**
   * Imports the component reference (amp-accordion, amp-carousel, ...)
   * to the documentation/components collection
   * @return {Promise}
   */
  importReference() {
    const importer = new ComponentReferenceImporter();
    return importer.import();
  }

  /**
   * Imports spec docs defeind in platform/imports/spec.json
   * @return {Promise}
   */
  importSpec() {
    const importer = new SpecImporter();
    return importer.import();
  }

  /**
   * Imports the data needed to render the roadmap
   * @return {Promise}
   */
  importRoadmap() {
    return roadmapImporter.importRoadmap();
  }

  /**
   * Starts a Grow instance that either builds all pages to the configured
   * path or starts a Grow development server
   * @return {Promise}
   */
  async generatePages() {
    const grow = new Grow();
    if (config.isDevMode()) {
      // During development start Grow's dev server
      return grow.run();
    } else {
      return grow.deploy().when('Deploying:');
    }
  }

  async buildSamples() {
    return samplesBuilder.build();
  }

  /**
   * Takes care of generally minimzing the output of previously run tasks
   * @return {undefined}
   */
  async optimizeBuild() {
    signale.info('Optimizing build ...');

    await this._minifyPages();
  }

  _minifyPages() {
    return new Promise((resolve, reject) => {
      const stream = pageMinifier.start(utils.project.absolute('platform/pages'));

      stream.on('error', (error) => {
        pageMinifier._log.fatal(`Something went wrong while minifying HTML: ${error}`);
        reject(error);
      });

      stream.on('end', () => {
        pageMinifier._log.success('Minified page\'s HTML.');
        resolve();
      });
    });
  }

  /**
   * Validates the built release
   * @return {undefined}
   */
  async testBuild() {
    // TODO: Run AMP validator over generated pages
    signale.warn('Testing of build is not yet implemented!');
  }
};

module.exports = Pipeline;
