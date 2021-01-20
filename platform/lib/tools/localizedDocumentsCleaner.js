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
const log = require('@lib/utils/log')('Localized Documents Cleaner');
const gulp = require('gulp');
const through = require('through2');
const path = require('path');

// Where to look for existing documents
const POD_BASE_PATH = path.join(__dirname, '../../../pages/');

// Which documents to check for broken references
// eslint-disable-next-line max-len
const PAGES_SRC = POD_BASE_PATH + 'content/amp-dev/**/*@*.md';

class LocalizedDocumentsCleaner {
  constructor() {}

  async start() {
    log.start(`Inspecting documents in ${PAGES_SRC} ...`);

    return new Promise((resolve, reject) => {
      let stream = gulp.src(PAGES_SRC, {'read': true, 'base': './'});
      stream = stream.pipe(
        through.obj((doc, encoding, callback) => {
          stream.push(this._clean(doc));
          callback();
        })
      );

      stream.pipe(gulp.dest('./'));
      stream.on('end', () => {
        log.complete('Done!');

        resolve();
      });
    });
  }

  _clean(doc) {
    let content = doc.contents.toString();

    content = content.replace(/\nformats:\s*(\n- .*)+/m, '');

    doc.contents = Buffer.from(content);
    return doc;
  }
}

// If not required, run directly
if (!module.parent) {
  const localizedDocumentsCleaner = new LocalizedDocumentsCleaner();
  localizedDocumentsCleaner.start();
}

module.exports = LocalizedDocumentsCleaner;
