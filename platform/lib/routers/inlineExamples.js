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

// eslint-disable-next-line new-cap
const inlineExamples = express.Router();

/**
 * Inspects a incoming request (either proxied or not) for its GET args
 * and URL and checks if its valid to filter and if so has a valid filter
 * @param  {expressjs.Request} request
 * @return {null|String}       A valid filter
 */
function getFilteredFormat(request) {
  const QUERY_PARAMETER_NAME = 'format';
  const ALLOWED_FORMATS = ['websites', 'stories', 'ads', 'email'];

  const activeFormat = request.query[QUERY_PARAMETER_NAME] || 'websites';
  if (ALLOWED_FORMATS.indexOf(activeFormat.toLowerCase()) == -1) {
    // If the format to filter by is invalid or none use websites
    return 'websites';
  }

  return activeFormat;
}

const staticMiddleware = express.static(project.paths.INLINE_EXAMPLES_DEST, {
  'extensions': ['html'],
});

inlineExamples.get('/*', async (request, response, next) => {
  const format = getFilteredFormat(request);
  if (format && format !== 'websites') {
    request.url = request.path.replace('.html', `.${format}.html`);
  }
  return staticMiddleware(request, response, next);
});

module.exports = inlineExamples;
