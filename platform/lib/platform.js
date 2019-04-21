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
const cors = require('cors');
const ampCors = require('amp-toolbox-cors');
const defaultCachingStrategy = require('./utils/CachingStrategy.js').defaultStrategy;
const {setNoSniff, setHsts, setXssProtection} = require('./utils/cacheHelpers.js');
const config = require('./config.js');
const {pagePath} = require('@lib/utils/project');
const subdomain = require('./middleware/subdomain.js');


const WWW_PREFIX = 'www.';
const HEALTH_CHECK = '/__health-check';
const routers = {
  whoAmI: require('@lib/routers/whoAmI.js'),
  pages: require('@lib/routers/pages.js'),
  packager: require('@lib/routers/packager.js'),
  example: {
    sources: require('@lib/routers/example/sources.js'),
    embeds: require('@lib/routers/example/embeds.js'),
    api: require('@examples'),
  },
  go: require('@lib/routers/go.js'),
  notFound: require('@lib/routers/notFound.js'),
  static: require('@lib/routers/static.js'),
  playground: require('../../playground/backend/'),
  boilerplate: require('../../boilerplate/backend/'),
};

class Platform {
  start() {
    const host = `${config.hosts.platform.scheme}://${config.hosts.platform.host}:${config.hosts.platform.port}`;

    signale.await(`Starting platform with environment ${config.environment} on ${host} ...`);
    this.server = express();

    if (config.isDevMode()) {
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
      setXssProtection(res);
      if (req.path === HEALTH_CHECK) {
        // it's critical that health checks don't redirect for GCE healthchecks to work correctly
        return next();
      }
      setHsts(res);
      if (req.headers['x-forwarded-proto'] === 'https') {
        return next();
      }
      res.redirect('https://' + req.hostname + req.path);
    });

    // debug computing times
    this.server.use((req, res, next) => {
      const timeStart = process.hrtime();

      res.on('finish', () => {
        const timeElapsed = process.hrtime(timeStart);
        let seconds = (timeElapsed[0] * 1000 + timeElapsed[1] / 1e6) / 1000;
        seconds = seconds.toFixed(3);
        const prefix = seconds > 1 ? 'CRITICAL_TIMING' : 'TIMING';
        console.log(`[${prefix}]: ${req.url}: ${seconds}s`);
      });

      next();
    });

    // pass app engine HTTPS status to express app
    this.server.set('trust proxy', true);
    this._enableCors();
    this.server.use(defaultCachingStrategy);

    this._check();
    this._registerRouters();

    const port = config.hosts.platform.port || process.env.APP_PORT || 80;
    const httpServer = this.server.listen(port, () => {
      signale.success(`server listening on ${port}!`);
    });
    // Increase keep alive timeout
    // see https://cloud.google.com/load-balancing/docs/https/#timeouts_and_retries
    httpServer.keepAliveTimeout = 620 * 1000;
  }

  _enableCors() {
    this.server.use(cors());
    this.server.use(ampCors({
      'verifyOrigin': false,
    }));
  };

  _check() {
    // TODO: Check (dependening on environment) if all needed files are
    // there and otherwise only send a static error page
  }

  _registerRouters() {
    this.server.use(routers.packager);
    this.server.get(HEALTH_CHECK, (req, res) => {
      console.log('[HEALTH CHECK] OK');
      res.status(200).send('OK');
    });
    this.server.use('/who-am-i', routers.whoAmI);
    this.server.use(subdomain.map(config.hosts.playground, routers.playground));
    this.server.use(subdomain.map(config.hosts.go, routers.go));
    // eslint-disable-next-line new-cap
    this.server.use(subdomain.map(config.hosts.preview, express.Router().use([
      routers.example.embeds,
      routers.example.sources,
      routers.example.api,
    ])));
    this.server.use('/documentation/examples', routers.example.api);
    this.server.use('/boilerplate', routers.boilerplate);
    this.server.use(routers.static);
    // Register the following router at last as it works as a catch-all
    this.server.use(routers.pages);

    // handle errors
    this.server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
      if (err) {
        console.error(err.stack);
        res.status(500).sendFile('500.html', {root: pagePath()});
      }
    });
    // handle 404s
    this.server.use(routers.notFound);
  }
};

module.exports = Platform;
