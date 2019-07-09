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
const {htmlContent} = require('@lib/utils/cheerioHelper');
const formats = require('./formats');

class FormatTransform {
  constructor(formats) {
    this.formats = formats;
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
      return input;
    }
    const {transforms} = this.formats[target];
    const $ = cheerio.load(input);
    for (const selector of Object.keys(transforms)) {
      const elements = $(selector);
      elements.each((i, el) => {
        this.transformElement_($(el), transforms[selector]);
      });
    }
    return htmlContent($);
  }

  transformElement_(el, transform) {
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
}

module.exports = new FormatTransform(formats);
