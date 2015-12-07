---
layout: page
title: What Is AMP?
order: 0
---
AMP is a way to build web pages for static content that render fast.
AMP in action consists of three different parts:

{% include toc.html %}

AMP HTML is HTML with some restrictions for reliable performance
and some extensions for building rich content beyond basic HTML.
The AMP JS library ensures the fast rendering of AMP HTML pages.
The AMP CDN delivers the AMP HTML pages.

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
   <link rel="canonical" href="hello-world.html" >
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
Learn how to [create your first AMP HTML page](/docs/get_started/create/basic_markup.html).

## AMP JS

The [AMP JS library](https://github.com/ampproject/amphtml/tree/master/src)
manages the loading of external resources to ensure a fast rendering of the page.
It makes everything that comes from external resources asynchronous.
Nothing in the page can block anything from rendering.
Everything is sandboxed.

AMP JS calculates the layout of every element on a page
before any resources are loaded.
Pages load and there’s no re-layout when the images load.
AMP JS enforces limitations by design.
AMP HTML pages can’t have user-authored JS,
they can’t call out to external stylesheets. 

AMP JS only loads what’s needed.
Images and ads are only downloaded
if and when they are likely to be seen by the user above the fold,
or if the user is likely to quickly engage with them.
Learn more about [how AMP JS speeds up performance](/docs/get_started/technical_overview.html).

## AMP CDN

The AMP CDN is a proxy-based CDN for delivering all valid AMP documents.
It fetches AMP HTML pages, caches them, and improves page performance automatically.
When using the AMP CDN, the document, all JS files and all images load
from the same origin that is using
[HTTP 2.0](https://http2.github.io/) for maximum efficiency.

AMP’s CDN also comes with a built-in 
[validation system](https://github.com/ampproject/amphtml/tree/master/validator)
which says the page works, it’s guaranteed to work,
and it’s not dependent on external resources.
The validation system runs a series of assertions
confirming the page’s markup meets the AMP HTML specification. 

Validation errors are logged to the browser’s console when the page is rendered,
allowing you to see how complex changes in your code
might impact performance and user experience.

Learn more about [testing your AMP HTML pages](/docs/guides/validate.html).
