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

class SampleRenderer {
  static register(router, handler) {
    const renderer = new SampleRenderer();
    renderer.register(router, handler);
  }
  constructor() {
    this.cache_ = new Map();
  }

  register(router, handler) {
    router.get(['/', '/index.html'], this.renderSample_(handler).bind(this));
  }

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

  async fetchTemplate_(key, fn) {
    let compiledTemplate = this.cache_.get(key);
    if (config.isDevMode() || !compiledTemplate) {
      const template = await fn();
      const env = new nunjucks.Environment(null, {
        tags: {
          blockStart: '[%',
          blockEnd: '%]',
          variableStart: '[[',
          variableEnd: ']]',
          commentStart: '[#',
          commentEnd: '#]',
        }});
      compiledTemplate = nunjucks.compile(template, env);
      this.cache_.set(key, compiledTemplate);
    }
    return compiledTemplate;
  }

  async getTemplate_(request) {
    const samplePath = this.removeQuery_(request.originalUrl.substring(PREFIX_EXAMPLES.length));
    console.log('sample path', samplePath);
    if (request.protocol + '://' + request.get('host') === config.hosts.preview.base) {
      const sourcePath = join(DIR_SOURCES, samplePath.replace('/index.html', '.html'));
      console.log('loading source file', sourcePath);
      return this.fetchTemplate_('source', () => readFileAsync(sourcePath, 'utf-8'));
    }
    return this.fetchTemplate_('documentation', () => {
      if (config.isDevMode()) {
        return this.fetchSampleDoc_(samplePath);
      } else {
        const docFilePath = join(DIR_DOCS, samplePath);
        console.log('fetching sample doc from', docFilePath);
        return readFileAsync(docFilePath, 'utf-8');
      }
    });
  }

  async fetchSampleDoc_(samplePath) {
    let sampleUrl = config.hosts.pages.base + PREFIX_EXAMPLES + samplePath;
    if (!sampleUrl.endsWith('/index.html')) {
      sampleUrl += 'index.html';
    }
    console.log('fetching sample doc from', sampleUrl);
    const fetchResponse = await fetch(sampleUrl);
    return await fetchResponse.text();
  }

  removeQuery_(string) {
    const index = string.indexOf('?');
    if (index === -1) {
      return string;
    }
    return string.substring(0, index);
  }
}

module.exports = SampleRenderer;
