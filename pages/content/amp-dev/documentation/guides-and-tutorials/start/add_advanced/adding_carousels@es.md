---
$title: Agregar carruseles
---

Otra característica común en las páginas móviles es un carrusel. Puede agregar fácilmente carruseles a las páginas de AMP utilizando el componente de [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md). Comencemos con un ejemplo simple, como un carrusel de imágenes.

## Carrusel simple de imagen

Recuerde incluir la biblioteca de componentes del amplificador-carrusel **añadiendo** la siguiente solicitud de JavaScript a la etiqueta `<head>` de su documento:

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
```

A continuación, insertemos un simple carrusel de imágenes con un diseño de respuesta y un ancho y una altura predefinidos. **Agregue** lo siguiente a su página:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel" >
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Actualiza** tu página y deberías ver un carrusel en tu página:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Carrusel de imágenes simples') }}

El componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) se puede configurar de varias maneras. Intente **cambiar** el `type` de `carousel` a `slides`, y mire el resultado. Para asegurarse de que su contenido varíe y responda al tamaño de la pantalla, en el componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md), **cambie** el `layout` a `responsive`. Asegúrese de que su carrusel tiene valores de `width` y `height` definidos. Además, **agregue** el atributo `"layout=responsive"` a los elementos [`amp-img`](../../../../documentation/components/reference/amp-img.md).

**Vuelve a cargar** tu página. Ahora, en lugar de una lista desplegable de elementos, verá un elemento a la vez. Trate de **deslizar** horizontalmente para moverse a través de los elementos. Si pasa al tercer elemento, no podrá desplazarse más.

A continuación, **agregue** el atributo `loop`. **Actualice** la página e intente deslizar hacia la izquierda inmediatamente. El carrusel se mueve sin cesar.

Por último, vamos a hacer esta autoplay carrusel a una velocidad de cada 2 segundos. **Agregue** el atributo de `autoplay` a la página y el atributo `delay` con un valor de `2000` (por ejemplo, `delay="2000"`).

Su resultado final debe ser algo como esto:

```html
<amp-carousel layout="responsive" width="300" height="168" type="slides" autoplay delay="2000" loop>
  <amp-img src="mountains-1.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168" layout="responsive"></amp-img>
</amp-carousel>
```

¡**Actualice** la página y vea cómo gira!

Nota: Podrías haber notado que estamos usando el tipo de disposición `fixed-height` en el carrusel. Se requiere un diseño de `fixed-height` para el tipo `carousel`, mientras que el tipo `slides` requiere el tipo de diseño `responsive`. Fixed-height toma el espacio disponible para ellos, pero mantienen la altura inalterada. Para los elementos de altura fija, debe definir el atributo `height`, mientras que el atributo `width` no debe estar presente, o debe establecerse en `auto`.

## Contenido mixto de carrusel

Los carruseles de imágenes son geniales, pero ¿y si queremos que aparezca un contenido más complejo en nuestro carrusel? Intentemos mezclar un poco las cosas colocando un anuncio, un texto y una imagen en un único carrusel. ¿Puede el amperio-carrusel realmente manejar tal mezcla de una vez? ¡Absolutamente!

En primer lugar, vamos a **añadir** este estilo a la página para garantizar que el [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) y [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) funcionan juntos con seguridad:

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

**Actualiza** la página y deberías ver algo como ésto:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='Un carousel de contenido mixto') }}

Aprende más sobre el componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

Nota: En nuestro último ejemplo, es posible que haya notado que el componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) incluía un elemento `div` hijo con el atributo de `placeholder`. Anteriormente en el tutorial, nos encontramos con un escenario similar con [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) con un `fallback`. ¿Cuál es la diferencia entre el marcador de posición y el fallback? Los elementos `fallback` aparecen cuando el elemento primario no se carga, es decir, si no hay ningún anuncio disponible. Mientras que los elementos `placeholder` aparecen en lugar del elemento principal, mientras se está cargando. En cierto sentido, cada atributo sujeta el proceso de carga del elemento padre. Puede obtener más información en la Guía [Placeholders & fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).
