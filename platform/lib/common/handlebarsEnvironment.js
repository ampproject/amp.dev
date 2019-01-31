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
const handlebars = require('handlebars');
const registrar = require('handlebars-registrar');
const {Signale} = require('signale');

const utils = require('../utils');

CSS_BASE_PATH = utils.project.absolute('pages/css/');
ICONS_BASE_PATH = utils.project.absolute('frontend/icons/');
PARTIALS_BASE_PATH = utils.project.absolute('frontend/hbs/partials/');

/**
 * A handlebars environment that resembles an environment similiar to the
 * one that is used by Grow
 */
class HandlebarsEnvironment {

  constructor() {
    this._log = new Signale({
      'interactive': false,
      'scope': 'Handlebars',
    });
    this.handlebars = handlebars;

    // Register partials that may be needed
    registrar(handlebars, {
      'parsePartialName': (file) => {
        return file.path.replace(PARTIALS_BASE_PATH, '');
      },
      'partials': [
        PARTIALS_BASE_PATH + '**/*.hbs',
      ],
      'helpers': {
        'css': (filePath) => {
          try {
            let css = fs.readFileSync(CSS_BASE_PATH + filePath);
            return css;
          } catch(e) {
            this._log.warn(`Can't find stylesheet ${CSS_BASE_PATH + filePath}`, e);
            return `/* Not found: ${filePath} */`;
          }
        },
        'icon': (filePath) => {
          try {
            return fs.readFileSync(ICONS_BASE_PATH + filePath);
          } catch(e) {
            this._log.warn(`Can't find icon ${ICONS_BASE_PATH + filePath}`, e);
            return `<!-- Not found: ${filePath} -->`;
          }
        }
      }
    });
  }

  render(template, context = {}) {
    return this.handlebars.compile(template, {compat: true})(context);
  }
}

module.exports = {
  'handlebars': new HandlebarsEnvironment(),
};
