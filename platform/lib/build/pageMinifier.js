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

const {Signale} = require('signale');
const gulp = require('gulp');
const minifyHtml = require('html-minifier').minify;
const through = require('through2');
const path = require('path');
const CleanCSS = require('clean-css');
const crypto = require('crypto');

class PageMinifier {
  constructor() {
    this._log = new Signale({
      'interactive': true,
      'scope': 'Page minifier',
    });

    // An instance of CleanCSS
    this._cleanCss = new CleanCSS({
      2: {
        'all': true,
        'mergeSemantically': true,
        'restructureRules': true,
      },
    });
    // Holds CSS by hash that has already been minified
    this._minifiedCssCache = {};
  }

  /**
   * Returns a Gulp stream that minifies all files that are put into it
   * @param  {path} path Allows overwriting of default path
   * @return {Stream}
   */
  start(path) {
    // Ugly but needed to keep scope for .pipe
    const scope = this;

    return gulp.src(`${path}/**/*.html`, {'base': './'})
        .pipe(through.obj(function(page, encoding, callback) {
          scope._log.await(`Minifying ${page.relative} ...`);

          let html = page.contents.toString();
          html = scope.minifyPage(html, page.path);
          page.contents = Buffer.fromString(html);

          this.push(page);

          callback();
        }))
        .pipe(gulp.dest('./'));
  }

  /**
   * Extracts the contents of a Vinyl file and passes the string on
   * to other minifying functions
   * @param  {String} The page's markup
   * @return {String} The minified or the unmodified markup in case of error
   */
  minifyPage(html, path) {
    try {
      html = this._cleanHtml(html);
      html = this._minifyHtml(html);
    } catch (e) {
      this._log.error(`Could not minify ${path}`);
      console.error(e);
    }

    return html;
  }

  _cleanHtml(html) {
    // Clean up common markup fuck ups before minfying as
    // it would break the tree otherwise
    html = html.replace(/<p><\/section>/g, '</section>');
    html = html.replace(/(<section [^>]*>)<\/p>/g, '$1');

    // As minifyHtml's removeEmptyElements would be a bit to
    // radical, cleanup frequent empty tags ourselves
    html = html.replace(/<section .*><\/section>/g, '');
    html = html.replace(/<p><\/p>/g, '');

    return html;
  }

  _minifyHtml(html) {
    html = minifyHtml(html, {
      'minifyCSS': this._minifyCss.bind(this),
      'collapseWhitespace': true,
      'removeEmptyElements': false,
      'removeRedundantAttributes': true,
      'ignoreCustomFragments': [/<use.*<\/use>/],
      'processScripts': ['application/json']
    });

    return html;
  }

  _minifyCss(css, type) {
    // Leave alone inline styles and the AMP boilerplate
    if (type == 'inline' || css.includes('body{-webkit-')) {
      return css;
    }

    // Hash it to check if that bundle has already been minified
    let hash = crypto.createHash('sha1');
    hash.update(css);
    hash = hash.digest('base64');

    if (!this._minifiedCssCache[hash]) {
      this._log.info(`Caching CSS bundle with ${hash}`);

      this._minifiedCssCache[hash] = this._cleanCss.minify(css).styles;
    }

    return this._minifiedCssCache[hash];
  }
}

if (!module.parent) {
  (async () => {
    const pageMinifier = new PageMinifier();
    pageMinifier.start();
  })();
}

module.exports = {
  'pageMinifier': new PageMinifier(),
};
