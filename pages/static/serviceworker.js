importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
  assetCachingOptions: [
    {
      regexp: /\.(png|jpg|woff2|woff|css|js)/,
      cachingStrategy: 'CACHE_FIRST',
    },
  ],
  offlinePageOptions: {
    url: '/offline.html',
    assets: [],
  },
});

const SEARCH_CACHE_NAME = 'AMP-DEV-SEARCH-CACHE';
const SEARCH_LATEST_QUERY_PATH = '/search/latest-query';

// Handle search request
async function searchDoRequestHandler(url, request) {
  // Extract query parameter from search request url
  // Put new query as response to AMP-DEV-SEARCH-CACHE
  const searchQuery = decodeURIComponent(url.search.match(/q=([^&]+)/)[1]);
  const cache = await caches.open(SEARCH_CACHE_NAME);

  cache.put(SEARCH_LATEST_QUERY_PATH, new Response(`"${searchQuery}"`));

  let response = await cache.match(request);

  // Return response, if search results are already in cache
  if (response) {
    return response;
  }

  // Fetch new search request, if not
  response = await fetch(request);

  // Cache whole results if status code is OK
  if (response.status == 200) {
    cache.delete(request, {
      ignoreSearch: true,
    });
    cache.put(request, response.clone());
  }

  return response;
}

// Register new route to handle search request
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname === '/search/do') {
    event.respondWith(searchDoRequestHandler(requestUrl, event.request));
  }
});

// Handle latest query
async function searchLatestQueryHandler() {
  try {
    const cache = await caches.open(SEARCH_CACHE_NAME);
    const response = await cache.match(SEARCH_LATEST_QUERY_PATH);

    // Update latest query
    if (response) {
      return response;
    }
  } catch (err) {
    console.error(err);
  }
  return new Response('null');
}

// Register new route to handle latest query
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname === SEARCH_LATEST_QUERY_PATH) {
    event.respondWith(searchLatestQueryHandler());
  }
});

// Handle clear request
async function searchClearLatestQueryRequestHandler() {
  try {
    const cache = await caches.open(SEARCH_CACHE_NAME);
    cache.delete(SEARCH_LATEST_QUERY_PATH);
  } catch (err) {
    console.error(err);
  }
  return new Response('null');
}

// Register new route to handle clear request
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname === '/search/clear-latest-query') {
    event.respondWith(searchClearLatestQueryRequestHandler());
  }
});
