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
const mime = require('mime-types');
const log = require('@lib/utils/log')('Packager');

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
  let pagesHost = config.hosts.platform.host;
  if (config.hosts.platform.port) {
    pagesHost += `:${config.hosts.platform.port}`;
  }
  if (request.get('host') !== pagesHost) {
    log.info('Not packaging', request.get('host'), pagesHost);
    next();
    return;
  }
  // We'll only serve SXG for non-static files
  if (request.path.startsWith('/static/')) {
    next();
    return;
  }
  // We'll only serve SXG for html documents
  const mimeType = mime.lookup(request.path);
  if (mimeType && mimeType !== 'text/html') {
    next();
    return;
  }
  // We only serve SXG if the amp-cache-transform header is set. This
  // is to avoid sending SXGs to normal users. We have to tell our CDN
  // that the response varies depending on the amp-cache-transform header.
  response.set('vary', 'Accept, AMP-Cache-Transform');
  // Don't send SXG to normal users
  if (!request.header('amp-cache-transform')) {
    next();
    return;
  }
  // Hard-code amp.dev as it has to match the cert
  const urlToSign = `https://amp.dev${request.url}`;
  const searchParams = new URLSearchParams({
    sign: urlToSign,
  }).toString();
  const url = `/priv/doc?${searchParams}`;
  try {
    // Serve webpackage via packager
    sxgProxy(request, response, url, next);
  } catch (error) {
    log.error('[SXG] could not proxy request to amppackager', error);
    // Serve normal version of the page
    next();
  }
};

function sxgProxy(request, response, url) {
  log.info('Proxy', url);
  request.url = url;
  proxy.web(request, response, proxyOptions, (error) => {
    log.info('Proxy error', error);
    response.status(502).end();
  });
}

module.exports = packager;
