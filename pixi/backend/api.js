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
const url = require('url');
const AmpCaches = require('@ampproject/toolbox-cache-list');
const {lint, LintMode} = require('@ampproject/toolbox-linter');
const cheerio = require('cheerio');
const log = require('@lib/utils/log')('Pixi API');
const RateLimitedFetch = require('@lib/utils/rateLimitedFetch');
const GA_TRACKING_ID = require('../../platform/config/shared.json')
  .gaTrackingId;

const rateLimitedFetch = new RateLimitedFetch({
  requestHeaders: {
    'Referer': 'https://amp.dev/page-experience/',
  },
});

const COMPONENT_SRC_MATCHER = /\/v0\/([^.]+)-(\d+(?:\.\d+)*)\.m?js/;
const findAmpComponents = ($) => {
  const versionMap = {};
  $('script[src]').each((i, script) => {
    const match = COMPONENT_SRC_MATCHER.exec($(script).attr('src'));
    if (match) {
      versionMap[match[1]] = match[2];
    }
  });
  return versionMap;
};

const isAmp = ($) => {
  const ampHtml = $('html[amp],html[⚡]');
  return ampHtml.length > 0;
};

const isCacheUrl = (urlString, cachesList) => {
  const pageUrl = url.parse(urlString);
  const matchedCache = cachesList.find((cache) =>
    pageUrl.hostname.endsWith(cache.cacheDomain)
  );
  return !!matchedCache;
};

const execChecks = async (url) => {
  const ampCacheListPromise = AmpCaches.list();
  const res = await rateLimitedFetch.fetchHtmlResponse(url);
  const body = await res.text();
  const $ = cheerio.load(body);
  const ampCacheList = await ampCacheListPromise;
  const context = {
    $,
    headers: {},
    raw: {
      headers: res.headers,
      body,
    },
    url,
    mode: LintMode.PageExperience,
  };
  const result = {
    redirected: res.redirected,
    url: res.url,
    isAmp: isAmp($),
    isCacheUrl: isCacheUrl(res.url, ampCacheList),
  };

  if (!result.isAmp) {
    return result;
  }

  const lintResults = await lint(context);
  return {
    components: findAmpComponents($),
    data: lintResults,
    ...result,
  };
};

const logAnalytics = async (url) => {
  try {
    const data = {
      // Google Analytics API version - 1 is the only one
      v: 1,
      // Tracking ID - our GA info
      tid: GA_TRACKING_ID,
      // Client ID - required, but no need to track personalized info so everyone is the same ID
      cid: 'pixi_search',
      t: 'event',
      // Anonymize IP - set to true
      aip: 1,
      // Application Name - for easier searching in GA
      an: 'pixi',
      // Event Action - required value
      ea: 'lint',
      // Event Label - where the URL is stored
      el: new URL(url).host,
    };

    return fetch(
      `http://www.google-analytics.com/collect?${new URLSearchParams(data)}`
    );
  } catch (e) {
    log.error('Unable to log', e.stack);
  }
};

// eslint-disable-next-line new-cap
const api = express.Router();

api.get('/lint', async (request, response) => {
  log.info('lint endpoint called.');
  response.setHeader('Content-Type', 'application/json');

  const fetchUrl = request.query.url;
  try {
    await logAnalytics(fetchUrl);
    const checkResult = await execChecks(fetchUrl);
    const result = {
      status: 'ok',
      ...checkResult,
    };
    response.json(result);
  } catch (e) {
    log.error('Unable to lint', fetchUrl, e.stack);
    const result = {status: 'error'};
    if (e.errorId) {
      // The messages for the special RemoteFetchError can be shown in the response
      result.errorId = e.errorId;
      result.message = e.message;
    }
    response.json(result);
  }
});

module.exports = api;
