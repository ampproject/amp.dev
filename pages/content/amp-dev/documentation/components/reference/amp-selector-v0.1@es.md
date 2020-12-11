---
$title: amp-selector
$category@: dynamic-content
teaser:
  text: Representa un control que muestra un menú de varias opciones entre las que el usuario puede elegir.
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



Representa un control que muestra un menú de varias opciones entre las que el usuario puede elegir.

<table>
  <tr>
    <td class="col-fourty" width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>Todos</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Ejemplos</strong></td>
    <td>Consulta el <a href="https://ampbyexample.com/components/amp-selector/">ejemplo de amp-selector</a> de AMP By Example.</td>
  </tr>
</table>


## Comportamiento <a name="behavior"></a>

El selector de AMP es un control que muestra una lista y permite al usuario elegir una o varias opciones, cuyo contenido no se limita solo al texto.

* Un `amp-selector` puede contener cualquier elemento HTML arbitrario o componente de AMP (p. ej., `amp-carousel`, `amp-img`, etc.).
* Un `amp-selector` no puede contener controles anidados de `amp-selector`.
* Las opciones que se pueden seleccionar se definen añadiendo el atributo `option` al elemento y asignando un valor al atributo `(p. ej., <li option='value'></li>)`.
* Las opciones inhabilitadas se definen añadiendo el atributo `disabled` al elemento (p. ej., `<li option='d' disabled></li>`).
* Las opciones preseleccionadas se definen añadiendo el atributo `selected` al elemento (p. ej., `<li option='b' selected></li>`).
* Para permitir seleccionar varias opciones, añade el atributo `multiple` al elemento `amp-selector`.  De forma predeterminada, `amp-selector` admite una única opción seleccionada a la vez.
* Para inhabilitar `amp-selector`, añade el atributo `disabled` al elemento `amp-selector`.
* Cuando `amp-selector` se encuentra dentro de una etiqueta `form`, contiene un atributo `name``` y se produce un evento de envío, se`` comporta como un grupo de botones de selección o de casillas, y envía los valores seleccionados (asociados a la opción) utilizando el nombre que se le ha asignado``.

Ejemplo:

```html

<form id="form1" action="/" method="get" target="_blank">
  <amp-selector name="single_image_select" layout="container">
    <ul>
      <li><amp-img src="/img1.png" width="50" height="50" option="1"></amp-img></li>
      <li><amp-img src="/img2.png" width="50" height="50" option="2"></amp-img></li>
      <li option="na" selected="">Ninguna de las opciones anteriores</li>
    </ul>
  </amp-selector>
  <amp-selector name="multi_image_select" layout="container" multiple="">
    <amp-img src="/img1.png" width="50" height="50" option="1"></amp-img>
    <amp-img src="/img2.png" width="50" height="50" option="2"></amp-img>
    <amp-img src="/img3.png" width="50" height="50" option="3"></amp-img>
  </amp-selector>
  <amp-selector name="multi_image_select_1" layout="container" multiple="">
    <amp-carousel id="carousel-1" width="200" height="60" controls="">
      <amp-img src="/img1.png" width="80" height="60" option="a"></amp-img>
      <amp-img src="/img2.png" width="80" height="60" option="b" selected=""></amp-img>
      <amp-img src="/img3.png" width="80" height="60" option="c"></amp-img>
      <amp-img src="/img4.png" width="80" height="60" option="d" disabled=""></amp-img>
    </amp-carousel>
  </amp-selector>
</form>

<p><amp-selector name="multi_image_select_2" layout="container" multiple="" form="form1">
  <amp-carousel height="300" id="carousel-1" type="slides" width="400" controls="">
    <amp-img height="60" src="/img1.png" width="80" option="a"></amp-img>
    <amp-img height="60" src="/img2.png" width="80" option="b" selected=""></amp-img>
    <amp-img height="60" src="/img3.png" width="80" option="c"></amp-img>
    <amp-img height="60" src="/img4.png" width="80" option="d"></amp-img>
  </amp-carousel>
</amp-selector>
```

