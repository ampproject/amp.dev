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

require('module-alias/register');

const config = require('@lib/config.js');
const {CloudRedisClient} = require('@google-cloud/redis');
const Redis = require('ioredis');
const ms = require('ms');
const utils = require('@lib/utils');
const yaml = require('js-yaml');
const fs = require('fs');
const LRU = require('lru-cache');
const gcpMetadata = require('gcp-metadata');

const buildInfo = yaml.safeLoad(fs.readFileSync(utils.project.paths.BUILD_INFO_PATH, 'utf8'));

/**
 * Time in seconds an item in Redis will stay valid
 * @type {Integer}
 */
const EXPIRATION_TIME = ms('1d') / 1000;

/**
 * Number of pages that is cached in the fallback LRU cache at maximum
 * @type {Number}
 */
const LRU_MAX_ITEMS = 100;

/**
 * The Google Cloud project which is searched for Redis instances
 * @type {String}
 */
const PROJECT_ID = process.env.GCP_PROJECT || process.env.GOOGLE_CLOUD_PROJECT;

/**
 * The region the querying instance is running in
 * @type {String}
 */
const REGION = process.env.FUNCTION_REGION || '-';

/**
 * A list of available redis instances for the region the Google Computing
 * instance is running in
 * @type {Array}
 */
const instances = (async () => {
  // Do not try to search for instances if running locally
  if (config.isDevMode() || config.isLocalMode()) {
    return [];
  }

  // Project id is most likely set by environment variable. Check if it's
  // there, otherwise query metadata servers
  let projectId = PROJECT_ID;
  if (!projectId) {
    try {
      projectId = await gcpMetadata.project('project-id');
      console.log('[PAGE_CACHE]: Project ID', projectId);
    } catch (e) {
      console.error('[PAGE_CACHE]: Fetching project id failed', e);
      return [];
    }
  }

  if (!projectId) {
    console.warn('[PAGE_CACHE]: Not running on Google Cloud Platform.');
    return [];
  }

  let region = null;
  try {
    // Zone is in URL like scheme: projects/123/zones/us-central1-b
    let zone = await gcpMetadata.instance('zone');
    zone = zone.split('/').pop();

    // As CloudRedis queries instances by region, slice the zone identifier
    region = zone.slice(0, -2);

    console.log('[PAGE_CACHE]: Zone & Region', zone, region);
  } catch (e) {
    console.error('[PAGE_CACHE] Fetching zone failed falling back to', REGION);
    region = REGION;
  }

  const client = new CloudRedisClient();
  const formattedParent = client.locationPath(projectId, region);
  const request = {
    parent: formattedParent,
  };
  const resp = (await client.listInstances(request))[0];

  console.log('[PAGE_CACHE]: Cloud Redis instances', resp);

  return resp;
})();

let redis = null;
let lru = null;

instances.then((instances) => {
  // Check if there is an instance available. If there is, instantiate
  // a client to use it, if there is none fall back to LRU cache
  if (instances.length) {
    const instance = instances[0];
    console.log('[PAGE_CACHE]: About to connect to Redis at', instance.port, instance.host);
    try {
      redis = new Redis(instance.port, instance.host);
      console.log('[PAGE_CACHE]: Connected to Redis instance at',
          instance.host, instance.port);
      return;
    } catch (e) {
      console.error('[PAGE_CACHE]: Connecting to Redis failed', e);
    }
  }

  console.warn('[PAGE_CACHE]: No Redis instances available. Falling back to LRU');
  lru = new LRU({
    max: LRU_MAX_ITEMS,
  });
}).catch((e) => {
  console.error('[PAGE_CACHE]: Could not initialize caches', e);
});

/**
 * Prefixes the key (which should be the request URL) with the current
 * build number (which is an integer)
 * @param  {String} key
 * @return {String}
 */
function prefixKey(key) {
  return `${buildInfo.number}-${key}`;
}

/**
 * Tries to fetch a rendered page from either the LRU cache or from
 * an redis instance or returns null if none of them is available
 * @param  {String} key
 * @return {Promise}
 */
async function get(key) {
  const prefixedKey = prefixKey(key);

  if (lru) {
    return lru.get(prefixedKey);
  } else if (redis) {
    return await redis.get(prefixedKey);
  }

  return null;
}

/**
 * Adds a rendered page to either the LRU or the Redis cache. Simply falls
 * through if in development mode
 * @param {String} key
 * @param {String} html
 */
function set(key, html) {
  if (config.isDevMode()) {
    return;
  }

  const prefixedKey = prefixKey(key);

  if (lru) {
    lru.set(prefixedKey, html);
  } else if (redis) {
    redis.set(prefixedKey, html, 'ex', EXPIRATION_TIME);
  } else {
    console.warn('[PAGE_CACHE]: No cache available to cache', key);
  }
}

module.exports = {
  get,
  set,
};
