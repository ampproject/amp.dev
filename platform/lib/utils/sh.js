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

require('module-alias/register');
const {spawn} = require('child_process');
const {ROOT} = require('@lib/utils/project').paths;

const DEFAULT_OPTIONS = {
  workingDir: ROOT,
};

/**
 * Executes a shell command.
 *
 * @param {string} the command string
 * @param {string=''} an optional message being displayed after the command has
 * terminated succesfully.
 * @param {Object=DEFAULT_OPTIONS} an optional message being displayed after the command has
 * terminated succesfully.
 */
function sh(string, ...params) {
  let message = '';
  let opts = DEFAULT_OPTIONS;
  if (isString(params[0])) {
    message = params[0];
  }
  opts = extractOptions(params);

  string = string.replace(/\\(\r?\n)+/gm, ' ').trim();
  const fragments = string.split(/ +/gm);
  const command = fragments[0];
  const args = fragments.splice(1);
  console.log(`$ ${command} ${args.join(' ')}`);
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, {cwd: opts.workingDir});

    process.stdout.on('data', (data) => {
      console.log(`${data.toString()}`);
    });

    process.stderr.on('data', (data) => {
      console.log(`${data}`);
    });

    process.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`${command} process exited with code ${code}`));
        return;
      }
      resolve();
    });
  }).then(() => console.log(message));
}

function extractOptions(params) {
  if (isString(params[0])) {
    return params[1] || DEFAULT_OPTIONS;
  }
  if (params.length === 0) {
    return DEFAULT_OPTIONS;
  }
  return params[0];
}

function isString(obj) {
  return obj && obj.length > 0 && typeof obj[0] === 'string';
}

module.exports = {
  sh,
};
