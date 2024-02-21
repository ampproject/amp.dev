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
const options = require('mri')(process.argv.slice(2));
const yaml = require('js-yaml');
const utils = require('./utils');

const GROW_CONFIG_TEMPLATE_PATH = utils.project.absolute(
  'platform/config/podspec.yaml'
);
const GROW_CONFIG_DEST = utils.project.absolute('pages/podspec.yaml');

const ENV_DEV = 'development';
const ENV_STAGE = 'staging';
const ENV_PROD = 'production';
const ENV_LOCAL = 'local';

const DEFAULT_LOCALE = 'en';

const AVAILABLE_LOCALES = [
  'en',
  'de',
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
  'pl',
  'vi',
];

class Config {
  constructor(environment = ENV_DEV) {
    if (environment === 'test') {
      environment = ENV_DEV;
      this.test = true;

      // Config doesn't use the log util as this relies on config. Therefore
      // the main signale instance gets disabled here
      signale.disable();
    } else {
      this.test = false;
    }
    signale.info(`Config: environment=${environment} test=${this.test}`);
    const env = require(
      utils.project.absolute(`platform/config/environments/${environment}.json`)
    );

    this.environment = env.name;
    this.hosts = env.hosts;
    this.hostNames = new Set();
    Object.values(this.hosts).forEach((host) => {
      host.base = this.getHost(host);
      let hostName = host.host;
      if (host.subdomain) {
        hostName = host.subdomain + '.' + hostName;
      }
      this.hostNames.add(hostName);
    });

    this.redis = env.redis || {};

    this.shared = require(
      utils.project.absolute('platform/config/shared.json')
    );

    // Globally initialize command line arguments for use across all modules
    this.options = options;
  }

  /**
   * Returns true if test mode is active.
   */
  isTestMode() {
    return this.test;
  }

  /**
   * Returns true if development mode is active.
   */
  isDevMode() {
    return this.environment === ENV_DEV;
  }

  /**
   * Returns true if local mode is active.
   */
  isLocalMode() {
    return this.environment === ENV_LOCAL;
  }

  /**
   * Returns true if staging mode is active.
   */
  isStageMode() {
    return this.environment === ENV_STAGE;
  }

  /**
   * Returns true if production mode is active.
   */
  isProdMode() {
    return this.environment === ENV_PROD;
  }

  /**
   * Returns an array with all the locale ids.
   * (e.g. 'en', 'pt_BR', ...)
   * The default locale is included.
   */
  getAvailableLocales() {
    return AVAILABLE_LOCALES.slice(0); // clone our internal array
  }

  /**
   * Returns the default locale (e.g. 'en')
   */
  getDefaultLocale() {
    return DEFAULT_LOCALE;
  }

  /**
   * Builds a subdomain URL from a host object containing scheme, host, subdomain and port
   * @param {Object} hostConfig One of configs in from the hosts property
   * @return {String} The full URL
   */
  getHost(hostConfig) {
    let url = `${hostConfig.scheme}://`;
    const isLocalhost = hostConfig.host === 'localhost';
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
   * Turns a given relative URL to an absolute URL for the given hostConfig.
   * @param {Object} hostConfig One of configs in from the hosts property
   * @return {String} The absolute URL
   */
  absoluteUrl(hostConfig, url) {
    // The URL uses a template, don't process it.
    if (url.indexOf('<%') > -1) {
      return url;
    }
    return new URL(url, this.getHost(hostConfig)).toString();
  }

  /**
   * Builds a podspec for the current environment and writes it to the Grow pod
   * @param {Object} growOptions Options to filter grow pages (optional). Can be overwritten by command line options.
   * @return {undefined}
   */
  configureGrow(growOptions) {
    const podSpec = this.buildGrowPodSpec(growOptions);
    try {
      fs.writeFileSync(GROW_CONFIG_DEST, yaml.dump(podSpec, {'noRefs': true}));
      signale.success('Configured Grow!');
    } catch (err) {
      signale.fatal('Could not configure Grow', err);
      process.exit(1);
    }
  }

  /**
   * Builds a podspec for the current environment.
   * @param {Object} growOptions Options to filter grow pages (optional). Can be overwritten by command line options.
   * @return {Object} the podspec object
   */
  buildGrowPodSpec(growOptions) {
    const options = {};
    if (growOptions) {
      Object.assign(options, growOptions);
    }
    Object.assign(options, this.options);

    let podspec = fs.readFileSync(GROW_CONFIG_TEMPLATE_PATH, 'utf-8');
    podspec = yaml.load(podspec);

    // disable sitemap (useful for test builds)
    if (options.noSitemap) {
      delete podspec.sitemap;
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
        'out_dir': utils.project.paths.GROW_BUILD_DEST,
        'extracted_examples_dir': utils.project.paths.INLINE_EXAMPLES_DEST,
        'env': podspec['env'],
      },
    };

    if (options.include_paths || options.ignore_paths) {
      const filter = {};
      if (options.ignore_paths) {
        filter.ignore_paths = options.ignore_paths.split(',');
      } else {
        // in grow include only works against ignore. So we ignore all if we only have include
        filter.ignore_paths = ['.*'];
      }
      if (options.include_paths) {
        filter.include_paths = options.include_paths.split(',');
      }
      podspec.deployments[this.environment] = {
        'filter': filter,
      };
      signale.info('Add path filter for grow ', filter);
    }

    podspec.localization.default_locale = DEFAULT_LOCALE;
    podspec.localization.locales = AVAILABLE_LOCALES;
    // Check if specific languages have been configured to be built
    if (options.locales) {
      const locales = options.locales.split(',');
      if (!locales.every((locale) => AVAILABLE_LOCALES.includes(locale))) {
        signale.fatal('Invalid set of locales given:', options.locales);
        signale.info('Available locales are', AVAILABLE_LOCALES.join(', '));
        process.exit(1);
      }

      // we need the denylist filter, because otherwise the sitemap will not be created
      const skippedLocales = AVAILABLE_LOCALES.filter((locale) => {
        return !locales.includes(locale);
      });
      podspec.deployments.default['filters'] = {
        'type': 'denylist',
        'locales': skippedLocales,
      };

      signale.info('Only building locales', options.locales);
    }
    return podspec;
  }
}

const config = new Config(
  options.env || process.env.APP_ENV || process.env.NODE_ENV
);

module.exports = config;
