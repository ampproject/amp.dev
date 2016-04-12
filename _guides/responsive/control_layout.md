---
layout: page
title: Supported Layouts
order: 1
---

Make your elements responsive;
include `layout=responsive`.

{% include toc.html %}

## Supported values for layout attribute

By default,
use responsive layouts.

Full list of supported values for the layout attribute are:

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-twenty">Layout type</th>
      <th data-th="Width/height required" class="col-twenty">Width/height required</th>
      <th data-th="Behavior">Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>nodisplay</code></td>
      <td data-th="Description" class="col-twenty">No</td>
      <td data-th="Behavior">Element not displayed. This layout can be applied to every AMP element. The component takes up zero space on the screen as if its display style was none. It’s assumed that the element can display itself on user action, for example, <a href="/docs/reference/extended/amp-lightbox.html"><code>amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed</code></td>
      <td data-th="Description" class="col-twenty">Yes</td>
      <td data-th="Behavior">Element has a fixed width and height with no responsiveness supported. The only exceptions are <a href="/docs/reference/amp-pixel.html"><code>amp-pixel</code></a> and <a href="/docs/reference/extended/amp-audio.html"><code>amp-audio</code></a> elements.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>responsive</code></td>
      <td data-th="Description" class="col-twenty">Yes</td>
      <td data-th="Behavior">Element sized to the width of its container element and resizes its height automatically to the aspect ratio given by width and height attributes. This layout works very well for most of AMP elements, including <a href="/docs/reference/amp-img.html"><code>amp-img</code></a>, <a href="/docs/reference/amp-video.html"><code>amp-video</code></a>. Available space depends on the parent element and can also be customized using <code>max-width</code> CSS.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed-height</code></td>
      <td data-th="Description" class="col-twenty">Height only</td>
      <td data-th="Behavior">Element takes the space available to it but keeps the height unchanged. This layout works well for elements such as <a href="/docs/reference/extended/amp-carousel.html"><code>amp-carousel</code></a> that involves content positioned horizontally. The <code>width</code> attribute must not be present or must be equal to <code>auto</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fill</code></td>
      <td data-th="Description" class="col-twenty">No</td>
      <td data-th="Behavior">Element takes the space available to it, both width and height. In other words, the layout of a fill element matches its parent.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>container</code></td>
      <td data-th="Description" class="col-twenty">No</td>
      <td data-th="Behavior">Element lets its children define its size, much like a normal HTML <code>div</code>. The component is assumed to not have specific layout itself but only act as a container. Its children are rendered immediately.</td>
    </tr>
  </tbody>
</table>

### What if width and height are undefined?

In a few cases if `width` or `height` are not specified,
the AMP runtime can default these values as the following:

* [`amp-pixel`](/docs/reference/amp-pixel.html): Both width and height are defaulted to 0.
* [`amp-audio`](/docs/reference/extended/amp-audio.html): The default width and height are inferred from browser.

### What if the layout attribute isn’t defined?

The layout behavior is determined as follows:

* If `height` is present and `width` is absent or equals to `auto`, `fixed-height` layout is assumed.
* If `width` or `height` attributes are present along with the `sizes` attribute, `responsive` layout is assumed.
* If `width` or `height` attributes are present, `fixed` layout is assumed.
* If `width` and `height` are not present, `container` layout is assumed.

## Using @media and media

Use [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)
to control how the page layout looks and behaves, as you would do on any other website.
When the browser window changes size or orientation,
the media queries are re-evaluated and elements are hidden and shown
based on the new results.

Learn more about controlling layout by applying media queries in
[Use CSS media queries for responsiveness](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en).

One extra feature for responsive design available in AMP is the `media` attribute.
This attribute can be used on every AMP element;
it works similar to media queries in your global stylesheet,
but only impacts the specific element on a single page.

For example, here we have 2 images with mutually exclusive media queries.

{% highlight html %}
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
{% endhighlight %}

Depending on the screen width, one or the other will be fetched and rendered.

{% highlight html %}
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
{% endhighlight %}

## Using srcset and sizes

Use the `srcset` attribute to control an element’s assets
based on varying media expressions.
In particular, use it for all [`amp-img`](/docs/reference/amp-img.html) tags
to specify which image assets to use based on varying screen sizes. 

In this simple example,
`srcset` specifies which image to use based on the screen width.
The `w` descriptor tells the browser the width
of each image in the list:

{% highlight html %}
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
{% endhighlight %}

**Note:** AMP supports the `w` descriptor across all browsers.

Learn more about creating responsive images using `srcset`
in [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now).

You can also use the `sizes` attribute along with `srcset`.
The `sizes` attribute describes how to calculate the element size
based on any media expression.
Based on the element’s calculated size,
the user agent selects the most relative source supplied by the `srcset` attribute. 

Consider the following example:

{% highlight html %}
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
{% endhighlight %}

The `sizes` attribute defines the element’s width to be 50% the size of the viewport
when the viewport is 650px or more.
For example, if the viewport is 800px,
the element’s width is set to 400px.
The browser then selects the `srcset` resource relative to 400px,
assuming the device pixel ratio is 1,
which in this instance is `narrow.jpg` (320px). 

**Important:** When sizes attribute is specified along with width and height,
layout defaults to `responsive`.

Learn more about how `sizes` and `srcset` attributes compare
to media queries in this
[Srcset and sizes](https://ericportis.com/posts/2014/srcset-sizes/) blog post.

## Include placeholders and fallbacks

### placeholder

The element marked with the `placeholder` attribute acts
as a placeholder for the parent AMP element.
If specified, a `placeholder` element must be a direct child of the AMP element.

{% highlight html %}
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
{% endhighlight %}

By default, the placeholder is immediately shown for the AMP element,
even if the AMP element's resources have not been downloaded or initialized.
Once ready, the AMP element typically hides its placeholder and shows the content. 

**Note:** The placeholder doesn’t have to be an AMP element;
any HTML element can act as the placeholder.

### fallback

Use the `fallback` attribute to indicate the fallback behavior
for any element the browser doesn’t support.
For example, use the `fallback` attribute to communicate to the user
that the browser doesn’t support a particular feature:

{% highlight html %}
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
{% endhighlight %}

The `fallback` attribute can be set on any HTML element, not just AMP elements.
If specified, the `fallback` element must be a direct child of the AMP element.

### noloading

Many AMP elements are whitelisted to show a "loading indicator",
which is a basic animation that shows that the element has not yet fully loaded.
Elements can opt out of this behavior by adding the `noloading` attribute.
