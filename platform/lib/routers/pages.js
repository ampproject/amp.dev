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

const {promisify} = require('util');
const express = require('express');
const config = require('@lib/config');
const {Signale} = require('signale');
const utils = require('@lib/utils');
const {FilteredPage, isFilterableRoute} = require('@lib/common/filteredPage');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);

// eslint-disable-next-line new-cap
const pages = express.Router();
const growHost = `${config.hosts.pages.scheme}://${config.hosts.pages.host}:${config.hosts.pages.port}`;

/**
 * Inspects a incoming request (either proxied or not) for its GET args
 * and URL and checks if its valid to filter and if so has a valid filter
 * @param  {expressjs.Request} request
 * @return {null|String}       A valid filter
 */
function getFilteredFormat(request) {
  const QUERY_PARAMETER_NAME = 'format';
  const ALLOWED_FORMATS = ['websites', 'stories', 'ads', 'email'];

  const activeFormat = request.query[QUERY_PARAMETER_NAME] || 'websites';
  if (ALLOWED_FORMATS.indexOf(activeFormat.toLowerCase()) == -1) {
    // If the format to filter by is invalid or none use websites
    return 'websites';
  }

  return activeFormat;
}


// Setup a proxy over to Grow during development
if (config.isDevMode()) {
  // Only import the stuff needed for proxying during development
  const HttpProxy = require('http-proxy');
  const modifyResponse = require('http-proxy-response-rewrite');
  const got = require('got');
  const {pageMinifier} = require('@lib/build/pageMinifier');

  // Also create a logger during development since you want to know
  // what's going on
  const log = new Signale({
    'interactive': false,
    'scope': 'Grow (Proxy)',
  });

  /**
   * Queries Grow for a manually filtered page variant to eventually rewrite
   * request to this one
   * @param  {Request}  request The original request
   * @param  {String}  format  The format to test for
   * @return {Boolean}
   */
  async function hasManualFormatVariant(request, format) {
    const path = request.originalUrl.replace('.html', `.${format}.html`);

    const page = await got(`${growHost}${path}`).catch(() => {
      return {};
    });

    if (!page.error && page.body) {
      return true;
    }

    return false;
  }

  // Grow has problems delivering the index.html on a root request
  pages.get('/', (request, response, next) => {
    response.redirect('/index.html');
    next();
  });

  // During development all requests should be proxied over
  // to Grow and be handled there, therfore create one
  const proxy = new HttpProxy();

  // As the filtering will happen on content from the proxy (which will end
  // expressjs' native middleware chain) we need to hook into the proxy
  proxy.on('proxyRes', async (proxyResponse, request, response) => {
    // Check if this response should be filtered
    const activeFormat = getFilteredFormat(request);
    if (activeFormat) {
      log.await(`Filtering the ongoing request by format: ${activeFormat}`);
      modifyResponse(response, proxyResponse.headers['content-encoding'], (body) => {
        try {
          const filteredPage = new FilteredPage(activeFormat, body);
          response.setHeader('content-length', filteredPage.content.length.toString());
          return filteredPage.content;
        } catch (e) {
          log.warn('Could not filter request', e.message);
          return body;
        }
      });
    }

    // Check if the request should be minified on the fly
    if (request.query['minify']) {
      log.await('Minifying request ...');
      modifyResponse(response, proxyResponse.headers['content-encoding'], (body) => {
        const minifiedPage = pageMinifier.minifyPage(body, request.url);
        response.setHeader('content-length', minifiedPage.length.toString());
        return minifiedPage;
      });
    }
  });

  pages.get('/*', async (request, response, next) => {
    // Check if there is a manually filtered variant of the requested page
    // and if so rewrite the request to this URL
    const activeFormat = getFilteredFormat(request);
    if (activeFormat && isFilterableRoute(request.path)) {
      log.info('Checking for manual variant of requested page ...');
      if (await hasManualFormatVariant(request, activeFormat)) {
        const url = request.url.replace('.html', `.${activeFormat}.html`);
        log.success(`Manually filtered variant exists - rewriting request to ${url}`);
        request.url = url;
      }
    }

    next();
  }, (request, response, next) => {
    proxy.web(request, response, {
      'target': growHost,
    }, next);
  });
}

if (!config.isDevMode()) {
  const STATIC_PAGES_PATH = utils.project.absolute('platform/pages');
  const staticMiddleware = express.static(STATIC_PAGES_PATH);

  /**
   * Checks preconditions that need to be met to filter the ongoing request
   * @param  {Request}  request The ongoing request
   * @param  {String}  requestPath  A possibly rewritten request path
   * @return {Boolean}
   */
  function shouldApplyFormatFilter(request, requestPath) {
    if (!getFilteredFormat(request) || !isFilterableRoute(requestPath)) {
      return false;
    }

    // TODO(matthiasrohmer): Use fs.stat/fs.access over fs.existsSync
    if (!fs.existsSync(utils.project.pagePath(requestPath))) {
      return false;
    }

    return true;
  }

  pages.use('/', async (request, response, next) => {
    let requestPath = request.path;

    // Match root requests to a possible index.html
    if (requestPath.endsWith('/')) {
      requestPath = requestPath + 'index.html';
    }

    // Let the built-in middleware deal with unfiltered requests
    if (!shouldApplyFormatFilter(request, requestPath)) {
      return staticMiddleware(request, response, next);
    }

    try {
      // Check if there's a manually filtered variant ...
      const format = getFilteredFormat(request);
      const manualRequestPath = requestPath.replace('.html', `.${format}.html`);
      if (fs.existsSync(utils.project.pagePath(manualRequestPath))) {
        // ... and if there is one vend this
        requestPath = manualRequestPath;
      }

      const page = await readFileAsync(utils.project.pagePath(requestPath));
      const filteredPage = new FilteredPage(format, page, true);
      response.send(filteredPage.content);
      return next();
    } catch (e) {
      return next(e);
    }
  });
}

module.exports = pages;
