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
const config = require(utils.project.absolute(
  'platform/config/imports/roadmap.json'
));
const log = require('@lib/utils/log')('Import Roadmap');

/* Path where the roadmap data gets imported to */
const ROADMAP_DIRECTORY_PATH = utils.project.absolute('pages/shared/data');

const ALLOWED_ISSUE_TYPES = ['Type: Status Update', 'Status Update'];

// RegEx to extract date from issue title
const STATUS_UPDATE_REGEX = /(\d\d\d\d)-(\d*)-(\d*)/;
// Match any amp-component tag. Eg. <amp-img>
const AMP_COMPONENT_REGEX = /\s(<amp-\S*>)/g;
// Group markdown text into text blocks starting with h1 - h3
const TEXT_BLOCK_REGEX = /^#{1,3} (?:.(?!^#))*/gms;
/**
 * Extract status update issues from working groups and
 * return them sorted by date/quarter
 *
 * @return []
 */
const client = new GitHubImporter();

async function importRoadmap() {
  log.start('Start importing Roadmap data for ..');

  const repos = (
    await client._github.org(DEFAULT_ORGANISATION).reposAsync(1, 100)
  )[0];

  let workingGroups = repos.filter((wg) => wg.name.startsWith('wg-'));

  const roadmap = (workingGroups = await Promise.all(
    workingGroups.map(async (workingGroup) => {
      const workingGroupMeta = await getMetaForWorkigGroup(workingGroup);
      const workingGroupIssues = await getIssuesForWorkingGroup(
        workingGroupMeta
      );
      return {
        'workingGroupMeta': workingGroupMeta,
        'workingGroupIssues': workingGroupIssues,
      };
    })
  ));

  // writeRoadmapYaml(roadmap);

  log.success(
    `Successfully imported ${roadmap.length} roadmap status update issues
    from ${workingGroups.length} working groups`
  );
}

// Get full working group name from METADATA.yaml
async function getMetaForWorkigGroup(workingGroup) {
  const workingGroupSlug = workingGroup.name.substr(3);

  let meta = null;
  try {
    meta = await client.fetchFile(
      `METADATA.yaml`,
      `${DEFAULT_ORGANISATION}/${workingGroup.name}`
    );
  } catch (e) {
    log.warn(`.. ${wg.name} - METADATA.yaml not found`);
  }
  try {
    meta = yaml.safeLoad(meta);
  } catch (e) {
    log.error(
      `.. ${wg.name} - Failed loading ${DEFAULT_ORGANISATION}/${workingGroup.name}/METADATA.yaml`,
      e
    );
  }

  return {
    'slug': workingGroupSlug,
    'name': workingGroup.name,
    'title': meta.title,
    'color': config.colors[workingGroupSlug] || config.fallbackColor,
  };
}

// Get issues per working group
async function getIssuesForWorkingGroup(workingGroupMeta) {
  const issues = (
    await client._github
      .repo(`${DEFAULT_ORGANISATION}/${workingGroupMeta.name}`)
      .issuesAsync()
  )[0];

  return issues
    .filter((issue) => {
      const category = issue.labels[0] ? issue.labels[0].name : '';
      return ALLOWED_ISSUE_TYPES.includes(category);
    })
    .map((issue) => {
      const createdAt = new Date(issue.created_at).toDateString();
      const title = emojiStrip(issue.title);

      // Escape amp-components in markdown to prevent them from being rendered as such
      const body = issue.body.replace(AMP_COMPONENT_REGEX, ' `$1`');

      return {
        'wg_slug': workingGroupMeta.slug,
        'wg_title': workingGroupMeta.title,
        'wg_color': workingGroupMeta.color,
        'created_at': createdAt,
        // 'status_update': statusUpdate,
        // 'quarter': quarter,
        'number': issue.number,
        'html_url': issue.html_url,
        'body': body,
      };
    });
}


async function writeRoadmapYaml(roadmap) {
  await writeFileAsync(
    `${ROADMAP_DIRECTORY_PATH}/roadmap2.yaml`,
    yaml.safeDump({
      working_groups: workingGroups,
      issues: roadmap,
      quarters: quarters,
    })
  );
}

exports.importRoadmap = importRoadmap;
