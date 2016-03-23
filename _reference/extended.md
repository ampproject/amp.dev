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

| Component | Description |
| --------- | ----------- |
| [`amp-access`](extended/amp-access.html) | Provides AMP paywall and subscription support.  |
| [`amp-accordion`](extended/amp-accordion.html) | Provides a way for viewers to have a glance at the outline of the content and jump to a section of their choice at will. |
| [`amp-analytics`](extended/amp-analytics.html) | Captures analytics data from an AMP document. |
| [`amp-anim`](extended/amp-anim.html) | Manages an animated image, typically a GIF. |
| [`amp-audio`](extended/amp-audio.html) | Replaces the HTML5 `audio` tag. |
| [`amp-brid-player`](extended/amp-brid-player.html) | Displays a Brid.tv player. |
| [`amp-brightcove`](extended/amp-brightcove.html) | Displays a Brightcove Video Cloud or Perform player. |
| [`amp-carousel`](extended/amp-carousel.html) | Displays multiple similar pieces of content along a horizontal axis. |
| [`amp-dailymotion`](extended/amp-dailymotion.html) | Displays a [Dailymotion](https://www.dailymotion.com) video. |
| [`amp-dynamic-css-classes`](extended/amp-dynamic-css-classes.html) | Adds several dynamic CSS class names onto the HTML element. |
| [`amp-facebook`](extended/amp-facebook.html) | Displays a Facebook post or video. |
| [`amp-fit-text`](extended/amp-fit-text.html) | Expands or shrinks font size to fit the content within the space given. |
| [`amp-font`](extended/amp-font.html) | Triggers and monitors the loading of custom fonts. |
| [`amp-iframe`](extended/amp-iframe.html) | Displays an iframe. |
| [`amp-image-lightbox`](extended/amp-image-lightbox.html) | Allows for an “image lightbox” or similar experience. |
| [`amp-instagram`](extended/amp-instagram.html) | Displays an Instagram embed. |
| [`amp-install-serviceworker`](extended/amp-install-serviceworker.html) | Installs a ServiceWorker. |
| [`amp-lightbox`](extended/amp-lightbox.html) | Allows for a “lightbox” or similar experience. |
| [`amp-list`](extended/amp-list.html) | Dynamically downloads data and creates list items using a template. |
| [`amp-mustache`](extended/amp-mustache.html) | Allows rendering of [`Mustache.js`](https://github.com/janl/mustache.js/) templates. |
| [`amp-pinterest`](extended/amp-pinterest.html) | Displays a Pinterest widget or Pin It button. |
| [`amp-reach-player`](extended/amp-reach-player.html) | Displays a [Beachfront Reach](https://beachfrontreach.com/) video player. |
| [`amp-soundcloud`](extended/amp-soundcloud.html) | Displays a [Soundcloud](https://soundcloud.com/) clip. |
| [`amp-springboard-player`](extended/amp-springboard-player.html) | Displays a Springboard Platform video player |
| [`amp-twitter`](extended/amp-twitter.html) | Displays a Twitter tweet. |
| [`amp-user-notification`](extended/amp-user-notification.html) | Displays a dismissable notification to the user. |
| [`amp-vimeo`](extended/amp-vimeo.html) | Displays a Vimeo video. |
| [`amp-vine`](extended/amp-vine.html) | Displays a Vine simple embed. |
| [`amp-youtube`](extended/amp-youtube.html) | Displays a YouTube video. |


## AMP HTML Extended Templates

NOT LAUNCHED YET

Extended templates must be explicitly included into the document as custom templates.

For example, to include an amp-mustache template in your page
include the following script in the `<head>`:

{% highlight html %}
<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"></script>
{% endhighlight %}

Current list of extended templates:

| Component                                     | Description                                                                                 |
| --------------------------------------------- | -------------------------------------------------------------------------------------------
| [`amp-mustache`](extended/amp-mustache.html) | Mustache template.                                       |
