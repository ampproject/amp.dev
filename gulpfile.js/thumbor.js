/**
 * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
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
const {join} = require('path');

const config = require('@lib/config');
const {sh} = require('@lib/utils/sh.js');
const {project} = require('@lib/utils');

const IMAGE_TAG = 'amp-dev-thumbor';
const opts = {
  workingDir: project.paths.THUMBOR_ROOT,
};

async function thumborRunLocal() {
  await sh('pwd', opts);
  await sh(`docker build -t ${IMAGE_TAG} .`, opts);
  return await sh(
    `docker run -p ${config.hosts.thumbor.port}:80 ${IMAGE_TAG}`,
    opts
  );
}

async function thumborCollectImages() {
  const imagePaths = config.shared.thumbor.fileExtensions.map((extension) => {
    return join(project.paths.STATICS_DEST, '/**/', `*.${extension}`);
  });

  return gulp
    .src(imagePaths)
    .pipe(gulp.dest(`${project.paths.THUMBOR_STATICS_DEST}`));
}

exports.thumborRunLocal = thumborRunLocal;
exports.thumborCollectImages = thumborCollectImages;
