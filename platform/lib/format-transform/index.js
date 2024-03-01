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

const cheerio = require('cheerio');
const amphtmlValidator = require('amphtml-validator');
const {htmlContent} = require('@lib/utils/cheerioHelper');
const config = require('@lib/config.js');
const formats = require('./formats');
const {cheerioOptions} = require('../common/cheerioOptions');

const host = config.hosts.platform;
const FORMATS_REGEXP = /@formats\(([^)]+)\)/;

class FormatTransform {
  constructor(formats, validator) {
    this.formats = formats;
    this.validator = validator;
  }

  supportsFormat(target) {
    return target in this.formats;
  }

  getSupportedFormats() {
    return Object.keys(this.formats);
  }

  getValidatorRuntime(format) {
    if (!this.supportsFormat(format)) {
      throw new Error(`Unsupported format: ${format}`);
    }
    return this.formats[format].validatorRuntime || null;
  }

  transform(input, target) {
    if (!this.supportsFormat(target)) {
      throw new Error(`Unsupported transform format: ${target}`);
    }
    const {transforms, validatorRuntime} = this.formats[target];
    const $ = cheerio.load(input, cheerioOptions);
    this.applyCommentFormatFilters_($, target);
    for (const selector of Object.keys(transforms)) {
      const elements = $(selector);
      elements.each((i, el) => {
        this.transformElement_($(el), transforms[selector]);
      });
    }
    const content = htmlContent($);

    const result = {transformedContent: content};
    if (validatorRuntime) {
      const fixedContent = this.prepareForValidator_(content);
      const validation = this.validator.validateString(
        fixedContent,
        validatorRuntime
      );
      result.validationResult = validation;
    }
    return result;
  }

  prepareForValidator_(content) {
    // The validator enforces HTTPS for some formats - if the host is localhost,
    // validation will fail, so we need to feed it "fake" HTTPS links.
    if (host.scheme !== 'http') {
      return content;
    }
    return content.replace(/http:/g, 'https:');
  }

  transformElement_(el, transform) {
    // Transforming to null should result in element deletion.
    if (transform === null) {
      transform = '';
    }

    if (typeof transform === 'function') {
      transform(el);
    } else if (typeof transform === 'string') {
      el.replaceWith(transform);
    } else {
      throw new Error(`Invalid transformation: ${transform}`);
    }
  }

  applyCommentFormatFilters_($, target) {
    const process = (node) => {
      if (node.type === 'comment') {
        this.parseCommentNode_(node, target);
      } else if (node.children) {
        for (const child of node.children) {
          process(child);
        }
      }
    };
    const root = $('html').get(0);
    process(root);
  }

  parseCommentNode_(comment, target) {
    const filters = this.findCommentFormatFilters_(comment.data);
    comment.data = comment.data.replace(FORMATS_REGEXP, '');
    if (!filters || filters.has(target)) {
      return;
    }

    comment.type = 'text';
    comment.data = '';

    let next = comment.next;
    while (next) {
      const type = next.type;
      next.type = 'text';
      next.data = '';

      if (type !== 'text') {
        break;
      }
      next = next.next;
    }
  }

  findCommentFormatFilters_(text) {
    const match = text.match(FORMATS_REGEXP);
    if (!match) {
      return null;
    }
    return new Set(match[1].split(',').map((e) => e.trim()));
  }
}

const instance = amphtmlValidator
  .getInstance()
  .then((validator) => new FormatTransform(formats, validator));

async function getInstance() {
  return instance;
}

module.exports = {getInstance};
