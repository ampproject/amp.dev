/**
 * Copyright 2020 The AMPHTML Authors
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
const url = require('url');
const LRU = require('lru-cache');
const config = require('@lib/config.js');
const {setMaxAge} = require('@lib/utils/cacheHelpers.js');
const log = require('@lib/utils/log')('Playground API');

/**
 * Time a fetched document is cached on the requesting client in minutes.
 * One hour.
 * @type {Number}
 */
const MAX_AGE = 60 * 60;

/**
 * Maximum file size that is streamed before a fetch is terminated in bytes.
 * amp.dev's homepage is ~35KB - we allow triple the size
 * @type {Number}
 */
const MAX_FILE_SIZE = 100800;

/**
 * The time in milliseconds in which HOST_RATE_LIMIT requests can
 * happen before the user needs to wait
 * @type {Number}
 */
const RATE_LIMIT_TIME_FRAME = 10 * 1000;

/**
 * The number of times a certain host can be requested in RATE_LIMIT_TIME_FRAME
 * @type {Number}
 */
const HOST_RATE_LIMIT = 10;

/**
 * The maximum count of limits that is tracked.
 * @type {Number}
 */
const MAX_LIMITS = 500;

/**
 * Fetches a user-defined remote URL and returns the response,
 * verifies that the returned response is a proper HTML document
 *
 * @param  {String} fetchUrl
 * @return {String|undefined}
 */
async function fetchDocument(fetchUrl) {
  const response = await fetch(fetchUrl, {
    size: MAX_FILE_SIZE,
    max: MAX_LIMITS,
    headers: {
      'Accept': 'text/html',
      'x-requested-by': 'playground',
      'User-Agent':
        'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MTC19V) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.81 Mobile ' +
        'Safari/537.36 (compatible; amp.dev/playground)',
      'Referer': 'https://amp.dev/playground',
    },
  });

  if (!response.ok) {
    throw new Error(`Request to ${fetchUrl} could not complete successfully.`);
  }

  const contentType = response.headers.get('content-type');
  if (!contentType.includes('text/html')) {
    throw new Error(`${fetchUrl} is no HTML document.`);
  }

  return response.text();
}

const limits = new LRU({
  maxAge: RATE_LIMIT_TIME_FRAME,
});

/**
 * Verifies that the host to a certain URL has not been called
 * more than DEFAULT_HOST_RATE_LIMIT
 * @param  {URL} fetchUrl
 * @return {Boolean}
 */
function exceedsRateLimit(fetchUrl) {
  const host = fetchUrl.host;

  // Requests to amp.dev are not affected by rate limiting
  if (config.hostNames.has(host)) {
    return false;
  }

  const count = (limits.peek(host) || 0) + 1;
  if (count > HOST_RATE_LIMIT) {
    return true;
  }

  limits.set(host, count);
  limits.prune();
  return false;
}

// eslint-disable-next-line new-cap
const api = express.Router();
api.get('/fetch', async (request, response) => {
  let fetchUrl = request.query.url;
  if (!fetchUrl) {
    response.status(400).send('No URL provided.');
    return;
  }

  fetchUrl = url.parse(fetchUrl);
  if (!fetchUrl.protocol || !fetchUrl.host) {
    response.status(400).send(`${fetchUrl} is not a valid URL.`);
    return;
  }

  // Verify that this URL is currently allowed to be fetched
  // and is not rate-limited
  if (exceedsRateLimit(fetchUrl)) {
    response
      .status(429)
      .send(
        `${fetchUrl.host} has been requested too many times. ` +
          `Please wait a few seconds and then try again.`
      );
    return;
  }

  try {
    const doc = await fetchDocument(fetchUrl.href);
    setMaxAge(response, MAX_AGE);
    response.send(doc);
  } catch (error) {
    log.error('Could not fetch URL', fetchUrl.href, error);
    response.status(502).send(`Failed to fetch ${fetchUrl.href}`);
  }
});

module.exports = api;
