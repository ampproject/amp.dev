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
const credentials = require('@lib/utils/credentials');

// google custom search does not support a page size > 10
const PAGE_SIZE = 10;

// google custom search json api does not support loading more than 100 results
const MAX_PAGE = 10;

const CSE_BASE_URL = 'https://www.googleapis.com/customsearch/v1';
const CSE_ID = '14077439351665726204:s4tidjx0agu';
let API_KEY = undefined;

credentials.get('GOOGLE_CSE_API_KEY').then((key) => {
  API_KEY = key;
}).catch((err) => {
  console.error('ERROR: Google site search will not be available!',
      err.message ? err.message : err);
});

async function search(query, locale, page) {
  if (!API_KEY) {
    throw Error('Custom search api key not initialized! Check log for errors on startup.');
  }

  const startIndex = (page - 1) * PAGE_SIZE + 1;
  query = encodeURIComponent(query);
  let language = locale;
  if (language.length > 2) {
    language = language.substr(0, 2);
  }
  language = encodeURIComponent(language.toLowerCase());

  const url = `${CSE_BASE_URL}?cx=${CSE_ID}&key=${API_KEY}&hl=${language}` +
      `&lr=lang_${language}&q=${query}&start=${startIndex}`;

  const fetchResponse = await fetch(url);
  if (!fetchResponse.ok) {
    console.log(`CSE Error ${fetchResponse.status} for url ${url}: `, await fetchResponse.text());
    throw Error('Invalid response for search query');
  }

  return await fetchResponse.json();
}

module.exports={
  search,
  PAGE_SIZE,
  MAX_PAGE,
};
