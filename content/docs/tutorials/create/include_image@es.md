---
$title: Incluir una imagen
$order: 1
---

La mayoría de las etiquetas HTML se pueden usar directamente en AMP HTML, pero algunas, como `<img>`, se reemplazan por etiquetas AMP HTML personalizadas equivalentes o ligeramente optimizadas (y unas pocas etiquetas problemáticas se inhabilitan directamente; consulta [etiquetas HTML en la especificación](/es/docs/reference/spec.html)).

Para demostrar el aspecto que tendría el marcado adicional, a continuación te mostramos el código requerido para integrar una imagen a la página:

[sourcecode:html]
<amp-img src="bienvenido.jpg" alt="Bienvenido" height="400" width="800"></amp-img>
[/sourcecode]

{% call callout('Leer más', type='read') %}
Para saber por qué reemplazamos etiquetas como `<img>` por `<amp-img>` y cuántas hay disponibles, consulta [Incluir Iframes y medios](/es/docs/guides/amp_replacements.html).
{% endcall %}

<a class="go-button button" href="/es/docs/tutorials/create/presentation_layout.html">Continuar con el paso 3</a>
