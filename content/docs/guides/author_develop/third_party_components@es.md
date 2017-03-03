---
$title: Incluir contenido de terceros
---

Obtén información sobre cómo incluir componentes de terceros en tus páginas.

[TOC]

## Insertar un tuit

Inserta un tuit de Twitter en tu página
con el elemento <a href="/docs/reference/extended/amp-twitter.html">`amp-twitter`</a>.

Para incluir un tuit en tu página,
incluye en primer lugar la siguiente secuencia de comandos en `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Actualmente, los tuits se adaptan de forma automática y proporcional a escala
para encajar en el tamaño indicado, pero es posible que la apariencia resultante no sea la ideal.
Ajusta la anchura y la altura de forma manual o usa el atributo de medios para seleccionar la relación de aspecto en función de la anchura de la pantalla.

Ejemplo de `amp-twitter` del
[ejemplo twitter.amp](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html):

[sourcecode:html]
<amp-twitter width="390" height="50"
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
[/sourcecode]

## Insertar una foto de Instagram

Inserta una foto de Instagram en tu página con el elemento [`amp-instagram`](/docs/reference/extended/amp-instagram.html).

Para incluir una foto de Instagram, en primer lugar incluye la siguiente secuencia de comandos en `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Incluye el código abreviado de datos de Instagram que se encuentra en la URL de la foto de Instagram.
Por ejemplo, en `https://instagram.com/p/fBwFP`, el código abreviado de datos es `fBwFP`.
Además, Instagram utiliza una relación de aspecto fija para los diseños adaptables, por lo que los valores de anchura y altura deben ser universales

[sourcecode:html]
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
[/sourcecode]

## Mostrar entradas o vídeos de Facebook

Muestra una entrada o un vídeo de Facebook en tu página con el elemento [`amp-facebook`](/docs/reference/extended/amp-facebook.html).

Debes incluir la siguiente secuencia de comandos en `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

Ejemplo: insertar una entrada:

[sourcecode:html]
<amp-facebook width=486 height=657
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
[/sourcecode]

Ejemplo: insertar un vídeo:

[sourcecode:html]
<amp-facebook width=552 height=574
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
[/sourcecode]

## Insertar un vídeo de YouTube

Inserta un vídeo de YouTube en tu página con el elemento [`amp-youtube`](/docs/reference/extended/amp-youtube.html).

Debes incluir la siguiente secuencia de comandos en `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

El atributo `data-videoid` de YouTube se puede encontrar en todas las URL de las páginas de vídeo de YouTube.
Por ejemplo, en https://www.youtube.com/watch?v=Z1q71gFeRqM,
el ID de vídeo es Z1q71gFeRqM.

Utiliza `layout="responsive"` para producir diseños correctos para los vídeos con una relación de aspecto de 16:9:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
[/sourcecode]

## Mostrar un anuncio

Muestra un anuncio en tu página utilizando el elemento [`amp-ad`](/docs/reference/amp-ad.html).
Únicamente son compatibles los anuncios que se publiquen a través de HTTPS.

No se puede ejecutar ningún JavaScript proporcionado por una red publicitaria en el documento de AMP.
En cambio, en tiempo de ejecución de AMP se carga un iframe desde un
origen diferente (a través de la zona de pruebas de iframe)
y se ejecuta el JS de la red publicitaria dentro de esa zona.

Debes especificar la anchura y la altura del anuncio y el tipo de red publicitaria.
El atributo `type` identifica la plantilla de la red publicitaria.
Los diferentes tipos de anuncios requieren diferentes atributos `data-*`.

[sourcecode:html]
<amp-ad width="300" height="250"
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
[/sourcecode]

Si la red publicitaria lo admite, incluye un `placeholder` para que se muestre si no hay anuncios disponibles:

[sourcecode:html]
<amp-ad width="300" height="250"
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
[/sourcecode]

AMP es compatible con una amplia gama de redes publicitarias. Consulta la [referencia para obtener una lista completa](/docs/reference/amp-ad.html#supported-ad-networks).
