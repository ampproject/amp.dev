---
$title: Include an image
$order: 2
description: 'Most HTML tags can be used directly in AMP HTML, but certain tags, such as the <img> tag, are replaced with equivalent or slightly enhanced custom AMP HTML tags'
author: crystalonscript
---

Most HTML tags can be used directly in AMP, but certain tags, such as the `<img>` tag, must be replaced with their AMP equivalents. See [HTML tags in the specification](../../learn/spec/amphtml.md) for a full list.

We’ll add an image to our page, the AMP way, with the [`<amp-img>`](../../../components/reference/amp-img.md) tag. Copy and paste the code below into the `<body>`.

```html
<amp-img src="https://source.unsplash.com/random/600x400" width="600" height="400"></amp-img>
``` 

[tip type="note"]

AMP replaces certain default HTML tags for the following reasons:

*   To project the layout of the page before assets load. This ensures [layout stability](https://web.dev/cls) for a better user experience. 
*   To control network requests so that resources are lazy loaded and resources are prioritized effectively. 

The AMP team is working to support native `<img>` tags on valid AMP pages. See [this GitHub issue](https://github.com/ampproject/amphtml/issues/30442) for more information and current progress.

[/tip]

## Make your image responsive

One of the powerful benefits of AMP is its [layout system](../../learn/amp-html-layout/index.md). AMP's layout system makes it very easy to implement responsive images that automatically adjust their size to the available space on a page. The best thing is: it does this in a way that ensures layout stability and [avoids content jumps](https://web.dev/cls/). We can quickly make our image responsive by adding `layout="responsive"` to the `<amp-img>` tag. Try it yourself by updating your `amp-img` to match the code below then change the preview window size in the playground.

```html
<amp-img src="https://source.unsplash.com/random/600x400" width="600" height="400" layout="responsive"></amp-img>
```

Our image now fits snugly in our viewport and grows or shrinks when the viewport size changes!

## Modify layout

While non-AMP pages may almost exclusively use CSS to layout elements, AMP enforces stricter rules to avoid content layout shift and other performance reasons. AMP layouts require an explicit dimensions declared in the HTML, but which ones depends on the layout applied. For example, our image has the `responsive` layout, which requires `width` and `height`. If you remove the `width` attribute from the `<amp-img>` the playground will display a validation error! But, don’t fret, there are several ways we can fix this! One way is to add the `width` attribute back, but another is to change the defined `layout` attribute. Try updating `“responsive”` to `“fixed-height”`. 

```html
<amp-img src="https://source.unsplash.com/random/600x400" height="400" layout="fixed-height"></amp-img>
```

And there, our validation error is gone! This type of flexibility in layout lets us work with what we know, such as a pre-determined height but not the width, while still guaranteeing a good experience for end users! View all the available layouts in [Demonstrating AMP layouts](../../learn/amp-html-layout/layouts_demonstrated.html) and learn about how AMP renders and layouts a page and how you can modify the layout in [Layout & Media queries](../../develop/style_and_layout/control_layout.md).
