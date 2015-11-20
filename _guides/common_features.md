---
layout: page
title: Include Common Features
order: 1
---

## Embed a Tweet

Embed a Twitter Tweet in your page
using the [`amp-twitter`](../extensions/amp-twitter/amp-twitter.md) element.

To include a tweet in your page,
first include the following script to the `<head>`:

```html
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
```

Currently tweets are automatically proportionally scaled
to fit the provided size,
but this may yield less than ideal appearance.
Manually tweak the provided width and height or use the media attribute
to select the aspect ratio based on screen width.

Example `amp-twitter` from the
[twitter.amp example](../examples/twitter.amp.html):
```html
<amp-twitter width=390 height=50
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
```

## Embed an Instagram

**Todo:** Not ready yet

Embed an Instagram in your page
using the [`amp-instagram`]() element.

**Todo:** Add proper link to reference doc.

Include the Instagram data-shortcode found in the Instagram photo URL.
For example, in `https://instagram.com/p/fBwFP`,
`fBwFP` is the data-shortcode.
Also, Instagram uses a fixed aspect ratio for responsive layouts,
so the value for width and height should be universal

    <amp-instagram
      data-shortcode="fBwFP"
      width="320"
      height="392"
      layout="responsive">
    </amp-instagram>

## Include a youtube video

Include a youtube video in your page
using the [`amp-youtube`](../extensions/amp-youtube/amp-youtube.md) element.

You must include the following script in the `<head>`:

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

The Youtube `data-videoid` can be found in every Youtube video page URL.
For example, in https://www.youtube.com/watch?v=Z1q71gFeRqM,
Z1q71gFeRqM is the video id.

Use `layout="responsive"` to yield correct layouts for 16:9 aspect ratio videos:
```html
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
```