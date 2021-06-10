/**
 * Copyright 2021 The AMP HTML Authors. All Rights Reserved.
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

const {GitHubImporter} = require('./gitHubImporter');
const {COMPONENT_VERSIONS, COMPONENT_VERSIONS_STATIC} =
  require('@lib/utils/project.js').paths;
const {writeFile} = require('fs').promises;
const validatorRulesProvider = require('@ampproject/toolbox-validator-rules');

class ComponentVersionImporter {
  constructor(githubImporter = new GitHubImporter()) {
    this.githubImporter_ = githubImporter;
  }

  async run() {
    const validatorRules = await validatorRulesProvider.fetch();
    const storyTags = validatorRules.raw.tags.filter((tag) => {
      return tag.tagName.toLowerCase().startsWith('amp-story-');
    });
    const componentInfo = JSON.parse(
      await this.githubImporter_.fetchFile(
        '/build-system/compile/bundles.config.extensions.json'
      )
    );
    const latestComponentVersions = {};
    for (const component of componentInfo) {
      latestComponentVersions[component.name] = component.latestVersion;
      if (component.name === 'amp-story') {
        for (const storyTag of storyTags) {
          const storyTagName = storyTag.tagName.toLowerCase();
          latestComponentVersions[storyTagName] = component.latestVersion;
        }
      }
    }
    const contents = JSON.stringify(latestComponentVersions, null, 2);
    // required by grow and express
    await writeFile(COMPONENT_VERSIONS, contents, 'utf-8');
    // required by playground
    await writeFile(COMPONENT_VERSIONS_STATIC, contents, 'utf-8');
    return latestComponentVersions;
  }
}

// If not required, run directly
if (!module.parent) {
  new ComponentVersionImporter().run();
}

module.exports = ComponentVersionImporter;
