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

const signale = require('signale');
const express = require('express');
const shrinkRay = require('shrink-ray-current');
const ampCors = require('amp-toolbox-cors');
const AmpOptimizerMiddleware = require('amp-toolbox-optimizer-express');
const defaultCachingStrategy = require('./utils/CachingStrategy.js').defaultStrategy;
const {setNoSniff, setHsts, setXssProtection} = require('./utils/cacheHelpers.js');
const config = require('./config.js');

const WWW_PREFIX = 'www.';
const routers = {
  'whoAmI': require('./routers/whoAmI.js'),
  'pages': require('./routers/pages.js'),
  'examples': require('./routers/examples.js'),
  'static': require('./routers/static.js'),
  'playground': require('../../playground/backend/'),
  'boilerplate': require('../../boilerplate/backend/'),
};

class Platform {
  start() {
    const host = `${config.hosts.platform.scheme}://${config.hosts.platform.host}:${config.hosts.platform.port}`;

    signale.await(`Starting platform with environment ${config.environment} on ${host} ...`);
    this.server = express();

    if (config.environment == 'development') {
      const HttpProxy = require('http-proxy');

      // When in development fire up a second server as a simple proxy
      // to simulate CORS requests for stuff like playground
      this.proxy = express();
      this.proxy.listen(config.hosts.api.port, () => {
        signale.success(`Proxy available on ${config.hosts.api.scheme}://${config.hosts.api.host}:${config.hosts.api.port}!`);
      });

      const proxy = new HttpProxy();
      this.proxy.get('/*', (request, response, next) => {
        proxy.web(request, response, {
          'target': host,
        }, next);
      });
    }
    this.server.use(shrinkRay());
    this.server.use(defaultCachingStrategy);
    const ampOptimizer = AmpOptimizerMiddleware.create({versionedRuntime: true});
    this.server.use((request, response, next) => {
      if (request.path.endsWith('/source/')) {
        next();
        return;
      }
      ampOptimizer(request, response, next);
    });
    this.server.use((req, res, next) => {
      if (req.hostname.startsWith(WWW_PREFIX)) {
        res.redirect(301, `${req.protocol}://${req.host.substring(WWW_PREFIX.length)}${req.originalUrl}`);
      } else {
        next();
      }
    });
    this.server.use((req, res, next) => {
      if (req.hostname === 'localhost') {
        return next();
      }
      setNoSniff(res);
      setHsts(res);
      setXssProtection(res);
      if (req.headers['x-forwarded-proto'] === 'https') {
        return next();
      }
      res.redirect('https://' + req.hostname + req.path);
    });
    this._enableCors();

    this._check();
    this._registerRouters();

    this.server.listen(config.hosts.platform.port || 8080, () => {
      signale.success(`amp.dev available on ${host}!`);
    });
  }

  _enableCors() {
    this.server.use((request, response, next) => {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Credentials', 'true');
      response.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
      response.header(
          'Access-Control-Allow-Headers',
          'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, X-Requested-By, ' +
        'Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
      next();
    });

    this.server.use(ampCors({
      'verifyOrigin': false,
    }));
  };

  _check() {
    // TODO: Check (dependening on environment) if all needed files are
    // there and otherwise only send a static error page
  }

  _registerRouters() {
    this.server.use('/who-am-i', routers.whoAmI);
    this.server.use(routers.examples);
    this.server.use(routers.static);
    this.server.use('/playground', routers.playground);
    this.server.use('/boilerplate', routers.boilerplate);
    // Register the following router at last as it works as a catch-all
    this.server.use(routers.pages);
  }
};

module.exports = Platform;
