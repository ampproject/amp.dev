---
$title: Improving the interactivity
$order: 2
description: 'The starter code provides a pretty bare user experience. There are a couple ways we can improve it - Add an indicator that displays the ...'
---

The starter code provides a pretty bare user experience. There are a couple ways we can improve it:

- Add an indicator that displays the current slide and total number of slides.
- When a user selects a different shirt color, change the image carousel to show images of shirts in the selected color.

Prior to the introduction of the [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) component, adding features like these weren't possible. Let's get a hands-on experience with [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) and add these new features to our sample code!

## Install the `amp-bind` component

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) is an AMP component that affords custom interactivity via data binding and JS-like expressions. To use [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), you must install it in the page.

Open the [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) file, and add the following script to the list of AMP components in the `<head>` section of the page:

```html
<script async custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```

## Add a slide indicator

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) works by binding element attributes to custom expressions. These expressions can reference the "state" (mutable JSON data). We can initialize this state through the [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) component included with [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

### Initialize the slide state

Let's initialize a state variable to keep track of the index of the currently displayed slide in the image carousel. Open [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) and add the following to the top of the `<body>` of the page (before the `<header>`):

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

The data within [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) elements are accessible by their associated ID. For example, we can refer to this variable by the following expression fragment:

```javascript
selected.slide // Evaluates to 0.
```

### Update the slide state

Next, let's update this variable when the user changes slides on the carousel by adding the following `"on"` action to the existing [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) element:

```html
<amp-carousel type="slides" layout="fixed-height" height=250 id="carousel"
    on="slideChange:AMP.setState({selected: {slide: event.index}})">
```

Now, whenever the displayed slide for the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)  changes, the action `AMP.setState` will be called with the following argument:

```javascript
{
  selected: {
    slide: event.index
  }
}
```

The `event.index` expression evaluates to the new slide index, and the `AMP.setState()` action merges this object literal into the current state. This replaces the current value of `selected.slide` with the value of `event.index`.

[tip type="tip"]
**TIP –** `AMP.setState()` performs a deep merge of nested object literals. For more details, see the [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) documentation.
[/tip]

### Bind the indicator elements

Next, let's make use of this state variable that tracks the currently displayed slide, and create a slide indicator. Find the slide indicator element (look for `<!-- TODO: "Add a slide indicator" -->`) and add the following bindings to its children:

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]` is a binding that changes the `class` attribute and you can use it to add or remove CSS classes from any element.

**Try it out**: Refresh the page and change the slide!

By changing the slide on the carousel, it:

1.  Triggers the `slideChange event` ...
2.  Which calls the `AMP.setState` action ...
3.  Which updates the state variable `selected.slide` ...
4.  Which updates the `[class]` binding on the indicator `<span>` elements!

Nice! Now we have a working slide indicator.

[tip type="success"]

See if you can add functionality so that when a user taps on a slide's indicator dot, it updates the image carousel with the selected item. As a hint, use the `tap` event and `[slide]` binding on [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[/tip]

## Change the images in the carousel

It would be nice if we could see images of different shirt colors when we change the selected color. With [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) we can do this by binding `[src]` on the [`amp-img`](../../../../documentation/components/reference/amp-img.md) elements within the [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

### Initialize the SKU state

First, we need to initialize the state data with the image source URLs of each color shirt. Let's do this with a new [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) element:

```html
<!-- Available shirts. Maps unique string identifier to color and image URL string. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blue",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "brown",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "dark green",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "gray",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "light gray",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "navy",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "wine",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

This [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) element contains a JSON object that maps a shirt identifier string (i.e., a SKU) to the color and image URL of the corresponding shirt. A JSON array would also work here, but using an object allows us to do some more cool stuff that you'll see soon.

Now we can access the image URL via a shirt's identifier. For example, `shirts['10014'].color` evaluates to `"dark green"` and `shirts['10030'].image `returns the image URL for the `"wine"` shirt color.

### Track the selected SKU

If we add another state variable that tracks the selected SKU, we can bind an expression to the [`amp-img`](../../../../documentation/components/reference/amp-img.md) elements to update their `src` attributes when the selected SKU changes. Add a new `sku` key to the existing `amp-state#selected` element's JSON:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### Update the SKU state

Add an "on" action to the [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) that updates the `selected.sku` variable whenever a new color is selected:

```html
<amp-selector name="color"
    on="select:AMP.setState({selected: {sku: event.targetOption}})">
```

[tip type="tip"]
**TIP –** This could also be done by adding `on="tap:AMP.setState(...)` actions to each [`amp-img`](../../../../documentation/components/reference/amp-img.md) child inside the [`amp-selector`](../../../../documentation/components/reference/amp-selector.md). One of the great things about [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) is that it simplifies markup in ways like this.
[/tip]

### Bind the image elements

Then, add bindings to the [`amp-img`](../../../../documentation/components/reference/amp-img.md):

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img width=200 height=250 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=300 height=375 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=400 height=500 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
```

[tip type="note"]
**NOTE –**  In practice, each image in the carousel would likely have a different `src`. This could be done by replacing the single image with an array of images. For simplicity, this tutorial uses a single image at different magnifications.
[/tip]

**Try it out**: Refresh the page and select a different color for a shirt. When you do, the carousel's images are updated to show shirts of the selected color.
