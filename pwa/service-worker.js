'use strict';

importScripts('/sw-lib/sw-lib.min.js');
importScripts('/service-worker-manifest.js');

// Static precaching of images
goog.swlib.cacheRevisionedAssets(self.__asset_manifest);

// Runtime caching
const staleWhileRevalidate = goog.swlib.staleWhileRevalidate();
goog.swlib.router.registerRoute(/https:\/\/fonts\.googleapis\.com\/.*/, staleWhileRevalidate);
goog.swlib.router.registerRoute(/https:\/\/cdn\.ampproject\.org\/.*/, staleWhileRevalidate);

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  // immediately claim the currently connected clients
  self.clients.claim();
});
