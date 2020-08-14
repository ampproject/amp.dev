---
$title: Easy offline access and improved performance
$order: 11
description: 'A Service Worker is a client-side proxy that sits between your page and your server, and is used to build fantastic offline experiences, fast-loading ...'
formats:
  - websites
author: CrystalOnScript
contributors:
  - pbakaus
---

[Service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) enable rich offline experiences and consistent user experiences across varying network strengths. By caching resources within the browser, a web app is able to provide data, assets, and offline pages to the user to keep them engaged and informed.

Remember: The Service Worker won't be able to interact with the AMP-cached version of your page. Use it for onward journeys to your origin.

## Install a Service Worker

A Service Worker is a client-side proxy that sits between your page and your server, and is used to build fantastic offline experiences, fast-loading app shell scenarios, and send push notifications.

[tip type="note"]
**NOTE –** If the concept of Service Workers is new to you, read the [introduction at WebFundamentals](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers).
[/tip]

Your Service Worker needs to be registered on a given page, or the browser won't find or run it. By default, this is done with the help of a [little bit of JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration). On AMP Pages, you use the [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) component to achieve the same.

For that, first include the [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) component via its script in the `<head>` of your page:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Then add the following somewhere within your `<body>` (modify to point to your actual Service Worker):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

If the user navigates to your AMP pages on your origin (as opposed to the first click, which is usually served from an AMP Cache), the Service Worker will take over and can do a [myriad of cool things](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux).

##The AMP Service Worker

If you're here, you're building pages with AMP. The AMP team cares immensely about putting the user first and giving them a world class web experience. To keep these experiences consistent the AMP team has created a service worker specifically for AMP!

[tip type="default"]
**TIP –** Follow our tutorial to learn to use the [AMP Service Worker in your PWA](/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/amp_to_pwa.md).
[/tip]

### Installing the AMP Service Worker

Install the AMP Service Worker with minimal steps:

- Import the AMP Service Worker code into your service worker file.
  [sourcecode:js]
  importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
  [/sourcecode]

- Install the service worker with the following code.
  [sourcecode:js]
  AMP_SW.init();
  [/sourcecode]

- Done.

### Automated Caching

The AMP Service Worker automatically caches AMP script files and AMP documents. By caching AMP script files, they are instantly available to the users browser allowing for offline functionality and speedier pages on flaky networks.

If your app requires specific types of document caching, the AMP Service Worker allows for customization. Such as adding a deny list for documents that should always be requested from the network. In the following example, replace `Array<RegExp>` with an array of regular expressions representing documents you want to avoid caching.

[sourcecode:js]
AMP_SW.init(
documentCachingOptions: {
denyList?: Array<RegExp>;
}
);
[/sourcecode]

Read more about [customizing document caching here](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching).

### Optimizing the AMP Service Worker

To use the AMP Service Worker to its full capabilities, the optional fields should be configured to cache necessary assets and prefetch links.

Assets that drive the user's visit to a page, such as a video, important images, or a downloadable PDF, should be cached so that they can be accessed again if the user is offline.

[sourcecode:js]
AMP_SW.init(
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
);
[/sourcecode]

You are able to customize the caching strategy and define a deny list.

Links to pages your users may need to visit can be prefetched, allowing them to be accessed while offline. This is done by adding a `data-prefetch` attribute to the link tag.

[sourcecode:html]
<a href='....' data-rel='prefetch' />
[/sourcecode]

### Offline Experience

Communicate to user's that they have gone offline, and should try reloading the site when back online, by including an offline page. The AMP Service Worker can cache both the page and its assets.

[sourcecode:js]
AMP_SW.init({
offlinePageOptions: {
url: '/offline.html';
assets: ['/images/offline-header.jpg'];
}
})
[/sourcecode]

A successful offline page looks like it's a part of your site by having a consistent UI with the rest of the application.

### Force Update

The team is working to implement a force update/remove feature if your AMP Service Worker needs to be disabled or changed if a deployment to users has gone wrong.

To effectively manage a server worker, you should understand how [standard HTTP caching affects the way your service worker's JavaScript is kept up to date](https://developers.google.com/web/updates/2018/06/fresher-sw). Service workers served with appropriate HTTP caching directives can resolve small bug fixes by making the appropriate changes and redeploying your service worker to your hosting environment. If you need to remove a service worker, it's a good idea to keep a simple, [no-op](https://en.wikipedia.org/wiki/NOP) service worker file handy, like the following:

```js
self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});
```

[tip type="read-on"]
[Read more](https://stackoverflow.com/questions/33986976/how-can-i-remove-a-buggy-service-worker-or-implement-a-kill-switch/38980776#38980776) about managing deployed service workers.
[/tip]

## Write a Custom Service Worker

You can use the above technique to enable offline access to your AMP website, as well as extend your pages **as soon as they’re served from the origin**. That's because you can modify the response via the Service Worker’s `fetch` event, and return any response you want:

[sourcecode:js]
self.addEventListener('fetch', function(event) {
event.respondWith(
caches.open('mysite').then(function(cache) {
return cache.match(event.request).then(function(response) {
var fetchPromise = fetch(event.request).then(function(networkResponse) {
cache.put(event.request, networkResponse.clone());
return networkResponse;
})

        // Modify the response here before it goes out..
        ...

        return response || fetchPromise;
      })
    })

);
});
[/sourcecode]

Using this technique, you can amend your AMP Page will all sorts of additional
functionality that would otherwise fail [AMP validation](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), for example:

- Dynamic features that require custom JS.
- Components that are customized/only relevant for your site.
