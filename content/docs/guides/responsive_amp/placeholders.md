---
$title: Placeholders & fallbacks
$order: 3
---
[TOC]

In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible.

Some elements will even reward you for doing it by relaxing restrictions – for example, if you provide a placeholder for [`<amp-iframe>`](/docs/reference/components/amp-iframe.html#iframe-with-placeholder), it can be used near the top of the page (which won't work without).

## Placeholders

The element marked with the `placeholder` attribute acts
as a placeholder for the parent AMP element.
If specified, a `placeholder` element must be a direct child of the AMP element.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive">
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

By default, the placeholder is immediately shown for the AMP element,
even if the AMP element's resources have not been downloaded or initialized.
Once ready, the AMP element typically hides its placeholder and shows the content.

<aside class="note">
  <strong>Note:</strong>
  <span>The placeholder doesn’t have to be an AMP element;
any HTML element can act as the placeholder.</span>
</aside>

## Fallbacks

Use the `fallback` attribute to indicate the fallback behavior
for any element the browser doesn’t support.
For example, use the `fallback` attribute to communicate to the user
that the browser doesn’t support a particular feature:

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg">
  <div fallback>
    <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

The `fallback` attribute can be set on any HTML element, not just AMP elements.
If specified, the `fallback` element must be a direct child of the AMP element.

## Hiding loading indicators

Many AMP elements are whitelisted to show a "loading indicator",
which is a basic animation that shows that the element has not yet fully loaded.
Elements can opt out of this behavior by adding the `noloading` attribute.
