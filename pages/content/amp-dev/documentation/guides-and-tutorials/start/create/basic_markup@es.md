---
$title: Crear tu página AMP HTML
---

El siguiente código es un buen punto de partida o plantilla.
Cópialo y guárdalo en un archivo con extensión .html.

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
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
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

Hasta ahora, el contenido del cuerpo es bastante claro, pero en el encabezado de la página hay mucho código adicional que no resulta tan obvio. Vamos a desglosar el código necesario.

[tip type="note"]
Cuando crees contenido y páginas AMP, valora de forma importante utilizar el protocolo HTTPS en lugar del HTTP. Si bien no es obligatorio tener HTTPS en el propio documento AMP ni en las imágenes o fuentes, hay muchas funciones de AMP que requieren HTTPS (por ejemplo, los vídeos, los iframes, etc). Por tanto, para asegurarte de que tus páginas AMP aprovechen al máximo todas las funciones de AMP, utiliza el protocolo HTTPS.  Puedes consultar más información sobre HTTPS en el artículo [Por qué HTTPS es importante](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).
[/tip]

## Código obligatorio

Los documentos de AMP HTML deben:

| Regla      | Descripción |
| --------- | ----------- |
| Empezar por el tipo de documento `<!doctype html>`. | Estándar de HTML. |
| Incluir una etiqueta de nivel superior `<html ⚡>` <br>(`<html amp>` también se acepta). | Identifica la página como contenido de AMP. |
| Incluir etiquetas `<head>` y `<body>`. | Opcional en HTML, pero no en AMP.
| Incluir una etiqueta `<meta charset="utf-8">` como la primera etiqueta secundaria de su etiqueta `<head>`. | Identifica la codificación de la página. |
| Incluir una etiqueta `<script async src="https://cdn.ampproject.org/v0.js"></script>` como la segunda etiqueta secundaria de la etiqueta `<head>`. | Incluye y carga la biblioteca JS de AMP. |
| Incluir una etiqueta `<link rel="canonical" href="$SOME_URL">` dentro de `<head>`. | Dirige a la versión HTML normal del documento AMP HTML o a sí misma si no existe dicha versión HTML. Consulta más información en el artículo sobre cómo [hacer que una página sea visible](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md).
| Incluir una etiqueta `<meta name="viewport" content="width=device-width">. También se recomienda incluir `initial-scale=1`. | Especifica un viewport adaptable. Consulta más información en el artículo sobre cómo [crear páginas AMP adaptables](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md). |
| Incluir el [código de plantilla de AMP](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) en la etiqueta `<head>`.  | La plantilla CSS para ocultar inicialmente el contenido hasta que se cargue AMP JS. |

## Metadatos opcionales

Además de los requisitos básicos, nuestra muestra también incluye una definición de Schema.org en el encabezado, la cual no es un requisito obligatorio para AMP, pero sí un requisito para que el contenido se distribuya en determinados lugares (por ejemplo, en el carrusel de noticias destacadas de la Búsqueda de Google).

[tip type="read-on"]
Consulta estos recursos para obtener más información:

* [Empezar a utilizar AMP en la Búsqueda de Google](https://developers.google.com/amp/docs): descubre cómo preparar tus páginas AMP para que se muestren en la Búsqueda de Google.
  * [Muestras de metadatos](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples): consulta más información sobre los metadatos que necesitarás en otros lugares (por ejemplo, Twitter).
[/tip]

<hr>

¡Y ya está! Esto es todo lo que necesitamos para crear nuestra primera página AMP, aunque si solo incluimos esto, nos quedará una página sin mucho contenido, claro. En la siguiente sección explicaremos cómo añadir elementos básicos como imágenes, personalizar elementos AMP, editar páginas y crear un diseño adaptable.
