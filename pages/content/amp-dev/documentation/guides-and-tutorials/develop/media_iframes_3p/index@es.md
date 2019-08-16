---
$title: Incluir imágenes y videos
---

 Al igual que las páginas HTML normales, las páginas AMP te permiten insertar **imágenes** ,**videos**  y **audios**
Contenido. Descubre cómo incluir las versiones AMP equivalentes en tus páginas y qué diferencias existen entre ellas.

##  ¿Por qué no puedo utilizar `<img>` , `<video>` y `<audio>`?

 AMP no admite los equivalentes predeterminados de HTML para mostrar contenido multimedia, como `<img>`. Proporcionamos componentes equivalentes por los siguientes motivos:

*  Conocer el diseño de la página antes de que se carguen los recursos es fundamental para [admitir las ventanas gráficas iniciales precargadas.](../../../../about/how-amp-works.html#size-all-resources-statically)
*  Debemos controlar las solicitudes de red para [realizar cargas diferidas y priorizar los recursos de un modo efectivo.](../../../../about/how-amp-works.html#prioritize-resource-loading)

Precaución: Aunque no se admitan, se *renderizarán*, pero AMP no [validará tus páginas](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)
y no podrás aprovechar todas las ventajas que aporta AMP.

## Imágenes

 Para incluir una imagen en tu página, utiliza el elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md), como se muestra a continuación:

[example preview="inline" playground="true"]
```html
<amp-img alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195">
</amp-img>
```
[/example]

En este ejemplo muy básico, la imagen se mostrará con la altura y anchura fijas especificadas. Hay que especificar, como mínimo, unos valores determinados de anchura y altura.

#### Mostrar imágenes cuando JavaScript está inhabilitado

 Como `<amp-img>` depende de JavaScript, si el usuario elige inhabilitar las secuencias de comandos, no se mostrarán las imágenes. En este caso, debes proporcionar una alternativa a la imagen usando `<img>` y `<noscript>`, como se muestra a continuación:

[example preview="inline" playground="true"]
```html
<amp-img src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195">
  <noscript>
    <img src="{{server_for_email}}/static/inline-examples/images/sunset.jpg" width="264" height="195" />
  </noscript>
</amp-img>
```
[/example]

### Diseños avanzados

 Crear imágenes totalmente adaptables es mucho más fácil con AMP que con páginas en CSS/HTML estándar. En su forma más básica, solo tienes que añadir `layout="responsive"`:

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive">
</amp-img>
```
[/example]

Leer más: Consulta más información sobre [las técnicas de diseño avanzadas](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md).

### Comportamiento y marcadores de posición

El tiempo de ejecución de HTML en AMP permite gestionar recursos de imagen de una forma muy eficaz porque puedes elegir si retrasar o priorizar la carga de recursos en función de la posición de la ventana gráfica, los recursos del sistema, el ancho de banda de la conexión y otros factores.

Leer más: Descubre cómo [proporcionar alternativas y marcadores de posición para imágenes](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## Imágenes animadas

 El elemento [`amp-anim`](../../../../documentation/components/reference/amp-anim.md)  es muy parecido al elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md) y ofrece una función diferente a la hora de gestionar la carga y la reproducción de archivos GIF y de otros tipos de imágenes animadas.

[example preview="inline" playground="true" imports="amp-anim:0.1"]
```html
<amp-anim width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif">
  <amp-img placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png">
  </amp-img>
</amp-anim>
```
[/example]

Nota: Incluye`<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` en el encabezado de la página para usar este componente.

## Video

 Para incluir un video en tu página, utiliza el elemento [`amp-video`](../../../../documentation/components/reference/amp-video.md) .

 Úsalo solamente para insertar archivos de video HTML5 directos. Este elemento carga el recurso de video que determina el atributo `src` de manera diferida cuando lo determine la página AMP.

Incluye un marcador de posición antes del inicio del video y una alternativa, si el navegador no admite videos en HTML5, por ejemplo:

[example preview="inline" playground="true" imports="amp-video:0.1"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

## Audio

 Para incluir un recurso de audio en tu página, utiliza el elemento [`amp-audio`](../../../../documentation/components/reference/amp-audio.md) .

 Úsalo solo para insertar directamente archivos de audio HTML5. Igual que sucede con todos los recursos externos que se insertan en una página AMP, el elemento carga el recurso de audio especificado por el atributo `src` de manera diferida cuando lo determine la página AMP.

Incluye un marcador de posición antes del inicio del audio y una alternativa, si el navegador no admite audios en HTML5, por ejemplo:

[example preview="inline" playground="true" imports="amp-audio:0.1"]
```html
<amp-audio width="400"
  height="200"
  {% if format == 'stories' %}  layout="nodisplay" autoplay
  {% endif %}
  src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio.</p>
  </div>
  <source type="audio/mpeg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <source type="audio/ogg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.ogg">
</amp-audio>
```
[/example]

Nota: Incluye`<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` en el encabezado de la página para usar este componente.
