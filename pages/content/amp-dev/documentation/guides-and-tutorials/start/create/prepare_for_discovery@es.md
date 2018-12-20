---
$title: Prepara tu página para la detección y la distribución
$order: 4
---

En algunos casos, podrías tener una versión AMP y una versión no AMP de la misma página; por ejemplo, un artículo informativo. Considera lo siguiente: si la búsqueda de Google encuentra la versión no AMP de esa página, *¿cómo sabe que existe una versión AMP?*

## Vinculación de páginas con `<link>`

Para resolver este problema, agregamos información sobre la página AMP a la página no AMP y viceversa en forma de etiquetas `<link>` en el `<head>`.

Agrega lo siguiente a la página no AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.ejemplo.com/url/al/documento/amp.html">
[/sourcecode]

Y esto a la página AMP

[sourcecode:html]
<link rel="canonical" href="https://www.ejemplo.com/url/al/documento/completo.html">
[/sourcecode]

## ¿Qué sucede si tengo una sola página?

Si solo tienes una página y es AMP, debes agregarle el vínculo canónico. Este simplemente apuntará a sí mismo.

[sourcecode:html]
<link rel="canonical" href="https://www.ejemplo.com/url/al/documento/amp.html">
[/sourcecode]

Leer más: Aprende más sobre cómo Google encuentra las páginas AMP en las [Directrices de la Búsqueda de Google para las páginas de AMP](https://support.google.com/webmasters/answer/6340290).

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/preview_and_validate.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/publish.md', locale=doc.locale).url.path}}"><span class="arrow-next">Siguiente</span></a>
</div>
