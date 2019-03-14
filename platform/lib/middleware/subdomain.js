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

const config = require('@lib/config.js');
const express = require('express');
const signale = require('signale');

class Subdomain {
  /**
   * Creates a subdomain middleware matching subdomain
   * requests to the router.
   */
  map(hostConfig, router) {
    if (!hostConfig.subdomain) {
      throw new Error('host does not specify a subdomain');
    }
    if (config.isDevMode()) {
      return this.startDevServer_(hostConfig, router);
    }
    return this.createSubdomainMiddleware_(hostConfig.subdomain, router);
  }

  startDevServer_(hostConfig, router) {
    const subdomainApp = express();
    subdomainApp.use(router);
    subdomainApp.listen(hostConfig.port, () => {
      signale.info(`${hostConfig.subdomain} dev server listening on ${hostConfig.port}`);
    });
    // return a dummy middleware
    return (request, response, next) => next();
  }

  createSubdomainMiddleware_(subdomain, router) {
    return (request, response, next) => {
      if (request.subdomains.includes(subdomain)) {
        return router(request, response, next);
      }
      return next();
    };
  }
}

module.exports = new Subdomain;
