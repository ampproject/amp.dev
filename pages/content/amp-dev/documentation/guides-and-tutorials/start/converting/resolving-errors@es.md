---
$title: Resolución de errores de validación
---

En esta sección, examinaremos y resolveremos los errores de validación de AMP de nuestra página de AMP.

## Incluir charset

Empezaremos por corregir el siguiente error:

<pre class="error-text">
The mandatory tag 'meta charset=utf-8' is missing or incorrect.
</pre>

Para mostrar correctamente el texto, AMP requiere que especifique el conjunto de caracteres para la página. La información meta charset también debe ser el primer hijo de la etiqueta `<head>`. La razón por la que esta etiqueta debe ser la primera es evitar la re-interpretación del contenido que se agregó antes de la etiqueta meta charset.

**Agregue** el código siguiente como la primera línea de la etiqueta `<head>`:

```html
<meta charset="utf-8" />
```
**Guarde** el archivo y vuelva a cargar la página. Compruebe que el error de charset ya no aparece.

## Incluir enlace canónico

Ahora, echemos un vistazo al siguiente error:

<pre class="error-text">
The mandatory tag 'link rel=canonical' is missing or incorrect.
</pre>

Cada documento de AMP necesita tener un vínculo que haga referencia a la página canónica. La página canónica puede ser la propia página de AMP o una página que no sea de AMP. En este tutorial, el artículo HTML original es la página canónica. Aprenderemos más acerca de la vinculación canónica en cómo [hacer que tu página sea detectable](discoverable.md).

Adelante, **agregue** el siguiente código debajo de la etiqueta `<meta charset="utf-8" />`:

```html
<link rel="canonical" href="/article.html">
```

[tip]
Puede crear una página AMP canónica autónoma. El vínculo canónico sigue siendo necesario, pero debe señalar el propio artículo AMP:

```html
<link rel="canonical" href="article.amp.html">
```
[/tip]

Ahora, **vuelva a cargar** la página. Aunque todavía hay un montón de errores para corregir, el error de enlace canónico ya no está presente.

## Especificar el atributo AMP

AMP requiere un atributo en el elemento raíz `<html>` de una página para declarar la página como un documento de AMP.

<pre class="error-text">
The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'
The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.
</pre>

Los errores anteriores se pueden resolver simplemente agregando el `⚡ `attributo a la etiqueta `<html>` de la siguiente manera:

```html
<html ⚡ lang="es">
```

Ahora, adelante, vuelva a cargar la página y compruebe que ambos errores se han ido.

[tip type="note"]
Aunque la especificación de `⚡` es el enfoque recomendado, también es posible utilizar el atributo `amp` en lugar del atributo `⚡`, así:

```html
<html amp lang="es">
```
[/tip]

## Especificar un viewport

A continuación, vamos a abordar el siguiente error:

<pre class="error-text">
The mandatory tag 'meta name=viewport' is missing or incorrect.
</pre>

AMP requiere la definición de una `width` y un `minimum-scale` para la ventana gráfica. Estos valores deben definirse como `device-width` y `1`, respectivamente. El viewport es una etiqueta común incluida en el `<head>` de una página HTML.

Para resolver el error de viewport, agregue el siguiente fragmento HTML a la etiqueta `<head>`:

