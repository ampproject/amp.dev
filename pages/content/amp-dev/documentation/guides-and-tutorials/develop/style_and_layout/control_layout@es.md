---
$title: Diseño y media queries
---

AMP admite **media queries** y **media queries de elementos** y tiene un potente mecanismo integrado para controlar el **diseño** de elementos concretos. Con el atributo `layout`, crear o trabajar con diseños completamente adaptables es mucho más sencillo que si solo utilizaras CSS.

## Crea imágenes adaptables fácilmente

Para crear imágenes adaptables, solo tienes que proporcionar valores de `width` (anchura) y `width` (altura), asignar el valor `responsive` al atributo "layout",
e indicar con [`srcset`](art_direction.md)
qué recurso de imagen se debe usar en función de cada tamaño de pantalla:

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

El elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md) se adapta automáticamente a la anchura
de su elemento contenedor,
y su altura se ajusta automáticamente a la proporción
determinada por la anchura y la altura especificadas. Puedes probarlo cambiando el tamaño de esta ventana del navegador:

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

[tip type="success"]

Puedes ver demostraciones comparativas en directo de [`amp-img`](../../../../documentation/components/reference/amp-img.md) en [AMP By Example](../../../../documentation/examples/documentation/amp-img.html).

[/tip]

## El atributo "layout" <a name="the-layout-attribute"></a>

El atributo `layout` te permite controlar fácilmente cómo deben renderizarse
los diferentes elementos en pantalla. Muchos de estos aspectos también pueden controlarse solo con CSS, pero
es mucho más difícil y hay que seguir una gran cantidad de pasos. Usa el atributo `layout` para ahorrarte trabajo.

### Valores admitidos del atributo `layout`

Se pueden asignar los siguientes valores al atributo `layout`:

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-thirty">Tipo de diseño</th>
      <th data-th="Width/height required" class="col-twenty">Anchura<br>y altura requeridas</th>
      <th data-th="Behavior">Comportamiento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type"><code>nodisplay</code></td>
      <td data-th="Description">No</td>
      <td data-th="Behavior">No se muestra el elemento. Este diseño se puede aplicar a todos los elementos de AMP. El componente no ocupa espacio en la pantalla, como si su estilo de visualización tuviera como valor "none". Se supone que el elemento puede mostrarse con una acción del usuario; por ejemplo, <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed</code></td>
      <td data-th="Description">Sí</td>
      <td data-th="Behavior">El elemento tiene una anchura y una altura fijas y no es adaptable. Las únicas excepciones son los elementos <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> y <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>responsive</code></td>
      <td data-th="Description">Sí</td>
      <td data-th="Behavior">El tamaño del elemento depende de la anchura de su elemento contenedor y la altura se modifica automáticamente en función de la proporción determinada por los atributos de anchura y altura. Este diseño funciona muy bien con la mayoría de los elementos de AMP, como <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> y <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>. El espacio disponible depende del elemento principal y también se puede personalizar usando el elemento CSS <code>max-width</code>.<p><strong>Nota:</strong> Los elementos con <code>"layout=responsive"</code> no tienen ningún tamaño intrínseco. El tamaño del elemento se determina a partir de su elemento contenedor. Para asegurarte de que se muestre el elemento de AMP, debes indicar la anchura y la altura del elemento contenedor. No especifiques <code>"display:table"</code> en el elemento contenedor, ya que, si lo haces, se impide que el elemento AMP se muestre, lo que lo convierte en invisible.</p></td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed-height</code></td>
      <td data-th="Description">Solo altura</td>
      <td data-th="Behavior">El elemento ocupa el espacio disponible, pero la altura no cambia. Este diseño funciona bien en elementos como <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> que implican que el contenido se muestren en posición horizontal. El atributo <code>width</code> no debe estar presente o debe ser <code>auto</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fill</code></td>
      <td data-th="Description">No</td>
      <td data-th="Behavior">El elemento ocupa el espacio disponible, tanto en anchura como en altura. En otras palabras, el diseño de un elemento de relleno coincide con el elemento principal. Para que un elemento rellene su contenedor principal, comprueba que en el contenedor principal se especifica `position:relative` o `position:absolute`.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>container</code></td>
      <td data-th="Description">No</td>
      <td data-th="Behavior">El elemento permite que sus elementos secundarios definan su tamaño, igual que un <code>div</code> HTML normal. Se supone que el componente no tiene un diseño específico propio, sino que simplemente actúa como contenedor. Sus elementos secundarios se procesan inmediatamente.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>flex-item</code></td>
      <td data-th="Description">No</td>
      <td data-th="Behavior">El elemento y otros elementos dentro del principal ocupan el espacio restante en el contenedor de este último cuando se trata de un contenedor flexible (es decir, <code>display:flex</code>). El tamaño del elemento se determina a partir del elemento principal y de la cantidad de otros elementos incluidos en el principal según el diseño de CSS <code>display:flex</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>intrinsic</code></td>
      <td data-th="Description">Sí</td>
      <td data-th="Behavior">El elemento ocupa el espacio del que dispone y modifica su altura automáticamente según la proporción indicada por los atributos <code>width</code> y <code>height</code> <em></em>hasta alcanzar su tamaño natural o una restricción de CSS (p. ej., max-width). Los atributos de anchura y altura deben estar presentes. Este diseño funciona muy bien para la mayoría de los elementos de AMP, como <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>, <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a>, etc. El espacio disponible depende del elemento principal y puede personalizarse con <code>max-width</code> en CSS. Este diseño es diferente a <code>responsive</code> porque tiene una altura y una anchura intrínsecas. Esta diferencia se puede apreciar en los elementos flotantes, ya que los que incluyen <code>responsive</code> se representan como 0x0, pero los que usan <code>intrinsic</code> aumentan hasta su tamaño natural o hasta alcanzar alguna restricción de CSS, lo que sea menor.</td>
    </tr>
  </tbody>
