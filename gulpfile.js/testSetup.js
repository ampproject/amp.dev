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
 * limitations under the License.
 */

'use strict';

const fs = require('fs');
const {join, dirname} = require('path');
const mkdirp = require('mkdirp').sync;
const fetch = require('node-fetch');
const signale = require('signale');
const {BUILD} = require('@lib/utils/project').paths;

const VALIDATOR_SCRIPT_URL = 'https://ampjs.org/v0/validator_wasm.js';
const VALIDATOR_TARGET_PATH = join(BUILD, 'testing/validator.js');

/**
 * Will download resources that are needed to test offline (e.g. the AMP validator.js)
 * Call this method when installing the dependencies.
 * @returns {Promise<void>}
 */
function downloadTestResources() {
  // since this method will be called with a callback function parameter by gulp
  // we need an extra function implementation that handles the timeout parameter:
  return _doDownloadTestResources();
}

/**
 * Will call downloadTestResources but ignores any errors.
 * Call this method before running tests.
 */
async function updateTestResources() {
  try {
    // for the update we will only wait 3 seconds...
    await _doDownloadTestResources(3000);
  } catch (err) {
    signale.info(
      'Unable to download test resources. Will use previously downloaded files.'
    );
  }
}

/**
 *
 * @param timeout How long to wait for the response in milliseconds (default is 10 seconds)
 * @returns {Promise<void>}
 */
async function _doDownloadTestResources(timeout = 10000) {
  const pageUrl = new URL(VALIDATOR_SCRIPT_URL);
  const fetchResponse = await fetch(pageUrl, {timeout});

  console.log(VALIDATOR_SCRIPT_URL);
  console.log('fetchResponse', fetchResponse.status);
  if (fetchResponse.status && fetchResponse.status === 200) {
    mkdirp(dirname(VALIDATOR_TARGET_PATH));
    fs.writeFileSync(VALIDATOR_TARGET_PATH, await fetchResponse.text());
  } else {
    throw new Error('Unable to load AMP validator.js');
  }
}

exports.downloadTestResources = downloadTestResources;
exports.updateTestResources = updateTestResources;
