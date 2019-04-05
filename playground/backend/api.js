/**
* Copyright 2019 The AMPHTML Authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

const express = require('express');
const fetch = require('node-fetch');
const URL = require('url').URL;
const config = require('@lib/config.js');
const {setMaxAge} = require('@lib/utils/cacheHelpers.js');
// eslint-disable-next-line new-cap
const api = express.Router();

const ONE_HOUR = 60 * 60;
const ONE_DAY = ONE_HOUR * 24;
const VALID_ORIGINS = new Set([
  'amp.dev',
  'api.amp.dev',
  'preview.amp.dev',
  'amp-dev-staging.appspot.com',
  'playground-dot-amp-dev-staging.appspot.com',
  'preview-dot-amp-dev-staging.appspot.com',
  'ampbyexample.com',
  'ampstart.com',
  'ampstart-staging.firebaseapp.com',
  'localhost',
  'localhost:8080',
  'localhost:8082',
  'localhost:8084',
  'amp-by-example-staging.appspot.com',
  'amp-by-example-sebastian.appspot.com',
  '0.1.0.1',
]);

const host = `${config.hosts.platform.scheme}://${config.hosts.platform.host}:${config.hosts.platform.port}`;

api.get('/fetch', async (request, response) => {
  const url = request.query.url;
  try {
    const doc = await fetchDocument(url, host);
    setMaxAge(response, ONE_HOUR);
    response.send(doc);
  } catch (error) {
    console.error('Could not fetch URL', error);
    response.send(`Could not fetch URL ${url}`).status(400).end();
  }
});

api.get('/amp-component-versions', async (request, response) => {
  const url = 'https://ampbyexample.com/playground/amp-component-versions';
  try {
    const body = await doFetch(url);
    setMaxAge(response, ONE_DAY);
    response.send(body);
  } catch (error) {
    console.error('Could not fetch component versions', error);
    response.send(`Could not fetch component versions ${url}`).status(400).end();
  }
});


async function fetchDocument(urlString, host) {
  const url = new URL(urlString, host);
  if (!VALID_ORIGINS.has(url.host)) {
    throw new Error(`Unsupported host ${url.host}`);
  }
  return doFetch(url.toString());
}

async function doFetch(url) {
  const response = await fetch(url, {
    compress: true,
    headers: {
      'Accept': 'text/html',
      'x-requested-by': 'playground',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MTC19V) '+
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.81 Mobile '+
      'Safari/537.36 (compatible; amp.dev/playground)',
      'Referer': 'https://amp.dev/playground',
    },
  });
  return response.text();
}

module.exports = api;
