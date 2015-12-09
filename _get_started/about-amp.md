---
layout: page
title: What Is AMP?
order: 0
---
AMP is a way to build web pages for static content that render fast.
AMP in action consists of three different parts:

{% include toc.html %}

**AMP HTML** is HTML with some restrictions for reliable performance
and some extensions for building rich content beyond basic HTML.
The **AMP JS** library ensures the fast rendering of AMP HTML pages.
The **AMP CDN** (optionally) delivers the AMP HTML pages.

<amp-youtube
    data-videoid="SOx1XfOjJPI"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

## AMP HTML

AMP HTML is basically HTML extended with custom AMP properties.
The simplest AMP HTML file looks like this:

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style>body {opacity: 0}</style><noscript><style>body {opacity: 1}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

Though most tags in an AMP HTML page are regular HTML tags,
some HTML tags are replaced with AMP-specific tags (see also
[HTML Tags in the AMP spec](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).
These custom elements, called AMP HTML components,
make common patterns easy to implement in a performant way.

For example, the [`amp-img`](/docs/reference/amp-img.html) tag
provides full `srcset` support even in browsers that don’t support it yet.
Learn how to [create your first AMP HTML page](/docs/get_started/create_page.html).

## AMP JS

The [AMP JS library](https://github.com/ampproject/amphtml/tree/master/src) implements
all of [AMP's best performance practices](/docs/get_started/technical_overview.html),
manages resource loading and gives you the custom tags mentioned above,
all to ensure a fast rendering of your page.

Among the biggest optimizations is the fact that it makes everything that comes from external resources asynchronous, so nothing in the page can block anything from rendering.

Other performance techniques include the sandboxing of all iframes, the pre-calculation of the layout of every element on page before resources are loaded and the disabling of slow CSS selectors.

To learn more about not just the [optimizations](/docs/get_started/technical_overview.html) but the limitations, [read the AMP HTML specification](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## AMP CDN

The AMP CDN is a proxy-based CDN for delivering all valid AMP documents.
It fetches AMP HTML pages, caches them, and improves page performance automatically.
When using the AMP CDN, the document, all JS files and all images load
from the same origin that is using
[HTTP 2.0](https://http2.github.io/) for maximum efficiency.

AMP’s CDN also comes with a built-in 
[validation system](https://github.com/ampproject/amphtml/tree/master/validator)
which confirms that the page is guaranteed to work,
and that it doesn't depend on external resources.
The validation system runs a series of assertions
confirming the page’s markup meets the AMP HTML specification. 

Another version of the validator comes bundled with every AMP page. This version can log validation errors directly to the browser’s console when the page is rendered,
allowing you to see how complex changes in your code
might impact performance and user experience.

Learn more about [testing your AMP HTML pages](/docs/guides/validate.html).
