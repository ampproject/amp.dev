---
$title: Supported CSS
$order: 0
toc: true
---
[TOC]

Like all web pages, AMP pages are styled with CSS,
but you can’t reference external stylesheets
(with the exception of [custom fonts](#the-custom-fonts-exception)).
Also certain styles are disallowed due to performance implications;
inline style attributes aren't allowed.

All styles must live in the head of the document
(see [Add styles to a page](/docs/guides/responsive_amp.html#add-styles-to-a-page)).
But you can use CSS preprocessors and templating to build static pages
to better manage your content.

{% call callout('Note', type='note') %}
AMP components come with default styles
to make authoring responsive pages reasonably easy.
These styles are defined in the [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css).
{% endcall %}

## Disallowed styles

The following styles aren’t allowed in AMP pages:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Banned style</th>
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
      <td data-th="Banned style"><code>!important</code> qualifier </td>
      <td data-th="Description">Usage is not allowed.
      This is a necessary requirement to enable AMP to enforce its element sizing rules.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description">Disallowed with the exception of <a href="#the-custom-fonts-exception">custom fonts</a>.</td>
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
  </tbody>
</table>

## Restricted styles

The following styles are allowed, but are restricted in terms of which values
they support:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Restricted style</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Restricted style"><code>transition</code> property</td>
      <td data-th="Description">Only GPU-accelerated properties (currently <code>opacity</code>, <code>transform</code> and <code>-vendorPrefix-transform</code>).</td>
    </tr>
    <tr>
      <td data-th="Restricted style"><code>@keyframes {...}</code></td>
      <td data-th="Description">Only GPU-accelerated properties (currently <code>opacity</code>, <code>transform</code> and <code>-vendorPrefix-transform</code>).</td>
    </tr>
  </tbody>
</table>

## The custom fonts exception

AMP pages can’t include external stylesheets, with the exception of custom fonts.

{% call callout('Read on', type='success') %}
Learn more about [custom fonts in AMP](/docs/guides/responsive/custom_fonts.html).
{% endcall %}

## Using CSS preprocessors

The generated output of preprocessors works just as well in AMP as any other web page.
For example, the [ampproject.org](https://www.ampproject.org/) site uses
[Sass](http://sass-lang.com/).
(We use [Grow](http://grow.io/) to build the static AMP pages
that make up the [ampproject.org](https://www.ampproject.org/) site.)

When using preprocessors,
pay special attention to what you include; load only what your pages use.
For example, the
[head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html)
includes all required AMP mark-up and the inlined CSS from the `*.scss` source files.
It also includes the custom element script for
[`amp-youtube`](/docs/reference/extended/amp-youtube.html), among others,
so that many pages across the site can include embedded youtube videos.

[sourcecode:html]{% raw %}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">

  <title>Accelerated Mobile Pages Project</title>
  <link rel="icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="https://www.ampproject.org{{doc.url.path}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %}[/sourcecode]

To see how the above translates into formatted AMP HTML,
view the source for any page in [ampproject.org](https://www.ampproject.org/).
(In Chrome, right-click and `View Page Source`.)
