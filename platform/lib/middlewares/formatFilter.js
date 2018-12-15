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

const QUERY_PARAMETER_NAME = 'format';
const ALLOWED_FORMATS = ['websites', 'stories', 'ads', 'email'];
const FILTERABLE_ROUTES = [];

/**
 * A middleware for expressjs that checks if the current request
 * asks for a filtered page and if so rewrites all URLs or redirects
 * to another page
 * @param  {expressjs.Request}   request
 * @param  {expressjs.Response}   response
 * @param  {Function} next
 * @return {undefined}
 */
function formatFilter(request, response, next) {
  // Check if the current URLs needs to be filtered
  console.log('formatFilter kicking in!');

  let activeFormat = request.query[QUERY_PARAMETER_NAME];
  if (ALLOWED_FORMATS.indexOf(activeFormat) == -1) {
    // If the format that should be filtered by isn't valid go on
    next();
    return;
  }

  console.log('Filtering by...', activeFormat);
  console.log('res.body', response.body);

  next();
  return;
}

module.exports = formatFilter;
