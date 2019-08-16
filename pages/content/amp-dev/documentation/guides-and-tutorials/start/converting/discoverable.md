---
$title: Making your page discoverable
$order: 3
description: 'It’s necessary to set up this bidirectional linking so that search engines understand the relationship between our regular HTML canonical document and our AMP document.'
---

Now that you've made a news article in AMP, let's ensure users can find and discover your content.

## Link AMP content

Your website can be made of all AMP pages, some AMP pages, or no AMP pages.  This part of the tutorial will cover how to incorporate AMP into your website's structure.

Canonical linking in regular HTML pages is a common technique for declaring which page should be considered the preferred page when multiple pages include the same content.

One common approach when adding AMP to a website is to generate AMP versions of traditional non-AMP HTML pages.  Both versions have generally the same content (e.g. the text of an article) but they may have different presentations.  In this scenario you should treat the traditional HTML pages as the “canonical” pages and pair the AMP pages with those HTML pages.

If you can, use AMP like any other JavaScript library to build your site and forget about the canonical linking.  Using AMP to build a whole website dramatically reduces your maintenance burden.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='Linking AMP content') }}

For the purposes of this tutorial, we'll focus on the case where you have an AMP and a non-AMP version of a page.  In this tutorial our website includes a news article that has a non-AMP HTML page (`article.html`) and an AMP version of the page (`article.amp.html`).  We'll pair these pages through `link`s.

We already took the first step to achieve this in our AMP document by including a link tag in the `<head>` back to the canonical page:

```html
<link rel="canonical" href="/article.html">
```

The next step is to link the canonical article to the AMP page. This is achieved by including a `<link rel="amphtml">` tag to the `<head>` section of the canonical article.

In the `article.html` file, **add** the following code into the `<head>` section:

```html
<link rel="amphtml" href="/article.amp.html">
```

The following diagram illustrates the directions of link tags:

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='Linking AMP content') }}

It’s necessary to set up this bidirectional linking so that search engines understand the relationship between our regular HTML canonical document and our AMP document. If no links were provided then it wouldn’t necessarily be clear to the crawler as to which articles are the “AMP versions” of the regular HTML documents. By explicitly providing these links we ensure there is no ambiguity!

## Add structured data

Valid AMP pages do not require [schema.org](http://schema.org/) structured data, but some platforms like Google Search require it for certain experiences like the Top stories carousel. It's generally a good idea to include structured data. Structured data helps search engines to better understand your web page, and to better display your content in Search Engine Result Pages (e.g., in rich snippets).  The structured data is included in the `<head>` tag of your AMP page via an `application/ld+json` type script tag.

For our news article, **add** the following structured data to the bottom of the `<head>` section of your AMP document:

```html

<script type="application/ld+json">
{
 "@context": "http://schema.org",
 "@type": "NewsArticle",
 "mainEntityOfPage":{
   "@type":"WebPage",
   "@id":"https://example.com/my-article.html"
 },
 "headline": "My First AMP Article",
 "image": {
   "@type": "ImageObject",
   "url": "https://example.com/article_thumbnail1.jpg",
   "height": 800,
   "width": 800
 },
 "datePublished": "2015-02-05T08:00:00+08:00",
 "dateModified": "2015-02-05T09:20:00+08:00",
 "author": {
   "@type": "Person",
   "name": "John Doe"
 },
 "publisher": {
   "@type": "Organization",
   "name": "⚡ AMP Times",
   "logo": {
     "@type": "ImageObject",
     "url": "https://example.com/amptimes_logo.jpg",
     "width": 600,
     "height": 60
   }
 },
 "description": "My first experience in an AMPlified world"
}
</script>
```

[tip type="note"]
**NOTE –**  The content should always be the same. For news articles, specify the “NewsArticle” type. The headline should match your article’s title. The image object refers to the hero image of the article.
[/tip]

**Reload** the page in your browser and verify that no AMP Validation errors were introduced.

[tip type="note"]
In addition to the schema.org structured data format, there are other formats supported by search engines and social media networks. See the supported documentation:

- [Twitter Cards meta tags](https://dev.twitter.com/cards/overview)
- [Facebook Open Graph meta tags](https://developers.facebook.com/docs/sharing/webmasters)
[/tip]

### Validate the structured data

To verify that your structured data is correct, many platforms provide validation tools.  In this tutorial, we'll validate our structured data with  the [Google Structured Data Validation Tool](https://developers.google.com/structured-data/testing-tool/).

1.  In a new browser window, open the [Google Structured Data Validation Tool](https://developers.google.com/structured-data/testing-tool/).
2.  Select the **Code Snippet** tab.
3.  Copy and paste the full source code from your AMP page into the text editor panel of the validation tool.
3.  Click **Run Test**.

If your structured data is valid, you should see **0 errors**, and **0 warnings**.

[tip type="read-on"]
**READ ON –** To learn more about page discoverability, see the [Make your page discoverable](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) guide.
[/tip]

Awesome work!  You've completed your AMP news article.
