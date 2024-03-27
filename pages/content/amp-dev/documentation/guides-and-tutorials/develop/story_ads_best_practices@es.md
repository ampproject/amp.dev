---
'$title': Prácticas recomendadas para crear anuncios en las historias web
$order: 16
description: Las historias web son una atractiva experiencia en pantalla completa que introduce a los lectores en el contenido. Los anuncios que aparecen en las historias web deben tener un diseño uniforme e integrarse con las historias web UX.
formats:
  - anuncios
  - historias
---

Las historias web son una atractiva experiencia en pantalla completa que introduce a los lectores en el contenido. Los anuncios que aparecen en las historias web deben tener un diseño uniforme e integrarse con las historias web UX. Esto evita que haya alteraciones o interrupciones en la experiencia que tiene el usuario. En esta guía se muestra cómo construir un anuncio para las historias web.

## Principios de los anuncios de las historias web

Los formatos y conceptos que se utilizan actualmente en los anuncios de las historias de AMP, como banners y recuadros, no integran adecuadamente el formato que se requiere en dichas historias. Los anuncios convencionales son lentos, intrusivos y se sienten fuera de lugar dentro de la experiencia que transmiten las historias.

Los anuncios que aparecen en las historias web se ajustan a los siguientes principios:

- Para anuncios válidos de AMPHTML: siga las mismas especificaciones técnicas que usaría en un [anuncio de AMPHTML](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md) convencional.
- Primero lo visual: deben atraer la atención, ser llamativos y establecer una invitación basada en el contexto.
- Nativo: la página de anuncios tiene las mismas dimensiones que una página de historias bien estructurada.
- Utiliza el mismo modelo de interacción: el usuario puede pasar a la siguiente pantalla como lo haría con una página de historias convencional.
- Rápido: el anuncio nunca le aparecerá a un usuario cuyo estado está a la mitad de la carga.

Para ser consistente con estos principios, el tiempo de ejecución de las historias web determina la ubicación correcta donde aparecerá una página de anuncios en medio de la historia web. Puede obtener más información sobre los aspectos prácticos para la colocación de anuncios en el artículo [La publicidad en las historias web](advertise_amp_stories.md).

## Ejemplo de los anuncios en las historias web

Los anuncios que aparecen en las historias web son anuncios de tipo AMPHTML, pero necesitan de los datos que proporcionan las metaetiquetas, cumplen con las especificaciones de diseño que se definieron previamente y con los elementos que requiere la interfaz de usuario. Los anuncios en las historias web siempre incluirán un botón de llamada a la acción (CTA) y una etiqueta de anuncios que puede visualizarse como un texto de exención de responsabilidades en la parte superior de la página.

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='Example of an AMP Story ad', caption='Example of an AMP Story ad', align='' ) }}

Para que la experiencia del usuario se mantenga constante, el tiempo de ejecución de las historias web es el responsable de renderizar la etiqueta de los anuncios y el botón CTA.

[tip type="important"] **IMPORTANTE –** En los anuncios que aparecen en las historias web solo puede hacerse clic sobre el botón CTA, así que tenga esto en cuenta cuando desarrolle sus creativos. [/tip]

## Los datos que proporcionan las metaetiquetas

En los datos de las metaetiquetas se especifica que el anuncio cumple con el formato necesario para aparecer en las historias web, se establece la enumeración del texto en el botón CTA, además controlan el tipo de página y el lugar donde el botón enviará al usuario.

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <!-- Specifies where the user is directed -->
    <meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

    <!-- Specifies the call to action button text enum -->
    <meta name="amp-cta-type" content="EXPLORE">

    <!-- Specifies what type of landing page the user is direct to -->
    <meta name="amp-cta-landing-page-type" content="NONAMP">

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>
     amp-img {height: 100vh}
    </style>
    <script async src="https://ampjs.org/amp4ads-v0.js"></script>

  </head>
  <body>
    <amp-img src=%%FILE:JPG1%% layout="responsive" height="1280" width="720"></amp-img>
  </body>
</html>
[/sourcecode]

Es recomendable elegir la <code>amp-cta-type tag</code> entre las <a class="" href="">opciones de texto que están disponibles con el botón CTA</a>. Cuando sea necesario AMP encontrará automáticamente las opciones predefinidas.