```html
<meta name="viewport" content="width=device-width">
```
Los valores especificados para `width` y `minimum-scale` son los valores requeridos en AMP. Definir `initial-scale` no es obligatorio, pero es comúnmente incluido en el desarrollo web móvil y se recomienda. Puede obtener más información sobre la ventana gráfica y el diseño de respuesta en [Configure the Viewport](https://developers.google.com/speed/docs/insights/ConfigureViewport).

Como antes, **vuelva a cargar** la página y compruebe si el error ha desaparecido.

## Reemplazar hojas de estilo externas

El siguiente error está relacionado con nuestro uso de hojas de estilo:

<pre class="error-text">
The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.
</pre>

En concreto, este error se queja de la siguiente etiqueta de enlace de hoja de estilo en nuestra etiqueta `<head>`:

```html
<link href="base.css" rel="stylesheet" />
```
El problema es que se trata de una referencia de hoja de estilo externa. En AMP, para mantener los tiempos de carga de documentos lo más rápido posible, no puede incluir hojas de estilo externas. En su lugar, todas las reglas de hoja de estilo deben agregarse en línea en el documento de AMP utilizando las etiquetas `<style amp-custom></style>`.

```html
<style amp-custom>

/* The content from base.css */

</style>
```

Por lo tanto, vamos a resolver el error:

1. **Quite** la etiqueta  `<link>` en el `<head>` y reemplácela con una etiqueta `<style amp-custom></style>`. El atributo `amp-custom` de la etiqueta de estilo es obligatorio.
2. **Copie** todos los estilos del archivo [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) en las etiquetas `<style amp-custom></style>`.

Una vez más, **vuelva a cargar** la página y verifique que el error stylesheets ha desaparecido.

Nota: No sólo se requiere estilo en línea, sino que hay un límite de tamaño de archivo de 50 kilobytes para toda la información de estilo. Debe utilizar preprocesadores CSS como [SASS](http://sass-lang.com/) para minimizar su CSS antes de insertar el CSS en sus páginas AMP.

Importante: Sólo puede tener una etiqueta de estilo en todo el documento de AMP. Si tiene varias hojas de estilo externas referenciadas por sus páginas AMP, tendrá que agrupar estas hojas de estilo en un solo conjunto de reglas. Para saber qué reglas CSS son válidas en AMP, lea [Formato CSS admitido](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## Excluir JavaScript de terceros

Si bien las hojas de estilo se pueden volver a trabajar con relativa facilidad con AMP al incorporar el CSS, lo mismo no ocurre con JavaScript.

<pre class="error-text">
The tag 'script' is disallowed except in specific forms.
</pre>

En AMP, los scripts generados por el usuario no están permitidos. Los scripts en AMP sólo están permitidos si cumplen dos requisitos principales:

1. Todo JavaScript debe ser asincrónico (es decir, incluir el atributo `async` en la etiqueta de script).
2. El JavaScript es para la biblioteca AMP y para cualquier componente de AMP en la página.

Esto descarta efectivamente el uso de todos los JavaScript de terceros; Sin embargo, hay una excepción: JavaScript de terceros se puede utilizar en iframes.

Importante: Incluir JavaScript en un iframe debe considerarse una medida de último recurso. Siempre que sea posible, la funcionalidad de JavaScript se debe reemplazar mediante [AMP components](../../../../documentation/components/index.html). Exploraremos nuestro primer componente de AMP en la siguiente sección.

Intente abrir el archivo [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js) externo. ¿Que ves? El archivo debe estar vacío de cualquier código JavaScript y sólo incluir un comentario de información como este:

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

Teniendo en cuenta que este archivo JavaScript externo no es un componente funcional de nuestro sitio web, podemos eliminar con seguridad la referencia por completo.

**Quite** la siguiente referencia JavaScript externa de su documento:

```html
<script type="text/javascript" src="base.js"></script>
```

Ahora, **vuelva a cargar** la página y compruebe que el error de secuencia de comandos ha desaparecido.

Nota: Las únicas excepciones para los scripts generados por el usuario son cuando el atributo de tipo es `application/ld+json` o `application/json`. Estos tipos de script agregan metadatos a la página y configuran los componentes de AMP.

## Incluir el estándar de CSS de AMP

Los siguientes errores se refieren a la falta de código boilerplate:

<pre class="error-text">
The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.
The mandatory tag 'head > style : boilerplate' is missing or incorrect.
The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.
</pre>

Cada documento de AMP requiere el siguiente código AMP:

```html
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
```
**Agregue** el código estándar a la parte inferior de la etiqueta `<head>` de su documento.

La etiqueta `<style amp-boilerplate>` inicialmente oculta el contenido del cuerpo hasta que se carga la biblioteca de JavaScript de AMP y, a continuación, se procesa el contenido. AMP hace esto para evitar que el contenido unstyled se procese, también conocido como Flash Of Unstyled Content (FOUC). Esto ayuda a asegurar que la experiencia del usuario se siente verdaderamente instantánea a medida que el contenido de la página aparece de una vez y todo lo que se encuentra encima del doblez se representa en conjunto. La segunda etiqueta recupera esta lógica si JavaScript está deshabilitado en el navegador.

## Reemplazar `<img>` con `<amp-img>`

AMP no admite las contrapartes HTML predeterminadas para mostrar medios, lo que explica el error siguiente:

<pre class="error-text">
The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
</pre>

AMP tiene un componente web específicamente diseñado para reemplazar la etiqueta `<img>`, es la etiqueta [`<amp-img>`](../../../../documentation/components/reference/amp-img.md):

```html
<amp-img src="mountains.jpg"></amp-img>
```

**Reemplace** la etiqueta `<img>` con la etiqueta [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) anterior y vuelva a ejecutar el validador. Debería recibir varios errores nuevos:

<pre class="error-text">
AMP-IMG# Layout not supported for: container
The implied layout 'CONTAINER' is not supported by tag 'amp-img'.
</pre>

¿Por qué se produjo otro error en [`amp-img`](../../../../documentation/components/reference/amp-img.md)? Porque [`amp-img`](../../../../documentation/components/reference/amp-img.md) no es un sustituto directo de la tradicional etiqueta HTML img. Hay requisitos adicionales cuando se usa [`amp-img`](../../../../documentation/components/reference/amp-img.md).

### Sistema de distribución AMP

El error de diseño nos dice que [`amp-img`](../../../../documentation/components/reference/amp-img.md) no es compatible con el tipo de diseño del `container`. Uno de los conceptos más importantes en el diseño de AMP es su enfoque en la reducción de la cantidad de DOM reflujo necesario para procesar sus páginas web.

Para reducir el reflujo de DOM, AMP incluye un sistema de disposición para asegurar que el diseño de la página sea lo más rígido posible, tan pronto como sea posible en el ciclo de vida de descarga y representación de la página.

El sistema de disposición permite que los elementos de una página se posicionen y escalen de varias maneras: dimensiones fijas, diseño sensible, altura fija y más.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption='Cómo AMP establece el contenido') }}

