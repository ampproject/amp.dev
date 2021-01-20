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

const {format} = require('util');
const linkifyHtml = require('linkifyjs/html');
const LogProvider = require('./LogProvider.js');

/**
 * Formats a AMP runtime log requests.
 */
class LogFormatter {
  constructor(logProvider = new LogProvider()) {
    this.logProvider_ = logProvider;
  }

  /**
   * Turns a AMP runtime log requests into an HTML string
   * @param {Object} message The log request object.
   * @returns {string} HTML string
   */
  async apply(logRequest) {
    const log = await this.logProvider_.get(logRequest);
    let formattedMesssage = format(log.message, ...logRequest.params);
    formattedMesssage = linkifyHtml(formattedMesssage, {
      defaultProtocol: 'https',
      className: null,
      target: null,
    });
    return formattedMesssage;
  }
}

module.exports = LogFormatter;
