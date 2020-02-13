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
const {join, dirname} = require('path');
const MarkdownDocument = require('./markdownDocument.js');

const DEFAULT_VERSION = 0.1;
const EXTENSION_TYPE_ELEMENT = 'element';
const EXTENSION_TYPE_TEMPLATE = 'template';
const RELATIVE_PATH_BASE = 'https://github.com/ampproject/amphtml/blob/master/';

const INTRO_TABLE_PATTERN = /^((?:[^](?!##))*)<table(\s[^>]*)?>[^]*?<\/table>/m;

class ComponentReferenceDocument extends MarkdownDocument {
  constructor(path, contents, extension) {
    super(path, contents);

    this.title = extension.name;
    this.version = extension.version;
    this.versions = extension.versions;
    this.latestVersion = extension.versions[extension.versions.length - 1];

    // Force enable TOC for all component docs
    this.toc = true;

    this.rewriteRelativePaths(
      join(RELATIVE_PATH_BASE, dirname(extension.githubPath))
    );

    if (this.version == this.latestVersion) {
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
      const scripts = [
        this._generateScript(extension.name, extension.version, extension.type),
      ];
      const requiredExtensions = [
        ...(extension.tag.requiresExtension || []),
        ...(extension.script.requiresExtension || []),
      ];
      for (const requiredExtension of requiredExtensions) {
        if (requiredExtension == extension.name) {
          continue;
        }
        scripts.push(
          this._generateScript(
            requiredExtension,
            DEFAULT_VERSION,
            extension.type
          )
        );
      }

      this.scripts = scripts;
    }
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

    // ..., the manually maintained intro table should be spliced out
    this._contents = this._contents.replace(INTRO_TABLE_PATTERN, '$1');
  }

  get component() {
    return this._frontmatter['component'];
  }

  set component(component) {
    this._frontmatter['component'] = component;
  }

  set layouts(layouts) {
    this._frontmatter['layouts'] = layouts.map(layout => {
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
