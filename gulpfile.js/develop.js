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
const {project} = require('@lib/utils');
const {sh} = require('@lib/utils/sh');
const config = require('@lib/config');
const Platform = require('@lib/platform');
const signale = require('signale');
const build = require('./build.js');

function bootstrap(callback) {
  gulp.parallel(build.buildBoilerplate, build.buildPlayground, build.importAll)(callback);
}

function develop(callback) {
  gulp.series(gulp.parallel(build.buildFrontend, build.collectStatics), _run)(callback);
}

function _run() {
  signale.info('Watching icons, templates and styles ...');

  gulp.watch(`${project.paths.ICONS}/**/*`, build.icons);
  gulp.watch(`${project.paths.TEMPLATES}/**/*`, build.templates);
  gulp.watch(`${project.paths.SCSS}/**/*`, build.sass);

  config.configureGrow();
  sh(`grow run --port ${config.hosts.pages.port}`, {
    workingDir: project.paths.GROW_POD,
  });

  new Platform().start();
}

exports.bootstrap = bootstrap;
exports.develop = develop;
