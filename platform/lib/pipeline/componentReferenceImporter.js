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

const {GitHubImporter} = require('./gitHubImporter');
const categories = require(__dirname + '/../../config/imports/componentCategories.json');
const formats = require(__dirname + '/../../config/imports/componentFormats.json');

const {Signale} = require('signale');

const log = new Signale({
  'interactive': false,
  'scope': 'GitHub Importer',
});

// Where to save the documents/collection to
const DESTINATION_BASE_PATH =
  __dirname + '/../../../pages/content/amp-dev/documentation/components/reference';
// Names of the built-in components that need to be fetched from ...
const BUILT_INS = ['amp-img', 'amp-pixel', 'amp-layout'];
// ... this path
const BUILT_IN_PATH = 'builtins';

class ComponentReferenceImporter {
  constructor(githubImporter=new GitHubImporter()) {
    this.githubImporter_ = githubImporter;
  }

  import() {
    log.start('Beginning to import extension docs ...');
    return this._importExtensionsDocs();
  }

  /**
   * Collects all needed documents from across the repository that should
   * be downloaded and put into collections
   * @return {undefined}
   */
  async _importExtensionsDocs() {
    // Gives the contents of ampproject/amphtml/extensions
    let extensions = await this.githubImporter_.fetchJson('extensions');

    // As inside /extensions each component has its own folder filter
    // down by directory
    extensions = extensions[0].filter((doc) => doc.type === 'dir');

    // Add built-in components to list to fetch them all in one go
    for (const builtInExtension of BUILT_INS) {
      extensions.push({'name': builtInExtension, 'path': BUILT_IN_PATH});
    }

    // Keep track of all saved documents (as promises) to complete function
    const savedDocuments = [];
    for (const extension of extensions) {
      const document = await this._findExtensionDoc(extension);

      if (!document) {
        log.warn(`No matching document for component: ${extension.name}`);
      } else {
        document.importURL = `${extension.html_url}/${extension.name}.md`;
        this._setMetadata(extension.name, document);
        this._rewriteRelativePaths(extension.path, document);

        savedDocuments.push(this._saveDocument(extension.name, document));
      }
    }

    return Promise.all(savedDocuments);
  }

  /**
   * Rewrites possible relatively linked documents to a fully specified
   * GitHub URL
   * @param {MarkdownDocument} document
   */
  _rewriteRelativePaths(extensionPath, document) {
    const relativeBase = 'https://github.com/ampproject/amphtml' +
        `/blob/master/${extensionPath}`;
    document.rewriteRelativePaths(relativeBase);
  }

  /**
   * Set metadata that is required for the teaser
   * @param {MarkdownDocument} document
   */
  _setMetadata(extensionName, document) {
    // Ensure that the document has a TOC
    document.toc = true;

    // Only try to add meta information (category, format teaser text)
    // if the document hasn't defined them in their frontmatter already
    if (!document.teaser.text) {
      document.teaser = {'text': this._parseTeaserText(document)};
    }

    if (!document.category) {
      document.category = categories[extensionName];
    }

    if (!document.formats) {
      document.formats = formats[extensionName];
    }
  }

  /**
   * Tries to parse the first or second paragraph of the imported document
   * to use as a teaser text
   * @param  {MarkdownDocument} document
   * @return {String}           The teaser text
   */
  _parseTeaserText(document) {
    // Splice out an excerpt to show in the teaser ...
    const FIRST_PARAGRAPH = /#.*$\n+(?!<table>)(.*)$/gm;
    let excerpt = FIRST_PARAGRAPH.exec(document.contents);
    if (excerpt == null || !excerpt[1].trim()) {
      const SECOND_PARAGRAPH = /##.*$\n+((.|\n(?=\w))*)$/gm;
      excerpt = SECOND_PARAGRAPH.exec(document.contents);
    }

    // If the extraction of an excerpt was successful write it to the teaser
    if (excerpt) {
      // Strip out all possible HTML tags
      excerpt = excerpt[1].replace(/<\/?[^>]+(>|$)/g, '');
      // Unwrap back ticks
      excerpt = excerpt.replace(/`(.+)`/g, '$1');
      // And unwrap possible markdown links
      excerpt = excerpt.replace(/\[(.+)\]\(.+\)/g, '$1');
    }

    return excerpt;
  }

  /**
   * Builds the destination path from the document's file name and
   * @param  {Document} document The component's reference
   * @return {undefined}
   */
  _saveDocument(extensionName, document) {
    // Set the documents title
    document.title = extensionName;
    const documentPath = `${DESTINATION_BASE_PATH}/${extensionName}.md`;

    return document.save(documentPath);
  }

  /**
   * Checks a specific extension/component for documents
   * @return {Promise} [description]
   */
  async _findExtensionDoc(extension) {
    let files = await this.githubImporter_.fetchJson(extension.path);
    files = files[0];

    // Find the Markdown document that is named like the extension
    let documentPath = '';
    for (let i = 0; i < files.length; i++) {
      if (files[i].type === 'file' && files[i].name === extension.name + '.md') {
        documentPath = files[i].path;
        break;
      }
    }

    if (!documentPath) {
      return;
    }

    return this.githubImporter_.fetchDocument(documentPath);
  }
}

// If not required, run directly
if (!module.parent) {
  const importer = new ComponentReferenceImporter();
  importer.import().catch((err) => console.log(err));
}

module.exports = ComponentReferenceImporter;
