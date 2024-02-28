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

const {sh} = require('@lib/utils/sh.js');
const {cyan, red} = require('ansi-colors');
const {DIST, PAGES_DEST} = require('@lib/utils/project').paths;
const {NETLIFY_DEPLOY_TOKEN, DEPLOY_ENVIRONMENT} = process.env;

/** @typedef {'Staging' | 'Production'} DeploymentEnvironmentsDef */
/** @typedef {{name: string, id: string, dir: string}} DeploymentSiteDef */
/** @typedef {Record<DeploymentEnvironmentsDef, DeploymentSiteDef[]>} DeploymentConfigDef */

// Which deploy environment to use if the env variable is not set.
const DEFAULT_DEPLOY_ENVIRONMENT = 'Staging';

/** @type {DeploymentConfigDef} */
const SITES = {
  'Staging': [
    {
      name: 'staging-amp-dev.netlify.app',
      id: '75115d1b-a53a-4e0c-ac21-93930d604d0b',
      dir: PAGES_DEST,
    },
    {
      name: 'playground-staging-amp-dev.netlify.app',
      id: 'a9f7ee74-0f49-49ff-9c2d-5cac85df3dc8',
      dir: `${DIST}/playground`,
    },
    {
      name: 'preview-staging-amp-dev.netlify.app',
      id: '8ade0d74-9b2c-4e8e-8d85-73e198208fba',
      dir: `${DIST}/examples`,
    },
  ],
  'Production': [
    {
      name: 'amp.dev',
      id: 'e571c70e-d23f-4cbf-ac4e-802bb08e5261',
      dir: PAGES_DEST,
    },
    {
      name: 'playground.amp.dev',
      id: 'acead270-9404-4dde-81e4-aec0e6884869',
      dir: `${DIST}/playground`,
    },
    {
      name: 'preview.amp.dev',
      id: 'caf28d42-024a-4efb-b266-b00cf10847a3',
      dir: `${DIST}/examples`,
    },
  ],
};

async function staticDeploy() {
  const deployEnvironment = DEPLOY_ENVIRONMENT ?? DEFAULT_DEPLOY_ENVIRONMENT;
  if (!(deployEnvironment in SITES)) {
    console.error(
      red('Deploy environment'),
      cyan(deployEnvironment),
      red('was specified but is not a valid environment')
    );
    console.info('Valid environments are:', Object.keys(SITES));
    process.exit(1);
  }

  for (const {name, id, dir} of SITES[deployEnvironment]) {
    console.log('Deploying', cyan(dir), 'to', cyan(name));

    await sh(
      `npx netlify deploy --prod --auth ${NETLIFY_DEPLOY_TOKEN} --dir ${dir} --site ${id}`,
      {workingDir: dir}
    );
  }
}

exports.staticDeploy = staticDeploy;
