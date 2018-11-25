#!/usr/bin/env node
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

const octonode = require('octonode');
const fs = require('fs');
const path = require('path');
const request = require('request');
const { Signale } = require('signale');

const config = require('../../config');
const Document = require('./document');

const CLIENT_TOKEN = process.env.AMP_DOC_TOKEN;
const CLIENT_SECRET = process.argv[2] || process.env.AMP_DOC_SECRET;
const CLIENT_ID = process.argv[3] || process.env.AMP_DOC_ID;
// TODO: Make it possible to pass in a local repository path with argv
const LOCAL_AMPHTML_REPOSITORY = false;

class ReferenceImporter {

  constructor() {
    this._log = new Signale({
      'interactive': true,
      'scope': 'Reference import'
    });

    if (!(CLIENT_TOKEN || (CLIENT_SECRET && CLIENT_ID))) {
      this._log.fatal('Please provide either a GitHub personal access token (AMP_DOC_TOKEN) or GitHub application id/secret (AMP_DOC_ID and AMP_DOC_SECRET). See README.md for more information.');

      throw 'Error: No GitHub credentials provided.';
    }
  }

  async initialize() {
    this._github = octonode.client(CLIENT_TOKEN || {
       'id': CLIENT_ID,
       'secret': CLIENT_SECRET
     });

    this._repository = this._github.repo('ampproject/amphtml');
    this._latestReleaseTag = await this._fetchLatestReleaseTag();
  }

  _fetchLatestReleaseTag() {
    this._log.await('Fetching latest release tag ...');

    return new Promise((resolve, reject) => {
      this._github.get('/repos/ampproject/amphtml/releases/latest', {}, (err, status, body) => {
        if (body.tag_name) {
          resolve(body.tag_name);
        } else {
          this._log.fatal('Was not able to retrieve latest AMP release from GitHub.');
          reject(err);
        }
      });
    }).then((latestReleaseTag) => {
      this._log.success(`Fetched latest release tag: ${latestReleaseTag}`);
      return latestReleaseTag;
    }).catch((err) => {
      this._log.fatal(err);
      return null;
    });
  }

  async import() {
    this._log.start('Beginning to import extension docs ...');
    await this._importExtensionsDocs();
  }

  /**
   * Collects all needed documents from across the repository that should
   * be downloaded and put into collections
   * @return {[type]} [description]
   */
  async _importExtensionsDocs() {
    // Gives the contents of ampproject/amphtml/extensions
    let extensions = await this._repository.contentsAsync('extensions', this._latestReleaseTag);

    // As inside /extensions each component has its own folder filter
    // down by directory
    extensions = extensions[0].filter((doc) => doc.type === 'dir');

    let documents = []
    for (const extension of extensions) {
      let document = await this._findExtensionDoc(extension);
      if (document) {
        this._log.await(`No matching document for component: ${extension.name}`);
        console.log(`Found document for ${extension.name}`, document._path, document._title);
      }
    }
  }

  /**
   * Checks a specific extension/component for documents
   * @return {Promise} [description]
   */
  async _findExtensionDoc(extension) {
    let files = await this._repository.contentsAsync(extension.path, this._latestReleaseTag);
    files = files[0];

    // Find the Markdown document that is named like the extension
    let documentPath = '';
    for (var i = 0; i < files.length; i++) {
      if(files[i].type === 'file' && files[i].name === extension.name + '.md') {
        documentPath = files[i].path;
        break;
      }
    }

    if (!documentPath) {
      this._log.warn(`No matching document for component: ${extension.name}`);
      return;
    }

    return this._fetchDocument(documentPath);
  }

  /**
   * Downloads a path/document from GitHub and returns its contents
   * @param  {String} path Path to the file
   * @return {Document}    A document object containing all information
   */
  _fetchDocument(path) {
    // TODO: This could be a module level function as it will be needed
    // by other importers
    return new Promise((resolve) => {
      let process = (function (err, data) {
        if (err) {
          this._log.fatal(`Error while downloading ${path}`, err);
          throw err;
        }

        if (data && data.content !== undefined && !data.content.length) {
          this._log.info(`${path} is empty. Skipping ...`);
          return;
        }

        let contents = new Buffer(data.content || data, 'base64');
        contents = contents.toString();

        let relativePath = path.substr(0, path.lastIndexOf('/'));

        let title = contents.match(/^#{1}\s.+<\/a>\s(.+)/m);
        title = title ? title[1].replace(/`/g, '') : null;

        resolve(new Document(relativePath, title, contents));
      }).bind(this);

      if (LOCAL_AMPHTML_REPOSITORY) {
        fs.readFile(path.resolve(LOCAL_AMPHTML_REPOSITORY, path), process);
      } else {
        this._repository.contents(path, this._latestReleaseTag, process);
      }
    });
  }
}

module.exports = ReferenceImporter;
