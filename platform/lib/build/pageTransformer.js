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
const minifyHtml = require('html-minifier').minify;
const through = require('through2');
const CleanCSS = require('clean-css');
const crypto = require('crypto');
const rcs = require('rcs-core');
const t = require('exectimer');
const Tick = t.Tick;
const AmpOptimizer = require('amp-toolbox-optimizer');
const {filterPage, isFilterableRoute, FORMATS} = require('@lib/common/filteredPage');
const {htmlContent} = require('@lib/utils/cheerio');
const cheerio = require('cheerio');
const fs = require('fs');
const {project} = require('@lib/utils');

const config = require('@lib/config');

// List of selectors that can be safely minified
const SELECTOR_REWRITE_SAFE = [
  'ap--container',
  'ap--quote',
  'ap-m-banner',
  'ap-m-breadcrumbs',
  'ap-m-language-selector',
  'ap-m-rolling-formats',
  'ap-m-lnk',
  'ap-m-nav-link',
  'ap-m-shift-card',
  'ap-m-teaser',
  'ap-m-quote',
  'ap-m-benefit',
  'ap-m-code-snippet',
  'ap-m-code-snippet',
  'ap-o-component-visual',
  'ap-o-news-item',
  'ap-o-benefits',
  'ap-o-case-band',
  'ap-o-case-grid',
  'ap-o-consent',
  'ap-o-footer',
  'ap-o-header',
  'ap-o-stage',
  'ap-o-teaser-grid',
  'ap-t-what-is-amp',
];

// Do not rewrite all example pages as users might need correct source code
// for reference, ignore componets overview specifically as it relies on the
// ap-m-teaser selector for filtering.
const SELECTOR_REWRITE_EXCLUDED_PATHS =
  /\/documentation\/examples.*|\/documentation\/components\.html/;

class PageTransformer {
  constructor(optimizer = AmpOptimizer.create()) {
    this._log = new Signale({
      'interactive': false,
      'scope': 'Page transformer',
    });

    // Set excludes for CSS selector rewriting
    rcs.selectorLibrary.setExclude(
        new RegExp('^(?!' + SELECTOR_REWRITE_SAFE.join('|') + ').*$')
    );

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

    this._optimizer = optimizer;
  }

  /**
   * Returns a Gulp stream that minifies all files that are put into it
   * @param  {path} path Allows overwriting of default path
   * @return {Stream}
   */
  start(path, options) {
    // Ugly but needed to keep scope for .pipe
    const scope = this;
    return gulp.src(path, options)
        .pipe(through.obj(async function(canonicalPage, encoding, callback) {
          // The following transformations should only be applied to Grow's
          // HTML output, just forward all other files
          if (canonicalPage.extname !== '.html') {
            this.push(canonicalPage);
            callback();
            return;
          }

          let html = canonicalPage.contents.toString();

          let timer = new Tick('minifying');
          timer.start();
          html = scope.minifyPage(html, canonicalPage.path);
          timer.stop();

          timer = new Tick('optimizing');
          timer.start();
          const optimizedHtml = await scope.optimize(html);
          timer.stop();

          canonicalPage.contents = Buffer.from(optimizedHtml);

          let filteredPages = [];
          if (isFilterableRoute(canonicalPage.path)) {
            timer = new Tick('filtering');
            timer.start();
            filteredPages = scope._filterPages(canonicalPage);
            timer.stop();
          }

          for (const page of [canonicalPage, ...filteredPages]) {
            this.push(page);
          }

          scope._log.success(`Transformed ${canonicalPage.relative}`);
          callback();
        }))
        .pipe(gulp.dest(project.paths.PAGES_DEST));
  }

  done() {
    ['minifying', 'optimizing', 'filtering'].forEach((key) => {
      const results = t.timers[key];
      if (!results) {
        return;
      }
      this._log.info(`[PAGE_TRANSFORMER] ${key} mean time: ${results.parse(results.mean())}`);
    });
  }

  /**
   * Verifies a given page should be filtered
   *
   * @param  {Vinyl}
   * @return {undefined}
   */
  _isManuallyFiltered(page) {
    // Skip pages that have been manually filtered and therefore have a path like
    // - guides-and-tutorials/index.websites.html
    // - guides-and-tutorials/index.email.amp.html
    // But still the matching format should be filtered, therefore pass it back
    const format = page.path.match(/\.(websites|stories|ads|email)(\.amp)?\.html/);
    if (format) {
      return format[1];
    }
  }

