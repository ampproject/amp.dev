---
$title: Include images & video
$order: 8
description: "Like on a normal HTML page, AMP allows you to embed images, video and audio content. Learn what's different about the AMP equivalents and learn how to..."
formats:
  - websites
  - stories
  - email
  - ads
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Like on a normal HTML page, AMP allows you to embed **images**, **video** and **audio**
content. Learn what's different about the AMP equivalents and learn how to
include them in your pages.

## Why not &lt;img>, &lt;video> and &lt;audio>?

AMP doesn't support the default HTML counterparts to displaying media, like `<img>`.
We provide equivalent components for the following reasons:

* We need to understand layout of the page before assets load, crucial
  to [support first-viewport preloading]({{g.doc('/content/amp-dev/about/how-amp-works.html', locale=doc.locale).url.path}}#size-all-resources-statically)
* We need to control network requests to [lazy load and prioritize resources
effectively]({{g.doc('/content/amp-dev/about/how-amp-works.html', locale=doc.locale).url.path}}#prioritize-resource-loading)

Caution: While they're not supported, they *will* render, but AMP won't [validate your pages]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md', locale=doc.locale).url.path}}) and you won't get all the benefits AMP provides.

## Images

Include an image in your page
using the [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) element, like so:

[example preview="inline" playground="true"]
```html
<amp-img alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195">
</amp-img>
```
[/example]

In this most basic example, the image will display with the specified fixed
height and width. At minimum, an explicit width and height needs to be set.

#### Displaying images when JavaScript is disabled

As [`<amp-img>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) relies on JavaScript, if the user chooses to disable scripts, images won't display.  In this case, you should provide a fallback to the image using `<img>` and `<noscript>`, like so:

[example preview="inline" playground="true"]
```html
<amp-img src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195">
  <noscript>
    <img src="{{server_for_email}}/static/inline-examples/images/sunset.jpg" width="264" height="195" />
  </noscript>
</amp-img>
```
[/example]

### Advanced layouts

AMP makes it much easier than with standard CSS/HTML to create fully responsive
images. In its most basic form, all you have to do is to add `layout="responsive"`:

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive">
</amp-img>
```
[/example]

[tip type="read-on"]
**READ ON –**  Learn more about [advanced layout techniques]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md', locale=doc.locale).url.path}}).
[/tip]

### Behavior and placeholders

The AMP HTML runtime can effectively manage image resources,
choosing to delay or prioritize resource loading
based on the viewport position, system resources, connection bandwidth, or other factors.

[tip type="read-on"]
**READ ON –**  Learn how to [provide fallbacks and placeholders for images]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}).
[/tip]

## Animated images

The [`amp-anim`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-anim.md', locale=doc.locale).url.path}}) element is very similar to the [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) element,
and provides additional functionality to manage loading and playing of animated images such as GIFs.

[example preview="inline" playground="true" imports="amp-anim"]
```html
<amp-anim width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif">
  <amp-img placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png">
  </amp-img>
</amp-anim>
```
[/example]

[tip type="note"]
**NOTE –**  Include `<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` in the head of your page to use this component.
[/tip]

## Video

Include a video in your page
using the [`amp-video`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-video.md', locale=doc.locale).url.path}}) element.

Only use this element for direct HTML5 video file embeds.
The element loads the video resource specified by the `src` attribute lazily,
at a time determined by AMP.

Include a placeholder before the video starts, and a fallback,
if the browser doesn't support HTML5 video, for example:

[example preview="inline" playground="true" imports="amp-video"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

## Audio

Include an audio resource in your page,
using the [`amp-audio`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-audio.md', locale=doc.locale).url.path}}) element.

Only use this element for direct HTML5 audio file embeds.
Like all embedded external resources in an AMP page,
the element loads the audio resource specified by the `src` attribute lazily,
at a time determined by AMP.

Include a placeholder before the audio starts, and a fallback,
if the browser doesn't support HTML5 audio, for example:

[example preview="inline" playground="true" imports="amp-audio"]
```html
<amp-audio width="400"
  height="200"
  {% if format == 'stories' %}  layout="nodisplay" autoplay
  {% endif %}
  src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio.</p>
  </div>
  <source type="audio/mpeg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <source type="audio/ogg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.ogg">
</amp-audio>
```
[/example]

[tip type="note"]
**NOTE –**  Include `<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` in the head of your page to use this component.
[/tip]
