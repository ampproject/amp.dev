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

const {sh} = require('@lib/utils/sh');
const {project} = require('@lib/utils');

/**
 * Will execute grow in the configured pod path "project.paths.GROW_POD"
 * @param args the arguments for grow in a string
 */
function exec(args) {
  return sh(
    // to support local execution where grow is often not in the path, we add the default install path ~/bin
    ['sh', '-c', `PATH=$PATH:~/bin && grow ${args}`],
    {
      workingDir: project.paths.GROW_POD,
    }
  );
}

module.exports = exec;
