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
 * limitations under the License.
 */

'use strict';

const contentSecurityPolicy = require('helmet-csp');
const config = require('@lib/config');

const getDynamicHosts = () =>
  ['playground', 'preview', 'go', 'log']
    .map((key) => {
      const {[key]: hostConfig} = config.hosts || {};
      if (hostConfig) {
        return `${config.getHost(hostConfig)}/`;
      }
    })
    .filter((v) => v);

module.exports = (req, res, next) => {
  const directives = {
    defaultSrc: ['*', 'data:', 'blob:'],
    workerSrc: [`'self'`, 'blob:'],
    scriptSrc: [
      'blob:',
      `'unsafe-inline'`,
      'https://cdn.ampproject.org/v0.js',
      'https://cdn.ampproject.org/v0.mjs',
      'https://cdn.ampproject.org/v0/',
      'https://cdn.ampproject.org/sw/',
      'https://cdn.ampproject.org/viewer/',
      'https://cdn.ampproject.org/rtv/',
      'https://www.googletagmanager.com/gtag/js',
      ...getDynamicHosts(),
    ],
    objectSrc: [`'none'`],
    styleSrc: [
      `'unsafe-inline'`,
      'https://cdn.ampproject.org/rtv/',
      ...getDynamicHosts(),
    ],
    reportUri: ['/csp-report'],
  };

  // Allow unsafe-inline for examples
  if (/\/documentation\/examples\//.test(req.path)) {
    directives.scriptSrc = [...directives.scriptSrc, `'unsafe-inline'`];
  }

  // Add security headers.
  contentSecurityPolicy({
    directives,
    reportOnly: true,
  })(req, res, next);
};
