---
$title: amp-list
$category@: dynamic-content
teaser:
  text: Descarga datos de forma dinámica y crea elementos de lista mediante una plantilla.
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



Obtiene contenido de forma dinámica desde un punto de conexión CORS JSON y lo renderiza mediante una plantilla proporcionada.

<table>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay y responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Ejemplos</strong></td>
    <td>Consulta el <a href="https://ampbyexample.com/components/amp-list/">ejemplo de amp-list</a> de AMP By Example.</td>
  </tr>
</table>

## Uso <a name="usage"></a>

El componente `<amp-list>` obtiene contenido dinámico de un punto final CORS JSON. La respuesta del punto de conexión contiene datos que se renderizan en la plantilla especificada.

[tip type="important"]
El punto de conexión debe implementar los requisitos que se detallan en la [especificación de las solicitudes CORS de AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).
[/tip]

Puedes especificar una plantilla de dos formas:

* Mediante un atributo `template` que haga referencia al ID de un elemento `template` o `script` existente.
* Mediante un elemento `template` o `script` anidado directamente en `amp-list`.

Para obtener más información sobre las plantillas, consulta el documento sobre [plantillas AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-templates.md).

*Ejemplo: Mostrar una lista dinámica*

En el siguiente ejemplo, hemos recuperado datos JSON que contienen URL y títulos, y renderizamos el contenido para mostrar una [plantilla de amp-mustache](amp-mustache.md) anidada.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
  {% endraw %}</template>
</amp-list>
```
[/example]

Este es el archivo JSON que hemos utilizado:

```json
{
 "items": [
   {
     "title": "AMP YouTube Channel",
     "url": "https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw"
   },
   {
     "title": "AMP.dev",
     "url": "https://amp.dev/"
   },
   {
     "title": "AMP Validator",
     "url": "https://validator.amp.dev/"
   },
   {
     "title": "AMP Playground",
     "url": "https://playground.amp.dev/"
   }
 ]
}
```
Así es como hemos aplicado un estilo al contenido obtenido:

```css
amp-list div[role="list"] {
  display: grid;
  grid-gap: 0.5em;
  }
```

## Comportamiento <a name="behavior"></a>

La solicitud siempre la realiza el cliente, aunque el documento se haya servido desde AMP Cache. La carga se activa mediante reglas de AMP normales en función de la distancia a la que está el elemento del viewport actual.

Si `<amp-list>` necesita más espacio después de la carga, solicita al tiempo de ejecución de AMP que actualice su altura mediante el flujo normal de AMP. Si el tiempo de ejecución de AMP no puede aceptar dicha solicitud, mostrará el elemento `overflow` si está disponible. No obstante, ten en cuenta que los elementos `<amp-list>` suelen estar colocados en la parte inferior del documento, lo que casi siempre garantiza que el tiempo de ejecución de AMP pueda modificar su tamaño.

De forma predeterminada, `<amp-list>` añade una función de ARIA `list` al elemento de lista y una función `listitem` a los elementos renderizados mediante la plantilla.

### Procesamiento por lotes de XHR <a name="xhr-batching"></a>

AMP envía XMLHttpRequests (XHR) por lotes a puntos de conexión JSON. Es decir, puedes utilizar una sola solicitud de datos JSON como fuente de datos para varios consumidores (p. ej., varios elementos `<amp-list>`) en una página AMP.  Por ejemplo, si tu `<amp-list>` hace un XHR a un punto de conexión, y mientras esté procesándose, los XHR posteriores que se hagan al mismo punto de conexión no se activarán, y devolverán en su lugar los resultados del primer XHR.

Con `<amp-list>`, puedes utilizar el atributo [`items`](#items-optional) para renderizar un subconjunto de la respuesta JSON, lo que te permite tener varios elementos `<amp-list>` que muestren contenido diferente pero que compartan el mismo XHR.

### Especificar un desbordamiento <a name="specifying-an-overflow"></a>

De forma opcional, `<amp-list>` puede contener un elemento con un atributo `overflow`. Este elemento se muestra si el tiempo de ejecución de AMP no puede cambiar el tamaño del elemento `<amp-list>` tras haberse solicitado.

*Ejemplo: Mostrar un desbordamiento cuando la lista necesita más espacio*

En el siguiente ejemplo, hacemos que se muestre una lista de imágenes y títulos. Debido a que el contenido de `<amp-list>` requiere más espacio del que hay disponible, el tiempo de ejecución de AMP muestra el elemento de desbordamiento.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="140"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-data.json">
  <template type="amp-mustache">{% raw %}
    <div class="image-entry">
      <amp-img src="{{imageUrl}}"
        width="100"
        height="75"></amp-img>
      <span class="image-title">{{title}}</span>
    </div>
  {% endraw %}</template>
  <div overflow
    class="list-overflow">
    See more
  </div>
</amp-list>
```
[/example]