</table>

[tip type="success"]

Para ver cómo responden los diferentes diseños al redimensionamiento de la pantalla, visita la página con [demostraciones de diseños de AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html).

[/tip]

### ¿Qué ocurre si la altura y la anchura no están definidas? <a name="what-if-width-and-height-are-undefined"></a>

En algunos casos, si no se han proporcionado los atributos `width` o `height`,
el tiempo de ejecución de AMP puede asignarles un valor predeterminado del siguiente modo:

* [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md): el valor predeterminado de anchura y altura es 0.
* [`amp-audio`](../../../../documentation/components/reference/amp-audio.md): el navegador infiere la anchura y la altura predeterminadas.

### ¿Qué sucede si no se ha proporcionado el atributo <code>layout</code>? <a name="what-if-the-layout-attribute-isnt-specified"></a>

Si no se indica el atributo <code>layout</code>, AMP intenta inferir o adivinar
el valor adecuado:

<table>
  <thead>
    <tr>
      <th data-th="Rule">Regla</th>
      <th data-th="Inferred layout" class="col-thirty">Diseño inferido</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"><code>height</code> está presente y <code>width</code> está ausente o es igual a <code>auto</code></td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Los atributos <code>width</code> o <code>height</code> están presentes junto con el atributo <code>sizes</code></td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Los atributos <code>width</code> y <code>height</code> están presentes</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code> y <code>height</code> no están presentes</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## Usar media queries

### Media queries de CSS

Puedes usar [`@media`](https://developer.mozilla.org/es/docs/Web/CSS/@media)
para controlar el aspecto y el comportamiento del diseño de la página igual que lo harías con cualquier otro sitio web.
Cuando la ventana del navegador cambia de tamaño o de orientación,
las media queries se vuelven a evaluar y los elementos se ocultan o se muestran
en función de los nuevos resultados.

[tip type="read-on"]

Obtén más información sobre cómo controlar el diseño con media queries en el artículo [Usa las media queries en CSS para una mayor receptividad](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=es).

[/tip]

### Media queries de elementos <a name="element-media-queries"></a>

Una función adicional de diseño adaptable disponible en AMP es el atributo `media`.
Este atributo se puede usar en todos los elementos AMP;
funciona de forma similar a las media queries de las hojas de estilo globales,
pero solo afecta a un elemento específico de una única página.

Por ejemplo, a continuación se muestran dos imágenes con media queries que se excluyen mutuamente.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="527"
    height="355"
    layout="responsive">
</amp-img>
[/sourcecode]

En función de la anchura de la pantalla, se obtendrá y renderizará una de ellas.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="466"
    height="193"
    layout="responsive">
</amp-img>
[/sourcecode]
