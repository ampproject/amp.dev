---
$title: Supported CSS
description: Like all web pages, AMP pages are styled with CSS, but you can't reference external stylesheets with the exception of custom fonts. Also certain styles are disallowed ...
formats:
  - websites
  - email
  - ads
  - stories
author: Meggin
contributors:
  - pbakaus
  - CrystalOnScript
  - bpaduch
  - choumx
---

[filter formats="email"]
Note: AMP for Email specifies additional CSS constraints which are described in
[AMP for Email Supported CSS](../../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md).
[/filter]

Like all web pages, AMP pages are styled with CSS,
but you can’t reference external stylesheets
(with the exception of [custom fonts](#the-custom-fonts-exception)).
Also certain styles are disallowed due to performance implications.

Styles may live in the head of the document or as inline `style` attributes
(see [Add styles to a page](index.md#add-styles-to-a-page)).
But you can use CSS preprocessors and templating to build static pages
to better manage your content.

[tip type="note"]
**NOTE –**  AMP components come with default styles to make authoring responsive pages reasonably easy. These styles are defined in the [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css).
[/tip]

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
      <td data-th="Banned style"><code>!important</code> qualifier </td>
      <td data-th="Description">Use and reference to <code>!important</code> is not allowed.
      This is a necessary requirement to enable AMP to enforce its element sizing rules.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description">Disallowed with the exception of <a href="#the-custom-fonts-exception">custom fonts</a>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>i-amphtml-</code> class and <code>i-amphtml-</code> tag names.</td>
      <td data-th="Description">The validator disallows class and tags names with the following regex `(^|\W)i-amphtml-`. These are reserved for internal use by the AMP framework. It follows, that the user's stylesheet may not reference CSS selectors for <code>i-amphtml-</code> classes and tags.</td>
    </tr>
  </tbody>
</table>

## Performance recommendations

These allowed styles should restrict values to the following for an optimal performance:

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

## The custom fonts exception <a name="the-custom-fonts-exception"></a>

AMP pages can’t include external stylesheets, with the exception of custom fonts.

[tip type="read-on"]
**READ ON –** Learn more about [custom fonts in AMP](custom_fonts.md).
[/tip]

## Using CSS preprocessors <a name="using-css-preprocessors"></a>

The generated output of preprocessors works just as well in AMP as any other web page.
For example, the [amp.dev](https://amp.dev/) site uses
[Sass](http://sass-lang.com/).
(We use [Grow](http://grow.io/) to build the static AMP pages
that make up the [amp.dev](https://amp.dev/) site.)

When using preprocessors,
pay special attention to what you include; load only what your pages use.
For example, the
[head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html)
includes all required AMP mark-up and the inlined CSS from the `*.scss` source files.
It also includes the custom element script for
[`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md), among others,
so that many pages across the site can include embedded youtube videos.

[sourcecode:html]{% raw %}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>AMP Project</title>
  <link rel="icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
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
view the source for any page in [amp.dev](https://amp.dev/).
(In Chrome, right-click and `View Page Source`.)
