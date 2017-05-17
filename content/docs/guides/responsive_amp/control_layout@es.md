---
$title: Diseños compatibles
---

Convierte tus elementos en adaptables
con `layout=responsive`.

[TOC]

## Valores compatibles con el atributo de diseño

De forma predeterminada,
utiliza diseños adaptables.

Lista completa de los valores compatibles con el atributo de diseño:

<table>
  <thead>
    <tr>
      <th class="col-twenty" data-th="Layout type">Tipo de diseño</th>
      <th class="col-twenty" data-th="Width/height required">Anchura/altura requerida</th>
      <th data-th="Behavior">Comportamiento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-twenty" data-th="Layout type">`nodisplay`</td>
      <td class="col-twenty" data-th="Description">No</td>
      <td data-th="Behavior">El elemento no se muestra. Este diseño se puede aplicar a todos los elementos de AMP. El componente no ocupa espacio en la pantalla, como si su estilo de visualización tuviera como valor "none". Se supone que el elemento puede mostrarse con una acción del usuario, por ejemplo, <a href="/docs/reference/extended/amp-lightbox.html">`amp-lightbox`</a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type">`fixed`</td>
      <td class="col-twenty" data-th="Description">Sí</td>
      <td data-th="Behavior">El elemento tiene una anchura y una altura fijas y no es compatible con la adaptabilidad. Las únicas excepciones son los elementos <a href="/docs/reference/amp-pixel.html">`amp-pixel`</a> y <a href="/docs/reference/extended/amp-audio.html">`amp-audio`</a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type">`responsive`</td>
      <td class="col-twenty" data-th="Description">Sí</td>
      <td data-th="Behavior">El tamaño del elemento depende de la anchura de su elemento contenedor y la altura se modifica de tamaño automáticamente en función de la relación de aspecto determinada por los atributos de anchura y altura. Este diseño funciona muy bien para la mayoría de los elementos de AMP, incluidos <a href="/docs/reference/amp-img.html">`amp-img`</a> y <a href="/docs/reference/amp-video.html">`amp-video`</a>. El espacio disponible depende del elemento principal y también se puede personalizar usando el elemento CSS `max-width`.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type">`fixed-height`</td>
      <td class="col-twenty" data-th="Description">Solo altura</td>
      <td data-th="Behavior">El elemento toma el espacio disponible, pero no modifica la altura. Este diseño funciona bien para elementos como <a href="/docs/reference/extended/amp-carousel.html">`amp-carousel`</a>, que implica contenido en posición horizontal. El atributo `width` no debe estar presente o debe ser igual a `auto`.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type">`fill`</td>
      <td class="col-twenty" data-th="Description">No</td>
      <td data-th="Behavior">El elemento toma el espacio disponible, tanto en anchura como en altura. En otras palabras, el diseño de un elemento de relleno coincide con el elemento principal.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type">`container`</td>
      <td class="col-twenty" data-th="Description">No</td>
      <td data-th="Behavior">El elemento permite que los elementos secundarios definan su tamaño, igual que un HTML `div` normal. Se supone que el componente no tiene un diseño específico propio, sino que simplemente actúa como contenedor. Los elementos secundarios se procesan inmediatamente.</td>
    </tr>
  </tbody>
</table>

### ¿Qué ocurre si la altura y la anchura no están definidas?

En algunos casos, si los atributos `width` o `height` no están especificados,
el tiempo de ejecución de AMP puede ofrecer estos valores de forma predeterminada del siguiente modo:

* [`amp-pixel`](/docs/reference/amp-pixel.html): tanto la anchura como la altura tienen 0 como valor predeterminado.
* [`amp-audio`](/docs/reference/extended/amp-audio.html): el navegador infiere la anchura y la altura predeterminadas.

### ¿Qué ocurre si el atributo de diseño no está definido?

El comportamiento de diseño se determina del siguiente modo:

* Si `height` está presente y `width` está ausente o es igual a `auto`, se asume que el diseño es `fixed-height`.
* Si los atributos `width` o `height` están presentes junto con el atributo `sizes`, se asume que el diseño es `responsive`.
* Si los atributos `width` o `height` están presentes, se asume que el diseño es `fixed`.
* Si `width` y `height` no están presentes, se asume que el diseño es `container`.

## Utilizar @media y media

