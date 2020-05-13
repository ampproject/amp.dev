// Copyright 2018 The AMPHTML Authors
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

/* eslint-disable new-cap */
import { calculateHash } from '@ampproject/toolbox-script-csp'

export function createCspHashCalculator(editor) {
  return new CspHashCalculator(editor);
}

class CspHashCalculator {
  constructor(editor) {
    this.editor = editor;
    this.head = {from: null, to: null};
    this.metaAmpScriptSrc = {from: null, to: null};

    // Populated while parsing the documents. Contains the DOM strings either
    // in the form of `<script target="amp-script">...</script>`
    this.inlineScripts = [];

    // Stores all hashes that are currently added to the document
    // to prevent update loops
    this.createdHashes = [];
  }

  update() {
    // Throw away previously parsed scripts and get them from the document
    this.inlineScripts = [];
    this._parseDocument();

    if (!this.inlineScripts.length) {
      return;
    }

    // If there is no existing meta[name="amp-script-src"] create one
    // and return as this triggers a new update anyway
    if (!this.metaAmpScriptSrc.to) {
      this.editor.replaceRange(`${this._getMetaAmpScriptSrc()}\n`, {line: this.head.to.line, ch: 0});
      this.editor.codeMirror.indentLine(this.head.to.line);
      return;
    }

    let existingHashes = this._getExistingHashes();
    let inlineHashes = this._getInlineHashes();

    // Check if any inline hash has updated, if no hashes are left
    // meta[name="amp-script-src"] is up to date
    inlineHashes = inlineHashes.filter((hash) => !existingHashes.includes(hash));
    if (!inlineHashes.length) {
      return;
    }

    // Now filter out hashes that have previously been added by
    // the calculator and store the newly created ones
    existingHashes = existingHashes.filter((hash) => !this.createdHashes.includes(hash));
    this.createdHashes = inlineHashes;


    this.editor.replaceRange(`${this._getMetaAmpScriptSrc([...inlineHashes, ...existingHashes])}`, this.metaAmpScriptSrc.from, this.metaAmpScriptSrc.to);
  }

  _getExistingHashes() {
    const html = this.editor.codeMirror.getRange(this.metaAmpScriptSrc.from, this.metaAmpScriptSrc.to);
    return html.match(/(?<=content=").*?(?=")/gms)[0].split(' ');
  }

  _getMetaAmpScriptSrc(hashes = []) {
    return `<meta name="amp-script-src" content="${hashes.join(' ')}"/>`
  }

  _getInlineHashes() {
    return this.inlineScripts.map((html) => {
      const script = html.replace(/<script .*?>|<\/script>/gms, '');
      return calculateHash(script);
    });
  }

  _parseDocument() {
    const lineCount = this.editor.lineCount();

    // Reset previous parsing results
    this.head = {};
    this.metaAmpScriptSrc = {};
    this.scripts = [];

    let i = 0;
    let script = {from: null, to: null};
    while (i < lineCount) {
      const tokens = this.editor.getLineTokens(i);

      let j = 0;
      while (j < tokens.length) {
        const token = tokens[j];
        // Save head position for to know where to add the meta element if
        // there is not already one. +/-1 to include tag brackets
        if (token.type == 'tag' && token.string == 'head') {
          if (!this.head.from) {
            this.head.from = {line: i, ch: token.start - 1};
          } else {
            this.head.to = {line: i, ch: token.end + 1};
          }
        }

        // Also check wether there is an existing meta[name="amp-script-src"]
        // we could add to if none hasn't been found yet
        if (!this.metaAmpScriptSrc.to) {
          if (token.type == 'tag' && token.string == 'meta') {
            this.metaAmpScriptSrc.from = {line: i, ch: token.start - 1};
          }

          if (this.metaAmpScriptSrc.from && token.type == 'tag bracket') {
            this.metaAmpScriptSrc.to = {line: i, ch: token.end + 1};
            // If this meta element has a name attribute with amp-script-src
            // we found our meta element, otherwise start search again
            if (!this.editor.codeMirror.getRange(this.metaAmpScriptSrc.from, this.metaAmpScriptSrc.to).includes('name="amp-script-src"')) {
              this.metaAmpScriptSrc = {};
            }
          }
        }

        // Look for script elements with target="amp-script" attribute
        if (token.type == 'tag' && token.string == 'script') {
          if (!script.from) {
            script.from = {line: i, ch: token.start - 1};
          } else {
            script.to = {line: i, ch: token.end + 7};
            script.html = this.editor.codeMirror.getRange(script.from, script.to);

            if (script.html.includes('target="amp-script"')) {
              this.inlineScripts.push(script.html);
            }

            script = {};
          }
        }

        j++;
      }

      i++;
    }
  }
}
