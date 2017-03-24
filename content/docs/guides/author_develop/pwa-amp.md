---
$title: Connect AMP & PWA
$order: 9
toc: true
---
[TOC]

Contrary to popular belief, Progressive Web Apps and AMP Pages are not mutually exclusive. In fact, in many cases, they compliment each other in one way or another.

## What's in a Progressive Web App?

The term **Progressive Web App** describes a new generation of web apps that are reliable, fast and engaging: At its core is the Web App Manifest for installability, and a technology called Service Worker, a client-side proxy that sits between the browser and your site's server, allowing you to build features such as offline functionality and app shell caching for faster subsequent loads.

{% call callout('Read on', type='read') %}
Learn more about [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) at Web Fundamentals.
{% endcall %}

## AMP pages with PWA features

AMP Pages can use many PWA features on their own, as long as they're served from your origin (your site's domain) as opposed to an AMP Cache. This means that PWA features won't kick in when consuming an AMP Page within a platform like Google or Bing, but they will on the onward journey, or if users navigate to your AMP pages directly.

{% call callout('Read on', type='read') %}
Learn how to [enable PWA features](/docs/guides/pwa-amp/amp-as-pwa) for your AMP Pages.
{% endcall %}

## AMP as entry point into your PWA

AMP's unique selling point is the **almost-instant delivery**, a characteristic that makes AMP pre-destined for the first hop into your site. *Progressive web apps* enable much **more interactivity and engagement-enabling features**, but their first load is hindered by the fact that the site's Service Worker, and therefore its assets and app shell, are only accelerating delivery on subsequent loads.

A good strategy is to make the entry point into your site AMP, then warm up the PWA behind the scenes and switch to it for the onward journey.

{% call callout('Read on', type='read') %}
Learn how to [connect AMP to a PWA](/docs/guides/pwa-amp/amp-to-pwa) through `amp-install-serviceworker`.
{% endcall %}

## AMP as data source for your PWA

One of the core features of AMP Pages is that they're easy and safe to embed, which is why an ever growing number of platforms is happy to distribute and serve them.

If you're building a Progressive Web App, you can benefit from the same and dramatically reduce your backend and client complexity by **re-using your AMP Pages as data-source for your PWA**.

{% call callout('Read on', type='read') %}
Learn how to [consume AMP pages within a PWA](/docs/guides/pwa-amp/amp-in-pwa).
{% endcall %}