Utiliza a [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) para controlar el aspecto y el comportamiento del diseño de la página del mismo modo que lo harías con cualquier otro sitio web.
Cuando la ventana del navegador cambia de tamaño o de orientación,
las consultas de los medios se vuelven a evaluar y los elementos se ocultan y se muestran en función de los nuevos resultados.

Obtén más información sobre cómo controlar el diseño con consultas de medios en [Usar consultas de medios en CSS para una mayor adaptabilidad](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=es).

Una función adicional para el diseño adaptable disponible en AMP es el atributo `media`.
Este atributo se puede utilizar en todos los elementos de AMP;
funciona de forma similar a las consultas de medios en la hoja de estilo global,
pero solamente influye en el elemento específico de una única página.

Por ejemplo, aquí tenemos dos imágenes con consultas de medios que se excluyen mutuamente.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
[/sourcecode]

En función de la anchura de la pantalla, se elegirá y procesará una de ellas.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
[/sourcecode]

## Usar los atributos srcset y sizes

Usa el atributo `srcset` para controlar los recursos de un elemento
en función de las diferentes expresiones de medios.
En particular, úsalo para especificar en todas las etiquetas [`amp-img`](/docs/reference/amp-img.html) qué recursos de imagen se deben utilizar en función de los diferentes tamaños de pantalla.

En este sencillo ejemplo,
`srcset` especifica qué imagen hay que utilizar en función de la anchura de la pantalla.
El descriptor `w` indica al navegador la anchura
de cada una de las imágenes de la lista:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
[/sourcecode]

**Nota:** AMP es compatible con el descriptor `w` en todos los navegadores.

Obtén más información sobre cómo crear imágenes adaptables con `srcset`
en [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now).

También puedes utilizar el atributo `sizes` junto con `srcset`.
El atributo `sizes` describe cómo calcular el tamaño del elemento en función de cualquier expresión de medios.
A partir del tamaño del elemento calculado, el agente de usuario selecciona la fuente más pertinente suministrada por el atributo `srcset`.

Consideremos el siguiente ejemplo:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
[/sourcecode]

El atributo `sizes` define la anchura del elemento como el 50% del tamaño de la ventana gráfica cuando esta es de 650 píxeles o más.
Por ejemplo, si la ventana gráfica es de 800 píxeles, la anchura del elemento se establece en 400 píxeles.
El navegador selecciona el recurso `srcset` relativo a 400 píxeles,
suponiendo que la proporción de píxeles del dispositivo es 1,
que, en este caso, es `narrow.jpg` (320px).

**Importante:** Cuando el atributo sizes se especifica junto con la anchura y la altura, el diseño pasa a `responsive` de forma predeterminada.

Obtén más información sobre las similitudes y las diferencias entre los atributos `sizes` y `srcset` y las consultas de medios en la entrada de blog [Srcset and sizes](https://ericportis.com/posts/2014/srcset-sizes/).

## Incluir los atributos placeholder y fallback

### placeholder

El elemento marcado con el atributo `placeholder` actúa como marcador de posición para el elemento AMP superior.
Si se especifica, un elemento `placeholder` debe ser un elemento secundario directo del elemento AMP.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

De forma predeterminada, el marcador de posición se muestra inmediatamente para el elemento AMP, incluso si no se han descargado o inicializado los recursos del elemento AMP.
Una vez listo, el elemento AMP normalmente oculta su marcador de posición y muestra el contenido.

**Nota:** El marcador de posición no tiene que ser un elemento AMP; cualquier elemento HTML puede actuar como marcador de posición.

### fallback

Utiliza el atributo `fallback` para indicar el comportamiento de respaldo
de cualquier elemento que no sea compatible con el navegador.
Por ejemplo, utiliza el atributo `fallback` para comunicar al usuario
que el navegador no es compatible con una característica concreta:

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

El atributo `fallback` se puede establecer en cualquier elemento HTML, no solo en los elementos AMP.
Si se especifica, el elemento `fallback` debe ser un elemento secundario directo del elemento AMP.

### noloading

Muchos elementos AMP están incluidos en la lista blanca para mostrar un "indicador de carga", que es una animación básica que muestra que el elemento aún no se ha cargado completamente.
Los elementos pueden excluirse de este comportamiento añadiendo el atributo `noloading`.
