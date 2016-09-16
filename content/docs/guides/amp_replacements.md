---
$title: Include Media and Iframes
$order: 1
---

Learn how to display include media content in your pages, and how to use iframes
to display advanced content outside of AMP's limitations.

[TOC]

## Media

Include images, video, and audio in your page using AMP media elements.

### Include an image

Include an image in your page
using the [`amp-img`](/docs/reference/amp-img.html) element.

`amp-img` requirements:

* Must include an explicit width and height.
* Recommended: include a placeholder in case the image resource fails to load.

Layout behavior for images is determined by the `layout` attribute. For details
on layouts, read the [AMP HTML Layout System](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md).

Responsive image example:

[sourcecode:html]
<amp-img src="responsive.jpg" width=527 height=193 layout="responsive"></amp-img>
[/sourcecode]

Fixed-size image example:

[sourcecode:html]
<amp-img id="img1" src="fixed.jpg" width=264 height=96></amp-img>
[/sourcecode]

Hidden image example:

[sourcecode:html]
<amp-img id="img2" src="hidden.jpg" width=527 height=193 layout="nodisplay"></amp-img>
[/sourcecode]

The AMP HTML runtime can effectively manage image resources,
choosing to delay or prioritize resource loading
based on the viewport position, system resources, connection bandwidth, or other factors.

If the resource requested by the `amp-img` component fails to load,
the space will be blank.
Set a placeholder background color or other visual
using a CSS selector and style on the element itself:

[sourcecode:css]
amp-img {
  background-color: grey;
}
[/sourcecode]

### Include an animated image

Include an animated image in your page
using the [`amp-anim`](/docs/reference/extended/amp-anim.html) element.

The `amp-anim` element is very similar to the `amp-img` element,
and provides additional functionality to manage loading and playing
of animated images such as GIFs.

To include an `amp-anim` in your page,
first include the following script to the `<head>`:

[sourcecode:html]
<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
[/sourcecode]

The `amp-anim` component can also have an optional placeholder child
to display while the `src` file is loading.
The placeholder is specified via the `placeholder` attribute:

[sourcecode:html]
<amp-anim width=400 height=300 src="my-gif.gif">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
[/sourcecode]

### Include a video

Include a video in your page
using the [`amp-video`](/docs/reference/amp-video.html) element.

Only use this element for direct HTML5 video file embeds.
The element loads the video resource specified by the `src` attribute lazily,
at a time determined by the AMP HTML runtime.

Include a placeholder before the video starts, and a fallback,
if the browser doesn't support HTML5 video, for example:

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg">
  <div fallback>
    <p>Your browser doesn’t support HTML5 video</p>
  </div>
</amp-video>
[/sourcecode]

### Include an audio resource

Include an audio resource in your page,
using the [`amp-audio`](/docs/reference/extended/amp-audio) element.

You must include the following script in the `<head>`:

[sourcecode:html]
<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>
[/sourcecode]

Only use this element for direct HTML5 audio file embeds.
Like all embedded external resources in an AMP page,
the element loads the audio resource specified by the `src` attribute lazily,
at a time determined by the AMP HTML runtime.

Include a placeholder before the audio starts, and a fallback,
if the browser doesn't support HTML5 audio, for example:

[sourcecode:html]
<amp-audio width=400 height=300 src="https://yourhost.com/audios/myaudio.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio</p>
  </div>
  <source type="audio/mpeg" src="foo.mp3">
  <source type="audio/ogg" src="foo.ogg">
</amp-audio>
[/sourcecode]

## Iframes

Display an iframe in your page using the
[`amp-iframe`](/docs/reference/extended/amp-iframe.html) element.

Iframes are especially useful in AMP to display content not supported in the
main page context, such as content requiring user-authored JavaScript.

`amp-iframe` requirements:

* Must be at least 600px or 75% of the first viewport away from the top.
* Can only request resources via HTTPS, and they must not be in the same origin
  as the container, unless they do not specify allow-same-origin.

To include an `amp-iframe` in your page,
first include the following script to the `<head>`, which loads the additional
code for the extended component:

[sourcecode:html]
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

An example `amp-iframe` from the
[released.amp example](https://github.com/ampproject/amphtml/blob/master/examples/released.amp.html):

[sourcecode:html]
<amp-iframe width=300 height=300
    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=Alameda,%20CA">
</amp-iframe>
[/sourcecode]
