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
const AMP_FAVORITE_COOKIE = 'amp-favorite';
const AMP_FAVORITE_COUNT_COOKIE = 'amp-favorite-with-count';
const EXPIRATION_DATE = 365 * 24 * 60 * 60 * 1000; // 365 days in ms

examples.all('/favorite', upload.none(), (request, response) => {
  setMaxAge(response, 0);
  const favorite = readFavoriteFromCookie(request, AMP_FAVORITE_COOKIE);
  if (request.method === 'POST') {
    writeFavoriteCookie(response, AMP_FAVORITE_COOKIE, !favorite);
    response.json(!favorite);
  } else if (request.method === 'GET') {
    response.json(favorite);
  }
});
examples.all('/favorite-with-count', upload.none(), (request, response) => {
  setMaxAge(response, 0);
  const favorite = readFavoriteFromCookie(request, AMP_FAVORITE_COUNT_COOKIE);
  if (request.method === 'POST') {
    writeFavoriteCookie(response, AMP_FAVORITE_COUNT_COOKIE, !favorite);
    writeFavoriteWithCount(response, !favorite);
  } else if (request.method === 'GET') {
    writeFavoriteWithCount(response, favorite);
  }
});

function writeFavoriteWithCount(response, value) {
  let count;
  if (value) {
    count = 124;
  } else {
    count = 123;
  }
  response.json({
    value,
    count,
  });
}

function readFavoriteFromCookie(request, name) {
  const favorite = request.cookies[name];
  if (!favorite) {
    return false;
  }
  return favorite.value;
}

function writeFavoriteCookie(response, name, value) {
  response.cookie(name, {value}, {maxAge: EXPIRATION_DATE});
}

module.exports = examples;
