---
$title: Imágenes adaptativas con srcset, sizes & heights
---
[TOC]

## srcset

Utilice el atributo `srcset` para controlar los elementos
basado en expresiones de medios variables
En particular, utilícelo para todas las etiquetas [`amp-img`](/es/docs/reference/components/amp-img.html) 
para especificar cuál imagen se usará basedo en la variedad de tamaños de pantalla.

En este ejemplo simple, `srcset` especifica cuál imagen se usará para el ancho de la pantalla.
El descriptor `w` le dice al navegador el ancho de cada imagen en la lista:

<!--embedded amp-img example using srcset -->
<div>
<amp-iframe height="231"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.srcset.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Nota', type='note') %}
AMP soporta srcset con el descriptor `w` en todos los navegadores web.
{% endcall %}

Aprende más sobre cómo crear imágenes adaptables usando `srcset`
con el artículo en inglés: [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now).

## sizes

También puedes usar el atributo `sizes` junto con el atributo `srcset`.
El atributo `sizes` describe cómo calcular el tamaño del elemento basado en cualquier expresión de medios.
Basado en el tamaño calculado del medio, el agente de usuario selecciona la fuente más relativa suministrada por el atributo `srcset`.

Considere el siguiente ejemplo:

<!--embedded amp-img example using sizes -->
<div>
<amp-iframe height="231"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.sizes.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

El atributo `sizes` define el ancho del elemento como 50% del tamaño de la ventana gráfica cuando la ventana es de 650px o más.
Por ejemplo, si la ventana es 800px, el ancho del elemento se establece en 400px.
A continuación, el navegador selecciona el recurso `srcset` relativo a 400px, suponiendo que la relación de píxeles del dispositivo es 1, que en este caso es `narrow.jpg` (320px).

{% call callout('Importante', type='caution') %}
Cuando el atributo `sizes` está especificado junto con `width` y `height`, el `layout` por defecto es `responsive`.
{% endcall %}

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

<!--embedded amp-img example using heights -->
<div>
<amp-iframe height="193"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.heights.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

En este ejemplo, la altura del elemento por defecto será del 80% del ancho, pero para la ventana de visualización más ancha que `500px` estará limitada a `200px`.
