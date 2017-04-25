---
$title: Include Images & Video
$order: 1
$category: Develop

toc: true
---

[TOC]

Like on a normal HTML page, AMP allows you to embed **images**, **video** and **audio**
content. Learn what's different about the AMP equivalents and learn how to
include them in your pages.

## Why not `<img>`, `<video>` and `<audio>`?

AMP doesn't support the default HTML counterparts to displaying media, like `<img>`.
We provide equivalent components for the following reasons:

* We need to understand layout of the page before assets load, crucial
  to [support first-viewport preloading](/learn/about-how/#size-all-resources-statically)
* We need to control network requests to [lazy load and prioritize resources
effectively](/learn/about-how/#prioritize-resource-loading)

{% call callout('Caution', type='caution') %}
While they're not supported, they *will* render, but AMP won't [validate your pages](/docs/guides/debug/validate.html) and you won't get all the benefits AMP provides.
{% endcall %}

## Images

Include an image in your page
using the [`amp-img`](/docs/reference/components/media/amp-img.html) element, like so:

[sourcecode:html]
<amp-img src="fixed.jpg" width="264" height="96"></amp-img>
[/sourcecode]

In this most basic example, the image will display with the specified fixed
height and width. At minimum, an explicit width and height needs to be set.

#### Displaying images when JavaScript is disabled

As `<amp-img>` relies on JavaScript, if the user chooses to disable scripts, images won't display.  In this case, you should provide a fallback to the image using `<img>` and `<noscript>`, like so:

[sourcecode:html]
<amp-img src="fixed.jpg" width="264" height="96">
  <noscript>
    <img src="fixed.jpg" width="264" height="96" />
  </noscript>
</amp-img>
[/sourcecode]

### Advanced layouts

AMP makes it much easier than with standard CSS/HTML to create fully responsive
images. In its most basic form, all you have to do is to add `layout="responsive"`:

[sourcecode:html]
<amp-img src="responsive.jpg" width="527" height="193" layout="responsive">
</amp-img>
[/sourcecode]

{% call callout('Read on', type='success') %}
Learn more about [advanced layout techniques](/docs/guides/author-develop/responsive/control_layout.html).
{% endcall %}

### Behavior and placeholders

The AMP HTML runtime can effectively manage image resources,
choosing to delay or prioritize resource loading
based on the viewport position, system resources, connection bandwidth, or other factors.

{% call callout('Read on', type='success') %}
Learn how to [provide fallbacks and placeholders for images](/docs/guides/author-develop/responsive/placeholders.html).
{% endcall %}

## Animated images

The [`amp-anim`](/docs/reference/components/media/amp-anim.html) element is very similar to the `amp-img` element,
and provides additional functionality to manage loading and playing of animated images such as GIFs.

[sourcecode:html]
<amp-anim width="400" height="300" src="my-gif.gif">
  <amp-img placeholder width="400" height="300" src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
[/sourcecode]

{% call callout('Note', type='note') %}
Include `<script async custom-element="amp-anim"
  src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` in the head of your page to use this component.
{% endcall %}

## Video

Include a video in your page
using the [`amp-video`](/docs/reference/components/media/amp-video.html) element.

Only use this element for direct HTML5 video file embeds.
The element loads the video resource specified by the `src` attribute lazily,
at a time determined by AMP.

Include a placeholder before the video starts, and a fallback,
if the browser doesn't support HTML5 video, for example:

[sourcecode:html]
<amp-video width="400" height="300" src="https://yourhost.com/videos/myvideo.mp4"
  poster="myvideo-poster.jpg">
  <div fallback>
    <p>Your browser doesn’t support HTML5 video</p>
  </div>
</amp-video>
[/sourcecode]

## Audio

Include an audio resource in your page,
using the [`amp-audio`](/docs/reference/components/media/amp-audio.html) element.

Only use this element for direct HTML5 audio file embeds.
Like all embedded external resources in an AMP page,
the element loads the audio resource specified by the `src` attribute lazily,
at a time determined by AMP.

Include a placeholder before the audio starts, and a fallback,
if the browser doesn't support HTML5 audio, for example:

[sourcecode:html]
<amp-audio width="400" height="300" src="https://yourhost.com/audios/myaudio.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio</p>
  </div>
  <source type="audio/mpeg" src="foo.mp3">
  <source type="audio/ogg" src="foo.ogg">
</amp-audio>
[/sourcecode]

{% call callout('Note', type='note') %}
Include `<script async custom-element="amp-audio"
  src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` in the head of your page to use this component.
{% endcall %}
