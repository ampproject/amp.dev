'use strict';

const cacheName = 'ampproject-doc-cache-v1';
const templateURL = '/docs/blank/';
const extraURL = '/stuff.html';
var templateCache = {};

self.addEventListener('install', event => {

  // immediately take over from old version of Service Worker
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        /* blank doc template */
        templateURL,
        extraURL,
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

function createCompleteResponse (data) {
  return Promise.all([
    getTemplate(templateURL),
    getTemplate(extraURL),
    data.text()
  ]).then(html => {
    return new Response(html[0] /*+ html[1]*/ + html[2] + '</html>', {
      headers: {
        'Content-Type': 'text/html'
      }
    });
  });
}

function getTemplate(url) {
  return new Promise(done => {
    if (templateCache[url]) {
      done(templateCache[url]);
    } else {
      caches.match(url).then(response => {
        response.text().then(textResponse => {
          templateCache[url] = textResponse;
          done(templateCache[url]);
        });
      });
    }
  });
}

self.addEventListener('fetch', event => {

  var isDocument = /docs\/.+\.html$/.test(event.request.url);

  event.respondWith(
    caches.open(cacheName).then(cache => {

      // see if there's a cached version of the page..
      return caches.match(event.request).then(response => {

        let fetchPromise = fetch(event.request).then(networkResponse => {

          // duplicating the response allows us to read its contents twice
          // (1. to put it in the cache, 2. to serve it)
          let clonedNetworkResponse = networkResponse.clone();

          if (isDocument) {
            // clone the response so we can get its text content
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
          return isDocument ? createCompleteResponse(networkResponse) : networkResponse;

        });

        // return directly if we have data in the cache already, otherwise fetch from network
        return response ? (isDocument ? createCompleteResponse(response) : response) : fetchPromise;

      });

    })
  );

});




/*self.addEventListener('fetch', event => {

  console.log(event.request.url, event.request.mode);

  if (event.request.url.indexOf('/docs') != -1) {
    // Override response with the shell unless the leaf document is explicitly
    // requested.
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa.html'));
      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }
  }
});*/

/*
// Cache a very basic selection of resources
self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        '/iframe-shell/',
        '/iframe-shell/index.html',
        '/iframe-shell/offline.html',
        '/iframe-shell/splash.html',
        '/iframe-shell/amp/01.amp.html?embed=1',
        '/iframe-shell/amp/02.amp.html?embed=1',
        '/iframe-shell/img/shell.jpg',
        '/iframe-shell/img/shell02.jpg',
        '/iframe-shell/img/icons/android-icon-96x96.png',
      ]);
    })
  )
});

// Clean out old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(existingCacheNames) {
      return Promise.all(
        existingCacheNames.map(function(existingCacheName) {
          if (existingCacheName !== cacheName) {
            return caches.delete(existingCacheName);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {

  var urlComponents = event.request.url.split('?');
  // If the path ends with ".amp.html" it should be one of our AMP pages
  var isAmpPage = urlComponents[0].endsWith('.amp.html');
  // And if it has not been requested as an embed with the GET parameter
  var isNotEmbedded = (urlComponents[1] !== 'embed=1');

  if (isAmpPage && isNotEmbedded) {
    event.respondWith(
      caches.match(new Request('/iframe-shell/index.html')).then(function(response) {
        // Then we need to serve the shell instead
        return response || fetch('/iframe-shell/index.html');
      })
    );
  } else {
    // Otherwise, we have some very simple functionality to check the cache
    // and serve an offline page when not connected.
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      }).catch(function() {
        return caches.match('/iframe-shell/offline.html');
      })
    );
  }

});

*/