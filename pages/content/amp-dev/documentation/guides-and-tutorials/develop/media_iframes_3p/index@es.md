---
'$title': Adición de imágenes y videos
$order: 8
description: Al igual que las páginas HTML normales, las páginas AMP le permiten insertar contenidos de imágenes, videos y  audios. Descubra cómo...
formats:
  - websites
  - stories
  - email
  - ads
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Al igual que las páginas HTML normales, las páginas AMP le permiten insertar contenidos de **imágenes**, **videos** y **audios**. Descubra cómo incluir las versiones AMP equivalentes en sus páginas y qué diferencias existen entre ellas.

## ¿Por qué no puedo utilizar <code>&lt;img></code>, <code>&lt;video></code> y <code>&lt;audio></code>?

AMP no admite los equivalentes predeterminados de HTML para mostrar contenido multimedia, como `<img>`. Proporcionamos componentes equivalentes por los siguientes motivos:

- Es esencial conocer el diseño de la página antes de que se carguen los recursos para [admitir las ventanas gráficas iniciales precargadas.](../../../../about/how-amp-works.html#size-all-resources-statically)
- Debemos controlar las solicitudes de red para [realizar cargas diferidas y priorizar los recursos de un modo efectivo.](../../../../about/how-amp-works.html#prioritize-resource-loading)

Precaución: Aunque no se admitan, se _renderizarán_, pero AMP no [validará sus páginas](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) y no podrá aprovechar todas las ventajas que ofrece AMP.

## Imágenes

Para incluir una imagen en su página, utilice el elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md), tal como se muestra a continuación:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
</amp-img>
```

[/example]

En este ejemplo muy básico, la imagen se mostrará con la altura y el ancho fijos especificados. Hay que especificar al menos unos valores determinados de ancho y alto.

#### Mostrar imágenes cuando JavaScript está inhabilitado

Como `<amp-img>` depende de JavaScript, si el usuario elige inhabilitar las secuencias de comandos, no se mostrarán las imágenes. En este caso, debe proporcionar una alternativa a la imagen usando `<img>` y `<noscript>`, como se muestra a continuación:

[example preview="inline" playground="true"]

```html
<amp-img
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
  <noscript>
    <img
      src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
      width="264"
      height="195"
    />
  </noscript>
</amp-img>
```

[/example]

### Diseños avanzados

Crear imágenes totalmente adaptables es mucho más fácil con AMP que con páginas en CSS/HTML estándar. En su forma más básica, solo debe añadir `layout="responsive"`:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive"
>
</amp-img>
```

[/example]

[tip type="read-on"] <strong>MÁS INFORMACIÓN: </strong> Obtenga más información sobre [las técnicas de diseño avanzadas](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

### Comportamiento y marcadores de posición

El tiempo de ejecución de HTML en AMP permite administrar los recursos de imagen de una forma muy eficaz porque puede elegir si retrasar o priorizar la carga de recursos según la posición de la ventana gráfica, los recursos del sistema, el ancho de banda de la conexión y otros factores.

[tip type="read-on"] <strong>MÁS INFORMACIÓN: </strong> Descubra cómo [proporcionar alternativas y marcadores de posición para las imágenes](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

## Imágenes animadas

El elemento [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) es muy parecido al elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md) y ofrece una función diferente a la hora de administrar la carga y la reproducción de imágenes animadas, como los archivos GIF.

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
>
  <amp-img
    placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
  >
  </amp-img>
</amp-anim>
```

[/example]

[tip type="tip"] <strong>NOTA:</strong> Incluya`<script async custom-element="amp-anim" src="https://ampjs.org/v0/amp-anim-0.1.js"></script>` en el encabezado de la página para usar este componente.[/tip]

## Video

Para incluir un video en su página, utilice el elemento [`amp-video`](../../../../documentation/components/reference/amp-video.md) .

Úselo solamente para insertar archivos de video HTML5 directos. Este elemento carga el recurso de video que determina el atributo `src` de manera diferida cuando lo determine la página AMP.

Incluya un marcador de posición antes del inicio del video y una alternativa, si el navegador no admite videos en HTML5, por ejemplo:

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

Para incluir un recurso de audio en su página, utilice el elemento [`amp-audio`](../../../../documentation/components/reference/amp-audio.md) .

Úselo solo para insertar directamente archivos de audio HTML5. Igual que sucede con todos los recursos externos que se insertan en una página AMP, el elemento carga el recurso de audio especificado por el atributo `src` de manera diferida cuando lo determine la página AMP.

Include a fallback, if the browser doesn't support HTML5 audio, for example:

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

[tip type="tip"] <strong>NOTA:</strong> Incluya`<script async custom-element="amp-audio" src="https://ampjs.org/v0/amp-audio-0.1.js"></script>` en el encabezado de la página para usar este componente. [/tip]