Este es el CSS de `overflow`:

```css
.list-overflow[overflow] {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  }
```

### Marcador de posición y respaldo <a name="placeholder-and-fallback"></a>

`<amp-list>` admite de manera opcional un marcador de posición o un respaldo.

* Un *marcador de posición* es un elemento secundario con el atributo `placeholder`. Este elemento se muestra hasta que `<amp-list>` se carga correctamente. Si también se proporciona un respaldo, el marcador de posición se oculta si no se carga `<amp-list>`.
* Un *respaldo* es un elemento secundario con el atributo `fallback`. Este elemento se muestra si no se carga `<amp-list>`.

Obtén más información sobre los [marcadores de posición y los respaldos](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). Ten en cuenta que un elemento secundario no puede funcionar a la vez como marcador de posición y como respaldo.

```html
<amp-list src="https://foo.com/list.json">
  <div placeholder>Loading ...</div>
  <div fallback>Failed to load data.</div>
</amp-list>
```

### Actualizar datos <a name="refreshing-data"></a>

El elemento `<amp-list>` expone una acción `refresh` a la que pueden hacer referencia otros elementos en los atributos `on="tap:..."`.

```html
{% raw %}<button on="tap:myList.refresh">Refresh List</button>
<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}
```

### Cambiar de tamaño de forma dinámica <a name="dynamic-resizing"></a>

##### Experimento: amp-list-resizable-children <a name="experiment-amp-list-resizable-children"></a>

En algunos casos, puede que necesitemos que `<amp-list>` cambie de tamaño en función de la interacción del usuario. Por ejemplo, cuando ``contiene un componente amp-accordion en el que el usuario puede tocar, cuando ``su contenido cambia debido a clases de CSS vinculadas o cuando al número de elementos que contiene cambia debido a un atributo `[src]` vinculado. Para lograrlo, la acción `changeToLayoutContainer` cambia la lista de amp a `layout="CONTAINER"` al activar esta acción. Echa un vistazo al siguiente ejemplo:

```html
{% raw %}<button on="list.changeToLayoutContainer()">Show Grid</button>
  <amp-list id="list" width="396" height="80" layout="responsive" src="/test/manual/amp-list-data.json?RANDOM">
    <template type="amp-mustache">
      {{title}}
    </template>
  </amp-list>
{% endraw %}
```

Esta acción está disponible para su uso experimental en `amp-list-resizable-children`.

## Atributos <a name="attributes"></a>

##### src (obligatorio) <a name="src-required"></a>

La URL del punto de conexión remoto que devuelve el JSON que se renderizará en esta `<amp-list>`. Debe ser un servicio CORS HTTP y con protocolo de URL HTTPS.

[tip type="important"]
El punto de conexión debe implementar los requisitos que se detallan en la [especificación de las solicitudes CORS de AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).
[/tip]

El atributo `src` se puede omitir si está presente el atributo `[src]`. Esta omisión resulta útil cuando se trabaja con [`amp-bind`](amp-bind.md), para renderizar contenido en respuesta a un gesto del usuario en lugar de al cargar la página.

##### credentials (opcional) <a name="credentials-optional"></a>

