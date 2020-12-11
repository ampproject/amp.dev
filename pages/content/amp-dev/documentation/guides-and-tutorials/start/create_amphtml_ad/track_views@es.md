---
$title: Cómo realizar un seguimiento de las vistas
$order: 2
description: En los anuncios AMPHTML, puede realizar un seguimiento de las métricas utilizando los componentes amp-pixel o amp-analytics. En nuestro ejemplo básico, agregaremos la capacidad de supervisar las vistas de la página ...
---

En los anuncios AMPHTML, puede realizar un seguimiento de las métricas utilizando los componentes [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) o [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). En nuestro ejemplo básico, agregaremos la capacidad de supervisar las vistas de la página con el componente `amp-pixel`y establecer una URL que se encargará de registrar las vistas de dicha página (en este caso, será una URL ficticia):

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
<amp-pixel src="https://www.amp.dev/tracker/foo"></amp-pixel>
</body>
```

¡Eso es todo, acaba de crear su anuncio AMPHTML!

Sin embargo, antes de que suba su anuncio al servidor de anuncios, todavía debe realizar un último paso: asegúrese de que su sintaxis sea válida.
