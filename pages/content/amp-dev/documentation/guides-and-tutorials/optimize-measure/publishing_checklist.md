---
$title: Publishing AMP Documents Checklist
$order: 0
description: Responsive web design is about building fluid web pages that respond to your user's needs—pages that fit their device's screen size and orientation. You can achieve ...
formats:
  - websites
author: CrystalOnScript
contributors:
  - sebastianbenz
---

Follow this checklist to ensure your pages are getting all the benefits AMP has to offer by being healthy and accessible on the web!

# Ensure AMP Specification Validation

AMP comes with a ton of built in benefits, such as decreasing content load times by preloading content from AMP Caches. However, only documents that can be verified as valid AMP get these benefits. If you publish documents that have critical AMP errors your pages will not be indexed by an AMP cache, or possible served as error pages.

Learn more about the tools you can use to validate your AMP pages:

- [Validate AMP pages](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [The AMP Validator ](https://validator.ampproject.org/)
- [Google AMP Tester](https://search.google.com/test/amp)
- [AMP Tools](../../../documentation/tools.html?format=websites)

# Grant cached AMP documents server access

Valid AMP pages are automatically opted into all existing AMP caches. This is great news! Your pages are automatically preloaded efficiently and safely, enabling user-beneficial performance optimizations to content. However, documents served from AMP caches are served from domains that do not match your own. This can cause Cross-Origin Resource Sharing (CORS) issues when using dynamic AMP components, such as [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) or [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites), causing your site to lose access to your data. This means certain content may not load correctly or at all. It's important to enable CORS Requests from all available [AMP Caches](https://cdn.ampproject.org/caches.json) for your pages to work as intended for all possible users.

Learn more about accessing server data:

- [How AMP Pages are cached ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [CORS in AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [AMP CORS Library](https://www.npmjs.com/package/amp-toolbox-cors)

# Test cached pages

AMP Cache stores valid AMP pages and provides consistently fast access to them. Cache stores images and fonts in addition to documents. This makes it important to test that your AMPs work correctly when loaded via an AMP Cache.

When loading your AMP pages in an AMP Cache, check via your [browser’s developer tools](https://developers.google.com/web/tools/chrome-devtools/) if all external resources can be loaded successfully, including all of the following:

- images
- videos
- amp-analytics endpoints
- amp-pixel endpoints
- custom fonts
- iframes

Learn more about AMP caches:

- [Using the Google AMP Cache](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [AMP on Google, Google AMP Cache](https://developers.google.com/amp/cache/overview)]
- [Debug AMP Cache issues](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [AMP Cache URL Format and Request Handling](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# Set up discoverable canonicals

Whether you're only using AMP or taking the paired-AMP approach, ensure that your AMP pages are discoverable by users. Paired AMP pages with non-AMP pages will need to link to each other in their `<head>`. If using a single AMP page, it will need to link to itself. Additionally, [Schema.org](https://schema.org/) metadata adds useful information other sites or search engines may require to share your content.

Web robots (also known as Web Wanderers, Crawlers, or Spiders) are programs that traverse the Web automatically. They have many uses, such as helping search engines index the web content. Ensure your sites `robots.txt` file has the proper instructions for them to follow, or set up the appropriate headers.

Do NOT exclude crawlers via your [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en) file.

```
User-agent: *
Disallow: /amp/                            <= don't!
```

Do NOT add a robots `noindex` meta tag to your AMP HTML files.

```
<meta name="robots" content="noindex" />   <= don't!
```

Do NOT include `noindex` as X-Robots-Tag HTTP header for your AMP files.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

Learn how to make your pages discoverable:

- [Make your page discoverable ](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [Robots meta tag and X-Robots-Tag HTTP header specifications](https://developers.google.com/search/reference/robots_meta_tag)
- [AMP Indexing FAQs](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# Measuring user traffic and journeys

If you're interested in testing how introducing AMP to your website impacts your users, make sure you're setting up testing to measure the correct things. Its likely to see false negative, positive or relevant results if your analytics don't account for the differences AMP creates in measurement.

Learn more about setting up proper analytics for AMP:

- [So your AMP test doesn't perform — now what?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Cache vs. non-cache analysis](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [Measuring user journeys across the AMP Cache and your website](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
