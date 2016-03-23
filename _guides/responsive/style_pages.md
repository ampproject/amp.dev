---
layout: page
title: How to Style Your Pages
order: 0
---
Like all web pages, AMP pages are styled with CSS,
but you can’t reference external stylesheets
(with the exception of [custom fonts](#the-custom-fonts-exception))
and inline style attributes aren’t allowed.
Also, certain style properties related to animations have been disallowed
due to performance implications,
and the embedded style tag must be in the `<head>` of the page.

These different kinds of limitations are there to improve the performance of your pages,
but can be overwhelming at first.
When in doubt,
always test your styles using the [AMP validator](/docs/guides/validate.html).

Even though inline stylesheets add bytes to every page,
the saved round trip request to another external file would be even slower.
Having your styles in the `<head>` of the page effectively means that
all your CSS becomes critical CSS that is loaded before the rest of the page is loaded,
so only include what you need.

Read on to learn how to style your AMP pages:

{% include toc.html %}

Learn more about critical CSS in this article,
[Understanding Critical CSS](http://www.smashingmagazine.com/2015/08/understanding-critical-css/).

## Add styles to a page

Add any styles to an AMP page using a single `<style amp-custom>` tag
in the head of the document.
For example:

{% highlight html %}
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html" >
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>Hello World!</body>
</html>
{% endhighlight %}

**Important Note:**
Make sure there’s only one of these style tags on your page,
as more than one isn’t allowed in AMP.

## Style AMP components

AMP components come with default styles
to make authoring responsive pages reasonably easy.
These styles are defined in the
[`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css).
You can change the default styles with class or element selectors in
`<style amp-custom>` using common CSS properties.
For example:

{% highlight html %}
<!doctype html>
<html ⚡>
  <head>
    <style amp-custom>
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
  </head>

  <body>
    <amp-img src="https://placekitten.com/g/200/300" width=200 height=300>
    </amp-img>

    <amp-img
        class="grey-placeholder"
        src="https://placekitten.com/g/500/300"
        width=500
        height=300>
    </amp-img>
  </body>
</html>
{% endhighlight %}

AMP HTML components that are more complex and nested,
such as [`amp-iframe`](/docs/reference/extended/amp-iframe.html),
may define their own custom children that maybe styled separately,
for example, iframe's `overflow` element.
These custom children are typically defined either via special attribute names
such as `placeholder` or `overflow` or AMP class names.
For example:

{% highlight html %}
<!doctype html>
<html ⚡>
  <head>
    <style amp-custom>
      .my-frame > [overflow] {
        background: green;
        opacity: 50%;
      }
    </style>
  </head>

  <body>
    <amp-iframe class="my-frame" width=300 height=300
        layout="responsive"
        sandbox="allow-scripts"
        resizable
        src="https://foo.com/iframe">
      <div overflow>Read more!</div>
    </amp-iframe>
  </body>
{% endhighlight %}

Remember, inline `style` attributes are not allowed in AMP pages.

## Use CSS preprocessors

The generated output of preprocessors works just as well in AMP as any other web page.
For example, the [ampproject.org](https://www.ampproject.org/) site uses
[Sass](http://sass-lang.com/).
(We use [Jekyll](https://jekyllrb.com/) to build the static AMP pages
that make up the [ampproject.org](https://www.ampproject.org/) site.)

When using preprocessors,
pay special attention to what you include; load only what your pages use.
For example, the
[head.html](https://github.com/ampproject/docs/blob/master/_includes/head.html)
includes all required AMP mark-up and the CSS from the `*.scss` source files.
It also includes the custom element script for
[`amp-youtube`](/docs/reference/extended/amp-youtube.html),
so that many pages across the site can include embedded youtube videos.

{% highlight html %} {% raw %}
<head>
  <meta charset="utf-8">
  <title>{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}</title>
  <link rel="canonical" href="{{ page.url | replace:'index.html','' | prepend: site.baseurl | prepend: site.url }}">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

  <meta property="og:description" content="{% if page.excerpt %}{{ page.excerpt | strip_html | strip_newlines | truncate: 160 }}{% else %}{{ site.description }}{% endif %}">
  <meta name="description" content="{% if page.excerpt %}{{ page.excerpt | strip_html | strip_newlines | truncate: 160 }}{% else %}{{ site.description }}{% endif %}">

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
 <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <style amp-custom>{% capture include_to_sassify %}{% include amp-custom.scss %}{% endcapture %}
    {{ include_to_sassify | scssify }}    </style>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700">
</head>
{% endraw %} {% endhighlight html %}

To see how the above translates into formatted AMP HTML,
view the source for any page in [ampproject.org](https://www.ampproject.org/).
(In Chrome, right-click and `View Page Source`.)

## Disallowed styles

The following styles aren’t allowed in AMP pages:

<table>
  <thead>
    <tr>
      <th data-th="Banned style">Banned style</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Inline style attributes</td>
      <td data-th="Description">All styles must be defined in the <code>&lt;head&gt;</code> of the page,
      	within a <code>&lt;style amp-custom&gt;</code> tag.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!</code>important qualifier </td>
      <td data-th="Description">Usage is not allowed.
      This is a necessary requirement to enable AMP to enforce its element sizing rules.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description">Disallowed with the exception of <a href="#the-custom-fonts-exception">custom fonts</a>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code> (universal selector)</td>
      <td data-th="Description">Negative performance implications and could be used
      to circumvent other selector restrictions.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">Could be used to simulate the universal selector.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Pseudo-selectors, pseudo-classes, and pseudo-elements</td>
      <td data-th="Description">Pseudo-selectors, pseudo-classes and pseudo-elements are only allowed
      in selectors that contain tag names and those tag names must not start with <code>amp-</code>.
      Example OK: <code>a:hover, div:last-of-type</code>
      Example not OK: <code>amp-img:hover, amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>-amp-</code> class and <code>i-amp-</code> tag names</td>
      <td data-th="Description">Class names, in author stylesheets, may not start with the string <code>-amp-</code>. These are reserved for internal use by the AMP runtime. It follows, that the user's stylesheet may not reference CSS selectors for <code>-amp-</code> classes and <code>i-amp</code> tags.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>behavior</code>, <code>-moz-binding</code></td>
      <td data-th="Description">These properties are not allowed
      for security reasons.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>filter</code></td>
      <td data-th="Description">Blacklisted due to performance concerns.</td>
    </tr>
  </tbody>
</table>

### The custom fonts exception

AMP pages can’t include external stylesheets, with the exception of custom fonts.
The 2 supported methods for referencing custom fonts are
link tags pointing to white-listed font providers and `@font-face` inclusion.

Font providers can only be whitelisted
if they support CSS-only integrations and serve over HTTPS.
Currently, only these origins are whitelisted
and allowed for font serving via link tags:

* [https://fast.fonts.net](https://fast.fonts.net)
* [https://fonts.googleapis.com](https://fonts.googleapis.com)

Example link tag pointing to the whitelisted font provider, Google Fonts:

{% highlight html %}
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
{% endhighlight html %}

Alternatively, you can use [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face).
Fonts included via `@font-face` must be fetched
via the HTTP or HTTPS scheme.

### White-listed transition and animation properties

AMP only allows transitions and animations of properties
that can be GPU accelerated in common browsers.
The AMP project currently whitelists `opacity`, `transform`,
and `-vendorPrefix-transform`.

In the following examples, `<property>` needs to be in the whitelist:

* `transition <property> (Also -vendorPrefix-transition)`
* @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

The `overflow` property (and `overflow-y`, `overflow-x`)
may not be styled as “auto” or “scroll”.
No user-defined element in an AMP document may have a scrollbar.

## Validate your CSS

Use the AMP validator to test that your CSS is valid.
The validator confirms that your page’s CSS doesn’t exceed 50,000 bytes limit.
It will also check for disallowed styles.

Example error in console for page with CSS that exceeds the 50,000 bytes limit:

<amp-img src="/docs/assets/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Learn more about how to [validate your AMP pages](/docs/guides/validate.html),
including how to track down style errors and fix them.

