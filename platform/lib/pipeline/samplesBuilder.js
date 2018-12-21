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

const { Signale } = require('signale');
const gulp = require('gulp');
const { parseSample } = require('amp-by-example');
const through = require('through2');

// Where to import the samples from
const EXAMPLE_SRC = '../examples/**/*.html';
// The pod path inside
const POD_PATH = 'content/amp-dev/documentation/examples';
// Where to store the samples inside the Grow pod in
const EXAMPLE_DEST = `../pages/${POD_PATH}`;
// What Grow template to use to render the sample's manual
const MANUAL_TEMPLATE = 'views/detail/example-detail.j2';
// Base to define the request path for Grow
const PATH_BASE = '/documentation/examples/';

class SamplesBuilder {

  constructor() {
    this._log = new Signale({
      'interactive': true,
      'scope': 'Samples builder'
    });
  }

  async build() {
    this._log.start('Beginning to build samples ...');

    return new Promise((resolve, reject) => {
      let stream = gulp.src(EXAMPLE_SRC, {'read': true});

      stream = stream.pipe(through.obj((async function(sample, encoding, callback) {
        this._log.await(`Building sample ${sample.relative} ...`);
        let parsedSample = await parseSample(sample.path);

        stream.push(this._createDataSource(sample, parsedSample));
        stream.push(this._createManualDoc(sample, parsedSample));
        stream.push(this._createPreviewDoc(sample, parsedSample));

        callback();
      }).bind(this)));

      stream.pipe(gulp.dest(EXAMPLE_DEST));

      stream.on('error', (error) => {
        this._log.fatal('There was an error building the samples', error);
        reject();
      });

      stream.on('end', () => {
        this._log.success(`Built samples to ${EXAMPLE_DEST}.`);
        resolve();
      });
    });
  }

  /**
   * Creates a file for the data source that is then consumed by a Grow
   * template to render the examples manual
   * @param  {Vinyl} sample       The sample from the gulp stream
   * @param  {Object} parsedSample Sample as parsed by abe.com
   * @return {Vinyl}
   */
  _createDataSource(sample, parsedSample) {
    sample = sample.clone();
    sample.contents = Buffer.from(JSON.stringify(parsedSample));
    sample.extname = '.json';

    return sample;
  }

  /**
   * Creates a markdown document referencing the JSON that is going to be
   * created by _createDataSource
   * @param  {Vinyl} sample The sample from the gulp stream
   * @return {Vinyl}
   */
  _createManualDoc(sample, parsedSample) {
    sample = sample.clone();
    sample.contents = Buffer.from([
      '---',
      '$title: ' + parsedSample.document.title,
      '$view: ' + MANUAL_TEMPLATE,
      '$path: ' + PATH_BASE + sample.relative,
      '$localization: ',
      '  ' + 'path: /{locale}' + PATH_BASE + sample.relative,
      'example: !g.json ' + POD_PATH + '/' + sample.relative.replace('.html', '.json'),
      '---'
    ].join('\n'));
    sample.extname = '.md';

    return sample;
  }

  /**
   * Creates a markdown document referencing the JSON that is going to be
   * created by _createDataSource
   * @param  {Vinyl} sample The sample from the gulp stream
   * @return {Vinyl}
   */
  _createPreviewDoc(sample, parsedSample) {
    sample = sample.clone();
    sample.contents = Buffer.from([
      '---',
      '$title: ' + parsedSample.document.title,
      '$path: ' + PATH_BASE + sample.relative.replace('.html', '-preview.html'),
      '$localization: ',
      '  ' + 'path: /{locale}' + PATH_BASE + sample.relative.replace('.html', '-preview.html'),
      'example: !g.json ' + POD_PATH + '/' + sample.relative.replace('.html', '.json'),
      '---'
    ].join('\n'));
    sample.extname = '-preview.html';

    return sample;
  }

}

module.exports = SamplesBuilder;
