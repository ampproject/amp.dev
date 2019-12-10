importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
  assetCachingOptions: [{
    regexp: /\.(png|jpg|woff2|woff|css|js)/,
    cachingStrategy: 'CACHE_FIRST',
  }],
  offlinePageOptions: {
    url: '/offline.html',
    assets: [],
  },
});

const CACHE_NAME = 'AMP-DEV-SEARCH-CACHE';
const LATEST_QUERY_URL = '/search/latest-query';


// Match search request url
const matchDo = ({url}) => {
  return (url.pathname === '/search/do');
};

// Handle search request
const handlerDo = async ({url, event}) => {
  // Extract query parameter from search request url
  // Put new query as response to AMP-DEV-SEARCH-CACHE
  const searchQuery = url.search.match(/q=([^&]+)/)[1];
  const cache = await caches.open(CACHE_NAME);

  cache.put(LATEST_QUERY_URL, new Response(`"${searchQuery}"`));

  let response = await cache.match(event.request);

  // If search results are already in cache, skip
  // Else fetch new search request and cache whole results
  if (response) {
    return response;
  } else {
    response = await fetch(event.request);

    if (response.status == 200) {
      cache.put(event.request, response.clone());
    }

    return response;
  }
};

// Register new route to handle search request
workbox.routing.registerRoute(matchDo, handlerDo);


// Match latest query url
const matchCq = ({url}) => {
  return (url.pathname === LATEST_QUERY_URL);
};

// Handle latest query
const handlerCq = async () => {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(LATEST_QUERY_URL);

    // Update latest query
    if (response) {
      return response;
    } else {
      return new Response('null');
    }
  } catch (err) {
    return new Response('null');
  }
};

// Register new route to handle latest query
workbox.routing.registerRoute(matchCq, handlerCq);
