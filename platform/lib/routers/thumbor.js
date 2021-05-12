/**
 * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
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
const {join} = require('path');
const config = require('@lib/config');
const log = require('@lib/utils/log')('Thumbor');
const fetch = require('node-fetch');

const SECURITY_KEY = 'unsafe';
const REMOTE_STATIC_MOUNT = '/static/remote/';

// eslint-disable-next-line new-cap
const thumborRouter = express.Router();

const imagePaths = [
  ...config.shared.thumbor.fileExtensions.map((extension) => {
    return join('/static/', '/**/', `*.${extension}`);
  }),
  REMOTE_STATIC_MOUNT,
];

const DISABLE_THUMBOR = false;

thumborRouter.get(imagePaths, async (request, response, next) => {
  if (DISABLE_THUMBOR || !(config.isProdMode() || config.isStageMode())) {
    next();
    return;
  }

  let imageUrl = new URL(request.url, config.hosts.platform.base);
  const imageWidth = imageUrl.searchParams.get('width');
  imageUrl.searchParams.delete('width');

  // Thumbor requests the image itself - to prevent loops it does
  // so by setting ?original=true
  if (imageUrl.searchParams.get('original')) {
    imageUrl.searchParams.delete('original');
    request.url = imageUrl.pathname;
    next();
    return;
  }

  // We allow certain remote images to be optimized;
  // they mount on the virtual /static/remote
  const isRemoteImage = request.url.includes(REMOTE_STATIC_MOUNT);
  if (isRemoteImage) {
    imageUrl = new URL(request.query.url);
  } else {
    imageUrl.searchParams.set('original', 'true');
  }

  const thumborUrl = new URL(request.url, config.hosts.thumbor.base);
  thumborUrl.pathname =
    SECURITY_KEY + (imageWidth ? `/${imageWidth}x0/` : '/') + imageUrl.href;

  let optimizedImage;
  try {
    optimizedImage = await fetch(thumborUrl.toString(), {
      headers: request.headers,
    });
  } catch (e) {
    log.error('Failed connecting to thumbor', e);
    optimizedImage = {ok: false};
  }
  if (!optimizedImage.ok) {
    log.error('Thumbor did not respond to', thumborUrl.toString());
    if (isRemoteImage) {
      // Redirect to remote image
      response.redirect(imageUrl);
    } else {
      // If Thumbor did not respond, fail over to default static middleware
      return next();
    }
  }

  const contentType = optimizedImage.headers.get('content-type');
  response.setHeader('Content-Type', contentType);
  optimizedImage.body.pipe(response);
});

module.exports = {
  thumborRouter,
  REMOTE_STATIC_MOUNT,
};
