---
$title: Información detallada sobre Analytics para AMP
---

Esta guía analiza en profundidad el
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md),
dividiendo una configuración [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) de ejemplo en los siguientes elementos básicos:

En el resto de la guía usaremos este ejemplo de configuración,
que realiza un seguimiento de las páginas vistas y los clics de los usuarios en los enlaces.
Además, envía los datos de analíticas al proveedor externo,
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
```

[tip type="note"]

El código anterior solo es un ejemplo para ayudarte a aprender, pero no es una muestra realista. Si trabajas con proveedores de analíticas, es probable que este ejemplo no tenga sentido, ya que las configuraciones de los proveedores eliminan la complejidad. Consulta la [documentación de tu proveedor de analíticas](analytics-vendors.md) para ver configuraciones de ejemplo.
[/tip]

## Dónde se enviarán los datos de analíticas: el atributo type

El diseño de AMP admite dos patrones habituales de recogida de datos:

* Un punto de conexión de un editor realiza una ingestión para sistemas de analíticas propios.
* Un punto de conexión de un proveedor realiza una ingestión para interactuar con una solución de proveedor.
(por ejemplo, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/) o [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

Para enviar datos de analíticas a un proveedor,
incluye el atributo `type` en la etiqueta [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) y define el valor
según el proveedor correspondiente, tal como se indica en la lista
[Proveedores Analytics](analytics-vendors.md).

Por ejemplo: `<amp-analytics type="googleanalytics">` envía datos de analíticas
al proveedor de analíticas externo Google Analytics.
Para enviar datos a un punto de conexión de un editor,
no incluyas el atributo `type`;
así, los datos de analíticas se enviarán a los puntos de conexión definidos para cada
[solicitud](deep_dive_analytics.md#what-data-gets-sent-requests-attribute).

Las configuraciones de los proveedores de analíticas son una forma rápida
de dar los primeros pasos con [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
Consulta la documentación de tu proveedor y
los recursos de ayuda para obtener más información.
Como hemos indicado antes,
la lista de proveedores que ya están integrados en AMP, así como los enlaces
a sus documentaciones, están disponibles en la lista
[Proveedores Analytics](analytics-vendors.md).

Si eres un proveedor de analíticas,
puedes obtener más información sobre
[la integración de tu configuración de analíticas en AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Cargar configuraciones remotas con el atributo config

No es necesario que incluyas toda la configuración
de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) en la página AMP;
puedes usar una URL remota
para todas las configuraciones o parte de ellas.

De esta forma puedes, por ejemplo, cambiar la configuración
en función de una solicitud específica.
Si, como editor, controlas el archivo remoto,
puedes realizar cualquier procesamiento de servidor necesario
para generar los datos de configuración.

El primer paso para cargar configuraciones remotas es
incluir el atributo config en la etiqueta [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

El siguiente paso es crear el contenido JSON ubicado en la URL remota.
En este ejemplo sencillo,
la configuración que contiene el objeto JSON es el valor de la variable de la cuenta de Analytics.

Contenido de ejemplo en `https://example.com/analytics.account.config.json`:

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Sustitúyelo por el ID de tu propiedad
  }
}
```

El paso final es asegurarse de que el contenido del archivo remoto se transfiere
al lugar correcto de la configuración [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
En estas solicitudes `pageview` y `event`,
el valor de la variable `account` se define automáticamente
según el valor de la cuenta de la URL remota (`"account": "UA-XXXXX-Y"`):

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

[tip type="important"]

AMP no realiza validaciones comparando diversos usos de una misma variable.
Los valores se asignan siguiendo un orden de preferencia de sustitución de variables,
y los valores de las URL remotas tienen prioridad (consulta [Orden de sustitución de variables](deep_dive_analytics.md#variable-substitution-ordering)).

[/tip]

## Los atributos requests, triggers y transports <a name="requests-triggers--transports"></a>

El atributo `requests` define qué datos se envían
(por ejemplo, `pageviews` o `events`)
y dónde se envían (las URL usadas para transmitir datos).

El atributo `triggers` define cuándo se deben enviar los datos de analíticas;
por ejemplo, cuando un usuario vea una página o haga clic en un enlace.

El atributo `transport` define cómo enviar una solicitud;
en concreto, define el protocolo.

Continúa leyendo para obtener más información sobre estas configuraciones.
También puedes consultar información sobre estas configuraciones en la
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)

### Seleccionar los datos que se envían con el atributo requests <a name="what-data-gets-sent-requests-attribute"></a>

El atributo `request-name` se usa en la configuración del activador para especificar
qué solicitud debe enviarse como respuesta a un evento concreto.
El atributo `request-value` es una URL `https`.
Es posible que estos valores incluyan tokens marcadores de posición
que pueden hacer referencia a otras solicitudes o variables.

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Algunos proveedores de analíticas (incluido Google Analytics)
ya han proporcionado una configuración,
que puedes usar mediante el atributo `type`.
Si usas un proveedor de analíticas,
es posible que no tengas que incluir la información de `requests`.
Consulta la información de tu proveedor para saber si
es necesario configurar `requests` y cómo hacerlo.

#### Añadir una URL de solicitud con el atributo extraUrlParams

El atributo [extraUrlParams](../../../../documentation/components/reference/amp-analytics.md#extra-url-params)
define parámetros adicionales que se añaden a la cadena de consulta de la URL de solicitud a través de la convención habitual "&foo=baz".

El ejemplo [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) añade un parámetro adicional `cd1`
a la solicitud y define "AMP" como valor del parámetro:

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### Definir cuándo se envían los datos mediante el atributo triggers

El atributo `triggers` define cuándo se debe enviar una solicitud de analíticas.
Contiene un par clave-valor: nombre del activador y configuración del activador.
El nombre del activador puede ser cualquier cadena formada
por caracteres alfanuméricos (a-zA-Z0-9).

Por ejemplo,
el siguiente elemento [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) está configurado para enviar una solicitud a
`https://example.com/analytics` cuando el documento se cargue por primera vez
y cada vez que se haga clic en una etiqueta `a`:

