---
$title: Empezando
---
[TOC]

Esta es una guía de inicio rápido para ponerlo en marcha con AMP.

Para obtener instrucciones más detalladas, visite el tutorial [Crea tu primera página AMP](/es/docs/tutorials/create.html).

### Paso 1: Obtenga la plantilla HTML de AMP

Este es el código HTML básico que necesitas para una página AMP:

```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hola mundo AMP</title>
    <link rel="canonical" href="hola-mundo.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>¡Hola Mundo AMP!</h1>
  </body>
</html>
```

{% call callout('Leer Más', type='read') %}
Aprende más sobre el [markup requerido](/es/docs/reference/spec.html#required-markup) para páginas AMP.
{% endcall %}

### Paso 2: Agrega componentes a tu página

Construya su página AMP agregando componentes, como una imagen:

```html
<amp-img src="https://www.ampproject.org/examples/images/amp.jpg"
  width="900" height="508" layout="responsive"></amp-img>
```

O bien, un video de YouTube:

```html
<!-- este script es requerido para amp-youtube y debe ser agregado en la sección <head> de tu página AMP  -->
<script async custom-element="amp-youtube"
      src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>

...

<amp-youtube data-videoid="9Cfxm7cikMY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
```

Y mucho más. Mira la lista completa de [componentes disponibles para AMP](/es/docs/reference/components.html).

### Paso 3: Estilo de los elementos

Para darle estilo a tus elementos en una página AMP, agrega CSS directamente a una hoja de estilo denominada `<style amp-custom>` en el  `<head>` de tu página:

```html
<style amp-custom>
  amp-img {
    margin: 0.5em;
  }
  body {
    max-width: 900px;
  }
</style>
```

{% call callout('Leer Más', type='read') %}
Aprende más sobre el [CSS soportado](/es/docs/guides/responsive/style_pages.html) en páginas AMP.
{% endcall %}

### Paso 4: Valida tu página AMP HTML

Asegúrate que tu página AMP tiene un AMP HTML válido verificando la misma a través del [Validador AMP](https://validator.ampproject.org/).

Para otras herramientas de validación, lee las [páginas para validar AMP](/es/docs/guides/validate.html).

### Próximos pasos

Para sumergirte en lo básico sobre páginas AMPm visita el tutorial [Crea tu primera página AMP](/es/docs/tutorials/create.html).

Aquí tienes otros recursos que pueden ayudarte con tu experiencia:

* [Hacer que una página sea visible](/es/docs/guides/discovery.html)
* [Agregar analytics a tu página](/es/docs/guides/analytics_amp.html)
* [Mejora la fidelización del usuario](/es/docs/guides/engagement.html)
* Ejemplos en [AMP BY Example](https://ampbyexample.com/)
