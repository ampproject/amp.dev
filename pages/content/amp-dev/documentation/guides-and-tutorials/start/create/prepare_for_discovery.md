---
$title: Plug and play components 
$order: 4
description: 'AMP provides a huge library of components that create common widgets and unique web elements.'
author: crystalonscript
---

AMP provides a huge library of components that create common widgets and unique web elements. Such as an [accordion that collapses and expands content sections](../../../components/reference/amp-accordion.md) or a [UI control to collect and store a user’s cookie consent](../../../components/reference/amp-consent.md). For our first page, we’ll turn our single image into an image carousel using [`amp-base-carousel`](../../../components/reference/amp-base-carousel-v0.1.md).

## Import the script

Unlike `amp-img`, the `amp-base-carousel` component is an extended component. Extended component logic is not included in the base AMP JS provided by the boilerplate code discussed earlier. This helps keep AMP pages light and lean by explicitly only loading JavaScript for components a page uses.

To use the `amp-base-carousel` component, we must import its script tag. Copy the tag below and place it into the head of the document.

[tip type="note"]
You can find the import script for each component at the top of its reference documentation.
[/tip]

```html
<script async custom-element="amp-base-carousel" src="https://cdn.ampproject.org/v0/amp-base-carousel-0.1.js"></script>
```

Next, copy and paste another `<amp-img>` element under the first one, then wrap both inside `<amp-base-carousel>` tags, like below:

```html
<amp-base-carousel width="680" height="410" layout="responsive">
  <amp-img src="https://amp.dev/static/samples/img/amp.jpg" width="680" height="410" layout="responsive"></amp-img>
  <amp-img src="https://amp.dev/static/samples/img/amp.jpg" width="680" height="410" layout="responsive"></amp-img>
</amp-base-carousel>
```

## Component attributes

You may notice we have familiar attributes, `width`, `height`, and `layout` defined. Like HTML, attributes are used everywhere in AMP. But, AMP uses additional attributes to customize components’ behavior. Some are [common element attributes](../../learn/common_attributes.md) and others are special to certain components. Let's add the `loop` attribute and set it to `true` and include more images:

```html
<amp-base-carousel loop="true"  width="450" height="300" layout="responsive">
  <amp-img src="https://amp.dev/static/samples/img/amp.jpg" width="680" height="410" layout="responsive"></amp-img>
  <amp-img src="/static/inline-examples/images/image1.jpg" width="450" height="300" layout="responsive"></amp-img>
  <amp-img src="/static/inline-examples/images/image2.jpg" width="450" height="300" layout="responsive"></amp-img>
  <amp-img src="/static/inline-examples/images/image3.jpg" width="450" height="300" layout="responsive"></amp-img>
</amp-base-carousel>
```

The `loop` attribute is specific to `amp-base-carousel` and helps define its behavior. We can further customize our carousel with other attributes, such at `auto-advance`! You can view a list of attributes available to `amp-base-carousel` on its [reference page](../../../components/reference/amp-base-carousel-v0.1.md). All components reference documents list available attributes and what behaviors they configure, [see the AMP component library](../../../components/index.html).
