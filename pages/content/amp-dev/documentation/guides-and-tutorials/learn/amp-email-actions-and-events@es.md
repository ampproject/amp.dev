---
'$title': Acciones y eventos en el correo electrónico de AMP
$order: 0
formats:
  - email
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/amp-email-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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

[tip type="note"] Este documento habla sobre las acciones y eventos que puede usar para el formato del correo electrónico de AMP. Lea sobre las [Acciones y eventos en el correo electrónico de AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-actions-and-events.md) para los sitios web, historias y anuncios de AMP. [/tip]

El atributo `on` se utiliza para instalar controladores de eventos en los elementos. La compatibilidad de los eventos dependerá del elemento.

El valor que se le asigna a la sintaxis consiste en usar un lenguaje sencillo específico para el dominio en el formulario:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

Consulte en la siguiente tabla la descripción sobre cada parte de la sintaxis.

<table>
  <tr>
    <th width="30%">Sintaxis</th>
    <th width="18%">¿Es necesario?</th>
    <th width="42%">Descripción</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>Sí</td>
    <td>Es el nombre del evento donde se presenta un elemento.</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>Sí</td>
    <td>Es el ID del DOM para el elemento, o un  <a href="#special-targets">objetivo especial </a> que se definió previamente, en el cual le gustaría ejecutar una acción como respuesta a un evento. En el siguiente ejemplo, el <code>targetId</code> es el ID del DOM para los objetivos <code>amp-lightbox</code> y <code>photo-slides</code>.     <pre><amp-lightbox id="photo-slides"></amp-lightbox> <button on="tap:photo-slides">Show Images</button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>No</td>
    <td>Se utiliza cuando los elementos tienen acciones predeterminadas.<p>Este es el método que presenta el elemento objetivo (al cual se hace referencia usando <code>targetId</code>) que le gustaría ejecutar cuando se desencadene el evento.</p> <p>AMP cuenta con un concepto de acción predeterminada que puede implementarse en los elementos. Entonces, al omitir <code>methodName</code> AMP ejecutará ese método de forma predeterminada.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>No</td>
    <td>Algunas acciones, cuando se documentan, pueden aceptar argumentos. Los argumentos se definen entre paréntesis mediante la notación <code>key=value</code>. Los valores aceptados son:       <ul>         <li>cadenas sencillas sin comillas: <code>simple-value</code> </li>         <li>cadenas con comillas: <code>"string value"</code> o </li>
</ul>
<code></code>
</td>
  </tr>
</table>

## Administrar varios eventos <a name="handling-multiple-events"></a>

Puede concentrarse en varios eventos de un elemento si los separa mediante un punto y coma `;`.

Por ejemplo: `on="submit-success:lightbox1;submit-error:lightbox2"`

## Varias acciones para un evento <a name="multiple-actions-for-one-event"></a>

Puede ejecutar varias acciones de manera consecutiva para el mismo evento si las separa mediante una coma “,”.

Por ejemplo: `on="tap:target1.actionA,target2.actionB"`

## Eventos y acciones definidos en las globales <a name="globally-defined-events-and-actions"></a>

En AMP se define el evento `tap` de manera global para que pueda concentrarse en cualquier elemento HTML (incluidos los elementos de AMP).

En AMP también se definen las acciones `hide`, `show` y `toggleVisibility` globalmente para que pueda activarlas en cualquier elemento HTML.

[tip type="note"]

Un elemento solo puede mostrarse si estaba oculto previamente por una acción `hide` o `toggleVisibility`, o mediante el atributo [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden). La acción `show` no es compatible con los elementos ocultos por CSS `display:none` o `layout=nodisplay` de AMP.

Por ejemplo, en AMP es posible hacer lo siguiente:

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## Eventos con elementos específicos <a name="element-specific-events"></a>

### \* - todos los elementos <a name="---all-elements"></a>

<table>
  <tr>
    <th>Evento</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>Se activa al presionar o hacer clic sobre el elemento.</td>
  </tr>
</table>

