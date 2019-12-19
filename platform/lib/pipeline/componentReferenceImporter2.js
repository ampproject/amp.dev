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
require('module-alias/register');

const LATEST_VERSION = 'latest';
const DEFAULT_VERSION = 0.1;

const {GitHubImporter} = require('./gitHubImporter');
const path = require('path');
const project = require('@lib/utils/project');
const validatorRules = require('@ampproject/toolbox-validator-rules');

const ComponentReferenceDocument = require('./componentReferenceDocument.js');

const {Signale} = require('signale');

const log = new Signale({
  'interactive': false,
  'scope': 'ComponentReferenceImporter',
});

// Where to save the documents/collection to
const DESTINATION_BASE_PATH =
  __dirname + '/../../../pages/content/amp-dev/documentation/components/reference';
// Names of the built-in components that need to be fetched from ...
const BUILT_INS = ['amp-img', 'amp-pixel', 'amp-layout'];
// ... this path
const BUILT_IN_PATH = 'builtins';

class ComponentReferenceImporter {
  constructor(githubImporter=new GitHubImporter()) {
    this.githubImporter_ = githubImporter;
  }

  async import() {
    log.start('Beginning to import extension docs ...');
    this.validatorRules = await validatorRules.fetch();

    return this._importExtensionsDocs();
  }

  /**
   * Collects all needed documents from across the repository that should
   * be downloaded and put into collections
   * @return {undefined}
   */
  async _importExtensionsDocs() {
    // Gives the contents of ampproject/amphtml/extensions
    let extensionFiles = await this.githubImporter_.fetchJson('extensions');

    // As inside /extensions each component has its own folder, filter
    // down by directory
    extensionFiles = extensionFiles[0].filter((file) => file.type === 'dir');

    // Add built-in components to list to fetch them all in one go
    for (const builtInExtension of BUILT_INS) {
      extensionFiles.push({'name': builtInExtension, 'path': BUILT_IN_PATH});
    }

    const extensions = [];
    for (const extension of extensionFiles) {
      extensions.push(...(this._getExtensionMetas(extension)));
    }

    for (const extension of extensions) {
      this._createGrowDoc(extension);
    }
  }

  _getExtensionMetas(extension) {
    const spec = this.validatorRules.getExtension('AMP', extension.name);
    if (!spec) {
      log.warn('No extension meta found for: ', extension.name);
      return [];
    }

    const tag = this.validatorRules.raw.tags.find((tag) => {
      return tag.tagName.toLowerCase() == extension.name;
    }) || {};
    const script = this.validatorRules.raw.tags.find((script) => {
      if (!script.extensionSpec || script.tagName != 'SCRIPT') {
        return false;
      }
      return extension.name == script.extensionSpec.name;
    }) || {};

    spec.version = spec.version.filter((version) => {
      return version != LATEST_VERSION;
    });

    spec.version = spec.version.sort((version1, version2) => {
      return parseFloat(version1) > parseFloat(version2);
    });

    const extensionMetas = [
      {
        name: extension.name,
        spec: spec,
        script: script,
        tag: tag,
        version: spec.version.pop(),
        githubPath: this._getGitHubPath(extension, null),
      },
    ];
    for (const version of spec.version) {
      extensionMetas.push(
          {
            name: extension.name,
            spec: spec,
            script: script,
            tag: tag,
            version: version,
            githubPath: this._getGitHubPath(extension, version),
          },
      );
    }

    return extensionMetas;
  }

  /**
   * Tries to find the documentation markdown file for a certain component
   * @param  {Object} extension
   * @param  {String} version
   * @return {String}
   */
  _getGitHubPath(extension, version) {
    return path.join(extension.path, version || '', `${extension.name}.md`);
  }

  async _createGrowDoc(extension) {
    let fileContents;
    try {
      fileContents = await this.githubImporter_.fetchFile(extension.githubPath);
    } catch(e) {
      log.error(`Could not fetch reference for ${extension.name} from ${extension.githubPath}`);
      return;
    }

    const docPath = path.join(DESTINATION_BASE_PATH, `${extension.name}-${extension.version}.md` );

    try {
      const doc = new ComponentReferenceDocument(docPath, fileContents, extension);
      await doc.save(docPath);
    } catch (e) {
      log.error('Could not create doc for: ', extension.name, e);
    }
  }
}

// If not required, run directly
if (!module.parent) {
  const importer = new ComponentReferenceImporter();
  importer.import().catch((err) => console.log(err));
}

module.exports = ComponentReferenceImporter;
