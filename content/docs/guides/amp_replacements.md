---
$title: Include images & video
$order: 1
$category: Develop
toc: true
components:
  - iframe
---

[TOC]

Like on a normal HTML page, AMP allows you to embed **images**, **video** and **audio**
content. Learn what's different about the AMP equivalents and learn how to
include them in your pages.

## Why not &lt;img>, &lt;video> and &lt;audio>?

AMP doesn't support the default HTML counterparts to displaying media, like `<img>`.
We provide equivalent components for the following reasons:

* We need to understand layout of the page before assets load, crucial
  to [support first-viewport preloading](/learn/about-how/#size-all-resources-statically)
* We need to control network requests to [lazy load and prioritize resources
effectively](/learn/about-how/#prioritize-resource-loading)

{% call callout('Caution', type='caution') %}
While they're not supported, they *will* render, but AMP won't [validate your pages](/docs/guides/validate.html) and you won't get all the benefits AMP provides.
{% endcall %}

## Images

Include an image in your page
using the [`amp-img`](/docs/reference/components/amp-img.html) element, like so:

<!--embedded example - fixed size image -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.fixed.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

In this most basic example, the image will display with the specified fixed
height and width. At minimum, an explicit width and height needs to be set.

#### Displaying images when JavaScript is disabled

As `<amp-img>` relies on JavaScript, if the user chooses to disable scripts, images won't display.  In this case, you should provide a fallback to the image using `<img>` and `<noscript>`, like so:

<!--embedded example - img with noscript -->
<div>
<amp-iframe height="215"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.noscript.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

### Advanced layouts

AMP makes it much easier than with standard CSS/HTML to create fully responsive
images. In its most basic form, all you have to do is to add `layout="responsive"`:

<!--embedded example - basic responsive image -->
<div>
<amp-iframe height="193"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Read on', type='success') %}
Learn more about [advanced layout techniques](/docs/guides/responsive/control_layout.html).
{% endcall %}

### Behavior and placeholders

The AMP HTML runtime can effectively manage image resources,
choosing to delay or prioritize resource loading
based on the viewport position, system resources, connection bandwidth, or other factors.

{% call callout('Read on', type='success') %}
Learn how to [provide fallbacks and placeholders for images](/docs/guides/responsive/placeholders.html).
{% endcall %}

## Animated images

The [`amp-anim`](/docs/reference/components/amp-anim.html) element is very similar to the `amp-img` element,
and provides additional functionality to manage loading and playing of animated images such as GIFs.

<!--embedded amp-anim basic example -->
<div>
<amp-iframe height="253"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Note', type='note') %}
Include `<script async custom-element="amp-anim"
  src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` in the head of your page to use this component.
{% endcall %}

## Video

Include a video in your page
using the [`amp-video`](/docs/reference/components/amp-video.html) element.

Only use this element for direct HTML5 video file embeds.
The element loads the video resource specified by the `src` attribute lazily,
at a time determined by AMP.

Include a placeholder before the video starts, and a fallback,
if the browser doesn't support HTML5 video, for example:

<!--embedded video example  -->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Audio

Include an audio resource in your page,
using the [`amp-audio`](/docs/reference/components/amp-audio.html) element.

Only use this element for direct HTML5 audio file embeds.
Like all embedded external resources in an AMP page,
the element loads the audio resource specified by the `src` attribute lazily,
at a time determined by AMP.

Include a placeholder before the audio starts, and a fallback,
if the browser doesn't support HTML5 audio, for example:

<!--embedded audio example  -->
<div>
<amp-iframe height="314"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampaudio.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Note', type='note') %}
Include `<script async custom-element="amp-audio"
  src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` in the head of your page to use this component.
{% endcall %}
