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
const proxy = HttpProxy.createProxyServer();

// The domain serving the web package
const PACKAGED_DOMAIN = 'https://amp.dev';

// Proxy configuration, `target` is the packager domain
const PROXY_OPTIONS = {
  target: config.hosts.packager.base,
  changeOrigin: true,
};

/**
 * Proxy SXG requests to the AMPPackager:
 *
 * - If the URL starts with /amppkg/, forward the request unmodified.
 * - If the URL points to an AMP page and the AMP-Cache-Transform request header is present,
 *   rewrite the URL by prepending /priv/doc and forward the request.
 * - Set the vary header when serving AMP documents
 *
 * See https://github.com/ampproject/amppackager#productionizing
 */
const packager = (request, response, next) => {
  // Redirect all requests targeted at the packager
  if (request.path.startsWith('/amppkg/')) {
    // Add a timestamp to bust potential caches (temporary fix for #1921)
    const requestUrl = new URL(request.url, 'https://example.com');
    const timestamp = new Date().getTime();
    requestUrl.searchParams.set(timestamp, '');
    // Proxy request to packager
    sxgProxy(request, response, requestUrl.pathname + requestUrl.search, next);
    return;
  }
  // Don't package non-valid AMP pages, which is in our case
  // determined by the `.amp.` postfix
  if (!request.path.endsWith('.amp.html')) {
    next();
    return;
  }
  // Tell browsers that we support SXG
  response.set('vary', 'Accept, AMP-Cache-Transform');
  // Ignore all non AMP cache requests
  if (!request.header('amp-cache-transform')) {
    next();
    return;
  }
  // Construct the packager request URL
  const searchParams = new URLSearchParams({
    sign: PACKAGED_DOMAIN + request.url,
  }).toString();
  const url = `/priv/doc?${searchParams}`;
  // Serve webpackage via packager
  sxgProxy(request, response, url, next);
};

function sxgProxy(request, response, url, next) {
  console.log('[packager] proxy', PROXY_OPTIONS.target + url);
  request.url = url;
  proxy.web(request, response, PROXY_OPTIONS, (error) => {
    console.error(error);
    // Let the normal request handler handle the request, which either serves
    // the non-packaged version or a 404
    next();
  });
}

module.exports = packager;