Se permite utilizar el texto personalizado, pero tendrá que implementar su propia ubicación.

## Enumeración del texto en el botón de llamada a la acción <a name="call-to-action-button-text-enum"></a>

El botón de llamada a la acción puede configurarse desde un conjunto de opciones predefinido:

- `APPLY_NOW`: “Solicitar ahora”
- `BOOK_NOW`: “Registrar”
- `BUY_TICKETS`: “Comprar entradas”
- `DOWNLOAD`: “Descargar”
- `EXPLORE`: “Explorar ahora”
- `GET_NOW`: “Obtener ahora”
- `INSTALL`: “Instalar ahora”
- `LISTEN`: “Escuchar ahora”
- `MORE`: “Más”
- `OPEN_APP`: “Aplicación abierta”
- `ORDER_NOW`: "Pedir ahora"
- `PLAY`: “Reproducir”
- `READ`: “Leer ahora”
- `SHOP`: “Comprar ahora”
- `SHOWTIMES`: “Horarios”
- `SIGN_UP`: “Registrarse”
- `SUBSCRIBE`: “Suscribirse ahora”
- `USE_APP`: “Utilizar la aplicación”
- `VIEW`: “Consultar”
- `WATCH`: “Ver”
- `WATCH_EPISODE`: “Ver el episodio”

[tip type="note"] **TENGA EN CUENTA –** Los enlaces profundos no son compatibles con las aplicaciones, pero los enlaces a la página de la App Store o la página de Google Play Store son compatibles utilizando http/https. La enumeración del texto en el botón CTA se especifica en la carga útil durante la respuesta del anuncio. [/tip]

Si se necesita del soporte para crear una nueva enumeración del texto en el botón CTA, abra una [problemática en GitHub](https://github.com/ampproject/amphtml/issues/new).

## Página de destino de los anuncios

Puede especificar una de las siguientes tres opciones cuando desee crear una página de destino para los anuncios que aparecen en las historias web.

- `STORY`: La página de destino es una [historia patrocinada](story_ads_best_practices.md#sponsored-story).
- `AMP`: La página de destino es una página AMP válida.
- `NONAMP`: Cualquier otro tipo de página web.

## El diseño

De las historias de AMP es horizontal y en pantalla completa. Es necesario que los anuncios que aparecen en las historias cumplan con este formato para que proporcionen una experiencia de usuario uniforme.

## Superposición de dimensiones

La etiqueta de los anuncios se superpone en una barra oscura con efecto de degradado en todo el ancho del anuncio y se extenderá desde la parte superior hasta 46 pixeles en la parte inferior.

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='Demonstration of ad overlay', caption='The ad overlay sits at the top', align='' ) }}

El CTA se sitúa a 32 pixeles desde la parte inferior y está centrado horizontalmente, sus dimensiones son de 120 por 36 pixeles.

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='Demonstration of the CTA Button', caption='The CTA Button sits near the bottom', align='' ) }}

## Imágenes y video

