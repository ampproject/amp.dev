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
const webPush = require('web-push');

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(
  express.urlencoded({
    extended: false,
  })
);
examples.use(express.json());

examples.use(express.static(path.join(__dirname, 'static')));

examples.post('/send-push', (request, response) => {
  const pushSubscription = request.body;

  const payload = 'amp-web-push rocks!';

  webPush.setGCMAPIKey(
    'BGSMEuZxEhw1gWd5A08e5pJa18_OozPds_k8U0VedjvbrQlyVWCSXzx_tft8ap6KIrHiewiUwO--v56m0g30uCc'
  );
  webPush.setVapidDetails(
    'mailto:drenzulli@google.com',
    'BA99vy78Qu4vuByBMUZ1W5J0H7ngllFJhF9GcjbS_GJM9iD7uXIm-dQj7nXvisXHI6372ga3mZR3kFdS9MYTdSA',
    'zrilyCmdC3EqCUA4g4u0JP5jafJrst8kw4TeFGI3bSI'
  );
  webPush
    .sendNotification(pushSubscription, payload)
    .then(() => {
      response.json({result: 'Web Push received!'});
    })
    .catch((error) => {
      response.status(500).send('Web Push Failed: ' + error);
    });
});

module.exports = examples;
