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
const yaml = require('js-yaml');
const fs = require('fs');
const utils = require('@lib/utils');
const config = require('@lib/config');

// eslint-disable-next-line new-cap
const whoAmI = express.Router();
const info = {
  'environment': config.environment,
  'instance': process.env.GAE_INSTANCE,
  'build': yaml.load(
    fs.readFileSync(utils.project.paths.BUILD_INFO_PATH, 'utf8')
  ),
};

whoAmI.get('/who-am-i', (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.status(200).send(JSON.stringify(info, null, 2));
});

module.exports = whoAmI;
