---
$title: Incluir contenido de terceros
---

Obtén información sobre cómo incluir componentes de terceros en tus páginas.

## Insertar un tuit

Inserta un tuit de Twitter en tu página
con el elemento <a href="{{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}"><code>amp-twitter</code></a>.

Para incluir un tuit en tu página,
incluye en primer lugar la siguiente secuencia de comandos en `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Actualmente, los tuits se adaptan de forma automática y proporcional a escala
para encajar en el tamaño indicado, pero es posible que la apariencia resultante no sea la ideal.
Ajusta la anchura y la altura de forma manual o usa el atributo de medios para seleccionar la relación de aspecto en función de la anchura de la pantalla.

<!-- embedded twitter example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.twitter.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

[tip type="tip"]
**TIP –** Puedes encontrar más ejemplos de [`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}) en [AMP By Example]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-twitter.html', locale=doc.locale).url.path}}).
[/tip]

## Insertar una foto de Instagram

Inserta una foto de Instagram en tu página con el elemento [`amp-instagram`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-instagram.md', locale=doc.locale).url.path}}).

Para incluir una foto de Instagram, en primer lugar incluye la siguiente secuencia de comandos en `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Incluye el código abreviado de datos de Instagram que se encuentra en la URL de la foto de Instagram.
Por ejemplo, en `https://instagram.com/p/fBwFP`, el código abreviado de datos es `fBwFP`.
Además, Instagram utiliza una relación de aspecto fija para los diseños adaptables, por lo que los valores de anchura y altura deben ser universales

<!-- embedded Instagram example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.instagram.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

[tip type="tip"]
**TIP –** Puedes encontrar más ejemplos de [`amp-instagram`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-instagram.md', locale=doc.locale).url.path}}) en [AMP By Example]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-instagram.html', locale=doc.locale).url.path}}).
[/tip]

## Mostrar entradas o vídeos de Facebook

Muestra una entrada o un vídeo de Facebook en tu página con el elemento [`amp-facebook`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-facebook.md', locale=doc.locale).url.path}}).

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
**TIP –** Puedes encontrar más ejemplos de [`amp-facebook`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-facebook.md', locale=doc.locale).url.path}}) en [AMP By Example]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-facebook.html', locale=doc.locale).url.path}}).
[/tip]

## Insertar un vídeo de YouTube

Inserta un vídeo de YouTube en tu página con el elemento [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}).

Debes incluir la siguiente secuencia de comandos en `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

El atributo `data-videoid` de YouTube se puede encontrar en todas las URL de las páginas de vídeo de YouTube.
Por ejemplo, en `https://www.youtube.com/watch?v=Z1q71gFeRqM`,
el ID de vídeo es `Z1q71gFeRqM`.

Utiliza `layout="responsive"` para producir diseños correctos para los vídeos con una relación de aspecto de 16:9:

<!-- embedded youtube example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.youtube.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

[tip type="tip"]
**TIP –** Puedes encontrar más ejemplos de [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}) en [AMP By Example]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-youtube.html', locale=doc.locale).url.path}}).
[/tip]

## Mostrar un anuncio

Muestra un anuncio en tu página utilizando el elemento [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}).
Únicamente son compatibles los anuncios que se publiquen a través de HTTPS.

No se puede ejecutar ningún JavaScript proporcionado por una red publicitaria en el documento de AMP.
En cambio, en tiempo de ejecución de AMP se carga un iframe desde un
origen diferente (a través de la zona de pruebas de iframe)
y se ejecuta el JS de la red publicitaria dentro de esa zona.

Debes especificar la anchura y la altura del anuncio y el tipo de red publicitaria.
El atributo `type` identifica la plantilla de la red publicitaria.
Los diferentes tipos de anuncios requieren diferentes atributos `data-*`.

<!-- embedded ad example -->
<div>
<amp-iframe height="212"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>
Si la red publicitaria lo admite, incluye un `placeholder` para que se muestre si no hay anuncios disponibles:

<!-- embedded ad example -->
<div>
<amp-iframe height="232"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-placeholder.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

AMP es compatible con una amplia gama de redes publicitarias. Consulta la [referencia para obtener una lista completa]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}#supported-ad-networks).

Leer más: Obtén más información sobre los anuncios en la guía [Publicar anuncios en AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/index.md', locale=doc.locale).url.path}}).