Define una opción `credentials` tal y como especifica la [API de Fetch](https://fetch.spec.whatwg.org/).

* Valores admitidos: `omit` , `include`
* Valores predeterminados: `omit`

Para enviar credenciales, transfiere el valor de `include`. Si se define este valor, la respuesta debe seguir las [directrices de seguridad de AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

A continuación, se muestra un ejemplo que define que se deben incluir credenciales para poder mostrar contenido personalizado en una lista:

```html
{% raw %}<amp-list credentials="include"
    src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${{price}}
  </template>
</amp-list>
{% endraw %}
```

##### items (opcional) <a name="items-optional"></a>

Define la expresión que localizará la matriz que se va a procesar en la respuesta. Es una expresión con notación de puntos que navega a través de los campos de la respuesta JSON.
`<amp-list>` espera una matriz de forma predeterminada; el atributo `single-item` se puede utilizar para cargar datos desde un objeto.

* El valor predeterminado es `"items"`. La respuesta esperada es: `{items: [...]}`.
* Si la respuesta en sí es la matriz deseada, utiliza el valor `"."`. La respuesta esperada es: `[...]`.
* Se admite la navegación anidada (por ejemplo, `"field1.field2"`). La respuesta esperada es: `{field1: {field2: [...]}}`.

Cuando se especifica `items="items"`, que es el valor predeterminado, la respuesta debe ser un objeto JSON que contenga una propiedad de matriz denominada `"items"`:
```text
{
  "items": [...]
}
```

#### max-items (opcional) <a name="max-items-optional"></a>

Un valor de número entero que especifica la longitud máxima de la matriz de elementos que se va a renderizar.
La matriz `items` se truncará al número de entradas de `max-items` si el valor devuelto supera el valor permitido.

#### single-item (opcional) <a name="single-item-optional"></a>

Hace que `<amp-list>` trate el resultado devuelto como si fuera una matriz de un solo elemento. Se encapsulará una respuesta de objeto en una matriz, por lo que `{items: {...}}` se comportará como si fuera `{items: [{...}]}`.

#### reset-on-refresh (opcional) <a name="reset-on-refresh-optional"></a>

Muestra un indicador de carga y un marcador de posición de nuevo cuando la fuente de la lista se actualiza mediante `amp-bind` o la acción `refresh()`.

De forma predeterminada, solo se activará cuando se produzca una actualización que provoque una recuperación de red. Para que se active tras cualquier tipo de actualización, utiliza `reset-on-refresh="always"`.

#### [is-layout-container] (atributo experimental, opcional) <a name="binding-optional"></a>

Se trata de un atributo vinculable que debe ser "false" de forma predeterminada. Si se establece en "true" a través de `bind`, cambia el diseño de `<amp-list>` a `CONTAINER`. Este atributo es útil para lograr que se modifique el tamaño de amp-list de forma dinámica; no puede ser "true" de forma predeterminada porque `<amp-list>` no admite el formato `CONTAINER`, ya que puede provocar que el contenido se desplace al cargarse por primera vez. Este atributo está disponible para su uso experimental en `amp-list-resizable-children`. También se puede utilizar la acción `changeToLayoutContainer`.

#### binding (opcional) <a name="is-layout-container-optional"></a>

En las páginas que utilizan `<amp-list>` y `amp-bind`, este atributo controla si se bloquea o no el renderizado para evaluar los bindings (por ejemplo, `[text]`) de los elementos secundarios ya renderizados.

Para lograr un mayor rendimiento, recomendamos utilizar `binding="no"` o `binding="refresh"`.

* `binding="no"`: nunca se bloquea el renderizado **(opción más rápida)**.
* `binding="refresh"`: no se bloquea el renderizado en la carga inicial **(opción rápida)**.
* `binding="always"`: siempre se bloquea el renderizado **(opción lenta)**.

Si no se proporciona el atributo `binding`, el valor predeterminado es `always`.

## Experimento: Cargar más y desplazamiento infinito (amp-list-load-more) <a name="common-attributes"></a>

Hemos introducido los atributos `load-more` con las opciones [manual](https://cdn.ampproject.org/experiments.html) y `auto` para que se pueda aplicar la paginación y el desplazamiento infinito.

#### Ejemplo de uso <a name="load-more-and-infinite-scroll"></a>

```html
<amp-list height="200" src="https://my.rest.endpoint/" width="100" load-more="auto">
  <template type="amp-mustache">
    // ...
  </template>
</amp-list>

```

Para ver ejemplos prácticos, consulta las páginas [test/manual/amp-list/infinite-scroll-1.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html) y [test/manual/amp-list/infinite-scroll-2.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html).

### Atributos <a name="sample-usage"></a>

#### load-more (obligatorio) <a name="attributes-1"></a>

Este atributo admite dos valores: "auto" o "manual". Si se define el valor de este atributo en "manual", se mostrará un botón de "load-more" (cargar más) al final de `<amp-list>`. Si se define como "auto", `<amp-list>` cargará automáticamente más elementos tres viewports más abajo para conseguir un efecto de desplazamiento infinito.

#### load-more-bookmark (opcional) <a name="load-more-mandatory"></a>

Este atributo especifica en los datos devueltos el nombre del campo que proporcionará la URL para que se carguen los siguientes elementos. Si no se especifica este atributo, `<amp-list>` espera que la carga útil del JSON tenga el campo `load-more-src`, que corresponde a la siguiente URL que se debe cargar. Si este campo tiene otro nombre, puedes especificarlo mediante el campo `load-more-bookmark`. En la siguiente carga útil de ejemplo, especificaríamos `load-more-bookmark="next"`.

```
{ "items": [...], "next": "https://url.to.load" }
```

### Personalizar los elementos load-more <a name="load-more-bookmark-optional"></a>

Un componente `<amp-list>` con el atributo `load-more` contiene los siguientes elementos de UI: un botón de load-more, un cargador, un elemento de load-failed ("error al cargar") y, de manera opcional, un botón final que marca el final de la lista. Estos elementos se pueden personalizar añadiendo `<amp-list-load-more>` como elementos secundarios de `<amp-list>`, con los siguientes atributos:

#### load-more-button <a name="customizing-load-more-elements"></a>

Un elemento `<amp-list-load-more>` con el atributo `load-more-button` que aparece al final de la lista (para "load-more" con valor "manual") si quedan más elementos que cargar. Al hacer clic en este elemento, se activará una recuperación para cargar más elementos de la URL que contiene el campo `load-more-src` o del campo del atributo `load-more-bookmark` que corresponde a los datos devueltos. Este elemento se puede personalizar añadiendo un elemento secundario a `<amp-list>` que tenga el atributo `load-more-button`.

##### Ejemplo: <a name="load-more-button"></a>

```html
<amp-list load-more="manual" src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-button>
    <button>See More</button> /* My custom see more button */
  </amp-list-load-more>
</amp-list>
```
  Este elemento puede estar basado en una plantilla de `amp-mustache`.

##### Ejemplo: <a name="example"></a>

```html
{% raw %}<amp-list load-more="auto" width="100" height="500" src="https://www.load.more.example.com/">
  ...
  <amp-list-load-more load-more-button>
    <template type="amp-mustache">
      Showing {{#count}} out of {{#total}} items
      <button>
        Click here to see more!
      </button>
    </template>
  </amp-list-load-more>
</amp-list>
{% endraw %}
```

#### load-more-loading <a name="example-1"></a>

Este elemento es un cargador que se muestra si el usuario llega al final de la lista y el contenido sigue cargándose o si hace clic en el elemento `load-more-button` mientras los elementos secundarios de `<amp-list>` todavía se están cargando. Este elemento se puede personalizar añadiendo un elemento secundario a `<amp-list>` que tenga el atributo `load-more-loading`. Por ejemplo:
```html
<amp-list load-more=auto src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-loading>
    <svg>...</svg> /* My custom loader */
  </amp-list-load-more>
</amp-list>
```

#### load-more-failed <a name="load-more-loading"></a>

Un elemento `<amp-list-load-more>` con el atributo `load-more-failed`, que a su vez contiene un botón con el atributo `load-more-clickable`. Se mostrará en la parte inferior de `<amp-list>` si este no se carga. Al hacer clic en este elemento, se volverá a cargar la URL que ha tenido un error. Este elemento se puede personalizar añadiendo un elemento secundario a `<amp-list>` que tenga el atributo `load-more-failed`. Por ejemplo:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <button>Unable to Load More</button>
  </amp-list-load-more>
</amp-list>
```

En el ejemplo anterior, se puede hacer clic en todo el elemento `load-more-failed`. Sin embargo, un diseño habitual de este es un elemento general de "error de carga" en el que no se puede hacer clic y que contiene un botón de "volver a cargar" "en el que sí se puede hacer clic. Para hacerlo, puedes incluir un elemento en el que no se pueda hacer clic con un botón que contenga el elemento `load-more-clickable`. Por ejemplo:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <div>
      Here is some unclickable text saying sorry loading failed.
    </div>
    <button load-more-clickable>Click me to reload!</button>
  </amp-list-load-more>
</amp-list>
```

#### load-more-end <a name="load-more-failed"></a>

Este elemento no se proporciona de forma predeterminada, pero si un elemento `<amp-list-load-more>` con el atributo `load-more-end` se añade a `<amp-list>` como elemento secundario, aparecerá al final de `<amp-list>` cuando no queden más elementos que mostrar.  Este elemento puede estar basado en una plantilla de `amp-mustache`. Por ejemplo:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-end>
    Congratulations! You've reached the end. /* Custom load-end element */
  </amp-list-load-more>
</amp-list>
```

##### atributos comunes <a name="load-more-end"></a>

Este elemento incluye [atributos comunes](../../../documentation/guides-and-tutorials/learn/common_attributes.md) que se aplican a los componentes de AMP.

## Sustituciones <a name="substitutions"></a>

`<amp-list>` admite todas las sustituciones estándar de variables de URL.
Para obtener más información, consulta la [guía de sustituciones](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).

Por ejemplo:
```html
<amp-list src="https://foo.com/list.json?RANDOM"></amp-list>
```
puede hacer una solicitud a algo similar a `https://foo.com/list.json?0.8390278471201`. Es decir, se genera un valor RANDOM de forma aleatoria al producirse cada impresión.

## Validación <a name="validation"></a>

Consulta las [reglas de amp-list](https://github.com/ampproject/amphtml/blob/master/extensions/amp-list/validator-amp-list.protoascii) en la especificación de la herramienta de validación de AMP.
