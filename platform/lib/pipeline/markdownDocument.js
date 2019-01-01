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

  constructor(path, contents) {
    this._contents = this._convertSyntax(contents);
    this._frontmatter = {
      '$title': ''
    };

    this.toc = contents.indexOf(TOC_MARKER) == -1 ? false : true;
    this.path = path;
  }

  set toc(active) {
    // Remove markers from document to have them in a defined spot
    this._contents = this._contents.replace(TOC_MARKER, '');

    // And if TOC should be rendered put it directly in front of content
    if (active) {
      this._contents = '\n' + TOC_MARKER + '\n\n' + this._contents;
    }

    this._toc = active;
  }

  set path(path) {
    this._path = path;
  }

  set title(title) {
    this._frontmatter['$title'] = title;
  }

  set order(order) {
    this._frontmatter['$order'] = order;
  }

  set contents(contents) {
    contents = this._convertSyntax(content);
    this._contents = contents;
  }

  _convertSyntax(contents) {
    contents = this._rewriteCalloutToTip(contents);
    contents = this._rewriteCodeBlocks(contents);

    // Rewrite mustache style parts
    contents = contents.replace(/`([^{`]*)(\{\{[^`]*\}\})([^`]*)`/g, '{% raw %}`$1$2$3`{% endraw %}');

    // Replace dividers (---) as they will break front matter
    contents = contents.replace(/\n---\n/gm, '\n***\n');

    return contents;
  }

  /**
   * Replaces the {% call callout ... %} syntax with the new BBCode styled
   * [tip]...[/type] shortcode while mapping the types to the new ones
   * @param  {String} contents
   * @return {String}          The rewritten input
   */
  _rewriteCalloutToTip(contents) {
    const CALLOUT_PATTERN = /{% call callout\('.*?', type='(.*?)'\) %}(.*?){% endcall %}/gs;
    const AVAILABLE_CALLOUT_TYPES = {
      'note': 'note',
      'read': 'read-on',
      'caution': 'important',
      'success': 'success'
    };

    contents = contents.replace(CALLOUT_PATTERN, (match, type, text) => {
      return `[tip type="${AVAILABLE_CALLOUT_TYPES[type]}"]\n${text}\n[/tip]`;
    });

    return contents;
  }

  /**
   * Rewrites code fences to python-markdown syntax while also checking
   * if {{ }} need to be fenced to not interfer with jinja2
   * @param  {String} contents
   * @return {String}          The rewritten content
   */
  _rewriteCodeBlocks(contents) {
    // replace code blocks
    contents = contents.replace(/(```)(([A-z-]*)\n)(((?!```)[\s\S])+)(```\n)/gm, (match, p1, p2, p3, p4) => {
      // Fence curly braces to not mess with Grow/jinja2
      if (p4.indexOf('{{') > -1) {
        p4 = '{% raw %}' + p4 + '{% endraw %}';
      }
      return '[sourcecode' + (p3 ? ':' + p3 : ':none') + ']\n' + p4 + '[/sourcecode]\n';
    });

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
