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

const express = require('express');
const {ensureUrlScheme, loadTemplate} = require('./growPages.js');
const log = require('@lib/utils/log')('Grow Shared Pages');

// eslint-disable-next-line new-cap
const sharedPages = express.Router();

/**
 * Some pages rendered by Grow should not be served by the router in growPages.js
 * as they a) don't need to be SSR and b) are not meant to be customer facing
 * and therefore can only be made accessible by their canonical path
 */
sharedPages.get('/shared/**', async (req, res, next) => {
  const url = ensureUrlScheme(req.originalUrl);
  try {
    const template = await loadTemplate(url.pathname);
    res.send(template.render());
  } catch (e) {
    // page not found
    log.error(e);
    next();
  }
});

module.exports = sharedPages;
