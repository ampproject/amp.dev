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

require('module-alias/register');
const {Signale} = require('signale');
const gulp = require('gulp');
const through = require('through2');
const path = require('path');

// Where to look for existing documents
const POD_BASE_PATH = path.join(__dirname, '../../../pages/');
// Which documents to check for broken references
const PAGES_SRC = POD_BASE_PATH +
    'content/amp-dev/documentation/components/*/*.md';
const TRANSLATION_SRC = POD_BASE_PATH +
    'content/amp-dev/documentation/components/*/*@*.md';

/**
 * Walks over documents inside the Grow pod and looks for broken links either
 * in a syntax like `g.doc('...')` or []() and checks if the linked document
 * exists at the pointed path and tries to adjust the path if not
 */
class TranslationAnchorGenerator {
  constructor() {
    this._log = new Signale({
      'scope': 'Reference checker',
    });

    this._anchorsByPage = {};
  }

  async start() {
    this._log.start(`Inspecting documents in ${PAGES_SRC} headlines ...`);

    return new Promise((resolve, reject) => {
      let stream = gulp.src([PAGES_SRC, '!' + TRANSLATION_SRC], {'read': true, 'base': './'});
      stream.on('end', () => {
        let stream2 = gulp.src(TRANSLATION_SRC, {'read': true, 'base': './'});
        stream2.on('end', () => {
          resolve();
        });
        stream2 = stream2.pipe(through.obj((doc, encoding, callback) => {
          stream2.push(this._addAnchors(doc, callback));
          callback();
        }));
        stream2.pipe(gulp.dest('./'));
      });
      stream = stream.pipe(through.obj((doc, encoding, callback) => {
        (this._getAnchors(doc, callback));
        callback();
      }));
      // stream.pipe(gulp.dest('./'));
    });
  }

  /**
   * @param  {Vinyl} doc The document from the pod
   * @return {Vinyl}     The document with updated references
   */
  _getAnchors(doc) {
    const array = [];
    const content = doc.contents.toString();
    const TITLE_PATTERN = /^#+[ \t]*.*?(?:<a[ \t]+name="(.+?)")?(?:.(?!<a[ \t]+name))*?$/mg;

    const matches = content.matchAll(TITLE_PATTERN);

    for (const match of matches) {
      if (doc.path.includes('pages/content/amp-dev/documentation/components/reference/amp-analytics-v0.1.md'))
        console.log(array.length + ': ' + match[0] + doc.path);
      array.push(match[1] ? match[1] : '');
    }
    this._anchorsByPage[doc.path]=array;

    doc.contents = Buffer.from(content);
    return doc;
  }

  /**
   * @param  {Vinyl} doc The document from the pod
   * @return {Vinyl}     The document with updated references
   */
  _addAnchors(doc) {
    let headlineCounter = 0;
    let content = doc.contents.toString();
    const name = doc.path.substring(0, doc.path.indexOf('@')) + '.md';
    this._log.info('### _addAnchors ' + name);
    const array = this._anchorsByPage[name];
    const TRANSLATED_TITLE_PATTERN =
        /^(#+[ \t]*.*?)(?:<a[ \t]+name=[^>]*><\/a>)?((?:.(?!<a[ \t]+name))*?)$/mg;
    content = content.replace(TRANSLATED_TITLE_PATTERN, (line, beforeA, afterA) => {
      const slug = array[headlineCounter];
      headlineCounter++;
      if (slug) {
        return `${beforeA}${afterA}`.trim() + ` <a name="${slug}"></a>`;
      }
      return line;
    });

    if (headlineCounter == array.length) {
      doc.contents = Buffer.from(content);
    } else {
      this._log.warn('different amount of headlines '+ headlineCounter + '/'+ array.length +' in ' + doc.path);
    }
    return doc;
  }
}

// If not required, run directly
if (!module.parent) {
  (async () => {
    const referenceChecker = new TranslationAnchorGenerator();
    try {
      await referenceChecker.start();
    } catch (err) {
      process.exit(1);
    }
  })();
}

module.exports = new TranslationAnchorGenerator();
