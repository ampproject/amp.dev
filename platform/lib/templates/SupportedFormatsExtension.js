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

const {DEFAULT_FORMAT} = require('../amp/formatHelper.js');

/**
 * Helps determining the default format for a certain template
 * to render it in the best fitting format if none is explicitly set
 */
class SupportedFormatsExtension {
  constructor() {
    this.tags = ['supportedFormats'];
  }

  parse(parser, nodes) {
    const token = parser.nextToken();

    // Parse arguments from tag
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(token.value);

    return new nodes.CallExtension(this, 'run', args);
  }

  /**
   * Tries to figure out if there is a fitting default
   * format and overwrites the one set by the global context
   */
  run(context, args) {
    const formats = args.formats || [DEFAULT_FORMAT];

    // Check if the user did not select a specific format
    // and if so overwrite the default format with a more fitting one
    if (context.ctx.requestedFormat) {
      return;
    }

    context.ctx.format = formats[0];
  }
}

module.exports = {
  SupportedFormatsExtension,
};
