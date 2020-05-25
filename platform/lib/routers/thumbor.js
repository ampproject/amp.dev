/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
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
const {setMaxAge} = require('@lib/utils/cacheHelpers');
const {join} = require('path');
const config = require('@lib/config');
const project = require('@lib/utils/project');
const HttpProxy = require('http-proxy');

const SECURITY_KEY = 'unsafe';

const proxyOptions = {
  target: config.hosts.thumbor.base,
  changeOrigin: true,
};
const proxy = HttpProxy.createProxyServer(proxyOptions);

// eslint-disable-next-line new-cap
const thumborRouter = express.Router();

const imagePaths = config.shared.thumbor.fileExtensions.map((extension) => {
  return join('/static/', '/**/', `*.${extension}`);
});

thumborRouter.get(imagePaths, (request, response, next) => {
  // Thumbor expects SECURITY_KEY as URL partial
  request.url = join(SECURITY_KEY, request.url);

  proxy.web(request, response, proxyOptions, (error) => {
    log.info('Proxy error', error);
    response.status(502).end();
  });
});

module.exports = thumborRouter;
