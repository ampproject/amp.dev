'use strict';

var cacheName = 'ampproject-doc-cache-v1';
var blankTemplate;

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        /* blank doc template */
        '/docs/blank/',
        /* important assets for offline support */
        '/static/img/hamburger_white.svg',
        '/static/img/logo-blue.svg',
        '/static/img/hamburger.svg'
      ]);
    })
  )
});

self.addEventListener('activate', event => {
  console.log('Activated SW');
  return self.clients.claim();
});

function createCompleteResponse (data) {
  return Promise.all([
    getTemplate(),
    data.text()
  ]).then(function (responses) {
    return new Response(responses[0] + responses[1] + '</body></html>', {
      headers: {
        'Content-Type': 'text/html'
      }
    });
  });
};

function getTemplate() {
  return new Promise(function (done, fail) {
    if (blankTemplate) {
      done(blankTemplate);
    } else {
      caches.match('/docs/blank/').then(function (response) {
        response.text().then(function (textResponse) {
          blankTemplate = textResponse.match(/([\s\S]+)<body[^>]*>/gm)[0];
          done(blankTemplate);
        });
      })
    }
  });
};

self.addEventListener('fetch', function (event) {

  var isDocument = /docs\/.+\.html$/.test(event.request.url);

  event.respondWith(
    caches.open(cacheName).then(function (cache) {

      // see if there's a cached version of the page..
      return caches.match(event.request).then(function (response) {

        var fetchPromise = fetch(event.request).then(function (networkResponse) {

          if (isDocument) {
            // clone the response so we can get its text content
            networkResponse.clone().text().then(function (body) {
              // strip out the head, remove everything but the body (don't use RegEx at home)
              var filteredBody = body.match(/<body[^>]*>([\s\S]+)<\/body>/gm);
              // create a response with just that body and put it into the cache
              var filteredResponse = new Response(filteredBody[0], { headers: { 'Content-Type': 'text/html' } });
              return cache.put(event.request, filteredResponse);
            });
          } else {
            // it's not a html doc, so just cache it for the next load
            cache.put(event.request, networkResponse.clone());
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