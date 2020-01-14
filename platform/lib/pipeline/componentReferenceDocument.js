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
const MarkdownDocument = require('./markdownDocument.js');

const DEFAULT_VERSION = 0.1;
const EXTENSION_TYPE_ELEMENT = 'element';
const EXTENSION_TYPE_TEMPLATE = 'template';

const HEADLINE_PATTERN = /#.*/m;
const INTRO_TABLE_PATTERN = /<table(\s[^>]*)?>[^]*?<\/table>/m;


class ComponentReferenceDocument extends MarkdownDocument {
  constructor(path, contents, extension) {
    super(path, contents);

    this.title = extension.name;
    this.version = extension.version;
    this.versions = extension.versions;
    this._contents = this._contents.replace(HEADLINE_PATTERN, '').replace(INTRO_TABLE_PATTERN, '');

    // if (!this.teaser.text) {
    // }
    this.teaser = { text: this._parseTeaserText(contents) };

    if (this.version == extension.versions[extension.versions.length - 1]) {
      this.isCurrent = true;
      this.servingPath = `/documentation/components/${extension.name}.html`;
    }

    if (extension.tag && extension.tag.ampLayout) {
      this.layouts = extension.tag.ampLayout.supportedLayouts;
    }

    if (extension.spec && extension.spec.extensionType == 'CUSTOM_TEMPLATE') {
      extension.type = EXTENSION_TYPE_TEMPLATE;
    }

    if (extension.script) {
      const scripts = [this._generateScript(extension.name, extension.version, extension.type)];
      const requiredExtensions = [
        ...(extension.tag.requiresExtension || []),
        ...(extension.script.requiresExtension || []),
      ];
      for (const requiredExtension of requiredExtensions) {
        if (requiredExtension == extension.name) {
          continue;
        }
        scripts.push(this._generateScript(requiredExtension, DEFAULT_VERSION, extension.type));
      }

      this.scripts = scripts;
    }
  }

  _parseTeaserText(contents) {
    // Splice out an excerpt to show in the teaser ...
    // const FIRST_PARAGRAPH = /#.*$\n+(?!<table>)(.*)$/gm;
    // let excerpt = FIRST_PARAGRAPH.exec(contents);
    // if (excerpt == null || !excerpt[1].trim()) {
    //   const SECOND_PARAGRAPH = /##.*$\n+((.|\n(?=\w))*)$/gm;
    //   excerpt = SECOND_PARAGRAPH.exec(contents);
    // }
    //
    // // If the extraction of an excerpt was successful write it to the teaser
    // if (excerpt) {
    //   // Strip out all possible HTML tags
    //   excerpt = excerpt[1].replace(/<\/?[^>]+(>|$)/g, '');
    //   // Unwrap back ticks
    //   excerpt = excerpt.replace(/`(.+)`/g, '$1');
    //   // And unwrap possible markdown links
    //   excerpt = excerpt.replace(/\[(.+)\]\(.+\)/g, '$1');
    // }

    const intro = contents.match(/(?<=-->)([^##]*)?/m);
    console.log(intro);
    return excerpt;
  }

  _generateScript(extensionName, extensionVersion, extensionType = EXTENSION_TYPE_ELEMENT) {
    return `<script async custom-${extensionType}="${extensionName}" src="https://cdn.ampproject.org/v0/${extensionName}-${extensionVersion}.js"></script>`;
  }

  set contents(contents) {
    this._convertSyntax();
  }

  get component() {
    return this._frontmatter['component'];
  }

  set component(component) {
    this._frontmatter['component'] = component;
  }

  set layouts(layouts) {
    this._frontmatter['layouts'] = layouts.map((layout) => {
      return layout.toLowerCase().replace('_', '-');
    });
  }

  get version() {
    return this._frontmatter['version'];
  }

  set scripts(scripts) {
    this._frontmatter['scripts'] = scripts;
  }

  set version(version) {
    this._frontmatter['version'] = version;
  }

  set versions(versions) {
    this._frontmatter['versions'] = versions;
  }

  set isCurrent(bool) {
    this._frontmatter['is_current'] = bool;
  }

  get isCurrent() {
    return this._frontmatter['is_current'];
  }
}

module.exports = ComponentReferenceDocument;
