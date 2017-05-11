---
$title: Análisis profundo de AMP Analytics
toc: true
---
[TOC]


En esta guía se analiza en detalle el
[componente amp-analytics](/docs/reference/extended/amp-analytics.html)
a través del desglose de una configuración de `amp-analytics` de ejemplo en los siguientes componentes fundamentales:

En el resto de la guía se usa esta configuración de ejemplo,
con la cual se realiza un seguimiento de las vistas de página y los clics de los usuario en diferentes vínculos,
y se envían los datos del análisis al proveedor externo,
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

[sourcecode:html]
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
[/sourcecode]

**Nota:** El código de ejemplo anterior está pensado para facilitar el aprendizaje, pero no se apoya en la realidad. Si trabajas con proveedores de herramientas de análisis, es probable que el ejemplo no tenga sentido. Las configuraciones de proveedores eliminan la complejidad. Consulta la documentación de tu proveedor de herramientas de análisis para obtener configuraciones de ejemplo.

## A dónde deben enviarse los datos de análisis: atributo “type”

AMP está diseñado para admitir dos patrones comunes de recopilación de datos:

* ingesta de un terminal del editor para sistemas de análisis internos;
* ingesta de un terminal del proveedor para la interoperabilidad con una solución del proveedor
(por ejemplo, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

Para enviar datos del análisis a un proveedor de herramientas de análisis,
incluye el atributo `type` en la etiqueta `amp-analytics` y define su valor
para el proveedor correspondiente, como se define en la
[especificación de amp-analytics](/docs/reference/extended/amp-analytics.html).

Por ejemplo: `<amp-analytics type="googleanalytics">` envía datos de análisis
al proveedor de herramientas de análisis externo, Google Analytics.
Para enviar datos a un terminal del editor,
simplemente no incluyas el atributo `type`;
los datos del análisis se envían a los terminales definidos para cada
[solicitud](/es/docs/guides/analytics/deep_dive_analytics.html#qué-datos-se-envían:-atributo-requests).

Las configuraciones del proveedor de herramientas de análisis permiten dar rápidamente
los primeros pasos con `amp-analytics`.
Consulta la documentación y los recursos de ayuda
de tu proveedor para obtener información adicional.
Como se mencionó antes,
puedes encontrar la lista de proveedores que ya realizaron la integración con AMP y también los vínculos
a su documentación específica en la
[especificación de amp-analytics](/docs/reference/extended/amp-analytics.html).

Si eres proveedor de herramientas de análisis,
puedes obtener más información acerca de la
[integración de tu propia configuración de análisis en AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Carga de la configuración remota: atributo config

No necesitas incluir la configuración completa de
`amp-analytics` en tu página de AMP.
Como alternativa, puedes llamar a una URL remota
para obtener todas las configuraciones o parte de ellas.

Esto te permite realizar acciones como modificar la configuración
en función de una solicitud específica.
Si como editor tienes control sobre el archivo remoto,
puedes realizar cualquier procesamiento en el servidor que sea necesario
para estructurar los datos de configuración.

El primer paso para cargar una configuración remota es
incluir el atributo config en la etiqueta `amp-analytics`:

[sourcecode:html]
<amp-analytics config="https://example.com/analytics.account.config.json">
[/sourcecode]

El siguiente paso es crear contenido JSON que se aloje en la URL remota.
En este ejemplo sencillo,
la configuración contenida en el objeto JSON corresponde solo al valor de la variable para la cuenta de análisis.

Ejemplo de contenido en `https://example.com/analytics.account.config.json`:

[sourcecode:html]
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
[/sourcecode]

El paso final es asegurarte de que los datos del archivo remoto se extraigan
a la ubicación correcta en la configuración de `amp-analytics`.
En las solicitudes `pageview` y `event`,
el valor de la variable `account` se define automáticamente
en el valor de la cuenta de la URL remota (`"account": "UA-XXXXX-Y"`):

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

**Importante:** AMP no valida usos múltiples de la misma variable.
Los valores se completan siguiendo un orden de preferencia de sustitución de variables
y los valores en las direcciones URL remotas son los primeros en ese orden
(consulta [Orden de sustitución de variables](/es/docs/guides/analytics/deep_dive_analytics.html#orden-de-sustitución-de-variables)).

## Atributos requests, triggers y transport

El atributo `requests` define “los datos que se enviarán”
(por ejemplo, `pageviews`, `events`)
y el destino del envío (las direcciones URL empleadas para transmitir datos).

El atributo `triggers` describe el momento en que se deben enviar los datos del análisis;
por ejemplo, cuando un usuario visualiza una página o cuando un usuario hace clic en un vínculo.

El atributo `transport` especifica la manera de enviar una solicitud.
Dicho de una manera más específica, el protocolo.

Continúa leyendo para obtener más información acerca de estas configuraciones.
(También puedes hacerlo en la
[referencia de amp-analytics](/docs/reference/extended/amp-analytics.html)).

### Qué datos se envían: atributo requests

`request-name` se usa en la configuración del disparador para especificar
la solicitud que se debe enviar en respuesta a un evento específico.
`request-value` es una URL `https`.
Estos valores pueden incluir tokens de marcadores de posición
que pueden hacer referencia a otras solicitudes o variables.

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

Algunos proveedores de herramientas de análisis (incluido Google Analytics)
ya han proporcionado configuraciones
que tú usas a través del atributo `type`.
Si usas un proveedor de herramientas analíticas,
es posible que no necesites incluir información de `requests`.
Consulta la documentación de tu proveedor para averiguar
si se debe configurar `requests` y la manera de hacerlo.

#### Cómo anexar una URL de solicitud: Parámetros de URL adicionales

El atributo [extraUrlParams](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#extra-url-params)
especifica parámetros adicionales para anexar a la cadena de consulta de la URL de consulta a través de la convención habitual "&foo=baz".

En el ejemplo de `amp-analytics` se agrega un parámetro adicional <code>cd1</code>
a la solicitud y se establece el valor del parámetro en "AMP":

[sourcecode:html]
  "extraUrlParams": {
    "cd1": "AMP"
  }
[/sourcecode]

### Cuándo se envían los datos: atributo triggers

El atributo `triggers` describe cuándo se debe enviar una solicitud de análisis.
Contiene un par de valores claves: nombre y configuración del disparador.
El nombre del disparador puede ser cualquier cadena compuesta
por caracteres alfanuméricos (a-zA-Z0-9).

El siguiente
elemento `amp-analytics`, por ejemplo, se configura para enviar una solicitud a
`https://example.com/analytics` cuando el documento se carga por primera vez
y cada vez que se hace clic en una etiqueta `a`:

[sourcecode:html]
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
[/sourcecode]

AMP admite las siguientes configuraciones de disparadores:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Config. del disparador</th>
      <th data-th="Description">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (obligatorio)</td>
      <td data-th="Description">Evento que se debe recibir. Los valores válidos son <code>click</code>, <code>scroll</code>, <code>timer</code> y <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (obligatorio)</td>
      <td data-th="Description">Nombre de la solicitud que se enviará (según se especifica en las solicitudes<a href="/es/docs/guides/analytics/deep_dive_analytics.html#qué-datos-se-envían:-atributo-requests"></a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Objeto que contiene pares de valores claves usados para sobrescribir <code>vars</code> definidos en la configuración de nivel superior o para especificar<code>vars</code> exclusivos de este disparador (consulta también<a href="/es/docs/guides/analytics/deep_dive_analytics.html#orden-de-sustitución-de-variables">Orden de sustitución de variables</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (obligatorio cuando <code>on</code> se fija en <code>click</code>)</td>
      <td data-th="Description">Selector de CSS usado para definir con precisión los elementos que deben someterse a seguimiento. Usa el valor <code>*</code> para realizar un seguimiento de todos los elementos. Esta configuración se usa junto con el disparador <code>click</code>. Obtén información acerca de cómo usar el selector para <a href="/es/docs/guides/analytics/use_cases.html#seguimiento-de-clics-en-páginas">realizar un seguimiento de los clics de páginas</a> y las <a href="/es/docs/guides/analytics/use_cases.html#seguimiento-de-interacciones-sociales">interacciones sociales</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (obligatorio cuando <code>on</code> se fija en <code>scroll</code>)</td>
      <td data-th="Description">Controla las condiciones bajo las cuales se activa el evento <code>scroll</code> cuando se desplaza la página. Este objeto puede contener <code>verticalBoundaries</code> y <code>horizontalBoundaries</code>. Al menos una de las dos propiedades es obligatoria para que se active un evento <code>scroll</code>. Los valores para ambas propiedades deben ser arreglos de números que contengan los límites conforme a los cuales se genera un evento de desplazamiento. Consulta este ejemplo en <a href="/es/docs/guides/analytics/use_cases.html#seguimiento-del-desplazamiento">Seguimiento del desplazamiento</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (obligatorio cuando <code>on</code> se fija en <code>timer</code>)</td>
      <td data-th="Description">Controla el momento en que se activa el evento <code>timer</code>. El temporizador se activará de inmediato y, en adelante, a intervalos especificados. Esta configuración se usa junto con el elemento de activación <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

**Importante:** Los disparadores de una configuración con menor precedencia se sobrescriben
con disparadores que tienen los mismos nombres de una configuración con mayor precedencia
(consulta [Orden de sustitución de variables](/es/docs/guides/analytics/deep_dive_analytics.html#orden-de-sustitución-de-variables)).

### Cómo se envían los datos: atributo transport

El atributo `transport` especifica la manera de enviar una solicitud.
De forma predeterminada, están habilitados los siguientes tres métodos:

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Método de transport</th>
      <th data-th="Description">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Indica que se puede usar <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> para transmitir la solicitud. Enviará una solicitud <code>POST</code> con credenciales y un cuerpo vacío.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Indica que se puede usar <code>XMLHttpRequest</code> para transmitir la solicitud. Enviará una solicitud <code>POST</code> con credenciales y un cuerpo vacío.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Indica que la solicitud se puede enviar al generar una etiqueta <code>Image</code>. Esto enviará una solicitud <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Solo se usa un método de transporte;
es el de mayor precedencia
que esté habilitado, permitido y disponible.
La precedencia es `beacon` > `xhrpost` > `image`.
Si el agente de usuario del cliente no admite un método,
se usa el método de mayor precedencia que sigue.

Incluye el atributo `transport` en tu configuración
solo si deseas limitar las opciones de transporte;
de lo contrario, podrías detener las solicitudes.

En el ejemplo siguiente,
`beacon` y `xhrpost` se fijan en false
para no usarse aunque tengan mayor precedencia que `image`.
Si el agente de usuario del cliente admite el método `image`,
es el que se usará; de lo contrario, no se enviarán solicitudes.

[sourcecode:html]
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
[/sourcecode]

## Orden de sustitución de variables

AMP completa variables con valores en orden de precedencia:

1. Configuraciones remotas (a través de `config`).
2. `vars` anidados dentro de un disparador en `triggers`.
3. `vars` del nivel superior anidados en `amp-analytics`.
4. Valores proporcionados por la plataforma.

En este ejemplo hay una configuración remota,
variables definidas en el nivel superior, en disparadores y en el nivel de la plataforma:

[sourcecode:html]
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
[/sourcecode]

Cuando se define el mismo `var` en múltiples ubicaciones,
el orden de precedencia de la variable establece su valor una vez.
De esta manera, si la configuración remota definió `account` como UA-XXXXX-Y en el ejemplo anterior,
los valores de diferentes vars serán los siguientes:

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
      <td data-th="Defined By">Disparador</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Configuración remota</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Disparador</td>
    </tr>
  </tbody>
</table>
