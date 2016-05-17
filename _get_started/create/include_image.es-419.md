---
layout: page
title: Incluir una imagen
order: 1
locale: es-419
---

La mayoría de las etiquetas HTML se pueden usar directamente en AMP HTML, pero algunas, como `<img>`, se reemplazan por etiquetas AMP HTML personalizadas equivalentes o ligeramente optimizadas (y unas pocas etiquetas problemáticas se inhabilitan directamente; consulta [etiquetas HTML en la especificación](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).

Para demostrar el aspecto que tendría el marcado adicional, a continuación te mostramos el código requerido para integrar una imagen a la página:

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

Para saber por qué reemplazamos etiquetas como `<img>` por `<amp-img>` y cuántas hay disponibles, consulta [Incluir Iframes y medios](/docs/guides/amp_replacements.html).

{% include button.html title="Continuar con el paso 3" link="/docs/get_started/create/presentation_layout.es-419.html" %}