  /**
   * Checks if a filtered variant already for a specific format already exists
   * on disc
   *
   * @param  {Vinyl}
   * @param  {String}
   * @return {undefined}
   */
  _hasManualFiltered(page, format) {
    // Do not filter pages that have a manually filtered equivalent as they
    // are also somewhere in the stream and shouldn't be overwritten
    let path = page.path.replace('.amp.html', '.html');
    path = path.replace('.html', `.${format}.html`);
    if (fs.existsSync(path)) {
      return true;
    }

    return false;
  }

  /**
   * Filters the given pages by the formats defined in data-available-formats
   *
   * @param  {Array} ...pages
   * @return {Array}
   */
  _filterPages(...pages) {
    const filteredPages = [];
    for (const page of pages) {
      const html = page.contents.toString();
      const manualFormat = this._isManuallyFiltered(page);
      if (manualFormat) {
        const filteredHtml = this.filterHtml(html, manualFormat, true);
        page.contents = Buffer.from(filteredHtml);
        continue;
      }

      for (const format of FORMATS) {
        if (this._hasManualFiltered(page, format)) {
          continue;
        }

        const filteredHtml = this.filterHtml(html, format);
        if (filteredHtml) {
          const filteredPage = page.clone();
          filteredPage.contents = Buffer.from(filteredHtml);

          // As websites is the default those files can be overwritten and
          // don't need an extra name
          if (format !== 'websites') {
            const suffix = filteredPage.basename.endsWith('.amp.html') ? '.amp.html' : '.html';
            filteredPage.basename = filteredPage.basename.replace(suffix, `.${format}${suffix}`);
          }

          filteredPages.push(filteredPage);
        }
      }
    }

    return filteredPages;
  }

  /**
   * @param  {String} html
   * @return {String}
   */
  filterHtml(html, format, force) {
    const dom = cheerio.load(html);
    if (!filterPage(format, dom, force)) {
      return;
    }

    return htmlContent(dom);
  }

  async optimize(html) {
    return this._optimizer.transformHtml(html);
  }

  /**
   * Extracts the contents of a Vinyl file and passes the string on
   * to other minifying functions
   * @param  {String} The page's markup
   * @return {String} The minified or the unmodified markup in case of error
   */
  minifyPage(html, path) {
    html = this._cleanHtml(html);

    try {
      html = this._minifyHtml(html);
    } catch (e) {
      this._log.error(`Could not minify ${path}`);
      // TODO(matthiasrohmer): Reenable console.error(e) somehow for development
    }

    if (!path.match(SELECTOR_REWRITE_EXCLUDED_PATHS)) {
      try {
        html = this._rewriteSelectors(html);
      } catch (e) {
        this._log.warn(`Could not rewrite selectors for ${path}`);
        console.error(e);
      }
    }

    return html;
  }

  /**
   * Minifies the used CSS selectors to hashes
   * @param  {String} html
   * @return {String}
   */
  _rewriteSelectors(html) {
    const AMP_CUSTOM_STYLE_PATTERN = /<style amp-custom>.*?<\/style>/ms;
    let css = html.match(AMP_CUSTOM_STYLE_PATTERN);

    if (css) {
      css = css[0].replace(/<style amp-custom>|<\/style>/g, '');

      rcs.fillLibraries(css, {
        'prefix': '-',
      });
      return rcs.replace.html(html);
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
      'collapseBooleanAttributes': true,
      'ignoreCustomFragments': [/<use.*<\/use>/],
      'processScripts': ['application/json'],
    });

    return html;
  }

  _minifyCss(css, type) {
    // Leave alone inline styles and the AMP boilerplate
    if (type == 'inline' || css.includes('body{-webkit-')) {
      return css;
    }

    // Do not cache styles during development
    if (config.isDevMode()) {
      return this._cleanCss.minify(css).styles;
    }

    // Hash it to check if that bundle has already been minified
    let hash = crypto.createHash('sha1');
    hash.update(css);
    hash = hash.digest('base64');

    if (!this._minifiedCssCache[hash]) {
      this._minifiedCssCache[hash] = this._cleanCss.minify(css).styles;
    }

    return this._minifiedCssCache[hash];
  }
}

if (!module.parent) {
  (async () => {
    const pageTransformer = new PageTransformer();
    const stream = pageTransformer.start(__dirname + '/../../pages');
    stream.on('end', () => {
      pageTransformer._log.success('Transformed pages.');
      pageTransformer.done();
    });
  })();
}

module.exports = {
  pageTransformer: new PageTransformer(),
};
