---
layout: page
title: Make Your Page Discoverable
order: 3
---

In some cases, you might want to have both a non-AMP and an AMP version of the same page, for example, a news article. Consider this: If Google Search finds the non-AMP version of that page, how does it know there’s an AMP version of it?

### Linking pages with &lt;link&gt;

In order to solve this problem, we add information about the AMP page to the non-AMP page and vice versa, in the form of `<link>` tags in the `<head>`.

Add the following to the non-AMP page:

{% highlight html %}
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

And this to the AMP page:

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
{% endhighlight %}

### What if I only have one page?

If you only have one page, and that page is an AMP page, you must still add the canonical link to it, which will then simply point to itself:

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

## Integrate with third-party platforms through additional metadata

Sometimes a third-party site (that embeds your AMP page or includes links to it) needs to know more about your page other than the fact that it is an AMP page. The questions a platform might ask about your page are things like “Are you a news article?”, “Or a video?”, or “Do you have a screenshot and short description?”.

This isn’t just relevant for AMP pages but for all web pages. For some platforms, this metadata is additional, for others it is a requirement, meaning they **won’t show links to your content if you didn’t include the right metadata**. Make sure you include the right metadata for the platforms you want your content to appear on.

### Use Schema.org for most search engines

[Schema.org](http://schema.org/) offers open vocabularies to add meta data to all sorts of things. In the case of AMP, the properties that make sense in context include the specific type of content (i.e. ‘news article’), the headline, the published date and associated preview images.

Example:

{% highlight html %}
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
{% endhighlight %}

More examples can be found in [ampproject examples folder](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples), including the alternative HTML attribute syntax).

Note: This Schema.org definition is a requirement to make your content eligible to appear in the demo of the [Google Search news carousel (try on mobile)](https://g.co/ampdemo).
See also [Top Stories with AMP](https://developers.google.com/structured-data/carousels/top-stories), and the [Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/).

### Other metadata for even more platforms

Head to the [Social Discovery guide at Web Fundamentals](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) to learn about all the other different ways of preparing your content for discovery and distribution.
