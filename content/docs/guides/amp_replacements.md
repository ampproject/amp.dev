---
$title: Include Images & Video
$order: 1
---

[TOC]

Like on a normal HTML page, AMP allows you to embed **images**, **video** and **audio**
content. Learn what's different about the AMP equivalents and learn how to
include them in your pages.

## Why not `<img>`, `<video>` and `<audio`?

AMP doesn't support the default HTML counterparts to displaying media, like `<img>`.
We provide equivalent components for the following reasons:

* We need to understand layout of the page before assets load, crucial
  to [support first-viewport preloading](/learn/how-amp-works/#size-all-resources-statically)
* We need to control network requests to [lazy load and prioritize resources
effectively](/learn/how-amp-works/#prioritize-resource-loading)

<aside class="caution">
  <strong>Caution:</strong>
  <span>While they're not supported, they <i>will</i> render, but AMP won't <a href="/docs/guides/validate.html">validate your pages</a> and you won't get all the benefits AMP provides.</span>
</aside>

## Images

Include an image in your page
using the [`amp-img`](/docs/reference/components/amp-img.html) element, like so:

[sourcecode:html]
<amp-img src="fixed.jpg" width="264" height="96"></amp-img>
[/sourcecode]

In this most basic example, the image will display with the specified fixed
height and width. At minimum, an explicit width and height needs to be set.

### Advanced layouts

AMP makes it much easier than with standard CSS/HTML to create fully responsive
images. In its most basic form, all you have to do is to add `layout="responsive"`:

[sourcecode:html]
<amp-img src="responsive.jpg" width="527" height="193" layout="responsive">
</amp-img>
[/sourcecode]

<aside class="success">
  <strong>Read on:</strong>
  <span>Learn more about <a href="/docs/guides/responsive/control_layout.html">advanced layout techniques</a>.</span>
</aside>

### Behavior and placeholders

The AMP HTML runtime can effectively manage image resources,
choosing to delay or prioritize resource loading
based on the viewport position, system resources, connection bandwidth, or other factors.

<aside class="success">
  <strong>Read on:</strong>
  <span>Learn how to <a href="/docs/guides/responsive/placeholders.html">provide fallbacks and placeholders for images</a>.</span>
</aside>

## Animated images

The [`amp-anim`](/docs/reference/extended/amp-anim.html) element is very similar to the `amp-img` element,
and provides additional functionality to manage loading and playing of animated images such as GIFs.

[sourcecode:html]
<amp-anim width="400" height="300" src="my-gif.gif">
  <amp-img placeholder width="400" height="300" src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
[/sourcecode]

<aside class="note">
  <strong>Note:</strong>
  <span>Include <code>&lt;script async custom-element="amp-anim"
  src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"&gt;&lt;/script&gt;</code> in the head of your page to use this component.</span>
</aside>

## Video

Include a video in your page
using the [`amp-video`](/docs/reference/amp-video.html) element.

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
using the [`amp-audio`](/docs/reference/extended/amp-audio) element.

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

<aside class="note">
  <strong>Note:</strong>
  <span>Include <code>&lt;script async custom-element="amp-anim"
  src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"&gt;&lt;/script&gt;</code> in the head of your page to use this component.</span>
</aside>