Las imágenes y videos que se incluyan en un anuncio de las historias de AMP deben tener el formato 4:3 estándar en pantalla completa. Los anuncios que incluyen video deben utilizar un [cartel](../../../documentation/components/reference/amp-video.md#poster). Las dimensiones recomendadas para las imágenes de los carteles son 720 pixeles (720 de ancho x 1280 de alto).

[sourcecode:html]
<amp-video controls
  width="720"
  height="1280"
  layout="responsive"
  poster="images/kitten-playing.png">

  <source src="videos/kitten-playing.webm"
    type="video/webm" />
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
[/sourcecode]

### Imagénes

Las imágenes de fondo pueden ampliarse a pantalla completa. La siguiente CSS muestra una manera eficaz de recortar y centrar videos e imágenes.

[sourcecode:html]

<style amp-custom>
    amp-img, amp-video {
        height: 100vh;
    }
    amp-video video {
        object-fit: cover;
    }
    amp-img img{
        object-fit: cover;
    }
</style>

[/sourcecode]

### Video

#### Especifique `<source>` vs `src`

Cuando especifique la fuente de un [`amp-video`](../../../documentation/components/reference/amp-video.md)

Ejemplo: Especificar varios archivos fuente

[sourcecode:html]
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">

  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
[/sourcecode]

#### Tamaño y duración del video

Para lograr un rendimiento óptimo, trate de proporcionar videos que no sean más grandes que<br>4 MB. Cuando el tamaño de los archivos es menor se descargan más rápidamente, entonces procure que los archivos sean tan pequeños como sea posible.

#### Formatos de video

Si únicamente puede proporcionar un solo formato de video, proporcione el **MP4**. Sin embargo, siempre que sea posible, utilice el protocolo de video **HLS** y especifique MP4 como una solución alternativa para los navegadores que aún no admiten los videos HLS. El protocolo HLS realiza transmisiones con una tasa de bits adaptable, donde la calidad del video puede modificarse para ajustarse mejor a la conexión de red del usuario.

[tip type="note"] **TENGA EN CUENTA –** El formato de video HLS no es compatible con el navegador Chrome para equipos de escritorio (ni siquiera utilizando emuladores), por lo cual es necesario especificar una solución alternativa que admita el MP4 para todo tipo de tráfico que haya entre los equipos escritorio y su página. Para depurar videos HLS, necesitará utilizar un dispositivo móvil concreto mediante el modo de depuración USB. [/tip]

#### Resolución del video

Los videos que aparecen en las historias web siempre son verticales (por ejemplo, visualizaciones verticales), con una proporción esperada para el aspecto de 16:9. Utilice la resolución recomendada según el tipo de transmisión del video:

<table>
  <thead>
    <tr>
     <th>Tipo de transmisión del video</th>
     <th>Resolución</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>No adaptativa</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptativa</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>

[tip type="note"] **TENGA EN CUENTA –** Para los dispositivos móviles que difieren en la relación dimensional en una proporción 16:9, el video puede recortarse ya sea horizontal o verticalmente para ajustarse a la ventana de visualización. [/tip]

#### Códec de video

1. Para MP4, utilice `H.264`.
2. Para WEBM, utilice `VP9`.
3. Para HLS o DASH, utilice `H.264`.

#### Calidad del video

##### Mejoras en la transcodificación

Existen varias herramientas que puede utilizar para codificar videos y modificar su calidad durante la codificación. Estas son solo algunas:

<table>
  <thead>
    <tr>
     <th>Herramienta</th>
     <th>Notas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a></td>
     <td>Mejoras recomendadas:       <ul>         <li>Para MP4, utilice <code>-crf 23</code>.</li>         <li>Para WEBM, utilice <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a></td>
     <td>Mejoras recomendadas:       <ul>         <li>Para MP4, utilice <code>-crf 23</code>.</li>         <li>Para WEBM, utilice <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>Es un codificador que además puede emitir el formato HLS, incluida la lista de reproducción.</td>
    </tr>
  </tbody>
</table>

##### Tamaño de los segmentos HLS

Asegúrese de que el tamaño de sus segmentos HLS no exceda los 10 segundos de duración.

## Animación

Las animaciones que se incluyen en las historias contienen algunas advertencias, como el concepto de lo que es “visible”. Por ejemplo, en nuestra vista de escritorio con “3 paneles”, su creativo sería visible en la página pero no en el enfoque central. Esto podría ser un problema si el efecto deseado es iniciar las animaciones cuando una página se convierta en el punto focal principal.

Para solucionar esto, AMP agregará un atributo especial `amp-story-visible` a la estructura del creativo cuando este sea el punto focal en todos los contextos del servicio. Es recomendable que las animaciones se activen basándose en esta señal.

Ejemplo: esta animación se activará cuando la página se convierta en el punto focal, y se reinicia si un usuario hace clic en otra página de la historia y regresa.

[sourcecode:html]

<style amp-custom>
    body[amp-story-visible] .my-animation-class {
      animation: 2s my-animation-name;
    }
</style>

[/sourcecode]

## Historias patrocinadas <a name="sponsored-story"></a>

Una historia patrocinada existe como una URL en la web, que permite activar el tráfico del usuario hacia una historia patrocinada desde el botón de llamada a la acción en un anuncio que aparece en las historias de AMP. Las historias patrocinadas también son historias de AMP, pero se centran en crear experiencias publicitarias que sean inmersivas y extensas.

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='CTA button directs to a Sponsored Story', caption='CTA button directs to a Sponsored Story', align='' ) }}

Obtenga más información sobre cómo crear una [historia web aquí](../start/create_successful_stories.md).
