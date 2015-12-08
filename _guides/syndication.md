---
layout: page
title: Syndicate Your Content
order: 3
---

## Make your AMP page discoverable

In some cases, you might want to have both a non-AMP and an AMP version of the same page, for example, a news article. Consider this: If Google Search finds the non-AMP version of that page, how does it know there’s an AMP version of it?

### Linking pages with `<link>`

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

Sometimes a third-party site (that embeds your AMP page or includes links to it) needs to know more about your page other than the fact that it is an AMP page. The questions a platform might ask about your page are thinks like “Are you a news article?”, “Or a video?”, or “Do you have a screenshot and short description?”.

This isn’t just relevant for AMP pages but for all web pages. For some platforms, this metadata is additional, for others it is a requirement, meaning they **won’t show links to your content if you didn’t include the right metadata**. Make sure you include the right metadata for the platforms you want your content to appear on.

### Use Schema.org for most search engines

[Schema.org](http://schema.org/) offers open vocabularies to add meta data to all sorts of things. In the case of AMP, the properties that make sense in context include the specific type of content (i.e. ‘news article’), the headline, the published date and associated preview images.

Example:

{% highlight html %}
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "headline": "Open-source framework for publishing content",
    "datePublished": "2015-10-07T12:02:41Z",
    "image": [
      "logo.jpg"
    ]
  }
</script>
{% endhighlight %}

More examples can be found in [ampproject examples folder](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples), including the alternative HTML attribute syntax).

Note: This Schema.org definition is a requirement to get your content syndicated in the [experimental Google Search news carousel](g.co/ampdemo).

### Other metadata for even more platforms

Head to the [Social Discovery guide at Web Fundamentals](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) to learn about all the other different ways of preparing your content for syndication.