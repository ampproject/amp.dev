---
$title: Enable Progressive Web App features for your AMP pages
$order: 0
toc: true
---

[TOC]

{{ image('/static/img/docs/pwamp_add_to_homescreen.png', 848, 1500, align='right third', caption='AMPbyExample triggering the "Add to Home Screen" prompt.') }}

Many websites won’t ever need things beyond the boundaries of AMP. [AMPbyExample](http://ampbyexample.com/), for instance, is both an AMP and a Progressive Web App:

1. It has a [Web App Manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/), prompting the “Add to Homescreen” banner.
1. It has a [Service Worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) and, therefore, allows offline access, among other things.

When a user visits [AMPbyExample](http://ampbyexample.com/) from a AMP-supporting platform and then clicks continues the onward journey onto the same site, they navigate away from the AMP Cache to the origin. The website still uses the AMP library, of course, but because it now lives on the origin, it can use a service worker, can prompt to install and so on.

{% call callout('Remember', type='caution') %}
The Service Worker won't be able to interact with the AMP-cached version of your page. Use it for onward journeys to your origin.
{% endcall %}

## Add a Web App Manifest

Adding a [Web App Manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) to your AMP pages ensures that users can install your site to their devices' homescreen. There's nothing special about Web App manifests in AMP.

First, create the manifest:

[sourcecode:json]
{
  "short_name": "ABE",
  "name": "AMPByExample",
  "icons": [
    {
      "src": "launcher-icon-1x.png",
      "type": "image/png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-2x.png",
      "type": "image/png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-4x.png",
      "type": "image/png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html?launcher=true"
}
[/sourcecode]

Then link to it from the `<head>` of your AMP page:

[sourcecode:html]
<link rel="manifest" href="/manifest.json">
[/sourcecode]

{% call callout('Tip', type='success') %}
Learn more about the [Web App Manifest at WebFundamentals](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/).
{% endcall %}

## Install a Service Worker to enable offline access

A Service Worker is a client-side proxy that sits between your page and your server, and can be used to build fantastic offline experiences, fast-loading app shell scenarios, and send push notifications.

{% call callout('Note', type='note') %}
If the concept of Service Workers is new to you, read the [introduction at WebFundamentals](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers).
{% endcall %}

Your Service Worker needs to be registered on a given page, or the browser won't find or run it. By default, this is done with the help of a [little bit of JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration). On AMP Pages, you use the [`<amp-install-serviceworker>`](/docs/reference/components/amp-install-serviceworker.html) component to achieve the same.

For that, first include the `<amp-install-serviceworker>` component via its script in the `<head>` of your page:

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

## Extend your AMP Pages via Service Worker

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
functionality that would otherwise fail [AMP validation](/docs/guides/validate.html), for example:

* Dynamic features that require custom JS.
* Components that are customized/only relevant for your site.
