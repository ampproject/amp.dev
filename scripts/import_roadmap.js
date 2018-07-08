#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const clientSecret = process.argv[2] || process.env.AMP_DOC_SECRET;
const clientId = process.argv[3] || process.env.AMP_DOC_ID;
const clientToken = process.env.AMP_DOC_TOKEN;
const writeDestination = '../content/includes/roadmap.json';

// exit early if the proper environment variables aren't available
if(!(clientToken || (clientSecret && clientId))) {
  console.error('This script reads the roadmap from GitHub which requires providing either a GitHub personal access token (AMP_DOC_TOKEN) or GitHub application id/secret (AMP_DOC_ID and AMP_DOC_SECRET).  See README.md for more information.');
  process.exit(1);
}

// initialize Github API with custom accept headers to be able to use
// experimental Projects and Emoji APIs
const octokit = require('@octokit/rest')({
  headers: {
    accept: 'application/vnd.github.inertia-preview+json,application/vnd.github.symmetra-preview+json'
  }
});

// Authenticate using either a private token or oauth
octokit.authenticate(clientToken ? {
  type: 'token',
  token: clientToken
} : {
  type: 'oauth',
  key: clientId,
  secret: clientSecret
});

// From here on application code..
async function importRoadmap() {

  const result = await octokit.projects.getProjectColumns({ project_id: '1344133' });

  // grab all card data for each column
  const columns = await Promise.all(result.data.map(column => octokit.projects.getProjectCards({ column_id: column.id }).then(result => {

    // strip out stuff we don't need
    const cards = result.data.map(card => ({
      url: card.url,
      /*id: card.id,
      creator: {
        username: card.creator.login,
        avatarUrl: card.creator.avatar_url,
        profileUrl: card.creator.html_url
      },*/
      createdAt: card.created_at,
      updatedAt: card.updated_at,
      issueUrl: card.content_url
    }));

    return { cards: cards, id: column.id, name: column.name };
  })));

  // create a flattened cards array
  const cards = columns.reduce((accumulator, currentValue) => [...accumulator, ...currentValue.cards], []);

  // fetch all related issues
  const issues = await Promise.all(cards.map(card => {
    const issue = card.issueUrl.match(/repos\/([^\/]+)\/([^\/]+)\/issues\/(\d+)/)
    return octokit.issues.get({ owner: issue[1], repo: issue[2], number: issue[3] }).then(result => {
      result.url = card.issueUrl;
      return result;
    });
  }));

  // create a map for better lookup
  const issueMap = Object.assign({}, ...issues.map(item => ({ [item['url']]: item })));

  // attach issues to cards
  cards.forEach(card => {

    const issue = issueMap[card.issueUrl];
    card.issue = {
      url: issue.data.html_url,
      title: issue.data.title.replace(/\[Master [fF]eature\] /, ''),
      description: issue.data.body.replace('Feature description:\r\n\r\n', '').split('\r\n\r\n')[0],
      labels: (issue.data.labels || []).map(label => {

        return label.name.startsWith('Category:') ? { url: label.url, name: label.name.replace('Category:', ''), color: label.color } : false;
      }).filter(label => !!label)
    };

    delete card.url;
    delete card.issueUrl;

  });

  // Write finalized JSON to config file that gets imported by the roadmap template
  console.log('Successfully imported roadmap');
  fs.writeFileSync(writeDestination, JSON.stringify(columns, null, '  '));

}
importRoadmap();


