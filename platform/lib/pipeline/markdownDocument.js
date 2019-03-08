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

const TOC_MARKER = '[TOC]';
// It doesn't make sense to give every MarkdownDocument their own logger instance
// therefore have one shared one
const LOG = new Signale({'scope': 'Markdown Documents'});

class MarkdownDocument {
  constructor(path, contents) {
    this._contents = contents.trim();

    this._bootstrapFrontmatter();
    this._convertSyntax();

    this.toc = contents.includes(TOC_MARKER) ? false : true;
    this.path = path;
  }

  set toc(active) {
    // Remove markers from document to have them in a defined spot
    this._contents = this._contents.replace(TOC_MARKER, '');

    // And if TOC should not be rendered mark it in the frontmatter
    if (!active) {
      this._frontmatter['toc'] = false;
    }

    this._toc = active;
  }

  get path() {
    return this._path;
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

  get category() {
    return this._frontmatter['$category@'] || this._frontmatter['$category'];
  }

  set category(category) {
    this._frontmatter['$category@'] = category;
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
   * Escapes mustache style tags to not interfer with Jinja2
   * @param  {String} contents
   * @return {String}          The rewritten input
   */
  static escapeMustacheTags(contents) {
    return contents.replace(/`([^{`]*)(\{\{[^`]*\}\})([^`]*)`/g, '{% raw %}`$1$2$3`{% endraw %}');
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
   * Rewrites code fences to python-markdown syntax while also checking
   * if {{ }} need to be fenced to not interfer with jinja2
   * @param  {String} contents
   * @return {String}          The rewritten content
   */
  static rewriteCodeBlocks(contents) {
    // Rewrite code blocks in fence syntax
    contents =
      contents.replace(/(```)(([A-z-]*)\n)(((?!```)[\s\S])+)(```\n)/gm, (match, p1, p2, p3, p4) => {
      // Fence curly braces to not mess with Grow/jinja2
        if (p4.indexOf('{{') > -1) {
          p4 = '{% raw %}' + p4 + '{% endraw %}';
        }
        return '[sourcecode' + (p3 ? ':' + p3 : ':none') + ']\n' + p4 + '[/sourcecode]\n';
      });

    return contents;
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
    const frontmatter = `---\n${yaml.safeDump(this._frontmatter, {'skipInvalid': true})}---\n\n`;

    path = path ? path : this._path;
    return writeFile.promise(path, frontmatter + this._contents).then(() => {
      LOG.success(`Saved ${path.replace(utils.project.paths.ROOT, '~')}`);
    }).catch((e) => {
      LOG.error(`Couldn't save ${path.replace(utils.project.paths.ROOT, '~')}`, e);
    });
  }
}

module.exports = MarkdownDocument;
