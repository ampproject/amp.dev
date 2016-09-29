'use strict';

const cacheName = 'ampproject-doc-cache-v1';
const templateURL = '/docs/blank/';
var templateCache = {};

self.addEventListener('install', event => {

  // immediately take over from old version of Service Worker
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        /* blank doc template */
        templateURL,
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
  self.clients.claim();
});

function createCompleteResponse (data) {
  return Promise.all([
    getTemplate(templateURL),
    data.text()
  ]).then(html => {
    return new Response(html[0] + html[1] + '</html>', {
      headers: {
        'Content-Type': 'text/html'
      }
    });
  });
}

function getTemplate(url) {

  // every time a static template is requested, we want to update it
  // in the background lazily for next time.
  caches.open(cacheName).then(cache => {
    cache.add(url);
  });

  return templateCache[url] ?
    Promise.resolve(templateCache[url])
    : caches.match(url)
      .then(response => response.text())
      .then(textResponse => {
        templateCache[url] = textResponse;
        return templateCache[url];
      });
}

self.addEventListener('fetch', event => {

  var isDocument = /docs\/.+\.html$/.test(event.request.url);

  // can't do anything if the request is a POST request (Google Analytics)
  // AND PLEASE DON'T SERVICE WORK THE SERVICE WORKER
  if (event.request.method === 'POST' || event.request.url.indexOf('serviceworker.js') > -1) {
    return;
  }

  event.respondWith(
    caches.open(cacheName).then(cache => {

      // see if there's a cached version of the page..
      return caches.match(event.request).then(response => {

        let fetchPromise = fetch(event.request).then(networkResponse => {

          // duplicating the response allows us to read its contents twice
          // (1. to put it in the cache, 2. to serve it)
          let clonedNetworkResponse = networkResponse.clone();

          if (isDocument) {
            // get its text content
            clonedNetworkResponse.text().then(body => {

              // strip out the head, remove everything but the body
              // (don't do this at home)
              let filteredBody = body.match(/<body[^>]*>([\s\S]+)<\/body>/gm);

              // create a response with just that body
              let filteredResponse = new Response(filteredBody[0], {
                headers: {
                  'Content-Type': 'text/html'
                }
              });

              // put the newly trimmed doc into the cache for later retrieval
              return cache.put(event.request, filteredResponse);
            });
          } else {
            // it's not a html doc, so just cache it for the next load
            cache.put(event.request, clonedNetworkResponse);
          }

          // return network response if nothing in cache yet
          return networkResponse;

        });

        // return directly if we have data in the cache already, otherwise fetch from network
        return response ? (isDocument ? createCompleteResponse(response) : response) : fetchPromise;

      });

    })
  );

});