```js
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
  "trackAnchorClicks": {
    "on": "click",
    "selector": "a",
    "request": "event",
    "vars": {
      "eventId": "42",
      "eventLabel": "clicked on a link"
    }
  }
}
```

[tip type="important"]
 El método anterior solo se recomienda para páginas AMP, no para anuncios AMPHTML. Como la prioridad de las analíticas es inferior a la del contenido de la página, se recomienda hacer un seguimiento de los clics mediante una redirección de navegador para evitar que se pierdan clics.
[/tip]

AMP admite las siguientes configuraciones de activador:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Configuración del activador</th>
      <th data-th="Description">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (obligatorio)</td>
      <td data-th="Description">El evento para el que se procesa. Los valores correctos son: <code>click</code>, <code>scroll</code>, <code>timer</code> y <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (obligatorio)</td>
      <td data-th="Description">Nombre de la solicitud para enviar (tal como se especifica en las <a href="deep_dive_analytics.md#what-data-gets-sent-requests-attribute">solicitudes</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Un objeto con pares clave-valor que se usan para anular <code>vars</code> definidos en la configuración de máximo nivel o para especificar <code>vars</code> únicos de este activador (consulta <a href="deep_dive_analytics.md#variable-substitution-ordering">Orden de sustitución de variables</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (obligatorio si el valor de <code>on</code> es <code>click</code>)</td>
      <td data-th="Description">Un selector CSS usado para filtrar los elementos incluidos en el seguimiento. Usa el valor <code>*</code> para hacer un seguimiento de todos los elementos. Esta configuración se usa junto con el activador <code>click</code>. Aprende a usar el selector para <a href="use_cases.md#tracking-page-clicks">hacer un seguimiento de clics de páginas</a> e <a href="use_cases.md#tracking-social-interactions">interacciones sociales</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (obligatorio si el valor de <code>on</code> es <code>scroll</code>)</td>
      <td data-th="Description">Controla en qué condiciones se activará el evento <code>scroll</code> cuando el usuario se desplace por la página. Este objeto puede contener <code>verticalBoundaries</code> y <code>horizontalBoundaries</code>. Se necesita al menos una de las dos propiedades para activar el evento <code>scroll</code>. Los valores de las dos propiedades deben ser matrices de números que contengan los límites en los que se genera un evento de desplazamiento. Consulta este ejemplo de <a href="use_cases.md#tracking-scrolling">hacer un seguimiento de los desplazamientos</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (obligatorio si el valor de <code>on</code> es <code>timer</code>)</td>
      <td data-th="Description">Controla cuándo se activa el evento <code>timer</code>. El temporizador se activará inmediatamente y después lo hará según el intervalo definido. Esta configuración se usa junto con el activador <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

[tip type="important"]

Los activadores de una configuración de prioridad inferior quedan anulados por los activadores con los mismos nombres de una configuración que tenga una prioridad superior (consulta [Orden de sustitución de variables](deep_dive_analytics.md#variable-substitution-ordering)).

[/tip]

### Definir cómo se envían los datos mediante el atributo transport

El atributo `transport` define cómo enviar una solicitud.
Los tres métodos siguientes están habilitados de forma predeterminada:

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Método de transporte</th>
      <th data-th="Description">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Indica que <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> puede usarse para transmitir la solicitud. Enviará una solicitud <code>POST</code> con credenciales y un cuerpo vacío.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Indica que <code>XMLHttpRequest</code> puede usarse para transmitir la solicitud. Enviará una solicitud <code>POST</code> con credenciales y un cuerpo vacío.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Indica que la solicitud se puede enviar generando una etiqueta <code>Image</code>. Se enviará una solicitud <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Solo se usará el método de transporte
con la prioridad más alta
que esté habilitado, permitido y disponible.
El orden de prioridad es `beacon` > `xhrpost` > `image`.
Si el agente de usuario del cliente no admite un método,
se usará el siguiente método de mayor prioridad.

Solo debes incluir el atributo `transport` en tu configuración
si quieres limitar las opciones de transporte.
En caso contrario, es posible que detengas solicitudes.

En el ejemplo siguiente,
el valor de `beacon` y `xhrpost` es "false",
así que, aunque su prioridad sea mayor que la de `image`, no se usarán.
Si el agente de usuario del cliente admite el método `image`,
se usará; si no, no se enviará ninguna solicitud.

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## Orden de sustitución de variables <a name="variable-substitution-ordering"></a>

AMP asigna valores a las variables según un orden de prioridades:

1. Configuraciones remotas (mediante `config`).
2. `vars` anidado en un activador en `triggers`.
3. `vars` en el nivel más alto anidado en [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
4. Valores proporcionados por plataformas.

En este ejemplo hay una configuración remota,
variables definidas en el nivel más alto, en activadores y en el nivel de plataforma:

```html
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
```

Si se ha definido el mismo `var` en varias ubicaciones,
el orden de prioridad de las variables definirá su valor una vez.
Así, si la configuración remota ha definido `account` como UA-XXXXX-Y en el ejemplo anterior,
los valores de algunas variables se mostrarán de las siguiente manera:

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">Valor</th>
      <th data-th="Defined By" class="col-thirty">Definido por</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">Plataforma</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">Activador</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Configuración remota</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Activador</td>
    </tr>
  </tbody>
</table>
