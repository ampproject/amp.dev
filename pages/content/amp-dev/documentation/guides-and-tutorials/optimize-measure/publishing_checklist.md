---
$title: AMP publishing checklist 
$order: 0
description: Responsive web design is about building fluid web pages that respond to your user's needs—pages that fit their device's screen size and orientation. You can achieve ...
formats:
  - websites
author: CrystalOnScript
contributors:
  - sebastianbenz
---

Follow this checklist to give your site the fullest AMP experience! 

# Ensure AMP Specification Validation 

AMP comes with a ton of built in benefits, such as decreasing user wait time by preloading content from AMP Caches. To get these benefits, pages must be valid AMP documents. Pages published with errors reported by the AMP validator are not indexable by AMP Caches, and possibly served as error pages.

Never publish an invalid AMP page again by using these tools:

* [Validate AMP pages](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
* [The AMP Validator ](https://validator.ampproject.org/)
* [Google AMP Tester](https://search.google.com/test/amp)
* [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
* [AMP Tools](../../../documentation/tools.html?format=websites)


# Grant cached AMP pages server access

Great news, valid AMP pages automatically opt into all existing AMP Caches! This means your users experience content that loads efficiently and safely. These types of optimizations are great, but come with a small catch. Some users will be served AMP pages from domains that do not match your own. This can cause pages to lose access to site data when using dynamic AMP components such as [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) or [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites). These types of errors are Cross-Origin Resource Sharing, or CORS, issues. Work with safety, not against it, by enabling CORS Requests from all available [AMP Caches](https://ampjs.org/caches.json)! If you're using Node.js in your backend, you can use the [amp-cors middleware](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors).

Learn more about granting server access:

* [How AMP Pages are cached ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
* [CORS in AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
* [AMP CORS Middleware](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) for Node.js


# Safe and shareable content with signed exchanges 

Keep your domain's URL and simplify analytics when sharing content through signed exchanges (SXG). By serving AMP pages with SXG, digital signatures protect your information by tying the document to its claimed URL. This behavior treats user sessions and cookies as first party, closing possible analytics gaps. Implementing SXG delivers signed AMP content in addition to, rather than instead of, regular AMP content.

Learn more about implementing signed exchanges:

* [Serve AMP using signed exchanges](signed-exchange.md?format=websites)
* [Signed HTTP Exchanges](https://developers.google.com/web/updates/2018/11/signed-exchanges)
* [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/)
* [Signed exchanges for better AMP URLs and easier analytics (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)


# Test cached pages

AMP Caches store images, fonts, and page content to serve users your content as soon as they want it. This makes it important to test that your AMP pages look and work as expected when served from an AMP Cache. 

When adding AMP pages to an AMP Cache, check with your [browser’s developer tools](https://developers.google.com/web/tools/chrome-devtools/) that all external resources are loadable. Here's a list to keep in mind: 

* images
* videos
* amp-analytics endpoints
* amp-pixel endpoints
* custom fonts
* iframes

Learn more about AMP caches:

* [Using the Google AMP Cache](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
* [AMP on Google, Google AMP Cache](https://developers.google.com/amp/cache/overview)
* [Debug AMP Cache issues](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
* [AMP Cache URL Format and Request Handling](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)


# Ensure your AMP files are discoverable by search engines

Pages only build in AMP(AMP first) and pages with a AMP double(paired AMP) all need to ensure they are discoverable! All AMP pages required the `<link rel="canonical" href="$SOME_URL">` in their `<head>`. AMP first pages need to link to themselves and AMP pages paired to a non-AMP page will need to link link to each other. 

Ensure your [Schema.org](https://schema.org/) metadata adds useful information! Other sites and search engines may require this to share your content.

Web Robots, Web Wanderers, Crawlers or Spiders, are all names for programs that search for content. They traverse the web, helping search engines index web content so that user's queries can surface the correct results! Make sure your seekers can find your site by including the proper instructions in the `robots.txt` file and set up the appropriate headers.

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

* [Make your page discoverable ](discovery.md?format=websites)
* [Robots.txt](http://www.robotstxt.org/)
* [Robots meta tag and X-Robots-Tag HTTP header specifications](https://developers.google.com/search/reference/robots_meta_tag)
* [AMP Indexing FAQs](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)


# Measuring user traffic and journeys 

Gathering correct metrics is essential to useful analytics. When testing how introducing AMP to your site impacts users, ensure you're measuring the correct things. False negatives, false positives, or irrelevant results may arise if analytics don't account for the differences AMP can create. Make sure you understand what to look for, and how to measure it! 

Learn more about setting up proper analytics for AMP:

* [So your AMP test doesn't perform — now what?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
* [Cache vs. non-cache analysis](https://support.google.com/analytics/answer/6343176?hl=en#cache)
* [Measuring user journeys across the AMP Cache and your website](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
* [Measuring success: What's new in AMP analytics & experiments (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
* [Signed exchanges for better AMP URLs and easier analytics (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)