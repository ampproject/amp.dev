/**
 * Copyright 2020 The AMPHTML Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {dummyApiResponse} = require('./constants.js');
const express = require('express');
const log = require('@lib/utils/log')('Pixi API');

// eslint-disable-next-line new-cap
const api = express.Router();
api.get('/hello-world', async (request, response) => {
  log.info('hello-world endpoint called.');

  response.setHeader('Content-Type', 'application/json');
  response.status(200).send(
    JSON.stringify(
      {
        'message': 'Hello World',
      },
      null,
      2
    )
  );
});

api.get('/page-experience-dummy', async (request, response) => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  });
  response.setHeader('Content-Type', 'application/json');
  response.status(200).send(dummyApiResponse);
});

module.exports = api;
