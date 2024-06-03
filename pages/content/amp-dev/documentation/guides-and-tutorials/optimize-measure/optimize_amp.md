---
$title: Optimize your hosted AMP pages
$order: 7
description: 'The AMP runtime is optimized for speed and if your AMP pages are served by an AMP cache, they are fully optimized and offer the highest loading performance ...'

formats:
  - websites
  - stories
author: sebastianbenz
---

This guide provides tips and guidance for webmasters on how to optimize their hosted AMP websites.

### Isn't AMP fast by default?

The AMP runtime is [optimized for speed](../../../about/how-amp-works.html) and if your AMP pages are served by an [AMP cache](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md), they are fully optimized and offer the highest loading performance. For example, if your users are coming to your AMP pages from Google Search on mobile, by default the pages are served by an AMP cache.

However, AMP pages are not always served from an AMP cache. A website may decide to show AMP pages from their own servers for other traffic sources. The most frequent use case are sites built completely in AMP, such as [axios.com](https://axios.com), where users go straight to the site. Another traffic source is Twitter, which [started linking to AMP pages](https://searchengineland.com/twitter-ramps-amp-278300) instead of delivering the standard mobile version. This means that if a user clicks a link in one of Twitter's mobile apps, the link goes to the AMP version of your page on your own origin (if one is available).

As a consequence, you can't always be sure that your AMP pages are only served from an AMP cache. For these cases, where you are serving AMP pages from your own servers, it is important to make sure that your AMP pages offer the optimal loading performance.

AMP pages load fast by default, but there are some additional performance optimizations you can implement to help the browser load AMP pages even faster. This guide describes a few optimizations you should consider when publishing AMP pages. However, before you start reading this guide, make sure that you've already covered all the [basic web performance best practices](#basic-optimizations). In particular, image optimization has a big impact on loading performance.

For example, by applying the following optimization techniques:

- [Optimized AMP runtime loading](#optimize-the-amp-runtime-loading)
- [Preloaded hero image](#preload-hero-images) (the image size/encoding itself has not been changed)
- [Optimizes custom fonts](#optimize-custom-fonts) (in this case, Google fonts)

the ["The Scenic" template](../../../documentation/templates/index.html) loads [two seconds faster on a 3G connection](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0).

If you want to skip the details, use the [AMP Page Experience Guide](/content/amp-dev/page-experience.html) to check your AMP pages for possible performance optimizations.

### Use an AMP Optimizer <a name="optimize-the-amp-runtime-loading"></a>

Server-side-rendering AMP Layouts is a technique that AMP caches use to even further speed up loading time. With server-side-rendering it's possible to remove the AMP boilerplate so that the AMP document can be painted without running the AMP runtime JavaScript. For example, the server-side rendered version of the AMP Boilerplate Generator [renders twice as fast](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual) as the normal AMP version!

If you're publishing an AMP page, you should use an [AMP Optimizer](amp-optimizer-guide/index.md). AMP Optimizers let you serve optimized AMP pages from your own backend which includes server-side rendering AMP layouts. AMP Optimizer also automatically performs many other optimizations described in this document.

### Preload hero images <a name="preload-hero-images"></a>

[AMP HTML uses its own image element: `amp-img`](../../../documentation/components/reference/amp-img.md). While [`amp-img`](../../../documentation/components/reference/amp-img.md) has many advantages over the traditional HTML `img` tag, one disadvantage is that the AMP runtime must be loaded before the image download can start. For some images, such as hero images for a product page, it's critical that the images load as quickly as possible. In these cases, annotate images using the attribute `data-hero`:

[sourcecode:html]
<amp-img src="hero.jpg" data-hero ...>
[/sourcecode]

This allows AMP Caches and AMP Optimizers to server-side render the `img` resulting in much faster load times. Another best practice is to preload the image to ensure that the browser starts downloading the image as soon as possible.

[sourcecode:html]

<head>
  <link rel="preload" href="/images/elephants.png" as="image">
</head>
<body>
  ...
  <amp-img width="404" height="720" layout="responsive"
           src="/images/elephants.png" alt="..." >
  </amp-img>
</body>
[/sourcecode]

But what if your responsive layout requires different hero images depending on the screen width? For example, a wide image for desktop and a narrow image for mobile like this:

[sourcecode:html]
<amp-img width="404" height="720"
    alt="..." layout="responsive"
    src="/images/elephants_narrow.png"
    media="(max-width: 415px)">
</amp-img>
<amp-img height="720"
    alt="..." layout="fixed-height"
    src="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
</amp-img>
[/sourcecode]

The good thing is that `link rel=preload` also supports media queries. So we can use the same media queries in our preload statements, like this:

[sourcecode:html]

<link rel="preload" as="image"
    href="/images/elephants_narrow.png"
    media="(max-width: 415px)">
<link rel="preload" as="image"
    href="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
[/sourcecode]

By the way, the same approach works for [`amp-video`](../../../documentation/components/reference/amp-video.md) poster images:

[sourcecode:html]

<link rel="preload" href="/images/poster.jpg" as="image">
...
 <amp-video width="480" height="270" src="elephant.mp4"
             poster="/images/poster.jpg"
             layout="responsive">
     ...
</amp-video>
[/sourcecode]

Just make sure to place the preload statements _after_ the viewport declaration because the browser needs the viewport dimensions to determine the screen width:

[sourcecode:html]

<meta name="viewport" content="width=device-width">
...
<link rel="preload" media="(max-width: 415px)" ...>
[/sourcecode]

[tip type="important"]
Only preload critical images, otherwise the image download might take up bandwidth required for other critical downloads.
[/tip]

### Consider using a service worker

Now that all [major browsers support service workers](https://caniuse.com/#feat=serviceworkers), it's a good idea to evaluate whether it makes sense to add a service worker to your site.

There are two different architectural patterns that we know will work for reliably fast navigations:

- For single-page applications: the App Shell model (in the AMP context referred to as [AMP-in-PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)). This pattern requires a service worker to upgrade an AMP document to the app-shell-based PWA experience.
- For multi-page-applications: [streaming composite resources](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses). A service worker caches the static header and footer and uses streaming to instantly return a cached, partial response while loading the content.

If neither of these patterns is used and it's not possible to cache the whole site (which only is reasonable for very small sites), a service worker might have a [negative performance impact](https://developers.google.com/web/updates/2017/02/navigation-preload). The best thing in this case is to **not** use a service worker.

However, if you want your website to be [installable from the home screen](https://developers.google.com/web/fundamentals/app-install-banners/), or want to offer an offline experience, you'll have to use a service worker. In this case, it's important to use [navigation preload](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw) to mitigate the potential slowdown (Note: Currently, navigation preload is only supported in Chrome).

If your AMP website uses a service worker, here are some best practices:

- Pre-cache the [AMP runtime](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime) and extensions (e.g. [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)).
- Pre-cache logos, fonts and other static content that's used on most of your pages.
- Serve logos, fonts and images by using a [cache-first strategy](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network).
- Serve the AMP runtime and extensions by using a [stale-while-revalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) strategy.
- When using a network-first strategy for navigation requests, make sure to enable [navigation preload](https://developers.google.com/web/updates/2017/02/navigation-preload).

If you're looking for a way to get started with a service worker in your AMP site, check out this [sample](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg) that provides a service worker that implements all these best practices.

[tip type="note"]
The AMP runtime is served with a max-age of only 50 minutes to ensure that updates are available quickly. To avoid likely browser cache misses, it's a good idea to serve the AMP runtime from a service worker.
[/tip]

Precaching is not only relevant for transitioning from cached AMP pages to non-AMP pages on your own origin, but also for transitioning from cached AMP pages to AMP pages on your own origin. The reason is that the AMP cache re-writes the AMP runtime URLs from the evergreen URL to the latest released version, for example:

`https://cdn.ampproject.org/v0.js` -> `https://cdn.ampproject.org/rtv/001515617716922/v0.js`.

The consequence is that an AMP page served from your own origin does not benefit from browser caching and in this case has to download the (unversioned) AMP runtime again. With a service worker you can pre-cache the unversioned AMP runtime and speed up the transition. To learn more about why the AMP cache versions AMP runtime URLs, read [this document](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime).

[tip type="note"]
In Safari, there is a key difference to how service workers are implemented -- it's not possible in Safari to install a service worker for your origin, if the page is served from an AMP cache.
[/tip]

### Optimize custom fonts <a name="optimize-custom-fonts"></a>

With AMP there are a few things that you can do to optimize your font loading ([most of them are actually not specific to AMP](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)):

- If possible, use [font-display: optional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display): This will only use the font if it's already in the cache, and falls back to the system font if your custom font has not been loaded yet.
- Optimize your web fonts (for example, serve custom fonts using WOFF2).
- Preload custom fonts: [sourcecode:html]
<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2" >[/sourcecode]
- If you are using Google fonts, or any other font provider with unknown font URLs, preconnect the respective font server: [sourcecode:html]
 <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
[/sourcecode]

Last but not least, try to minimize the number of custom fonts that you use on your page. If you can, use the system fonts instead of custom fonts because system fonts make your website match the user's operating system, and it helps to avoid loading more resources.


### Basic optimizations <a name="basic-optimizations"></a>

Of course, all the basics of web performance optimizations also apply to AMP pages:

- [Optimize images](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) and videos. Image optimization can have a massive impact on loading performance.
- [Compress and minify CSS & HTML](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer). Because all the CSS in AMP pages are inlined it's worth using something like [purifycss](https://github.com/purifycss/purifycss) to strip out unused CSS.
- Use [HTTP Caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- ... and more
