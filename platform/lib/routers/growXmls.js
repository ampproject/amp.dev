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
const growPageLoader = require('../common/growPageLoader');

// eslint-disable-next-line new-cap
const xmlPages = express.Router();

xmlPages.get('/*.xml', async (req, res, next) => {
  // this page handler is mainly for the sitemap.xml
  // but since we do not know where exactly it is located we handle all xml files
  // Because of that this router should come after the static files
  try {
    const result = await growPageLoader.fetchPage(req.path);
    res.send(result);
  } catch (e) {
    // page not found
    next();
  }
});

module.exports = xmlPages;
