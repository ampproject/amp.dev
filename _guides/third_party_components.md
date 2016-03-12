---
layout: page
title: Include Third-Party Content
order: 2
---

Learn how to include third-party components in your pages.

{% include toc.html %}

## Embed a Tweet

Embed a Twitter Tweet in your page
using the [`amp-twitter`](/docs/reference/extended/amp-twitter.html) element.

To include a tweet in your page,
first include the following script in the `<head>`:

{% highlight html %}
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
{% endhighlight html %}

Currently tweets are automatically proportionally scaled
to fit the provided size,
but this may yield less than ideal appearance.
Manually tweak the provided width and height or use the media attribute
to select the aspect ratio based on screen width.

Example `amp-twitter` from the
[twitter.amp example](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html):

{% highlight html %}
<amp-twitter width=390 height=50
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
{% endhighlight html %}

## Embed an Instagram

Embed an Instagram in your page
using the [`amp-instagram`](/docs/reference/extended/amp-instagram.html) element.

To include an Instagram,
first include the following script in the `<head>`:

{% highlight html %}
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
{% endhighlight html %}

Include the Instagram data-shortcode found in the Instagram photo URL.
For example, in `https://instagram.com/p/fBwFP`,
`fBwFP` is the data-shortcode.
Also, Instagram uses a fixed aspect ratio for responsive layouts,
so the value for width and height should be universal

{% highlight html %}
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
{% endhighlight html %}

## Display Facebook post or video

Display a Facebook post or video in your page
using the [`amp-facebook`](/docs/reference/extended/amp-facebook.html) element.

You must include the following script in the `<head>`:

{% highlight html %}
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>"></script>
{% endhighlight html %}

Example - Embedding a post:

{% highlight html %}
<amp-facebook width=486 height=657
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
{% endhighlight html %}

Example - Embedding a video: 

{% highlight html %}
<amp-facebook width=552 height=574
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
{% endhighlight html %}

## Include a youtube video

Include a youtube video in your page
using the [`amp-youtube`](/docs/reference/extended/amp-youtube.html) element.

You must include the following script in the `<head>`:

{% highlight html %}
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight html %}

The Youtube `data-videoid` can be found in every Youtube video page URL.
For example, in https://www.youtube.com/watch?v=Z1q71gFeRqM,
Z1q71gFeRqM is the video id.

Use `layout="responsive"` to yield correct layouts for 16:9 aspect ratio videos:

{% highlight html %}
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
{% endhighlight html %}

## Display an ad

Display an ad in your page
using the [`amp-ad`](/docs/reference/amp-ad.html) element.
Only ads served via HTTPS are supported.

No ad network provided JavaScript is allowed to run inside the AMP document.
Instead the AMP runtime loads an iframe from a
different origin (via iframe sandbox)
and executes the ad network’s JS inside that iframe sandbox.

You must specify the ad width and height, and the ad network type.
The `type` identifies the ad network's template.
Different ad types require different `data-*` attributes.

{% highlight html %}
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
{% endhighlight html %}

If supported by the ad network,
include a `placeholder`
to be shown if no ad is available:

{% highlight html %}
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
{% endhighlight html %}

AMP supports a wide range of ad networks. See [reference for a full list](/docs/reference/amp-ad.html#supported-ad-networks).
