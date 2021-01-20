---
$category@: layout
formats:
  - websites
  - email
teaser:
  text: >-
    Permite mostrar metacontenido pensado para accesos temporales como, por ejemplo, enlaces, botones o menús de navegación.
toc: true
$title: amp-sidebar
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



<table>
  <tr>
    <td width="40%"><strong>Descripción</strong></td>
    <td>
      Las barras laterales permiten mostrar metacontenido pensado para accesos temporales (enlaces, botones, menús u otros elementos de navegación). Las barras laterales se pueden mostrar tocando un botón, mientras el contenido principal sigue visible debajo.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Ejemplos</strong></td>
    <td>Consulta el <a href="https://ampbyexample.com/components/amp-sidebar/">ejemplo de amp-sidebar</a> de AMP By Example.</td>
  </tr>
</table>

## Descripción general <a name="overview"></a>

`<amp-sidebar>` oculta el metacontenido destinado a accesos temporales (enlaces, botones, menús u otros elementos de navegación). `<amp-sidebar>` se puede abrir y cerrar tocando botones y tocando en un punto fuera de amp-sidebar.
Sin embargo, los atributos opcionales que aceptan media queries se pueden utilizar para mostrar metacontenido en otras partes del sitio web. Los elementos secundarios de `<nav toolbar="(media query)" toolbar-target="elementID">` permiten que el contenido de la barra lateral se muestre en otras partes del contenido principal.

## Comportamiento <a name="behavior"></a>

* `<amp-sidebar>` debe ser un elemento secundario directo de `<body>`.
* La barra lateral solo puede aparecer en la parte izquierda o derecha de las páginas.
* `<amp-sidebar>` puede contener cualquier elemento HTML válido (compatible con AMP).
* `<amp-sidebar>` puede contener cualquiera de los siguientes elementos AMP:
    * `<amp-accordion>`
    * `<amp-img>`
    * `<amp-fit-text>`
    * `<amp-list>`
    * `<amp-live-list>`
    * `<amp-social-share>`</li>
* La altura máxima de la barra lateral es de 100 vh. Si la altura supera los 100 vh, aparece una barra de desplazamiento vertical. La altura predeterminada son 100 vh en CSS y se puede anular en CSS.
* El ancho de la barra lateral se puede definir y ajustar mediante CSS (ancho mínimo: 45 píxeles).
* El zoom táctil está inhabilitado en `amp-sidebar` y se enmascara cuando se abre la barra lateral.

*Ejemplo:*

En el ejemplo siguiente, `amp-sidebar` sirve para contener los elementos de navegación. Sin embargo, el segundo y cuarto elemento, Nav Item 2 y Nav Item 4, están asignados al ID de elemento que aparece en la página. Al usar el atributo [`on`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/../../spec/amp-actions-and-events.md), podemos desplazarnos sin problemas hasta el elemento utilizando el ID de elemento y `scrollTo`.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>
</amp-sidebar>
```

### Abrir y cerrar la barra lateral <a name="opening-and-closing-the-sidebar"></a>

Para alternar, abrir o cerrar la barra lateral al tocar o hacer clic en un elemento, asigna el atributo de acción [`on`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) en el elemento y especifica uno de los siguientes métodos de acción:

<table>
  <tr>
    <th>Acción</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td>open (predeterminado)</td>
    <td>Abre la barra lateral.</td>
  </tr>
  <tr>
    <td>close</td>
    <td>Cierra la barra lateral.</td>
  </tr>
  <tr>
    <td>toggle</td>
    <td>Alterna el estado de la barra lateral.</td>
  </tr>
</table>

Si el usuario vuelve a tocar el área de contenido principal parcialmente visible, se cierra la barra lateral.

También puedes cerrarla pulsando la tecla Esc.

*Ejemplo:*

```html
<button class="hamburger" on='tap:sidebar1.toggle'></button>
<button on='tap:sidebar1'>Open</button>
<button on='tap:sidebar1.open'>Open</button>
<button on='tap:sidebar1.close'>x</button>
```

### Barra de herramientas <a name="toolbar"></a>

Puedes crear un elemento `toolbar` que se muestre en `<body>` especificando el atributo `toolbar` con una media query y un atributo `toolbar-target` con un ID de elemento en un elemento `<nav>` secundario de `<amp-sidebar>`. `toolbar` duplica el elemento `<nav>` y sus elementos secundarios, y añade el elemento al elemento `toolbar-target`.

#### Comportamiento <a name="behavior-1"></a>

* La barra lateral puede implementar barras de herramientas añadiendo elementos de navegación con el atributo `toolbar` y `toolbar-target`.
* El elemento de navegación debe ser un elemento secundario de `<amp-sidebar>` y debe tener este formato: `<nav toolbar="(media-query)" toolbar-target="elementID">`.
    * Por ejemplo, este sería un uso válido de la barra de herramientas: `<nav toolbar="(max-width: 1024px)" toolbar-target="target-element">`.</li>
* El elemento de navegación que contiene el atributo de la barra de herramientas solo puede incluir un elemento `<ul>` que contenga elementos `<li>`.
    * Los elementos `<li>` pueden contener cualquier elemento HTML válido (admitido por AMP) o cualquiera de los elementos AMP compatibles con `<amp-sidebar>`.</li>
* El comportamiento de la barra de herramientas solo se aplica durante el tiempo en que la media query del atributo `toolbar` es válido. Además, para que pueda aplicarse la barra de herramientas, debe haber un elemento con el ID del atributo `toolbar-target` en la página.

*Ejemplo: Barra de herramientas básica*

En el siguiente ejemplo, se muestra un elemento `toolbar` si el ancho de la ventana es igual o inferior a 767 píxeles. `toolbar` contiene un elemento de entrada de búsqueda. El elemento `toolbar` se añadirá al elemento `<div id="target-element">`.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Search..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>
```

