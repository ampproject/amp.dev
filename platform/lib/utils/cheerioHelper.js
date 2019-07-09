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

/**
 * Returns the html content of the given cheerio object. As cheerio has problems
 * with XML syntax in HTML documents the markup for the icons needs to be
 * restored.
 * @param  {CheerioStatic} dom
 * @return {String}
 */
function htmlContent(dom) {
  let html = dom.html();
  html = html.replace(
      'xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"',
      'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
  );
  html = html.replace(
      /xlink="http:\/\/www\.w3\.org\/1999\/xlink" href=/gm,
      'xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href='
  );
  html = html.replace(/<!doctype/i, '\n<!doctype');
  html = html.replace(/\n\s+\n/g, '\n');
  return html;
}

module.exports = {
  htmlContent,
};
