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
const fs = require('fs');
const mri = require('mri');
const yaml = require('js-yaml');
const utils = require('@lib/utils');

const GROW_CONFIG_TEMPLATE_PATH = utils.project.absolute('platform/config/podspec.yaml');
const GROW_CONFIG_DEST = utils.project.absolute('pages/podspec.yaml');
const GROW_OUT_DIR = utils.project.absolute('platform/pages');

const ENV_DEV = 'development';

class Config {
  constructor(environment = ENV_DEV) {
    const env = require(utils.project.absolute(`platform/config/environments/${environment}.json`));

    this.environment = env.name;
    this.hosts = env.hosts;
    Object.values(this.hosts).forEach((host) => host.base = this.getHost(host));

    this.shared = require(utils.project.absolute('platform/config/shared.json'));

    // Globally initialize command line arguments for use across all modules
    this.options = mri(process.argv.slice(2));

    // Synchronously write podspec for Grow to run flawlessly later in pipeline.
    try {
      this._configureGrow();
    } catch (err) {
      // writes are not permitted on GAE or in a container
    }
  }

  /**
   * Returns true if development mode is active.
   */
  isDevMode() {
    return this.environment === ENV_DEV;
  }

  /**
   * Builds a subdomain URL from a host object containing scheme, host, subdomain and port
   * @return {String} The full URL
   */
  getHost(hostConfig) {
    let url = `${hostConfig.scheme}://`;
    const isLocalhost = (hostConfig.host === 'localhost');
    if (isLocalhost || !hostConfig.subdomain) {
      url += hostConfig.host;
    } else {
      url += `${hostConfig.subdomain}.${hostConfig.host}`;
    }
    if (hostConfig.port) {
      url += `:${hostConfig.port}`;
    }
    return url;
  }

  /**
   * Builds a podspec for the current environment and writes it to the Grow pod
   * @return {undefined}
   */
  _configureGrow() {
    let podspec = fs.readFileSync(GROW_CONFIG_TEMPLATE_PATH, 'utf-8');
    podspec = yaml.safeLoad(podspec);

    // Force-enable all languages during development
    if (this.isDevMode()) {
      podspec.localization.locales = [
        'en',
        'fr',
        'ar',
        'es',
        'it',
        'id',
        'ja',
        'ko',
        'pt_BR',
        'ru',
        'tr',
        'zh_CN',
      ];
    }

    // Add environment specific information to configuration needed for URLs
    podspec['env'] = {
      'name': this.environment,
      'host': this.hosts.pages.host,
      'scheme': this.hosts.pages.scheme,
    };

    // Only add port if there really is one, otherwise Grow fails on an empty field
    if (this.hosts.pages.port) {
      podspec.env.port = this.hosts.pages.port;
    }

    // Add Google Analytics Tracking ID for use in templates
    podspec['gaTrackingId'] = this.shared.gaTrackingId;

    podspec['base_urls'] = {
      'repository': this.shared.baseUrls.repository,
      'playground': this.hosts.playground.base,
      'platform': this.hosts.platform.base,
      'api': this.hosts.api.base,
      'preview': this.hosts.preview.base,
    };

    // Deployment specific
    podspec['deployments'] = {
      'default': {
        'name': 'default',
        'destination': 'local',
        'out_dir': GROW_OUT_DIR,
        'env': podspec['env'],
      },
    };

    fs.writeFileSync(GROW_CONFIG_DEST, yaml.dump(podspec, {'noRefs': true}));
    signale.success('Configured Grow!');
  }
}

const config = new Config(process.env.APP_ENV || process.env.NODE_ENV);

module.exports = config;
