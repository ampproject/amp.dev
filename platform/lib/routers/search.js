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
const path = require('path');
const config = require('@lib/config.js');
const project = require('@lib/utils/project.js');
const googleSearch = require('@lib/utils/googleSearch.js');
const samples = require('@lib/common/samples.js');
const {setMaxAge} = require('@lib/utils/cacheHelpers');
const log = require('@lib/utils/log')('Search');
const URL = require('url').URL;
const componentVersions = require(project.paths.COMPONENT_VERSIONS);

const {
  BUILT_IN_COMPONENTS,
  IMPORTANT_INCLUDED_ELEMENTS,
} = require('@lib/common/AmpConstants.js');

const PAGE_SIZE = googleSearch.PAGE_SIZE;
const LAST_PAGE = googleSearch.MAX_PAGE;
/** How many components are shown as highlights */
const MAX_HIGHLIGHT_COMPONENTS = 3;
/** After which index do we stop to look for highlight components (zero based 0 - 9) */
const MAX_HIGHLIGHT_COMPONENT_INDEX = 7;

/** response max ages in seconds */
const RESPONSE_MAX_AGE = {
  search: 21600, // 6 hours
  highlights: 86400, // 24 hours
  autosuggest: 86400, // 24 hours
};

const COMPONENT_REFERENCE_DOC_PATTERN =
  /^(?:https?:\/\/[^/]+)?(?:\/[^/]+)?\/documentation\/components\/(amp-[^/]+)/;

// use the twitter title if available since it does not contain the site name
const TITLE_META_TAG = 'twitter:title';
const DESCRIPTION_META_TAG = 'twitter:description';

const COMPONENT_EXAMPLES = samples.getComponentExampleMap();

const HIGHLIGHTS_FOLDER_PATH = path.join(
  project.paths.DIST,
  '/static/files/search-promoted-pages/'
);

let items = null;
async function buildAutosuggestComponentResult() {
  if (!items) {
    const components = Object.keys(componentVersions).concat(
      BUILT_IN_COMPONENTS,
      IMPORTANT_INCLUDED_ELEMENTS
    );
    components.sort();
    items = {
      items: components,
    };
  }
  return items;
}

// eslint-disable-next-line new-cap
const search = express.Router();

search.get('/search/autosuggest', handleAutosuggestRequest);
search.get('/search/highlights', handleHighlightsRequest);
search.get('/search/do', handleSearchRequest);
search.get('/search/latest-query', handleNullResponse);
search.get('/search/clear-latest-query', handleNullResponse);

async function handleAutosuggestRequest(request, response) {
  setMaxAge(response, RESPONSE_MAX_AGE.autosuggest);
  response.json(await buildAutosuggestComponentResult());
}

function handleHighlightsRequest(request, response) {
  const locale = request.query.locale
    ? request.query.locale
    : config.getDefaultLocale();
  const data = require(path.join(HIGHLIGHTS_FOLDER_PATH, `${locale}.json`));

  for (const page of data.pages) {
    page.url = new URL(page.url, config.hosts.platform.base).toString();
  }

  for (const page of data.components) {
    addExampleAndPlaygroundLink(page, locale);
    cleanupTexts(page);
    page.url = new URL(page.url, config.hosts.platform.base).toString();
  }
  setMaxAge(response, RESPONSE_MAX_AGE.highlights);
  response.json({
    result: data,
    initial: true,
  });
}

function handleNullResponse(request, response) {
  setMaxAge(response, RESPONSE_MAX_AGE.autosuggest);
  response.json(null);
}

