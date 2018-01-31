---
$title: Components
$order: 0
---
The AMP HTML library provides components that are classified as:

- **built-in**: Components that are included in the base library, such as `amp-img` and `amp-pixel`.
- **[extended](https://github.com/ampproject/amphtml/blob/master/extensions/README.md)**: Extensions to the base library that must be explicitly included in the document as custom elements (e.g., `<script async custom-element="amp-audio" ...`).
- **[experimental](experimental.html)**: Components that are released but are not yet ready for wide use.

Here are the components grouped by category:

- [Ads & analytics](#ads-and-analytics)
- [Dynamic content](#dynamic-content)
- [Layout](#layout)
- [Media](#media)
- [Presentation](#presentation)
- [Social](#social)

### Ads and analytics

| Component | Description |
| --------- | ----------- |
| [`amp-ad`](components/amp-ad.html) | A container to display an ad. |
| [`amp-ad-exit`](components/amp-ad-exit.html) | Provides configurable behavior for ad exits for A4A (AMP for Ads).|
| [`amp-analytics`](components/amp-analytics.html) | Captures analytics data from an AMP document. |
| [`amp-auto-ads`](components/amp-auto-ads.html) | Dynamically injects ads into an AMP page by using a remotely-served configuration file. |
| [`amp-call-tracking`](components/amp-call-tracking.html) |  Dynamically replaces a phone number in a hyperlink to enable call tracking. |
| [`amp-experiment`](components/amp-experiment.html) | Can be used to conduct user experience experiments on an AMP document. |
| [`amp-pixel`](components/amp-pixel.html) | A tracking pixel to count page views. |
| [`amp-sticky-ad`](components/amp-sticky-ad.html) | Provides a way to display and stick ad content at the bottom of the page.|

### Dynamic content

| Component | Description |
| --------- | ----------- |
| [`amp-access-laterpay`](components/amp-access-laterpay.html) | Allows publishers to easily integrate with the [LaterPay](https://www.laterpay.net/) micropayments platform.
| [`amp-access`](components/amp-access.html) | Provides an AMP paywall and subscription support.  |
| [`amp-bind`](components/amp-bind.html) | Allows elements to mutate in response to user actions or data changes via data binding and simple JS-like expressions. |
| [`amp-form`](components/amp-form.html) | Provides form support. |
| [`amp-gist`](components/amp-gist.html) | Displays a [GitHub Gist](https://gist.github.com/). |
| [`amp-install-serviceworker`](components/amp-install-serviceworker.html) | Installs a ServiceWorker. |
| [`amp-list`](components/amp-list.html) | Dynamically downloads data and creates list items using a template. |
| [`amp-live-list`](components/amp-live-list.html) | Provides a way to display and update content live. |
| [`amp-mustache`](components/amp-mustache.html) | Allows rendering of [`Mustache.js`](https://github.com/janl/mustache.js/) templates. |
| [`amp-selector`](components/amp-selector.html) |  Represents a control that presents a menu of options and lets the user choose from it. |
| [`amp-user-notification`](components/amp-user-notification.html) | Displays a dismissable notification to the user. |
| [`amp-web-push`](components/amp-web-push.html) | Allows users to subscribe to [web push notifications](https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/). |

### Layout

| Component | Description |
| --------- | ----------- |
| [`amp-accordion`](components/amp-accordion.html) | Provides a way for viewers to have a glance at the outline of the content and jump to a section of their choice at will. |
| [`amp-app-banner`](components/amp-app-banner.html) | A wrapper and minimal UI for a cross-platform, fixed-position banner showing a call-to-action to install an app. |
| [`amp-carousel`](components/amp-carousel.html) | Displays multiple similar pieces of content along a horizontal axis. |
| [`amp-fx-flying-carpet`](components/amp-fx-flying-carpet.html) | Wraps its children in a unique full-screen scrolling container allowing you to display a full-screen ad without taking up the entire viewport. |
| [`amp-fx-parallax`](components/amp-fx-parallax.html) |  An attribute that enables a 3D-perspective effect on an element. |
| [`amp-iframe`](components/amp-iframe.html) | Displays an iframe. |
| [`amp-layout`](components/amp-layout.html) | Provides a generic, multi-purpose container element that brings AMP's powerful [layouts](https://www.ampproject.org/docs/guides/responsive/control_layout#the-layout-attribute) to any element. |
| [`amp-lightbox`](components/amp-lightbox.html) | Allows for a “lightbox” or similar experience. |
| [`amp-position-observer`](components/amp-position-observer.html) | Monitors position of an element within the viewport as a user scrolls and dispatches  events that can be used with other components. |
| [`amp-sidebar`](components/amp-sidebar.html) | Provides a way to display meta content intended for temporary access such as navigation, links, buttons, menus. |


### Media

| Component | Description |
| --------- | ----------- |
| [`amp-3q-player`](components/amp-3q-player.html) | Embeds videos from [3Q SDN.](https://www.3qsdn.com) |
| [`amp-anim`](components/amp-anim.html) | Manages an animated image, typically a GIF. |
| [`amp-apester-media`](components/amp-apester-media.html) | Displays an [Apester](https://apester.com/) smart unit. |
| [`amp-audio`](components/amp-audio.html) | Replaces the HTML5 `audio` tag. |
| [`amp-brid-player`](components/amp-brid-player.html) | Displays a [Brid.tv](https://www.brid.tv/) player. |
| [`amp-brightcove`](components/amp-brightcove.html) | Displays a Brightcove [Video Cloud](https://www.brightcove.com/en/online-video-platform) or [Perform](https://www.brightcove.com/en/perform) player. |
| [`amp-dailymotion`](components/amp-dailymotion.html) | Displays a [Dailymotion](https://www.dailymotion.com) video. |
| [`amp-google-vrview-image`](components/amp-google-vrview-image) | Displays a VR image. |
| [`amp-hulu`](components/amp-hulu.html) | Displays a simple embedded [Hulu](http://www.hulu.com/) video. |
| [`amp-ima-video`](components/amp-ima-video.html) | Embeds a video player for instream video ads that are integrated with the [IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/). |
| [`amp-image-lightbox`](components/amp-image-lightbox.html) | Allows for an “image lightbox” or similar experience. |
| [`amp-img`](components/amp-img.html)  | Replaces the HTML5 `img` tag. |
| [`amp-imgur`](components/amp-imgur.html)  | Displays an [Imgur](http://imgur.com/) post. |
| [`amp-izlesene`](components/amp-izlesene.html)  | Displays an [Izlesene](https://www.izlesene.com/) video. |
| [`amp-jwplayer`](components/amp-jwplayer.html) | Displays a cloud-hosted [JW Player](https://www.jwplayer.com/). |
| [`amp-kaltura-player`](components/amp-kaltura-player.html) | Displays the Kaltura Player as used in [Kaltura's Video Platform](https://corp.kaltura.com/). |
| [`amp-nexxtv-player`](components/amp-nexxtv-player.html) | Displays a media stream from the nexxOMNIA platform. |
| [`amp-o2-player`](components/amp-o2-player.html) | Displays an [AOL O2Player](http://on.aol.com/). |
| [`amp-ooyala-player`](components/amp-ooyala-player.html) |  Displays an [Ooyala](https://www.ooyala.com/) video. |
| [`amp-playbuzz`](components/amp-playbuzz.html) |  Displays any [Playbuzz](http://www.playbuzz.com/) content (e.g., list, poll, etc.). |
| [`amp-reach-player`](components/amp-reach-player.html) | Displays a [Beachfront Reach](https://beachfrontreach.com/) video player. |
| [`amp-soundcloud`](components/amp-soundcloud.html) | Displays a [Soundcloud](https://soundcloud.com/) clip. |
| [`amp-springboard-player`](components/amp-springboard-player.html) | Displays a [Springboard Platform](http://publishers.springboardplatform.com/users/login) video player. |
| [`amp-video`](components/amp-video.html) | Replaces the HTML5 `video` tag. |
| [`amp-vimeo`](components/amp-vimeo.html) | Displays a [Vimeo](https://vimeo.com/) video. |
| [`amp-youtube`](components/amp-youtube.html) | Displays a [YouTube](https://www.youtube.com/) video. |

### Presentation

| Component | Description |
| --------- | ----------- |
| [`amp-animation`](components/amp-animation.html) | Defines and displays an animation. |
| [`amp-dynamic-css-classes`](components/amp-dynamic-css-classes.html) | Adds several dynamic CSS class names onto the HTML element. |
| [`amp-fit-text`](components/amp-fit-text.html) | Expands or shrinks font size to fit the content within the space given. |
| [`amp-font`](components/amp-font.html) | Triggers and monitors the loading of custom fonts. |
| [`amp-timeago`](components/amp-timeago.html) | Provides fuzzy timestamps by formatting dates as "***time ago***" (for example, 3 hours ago). |
| [`amp-viz-vega`](components/amp-viz-vega.html) | Displays visualizations created by using [Vega](https://vega.github.io/vega/) visualization grammar.|


### Social

| Component | Description |
| --------- | ----------- |
| [`amp-facebook-comments`](components/amp-facebook-comments.html) | Embeds the Facebook comments plugin. |
| [`amp-facebook-like`](components/amp-facebook-like.html) | Embeds the Facebook like button plugin. |
| [`amp-facebook`](components/amp-facebook.html) | Displays a Facebook post or video. |
| [`amp-gfycat`](components/amp-gfycat.html) | Displays a [Gfycat](https://gfycat.com) video GIF. |
| [`amp-instagram`](components/amp-instagram.html) | Displays an Instagram embed. |
| [`amp-pinterest`](components/amp-pinterest.html) | Displays a Pinterest widget or Pin It button. |
| [`amp-reddit`](components/amp-reddit.html) |  Displays a Reddit comment or post embed. |
| [`amp-social-share`](components/amp-social-share.html) | Displays a social share button. |
| [`amp-twitter`](components/amp-twitter.html) | Displays a Twitter tweet. |
| [`amp-vine`](components/amp-vine.html) | Displays a Vine simple embed. |
| [`amp-vk`](components/amp-vk.html) | Embeds a [VK](https://vk.com/) post or poll widget. |
