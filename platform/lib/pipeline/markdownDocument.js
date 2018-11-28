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

const config = require('../config');

TOC_MARKER = '[TOC]';

class MarkdownDocument {

  constructor(path, title, contents) {
    this.path = path;
    this._frontmatter = {
      '$title': title
    };

    this._contents = this._convertSyntax(contents);
  }

  set toc(active) {
    // Remove markers from document to have them in a defined spot
    this._contents.replace(TOC_MARKER, '');

    // And if TOC should be rendered put it directly in front of content
    if (active) {
      this._contents = TOC_MARKER + '\n' + this._contents;
    }
  }

  set title(title) {
    this._frontmatter['$title'] = title;
  }

  set contents(contents) {
    contents = this._convertSyntax(content);
    this._contents = contents;
  }

  _convertSyntax(contents) {
    return contents;
  }

  /**
   * Writes the file to the specified path or the relative one
   * if none is set
   * @return {Promise}
   */
  save(path) {
    let frontmatter = '---\n';
    for (let key in this._frontmatter) {
      frontmatter += `${key}: ${this._frontmatter[key]}\n`;
    }
    frontmatter += '---\n\n';

    path = path ? path : this._path;
    return writeFile.promise(path, frontmatter + this._contents);
  }
}

module.exports = MarkdownDocument;
