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
const fs = require('fs');
const path = require('path');
const config = require('@lib/config.js');
const project = require('@lib/utils/project.js');
const googleSearch = require('@lib/utils/googleSearch.js');

// google custom search does not support a page size > 10
const PAGE_SIZE = 10;
// google custom search json api does not support loading more than 100 results
const LAST_PAGE = 10;

const COMPONENT_REFERENCE_DOC_PATTERN =
    /^(?:https?:\/\/[^/]+)?(?:\/[^/]+)?\/documentation\/components\/(amp-[^/]+)/;

const EXAMPLE_URL_PATH = '/documentation/examples/components/';
const EXAMPLE_FOLDER_PATH = path.join(project.paths.DIST, '/examples/sources/components/');

const REMOVE_HOST_PATTERN = /^https?:\/\/amp\.dev(?=\/)/;

const PREVIEW_HOST = config.hosts.preview.base;
const PLAYGROUND_URL = config.hosts.playground.base;

// use the twitter title if available since it does not contain the site name
const TITLE_META_TAG = 'twitter:title';
const DESCRIPTION_META_TAG = 'twitter:description';

// eslint-disable-next-line new-cap
const examples = express.Router();

const BUILD_IN_COMPONENTS = [
  'amp-layout',
  'amp-img',
  'amp-pixel',
];

const IMPORTANT_INCLUDED_ELEMENTS = [
  'amp-state',
  'amp-list-load-more',
  'amp-story-page',
  'amp-story-grid-layer',
  'amp-story-bookend',
];

const COMPONENT_VERSIONS_PATH = path.join(project.paths.GROW_POD,
    '/extensions/amp-component-versions.json');

function getAutosuggestComponents() {
  let result = [];
  const components = require(COMPONENT_VERSIONS_PATH);
  for (const component in components) {
    if (components.hasOwnProperty(component)) {
      result.push(component);
    }
  }
  result = result.concat(BUILD_IN_COMPONENTS);
  result = result.concat(IMPORTANT_INCLUDED_ELEMENTS);
  return result.sort();
}

const AUTOSUGGEST_COMPONENTS = getAutosuggestComponents();

examples.get('/search/autosuggest', handleAutosuggestRequest);
examples.get('/search/do', handleSearchRequest);

function handleAutosuggestRequest(request, response) {
  const items = ({
    items: AUTOSUGGEST_COMPONENTS,
  });
  response.json(items);
}

function hasExample(component) {
  const filePath = path.join(EXAMPLE_FOLDER_PATH, component + '.html');
  return fs.existsSync(filePath);
}

function getCseItemMetaTagValue(item, metaTag) {
  // since pagemap has always key:array the metatags dictionary is always the first element in the array
  if (item.pagemap && item.pagemap.metatags && item.pagemap.metatags.length > 0
      && item.pagemap.metatags[0][metaTag]) {
    return item.pagemap.metatags[0][metaTag];
  }
  return null;
}


function createPageObject(csePageItem) {
  let title = getCseItemMetaTagValue(csePageItem, TITLE_META_TAG);
  if (!title) {
    title = csePageItem.title;
  }

  const page = {
    title: title,
    description: csePageItem.snippet,
    url: csePageItem.link,
  };

  const hostMatch = page.url.match(REMOVE_HOST_PATTERN);
  if (hostMatch) {
    page.url = page.url.substring(hostMatch[0].length);
  }

  return page;
}

function enrichComponentPageObject(item, page, locale) {
  const description = getCseItemMetaTagValue(item, DESCRIPTION_META_TAG);
  if (description) {
    page.description = description;
  }

  if (page.url) {
    const componentName = page.url.match(COMPONENT_REFERENCE_DOC_PATTERN)[1];
    if (hasExample(componentName)) {
      page.exampleUrl = EXAMPLE_URL_PATH + componentName + '/';
      page.playgroundUrl = PLAYGROUND_URL + '/?url='
        + encodeURIComponent(PREVIEW_HOST + page.exampleUrl);
      // the preview link must not have the locale, but the example doc page has to have it:
      if (locale != config.getDefaultLocale()) {
        page.exampleUrl = '/' + encodeURIComponent(locale.toLowerCase()) + page.exampleUrl;
      }
    }
  }
}

