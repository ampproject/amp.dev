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

const path = require('path');
const express = require('express');

const SOURCE_DEST = path.join(__dirname, '../../../dist/sampleSources');
const SOURCE_DEST_BASE = '/sampleSources';
const SAMPLE_MANUALS_ROUTE = '/documentation/examples';

// eslint-disable-next-line new-cap
const sampleSources = express.Router();

sampleSources.use(`${SAMPLE_MANUALS_ROUTE}/*/source(/)?:sectionId?`, (request, response, next) => {
  // request.params[0] contains the sample path without SAMPLE_MANUALS_ROUTE
  request.url = `${SOURCE_DEST_BASE}/${request.params[0]}`;
  // If a specific section is requested rewrite the URL to that document
  if (request.params.sectionId) {
    request.url = request.url.replace('.html', `-${request.params.sectionId}.html`);
  }

  next();
}, express.static(SOURCE_DEST));

module.exports = sampleSources;
