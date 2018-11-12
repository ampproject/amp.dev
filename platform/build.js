#!/usr/bin/env node

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

const config = require('./lib/config.js');
const Pipeline = require('./lib/pipeline');
const Platform = require('./lib/platform');

let pipeline = new Pipeline();

pipeline.clean();

(async () => {
  await pipeline.check();
  pipeline.collectStatics();

  await pipeline.buildFrontend();
  // Generate pages does not statically build the pages for development
  // but instead starts the development server
  await pipeline.generatePages();

  if (config.environment !== 'development') {
    await pipeline.optimizeBuild();
  }
})().then(() => {
  // For development we also want to directly serve the current build
  if (config.environment == 'development') {
    let platform = new Platform();
  }
});
