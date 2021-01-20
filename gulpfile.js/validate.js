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

const {src} = require('gulp');
const {join} = require('path');
const gulpAmpValidator = require('gulp-amphtml-validator');
const {GROW_BUILD_DEST} = require('@lib/utils/project').paths;

/**
 * Validates all pages build into /platform/pages.
 */
function validate() {
  return (
    src(join(GROW_BUILD_DEST, '/**/*.amp.html'))
      // Validate the input and attach the validation result to the "amp" property
      // of the file object.
      .pipe(gulpAmpValidator.validate())
      // Print the validation results to the console.
      .pipe(gulpAmpValidator.format())
      // Exit the process with error code (1) if an AMP validation error
      // occurred.
      .pipe(gulpAmpValidator.failAfterError())
  );
}

exports.validate = validate;
