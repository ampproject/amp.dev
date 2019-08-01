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

const COMPONENT_REFERENCE_DOC_PATTERN =
    /^(?:https?:\/\/[^/]+)?(?:\/[^/]+)?\/documentation\/components\/(amp-[^/]+)/;

const EXAMPLE_URL_PATH = '/documentation/examples/components/';
const EXAMPLE_FILE_PATH = path.join(project.paths.DIST, '/examples/sources/components/');

const REMOVE_HOST_PATTERN = /^https?:\/\/amp\.dev(?=\/)/;

const PREVIEW_HOST = config.hosts.preview.base;
const PLAYGROUND_URL = config.hosts.playground.base;

// use the twitter title if available since it does not contain the site name
const TITLE_META_TAG = 'twitter:title';
const DESCRIPTION_META_TAG = 'twitter:description';


// eslint-disable-next-line new-cap
const examples = express.Router();
const MAX_RESULT_SIZE = 400;
const US_CAPITAL_CITIES = [
  // build im
  'amp-layout',
  'amp-img',
  'amp-pixel',
  // FALSE_POSITIVES
  'amp-state',
  'amp-story-page',
  'amp-story-grid-layer',
  'amp-story-bookend',
  // components from amp-component-versions
  'amp-3d-gltf',
  'amp-3q-player',
  'amp-a4a',
  'amp-access',
  'amp-access-laterpay',
  'amp-access-poool',
  'amp-access-scroll',
  'amp-accordion',
  'amp-action-macro',
  'amp-ad',
  'amp-ad-custom',
  'amp-ad-exit',
  'amp-addthis',
  'amp-analytics',
  'amp-anim',
  'amp-animation',
  'amp-apester-media',
  'amp-app-banner',
  'amp-audio',
  'amp-auto-ads',
  'amp-auto-lightbox',
  'amp-autocomplete',
  'amp-base-carousel',
  'amp-beopinion',
  'amp-bind',
  'amp-bodymovin-animation',
  'amp-brid-player',
  'amp-brightcove',
  'amp-byside-content',
  'amp-call-tracking',
  'amp-carousel',
  'amp-connatix-player',
  'amp-consent',
  'amp-crypto-polyfill',
  'amp-dailymotion',
  'amp-date-countdown',
  'amp-date-display',
  'amp-date-picker',
  'amp-delight-player',
  'amp-dynamic-css-classes',
  'amp-embedly-card',
  'amp-experiment',
  'amp-facebook',
  'amp-facebook-comments',
  'amp-facebook-like',
  'amp-facebook-page',
  'amp-fit-text',
  'amp-font',
  'amp-form',
  'amp-fx-collection',
  'amp-fx-flying-carpet',
  'amp-geo',
  'amp-gfycat',
  'amp-gist',
  'amp-google-document-embed',
  'amp-google-vrview-image',
  'amp-gwd-animation',
  'amp-hulu',
  'amp-iframe',
  'amp-ima-video',
  'amp-image-lightbox',
  'amp-image-slider',
  'amp-image-viewer',
  'amp-imgur',
  'amp-inputmask',
  'amp-instagram',
  'amp-install-serviceworker',
  'amp-izlesene',
  'amp-jwplayer',
  'amp-kaltura-player',
  'amp-lightbox',
  'amp-lightbox-gallery',
  'amp-link-rewriter',
  'amp-list',
  'amp-live-list',
  'amp-mathml',
  'amp-mowplayer',
  'amp-mraid',
  'amp-mustache',
  'amp-next-page',
  'amp-nexxtv-player',
  'amp-o2-player',
  'amp-ooyala-player',
  'amp-orientation-observer',
  'amp-pan-zoom',
  'amp-payment-google-button',
  'amp-payment-google-inline',
  'amp-payment-google-inline-async',
  'amp-pinterest',
  'amp-playbuzz',
  'amp-position-observer',
  'amp-powr-player',
  'amp-reach-player',
  'amp-recaptcha-input',
  'amp-reddit',
  'amp-riddle-quiz',
  'amp-script',
  'amp-selector',
  'amp-share-tracking',
  'amp-sidebar',
  'amp-skimlinks',
  'amp-slides',
  'amp-smartlinks',
  'amp-social-share',
  'amp-soundcloud',
  'amp-springboard-player',
  'amp-sticky-ad',
  'amp-story',
  'amp-story-auto-ads',
  'amp-subscriptions',
  'amp-subscriptions-google',
  'amp-timeago',
  'amp-truncate-text',
  'amp-twitter',
  'amp-user-location',
  'amp-user-notification',
  'amp-video',
  'amp-video-docking',
  'amp-video-iframe',
  'amp-viewer-assistance',
  'amp-viewer-integration',
  'amp-vimeo',
  'amp-vine',
  'amp-viqeo-player',
  'amp-viz-vega',
  'amp-vk',
  'amp-web-push',
  'amp-wistia-player',
  'amp-yotpo',
  'amp-youtube',
];

