---
$title: Modificar la presentación y el diseño
$order: 2
---

## Modificar la presentación

Las AMP son páginas web; el diseño de estas y de sus elementos se realiza a través de propiedades CSS comunes. Da estilo a los elementos con selectores de clase o elemento en una hoja de estilo en línea en el `<head>` llamada `<style amp-custom>`:

[sourcecode:html]
<style amp-custom>
  /* Cualquier estilo personalizado va aquí */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
[/sourcecode]

Las páginas AMP pueden tener solo una hoja de estilo integrada y hay ciertos selectores que no puedes usar. [Aprende todo acerca del estilo](/es/docs/guides/responsive/style_pages.html).

## Controla el diseño

AMP sigue reglas estrictas al distribuir elementos en la página. En una página HTML normal, CSS se usa casi exclusivamente para distribuir elementos. Sin embargo, por motivos de rendimiento, AMP requiere que todos los elementos tengan un tamaño explícito configurado desde el principio.

{% call callout('Leer más', type='read') %}
Aprende todo acerca de cómo AMP representa y diseña una página y cómo puedes modificar el diseño en [Cómo controlar el diseño](/es/docs/guides/responsive/control_layout.html).
{% endcall %}

<div class="prev-next-buttons">
  <a class="button prev-button" href="/es/docs/tutorials/create/include_image.html"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="/es/docs/tutorials/create/preview_and_validate.html"><span class="arrow-next">Siguiente</span></a>
</div>