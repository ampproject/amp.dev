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
const {DIST, PAGES_DEST} = require('@lib/utils/project').paths;
const {NETLIFY_DEPLOY_TOKEN} = process.env;
const SITES = [
  {
    NAME: 'amp.dev',
    ID: 'e571c70e-d23f-4cbf-ac4e-802bb08e5261',
    DIR: PAGES_DEST,
  },
  {
    NAME: 'playground.amp.dev',
    ID: 'acead270-9404-4dde-81e4-aec0e6884869',
    DIR: `${DIST}/playground`,
  },
  {
    NAME: 'preview.amp.dev',
    ID: 'caf28d42-024a-4efb-b266-b00cf10847a3',
    DIR: `${DIST}/examples`,
  },
];

async function staticDeploy() {
  for (const SITE of SITES) {
    console.log(`attempting to deploy ${SITE.DIR}`);

    await sh(
      `npx netlify@13.1.9 deploy --dry --prod --auth ${NETLIFY_DEPLOY_TOKEN} --site ${SITE.ID}`,
      {
        workingDir: SITE.DIR,
      }
    );
  }
}

exports.staticDeploy = staticDeploy;
