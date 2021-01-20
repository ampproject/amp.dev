---
"$title": Imágenes adaptativas con srcset, sizes & heights
"$order": '4'
description: Utilice el atributo srcset para controlar los elementos basados en expresiones de medios variables. En particular, utilícelo con todas las etiquetas amp-img para especificar cuál...
formats:
- websites
- email
- ads
- stories
components:
- iframe
author: pbakaus
contributors:
- bpaduch
---

## srcset

Utilice el atributo `srcset` para controlar los elementos basados en expresiones de medios variables En particular, utilícelo con todas las etiquetas [`amp-img`](../../../../documentation/components/reference/amp-img.md) para especificar cuál imagen se usará con base en la variedad de tamaños de pantalla. AMP generará automáticamente un atributo <code>sizes</code> <a>que cumpla con la definición HTML5 de <code>sizes</code></a>, para todas las etiquetas subyacentes <code><img></code> de <code><amp-img></code> si <code><amp-img></code> tiene un atributo <code>srcset</code> pero sin <code>sizes</code>.

En este ejemplo simple, `srcset` especifica cuál imagen se usará para el ancho de la pantalla. El descriptor `w` le dice al navegador el ancho que tendrá cada imagen en la lista:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w">
</amp-img>
```
[/example]

[tip type="tip"] <strong>NOTA:</strong> AMP soporta srcset con el descriptor `w` en todos los navegadores web. [/tip]

Aprenda más sobre cómo crear imágenes adaptables usando `srcset` en el artículo: [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now).

## sizes

También puede utilizar el atributo `sizes` junto con el atributo `srcset`. El atributo de AMP `sizes` describe cómo calcular el tamaño del elemento con base en cualquier expresión de medios. <strong>Definir <code>sizes</code> en cualquier elemento de AMP hará que AMP establezca un estilo en línea para el ancho de ese elemento, de acuerdo con la consulta de los medios.</strong> De acuerdo con el tamaño que se calcule en el medio, el agente del usuario seleccionará la fuente más relativa que proporcione el atributo `srcset`.

Considere el siguiente ejemplo:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw">
</amp-img>
```
[/example]

El atributo `sizes` define el ancho del elemento como el 50% del tamaño de la ventana gráfica cuando la ventana es mayor de 650px. Por ejemplo, si la ventana es de 800px, el ancho del elemento se establecerá en 400px. Después, el navegador seleccionará el recurso `srcset` relativo a 400px, suponiendo que la relación de píxeles del dispositivo sea 1, el cual, en este caso es `narrow.jpg` (320px).

[tip type="important"] <strong>IMPORTANTE:</strong> Cuando el atributo `sizes` esté especificado junto con `width` y `height`, el `layout` predeterminado será `responsive`. [/tip]

Obtenga más información sobre el <a>atributo <code data-md-type="codespan">sizes</code> de AMP aquí</a>.

## heights

Todos los elementos personalizados de AMP que permiten un diseño `responsive`, también soportan el atributo `heights`. El valor de este atributo es una expresión de tamaños basada en expresiones de medios similar al [atributo img sizes](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/img), pero con dos diferencias clave:

1. Se aplica a la altura y no al ancho del elemento.
2. Se permiten valores porcentuales, por ejemplo, `86%`. Si se utiliza un valor porcentual, indica el porcentaje de ancho del elemento.

Cuando el atributo `heights` se especifica junto con `width` y `height`, el `layout`  predeterminado es `responsive`.

Un ejemplo:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%">
</amp-img>
```
[/example]

En este ejemplo, la altura del elemento predeterminado será del 80% del ancho, pero para la ventana de visualización más ancha que `500px` se limitará a `200px`.
