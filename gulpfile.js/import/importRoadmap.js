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

async function fetchWorkingGroupRepos() {
  const repos = (
    await client._github.org(DEFAULT_ORGANISATION).reposAsync(1, 100)
  )[0];

  let workingGroups = repos.filter((wg) => wg.name.startsWith('wg-'));

  // Asynchronously fetch working groups metadata and status update issues from GitHub repos
  workingGroups = await Promise.all(
    workingGroups.map(async (workingGroup) => {
      const meta = await getMetaForWorkigGroup(workingGroup);
      const issues = await getIssuesForWorkingGroup(meta);
      return {
        meta,
        issues,
      };
    })
  );

  return workingGroups;
}

function structureDataForRoadmap(workingGroups) {
  const roadmap = {
    workingGroups: [],
    quarters: {},
    issues: [],
  };

  for (const workingGroup of workingGroups) {
    if (workingGroup.issues.length) {
      roadmap.workingGroups.push({
        slug: workingGroup.meta.slug,
        name: workingGroup.meta.name,
        color: workingGroup.meta.color,
      });
    }
    roadmap.issues.push(...workingGroup.issues);
  }
  roadmap.issues = roadmap.issues.sort((a, b) => {
    return new Date(b.status_update) - new Date(a.status_update);
  });

  const quarters = {'ordered': [], 'workingGroups': {}};
  for (const issue of roadmap.issues) {
    if (!quarters.ordered.includes(issue.quarter)) {
      quarters.ordered.push(issue.quarter);
    }
    quarters.workingGroups[issue.quarter] =
      quarters.workingGroups[issue.quarter] || [];

    if (!quarters.workingGroups[issue.quarter].includes(issue.wg_slug)) {
      quarters.workingGroups[issue.quarter].push(issue.wg_slug);
    }
  }
  roadmap.quarters = quarters;

  return roadmap;
}

// Get meta information for working group e.g. full name from METADATA.yaml
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

async function getIssuesForWorkingGroup(meta) {
  const issues = (
    await client._github
      .repo(`${DEFAULT_ORGANISATION}/${meta.name}`)
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
      // plus remove Emojis and split into separate text blocks to allow smoother line breaks in frontend
      let body = issue.body.replace(AMP_COMPONENT_REGEX, ' `$1`');
      body = emojiStrip(body).trim().match(TEXT_BLOCK_REGEX);

      // Parse status update date from from issue title and set quarter
      let statusUpdate = title.match(STATUS_UPDATE_REGEX);
      let quarter;
      if (statusUpdate) {
        quarter = `Q${Math.ceil(parseInt(statusUpdate[2]) / 3)} ${
          statusUpdate[1]
        }`;
        statusUpdate = new Date(statusUpdate[0]).toDateString();
      } else {
        log.error(
          `.. ${meta.slug} - Could not parse valid date from issue title: ${title}`
        );
        return;
      }

      return {
        'wg_slug': meta.slug,
        'wg_title': meta.title,
        'wg_color': meta.color,
        'created_at': createdAt,
        'status_update': statusUpdate,
        'quarter': quarter,
        'number': issue.number,
        'html_url': issue.html_url,
        'body': body,
      };
    })
    .filter((issue) => issue);
}

async function writeRoadmapYaml(roadmap) {
  await writeFileAsync(
    `${ROADMAP_DIRECTORY_PATH}/roadmap.yaml`,
    yaml.safeDump({
      working_groups: roadmap.workingGroups,
      quarters: roadmap.quarters,
      issues: roadmap.issues,
    })
  );
}

async function importRoadmap() {
  log.start('Start importing Roadmap data for ..');

  const workingGroups = await fetchWorkingGroupRepos();

  const roadmap = structureDataForRoadmap(workingGroups);

  writeRoadmapYaml(roadmap);

  log.success(
    `Successfully imported ${roadmap.length} roadmap status update issues
    from ${workingGroups.length} working groups`
  );
}

exports.importRoadmap = importRoadmap;
