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
const FORMAT_WEBSITES = 'websites';
const SUPPORTED_FORMATS = [FORMAT_WEBSITES, 'stories', 'ads', 'email'];
const DEFAULT_FORMAT = SUPPORTED_FORMATS[0];

/**
 * Extracts the active format from the format query parameter. Returns 'websites' as default if
 * no format is given.
 *
 * @param  {expressjs.Request} request
 * @return {String} the format
 */
function getFormatFromRequest(req) {
  let formatString = req.query.format;
  if (!formatString) {
    return DEFAULT_FORMAT;
  }
  formatString = formatString.toLowerCase();
  if (!SUPPORTED_FORMATS.includes(formatString)) {
    return DEFAULT_FORMAT;
  }
  return formatString;
}

module.exports = {
  getFormatFromRequest,
  SUPPORTED_FORMATS,
  DEFAULT_FORMAT,
  FORMAT_WEBSITES,
};
