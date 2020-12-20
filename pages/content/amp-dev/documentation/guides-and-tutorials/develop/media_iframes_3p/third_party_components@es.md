---
"$title": Inclusión de contenido de terceros
"$order": '9'
description: Obtenga información sobre cómo incluir componentes de terceros en sus páginas...
formats:
- websites
components:
- iframe
- facebook
author: Meggin
contributors:
- pbakaus
- bpaduch
---

Obtenga información sobre cómo incluir componentes de terceros en sus páginas.

## Inserción de un tuit

Inserte un tuit de Twitter en su página con el elemento <a href="../../../../documentation/components/reference/amp-twitter.md"><code>amp-twitter</code></a>.

Para incluir un tuit en su página, incluya en primer lugar la siguiente secuencia de comandos en `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Actualmente, los tuits se adaptan de forma automática y a una escala proporcional para encajar en el tamaño indicado, pero es posible que la apariencia resultante no sea la ideal. Ajuste el ancho y la altura de forma manual o utilice el atributo de medios para seleccionar la relación de aspecto según el ancho de la pantalla.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

[tip type="tip"] **CONSEJO:** Puede encontrar más ejemplos de [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) en [Ejemplos de AMP](../../../../documentation/examples/documentation/amp-twitter.html). [/tip]

## Inserción en Instagram

Inserte un Instagram en su página mediante el elemento [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md).

Para incluir un Instagram, primero incluya la siguiente secuencia de comandos en el `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram"
  src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Incluya el código abreviado de datos de Instagram que se encuentra en la URL del Instagram. Por ejemplo, en `https://instagram.com/p/fBwFP`, el código abreviado de datos es `fBwFP`. Además, Instagram utiliza una relación de aspecto fija para los diseños adaptables, por lo que los valores de ancho y alto deben ser universales

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

[tip type="tip"] **CONSEJO:** Puede encontrar más ejemplos de [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) en [Ejemplos de AMP](../../../../documentation/examples/documentation/amp-instagram.html). [/tip]

## Cómo mostrar entradas o videos de Facebook

Muestre una entrada o un video de Facebook en su página con el elemento [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md).

Debe incluir la siguiente secuencia de comandos en el `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook"
  src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### Ejemplo: Inserción de una entrada

Fuente:

```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```

Vista previa: {amp-facebook0} {/amp-facebook0}

##### Ejemplo: Inserción de un video

Fuente:

```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```

Vista previa: {amp-facebook0} {/amp-facebook0}

[tip type="tip"] **CONSEJO:** Puede encontrar más ejemplos de [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) en [Ejemplos de AMP](../../../../documentation/examples/documentation/amp-facebook.html). [/tip]

## Cómo insertar un video de YouTube

Inserte un video de YouTube en su página con el elemento [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md).

Debe incluir la siguiente secuencia de comandos en el `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

El atributo `data-videoid` de YouTube puede encontrarse en todas las URL de las páginas de videos de YouTube. Por ejemplo, en `https://www.youtube.com/watch?v=Z1q71gFeRqM`, el ID del video es `Z1q71gFeRqM`.

Utilice `layout="responsive"` para producir diseños correctos para los videos con una relación de aspecto de 16:9:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

[tip type="tip"] **CONSEJO:** Puede encontrar más ejemplos de [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) en [Ejemplos de AMP](../../../../documentation/examples/documentation/amp-youtube.html). [/tip]

## Mostrar un anuncio

Muestre un anuncio en su página utilizando el elemento [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Únicamente son compatibles los anuncios que se publiquen mediante HTTPS.

No se puede ejecutar ningún JavaScript proporcionado por una red publicitaria en el documento de AMP. En cambio, en tiempo de ejecución de AMP se carga un iframe desde un origen diferente (a través de la zona de pruebas de iframe) y se ejecuta el JS de la red publicitaria dentro de esa zona.

Debe especificar el ancho y el alto del anuncio y el tipo de red publicitaria. El atributo `type` identifica la plantilla de la red publicitaria. Los diferentes tipos de anuncios requieren diferentes atributos `data-*`.

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
</amp-ad>
```
[/example]

Si la red publicitaria lo permite, incluya un <code>placeholder</code> para que se muestre si no hay anuncios disponibles:

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
  <div placeholder>Have a great day!</div>
</amp-ad>
```
[/example]

AMP es compatible con una amplia variedad de redes publicitarias. Consulte [<code>amp-ad</code>](../../../../documentation/guides-and-tutorials/develop/monetization/index.md) para obtener una lista completa.

[tip type="read-on"] **MÁS INFORMACIÓN: ** Obtenga más información sobre los anuncios en la guía <a>Cómo publicar anuncios en AMP</a>. [/tip]
