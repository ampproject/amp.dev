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

const path = require('path');
const express = require('express');
const {setImmutable} = require('@lib/utils/cacheHelpers.js');
const resourceFallbackHandler = require('@lib/routers/resourceFallbackHandler.js');
const robots = require('@lib/routers/robots.js');
// eslint-disable-next-line new-cap
const playground = express.Router();

const BASE_DIR = path.join(__dirname, '../dist');

playground.use(
  express.static(BASE_DIR, {
    extensions: ['html'],
    setHeaders: setCustomCacheControl,
  })
);

playground.use('/api', require('./api.js'));

playground.use(robots('allow_all.txt'));

// The fallback handler has to be last (kick in only if the request was not handled)
playground.use(resourceFallbackHandler(BASE_DIR));

function setCustomCacheControl(response, path) {
  // playground assets are versioned
  if (path.endsWith('.js') || path.endsWith('.css')) {
    setImmutable(response);
  }
}

module.exports = playground;
