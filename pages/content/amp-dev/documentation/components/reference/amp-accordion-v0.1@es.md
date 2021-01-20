---
$title: amp-accordion
$category@: layout
teaser:
  text: Permite a los usuarios echar un vistazo al esquema del contenido e ir directos a la sección que quieran cuando lo deseen.
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



Permite a los usuarios echar un vistazo al esquema del contenido e ir directos a la sección que quieran. Resulta útil para los dispositivos móviles en los que hace falta desplazarse casi cada dos frases de una sección.

<table>
  <tr>
    <td class="col-fourty"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>container</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Ejemplos</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-accordion/">Ejemplo comentado de código de amp-accordion</a></td>
  </tr>
</table>


## Comportamiento <a name="behavior"></a>

El componente `amp-accordion` permite mostrar secciones de contenido que se pueden ocultar y expandir. Cada uno de los elementos secundarios de `amp-accordion` se considera una sección del "acordeón". Cada uno de estos nodos debe ser una etiqueta `<section>`.

* `amp-accordion` puede contener uno o varios elementos secundarios directos `<section>`.
* Cada `<section>` debe contener exactamente dos elementos secundarios directos.
* El primer elemento secundario de la sección (es decir, de <section>) representa el título de esta y debe ser un elemento de título (es decir, `h1`, `h2`, ..., `h6`, `header`).
* El segundo elemento secundario de la sección puede ser cualquier etiqueta permitida en AMP HTML y representa el contenido de la sección.
* Al tocar o hacer clic en el título de una sección, el contenido se expande o se oculta.
* El estado (oculto o expandido) de cada sección del elemento `amp-accordion` se guardará para el nivel de sesión. Si no quieres que se mantenga, añade el atributo `disable-session-states` al elemento `amp-accordion`.

#### Ejemplo: Mostrar un acordeón <a name="example-displaying-an-accordion"></a>

En este ejemplo, se muestran tres secciones; la tercera se expande cuando se carga la página.   Además, hemos añadido `disable-session-states` para que no se mantenga el estado expandido u oculto de las secciones.

[example preview="inline" playground="true" imports="amp-accordion"]
```html
<amp-accordion{% if not format=='email'%} disable-session-states{% endif %}>
  <section>
    <h2>Section 1</h2>
    <p>Content in section 1.</p>
  </section>
  <section>
    <h2>Section 2</h2>
    <div>Content in section 2.</div>
  </section>
  <section expanded>
    <h2>Section 3</h2>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/squirrel.jpg"
      width="320"
      height="256"></amp-img>
  </section>
</amp-accordion>
```
[/example]

[tip type="success"]
Para ver más ejemplos del componente `amp-accordion`, visita [AMP By Example](https://ampbyexample.com/components/amp-accordion/).
[/tip]

### Eventos <a name="events"></a>

Los eventos que aparecen a continuación se activarán en las `section` de `accordion`.

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Este evento se activa en una <code>section</code> para que pase de estar oculta a expandida. Ten en cuenta que, si se hace una llamada a <code>expand</code> en una <code>section</code> que ya está expandida, no se activará este evento.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>Este evento se activa en una <code>section</code> para que pase de estar expandida a oculta. Ten en cuenta que, si se hace una llamada a <code>collapse</code> en una <code>section</code> que ya está oculta, no se activará este evento.</td>
  </tr>
</table>

### Acciones <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Este evento se activa en una <code>section</code> para que pase de estar oculta a expandida. Ten en cuenta que, si se hace una llamada a <code>expand</code> en una  <code>section</code> que ya está expandida, no se activará este evento.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>toggle</code></strong></td>
    <td>Esta acción alterna entre los estados <code>expanded</code> y  <code>collapsed</code> de  <code>amp-accordion</code>. Si se llama a la acción sin argumentos, se alternarán todas las secciones del acordeón. Se puede especificar una sola sección mediante el argumento  <code>section</code> y el  <code>id</code> correspondiente como valor.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Esta acción expande un <code>amp-accordion</code>. Si ya está expandido, seguirá estándolo. Si se llama a la acción sin argumentos, expandirá todas las secciones del acordeón. Se puede especificar una sola sección mediante el argumento <code>section</code> y el <code>id</code> correspondiente como valor.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>Esta acción oculta un <code>amp-accordion</code>. Si ya está oculto, seguirá estándolo. Si se llama a la acción sin argumentos, ocultará todas las secciones del acordeón. Se puede especificar una sola sección mediante el argumento <code>section</code> y el <code>id</code> correspondiente como valor.</td>
  </tr>
</table>

#### Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong><code>animate</code></strong></td>
    <td>Define este atributo en <code>&lt;amp-accordion&gt;</code> para animar la función para expandir u ocultar de todas las secciones del acordeón.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>disable-session-states</code></strong></td>
    <td>Define este atributo en <code>&lt;amp-accordion&gt;</code>  para que no se mantenga el estado expandido u oculto de las secciones del acordeón.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expanded</code></strong></td>
    <td>Define este atributo en <strong><code>&lt;section&gt;</code> </strong> para que la sección se muestre expandida al cargar la página.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand-single-section</code></strong></td>
    <td>Define este atributo en <code>&lt;amp-accordion&gt;</code> para que solo se pueda expandir una <code>&lt;section&gt;</code> a la vez. Si el usuario selecciona una <code>&lt;section&gt;</code>, se ocultarán las otras <code>&lt;section&gt;</code> que se hayan expandido previamente.</td>
  </tr>
</table>

## Estilo <a name="styling"></a>

* Puedes utilizar el selector de elementos de `amp-accordion` para aplicarle los estilos que quieras.
* Los elementos `amp-accordion` siempre tienen `display: block`.
* Los elementos `<section>`, título y contenido no pueden ser flotantes.
* Cuando se expande una sección, el elemento `<section>` tiene un atributo `expanded`.
* El elemento de contenido se ha corregido mediante clearfix utilizando `overflow: hidden` y, por lo tanto, no puede incluir barras de desplazamiento.
* Los márgenes de los elementos de título, contenido, `<amp-accordion>` y `<section>` están en 0 de forma predeterminada y se pueden definir mediante estilos personalizados.
* Tanto el elemento de título como el de contenido tienen `position: relative`.

## Validación <a name="validation"></a>

Consulta las [reglas de amp-accordion](https://github.com/ampproject/amphtml/blob/master/extensions/amp-accordion/validator-amp-accordion.protoascii) en la especificación de la herramienta de validación de AMP.
