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
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer();
const {setMaxAge} = require('@lib/utils/cacheHelpers');

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(cookieParser());

const COOKIE_NAME = 'amp-subscription-settings';
const COOKIE_EXPIRATION_DATE = 365 * 24 * 60 * 60 * 1000; // 365 days in ms
const COOKIE_VALUES = new Set(['watching', 'only-mentions', 'ignoring']);
const COOKIE_DEFAULT = 'only-mentions';

examples.get('/subscription', upload.none(), (request, response) => {
  setMaxAge(response, 0);

  const currentSubscription = readSubscription(request);
  response.json({
    currentSubscription,
    options: Array.from(COOKIE_VALUES, (value) => ({
      value,
      isSelected: value === currentSubscription,
      text: `${value[0].toUpperCase()}${value.substring(1).replace(/-/g, ' ')}`,
    })),
  });
});

examples.post('/subscription', upload.none(), async (request, response) => {
  setMaxAge(response, 0);

  // Simulate a modest delay so that the UI's "submitting" state is discernible
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (request.query.fail) {
    response.status(500).send();
    return;
  }

  writeSubscription(response, (request.body || {}).nextSubscription);
  response.json({});
});

function readSubscription(request) {
  return parseSubscription((request.cookies[COOKIE_NAME] || {}).value);
}

function writeSubscription(response, value) {
  response.cookie(
    COOKIE_NAME,
    {value: parseSubscription(value)},
    {maxAge: COOKIE_EXPIRATION_DATE}
  );
}

function parseSubscription(value) {
  return COOKIE_VALUES.has(value) ? value : COOKIE_DEFAULT;
}

module.exports = examples;
