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

const { Signale } = require('signale');
const signale = require('signale');
const fs = require('fs');
const path = require('path');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const crass = require('crass');
const stripCssComments = require('gulp-strip-css-comments');
const through = require('through2');
const minifyHtml = require('html-minifier').minify;

const config = require('./config');
const Grow = require('./pipeline/grow');
const ComponentReferenceImporter = require('./pipeline/componentReferenceImporter');
const SpecImporter = require('./pipeline/specImporter');
const SamplesBuilder = require('./pipeline/samplesBuilder');
const { FilteredPage, isFilterableRoute, FORMATS } = require('./pipeline/filteredPage');

const TRANSPILE_SCSS_SRC = '../frontend/scss/**/[^_]*.scss';
const TRANSPILE_SCSS_WATCH_SRC = '../frontend/scss/**/*.scss';
const TRANSPILE_SCSS_DEST = '../pages/css';
const TEMPLATES_SRC = '../frontend/templates/**/*';
const TEMPLATES_WATCH_SRC = TEMPLATES_SRC;
const TEMPLATES_DEST = '../pages'
const ICONS_SRC = '../frontend/icons/**/*';
const ICONS_WATCH_SRC = ICONS_SRC;
const ICONS_DEST = '../pages/icons';
const PAGES_DEST = '../platform/pages';
const STATICS_SRC = ['../pages/static/**/*'];
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
    // TODO: Maybe Check node verison, so long just return a noop promise
    return Promise.all([]);
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
      STATIC_DEST
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
  buildFrontend() {
    this._transpileScss();
    this._collectTemplates();
    this._collectIcons();

    if (config.environment === 'development') {
      this._watchFrontendChanges();
      signale.watch(`Watching frontend source for changes ...`);
    }
  }

  _watchFrontendChanges() {
    gulp.watch(TEMPLATES_WATCH_SRC, this._collectTemplates.bind(this));
    gulp.watch(ICONS_WATCH_SRC, this._collectIcons.bind(this));
    gulp.watch(TRANSPILE_SCSS_WATCH_SRC, this._transpileScss.bind(this));
  }

  _transpileScss() {
    const log = signale.scope(`Transpile SCSS`);
    log.start(`Transpiling SCSS from ${TRANSPILE_SCSS_SRC} ...`);

    let options = {
      'outputStyle': 'compact' ? config.environment === 'development' : 'compressed'
    };

    return new Promise((resolve, reject) => {
      let stream = gulp.src(TRANSPILE_SCSS_SRC)
                   .pipe(sass(options).on('error', log.error))
                   .pipe(stripCssComments())
                   .pipe(gulp.dest(TRANSPILE_SCSS_DEST));

      stream.on('error', (error) => {
        log.fatal('There was an error transpiling the pages SCSS.', error);
        reject();
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
      let stream = gulp.src(src)
                   .pipe(gulp.dest(dest));

      stream.on('error', () => {
        log.error(`There was an error moving ${entity}`);
        reject();
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
  async importReference() {
    let importer = new ComponentReferenceImporter();
    await importer.initialize();

    return importer.import();
  }

  /**
   * Imports spec docs defeind in platform/imports/spec.json
   * @return {Promise}
   */
  async importSpec() {
    let importer = new SpecImporter();
    await importer.initialize();

    return importer.import();
  }

  /**
   * Starts a Grow instance that either builds all pages to the configured
   * path or starts a Grow development server
   * @return {Promise}
   */
  generatePages() {
    let grow = new Grow();
    if (config.environment === 'development') {
      // During development start Grow's dev server
      return grow.run().when('Server ready.');
    } else {
      return grow.deploy().when('Deploying:').then(() => {
        // There is no "easy" way to determine when
        // Grow has finished putting the files in place
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 2500)
        });
      });
    }
  }

  async buildSamples() {
    let samplesBuilder = new SamplesBuilder();

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
    const log = new Signale({'interactive': false, 'scope': 'Minify pages'});
    log.await('Minifying page\'s ...');

    return new Promise((resolve, reject) => {
      const minifyCss = this._minifyCss;

      let stream = gulp.src(`${PAGES_DEST}/**/*.html`, {'base': './'})
                   .pipe(through.obj(function (page, encoding, callback) {
                     let html = page.contents.toString();
                     log.await(`Minifying page ${page.relative} ...`);

                     // Clean up common markup fuck ups before minfying as
                     // it would break the tree otherwise
                     html = html.replace('<p></section>', '</section>');
                     html = html.replace(/(<section [^>]*>)<\/p>/, '$1');

                     // As minifyHtml's removeEmptyElements would be a bit to
                     // radical, cleanup frequent empty tags ourselves
                     html = html.replace(/<section .*><\/section>/, '');
                     html = html.replace('<p></p>', '');

                     try {
                       html = minifyHtml(html, {
                         'minifyCSS': minifyCss,
                         'minifyJS': true,
                         'collapseWhitespace': true,
                         'removeEmptyElements': false,
                         'removeRedundantAttributes': true,
                         'ignoreCustomFragments': [/<use.*<\/use>/]
                       });
                     } catch(e) {
                       log.error(`Could not minify ${page.relative}. Invalid markup.`);
                     }

                     page.contents = Buffer.from(html);

                     this.push(page);
                     callback();
                   }))
                   .pipe(gulp.dest('./'));

      stream.on('error', (error) => {
        log.fatal(`Something went wrong while minifying HTML: ${error}`);
        reject(error);
      });

      stream.on('end', () => {
        log.success(`Minified page's HTML.`);
        resolve();
      });
    });
  }

  /**
   * Creates a variant of each page for each format if it isn't maintained
   * manually
   * @return {Promise}
   */
  createFilteredPages() {
    const log = new Signale({'interactive': false, 'scope': 'Filter pages'});
    log.await('Filtering pages by formats ...');

    return new Promise((resolve, reject) => {
      let stream = gulp.src(`${PAGES_DEST}/**/*.html`, {'base': './'})
                   .pipe(through.obj(function (page, encoding, callback) {
                     // Check if the page should even be filtered
                     if (!isFilterableRoute(page.relative)) {
                       log.info(`Skipping ${page.relative} as it is not filterable.`);
                       callback();
                       return;
                     }

                     // Already pull the contents form the buffer
                     let html = page.contents.toString();

                     // And check if it is a manually filtered page because
                     // then the other formats will be created from the unfiltered one
                     let manualFilter = page.relative.match(/\.(websites|ads|stories|emails)\.html/);
                     manualFilter = manualFilter ? manualFilter[1] : null;
                     if (manualFilter && FORMATS.indexOf(manualFilter) !== -1) {
                       log.warn(`${page.relative} is already a manual variant for ${manualFilter}.`);

                       let filteredPage = new FilteredPage(manualFilter, html);
                       page.contents = Buffer.from(filteredPage.content);

                       this.push(page);
                       callback();
                       return;
                     }

                     // If it is the original, unfiltered document create
                     // the not already existant filtered documents
                     log.await(`Creating variant for page ${page.relative} ...`);
                     for (let format of FORMATS) {
                        let variantPath = page.relative.replace(path.extname(page.relative), `.${format}.html`);

                        // Check if there is a manually maintained format variant
                        if (fs.existsSync(path.join(__dirname, '/../', variantPath))) {
                          log.warn(`Page has a manual variant for format ${format}`);
                          continue;
                        } else {
                          let filteredPage = new FilteredPage(format, html);

                          let variantPage = page.clone();
                          variantPage.contents = Buffer.from(filteredPage.content);
                          variantPage.extname = `.${format}.html`;
                          this.push(variantPage);

                          log.success(`Created variant for format ${format}`);
                        }
                     }

                     this.push(page);
                     callback();
                   }))
                   .pipe(gulp.dest('./'));

      stream.on('error', (error) => {
        log.fatal(`Something went wrong while filtering pages by format.`);
        reject(error);
      });

      stream.on('end', () => {
        log.success(`Created filtered pages.`);
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
