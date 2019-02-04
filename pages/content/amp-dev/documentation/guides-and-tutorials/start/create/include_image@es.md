---
$title: Incluir una imagen
$order: 1
---

La mayoría de las etiquetas HTML se pueden usar directamente en AMP HTML, pero algunas, como `<img>`, se reemplazan por etiquetas AMP HTML personalizadas equivalentes o ligeramente optimizadas (y unas pocas etiquetas problemáticas se inhabilitan directamente; consulta [etiquetas HTML en la especificación]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/spec/index.md', locale=doc.locale).url.path}})).

Para demostrar el aspecto que tendría el marcado adicional, a continuación te mostramos el código requerido para integrar una imagen a la página:

[sourcecode:html]
<amp-img src="bienvenido.jpg" alt="Bienvenido" height="400" width="800"></amp-img>
[/sourcecode]

Leer más: Para saber por qué reemplazamos etiquetas como `<img>` por [`<amp-img>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) y cuántas hay disponibles, consulta [Incluir imágenes y videos]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/media_iframes_3p/index.md', locale=doc.locale).url.path}}).
