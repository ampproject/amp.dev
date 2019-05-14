/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
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

const express = require('express');
const {setMaxAge} = require('@lib/utils/cacheHelpers');
const config = require('@lib/config');
const project = require('@lib/utils/project');

// eslint-disable-next-line new-cap
const staticRouter = express.Router();

staticRouter.use('/static', express.static(project.paths.STATICS_DEST));

if (config.isProdMode()) {
  staticRouter.use('/', express.static('static/sitemap'));
}

staticRouter.get('/serviceworker.js', (request, response) => {
  setMaxAge(response, 0, 60 * 10);
  response.status(200)
      .sendFile('serviceworker.js', {root: project.paths.STATICS_DEST});
});

staticRouter.get('/serviceworker.html', (request, response) => {
  setMaxAge(response, 60 * 60 * 24);
  response.status(200)
      .sendFile('serviceworker.html', {root: project.paths.STATICS_DEST});
});

staticRouter.get('/robots.txt', (request, response) => {
  setMaxAge(response, 60 * 60);
  const robotsFile = config.isProdMode() ? 'robots/prod.txt' : 'robots/staging.txt';
  response.status(200)
      .sendFile(robotsFile, {root: project.paths.STATICS_DEST});
});

staticRouter.get('/manifest.json', (request, response) => {
  setMaxAge(response, 60 * 60 * 24);
  response.status(200)
      .sendFile('manifest.json', {root: project.paths.STATICS_DEST});
});

module.exports = staticRouter;
