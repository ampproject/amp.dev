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
const utils = require('@lib/utils');
const Templates = require('@lib/templates/');
const config = require('@lib/config.js');
const fetch = require('node-fetch');
const {promisify} = require('util');

const fs = require('fs');
const readFileAsync = promisify(fs.readFile);

const PREFIX_EXAMPLES = '/documentation/examples';
const DIR_SOURCES = utils.project.absolute('/dist/examples/sources/');
const DIR_DOCS = utils.project.paths.PAGES_DEST;

/**
 * Enables server-side-rendering of samples. It'll automatically render
 * the source, preview and documentation page of a sample.
 */
class SampleRenderer {
  /**
   * Creates a new SampleRendered and registers the sample handler for
   * the given router.
   * @param {Router} router - the express router serving the sample
   * @param {Function} handler - a callback rendering the sample
   * @return {SampleRenderer} - a SampleRenderer
   * @static
   */
  static use(router, handler) {
    const renderer = new SampleRenderer();
    renderer.register(router, handler);
    return renderer;
  }

  /**
   * Register a sample handler for the given router.
   * @param {Router} router - the express router serving the sample
   * @param {Function} handler - a callback rendering the sample
   * @static
   */
  register(router, handler) {
    router.get(['/', '/index.html'], this.renderSample_(handler).bind(this));
  }

  /**
   * Creates a middleware loading the sample template and passing it
   * to the sample handler.
   *
   * @private
   */
  renderSample_(handler) {
    return async (request, response, next) => {
      try {
        const template = await this.getTemplate_(request);
        handler(request, response, template);
      } catch (err) {
        console.log(err);
        next(err);
      }
    };
  }

  /**
   * Loads a sample template for the given request (this might be
   * doc or preview).
   *
   * @private
   */
  async getTemplate_(request) {
    const samplePath = this.removeQuery_(request.originalUrl.substring(PREFIX_EXAMPLES.length));
    // If it's a preview request, load the source template
    if (request.protocol + '://' + request.get('host') === config.hosts.preview.base) {
      const sourcePath = join(DIR_SOURCES, samplePath + '.html');
      return Templates.get(sourcePath, () => readFileAsync(sourcePath, 'utf-8'));
    }
    // else load the documentation template
    return Templates.get(samplePath, () => {
      if (config.isDevMode()) {
        // fetch doc from proxy
        return this.fetchSampleDoc_(samplePath);
      } else {
        // fetch comiled doc page from filesystem
        const docFilePath = join(DIR_DOCS, PREFIX_EXAMPLES, this.appendIndexHtml_(samplePath));
        return readFileAsync(docFilePath, 'utf-8');
      }
    });
  }

  /**
   * @private
   */
  async fetchSampleDoc_(samplePath) {
    const sampleUrl = config.hosts.pages.base + PREFIX_EXAMPLES + samplePath;
    const fetchResponse = await fetch(this.appendIndexHtml_(sampleUrl));
    return await fetchResponse.text();
  }

  /**
   * Ensures the path ends with /index.html.
   *
   * @private
   */
  appendIndexHtml_(string) {
    if (string.endsWith('/index.html')) {
      return string;
    }
    if (!string.endsWith('/')) {
      string += '/';
    }
    return string + 'index.html';
  }

  /**
   * Removes a query string from a path.
   *
   * @private
   */
  removeQuery_(string) {
    const index = string.indexOf('?');
    if (index === -1) {
      return string;
    }
    return string.substring(0, index);
  }
}

module.exports = SampleRenderer;
