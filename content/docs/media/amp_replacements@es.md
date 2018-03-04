---
$title: Incluir imágenes y videos
---
[TOC]

 Al igual que las páginas HTML normales, las páginas AMP te permiten insertar **imágenes** ,**videos**  y **audios**
Contenido. Descubre cómo incluir las versiones AMP equivalentes en tus páginas y qué diferencias existen entre ellas.

##  ¿Por qué no puedo utilizar `<img>` , `<video>` y `<audio>`?

 AMP no admite los equivalentes predeterminados de HTML para mostrar contenido multimedia, como `<img>`. Proporcionamos componentes equivalentes por los siguientes motivos:

*  Conocer el diseño de la página antes de que se carguen los recursos es fundamental para [admitir las ventanas gráficas iniciales precargadas.](/es/learn/about-how/#size-all-resources-statically)
*  Debemos controlar las solicitudes de red para [realizar cargas diferidas y priorizar los recursos de un modo efectivo.](/es/learn/about-how/#prioritize-resource-loading)

{% call callout('Precaución', type='caution') %}
 Aunque no se admitan, se *renderizarán*, pero AMP no [validará tus páginas](/es/docs/guides/debug/validate.html) 
y no podrás aprovechar todas las ventajas que aporta AMP.
{% endcall %}

## Imágenes

 Para incluir una imagen en tu página, utiliza el elemento [`amp-img`](/es/docs/reference/components/amp-img.html), como se muestra a continuación:

<!--embedded example - fixed size image -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.fixed.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

En este ejemplo muy básico, la imagen se mostrará con la altura y anchura fijas especificadas. Hay que especificar, como mínimo, unos valores determinados de anchura y altura.

#### Mostrar imágenes cuando JavaScript está inhabilitado

 Como `<amp-img>` depende de JavaScript, si el usuario elige inhabilitar las secuencias de comandos, no se mostrarán las imágenes. En este caso, debes proporcionar una alternativa a la imagen usando `<img>` y `<noscript>`, como se muestra a continuación:

<!--embedded example - img with noscript -->
<div>
<amp-iframe height="215"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.noscript.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

### Diseños avanzados

 Crear imágenes totalmente adaptables es mucho más fácil con AMP que con páginas en CSS/HTML estándar. En su forma más básica, solo tienes que añadir `layout="responsive"`:

<!--embedded example - basic responsive image -->
<div>
<amp-iframe height="193"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Más artículos', type='success') %}
 Consulta más información sobre [las técnicas de diseño avanzadas](/es/docs/guides/responsive/control_layout.html).
{% endcall %}

### Comportamiento y marcadores de posición

El tiempo de ejecución de HTML en AMP permite gestionar recursos de imagen de una forma muy eficaz porque puedes elegir si retrasar o priorizar la carga de recursos en función de la posición de la ventana gráfica, los recursos del sistema, el ancho de banda de la conexión y otros factores.

{% call callout('Más artículos', type='success') %}
 Descubre cómo [proporcionar alternativas y marcadores de posición para imágenes](/es/docs/guides/responsive/placeholders.html).
{% endcall %}

## Imágenes animadas

 El elemento [`amp-anim`](/es/docs/reference/components/amp-anim.html)  es muy parecido al elemento `amp-img` y ofrece una función diferente a la hora de gestionar la carga y la reproducción de archivos GIF y de otros tipos de imágenes animadas.

<!--embedded amp-anim basic example -->
<div>
<amp-iframe height="253"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Nota', type='note') %}
 Incluye`<script async custom-element="amp-anim"
src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` 
en el encabezado de la página para usar este componente.
{% endcall %}

## Video

 Para incluir un video en tu página, utiliza el elemento [`amp-video`](/es/docs/reference/components/amp-video.html) .

 Úsalo solamente para insertar archivos de video HTML5 directos. Este elemento carga el recurso de video que determina el atributo `src` de manera diferida cuando lo determine la página AMP.

Incluye un marcador de posición antes del inicio del video y una alternativa, si el navegador no admite videos en HTML5, por ejemplo:

<!--embedded video example  -->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Audio

 Para incluir un recurso de audio en tu página, utiliza el elemento [`amp-audio`](/es/docs/reference/components/amp-audio.html) .

 Úsalo solo para insertar directamente archivos de audio HTML5. Igual que sucede con todos los recursos externos que se insertan en una página AMP, el elemento carga el recurso de audio especificado por el atributo `src` de manera diferida cuando lo determine la página AMP.

Incluye un marcador de posición antes del inicio del audio y una alternativa, si el navegador no admite audios en HTML5, por ejemplo:

<!--embedded audio example  -->
<div>
<amp-iframe height="314"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampaudio.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Nota', type='note') %}
 Incluye`<script async custom-element="amp-audio"
src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` 
en el encabezado de la página para usar este componente.
{% endcall %}

