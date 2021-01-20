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

const config = require('@lib/config');
const {Datastore} = require('@google-cloud/datastore');

/* The entity name used in the GCloud Datastore */
const CREDENTIAL_ENTITY = 'Credential';

/* Prefix for local environment variables containing credentials */
const ENV_PREFIX = 'AMP_DEV_CREDENTIAL_';

/* A Datastore instance */
const datastore = new Datastore();

/**
 * Tries to get a credential by name either from an environment variable
 * or if on app engine from the GCloud Datastore
 * @param  {String} key A named Credential entity entry in the datastore
 * @return {Promise}
 */
function get(key) {
  const credential = process.env[`${ENV_PREFIX}${key.toUpperCase()}`];
  if (credential) {
    return Promise.resolve(credential);
  }

  if (!config.isProdMode() && !config.isStageMode()) {
    return Promise.reject(
      new Error(
        `Environment variable ${ENV_PREFIX}${key.toUpperCase()} is not set.`
      )
    );
  }

  return new Promise((resolve, reject) => {
    const datastoreKey = datastore.key([CREDENTIAL_ENTITY, key.toUpperCase()]);
    datastore.get(datastoreKey, (e, entity) => {
      if (e) {
        reject(e);
        return;
      }

      if (!entity) {
        reject(new Error(`empty entity for key ${key}`));
        return;
      }
      resolve(entity.credential);
    });
  });
}

module.exports = {
  get,
};
