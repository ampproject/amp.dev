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
const multer = require('multer');
const upload = multer();

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(
  express.urlencoded({
    extended: false,
  })
);

const ERROR_CASE_AMP_FORM = 'error';

examples.get('/submit-form', submitForm);
examples.post('/submit-form-xhr', upload.none(), submitFormXHR);
examples.post(
  '/submit-form-input-text-xhr',
  upload.none(),
  submitFormXHRInputText
);
examples.post(
  '/verify-form-input-text-xhr',
  upload.none(),
  verifyFormXHRInputText
);

function submitForm(request, response) {
  response.redirect(303, '/static/samples/files/amp-form-success.html');
}

function submitFormXHR(request, response) {
  response.json({
    result: 'ok',
  });
}

function submitFormXHRInputText(request, response) {
  const email = request.body ? request.body.email : '';
  const name = request.body ? request.body.name : '';
  if (isUserTryingTheInputTextErrorDemo(name)) {
    response.status(400);
  }
  response.json({
    email,
    name,
  });
}

function verifyFormXHRInputText(request, response) {
  const username = request.body ? request.body.username : '';
  if (isUserTryingTheInputTextErrorDemo(username)) {
    response.status(400).json({
      verifyErrors: [
        {
          message: `The username ${username} is already taken`,
          name: 'username',
        },
      ],
    });
    return;
  }
  response.json({
    username,
  });
}

function isUserTryingTheInputTextErrorDemo(name) {
  return name === ERROR_CASE_AMP_FORM;
}

module.exports = examples;