function getCseItemMetaTagValue(item, metaTag) {
  // since pagemap has always key:array the metatags dictionary is always the first element in the array
  const pagemap = item.pagemap;
  if (
    pagemap &&
    pagemap.metatags &&
    pagemap.metatags.length > 0 &&
    pagemap.metatags[0][metaTag]
  ) {
    return pagemap.metatags[0][metaTag];
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

  return page;
}

function addExampleAndPlaygroundLink(page, locale) {
  if (page.url) {
    const componentName = page.url.match(COMPONENT_REFERENCE_DOC_PATTERN)[1];
    const example = COMPONENT_EXAMPLES[componentName];
    if (example) {
      page.exampleUrl = example.exampleUrl;
      page.playgroundUrl = example.playgroundUrl;

      // the preview link must not have the locale, but the example doc page has to have it:
      if (locale != config.getDefaultLocale()) {
        page.exampleUrl =
          '/' + encodeURIComponent(locale.toLowerCase()) + page.exampleUrl;
      }

      // The playground URL is already absolute/environment specific,
      // the example URL needs to get a host
      page.exampleUrl = new URL(
        page.exampleUrl,
        config.hosts.platform.base
      ).toString();
    }
  }
}

function enrichComponentPageObject(item, page, locale) {
  const description = getCseItemMetaTagValue(item, DESCRIPTION_META_TAG);
  if (description) {
    page.description = description;
  }

  if (page.title) {
    // cut off "Documentation: " prefix...
    const prefixIndex = page.title.lastIndexOf(':');
    if (prefixIndex > 0 && prefixIndex + 1 < page.title.length) {
      page.title = page.title.substring(prefixIndex + 1).trim();
    }
  }

  addExampleAndPlaygroundLink(page, locale);
}

function createResult(
  totalResults,
  page,
  lastPage,
  components,
  pages,
  query,
  locale
) {
  const result = {
    result: {
      totalResults: totalResults,
      currentPage: page,
      pageCount: lastPage,
      components: components,
      pages: pages,
    },
    initial: false,
  };

  if (page == LAST_PAGE && lastPage > LAST_PAGE) {
    result.result.isTruncated = true;
  }

  const searchBaseUrl = new URL(
    '/search/do?q=' +
      encodeURIComponent(query) +
      '&locale=' +
      encodeURIComponent(locale) +
      '&page=',
    config.hosts.platform.base
  ).toString();

  if (page < lastPage && page < LAST_PAGE) {
    result.nextUrl = searchBaseUrl + (page + 1);
  }
  if (page > 1) {
    result.prevUrl = searchBaseUrl + (page - 1);
  }
  return result;
}

/** Will remove/rewrite characters that cause problems when displaying */
function cleanupText(text) {
  // ` is problematic. For example `i will be rendered as ì.
  // It is not clear why, but we can simply convert it.
  text = text.replace(/`/g, "'");
  // sometimes markdown links (that may contain {{g.doc}} calls) are found, so remove them
  text = text.replace(
    /\[([^\]]+)\]\([^\)]*?(?:\{\{[^}]+\}[^\)]*)?(?:\)|$)/g,
    '$1'
  );
  return text;
}

/** do some additional cleanup to ensure the text is printed nicely */
function cleanupTexts(page) {
  page.title = cleanupText(page.title);
  page.description = cleanupText(page.description);
}

async function handleSearchRequest(request, response, next) {
  const locale = request.query.locale
    ? request.query.locale
    : config.getDefaultLocale();
  const page = request.query.page ? parseInt(request.query.page) : 1;
  const query = request.query.q ? request.query.q.trim() : '';

  // The hidden query ensures we only get english results when the locale is en (default)
  // The blog and playground should be included without the page-locale metatag
  const searchOptions = {
    hiddenQuery:
      `more:pagemap:metatags-page-locale:${locale}` +
      ' OR site:blog.amp.dev OR site:playground.amp.dev',
  };

  if (locale != config.getDefaultLocale()) {
    // For other languages also include en, since the index only contains the translated pages.
    searchOptions.hiddenQuery =
      `more:pagemap:metatags-page-locale:${config.getDefaultLocale()}` +
      `OR ${searchOptions.hiddenQuery}`;
    searchOptions.noLanguageFilter = true;
  }

  if (isNaN(page) || page < 1 || query.length == 0) {
    const error =
      'Invalid search params (q=' +
      request.query.q +
      ', page=' +
      request.query.page +
      ')';
    log.error(error);
    // No error status since an empty query can always happen with our search template
    // and we do not want error messages in the client console
    response.status(200).json({error: error});
    return;
  }

  // TODO remove together with test method?
  if (!config.isProdMode() && query.includes('test')) {
    handleTestSearchRequest(request, response, next);
    return;
  }

  let highlightComponents = page == 1;

  let cseResult = undefined;
  try {
    cseResult = await googleSearch.search(query, locale, page, searchOptions);
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
    let componentCount = 0;
    for (let i = 0; i < cseResult.items.length; i++) {
      const item = cseResult.items[i];
      const page = createPageObject(item);

      if (
        highlightComponents &&
        i <= MAX_HIGHLIGHT_COMPONENT_INDEX &&
        COMPONENT_REFERENCE_DOC_PATTERN.test(page.url)
      ) {
        enrichComponentPageObject(item, page, locale);
        components.push(page);
        componentCount++;
        if (componentCount >= MAX_HIGHLIGHT_COMPONENTS) {
          highlightComponents = false;
        }
      } else {
        pages.push(page);
      }

      cleanupTexts(page);
    }
  }

  setMaxAge(response, RESPONSE_MAX_AGE.search);
  response.json(
    createResult(
      totalResults,
      page,
      pageCount,
      components,
      pages,
      query,
      locale
    )
  );
}

async function handleTestSearchRequest(request, response, next) {
  const query = request.query && request.query.q ? request.query.q : '';
  const page =
    request.query && request.query.page ? parseInt(request.query.page) : 1;
  const locale =
    request.query && request.query.locale
      ? request.query.locale
      : config.getDefaultLocale();

  const errorQuery = query.match(/(:?(\d+)-?)?error/);
  if (errorQuery) {
    const errorPage = errorQuery[1] ? parseInt(errorQuery[1]) : 3;
    if (page == errorPage) {
      next(Error('test error'));
      return;
    }
  }

  let lastPage = LAST_PAGE;
  const pageQuery = query.match(/(\d+)-pages/);
  if (pageQuery) {
    lastPage = parseInt(pageQuery[1]);
  }
  const totalResults = (lastPage - 1) * PAGE_SIZE + 3;

  const pages = [];
  const itemCount = page == lastPage ? 3 : PAGE_SIZE;
  for (let i = 1; i <= itemCount; i++) {
    pages.push({
      title: 'test ' + query + ' a ' + ((page - 1) * PAGE_SIZE + i),
      description: 'description page a ' + ((page - 1) * PAGE_SIZE + i),
      url: 'http://amp.dev',
    });
  }

  const components = [];
  if (query.startsWith('amp-') && page == 1) {
    for (let i = 1; i <= 2; i++) {
      components.push({
        title: 'component ' + query + ' ' + i,
        description: 'description component a ' + i,
        url: 'https://amp.dev',
        exampleUrl: i == 1 ? 'https://amp.dev/documentation/examples/' : null,
        playgroundUrl: i == 1 ? 'https://playground.amp.dev' : null,
      });
    }
  }

  response.json(
    createResult(totalResults, page, lastPage, components, pages, query, locale)
  );
}

module.exports = search;
