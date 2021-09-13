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

'use strict';

const {pagePath} = require('@lib/utils/project');
const {setMaxAge} = require('@lib/utils/cacheHelpers.js');
const {optimizer} = require('@lib/utils/ampOptimizer.js');
const {readFileSync} = require('fs');
const {join} = require('path');

let optimizedPage;

async function getNotFoundPage() {
  if (!optimizedPage) {
    try {
      const page = readFileSync(join(pagePath(), '404.html'), 'utf-8');
      optimizedPage = await optimizer.transformHtml(page);
    } catch (e) {
      optimizedPage = "The page you've requested can't be found.";
    }
  }
  return optimizedPage;
}

module.exports = async (req, res) => {
  setMaxAge(res, 60 * 10); // ten minutes
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    res.status(404).send(getNotFoundPage());
    return;
  }

  res.status(404).send('404').end();
};
