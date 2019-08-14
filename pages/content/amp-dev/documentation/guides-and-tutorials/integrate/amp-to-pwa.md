---
$title: Preload your PWA from your AMP pages
$order: 1
description: 'A good strategy is to make the entry point into your site an AMP page, then warm up the PWA behind the scenes and switch to ...'
formats:
  - websites
author: pbakaus
---

A good strategy is to make the **entry point into your site an AMP page**, then **warm up the PWA behind the scenes** and switch to it for the onward journey:

* All content “leaf” pages (those that have specific content, not overview pages) are published as AMPs for that nearly instant loading experience.
* These AMPs use AMP’s special element [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) to warm up a cache and the PWA shell while the user is enjoying your content.
* When the user clicks another link on your website (for example, the call to action at the bottom for a more app-like experience), the service worker intercepts the request, takes over the page and loads the PWA shell instead.

Read on to learn why, and how to use this development pattern.

## Improve the user journey by connecting to a PWA

### AMP for initial user acquisition

AMP is an ideal solution for so-called **leaf pages**, content pages that your users discover organically through a search engine, a shared link by a friend or through a link on another site. Because of AMP's [specialized pre-rendering](../../../about/how-amp-works.html), AMP pages load extremely fast, which in return means much less drop off (the latest [DoubleClick study](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) shows that **more than 53% of all users will drop off after 3 seconds**).

### PWA for rich interactivity and engagement

Progressive Web Apps, on the other hand, allow for much greater interactivity and engagement, but do not have the *instant first-load characteristics* of an AMP page. At their core is a technology called Service Worker, a client-side proxy that allows you to cache all sorts of assets for your pages, but said Service Worker only activates *after* the first load.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='The pros and cons of AMP vs. PWA.') }}

## Warm up your PWA with `amp-install-serviceworker`

AMP has the ability to install the Service Worker of your Progressive Web App from within an AMP page – yes, even if that AMP page is served from an AMP Cache! If done correctly, a link that leads to your PWA (from one of your AMP pages) will feel almost instant, similar to the first hop to the AMP page.

[tip type="tip"]
**TIP –** If you're not familiar with Service Worker yet, I greatly recommend Jake Archibald’s [Udacity course](https://www.udacity.com/course/offline-web-applications--ud899).
[/tip]

First, install the service worker on all of your AMP Pages using [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), by first including the component via its script in the `<head>` of your page:

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

Ultimately, in the service worker’s installation step, cache any resources that the PWA will need:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
[/sourcecode]

[tip type="tip"]
**TIP –** There are easier ways to deal with a Service Worker. Take a look at the [Service Worker helper libraries](https://github.com/GoogleChrome/sw-helpers).
[/tip]

## Make all links on an AMP Page navigate to the PWA

Chances are that most links on your AMP pages lead to more content pages. There are two strategies to make sure that subsequent link clicks result in an "upgrade" to the Progressive Web App, [depending on the way you use AMP](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md):

### 1. If you pair your canonical pages with AMP pages

In this case you have a canonical website (non-AMP) and generate AMP pages that are linked to these canonical pages. This is currently the most common way AMP is used, and it means that the links on your AMP pages will likely link to the canonical version of your site. **Good news: If your canonical site is your PWA, you're all set**.

### 2. If your canonical site is AMP

In this case your canonical pages *are* your AMP pages: You're building your entire website with AMP, and simply use AMP as a library (fun fact: the very site you're reading this on is built this way). **In this scenario, most links on your AMP pages will lead to other AMP pages.**

You can now deploy your PWA on a separate path like `your-domain.com/pwa` and use the Service Worker that's already running to **intercept the browser navigation when someone clicks on a link on the AMP Page**:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

What’s especially interesting about this technique is that you are now using progressive enhancement to go from AMP to PWA. However, this also means that, as is, browsers that don’t yet support service workers will jump from AMP to AMP and will never actually navigate to the PWA.

AMP solves this with something called [shell URL rewriting](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite). By adding a fallback URL pattern to the [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) tag, you are instructing AMP to rewrite all matching links on a given page to go to another legacy shell URL instead, if no service worker support has been detected:

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

With these attributes in place, all subsequent clicks on an AMP will go to your PWA, regardless of any service worker.

[tip type="read-on"]
**READ ON –** You've already come so far – why not reuse your existing AMP pages to build your PWA? [Here's how](amp-in-pwa.md).
[/tip]
