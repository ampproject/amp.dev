---
$title: Components / Tags
$order: 0
---
The AMP HTML library provides components that are classified as:

- **built-in**: Components that are included in the base library, such as `amp-img`, `amp-video`, and `amp-pixel`.
- **[extended](https://github.com/ampproject/amphtml/blob/master/extensions/README.md)**: Extensions to the base library that must be explicitly included in the document as custom elements (e.g., `<script async custom-element="amp-audio" ...`).
- **[experimental](experimental.html)**: Components that are released but are not yet ready for wide use.

Here are the components grouped by category:

- [Ads, Analytics & Paywalls](#ads-analytics-paywalls)
- [Audio & Video](#audio-video)
- [Dynamic Content & Personalization](#dynamic-content-personalization)
- [Presentation](#presentation)
- [Social & Sharing](#social-sharing)
- [Scripts](#scripts)

### Ads, Analytics & Paywalls

| Component | Description |
| --------- | ----------- |
| [`amp-access`](components/amp-access.html) | Provides an AMP paywall and subscription support.  |
| [`amp-ad`](components/amp-ad.html) | A container to display an ad. |
| [`amp-analytics`](components/amp-analytics.html) | Captures analytics data from an AMP document. |
| [`amp-experiment`](components/amp-experiment.html) | Can be used to conduct user experience experiments on an AMP document. |
| [`amp-pixel`](components/amp-pixel.html) | A tracking pixel to count page views. |
| [`amp-sticky-ad`](components/amp-sticky-ad.html) | Provides a way to display and stick ad content at the bottom of the page.|

### Audio & Video

| Component | Description |
| --------- | ----------- |
| [`amp-apester-media`](components/amp-apester-media.html) | Displays an [Apester](https://apester.com/) smart unit. |
| [`amp-audio`](components/amp-audio.html) | Replaces the HTML5 `audio` tag. |
| [`amp-brid-player`](components/amp-brid-player.html) | Displays a [Brid.tv](https://www.brid.tv/) player. |
| [`amp-brightcove`](components/amp-brightcove.html) | Displays a Brightcove [Video Cloud](https://www.brightcove.com/en/online-video-platform) or [Perform](https://www.brightcove.com/en/perform) player. |
| [`amp-dailymotion`](components/amp-dailymotion.html) | Displays a [Dailymotion](https://www.dailymotion.com) video. |
| [`amp-gfycat`](components/amp-gfycat.html) | Displays a [Gfycat](https://gfycat.com) video GIF. |
| [`amp-jwplayer`](components/amp-jwplayer.html) | Displays a cloud-hosted [JW Player](https://www.jwplayer.com/). |
| [`amp-kaltura-player`](components/amp-kaltura-player.html) | Displays the Kaltura Player as used in [Kaltura's Video Platform](https://corp.kaltura.com/). |
| [`amp-o2-player`](components/amp-o2-player.html) | Displays an [AOL O2Player](http://on.aol.com/). |
| [`amp-reach-player`](components/amp-reach-player.html) | Displays a [Beachfront Reach](https://beachfrontreach.com/) video player. |
| [`amp-soundcloud`](components/amp-soundcloud.html) | Displays a [Soundcloud](https://soundcloud.com/) clip. |
| [`amp-springboard-player`](components/amp-springboard-player.html) | Displays a [Springboard Platform](http://publishers.springboardplatform.com/users/login) video player. |
| [`amp-video`](components/amp-video.html) | Replaces the HTML5 `video` tag. |
| [`amp-vimeo`](components/amp-vimeo.html) | Displays a [Vimeo](https://vimeo.com/) video. |
| [`amp-vine`](components/amp-vine.html) | Displays a [Vine](https://vine.co/) simple embed. |
| [`amp-youtube`](components/amp-youtube.html) | Displays a [YouTube](https://www.youtube.com/) video. |

### Dynamic Content & Personalization

| Component | Description |
| --------- | ----------- |
| [`amp-list`](components/amp-list.html) | Dynamically downloads data and creates list items using a template. |
| [`amp-live-list`](components/amp-live-list.html) | Provides a way to display and update content live. |
| [`amp-user-notification`](components/amp-user-notification.html) | Displays a dismissable notification to the user. |

### Presentation

| Component | Description |
| --------- | ----------- |
| [`amp-accordion`](components/amp-accordion.html) | Provides a way for viewers to have a glance at the outline of the content and jump to a section of their choice at will. |
| [`amp-anim`](components/amp-anim.html) | Manages an animated image, typically a GIF. |
| [`amp-app-banner`](components/amp-app-banner.html) | A wrapper and minimal UI for a cross-platform, fixed-position banner showing a call-to-action to install an app. |
| [`amp-carousel`](components/amp-carousel.html) | Displays multiple similar pieces of content along a horizontal axis. |
| [`amp-dynamic-css-classes`](components/amp-dynamic-css-classes.html) | Adds several dynamic CSS class names onto the HTML element. |
| [`amp-fit-text`](components/amp-fit-text.html) | Expands or shrinks font size to fit the content within the space given. |
| [`amp-font`](components/amp-font.html) | Triggers and monitors the loading of custom fonts. |
| [`amp-form`](components/amp-form.html) | Provides form support. |
| [`amp-fx-flying-carpet`](components/amp-fx-flying-carpet.html) | Wraps its children in a unique full-screen scrolling container allowing you to display a full-screen ad without taking up the entire viewport. |
| [`amp-iframe`](components/amp-iframe.html) | Displays an iframe. |
| [`amp-img`](components/amp-img.html)  | Replaces the HTML5 `img` tag. |
| [`amp-image-lightbox`](components/amp-image-lightbox.html) | Allows for an “image lightbox” or similar experience. |
| [`amp-lightbox`](components/amp-lightbox.html) | Allows for a “lightbox” or similar experience. |
| [`amp-mustache`](components/amp-mustache.html) | Allows rendering of [`Mustache.js`](https://github.com/janl/mustache.js/) templates. |
| [`amp-sidebar`](components/amp-sidebar.html) | Provides a way to display meta content intended for temporary access such as navigation, links, buttons, menus. |
| [`amp-viz-vega`](components/amp-viz-vega.html) | Displays visualizations created by using [Vega](https://vega.github.io/vega/) visualization grammar.|

### Social & Sharing

| Component | Description |
| --------- | ----------- |
| [`amp-facebook`](components/amp-facebook.html) | Displays a Facebook post or video. |
| [`amp-gfycat`](components/amp-gfycat.html) | Displays a [Gfycat](https://gfycat.com) video GIF. |
| [`amp-instagram`](components/amp-instagram.html) | Displays an Instagram embed. |
| [`amp-pinterest`](components/amp-pinterest.html) | Displays a Pinterest widget or Pin It button. |
| [`amp-social-share`](components/amp-social-share.html) | Displays a social share button. |
| [`amp-twitter`](components/amp-twitter.html) | Displays a Twitter tweet. |
| [`amp-vine`](components/amp-vine.html) | Displays a Vine simple embed. |

### Scripts

| Component | Description |
| --------- | ----------- |
| [`amp-install-serviceworker`](components/amp-install-serviceworker.html) | Installs a ServiceWorker. |
