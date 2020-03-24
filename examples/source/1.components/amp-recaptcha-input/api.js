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
const fetch = require('node-fetch');
const multer = require('multer');
const upload = multer();
const credentials = require('@lib/utils/credentials');

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(express.json());
examples.use(
  express.urlencoded({
    extended: true,
  })
);

const RECAPTCHA_SECRET = 'recaptcha_secret';

examples.post('/api/recaptcha', upload.array(), async (req, res) => {
  if (!req.body || !req.body.recaptcha_token) {
    res.status(400).json({
      message: 'You must provide a recaptcha token.',
    });
    return;
  }

  // get key from gcloud datastore
  let secret;
  try {
    secret = await credentials.get(RECAPTCHA_SECRET);
  } catch (error) {
    res.status(500).json({
      message: 'Error looking up recaptcha secret.',
    });
    return;
  }

  const recaptchaTask = async () => {
    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', req.body.recaptcha_token);
    params.append('remoteip', req.ip);

    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        body: params,
      }
    ).then((response) => response.json());

    if (!response.success) {
      res.status(500).json({
        message:
          'Error on recaptcha server verification. Uncessful response from recaptcha.',
      });
      return;
    }

    // Add some of the parameters from the form submission
    response.term = req.body.term;
    response.recaptcha_token = req.body.recaptcha_token;

    res.status(200).json(response);
  };
  recaptchaTask().catch(() => {
    res.status(500).json({
      message: 'Error on recaptcha server verification',
    });
  });
});

module.exports = examples;
