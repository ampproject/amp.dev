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
const project = require('@lib/utils/project');
const {
  getFormatFromRequest,
  DEFAULT_FORMAT,
} = require('../amp/formatHelper.js');

// eslint-disable-next-line new-cap
const inlineExamples = express.Router();

const staticMiddleware = express.static(project.paths.INLINE_EXAMPLES_DEST, {
  'extensions': ['html'],
});

inlineExamples.get('/*', async (request, response, next) => {
  const format = getFormatFromRequest(request);
  if (format && format !== DEFAULT_FORMAT) {
    request.url = request.path.replace('.html', `.${format}.html`);
  }
  return staticMiddleware(request, response, next);
});

module.exports = inlineExamples;