## Borrar selecciones <a name="clearing-selections"></a>

Para borrar todas las selecciones cuando se toca o se hace clic en un elemento, define el atributo de acción [`on`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) en el elemento y especifica el `id` de AMP Selector con el método de acción `clear`.

Ejemplo:

```html
<button on="tap:mySelector.clear">Clear Selection</button>
<amp-selector id="mySelector" layout="container" multiple>
  <div option>Option One</div>
  <div option>Option Two</div>
  <div option>Option Three</div>
</amp-selector>
```

[tip type="success"]
Puedes ver ejemplos en [AMP By Example](https://ampbyexample.com/components/amp-selector/).
[/tip]

## Atributos <a name="attributes"></a>

### Atributos de `<amp-selector>` <a name="attributes-on-"></a>

<table>
  <tr>
    <td width="40%"><strong>disabled, form, multiple, name</strong></td>
    <td>Estos atributos se comportan del mismo modo que en un HTML estándar <code>select</code> element [](https://developer.mozilla.org/en/docs/Web/HTML/Element/select).</td>
  </tr>
  <tr>
    <td width="40%"><strong>keyboard-select-mode</strong></td>
    <td>El atributo <code>keyboard-select-mode</code> determina el comportamiento de desplazamiento con el teclado de las opciones que están dentro de <code>amp-selector</code>.

    <ul><li><code>none</code>(valor predeterminado): el tabulador cambia el enfoque entre los distintos elementos que están dentro de <code>amp-selector</code>. El usuario debe pulsar Intro o la barra espaciadora para cambiar la selección. Las teclas de flecha están inhabilitadas. </li><li>
    <code>focus</code>: el tabulador cambia el enfoque a <code>amp-selector</code>. El usuario se desplaza por los elementos mediante las teclas de flecha; debe pulsar Intro o la barra espaciadora para cambiar la selección.</li><li>
    <code>select</code>: el tabulador cambia el enfoque a <code>amp-selector</code>. La selección cambia a medida que el usuario se desplaza por las opciones mediante las teclas de flecha. <code>amp-selector</code></li></ul></td>
    </tr>
    </table>

### Atributos de las opciones de `<amp-selector>` <a name="attributes-on--options"></a>

<table>
  <tr>
    <td width="40%"><strong>option</strong></td>
    <td>Indica que la opción se puede seleccionar.  Si se especifica un valor, el contenido del valor se envía con el formulario.</td>
  </tr>
  <tr>
    <td width="40%"><strong>disabled, selected</strong></td>
    <td>Estos atributos se comportan del mismo modo que en un HTML estándar [<code>option</code>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option) element.</td>
  </tr>
</table>

## Eventos <a name="events"></a>

Los eventos pueden activar acciones en otros componentes de AMP mediante el atributo `on`,
por ejemplo, `on="select: my-tab.show"`.

Más información sobre [las acciones y los eventos de AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)

<table>
  <tr>
    <td width="40%"><strong>select</strong></td>
    <td><code>amp-selector</code>  activa el evento <code>select</code> cuando el usuario selecciona una opción.
        Los selectores, tanto los que permiten seleccionar una como varias opciones, activan este evento al seleccionar o deseleccionar opciones.
        Si se tocan las opciones inhabilitadas, no se activa el evento <code>select</code>.
        <ul>
        <li>
          <code>event.targetOption</code> contiene el valor de atributo `option` del elemento seleccionado.</li>
          <li>
              <code>event.selectedOptions</code> contiene una matriz de los valores de atributo <code>option</code> de todos los elementos seleccionados.
          </li>
        </ul></td>
      </tr>

    </table>

## Validación <a name="validation"></a>

Consulta las [reglas de amp-selector](https://github.com/ampproject/amphtml/blob/master/extensions/amp-selector/validator-amp-selector.protoascii) en la especificación de la herramienta de validación de AMP.
