---
$title: Incluir una imagen
---

La mayoría de las etiquetas HTML se pueden usar directamente en AMP HTML, pero algunas, como `<img>`, se reemplazan por etiquetas AMP HTML personalizadas equivalentes o ligeramente optimizadas (y unas pocas etiquetas problemáticas se inhabilitan directamente; consulta [etiquetas HTML en la especificación](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).

Para demostrar el aspecto que tendría el marcado adicional, a continuación te mostramos el código requerido para integrar una imagen a la página:

[sourcecode:html]
<amp-img src="bienvenido.jpg" alt="Bienvenido" height="400" width="800"></amp-img>
[/sourcecode]

Para saber por qué reemplazamos etiquetas como `<img>` por `<amp-img>` y cuántas hay disponibles, consulta [Incluir Iframes y medios](/docs/guides/amp_replacements.html).

<a class="go-button button" href="/es/docs/get_started/create/presentation_layout.html">Continuar con el paso 3</a>
