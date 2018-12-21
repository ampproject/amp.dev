/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
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

const htmlFindReplaceElementAttrs = require('html-find-replace-element-attrs');

const FORMATS = ['websites', 'stories', 'ads', 'email'];

const BODY_CLASSES = {
  'websites': 'ad--websites',
  'stories': 'ad--stories',
  'ads': 'ad--ads',
  'email': 'ad--email'
};

const FILTERED_ROUTES = [
  /\/documentation\/guides-and-tutorials.*/,
  /\/documentation\/components.*/,
  /\/documentation\/examples.*/,
];

function isFilterableRoute(route) {
  let filterableRoute = false;
  for (let expression of FILTERED_ROUTES) {
    if (expression.test(route)) {
      filterableRoute = true;
      break;
    }
  }

  return filterableRoute;
}

class FilteredPage {

  constructor(format, content) {
    this._format = format;
    this._content = content;

    this._addClassToBody();
    this._rewriteUrls();
  }

  /**
   * Adds a class to the <body> element that marks the current filtered format
   * to be able to apply styles based on filter
   * @return {undefined}
   */
  _addClassToBody() {
    this._content = htmlFindReplaceElementAttrs.replace(this._content, (attribute) => {
      return attribute.value + ' ' + BODY_CLASSES[this._format];
    }, {
      'tag': 'body',
      'attr': 'class'
    });
  }

  /**
   * Appends the currently active filter to all of the links
   * on the page
   * @return {undefined}
   */
  _rewriteUrls() {
    this._content = htmlFindReplaceElementAttrs.replace(this._content, (attribute) => {
      // Check if the link is pointing to a filtered route
      // and if the link already has a query parameter

      if (attribute.value.indexOf('?') > -1 || !isFilterableRoute(attribute.value)) {
        return attribute.value;
      }

      return attribute.value + '?format=' + this._format;
    }, {
      'tag': 'a',
      'attr': 'href'
    });
  }

  get content() {
    return this._content;
  }
}

module.exports.FilteredPage = FilteredPage;
module.exports.isFilterableRoute = isFilterableRoute;
module.exports.FORMATS = FORMATS;
