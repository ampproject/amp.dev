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

const express = require('express');
const {join, dirname, resolve} = require('path');

// eslint-disable-next-line new-cap
const examples = express.Router();

const {listFiles} = require('../boilerplate/lib/io.js');

/* auto import all sample specific routers */
loadRouters('api', '/api');
/* auto import all routers defined in this dir */
loadRouters('source');

function loadRouters(root, prefix = '') {
  const routers = [];
  const rootDir = resolve(join(__dirname, root));
  listFiles(rootDir, routers, true);
  routers
    .filter((path) => path.endsWith('.js') && !path.includes('/static/'))
    .forEach((path) => {
      const route = join(prefix, getRoute(rootDir, path));
      examples.use('/documentation/examples' + route, require(path));
    });
}

function getRoute(rootDir, filePath) {
  let route = filePath.substring(rootDir.length);
  route = dirname(route);
  route = removeOrdinals(route);
  return route;
}

function removeOrdinals(path) {
  return path.replace(/\/\d+\./g, '/');
}

module.exports = examples;
