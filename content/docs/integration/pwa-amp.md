---
$title: Combine AMP with Progressive Web Apps
$order: 5
$category: Develop
toc: true
components:
    - youtube
---
[TOC]

{{ youtube('Yllbfu3JE2Y', 480, 270, caption='Watch the intro to combining AMP and PWA.') }}

Progressive Web Apps and AMP pages work great together. In fact, in many cases, they complement each other in one way or another. Learn how to:

1. [Enable PWA features](/docs/guides/pwa-amp/amp-as-pwa.html) for your AMP pages
2. Create a [compelling, super-fast user journey](/docs/guides/pwa-amp/amp-to-pwa.html) from AMP to PWA
3. [Simplify your PWA](/docs/guides/pwa-amp/amp-in-pwa.html) by using the power of AMP

{% call callout('Progressive Web App?', type='note') %}
Learn more about [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) at Web Fundamentals.
{% endcall %}

## AMP pages with PWA features

AMP Pages can use many PWA features on their own, as long as they're served from your origin (your site's domain) as opposed to an AMP Cache. This means that PWA features won't kick in when consuming an AMP Page within a platform like Google or Bing, but they will on the onward journey, or if users navigate to your AMP pages directly.

{% call callout('Read on', type='read') %}
Learn how to [enable PWA features](/docs/guides/pwa-amp/amp-as-pwa.html) for your AMP Pages.
{% endcall %}

## AMP as entry point into your PWA

AMP's unique selling point is the **almost-instant delivery**, a characteristic that makes AMP the perfect fit for the first user interaction with your site. *Progressive web apps* enable much **more interactivity and engagement-enabling features**, but their first load is hindered by the fact that the site's Service Worker, and therefore its assets and app shell, are only accelerating delivery on subsequent loads.

A good strategy is to make the entry point into your site an AMP page, then warm up the PWA behind the scenes and switch to it for the onward journey.

{% call callout('Read on', type='read') %}
Learn how to [connect AMP to a PWA](/docs/guides/pwa-amp/amp-to-pwa.html) through `amp-install-serviceworker`.
{% endcall %}

## AMP as data source for your PWA

One of the core features of AMP Pages is that they're easy and safe to embed, which is why an ever-growing number of platforms are happy to distribute and serve them.

If you're building a Progressive Web App, you can receive the same benefits and dramatically reduce your backend and client complexity by **re-using your AMP Pages as data-source for your PWA**.

{% call callout('Read on', type='read') %}
Learn how to [consume AMP pages within a PWA](/docs/guides/pwa-amp/amp-in-pwa.html).
{% endcall %}
