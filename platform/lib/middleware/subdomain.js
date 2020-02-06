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
const signale = require('signale');
const fetch = require('node-fetch');
const ampCors = require('@ampproject/toolbox-cors');
const cors = require('cors');

const config = require('@lib/config.js');

class Subdomain {
  constructor() {
    // Stores subdomain apps started during development to be able
    // to register multiple routers to them
    this.subdomainApps_ = {};
  }

  /**
   * Creates a subdomain middleware matching subdomain
   * requests to the router.
   */
  async map(hostConfig, router) {
    if (!hostConfig.subdomain) {
      throw new Error('host does not specify a subdomain');
    }
    let middleware;
    if (config.isDevMode() || config.isLocalMode()) {
      middleware = await this.startDevServer_(hostConfig, router);
    } else {
      middleware = this.createSubdomainMiddleware_(
        hostConfig.subdomain,
        router
      );
    }
    router.get('*', this.redirectOn404_.bind(this));
    return middleware;
  }

  startDevServer_(hostConfig, router) {
    return new Promise((resolve, reject) => {
      let subdomainApp = this.subdomainApps_[hostConfig.subdomain];
      if (!subdomainApp) {
        subdomainApp = express();
        subdomainApp.disable('x-powered-by');
        subdomainApp.use(
          cors({
            origin: true,
            credentials: true,
          })
        );
        subdomainApp.use(
          ampCors({
            email: true,
          })
        );
        subdomainApp.listen(hostConfig.port, () => {
          signale.info(
            `${hostConfig.subdomain} dev server listening on ${hostConfig.port}`
          );
          // return a dummy middleware
          resolve((request, response, next) => next());
        });

        this.subdomainApps_[hostConfig.subdomain] = subdomainApp;
      }
      subdomainApp.use(router);
    });
  }

  createSubdomainMiddleware_(subdomain, router) {
    return (request, response, next) => {
      if (request.subdomains.includes(subdomain)) {
        return router(request, response, next);
      }
      return next();
    };
  }

  /**
   * Redirects unhandled requests to the referrer. This allows us to resolve
   * playground document or preview assets.
   *
   * The referrer is calculated using the following strategy:
   * - use the playground URL parameter if present
   * - use the 'Referrer' header if present
   * - use amp.dev as default Referrer.
   */
  async redirectOn404_(request, response) {
    const referrer = request.get('Referrer') || config.hosts.platform.base;
    // assume request was initiated by a document-relative path
    let destination = this.resolveUrl_(request.originalUrl, referrer);
    // perform a head request to check if destination exists
    if (
      destination.pathname.startsWith('/static/') ||
      !(await this.exists_(destination))
    ) {
      // assume a root-relative path
      destination = this.resolveUrl_(request.originalUrl, referrer);
    }
    // remove AMP CORS query param which is not needed
    response.redirect(301, destination.toString());
  }

  resolveUrl_(requestPath, referrerString) {
    const referrer = new URL(referrerString);
    const playgroundDoc = referrer.searchParams.get('url');
    if (!playgroundDoc) {
      // redirect to amp.dev by default
      return new URL(requestPath, config.hosts.platform.base);
    }
    const documentUrl = new URL(playgroundDoc, config.hosts.platform.base);
    const url = new URL(requestPath, documentUrl.toString());
    // All subdomains redirect unknown requests. We have to make sure to
    // always redirect to the platform to avoid redirect loops
    if (config.hostNames.has(url.hostname)) {
      url.hostname = config.hosts.platform.host;
      url.port = config.hosts.platform.port;
    }
    return url;
  }

  async exists_(url) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new Subdomain();
