/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
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

'use strict';

const {readFileSync} = require('fs');
const url = require('url');
const {join} = require('path');
const yaml = require('js-yaml');
const config = require('@lib/config.js');
const {setHsts} = require('@lib/utils/cacheHelpers.js');
const {HEALTH_CHECK_PATH} = require('@lib/routers/healthCheck.js');
const log = require('@lib/utils/log')('Redirects');

const WWW_PREFIX = 'www.';

const REDIRECT_LINKS_DEFINITION = join(
  __dirname,
  '../../config/amp-dev-redirects.yaml'
);
const redirectLinks = yaml.load(readFileSync(REDIRECT_LINKS_DEFINITION));

const AVAILABLE_LOCALES = config.getAvailableLocales();
const LANGUAGE_PATH_PATTERN = /^\/([a-z]{2}(_[a-z]{2})?)\//;

/**
 *
 * @param req
 * @returns The redirect link or undefined if none was found.
 */
function getRedirectLink(req) {
  let result = redirectLinks[req.path];
  if (!result) {
    const langMatch = req.path.match(LANGUAGE_PATH_PATTERN);
    if (
      langMatch &&
      AVAILABLE_LOCALES.findIndex(
        (item) => langMatch[1] === item.toLowerCase()
      ) >= 0
    ) {
      const noLangPath = req.path.substr(langMatch[1].length + 1);
      result = redirectLinks[noLangPath];
      if (result) {
        result = '/' + langMatch[1] + result;
      }
    }
  }
  const queryString = url.parse(req.url).query;
  if (result && queryString) {
    result = result + '?' + queryString;
  }
  return result;
}

/**
 * Implements redirects:
 *
 * - http -> https
 * - www.amp.dev to amp.dev
 * - amp.dev/[shortcut] to deeplink
 */
module.exports = (req, res, next) => {
  if (req.path === HEALTH_CHECK_PATH) {
    // it's critical that health checks don't redirect for GCE healthchecks to work correctly
    return next();
  }

  const redirectTarget = getRedirectLink(req);
  if (redirectTarget) {
    try {
      const targetUrl = new URL(redirectTarget, config.hosts.platform.base);
      res.redirect(targetUrl.toString());
      return;
    } catch (error) {
      log.warn('Unable to redirect to ' + redirectTarget, error);
    }
  }

  // redirect www.amp.dev to amp.dev
  if (req.get('host').startsWith(WWW_PREFIX)) {
    res.redirect(
      301,
      `${req.protocol}://${req.host.substring(WWW_PREFIX.length)}${
        req.originalUrl
      }`
    );
    return;
  }

  // the following checks are only relevant for https
  if (config.hosts.platform.scheme !== 'https') {
    return next();
  }

  // redirect http to https
  setHsts(res);
  if (req.headers['x-forwarded-proto'] === 'https') {
    return next();
  }
  res.redirect('https://' + req.hostname + req.path);
};
