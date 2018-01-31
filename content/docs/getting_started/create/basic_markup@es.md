---
$title: Crea tu página AMP HTML
$order: 0
$parent: /content/docs/tutorials/create.md
---

El siguiente marcado es un punto de partida o código estándar aceptable.
Cópialo y guárdalo en un archivo con extensión .html.

[sourcecode:html]
<!doctype html>
<html amp lang="es">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hola, AMP</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Bienvenido a la web móvil</h1>
  </body>
</html>
[/sourcecode]

El contenido del cuerpo, hasta ahora, es bastante sencillo. Sin embargo, hay mucho más código en la etiqueta `<head>` de la página que podría no ser evidente de inmediato. Analicemos el marcado obligatorio.

## Marcado obligatorio

Los documentos AMP HTML DEBEN:

| Regla      | Descripción |
| --------- | ----------- |
| Comenzar con el tipo de documento `<!doctype html>`. | Estándar para HTML. |
| Contener la etiqueta `<html ⚡>` en el nivel superior <br>(también se acepta `<html amp>`). | Identifica la página como contenido AMP. |
| Contener las etiquetas `<head>` y `<body>`. | Opcional en HTML pero requerido en AMP.
| Contener la etiqueta `<meta charset="utf-8">` como el primer hijo de su etiqueta `<head>`. | Identifica la codificación de la página. | 
| Contener la etiqueta `<script async src="https://cdn.ampproject.org/v0.js"></script>` como el segundo hijo de su etiqueta `<head>`. | Incluye y carga la librería AMP JS. |
| Contener una etiqueta `<link rel="canonical" href="$SOME_URL">` en la etiqueta `<head>`. | Apunta a la versión regular en HTML de la página AMP, o bien apunta a sí mmisma si dicha versión no existe. Aprende más en [Hacer que tu página sea visible](/es/docs/guides/discovery.html).
| Contener una etiqueta `<meta name="viewport" content="width=device-width,minimum-scale=1">` en la etiqueta `<head>`. También se recomienda incluir `initial-scale=1`. | Especifica un `viewport` responsivo. Aprende más en [Crear páginas AMP responsivas](/es/docs/guides/responsive/responsive_design.html). |
| Contener el [código AMP boilerplate](/docs/reference/spec/amp-boilerplate.html) en la etiqueta `<head>`.  | CSS para ocultar inicialmente el contenido hasta que se carga AMP JS. |


## Meta datos opcionales

Además de los requisitos básicos, en nuestro ejemplo también se incluye una definición Schema.org en el `<head>`, que no es un requisito estricto para AMP, pero es un requisito para poder distribuir tu contenido en determinados sitios. Por ejemplo, en el carrusel de historias principales de Google Search.

{% call callout('Leer más', type='read') %} Visita estos recursos para aprender más:

* Aprende a preparar tus páginas AMP para el buscador de Google en [Getting Started with AMP on Google Search](https://developers.google.com/amp/docs).
* Aprende más sobre todos las etiquetas de metadata que puedes usar en otros sitios, por ejemplo en Twitter en [Ejemplos de Metadata](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples).
{% endcall %}

<hr>

¡Buenas noticias! Eso es todo lo que necesitamos para crear nuestra primera página AMP, aunque por supuesto falta especificar el `<body>`. En la próxima sección, veremos la manera de agregar componentes básicos, como imágenes, elementos de AMP personalizados, dar estilo a tu página y definir un diseño responsivo.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/es/docs/tutorials/create.html"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="/es/docs/tutorials/create/include_image.html"><span class="arrow-next">Siguiente</span></a>
</div>