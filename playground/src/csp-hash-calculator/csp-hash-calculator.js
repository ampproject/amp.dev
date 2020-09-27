// Copyright 2020 The AMPHTML Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {calculateHash} from '@ampproject/toolbox-script-csp';

export function createCspHashCalculator(editor) {
  return new CspHashCalculator(editor);
}

class CspHashCalculator {
  constructor(editor) {
    this.editor = editor;
    this.head = {from: null, to: null};
    this.metaAmpScriptSrc = {from: null, to: null};
    this.script = {from: null, to: null};

    // Populated while parsing the documents. Contains the DOM strings
    // in the form of `<script target="amp-script">...</script>`
    this.inlineScripts = [];

    // Stores all hashes that are currently added to the document
    // to prevent update loops
    this.createdHashes = [];
  }

  /**
   * Called by the playground's event system as soon as code has
   * changed by either user input or another plugin
   */
  update() {
    // Reset previous parsing results as the document has changed
    // and previously saved positions might be stale
    this.head = {};
    this.metaAmpScriptSrc = {};
    this.inlineScripts = [];

    this._parseDocument();

    if (!this.inlineScripts.length) {
      return;
    }

    // If there is no existing meta[name="amp-script-src"] create one
    // and return as this triggers a new update anyway
    if (!this.metaAmpScriptSrc.to) {
      this.editor.replaceRange(`${this._getMetaAmpScriptSrc()}\n`, {
        line: this.head.to.line,
        ch: 0,
      });
      this.editor.codeMirror.indentLine(this.head.to.line);
      return;
    }

    let existingHashes = this._getExistingHashes();
    let inlineHashes = this._getInlineHashes();

    // Check if any inline hash has updated, if no hashes are left
    // meta[name="amp-script-src"] is up to date
    inlineHashes = inlineHashes.filter(
      (hash) => !existingHashes.includes(hash)
    );
    if (!inlineHashes.length) {
      return;
    }

    // Now filter out hashes that have previously been added by
    // the calculator and store the newly created ones
    existingHashes = existingHashes.filter(
      (hash) => !this.createdHashes.includes(hash)
    );
    this.createdHashes = inlineHashes;

    this.editor.replaceRange(
      `${this._getMetaAmpScriptSrc([...inlineHashes, ...existingHashes])}`,
      this.metaAmpScriptSrc.from,
      this.metaAmpScriptSrc.to
    );
  }

  _getExistingHashes() {
    const html = this.editor.codeMirror.getRange(
      this.metaAmpScriptSrc.from,
      this.metaAmpScriptSrc.to
    );
    const hashes = html.match(/content="(.*?)"/ms)[1] || '';
    return hashes.split(' ');
  }

  _getMetaAmpScriptSrc(hashes = []) {
    return `<meta name="amp-script-src" content="${hashes.join(' ')}">`;
  }

  _getInlineHashes() {
    return this.inlineScripts.map((html) => {
      const script = html.replace(/<script .*?>|<\/script>/gms, '');
      return calculateHash(script);
    });
  }

  /**
   * Used by _parseDocument to determine the position of the head
   * to have a location to add the meta element to if there is none yet
   * @param  {Object} token
   * @param  {Integer} line
   */
  _parseHead(token, line) {
    if (token.type == 'tag' && token.string == 'head') {
      if (!this.head.from) {
        this.head.from = {line, ch: token.start - 1};
      } else {
        this.head.to = {line, ch: token.end + 1};
      }
    }
  }

  /**
   * Used by _parseDocument to find a possibly existing
   * meta[name="amp-script-src"] element
   * @param  {Object} token
   * @param  {Integer} line
   */
  _parseMetaAmpScriptSrc(token, line) {
    if (!this.metaAmpScriptSrc.to) {
      if (token.type == 'tag' && token.string == 'meta') {
        this.metaAmpScriptSrc.from = {line, ch: token.start - 1};
      }

      if (this.metaAmpScriptSrc.from && token.type == 'tag bracket') {
        this.metaAmpScriptSrc.to = {line, ch: token.end + 1};
        // If this meta element has a name attribute with amp-script-src
        // we found our meta element, otherwise start search again
        if (
          !this.editor.codeMirror
            .getRange(this.metaAmpScriptSrc.from, this.metaAmpScriptSrc.to)
            .includes('name="amp-script-src"')
        ) {
          this.metaAmpScriptSrc = {};
        }
      }
    }
  }

  /**
   * Used by _parseDocument. Finds all script tags and stores all that
   * match script[target="amp-script"]
   * @param  {Object} token
   * @param  {Integer} line
   */
  _parseScripts(token, line) {
    if (token.type == 'tag' && token.string == 'script') {
      if (!this.script.from) {
        this.script.from = {line, ch: token.start - 1};
      } else {
        this.script.to = {line, ch: token.end + 7};
        this.script.html = this.editor.codeMirror.getRange(
          this.script.from,
          this.script.to
        );

        if (this.script.html.includes('target="amp-script"')) {
          this.inlineScripts.push(this.script.html);
        }

        this.script = {};
      }
    }
  }

  /**
   * Walks the source that is currently in CodeMirror and tries
   * to parse various elements from it
   */
  _parseDocument() {
    for (let line = 0; line < this.editor.lineCount(); line++) {
      const tokens = this.editor.getLineTokens(line);
      for (const token of tokens) {
        this._parseHead(token, line);
        this._parseMetaAmpScriptSrc(token, line);
        this._parseScripts(token, line);
      }
    }
  }
}
