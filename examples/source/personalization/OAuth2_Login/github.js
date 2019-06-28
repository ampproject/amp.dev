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
const randomString = require('randomstring');
const fetch = require('node-fetch');
const config = require('@lib/config');
const credentials = require('@lib/utils/credentials');

// A oauthConfig object created by .getConfig() - initially empty, will
// be filled when the router is called the first time
let oauthConfig = null;

/**
 * Returns a object with all oauthConfiguration keys needed to get the
 * authentication running
 * @return {Object}
 */
async function getConfig() {
  if (oauthConfig) {
    return oauthConfig;
  }

  const OAUTH_ID_KEY = 'github_client_id';
  const OAUTH_SECRET_KEY = 'github_client_secret';

  return {
    state: randomString.generate(8),
    secret: await credentials.get(OAUTH_SECRET_KEY),
    id: await credentials.get(OAUTH_ID_KEY),
  };
}

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(cookieParser());

// Name of the cookie that holds information about the OAuth flow
const OAUTH_COOKIE_NAME = 'oauth2_cookie';

examples.all('/login/github', async (request, response) => {
  oauthConfig = oauthConfig || await getConfig();

  response.set({
    'Cache-Control': 'no-cache',
  });

  response.cookie(OAUTH_COOKIE_NAME, {
    returnUrl: request.query.return || '',
  });

  // eslint-disable-next max-len
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${oauthConfig.id}&state=${oauthConfig.state}&redirect_uri=${config.hosts.preview.base}/documentation/examples/personalization/oauth2_login/callback/github`);
});

examples.all('/callback/github', async (request, response) => {
  oauthConfig = oauthConfig || await getConfig();

  const code = request.query.code;
  if (!code) {
    response.status(400).send('Missing OAuth2 code');
    return;
  }

  const state = request.query.state;
  if (state !== oauthConfig.state) {
    response.status(400).send('Invalid OAuth2 state');
    return;
  }

  const accessToken = await (fetch(`https://github.com/login/oauth/access_token?client_id=${oauthConfig.id}&client_secret=${oauthConfig.secret}&code=${code}`, {
    method: 'post',
    headers: {
      accept: 'application/json',
    },
  }).then((res) => res.json()));

  // After a token has been retrieved it should be possible to get the users
  // name via the API
  const name = await (fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `token ${accessToken.access_token}`,
    },
  }).then((res) => res.json()));

  const cookie = Object.assign({}, request.cookies[OAUTH_COOKIE_NAME], {
    loggedInWith: 'github',
    name: name.login,
  });
  response.cookie(OAUTH_COOKIE_NAME, cookie);
  response.redirect(`${cookie.returnUrl}#success=${!!name.login}`);
});

module.exports = examples;
