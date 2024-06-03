---
$title: Adding carousels
$order: 3
description: 'Another common feature in mobile pages is a carousel. You can easily add carousels to AMP pages by using the amp-carousel component.'
---

Another common feature in mobile pages is a carousel.  You can easily add carousels to AMP pages by using the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) component. Let’s start with a simple example, such as a carousel of images.

## Simple image carousel

Remember to include the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) component library by **adding** the following JavaScript request to the `<head>` tag of your document:

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
```

Next, let's embed a simple carousel of images with a responsive layout and a predefined width and height. **Add** the following to your page:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel" >
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Refresh** your page and you should see a carousel:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Simple images carousel') }}

The [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) component can be configured in a variety of ways.  Let's change the UI to show only a single image at a time and make the layout of the carousel responsive.

To do this, first **change** the `type` of the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) from `carousel` to `slides`, **change** the `layout` to `responsive` and **set** the `width` to 300 (ensuring it has both a `height` and `width` defined).  **Add** the `"layout=responsive"` attribute to the [`amp-img`](../../../../documentation/components/reference/amp-img.md) children of the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

**Reload** your page. Now, instead of a scrolling list of elements you’ll see one element at a time. Try **swiping** horizontally to move through the elements. If you swipe to the third element you won’t be able to swipe any further.

Next, **add** the `loop` attribute. **Refresh** the page and try swiping to the left immediately. The carousel loops endlessly.

Lastly, let’s make this carousel autoplay at a rate of every 2 seconds. **Add** the `autoplay` attribute and the `delay` attribute with a value of `2000` (e.g., `delay="2000"`) to the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

Your final result should look something like this:

```html
<amp-carousel layout="responsive" width="300" height="168" type="slides" autoplay delay="2000" loop>
  <amp-img src="mountains-1.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168" layout="responsive"></amp-img>
</amp-carousel>
```

**Refresh** the page and give it a spin!

[tip type="note"]
**NOTE –**  You might have noticed that when the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) had the `carousel` type we used the `fixed-height` layout type.  The supported layout types for the `carousel` type are limited; for example the `carousel` type does not support `responsive` layout.  As the name implies, fixed-height elements take the space available to them, but keep the height unchanged. For fixed-height elements, you must define the `height` attribute, while the `width` attribute should either be `auto` or not set.
[/tip]

## Mixed carousel content

Image carousels are great but what if we want more complex content to appear in our carousel? Let’s try mixing things up a little by placing an ad, some text, and an image all in a single carousel. Can [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) really handle such a mixture all at once? Absolutely!

First, let’s **add** this style to your `<style amp-custom>` to ensure the [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) and [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) components work together safely:

```css
amp-fit-text {
    white-space: normal;
}
```

Now, **replace** your simple carousel with this:

```html
<amp-carousel layout="fixed-height" height="250" type="carousel" >
    <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

    <amp-ad width="300" height="250"
      type="doubleclick"
      data-slot="/35096353/amptesting/image/static">
        <div placeholder>This ad is still loading.</div>
    </amp-ad>

    <amp-fit-text width="300" height="250" layout="fixed">
        Big, bold article quote goes here.
    </amp-fit-text>
</amp-carousel>
```

**Refresh** the page and you should see something like this:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='A carousel of mixed content') }}

To learn more, see the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) component reference documentation.

[tip type="note"]
**NOTE –**  In our last example you may have noticed the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component included a child `div` element with the `placeholder` attribute. Earlier in the tutorial, we encountered a similar scenario with [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) using a `fallback`. What’s the difference between placeholder and fallback? `Fallback` elements appear when the parent element fails to load, i.e. if there was no ad available. `placeholder` elements appear in place of the parent element, while it is loading. In a sense, these elements bookend the loading process of the parent element. You can learn more in [Placeholders & fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) guide.
[/tip]
