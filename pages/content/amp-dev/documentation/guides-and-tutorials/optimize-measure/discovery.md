---
formats:
  - websites
$title: Make your pages discoverable
$titles:
  teaser: Make your pages discoverable
$order: 5
description: 'In some cases, you might want to have both a non-AMP and an AMP version of the same page, for example, a news article. Consider this: If Google Search ...'

teaser:
  icon: discover
  text: Learn how search engines find out that there is an AMP version of your site.
  label: Learn more
---

In some cases, you might want to have both a non-AMP and an AMP version of the same page, for example, a news article. Consider this: If Google Search finds the non-AMP version of that page, how does it know there’s an AMP version of it?

### Linking pages with &lt;link&gt;

In order to solve this problem, we add information about the AMP page to the non-AMP page and vice versa, in the form of `<link>` tags in the `<head>`.

Add the following to the non-AMP page:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

And this to the AMP page:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### What if I only have one page?

If you only have one page, and that page is an AMP page, you must still add the canonical link to it, which will then simply point to itself:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"]
**READ ON –** Learn more about how Google finds AMP pages in [Google Search guidelines for AMP pages](https://support.google.com/webmasters/answer/6340290).
[/tip]

## Integrate with third-party platforms through additional metadata <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

Sometimes a third-party site (that embeds your AMP page or includes links to it) needs to know more about your page other than the fact that it is an AMP page. The questions a platform might ask about your page are things like “Are you a news article?”, “Or a video?”, or “Do you have a screenshot and short description?”.

This isn’t just relevant for AMP pages but for all web pages. For some platforms, this metadata is additional, for others it is a requirement, meaning they **won’t show links to your content if you didn’t include the right metadata**. Make sure you include the right metadata for the platforms you want your content to appear on.

### Use Schema.org for most search engines

[Schema.org](http://schema.org/) offers open vocabularies to add meta data to all sorts of things. In the case of AMP, the properties that make sense in context include the specific type of content (i.e. ‘news article’), the headline, the published date and associated preview images.

Example:

[sourcecode:html]

<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>

[/sourcecode]

More examples can be found in the [ampproject examples folder](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples), including the alternative HTML attribute syntax).

[tip type="read-on"]
Visit these resources for more information on structured data:

- Learn how to [Structure your content to appear in Google Search rich results](https://developers.google.com/search/docs/guides/mark-up-content) (e.g., top stories carousel, recipe cards, etc.).
- Test your structured data with the [Google Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/).
  [/tip]

### Other metadata for even more platforms

Head to the [Social Discovery guide at Web Fundamentals](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) to learn about all the other different ways of preparing your content for discovery and distribution.
