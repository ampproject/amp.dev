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

const fetch = require('node-fetch');

const CSE_ID = 'TODO';
const API_KEY = 'TODO';
const CSE_BASE_URL = 'https://www.googleapis.com/customsearch/v1';

async function search(query, locale, page) {
  const startIndex = (page - 1) * 10 + 1;
  let language = locale;
  if (language.length > 2) {
    language = language.substr(0, 2);
  }
  language = language.toLowerCase();

  const url = `${CSE_BASE_URL}?cx=${CSE_ID}&key=${API_KEY}&hl=${language}` +
      `&lr=lang_${language}&q=${query}&start=${startIndex}`;

  const fetchResponse = await fetch(url);
  if (fetchResponse.status == 200) {
    return await fetchResponse.json();
  }
  throw Error('Invalid response for search query');
}

module.exports=search;