## Barra de herramientas de estilo <a name="styling-toolbar"></a>

El elemento `toolbar` que se incluye en el elemento `<amp-sidebar>` tendrá clases aplicadas al elemento en función de si el elemento `toolbar-target` se muestra o se oculta. Esto es útil para aplicar diferentes estilos en el elemento `toolbar` y luego en el elemento `toolbar-target`. Las clases son `amp-sidebar-toolbar-target-shown` y `amp-sidebar-toolbar-target-hidden`. La clase `amp-sidebar-toolbar-target-shown` se aplica al elemento `toolbar` cuando se muestra el elemento `toolbar-target`. La clase `amp-sidebar-toolbar-target-hidden` se aplica al elemento `toolbar` cuando se oculta el elemento `toolbar-target`.

*Ejemplo: Clases de estado de la barra de herramientas*

En el siguiente ejemplo, se muestra un elemento `toolbar` si el ancho de la ventana es igual o inferior a 767 píxeles. `toolbar` contiene un elemento de entrada de búsqueda. El elemento `toolbar` se añadirá al elemento `<div id="target-element">`. Sin embargo, hemos añadido algunos estilos personalizados para ocultar el elemento `toolbar` cuando se muestra el elemento `<div id="toolbar-target">`.

```html
<style amp-custom="">
  .amp-sidebar-toolbar-target-shown {
      display: none;
  }
</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Search..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

[tip type="success"]
Consulta varios ejemplos en [AMP By Example](https://ampbyexample.com/components/amp-sidebar/).
[/tip]

## Barra lateral para historias <a name="sidebar-for-stories"></a>

Se admite el uso de `amp-sidebar` en el [componente](../../../about/stories.html) `amp-story`.

### Comportamiento <a name="behavior-2"></a>

* `<amp-sidebar>` debe ser un elemento secundario directo de `<amp-story>`.
* La barra lateral se define en el valor predeterminado "start" en los documentos AMP normales; es decir, a la derecha para los idiomas que se escriben de izquierda a derecha, y a la izquierda para los idiomas que se escriben de derecha a izquierda.
* El color de fondo predeterminado de `<amp-sidebar>` es el blanco y se puede anular en CSS.
* El ancho máximo de `<amp-sidebar>` se aplica cuando el valor es `280px` y, en el caso de los ordenadores, cuando el valor es `320px`.
* En la UI de la historia aparecerá un botón de estilo "hamburger" que abre y cierra la barra lateral.

Para ofrecer una experiencia coherente en la UI de la plataforma de la historia, no se puede usar cualquier atributo o función. Estos son los atributos y las funciones que pueden usarse en `amp-sidebar` dentro del componente `amp-story`.

### Atributos permitidos <a name="allowed-attributes"></a>

* [layout](#layout)
* [data-close-button-aria-label](#data)
* [atributos comunes](#common)

*Ejemplo: Barra lateral básica en una historia*

En el siguiente ejemplo se muestra un `amp-sidebar` simple dentro del componente `amp-story`.

```html
...
<body>
  <amp-story standalone>
  <amp-sidebar id="sidebar1" layout="nodisplay">
    <ul>
      <li><a href="https://amp.dev"> External Link </a></li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
    </ul>
  </amp-sidebar>
  <amp-story-page id="cover">
    <amp-story-grid-layer template="fill">
      <h1>Hello World</h1>
      <p>This is the cover page of this story.</p>
    </amp-story-grid-layer>
  </amp-story-page>
  ...
