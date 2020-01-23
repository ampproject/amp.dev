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

  /**
   * Generate a unique slug for the given headline.
   * @param headline
   * @returns {string}
   */
  generateSlug(headline) {
    const slug = SlugGenerator.sluggify(headline);
    let result = slug;
    for (
      let slugCounter = 1;
      this.existingSlugs.includes(result);
      slugCounter++
    ) {
      result = slug + '-' + slugCounter;
    }
    this.existingSlugs.push(result);
    return result;
  }

  /**
   * Converts the headline to a slug string without checking for uniqueness.
   * The input is converted to lowercase, leading and trailing whitespace is removed,
   * blanks are converted to a dash and all characters that are not letters, numbers,
   * underscore or the dash are removed.
   * @param headline
   * @returns {string}
   */
  static sluggify(headline) {
    let slug = headline.trim().toLowerCase();
    slug = slug.replace(/ /g, '-');
    slug = slug.replace(/[^\p{L}0-9_-]/gu, '');
    return slug;
  }
}

module.exports = SlugGenerator;
