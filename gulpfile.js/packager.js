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

const {join} = require('path');
const {sh} = require('@lib/utils/sh.js');
const mri = require('mri');

// Parse commandline arguments
const argv = mri(process.argv.slice(2));

const PACKAGER_ROOT = join(__dirname, '../packager');
const opts = {
  workingDir: PACKAGER_ROOT,
};

async function packagerRunLocal() {
  const password = argv.password || process.env.AMP_DEV_CERT_PWD;
  await sh('pwd', opts);
  await sh('docker build -t amppkg .', opts);
  return await sh(
    `docker run -p 8083:8080 --env PASSWORD=${password} amppkg`,
    opts
  );
}

function packagerTest() {
  return sh(
    'curl -si --output - -H "amp-cache-transform: google" -H "accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8" "https://amp-dev-staging.appspot.com/index.amp.html"'
  );
}

function packagerLog() {
  return sh('gcloud app logs tail -s default --project amp-dev-sxg');
}

exports.packagerRunLocal = packagerRunLocal;
exports.packagerTest = packagerTest;
exports.packagerLog = packagerLog;
