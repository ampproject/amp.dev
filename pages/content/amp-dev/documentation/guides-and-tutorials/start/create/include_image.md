---
$title: Include an image
$order: 2
description: 'Most HTML tags can be used directly in AMP HTML, but certain tags, such as the <img> tag, are replaced with equivalent or slightly enhanced custom AMP HTML tags'
author: crystalonscript
---

Most HTML tags can be used directly in AMP, but certain tags, such as the `<img>` tag, must be replaced with their AMP equivalents. See [HTML tags in the specification](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/?format=websites#html-tags) for a full list.

[tip type="note"]
The AMP team is working to support native `<img>` tags on valid AMP pages. See [this GitHub issue](https://github.com/ampproject/amphtml/issues/30442) for more information and current progress.
[/tip]

We’ll add an image to our page, the AMP way, with the [`<amp-img>`](https://amp.dev/documentation/components/amp-img/?format=websites) tag. Copy and paste the code below into the `<body>`.

`<amp-img src="https://amp.dev/static/samples/img/amp.jpg" width="680" height="410"></amp-img>` 

AMP replaces certain default HTML tags for the following reasons:

*   To project the layout of the page before assets load. This ensures [layout stability](https://web.dev/cls) for a better user experience. 
*   To control network requests so that resources are lazy loaded and resources are prioritized effectively. 

## Make your image responsive

One of the powerful benefits of AMP is its [layout system](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/?format=websites). It aids in inferring an element’s size, but it also gives you new tools to control container sizes and create responsive designs. We can quickly make our image responsive by adding `layout="responsive"` to the `<amp-img>` tag. Try it yourself by updating your `amp-img` to match the code below then adjusting viewport size in the playground.

```html
<amp-img src="https://preview.amp.dev/static/samples/img/amp.jpg" width="680" height="410" layout="responsive"></amp-img>
```

Our image now fits snugly in our viewport and grows or shrinks when the viewport size changes!

## Modify layout

While non-AMP pages may almost exclusively use CSS to layout elements, AMP enforces stricter rules to avoid content layout shift and other performance reasons. All AMP components are required to have an explicit dimensions declared in the HTML. To see an example, remove the `width` attribute from the `<amp-img>`.  

The playground will display a validation error! But, don’t fret, there are several ways we can fix this. One way is to add the `width` attribute back, but another is to change the defined `layout` attribute. Try updating `“responsive”` to `“fixed-height”`. 

```
<amp-img src="https://preview.amp.dev/static/samples/img/amp.jpg" height="410" layout="fixed-height"></amp-img>
```

And there, our validation error is gone! This type of flexibility in layout lets us work with what we know, such as a pre-determined hight but not the width, while still guaranteeing a good experience for end users! Learn all about how AMP renders and layouts a page and how you can modify the layout in [Layout & Media queries](https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout/?format=websites).
