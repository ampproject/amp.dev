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

const path = require('path');

/**
 * Helper method to make it possible to use absolute project paths
 * @param  {String} relativePath A relative path
 * @return {String} an absolute ready to use path
 */
function absolute(relativePath) {
  return path.join(__dirname, '../../../', relativePath);
}

function relative(base, relativePath) {
  return path.relative(base, absolute(relativePath));
}

/**
 * Returns the file path of a statically built page
 * @param  {String} relativePath A request path
 * @return {String}
 */
function pagePath(relativePath) {
  if (!relativePath) {
    return paths.GROW_BUILD_DEST;
  }
  return path.join(paths.GROW_BUILD_DEST, relativePath);
}

/**
 * Various paths that are critic for the project and are used around the library
 * @type {Object}
 */
const paths = {
  ROOT: absolute('.'),
  CSS: absolute('pages/css'),
  GROW_BUILD_DEST: absolute('platform/pages'),
  PAGES_DEST: absolute('dist/pages'),
};

module.exports = {
  absolute,
  relative,
  pagePath,
  paths,
};
