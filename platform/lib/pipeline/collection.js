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

const fs = require('fs');
const path = require('path');
const writeFile = require('write');

const config = require('../config');

class Collection {

  /**
   * Creates a virtual collection that will be reflected inside a
   * _blueprint.yaml upon create()
   * @param {String} destination Where to save the collection to
   * @param {String} title       The title of the collection
   * @param {String} view        Path to the collections default view
   * @param {String} path        The request path
   */
  constructor(destination, title, view, path) {
    this.destination = destination;
    this._blueprint = {
      '$title': title,
      '$view': view,
      '$path': path
    };
  }

  /**
   * Creates the necessary blueprint for the collection
   * @return {Promise} [description]
   */
  create(path, overwrite=false) {
    // Check if the collection already exists and only write (new) blueprint
    // if overwrite is set to true
    let blueprintPath = this.destination + '/_blueprint.yaml'
    if (fs.existsSync(blueprintPath) && !overwrite) {
      // Return noop promise for consistent API
      return new Promise((resolve, reject) => { resolve(blueprintPath); });
    }

    let blueprint = '';
    // TODO: Maybe move functionality to build YAML to utils
    for (let key in this._blueprint) {
      blueprint += `${key}: ${this._blueprint[key]}\n`;
    }

    return writeFile.promise(blueprintPath, blueprint);
  }
}

module.exports = Collection;
