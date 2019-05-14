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
const through = require('through2');
const search = require('recursive-search');
const path = require('path');
const fs = require('fs');

// Where to look for existing documents
const POD_BASE_PATH = path.join(__dirname, '../../../pages/');
// Which documents to check for broken references
const PAGES_SRC = POD_BASE_PATH + 'content/amp-dev/documentation/**/*.{md,html}';
// The location to search for documents in
const PAGES_BASE_PATH = POD_BASE_PATH + 'content/amp-dev/documentation';
// The pattern used by Grow to make up references
const REFERENCE_PATTERN = /g.doc\('(.*?)'/g;
// Contains manual hints for double filenames etc.
/* eslint-disable max-len */
const LOOKUP_TABLE = {
  '/content/amp-dev/documentation/guides-and-tutorials/learn/validate.md': '/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/index.md',
  '/content/amp-dev/documentation/guides-and-tutorials/learn/how_cached.md':
  '/content/amp-dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/index.md',
  '/content/amp-dev/documentation/guides-and-tutorials/develop/media_iframes_3p/amp_replacements.md':
  '/content/amp-dev/documentation/guides-and-tutorials/develop/media_iframes_3p/index.md',
  '/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/index.md':
  '/content/amp-dev/documentation/guides-and-tutorials/integrate/amp-in-pwa.md',
  '/content/amp-dev/documentation/guides-and-tutorials/learn/spec/index.md': '/content/amp-dev/documentation/guides-and-tutorials/learn/spec/amphtml.md',
};
/* eslint-enable max-len */

/**
 * Walks over documents inside the Grow pod and looks for broken links either
 * in a syntax like `g.doc('...')` or []() and checks if the linked document
 * exists at the pointed path and tries to adjust the path if not
 */
class GrowReferenceChecker {
  constructor() {
    this._log = new Signale({
      'scope': 'Reference checker',
    });

    // Keeps track of documents that could not be found and therefore need
    // to be fixed manually
    this._unfindableDocuments = [];

    // Stores paths that could have multiple new destinations
    this._multipleMatches = {};

    // Holds the number of links that where corrupt
    this._brokenReferencesCount = 0;
  }

  async start() {
    this._log.start(`Inspecting documents in ${PAGES_SRC} for broken references ...`);

    return new Promise((resolve, reject) => {
      let stream = gulp.src(PAGES_SRC, {'read': true, 'base': './'});

      stream = stream.pipe(through.obj((doc, encoding, callback) => {
        stream.push(this._check(doc, callback));
        callback();
      }));

      stream.pipe(gulp.dest('./'));

      stream.on('end', () => {
        if (Object.keys(this._multipleMatches).length == 0
            && this._unfindableDocuments.length == 0) {
          this._log.success('All references intact!');
          resolve();
          return;
        }

        this._log.complete('Finished automatic fixing.');
        this._log.complete(`A total of ${this._brokenReferencesCount} had ` +
          `errors. ${this._unfindableDocuments.length +
           Object.keys(this._multipleMatches).length}` + 'still have.');

        if (this._unfindableDocuments.length) {
          this._log.info(`Could not automatically fix ${this._unfindableDocuments.length} ` +
            'as there wasn\'t any document with a matching basename:');
          for (const documentPath of this._unfindableDocuments) {
            this._log.pending(`- ${documentPath}`);
          }
        }

        this._log.info('');

        const multipleMatchesCount = Object.keys(this._multipleMatches).length;
        if (multipleMatchesCount !== 0) {
          this._log.info(`Encountered multiple possible matches for ${multipleMatchesCount} ` +
          'documents:');
          for (const documentPath in this._multipleMatches) {
            if (Object.prototype.hasOwnProperty.call(this._multipleMatches, documentPath)) {
              this._log.pending(`${documentPath}`);
              for (const possibleMatch of this._multipleMatches[documentPath]) {
                this._log.pending(`-- ${possibleMatch.replace(POD_BASE_PATH, '/')}`);
              }
            }
          }
        }

        if (this._unfindableDocuments.length > 0) {
          reject(new Error(`${this._unfindableDocuments.length} documents with broken links`));
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Inspects various reference patterns and tries to find the matching file
   * inside of the Grow pod
   * @param  {Vinyl} doc The document from the pod
   * @return {Vinyl}     The document with updated references
   */
  _check(doc) {
    let content = doc.contents.toString();
    content = content.replace(REFERENCE_PATTERN, (match, path) => {
      const newPath = this._verifyReference(path);
      return match.replace(path, newPath);
    });

    doc.contents = Buffer.from(content);
    return doc;
  }

  /**
   * Tries to find a given path inside the pod
   * @param  {String} path
   * @return {String}      The either untouched or adjusted path
   */
  _verifyReference(documentPath) {
    if (fs.existsSync(POD_BASE_PATH + documentPath)) {
      return documentPath;
    }

    this._brokenReferencesCount++;

    // Fail early if the path is already known to be broken
    if (this._unfindableDocuments.includes(documentPath)) {
      return documentPath;
    }

    // Check if there is a manual match for the path in the lookup table
    const lookedUpPath = LOOKUP_TABLE[documentPath.replace(POD_BASE_PATH, '/')];
    if (lookedUpPath) {
      return lookedUpPath;
    }

    const basename = path.basename(documentPath);
    const results = search.recursiveSearchSync(
        new RegExp(basename, 'i'), PAGES_BASE_PATH);

    // If there is more than one match store all matches for the user to
    // do the manual fixing
    if (results.length > 1) {
      this._log.error(`More than one possible match for ${documentPath}. Needs manual fixing.`);
      this._multipleMatches[documentPath] = results;
      return documentPath;
    } else if (results.length == 0) {
      // If the reference was pointing to an HTML document look if there is
      // a matching markdown document
      if (basename.indexOf('.html') !== -1) {
        documentPath = documentPath.replace(path.extname(documentPath), '.md');
        return this._verifyReference(documentPath);
      }

      this._log.error(`No matching document found for ${documentPath}. Needs manual fixing.`);
      if (this._unfindableDocuments.indexOf(documentPath) == -1) {
        this._unfindableDocuments.push(documentPath);
      }
      return documentPath;
    }

    const newPath = results[0].replace(POD_BASE_PATH, '/');

    return newPath;
  }
}

// If not required, run directly
if (!module.parent) {
  (async () => {
    const referenceChecker = new GrowReferenceChecker();
    try {
      await referenceChecker.start();
    } catch (err) {
      process.exit(1);
    }
  })();
}

module.exports = GrowReferenceChecker;
