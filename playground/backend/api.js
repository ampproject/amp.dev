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
const {setMaxAge} = require('@lib/utils/cacheHelpers.js');
const log = require('@lib/utils/log')('Playground API');
const LimitedRemoteFetch = require('@lib/utils/limitedRemoteFetch');
const RemoteFetchError = require('@lib/utils/remoteFetchError');

const remoteFetch = new LimitedRemoteFetch({
  requestHeaders: {
    'x-requested-by': 'playground',
    'Referer': 'https://amp.dev/playground',
  },
});

/**
 * Time a fetched document is cached on the requesting client in minutes.
 * One hour.
 * @type {Number}
 */
const MAX_AGE = 60 * 60;

const errorIdMap = {
  [RemoteFetchError.INVALID_URL]: 400,
  [RemoteFetchError.TOO_MANY_REQUESTS]: 429,
  [RemoteFetchError.NO_SUCCESS_RESPONSE]: 502,
  [RemoteFetchError.UNSUPPORTED_CONTENT_TYPE]: 502,
};

// eslint-disable-next-line new-cap
const api = express.Router();
api.get('/fetch', async (request, response) => {
  try {
    const doc = await remoteFetch.fetchDocument(request.query.url);
    setMaxAge(response, MAX_AGE);
    response.send(doc);
  } catch (error) {
    log.error('Could not fetch URL', request.query.url, error);
    if (error.errorId) {
      response.status(errorIdMap[error.errorId] || 502).send(error.message);
    } else {
      response.status(500).send(`Internal error fetching ${request.query.url}`);
    }
  }
});

module.exports = api;
