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

const {htmlContent} = require('@lib/utils/cheerio');
const {filterPage, FORMATS} = require('@lib/common/filteredPage');
const cheerio = require('cheerio');
const transforms = require('./transforms');

class FormatTransform {
  constructor() {
    this.transforms = transforms;
  }

  supportsFormat(target) {
    return target in this.transforms;
  }

  getSupportedFormats() {
    return Object.keys(this.transforms);
  }

  transform(input, target) {
    if (!this.transforms[target]) {
      return input;
    }
    const transform = this.transforms[target];
    const $ = cheerio.load(input);
    for (const selector of Object.keys(transform)) {
      const elements = $(selector);
      elements.each((i, el) => {
        this.transformElement_($(el), transform[selector]);
      });
    }
    return htmlContent($);
  }

  transformElement_(el, transform) {
    if (transform === null) {
      this.removeElement_(el);
      return;
    }

    if (typeof transform === 'function') {
      transform(el);
    } else if (typeof transform === 'string') {
      el.replaceWith(transform);
    }
  }

  removeElement_(el) {
    if (el.parent().is('div')) {
      el = el.parent();
    }
    this.removePrecedingComments_(el);
    this.removePrecedingHeading_(el);
    el.replaceWith('');
  }

  removePrecedingComments_(el) {
    for (let node = el.get(0).prev; node != null; node = node.prev) {
      if (node.type === 'comment') {
        node.type = null;
        node.data = null;
      } else if (node.type === 'text') {
        continue;
      } else {
        break;
      }
    }
  }

  removePrecedingHeading_(el) {
    const prev = el.prev();
    if (prev.get(0) && prev.get(0).tagName.match(/^h[0-9]$/)) {
      prev.replaceWith('');
    }
  }
}

module.exports = new FormatTransform();
