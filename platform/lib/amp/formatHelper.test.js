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
const {
  getFormatFromRequest,
  DEFAULT_FORMAT,
  SUPPORTED_FORMATS,
} = require('./formatHelper.js');

const request = {
  query: {},
};

test('returns default format if no format given', () => {
  request.query = {};
  const format = getFormatFromRequest(request);
  expect(format).toBe(DEFAULT_FORMAT);
});

test('returns default format if invalid format given', () => {
  request.query.format = 'dummy';
  const format = getFormatFromRequest(request);
  expect(format).toBe(DEFAULT_FORMAT);
});

test('supports uppercase formats', () => {
  const testFormat = SUPPORTED_FORMATS[1];
  request.query.format = testFormat.toUpperCase();
  const format = getFormatFromRequest(request);
  expect(format).toBe(testFormat);
});

test('matches all existing formats', () => {
  SUPPORTED_FORMATS.forEach(expectedFormat => {
    request.query.format = expectedFormat;
    const actualFormat = getFormatFromRequest(request);
    expect(actualFormat).toBe(expectedFormat);
  });
});
