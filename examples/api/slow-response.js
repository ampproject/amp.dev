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
const path = require('path');

// eslint-disable-next-line new-cap
const examples = express.Router();

examples.get('/slow-json', slowJson);
examples.get('/slow-json-with-items', slowJsonWithItems);
examples.get('/slow-iframe', slowIframe);
examples.get('/slow-text', slowText);

function getDelay(request) {
  let delay = Number(request.query.delay);
  if (delay < 0 || !delay) {
    delay = 1000;
  }
  return delay;
}

function errorIfRequested(request, response) {
  if (request.query.error) {
    response.status(500);
  }
}

async function slowJson(request, response) {
  await sleep(getDelay(request));
  errorIfRequested(request, response);

  response.json({
    items: [
      {
        // eslint-disable-next-line max-len
        title: `This JSON response was delayed ${getDelay(
          request
        )} milliseconds. Hard-refresh the page (Ctrl/Cmd+Shift+R) if you didn't see the spinner.`,
      },
    ],
  });
}

async function slowJsonWithItems(request, response) {
  await sleep(getDelay(request));
  errorIfRequested(request, response);
  response.sendFile(
    path.join(__dirname, '../static/samples/json/related_products.json')
  );
}

// Note that this function expects its delay measured in seconds.
async function slowText(request, response) {
  const delay = getDelay(request);
  await sleep(delay * 1000);
  errorIfRequested(request, response);

  const timeWord = delay == 1 ? 'second' : 'seconds';

  response.send(`This call returned in ${delay} ${timeWord}!`);
}

async function slowIframe(request, response) {
  await sleep(getDelay(request));
  errorIfRequested(request, response);
  // eslint-disable-next-line max-len
  response.send(
    `This iframe was delayed ${getDelay(
      request
    )} milliseconds. Hard-refresh the page (Ctrl/Cmd+Shift+R) if you didn't see the spinner.`
  );
}

function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

module.exports = examples;
