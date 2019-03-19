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

/* eslint-disable no-invalid-this */
'use strict';

require('module-alias/register');

const {Signale} = require('signale');
const gulp = require('gulp');
const through = require('through2');
const fileType = require('file-type');

const config = require('@lib/config');
const utils = require('@lib/utils');

const STATICS_SRC = [
  utils.project.absolute('pages/static/**/*'),
  utils.project.absolute('examples/static/**/*'),
];
const STATIC_DEST = utils.project.absolute('platform/static');
const STATICS_INVENTORY = utils.project.absolute('platform/static.json');

class StaticsCollector {

  constructor() {
    this._log = new Signale({
      'interactive': false,
      'scope': 'Statics Collector',
    });

    // Object to keep track of all collected static files and especially
    // created renditions to be able to match them when routing
    this._inventory = {
      'images': {},
      'archives': {},
    };
  }

  /**
   * Returns a Gulp stream with all static files that should be handled
   * @return {Stream}
   */
  start() {
    // Ugly but needed to keep scope for .pipe
    const scope = this;
    return gulp.src(STATICS_SRC, {'base': './'})
        .pipe(through.obj(function(file, encoding, callback) {
          // Check if the file should actually be part of zip file
          if (file.relative.includes('.zip/')) {
            this._zip(file);
          // Otherwise determine file type to fish out images and create
          // appropriate renditions for them, therefore skip empty files/folders
          } else if (file.contents) {
            const type = fileType(file.contents);
            console.log(file.relative, type);
          // Push all other files that don't get any special handling
          } else {
            this.push(file);
          }

          callback();
        }))
        .pipe(gulp.dest(STATIC_DEST));
  }

  _zip(file) {

  }
}

if (!module.parent) {
  (async () => {
    const staticsCollector = new StaticsCollector();
    staticsCollector.start();
  })();
}

module.exports = {
  staticsCollector: new StaticsCollector(),
};
