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
const utils = require('@lib/utils');
const exampleBackend = require('@examples');

const SOURCES_DEST = utils.project.absolute('/dist/examples/sources/');

// eslint-disable-next-line new-cap
const exampleSources = express.Router();
const staticSources = express.static(SOURCES_DEST);

exampleSources.use('/documentation/examples/', exampleBackend);

exampleSources.use(
  '/documentation/examples/:category/:name/:snippetId?',
  (req, res, next) => {
    req.url = `/${req.params.category}/${req.params.name}`;
    if (req.params.snippetId && req.params.snippetId !== 'index.html') {
      req.url += `-${req.params.snippetId}`;
    }

    req.url += '.html';
    staticSources(req, res, next);
  }
);

module.exports = exampleSources;
