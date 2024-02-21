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

const DEFAULT_VERSION = '0.1';
const VERSION_PATTERN = /\d\.\d/;
const LATEST_VERSION = 'latest';

const {GitHubImporter, DEFAULT_REPOSITORY} = require('./gitHubImporter');
const {BUILT_IN_COMPONENTS} = require('@lib/common/AmpConstants.js');
const {BENTO_COMPONENTS_LIST} = require('@lib/utils/project.js').paths;
const fs = require('fs').promises;
const path = require('path');
const del = require('del');
const validatorRules = require('@ampproject/toolbox-validator-rules');

const ComponentReferenceDocument = require('./componentReferenceDocument.js');
const ComponentVersionImporter = require('./ComponentVersionImporter');

const log = require('@lib/utils/log')('Component Reference Importer');
const config = require(
  __dirname + '/../../config/imports/componentReference.json'
);

// Where to save the documents/collection to
const DESTINATION_BASE_PATH =
  __dirname +
  '/../../../pages/content/amp-dev/documentation/components/reference';

// Formats
const FORMATS = ['AMP', 'AMP4ADS', 'AMP4EMAIL'];

// ... this path
const BUILT_IN_PATH = 'src/builtins';
const AMP_STORY_TAG = 'amp-story';
const MARKDOWN_EXTENSION = '.md';

class ComponentReferenceImporter {
  constructor(githubImporter = new GitHubImporter()) {
    this.githubImporter_ = githubImporter;
  }

  async import() {
    log.await('Cleaning previously imported extension docs ...');
    await del([
      `${DESTINATION_BASE_PATH}/*.md`,
      `!${DESTINATION_BASE_PATH}/*@*.md`,
    ]);
    this.validatorRules = await validatorRules.fetch();
    // Gives the contents of ampproject/amphtml/extensions
    this.extensions = await this._listExtensions();

    log.info('Importing latest component versions');
    const latestStableComponents = await new ComponentVersionImporter().run();
    log.start('Beginning to import extension docs ...');
    const importedExtensions = (await this._importExtensions())
      .flat()
      .filter((ext) => ext != null);
    const bentoComponents = new Map();

    for (const growDoc of importedExtensions) {
      if (growDoc.bento) {
        bentoComponents.set(growDoc.title, {
          name: growDoc.title,
          bentoName: growDoc.title.replace('amp-', 'bento-'),
          experimental: growDoc.experimental,
          path:
            growDoc.servingPath ||
            `/documentation/components/${growDoc.title}-v${growDoc.version}.html`,
          version: growDoc.version,
        });
      }
    }

    for (const growDoc of importedExtensions) {
      const bentoComponent = bentoComponents.get(growDoc.title);
      if (bentoComponent) {
        growDoc.bentoPath = bentoComponent.path;
        growDoc.bentoDocUrl = `https://bentojs.dev/components/${bentoComponent.bentoName}/`;
      }

      const latestStableComponent = latestStableComponents[growDoc.title];
      if (latestStableComponent) {
        growDoc.latestVersion = latestStableComponent;
      }
      if (growDoc.latestVersion === growDoc.version) {
        growDoc.isCurrent = true;
        growDoc.servingPath = `/documentation/components/${growDoc.title}.html`;
      }

      try {
        await growDoc.save(growDoc.path);
      } catch (e) {
        log.error(`Failed to write ${growDoc.path}`, e);
      }
    }
    fs.writeFile(
      BENTO_COMPONENTS_LIST,
      JSON.stringify(Array.from(bentoComponents.values()), null, 2),
      'utf-8'
    );

    log.complete('Finished importing extension docs!');
  }

  /**
   * Fetches the list of available extensions from GitHub
   * @return {Promise}
   */
  async _listExtensions() {
    let extensions = await this.githubImporter_.fetchJson('extensions');
    // As inside /extensions each component has its own folder, filter
    // down by directory. At the same time filter out directories which
    // are safe to ignore as they are not holding a public-facing extension
    // and check if only some components are configured to be imported
    extensions = extensions[0].filter((file) => {
      if (file.type !== 'dir') {
        return false;
      }

      if (config.only.length && !config.only.includes(file.name)) {
        return false;
      }

      if (file.name.endsWith('-impl') || file.name.endsWith('-polyfill')) {
        return false;
      }

      return true;
    });

    return extensions;
  }

