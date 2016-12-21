---
$title: Common Attributes
$order: 3
---

AMP provides a set of common attributes that are extended to many AMP components (and HTML elements).  This document describes each of the following attributes:

* [fallback](#fallback)
* [heights](#heights)
* [layout](#layout)
* [media](#media)
* [noloading](#noloading)
* [on](#on)
* [placeholder](#placeholder)
* [sizes](#sizes)
* [width and height](#width-and-height)

## fallback

A fallback is a convention that allows the element to communicate to the reader that the browser does not support the element or that loading the underlying resource failed. The `fallback` attribute can be placed on any HTML element that is a direct child of an AMP element that supports fallbacks. The exact behavior with respect to the fallback is up to the element's implementation but typically the fallback element would be shown in place of the regular element.

Often used with: images, animations, audio, and videos

Example:

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive" >
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

For more information, see [Placeholders & fallbacks](https://www.ampproject.org/docs/guides/responsive/placeholders).

## heights

All AMP elements that support the `responsive` layout, also support the `heights` attribute. The value of this attribute is a sizes expression based on media expressions, similar to the [sizes attribute on `img` tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) but with two key differences:


 1. The value applies to the height, not the width of the element.
 2. Percent values are allowed. A percent value indicates the percent of the element's width. For example, a value of `80%` indicates that the height of the element will be 80% of the element's width.

{% call callout('Note', type='note') %}
When the `heights` attribute is specified along with `width` and `height`, the `layout` is defaulted to `responsive`.
{% endcall %}

Example: 

[sourcecode:html]
<amp-img src="amp.png"
    width="320" height="256"
    heights="(min-width:500px) 200px, 80%">
</amp-img>
[/sourcecode]

For more information, see [Art direction with srcset, sizes & heights](https://www.ampproject.org/docs/guides/responsive/art_direction).

## layout

AMP provides a set of [layouts](https://www.ampproject.org/docs/guides/responsive/control_layout#the-layout-attribute) that specify how an AMP component behaves in the document layout. You can specify a layout for a component by adding the `layout` attribute with one of the supported layout values for the element (see the element's documentation for what values are supported).

Example: 

[sourcecode:html]
<amp-img src="/img/amp.jpg"
    width="1080"
    height="610"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

For more information, see [Layout & Media queries](https://www.ampproject.org/docs/guides/responsive/control_layout) and the [Layout Spec](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md).

## media

All AMP elements support the `media` attribute. The value of `media` is a media query. If the query does not match, the element is not rendered and its resources and potentially its child resources will not be fetched. If the browser window changes size or orientation, the media queries are re-evaluated and elements are hidden and shown based on the new results.

Example:

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="466"
    height="355" layout="responsive"></amp-img>
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="527"
    height="193" layout="responsive"></amp-img>
[/sourcecode]

For more information, see [Layout & Media queries](https://www.ampproject.org/docs/guides/responsive/control_layout#element-media-queries).

## noloading

The `noloading` attribute indicates whether the "loading indicator" should be turned **off** for this element. Many AMP elements show a "loading indicator", which is a basic animation that shows that the element has not yet fully loaded. 

Often used with: images, animations, videos, and ads

Example: 

[sourcecode:html]
<amp-img src="card.jpg"
    noloading
    height="190"
    width="297"
    layout="responsive">
</amp-img>
[/sourcecode]

## on

The `on` attribute is used to install event handlers on elements. The events that are supported depend on the element.

Often used with: lightboxes, sidebars, live lists, and forms

Syntax:

[sourcecode:text]
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
[/sourcecode]

Example:

[sourcecode:html]
<button on="tap:my-lightbox">Open lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay">
  ...
</amp-lightbox>
[/sourcecode]

For more information, see  [Actions and Events in AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md).

## placeholder

The `placeholder` attribute indicates that the element marked with this attribute acts as a placeholder for the parent AMP element. The attribute can be placed on any HTML element that is a direct child of an AMP element that supports placeholders. By default, the placeholder is immediately shown for the AMP element, even if the AMP element's resources have not been downloaded or initialized. Once ready, the AMP element typically hides its placeholder and shows the content. The exact behavior with respect to the placeholder is up to the element's implementation.

Often used with: images, animations, videos, and ads

Example:

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

For more information, see [Placeholders & fallbacks](https://www.ampproject.org/docs/guides/responsive/placeholders).

## sizes

All AMP elements that support the `responsive` layout, also support the `sizes` attribute. The value of the `sizes` attribute is a sizes expression as described in the [sizes attribute on `img` tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), but extended to all elements, not just images.

Example:

[sourcecode:html]
<amp-img src="amp.png"
    width="400" height="300"
    layout="responsive"
    sizes="(min-width: 320px) 320px, 100vw">
</amp-img>
[/sourcecode]

For more information, see [Art direction with srcset, sizes & heights](https://www.ampproject.org/docs/guides/responsive/art_direction).

## width and height

For some [layouts](https://www.ampproject.org/docs/guides/responsive/control_layout#the-layout-attribute), AMP components must have a `width` and `height` attribute that contains an integer pixel value.

Example:

[sourcecode:html]
<amp-anim width="245"
    height="300"
    src="/img/cat.gif"
    alt="cat animation">
</amp-anim>
[/sourcecode]

For more information, see [Layout & Media queries](https://www.ampproject.org/docs/guides/responsive/control_layout) and the [Layout Spec](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md).


