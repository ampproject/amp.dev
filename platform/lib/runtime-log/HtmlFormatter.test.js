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

const HtmlFormatter = require('./HtmlFormatter');

let log;

const logProvider = {
  get: () => Promise.resolve(log),
};

const formatter = new HtmlFormatter(logProvider);

test('formats string', async () => {
  log = {
    message: 'hello %s!',
  };
  const logRequest = {
    id: 123,
    params: ['world'],
  };
  const message = await formatter.apply(logRequest);
  expect(message).toBe('hello world!');
});

test('linkifies URLs', async () => {
  log = {
    message: 'see https://example.com',
  };
  const logRequest = {
    id: 123,
    params: [],
  };
  const message = await formatter.apply(logRequest);
  expect(message).toBe(
    'see <a href="https://example.com">https://example.com</a>'
  );
});

test('throws exception if log not available', async () => {
  const expectedError = new Error('fail');
  logProvider.get = () => Promise.reject(expectedError);
  const logRequest = {
    id: 123,
    params: ['world'],
  };
  let error;
  try {
    await formatter.apply(logRequest);
  } catch (err) {
    error = err;
  }
  expect(error).toBe(expectedError);
});
