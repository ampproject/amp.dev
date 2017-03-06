'use strict';
const cacheName = 'ampproject-doc-cache-v2';

// global stuff we can cache away and lazily revalidate
importScripts('/sw-toolbox.js');
toolbox.router.get(/^https:\/\/fonts\.googleapis\.com\//, toolbox.fastest);
toolbox.router.get(/^https:\/\/cdn\.ampproject\.org\//, toolbox.fastest);
toolbox.router.get(/^https:\/\/www\.gstatic\.com\//, toolbox.fastest);
toolbox.router.get(/static\/img\//, toolbox.fastest);

function cacheFirst(url) {
  return caches.open(cacheName).then(cache => {

    // see if there's a cached version of the page..
    return caches.match(url).then(response => {

      let fetchPromise = fetch(url).then(networkResponse => {

        // duplicating the response allows us to read its contents twice
        // (1. to put it in the cache, 2. to serve it)
        let clonedNetworkResponse = networkResponse.clone();

        cache.put(url, clonedNetworkResponse);

        // return network response if nothing in cache yet
        return networkResponse;

      });

      // return directly if we have data in the cache already, otherwise fetch from network
      return response ? response : fetchPromise;

    });

  });
}

// don't wait for the other Service Worker to terminate
self.addEventListener('install', () => {
  self.skipWaiting();
});

// immediately claim the currently connected clients
self.addEventListener('activate', () => {
  self.clients.claim();
});

self.addEventListener('fetch', event => {

  if (event.request.url.indexOf('/amp-conf-2017') != -1) {
    // Override response with the conf shell
    if (event.request.mode === 'navigate') {
      event.respondWith(cacheFirst('/amp-conf-2017-pwa'));
    }
  }

});


