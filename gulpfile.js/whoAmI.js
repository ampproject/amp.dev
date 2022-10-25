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

const gulp = require('gulp');
const config = require('@lib/config');
const yaml = require('js-yaml');
const gulpFile = require('gulp-file');
const fs = require('fs');
const {project} = require('@lib/utils');

async function whoAmI() {
  const buildInfo = {
    'environment': config.environment,
    'instance': process.env.GAE_INSTANCE,
    'build': yaml.load(fs.readFileSync(project.paths.BUILD_INFO_PATH, 'utf8')),
  };

  return await gulpFile(`who-am-i`, JSON.stringify(buildInfo, 0, 2), {
    src: true,
  }).pipe(gulp.dest(`${project.paths.PAGES_DEST}`));
}

exports.whoAmI = whoAmI;
