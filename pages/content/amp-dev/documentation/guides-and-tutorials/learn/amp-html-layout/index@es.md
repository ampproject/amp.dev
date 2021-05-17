---
'$title': Sistema de diseño AMPHTML
$order: 1
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: 'Información general '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

## Información general

El objetivo principal del sistema de diseño es garantizar que los elementos de AMP puedan representar su diseño, por esta razón en el tiempo de ejecución se debería inferir el tamaño de los elementos antes de que se hayan completado los recursos remotos, como JavaScript y las llamadas a los datos. Esto es importante, ya que se reduce significativamente el renderizado y el desplazamiento con jank.

Desde este punto de vista, el sistema de diseño de AMP está planeado para ser compatible con pocos diseños pero flexibles que proporcionen buenas garantías de rendimiento. Este sistema se basa en un conjunto de atributos como `layout`, `width`, `height`, `sizes` y `heights` para representar los requerimientos de diseño y tamaño de los elementos.

## Comportamiento <a name="behavior"></a>

Un elemento de AMP que no funciona como contenedor (es decir, `layout != container`) se inicia en el modo sin resolver o sin compilar con todos sus elementos secundarios ocultos, con excepción de un marcador de posición (consulte el atributo `placeholder`). Es posible que Javascript y cargar datos sean necesarios para construir totalmente un elemento que todavía se esté descargando e inicializando, pero el tiempo de ejecución de AMP ya regula cómo cambiar el tamaño y el diseño de un elemento basándose únicamente en las clases CSS y los atributos `layout`, `width`, `height` y `media`. En la mayoría de los casos, un `placeholder`, si se realizan especificaciones, posee el tamaño y la posición para ocupar todo el espacio de un elemento.

El `placeholder` se oculta después de que se crea un elemento y termina su primer diseño. Hasta este momento, se espera que el elemento tenga todos sus elementos secundarios correctamente creados, ubicados y listos para mostrarse y recibir la entrada de un lector. Este es su comportamiento predeterminado. Cada elemento puede desactivarse, por ejemplo, el `placeholder` se puede ocultar rápidamente o retenerse por más tiempo.

En el tiempo de ejecución se ajustan los atributos `layout`, `width`, `height` y `media` que determinan el tamaño y la visualización de un elemento. Todas las reglas de diseño se implementan mediante CSS de forma interna. Se considera que un elemento “define su tamaño” si este se infiere mediante estilos de CSS y sus cambios no se basan en sus elementos secundarios: disponible de inmediato o insertado de manera dinámica. Esto no significa que el tamaño de este elemento no pueda cambiar. El diseño podría ser totalmente adaptable, como en el caso de los diseños hechos con `responsive`, `fixed-height`, `fill` y `flex-item`. Solamente significa que el tamaño no cambia sin una acción explícita del usuario, por ejemplo durante una renderización, un desplazamiento o una descarga realizada posteriormente.

Si el elemento se configuró de forma incorrecta ni siquiera se renderizará con PROD, y en el modo DEV el tiempo de ejecución renderizará al elemento con un estado de error. Los posibles errores incluyen valores que no son válidos o no son compatibles con los atributos `layout`, `width` y `height`.

## Atributos de diseño <a name="layout-attributes"></a>

### `width` y `height` <a name="width-and-height"></a>

Dependiendo del valor en el atributo `layout`, los elementos asociados a un componente AMP deben tener uns atributos `width` y `height` que contengan un valor de pixel como un número entero. El comportamiento real de un diseño se determina por el atributo `layout` como se describe a continuación.

En algunos casos, si no se especifica `width` o `height`, el tiempo de ejecución de AMP puede predeterminar estos valores de la siguiente manera:

- `amp-pixel`: los valores tanto de `width` como de `height` se predeterminan en 0.
- `amp-audio`: los valores predeterminados de `width` y `height` se infieren del navegador.

### `layout` <a name="layout"></a>

AMP proporciona un conjunto de diseños en los que se especifica cómo se comporta un componente AMP en el diseño de un documento. Puede realizar especificaciones en un diseño para un componente al agregar el atributo `layout` con uno de los valores que se especifican en la siguiente tabla.

