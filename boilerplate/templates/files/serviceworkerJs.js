importScripts('https://cdn.ampproject.org/sw/amp-sw.js');

AMP_SW.init({
  \{{#serviceworker.assetCaching}}
  assetCachingOptions: [{
    regexp: /\.(png|jpg|woff2|woff|css|js)/,
    cachingStrategy: 'CACHE_FIRST',
  }],
  \{{/serviceworker.assetCaching}}
  \{{#serviceworker.offlinePage}}
  offlinePageOptions: {
    url: '/offline.html',
    assets: [],
  },
  \{{/serviceworker.offlinePage}}
});
