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

const {extractCommandFragments} = require('@lib/utils/sh');
const {spawn} = require('child_process');
const {project} = require('@lib/utils');
const log = require('@lib/utils/log')('Grow');

// Messages printed by Grow used to determine log levels
const MESSAGES = {
  START_SUCCESSFUL: 'Grow started successfully.',
  ERROR_1: 'Traceback (most recent call last):',
  ERROR_2: 'Found an error',
  ERROR_3: 'Error: ',
  WARNING: 'Warning:',
  COMPONENT_VERSIONS: 'component-versions.json',
};

/**
 * Handles all messages logged by Grow and decides which log level
 * to use to print them to the user as all messages are logged to stderr
 * by Grow
 * @param  {Buffer} data
 * @return {String}
 */
function handler(data, resolve, reject) {
  const message = data.toString().trim();

  // Only valid once but needed to have a proper control flow during
  // development as Grow starting should be awaited before the user
  // can access the platform
  if (message == MESSAGES.START_SUCCESSFUL) {
    log.success(message);
    resolve();
    return message;
  }

  if (message.includes(MESSAGES.WARNING)) {
    log.warn(message);
    return message;
  }

  if (
    message.includes(MESSAGES.ERROR_1) ||
    message.includes(MESSAGES.ERROR_2) ||
    message.includes(MESSAGES.ERROR_3)
  ) {
    log.error(message);
    return message;
  }

  log.info(message);
  return message;
}

/**
 * Will execute grow in the configured pod path "project.paths.GROW_POD"
 * @param growCommand the arguments for grow in a string
 */
function exec(growCommand) {
  const fragments = extractCommandFragments([
    'sh',
    '-c',
    `PATH=$PATH:~/bin && grow ${growCommand}`,
  ]);
  const command = fragments[0];
  const args = fragments.splice(1);

  return new Promise((resolve, reject) => {
    const process = spawn(command, args, {cwd: project.paths.GROW_POD});

    process.stdout.on('data', (data) => {
      handler(data, resolve, reject);
    });

    process.stderr.on('data', (data) => {
      handler(data, resolve, reject);
    });

    process.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Grow exited with code ${code}`));
        return;
      }
      resolve();
    });
  });
}

module.exports = exec;
