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
const nunjucks = require('nunjucks');
const URL = require('url');
const path = require('path');

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(cookieParser());
examples.use(
  express.urlencoded({
    extended: true,
  })
);

const AMP_ACCESS_COOKIE = 'ABE_LOGGED_IN';
const VALID_USERS = {
  'mark@gmail.com': true,
  'jane@gmail.com': true,
};
const POWER_USERS = {
  'Jane@gmail.com': true,
};
const EXPIRATION_DATE = 24 * 60 * 60 * 1000; // 1 day in ms
const LOGIN_FILE_PATH = path.join(__dirname, 'login.html');

examples.get('/authorization', handleAuthorization);
examples.get('/login', handleLogin);
examples.get('/logout', handleLogout);
examples.post('/pingback', (req, res) => {
  res.status(200);
});
examples.post('/submit', handleSubmit);

function handleAuthorization(request, response) {
  const cookie = request.cookies[AMP_ACCESS_COOKIE];
  if (!cookie) {
    response.json({
      loggedIn: false,
      powerUser: false,
      email: '',
      name: '',
    });
    return;
  }
  const email = cookie.email;
  const powerUser = POWER_USERS[email];
  response.json({
    loggedIn: true,
    powerUser,
    email,
    name: email.split('@')[0],
  });
}

function handleLogin(request, response) {
  const returnUrl = request.query.return;

  response.send(nunjucks.render(LOGIN_FILE_PATH, {returnurl: returnUrl}));
}

function handleLogout(request, response) {
  let returnUrl = request.query ? request.query.return : '';
  if (!isValidURL(returnUrl)) {
    response.status(500).send('Invalid return URL');
    return;
  }
  returnUrl += '#success=true';
  response.clearCookie(AMP_ACCESS_COOKIE);
  response.status(303).redirect(returnUrl);
}

function handleSubmit(request, response) {
  const email = request.body ? request.body.email : '';
  if (!VALID_USERS[email]) {
    response.status(401).send('Invalid email');
    return;
  }
  response.cookie(
    AMP_ACCESS_COOKIE,
    {email},
    {expires: new Date(Date.now() + EXPIRATION_DATE)}
  );
  let returnUrl = request.body.returnurl;
  if (!isValidURL(returnUrl)) {
    response.status(500).send('Invalid return URL');
    return;
  }
  returnUrl += '#success=true';
  response.status(303).redirect(returnUrl);
}

function isValidURL(url) {
  const a = URL.parse(url);
  return (
    a.host && a.protocol && (a.protocol === 'http:' || a.protocol === 'https:')
  );
}

module.exports = examples;