  /**
   * Collects all needed documents from across the repository that should
   * be downloaded and put into collections
   * @return {Promise}
   */
  async _importExtensions() {
    const imports = [];
    for (const extension of this.extensions) {
      imports.push(this._importExtension(extension));
    }

    // Add built-in components to list to fetch them all in one go
    for (const builtIn of BUILT_IN_COMPONENTS) {
      imports.push(this._importBuiltIn(builtIn));
    }

    return Promise.all(imports);
  }

  async _importBuiltIn(name) {
    return this._createGrowDoc({
      name: name,
      tag: this.validatorRules.raw.tags.find((tag) => {
        return tag.tagName.toLowerCase() == name;
      }),
      version: DEFAULT_VERSION,
      versions: [DEFAULT_VERSION],
      latestVersion: DEFAULT_VERSION,
      githubPath: path.join(BUILT_IN_PATH, name, `${name}.md`),
    });
  }

  async _importExtension(extension) {
    extension.files = await this._listExtensionFiles(extension);
    const documents = this._getExtensionMetas(extension);

    // amp-story has a few sub components which are documented in their
    // own documents but share the same meta information
    if (extension.name == AMP_STORY_TAG) {
      for (const filePath of extension.files) {
        if (
          !filePath.includes(`${AMP_STORY_TAG}-`) ||
          !filePath.endsWith(MARKDOWN_EXTENSION)
        ) {
          continue;
        }

        const fileName = path.basename(filePath);
        const extensionName = fileName.replace(MARKDOWN_EXTENSION, '');

        // Verify the extension isn't available standalone by checking
        // the list of available ones on GitHub and verify its a extension
        // at all by searching for a tag
        if (
          this.extensions.find((extension) => {
            return extension.name == extensionName;
          }) ||
          !this._findExtensionTag(extensionName)
        ) {
          continue;
        }

        const storyExtension = Object.assign({}, documents[0], {
          name: extensionName,
          githubPath: documents[0].githubPath.replace(
            `${AMP_STORY_TAG}${MARKDOWN_EXTENSION}`,
            fileName
          ),
        });
        documents.push(storyExtension);
      }
    }

    return Promise.all(documents.map((doc) => this._createGrowDoc(doc)));
  }

  /**
   * Fetches all paths inside an extension directory to be able to check
   * file existance before downloading without doing an extra request
   * @param  {Object}  extension
   * @return {Promise}
   */
  async _listExtensionFiles(extension) {
    const fetchFromMaster = config.fetchFromMaster.includes(extension.name);
    const root = await this.githubImporter_.listDirectory(
      extension.path,
      DEFAULT_REPOSITORY,
      fetchFromMaster
    );
    let tree = root.map((file) => {
      if (file.match(VERSION_PATTERN)) {
        return this.githubImporter_.listDirectory(
          file,
          DEFAULT_REPOSITORY,
          fetchFromMaster
        );
      }

      return Promise.resolve([file]);
    });

    tree = await Promise.all(tree);
    return tree.reduce((acc, val) => acc.concat(val), []);
  }

  /**
   * Returns the first available tag that relies on a specific extension
   * @param  {String} extensionName
   * @return {Object|undefined}
   */
  _findExtensionTag(extensionName) {
    return this.validatorRules.raw.tags.find((tag) => {
      return tag.tagName.toLowerCase() == extensionName;
    });
  }

  /**
   * Returns information about the `<script>` tag required to use a
   * specific extension
   * @param  {String} extensionName
   * @return {Object|undefined}
   */
  _findExtensionScript(extensionName) {
    return this.validatorRules.raw.tags.find((script) => {
      if (!script.extensionSpec || script.tagName != 'SCRIPT') {
        return false;
      }
      return extensionName == script.extensionSpec.name;
    });
  }

