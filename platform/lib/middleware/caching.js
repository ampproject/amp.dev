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

const mime = require('mime-types');
const ms = require('ms');
const {setMaxAge, setImmutable} = require('../utils/cacheHelpers.js');

const IMMUTABLE = 'immutable';

const maxAgePerMimeType = [
  [/text\/.+$/i, maxAge('1h')],
  [/image\/.+$/i, maxAge('1w')],
  [/video\/.+$/i, maxAge('1w')],
  [/application\/json$/i, maxAge('1h')],
  [/application\/zip$/i, maxAge('1d')],
  [/application\/pdf$/i, maxAge('1d')],
  [/application\/javascript$/i, maxAge('1h')],
  [/font\/.+$/i, IMMUTABLE],
];

const defaultMaxAge = maxAge('1m');

module.exports = (request, response, next) => {
  const mimeType =
    mime.lookup(request.path) ||
    extractMimeFromAcceptHeader(request.headers.accept);
  if (!mimeType) {
    setMaxAge(response, defaultMaxAge);
    next();
    return;
  }
  const maxAgeMapping = maxAgePerMimeType.find((mapping) =>
    mapping[0].test(mimeType)
  );
  const maxAge = maxAgeMapping ? maxAgeMapping[1] : defaultMaxAge;
  if (maxAge === IMMUTABLE) {
    setImmutable(response);
  } else {
    setMaxAge(response, maxAge);
  }
  next();
};

function extractMimeFromAcceptHeader(string) {
  if (!string) {
    return '';
  }
  return string.split(',')[0];
}

function maxAge(string) {
  return Math.floor(ms(string) / 1000);
}
