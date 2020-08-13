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
const {lint, LintMode, StatusNumber} = require('@ampproject/toolbox-linter');
const cheerio = require('cheerio');
const log = require('@lib/utils/log')('Pixi API');
const LimitedRemoteFetch = require('@lib/utils/limitedRemoteFetch');

const remoteFetch = new LimitedRemoteFetch({
  requestHeaders: {
    'Referer': 'https://amp.dev/page-experience/',
  },
});

const execLint = async (url) => {
  const res = await remoteFetch.fetchResponse(url);
  if (res.ok) {
    const body = await res.text();
    const context = {
      $: cheerio.load(body),
      headers: res.headers,
      raw: {
        headers: res.headers,
        body,
      },
      url,
      mode: LintMode.Amp,
    };

    return lint(context);
  }
  return Promise.reject(
    new Error(`Url returned an error: ${res.statusText}`)
  );
};

// eslint-disable-next-line new-cap
const api = express.Router();
api.get('/lint', async (request, response) => {
  log.info('lint endpoint called.');
  response.setHeader('Content-Type', 'application/json');

  try {
    const fetchUrl = request.query.url;
    if (!fetchUrl) {
      throw new Error('url param missing');
    }
    const status = await execLint(fetchUrl);
    const data = Object.entries(status).reduce((mappedData, [key, checks]) => {
      if (Array.isArray(checks)) {
        mappedData[key] = checks.reduce((status, item) => {
          if (!item.status) {
            return status;
          }
          if (
            !status ||
            StatusNumber[status] < StatusNumber[item.status]
          ) {
            return item.status;
          }
          return status;
        });
      } else {
        mappedData[key] = checks.status;
      }
      return mappedData;
    }, {});
    const result = {
      status: 'ok',
      data,
    };
    response.status(200).send(JSON.stringify(result, null, 2));
  } catch (e) {
    log.error('Unable to lint', e.stack);
    response.status(500).send(JSON.stringify({status: 'error'}, null, 2));
  }
});

module.exports = api;
