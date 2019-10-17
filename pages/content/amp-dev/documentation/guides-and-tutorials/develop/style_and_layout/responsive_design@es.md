---
$title: Crear páginas AMP responsivas
---

## Introducción

El diseño web responsivo consiste en crear páginas web fluidas que responden a las necesidades de su usuario, páginas que se ajustan al tamaño de la pantalla y la orientación de su dispositivo. Usted puede lograr esto fácilmente en AMP. AMP admite todas las categorías de pantallas y dispositivos y además proporciona componentes responsivos integrados.

En esta guía, le mostraremos cómo puede implementar fácilmente estos fundamentos de responsivos en AMP:

- [Controlando el viewport](#controlling-the-viewport)
- [Creando el layout responsivo](#creating-a-responsive-layout)
- [Medios de escala](#scaling-media-for-the-page)

## Controlando el viewport <a name="controlling-the-viewport"></a>

Para optimizar su página web para que el contenido sea escalable y se ajuste a la ventana del navegador para cualquier dispositivo, debe especificar un `viewport` (elemento de vista gráfica) `meta`. El elemento viewport indica al navegador cómo escalar y dimensionar el área visible (viewport) de la página web.

Pero, ¿qué valores debe utilizar? Pues bien, aparte del [marcado requerido](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) para páginas AMP, se debe especificar el  siguiente viewport:

```html
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
```

Éstas son las configuraciones típicas del viewport que utilizarías para un sitio responsivo. Aunque `initial-scale = 1` no es necesario para una página AMP válida, se recomienda porque establece el nivel de zoom en 1 cuando se cargue la página por primera vez.

## Creando el layout responsivo <a name="creating-a-responsive-layout"></a>

En el diseño responsivo, puede utilizar CSS [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) para adaptar el estilo de su página web para la variedad de la pantalla dimensiones sin tener que alterar el contenido de la página. En AMP, puede seguir utilizando las mismas consultas CSS `@media`. Además, para un control más preciso sobre un elemento AMP, se puede especificar el atributo `media` en el elemento. Esto es particularmente útil cuando se necesita para mostrar u ocultar un elemento en base a una consulta de medios. Ver la sección [Cambiando la dirección de arte de una imagen](#changing-the-art-direction-of-an-image) para un ejemplo que utiliza el atributo `media`.

Haciendo que cada elemento de cambio de tamaño para adaptarse a una pantalla puede ser complicado <sup><a href="#fn1" id="ref1">*</a></sup>. Sin embargo, en AMP, usted puede hacer fácilmente un elemento responsivo con sólo especificar el atributo `"layout=responsive"` junto a los atributos `width` y `height`. Cuando se aplica el layout `responsive` a un elemento, ese elemento cambiará de tamaño automáticamente a la anchura de su elemento contenedor, y la altura cambiará en función de la relación de aspecto especificada por `width` y `height` característica del elemento. Casi todos los elementos de AMP apoyan un layout `responsive`; consulte la documentación de referencia del elemento para ver qué diseños son compatibles.

A pesar de que usted puede hacer fácilmente elementos responsivos con `"layout=responsive"`, debe tener en cuenta cómo aparecerán los elementos en todos los tamaños de pantalla -incluyendo ordenadores y tablets. Un error común es permitir una imagen para tomar todo el ancho de la pantalla, que se extiende más allá de la imagen, su tamaño previsto, provocando una mala experiencia para los usuarios de pantalla ancha. Por defecto, los elementos con `layout=responsive` tomarán la anchura total del contenedor del elemento, que es a menudo sin restricciones de ancho (es decir., `width=100%`). Se puede mejorar la forma de las imágenes aparecen con sólo restringir el ancho de contenedor de la imagen. Por ejemplo, mediante el establecimiento de una regla `"max-width"` en el `"body"` o `"main"`, puede restringir todas las imágenes a un ancho máximo específicas.

##### Ejemplo: Restringiendo el ancho de imagenes responsivas

En el siguiente ejemplo, tenemos una imagen de flores (640 x 427 px) que queremos mostrar en todos los tamaños de pantalla, así que especificamos el `width` y `height`, y configuramos el layout a `responsive`.

[example preview="top-frame" playground="true"]
```html
<div class="resp-img">
  <amp-img alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"></amp-img>
</div>
```
[/example]

Sin embargo, si no queremos que la imagen se vaya más allá de su tamaño, configuramos un ancho máximo con `max-width` de 700 px a través de una personalización de CSS en el `head`, así:

```html
<style amp-custom>
.resp-img {
    max-width: 700px;
  }
</style>
```

Leer más: Para aprender más sobre los diferentes layouts en AMP, leer la guía [Layout & consultas de medios](control_layout.md#the-layout-attribute).

 <a id="fn1"></a>
[tip type="note"]
***¿Por qué es complicado hacer que los elementos cambien de tamaño para que se ajusten a la pantalla cuando puedo hacer esto fácilmente con el estilo `"width=100%"`?** La parte difícil es tener elementos responsivos en la página sin afectar negativamente las métricas de rendimiento o la experiencia del usuario. Sí, puede obtener fácilmente imágenes para que se ajusten a la pantalla con `"width=100%"`, pero hay golpes al  rendimiento. El navegador debe descargar primero la imagen para obtener las dimensiones de la imagen, luego redimensionar la imagen apropiadamente para el tamaño de la pantalla y, finalmente, refluir y volver a cargar la página. En AMP, la ruta de renderizado se optimiza de modo que primero se presenta la página, dejando de lado los marcadores de posición de las imágenes basadas en las dimensiones proporcionadas en [`amp-img`](../../../../documentation/components/reference/amp-img.md) (usando esos números para establecer la relación de aspecto), los recursos se descargan y Página está pintada. No se requiere reflujo.
[/tip]

## Medios de escala para la página <a name="scaling-media-for-the-page"></a>

Probablemente el aspecto más desafiante del diseño responsivo es mostrar correctamente los medios en la página para que responda a las características de la pantalla. En esta sección, veremos cómo puede integrar videos e imágenes responsivas en las páginas de AMP.

### Insertando videos

Cuando incluya un video en su página web, desea asegurarse de que el usuario pueda ver el contenido del vídeo y los controles del video. Normalmente, lo lograrás con una combinación de consultas de medios CSS, un contenedor y otros CSS. En AMP, sólo tiene que agregar el elemento de vídeo a su página, y especificar `layout=responsive` en el elemento -sin CSS extras.

##### Ejemplo: Insertando un video de YouTube

En el próximo ejemplo, queremos mostrar un video insertado desde YouTube que responda al tamaño y orientación de la pantalla donde se muestre. Agregando el atributo `"layout=responsive"` al elemento [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md), el video cambia su tamaño para ajustarse a la pantalla, y su aspecto de radio es mantenido por las especificaciones de tamaños que se hayan realizado sobre `width` y `height`.

[example preview="top-frame" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

Hay más tipos de videos que tú puedes agregar a tus páginas AMP. Para más detalles, mira la lista de [media components](../../../../documentation/components/index.html) -en inglés.

### Mostrando imágenes responsivas <a name="displaying-responsive-images"></a>

Las imágenes forman una gran parte de una página web (aproximadamente el [65% de los bytes de la página](http://httparchive.org/interesting.php#bytesperpage)). Como mínimo, las imágenes deben ser visibles en varios tamaños de pantalla y orientaciones (es decir, el usuario no tiene que desplazarse, pellizcar o ampliar para ver toda la imagen). Esto se hace fácilmente en AMP a través del atributo `"layout=responsive"` (ver [Incluir imágenes en AMP](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)). Además de la imagen básica responsiva, es posible que desee publicar varios recursos de imágenes para:

- [Mostrando imágenes nítidas para la resolución correcta](#serving-crisp-images-for-the-right-resolution)
- [Cambiando la dirección de arte de una imagen](#changing-the-art-direction-of-an-image)
- [Proporcionar formatos de imagen optimizados](#providing-optimized-images)

#### Mostrando imágenes nítidas para la resolución correcta <a name="serving-crisp-images-for-the-right-resolution"></a>

Para pantallas de alta resolución (por ejemplo, pantalla Retina), debe proporcionar imágenes que parezcan claras y nítidas; sin embargo, no desea utilizar esa misma imagen en dispositivos de baja resolución porque esto causará un tiempo de carga extra innecesario. En páginas no AMP y AMP, puede servir la imagen correcta para la densidad de píxeles de la pantalla utilizando `srcset` con el descriptor de anchura (`w`).

Nota: El selector `srcset` basado en DPR (`x`) también funciona; sin embargo, para mayor flexibilidad, recomendamos utilizar el selector `w`. Anteriormente (en la antigua propuesta srcset), el descriptor `w` describía el ancho del viewport, pero ahora describe el ancho del archivo fuente de la imagen, lo que permite al agente del usuario calcular la densidad de píxeles efectiva de cada imagen y elegir la imagen apropiada para renderizarla.

##### Ejemplo: Mostrando una imagen nítida que encaje en la pantalla

En el siguiente ejemplo tenemos varias imágenes que tienen el mismo radio de aspecto pero son de diferentes resoluciones. Al ofrecer varias resoluciones, el navegador podrá elegir la imagen más apropiada dependiendo de la resolución del dispositivo en la que se muestre dicha imagen. Adicionalmente, nosotros especificaremos el tamaño para renderizar la imagen en:

- Un viewport de ancho hasta 400 px, renderizar la imagen al 100% del ancho del viewport.
- Un viewport de ancho hasta 900 px, renderizar la imagen al 75% del ancho del viewport.
- Para cualquier tamaño por debajo de 900 px, renderizar la imagen a 600 px de ancho.

[example preview="top-frame" playground="true"]
```html
<amp-img alt="apple"
  src="{{server_for_email}}/static/inline-examples/images/apple.jpg"
  height="596"
  width="900"
  srcset="{{server_for_email}}/static/inline-examples/images/apple-900.jpg 900w,
            {{server_for_email}}/static/inline-examples/images/apple-800.jpg 800w,
            {{server_for_email}}/static/inline-examples/images/apple-700.jpg 700w,
            {{server_for_email}}/static/inline-examples/images/apple-600.jpg 600w,
            {{server_for_email}}/static/inline-examples/images/apple-500.jpg 500w,
            {{server_for_email}}/static/inline-examples/images/apple-400.jpg 400w"
  sizes="(max-width: 400px) 100vw,
            (max-width: 900px) 75vw, 600px">
</amp-img>
```
[/example]

Por ejemplo, digamos que tenemos un dispositivo que tiene un ancho de ventana de 412 px y un DPR de 2.6. Basándose en el código anterior, la imagen debe mostrarse al 75% del ancho de la ventana de visualización, por lo que el navegador elige una imagen cercana a 803 px (412 * .75 * 2.6), que pasa a ser `apple-800.jpg`.

Leer más: Para aprender más sobre el `srcset` y `sizes` en AMP, see the [Imágenes adaptativas con srcset, sizes & heights](art_direction.md) guide.

#### Cambiando la dirección artística de una imagen <a name="changing-the-art-direction-of-an-image"></a>

La dirección artística se refiere a la adaptación de las características visuales de una imagen para determinados puntos de interrupción. Por ejemplo, en lugar de simplemente escalar una imagen a medida que se reduce la pantalla, es posible que desee publicar una versión recortada de la imagen que restringe el enfoque de la imagen o puede que desee publicar imágenes completamente diferentes en los diferentes puntos de interrupción. En HTML, puede lograr esto usando el elemento `picture`. En AMP, la dirección artística se puede lograr utilizando el atributo `media`.

##### Ejemplo: Diferentes tamaños de imagenes para diferentes puntos de interrupción

En el ejemplo siguiente, tenemos 3 imágenes recortadas diferentes de un gato que queremos mostrar en diferentes puntos de interrupción. Por lo tanto, si el ancho de la ventana de visualización es:

- 670 px o mayor, muestra cat-large.jpg (650 x 340 px)
- 470 - 669 px, muestra cat-medium.jpg (450 x 340 px)
- 469 px o menos, muestra cat-small.jpg (226 x 340 px)

Nota: Como quisiéramos que las imágenes fueran tamaños fijos (es decir, no sesgamos), no especificamos un valor de diseño, que por defecto se establecerá en `layout=fixed` porque establecemos el `width` y el `height`. Para obtener más información, consulte ["¿Qué ocurre si width y height no están definidos?"](control_layout.md).

[example preview="top-frame" playground="true"]
```html
<amp-img alt="grey cat"
    media="(min-width: 670px)"
    width="650"
    height="340"
    src="{{server_for_email}}/static/inline-examples/images/cat-large.jpg"></amp-img>
  <amp-img alt="grey cat"
    media="(min-width: 470px) and (max-width: 669px)"
    width="450"
    height="340"
    src="{{server_for_email}}/static/inline-examples/images/cat-medium.jpg"></amp-img>
  <amp-img alt="grey cat"
    media="(max-width: 469px)"
    width="226"
    height="340"
    src="{{server_for_email}}/static/inline-examples/images/cat-small.jpg"></amp-img>
```
[/example]

Leer más: Para aprender más sobre la dirección artística en AMP, lee la guía [Imágenes adaptativas con srcset, sizes & heights](art_direction.md).

#### Proporcionar imágenes optimizadas <a name="providing-optimized-images"></a>

La entrega de páginas de carga rápida requiere imágenes optimizadas: en tamaño, calidad y formato. Siempre reduzca el tamaño de archivo al nivel de calidad aceptable más bajo. Hay varias herramientas que puede utilizar para "crunch" imágenes (por ejemplo, [ImageAlph](http://pngmini.com/lossypng.html) o [TinyPNG](https://tinypng.com/)). En términos de formatos de imagen, algunos formatos de imagen proporcionan mejores capacidades de compresión que otros (por ejemplo, WebP y JPEG XR vs JPEG). Deberá proporcionar la imagen más optimizada para su usuario, así como garantizar que la imagen sea compatible con el navegador del usuario (es decir, [no todos los navegadores admiten todos los formatos de imagen](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)).

En HTML, puede servir diferentes formatos de imagen utilizando la etiqueta `picture`. En AMP, aunque la etiqueta `picture` no es compatible, puede servir a diferentes imágenes mediante el atributo de `fallback`.

Leer más: Para aprender más acerca de los fallbacks, lee la guía [Placeholders & Fallbacks](placeholders.md).

##### Ejemplo: Sirva diferentes formatos de imagen

En el ejemplo siguiente, si el navegador admite WebP, sirva mountains.webp, de lo contrario sirva mountains.jpg.

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

Como un buen bono, algunas cachés, como el caché de Google AMP, comprimen y convierten automáticamente imágenes a WebP y las resoluciones correctas si no lo hacen. Sin embargo, no todas las plataformas utilizan cachés, por lo que todavía debe optimizar imágenes manualmente.

Leer más: Para aprender más acerca de las optimizaciones que aplica el Cache de Google AMP sobre imágenes, lee el siguiente post en inglés: ["Google AMP Cache, AMP Lite, and the need for speed"](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html).

## Ejemplos para inspirar

Aquí hay algunos ejemplos que esperamos te inspiren para crear páginas AMP responsivas:

#### Producción

- [Getty Images "2016 in Focus" ](http://www.gettyimages.com/2016/)
- [BRIT + CO's holiday gift guide](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### Hecho con AMP

- [Examples](../../../../documentation/examples/index.html)
- [Templates](../../../../documentation/templates/index.html)
- [AMP Conf Workshop Codelab: Making beautiful AMPs](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)
