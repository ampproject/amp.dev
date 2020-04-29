/**
 * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
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

const utils = require('@lib/utils');
const fs = require('fs');
const yaml = require('js-yaml');
const emojiStrip = require('emoji-strip');
const {promisify} = require('util');
const writeFileAsync = promisify(fs.writeFile);
const {
  GitHubImporter,
  DEFAULT_ORGANISATION,
} = require('@lib/pipeline/gitHubImporter');
const config = require(__dirname +
  '/../../platform/config/imports/roadmap.json');
const log = require('@lib/utils/log')('Import Roadmap');

/* Path where the roadmap data gets imported to */
const ROADMAP_DIRECTORY_PATH = utils.project.absolute('pages/shared/data');

const ALLOWED_ISSUE_TYPES = ['Type: Status Update', 'Status Update'];

// RegEx to extract date from issue title
const STATUS_UPDATE_REGEX = /(\d\d\d\d)-(\d*)-(\d*)/;
const AMP_COMPONENT_REGEX = /\s(<amp-[\S]*>)/g;
const TEXT_BLOCK_REGEX = /#{1,3} [^#]+/g;
/**
 * Extract status update issues from working groups and
 * return them sorted by date/quarter
 *
 * @return []
 */

async function importRoadmap() {
  let workingGroups = [];
  let roadmap = [];

  log.start('Importing Roadmap data for ..');

  const client = new GitHubImporter();
  const repos = (
    await client._github.org(DEFAULT_ORGANISATION).reposAsync(1, 100)
  )[0];

  // Get status update issues for working groups
  for (const wg of repos) {
    if (!wg.name.startsWith('wg-')) {
      continue;
    }
    const workingGroupName = wg.name.substr(3);

    let issues = (
      await client._github
        .repo(`${DEFAULT_ORGANISATION}/${wg.name}`)
        .issuesAsync()
    )[0];

    issues = issues.filter((issue) => {
      const category = issue.labels[0] ? issue.labels[0].name : '';
      return ALLOWED_ISSUE_TYPES.includes(category);
    });

    if (!issues.length) {
      log.warn(`.. ${wg.name} - No status update issues found`);
      continue;
    }

    for (const issue of issues) {
      const createdAt = new Date(issue.created_at).toDateString();
      const title = emojiStrip(issue.title);

      // Escape amp components from markdown to prevent amp-optimizer errors
      let body = issue.body.replace(AMP_COMPONENT_REGEX, ' `$1`');

      // Remove Emojis and split into separate text blocks to allow smoother line breaks in frontend
      body = emojiStrip(body).trim().match(TEXT_BLOCK_REGEX);

      // Parse status update date from from issue title and set quarter
      let statusUpdate = title.match(STATUS_UPDATE_REGEX);
      let quarter;
      if (statusUpdate) {
        quarter = `Q:${Math.ceil(parseInt(statusUpdate[2]) / 3)} ${
          statusUpdate[1]
        }`;
        statusUpdate = new Date(statusUpdate[0]).toDateString();
      } else {
        log.error(
          `.. ${wg.name} - Failed for issue #${issue.number}: ${title}`
        );
        continue;
      }

      roadmap.push({
        'wg_name': workingGroupName,
        'created_at': createdAt,
        'status_update': statusUpdate,
        'quarter': quarter,
        'number': issue.number,
        'html_url': issue.html_url,
        'body': body,
      });

      workingGroups.push(workingGroupName);
    }

    log.info(`.. ${wg.name} - ${issues.length} issues imported`);
  }

  // Get full name from working group meta.yaml and predefined color based on roadmap config
  workingGroups = [...new Set(workingGroups.sort())];
  workingGroups = workingGroups.map((group, index) => {
    return {'slug': group, 'color': config.workingGroupColors[index] || '#000'};
  });

  // Sort roadmap entries and add matching working group color
  roadmap = roadmap.sort((a, b) => {
    return new Date(b.status_update) - new Date(a.status_update);
  });
  for (const group of workingGroups) {
    for (let issue of roadmap) {
      if (group.slug == issue.wg_name) {
        issue.color = group.color;
      }
    }
  }

  await writeFileAsync(
    `${ROADMAP_DIRECTORY_PATH}/roadmap.yaml`,
    yaml.safeDump({'working_groups': workingGroups, 'list': roadmap})
  );

  log.success(
    `Successfully imported ${roadmap.length} roadmap status update issues from ${workingGroups.length} working groups`
  );
}

exports.importRoadmap = importRoadmap;