**Ejemplo**: en una imagen adaptable sencilla la relación de aspecto se determina por el ancho y el alto.

[sourcecode:html]
<amp-img
src="/img/amp.jpg"
width="1080"
height="610"
layout="responsive"
alt="an image"

> </amp-img>
> [/sourcecode]

Valores compatibles para el atributo `layout`:

<table>
  <thead>
    <tr>
      <th width="30%">Valor</th>
      <th>Comportamiento y requisitos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>No se presentan</td>
      <td>Si no se especifica ningún valor, el diseño del componente se infiere de la siguiente manera:         <ul>           <li>Si <code>height</code> está presente y <code>width</code> está ausente o se establece en <code>auto</code>, se asume un diseño <code>fixed-height</code>.</li>           <li>Si <code>width</code> y <code>height</code> están presentes junto con un atributo <code>sizes</code> o <code>heights</code> se asume un diseño <code>responsive</code>.</li>           <li>Si <code>width</code> y <code>height</code> están presentes, se asume un diseño <code>fixed</code>.</li>           <li> Si <code>width</code> y <code>height</code> están asusentes, se asume un diseño <code>container</code>.</li>         </ul>
</td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>Este elemento permite que sus elementos secundarios definan su tamaño, al igual que un HTML <code>div</code> normal. Se supone que el componente no tiene un diseño específico por sí mismo, sino que solo actúa como contenedor; sus elementos secundarios se renderizan inmediatamente.</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Este elemento ocupa el espacio disponible, tanto ancho como alto. En otras palabras, el diseño y el tamaño de un elemento <code>fill</code> coincide con su padre. Para que un elemento llene su contenedor padre, especifique el diseño de “fill” y asegúrese de que el contenedor padre especifique <code>position:relative</code> o <code>position:absolute</code>.</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Este elemento tiene un ancho y un alto fijos, no son compatibles con una capacidad de respuesta. Además, debe tener los atributos <code>width</code> y <code>height</code>. Las únicas excepciones para este elemento son los componentes <code>amp-pixel</code> y <code>amp-audio</code>.</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>Este elemento ocupa el espacio disponible, pero mantiene la altura sin cambios. Este diseño funciona bien para elementos como <code>amp-carousel</code> que involucra contenido que se coloca de forma horizontal. En este caso, el atributo <code>height</code> debe estar presente y el atributo <code>width</code> no debe estar presente o debe ser igual a <code>auto</code>.</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Este elemento y otros elementos contenidos en el elemento primario con el tipo de diseño <code>flex-item</code> toman el espacio restante del contenedor padre cuando es un contenedor flexible (por ejemplo, <code>display: flex</code>). Los atributos <code>width</code> y <code>height</code> no son obligatorios.</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Este elemento utiliza el espacio disponible y cambia su altura automáticamente dependiendo de la relación de aspecto dada por los atributos <code>width</code> y <code>height</code> <em>hasta</em> o alcance una restricción CSS, como “max-width”. Los atributos que definen el ancho y el alto deben estar presentes. Este diseño funciona muy bien para la mayoría de los elementos AMP, incluidos <code>amp-img</code>, <code>amp-carousel</code>, etc. El espacio disponible depende del elemento principal y además puede personalizarse con CSS mediante <code>max-width</code>. Este diseño se diferencia de <code>responsive</code> por tener una altura y un ancho propios. Esto se hace más evidente cuando se visualiza un elemento flotante donde un diseño <code>responsive</code> renderizará 0x0 y un diseño <code>intrinsic</code> se inflará hasta que alcance el tamaño natural más pequeño o cualquier restricción CSS.</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>El elemento no se muestra y ocupa un espacio nulo en la pantalla como si su estilo de visualización fuera <code>none</code>. Este diseño se puede aplicar a todos los elementos de AMP. Se asume que el elemento puede mostrarse a sí mismo con la acción del usuario (por ejemplo, <code>amp-lightbox</code>). Los atributos  <code>width</code> y <code>height</code> no son obligatorios.</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>El elemento toma el espacio disponible y cambia su altura automáticamente con la relación de aspecto que se establece en los atributos <code>width</code> y <code>height</code>. Este diseño funciona muy bien para la mayoría de los elementos AMP, incluidos  <code>amp-img</code>, <code>amp-video</code>, etc. El espacio disponible depende del elemento principal y también se puede personalizar utilizando CSS mediante <code>max-width</code>. Los atributos <code>width</code> y <code>height</code> deben estar presentes.<p><strong>Nota</strong>: Los elementos que contengan <code>"layout=responsive"</code> no cuentan con un tamaño propio. El tamaño del elemento se determina a partir de su elemento contenedor. Para asegurarse de que se muestre su elemento AMP, debe especificar un ancho y alto para el elemento contenedor. En el elemento contenedor no especifique <code>"display:table"</code> ya que esto anula la visualización del elemento AMP y hace que el elemento AMP sea invisible.</p>
</td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

