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
const { Signale } = require('signale');

const config = require('../config');
const Document = require('./markdownDocument');

// TODO: Eventually make it possible to pass these in as a) command line args
// or inside of config aswell
const CLIENT_TOKEN = process.env.AMP_DOC_TOKEN;
const CLIENT_SECRET = process.argv[2] || process.env.AMP_DOC_SECRET;
const CLIENT_ID = process.argv[3] || process.env.AMP_DOC_ID;
// TODO: Make it possible to pass in a local repository path with argv
const LOCAL_AMPHTML_REPOSITORY = false;

class GitHubImporter {

  constructor() {
    this._log = new Signale({
      'interactive': true,
      'scope': 'GitHub Importer'
    });

    if (!(CLIENT_TOKEN || (CLIENT_SECRET && CLIENT_ID))) {
      this._log.fatal('Please provide either a GitHub personal access token (AMP_DOC_TOKEN) or GitHub application id/secret (AMP_DOC_ID and AMP_DOC_SECRET). See README.md for more information.');

      throw 'Error: No GitHub credentials provided.';
    }
  }

  async initialize() {
    this._log.start('Instantiating GitHub client ...');

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

  /**
   * Downloads a path/document from GitHub and returns its contents
   * @param  {String} path Path to the file
   * @return {Document}    A document object containing all information
   */
  _fetchDocument(path) {
    if (!path) {
      this._log.warn(`Can not download from undefined path.`);
      return new Promise((resolve) => { resolve(null); });
    }

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

        resolve(new Document(relativePath, contents));
      }).bind(this);

      if (LOCAL_AMPHTML_REPOSITORY) {
        fs.readFile(path.resolve(LOCAL_AMPHTML_REPOSITORY, path), process);
      } else {
        this._repository.contents(path, this._latestReleaseTag, process);
      }
    });
  }
}

module.exports = GitHubImporter;
