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

require('module-alias/register');

const {Signale} = require('signale');
const gulp = require('gulp');
const through = require('through2');
const path = require('path');
const fs = require('fs');

const {FilteredPage, isFilterableRoute, FORMATS} = require('@lib/pipeline/filteredPage');
const utils = require('@lib/utils');

class FormatFilter {
  constructor() {
    this._log = new Signale({
      'interactive': false,
      'scope': 'Format filter',
    });
  }

  /**
   * Returns a Gulp stream that filters allowed routes by format
   * @param  {path} path Allows overwriting of default path
   * @return {Stream}
   */
  start(path) {
    // Ugly but needed to keep scope for .pipe
    const scope = this;

    return gulp.src(path || `${utils.project.paths.GROW_BUILD_DEST}/**/*.html`, {'base': './'})
        .pipe(through.obj(function(page, encoding, callback) {
          scope._log.start(`Filtering ${page.relative} ...`);

          if (!isFilterableRoute(page.relative)) {
            scope._log.info('Skipping as it is not filterable.');
            callback();
            return;
          }

          if (scope._isManuallyFiltered(page)) {
            const manualFormat = scope._isManuallyFiltered(page);
            scope._log.info(`Page is a manual variant for ${manualFormat}.`);
            page = scope._filterPage(page, manualFormat, true);

            this.push(page);
            callback();
            return;
          }

          // If it is a filterable page and not a manual variant its the base
          // from which all variants should be created
          const variantPages = scope._createVariantPages(page);
          for (const variantPage of variantPages) {
            this.push(variantPage);
          }

          callback();
          return;
        }))
        .pipe(gulp.dest('./'));
  }

  /**
   * Checks a page by path if its a manually filtered one
   * @param  {Vinyl}  page
   * @return {Boolean}
   */
  _isManuallyFiltered(page) {
    const format = page.relative.match(/\.(websites|ads|stories|email)\.html/);
    return format ? format[1] : null;
  }

  /**
   * Creates a filtered page
   * @param  {String} format The format to filter by
   * @param  {Boolean} force
   * @return {Vinyl}
   */
  _filterPage(page, format, force = false) {
    const html = page.contents.toString();

    try {
      const filteredPage = new FilteredPage(format, html, force);
      page.contents = Buffer.from(filteredPage.content);
      this._log.success(`Applied format ${format}`);

      return page;
    } catch (e) {
      this._log.warn(`Couldn't filter for format ${format}:`, e.message);
      return null;
    }
  }

  _hasManuallyFilteredVariant(page, format) {
    const variantPath =
      page.relative.replace(path.extname(page.relative), `.${format}.html`);
    return fs.existsSync(variantPath);
  }

  /**
   * Creates all not already existant format variants of a page
   * @param  {Vinyl} page
   * @return {Array}
   */
  _createVariantPages(page) {
    const variantPages = [];
    for (const format of FORMATS) {
      if (this._hasManuallyFilteredVariant(page, format)) {
        this._log.warn(`Format variant for ${format} already exists`);
        continue;
      }

      let variantPage = page.clone();
      variantPage = this._filterPage(variantPage, format);

      if (variantPage) {
        variantPage.extname = `.${format}.html`;
        variantPages.push(variantPage);
      }
    }

    return variantPages;
  }
}

if (!module.parent) {
  (async () => {
    const formatFilter = new FormatFilter();
    formatFilter.start();
  })();
}

module.exports = {
  'formatFilter': new FormatFilter(),
};