### Elementos de entrada <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">Evento</th>
    <th width="30%">Descripción</th>
    <th width="40%">Elementos</th>
    <th>Datos</th>
  </tr>
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Se activa cuando el valor del elemento cambia y se asigna.       <p>       Las propiedades de los datos son similares a los que se encuentran en <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> y de <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>.</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value<br>event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value</pre>
    </td>
  </tr>
  <tr>
    <td><code>input-debounced</code></td>
    <td>Se activa cuando el valor del elemento cambia. Es parecido al evento <code>change</code> estándar, pero solo se activa 300 ms después de que el valor de entrada dejó de cambiar.</td>
    <td>Elementos que activan el evento <code>input</code>.</td>
    <td>Es similar a los datos del evento <code>change</code>.</td>
  </tr>
  <tr>
    <td><code>input-throttled</code></td>
    <td>Se activa cuando el valor del elemento cambia. Es parecido al evento <code>change</code> estándar, pero está regulado para activarse máximo una vez cada 100 ms mientras el valor de entrada continúe modificándose.</td>
    <td>Elementos que activan el evento <code>input</code>.</td>
    <td>Es similar a los datos del evento <code>change</code>.</td>
  </tr>
</table>

### amp-accordion > sección <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descripción</th>
    <th width="40%">Datos</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>Se activa cuando la sección accordion aumenta.</td>
    <td>Ninguno.</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>Se activa cuando la sección accordion colapsa.</td>
    <td>Ninguno.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descripción</th>
    <th width="40%">Datos</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>Se activa cuando cambia la diapositiva en el carrusel.</td>
    <td><pre>// Slide number.<br>event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descripción</th>
    <th width="40%">Datos</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>Se activa cuando lightbox está completamente visible.</td>
    <td>Ninguno</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>Se activa cuando lightbox está totalmente cerrado.</td>
    <td>Ninguno</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descripción</th>
    <th width="40%">Datos</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(low-trust)</td>
    <td>Se activa cuando ocurre un error en la consulta de datos.</td>
    <td>Ninguno</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descripción</th>
    <th width="40%">Datos</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>Se activa al seleccionar o anular una selección.</td>
    <td><pre>// Target element's "option" attribute value.<br>event.targetOption<br>// Array of "option" attribute values of all selected elements.<br>event.selectedOptions</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descripción</th>
    <th width="40%">Datos</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>Se activa cuando la barra lateral se abre completamente después de que terminó la transición.</td>
    <td>Ninguno</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>Se activa cuando la barra lateral se cierra completamente después de que terminó la transición.</td>
    <td>Ninguno</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descripción</th>
    <th width="40%">Datos</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(low-trust)</td>
    <td>Se activa cuando ocurre un error en la consulta de datos.</td>
    <td>Ninguno</td>
  </tr>
</table>

### formulario <a name="form"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descripción</th>
    <th width="40%">Datos</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Se activa cuando se envía el formulario.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>Se activa cuando la respuesta por enviar el formulario es exitosa.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>Se activa cuando ocurre un error en la respuesta por enviar el formulario.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>Se activa cuando el formulario es válido.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>Se activa cuando el formulario no es válido.</td>
    <td></td>
  </tr>
</table>

## Acciones específicas para los elementos <a name="element-specific-actions"></a>

