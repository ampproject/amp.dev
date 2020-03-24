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
const {setNoCache} = require('@lib/utils/cacheHelpers');

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(cookieParser());

// A oauthConfig object created by .getOAuthConfig() - initially empty, will
// be filled when the router is called the first time
const oauthConfig = {};

// Name of the cookie that holds information about the OAuth flow
const OAUTH_COOKIE_NAME = 'oauth2_cookie';

// Endpoint URLs with corresponding headers and key for each provider
const USERINFO_ENDPOINT = {
  google: {
    url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    headers: (token) => {
      return `Bearer ${token}`;
    },
    propertyName: 'name',
  },
  github: {
    url: 'https://api.github.com/user',
    headers: (token) => {
      return `token ${token}`;
    },
    propertyName: 'login',
  },
  facebook: {
    url: 'https://graph.facebook.com/v3.3/me',
    headers: (token) => {
      return `Bearer ${token}`;
    },
    propertyName: 'name',
  },
};

// Provider configurations
const GOOGLE_CONFIG = {
  provider: 'google',
  OAUTH_ID_KEY: 'google_client_id',
  OAUTH_SECRET_KEY: 'google_client_secret',
  authCodeUrl: (oauthConfig) => {
    return `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${oauthConfig.id}&scope=openid profile&state=${oauthConfig.state}`;
  },
  tokenUrl: (oauthConfig) => {
    return {
      url: `https://accounts.google.com/o/oauth2/token?grant_type=authorization_code&client_id=${oauthConfig.id}&client_secret=${oauthConfig.secret}`,
      options: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    };
  },
};
const GITHUB_CONFIG = {
  provider: 'github',
  OAUTH_ID_KEY: 'github_client_id',
  OAUTH_SECRET_KEY: 'github_client_secret',
  authCodeUrl: (oauthConfig) => {
    return `https://github.com/login/oauth/authorize?client_id=${oauthConfig.id}&state=${oauthConfig.state}`;
  },
  tokenUrl: (oauthConfig) => {
    return {
      url: `https://github.com/login/oauth/access_token?client_id=${oauthConfig.id}&client_secret=${oauthConfig.secret}`,
      options: {
        method: 'post',
        headers: {
          accept: 'application/json',
        },
      },
    };
  },
};
const FACEBOOK_CONFIG = {
  provider: 'facebook',
  OAUTH_ID_KEY: 'facebook_client_id',
  OAUTH_SECRET_KEY: 'facebook_client_secret',
  authCodeUrl: (oauthConfig) => {
    return `https://www.facebook.com/v3.3/dialog/oauth?response_type=code&client_id=${oauthConfig.id}&state=${oauthConfig.state}&display=popup`;
  },
  tokenUrl: (oauthConfig) => {
    return {
      url: `https://graph.facebook.com/v3.3/oauth/access_token?client_id=${oauthConfig.id}&client_secret=${oauthConfig.secret}`,
      options: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    };
  },
};

/**
 * Returns a object with all oauthConfiguration keys needed to get the
 * authentication running
 * @param {Object} providerConfig - Holds basic configuration for provider
 * @return {Object}
 */
async function getOAuthConfig(providerConfig = {}) {
  if (!Object.getOwnPropertyNames(providerConfig).length) {
    return;
  }

  if (oauthConfig[providerConfig.provider]) {
    return oauthConfig[providerConfig.provider];
  }

  return {
    state: randomString.generate(8),
    secret: await credentials.get(providerConfig.OAUTH_SECRET_KEY),
    id: await credentials.get(providerConfig.OAUTH_ID_KEY),
  };
}

examples.get('/status', oAuthStatus);
examples.get('/logout', logOut);
examples.all('/login/google', async (request, response) => {
  oauthConfig.google = await getOAuthConfig(GOOGLE_CONFIG);
  oauthConfig.google.authCodeUrl = GOOGLE_CONFIG.authCodeUrl(
    oauthConfig.google
  );
  loginForConfig(request, response, oauthConfig.google, GOOGLE_CONFIG.provider);
});
examples.all('/callback/google', async (request, response) => {
  oauthConfig.google = await getOAuthConfig(GOOGLE_CONFIG);
  oauthConfig.google.tokenUrl = GOOGLE_CONFIG.tokenUrl(oauthConfig.google);
  callbackForConfig(
    request,
    response,
    oauthConfig.google,
    GOOGLE_CONFIG.provider
  );
});

examples.all('/login/github', async (request, response) => {
  oauthConfig.github = await getOAuthConfig(GITHUB_CONFIG);
  oauthConfig.github.authCodeUrl = GITHUB_CONFIG.authCodeUrl(
    oauthConfig.github
  );
  loginForConfig(request, response, oauthConfig.github, GITHUB_CONFIG.provider);
});
examples.all('/callback/github', async (request, response) => {
  oauthConfig.github = await getOAuthConfig(GITHUB_CONFIG);
  oauthConfig.github.tokenUrl = GITHUB_CONFIG.tokenUrl(oauthConfig.github);
  callbackForConfig(
    request,
    response,
    oauthConfig.github,
    GITHUB_CONFIG.provider
  );
});

