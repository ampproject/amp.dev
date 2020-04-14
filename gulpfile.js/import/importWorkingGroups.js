/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
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
 * limitations under the License.ä
 */

'use strict';

require('module-alias/register');

const fs = require('fs');
const yaml = require('js-yaml');
const emojiStrip = require('emoji-strip');
const {promisify} = require('util');
const writeFileAsync = promisify(fs.writeFile);
const {
  GitHubImporter,
  DEFAULT_ORGANISATION,
} = require('@lib/pipeline/gitHubImporter');
const log = require('@lib/utils/log')('Import Working Groups');

/* Path where the working group data gets imported to */
const WG_DIRECTORY_PATH = 'pages/content/amp-dev/community/working-groups';
/* Threshold for label background color from when color should switch to white */
const WG_LABEL_COLOR_THRESHOLD = 7500000;

async function importWorkingGroups() {
  const client = new GitHubImporter();
  const repos = (
    await client._github.org(DEFAULT_ORGANISATION).reposAsync(1, 100)
  )[0];

  log.start('Start importing Working Groups..');

  for (const wg of repos) {
    if (!wg.name.startsWith('wg-')) {
      continue;
    }
    const name = wg.name.substr(3);

    let meta = null;
    try {
      meta = await client._github
        .repo(`${DEFAULT_ORGANISATION}/${wg.name}`)
        .contentsAsync('METADATA.yaml');
    } catch (e) {
      log.warn(`No METADATA.yaml for working group ${wg.name}`);
      continue;
    }
    try {
      meta = yaml.safeLoad(Buffer.from(meta[0].content, 'base64').toString());
    } catch (e) {
      log.error(
        `Failed loading ${DEFAULT_ORGANISATION}/${wg.name}/METADATA.yaml`,
        e
      );
      continue;
    }

    let issues = (
      await client._github
        .repo(`${DEFAULT_ORGANISATION}/${wg.name}`)
        .issuesAsync()
    )[0];
    issues = issues.map((issue) => {
      const date = new Date(issue.created_at).toDateString();
      const title = emojiStrip(issue.title);

      issue.labels = issue.labels.map((label) => {
        const txtColor =
          parseInt(`0x${label.color}`) < WG_LABEL_COLOR_THRESHOLD
            ? 'fff'
            : '000';

        return {
          'name': label.name,
          'background_color': label.color,
          'txt_color': txtColor,
        };
      });

      return {
        'title': title,
        'html_url': issue.html_url,
        'created_at': date,
        'author': issue.user.login,
        'number': issue.number,
        'labels': issue.labels,
      };
    });

    await writeFileAsync(
      `${WG_DIRECTORY_PATH}/${name}.yaml`,
      yaml.dump({
        '$title': `Working Group: ${meta.title}`,
        '$titles': {'navigation': 'Working Groups'},
        'html_url': wg.html_url,
        'name': name,
        'full_name': meta.title,
        'facilitator': meta.facilitator,
        'description': meta.description,
        'issues': issues,
        'members': meta.members || [],
        'communication': meta.communication || [],
      })
    );

    log.success('Imported working group data for:', wg.name);
  }
}

exports.importWorkingGroups = importWorkingGroups;
