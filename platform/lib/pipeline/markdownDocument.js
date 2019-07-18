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

const writeFile = require('write');
const yaml = require('js-yaml');
const {Signale} = require('signale');
const utils = require('@lib/utils');

// Inline marker used by Grow to determine if there should be TOC
const TOC_MARKER = '[TOC]';
// It doesn't make sense to give every MarkdownDocument their own logger instance
// therefore have one shared one
const LOG = new Signale({'scope': 'Markdown Documents'});

// This expression matches a {% raw %}...{% endraw %} block
const JINJA2_RAW_BLOCK = /\{%\s*raw\s*%\}(?:(?!\{%\s*endraw\s*%\})[\s\S])*\{%\s*endraw\s*%\}/;

// we search for ALL code blocks, and at the same time for raw blocks
// to ensure we do not match something that belongs to different code blocks
// or we add raw tags to existing raw blocks
const MARKDOWN_BLOCK_PATTERN = new RegExp(
    JINJA2_RAW_BLOCK.source
    + '|'
    + /\[\s*sourcecode[^\]]*\][\s\S]*?\[\s*\/\s*sourcecode\s*\]/.source
    + '|'
    + /`[^`]*`/.source, 'g');

// Inside code blocks we search for mustache expressions
// The constant 'server_for_email' and expressions with a dot or a bracket are not considered mustache
// TODO: Avoid the need to distinguish between mustache and jinja2
const MUSTACHE_PATTERN = new RegExp(
    '('
    + JINJA2_RAW_BLOCK.source
    + '|'
    + /\{\{(?!\s*server_for_email\s*\}\})(?:[\s\S]*?\}\})?/.source
    + ')', 'g');

class MarkdownDocument {
  constructor(path, contents) {
    this._contents = contents.trim();

    this._bootstrapFrontmatter();
    this._convertSyntax();

    this.toc = contents.includes(TOC_MARKER) ? false : true;
    this.path = path;
  }

  set toc(active) {
    // Remove markers from document as inline TOCs are not supported
    this._contents = this._contents.replace(TOC_MARKER, '');
    this._frontmatter['toc'] = active;
    this._toc = active;
  }

  get path() {
    return this._path;
  }

  set path(path) {
    this._path = path;
  }

  get importURL() {
    return this._importURL;
  }

  set importURL(importURL) {
    this._importURL = importURL;
  }

  set title(title) {
    this._frontmatter['$title'] = title;
  }

  set order(order) {
    this._frontmatter['$order'] = order;
  }

  get category() {
    return this._frontmatter['$category@'] || this._frontmatter['$category'];
  }

  set category(category) {
    this._frontmatter['$category@'] = category;
  }

  get formats() {
    return this._frontmatter['formats'] || [];
  }

  set formats(formats) {
    this._frontmatter['formats'] = formats;
  }

  get teaser() {
    return this._frontmatter['teaser'] || {};
  }

  set teaser(teaser) {
    this._frontmatter['teaser'] = Object.assign(this._frontmatter['teaser'] || {}, teaser);
  }

  get contents() {
    return this._contents;
  }

  set contents(contents) {
    this._contents = contents;
    this._convertSyntax();
  }

  _bootstrapFrontmatter() {
    // Check if the document defines its own frontmatter already
    if (this._contents.startsWith('---\n')) {
      const FRONTMATTER_PATTERN = /---\n.*\n---\n/ms;
      let frontmatter = this._contents.match(FRONTMATTER_PATTERN);

      if (!frontmatter) {
        LOG.warn(`Unparseable frontmatter in ${this.path}`);
      } else {
        frontmatter = frontmatter[0];

        // Strip out the frontmatter string from the actual content prior
        // syntax conversion
        this._contents = this._contents.replace(frontmatter, '');

        // Strip out limiters from frontmatter string to be able to parse it
        frontmatter = frontmatter.replace(/---/g, '');

        // Parse frontmatter and use it as initial fill for the actual properties
        try {
          this._frontmatter = yaml.safeLoad(frontmatter);
          return;
        } catch (e) {
          LOG.error(`Couldn't parse embedded frontmatter from ${this.path}`);
        }
      }
    }

    this._frontmatter = {
      '$title': '',
    };
  }

  _convertSyntax() {
    this._contents = MarkdownDocument.rewriteCalloutToTip(this._contents);
    this._contents = MarkdownDocument.rewriteCodeBlocks(this._contents);
    this._contents = MarkdownDocument.escapeMustacheTags(this._contents);

    // Replace dividers (---) as they will break front matter
    this._contents = this._contents.replace(/\n---\n/gm, '\n***\n');
  }

  /**
   * Escapes mustache style tags in code blocks to not interfer with Jinja2
   * @param  {String} contents
   * @return {String}          The rewritten input
   */
  static escapeMustacheTags(contents) {
    return contents.replace(MARKDOWN_BLOCK_PATTERN, (block) => {
      // check for mustache tags only if we have no raw block
      if (!block.startsWith('{')) {
        block = block.replace(
            MUSTACHE_PATTERN,
            (part) => {
              // again, only if it is a mustache block wrap it with raw
              if (part.startsWith('{{')) {
                part = '{% raw %}' + part + '{% endraw %}';
              }
              return part;
            });
      }
      return block;
    });
  }

  /**
   * Replaces the {% call callout ... %} syntax with the new BBCode styled
   * [tip]...[/type] shortcode while mapping the types to the new ones
   * @param  {String} contents
   * @return {String}          The rewritten input
   */
  static rewriteCalloutToTip(contents) {
    const CALLOUT_PATTERN = /{% call callout\('.*?', type='(.*?)'\) %}(.*?){% endcall %}/gs;
    const AVAILABLE_CALLOUT_TYPES = {
      'note': 'note',
      'read': 'read-on',
      'caution': 'important',
      'success': 'success',
    };

    contents = contents.replace(CALLOUT_PATTERN, (match, type, text) => {
      return `[tip type="${AVAILABLE_CALLOUT_TYPES[type]}"]\n${text}\n[/tip]`;
    });

    return contents;
  }

  /**
   * Rewrites code fences to python-markdown syntax.
   * @param  {String} contents
   * @return {String}          The rewritten content
   */
  static rewriteCodeBlocks(contents) {
    // Rewrite code blocks in fence syntax
    contents =
      contents.replace(/(```)(([A-z-]*)\n)(((?!```)[\s\S])+)(```[\t ]*\n)/gm,
          (match, p1, p2, p3, p4) => {
            return '[sourcecode' + (p3 ? ':' + p3 : ':none') + ']\n' + p4 + '[/sourcecode]\n';
          });

    return contents;
  }

  /**
   * Rewrite relative links and append the given base path to them
   * @param  {String} contents
   * @return {String}          The rewritten content
   */
  rewriteRelativePaths(base) {
    this._contents = this._contents.replace(/\[([^\]]+)\]\((?!http|#)([^\)]+)\)/g,
        `[$1](${base}/$2)`);
  }

  /**
   * Removes the first heading to avoid double titles
   * @return {String}          The rewritten input
   */
  stripInlineTitle() {
    const TITLE_PATTERN = /^#{1}\s.+/m;
    this._contents = this._contents.replace(TITLE_PATTERN, '');
    return true;
  }

  /**
   * Writes the file to the specified path or the relative one
   * if none is set
   * @return {Promise}
   */
  save(path) {
    let content = '';
    const frontmatter = `---\n${yaml.safeDump(this._frontmatter, {'skipInvalid': true})}---\n\n`;
    content += frontmatter;

    /**
    * check if file is imported and if so add a comment in order to inform that
    * the file should not be changed in the amp.dev/docs - repro
    */
    if (this._importURL) {
      const importedText = `<!--
This file is imported from ${this.importURL}.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

`;
      content += importedText;
    }

    content += this._contents;

    path = path ? path : this._path;
    return writeFile.promise(path, content).then(() => {
      LOG.success(`Saved ${path.replace(utils.project.paths.ROOT, '~')}`);
    }).catch((e) => {
      LOG.error(`Couldn't save ${path.replace(utils.project.paths.ROOT, '~')}`, e);
    });
  }
}

module.exports = MarkdownDocument;
