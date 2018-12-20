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

const { Signale } = require('signale');
const gulp = require('gulp');
const through = require('through2');
const search = require('recursive-search');
const path = require('path');
const fs = require('fs');

const POD_BASE_PATH = '../../../pages/';
// The location to search for documents in
const PAGES_BASE_PATH = POD_BASE_PATH + 'content/amp-dev/documentation/guides-and-tutorials';
// Which documents to check for broken references
const PAGES_SRC = POD_BASE_PATH + 'content/amp-dev/documentation/guides-and-tutorials/**/*.md';
// The pattern used by Grow to make up references
const REFERENCE_PATTERN = /g.doc\('(.*?)'/;
// Contains manual hints for double filenames etc.
const LOOKUP_TABLE = {
  '/content/docs/interaction_dynamic/login_requiring.md': '/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/index.md',
  '/content/docs/ads/ads_vendors.html': '/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md',
  '/content/docs/ads/a4a_spec.html': '/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/a4a_spec.md',
  '/content/amp-dev/documentation/guides-and-tutorials/optimize-and-measure/discovery.html': '/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md',
  '/content/amp-dev/documentation/guides-and-tutorials/start/converting/converting.md': '/content/amp-dev/documentation/guides-and-tutorials/start/converting/index.md'
};

/**
 * Walks over documents inside the Grow pod and looks for broken links either
 * in a syntax like `g.doc('...')` or []() and checks if the linked document
 * exists at the pointed path and tries to adjust the path if not
 */
class GrowReferenceChecker {

  constructor() {
    this._log = new Signale({
      'scope': 'Reference checker'
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

      stream = stream.pipe(through.obj((function(doc, encoding, callback) {
        this._log.await(`Checking ${doc.relative} ...`);
        this._log.config({'interactive': true});
        stream.push(this._check(doc));
        this._log.config({'interactive': false});
        callback();
      }).bind(this)));

      stream.pipe(gulp.dest('./'));

      stream.on('end', () => {
        this._log.complete(`Finished fixing. A total of ${this._brokenReferencesCount} had errors. ${this._unfindableDocuments.length + Object.keys(this._multipleMatches).length} still have.`);

        if (this._unfindableDocuments.length) {
          this._log.info(`Could not automatically fix ${this._unfindableDocuments.length} as there wasn't any document with a matching basename:`);
          for (let documentPath of this._unfindableDocuments) {
            this._log.pending(`- ${documentPath}`);
          }
        }

        this._log.info('\n');

        if (this._multipleMatches.length) {
          this._log.info(`Encountered multiple possible matches for ${this._multipleMatches.length} documents:`);
          for (let documentPath in this._multipleMatches) {
            this._log.pending(`- ${documentPath}`);
            for (let possibleMatch of this._multipleMatches[documentPath]) {
              this._log.pending(`--- ${possibleMatch}`);
            }
          }
        }

        resolve();
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
    content = content.replace(REFERENCE_PATTERN, (match, path, offset, input) => {
      let newPath = this._verifyReference(path);
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
    this._log.await(`Checking if ${documentPath} exists ...`);
    if (fs.existsSync(PAGES_BASE_PATH + documentPath)) {
      this._log.success(`Document ${documentPath} exists.`);
      return documentPath;
    }

    this._brokenReferencesCount++;

    this._log.warn(`No document found for ${documentPath}`);
    this._log.info(`Trying to resolve new location from lookup table ...`);
    let lookedUpPath = LOOKUP_TABLE[documentPath.replace(POD_BASE_PATH, '/')]
    if (lookedUpPath) {
      this._log.success(`Found new path in lookup table: ${lookedUpPath}`);
      return lookedUpPath;
    }

    let basename = path.basename(documentPath);
    this._log.info(`Trying to find new destination by basename ${basename}`);
    let results = search.recursiveSearchSync(basename, PAGES_BASE_PATH);
    if (results.length > 1) {
      this._log.error(`More than one possible match. Needs manual fixing.`);
      this._multipleMatches[documentPath] = results;
      return documentPath;
    } else if (results.length == 0) {
      this._log.error(`No matching document found. Needs manual fixing.`);
      if (this._unfindableDocuments.indexOf(documentPath) == -1) {
        this._unfindableDocuments.push(documentPath);
      }
      return documentPath;
    }

    let newPath = results[0].replace(POD_BASE_PATH, '/');
    this._log.success(`Found new location of document: ${newPath}`);

    return newPath;
  }

}

let referenceChecker = new GrowReferenceChecker();
referenceChecker.start();


module.exports = GrowReferenceChecker;
