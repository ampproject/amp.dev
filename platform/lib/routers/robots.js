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

const path = require('path');
const express = require('express');
const {setMaxAge} = require('@lib/utils/cacheHelpers');
const project = require('@lib/utils/project');
const config = require('@lib/config');

function createRobotsHandler(robotsFile) {
  // eslint-disable-next-line new-cap
  const router = express.Router();
  const robotsFilePath = path.join(
    'robots',
    config.isProdMode() ? robotsFile : 'disallow_all.txt'
  );
  router.get('/robots.txt', (request, response) => {
    setMaxAge(response, 60 * 60);
    response
      .status(200)
      .sendFile(robotsFilePath, {root: project.paths.STATICS_DEST});
  });
  return router;
}

module.exports = createRobotsHandler;
