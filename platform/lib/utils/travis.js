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

/**
 * Returns true if called inside a Travis environment
 * @return {Boolean}
 */
function onTravis() {
  return !!process.env.TRAVIS;
}

const folds = {};

/**
 * Outputs markers needed for the Travis UI to make certain log sections
 * collapsable
 * @param  {String} label [description]
 * @return {undefined}
 */
function fold(label) {
  if (!onTravis()) {
    return;
  }

  if (!folds[label]) {
    console.log(`travis_fold:start:${label}`);
  } else {
    console.log(`travis_fold:end:${label}`);
  }

  folds[label] = !!folds[label];
}

const build = {
  number: process.env.TRAVIS_BUILD_NUMBER,
  job: process.env.TRAVIS_JOB_NUMBER,
};

const repo = {
  branch: process.env.TRAVIS_BRANCH,
  commit: process.env.TRAVIS_COMMIT,
};

module.exports = {
  onTravis,
  fold,
  build,
  repo,
};
