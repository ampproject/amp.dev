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

const {spawn} = require('child_process');
const {Signale} = require('signale');
const config = require('../config.js');
const fs = require('fs');
const os = require('os');
const path = require('path');

const GROW_POD_PATH = '../pages';

const GROW_DEFAULT_PATH = path.join(os.homedir(), './bin/grow');

/**
 * A wrapper class to simplify interactions with a Grow process
 * running in parallel to the JavaScript based pipeline
 */
class Grow {
  constructor() {
    this._log = new Signale({
      'interactive': true,
      'scope': 'Grow',
      'types': {
        // Just for goodliness, add custom logger as .watch is a bit off
        'running': {
          'badge': '…',
          'color': 'cyan',
          'label': 'running',
        },
      },
    });

    this._command = this._determineCommand();
  }

  /**
   * Checks if Grow has been installed by default method and if so
   * uses this before trying to just call it by `grow`
   * @return {String} Path for Grow command
   */
  _determineCommand() {
    if (fs.existsSync(GROW_DEFAULT_PATH)) {
      this._log.info(`Using Grow installation from ${GROW_DEFAULT_PATH}`);
      return GROW_DEFAULT_PATH;
    } else {
      this._log.info('Using global Grow if present.');
      return 'grow';
    }
  }

  /**
   * Handles output of the runinng Grow process
   * @param  {Buffer} data
   * @return {undefined}
   */
  _handleProcessOutput(data) {
    data = data.toString();
    this._log.running(data);
  }

  _spawn(command, args, options) {
    this._log.start('Spinning up Grow process ...');
    this._process = spawn(command, args, options);

    this._process.stdout.on('data', this._handleProcessOutput.bind(this));
    this._process.stderr.on('data', this._handleProcessOutput.bind(this));

    return this._process;
  }

  when(message) {
    const process = this._process;
    return new Promise((resolve, reject) => {
      // Listen for the specified message in the output streams
      function listen(data) {
        data = data.toString();

        if (data.indexOf(message) !== -1) {
          resolve();
          // If the message occured stop listening to the stream
          process.stdout.removeListener('data', listen);
          process.stderr.removeListener('data', listen);
        }
      }

      process.stdout.on('data', listen);
      process.stderr.on('data', listen);
    });
  }

  run() {
    const args = [
      'run', '--port', `${config.hosts.pages.port}`, '--no-preprocess',
    ];
    const options = {
      'stdio': 'pipe',
      'cwd': GROW_POD_PATH,
    };

    this._spawn(this._command, args, options);

    return this;
  }

  deploy() {
    const args = [
      'deploy', '--noconfirm',
    ];
    const options = {
      'stdio': 'pipe',
      'cwd': GROW_POD_PATH,
      'env': {...process.env},
    };

    this._spawn(this._command, args, options);

    return this;
  }
}

module.exports = Grow;
