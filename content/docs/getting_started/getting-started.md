---
$title: Quickstart
$order: 0
toc: true
---
[TOC]

This is a quickstart guide to get you up and running with AMP.

For more detailed instructions, visit the [Create your first AMP page](/docs/tutorials/create.html) tutorial.

{% call callout('Use HTTPS', type='note') %}
When creating AMP pages and content, you should strongly consider using the HTTPS protocol (vs. HTTP). Although, HTTPS is not required for the AMP document itself or for images and fonts, there are many AMP features that require HTTPS (e.g., video, iframes, and more). To ensure your AMP pages take full advantage of all AMP features, use the HTTPS protocol.  You can learn more about HTTPS in ["Why HTTPS Matters"](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).
{% endcall %}


### Step 1: Get the AMP HTML template

This is the basic HTML you need for an AMP page:

```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello AMP world</title>
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Hello AMP World!</h1>
  </body>
</html>
```

{% call callout('Read on', type='read') %}
Learn more about the [required markup](/docs/reference/spec.html#required-markup) for AMP pages.
{% endcall %}

### Step 2: Add components to your page

Build up your AMP page by adding components, like an image:

```html
<amp-img src="https://www.ampproject.org/examples/images/amp.jpg"
  width="900" height="508" layout="responsive"></amp-img>
```

Or a YouTube video:

```html
<!-- this script is required for amp-youtube and must be in the <head> section  -->
<script async custom-element="amp-youtube"
      src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>

...

<amp-youtube data-videoid="9Cfxm7cikMY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
```

And much more. See the list of [available components in AMP](/docs/reference/components.html).

### Step 3: Style your elements

To style elements on your AMP page, add CSS to an inline stylesheet named `<style amp-custom>` in the `<head>` of your document:

```html
<style amp-custom>
  amp-img {
    margin: 0.5em;
  }
  body {
    max-width: 900px;
  }
</style>
```

{% call callout('Read on', type='read') %}
Learn more about the [supported CSS](/docs/guides/responsive/style_pages.html) for AMP pages.
{% endcall %}

### Step 4: Validate your AMP HTML

Make sure your AMP pages are valid AMP HTML by verifying the pages with the [AMP Validator](https://validator.ampproject.org/).

For other validation tools that you can use, see [Validate AMP pages](/docs/guides/validate.html).

### Next Steps

To dive further into the basics of an AMP page, visit the [Create your first AMP page](/docs/tutorials/create.html) tutorial.

Here are other resources to help your experience:

* [Make your page discoverable](/docs/guides/discovery.html)
* [Add analytics to your page](/docs/guides/analytics_amp.html)
* [Improve user engagement](/docs/guides/engagement.html)
* Live demos at [AMP BY Example](https://ampbyexample.com/)
