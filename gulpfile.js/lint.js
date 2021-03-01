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
const through = require('through2');
const yaml = require('js-yaml');
const {sh} = require('@lib/utils/sh');
const {project} = require('@lib/utils');
const signale = require('signale');
const growReferenceChecker = require('@lib/tools/growReferenceChecker');
const log = require('@lib/utils/log')('Linter');

function lintNode() {
  return sh('npm run lint:node');
}

function lintYaml() {
  return gulp.src(`${project.paths.ROOT}/**/*.{yaml,yml}`).pipe(
    through.obj(async (file, encoding, callback) => {
      try {
        if (file.contents.includes(' !g.')) {
          log.warn(
            `Can not validate ${file.relative} as it contains custom constructors`
          );
        } else {
          yaml.load(file.contents);
        }

        callback();
      } catch (e) {
        signale.fatal(`Error parsing YAML: ${file.relative}`, e);
        callback(e);
      }
    })
  );
}

function lintGrow() {
  return growReferenceChecker.start();
}

exports.lintNode = lintNode;
exports.lintYaml = lintYaml;
exports.lintGrow = lintGrow;
exports.lintAll = gulp.parallel(lintNode, lintYaml, lintGrow);
