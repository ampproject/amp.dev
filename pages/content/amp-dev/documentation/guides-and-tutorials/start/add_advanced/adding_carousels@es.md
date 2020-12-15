---
"$title": Adición de carruseles
"$order": '3'
description: Otra característica común en las páginas móviles es un carrusel. Puede agregar fácilmente carruseles a las páginas de AMP utilizando el componente amp-carousel.
---

Otra característica común en las páginas móviles es un carrusel. Puede agregar fácilmente carruseles a las páginas de AMP utilizando el componente de [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md). Comencemos con el ejemplo sencillo de un carrusel de imágenes.

## Carrusel de imágenes sencillo

Recuerde incluir la biblioteca de componentes de <a><code data-md-type="codespan">amp-carousel</code></a> **agregando** la siguiente solicitud de JavaScript a la etiqueta `<head>` de su documento:

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
```

A continuación, insertaremos un carrusel de imágenes sencillo con un diseño de respuesta y un ancho y una altura predefinidos. **Agregue** lo siguiente a su página:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel" >
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Actualice** su página y deberá ver un carrusel en ella:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Simple images carousel') }}

El componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) puede configurarse de varias maneras. Cambiemos la interfaz de usuario para mostrar solo una imagen a la vez y hacer que el diseño del carrusel responda.

Para lograr esto, primero <strong>cambie</strong> el <code>type</code> del <a><code>amp-carousel</code></a>, de <code>carousel</code> a <code>slides</code>, <strong>cambie</strong> el <code>layout</code> a <code>responsive</code>  <strong>establezca</strong> el <code>width</code> a 300 (asegurándose de que tiene tanto <code>height</code> como <code>width</code> definidos).  <strong>Agregue</strong> el atributo <code>"layout=responsive"</code> a los hijos de <a><code>amp-img</code></a> en <a><code>amp-carousel</code></a>.

Vuelva a <strong>cargar</strong> su página. Ahora, en vez de una lista desplegable de elementos, verá un elemento a la vez. Trate de <strong>deslizarse</strong> horizontalmente para moverse entre los elementos. Si pasa al tercer elemento, no podrá desplazarse más.

A continuación, <strong>agregue</strong> el atributo `loop`. <strong>Actualice</strong> la página e inmediatamente trate de deslizarse hacia la izquierda. El carrusel girará sin cesar.

Por último, haremos que el carrusel se ejecute automáticamente cada 2 segundos. <strong>Agregue</strong> a <a><code>amp-carousel</code></a> el atributo <code>autoplay</code> y el atributo <code>delay</code> con un valor de <code>2000</code> (por ejemplo, <code>delay="2000"</code>).

Su resultado final debe ser algo parecido a esto:

```html
<amp-carousel layout="responsive" width="300" height="168" type="slides" autoplay delay="2000" loop>
  <amp-img src="mountains-1.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168" layout="responsive"></amp-img>
</amp-carousel>
```

¡<strong>Actualice</strong> la página y vea cómo gira!

tip type="note"] <strong>NOTA:</strong>  Tal vez se dio cuenta de que cuando <a><code>amp-carousel</code></a> tenía el tipo <code>carousel</code>, usamos el tipo de disposición <code>fixed-height</code>. Los tipos de disposición compatibles con el tipo <code>carousel</code> son limitados, por ejemplo, el tipo <code>carousel</code> no es compatible con la disposición <code>responsive</code>. Como su nombre indica, los elementos de altura fija ocupan el espacio disponible, pero mantienen la altura sin cambios. Para los elementos de altura fija, debe definir el atributo <code>height</code>, mientras que el atributo <code>width</code> debe ser <code>auto</code> o no estar establecido. [/tip]

## Contenido mixto de carrusel

En primer lugar, vamos a **añadir** este estilo a la página para garantizar que el [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) y [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) funcionan juntos con seguridad:

En primer lugar, vamos a **añadir** este estilo a la página para garantizar que el <a><code>amp-fit-text</code></a> y <a><code>amp-carousel</code></a> funcionan juntos con seguridad:

```css
amp-fit-text {
    white-space: normal;
}
```

Ahora, **reemplazar** tu carousel simple con éste:

```html
<amp-carousel layout="fixed-height" height="250" type="carousel" >
    <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

    <amp-ad width="300" height="250"
      type="doubleclick"
      data-slot="/35096353/amptesting/image/static">
        <div placeholder>This ad is still loading.</div>
    </amp-ad>

    <amp-fit-text width="300" height="250" layout="fixed">
        Big, bold article quote goes here.
    </amp-fit-text>
</amp-carousel>
```

<strong>Actualice</strong> la página y debería ver algo como ésto:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='A carousel of mixed content') }}

Para obtener más información consulte la documentación de referencia del componente [`amp-carousel`](../../../../documentation/components/reference/amp-ad.md).

[tip type="note"] **NOTE –**  In our last example you may have noticed the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component included a child `div` element with the `placeholder` attribute. Earlier in the tutorial, we encountered a similar scenario with [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) using a `fallback`. What’s the difference between placeholder and fallback? `Fallback` elements appear when the parent element fails to load, i.e. if there was no ad available. `placeholder` elements appear in place of the parent element, while it is loading. In a sense, these elements bookend the loading process of the parent element. You can learn more in [Placeholders & fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) guide. [/tip]
