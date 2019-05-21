#!/usr/bin/env node
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

const fs = require('fs');
const {Signale} = require('signale');
const Octokit = require('@octokit/rest');

const gitHubImporter = require('./gitHubImporter');

const DESTINATION_JSON = __dirname + '/../../../pages/content/amp-dev/community/roadmap.json';

const log = new Signale({
  'interactive': false,
  'scope': 'Roadmap Importer',
});

async function importRoadmap() {
  log.start('Starting import of roadmap ...');
  const options = {
    'previews': [
      'symmetra-preview',
      'inertia-preview',
    ],
  };

  gitHubImporter.checkCredentials();
  if (gitHubImporter.CLIENT_TOKEN) {
    options['auth'] = gitHubImporter.CLIENT_TOKEN;
  } else {
    options['auth'] = {
      'clientId': gitHubImporter.CLIENT_ID,
      'clientSecret': gitHubImporter.CLIENT_SECRET,
    };
  }

  const octokit = new Octokit(options);
  const result = await octokit.projects.listColumns({project_id: '1344133'});

  log.await('Fetching cards per column ...');
  // grab all card data for each column
  const columns = await Promise.all(
      result.data.map((column) => octokit.projects.listCards({column_id: column.id})
          .then((result) => {
            // strip out stuff we don't need
            let cards = result.data.map((card) => ({
              url: card.url,
              createdAt: card.created_at,
              updatedAt: card.updated_at,
              issueUrl: card.content_url,
            }));

            // filter cards that don't have attached issues
            cards = cards.filter((card) => card.issueUrl);

            return {cards: cards, id: column.id, name: column.name};
          })
      )
  );

  // create a flattened cards array
  const cards =
    columns.reduce((accumulator, currentValue) => [...accumulator, ...currentValue.cards], []);

  // fetch all related issues
  const issues = await Promise.all(cards.map((card) => {
    const issue = card.issueUrl.match(/repos\/([^/]+)\/([^/]+)\/issues\/(\d+)/);
    return octokit.issues.get({owner: issue[1], repo: issue[2], issue_number: issue[3]})
        .then((result) => {
          result.url = card.issueUrl;
          return result;
        });
  }));

  // create a map for better lookup
  const issueMap = Object.assign({}, ...issues.map((item) => ({[item['url']]: item})));

  // attach issues to cards
  cards.forEach((card) => {
    const issue = issueMap[card.issueUrl];
    card.issue = {
      url: issue.data.html_url,
      title: issue.data.title.replace(/\[master feature\] /i, ''),
      description: issue.data.body
          .replace('Feature description:\r\n\r\n', '')
          .replace(/\[ \]/g, '')
          .split('\r\n\r\n')[0],
      labels: (issue.data.labels || []).map((label) => {
        return label.name.startsWith('Category:') ?
          {url: label.url, name: label.name.replace('Category:', '').trim(), color: label.color} :
          false;
      }).filter((label) => !!label),
    };

    delete card.url;
    delete card.issueUrl;
  });

  // create a list of unique labels
  const labels = cards
      .map((card) => card.issue.labels.map((label) => label.name))
      .reduce((acc, val) => acc.concat(val), [])
      .filter((value, index, self) => self.indexOf(value) === index);

  // Write finalized JSON to config file that gets imported by the roadmap template
  fs.writeFileSync(
      DESTINATION_JSON,
      JSON.stringify({labels: labels, columns: columns}, null, '  ')
  );

  log.success('Successfully imported roadmap!');
}

module.exports = {
  'importRoadmap': importRoadmap,
};
