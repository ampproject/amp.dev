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

const {CloudRedisClient} = require('@google-cloud/redis');
const Redis = require('ioredis');
const ms = require('ms');
const utils = require('@lib/utils');
const yaml = require('js-yaml');
const fs = require('fs');
const buildInfo = yaml.safeLoad(fs.readFileSync(utils.project.paths.BUILD_INFO_PATH, 'utf8'));

const gcpMetadata = require('gcp-metadata');

/**
 * Time in seconds an item in Redis will stay valid
 * @type {Integer}
 */
const EXPIRATION_TIME = ms('1d') / 1000;

/**
 * The Google Cloud project which is searched for Redis instances
 * @type {String}
 */
const PROJECT_ID = process.env.GCP_PROJECT || process.env.GOOGLE_CLOUD_PROJECT;

/**
 * The region the querying instance is running in
 * @type {String}
 */
const ZONE = process.env.FUNCTION_REGION || '-';

/**
 * A list of available redis instances for the region the Google Computing
 * instance is running in
 * @type {Array}
 */
const instances = (async () => {
  // Project id is most likely set by environment variable. Check if it's
  // there, otherwise query metadata servers
  let projectId = PROJECT_ID;
  if (!projectId) {
    try {
      projectId = await gcpMetadata.instance('project-id');
      console.log('[PAGE_CACHE]: Project ID', projectId);
    } catch (e) {
      console.error('[PAGE_CACHE] Fetching project id failed');
      return [];
    }
  }

  if (!projectId) {
    console.warn('Not running on Google Cloud Platform.');
    return [];
  }

  let zone = null;
  try {
    zone = await gcpMetadata.instance('zone');
    // Zone is in URL like scheme: projects/123/zones/us-central1-b
    zone = zone.split('/').pop();
    console.log('[PAGE_CACHE]: Zone', zone);
  } catch (e) {
    console.error('[PAGE_CACHE] Fetching zone failed falling back to', ZONE);
    zone = ZONE;
  }

  console.log('[PAGE_CACHE]: Searching for Redis instances', projectId, zone);
  const client = new CloudRedisClient();
  const formattedParent = client.locationPath(projectId, zone);
  const request = {
    parent: formattedParent,
  };
  const resp = (await client.listInstances(request))[0];

  return resp;
})();


// Check if there is an instance available. If there is instantiate
// a redis client to use
let redis = null;
if (!instances.length) {
  console.warn('No page cache available. Rerendering for every request.');
} else {
  // TODO: Pick random instance instead of first one
  const instance = instances[0];
  redis = new Redis(instance.port, instance.host);
}

function prefixKey(key) {
  return `${buildInfo.number}-${key}`;
}

function get(key) {
  if (!redis) {
    console.warn('No redis server configured to retrieve', prefixKey(key));
    return Promise.resolve();
  }

  return redis.get(prefixKey(key));
}

function set(key, html) {
  if (!redis) {
    return;
  }

  redis.set(prefixKey(key), html, 'ex', EXPIRATION_TIME);
}

module.exports = {
  get,
  set,
};
