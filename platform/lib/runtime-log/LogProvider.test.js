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

const LogProvider = require('./LogProvider.js');

const fetch = require('fetch-mock').sandbox();
let logProvider;

beforeEach(() => {
  fetch.reset();
  logProvider = new LogProvider(fetch);
});

test('returns log object', async () => {
  fetch.get(logUrl(123456), {
    123: {
      message: 'hello world!',
    },
  });
  const logRequest = {
    id: 123,
    version: 123456,
  };
  const log = await logProvider.get(logRequest);
  expect(log.message).toBe('hello world!');
});

test("throws exception if there' no message with the given id", async () => {
  fetch.get(logUrl(123456), {
    123: {
      message: 'hello world!',
    },
  });
  const logRequest = {
    id: 0,
    version: 123456,
  };
  let error;
  try {
    await logProvider.get(logRequest);
  } catch (err) {
    error = err;
  }
  expect(error).toEqual(new Error('Unknown message id: 0'));
});

test('throws exception if request fails', async () => {
  fetch.get(logUrl(123456), 404);
  const logRequest = {
    id: 0,
    version: 123456,
  };
  let error;
  try {
    await logProvider.get(logRequest);
  } catch (err) {
    error = err;
  }
  expect(error).toEqual(
    new Error(`Request failed ${logUrl(123456)} with status 404`)
  );
});

test('caches messages.json', async () => {
  fetch.get(logUrl(123456), {
    123: {
      message: 'hello world!',
    },
  });
  const logRequest = {
    id: 123,
    version: 123456,
  };
  await logProvider.get(logRequest);
  await logProvider.get(logRequest);
  expect(fetch.calls(logUrl(123456)).length).toBe(1);
});

function logUrl(version) {
  return `https://cdn.ampproject.org/rtv/${version}/log-messages.json`;
}
