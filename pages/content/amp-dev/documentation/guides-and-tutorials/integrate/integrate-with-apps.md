---
$title: Integrate AMP with your app
$order: 2
description: 'This guide is intended for mobile and web app developers who want to integrate and link to AMP pages. For example, consider a mobile chat app ...'
formats:
  - websites
---

This guide is intended for mobile and web app developers who want to integrate and link to AMP pages. For example, consider a mobile chat app that loads the AMP version of a shared URL to achieve a faster experience for users.

## Transform links to AMP

With AMP, it's possible to near-instantly render external websites inside your
native or mobile web app. You can achieve this by matching URLs in your content
to their corresponding AMP URLs (if one exists) and by opening the AMP version
instead of the original version. You can use tools like,
[Google's AMP URL API](https://developers.google.com/amp/cache/use-amp-url) to
help you with this.

For example, the following message can be transformed to serve the AMP versions
by replacing all URLs with their matching AMP versions (if they exist). To
reduce load time and guarantee that valid AMP is served, you should link to the
cached AMP pages in the AMP Cache.

Original message:

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

Transformed message:

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="tip"]
**TIP –** Consider providing users the option to view the non-AMP version instead of the AMP version through the preference settings in your app.
[/tip]

### Ways to transform links

There are three ways to programmatically transform links:

1.  **Write-time server-side (preferred)**: Retrieve the AMP URL via Google's
    AMP URL API at write time of a URL and store AMP URLs server-side. Pass both
    URLs to the client because the original URL might be needed for sharing.
    This is the recommended approach because there are fewer client-side network
    requests. When taking this approach, it's important to regularly
    (e.g., daily) scan links for AMP versions because websites are increasingly
    adopting the AMP format.
1.  **Read-time server-side (some use)**: Retrieve the AMP URL via Google's AMP
    URL API before passing the content to your client. As mentioned above, pass
    both URLs (AMP and non-AMP) to the client because the original URL might be
    needed for sharing. This method can be good for low-fan-out services.
1.  **Client-side (if server-side isn't possible)**: Retrieve the AMP URL via
    Google's AMP URL API from the client. Use this approach if server-side URL
    transformation is not possible (for example, for messaging apps using
    end-to-end encryption). Make sure to trigger URL transformation as soon as
    the content is available, before any user interaction has taken place.

[tip type="important"]
**IMPORTANT –** Never request AMP URLs through the Google's AMP API as a result of a user interaction because that degrades the performance of your app as it introduces an additional network request. Instead, use one of the three approaches described above.
[/tip]

#### Google's AMP URL API

Google provides the AMP URL API to retrieve the matching AMP HTML URLs for a
given list of URLs ([official documentation](https://developers.google.com/amp/cache/use-amp-url) /
[demo](../../../documentation/examples/documentation/Using_the_AMP_URL_API.html). The URLs do
not need to be the canonical versions. If an AMP version exists, the response
includes the original AMP URL and the URL for the cached AMP page on the Google
AMP Cache.

For example, for a given list of URLs:

```json
{"urls": [
  "https://www.example.org/article-with-amp-version",
  "http://www.example.com/no-amp-version.html"
]}
```

The response body contains the AMP URL mapping in JSON format:

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL not found.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="note"]
**NOTE –**  URLs for cached AMP pages on non-Google AMP Caches cannot be retrieved via the AMP URL API. However, you can easily derive the cached URL from the returned AMP URL (ampURL).
[/tip]

## Using AMP Caches

An [AMP Cache](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) is a
proxy-based content delivery network (CDN) for delivering valid AMP documents.
AMP Caches are designed to:

*   Serve only valid AMP pages.
*   Allow AMP pages to be preloaded efficiently and safely.
*   Perform additional user-beneficial performance optimizations to content.

Currently, there are two AMP Cache providers:

*   [Google AMP Cache](https://developers.google.com/amp/cache/)
*   [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

This gives two choices to display an AMP file in an app by using either:

1.  the version hosted by the publisher
1.  the version hosted in an AMP Cache

We recommend using the AMP Cache for the following reasons:

*   Better user experience due to faster load time and low latency (>1s faster
    loading time).
*   Performance and bandwidth benefits due to additional caching of client
    dependent artifacts, e.g. caching different versions of the same image
    depending on the client's viewport size.
*   The original AMP file might no longer be valid AMP, which could lead to a
    bad user experience. In this case, the AMP Cache serves the last valid
    version of the AMP file.
*   A not-so-upstanding publisher could serve two different documents to an AMP
    Cache crawler and to your users. Using an AMP Cache guarantees that users
    always see the same AMP file as the Cache.

[tip type="important"]
**IMPORTANT –** When serving AMP pages through the AMP Cache, provide a viewer experience that clearly shows the AMP's origin and offers the possibility for users to share the canonical URL (see also the following two sections for more about this).
[/tip]

## Implementing an AMP Viewer

The AMP Runtime provides a Viewer API, which provides a protocol to send and
receive  messages between the AMP Runtime and the Viewer. This makes it possible
to control the pre-rendering of AMP documents, swiping between articles, and AMP
Runtime instrumentation. You can learn more about the AMP Viewer API in the
[Connecting AMP Viewers with AMP pages](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md)
guide. Viewer implementations for [web](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md)
and [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) are
available on [GitHub](https://github.com/ampproject/amp-viewer). An Android
viewer is not yet available, see [this answer](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038)
on Stack Overflow for how to best configure a WebView for displaying AMP pages.

Here are some general best practices for implementing an AMP Viewer:

*   Serve the AMP page from an AMP Cache (>1s faster loading time).
*   Display the article's publisher origin (e.g., in a collapsible header).
*   Provide a sharing action (see also the "[Sharing AMP Content](#sharing-amp-content)"
    section below).
*   In webView-based viewers, enable third-party cookies.
*   Set a referrer for your platform/app.

### Sharing AMP Content <a name="sharing-amp-content"></a>

When sharing an AMP document from within a platform's AMP Viewer, the platform
should share the canonical URL when technically possible. For example, if the
platform provides a share button, this button should share the canonical URL.

The philosophy of the AMP Project is that platforms should get to choose which
version of a document to present to the user. For this reason, it makes most
sense to share the canonical version (as opposed to the AMP version) when
sharing to a different platform, and then expect the target platform to make the
right choice.
