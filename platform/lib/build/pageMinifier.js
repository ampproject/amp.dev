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

const {Signale} = require('signale');
const gulp = require('gulp');
const once = require('gulp-once');
const minifyHtml = require('html-minifier').minify;
const through = require('through2');
const crass = require('crass');

const PAGES_DEST = '../platform/pages';

class PageMinifier {
  constructor() {
    this._log = new Signale({
      'interactive': true,
      'scope': 'Page minifier',
    });

    // Holds CSS by hash that has already been minified
    this._minifiedCssCache = {}
  }

  /**
   * Returns a Gulp stream that minifies all files that are put into it
   * @param  {path} path Allows overwriting of default path
   * @return {Stream}
   */
  start(path) {
    // Ugly but needed to keep scope for .pipe
    let scope = this;

    return gulp.src(`${PAGES_DEST}/**/*.html`, {'base': './'})
           .pipe(through.obj(function(page, encoding, callback) {
             log.await(`Minifying ${page.relative} ...`);
             this.push(scope._minifyPage(page));

             callback();
           }))
           .pipe(gulp.dest('./'));
  }

  /**
   * Extracts the contents of a Vinyl file and passes the string on
   * to other minifying functions
   * @param  {Vinyl} page
   * @return {Vinyl}
   */
  _minifyPage(page) {
    const html = page.contents.toString();

    html = this._cleanHtml(html);
    html = this._minifyHtml(html);

    page.contents = Buffer.from(html);
    return page;
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
    try {
      html = minifyHtml(html, {
        'minifyCSS': this._minifyCss,
        'collapseWhitespace': true,
        'removeEmptyElements': false,
        'removeRedundantAttributes': true,
        'ignoreCustomFragments': [/<use.*<\/use>/],
      });
    } catch (e) {
      this._log.error(`Could not minify ${page.relative}. Invalid markup.`);
    }

    return html;
  }

  _minifyCss(css, type) {
    // Leave alone inline styles and the AMP boilerplate
    if (type == 'inline' || css.includes('body{-webkit-')) {
      return css;
    }

    // Hash it to check if that bundle has already been minified
    let hash = crypto.createHash('md5');
    hash.update(css);
    hash = hash.digest('utf-8');

    if (!this._minifiedCssCache[hash]) {
      let cssOm = crass.parse(css);
      cssOm = cssOm.optimize();

      this._minifiedCssCache[hash] = thiscssOm.toString();
    } else {
      this._log.info(`CSS bundle ${hash} has already been minified.`);
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
  'pageMinifier': new PageMinifier()
};
