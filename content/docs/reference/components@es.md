---
$title: Componentes / Etiquetas
$order: 0
---
La librería de AMP HTML proporciona componentes que son clasificados así:

- **built-in**: Componentes que están incluidos en la librería básica, como por ejemplo `amp-img` y `amp-pixel`.
- **[extended](https://github.com/ampproject/amphtml/blob/master/extensions/README.md)**: Extensiones a la librería básica que deben ser excplícitamente incluidos en el documento como elementos personalizados (ej., `<script async custom-element="amp-audio" ...`).
- **[experimental](experimental.html)**: Componentes que han sido lanzados, pero aún están en etapa de pruebas y no están listos para ser usados en productivo.

Aquí están los componentes agrupados por categoría:

- [Anuncios y Analytics](#anuncios-y-analytics)
- [Contenido Dinámico](#conteido-dinámico)
- [Layout](#layout)
- [Media](#media)
- [Presentación](#presentación)
- [Social](#social)

### Anuncios y Analytics

| Componente | Descripción |
| --------- | ----------- |
| [`amp-ad`](components/amp-ad.html) | Un contenedor para mostrar un anuncio. |
| [`amp-ad-exit`](components/amp-ad-exit.html) | Proporciona comportamiento configurable para salidas de anuncios en A4A (AMP for Ads).|
| [`amp-analytics`](components/amp-analytics.html) | Captura los datos analíticos de un documento AMP. |
| [`amp-auto-ads`](components/amp-auto-ads.html) | Inyecta dinámicamente los anuncios en una página de AMP mediante un archivo de configuración de entrega remota. |
| [`amp-call-tracking`](components/amp-call-tracking.html) |  Reemplaza dinámicamente un número de teléfono en un hipervínculo para habilitar el seguimiento de llamadas. |
| [`amp-experiment`](components/amp-experiment.html) | Puede utilizarse para realizar experimentos de experiencia de usuario en un documento de AMP. |
| [`amp-pixel`](components/amp-pixel.html) | Un píxel de seguimiento para contar vistas de página. |
| [`amp-sticky-ad`](components/amp-sticky-ad.html) | Proporciona una forma de mostrar y pegar contenido de anuncios en la parte inferior de la página.|

### Contenido Dinámico

| Componente | Descripción |
| --------- | ----------- |
| [`amp-access-laterpay`](components/amp-access-laterpay.html) | Permite a los editores integrarse fácilmente con la plataforma de micropagos de [LaterPay](https://www.laterpay.net/).
| [`amp-access`](components/amp-access.html) | Proporciona un pago de AMP y soporte de suscripción.  |
| [`amp-bind`](components/amp-bind.html) | 
Permite que los elementos muten en respuesta a las acciones del usuario o cambios de datos a través de enlace de datos y expresiones similares a JS. |
| [`amp-form`](components/amp-form.html) | Proporciona soporte de formularios. |
| [`amp-gist`](components/amp-gist.html) | Muestra un [GitHub Gist](https://gist.github.com/). |
| [`amp-install-serviceworker`](components/amp-install-serviceworker.html) | Instala un ServiceWorker. |
| [`amp-list`](components/amp-list.html) | Descarga dinámicamente datos y crea elementos de lista utilizando una plantilla. |
| [`amp-live-list`](components/amp-live-list.html) | Proporciona una forma de mostrar y actualizar contenido en vivo. |
| [`amp-mustache`](components/amp-mustache.html) | Permite renderizar las plantillas de [`Mustache.js`](https://github.com/janl/mustache.js/). |
| [`amp-selector`](components/amp-selector.html) |  Representa un control que presenta un menú de opciones y permite al usuario elegir de él. |
| [`amp-user-notification`](components/amp-user-notification.html) | 
Muestra una notificación descartable para el usuario. |

### Layout

| Componente | Descripción |
| --------- | ----------- |
| [`amp-accordion`](components/amp-accordion.html) | Provides a way for viewers to have a glance at the outline of the content and jump to a section of their choice at will. |
| [`amp-app-banner`](components/amp-app-banner.html) | A wrapper and minimal UI for a cross-platform, fixed-position banner showing a call-to-action to install an app. |
| [`amp-carousel`](components/amp-carousel.html) | Displays multiple similar pieces of content along a horizontal axis. |
| [`amp-fx-flying-carpet`](components/amp-fx-flying-carpet.html) | Wraps its children in a unique full-screen scrolling container allowing you to display a full-screen ad without taking up the entire viewport. |
| [`amp-fx-parallax`](components/amp-fx-parallax.html) |  An attribute that enables a 3D-perspective effect on an element. |
| [`amp-iframe`](components/amp-iframe.html) | Displays an iframe. |
| [`amp-lightbox`](components/amp-lightbox.html) | Allows for a “lightbox” or similar experience. |
| [`amp-sidebar`](components/amp-sidebar.html) | Provides a way to display meta content intended for temporary access such as navigation, links, buttons, menus. |


### Media

| Componente | Descripción |
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

### Presentación

| Componente | Descripción |
| --------- | ----------- |
| [`amp-animation`](components/amp-animation.html) | Defines and displays an animation. |
| [`amp-dynamic-css-classes`](components/amp-dynamic-css-classes.html) | Adds several dynamic CSS class names onto the HTML element. |
| [`amp-fit-text`](components/amp-fit-text.html) | Expands or shrinks font size to fit the content within the space given. |
| [`amp-font`](components/amp-font.html) | Triggers and monitors the loading of custom fonts. |
| [`amp-timeago`](components/amp-timeago.html) | Provides fuzzy timestamps by formatting dates as "*** time ago" (for example, 3 hours ago). |
| [`amp-viz-vega`](components/amp-viz-vega.html) | Displays visualizations created by using [Vega](https://vega.github.io/vega/) visualization grammar.|


### Social

| Componente | Descripción |
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
