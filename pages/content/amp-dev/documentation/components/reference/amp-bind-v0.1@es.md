---
$title: amp-bind
$category@: dynamic-content
teaser:
  text: Permite que los elementos muten como respuesta a las acciones del usuario o a cambios de datos mediante data binding y expresiones simples similares a JS.
---



Añade interactividad personalizada utilizando data bindings y expresiones.


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
    <td class="col-fourty"><strong>Secuencia de comandos obligatoria</strong></td>
    <td>
      <div>
          <code>&lt;script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js">&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Ejemplos</strong></td>
    <td>
      <ul>
        <li><a href="https://ampbyexample.com/components/amp-bind/">Ejemplo introductorio de código (con anotaciones)</a></li>
        <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Ejemplo de carruseles de imágenes vinculadas (con anotaciones)</a></li>
        <li><a href="https://ampbyexample.com/samples_templates/product/">Ejemplo de página de producto de comercio electrónico (con anotaciones)</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Tutoriales</strong></td>
    <td><a href="../../../documentation/guides-and-tutorials/develop/interactivity/index.md">Crear páginas de AMP interactivas</a></td>
  </tr>
</table>

# Descripción general <a name="overview"></a>

El componente `amp-bind` te permite añadir interactividad personalizada con reconocimiento de estado a tus páginas de AMP mediante el uso de data binding y expresiones similares a JS.

<figure class="alignment-wrapper  margin-">
  <amp-youtube width="480" height="270" data-videoid="xzCFU8b5fCU" layout="responsive"></amp-youtube>
  <figcaption>Echa un vistazo a este vídeo para conocer los aspectos básicos de amp-bind.</figcaption></figure>

# Un ejemplo muy sencillo <a name="a-simple-example"></a>

En el siguiente ejemplo, si tocas el botón, el texto del elemento `<p>` pasará de ser "Hello World" a "Hello amp-bind".

```html

<p [text]="'Hello ' + foo">Hello World</p>

<button on="tap:AMP.setState({foo: 'amp-bind'})">Say "Hello amp-bind"</button>
```

[tip type="note"]
Por cuestiones de rendimiento y para evitar que el contenido se desplace de forma inesperada, `amp-bind` no evalúa las expresiones al cargar la página. Esto quiere decir que los elementos visuales deben tener un estado predeterminado y no depender de `amp-bind` para el renderizado inicial.
[/tip]

### ¿Cómo funciona? <a name="how-does-it-work"></a>

`amp-bind` tiene tres componentes principales:

