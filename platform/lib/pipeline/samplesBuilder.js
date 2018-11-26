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

const gulp = require('gulp');
const { loadExample } = require('amp-by-example');
const through = require('through2');
const Document = require('./document');
const Collection = require('./collection');


const EXAMPLE_SRC = '../examples/**/*.html';
// Where to store the samples inside the Grow pod in
const DESTINATION_BASE_PATH = '../pages/content/amp-dev/documentation/examples';

class SamplesBuilder {

  constructor() {
    this._log = new Signale({
      'interactive': true,
      'scope': 'Samples builder'
    });
  }

  async build() {
    let builtSamples = [];
    let stream = gulp.src(EXAMPLE_SRC, {'read': true});

    this._log.start('Beginning to build samples ...');
    stream = stream.pipe(through.obj((function(sample, encoding, callback) {
      this._log.await(`Building sample ${sample.relative} ...`);

      // Create vinyls for all needed files and push them to the stream

    }).bind(this)));

    stream = stream.pipe(through.obj(await _buildSample.bind(this));

    return new Promise.all([]);
  }

  _buildSample(sample, encoding, callback) {
    this._log.await('Building sample');
  }
}

module.exports = SamplesBuilder;
