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
const config = require('../config.js');
const growPageLoader = require('../common/growPageLoader');
const LRU = require('lru-cache');
const {
  getFormatFromRequest,
  SUPPORTED_FORMATS,
} = require('../amp/formatHelper.js');
const {SupportedFormatsExtension} = require('./SupportedFormatsExtension.js');
const {importBlog} = require('./ImportBlogFilter.js');
const {survey} = require('./SurveyFilter.js');
const {importYouTubeChannel} = require('./ImportYouTubeChannel.js');

const ALLOWED_LEVEL = ['beginner', 'advanced'];
let templates = null;

/**
 * Builds a Object that adds mandatory variables to the render context
 * that are needed to successfully SSR the pages
 * @param  {expressjs.Request} request
 * @return {Object}
 */
function createRequestContext(
  request = {'query': {}, 'path': ''},
  context = {}
) {
  context.requestPath = request.path;
  context.query = request.query;

  // Store the initially requested format to be able
  // to match user request against available formats
  context.requestedFormat = SUPPORTED_FORMATS.includes(request.query.format)
    ? request.query.format
    : '';
  // Then normalize what might be set by the user and set a
  // sensible default for the templates
  context.format = getFormatFromRequest(request);

  if (ALLOWED_LEVEL.includes(request.query.level)) {
    context.level = request.query.level;
  } else {
    context.level = ALLOWED_LEVEL[0];
  }
  context.category = (request.query.category || '').toLowerCase();

  return context;
}

class Templates {
  /**
   * Loads a template from cache (if not in dev mode). Otherwise
   * it'll load the template from the pages directory.
   * @param {String} templatePath The relative path to the template
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
        variableStart: '[=',
        variableEnd: '=]',
        commentStart: '[#',
        commentEnd: '#]',
      },
    });

    // Add extensions and filters to determine default document format at runtime
    this.nunjucksEnv_.addExtension(
      'SupportedFormatsExtension',
      new SupportedFormatsExtension()
    );

    this.nunjucksEnv_.addFilter('importBlog', importBlog, true);
    this.nunjucksEnv_.addFilter(
      'importYouTubeChannel',
      importYouTubeChannel,
      true
    );
    this.nunjucksEnv_.addFilter('survey', survey, true);

    // One locale has ~860 pages with each weighing ~92KB. The cache therefore
    // maxes out at ~224MB to be safe
    this.cache_ = new LRU({
      max: 2500,
    });
  }

  /**
   * Loads a template from cache (if not in dev mode). Otherwise
   * it'll load the template from the pages directory.
   */
  async load(templatePath) {
    return this.compile(templatePath, async () => {
      return growPageLoader.fetchPage(templatePath);
    });
  }

  /**
   * Loads a template from cache (if not in dev mode). If the template
   * is not cached, it will use the provided callback to retrieve the
   * template string and compile it.
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
}

module.exports = {
  createRequestContext,
  Templates,
};
