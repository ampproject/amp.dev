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

const nunjucks = require('nunjucks');
const {join} = require('path');
const utils = require('@lib/utils');
const config = require('@lib/config.js');
const fetch = require('node-fetch');
const {promisify} = require('util');

const fs = require('fs');
const readFileAsync = promisify(fs.readFile);

const PREFIX_EXAMPLES = '/documentation/examples';
const DIR_SOURCES = utils.project.absolute('/dist/examples/sources/');
const DIR_DOCS = utils.project.absolute('/platform/pages/');

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

  constructor() {
    this.cache_ = new Map();
    this.nunjucksEnv_ = new nunjucks.Environment(null, {
      tags: {
        blockStart: '[%',
        blockEnd: '%]',
        variableStart: '[[',
        variableEnd: ']]',
        commentStart: '[#',
        commentEnd: '#]',
      }});
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
   * @private
   */
  async fetchTemplate_(key, fn) {
    let compiledTemplate = this.cache_.get(key);
    if (config.isDevMode() || !compiledTemplate) {
      const template = await fn();
      compiledTemplate = nunjucks.compile(template, this.nunjucksEnv_);
      this.cache_.set(key, compiledTemplate);
    }
    return compiledTemplate;
  }

  /**
   * @private
   */
  async getTemplate_(request) {
    const samplePath = this.removeQuery_(request.originalUrl.substring(PREFIX_EXAMPLES.length));
    console.log('sample path', samplePath);
    console.log('is preview?', request.protocol + '://' + request.get('host'), config.hosts.preview.base);
    if (request.protocol + '://' + request.get('host') === config.hosts.preview.base) {
      const sourcePath = join(DIR_SOURCES, samplePath.replace('/index.html', '.html'));
      console.log('loading source file', sourcePath);
      return this.fetchTemplate_('source', () => readFileAsync(sourcePath, 'utf-8'));
    }
    return this.fetchTemplate_('documentation', () => {
      if (config.isDevMode()) {
        return this.fetchSampleDoc_(samplePath);
      } else {
        if (!samplePath.endsWith('/index.html')) {
          samplePath = join(samplePath, 'index.html');
        }
        const docFilePath = join(DIR_DOCS, PREFIX_EXAMPLES, samplePath);
        console.log('fetching sample doc from', docFilePath);
        return readFileAsync(docFilePath, 'utf-8');
      }
    });
  }

  /**
   * @private
   */
  async fetchSampleDoc_(samplePath) {
    let sampleUrl = config.hosts.pages.base + PREFIX_EXAMPLES + samplePath;
    if (!sampleUrl.endsWith('/index.html')) {
      sampleUrl += 'index.html';
    }
    console.log('fetching sample doc from', sampleUrl);
    const fetchResponse = await fetch(sampleUrl);
    return await fetchResponse.text();
  }

  /**
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
