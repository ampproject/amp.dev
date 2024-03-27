---
$title: Errores de validación de AMP
---

Los documentos de AMP no pueden tener errores de validación.
La finalidad de este documento es ayudarte a entender mejor y a corregir cualquier error de validación que encuentres al [validar páginas de AMP](validate_amp.md).
Para obtener una visión general completa de los errores de validación, consulta la [especificación del validador de AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

## Errores en atributos y etiquetas AMP HTML

### Falta una etiqueta obligatoria

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>MANDATORY_TAG_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The mandatory tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Añade (o corrige) la etiqueta HTML obligatoria.</td>
  </tr>
</table>

Todos los documentos de AMP deben contener las siguientes etiquetas:

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://ampjs.org/v0.js"></script>`
* <a name="body"></a>`<body>`

Estas etiquetas obligatorias incluyen un campo `mandatory: true` en la [especificación del validador de AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii), y también se hace referencia a ellas en la [especificación de AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md).

### Falta una etiqueta requerida por otra etiqueta

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Añade (o corrige) la etiqueta HTML requerida.</td>
  </tr>
</table>

El validador emite el error `TAG_REQUIRED_BY_MISSING` cuando encuentra un componente ampliado en el documento de AMP, pero no encuentra su `<script>` equivalente.

Los [componentes ampliados](../../../../documentation/components/index.html) se deben incluir explícitamente en el documento de AMP como elementos personalizados.
Para corregir estos errores, ve a la página de referencia del componente ampliado, copia su secuencia de comandos requerida y pégala en el documento `<head>` de AMP.

### Etiqueta no permitida

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>DISALLOWED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The tag '%1' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Quita la etiqueta no permitida.</td>
  </tr>
</table>

Las etiquetas se incluyen en una lista blanca, por lo que no hay ninguna lista que incluya todas las etiquetas no permitidas. Sin embargo, en la [especificación de AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md) se define en términos generales el conjunto de etiquetas no permitidas.

### Falta un atributo obligatorio

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>MANDATORY_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The mandatory attribute '%1' is missing in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Añade el atributo obligatorio a la etiqueta.</td>
  </tr>
</table>

Los atributos obligatorios para las etiquetas de AMP se definen en las [especificaciones del validador de AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
Busca la etiqueta, observa los atributos enumerados y comprueba que aparezca `mandatory: true`.
Los atributos obligatorios para cada etiqueta de AMP también aparecen en la especificación de la etiqueta.

### Valor del atributo no válido

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>INVALID_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Corrige el valor del atributo para que sea válido.</td>
  </tr>
</table>

Este error indica que una etiqueta HTML tiene un atributo con un nombre permitido, pero con un valor no permitido.
Por ejemplo, esto pasa a veces cuando las URL tienen valores no válidos. Todos los valores de URL (en los atributos `href` y `src`) deben coincidir con uno de estos [posibles valores de atributos](http://www.w3schools.com/tags/att_a_href.asp).

<strong>IMPORTANTE:</strong> Muchos valores de URL en AMP requieren HTTPS. Si recibes este error y no sabes por qué, consulta la especificación de la etiqueta AMP pertinente para ver si el atributo requiere HTTPS.

### Atributo no permitido

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>DISALLOWED_ATTR</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The attribute '%1' may not appear in tag '%2'."</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Quita el atributo de la etiqueta HTML.</td>
  </tr>
</table>

Los atributos se incluyen en una lista blanca, por lo que no hay ninguna lista definitiva de todos los atributos no permitidos.
Para consultar qué atributos admite cada etiqueta, busca la etiqueta HTML y, a continuación, `attrs` en la [especificación del validador de AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

Todas las etiquetas de AMP pueden utilizar, además de los atributos específicos recogidos en una lista blanca para cada etiqueta, cualquiera de los atributos que se incluyan en la sección `$GLOBAL_ATTRS` de la lista blanca; todos los atributos con el prefijo `"data-"` también se incluyen en esta lista.

### Falta texto obligatorio o el texto es incorrecto

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>MANDATORY_CDATA_MISSING_OR_INCORRECT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Añade o corrige el texto obligatorio que contiene la etiqueta.</td>
  </tr>
</table>

CDATA son los datos de contenido situado entre una etiqueta HTML de inicio y otra de final. Actualmente, se compara con listas blancas y listas negras.
Las etiquetas con CDATA obligatorio incluyen:

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

Y:

[sourcecode:html]
<style amp-custom>
[/sourcecode]

Este caso se describe con uno de los siguientes mensajes detallados:

* "Mandatory style boilerplate (js enabled)"
* "Mandatory style boilerplate (noscript)"
* "Disallowed -amp- CSS class name prefix"
* "Disallowed !important attribute in CSS"
* "Disallowed @charset in CSS"
* "Disallowed @import in CSS"
* "Disallowed @namespace in CSS"
* "Disallowed @supports in CSS"
* "Disallowed @document in CSS"
* "Disallowed @page in CSS"
* "Disallowed @viewport in CSS"

### Texto no permitido dentro de la etiqueta

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>CDATA_VIOLATES_DENYLIST</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Quita el texto no permitido.</td>
  </tr>
</table>

Los datos de CSS específicos se han incluido en la lista negra para validar reglas fundamentales de AMP para CSS.

A continuación puedes consultar la lista de datos CSS incluidos en la lista negra (consulta también <a href="https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii">`disallowed_cdata_regex` en la especificación del validador de AMP</a>):

* `"\\.i?-amp-"` ("prefijo de nombre de clase -amp- CSS")
* `"!important"`
* `"charset"`
* `"@import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### Propiedad no permitida dentro del atributo incluido en la etiqueta

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>DISALLOWED_PROPERTY_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Quita la propiedad no permitida en el atributo especificado.</td>
  </tr>
</table>

Este error se produce cuando el nombre de la propiedad no se permite dentro de un atributo.
La propiedad del término, en este contexto, hace referencia a los datos clave-valor estructurados dentro de un atributo.
Por ejemplo, en `<meta name="viewport content="width=device-width;minimum-scale=1">`, `width` y `minimum-scale` son nombres de propiedades.

La cadena siguiente tiene como resultado un error DISALLOWED_PROPERTY_IN_ATTR_VALUE:

`<meta name="viewport content="width=device-width;invalidfoo=1">`

Igual que el ejemplo anterior, la cadena siguiente daría lugar a un error:

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

Debería ser `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### Valor de propiedad no válido

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Corrige el valor de propiedad no válido.</td>
  </tr>
</table>

Este error se produce cuando el valor de la propiedad dentro de un atributo no es válido.
La propiedad del término, en este contexto, hace referencia a los datos clave-valor estructurados dentro de un atributo.
Por ejemplo, en `<meta name="viewport content="width=device-width;minimum-scale=1">`, `device-width` y `1` son valores de propiedad.

La cadena siguiente devuelve un error INVALID_PROPERTY_VALUE_IN_ATTR_VALUE:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

Tenga en cuenta que si está intentando generar un atributo sin valor (por ejemplo, un atributo como `autoplay`, `controls` o `loop` para el componente [`amp-video`](../../../../documentation/components/reference/amp-video.md)), pero su proceso de compilación HTML está generando un valor predeterminado (pero no válido) como `true` (React, por ejemplo, producirá `<amp-video autoplay = "true" ...>` [de forma predeterminada](https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true)), la solución alternativa es mostrar el nombre del atributo como el valor. Por ejemplo, `<amp-video autoplay="autoplay"...>`.

### Falta la URL

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td>MISSING_URL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>"Missing URL for attribute '%1' in tag '%2'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Corrección</strong></td>
    <td>Añade la URL válida.</td>
  </tr>
</table>

Este error se produce cuando un atributo requiere una URL pero no la tiene. Por ejemplo, un atributo `href` o `src` vacío.

### URL no válida

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>"Malformed URL '%3' for attribute '%1' in tag '%2'"</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Corrección</strong></td>
    <td>Corrige la URL incorrecta.</td>
  </tr>
</table>

Este error se produce cuando un atributo tiene una URL, pero no es válida.

### Protocolo de URL no válido

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Corrección</strong></td>
    <td>Cámbialo por un protocolo válido, por ejemplo, cambia `http` por `https`.</td>
  </tr>
</table>

Este error se produce en etiquetas cuyos atributos `href` o `src` se deben establecer en ciertos protocolos.
Por ejemplo, muchas etiquetas requieren `https`.

### Falta una propiedad obligatoria de un atributo

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The property '%1' is missing from attribute '%2' in tag '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Añade la propiedad que falta.</td>
  </tr>
</table>

Actualmente, este error se produce si faltan estas propiedades obligatorias:

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

Hacen referencia a etiquetas previstas:

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### Atributos que se excluyen mutuamente

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>MUTUALLY_EXCLUSIVE_ATTRS</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Quita uno de los atributos que se excluyen mutuamente.</td>
  </tr>
</table>

Este error se produce cuando una etiqueta contiene dos atributos que se excluyen mutuamente.
Por ejemplo, en los siguientes casos, solo se permite uno de los dos atributos:

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` o `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` o `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` o `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` o `data-videoid`

### Falta un atributo obligatorio en la lista

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>MANDATORY_ONEOF_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The tag '%1' is missing a mandatory attribute - pick one of %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Añade el atributo obligatorio que falta en la selección de atributos proporcionados.</td>
  </tr>
</table>

Este error se produce cuando a una etiqueta le falta un atributo requerido de varias opciones.
Por ejemplo, las siguientes etiquetas requieren uno de los dos atributos posibles:

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` o `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` o `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` o `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` o `data-videoid`

### Etiqueta principal incorrecta

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>WRONG_PARENT_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The parent tag of tag '%1' is '%2', but it can only be '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Convierte la etiqueta en una etiqueta secundaria directa de la principal obligatoria.</td>
  </tr>
</table>

Algunas etiquetas requieren una etiqueta principal inmediata (en contraposición a una etiqueta antecesora lejana).
A continuación se enumeran las etiquetas principales necesarias para etiquetas concretas (etiqueta, principal):

* `!doctype` requiere la etiqueta principal `root`.
* `html` requiere la etiqueta principal `!doctype`.
* `head` requiere la etiqueta principal `html`.
* `body` requiere la etiqueta principal `html`.
* `link` requiere la etiqueta principal `head`.
* `meta` requiere la etiqueta principal `head`.
* `style amp-custom` requiere la etiqueta principal `head`.
* `style` requiere la etiqueta principal `boilerplate (noscript)`.
* `noscript` requiere la etiqueta principal `head`.
* `script` requiere la etiqueta principal `head`.
* `source` requiere una etiqueta multimedia ([`amp-audio`](../../../../documentation/components/reference/amp-audio.md), [`amp-video`](../../../../documentation/components/reference/amp-video.md), etc.).

### Etiqueta antecesora no permitida

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>DISALLOWED_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The tag '%1' may not appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Quita (o mueve) la etiqueta anidada no permitida.</td>
  </tr>
</table>

Este error se produce cuando una etiqueta es descendiente de otra etiqueta que no se valida.
En la actualidad, el único ejemplo es una etiqueta `template`, que podría no estar anidada en otra etiqueta `template`.

### Etiqueta antecesora obligatoria

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Quita la etiqueta o conviértela en descendiente de la etiqueta específica.</td>
  </tr>
</table>

En la [especificación del validador de AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) se hace referencia a los descendientes obligatorios como `mandatory_ancestor`.

El error se produce cuando a las siguientes etiquetas les falta su `mandatory_ancestor` (etiqueta, antecesora):

* `img` debe ser descendiente de `noscript`.
* `video` debe ser descendiente de `noscript`.
* `audio` debe ser descendiente de `noscript`.
* `noscript` debe ser descendiente de `body`.

### Etiqueta antecesora obligatoria con sugerencia

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR_WITH_HINT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Quita la etiqueta, conviértela en descendiente de la etiqueta específica o cambia la etiqueta por la etiqueta con sugerencia.</td>
  </tr>
</table>

El error se produce cuando una de las siguientes etiquetas se encuentra en el documento de AMP y no está anidada correctamente en su etiqueta principal obligatoria:

* `img` no está dentro de la etiqueta `noscript` principal.
* `video` no está dentro de la etiqueta `noscript` principal.
* `audio` no está dentro de la etiqueta `noscript` principal.
* `noscript` no está dentro de la etiqueta `body` principal.

### Etiqueta única duplicada

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>DUPLICATE_UNIQUE_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The tag '%1' appears more than once in the document."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Quita una de las etiquetas duplicadas del documento de AMP.</td>
  </tr>
</table>

Este error se produce cuando solo está permitido usar una instancia de la etiqueta y se encuentra un duplicado.

La lista completa de etiquetas únicas es la siguiente:

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
* `<meta viewport>`
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://ampjs.org/v0.js">`

## Errores de estilo y de diseño <a name="style-and-layout-errors"></a>

Antes de entrar en los errores de [estilo](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md) y de [diseño](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md), hay que entender cómo funcionan en AMP. Como las páginas AMP son páginas HTML, el estilo es prácticamente el mismo que el de cualquier página HTML.
Sin embargo, para garantizar que las páginas se carguen rápidamente, presentan algunas restricciones que el validador de AMP se encarga de hacer cumplir.

El diseño está más controlado en las páginas de AMP.
Todas las etiquetas que se muestran en la página deben tener una altura y una anchura predefinidas. De este modo, se reducen notablemente el procesamiento y los errores en los desplazamientos por la página.
Pero esto no significa que debas incluir manualmente estos atributos,
ya que en algunos tipos de diseño, el validador de AMP no devuelve errores, sino que adopta los valores predeterminados.

Todas las etiquetas de AMP tienen una lista de `supported_layouts`, como se define en la [especificación del validador de AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
El validador devolverá errores cuando detecte diseños no admitidos y aplicará reglas de validación para el diseño predefinido.

### Hoja de estilo demasiado larga

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>STYLESHEET_TOO_LONG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Reduce el tamaño de la hoja de estilo hasta menos de 50.000 bytes.</td>
  </tr>
</table>

El validador de AMP devuelve este error cuando detecta que el tamaño del contenido de estilos dentro de `<style amp-custom>` supera el límite de 50.000 bytes.

### Error de sintaxis CSS

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>CSS_SYNTAX</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"CSS syntax error in tag '%1' - %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Corrige el error de sintaxis CSS.</td>
  </tr>
</table>

Este error se produce cuando hay errores de sintaxis CSS en la etiqueta especificada.
Si no estás seguro de lo que está provocando el error, intenta ejecutar el CSS a través de un validador de CSS online, como [csslint](http://csslint.net/).

### Error de sintaxis CSS en una regla específica

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>CSS_SYNTAX_INVALID_AT_RULE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Corrige el error de sintaxis CSS especificado.</td>
  </tr>
</table>

Este error se refiere a las reglas de CSS que contienen @, para las que AMP solo permite una serie de reglas
(consulta también la [especificación de AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).
Por ejemplo, la regla `@import` no está permitida.
En el error de validación se indica cuál es concretamente la regla no válida para que puedas corregirla más fácilmente.

### La etiqueta de AMP no admite el diseño implícito

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>IMPLIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The implied layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Proporciona un atributo de diseño válido para la etiqueta.</td>
  </tr>
</table>

Este error se produce cuando no se especifica ningún diseño para la etiqueta de AMP y no se admite el diseño implícito (basado en la anchura, la altura y los tamaños).
Consulta los valores de `supported_layout` para la etiqueta en la [especificación del validador de AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

El atributo `layout` es el que determina el comportamiento real del diseño.
Para obtener más información sobre cómo funciona el diseño, consulta [Cómo controlar el diseño](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) y la [especificación del sistema de diseño AMP HTML](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md).

**Nota:** Si no se especifica el diseño y no se incluyen los valores de `width` y `height`, el valor predeterminado del diseño es CONTAINER. El validador devuelve un error porque ninguna de las etiquetas de AMP admite CONTAINER.
Para que el error desaparezca, especifica un diseño distinto de CONTAINER o añade un valor `width` y/o `height`.

### Atributo no permitido por el diseño implícito

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td>ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Corrección</strong></td>
    <td>Quita el atributo no permitido de la etiqueta o bien especifica un diseño que lo permita.</td>
  </tr>
</table>

Este error se produce cuando no se especifica ningún diseño para la etiqueta de AMP y el diseño implícito contiene un atributo no permitido.
Los atributos no permitidos por los tipos de diseño se describen en la [especificación del sistema de diseño AMP HTML](../../../../documentation/components/reference/amp-layout.md).

### La etiqueta de AMP no admite el diseño especificado

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>SPECIFIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The specified layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Especifica un diseño que la etiqueta admita.</td>
  </tr>
</table>

Este error se produce cuando no se admite el diseño especificado para la etiqueta.
Consulta los valores de `supported_layout` para la etiqueta en la [especificación del validador de AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

El atributo `layout` es el que determina el comportamiento real del diseño.
Para obtener más información sobre cómo funciona el diseño, consulta [Cómo controlar el diseño](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) y la [especificación del sistema de diseño AMP HTML](../../../../documentation/components/reference/amp-layout.md).

### Atributo no permitido por el diseño especificado

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td>ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Corrección</strong></td>
    <td>Quita el atributo no permitido de la etiqueta o bien especifica un diseño que lo permita.</td>
  </tr>
</table>

Este error se produce cuando se especifica un diseño para la etiqueta de AMP y ese diseño contiene un atributo no permitido.
Los atributos no permitidos por los tipos de diseño se describen en la [especificación del sistema de diseño AMP HTML](../../../../documentation/components/reference/amp-layout.md).

### El atributo requerido por el diseño tiene un valor no válido

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>ATTR_VALUE_REQUIRED_BY_LAYOUT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Asigna el valor especificado al atributo.</td>
  </tr>
</table>

Este error se produce cuando el valor del atributo no es válido para el diseño especificado.
Para entender lo que desencadena este error, es necesario familiarizarse con los [diferentes comportamientos de los diseños](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md).

Imaginemos que se establece que el diseño sea `fixed-height` y se incluyen valores numéricos para `height` y para `width`.
El diseño `fixed-height` adquiere un valor `height`.
El atributo `width` no debe estar presente ni tener un valor distinto a `auto`.
El validador devuelve ATTR_VALUE_REQUIRED_BY_LAYOUT.

### Unidades de anchura y altura incompatibles

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Proporciona las mismas unidades para la anchura y la altura.</td>
  </tr>
</table>

A excepción de `layout=fixed`, los atributos de anchura y altura se tienen que expresar con las mismas unidades.
De no ser así, se produce este error.

Por ejemplo, `<amp-img src="" layout="responsive" width="42px" height="42rem">` tiene como resultado el mensaje de error siguiente:

"La anchura y la altura de la etiqueta '[`amp-img`](../../../../documentation/components/reference/amp-img.md)  se expresan con unidades distintas. La anchura se indica en 'px', mientras que la altura se indica en 'rem'."

## Errores en las plantillas

Las páginas de AMP no pueden incluir sintaxis de plantillas a menos que dicha sintaxis esté en una etiqueta de AMP específicamente diseñada para incluir plantillas, por ejemplo, [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md).

Se pueden incluir plantillas en los archivos fuente, siempre que el resultado generado por estos archivos no contenga las plantillas (consulta también [Utilizar preprocesadores de CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md)).

### El atributo contiene sintaxis de la plantilla

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>TEMPLATE_IN_ATTR_NAME</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"Mustache template syntax in attribute name '%1' in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Quita la sintaxis de la plantilla Mustache del atributo.</td>
  </tr>
</table>

Este error se produce cada vez que el validador detecta [sintaxis de la plantilla Mustache](https://mustache.github.io/mustache.5.html) en un valor de atributo.

### El atributo contiene sintaxis unívoca de plantilla

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>UNESCAPED_TEMPLATE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Introduce código de escape en la plantilla Mustache.</td>
  </tr>
</table>

Este error se produce cada vez que el validador detecta [sintaxis unívoca de la plantilla Mustache](https://mustache.github.io/mustache.5.html) en un valor de atributo.

### El atributo contiene parciales de la plantilla

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>TEMPLATE_PARTIAL_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Quita el parcial de Mustache.</td>
  </tr>
</table>

Este error se produce cada vez que el validador detecta un [parcial de Mustache](https://mustache.github.io/mustache.5.html) en un valor de atributo.

## Errores de desactivación

### Etiqueta obsoleta

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>DEPRECATED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>No error message defined as yet (no deprecated tags).</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Quita la etiqueta obsoleta.</td>
  </tr>
</table>

Esta advertencia se produce cuando en el documento de AMP se detecta una etiqueta de AMP que antes era válida.
Se trata solamente de una advertencia, ya que los documentos de AMP con advertencias siguen siendo válidos.
Actualmente no existen etiquetas obsoletas; la advertencia se reserva para futuras desactivaciones.

### Atributo obsoleto

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td>DEPRECATED_ATTR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Corrección</strong></td>
  	<td>Se recomienda quitar el atributo obsoleto.</td>
  </tr>
</table>

Esta advertencia se produce cuando en el documento de AMP se detecta un atributo de AMP que antes era válido.
Se trata solamente de una advertencia, ya que los documentos de AMP con advertencias siguen siendo válidos.

Para identificar los atributos obsoletos de cada etiqueta de AMP, busca `deprecation` en la [especificación del validador de AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
