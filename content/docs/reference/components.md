---
$title: Components / Tags
$order: 0
---
The AMP HTML library provides components that are classified as:

- **built-in**: Components that are included in the base library, such as `amp-img` and `amp-pixel`.
- **[extended](https://github.com/ampproject/amphtml/blob/master/extensions/README.md)**: Extensions to the base library that must be explicitly included in the document as custom elements (e.g., `<script async custom-element="amp-audio" ...`).
- **[experimental](experimental.html)**: Components that are released but are not yet ready for wide use.

Here are the components grouped by category:

- [Ads & Analytics](#ads-and-analytics)
- [Dynamic Content](#dynamic-content)
- [Layout](#layout)
- [Media](#media)
- [Presentation](#presentation)
- [Social](#social)

### Ads and Analytics

| Component | Description |
| --------- | ----------- |
| [`amp-ad`](components/ads/amp-ad.html) | A container to display an ad. |
| [`amp-analytics`](components/ads/amp-analytics.html) | Captures analytics data from an AMP document. |
| [`amp-auto-ads`](components/ads/amp-auto-ads.html) | Dynamically injects ads into an AMP page by using a remotely-served configuration file. |
| [`amp-call-tracking`](components/ads/amp-call-tracking.html) |  Dynamically replaces a phone number in a hyperlink to enable call tracking. |
| [`amp-experiment`](components/ads/amp-experiment.html) | Can be used to conduct user experience experiments on an AMP document. |
| [`amp-pixel`](components/ads/amp-pixel.html) | A tracking pixel to count page views. |
| [`amp-sticky-ad`](components/ads/amp-sticky-ad.html) | Provides a way to display and stick ad content at the bottom of the page.|

### Dynamic Content

| Component | Description |
| --------- | ----------- |
| [`amp-access-laterpay`](components/dynamic/amp-access-laterpay.html) | Allows publishers to easily integrate with the [LaterPay](https://www.laterpay.net/) micropayments platform.
| [`amp-access`](components/dynamic/amp-access.html) | Provides an AMP paywall and subscription support.  |
| [`amp-bind`](components/dynamic/amp-bind.html) | Allows elements to mutate in response to user actions or data changes via data binding and simple JS-like expressions. |
| [`amp-form`](components/dynamic/amp-form.html) | Provides form support. |
| [`amp-gist`](components/dynamic/amp-gist.html) | Displays a [GitHub Gist](https://gist.github.com/). |
| [`amp-install-serviceworker`](components/dynamic/amp-install-serviceworker.html) | Installs a ServiceWorker. |
| [`amp-list`](components/dynamic/amp-list.html) | Dynamically downloads data and creates list items using a template. |
| [`amp-live-list`](components/dynamic/amp-live-list.html) | Provides a way to display and update content live. |
| [`amp-mustache`](components/dynamic/amp-mustache.html) | Allows rendering of [`Mustache.js`](https://github.com/janl/mustache.js/) templates. |
| [`amp-selector`](components/dynamic/amp-selector.html) |  Represents a control that presents a menu of options and lets the user choose from it. |
| [`amp-user-notification`](components/dynamic/amp-user-notification.html) | Displays a dismissable notification to the user. |

### Layout

| Component | Description |
| --------- | ----------- |
| [`amp-accordion`](components/layout/amp-accordion.html) | Provides a way for viewers to have a glance at the outline of the content and jump to a section of their choice at will. |
| [`amp-app-banner`](components/layout/amp-app-banner.html) | A wrapper and minimal UI for a cross-platform, fixed-position banner showing a call-to-action to install an app. |
| [`amp-carousel`](components/layout/amp-carousel.html) | Displays multiple similar pieces of content along a horizontal axis. |
| [`amp-fx-flying-carpet`](components/layout/amp-fx-flying-carpet.html) | Wraps its children in a unique full-screen scrolling container allowing you to display a full-screen ad without taking up the entire viewport. |
| [`amp-fx-parallax`](components/layout/amp-fx-parallax.html) |  An attribute that enables a 3D-perspective effect on an element. |
| [`amp-iframe`](components/layout/amp-iframe.html) | Displays an iframe. |
| [`amp-lightbox`](components/layout/amp-lightbox.html) | Allows for a “lightbox” or similar experience. |
| [`amp-sidebar`](components/layout/amp-sidebar.html) | Provides a way to display meta content intended for temporary access such as navigation, links, buttons, menus. |


### Media

| Component | Description |
| --------- | ----------- |
| [`amp-anim`](components/media/amp-anim.html) | Manages an animated image, typically a GIF. |
| [`amp-apester-media`](components/media/amp-apester-media.html) | Displays an [Apester](https://apester.com/) smart unit. |
| [`amp-audio`](components/media/amp-audio.html) | Replaces the HTML5 `audio` tag. |
| [`amp-brid-player`](components/media/amp-brid-player.html) | Displays a [Brid.tv](https://www.brid.tv/) player. |
| [`amp-brightcove`](components/media/amp-brightcove.html) | Displays a Brightcove [Video Cloud](https://www.brightcove.com/en/online-video-platform) or [Perform](https://www.brightcove.com/en/perform) player. |
| [`amp-dailymotion`](components/media/amp-dailymotion.html) | Displays a [Dailymotion](https://www.dailymotion.com) video. |
| [`amp-google-vrview-image`](components/media/amp-google-vrview-image) | Displays a VR image. |
| [`amp-hulu`](components/media/amp-hulu.html) | Displays a simple embedded [Hulu](http://www.hulu.com/) video. |
| [`amp-image-lightbox`](components/media/amp-image-lightbox.html) | Allows for an “image lightbox” or similar experience. |
| [`amp-img`](components/media/amp-img.html)  | Replaces the HTML5 `img` tag. |
| [`amp-izlesene`](components/media/amp-izlesene.html)  | Displays an [Izlesene](https://www.izlesene.com/) video. |
| [`amp-jwplayer`](components/media/amp-jwplayer.html) | Displays a cloud-hosted [JW Player](https://www.jwplayer.com/). |
| [`amp-kaltura-player`](components/media/amp-kaltura-player.html) | Displays the Kaltura Player as used in [Kaltura's Video Platform](https://corp.kaltura.com/). |
| [`amp-nexxtv-player`](components/media/amp-nexxtv-player.html) | Displays a media stream from the nexxOMNIA platform. |
| [`amp-o2-player`](components/media/amp-o2-player.html) | Displays an [AOL O2Player](http://on.aol.com/). |
| [`amp-ooyala-player`](components/media/amp-ooyala-player.html) |  Displays an [Ooyala](https://www.ooyala.com/) video. |
| [`amp-playbuzz`](components/media/amp-playbuzz.html) |  Displays any [Playbuzz](http://www.playbuzz.com/) content (e.g., list, poll, etc.). |
| [`amp-reach-player`](components/media/amp-reach-player.html) | Displays a [Beachfront Reach](https://beachfrontreach.com/) video player. |
| [`amp-soundcloud`](components/media/amp-soundcloud.html) | Displays a [Soundcloud](https://soundcloud.com/) clip. |
| [`amp-springboard-player`](components/media/amp-springboard-player.html) | Displays a [Springboard Platform](http://publishers.springboardplatform.com/users/login) video player. |
| [`amp-video`](components/media/amp-video.html) | Replaces the HTML5 `video` tag. |
| [`amp-vimeo`](components/media/amp-vimeo.html) | Displays a [Vimeo](https://vimeo.com/) video. |
| [`amp-youtube`](components/media/amp-youtube.html) | Displays a [YouTube](https://www.youtube.com/) video. |

### Presentation

| Component | Description |
| --------- | ----------- |
| [`amp-animation`](components/presentation/amp-animation.html) | Defines and displays an animation. |
| [`amp-dynamic-css-classes`](components/presentation/amp-dynamic-css-classes.html) | Adds several dynamic CSS class names onto the HTML element. |
| [`amp-fit-text`](components/presentation/amp-fit-text.html) | Expands or shrinks font size to fit the content within the space given. |
| [`amp-font`](components/presentation/amp-font.html) | Triggers and monitors the loading of custom fonts. |
| [`amp-viz-vega`](components/presentation/amp-viz-vega.html) | Displays visualizations created by using [Vega](https://vega.github.io/vega/) visualization grammar.|


### Social

| Component | Description |
| --------- | ----------- |
| [`amp-facebook`](components/social/amp-facebook.html) | Displays a Facebook post or video. |
| [`amp-facebook-comments`](components/social/amp-facebook-comments.html) | Embeds the Facebook comments plugin. |
| [`amp-gfycat`](components/social/amp-gfycat.html) | Displays a [Gfycat](https://gfycat.com) video GIF. |
| [`amp-instagram`](components/social/amp-instagram.html) | Displays an Instagram embed. |
| [`amp-pinterest`](components/social/amp-pinterest.html) | Displays a Pinterest widget or Pin It button. |
| [`amp-reddit`](components/social/amp-reddit.html) |  Displays a Reddit comment or post embed. |
| [`amp-social-share`](components/social/amp-social-share.html) | Displays a social share button. |
| [`amp-twitter`](components/social/amp-twitter.html) | Displays a Twitter tweet. |
| [`amp-vine`](components/social/amp-vine.html) | Displays a Vine simple embed. |
