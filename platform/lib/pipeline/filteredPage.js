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

const BODY_CLASSES = {
  'websites': 'ad--websites',
  'stories': 'ad--stories',
  'ads': 'ad--ads',
  'email': 'ad--email'
};

class FilteredPage {

  constructor(activeFilter, content) {
    this._activeFilter = activeFilter;
    this._content = content;

    this._addClassToBody();
  }

  /**
   * Adds a class to the <body> element that marks the current filtered format
   * to be able to apply styles based on filter
   */
  _addClassToBody() {
    this._content = htmlFindReplaceElementAttrs.replace(this._content, (attribute) => {
      return attribute.value + ' ' + BODY_CLASSES[this._activeFilter];
    }, {
      'tag': 'body',
      'attr': 'class'
    });
  }

  get content() {
    return this._content;
  }
}

module.exports = FilteredPage;
