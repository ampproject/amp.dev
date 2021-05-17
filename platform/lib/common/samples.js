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

const path = require('path');
const url = require('url');
const config = require('@lib/config.js');
const project = require('@lib/utils/project.js');

const EXAMPLE_PATH_START = '/documentation/';
const EXAMPLE_SITEMAP_PATH = path.join(
  project.paths.STATICS_DEST,
  '/samples/samples.json'
);
const EXAMPLE_COMPONENT_PATTERN =
  /^(?:https?:\/\/[^/]+)?(?:\/[^/]+)?\/documentation\/examples\/components\/(amp-[^/]+)\/?/;

function getExamplePreviewUrl(exampleUrl) {
  let path = url.parse(exampleUrl).pathname;
  const idx = path.indexOf(EXAMPLE_PATH_START);
  if (idx < 0) {
    // not an example url
    return null;
  }
  if (idx > 0) {
    // cut away the locale link
    path = path.substr(idx);
  }
  return config.hosts.preview.base + path;
}

function getPlaygroundUrlForPreviewLink(previewUrl) {
  return (
    config.hosts.playground.base + '/?url=' + encodeURIComponent(previewUrl)
  );
}

function getPlaygroundUrlForExampleLink(exampleUrl) {
  const previewUrl = getExamplePreviewUrl(exampleUrl);
  return getPlaygroundUrlForPreviewLink(previewUrl);
}

function getRelativeExampleUrlForPreviewLink(previewUrl, format = 'websites') {
  // the example url is the same path as preview url
  // we do not need absolute urls here
  let exampleUrl = url.parse(previewUrl).pathname;
  if (!exampleUrl.endsWith('/')) {
    exampleUrl = exampleUrl + '/';
  }
  exampleUrl = exampleUrl + '?format=' + format;
  return exampleUrl;
}

function readSampleSitemap() {
  return require(EXAMPLE_SITEMAP_PATH);
}

function _addComponentExample(target, component, previewUrl, format) {
  const playgroundUrl = getPlaygroundUrlForPreviewLink(previewUrl);
  const exampleUrl = getRelativeExampleUrlForPreviewLink(previewUrl, format);
  target[component] = {
    exampleUrl: exampleUrl,
    playgroundUrl: playgroundUrl,
  };
}

function getComponentExampleMap() {
  const result = {};
  const samples = readSampleSitemap();
  for (const format of Object.keys(samples)) {
    for (const category of samples[format].categories) {
      if (category.examples) {
        for (const example of category.examples) {
          const match = example.url.match(EXAMPLE_COMPONENT_PATTERN);
          if (match) {
            _addComponentExample(result, match[1], example.url, format);
          }
          if (format === 'stories' && category.name === 'Introduction') {
            _addComponentExample(result, 'amp-story', example.url, format);
          }
        }
      }
    }
  }
  return result;
}

module.exports = {
  getExamplePreviewUrl,
  getPlaygroundUrlForPreviewLink,
  getPlaygroundUrlForExampleLink,
  getRelativeExampleUrlForPreviewLink,
  getComponentExampleMap,
  readSampleSitemap,
};