### \* (todos los elementos) <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">Acción</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Oculta el elemento objetivo.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Muestra al elemento objetivo. Si como resultado de ello un <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">elemento</a><code>autofocus</code>  se vuelve visible, aumenta su prioridad.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Cambia la visibilidad de un elemento objetivo. Si como resultado de ello un <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">elemento</a><code>autofocus</code>  se vuelve visible, aumenta su prioridad.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>Habilita o deshabilita las clases de un elemento objetivo. El <code>force</code> es opcional y, cuando se define, garantiza que la clase solamente se agregará pero no podrá eliminarse si se establece en <code>true</code>, y solo podrá eliminarse pero no agregarse si se establece en <code>false</code>.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Hace que el elemento objetivo aumente su prioridad. Para disminuir la prioridad, puede utilizarse <code>focus</code> en otro elemento (generalmente en un elemento primario). Le recomendamos nuevamente que no pierda de vista la prioridad en <code>body</code>/<code>documentElement</code> por cuestiones de accesibilidad.</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>Acción</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>Habilita o deshabilita los estados <code>expanded</code> y <code>collapsed</code> en las secciones de <code>amp-accordion</code>. Cuando se hacen llamadas sin argumentos, permite alternar todas las secciones del acordeón. Habilita una sección específica al proporcionar el ID de la sección: <code>on="tap:myAccordion.toggle(section=</code>
</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>Expande las secciones del acordeón. Si una sección ya está expandida permanece de esta manera. Cuando se hacen llamadas sin argumentos, expande todas las secciones del acordeón. Activa una sección específica al proporcionar el ID de la sección: <code>on="tap:myAccordion.expand(section='section-id')"</code>.</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>Colapsa las secciones del acordeón. Si una sección ya está colapsada permanece de esta manera. Cuando se hacen llamadas sin argumentos, colapsa todas las secciones del acordeón. Activa una sección específica al proporcionar el ID de la sección: <code>on="tap:myAccordion.collapse(section='section-id')"</code>.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th>Acción</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>Hace que el carrusel avance hasta una diapositiva específica del índice.</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">Acción</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Abre la imagen del lightbox, siendo la imagen de origen la que activó la acción.</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th>Acción</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Abre el lightbox.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Cierra el lightbox.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descripción</th>
    <th width="40%">Datos</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>Actualiza el diseño de <code>amp-list</code> a <code>layout="CONTAINTER"</code> para permitir <a href="https://github.com/ampproject/amphtml/blob/main/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">cambios en el tamaño de forma dinámica</a>.</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(low-trust)</td>
    <td>Se activa cuando ocurre un error en la consulta de datos.</td>
    <td>Ninguno</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th>Acción</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Elimina todas las selecciones de un <code>amp-selector</code> definido.</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>Desplaza la selección hacia arriba mediante el valor de “delta”. El valor de “delta” se establece en -1. Si no se selecciona ninguna opción, el estado que seleccione tomará el valor de la última opción.</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>Desplaza la selección hacia abajo mediante el valor de “delta”. El valor de “delta” se establece en 1. Si no se selecciona ninguna opción, el estado que seleccione tomará el valor de la primera opción.</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>Habilita o deshabilita la aplicación “seleccionada”. Si el atributo que se seleccionó está ausente, esta acción lo agregará. Si el atributo que se seleccionó está presente, esta acción lo eliminará. Puede forzar y mantener una adición o eliminación incluyendo un valor booleano en el argumento “value”. Un valor “true” forzará agregar el atributo “seleccionado” y no lo removerá si ya está presente. Un valor “false” eliminará el atributo, pero no lo agregará si está ausente.</td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th>Acción</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Abre la barra lateral.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Cierra la barra lateral.</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>Habilita o deshabilita el estado de la barra lateral.</td>
  </tr>
</table>

### formulario <a name="form-1"></a>

<table>
  <tr>
    <th>Acción</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Elimina cualquier valor en las entradas del formulario.</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Envía el formulario.</td>
  </tr>
</table>

## Objetivos especiales <a name="special-targets"></a>

Los siguientes son objetivos proporcionados por el sistema de AMP cuyos requisitos son especiales:

### Objetivo: AMP <a name="target-amp"></a>

El objetivo de `AMP` es proporcionado por su tiempo de ejecución e implementa acciones de nivel superior que se aplican a todo el documento.

<table>
  <tr>
    <th width="40%">Acción</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Requiere de <a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>.</p>
      <p>Fusiona un objeto literal con un estado para crear enlaces.</p>
      <p></p>
    </td>
  </tr>
</table>

<sup>1</sup>Cuando se utiliza con <a href="#multiple-actions-for-one-event">varias acciones</a>, las acciones que se realicen posteriormente esperarán hasta que se complete <code>setState()</code> antes de que los invoquen. Solamente se permite un <code>setState()</code> por evento.
