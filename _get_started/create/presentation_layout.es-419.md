---
layout: page
title: Modificar la presentación y el diseño
order: 2
locale: es-419
---

## Modificar la presentación

Las AMP son páginas web; el diseño de estas y de sus elementos se realiza a través de propiedades CSS comunes. Da estilo a los elementos con selectores de clase o elemento en una hoja de estilo en línea en el `<head>` llamada `<style amp-custom>`:

{% highlight html %}
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
{% endhighlight %}

Las páginas AMP pueden tener una sola hoja de estilo integrada y hay ciertos selectores que no puedes usar. [Aprende todo acerca del estilo](/docs/guides/responsive/style_pages.html).

## Controla el diseño

AMP sigue reglas más estrictas al distribuir elementos en la página. En una página HTML normal, CSS se usa casi exclusivamente para distribuir elementos. Sin embargo, por motivos de rendimiento, AMP requiere que todos los elementos tengan un tamaño explícito configurado desde el principio.

Aprende todo acerca de cómo AMP representa y diseña una página y cómo puedes modificar el diseño en [Cómo controlar el diseño](/docs/guides/responsive/control_layout.html).

{% include button.html title="Continuar con el paso 4" link="/docs/get_started/create/preview_and_validate.es-419.html" %}
