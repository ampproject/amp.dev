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
const emojiStrip = require('emoji-strip');
const {promisify} = require('util');
const writeFileAsync = promisify(fs.writeFile);
const {GitHubImporter} = require('@lib/pipeline/gitHubImporter');
const log = require('@lib/utils/log')('Import Working Groups');

/* The GitHub organisation the repositories imported from are located */
const WG_GH_ORGANISATION = 'ampproject';
/* Path where the roadmap data gets imported to */
const WG_DIRECTORY_PATH = 'pages/content/amp-dev/community/working-groups';

const ALLOWED_ISSUE_TYPES = ['Type: Status Update'];


async function importRoadmap() {
  const client = new GitHubImporter();
  const repos = (
    await client._github.org(WG_GH_ORGANISATION).reposAsync(1, 100)
  )[0];

  log.start('Start importing Roadmap..');

  for (const wg of repos) {
    if (!wg.name.startsWith('wg-')) {
      continue;
    }
    const name = wg.name.substr(3);
    log.start('--> Import data for: ', name);


    // Get Issues for Working Group
    let issues = (
      await client._github.repo(`${WG_GH_ORGANISATION}/${wg.name}`).issuesAsync()
    )[0];
    issues = issues.map((issue) => {
      const date = new Date(issue.created_at).toDateString();
      const title = emojiStrip(issue.title);
      const category = issue.labels[0] ? issue.labels[0].name : '';

      if (ALLOWED_ISSUE_TYPES.includes(category)) {
        return {
          'title': title,
          'html_url': issue.html_url,
          'created_at': date,
          'author': issue.user.login,
          'number': issue.number,
          'labels': category,
        };
      } else {
        return;
      }
    });

    log.info(issues);

  }
}

exports.importRoadmap = importRoadmap;
