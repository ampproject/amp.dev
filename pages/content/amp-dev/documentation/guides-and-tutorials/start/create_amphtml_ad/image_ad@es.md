---
"$title": Cómo crear un anuncio gráfico
"$order": '1'
description: 'Nuestro anuncio consiste en una imagen sencilla con un hipervínculo hacia el sitio anunciado. Para mostrar la imagen utilizaremos la etiqueta amp-img. Este es el código: ...'
---

En el interior del `<body>` que se encuentra en el documento de su anuncio AMPHTML, puede incluir las etiquetas HTML y AMP. Sin embargo, no todas las etiquetas están permitidas. Consulte las [especificaciones del anuncio AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins) para obtener una lista con las etiquetas que pueden utilizarse.

Nuestro anuncio consiste en una imagen sencilla con un hipervínculo hacia el sitio anunciado. Para mostrar la imagen utilizaremos la etiqueta [`amp-img`](../../../../documentation/components/reference/amp-img.md). Este es el código:

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
</body>
```

Cuando abra el archivo HTML en su navegador, debería ver la siguiente imagen:

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

Si hace clic sobre el anuncio gráfico, este le llevará al sitio anunciado (es decir, al sitio del Proyecto de AMP).
