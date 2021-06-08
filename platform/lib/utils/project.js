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

const DIST_DIR = 'dist';

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
    return paths.PAGES_DEST;
  }
  return path.join(paths.PAGES_DEST, relativePath);
}

/**
 * Various paths that are critic for the project and are used around the library
 * @type {Object}
 */
const paths = {
  ROOT: absolute('.'),
  BUILD: absolute('build'),
  DIST: absolute(DIST_DIR),
  ICONS: absolute('frontend/icons'),
  TEMPLATES: absolute('templates'),
  FRONTEND_TEMPLATES: absolute('frontend/templates'),
  SCSS: absolute('frontend/scss'),
  CSS: absolute('pages/css'),
  GROW_POD: absolute('pages'),
  GROW_BUILD_DEST: absolute('build/pages'),
  PAGES_DEST: absolute(`${DIST_DIR}/pages`),
  INLINE_EXAMPLES_DEST: absolute('dist/inline-examples'),
  PAGES_SRC: absolute('pages/content/amp-dev'),
  STATICS_DEST: absolute(`${DIST_DIR}/static`),
  BENTO_COMPONENTS_LIST: absolute(`${DIST_DIR}/static/bento-components.json`),
  BUILD_INFO: absolute('platform/config/build-info.yaml'),
  GUIDES_PATH_RELATIVE: '/content/amp-dev/documentation/guides-and-tutorials/',
  RECENT_GUIDES_DEST: 'pages/shared/data/recent-guides.yaml',
  BUILD_INFO_PATH: absolute('platform/config/build-info.yaml'),
  THUMBOR_ROOT: absolute('thumbor'),
  PIXI_CLOUD_ROOT: absolute('pixi/cloud-function'),
  THUMBOR_IMAGE_INDEX: absolute(`${DIST_DIR}/static/imageIndex.json`),
  COMPONENT_VERSIONS: absolute(`platform/config/component-versions.json`),
  COMPONENT_VERSIONS_STATIC: absolute(
    `${DIST_DIR}/static/files/component-versions.json`
  ),
};

module.exports = {
  DIST_DIR,
  absolute,
  relative,
  pagePath,
  paths,
};
