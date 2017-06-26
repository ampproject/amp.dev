---
$title: Crear páginas AMP responsivas
$order: 5
toc: true
components:
  - iframe
---
[TOC]

## Introducción

El diseño web responsivo consiste en crear páginas web fluidas que responden a las necesidades de su usuario, páginas que se ajustan al tamaño de la pantalla y la orientación de su dispositivo. Usted puede lograr esto fácilmente en AMP. AMP admite todas las categorías de pantallas y dispositivos y además proporciona componentes responsivos integrados.

En esta guía, le mostraremos cómo puede implementar fácilmente estos fundamentos de responsivos en AMP:

- [Controlando el viewport](#controlando-el-viewport)
- [Creando el layout responsivo](#creando-el-layout-responsivo)
- [Medios de escala](#medios-de-escala-para-la-pagina)

## Controlando el viewport

Para optimizar su página web para que el contenido sea escalable y se ajuste a la ventana del navegador para cualquier dispositivo, debe especificar un `viewport` (elemento de vista gráfica) `meta`. El elemento viewport indica al navegador cómo escalar y dimensionar el área visible (viewport) de la página web.

Pero, ¿qué valores debe utilizar? Pues bien, aparte del [marcado requerido](https://www.ampproject.org/docs/reference/spec#required-markup) para páginas AMP, se debe especificar el  siguiente viewport:

```html
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
```

Éstas son las configuraciones típicas del viewport que utilizarías para un sitio responsivo. Aunque `initial-scale = 1` no es necesario para una página AMP válida, se recomienda porque establece el nivel de zoom en 1 cuando se cargue la página por primera vez.


## Creando el layout responsivo

En el diseño responsivo, puede utilizar CSS [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) para adaptar el estilo de su página web para la variedad de la pantalla dimensiones sin tener que alterar el contenido de la página. En AMP, puede seguir utilizando las mismas consultas CSS `@media`. Además, para un control más preciso sobre un elemento AMP, se puede especificar el atributo `media` en el elemento. Esto es particularmente útil cuando se necesita para mostrar u ocultar un elemento en base a una consulta de medios. Ver la sección [Cambiando la dirección de arte de una imagen](#cambiando-la-dirección-de-arte-de-una-imagen) para un ejemplo que utiliza el atributo `media`.

Haciendo que cada elemento de cambio de tamaño para adaptarse a una pantalla puede ser complicado <sup><a href="#fn1" id="ref1">*</a></sup>. Sin embargo, en AMP, usted puede hacer fácilmente un elemento responsivo con sólo especificar el atributo `"layout=responsive"` junto a los atributos `width` y `height`. Cuando se aplica el layout `responsive` a un elemento, ese elemento cambiará de tamaño automáticamente a la anchura de su elemento contenedor, y la altura cambiará en función de la relación de aspecto especificada por `width` y `height` característica del elemento. Casi todos los elementos de AMP apoyan un layout `responsive`; consulte la documentación de referencia del elemento para ver qué diseños son compatibles.

A pesar de que usted puede hacer fácilmente elementos responsivos con `"layout=responsive"`, debe tener en cuenta cómo aparecerán los elementos en todos los tamaños de pantalla -incluyendo ordenadores y tablets. Un error común es permitir una imagen para tomar todo el ancho de la pantalla, que se extiende más allá de la imagen, su tamaño previsto, provocando una mala experiencia para los usuarios de pantalla ancha. Por defecto, los elementos con `layout=responsive` tomarán la anchura total del contenedor del elemento, que es a menudo sin restricciones de ancho (es decir., `width=100%`). Se puede mejorar la forma de las imágenes aparecen con sólo restringir el ancho de contenedor de la imagen. Por ejemplo, mediante el establecimiento de una regla `"max-width"` en el `"body"` o `"main"`, puede restringir todas las imágenes a un ancho máximo específicas.

##### Ejemplo: Restringiendo el ancho de imagenes responsivas

En el siguiente ejemplo, tenemos una imagen de flores (640 x 427 px) que queremos mostrar en todos los tamaños de pantalla, así que especificamos el `width` y `height`, y configuramos el layout a `responsive`.  Sin embargo, no queremos que la pantalla se vaya más allá de su tamaño, así que configuramos un ancho máximo con `max-width` de 700 px.

<div><amp-iframe height=213 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.basic-image.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Show full code</div><div placeholder></div></amp-iframe></div>

{% call callout('Leer más', type='read') %}
Para aprender más sobre los diferentes layouts en AMP, leer la guía [Layout & consultas de medios](https://www.ampproject.org/es/docs/guides/responsive/control_layout#el-atributo-layout).
{% endcall %}

 <a id="fn1"></a>
{% call callout2(type='none') %}
***¿Por qué es complicado hacer que los elementos cambien de tamaño para que se ajusten a la pantalla cuando puedo hacer esto fácilmente con el estilo `"width=100%"`?** La parte difícil es tener elementos responsivos en la página sin afectar negativamente las métricas de rendimiento o la experiencia del usuario. Sí, puede obtener fácilmente imágenes para que se ajusten a la pantalla con `"width=100%"`, pero hay golpes al  rendimiento. El navegador debe descargar primero la imagen para obtener las dimensiones de la imagen, luego redimensionar la imagen apropiadamente para el tamaño de la pantalla y, finalmente, refluir y volver a cargar la página. En AMP, la ruta de renderizado se optimiza de modo que primero se presenta la página, dejando de lado los marcadores de posición de las imágenes basadas en las dimensiones proporcionadas en `amp-img` (usando esos números para establecer la relación de aspecto), los recursos se descargan y Página está pintada. No se requiere reflujo.
{% endcall %}

## Medios de escala para la página

Probablemente el aspecto más desafiante del diseño responsivo es mostrar correctamente los medios en la página para que responda a las características de la pantalla. En esta sección, veremos cómo puede integrar videos e imágenes responsivas en las páginas de AMP.

### Insertando videos

Cuando incluya un video en su página web, desea asegurarse de que el usuario pueda ver el contenido del vídeo y los controles del video. Normalmente, lo lograrás con una combinación de consultas de medios CSS, un contenedor y otros CSS. En AMP, sólo tiene que agregar el elemento de vídeo a su página, y especificar `layout=responsive` en el elemento -sin CSS extras.

##### Ejemplo: Insertando un video de YouTube

En el próximo ejemplo, queremos mostrar un video insertado desde YouTube que responda al tamaño y orientación de la pantalla donde se muestre. Agregando el atributo `"layout=responsive"` al elemento `amp-youtube`, el video cambia su tamaño para ajustarse a la pantalla, y su aspecto de radio es mantenido por las especificaciones de tamaños que se hayan realizado sobre `width` y `height`.

<div>
<amp-iframe height="174" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.youtube.embed.html"> <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div> <div placeholder></div> </amp-iframe></div>

Hay más tipos de videos que tú puedes agregar a tus páginas AMP. Para más detalles, mira la lista de [media components](https://www.ampproject.org/docs/reference/components#media) -en inglés.

### Mostrando imágenes responsivas

Las imágenes forman una gran parte de una página web (aproximadamente el 65% de los bytes de la página). Como mínimo, las imágenes deben ser visibles en varios tamaños de pantalla y orientaciones (es decir, el usuario no tiene que desplazarse, pellizcar o ampliar para ver toda la imagen). Esto se hace fácilmente en AMP a través del atributo `"layout=responsive"` (ver [Incluir imágenes en AMP](https://www.ampproject.org/docs/guides/amp_replacements)). Además de la imagen básica responsiva, es posible que desee publicar varios recursos de imágenes para:

- [Sirve imágenes nítidas para obtener la resolución correcta](#serving-crisp-images-for-the-right-resolution)
- [Cambiando la dirección de arte de una imagen](#cambiando-la-dirección-de-arte-de-una-imagen)
- [Proporcionar formatos de imagen optimizados](#providing-optimized-images)

#### Mostrando imágenes nítidas para la resolución correcta

For high-resolution screens (e.g., Retina display), you should provide images that look crisp and sharp; however, you don't want to use that same image on low-res devices because that'll cause unnecessary extra load time.  In non-AMP and AMP pages,  you can serve the correct image for the screen's pixel density by using `srcset` with the width descriptor ( `w` ).

{% call callout('Note', type='note') %}
The DPR (`x`) based srcset selector also works; however, for more flexibility, we recommend using the `w` selector. Previously (in the old srcset proposal), the `w` descriptor described the viewport width, but now it describes the width of the image source file, which allows the user agent to calculate the effective pixel density of each image and choose the appropriate image to render.
{% endcall %}

##### Example: Displaying a crisp image that fits the screen

In the following example we have several image files that are of the same aspect ratio but of different resolutions.  By supplying various image resolutions, the browser can choose the image that best suits the device's resolution.  Additionally, we've specified the size to render the image at :

- For a viewport width up to 400 px, render the image at 100% of the viewport width.
- For a viewport width up to 900 px, render the image at 75% of the viewport width.
- For everything above 900 px, render the image at 600 px wide.

<div>
<amp-iframe height=326 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.resolution.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Show full code</div><div placeholder></div></amp-iframe></div>

For example, say we have a device that has a viewport width of 412 px and a DPR of 2.6. Based on the code above, the image must be displayed at 75% of the viewport width, so the browser chooses an image close to 803 px  (412 * .75 * 2.6), which happens to be `apple-800.jpg`.

{% call callout('Leer más', type='read') %}
To learn more using srcset and sizes in AMP, see the [Art direction with srcset, sizes & heights](https://www.ampproject.org/docs/guides/responsive/art_direction) guide.
{% endcall %}

#### Cambiando la dirección de arte de una imagen

Art direction refers to adapting an image's visual characteristics for certain breakpoints.  For example, instead of just scaling an image as the screen narrows, you might want to serve a cropped version of the image that narrows the focus of the image or you might want to serve completely different images at the different breakpoints.  In HTML, you can accomplish this by using the `picture` element.  In AMP, art direction can be achieved by using the `media` attribute.

##### Example: Different sized images for different breakpoints

In the following example, we have 3 different cropped images of a cat that we want to display at different breakpoints. So, if the viewport width is:

- 670 px or greater, display `cat-large.jpg` (650 x 340 px)
- 470 - 669 px,  display `cat-medium.jpg`  (450 x 340 px)
- 469 px or less, display `cat-small.jpg` (226 x 340 px)

{% call callout('Note', type='note') %}
As we wanted the images to be fixed sizes (i.e., not skew), we didn't specify a layout value, which by default will be set to `layout=fixed` because we set the width and height. For more information, see ["What if the layout attribute isn’t specified?"](/docs/guides/author-develop/responsive/control_layout.html#what-if-the-layout-attribute-isn’t-specified?).
{% endcall %}

<div><amp-iframe height=407 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.breakpoints.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Show full code</div><div placeholder></div></amp-iframe></div>

{% call callout('Leer más', type='read') %}
To learn more about art direction in AMP, see the [Art direction with srcset, sizes & heights](https://www.ampproject.org/docs/guides/responsive/art_direction) guide.
{% endcall %}

#### Providing optimized images

Delivering fast loading pages requires optimized images--in size, quality, and format.  Always reduce file sizes to the lowest acceptable quality level.  There are various tools that you can use to "crunch" images (e.g., [ImageAlph](http://pngmini.com/lossypng.html) or [TinyPNG](https://tinypng.com/)).  In terms of image formats,  some image formats provide better compression abilities that others (e.g., WebP and JPEG XR vs JPEG).  You'll want to provide the most optimized image for your user, as well as ensuring the image is supported by the user's browser (i.e., [not all browsers support all image formats](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)).

In HTML, you can serve different image formats by using the `picture` tag.  In AMP, although the `picture` tag isn't supported, you can serve different images by using the `fallback`  attribute.

{% call callout('Leer más', type='read') %}
To learn more about fallbacks, see the [Placeholders & Fallbacks](https://www.ampproject.org/docs/guides/author-develop/responsive/placeholders) guide.
{% endcall %}

##### Example: Serve different image formats

In the following example, if the browser supports WebP, serve mountains.webp, otherwise serve mountains.jpg.

<div>
<amp-iframe height=309 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.webp.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Show full code</div><div placeholder></div></amp-iframe></div>

As a nice bonus, some caches, like the Google AMP Cache, automatically compress and convert images to WebP and the right resolutions if you don't. However, not all platforms use caches, so you should still optimize images manually on your end.

{% call callout('Leer más', type='read') %}
To learn more about the image optimizations that the Google AMP Cache applies, see the ["Google AMP Cache, AMP Lite, and the need for speed"](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html) blog post.
{% endcall %}

## Ejemplos para inspirar

Aquí hay algunos ejemplos que esperamos te inspiren para crear páginas AMP responsivas:

#### Producción

- [Getty Images "2016 in Focus" ](http://www.gettyimages.com/2016/)
- [BRIT + CO's holiday gift guide](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### Hecho con AMP

- [AMP by Example:  Samples & Templates](https://ampbyexample.com/#samples_templates)
- [AMP Start templates](https://www.ampstart.com/)
- [AMP Conf Workshop Codelab: Making beautiful AMPs](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)