  _getExtensionMetas(extension) {
    let spec;
    for (const format of FORMATS) {
      spec = this.validatorRules.getExtension(format, extension.name);
      if (spec) {
        break;
      }
    }
    if (!spec) {
      log.warn('No extension meta found for:', extension.name);
      return [];
    }

    const tag = this._findExtensionTag(extension.name) || {};
    const script = this._findExtensionScript(extension.name) || {};

    // Determine the latest version based on the validator rules
    spec.version = spec.version.filter((version) => version != LATEST_VERSION);
    spec.version = spec.version.sort((version1, version2) => {
      return parseFloat(version1) > parseFloat(version2);
    });
    spec.latestVersion = spec.version[spec.version.length - 1];

    // Parse all available versions from the file system (even unreleased ones)
    const versions = new Set();
    for (const file of extension.files) {
      const path = file.substring(`extensions/${spec.name}/`.length);
      const match = path.match(/^(\d+\.\d+)\//);
      if (match) {
        versions.add(match[1]);
      }
    }
    spec.version = Array.from(versions);

    // Skip versions for which there is no dedicated doc
    spec.version = spec.version.filter((version) => {
      return !!this._getGitHubPath(extension, version);
    });

    const extensionMetas = [];
    for (const version of spec.version) {
      extensionMetas.push({
        name: extension.name,
        spec: spec,
        script: script,
        tag: tag,
        version: version,
        versions: spec.version,
        latestVersion: spec.latestVersion,
        githubPath: this._getGitHubPath(extension, version),
      });
    }

    return extensionMetas;
  }

  /**
   * Tries to find the documentation markdown file for a certain component
   * @param  {Object} extension
   * @param  {String} version
   * @param  {String} latestVersion
   * @return {String|null}
   */
  _getGitHubPath(extension, version) {
    let gitHubPath;
    const fileName = `${extension.name}.md`;

    // Check if there is a directory for the version of the component that
    // holds the fitting documentation
    gitHubPath = path.join(extension.path, version, fileName);
    if (extension.files.includes(gitHubPath)) {
      return gitHubPath;
    }

    // Otherwise assume the doc in the extension root is valid
    // for all versions of this component (Full AMP and Bento)
    gitHubPath = path.join(extension.path, fileName);
    if (extension.files.includes(gitHubPath)) {
      return gitHubPath;
    }

    // If no file can be found at the first location it means the extension
    // doesn't follow the above patterns and needs to be fixed manually
    log.warn(`No document found for ${extension.name} v${version}`);
    return null;
  }

  /**
   * The last step in the importing process: uses all data gathered before
   * (GitHub path, extension name, version) to load the actual document.
   * @param  {Object}  extension
   * @return {Promise}
   */
  async _createGrowDoc(extension) {
    if (!extension.githubPath) {
      // It's safe to return here without informing the user as non existing
      // documents had been reported before
      return;
    }

    let fileContents;
    try {
      const fetchFromMaster = config.fetchFromMaster.includes(extension.name);
      if (fetchFromMaster) {
        log.warn(`Fetching ${extension.githubPath} from master`);
      }

      fileContents = await this.githubImporter_.fetchFile(
        extension.githubPath,
        DEFAULT_REPOSITORY,
        fetchFromMaster
      );
    } catch (e) {
      log.error(`Failed to fetch ${extension.githubPath}`, e);
      return;
    }

    let fileName;
    if (extension.version) {
      fileName = `${extension.name}-v${extension.version}.md`;
    } else {
      fileName = `${extension.name}.md`;
    }

    const docPath = path.join(DESTINATION_BASE_PATH, fileName);
    return new ComponentReferenceDocument(docPath, fileContents, extension);
  }
}

// If not required, run directly
if (!module.parent) {
  const importer = new ComponentReferenceImporter();
  importer.import().catch((err) => log.error(err));
}

module.exports = ComponentReferenceImporter;
