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

const fs = require('fs');
const path = require('path');
const { Signale } = require('signale');

const config = require('../config');
const GitHubImporter = require('./gitHubImporter');
const Document = require('./markdownDocument');

// Where to save the documents to
const DESTINATION_BASE_PATH = __dirname + '/../../../pages/content/amp-dev/';

class SpecImporter extends GitHubImporter {

  async import() {
    this._log.start('Beginning to import spec docs ...');
    await this._importSpecDocs();
  }

  /**
   * Collects all needed documents from across the repository that should
   * be downloaded and put into collections
   * @return {undefined}
   */
  async _importSpecDocs() {
    let importDocs = require(__dirname + '/../../config/imports/spec.json');
    let importedDocs = [];
    for (let importDoc of importDocs) {
      let doc = await this._fetchDocument(importDoc.from)

      if(!doc) {
        this._log.warn(`Fetching for '${importDoc.title}' failed.`);
        continue;
      }

      doc.path = path.join(DESTINATION_BASE_PATH, importDoc.to);
      doc.title = importDoc.title;
      doc.order = importDoc.order;
      doc.toc = importDoc.toc;

      importDocs.push(doc.save().then(() => {
        this._log.success(`Saved '${importDoc.title}' to ${importDoc.to}`);
      }));
    }

    return Promise.all(importedDocs);
  }
}

// If not required, run directly
if (!module.parent) {
  let importer = new SpecImporter();

  (async () => {
    await importer.initialize();
    await importer.import();
  })();
}

module.exports = SpecImporter;
