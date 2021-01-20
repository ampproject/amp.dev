---
"$title": Información técnica de las historias web
"$order": '1'
description: Información técnica de las historias web
"$category": Develop
formats:
- stories
author: CrystalOnScript
---

En esta guía se explica toda la información técnica y las prácticas recomendadas que debe conocer para crear satisfactoriamente historias web con AMP.

## AMP válido

Una historia web técnicamente es una página web construida con AMP y que cumple con las especificaciones de AMP:

- Comenzar por el tipo de documento `<!doctype html>`.
- Incluir una etiqueta de nivel superior `<html ⚡>` o `<html amp>`.
- Incluir etiquetas `<head>` y `<body>`.
- Incluir una etiqueta ` <meta charset="utf-8">` como la primera etiqueta secundaria de la etiqueta `<head>`.
- Incluir una etiqueta `<script async src="https://cdn.ampproject.org/v0.js"></script>` dentro de la etiqueta `<head>`. Como práctica recomendada, debe incluir el script lo antes posible en el `<head>`.
- Incluir una etiqueta ` <link rel="canonical" href="page/url">` dentro de `<head>` y href debe indicar cuál es la URL de la historia web.
- Incluir una etiqueta `<meta name="viewport" content="width=device-width">` dentro de la etiqueta `<head>`. También se recomienda incluir initial-scale = 1.
- Incluir el [código reutilizable de AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) en la etiqueta `<head>`.

La diferencia entre una página web de AMP y una historia web que se construyó con AMP es el componente [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories). Este es el único elemento secundario directo del documento `<body>` y debe contener el atributo `standalone`. Todas las páginas, capas y elementos que conforman la historia web se definen dentro de las etiquetas `<amp-story>`.

```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html">
    <meta name="viewport" content="width=device-width">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-video"
        src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
    <script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <style amp-custom>
    ...
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story standalone
        title="Joy of Pets"
        publisher="AMP tutorials"
        publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
        poster-portrait-src="assets/cover.jpg">
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img src="assets/cover.jpg"
              width="720" height="1280"
              layout="responsive">
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>The Joy of Pets</h1>
          <p>By AMP Tutorials</p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 1 -->
      <amp-story-page id="page1">
        <amp-story-grid-layer template="vertical">
          <h1>Cats</h1>
          <amp-img src="assets/cat.jpg"
              width="720" height="1280"
              layout="responsive">
          </amp-img>
          <q>Dogs come when they're called. Cats take a message and get back to you. --Mary Bly</q>
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```

Siga el [tutorial Cree su primera historia web](../start/visual_story/?format=stories) y [consulte los documentos de referencia en la amp-story ](../../components/reference/amp-story/?format=stories)para obtener más información.

## Máximo rendimiento y experiencia del usuario

Los usuarios pueden ver Historias web en áreas con poca conexión a Internet o dispositivos antiguos. Asegúrese de que disfruten su experiencia siguiendo estas prácticas recomendadas.

### Color del fondo

Especifique un color para el fondo de cada página de la historia web. Tener un color de fondo proporciona una buena solución alternativa si las condiciones del usuario le impiden descargar imágenes o elementos de video. Seleccione un color que sea representativo del color dominante en el elemento de fondo previsto para la página o utilice un tema de color uniforme para todas las páginas de la historia. Asegúrese de que el color del fondo sea diferente al del texto para facilitar la legibilidad.

Defina el color de fondo que tendrán las páginas dentro de las etiquetas `<style amp-custom>` que se encuentran en el encabezado del documento de la historia web o en línea dentro del componente [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories).

### Capas de elementos

El encabezado del sistema contiene controles como los iconos de Silencio y Compartir. Este aparece con un índice Z mayor que la imagen y el video de fondo. Asegúrese de que estos iconos incluyan la información que no es esencial.

### Relación de aspecto

Diseñe los elementos de las historias web con una relación de aspecto de 9:16. Debido a que el alto y el ancho de la página varían según los navegadores y los dispositivos, no sitúe contenido esencial cerca de los bordes de la página.

### Imágenes de carteles

Al usuario se le muestra la imagen de un cartel mientras descarga un video. Dicha imagen debe ser representativa del video para permitir que la transición se realice sin problemas. Para especificar la imagen de un cartel agregue el atributo `poster` a su elemento amp-video e indique cuál es la ubicación de la imagen.

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## Video

Todos los videos deben agregarse mediante el componente [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories).

```
<amp-video controls
  width="640"
  height="360"
  layout="responsive"
  poster="/static/inline-examples/images/kitten-playing.png">
  <source src="/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

### Resolución y calidad

Codifique videos para ajustar la calidad en las siguientes optimizaciones sugeridas:

<table>
  <tr>
   <td>MP4</td>
   <td>-crf 23</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>-b:v 1M</td>
  </tr>
</table>

Intente mantener los segmentos de HLS por debajo de los 10 segundos de duración.

### Formato y tamaño

Cuide que los videos sean menores a 4 MB para garantizar que su rendimiento sea óptimo. Si es necesario, considere dividir los videos que sean más grandes en varias páginas.

En caso de que solamente pueda proporcionar un formato de video, trate de que sea en formato MP4. Cuando sea posible, utilice videos HLS y especifique el formato MP4 como una solución alternativa para asegurar la compatibilidad con el navegador. Utilice el siguiente códec de video:

<table>
  <tr>
   <td>MP4, HLS y DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### Especificar <source> vs src</source>

Utilice elementos secundarios `<source>` dentro del componente `<amp-video>` para especificar la fuente del video sobre el atributo `src`. El uso del elemento `<source>` le permitirá definir el tipo de video y agregar fuentes de respaldo para el video. Es necesario que utilice el atributo `type` para definir el tipo MIME. Utilice `application/x-mpegurl` o `application/vnd.apple.mpegurl` para los videos HLS. En el caso de todos los demás tipos de video, utilice el prefijo de MIME `video/` y siga el formato del video, como en `”video/mp4”`.

```html
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">
  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
```

### Avance automático después de los videos

El atributo [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) que se muestra en la página de la historia de AMP determina si la página de una historia debe avanzar y cuándo debe hacerlo sin que el usuario la toque. Para avanzar después de un video, indique el atributo hacia el ID del video.

```html
<amp-story-page auto-advance-after="myvideo">
```

## Experiencia con equipos de escritorio

El formato de las historias web es compatible con una [experiencia opcional para equipos de escritorio](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in). Esto cambia la experiencia que se tiene con los equipos de escritorio hacia un modo de pantalla completa inmersivo, el cual reemplaza la experiencia predeterminada de tres paneles verticales y permite que los usuarios de dispositivos móviles la vean cuando su dispositivo se coloca horizontalmente.

Suscríbase para recibir ayuda con su equipo de escritorio, para ello agregue el atributo `supports-landscape` al componente `<amp-story>`.

```html
<amp-story standalone
    supports-landscape
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/icon.svg"
    poster-portrait-src="assets/cover.jpg">
</amp-story>
```