Todos los elementos de AMP compatibles con el diseño `responsive` también admiten el atributo `sizes`. El valor que toma este atributo se expresa en los tamaños como se describe en [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), no obstante se extiende a todos los elementos y no solo a las imágenes. En conclusión, en el atributo `sizes` se describe cómo se calcula el ancho de un elemento con base en las condiciones asociadas a los medios.

En el momento que se realizan las especificaciones en el atributo `sizes` junto con `width` y `height`, el `layout` se establece de forma predeterminada como `responsive`.

**Ejemplo**: Usando el atributo `sizes`

En el siguiente ejemplo, la imagen tendrá 320 px de ancho si la ventana de visualización es más ancha que `320px`, de lo contrario, tendrá 100 vw de ancho (ocupará el 100% del ancho en la ventana de visualización).

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"

> </amp-img>
> [/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

Por su propia cuenta, en el atributo `sizes` se establecerá un estilo integrado en el código del elemento `width`. Al emparejar `disable-inline-width` con `sizes`, este elemento AMP propagará el valor de `sizes` a la etiqueta oculta que tiene dentro, como sucede con `img` anidado dentro de un `amp-img`, **sin** que se establezca el estilo integrado en el código de `width` así como `sizes` normalmente lo hace por su propia cuenta en AMP.

**Ejemplo**: Usando el atributo `disable-inline-width`

En el siguiente ejemplo, no se modifica el ancho en el elemento `<amp-img>` y `sizes` solo se utiliza para seleccionar una de las fuentes de `srcset`.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"
disable-inline-width

> </amp-img>
> [/sourcecode]

### `heights` <a name="heights"></a>

Todos los elementos de AMP compatibles con el diseño `responsive`, también admiten el atributo `heights`. El valor que toma este atributo se expresa en los tamaños basados en las expresiones asociadas a los medios de forma similar a lo que se describe en el [atributo img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), pero con diferencias esenciales:

1. Se utiliza en la altura, no en el ancho del elemento.
2. Se permiten los valores porcentuales, por ejemplo, `86%`. Si se utiliza un valor porcentual este indica el porcentaje del ancho para un elemento.

En el momento que se realizan las especificaciones para el atributo `heights` junto con `width` y `height`, en `responsive` se establece el valor de `layout` de forma predeterminada.

**Ejemplo**: Usando el atributo `heights`

En el siguiente ejemplo, la altura de la imagen se predeterminará al 80% del ancho, pero si la ventana de visualización es más ancha que `500px`, la altura se limitará a `200px`. Debido a que se realizan las especificaciones para el atributo `heights` junto con `width` y `height`, el `responsive` se establece el valor de “layout” de forma predeterminada.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="320"
height="256"
heights="(min-width:500px) 200px, 80%"

> </amp-img>
> [/sourcecode]

### `media` <a name="media"></a>

La mayoría de los elementos AMP son compatibles con el atributo `media`. El valor de `media` es una consulta de medios. Si el valor que se compara con la consulta no coincide, en realidad el elemento y sus recursos no se renderizarán y posiblemente no se buscarán sus recursos secundarios. Si la ventana del navegador cambia de tamaño u orientación, se vuelven a evaluar las consultas de medios y los elementos se ocultan y se muestran en con base en los nuevos resultados.

**Ejemplo**: Usando el atributo `media`

En el siguiente ejemplo, se muestran 2 imágenes con consultas de medios mutuamente excluyentes. Dependiendo del ancho de la pantalla, se obtendrá y renderizará una de las dos imágenes. El atributo `media` está disponible en todos los elementos de AMP, por lo que se puede utilizar con elementos que no sean imágenes, como anuncios.

[sourcecode:html]
<amp-img
media="(min-width: 650px)"
src="wide.jpg"
width="466"
height="355"
layout="responsive"

> </amp-img>
> <amp-img
>   media="(max-width: 649px)"
>   src="narrow.jpg"
>   width="527"
>   height="193"
>   layout="responsive"
> </amp-img>
> [/sourcecode]

### `placeholder` <a name="placeholder"></a>

El atributo `placeholder` puede establecerse en cualquier elemento HTML, no solo en los elementos AMP. En el atributo `placeholder` se indica que los elementos etiquetados con este atributo actúan como marcadores de posición para el elemento principal de AMP. Si se realizan especificaciones, un elemento “placeholder” debe ser un elemento secundario directo del elemento AMP. De forma predeterminada, el marcador de posición se muestra inmediatamente en el elemento AMP, incluso si los recursos del elemento AMP no se descargaron o iniciaron. Cuando esté listo, el elemento AMP generalmente oculta su marcador de posición y muestra el contenido. El comportamiento exacto relacionado con el marcador de posición depende de la implementación del elemento.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
<amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

El atributo `fallback` se puede configurar en cualquier elemento HTML, no solo en los elementos AMP. Un “fallback” es un acuerdo que le permite al elemento comunicarse con el lector de ese navegador que no es compatible con el elemento. Si se llevan a cabo especificaciones, un elemento “fallback” debe ser un elemento secundario directo del elemento AMP. El comportamiento exacto relacionado con “fallback” depende de la implementación del elemento.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">

  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

En el atributo `noloading` se indica si el “indicador de carga” debe desactivarse en este elemento. Muchos elementos de AMP tienen un registro permitido para mostrar un “indicador de carga”, el cual es una animación básica en la que muestra que el elemento aún no está cargado por completo. Los elementos pueden desactivar este comportamiento al agregar este atributo.

## (tl;dr) Resumen de requisitos y comportamientos de diseño <a name="tldr-summary-of-layout-requirements--behaviors"></a>

En la siguiente tabla se describen los parámetros aceptados, las clases de CSS y los estilos utilizados para el atributo `layout`. Tenga en cuenta que:

1. Cualquier clase en CSS etiquetada con el prefijo `-amp-` y los elementos con el prefijo `i-amp-` se consideran internos de AMP y no se permite su uso en las hojas de estilo para usuarios. Solo se muestran aquí con fines informativos.
2. Aunque `width` y `height` se especifican en la tabla según dependiendo de los requisitos, pueden aplicarse reglas predeterminadas en el caso de `amp-pixel` y `amp-audio`.

<table>
  <thead>
    <tr>
      <th width="21%">Diseño</th>
      <th width="20%">¿Necesita ancho o <br>alto?</th>
      <th width="20%">¿Se establece el tamaño?</th>
      <th width="20%">Elementos adicionales</th>
      <th width="19%">“Visualizar” CSS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>No</td>
      <td>Sí, el tamaño del elemento principal.</td>
      <td>No</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Sí</td>
      <td>Sí, se especificó por <code>width</code> y <code>height</code>.</td>
      <td>No</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td> solamente <code>height</code>, <code>width</code> puede ser <code>auto</code>
</td>
      <td>Sí, se especificó por el contenedor padre y por <code>height</code>.</td>
      <td>No</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>No</td>
      <td>No</td>
      <td>Sí, basado en el contenedor padre.</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Sí</td>
      <td>Sí, basado en el contenedor padre y la relación con el aspecto de <code>width:height</code>.</td>
      <td>Sí, <code>i-amphtml-sizer</code>.</td>
      <td>
<code>block</code> (se comporta como un <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element" rel="nofollow">elemento reemplazado</a>)</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Sí</td>
      <td>Sí, basado en el contenedor padre y la relación con el aspecto de <code>width:height</code>.</td>
      <td>Sí, <code>i-amphtml-sizer</code>.</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>
