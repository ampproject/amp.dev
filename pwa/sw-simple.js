'use strict';

const cacheName = 'ampproject-doc-cache-v1';

self.addEventListener('install', event => {

  // immediately take over from old version of Service Worker
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        /* important assets for offline support */
        '/static/img/hamburger_white.svg',
        '/static/img/logo-blue.svg',
        '/static/img/hamburger.svg'
      ]);
    })
  );

});

self.addEventListener('activate', () => {
  // immediately claim the currently connected clients
  return self.clients.claim();
});

self.addEventListener('fetch', event => {

  event.respondWith(
    caches.open(cacheName).then(cache => {

      // see if there's a cached version of the page..
      return caches.match(event.request).then(response => {

        let fetchPromise = fetch(event.request).then(networkResponse => {

          // it's not a html doc, so just cache it for the next load
          cache.put(event.request, networkResponse.clone());

          // return network response if nothing in cache yet
          return networkResponse;

        });

        // return directly if we have data in the cache already, otherwise fetch from network
        return response || fetchPromise;

      });

    })
  );

});
