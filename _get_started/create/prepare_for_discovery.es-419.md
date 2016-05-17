---
layout: page
title: Prepara tu página para la detección y la distribución
order: 4
locale: es-419
---

En algunos casos, podrías tener una versión AMP y una versión no AMP de la misma página; por ejemplo, un artículo informativo. Considera lo siguiente: Si la Búsqueda de Google encuentra la versión no AMP de esa página, *¿cómo sabe que existe una versión AMP?*

## Vinculación de páginas con&lt;link>

Para resolver este problema, agregamos información sobre la página AMP a la página no AMP y viceversa en forma de etiquetas `<link>` en el `<head>`.

Agrega lo siguiente a la página no AMP:

{% highlight html %}
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

Y esto a la página AMP

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
{% endhighlight %}

## ¿Qué sucede si tengo una sola página?

Si solo tienes una página y es AMP, debes agregarle el vínculo canónico. Este luego simplemente apuntará a sí mismo.

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

{% include button.html title="Continuar con el paso 6" link="/docs/get_started/create/publish.es-419.html" %}
