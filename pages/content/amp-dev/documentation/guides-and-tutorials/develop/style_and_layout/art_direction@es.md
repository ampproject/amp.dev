---
$title: Imágenes adaptativas con srcset, sizes & heights
---

## srcset

Utilice el atributo `srcset` para controlar los elementos
basado en expresiones de medios variables
En particular, utilícelo para todas las etiquetas [`amp-img`](../../../../documentation/components/reference/amp-img.md)
para especificar cuál imagen se usará basedo en la variedad de tamaños de pantalla.

En este ejemplo simple, `srcset` especifica cuál imagen se usará para el ancho de la pantalla.
El descriptor `w` le dice al navegador el ancho de cada imagen en la lista:

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

Nota: AMP soporta srcset con el descriptor `w` en todos los navegadores web.

Aprende más sobre cómo crear imágenes adaptables usando `srcset`
con el artículo en inglés: [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now).

## sizes

También puedes usar el atributo `sizes` junto con el atributo `srcset`.
El atributo `sizes` describe cómo calcular el tamaño del elemento basado en cualquier expresión de medios.
Basado en el tamaño calculado del medio, el agente de usuario selecciona la fuente más relativa suministrada por el atributo `srcset`.

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

El atributo `sizes` define el ancho del elemento como 50% del tamaño de la ventana gráfica cuando la ventana es de 650px o más.
Por ejemplo, si la ventana es 800px, el ancho del elemento se establece en 400px.
A continuación, el navegador selecciona el recurso `srcset` relativo a 400px, suponiendo que la relación de píxeles del dispositivo es 1, que en este caso es `narrow.jpg` (320px).

Importante: Cuando el atributo `sizes` está especificado junto con `width` y `height`, el `layout` por defecto es `responsive`.

Aprende más sobre cómo los atributos `sizes` y `srcset` compara
con las consultas de medios en este artículo en inglés ["srcset and sizes"](https://ericportis.com/posts/2014/srcset-sizes/).

## heights

Todos los elementos personalizados AMP que permiten un layout `responsive`, también soportan el atributo `heights`.
El valor de este atributo es una expresión de tamaños basada en expresiones de medios similar al [atributo img](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/img), pero con dos diferencias clave:

 1. Se aplica a la altura y no a la anchura del elemento.
 2. Se permiten valores porcentuales, p. ej. `86%`. Si se utiliza un valor porcentual, indica el porcentaje
 de ancho del elemento.

Cuando el atributo `heights` es especificado junto con `width` y `height`, el `layout` es por defecto `responsive`.

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

En este ejemplo, la altura del elemento por defecto será del 80% del ancho, pero para la ventana de visualización más ancha que `500px` estará limitada a `200px`.