async function handleSearchRequest(request, response, next) {
  const query = request.query && request.query.q ? request.query.q : '';
  const page = request.query && request.query.page ? parseInt(request.query.page) : 1;
  const locale = request.query && request.query.locale ?
      request.query.locale : config.getDefaultLocale();

  if (isNaN(page)) {
    const error = 'Invalid search page param ' + request.query.page;
    console.log(error);
    next(error);
    return;
  }

  // TODO remove together with test method
  if (query.includes('test')) {
    return handleTestSearchRequest(request, response);
  }

  const highlightComponents = page == 1;

  let cseResult = undefined;
  try {
    cseResult = await googleSearch(query, locale, page);
  } catch (err) {
    // problem was logged before, so simply forward the error
    next(err);
    return;
  }

  const totalResults = parseInt(cseResult.searchInformation.totalResults);
  const pageCount = Math.ceil(totalResults / PAGE_SIZE);
  const pages = [];
  const components = [];

  if (totalResults > 0) {
    for (const item of cseResult.items) {
      const page = createPageObject(item);

      if (highlightComponents && COMPONENT_REFERENCE_DOC_PATTERN.test(page.url)) {
        enrichComponentPageObject(item, page, locale);
        components.push(page);
      } else {
        pages.push(page);
      }
    }
  }

  const result = ({
    result: {
      totalResults: totalResults,
      currentPage: page,
      pageCount: pageCount,
      components: components,
      pages: pages,
    },
  });

  if (page < pageCount && page < LAST_PAGE) {
    result.nextUrl = '/search/do?q=' + encodeURIComponent(query)
        + '&page=' + (page + 1) + '&locale=' + encodeURIComponent(locale);
  }
  response.json(result);
}


function handleTestSearchRequest(request, response) {
  const query = request.query && request.query.q ? request.query.q : '';
  const page = request.query && request.query.page ? parseInt(request.query.page) : 1;
  const locale = request.query && request.query.locale ?
      request.query.locale : config.getDefaultLocale();

  if (query.includes('error') && page > 1) {
    throw Error('test error');
  }

  let lastPage = LAST_PAGE;
  const pageQuery = query.match(/(\d+)-pages/);
  if (pageQuery) {
    lastPage = parseInt(pageQuery[1]);
  }
  const totalResults = (lastPage -1) * PAGE_SIZE + 3;

  const pages = [];
  const itemCount = page == lastPage ? 3 : PAGE_SIZE;
  for (let i=1; i <= itemCount; i++) {
    pages.push({
      title: 'test ' + query + ' a ' + ((page-1) * PAGE_SIZE + i),
      description: 'description page a ' + ((page-1) * PAGE_SIZE + i),
      url: 'http://amp.dev',
    });
  }

  const components = [];
  if (query.startsWith('amp-') && page==1) {
    for (let i=1; i <= 2; i++) {
      components.push({
        title: 'component ' + query + ' ' + i,
        description: 'description component a ' + i,
        url: 'https://amp.dev',
        exampleUrl: i == 1 ? 'https://amp.dev/documentation/examples/' : null,
        playgroundUrl: i == 1 ? 'https://playground.amp.dev' : null,
      });
    }
  }

  const result = ({
    result: {
      totalResults: totalResults,
      currentPage: page,
      pageCount: lastPage,
      components: components,
      pages: pages,
    },
  });

  if (page < lastPage && page < LAST_PAGE) {
    result.nextUrl = '/search/do?q=' + encodeURIComponent(query)
        + '&page=' + (page + 1) + '&locale=' + encodeURIComponent(locale);
  }

  response.json(result);
}

module.exports = examples;
