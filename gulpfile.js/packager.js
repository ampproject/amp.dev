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

const PACKAGER_ROOT = join(__dirname, '../packager');
const opts = {
  workingDir: PACKAGER_ROOT,
};

// Parse commandline arguments
const argv = mri(process.argv.slice(2));
const host = argv.host || 'https://amp.dev';


/**
 * Deploys packager to app engine.
 */
async function packagerDeploy() {
  await sh('pwd', opts);
  return sh('gcloud beta app deploy --project=amp-dev-sxg', {
    workingDir: PACKAGER_ROOT,
  });
};

/**
 * Runs the packager docker image locally.
 */
async function packagerRunLocal() {
  const password = argv.password || process.env.AMP_DEV_CERT_PWD;
  await sh('pwd', opts);
  await sh('docker build -t amppkg .', opts);
  return await sh(`docker run -p 8083:8080 --env PASSWORD=${password} amppkg`, opts);
}

/**
 * Runs amp-linter checks. Change the host via `--host=https://example.com`.
 */
function packagerTest() {
  return sh(`npx amp-toolbox-linter --force sxg "${host}/index.amp.html`);
}

/**
 * Prints the OSCP certificate data. Use it to check the cert's expiration date. Change the host
 * via `--host=https://example.com`. Requires https://github.com/dflemstr/rq to be installed.
 */
function packagerTestOSCP() {
  const host = argv.host || 'https://amp.dev';
  return sh(`curl -s "${host}/amppkg/cert/lWfYk-0jeC_HkleYD4fj98y6GixIjocIkMpjsB8dToA"` +
      '| rq -q -c "get \"[1].ocsp\"" | tr -d \" | xxd -r -p ' +
      '| openssl ocsp -respin /dev/stdin -text -noverify');
}

/**
 * Prints the packager logs to the commandline.
 */
function packagerLog() {
  return sh('gcloud app logs tail -s default --project amp-dev-sxg');
}

exports.packagerDeploy = packagerDeploy;
exports.packagerRunLocal = packagerRunLocal;
exports.packager = packagerTestOSCP;
exports.packagerLog = packagerLog;
exports.packagerTest = packagerTest;
