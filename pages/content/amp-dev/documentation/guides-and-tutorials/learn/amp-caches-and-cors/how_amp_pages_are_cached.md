---
$title: How AMP pages are cached
$order: 0
description: In this document, you'll learn about the role of the AMP Cache in the AMP ecosystem, and how your AMP page gets cached.
formats:
  - websites
  - stories
  - ads
---

In this document, you'll learn about the role of the AMP Cache in the AMP ecosystem, and how your AMP page gets cached.

## What is an AMP Cache?
An AMP Cache is a proxy-based content delivery network (CDN) for delivering valid AMP documents. AMP Caches are designed to:

1.  Serve only valid AMP pages.
2.  Allow AMP pages to be preloaded efficiently and safely.
3.  Perform additional user-beneficial performance optimizations to content.

[tip type="note"]
AMP email documents are exempt from the AMP cache.
[/tip]

Learn more about AMP Caches in the YouTube video below, or in the [Why AMP Caches Exist](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456) blog post.

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='Watch this video to learn why AMP Caches exist.']

## What AMP Caches are available?
Currently, there are two AMP Cache providers:

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP is an open ecosystem and the AMP Project actively encourages the development of more AMP Caches.  To learn about creating AMP Caches, see the [AMP Cache Guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## How do I choose an AMP Cache?

As a publisher, you don't choose an AMP Cache, it's *actually the platform* that links to your content that chooses the AMP Cache (if any) to use.

This is an inversion of the typical model where content delivery is the responsibility of the publisher.  However, this model allows platforms to provide their users with predictable load performance and among other things allows them to ensure required security and privacy invariants during AMP’s pre-rendering phase. To learn about the strict guidelines for creating AMP Caches, see the [AMP Cache Guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Can I opt out of caching?

Caching is a core part of the AMP ecosystem. Publishing a valid AMP document automatically opts it into cache delivery.

Should you desire not to have your document cached, one option is to remove the `amp` attribute from the HTML tag. This makes the document technically invalid AMP, while not impacting the functionality of the document.

## Who requests cached AMP pages?

Cached AMP pages are accessed by platforms (like Google Search, Google News, and Bing) and mobile apps. Mobile apps can link to cached AMP content via the URL (see Google's [AMP URL API](https://developers.google.com/amp/cache/use-amp-url)) or by cross-origin XHRs in  Progressive Web Apps (learn more in [Embed & use AMP as a data source](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)).

<amp-img src="/static/img/docs/platforms_accessing_cache.png"
         width="1054" height="356" layout="responsive"
         alt="Illustration: Google products (search, news), Mobile apps (via linking to AMP content, and via Progressive Web Apps), and other platforms - all accessing AMP Cache"">
</amp-img>

## How does my AMP page get cached?
By using the AMP format, you are making your content available to be cached by AMP Caches. There are a few ways that your AMP page can end up in an AMP Cache:

* **Platform discovery**:  Platforms discover your AMP content via the `<html ⚡>` or `<html amp>` tag and cache the content. For example, Google Search crawls content; for any identified and valid AMP pages, the content is added to the Google AMP Cache.

* **Cache URL request**: Platforms can specifically request an AMP page by using the AMP Cache URL format.  The AMP Cache acts as a reverse proxy, therefore, when the platform accesses the page, it results in the page being cached automatically.
    - Google AMP Cache URL example: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"]
**NOTE –** The AMP Cache URL is not a user-facing URL, that is, users wouldn't typically request content via those URLs.
[/tip]

* **Publisher addition**: Publishers can specifically add the AMP page to the AMP Cache.  This option is applicable only to the Google AMP Cache (see [Google AMP Cache: Update AMP Content](https://developers.google.com/amp/cache/update-cache)).

## Additional resources

* [AMP Project's AMP Cache guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)
* [Google AMP Cache overview](https://developers.google.com/amp/cache/overview)
* [Bing AMP Cache Documentation](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