</body>
```

## Atributos <a name="attributes"></a>

##### side <a name="side"></a>

Indica en qué lado de la página debe abrirse la barra lateral, es decir, `left` o `right`.  Si no se asigna un valor a `side`, se heredará del atributo `dir` de la etiqueta `body` (`ltr` => `left` , `rtl` => `right`); si el atributo `dir` no existe, a `side` se le asigna el valor predeterminado `left`.

##### layout <a name="layout"></a>

Especifica el diseño en que se muestra la barra lateral, que debe ser `nodisplay`.

##### open <a name="open"></a>

Este atributo está presente cuando la barra lateral está abierta.

##### data-close-button-aria-label <a name="data"></a>

Atributo opcional que se utiliza para definir la etiqueta ARIA en el botón de cierre; se añade para incluir la función de accesibilidad.

##### toolbar <a name="toolbar-1"></a>

Este atributo se encuentra en elementos `<nav toolbar="(media-query)" toolbar-target="elementID">` secundarios y acepta una media query sobre cuándo mostrar una barra de herramientas. Consulta la sección [Barra de herramientas](#toolbar-1) para obtener más información sobre cómo usar este elemento.

##### toolbar-target <a name="toolbar-target"></a>

Este atributo se encuentra en elementos `<nav toolbar="(media-query)" toolbar-target="elementID">` secundarios y acepta un ID de un elemento en la página.  El atributo `toolbar-target` colocará la barra de herramientas en el ID especificado del elemento de la página, sin el estilo de barra de herramientas predeterminado. Consulta la sección [Barra de herramientas](#toolbar-1) para obtener más información sobre cómo usar este elemento.

##### atributos comunes <a name="common"></a>

Este elemento incluye [atributos comunes](../../../documentation/guides-and-tutorials/learn/common_attributes.md) que también se usan en componentes AMP.

## Estilo <a name="styling"></a>

Al componente `amp-sidebar` se le pueden aplicar estilos con CSS estándar.

* Se puede usar `width` de `amp-sidebar` para ajustar la anchura entre los valores mínimos (45 píxeles) y máximos (80 vw) predefinidos.
* Se puede ajustar la altura de `amp-sidebar`. Si la altura supera los 100 vw, la barra lateral tendrá una barra de desplazamiento vertical. La altura predeterminada de la barra lateral es de 100 vw y se puede anular en CSS para acortarla.
* El estado actual de la barra lateral se muestra mediante el atributo `open`, el cual se define en la etiqueta `amp-sidebar` cuando la barra lateral está abierta en la página.

[tip type="success"]
En [AMP Start](https://ampstart.com/components#navigation) encontrarás menús de navegación prediseñados que podrás adaptar para tus páginas AMP.
[/tip]

## Desplazamiento automático en áreas adicionales <a name="auto-scrolling-within-overflowing-areas"></a>

`amp-sidebar` permite desplazar automáticamente el contenedor adicional al primer elemento que está decorado con `autoscroll` como atributo, tanto en barras laterales como en barras de herramientas.

Esta función es útil si la lista de navegación es larga y la barra lateral debe desplazarse hasta los elementos de navegación actuales al cargarse la página.

Cuando se usa la función `toolbar`, `autoscroll` solo funciona si el elemento `<nav toolbar>` está definido en `overflow: auto` o `overflow: scroll`.

```html
<style amp-custom="">
  nav [toolbar] {
    overflow: auto;
  }
</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>Nav item 1</li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
      <li autoscroll class="currentPage">Nav item 4</li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

En [este archivo de ejemplo](https://github.com/ampproject/amphtml/blob/master/examples/amp-sidebar-autoscroll.amp.html) se incluye código de muestra que funciona.

## Consideraciones relacionadas con la experiencia de usuario <a name="ux-considerations"></a>

Cuando uses `<amp-sidebar>`, ten en cuenta que los usuarios suelen ver tus páginas en un visor de AMP desde el móvil, que puede mostrar un encabezado de posición fija. Además, los navegadores suelen mostrar su propio encabezado fijo en la parte superior de las páginas.  Añadir otro elemento de posición fija en la parte superior de la pantalla ocuparía mucho espacio en las pantallas de los móviles y tampoco proporcionaría información nueva al usuario.

Por ello, se recomienda que las funciones para abrir la barra lateral no se coloquen en un encabezado fijo que ocupe el ancho de la página.

## Validación <a name="validation"></a>

Consulta las [reglas de amp-sidebar](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/validator-amp-sidebar.protoascii) en la especificación de la herramienta de validación de AMP.
