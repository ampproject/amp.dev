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

const HttpProxy = require('http-proxy');
const config = require('@lib/config');

const proxyOptions = {
  target: config.hosts.packager.base,
  changeOrigin: true,
};

const proxy = HttpProxy.createProxyServer(proxyOptions);

/**
 * Proxy SXG requests to the AMPPackager:
 *
 * - If the URL starts with /amppkg/, forward the request unmodified.
 * - If the URL points to an AMP page and the AMP-Cache-Transform request header is present,
 *   rewrite the URL by prepending /priv/doc and forward the request.
 * - Set the vary when serving AMP documents
 *
 * See https://github.com/ampproject/amppackager#productionizing
 */
const packager = (request, response, next) => {
  // Redirect all packager requests
  if (request.path.startsWith('/amppkg/')) {
    sxgProxy(request, response, request.url, next);
    return;
  }
  // Don't package non valid AMP pages
  if (!request.path.endsWith('.amp.html')) {
    next();
    return;
  }
  // Tell browsers that we support SXG
  response.set('vary', 'Accept, AMP-Cache-Transform');
  if (!request.header('amp-cache-transform')) {
    next();
    return;
  }
  // Hard-code amp.dev as it has to match the cert
  const searchParams = new URLSearchParams({
    sign: 'https://amp.dev' + request.url,
  }).toString();
  const url = `/priv/doc?${searchParams}`;
  // Serve webpackage via packager
  sxgProxy(request, response, url, next);
};

function sxgProxy(request, response, url) {
  console.log('[packager] proxy', url);
  request.url = url;
  proxy.web(request, response, proxyOptions, (error) => {
    console.log('[packager] proxy error', error);
    response.status(502).end();
  });
}

module.exports = packager;