En nuestro caso, el sistema de diseño inferido nuestro tipo de diseño para el [`amp-img`](../../../../documentation/components/reference/amp-img.md) como el tipo `container`. Sin embargo, el tipo de `container` sólo es aplicable a elementos que contienen elementos de niños. El tipo `container` es incompatible con la etiqueta [`amp-img`](../../../../documentation/components/reference/amp-img.md), que es la razón de este error.

¿Por qué se dedujo el tipo `container`? Porque no especificamos un atributo `height` para la etiqueta [`amp-img`](../../../../documentation/components/reference/amp-img.md). En HTML, el reflujo puede reducirse siempre especificando un ancho y una altura fija para los elementos de una página. En AMP, es necesario definir el ancho y la altura de los elementos de amplificador-img para que AMP pueda pre-determinar la relación de aspecto del elemento.

**Añada** el `width` y la `height` a su etiqueta [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) de la siguiente manera:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```
Actualizar la página y comprobar el validador; Ya no deberías ver ningún error! Sin embargo, la imagen no se ve tan grande porque está mal colocada en la página. Sería genial si pudiéramos *escalar* la imagen para estirar y ajustar adecuadamente la página sin importar el tamaño de la pantalla.

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="Nuestra imagen no responde.") }}

Sorprendentemente, la definición de la anchura y la altura no restringe el elemento a un tamaño totalmente fijo. El sistema de disposición de AMP puede posicionar y escalar el elemento de una variedad de maneras al conocer su relación de aspecto. El atributo `layout` informa a AMP de cómo desea que el elemento se posicione y se amplíe.

Vamos a **configurar** el atributo de diseño a `responsive` de modo que nuestra imagen se escala y redimensiona:

```html
<amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
```

Voila! Nuestra imagen está en la relación de aspecto correcta y responde responde el ancho de la pantalla.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Nuestra imagen es ahora responsive!") }}

Leer más: Aprenda más sobre el sistema de distribución de AMP en [AMP Layout Specification](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md).

## ¡Éxito!

Ahora su documento de AMP debe ser algo como esto:

```html
<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width">

    <link rel="canonical" href="/article.html">
    <link rel="shortcut icon" href="amp_favicon.png">

    <title>News Article</title>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>

      <amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
    </article>
  </body>
</html>
```

Actualice la página y observe la salida de la consola. Usted debe ser recibido con el siguiente mensaje:

<pre class="success-text">
AMP validation successful.
</pre>

### Preguntas frecuentes

- [What is DOM reflow?](http://stackoverflow.com/a/27637245)
- [¿Qué ocurre si el atributo layout no está definido?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [¿Qué ocurre si width y height no están definidos?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
