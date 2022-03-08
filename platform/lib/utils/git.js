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
const {execSync} = require('child_process');

module.exports.version = () => {
  try {
    return execSync('git log -1 --pretty=format:%h ').toString().trim();
  } catch (e) {
    // This method is called from gulpfile.js/deploy.js even if in a
    // non-git context, like the development Docker image
    return 'detached';
  }
};

module.exports.message = () => {
  return execSync('git log -1 --pretty=%B --no-merges').toString().trim();
};

module.exports.user = () => {
  return execSync('git config user.name').toString().trim();
};

module.exports.committerDate = (path) => {
  return execSync(`git log --format=%ai ${path} | tail -1`).toString().trim();
};
