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
const config = require('@lib/config.js');
const {promisify} = require('util');
const {readFile} = require('fs');
const readFileAsync = promisify(readFile);
const fetch = require('node-fetch');
const {pagePath} = require('@lib/utils/project');

let templates = null;

class Templates {
  /**
   * Loads a template from cache (if not in dev mode). Otherwise
   * it'll load the template from the pages directory.
   * @param (string} templatePath The relative path to the template
   * @param {Function} [loader] Optional function providing
   * a string for the given templatePath.
   * @returns {Template} a Nunjucks template instance
   */
  static get(templatePath, loader) {
    if (!templates) {
      templates = new Templates();
    }
    if (loader) {
      return templates.compile(templatePath, loader);
    }
    return templates.load(templatePath);
  }

  constructor() {
    this.nunjucksEnv_ = new nunjucks.Environment(null, {
      tags: {
        blockStart: '[%',
        blockEnd: '%]',
        variableStart: '[[',
        variableEnd: ']]',
        commentStart: '[#',
        commentEnd: '#]',
      }});

    this.cache_ = new Map();
  }

  /**
   * Loads a template from cache (if not in dev mode). Otherwise
   * it'll load the template from the pages directory.
   */
  async load(templatePath) {
    return this.compile(templatePath, () => {
      if (config.isDevMode()) {
        // fetch doc from proxy
        return this.fetchTemplate_(templatePath);
      } else {
        // fetch comiled doc page from filesystem
        return readFileAsync(pagePath(templatePath), 'utf-8');
      }
    });
  }

  /**
   * Loads a template from cache (if not in dev mode). If the template
   * is not cached, it will use the provided callback to retrieve the
   * template string.
   */
  async compile(key, fn) {
    let compiledTemplate = this.cache_.get(key);
    if (config.isDevMode() || !compiledTemplate) {
      const template = await fn();
      compiledTemplate = nunjucks.compile(template, this.nunjucksEnv_);
      this.cache_.set(key, compiledTemplate);
    }
    return compiledTemplate;
  }

  async fetchTemplate_(templatePath) {
    const templateUrl = new URL(templatePath, config.hosts.pages.base);
    const fetchResponse = await fetch(templateUrl);
    return fetchResponse.text();
  }
}

module.exports = Templates;
