---
$title: Include third-party content
$order: 9
description: 'Learn how to include third-party components in your pages ...'
formats:
    - websites
components:
  - iframe
  - facebook
author: Meggin
contributors:
  - pbakaus
  - bpaduch
---

Learn how to include third-party components in your pages.

## Embed a Tweet

Embed a  Tweet from Twitter in your page by
using the [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) element.

To embed a tweet in your page,
first include the following script in the `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter"
  src="https://ampjs.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Currently, tweets are automatically proportionally scaled
to fit the provided size,
but this may yield less than the ideal appearance.
Manually tweak the provided width and height or use the media attribute
to select the aspect ratio based on screen width.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

[tip type="tip"]
**TIP –** See more [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) examples at [AMP By Example](../../../../documentation/examples/documentation/amp-twitter.html).
[/tip]

## Embed an Instagram

Embed an Instagram in your page by
using the [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) element.

To embed an Instagram,
first include the following script in the `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram"
  src="https://ampjs.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Include the Instagram data-shortcode found in the Instagram photo URL.
For example, in `https://instagram.com/p/fBwFP`,
`fBwFP` is the data-shortcode.
Also, Instagram uses a fixed aspect ratio for responsive layouts,
so the value for width and height should be universal.

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

[tip type="tip"]
**TIP –** See more [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) examples at [AMP By Example](../../../../documentation/examples/documentation/amp-instagram.html).
[/tip]

## Display a Facebook post or video

Display a Facebook post or video in your page by
using the [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) element.

You must include the following script in the `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook"
  src="https://ampjs.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### Example: Embedding a post

Source:
```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```
Preview:
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>

##### Example: Embedding a video

Source:
```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```
Preview:
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>

[tip type="tip"]
**TIP –** See more [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) examples at [AMP By Example](../../../../documentation/examples/documentation/amp-facebook.html).
[/tip]

## Embed a YouTube video

Embed a YouTube video in your page by
using the [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) element.

You must include the following script in the `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube"
  src="https://ampjs.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

The YouTube `data-videoid` can be found in every YouTube video page URL.
For example, in `https://www.youtube.com/watch?v=Z1q71gFeRqM`,
`Z1q71gFeRqM` is the video id.

Use `layout="responsive"` to yield correct layouts for 16:9 aspect ratio videos:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

[tip type="tip"]
**TIP –** See more [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) examples at [AMP By Example](../../../../documentation/examples/documentation/amp-youtube.html).
[/tip]

## Display an ad

Display an ad in your page by
using the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) element.
Only ads served via HTTPS are supported.

No ad network-provided JavaScript is allowed to run inside the AMP document.
Instead, the AMP runtime loads an iframe from a
different origin (via iframe sandbox)
and executes the ad network’s JS inside that iframe sandbox.

You must specify the ad width and height, and the ad network type.
The `type` identifies the ad network's template.
Different ad types require different `data-*` attributes.

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
</amp-ad>
```
[/example]

If supported by the ad network,
include a `placeholder`
to be shown if no ad is available:

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
  <div placeholder>Have a great day!</div>
</amp-ad>
```
[/example]

AMP supports a wide range of ad networks. See the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)  for a full list.

[tip type="read-on"]
**READ ON –** Learn more about ads in the [Serving Ads on AMP](../../../../documentation/guides-and-tutorials/develop/monetization/index.md) guide.
[/tip]
