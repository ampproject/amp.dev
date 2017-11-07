---
$title: Componentes / Etiquetas
$order: 0
---
La librería de AMP HTML proporciona componentes que son clasificados así:

- **integrado**: componentes incluidos en la biblioteca base, como `amp-img` y `amp-pixel`.
- **[extendido](https://github.com/ampproject/amphtml/blob/master/extensions/README.md)**: extensiones de la biblioteca base que deben incluirse explícitamente en el documento como elementos personalizados (por ejemplo, `<script async custom-element="amp-audio" ...`).
- **[experimental](experimental.html)**: componentes que se han publicado pero todavía no están listos para que el público general pueda usarlos.

Los complementos se clasifican en las siguientes categorías:

- [Anuncios y analíticas](#anuncios-y-analíticas)
- [Contenido dinámico](#contenido-dinámico)
- [Diseño](#diseño)
- [Contenido multimedia](#contenido-multimedia)
- [Presentación](#presentación)
- [Redes sociales](#redes-sociales)

### Anuncios y Analíticas

| Componente | Descripción |
| --------- | ----------- |
| [`amp-ad`](components/amp-ad.html) | Representa un contenedor que puede mostrar un anuncio. |
| [`amp-ad-exit`](components/amp-ad-exit.html) | Permite configurar el comportamiento de salidas de anuncios de A4A (AMP for Ads). |
| [`amp-analytics`](components/amp-analytics.html) | Captura datos de analíticas de un documento AMP. |
| [`amp-auto-ads`](components/amp-auto-ads.html) | Inserta de forma dinámica anuncios en una página AMP mediante un archivo de configuración servido remotamente. |
| [`amp-call-tracking`](components/amp-call-tracking.html) | Cambia de forma dinámica un número de teléfono de un hiperenlace para habilitar el seguimiento de llamadas. |
| [`amp-experiment`](components/amp-experiment.html) | Se puede emplear para realizar pruebas de experiencia de usuario en un documento AMP. |
| [`amp-pixel`](components/amp-pixel.html) | Representa un píxel de seguimiento para contar las visitas de las páginas. |
| [`amp-sticky-ad`](components/amp-sticky-ad.html) | Permite que se muestre y fije contenido de anuncios en la parte inferior de la página. |

### Contenido Dinámico

| Componente | Descripción |
| --------- | ----------- |
| [`amp-access-laterpay`](components/amp-access-laterpay.html) | Permite que los editores integren fácilmente la plataforma de micropagos [LaterPay](https://www.laterpay.net/). |
| [`amp-access`](components/amp-access.html) | Proporciona un muro de pago AMP y asistencia en el registro. |
| [`amp-bind`](components/amp-bind.html) | Permite que los elementos muten como respuesta a las acciones de un usuario o a cambios de datos a través de vínculos de datos y expresiones simples similares a JS. |
| [`amp-form`](components/amp-form.html) | Admite el uso de formularios. |
| [`amp-gist`](components/amp-gist.html) | Muestra un repositorio [GitHub Gist](https://gist.github.com/). |
| [`amp-install-serviceworker`](components/amp-install-serviceworker.html) | Instala una secuencia de comandos service worker. |
| [`amp-list`](components/amp-list.html) | Baja datos de forma dinámica y crea elementos de lista mediante una plantilla. |
| [`amp-live-list`](components/amp-live-list.html) | Permite que el contenido se muestre y se actualice en directo. |
| [`amp-mustache`](components/amp-mustache.html) | Permite el renderizado de las plantillas [`Mustache.js`](https://github.com/janl/mustache.js/). |
| [`amp-selector`](components/amp-selector.html) | Representa un menú de varias opciones que el usuario puede elegir. |
| [`amp-user-notification`](components/amp-user-notification.html) | Muestra una notificación que los usuarios pueden ignorar. |
| [`amp-web-push`](components/amp-web-push.html) | Permite que los usuarios se subscriban a [notificaciones push en la Web](https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/). |

### Diseño

| Componente | Descripción |
| --------- | ----------- |
| [`amp-accordion`](components/amp-accordion.html) | Permite que los usuarios echen un vistazo a la descripción del contenido y vayan directos a la sección que quieran cuando lo deseen. |
| [`amp-app-banner`](components/amp-app-banner.html) | Un contenedor y una IU básica que se pueden utilizar en un banner multiplataforma de posición fija que tenga una llamada a la acción para descargar una aplicación. |
| [`amp-carousel`](components/amp-carousel.html) | Muestra varios fragmentos de contenido similares en un eje horizontal. |
| [`amp-fx-flying-carpet`](components/amp-fx-flying-carpet.html) | Envuelve sus elementos secundarios en un contenedor único que se desplaza por la pantalla, lo que te permite mostrar un anuncio de pantalla completa sin ocupar todo el viewport. |
| [`amp-fx-parallax`](components/amp-fx-parallax.html) | Un atributo que habilita el efecto de perspectiva en 3D de un elemento. |
| [`amp-iframe`](components/amp-iframe.html) | Muestra un iframe. |
| [`amp-lightbox`](components/amp-lightbox.html) | Permite implementar un elemento lightbox o una experiencia similar. |
| [`amp-position-observer`](components/amp-position-observer.html) | Supervisa la posición de un elemento dentro del viewport mientras el usuario se desplaza por la pantalla, y coordina eventos que se pueden usar con otros componentes. |
| [`amp-sidebar`](components/amp-sidebar.html) | Posibilita que se muestre metacontenido pensado para accesos temporales, como por ejemplo, la navegación, los enlaces, los botones o los menús. |


### Contenido multimedia

| Componente | Descripción |
| --------- | ----------- |
| [`amp-3q-player`](components/amp-3q-player.html) | Inserta vídeos de [3Q SDN](https://www.3qsdn.com). |
| [`amp-anim`](components/amp-anim.html) | Gestiona una imagen animada, normalmente un GIF. |
| [`amp-apester-media`](components/amp-apester-media.html) | Muestra un recurso inteligente de [Apester](https://apester.com/). |
| [`amp-audio`](components/amp-audio.html) | Reemplaza la etiqueta HTML5 `audio`. |
| [`amp-brid-player`](components/amp-brid-player.html) | Muestra un reproductor de [Brid.tv](https://www.brid.tv/). |
| [`amp-brightcove`](components/amp-brightcove.html) | Muestra la plataforma de vídeo en línea [Video Cloud](https://www.brightcove.com/es/online-video-platform) o el reproductor [Perform](https://www.brightcove.com/es/perform) de Brightcove. |
| [`amp-dailymotion`](components/amp-dailymotion.html) | Muestra un vídeo de [Dailymotion](https://www.dailymotion.com). |
| [`amp-google-vrview-image`](components/amp-google-vrview-image) | Muestra una imagen de RV. |
| [`amp-hulu`](components/amp-hulu.html) | Muestra un vídeo sencillo insertado de [Hulu](http://www.hulu.com/). |
| [`amp-ima-video`](components/amp-ima-video.html) | Inserta un reproductor de vídeo para anuncios de vídeo in-stream integrados con el [SDK de IMA](https://developers.google.com/interactive-media-ads/docs/sdks/html5/). |
| [`amp-image-lightbox`](components/amp-image-lightbox.html) | Permite implementar un elemento lightbox de imagen o una experiencia similar. |
| [`amp-img`](components/amp-img.html) | Reemplaza la etiqueta HTML5 `img`. |
| [`amp-imgur`](components/amp-imgur.html) | Muestra una publicación de [Imgur](http://imgur.com/). |
| [`amp-izlesene`](components/amp-izlesene.html) | Muestra un vídeo de [Izlesene](https://www.izlesene.com/). |
| [`amp-jwplayer`](components/amp-jwplayer.html) | Muestra un reproductor [JWPlayer](https://www.jwplayer.com/) alojado en la nube. |
| [`amp-kaltura-player`](components/amp-kaltura-player.html) | Muestra el reproductor Kaltura tal como se usa en la [plataforma de vídeo de Kaltura](https://es.corp.kaltura.com/). |
| [`amp-nexxtv-player`](components/amp-nexxtv-player.html) | Muestra una emisión de contenido multimedia de la plataforma nexxOMNIA. |
| [`amp-o2-player`](components/amp-o2-player.html) | Muestra un reproductor [AOL O2Player](http://on.aol.com/). |
| [`amp-ooyala-player`](components/amp-ooyala-player.html) | Muestra un vídeo de [Ooyala](https://www.ooyala.com/). |
| [`amp-playbuzz`](components/amp-playbuzz.html) | Muestra cualquier contenido de [Playbuzz](http://www.playbuzz.com/) (por ejemplo una lista, una encuesta, etc.). |
| [`amp-reach-player`](components/amp-reach-player.html) | Muestra un reproductor de vídeo [Beachfront Reach](https://beachfrontreach.com/). |
| [`amp-soundcloud`](components/amp-soundcloud.html) | Muestra un clip de [Soundcloud](https://soundcloud.com/). |
| [`amp-springboard-player`](components/amp-springboard-player.html) | Muestra un reproductor de vídeo [Springboard Platform](http://publishers.springboardplatform.com/users/login). |
| [`amp-video`](components/amp-video.html) | Sustituye la etiqueta HTML5 `video`. |
| [`amp-vimeo`](components/amp-vimeo.html) | Muestra un vídeo de [Vimeo](https://vimeo.com/). |
| [`amp-youtube`](components/amp-youtube.html) | Muestra un vídeo de [YouTube](https://www.youtube.com/). |

### Presentación

| Componente | Descripción |
| --------- | ----------- |
| [`amp-animation`](components/amp-animation.html) | Define y muestra una animación. |
| [`amp-dynamic-css-classes`](components/amp-dynamic-css-classes.html) | Añade varios nombres de clase CSS dinámicos al elemento HTML. |
| [`amp-fit-text`](components/amp-fit-text.html) | Aumenta o reduce el tamaño de fuente para que el contenido quepa en el espacio disponible. |
| [`amp-font`](components/amp-font.html) | Activa y controla la carga de fuentes personalizadas. |
| [`amp-timeago`](components/amp-timeago.html) | Proporciona marcas de tiempo imprecisas al formatear las fechas como "***hace cierto tiempo***" (por ejemplo, hace tres horas). |
| [`amp-viz-vega`](components/amp-viz-vega.html) | Muestra elementos visuales creados con la gramática visual [Vega](https://vega.github.io/vega/). |


### Redes sociales

| Componente | Descripción |
| --------- | ----------- |
| [`amp-facebook-comments`](components/amp-facebook-comments.html) | Inserta el complemento de comentarios de Facebook. |
| [`amp-facebook-like`](components/amp-facebook-like.html) | Inserta el complemento del botón Me gusta de Facebook. |
| [`amp-facebook`](components/amp-facebook.html) | Muestra una publicación o vídeo de Facebook. |
| [`amp-gfycat`](components/amp-gfycat.html) | Muestra un GIF de vídeo de [Gfycat](https://gfycat.com). |
| [`amp-instagram`](components/amp-instagram.html) | Muestra una publicación insertada de Instagram. |
| [`amp-pinterest`](components/amp-pinterest.html) | Muestra un widget o el botón Pin It de Pinterest. |
| [`amp-reddit`](components/amp-reddit.html) | Muestra un comentario o una publicación insertados de Reddit. |
| [`amp-social-share`](components/amp-social-share.html) | Muestra un botón para compartir contenido en las redes sociales. |
| [`amp-twitter`](components/amp-twitter.html) | Muestra un tuit de Twitter. |
| [`amp-vine`](components/amp-vine.html) | Muestra un vídeo insertado de Vine. |
