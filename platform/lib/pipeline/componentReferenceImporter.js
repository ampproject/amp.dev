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

// By default, reference docs are imported from the latest release tag.
// If a doc is broken in a release, add it to this this list to fetch from master instead.
//
// DON'T FORGET TO REMOVE ONCE IT'S FIXED
const DOCS_TO_FETCH_FROM_MASTER = ['amp-next-page'];
const DEFAULT_VERSION = 0.1;

const {GitHubImporter, DEFAULT_REPOSITORY} = require('./gitHubImporter');
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

    // As inside /extensions each component has its own folder, filter
    // down by directory
    extensions = extensions[0].filter((doc) => doc.type === 'dir');

    // Add built-in components to list to fetch them all in one go
    for (const builtInExtension of BUILT_INS) {
      extensions.push({'name': builtInExtension, 'path': BUILT_IN_PATH});
    }

    // Keep track of all promises to complete function
    const savedDocuments = [];

    for (const extension of extensions) {
      const documents = await this._findExtensionDocs(extension);
      const versions = [...new Set(documents.map((doc) => doc.version).sort().reverse())];

      if (!documents.length) {
        log.warn(`No matching document for component: ${extension.name}`);
      } else {
        documents.forEach((doc) => {
          // TODO: importUrl
          this._setMetadata(
              doc.tagName || extension.name, doc.document, doc.version, versions);
          this._rewriteRelativePaths(extension.path, doc.document);
          savedDocuments.push(
              this._saveDocument(doc.tagName || extension.name, doc.document, doc.version));
        });
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
  _setMetadata(extensionName, document, version, versions) {
    // Ensure that the document has a TOC
    document.toc = true;
    document.importURL = document.path;

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

    if (version) {
      document.version = version;

      // only show multiple versions in the UI when there are multiple.
      if (versions.length > 1) {
        document.versions = versions;
      }

      // when this doc is the highest current version, use it as default entry point
      if ((versions[0] || DEFAULT_VERSION) === version) {
        document.isCurrent = true;
        document.servingPath = '/documentation/components/{slug}.html';
      }
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
  _saveDocument(extensionName, document, version) {
    // Set the documents title
    document.title = extensionName;
    const documentPath = `${DESTINATION_BASE_PATH}/${extensionName}-v${version}.md`;

    return document.save(documentPath);
  }

  /**
   * Parses tag names from ProtoAscii file.
   * @param {*} extension
   * @param {*} master
   * @return {Promise} Array of tags
   */
  async _getTagsViaProtoAscii(extension, files, master) {
    // there are cases where an extension doesn't have a protoascii
    // (I'm looking at you, a4a!), so we'll need to double check
    const fileName = 'validator-' + extension.name + '.protoascii';
    const hasProtoAscii = files.map((file) => file.name).includes(fileName);
    if (!hasProtoAscii) {
      return new Set([extension.name]);
    }

    const protoAscii = await this.githubImporter_.fetchFile(
        extension.path + '/' + fileName,
        DEFAULT_REPOSITORY, master);

    const tags = new Set(
        protoAscii.match(/tag_name\: \"([^\"]+)\"/g).map(
            (str) => str.match(/\"([^\"]+)\"/)[1].toLowerCase()));

    tags.delete('script');
    tags.delete('$reference-point');

    return tags;
  }

  /**
   * Checks a specific extension/component for documents
   * @return {Promise} [description]
   */
  async _findExtensionDocs(extension, proto) {
    let documents = [];
    let files = await this.githubImporter_.fetchJson(extension.path);
    files = files[0];

    const highestVersion = (files
        .filter((file) => !isNaN(parseFloat(file.name)))
        .map((file) => parseFloat(file.name))
        .sort()
        .reverse())[0] || DEFAULT_VERSION;

    // some components are broken on current releases and need to be imported from master
    const master = DOCS_TO_FETCH_FROM_MASTER.includes(extension.name);
    if (master) {
      log.warn(`Importing ${extension.name} from master`);
    }

    // some extensions create multiple tags/custom elements, and each could have a
    // standalone doc in the folder, so find out which they are
    const protoAscii = proto || await this._getTagsViaProtoAscii(extension, files, master);

    // Find the Markdown document that is named like the extension
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === 'file') {
        const tagName = file.name.replace('.md', '');
        if (protoAscii.has(tagName)) { // imported docs must correspond to a tag defined in the protoascii
          const documentPath = file.path;
          const versionMatch = file.path.match(/\/([\d\.]+)/);
          documents.push({
            document: await this.githubImporter_
                .fetchDocument(documentPath, DEFAULT_REPOSITORY, master),
            version: versionMatch ? parseFloat(versionMatch[1]) : highestVersion,
            tagName: tagName,
          });
        }
      } else {
        if (!isNaN(parseFloat(file.name))) {
          // Look into the version folder for documents
          file.name = extension.name;
          documents = documents.concat(await this._findExtensionDocs(file, protoAscii));
        }
      }
    }

    return documents;
  }
}

// If not required, run directly
if (!module.parent) {
  const importer = new ComponentReferenceImporter();
  importer.import().catch((err) => console.log(err));
}

module.exports = ComponentReferenceImporter;
