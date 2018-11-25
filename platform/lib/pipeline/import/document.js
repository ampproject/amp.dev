#!/usr/bin/env node
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

const fs = require('fs');
const path = require('path');
const writeFile = require('write');

const config = require('../../config');

class Document {

  constructor(path, title, contents) {
    this._path = path;
    this._frontmatter = {
      'title': title
    };

    this._contents = contents;
  }

  set title(title) {
    this._frontmatter['title'] = title;
  }

  _convertSyntax() {

  }

  /**
   * Writes the file to the specified path or the relative one
   * if none is set
   * @return {[type]} [description]
   */
  save(path) {
    let frontmatter = '---\n';
    for (key in this._frontmatter) {
      frontmatter += `${key}: ${this._frontmatter[key]}\n`;
    }
    frontmatter = '---\n\n';

    path = path ? path : this._path;
    return writeFile(path, frontmatter + this._contents);
  }
}

module.exports = Document;
