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

const {setHsts} = require('../utils/cacheHelpers.js');
const {HEALTH_CHECK_PATH} = require('../routers/healthCheck.js');

const WWW_PREFIX = 'www.';
/**
 * Implements redirects:
 *
 * - http -> https
 * - www.amp.dev to amp.dev
 */
module.exports = (req, res, next) => {
  // don't redirect on localhost
  if (req.hostname === 'localhost') {
    return next();
  }
  if (req.path === HEALTH_CHECK_PATH) {
    // it's critical that health checks don't redirect for GCE healthchecks to work correctly
    return next();
  }
  // redirect www.amp.dev to amp.dev
  if (req.hostname.startsWith(WWW_PREFIX)) {
    res.redirect(301, `${req.protocol}://${req.host.substring(WWW_PREFIX.length)}${req.originalUrl}`);
    return;
  }
  // redirect http to https
  setHsts(res);
  if (req.headers['x-forwarded-proto'] === 'https') {
    return next();
  }
  res.redirect('https://' + req.hostname + req.path);
};
