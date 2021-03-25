/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
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
 * limitations under the License.ä
 */

'use strict';

const {
  GitHubImporter,
  DEFAULT_REPOSITORY,
} = require('@lib/pipeline/gitHubImporter');
const marked = require('marked');
const log = require('@lib/utils/log')('Import Ad Vendor List');
const utils = require('@lib/utils');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

const AD_VENDOR_DIRECTORY = '/ads/vendors';
const AD_VENDOR_PATH = `https://github.com/${DEFAULT_REPOSITORY}/blob/master/extensions/amp-ad/../../`;
const AD_VENDOR_DUMMIES = ['_fakedelayed_', '_ping_'];

const FAQ_PATH = utils.project.absolute('pages/shared/data');

let client = null;

/**
 * Get list of all files in the /ads/vendors directory
 * @return {Array} List of files
 */
async function fetchFileList() {
  let files;
  try {
    files = await client.listDirectory(AD_VENDOR_DIRECTORY);
  } catch (e) {
    log.warn('Could not get list of files.');
  }

  return files.filter((file) => {
    return (
      file.endsWith('.md') &&
      !AD_VENDOR_DUMMIES.some((dummy) => file.includes(dummy))
    );
  });
}

/**
 * Get label from .md file
 * @param {Object} File contents of ad vendor
 * @return {String} Ad vendor label
 */
function getLabel(file, filePath) {
  let label;

  try {
    label = marked.lexer(file).filter((f) => f.type === 'heading')[0].text;
  } catch (e) {
    log.warn(`No Heading found for ${filePath}. Using filename.`);
    label = path.basename(filePath, path.extname(filePath));
  }
  return label;
}

/**
 * Requests a single file from the Github API
 * @param {String} filePath to requested file
 * @return {Object} Content of requested file
 */
async function fetchSingleFile(filePath) {
  let file;
  try {
    file = await client.fetchFile(filePath);
  } catch (e) {
    log.warn(`Error fetching ${filePath}`);
  }
  return file;
}

/**
 * Get files based on the list of ad vendors
 * @param {Array} List of files
 * @return {Array} Structured list of ad vendor objects
 */
function getStructuredData(files) {
  return Promise.all(
    files.map(async (filePath) => {
      const file = await fetchSingleFile(filePath);

      return {
        label: getLabel(file, filePath),
        url: AD_VENDOR_PATH + filePath,
      };
    })
  );
}

/**
 * Generate list of ad vendors in faq based on the files
 * found in the ads/vendors folder
 */
async function importAdVendorList() {
  client = new GitHubImporter();

  const filesList = await fetchFileList();
  const structuredData = await getStructuredData(filesList);

  const faq = yaml.load(
    await readFileAsync(`${FAQ_PATH}/faq.yaml`, {
      encoding: 'utf-8',
    })
  );

  faq['platform_and_vendor_partners'][0].list = structuredData;

  writeFileAsync(`${FAQ_PATH}/faq.yaml`, yaml.dump(faq, {lineWidth: -1})).then(
    () => {
      log.success('Ad Vendors successfully imported.');
    }
  );
}

exports.importAdVendorList = importAdVendorList;
