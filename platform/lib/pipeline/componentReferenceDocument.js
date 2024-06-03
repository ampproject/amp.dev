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
const {dirname} = require('path');
const {resolve} = require('url');
const log = require('@lib/utils/log')('Component Reference Document');
const MarkdownDocument = require('@lib/pipeline/markdownDocument.js');
const {FORMAT_WEBSITES} = require('@lib/amp/formatHelper.js');

const DEFAULT_VERSION = 0.1;
const EXTENSION_TYPE_ELEMENT = 'element';
const EXTENSION_TYPE_TEMPLATE = 'template';
const RELATIVE_PATH_BASE = 'https://github.com/ampproject/amphtml/blob/main/';

class ComponentReferenceDocument extends MarkdownDocument {
  constructor(path, contents, extension) {
    super(path, contents);

    this.title = extension.name;
    this.version = extension.version;
    this.versions = extension.versions;
    this.latestVersion = extension.latestVersion;
    if (!this._frontmatter['$category@']) {
      this._frontmatter['$category@'] = 'dynamic-content';
      log.warn(
        `${this.title} doesn't specify '$category@' in its`,
        `frontmatter and is defaulted to 'dynamic-content'.`
      );
    }

    // Force enable TOC for all component docs
    this.toc = true;

    // Verify the component is listed for a format and if it isn't force
    // enable it for the websites runtime
    if (!this.formats.length) {
      this.formats = [FORMAT_WEBSITES];
      log.warn(
        `${this.title} doesn't specify any formats in its`,
        `frontmatter and is force-listed for websites.`
      );
    }

    this.rewriteRelativePaths(
      resolve(RELATIVE_PATH_BASE, dirname(extension.githubPath))
    );

    if (extension.tag && extension.tag.ampLayout) {
      this.layouts = extension.tag.ampLayout.supportedLayouts;
    }

    if (extension.spec && extension.spec.extensionType == 'CUSTOM_TEMPLATE') {
      extension.type = EXTENSION_TYPE_TEMPLATE;
    }

    const scripts = [];
    const requiredExtensions = [];

    if (extension.script) {
      requiredExtensions.push(extension.script.extensionSpec.name);
      scripts.push({
        js: this._generateScript(
          extension.script.extensionSpec.name,
          extension.version,
          extension.type
        ),
        css: this._generateCss(
          extension.script.extensionSpec.name,
          extension.version
        ),
      });

      if (extension.script.requiresExtension) {
        for (const requiredExtension of extension.script.requiresExtension) {
          if (requiredExtensions.includes(requiredExtension)) {
            continue;
          }

          scripts.push({
            js: this._generateScript(
              extension.script.extensionSpec.name,
              DEFAULT_VERSION,
              extension.type
            ),
            css: this._generateCss(
              extension.script.extensionSpec.name,
              DEFAULT_VERSION
            ),
          });
        }
      }
    }

    this.scripts = scripts;
  }

  _generateCss(extensionName, extensionVersion) {
    return `<link rel="stylesheet" href="https://cdn.ampproject.org/v0/${extensionName}-${extensionVersion}.css">`;
  }

  _generateScript(
    extensionName,
    extensionVersion,
    extensionType = EXTENSION_TYPE_ELEMENT
  ) {
    return `<script async custom-${extensionType}="${extensionName}" src="https://cdn.ampproject.org/v0/${extensionName}-${extensionVersion}.js"></script>`;
  }

  get contents() {
    return this._contents;
  }

  set contents(contents) {
    super.contents = contents;

    // The reference documents have some additional things that need
    // to be replaced/rewritten: the headline shouldn't be doubled
    this.stripInlineTitle();
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

  get experimental() {
    return this._frontmatter['experimental'] || false;
  }

  get bento() {
    return this._frontmatter['bento'] || false;
  }

  set bentoPath(hasBento) {
    this._frontmatter['bentoPath'] = hasBento;
  }

  set bentoDocUrl(url) {
    this._frontmatter['bentoDocUrl'] = url;
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

  set latestVersion(version) {
    this._frontmatter['latest_version'] = version;
  }

  set versions(versions) {
    this._frontmatter['versions'] = versions;
  }

  set isCurrent(bool) {
    this._frontmatter['is_current'] = bool;
  }

  get latestVersion() {
    return this._frontmatter['latest_version'];
  }

  get isCurrent() {
    return this._frontmatter['is_current'];
  }
}

module.exports = ComponentReferenceDocument;
