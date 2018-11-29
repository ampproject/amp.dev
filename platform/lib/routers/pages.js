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
const requestProxy = require('express-request-proxy');
const config = require('../config.js');

const pages = express.Router();

if (config.environment === 'development') {
  // During development all requests should be proxied over
  // to Grow and handled there
  let growHost = `${config.hosts.pages.scheme}://${config.hosts.pages.host}:${config.hosts.pages.port}`
  pages.use('/static/', express.static('static'));
  pages.get('/*', requestProxy({'url': growHost + '/*'}));
} else {
  pages.use('/', express.static('pages'));
}

module.exports = pages;
