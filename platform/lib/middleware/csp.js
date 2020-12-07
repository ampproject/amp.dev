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

const contentSecurityPolicy = require('helmet-csp');
const crypto = require('crypto');

module.exports = (req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('hex');

  const directives = {
    defaultSrc: ['*', 'data:', 'blob:'],
    workerSrc: [`'self'`, 'blob:'],
    scriptSrc: [
      'blob:',
      `'unsafe-inline'`,
      'https://cdn.ampproject.org/v0.js',
      'https://cdn.ampproject.org/v0/',
      'https://cdn.ampproject.org/sw/',
      'https://cdn.ampproject.org/viewer/',
      'https://cdn.ampproject.org/rtv/',
      'https://www.googletagmanager.com/gtag/js',
    ],
    objectSrc: [`'none'`],
    styleSrc: [
      `'unsafe-inline'`,
      'https://cdn.ampproject.org/rtv/',
      'https://playground.amp.dev/',
    ],
    reportUri: ['https://csp-collector.appspot.com/csp/amp'],
  };

  // Don't enforce nonce for examples
  if (!/\/documentation\/examples\//.test(req.path)) {
    directives.scriptSrc = [
      ...directives.scriptSrc,
      `'nonce-${res.locals.nonce}'`,
    ];
  }

  // Add security headers.
  contentSecurityPolicy({
    directives,
    reportOnly: false,
  })(req, res, next);
};