examples.all('/login/facebook', async (request, response) => {
  oauthConfig.facebook = await getOAuthConfig(FACEBOOK_CONFIG);
  oauthConfig.facebook.authCodeUrl = FACEBOOK_CONFIG.authCodeUrl(
    oauthConfig.facebook
  );
  loginForConfig(
    request,
    response,
    oauthConfig.facebook,
    FACEBOOK_CONFIG.provider
  );
});
examples.all('/callback/facebook', async (request, response) => {
  oauthConfig.facebook = await getOAuthConfig(FACEBOOK_CONFIG);
  oauthConfig.facebook.tokenUrl = FACEBOOK_CONFIG.tokenUrl(
    oauthConfig.facebook
  );
  callbackForConfig(
    request,
    response,
    oauthConfig.facebook,
    FACEBOOK_CONFIG.provider
  );
});

/**
 * Sets HTTP headers and cookie accordingly and redirects to the given url.
 * @param {Object} providerConfig - Holds provider specific oauth credentials.
 * @param {String} provider - The name of the provider.
 */
function loginForConfig(request, response, providerConfig, provider) {
  setNoCache(response);

  response.cookie(OAUTH_COOKIE_NAME, {
    returnUrl: request.query.return || '',
  });

  response.redirect(
    `${providerConfig.authCodeUrl}&redirect_uri=${config.hosts.preview.base}` +
      `/documentation/examples/personalization/oauth2_login/callback/${provider}`
  );
}

/**
 * Callback function for provider-specific callback.
 * @param {Object} providerConfig - Holds provider specific oauth credentials.
 * @param {String} provider - The name of the provider.
 */
async function callbackForConfig(request, response, providerConfig, provider) {
  const code = request.query.code;
  if (!code) {
    response.status(400).send('Missing OAuth2 code');
    return;
  }

  const state = request.query.state;
  if (state !== oauthConfig[provider].state) {
    response.status(400).send('Invalid OAuth2 state');
    return;
  }

  const returnUrl = request.cookies[OAUTH_COOKIE_NAME].returnUrl;
  let accessToken;
  let name;
  // Try to get the accessToken
  try {
    accessToken = await fetchJson(
      `${providerConfig.tokenUrl.url}&code=${code}&` +
        `redirect_uri=${config.hosts.preview.base}` +
        `/documentation/examples/personalization/oauth2_login/callback/${provider}`,
      providerConfig.tokenUrl.options
    );
  } catch (err) {
    response.clearCookie(OAUTH_COOKIE_NAME);
    response.redirect(generateReturnUrl(returnUrl, false));
    return;
  }
  // Once an accessToken has been granted,
  // the request to the endpoint to get the user data is started.
  try {
    name = await fetchJson(USERINFO_ENDPOINT[provider].url, {
      headers: {
        'Authorization': USERINFO_ENDPOINT[provider].headers(
          accessToken.access_token
        ),
      },
    });
  } catch (err) {
    response.clearCookie(OAUTH_COOKIE_NAME);
    response.redirect(generateReturnUrl(returnUrl, false));
    return;
  }

  const cookie = {
    ...{},
    ...request.cookies[OAUTH_COOKIE_NAME],
    ...{
      loggedInWith: provider,
      name: name[USERINFO_ENDPOINT[provider].propertyName],
    },
  };
  response.cookie(OAUTH_COOKIE_NAME, cookie);
  response.redirect(generateReturnUrl(cookie.returnUrl, !!name));
}

/**
 * Returns response object and handles exceptions
 * @param {string} url
 * @param {Object} options
 * @return {Object}
 */
async function fetchJson(url, options = {}) {
  if (!url) return;
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error('Could not read response.');
  }
  return res.json();
}

function oAuthStatus(request, response) {
  const name = request.cookies[OAUTH_COOKIE_NAME]
    ? request.cookies[OAUTH_COOKIE_NAME].name
    : '';
  response.json({
    loggedIn: !!name,
    name,
  });
}

function logOut(request, response) {
  setNoCache(response);
  const returnUrl = request.query.return;
  if (!returnUrl) {
    response.status(400).send('Missing return url');
    return;
  }
  response.clearCookie(OAUTH_COOKIE_NAME);
  response.status(200).redirect(generateReturnUrl(returnUrl, true));
}

/**
 * Returns return URL string with success flag
 * @param {string} url
 * @param {Boolean} success
 * @return {string}
 */
function generateReturnUrl(url, success) {
  if (!url) return;
  return `${url}#success=${!!success}`;
}

module.exports = examples;