examples.get('/search/autosuggest', handleAutosuggestRequest);
examples.get('/search/do', handleSearchRequest);

function handleAutosuggestRequest(request, response) {
  const query = request.query ? request.query.q : '';

  let results = US_CAPITAL_CITIES;

  if (query) {
    results = results.filter((key) => {
      return key.toUpperCase().includes(query.toUpperCase());
    });
  }

  if (results.length > MAX_RESULT_SIZE) {
    results = results.slice(0, MAX_RESULT_SIZE);
  }

  const items = ({
    items: results,
  });

  response.json(items);
};

function createPageObject(csePageItem) {
  let title = csePageItem.title;
  if (csePageItem.pagemap && csePageItem.pagemap.metatags
      && csePageItem.pagemap.metatags[TITLE_META_TAG]) {
    title = csePageItem.pagemap.metatags[TITLE_META_TAG];
  }

  const page = {
    title: title,
    description: csePageItem.snippet,
    url: csePageItem.link,
  }

  const hostMatch = page.url.match(REMOVE_HOST_PATTERN);
  if (hostMatch) {
    page.url = page.url.substring(hostMatch[0].length);
  }

  return page;
}

function hasExample(component) {
  const filePath = path.join(EXAMPLE_FILE_PATH, component + '.html');
  return fs.existsSync(filePath);
}

function enrichComponentPageObject(item, page) {
  if (item.pagemap && item.pagemap.metatags && item.pagemap.metatags[DESCRIPTION_META_TAG]) {
    page.description = item.pagemap.metatags[DESCRIPTION_META_TAG];
  }

  if (page.url) {
    const componentName = page.url.match(COMPONENT_REFERENCE_DOC_PATTERN)[1];
    if (hasExample(componentName)) {
      page.exampleUrl = EXAMPLE_URL_PATH + componentName + '/';
      page.playgroundUrl = PLAYGROUND_URL + '/?url='
        + encodeURIComponent(PREVIEW_HOST + page.exampleUrl);
    }
  }
}

async function handleSearchRequest(request, response) {
  const query = request.query && request.query.q ? request.query.q : '';
  const page = request.query && request.query.page ? parseInt(request.query.page) : 1;
  const locale = request.query && request.query.locale.toLowerCase() ? request.query.locale : 'en';

  // TODO remove together with test method
  if (query.includes('test')) {
    return handleTestSearchRequest(request, response);
  }

  const highlightComponents = page == 1;

  const cseResult = await googleSearch(query, locale, page);

  const totalResults = parseInt(cseResult.searchInformation.totalResults);
  const pageCount = Math.ceil(totalResults / PAGE_SIZE);
  const pages = [];
  const components = [];

  for (const item of cseResult.items) {
    const page = createPageObject(item);

    if (highlightComponents && COMPONENT_REFERENCE_DOC_PATTERN.test(page.url)) {
      enrichComponentPageObject(item, page);
      components.push(page);
    } else {
      pages.push(page);
    }
  }

  const result = ({
    result: {
      currentPage: page,
      pageCount: pageCount,
      components: components,
      pages: pages,
    },
  });

  if (page < pageCount) {
    result.nextUrl = '/search/do?q=' + query + '&locale=' + locale + '&page=' + (page + 1);
  }
  response.json(result);
}


function handleTestSearchRequest(request, response) {
  const query = request.query && request.query.q ? request.query.q : '';
  const page = request.query && request.query.page ? parseInt(request.query.page) : 1;
  const language = request.query && request.query.lang ? request.query.lang : 'en';

  if (query.includes('error') && page > 1) {
    throw Error('test error');
  }

  const pages = [];
  const itemCount = page == 10 ? 3 : 10;
  for (let i=1; i <= itemCount; i++) {
    pages.push({
      title: 'test ' + query + ' a ' + ((page-1) * 10 + i),
      description: 'description page a ' + ((page-1) * 10 + i),
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
      currentPage: page,
      pageCount: 10,
      language: language,
      components: components,
      pages: pages,
    },
  });

  if (page < 10) {
    result.nextUrl = '/search/do?q=' + query + '&page=' + (page + 1) + '&lang=' + language;
  }

  response.json(result);
};

module.exports = examples;
