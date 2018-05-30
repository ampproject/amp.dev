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
'use strict';

const childProcess = require('child_process');
const https = require('https');

const setupInstructionsUrl = 'https://github.com/ampproject/amphtml/blob/master/contributing/getting-started-quick.md#one-time-setup';
const nodeDistributionsUrl = 'https://nodejs.org/dist/index.json';
const growReleasesUrl = 'https://api.github.com/repos/grow/grow/releases';

const yarnExecutable = 'npx yarn';
const growExecutable = '~/bin/grow';

const shellCmd = (process.platform == 'win32') ? 'cmd' : '/bin/sh';
const shellFlag = (process.platform == 'win32') ? '/C' : '-c';

// Color formatting libraries may not be available when this script is run.
function red(text) {return '\x1b[31m' + text + '\x1b[0m';}
function cyan(text) {return '\x1b[36m' + text + '\x1b[0m';}
function green(text) {return '\x1b[32m' + text + '\x1b[0m';}
function yellow(text) {return '\x1b[33m' + text + '\x1b[0m';}

function getStdout(cmd) {
  const p = childProcess.spawnSync(shellCmd, [shellFlag, cmd], {
    'cwd': process.cwd(),
    'env': process.env,
    'stdio': 'pipe',
    'encoding': 'utf-8',
  });
  return p.stdout;
}

/**
 * @fileoverview Perform checks on the AMP toolchain.
 */

// If npm is being run, print a message and cause 'npm install' to fail.
function ensureYarn() {
  if (process.env.npm_execpath.indexOf('yarn') === -1) {
    console.log(red(
        '*** The AMP project uses yarn for package management ***'), '\n');
    console.log(yellow('To install all packages:'));
    console.log(cyan('$'), 'yarn', '\n');
    console.log(
        yellow('To install a new (runtime) package to "dependencies":'));
    console.log(cyan('$'), 'yarn add --exact [package_name@version]', '\n');
    console.log(
        yellow('To install a new (toolset) package to "devDependencies":'));
    console.log(cyan('$'),
        'yarn add --dev --exact [package_name@version]', '\n');
    console.log(yellow('To upgrade a package:'));
    console.log(cyan('$'), 'yarn upgrade --exact [package_name@version]', '\n');
    console.log(yellow('To remove a package:'));
    console.log(cyan('$'), 'yarn remove [package_name]', '\n');
    console.log(yellow('For detailed instructions, see'),
        cyan(setupInstructionsUrl), '\n');
    process.exit(1);
  }
}

// Check the node version and print a warning if it is not the latest LTS.
function checkNodeVersion() {
  const nodeVersion = getStdout('node --version').trim();
  return new Promise(resolve => {
    https.get(nodeDistributionsUrl, res => {
      res.setEncoding('utf8');
      let distributions = '';
      res.on('data', data => {
        distributions += data;
      });
      res.on('end', () => {
        const distributionsJson = JSON.parse(distributions);
        const latestLtsVersion = getNodeLatestLtsVersion(distributionsJson);
        if (latestLtsVersion === '') {
          console.log(yellow('WARNING: Something went wrong. ' +
              'Could not determine the latest LTS version of node.'));
        } else if (nodeVersion !== latestLtsVersion) {
          console.log(yellow('WARNING: Detected node version'),
              cyan(nodeVersion) +
              yellow('. Recommended (latest LTS) version is'),
              cyan(latestLtsVersion) + yellow('.'));
          console.log(yellow('⤷ To fix this, run'),
              cyan('"nvm install --lts"'), yellow('or see'),
              cyan('https://nodejs.org/en/download/package-manager'),
              yellow('for instructions.'));
        } else {
          console.log(green('Detected'), cyan('node'), green('version'),
              cyan(nodeVersion + ' (latest LTS)') +
              green('.'));
        }
        resolve();
      });
    }).on('error', () => {
      console.log(yellow('WARNING: Something went wrong. ' +
          'Could not download node version info from ' +
          cyan(nodeDistributionsUrl) + yellow('.')));
      console.log(yellow('⤷ Detected node version'), cyan(nodeVersion) +
          yellow('.'));
      resolve();
    });
  });
}

