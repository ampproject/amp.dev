---
layout: page
title: Extended components
order: 4
folder: extended
---


AMP Extensions are either extended components or extended templates.


## AMP HTML Extended Components

Extended components must be explicitly included into the document as custom elements.

For example, to include a youtube video in your page
include the following script in the `<head>`:

{% highlight html %}
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight %}

Current list of extended components:

| Component                                     | Description                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [`amp-anim`](extended/amp-anim.html)                     | Runtime-managed animated image, most typically a GIF.                                       |
| [`amp-audio`](extended/amp-audio.html)                      | Replacement for the HTML5 `audio` tag.                                                      |
| [`amp-brightcove`](extended/amp-brightcove.html)             | Displays a Brightcove Video Cloud or Perform player. |
| [`amp-carousel`](extended/amp-carousel.html)                | Generic carousel for displaying multiple similar pieces of content along a horizontal axis. |
| [`amp-fit-text`](extended/amp-fit-text.html)                | Expand or shrink font size to fit the content within the space given.                       |
| [`amp-font`](extended/amp-font.html)                | Trigger and monitor the loading of custom fonts.                       |
| [`amp-iframe`](extended/amp-iframe.html)                 | Displays an iframe.                                                                         |
| [`amp-image-lightbox`](extended/amp-image-lightbox.html) | Allows for a “image lightbox” or similar experience.                                        |
| [`amp-instagram`](extended/amp-instagram.html)           | Displays an instagram embed.                                                                |
| [`amp-install-serviceworker`](extended/amp-install-serviceworker.html)               | Installs a ServiceWorker.
| [`amp-lightbox`](extended/amp-lightbox.html)             | Allows for a “lightbox” or similar experience.                                              |
| [`amp-list`](extended/amp-list.html)             | A dynamic list that can download data and create list items using a template |
| [`amp-twitter`](extended/amp-twitter.html)               | Displays a Twitter Tweet.                                                                   |
| [`amp-vine`](extended/amp-vine.html)               | Displays a Vine simple embed.                                                                   |
| [`amp-youtube`](extended/amp-youtube.html)               | Displays a Youtube video.                                                                   |


## AMP HTML Extended Templates

NOT LAUNCHED YET

Extended templates must be explicitly included into the document as custom templates.

For example, to include a amp-mustache template in your page
include the following script in the `<head>`:

{% highlight html %}
<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"></script>
{% endhighlight %}

Current list of extended templates:

| Component                                     | Description                                                                                 |
| --------------------------------------------- | -------------------------------------------------------------------------------------------
|
| [`amp-mustache`](extended/amp-mustache.html) | Mustache template.                                       |
