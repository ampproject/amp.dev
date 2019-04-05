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

require('module-alias/register');

const signale = require('signale');

const config = require('./lib/config');
const Pipeline = require('./lib/pipeline');
const Platform = require('./lib/platform');

const pipeline = new Pipeline();

pipeline.clean();

// TODO(matthiasrohmer): Use task runner (like gulp.series/gulp.parallel) to
// execute tasks to better handle flow
(async () => {
  signale.time('Pipeline');

  await pipeline.check();

  // Collection of static files does not need to be waited for as it happens
  // real quick and no other task depends on them
  pipeline.collectStatics();

  await pipeline.buildFrontend();

  // Before pages can be built all needed documents need to be imported:
  // - The reference docs for the various components
  // - Some documents that get maintained inside ampproject/amphtml
  if (config.options['import'] === true) {
    const referenceImport = pipeline.importReference();
    const specImport = pipeline.importSpec();
    const roadmapImport = pipeline.importRoadmap();

    try {
      await Promise.all([referenceImport, specImport, roadmapImport]);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  // // Create sample sources which get used while generating the pages
  await pipeline.buildSamples();

  // Generate pages does not statically build the pages for development
  // but instead starts the development server
  await pipeline.generatePages();

  // In all other environments than development the build should be optimized
  // and tested to ensure it is working
  if (!config.isDevMode()) {
    await pipeline.optimizeBuild();
    await pipeline.testBuild();
  }

  signale.timeEnd('Pipeline');
})()
    .then(() => {
      // For development we also want to directly serve the current build
      if (config.isDevMode()) {
        new Platform().start();
      }
    })
    .catch(() => {
      process.exit(1);
    });
