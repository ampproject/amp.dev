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

/**
 * Generates unique slugs like github does for anchors
 */
class SlugGenerator {
  constructor() {
    this.existingSlugs = [];
  }

  getSlug(headline) {
    let slug = headline.trim().toLowerCase();
    slug = slug.replace(/ /g, '-');
    slug = slug.replace(/[^\p{L}0-9_-]/gu, '');
    let result = slug;
    for (let slugCounter = 1; this.existingSlugs.includes(result); slugCounter++) {
      result = slug + '-' + slugCounter;
    }
    this.existingSlugs.push(result);
    return result;
  }
}

module.exports = SlugGenerator;
