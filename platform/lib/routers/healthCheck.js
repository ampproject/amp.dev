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
const log = require('@lib/utils/log')('Health Check');

// eslint-disable-next-line new-cap
const healthCheck = express.Router();
const HEALTH_CHECK_PATH = '/__health-check';

// Used by GCE to determine wether a VM instance is healthy.
healthCheck.get(HEALTH_CHECK_PATH, (req, res) => {
  // TODO add more checks
  log.info('OK');
  res.status(200).send('OK');
});

module.exports = {
  router: healthCheck,
  HEALTH_CHECK_PATH,
};
