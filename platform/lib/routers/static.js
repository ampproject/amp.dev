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
const {setNoCache, setMaxAge} = require('../utils/cacheHelpers.js');

// eslint-disable-next-line new-cap
const staticRouter = express.Router();

staticRouter.use('/static', express.static('static'));

staticRouter.get('/serviceworker.js', (request, response) => {
  setNoCache(response);
  response.status(200)
      .sendFile('serviceworker.js', {root: 'static'});
});

staticRouter.get('/robots.txt', (request, response) => {
  setMaxAge(response, 60 * 60);
  response.status(200)
      .sendFile('robots.txt', {root: 'static'});
});

staticRouter.get('/manifest.json', (request, response) => {
  setMaxAge(response, 60 * 60 * 24);
  response.status(200)
      .sendFile('manifest.json', {root: 'static'});
});

module.exports = staticRouter;
