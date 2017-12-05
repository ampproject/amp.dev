---
$title: Layout & consultas de medios
---
[TOC]

AMP soporta ambos, **consultas de medios** &amp; **consultas de elementos**, además viene con una potente e integrada forma de controlar el diseño (es decir el layout) de los elementos individuales. El atributo `layout` hace que trabajar y crear un diseño totalmente adaptable (responsive) sea mucho más fácil que si utilizas solamente CSS.

## Imágenes adaptables, de forma fácil

Crear imágenes adaptables (responsive) bastará con especificar el `width` y `height`, configurar el layout a `responsive`,
e indicar con [`srcset`](/es/docs/guides/responsive/art_direction.html)
cuál imagen se usará en la variedad de pantallas:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Este elemento `amp-img` se ajustará automáticamente al ancho
de su elemento contenedor,
y su altura también se ajustará automáticamente en relación a su aspecto
determinado por los valores de ancho y alto que se dieron. 

Pruebalo ahora mismo, cambiando el tamaño de la ventana del navegador con ésta imagen:

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

{% call callout('Tip', type='success') %}
Vea nuestras demostraciones en vivo de `amp-img`: [Live Demos on AMP By Example](https://ampbyexample.com/components/amp-img/).
{% endcall %}

## El atributo layout

El atributo `layout` te brinda un control sencillo por elemento, sobre cómo tu elemento
se debe mostrar en pantalla. Muchas de estas cosas son posibles con CSS puro – pero
son mucho más difíciles, y requieren una gran cantidad de hacks. En vez de eso, usa el atributo `layout`.

### Valores soportados para el atributo `layout`

Los siguientes valores pueden ser soportados por el atributo `layout`:

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-thirty">Layout type</th>
      <th data-th="Width/height required" class="col-twenty">Width/<br>height requerido</th>
      <th data-th="Behavior">Comportamiento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type"><code>nodisplay</code></td>
      <td data-th="Description">No</td>
      <td data-th="Behavior">El elemento no se muestra. Este diseño se puede aplicar a todos los elementos de AMP. El componente no ocupa espacio en la pantalla como si no hubiese estilo de visualización. Se supone que el elemento puede mostrarse con una acción del usuario, por ejemplo, <a href="/es/docs/reference/components/amp-lightbox.html"><code>amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed</code></td>
      <td data-th="Description">Si</td>
      <td data-th="Behavior">El elemento tiene una anchura y una altura fijas y no es compatible con la adaptabilidad. Las únicas excepciones son los elementos <a href="/es/docs/reference/components/amp-pixel.html"><code>amp-pixel</code></a> and <a href="/es/docs/reference/components/amp-audio.html"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>responsive</code></td>
      <td data-th="Description">Si</td>
      <td data-th="Behavior">El tamaño del elemento depende de la anchura de su elemento contenedor y la altura se modifica de tamaño automáticamente en función de la relación de aspecto determinada por los atributos de anchura y altura. Este diseño funciona muy bien para la mayoría de los elementos de AMP, incluidos <a href="/es/docs/reference/components/amp-img.html"><code>amp-img</code></a> y <a href="/es/docs/reference/components/amp-video.html"><code>amp-video</code></a>. El espacio disponible depende del elemento principal y también se puede personalizar usando el elemento CSS <code>max-width</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed-height</code></td>
      <td data-th="Description">Solo height</td>
      <td data-th="Behavior">El elemento toma el espacio disponible, pero no modifica la altura. Este diseño funciona bien para elementos como <a href="/es/docs/reference/components/amp-carousel.html"><code>amp-carousel</code></a> , que implica contenido en posición horizontal. El atributo <code>width</code> no debe estar presente o bien debe tener el valor <code>auto</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fill</code></td>
      <td data-th="Description">No</td>
      <td data-th="Behavior">El elemento toma el espacio disponible, tanto en anchura como en altura. En otras palabras, el diseño de un elemento de relleno coincide con el elemento principal.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>container</code></td>
      <td data-th="Description">No</td>
      <td data-th="Behavior">El elemento permite que los elementos secundarios definan su tamaño, igual que un HTML <code>div</code> normal. Se supone que el componente no tiene un diseño específico propio, sino que simplemente actúa como contenedor. Los elementos secundarios se procesan inmediatamente.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>flex-item</code></td>
      <td data-th="Description">No</td>
      <td data-th="Behavior">El elemento y otros elementos de su padre toman el espacio restante del contenedor principal cuando el padre es un contenedor flexible (por ej., <code>display:flex</code>). El tamaño del elemento está determinado por el elemento padre y el número de otros elementos dentro del elemento principal según CSS: <code>display:flex</code>.</td>
    </tr>
  </tbody>
</table>

{% call callout('Tip', type='success') %}
Ver ejemplos en vivo de todos los tipos diferentes de diseños en [AMP By Example: Layout System](https://ampbyexample.com/advanced/layout_system/).
{% endcall %}

### ¿Qué ocurre si width y height no están definidos?

En algunos casos si `width` o `height` no son especificados,
la rutina AMP puede ofrecer estos valores de forma predeterminada del siguiente modo:

* [`amp-pixel`](/es/docs/reference/components/amp-pixel.html): tanto la anchura como la altura tienen 0 como valor predeterminado.
* [`amp-audio`](/es/docs/reference/components/amp-audio.html): el navegador infiere la anchura y la altura predeterminadas.

### ¿Qué ocurre si el atributo <code>layout</code> no está definido?

Si el atributo <code>layout</code> no está especificado, AMP trata de inferir o adivinar 
el valor apropiado:

<table>
  <thead>
    <tr>
      <th data-th="Rule">Regla</th>
      <th data-th="Inferred layout" class="col-thirty">Layout inferido</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"><code>height</code> está presente y <code>width</code> no está definido o su valor es <code>auto</code></td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Los atributos <code>width</code> o <code>height</code> están presentes junto al atributo <code>sizes</code></td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Los atributos <code>width</code> o <code>height</code> están presentes</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Los atributos <code>width</code> y <code>height</code> no están presentes</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## Uso de consultas de medios

### Consultas de medios CSS

Use [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)
para controlar cómo se ve y se comporta el diseño de la página, como lo haría en cualquier otro sitio web.
Cuando la ventana del navegador cambia de tamaño u orientación,
las consultas de medios se reevaluan y los elementos se ocultan y se muestran
basado en los nuevos resultados.

{% call callout('Leer más', type='read') %}
Aprende más sobre controlar el layout aplicando [Consultas de medios en CSS para una mayor receptividad](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=es).
{% endcall %}

### Elemento consultas de medios

Una característica adicional para el diseño receptivo disponible en AMP es el atributo `media`. 
Este atributo se puede utilizar en cada elemento AMP; 
funciona de forma similar a las consultas de medios en su hoja de estilo global, 
pero sólo afecta al elemento específico en una sola página.

Por ejemplo, aquí tenemos dos imágenes con consultas de medios mutuamente exclusivas.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive">
</amp-img>
[/sourcecode]

Dependiendo del ancho de la pantalla, uno u otro será buscado y renderizado.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive">
</amp-img>
[/sourcecode]