1. [Estado](#state): un estado JSON mutable que afecta al documento. En el ejemplo que aparece más arriba, el estado está vacío antes de tocar el botón.  Después de tocar el botón, el estado es `{foo: 'amp-bind'}`.
2. [Expresiones](#expressions): son expresiones similares a JavaScript que pueden hacer referencia al **estado**. El ejemplo que aparece más arriba tiene una única expresión, `'Hello ' + foo`, que concatena el literal de cadena `'Hello '` y la variable de estado `foo`.
Una expresión puede contener un máximo de 100 operandos.
3. [Bindings](#bindings): son atributos especiales de la forma `[property]` que enlazan la propiedad de un elemento con una **expresión**. El ejemplo anterior tiene un único binding, `[text]`, que actualiza el texto del elemento `<p>` cada vez que cambia el valor de la expresión.

`amp-bind` pone un especial énfasis en garantizar la velocidad, la seguridad y el rendimiento de las páginas de AMP.

### Veamos un ejemplo ligeramente más complejo: <a name="a-slightly-more-complex-example"></a>

```html
<!-- Se pueden almacenar datos JSON complejos anidados en elementos <amp-state> -->
 <amp-state id="myAnimals">
  <script type="application/json">
    {
      "dog": {
        "imageUrl": "/img/dog.jpg",
        "style": "greenBackground"
      },
      "cat": {
        "imageUrl": "/img/cat.jpg",
        "style": "redBackground"
      }
    }
  </script>
</amp-state>

<p [text]="'This is a ' + currentAnimal + '.'">Esto es un perro.</p>

<!-- También se pueden añadir o eliminar clases de CSS mediante [class]. -->
<p class="greenBackground" [class]="myAnimals[currentAnimal].style">
  Cada animal tiene un color de fondo diferente.
</p>

<!-- O bien cambia el src de una imagen por el binding [src]. -->
<amp-img width="300" height="200" src="/img/dog.jpg" [src]="myAnimals[currentAnimal].imageUrl">
</amp-img>

<button on="tap:AMP.setState({currentAnimal: 'cat'})">Set to Cat</button>
```

  Cuando se pulsa el botón:

  1. El **estado** se actualiza con `currentAnimal`, que se ha definido como `'cat'`.
  1. Se evalúan las **expresiones** que dependen de `currentAnimal`:

    * `'This is a ' + currentAnimal + '.'` =&gt; `'This is a cat.'`
    * `myAnimals[currentAnimal].style` =&gt; `'redBackground'`
    * `myAnimals[currentAnimal].imageUrl` =&gt;  `/img/cat.jpg`</li>

  1. Se actualizan los **bindings** que dependen de las expresiones modificadas:

    * El texto del primer elemento `<p>` será "This is a cat".
    * El atributo `class` del segundo elemento `<p>` será" "redBackground".
    * El elemento `amp-img` hará que se muestre la imagen de un gato.</li>

  [tip type="success"]
[Prueba la **demostración**](https://ampbyexample.com/components/amp-bind/) de este ejemplo con anotaciones de código.
[/tip]

# Información detallada <a name="details"></a>

# País <a name="state"></a>

Cada documento AMP que utiliza `amp-bind` contiene datos JSON mutables que afectan a dicho documento, a los que llamamos **estado**.

# Inicializar el estado mediante `amp-state` <a name="initializing-state-with-amp-state"></a>

El estado de `amp-bind` se puede inicializar mediante el componente `amp-state`:

```html
<amp-state id="myState">
  <script type="application/json">
    {
      "foo": "bar"
    }
  </script>
</amp-state>
```

Las [expresiones](#expressions) pueden hacer referencia a variables de estado mediante la sintaxis de puntos.  En este ejemplo, `myState.foo` dará como resultado `"bar"`.

* El JSON secundario de un elemento `<amp-state>` puede tener un tamaño máximo de 100 KB.
* También se puede especificar una URL de CORS para un elemento `<amp-state>` en lugar de una secuencia de comandos JSON secundaria. Para obtener más información, consulta el [Anexo](#amp-state-specification).

# Actualizar el estado <a name="refreshing-state"></a>

La acción `refresh` es compatible con este componente y se puede utilizar para actualizar el contenido del estado.

```html
<amp-state id="amp-state" ...></amp-state>
<!-- Clicking the button will refresh and refetch the json in amp-state. -->
<button on="tap:amp-state.refresh"></button>
```

# Actualizar el estado mediante `AMP.setState()` <a name="updating-state-with-ampsetstate"></a>

La acción [`AMP.setState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) combina una literal de objeto con el estado. Por ejemplo, cuando se pulsa el botón que aparece más abajo, `AMP.setState()` [combinará mediante deepmerge](#deep-merge-with-ampsetstate) la literal de objeto con el estado.

```html
<!-- Like JavaScript, you can reference existing
       variables in the values of the  object literal. -->
<button on="tap:AMP.setState({foo: 'bar', baz: myAmpState.someVariable})"></button>
```

En general, los objetos anidados se combinarán con hasta 10 objetos por debajo. Se pueden omitir todas las variables, incluidas las que introduce `amp-state`.

Cuando se activa debido a determinados eventos, `AMP.setState()` también puede acceder a datos relacionados con los eventos de la propiedad `event`.

```html
<!-- The "change" event of this <input> element contains
      a "value" variable that can be referenced via "event.value". -->
<input type="range" on="change:AMP.setState({myRangeValue: event.value})">
```

# Modificar el historial mediante `AMP.pushState()` <a name="modifying-history-with-amppushstate"></a>

La acción [`AMP.pushState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) es similar a `AMP.setState()`, con la diferencia de que también añade una entrada a la pila del historial de navegación. Al deshacer esta entrada del historial (por ejemplo, volviendo a la página anterior), se restaura el valor anterior de las variables que define `AMP.pushState()`.

Por ejemplo:
```html
<button on="tap:AMP.pushState({foo: '123'})">Set 'foo' to 123</button>
```

* Al tocar el botón, se define la variable `foo` en 123 y se envía una nueva entrada al historial.
* Al volver a la página anterior, se restaurará el valor previo de `foo`, es decir, "bar" (equivale a hacer una llamada a `AMP.setState({foo: 'bar'})`.

# Expresiones <a name="expressions"></a>

Las expresiones son similares a JavaScript, con algunas diferencias importantes.

# Diferencias con respecto a JavaScript <a name="differences-from-javascript"></a>

* Las expresiones solo pueden acceder al [estado](#state) del documento al que pertenecen.
* Las expresiones ****no tienen acceso a variables globales como `window` o `document`.
* Solo se pueden utilizar [los operadores y las funciones incluidos en la lista blanca](#allow-listed-functions).
* Por lo general, no se admiten las funciones, las clases ni los bucles personalizados. Se admiten las funciones de flecha como parámetros; por ejemplo, `Array.prototype.map`.
* Las variables no definidas y los índices de matriz fuera de límites devuelven `null` en lugar de `undefined` o de generar errores.
* Actualmente, una expresión puede tener un máximo de 50 operandos por cuestiones de rendimiento. [Ponte en contacto con nosotros](https://github.com/ampproject/amphtml/issues/new) si esta cantidad no te resulta suficiente.

Encontrarás la expresión gramatical completa y la implementación en [bind-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expr-impl.jison) y [bind-expression.js](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expression.js).

# Ejemplos <a name="examples"></a>

Las expresiones que aparecen a continuación son válidas:

```javascript
1 + '1'           // 11
1 + (+'1')        // 2
!0                // true
null || 'default' // 'default'
```

# Funciones incluidas en la lista blanca <a name="allow-listed-functions"></a>

<table>
  <tr>
    <th>Tipo de objeto </th>
    <th>Funciones</th>
    <th>Ejemplo</th>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods"><code>Matriz</code></a><sup>1</sup></td>
    <td class="col-thirty">
      <code>concat</code><br>
      <code>filter</code><br>
      <code>includes</code><br>
      <code>indexOf</code><br>
      <code>join</code><br>
      <code>lastIndexOf</code><br>
      <code>map</code><br>
      <code>reduce</code><br>
      <code>slice</code><br>
      <code>some</code><br>
      <code>sort</code> (no es in-place)<br>
      <code>splice</code> (no es in-place)<br>
    </td>
    <td>
      <pre>// Returns [1, 2, 3].
          [3, 2, 1].sort()</pre>
        <pre>// Returns [1, 3, 5].
            [1, 2, 3].map((x, i) =&gt; x + i)</pre>
          <pre>// Returns 6.
              [1, 2, 3].reduce((x, y) =&gt; x + y)</pre>
          </td>
        </tr>
        <tr>
          <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Methods"><code>Número</code></a></td>
          <td>
            <code>toExponential</code><br>
            <code>toFixed</code><br>
            <code>toPrecision</code><br>
            <code>toString</code>
            <td>
            <pre>// Returns 3.
                (3.14).toFixed()</pre>
              <pre>// Returns '3.14'.
                  (3.14).toString()</pre>
              </td>
            </tr>
            <tr>
              <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods"><code>Cadena</code></a></td>
              <td>
                <code>charAt</code><br>
                <code>charCodeAt</code><br>
                <code>concat</code><br>
                <code>indexOf</code><br>
                <code>lastIndexOf</code><br>
                <code>slice</code><br>
                <code>split</code><br>
                <code>substr</code><br>
                <code>substring</code><br>
                <code>toLowerCase</code><br>
                <code>toUpperCase</code></td>
                <td>
                  <pre>// Returns 'abcdef'.
                      abc'.concat('def')</pre>
                  </td>
                </tr>
                <tr>
                  <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math"><code>Operación matemática</code></a><sup>2</sup></td>
                  <td>
                    <code>abs</code><br>
                    <code>ceil</code><br>
                    <code>floor</code><br>
                    <code>max</code><br>
                    <code>min</code><br>
                    <code>random</code><br>
                    <code>round</code><br>
                    <code>sign</code></td>
                    <td>
                      <pre>// Returns 1.
                          abs(-1)</pre>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>Objeto</code></a><sup>2</sup></td>
                      <td>
                        <code>keys</code><br>
                        <code>values</code>
                        <td>
                        <pre>// Returns ['a', 'b'].
                            keys({a: 1, b: 2})</pre>
                          <pre>// Returns [1, 2].
                              values({a: 1, b: 2}</pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects"><code>Global</code></a><sup>2</sup>
                          </td>
                          <td>
                            <code>encodeURI</code><br>
                            <code>encodeURIComponent</code>
                          </td>
                          <td>
                            <pre>// Returns 'Hello%20world'.
                                encodeURIComponent('Hello world')</pre>
                            </td>
                          </tr>
                        </table>

<sup>1</sup> Las funciones de flecha de un solo parámetro no pueden tener paréntesis. Por ejemplo, utiliza `x => x + 1` en lugar de `(x) => x + 1`. Además, `sort()` y `splice()` devuelven copias modificadas en lugar de funcionar in situ.
<sup>2</sup> Las funciones estáticas no llevan espacios de nombre. Por ejemplo, utiliza `abs(-1)` en lugar de `Math.abs(-1)`.

# Definir macros mediante `amp-bind-macro` <a name="defining-macros-with-amp-bind-macro"></a>

Los fragmentos de expresión de `amp-bind` se pueden reutilizar definiendo un `amp-bind-macro`. Este elemento`` permite definir una expresión que utiliza cero o más argumentos y hace referencia al estado actual. Se puede invocar una macro como si fuera una función haciendo referencia en cualquier parte del documento al valor de su atributo `id`.

```html
<amp-bind-macro id="circleArea" arguments="radius" expression="3.14 * radius * radius"></amp-bind-macro>

<div>
  El círculo tiene un área de <span [text]="circleArea(myCircle.radius)">0</span>.
</div>

```

Una macro también puede llamar a otras macros <i>que se han definido antes que a sí misma</i>. Una macro no puede hacerse llamadas a sí misma de forma recursiva.

# Bindings <a name="bindings"></a>

Un **binding** es un atributo especial del formulario `[property]` que vincula la propiedad de un elemento con una [expresión](#expressions). También se puede utilizar una sintaxis alternativa compatible con XML mediante `data-amp-bind-property`.

Cuando el **estado** cambia, las expresiones se vuelven a evaluar y las propiedades de los elementos vinculados se actualizan con los resultados de la nueva expresión.

`amp-bind` admite data bindings para cuatro tipos de estado de elemento:

<table>
  <tr>
    <th>Tipo</th>
    <th>Atributos</th>
    <th>Información detallada</th>
  </tr>
  <tr>
    <td class="col-thirty"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent"><code>Node.textContent</code></a></td>
    <td class="col-thirty"><code>[text]</code></td>
    <td>Compatible con la mayoría de los elementos de texto.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class">Clases de CSS</a></td>
    <td><code>[class]</code></td>
    <td>El resultado de la expresión debe ser una cadena delimitada por espacios.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden">Atributo <code>hidden</code></a></td>
    <td><code>[hidden]</code></td>
    <td>Debe ser una expresión booleana.</td>
  </tr>
  <tr>
    <td>Tamaño de los <a href="../../../documentation/components/index.html">elementos AMP</a></td>
    <td><code>[width]</code><br><code>[height]</code></td>
    <td>Cambia la anchura o la altura del elemento AMP.</td>
  </tr>
  <tr>
    <td>Atributos específicos de elementos</td>
    <td><a href="#element-specific-attributes">Varios</a></td>
    <td></td>
  </tr>
</table>

Notas sobre los bindings:

* Por motivos de seguridad, no se permite hacer bindings con `innerHTML`.
* Todos los bindings de atributo se depuran para eliminar los valores que no son seguros (p. ej., `javascript:`).
* Los resultados de las expresiones booleanas habilitan o inhabilitan los atributos booleanos. Por ejemplo: `<amp-video [controls]="expr"...>`. Cuando `expr` da como resultado `true`, el elemento `<amp-video>` tiene el atributo `controls`. Cuando `expr` da como resultado `false`, se elimina el atributo `controls`.
* Incluir caracteres de corchetes `[` y `]` en nombres de atributos puede dar problemas al escribir XML (p. ej., XHTML o JSX) o atributos a través de las API de DOM. En estos casos, utiliza la sintaxis alternativa `data-amp-bind-x="foo"` en lugar de `[x]="foo"`.

# Atributos específicos de los elementos <a name="element-specific-attributes"></a>

Solo se admiten los bindings a los siguientes componentes y atributos:

<table>
  <tr>
    <th>Componente</th>
    <th>Atributos</th>
    <th>Comportamiento</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>&lt;amp-brightcove&gt;</code></td>
    <td class="col-fourty"><code>[data-account]</code><br><code>[data-embed]</code><br><code>[data-player]</code><br><code>[data-player-id]</code><br><code>[data-playlist-id]</code><br><code>[data-video-id]</code></td>
    <td class="col-thirty">Cambia el vídeo de Brightcove que se muestra.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-carousel type=slides&gt;</code></td>
    <td><code>[slide]</code><sup>*</sup></td>
    <td>Cambia el índice de diapositiva que se muestra actualmente. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Ver un ejemplo</a></td>
  </tr>
  <tr>
    <td><code>&lt;amp-date-picker&gt;</code></td>
    <td>
      <code>[min]</code><br>
      <code>[max]</code>
    </td>
    <td>
      Define la fecha más temprana que se puede seleccionar.<br>
      Define la fecha más tardía que se puede seleccionar.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-google-document-embed&gt;</code></td>
    <td><code>[src]</code><br><code>[title]</code></td>
    <td>Muestra el documento en la URL actualizada.<br>Cambia el título del documento.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-iframe&gt;</code></td>
    <td><code>[src]</code></td>
    <td>Cambia la URL de origen del iframe.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-img&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[src]</code><br><code>[srcset]</code></td>
    <td>Al hacer un binding a <code>[src]</code>, asegúrate de hacerlo también a <code>[srcset]</code> para que el funcione en caché.<br>Consulta los <a href="amp-img.md#attributes">atributos de "amp-img"</a> correspondientes.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-lightbox&gt;</code></td>
    <td><code>[open]</code><sup>*</sup></td>
    <td>
      Muestra u oculta el lightbox. Consejo: Utiliza <code>on="lightboxClose: AMP.setState(...)"</code> para actualizar las variables cuando el lightbox esté cerrado.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-list&gt;</code></td>
    <td><code>[src]</code></td>
    <td>
      Si la expresión es una cadena, recupera y renderiza un JSON de la URL de la cadena; si es un objeto o una matriz, renderiza los datos de la expresión.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-selector&gt;</code></td>
    <td><code>[selected]</code><sup>*</sup><br><code>[disabled]</code></td>
    <td>Cambia los elementos secundarios seleccionados actualmente<br>identificados por sus valores de atributo <code>option</code>. Admite una lista de valores separados por comas si hay varios elementos seleccionados. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Ver un ejemplo</a></td>
  </tr>
  <tr>
    <td><code>&lt;amp-state&gt;</code></td>
    <td><code>[src]</code></td>
    <td>Recupera un JSON de la nueva URL y lo combina con el estado que ya existe. <em>Ten en cuenta que la siguiente actualización ignorará los elementos <code>&lt;amp-state&gt;</code> para evitar los ciclos.</em></td>
  </tr>
  <tr>
    <td><code>&lt;amp-video&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[controls]</code><br><code>[loop]</code><br><code>[poster]</code><br><code>[preload]</code><br><code>[src]</code></td>
    <td>Consulta los <a href="amp-video.md#attributes">atributos de "amp-video"</a> correspondientes.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-youtube&gt;</code></td>
    <td><code>[data-videoid]</code></td>
    <td>Cambia el vídeo de YouTube que se muestra.</td>
  </tr>
  <tr>
    <td><code>&lt;a&gt;</code></td>
    <td><code>[href]</code></td>
    <td>Cambia el enlace.</td>
  </tr>
  <tr>
    <td><code>&lt;button&gt;</code></td>
    <td><code>[disabled]</code><br><code>[type]</code><br><code>[value]</code></td>
    <td>Consulta los <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes">atributos de "button"</a> correspondientes.</td>
  </tr>
  <tr>
    <td><code>&lt;details&gt;</code></td>
    <td><code>[open]</code></td>
    <td>Consulta los <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#Attributes">atributos de "details"</a> correspondientes.</td>
  </tr>
  <tr>
    <td><code>&lt;fieldset&gt;</code></td>
    <td><code>[disabled]</code></td>
    <td>Habilita o inhabilita el elemento "fieldset".</td>
  </tr>
  <tr>
    <td><code>&lt;image&gt;</code></td>
    <td><code>[xlink:href]</code><br>
      <td> Consulta los <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image">atributos de "image"</a> correspondientes.</td>
    </tr>
    <tr>
      <td><code>&lt;input&gt;</code></td>
      <td><code>[accept]</code><br><code>[accessKey]</code><br><code>[autocomplete]</code><br><code>[checked]</code><br><code>[disabled]</code><br><code>[height]</code><br><code>[inputmode]</code><br><code>[max]</code><br><code>[maxlength]</code><br><code>[min]</code><br><code>[minlength]</code><br><code>[multiple]</code><br><code>[pattern]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[selectiondirection]</code><br><code>[size]</code><br><code>[spellcheck]</code><br><code>[step]</code><br><code>[type]</code><br><code>[value]</code><br><code>[width]</code></td>
      <td>Consulta los <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">atributos de "input"</a> correspondientes.</td>
    </tr>
    <tr>
      <td><code>&lt;option&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code><br><code>[selected]</code><br><code>[value]</code></td>
      <td>Consulta los <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#Attributes">atributos de "options"</a> correspondientes.</td>
    </tr>
    <tr>
      <td><code>&lt;optgroup&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code></td>
      <td>Consulta los <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup#Attributes">atributos de "optgroup"</a> correspondientes</td>
    </tr>
    <tr>
      <td><code>&lt;select&gt;</code></td>
      <td><code>[autofocus]</code><br><code>[disabled]</code><br><code>[multiple]</code><br><code>[required]</code><br><code>[size]</code></td>
      <td>Consulta <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#Attributes">los atributos de "select"</a> correspondientes.</td>
    </tr>
    <tr>
      <td><code>&lt;source&gt;</code></td>
      <td><code>[src]</code><br><code>[type]</code></td>
      <td>Consulta los <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#Attributes">atributos de "source"</a> correspondientes.</td>
    </tr>
    <tr>
      <td><code>&lt;track&gt;</code></td>
      <td><code>[label]</code><br><code>[src]</code><br><code>[srclang]</code></td>
      <td>Consulta los <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track#Attributes">atributos de "track"</a> correspondientes.</td>
    </tr>
    <tr>
      <td><code>&lt;textarea&gt;</code></td>
      <td><code>[autocomplete]</code><br><code>[autofocus]</code><br><code>[cols]</code><br><code>[disabled]</code><br><code>[maxlength]</code><br><code>[minlength]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[rows]</code><br><code>[selectiondirection]</code><br><code>[selectionend]</code><br><code>[selectionstart]</code><br><code>[spellcheck]</code><br><code>[wrap]</code></td>
      <td>Consulta los <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#Attributes">atributos de "textarea"</a> correspondientes.</td>
    </tr>
  </table>

  <sup>*</sup> Indica atributos vinculables que no tienen contrapartida que no se pueda vincular.

# Depuración <a name="debugging"></a>

Haz las pruebas en modo de desarrollo (con el fragmento de URL `#development=1`) para hacer que se resalten los mensajes de advertencia y error durante el desarrollo y para acceder a funciones de depuración especiales.

# Advertencias <a name="warnings"></a>

En el modo de desarrollo, `amp-bind` enviará una advertencia cuando el valor predeterminado de un atributo vinculado no coincida con el resultado inicial de su expresión correspondiente.  Esto puede evitar mutaciones no deseadas causadas por cambios en otras variables de estado. Por ejemplo:

```html
<!-- El valor de clase predeterminado del elemento ('def') no coincide con el resultado de la expresión [class] ('abc'), por lo que se emitirá una advertencia en el modo de desarrollo. -->

<p class="def" [class]="'abc'"></p>

```

En el modo de desarrollo, `amp-bind` también enviará una advertencia cuando se eliminen referencias a variables o propiedades no definidas. Esto también puede evitar mutaciones no deseadas debidas a resultados de expresión `null`. Por ejemplo:

```html
<amp-state id="myAmpState">
  <script type="application/json">
    { "foo": 123 }
</script>
</amp-state></p>

<!-- amp-state#myAmpState no tiene una variable `bar`, por lo que se emitirá una advertencia en el modo de desarrollo. -->

<p [text]="myAmpState.bar">Un texto de marcador de posición.</p>

```

# Errores <a name="errors"></a>

Hay varios tipos de errores de tiempo de ejecución que se pueden encontrar al trabajar con `amp-bind`.

<table>
  <tr>
    <th>Tipo</th>
    <th>SMS</th>
    <th>Sugerencia</th>
  </tr>
  <tr>
    <td class="col-thirty">Binding no válido</td>
    <td class="col-fourty"><em>No se permite el binding a [someBogusAttribute] en &lt;P></em>.</td>
    <td class="col-thirty">Utiliza solo <a href="#element-specific-attributes">bindings incluidos en la lista blanca</a>.</td>
  </tr>
  <tr>
    <td>Error de sintaxis</td>
    <td><em>Se ha producido un error de compilación de expresiones en...</em></td>
    <td>Comprueba que la expresión no tiene erratas.</td>
  </tr>
  <tr>
    <td>Funciones no incluidas en la lista blanca</td>
    <td><em>La función alert no es compatible.</em></td>
    <td>Utiliza solo <a href="#allow-listed-functions">funciones incluidas en la lista blanca</a>.</td>
  </tr>
  <tr>
    <td>Resultado depurado</td>
    <td><em>"javascript:alert(1)" no es un resultado válido para [href].</em></td>
    <td>Evita los protocolos de URL prohibidos o las expresiones que no admita AMP Validator.</td>
  </tr>
  <tr>
    <td>Infracción de la política de seguridad de contenido</td>
    <td><em>No se ha podido crear un worker mediante 'blob:...' porque infringe la siguiente directiva de la política de seguridad de contenido...</em></td>
    <td>Añade <code>default-src blob:</code> a la política de seguridad de contenido de tu origen. <code>amp-bind</code> delega trabajo costoso a un <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Dedicated_workers">Web Worker dedicado</a> para garantizar un buen rendimiento.</td>
  </tr>
</table>

# Estado de depuración <a name="debugging-state"></a>

Utiliza `AMP.printState()` para imprimir el estado actual en la consola.

# Apéndice <a name="appendix"></a>

# Especificación de `<amp-state>` <a name="amp-state-specification"></a>

Un elemento `amp-state` puede contener un elemento secundario `<script>` ****o bien un atributo `src` que contenga una URL CORS de un punto final remoto JSON, pero no ambos.

```html
<amp-state id="myLocalState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state></p>

<p><amp-state id="myRemoteState" src="https://data.com/articles.json">
</amp-state>
```

# Procesamiento por lotes de XHR <a name="xhr-batching"></a>

AMP envía XMLHttpRequests (XHR) por lotes a puntos de conexión JSON. Es decir, puedes utilizar una sola solicitud de datos JSON como fuente de datos para varios consumidores (p. ej., varios elementos `amp-state`) en una página AMP.  Por ejemplo, si tu elemento `amp-state` hace un XHR a un punto de conexión, y mientras esté procesándose, los XHR posteriores que se hagan al mismo punto de conexión no se activarán, y devolverán en su lugar los resultados del primer XHR.

# Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>URL del punto de conexión remoto que devolverá el JSON que actualizará este <code>amp-state</code>. Debe ser un servicio CORS HTTP.
        El atributo <code>src</code> admite todas las sustituciones estándar de variables de URL. Para obtener más información, consulta la <a href="https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md">guía de sustituciones</a>.
        [tip type="important"]
      El punto de conexión debe implementar los requisitos que se detallan en la <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md">especificación de las solicitudes CORS de AMP</a>.
      [/tip]</td>
  </tr>
  <tr>
    <td width="40%"><strong>credentials (opcional)</strong></td>
    <td>Define una opción <code>credentials</code> tal y como especifica la <a href="https://fetch.spec.whatwg.org/">API de Fetch</a>.
      <ul>
        <li>Valores admitidos: `omit` e `include`</li>
        <li>Valores predeterminados: `omit`</li>
      </ul>
      Para enviar credenciales, transfiere el valor de <code>include</code>. Si se define este valor, la respuesta debe seguir las <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp">directrices de seguridad de AMP CORS</a>.</td>
    </tr>
  </table>

# Combinar con deepmerge mediante `AMP.setState()` <a name="deep-merge-with-ampsetstate"></a>

Cuando se hace una llamada a `AMP.setState()`, `amp-bind` lleva a cabo una combinación con deepmerge y fusiona la literal del objeto con el estado actual. Todas las variables de la literal del objeto se añaden directamente al estado, excepto los objetos anidados, que se fusionan de forma recursiva. Los primitivos y las matrices que se encuentran en el estado siempre se sobrescriben en la literal del objeto con variables del mismo nombre.

Observa el siguiente ejemplo:

```javascript
{
  <!-- State is empty -->
  }
```

```html
<button on="tap:AMP.setState({employee: {name: 'John Smith', age: 47, vehicle: 'Car'}})"...></button>
<button on="tap:AMP.setState({employee: {age: 64}})"...></button>
```

Cuando se pulsa el primer botón, el estado cambia a:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 47,
    vehicle: 'Car',
    }
  }
```

Cuando se pulse el segundo botón, `amp-bind` combinará de forma recursiva el argumento de la literal del objeto, `{employee: {age: 64}}`, con el estado existente.

```javascript
{
  employee: {
    name: 'John Smith',
    age: 64,
    vehicle: 'Car',
    }
  }
```

Se ha actualizado `employee.age`, pero las claves `employee.name` y `employee.vehicle` no han cambiado.

Ten en cuenta que `amp-bind` generará un error si haces una llamada a `AMP.setState()` utilizando una literal de objeto que contiene referencias circulares.

# Eliminar una variable <a name="circular-references"></a>

Puedes eliminar una variable de estado existente definiendo su valor como `null` en `AMP.setState()`. Empezando por el estado del ejemplo anterior, si se pulsa:

```html
<button on="tap:AMP.setState({employee: {vehicle: null}})"...></button>
```

El estado cambiará a:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 48,
    }
  }
```

Veamos otro ejemplo parecido:

```html
<button on="tap:AMP.setState({employee: null})"...></button>
```

Pulsando el botón, el estado cambiará a:

```javascript
{
  <!-- State is empty -->
  }
```

# Gramática de las expresiones <a name="expression-grammar"></a>

Esta es la gramática para las expresiones de `amp-bind`, similar a BNF:

```text
expr:
operation
| invocation
| member_access
| '(' expr ')'
| variable
| literal

operation:
    !' expr
    | '-' expr
    | '+' expr
    | expr '+' expr
    | expr '-' expr
    | expr '*' expr
    | expr '/' expr
    | expr '%' expr
    | expr '&&' expr
    | expr '||' expr
    | expr '<=' expr
    | expr '<' expr
    | expr '>=' expr
    | expr '>' expr
    | expr '!=' expr
    | expr '==' expr
    | expr '?' expr ':' expr

    invocation:
      expr '.' NAME args

    args:
        (' ')'
        | '(' array ')'
        ;

      member_access:
          expr member
          ;

        member:
            .' NAME
            | '[' expr ']'

          variable:
              NAME
              ;

            literal:
                STRING
                | NUMBER
                | TRUE
                | FALSE
                | NULL
                | object_literal
                | array_literal

              array_literal:
                  [' ']'
                  | '[' array ']'

                array:
                    expr
                    | array ',' expr

                  object_literal:
                      {' '}'
                      | '{' object '}'

                    object:
                        key_value
                        | object ',' key_value

                      key_value:
                          expr ':' expr
```
