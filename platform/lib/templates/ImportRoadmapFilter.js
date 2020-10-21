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
const yaml = require('js-yaml');
const {
  GitHubImporter,
  DEFAULT_ORGANISATION,
} = require('@lib/pipeline/gitHubImporter');
const config = require(utils.project.absolute(
  'platform/config/imports/roadmap.json'
));
const log = require('@lib/utils/log')('Import Roadmap');
const SlugGenerator = require('@lib/utils/slugGenerator');

const ALLOWED_ISSUE_TYPES = ['Type: Status Update', 'Status Update'];

// RegEx to extract date from issue title
const STATUS_UPDATE_REGEX = /(\d\d\d\d)-(\d*)-(\d*)/;
// Match any amp-component tag. Eg. <amp-img>
const AMP_COMPONENT_REGEX = /\s(<amp-\S*>)/g;
// Group markdown text into text blocks starting with h1 - h3
const TEXT_BLOCK_REGEX = /^#{1,3} (?:.(?!^#))*/gms;

// Holds the lazily initlaized GitHub client for all functions to share
let client = null;


/**
 * Import status-update issues and relevant working-group data from
 * working-group repositories on GitHub
 */
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
        title: workingGroup.meta.title,
        color: workingGroup.meta.color,
      });
    }
    roadmap.issues.push(...workingGroup.issues);
  }
  roadmap.issues = roadmap.issues.sort((a, b) => {
    return new Date(b.status_update) - new Date(a.status_update);
  });

  const quarters = {
    'ordered': [],
    'working_groups': {}
  };

  for (const issue of roadmap.issues) {
    if (!quarters.ordered.some(item => item.slug === issue.quarter.slug)) {
      quarters.ordered.push(issue.quarter);
    }

    quarters.working_groups[issue.quarter.slug] =
      quarters.working_groups[issue.quarter.slug] || [];

    if (!quarters.working_groups[issue.quarter.slug].includes(issue.wg_slug)) {
      quarters.working_groups[issue.quarter.slug].push(issue.wg_slug);
    }
  }
  roadmap.quarters = quarters;
  return roadmap;
}

async function importRoadmap(value, callback) {
  log.start('Start importing Roadmap data for ..');

  client = new GitHubImporter();

  const repos = (
    await client._github.org(DEFAULT_ORGANISATION).reposAsync(1, 100)
  )[0];

  let workingGroups = repos.filter((wg) => wg.name.startsWith('wg-'));

  workingGroups = await Promise.all(
    workingGroups.map(async (workingGroup) => {

      // Get meta information for working-group e.g. full name from METADATA.yaml
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
          `.. Failed loading ${DEFAULT_ORGANISATION}/${workingGroup.name}/METADATA.yaml`,
          e
        );
      }

      meta = {
        slug: workingGroupSlug,
        name: workingGroup.name,
        title: meta.title,
        color: config.colors[workingGroupSlug] || config.fallbackColor,
      }

      // Get status-update issues per working-group
      const issues = [];
      const issuesImport = (
        await client._github
        .repo(`${DEFAULT_ORGANISATION}/${workingGroup.name}`)
        .issuesAsync({
          state: 'all',
        })
      )[0];

      for (const issue of issuesImport) {
        const category = issue.labels[0] ? issue.labels[0].name : '';
        if (!ALLOWED_ISSUE_TYPES.includes(category)) {
          continue;
        }

        // Parse status-update date from from issue title and set quarter
        let statusUpdate = issue.title.match(STATUS_UPDATE_REGEX);
        let quarter;
        if (statusUpdate) {
          quarter = `Q${Math.ceil(parseInt(statusUpdate[2]) / 3)} ${
            statusUpdate[1]
          }`;
          statusUpdate = new Date(statusUpdate[0]).toDateString();
        } else {
          log.error(
            `.. ${meta.slug} - Could not parse valid date from ${issue.html_url}: ${issue.title}`
          );
          continue;
        }

        /**
         * Escape amp-components in markdown to prevent them from being rendered as such
         * plus remove Emojis and split body into separate text blocks to allow smoother line breaks in frontend
         */
        let body = issue.body.replace(AMP_COMPONENT_REGEX, ' `$1`');
        body = body.trim().match(TEXT_BLOCK_REGEX);

        issues.push({
          wg_slug: workingGroupSlug,
          wg_title: meta.title,
          wg_color: meta.color,
          status_update: statusUpdate,
          quarter: {
            slug: SlugGenerator.sluggify(quarter),
            title: quarter
          },
          number: issue.number,
          html_url: issue.html_url,
          body: body,
        });
      }

      return {
        meta,
        issues,
      };
    })
  );

  const roadmap = structureDataForRoadmap(workingGroups);

  callback(null, roadmap);
}

module.exports = {
  importRoadmap,
};
