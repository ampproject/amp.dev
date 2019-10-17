---
$title: Incluir contenido de terceros
---

Obtén información sobre cómo incluir componentes de terceros en tus páginas.

## Insertar un tuit

Inserta un tuit de Twitter en tu página
con el elemento <a href="../../../../documentation/components/reference/amp-twitter.md"><code>amp-twitter</code></a>.

Para incluir un tuit en tu página,
incluye en primer lugar la siguiente secuencia de comandos en `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Actualmente, los tuits se adaptan de forma automática y proporcional a escala
para encajar en el tamaño indicado, pero es posible que la apariencia resultante no sea la ideal.
Ajusta la anchura y la altura de forma manual o usa el atributo de medios para seleccionar la relación de aspecto en función de la anchura de la pantalla.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

[tip type="tip"]
**TIP –** Puedes encontrar más ejemplos de [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) en [AMP By Example](../../../../documentation/examples/documentation/amp-twitter.html).
[/tip]

## Insertar una foto de Instagram

Inserta una foto de Instagram en tu página con el elemento [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md).

Para incluir una foto de Instagram, en primer lugar incluye la siguiente secuencia de comandos en `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Incluye el código abreviado de datos de Instagram que se encuentra en la URL de la foto de Instagram.
Por ejemplo, en `https://instagram.com/p/fBwFP`, el código abreviado de datos es `fBwFP`.
Además, Instagram utiliza una relación de aspecto fija para los diseños adaptables, por lo que los valores de anchura y altura deben ser universales

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

[tip type="tip"]
**TIP –** Puedes encontrar más ejemplos de [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) en [AMP By Example](../../../../documentation/examples/documentation/amp-instagram.html).
[/tip]

## Mostrar entradas o vídeos de Facebook

Muestra una entrada o un vídeo de Facebook en tu página con el elemento [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md).

Debes incluir la siguiente secuencia de comandos en `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### Ejemplo: insertar una entrada

Fuente:
```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```
Avance:
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>

##### Ejemplo: insertar un vídeo

Fuente:
```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```
Avance:
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>

[tip type="tip"]
**TIP –** Puedes encontrar más ejemplos de [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) en [AMP By Example](../../../../documentation/examples/documentation/amp-facebook.html).
[/tip]

## Insertar un vídeo de YouTube

Inserta un vídeo de YouTube en tu página con el elemento [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md).

Debes incluir la siguiente secuencia de comandos en `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

El atributo `data-videoid` de YouTube se puede encontrar en todas las URL de las páginas de vídeo de YouTube.
Por ejemplo, en `https://www.youtube.com/watch?v=Z1q71gFeRqM`,
el ID de vídeo es `Z1q71gFeRqM`.

Utiliza `layout="responsive"` para producir diseños correctos para los vídeos con una relación de aspecto de 16:9:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

[tip type="tip"]
**TIP –** Puedes encontrar más ejemplos de [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) en [AMP By Example](../../../../documentation/examples/documentation/amp-youtube.html).
[/tip]

## Mostrar un anuncio

Muestra un anuncio en tu página utilizando el elemento [`amp-ad`](../../../../documentation/components/reference/amp-ad.md).
Únicamente son compatibles los anuncios que se publiquen a través de HTTPS.

No se puede ejecutar ningún JavaScript proporcionado por una red publicitaria en el documento de AMP.
En cambio, en tiempo de ejecución de AMP se carga un iframe desde un
origen diferente (a través de la zona de pruebas de iframe)
y se ejecuta el JS de la red publicitaria dentro de esa zona.

Debes especificar la anchura y la altura del anuncio y el tipo de red publicitaria.
El atributo `type` identifica la plantilla de la red publicitaria.
Los diferentes tipos de anuncios requieren diferentes atributos `data-*`.

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
Si la red publicitaria lo admite, incluye un `placeholder` para que se muestre si no hay anuncios disponibles:

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

AMP es compatible con una amplia gama de redes publicitarias. Consulta la [referencia para obtener una lista completa](../../../../documentation/components/reference/amp-ad.md#supported-ad-networks).

Leer más: Obtén más información sobre los anuncios en la guía [Publicar anuncios en AMP](../../../../documentation/guides-and-tutorials/develop/monetization/index.md).
