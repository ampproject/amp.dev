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
| [`amp-accordion`](components/amp-accordion.html) | Proporciona una manera para que los lectores tengan una mirada en el contorno del contenido y salten a una sección de su elección a voluntad. |
| [`amp-app-banner`](components/amp-app-banner.html) | Un contenedor y una interfaz de usuario mínima para un banner de posición fija cruzada y que muestra una llamada a la acción para instalar una aplicación. |
| [`amp-carousel`](components/amp-carousel.html) | Muestra varias piezas similares de contenido a lo largo de un eje horizontal. |
| [`amp-fx-flying-carpet`](components/amp-fx-flying-carpet.html) | Envuelve a sus hijos en un único contenedor de desplazamiento a pantalla completa que le permite mostrar un anuncio de pantalla completa sin ocupar toda la ventana de visualización. |
| [`amp-fx-parallax`](components/amp-fx-parallax.html) |  Un atributo que permite un efecto de perspectiva 3D en un elemento. |
| [`amp-iframe`](components/amp-iframe.html) | Muestra un iframe. |
| [`amp-lightbox`](components/amp-lightbox.html) | Permite “lightbox” o experiencia similar. |
| [`amp-sidebar`](components/amp-sidebar.html) | Proporciona una forma de mostrar meta contenido destinado al acceso temporal, como navegación, enlaces, botones, menús. |


### Media

| Componente | Descripción |
| --------- | ----------- |
| [`amp-3q-player`](components/amp-3q-player.html) | Inserta videos desde [3Q SDN.](https://www.3qsdn.com) |
| [`amp-anim`](components/amp-anim.html) | Gestiona una imagen animada, normalmente un GIF. |
| [`amp-apester-media`](components/amp-apester-media.html) | Muestra una unidad inteligente [Apester](https://apester.com/). |
| [`amp-audio`](components/amp-audio.html) | Reemplaza la etiqueta HTML5 `audio`. |
| [`amp-brid-player`](components/amp-brid-player.html) | Muestra el reproductor [Brid.tv](https://www.brid.tv/). |
| [`amp-brightcove`](components/amp-brightcove.html) | Muestra el [Brighcove Video Cloud](https://www.brightcove.com/en/online-video-platform) o el reproductor [Perform](https://www.brightcove.com/en/perform). |
| [`amp-dailymotion`](components/amp-dailymotion.html) | Muestra un video de [Dailymotion](https://www.dailymotion.com). |
| [`amp-google-vrview-image`](components/amp-google-vrview-image) | Muestra una imagen VR. |
| [`amp-hulu`](components/amp-hulu.html) | Muestra un video insertado de [Hulu](http://www.hulu.com/). |
| [`amp-ima-video`](components/amp-ima-video.html) | Inserta un reproductor de video para videos de anuncios integrados desde [IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/). |
| [`amp-image-lightbox`](components/amp-image-lightbox.html) | Permite un “image lightbox” o experiencia similar. |
| [`amp-img`](components/amp-img.html)  | Reemplaza la etiqueta HTML5 `img`. |
| [`amp-izlesene`](components/amp-izlesene.html)  | Muestra un video [Izlesene](https://www.izlesene.com/). |
| [`amp-jwplayer`](components/amp-jwplayer.html) | Muestra un cloud-hosted [JW Player](https://www.jwplayer.com/). |
| [`amp-kaltura-player`](components/amp-kaltura-player.html) | Muestra el reproductor Kaltura Player como se usa en [Kaltura's Video Platform](https://corp.kaltura.com/). |
| [`amp-nexxtv-player`](components/amp-nexxtv-player.html) | Muestra un flujo de medios de la plataforma nexxOMNIA. |
| [`amp-o2-player`](components/amp-o2-player.html) | Muestra un reproductor [AOL O2Player](http://on.aol.com/). |
| [`amp-ooyala-player`](components/amp-ooyala-player.html) |  Muestra un video [Ooyala](https://www.ooyala.com/). |
| [`amp-playbuzz`](components/amp-playbuzz.html) |  Muestra cualquier contenido desde [Playbuzz](http://www.playbuzz.com/) (por ejemplo listas, encuestas, etc.). |
| [`amp-reach-player`](components/amp-reach-player.html) | Muestra el reproductor de videos [Beachfront Reach](https://beachfrontreach.com/). |
| [`amp-soundcloud`](components/amp-soundcloud.html) | Muestra un clip de [Soundcloud](https://soundcloud.com/). |
| [`amp-springboard-player`](components/amp-springboard-player.html) | Muestra el reproductor de videos de[Springboard Platform](http://publishers.springboardplatform.com/users/login). |
| [`amp-video`](components/amp-video.html) | Reemplaza la etiqueta `video`. |
| [`amp-vimeo`](components/amp-vimeo.html) | Muestra un video de [Vimeo](https://vimeo.com/). |
| [`amp-youtube`](components/amp-youtube.html) | Muestra un video de [YouTube](https://www.youtube.com/). |

### Presentación

| Componente | Descripción |
| --------- | ----------- |
| [`amp-animation`](components/amp-animation.html) | Define y muestra una animación. |
| [`amp-dynamic-css-classes`](components/amp-dynamic-css-classes.html) | Agrega varios nombres de clase CSS dinámicos al elemento HTML.  |
| [`amp-fit-text`](components/amp-fit-text.html) | Expande o reduce el tamaño de la fuente para que se ajuste al contenido dentro del espacio dado. |
| [`amp-font`](components/amp-font.html) | Activa y supervisa la carga de las fuentes personalizadas. |
| [`amp-timeago`](components/amp-timeago.html) | Proporciona marcas de tiempo difusas mediante el formato de fechas como "***hace tiempo***" (por ejemplo, hace 3 horas) |
| [`amp-viz-vega`](components/amp-viz-vega.html) | Muestra visualizaciones creadas por [Vega](https://vega.github.io/vega/).|



### Social

| Componente | Descripción |
| --------- | ----------- |
| [`amp-facebook-comments`](components/amp-facebook-comments.html) | Inserta el complemento de comentarios de Facebook. |
| [`amp-facebook-like`](components/amp-facebook-like.html) | Inserta el Facebook like button plugin. |
| [`amp-facebook`](components/amp-facebook.html) | Muestra un post o video de Facebook. |
| [`amp-gfycat`](components/amp-gfycat.html) | Muestra un video GIF de [Gfycat](https://gfycat.com). |
| [`amp-instagram`](components/amp-instagram.html) | Muestra un Instagram embed. |
| [`amp-pinterest`](components/amp-pinterest.html) | Muestra un Pinterest widget o el botón Pin It. |
| [`amp-reddit`](components/amp-reddit.html) |  Muestra un comentario de Reddit o inserta un post. |
| [`amp-social-share`](components/amp-social-share.html) | Muestra botones sociales -para compartir. |
| [`amp-twitter`](components/amp-twitter.html) | Muestra un tweet de Twitter. |
| [`amp-vine`](components/amp-vine.html) | Muestra un video insertado desde Vine. |
