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

const path = require('path');
const project = require('@lib/utils/project');

const MarkdownDocument = require('@lib/pipeline/markdownDocument');
const {GitHubImporter, log} = require('@lib/pipeline/gitHubImporter');

const DESTINATION_BASE_PATH = project.absolute('pages');

// Where to save the document that embeds the source to
const EMBED_POD_PATH = 'content/amp-dev';

// Where to save the source of the document to
const SOURCE_POD_PATH = 'shared/imports';

class SpecImporter {
  constructor(githubImporter = new GitHubImporter()) {
    this.githubImporter_ = githubImporter;
  }

  import() {
    log.start('Beginning to import spec docs ...');
    return this._importSpecDocs();
  }

  /**
   * Collects all needed documents from across the repository that should
   * be downloaded and put into collections
   * @return {undefined}
   */
  async _importSpecDocs() {
    const importDocs = require(__dirname + '/../../config/imports/spec.json');
    const importedDocs = [];
    for (const importDoc of importDocs) {
      try {
        const doc = await this.githubImporter_.fetchDocument(importDoc.from, importDoc.repo, true);
        doc.path = path.join(DESTINATION_BASE_PATH, SOURCE_POD_PATH, importDoc.to);

        // Remove the double heading and rewrite relative links
        doc.stripInlineTitle();

        const baseURL = `https://github.com/${importDoc.repo}/blob/master/`;
        const relativeBase = `${baseURL}${path.dirname(importDoc.from)}`;
        doc.rewriteRelativePaths(relativeBase);
        importedDocs.push(doc.save(undefined, true));

        // Create a second docment that's embedding the one created priorly
        const embedDoc = new MarkdownDocument(
            path.join(DESTINATION_BASE_PATH, EMBED_POD_PATH, importDoc.to),
            `[include('${path.join(SOURCE_POD_PATH, importDoc.to)}')]`
        );
        embedDoc.path = path.join(DESTINATION_BASE_PATH, EMBED_POD_PATH, importDoc.to);
        embedDoc.title = importDoc.title;
        embedDoc.order = importDoc.order;
        embedDoc.toc = importDoc.toc;
        embedDoc.formats = importDoc.formats;

        // Add a hint where to finde the original document
        embedDoc.importURL = baseURL + importDoc.from;

        importedDocs.push(embedDoc.save());
      } catch (err) {
        log.warn(`Fetching for '${importDoc.title}' failed.`, err);
        continue;
      }
    }

    return Promise.all(importedDocs);
  }
}

// If not required, run directly
if (!module.parent) {
  const importer = new SpecImporter();

  (async () => {
    await importer.import();
  })();
}

module.exports = SpecImporter;
