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


class ComponentReferenceDocument extends MarkdownDocument {
  constructor(path, contents, extension) {
    super(path, contents);

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

  _generateScript(extensionName, extensionVersion, extensionType = EXTENSION_TYPE_ELEMENT) {
    return `<script async custom-${extensionType}="${extensionName}" src="https://cdn.ampproject.org/v0/${extensionName}-${extensionVersion}.js"></script>`;
  }

  get supportedFormats() {
    return this._frontmatter['supported_formats'] || [];
  }

  set supportedFormats(formats) {
    this._frontmatter['supported_formats'] = formats;
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
