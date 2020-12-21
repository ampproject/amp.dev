---
"$title": How AMP pages are cached
"$order": '0'
description: "In this document, you'll learn about the role of the AMP Cache in the AMP ecosystem, and how your AMP page gets cached."
formats:
- websites
- stories
- ads
---

In diesem Dokument erfährst du, welche Rolle der AMP Cache im AMP Ökosystem spielt und wie deine AMP Seite zwischengespeichert wird.

## What is an AMP Cache?

Ein <a>AMP Cache</a> ist ein proxybasiertes Content Delivery Network (CDN) zur Bereitstellung gültiger AMP Dokumente. AMP Caches wurden entwickelt, um:

1. Serve only valid AMP pages.
2. Allow AMP pages to be preloaded efficiently and safely.
3. Perform additional user-beneficial performance optimizations to content.

[tip type="note"] AMP E-Mail Dokumente sind vom AMP Cache ausgenommen. [/tip]

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

Caching ist ein zentraler Bestandteil des AMP Ökosystems. Mit der Veröffentlichung eines gültigen AMP Dokuments wird seine Cache Bereitstellung automatisch aktiviert.

Should you desire not to have your document cached, one option is to remove the `amp` attribute from the HTML tag. This makes the document technically invalid AMP, while not impacting the functionality of the document.

## Who requests cached AMP pages?

Cached AMP pages are accessed by platforms (like Google Search, Google News, and Bing) and mobile apps. Mobile apps can link to cached AMP content via the URL (see Google's [AMP URL API](https://developers.google.com/amp/cache/use-amp-url)) or by cross-origin XHRs in  Progressive Web Apps (learn more in [Embed & use AMP as a data source](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)).

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## How does my AMP page get cached?

By using the AMP format, you are making your content available to be cached by AMP Caches. There are a few ways that your AMP page can end up in an AMP Cache:

- **Erkennung durch Plattformen**: Plattformen erkennen deine AMP Inhalte über das Tag `<html ⚡>` oder `<html amp>` und speichern sie im Cache. Wenn die Google Suche zum Beispiel Inhalte durchsucht, werden die Inhalte aller identifizierten und gültigen AMP Seiten dem Google AMP Cache hinzugefügt.

- **Cache URL Anfrage**: Plattformen können explizit eine AMP Seite mithilfe des AMP Cache URL Formats anfordern. Da der AMP Cache als Reverse Proxy fungiert, wird die Seite automatisch im Cache gespeichert, sobald die Plattform auf sie zugreift.

    - Beispiel für eine Google AMP Cache URL: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"] **NOTE –** The AMP Cache URL is not a user-facing URL, that is, users wouldn't typically request content via those URLs. [/tip]

- **&nbsp;Zusatz  für Publisher**: Publisher können die AMP Seite explizit zum AMP Cache hinzufügen. Diese Option gilt nur für den Google AMP Cache (siehe [Google AMP Cache: AMP-Inhalte aktualisieren](https://developers.google.com/amp/cache/update-cache)).

## Additional resources

- [Richtlinien für den AMP Cache des AMP Projekts](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)
- [Übersicht über den Google AMP Cache](https://developers.google.com/amp/cache/overview)
- [Bing AMP Cache Dokumentation](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
