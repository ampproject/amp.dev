---
$title: Crear páginas de AMP adaptables
toc: true
---

Crear elementos de AMP adaptables es realmente fácil.
Solo hay que introducir `layout=responsive` en ellos.

[TOC]

## Crear imágenes adaptables

Todos los recursos cargados externamente, incluidas las imágenes,
deben tener un tamaño y una posición específicos
para que cuando los recursos carguen la página, esta no salte y reinicie el flujo.

Para crear imágenes adaptables, especifica la anchura y la altura, establece el diseño como adaptable e indica, mediante <a href="/es/docs/guides/author-develop/responsive/style_pages.html">`srcset`</a>, cuál es el elemento de imagen que se debe utilizar en función de los diferentes tamaños de pantalla:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Este elemento `amp-img` ajusta automáticamente la anchura de su elemento contenedor, y su altura se ajusta automáticamente a la relación de aspecto determinada por la anchura y la altura dadas:

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857"></amp-img>

Consulta también la información sobre el componente [amp-img en AMP by Example](https://ampbyexample.com/components/amp-img/).

## Añadir estilos a una página

Añade todos los estilos dentro de la etiqueta `<style amp-custom>`
en el encabezado del documento.
Por ejemplo:

[sourcecode:html]
<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html" >
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
[/sourcecode]

**Importante:**
Asegúrate de que solo hay una etiqueta `<style amp-custom>` en la página,
ya que en AMP solo se admite la presencia de una.

Define los estilos de los componentes con selectores de clase o de elemento
usando propiedades comunes de CSS. Por ejemplo:

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**Importante:**
Comprueba que los estilos estén admitidos en AMP, ya que
algunos estilos no lo están por cuestiones de rendimiento
(consulta también [CSS compatibles](/es/docs/guides/author-develop/responsive/style_pages.html)).

## Elementos de tamaño y posición

AMP desacopla el diseño del documento de la carga de recursos para que AMP pueda cargar el diseño de la página sin tener que esperar a las descargas de los recursos.

Especifica el tamaño y la posición de todos los elementos visibles de AMP,
proporcionando los atributos `width` y `height`.
Estos atributos implican la relación de aspecto del elemento,
que se puede escalar con el contenedor.

Establece el diseño como adaptable.
Esto ajusta el tamaño del elemento a la anchura del elemento contenedor
y cambia la altura automáticamente a la relación de aspecto determinada por los atributos de anchura y altura.

Obtén más información acerca de [los diseños compatibles con AMP](/es/docs/guides/author-develop/responsive/control_layout.html).

## Valida tus estilos y diseños

Usa el validador de AMP para comprobar
los valores de diseño y CCS de tu página.

El validador confirma que el CSS de la página no exceda el límite de 50.000 bytes,
comprueba que no haya estilos no permitidos y garantiza que el diseño de la página sea compatible y el formato sea correcto.
Consulta también esta lista completa de [errores de estilo y diseño](/es/docs/reference/validation_errors#errores-de-estilo-y-de-diseno).

Ejemplo de error en la consola de una página con CSS que excede el límite de 50.000 bytes:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Obtén más información acerca de cómo [validar las páginas de AMP](/es/docs/guides/debug/validate.html),
incluida la forma de localizar los errores de estilo y solucionarlos.
