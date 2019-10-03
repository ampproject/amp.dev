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

const fs = require('fs');
const yaml = require('js-yaml');
const gulp = require('gulp');
const emojiStrip = require('emoji-strip');
const {promisify} = require('util');
const writeFileAsync = promisify(fs.writeFile);
const {GitHubImporter} = require('@lib/pipeline/gitHubImporter');

const WG_GH_REPOSITORY_PATH = 'ampproject';
const WG_DIRECTORY_PATH = 'pages/content/amp-dev/community/working-groups';
/*
Mid HEX Value to set github-label color to either black or white - corresponding to the given background color.
 */
const WG_LABEL_COLOR_THRESHOLD = 7500000;

async function importWorkingGroups() {
  const client = new GitHubImporter();
  const repos = (await client._github.org(WG_GH_REPOSITORY_PATH).reposAsync())[0];

  for (const wg of repos) {
    if (!wg.name.includes('wg-')) {
      continue;
    }

    let meta = await client._github.repo(`${WG_GH_REPOSITORY_PATH}/${wg.name}`, 'meta').contentsAsync('METADATA.yaml');
    meta = yaml.safeLoad(Buffer.from(meta[0].content, 'base64').toString());

    let issues = (await client._github.repo(`${WG_GH_REPOSITORY_PATH}/${wg.name}`).issuesAsync())[0];
    issues = issues.map((issue) => {
      const date = new Date(issue.created_at).toDateString();
      const title = emojiStrip(issue.title);

      issue.labels = issue.labels.map((label) => {
        const txtColor = ((parseInt(`0x${label.color}`) < IMPORT_WGS_LABEL_COLOR_THRESHOLD) ? 'fff' : '000');

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

    await writeFileAsync(`${WG_DIRECTORY_PATH}/${wg.name}.yaml`, yaml.dump({
      '$title': `Working Group: ${meta.title}`,
      'html_url': wg.html_url,
      'name': wg.name,
      'full_name': meta.title,
      'facilitator': meta.facilitator,
      'description': meta.description,
      'issues': issues,
      'members': meta.members,
      'communication': meta.communication,
    }));
    console.log('Imported Working Group: ', wg.name);
  }
}

exports.importWorkingGroups = importWorkingGroups;
