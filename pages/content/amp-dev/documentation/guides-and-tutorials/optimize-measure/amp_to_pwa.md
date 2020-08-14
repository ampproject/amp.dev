---
$title: Turn your AMP site into a PWA
$order: 10
description: 'By caching resources within the browser, a PWA is able to provide data, assets, and offline pages to the user to keep them engaged and informed.'
tutorial: true
formats:
  - websites
author: crystalonscript
---

Progressive Web Apps harness the power of [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) to enable rich offline abilities and consistent user experiences across varying network strengths.
By caching resources within the browser, a PWA is able to provide data, assets, and offline pages to the user to keep them engaged and informed.

This tutorial will teach you how to turn an AMP site into an installable PWA with offline capabilities by adding a Web Manifest and a Service Worker powered by the AMP Service Worker.

# Download and run the starter code

Download the [starter code here](/static/files/tutorials/amptopwa.zip).

Use a local web server to preview the website.

[tip type="default"]
**TIP –** For a quick web server, run `python -m SimpleHTTPServer`.
[/tip]

You should be able to view the landing page for Lyrical Lightning, the Mobile Music Magic festival.
It has one link on the homepage to view the schedule and which stage the bands are on.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

Users of our site may have spotty network connectivity at the event when they'll likely want to access the schedule.
This makes a great candidate to turn it into a PWA that can be installed to our user's home screen, and provides all critical functionality even when offline.

# Create a Web App Manifest

The [web app manifest ](https://developers.google.com/web/fundamentals/web-app-manifest/)is a simple JSON file that tells the browser about your web application
and how it should behave when 'installed' on the user's mobile device or desktop. Having a manifest is required by many browsers to show the
[Add to Home Screen prompt](https://developers.google.com/web/fundamentals/app-install-banners/).

Add a file titled `manifest.json` to your repository with the following code:

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# Add the AMP Service Worker

A service worker is a script that your browser runs in the background,
separate from a web page, that extends the browsers features by caching requests to improve performance and providing offline functionality.
Building a service worker from scratch is possible but time consuming.
Libraries like Workbox help, but AMP goes one step further by offering the [AMP Service Worker](https://github.com/ampproject/amp-sw),
in which AMP automates a lot of steps directly, including the caching of AMP Scripts, assets and documents
as well as implementing common best practices such as [navigation preload](https://developers.google.com/web/updates/2017/02/navigation-preload).

The AMP Service Worker automatically [caches AMP scripts](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching)
and [documents](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) as user requests them, after installing it.
We'll start by adding the basic AMP Service Worker.

## Create the service worker file

Create a file called `sw.js` and add the following code:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

With just two lines of code, this imports the AMP Service Worker into your Service Worker and initializes it.

## Auto-install your service worker on your AMP pages

AMP websites use the [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md)
component to install the service worker in the browser's background, while the user is enjoying your content.

Place the required script tag in the head of `index.html` and the `<amp-install-serviceworker>` element inside the `<body>`:

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"]
**Important –** The service worker should be served from the root directory (`/sw.js`) to be able to cache all the content of your site.
[/tip]

The `<amp-install-serviceworker>` installs the service worker by creating an iframe and running the `data-iframe-src` file.
Create the `install-sw.html` file and add the following code:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

The iframe registers the AMP Service Worker file into the browser.

# Customize what is cached

The AMP Service Worker comes with built-in benefits while allowing optional fields that you can configure to optimize against your app's needs.

Our music festival app will cache our image assets, prefetch the line up link, and specify an offline page.

## Cache Assets

You can configure the AMP Service Worker to [cache assets](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching),
such as images, videos and fonts. We'll use it to cache our background image and the AMP logo. Open the `sw.js` file and update it to the code below:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

We've specified the caching strategy to be [cache first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network).
The means the app will try to serve images from cache first before requesting anything from the network. This is especially useful for this app since we won't be updating our background image or the AMP logo.

## Prefetch Links

The AMP Service Worker prefetches links that have the `data-rel=prefetch` attribute.
This enables users to view pages offline even if they haven't visited them yet. We'll add the attribute to our link tag for `lineup.html`.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# Show an offline page

To deal with unexpected cases or clicks on links to pages that we didn't prefetch,
we'll add an offline page to offer a consistent user experience that is "on brand",
as opposed to showing the generic browser offline page.
Download [`offline.html` here](/static/files/tutorials/offline.zip) and update `sw.js` to the following code:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# Test your PWA

You can test that your AMP Service Worker is caching necessary assets and providing an ideal offline solution through [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps).

We'll test Lyrical Lyghtning by opening the DevTools panel by hitting `Ctrl + Shift + I` on Windows or `Cmd + Opt + I` on Mac. You can also right click the page and select `inspect` from the menu. Then select `Application` to view your service worker registration.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

Click the `offline` box to switch into offline mode. Click the `see full lineup` link and navigate to `offline.html` to check if they were properly cached and prefetched.

[tip type="default"]
**Tip –** For a thorough analysis of a Progressive Web App's features, run [Google's Lighhouse tool](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool) to generate a report.
[/tip]

# Congratulations!

You have successfully created an PWA with AMP! In this tutorial you learned to:

- Create a [Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/)
- Install a Service Worker in AMP using [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)
- Customize the [AMP Service Worker ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)
- [Prefetch links ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- Create an offline page

Read more about [Service Worker](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)s and [offline UX considerations](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux). Learn to t[rack engagement with analytics ](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html)and follow the tutorial on [how to configure basic analytics for your AMP pages](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html).
