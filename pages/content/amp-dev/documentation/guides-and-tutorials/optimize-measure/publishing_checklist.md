---
$title: Publishing AMP Documents Checklist 
$order: 0
description: Responsive web design is about building fluid web pages that respond to your user's needs—pages that fit their device's screen size and orientation. You can achieve ...
formats:
  - websites
author: CrystalOnScript
---

Follow this checklist to ensure your pages are getting all the benefits AMP has to offer by being healthy and accessible on the web! 


# Ensure AMP Specification Validation 

AMP comes with a ton of built in benefits, such as decreasing content load times by preloading content from AMP Caches. However, only documents that can be verified as valid AMP get these benefits. If you publish documents that have critical AMP errors your pages will not be indexed by an AMP cache, or possible served as error pages. 

Learn more about the tools you can use to validate your AMP pages:



*   [Validate AMP pages]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate-amp.html', locale=doc.locale).url.path}}?format=websites)
*   [The AMP Validator ](https://validator.ampproject.org/)
*   [AMP Tools]({{g.doc('/content/amp-dev/documentation/documentation/tools.html', locale=doc.locale).url.path}}?format=websites) 


# Grant cached AMP pages server access

Valid AMP pages are automatically opted into all existing AMP caches. This is great news! Your pages are automatically preloaded efficiently and safely, enabling user-beneficial performance optimizations to content. However, documents served from AMP caches are served from domains that do not match your own. This can cause  Cross-Origin Resource Sharing (CORS) issues when using dynamic AMP components, such as [`<amp-form>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.html', locale=doc.locale).url.path}}?format=websites) or [`<amp-list>`]({{g.doc('/content/amp-dev/components/reference/amp-list.html', locale=doc.locale).url.path}}?format=websites), causing your site to lose access to your data. This means certain content may not load correctly or at all.  

Learn more about accessing server data:



*   [How AMP Pages are cached ]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/how-cached.html', locale=doc.locale).url.path}}?format=websites)
*   [CORS in AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.html', locale=doc.locale).url.path}}?format=websites)


# Set up discoverable canonicals 

Whether you're only using AMP or taking the paired-AMP approach, ensure that your AMP pages are discoverable by users. Paired AMP pages with non-AMP pages will need to link to each other in their `<head>`. If using a single AMP page, it will need to link to itself. Additionally, [Schema.org](https://schema.org/) metadata adds useful information other sites or search engines may require to share your content. 

Web robots (also known as Web Wanderers, Crawlers, or Spiders) are programs that traverse the Web automatically. They have many uses, such as helping search engines index the web content. Ensure your sites `robots.txt` file has the proper instructions for them to follow, or set up the appropriate headers.  

Learn how to make your pages discoverable: 



*   [Make your page discoverable ]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-and-measure/discovery.html', locale=doc.locale).url.path}}?format=websites)
*   [Robots.txt](http://www.robotstxt.org/)
*   [Robots meta tag and X-Robots-Tag HTTP header specifications](https://developers.google.com/search/reference/robots_meta_tag)
*   [AMP Indexing FAQs](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)


# Measuring user traffic and journeys 

If you're interested in testing how introducing AMP to your website impacts your users, make sure you're setting up testing to measure the correct things. Its likely to see false negative, positive or relevant results if your analytics don't account for the differences AMP creates in measurement. 

Learn more about setting up proper analytics for AMP:



*   [So your AMP test doesn't perform — now what?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
*   [Cache vs. non-cache analysis](https://support.google.com/analytics/answer/6343176?hl=en#cache)
*   [Measuring user journeys across the AMP Cache and your website](https://www.ampproject.org/latest/blog/measuring-user-journeys-across-the-amp-cache-and-your-website/)

 