function getNodeLatestLtsVersion(distributionsJson) {
  if (distributionsJson) {
    // Versions are in descending order, so the first match is the latest lts.
    return distributionsJson.find(function(distribution) {
      return distribution.hasOwnProperty('version') &&
          distribution.hasOwnProperty('lts') &&
          distribution.lts;
    }).version;
  } else {
    return '';
  }
}

// If yarn is being run, perform a version check and proceed with the install.
function checkYarnVersion() {
  const yarnVersion = getStdout(yarnExecutable + ' --version').trim();
  const yarnInfo = getStdout(yarnExecutable + ' info --json yarn').trim();
  const yarnInfoJson = JSON.parse(yarnInfo.split('\n')[0]); // First line
  const stableVersion = getYarnStableVersion(yarnInfoJson);
  if (stableVersion === '') {
    console.log(yellow('WARNING: Something went wrong. ' +
        'Could not determine the stable version of yarn.'));
  } else if (yarnVersion !== stableVersion) {
    console.log(yellow('WARNING: Detected yarn version'),
        cyan(yarnVersion) + yellow('. Recommended (stable) version is'),
        cyan(stableVersion) + yellow('.'));
    console.log(yellow('⤷ To fix this, run'),
        cyan('"curl -o- -L https://yarnpkg.com/install.sh | bash"'),
        yellow('or see'), cyan('https://yarnpkg.com/docs/install'),
        yellow('for instructions.'));
    console.log(yellow('Attempting to install packages...'));
  } else {
    console.log(green('Detected'), cyan('yarn'), green('version'),
        cyan(yarnVersion + ' (stable)') +
        green('. Installing packages...'));
  }
}

function getYarnStableVersion(infoJson) {
  if (infoJson &&
      infoJson.hasOwnProperty('data') &&
      infoJson.data.hasOwnProperty('version')) {
    return infoJson.data.version;
  } else {
    return '';
  }
}

function checkGrowVersion1() {
  const growVersion = getStdout(growExecutable + ' --version').trim();
  console.log(green('Detected'), cyan('grow'), green('version'),
      cyan(growVersion) + green('.'));
}
function checkGrowVersion() {
  const growVersion = getStdout(growExecutable + ' --version').trim();
  const growReleases = getStdout('curl ' + growReleasesUrl).trim();
  const growReleasesJson = JSON.parse(growReleases);
  const latestVersion = getGrowLatestVersion(growReleasesJson);
  if (latestVersion === '') {
    console.log(yellow('WARNING: Something went wrong. ' +
        'Could not determine the latest version of grow.'));
  } else if (growVersion !== latestVersion) {
    console.log(yellow('WARNING: Detected grow version'),
        cyan(growVersion) + yellow('. Recommended (latest) version is'),
        cyan(latestVersion) + yellow('.'));
    console.log(yellow('⤷ To fix this, run'),
        cyan('"curl https://install.growsdk.org | bash"'),
        yellow('or see'), cyan('http://grow.io/start/1'),
        yellow('for instructions.'));
  } else {
    console.log(green('Detected'), cyan('grow'), green('version'),
        cyan(growVersion + ' (latest)') + green('.'));
  }
}

function getGrowLatestVersion(growReleasesJson) {
  // Versions are in descending order, so the first one is the latest.
  if (growReleasesJson &&
      growReleasesJson.length > 0 &&
      growReleasesJson[0].hasOwnProperty('name')) {
    return growReleasesJson[0].name;
  } else {
    return '';
  }
}


function main() {
  // Yarn is already used by default on Travis, so there is nothing more to do.
  if (process.env.TRAVIS) {
    return 0;
  }
  ensureYarn();
  return checkNodeVersion().then(() => {
    return checkGrowVersion();
  }).then(() => {
    checkYarnVersion();
  });
}

main();
