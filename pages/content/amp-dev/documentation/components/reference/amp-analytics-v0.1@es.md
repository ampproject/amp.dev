---
$title: amp-analytics
$category@: ads-analytics
teaser:
  text: Registra datos de analíticas de un documento AMP.
---


<!--
Copyright 2019 The AMP HTML Authors. All Rights Reserved.

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



Registra datos de analíticas de un documento AMP.

<table>
  <tr>
    <td class="col-fourty"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Ejemplos</strong></td>
    <td>Consulta el <a href="https://ampbyexample.com/components/amp-analytics/">ejemplo de amp-analytics</a> de AMP By Example.</td>
  </tr>
</table>


## ¿Vas a enviar analíticas a un proveedor externo o a una solución propia? <a name="sending-analytics-to-a-vendor-or-in-house"></a>

Antes de empezar a utilizar analíticas para AMP en tu sitio web, debes decidir si vas a usar una herramienta de analíticas de terceros para analizar la interacción de los usuarios o tu propia solución.

[tip type="read-on"]
Obtén más información sobre las analíticas para AMP en la guía para [configurar soluciones de analíticas](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md).
  [/tip]

### Enviar datos a un proveedor de analíticas externo <a name="analytics-vendors"></a>

Las analíticas para AMP están especialmente diseñadas para medir los datos una sola vez y enviarlos a muchas partes interesadas. Si ya trabajas con uno o varios proveedores de analíticas, echa un vistazo a la lista de [proveedores de soluciones de analíticas](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) para ver si han integrado su herramienta con AMP.

Si el proveedor con el que trabajas ha integrado su solución de analíticas con AMP:

1. En la etiqueta `<amp-analytics>`, añade el atributo `type` y asigna el valor al [proveedor](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) especificado.
1. Define qué datos quieres registrar y supervisar, y especifica estos detalles en los datos de configuración. Consulta la documentación del proveedor para obtener instrucciones sobre cómo registrar datos de analíticas.

Si, en cambio, el proveedor no ha integrado su solución de analíticas con AMP, ponte en contacto con él y pídele ayuda. También te recomendamos que crees una incidencia en el proyecto AMP solicitando que se añada al proveedor en cuestión. Además, puedes consultar el artículo sobre [cómo integrar herramientas de analíticas en AMP HTML](../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md). Otra posibilidad es acordar con el proveedor que le mandarás los datos a la URL que él te indique. Encontrarás más información en la sección [Enviar datos a la solución de analíticas propia](#sending-data-in-house) que aparece a continuación.

*Ejemplo: Enviar datos a un proveedor de analíticas externo*

En el siguiente ejemplo, los datos de analíticas se envían a Nielsen, un proveedor de analíticas que ha integrado su solución con AMP. En la documentación de [Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API) encontrarás la información detallada para configurar estos datos.

```html
<amp-analytics type="nielsen">
  <script type="application/json">
    {
      vars: {
        "apid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "apv": "1.0",
        "apn": "My AMP Website",
        "section": "Entertainment",
        "segA": "Music",
        "segB": "News",
        "segC": "Google AMP"
        }
      }
  </script>
</amp-analytics>
```

### Enviar datos a la solución de analíticas propia <a name="sending-data-in-house"></a>

Si decides medir las interacciones de los usuarios con una herramienta propia, lo único que necesitas para integrar la herramienta con las analíticas para AMP es una URL, es decir, la dirección a la que enviarás los datos. También puedes enviar datos a varias URL; por ejemplo, puedes enviar datos de páginas vistas a una URL, y datos de participación desde redes sociales a otra.

[tip type="note"]
Si utilizas una solución interna que requiere trabajar con un proveedor y su herramienta de analíticas no está integrada con AMP, determinad qué información de configuración se necesita.
[/tip]

Para enviar datos a una URL específica:

1. Define qué datos quieres registrar y supervisar, y [especifica esta información detallada en los datos de configuración](#specifying-configuration-data).
1. En el objeto de configuración [`requests`](#requests), especifica el tipo de solicitud del que se debe hacer el seguimiento (p. ej., página vista, eventos activados específicos) y las URL a las que se enviarán los datos de seguimiento.

[tip type="note"]
Al procesar URLs de AMP en el encabezado de URL referente de las solicitudes de analíticas, excluye o ignora el parámetro `usqp`. Google utiliza este parámetro para activar experimentos de Google AMP Cache.
[/tip]

*Ejemplo: Enviar datos a una URL*

A continuación, se incluye un ejemplo sencillo donde se hace un seguimiento de las páginas vistas.  Cada vez que una página está visible, se activa el evento de activación y envía los datos de página vista a una URL definida junto con un ID aleatorio.

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

  [tip type="success"]
En el artículo sobre [casos prácticos de datos de analíticas](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/use_cases.md) encontrarás acciones de seguimiento habituales (p. ej., páginas vistas, clics de página, desplazamiento, etc.).
[/tip]

## Especificar los datos de configuración <a name="specifying-configuration-data"></a>

En la etiqueta `<amp-analytics>`, especifica un objeto de configuración JSON que contenga la información detallada sobre lo que debe medirse y dónde hay que enviar los datos de analíticas.

El objeto de configuración `<amp-analytics>` tiene este formato:

```javascript
{
  "requests": {
    request-name: request-value,
    ...
  },
  "vars": {
    var-name: var-value,
    ...
  },
  "extraUrlParams": {
    extraurlparam-name: extraurlparam-value,
    ...
  },
  "triggers": {
    trigger-name: trigger-object,
    ...
  },
  "transport": {
    "beacon": *boolean*,
    "xhrpost": *boolean*,
    "image": *boolean*,
  }
}
```

### Configuración insertada o remota <a name="inline-or-remote-configuration"></a>

A la hora de especificar los datos de configuración, puedes insertarlos o bien puedes indicar una URL en el atributo `config` para que se recojan de forma remota. Además, en el caso de los proveedores de analíticas más conocidos, la configuración integrada se puede seleccionar mediante el atributo `type`.

Si se utilizan datos de configuración de más de una de estas fuentes, los objetos de configuración (variables, solicitudes y activadores) se fusionarán y se seguirán estas premisas:

1. La configuración remota tiene prioridad sobre la configuración integrada.
1. La configuración integrada tiene prioridad sobre la configuración del proveedor.

#### Cargar la configuración remota <a name="loading-remote-configuration"></a>

Para cargar una configuración remota, en el elemento `<amp-analytics>`, especifica el atributo `config` y la URL de los datos de configuración. La URL que especifiques debe tener el esquema HTTPS y puede incluir [variables de URL de AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). Para acceder a las cookies, consulta el atributo [`data-credentials`](#data-credentials). La respuesta debe seguir las [directrices de seguridad de AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).

En el siguiente ejemplo, se especifica que el atributo `config` debe cargar los datos de configuración de la URL indicada.

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

#### Función de reescritura de la configuración <a name="configuration-rewriter"></a>

La función de reescritura de la configuración permite a los proveedores de analíticas reescribir de forma dinámica la configuración que se les proporciona. Es similar a la función de configuración remota, pero también incluye cualquier configuración proporcionada por el usuario en la solicitud que se realiza al servidor. De momento, solo los proveedores de analíticas pueden habilitar esta función.

Un proveedor de analíticas especifica una propiedad configRewriter con una URL de servidor.
```js
export const VENDOR_ANALYTICS_CONFIG = {
  ...
  'configRewriter': {
    'url': 'https://www.vendor.com/amp-config-rewriter',
    },
  ...
  }
```

El entorno de ejecución envía una solicitud que contiene la configuración integrada, combinada con la configuración remota proporcionada, al punto de conexión configRewriter que ha indicado el proveedor. El proveedor utiliza este servidor de datos para crear y devolver una configuración reescrita.

A continuación, el entorno de ejecución combina toda la configuración proporcionada para determinar la configuración final, de mayor a menor prioridad:

1. Configuración reescrita
1. Configuración integrada
1. Configuración definida por el proveedor

##### Grupos de variables <a name="variable-groups"></a>

La función de grupos de variables permite a los proveedores de analíticas agrupar un conjunto predefinido de variables que los usuarios pueden habilitar fácilmente. Estas variables se resolverán y se enviarán al punto de conexión `configRewriter` especificado.

Para poder habilitar esta función, los proveedores de analíticas deben crear un objeto `varGroups` en la configuración de `configRewriter`. De esta manera, los editores pueden incluir los objetos `varGroups` que haya creado el proveedor de analíticas y que quieran habilitar en su configuración de analíticas. Se pueden usar todas las variables que admite la [guía de sustituciones de AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). *Nota importante:* Las variantes $ {varName} no funcionarán.

Supongamos que un proveedor de analíticas tiene la siguiente configuración:
```js
// This is predefined by vendor.
export const VENDOR_ANALYTICS_CONFIG = {
  ...
  'configRewriter': {
    'url': 'https://www.vendor.com/amp-config-rewriter',
    'varGroups' : {
      'group1': {
        'referrer': 'DOCUMENT_REFERRER',
        'source': 'SOURCE_URL',
        'group2': {
          'title': 'TITLE',
          },
        },
      },
    },
    ...
    }
```

  Puedes especificar los grupos de variables que están habilitados incluyendo `{enabled: true}` en los objetos `varGroups` especificados de la configuración de `<amp-analytics>` del proveedor. `enabled` es una palabra clave reservada y no se puede utilizar como nombre de variable.

  En el ejemplo siguiente, se han habilitado `group1` y `group2`. Se ignorarán los grupos que no se hayan habilitado específicamente. El entorno de ejecución resolverá todas estas variables habilitadas y las combinará en un único objeto `configRewriter.vars`, el cual se enviará a la URL de reescritura de la configuración.

```html
/* Included on publisher page */
<amp-analytics type="myVendor" id="myVendor" data-credentials="include">
  <script type="application/json">
  {
    "configRewriter": {
      "varGroups": {
        "group1": {
          "enabled": true
        },
        "group2": {
          "enabled": true
        }
      }
    }
  }
  </script>
</amp-analytics>
```

  En este ejemplo, el cuerpo de la solicitud sería parecido al siguiente:
```json
  /* Sent to configuration rewriter server. */
  "configRewriter": {
    "vars": {
      "referrer": "https://www.example.com",
      "source": "https://www.amp.dev",
      "title": "Cool Amp Tips"
    }
  }
```

### Objetos de datos de configuración <a name="configuration-data-objects"></a>

#### Solicitudes <a name="requests"></a>

El objeto de configuración `requests` especifica las URL que se han usado para transmitir datos a una plataforma de analíticas, así como el comportamiento de procesamiento por lotes o de creación de informes de la solicitud. El atributo `request-name` especifica qué solicitud se debe enviar como respuesta a un determinado evento (p. ej., `pageview`, `event`, etc.). El atributo `request-value` contiene una URL https; el valor puede incluir tokens de marcador de posición que pueden hacer referencia a otras solicitudes o variables. El atributo `request-value` también puede ser un objeto que contenga configuraciones de solicitudes opcionales.

##### Configuraciones de solicitudes <a name="request-configs"></a>

Estas son las propiedades que deben usarse para definir una solicitud con un objeto:

- `baseUrl`: define la URL de la solicitud (obligatoria).
- `reportWindow`: propiedad opcional que permite especificar el tiempo (en segundos) para detener las solicitudes de informes. El activador con `important: true` anula la restricción de periodo de informes máxima.

En este ejemplo, todas las solicitudes son válidas.

```javascript
"requests": {
  "base": "https://example.com/analytics?a=${account}&u=${canonicalUrl}&t=${title}",
  "pageview": {
    "baseUrl": "${base}&type=pageview"
  },
  "event": {
    "baseUrl": "${base}&type=event&eventId=${eventId}",
    "batchInterval": 5,
    "reportWindow" : 30
  }
}
```

Algunos proveedores de analíticas ya proporcionan una configuración, la cual se usa a través del atributo `type`. Si trabajas con un proveedor de analíticas, es posible que no necesites incluir información sobre las solicitudes. Para saber si es necesario configurar las solicitudes y cómo hacerlo, consulta la documentación de tu proveedor.

##### Configuraciones por lotes <a name="batching-configs"></a>

Para reducir el número de pings de solicitud, puedes especificar comportamientos de procesamiento por lotes en la configuración de la solicitud. Los [`extraUrlParams`](#extra-url-params) de `triggers` que utilizan la misma solicitud se añaden a la `baseUrl` de la solicitud.

Estas son las propiedades de procesamiento por lotes:

- `batchInterval`: esta propiedad especifica el intervalo de tiempo (en segundos) a razón del cual deben vaciarse los pings de solicitud en la cola de procesamiento por lotes. Dicha propiedad puede ser un número o una matriz de números (el intervalo de tiempo mínimo es de 200 ms). La solicitud respetará todos los valores de la matriz y, a continuación, repetirá el último valor de intervalo (o el valor único) cuando alcance el final de la matriz.

Por ejemplo, la siguiente configuración envía un único ping de solicitud cada 2 segundos. Este sería el formato de un ping de solicitud: `https://example.com/analytics?rc=1&rc=2`.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": 2,
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

La siguiente configuración envía el primer ping de solicitud al cabo de 1 segundo y, a continuación, envía una solicitud cada 3 segundos. El primer ping de solicitud tiene este formato: `https://example.com/analytics?rc=1`. El segundo ping de solicitud tiene este otro formato: `https://example.com/analytics?rc=2&rc=3&rc=4`.

```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": [1, 3],
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

#### Variables <a name="vars"></a>

El componente `amp-analytics` define muchas variables básicas que se pueden utilizar en las solicitudes. Encontrarás una lista de todas estas variables en la [guía de variables de `amp-analytics`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md). Además, también se pueden usar todas las variables que admite la [guía de sustituciones AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).

El objeto de configuración `vars` se puede utilizar para definir nuevos pares clave-valor o anular las variables que ya existen y a las que se puede hacer referencia en los valores de `request`. Las nuevas variables se suelen utilizar para especificar información concreta del editor.  Las matrices se pueden usar para especificar una lista de valores que deben codificarse como URL por separado a la vez que se conserva el delimitador de comas.

```javascript
vars: {
  account: "ABC123",
  countryCode: "tr",
  tags: ["Swift,Jonathan", "Gulliver's Travels"]
}
```

#### Parámetros de URL adicionales <a name="extra-url-params"></a>

El objeto de configuración `extraUrlParams` especifica los parámetros adicionales que se incluirán en la solicitud. De forma predeterminada, los parámetros de URL adicionales se añaden a la cadena de consulta de una URL de solicitud mediante la convención habitual "&foo=baz".

En el siguiente ejemplo, se indica que `&a=1&b=2&c=3` debe añadirse a una solicitud:

```javascript
"extraUrlParams": {
  "a": "1",
  "b": "2",
  "c": "3"
}
```

El objeto `extraUrlParams` se puede enviar a través del cuerpo de la solicitud en lugar de la URL si la opción `useBody` está habilitada y la solicitud se envía a través de los métodos de transporte `beacon` o `xhrpost`. En este caso, los parámetros no tienen codificación URL ni están aplanados. Para obtener más información, consulta la sección [Opción useBody para parámetros de URL adicionales](#use-body-for-extra-url-params).

El atributo `extraUrlParamsReplaceMap` especifica un mapa de claves y valores que actúan como parámetros en `String.replace()` para procesar claves previamente en la configuración de `extraUrlParams`. Por ejemplo, si una configuración de `extraUrlParams` define `"page.title": "The title of my page"`, y `extraUrlParamsReplaceMap` define `"page.": "_p_"`, se añadirá `&_p_title=The%20title%20of%20my%20page%20` a la solicitud.

Para usar `extraUrlParams` no es necesario utilizar `extraUrlParamsReplaceMap`. Si no se define `extraUrlParamsReplaceMap`, no se sustituirá ninguna cadena y las cadenas definidas en `extraUrlParams` se utilizarán tal cual.

Si la opción `useBody` está habilitada y la solicitud se envía mediante los métodos de transporte `beacon` o `xhrpost`, la sustitución de cadenas del atributo `extraUrlParamsReplaceMap` solo se realizará en las claves de nivel superior de `extraUrlParams`.

#### Activadores <a name="triggers"></a>

El objeto de configuración `triggers` describe cuándo se debe enviar una solicitud de analíticas. El atributo `triggers` contiene un par clave-valor formado por el nombre y la configuración del activador. El nombre del activador puede ser cualquier cadena compuesta por caracteres alfanuméricos (a-zA-Z0-9). Los activadores de una configuración de prioridad inferior quedan anulados por los activadores con los mismos nombres de una configuración que tenga una prioridad superior.

* `on` (obligatorio): evento que se va a escuchar. Los valores válidos son `render-start`, `ini-load`, `click`, `scroll`, `timer`, `visible`, `hidden`, `user-error`, [`access-*`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access/amp-access-analytics.md) y [`video-*`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-video-analytics.md).
* `request` (obligatorio): nombre de la solicitud que se va a enviar (según se especifica en la sección de `requests`).
* `vars`: objeto con pares clave-valor que se usa para anular objetos `vars` definidos en la configuración de nivel superior o para especificar variables únicas de este activador.
* `important`: se puede especificar para que funcione con solicitudes que admitan el comportamiento de procesamiento por lotes o el periodo de informes. Si `important` se define en `true`, se puede vaciar la cola de solicitudes por lotes con ciertos activadores. En este caso, es posible reducir el número de pings de solicitud sin perder eventos de activación importantes. Si se asigna el valor `true` a `important`, también se puede anular el valor `reportWindow` de la solicitud para igualmente enviar pings de solicitud importantes.
* `selector` y `selectionMethod`: se pueden especificar para algunos activadores, como `click` y `visible`. Para obtener más información, consulta el apartado [Selector de elementos](#element-selector).
* `scrollSpec` (obligatorio si `scrollSpec` se define en `scroll`): esta configuración se utiliza junto con el activador `scroll`. Consulta la información detallada más abajo.
* `timerSpec` (obligatorio si `on` se define en `timer`): esta configuración se utiliza junto con el activador `timer`. Consulta la información detallada más abajo.
* `sampleSpec`: este objeto se utiliza para definir cómo se pueden muestrear las solicitudes antes de que se envíen. Esta configuración permite realizar el muestreo de solicitudes en función de entradas aleatorias u otras variables compatibles con la plataforma. El objeto contiene la configuración para especificar una entrada que se utiliza para crear un hash y el umbral que debe cumplir dicho hash.
    * `sampleOn`: esta plantilla de cadenas se expande rellenando las variables de la plataforma y después creando un hash para generar un número para la lógica de muestreo que se describe en el umbral incluido a continuación.
    * `threshold`: esta configuración se utiliza para excluir solicitudes que no cumplen determinados criterios. Para que una solicitud se envíe al proveedor de analíticas, el valor de la siguiente estructura lógica debería ser "true": `HASH(sampleOn) < threshold`.</li>
* `videoSpec` (se utiliza si `on` se define en `video-*`): esta configuración se utiliza junto con los activadores [`video-*`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-video-analytics.md).

Por ejemplo, la siguiente configuración se puede utilizar para muestrear el 50 % de las solicitudes según la entrada aleatoria o el 1 % según el ID de cliente.

```javascript
'triggers': {
  'sampledOnRandom': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${random}',
      'threshold': 50,
    },
  },
  'sampledOnClientId': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${clientId(cookieName)}',
      'threshold': 1,
    },
  },
},
```

##### Selector de elementos <a name="element-selector"></a>

Algunos activadores, como `click` y `visible`, permiten especificar un único elemento o una colección de elementos mediante las propiedades del selector. Las limitaciones e interpretaciones que cada activador aplica a ciertos elementos son distintas. Por ejemplo, define si un selector afecta a todos los elementos que coinciden con los criterios establecidos o solo al primero, o con qué elementos puede coincidir, es decir, todos los elementos o solo elementos AMP. Para obtener más información, consulta la documentación de cada activador.

Estas son las propiedades de selector:

- `selector`: esta propiedad se utiliza para buscar un elemento o una colección de elementos mediante la consulta CSS/DOM. La semántica de la concordancia del elemento se puede cambiar usando `selectionMethod`. Estos son los posibles valores de la propiedad:
    - selector de CSS válido, por ejemplo, `#ad1` o `amp-ad`.
    - `:root`: selector especial que coincide con la raíz del documento.
- `selectionMethod`: cuando se especifica, esta propiedad puede tener el valor `scope` o `closest`. El valor `scope` permite seleccionar el elemento dentro del elemento superior de la etiqueta `amp-analytics`. El valor `closest` permite buscar el antecedente más cercano de la etiqueta `amp-analytics` que satisfaga el selector indicado. El valor predeterminado es `scope`.

##### Insertar el activador de inicio de renderizado <a name="embed-render-start-trigger"></a>

Los elementos AMP que insertan otros documentos en iframes (por ejemplo, anuncios) pueden registrar un evento de inicio de renderizado (`"on": "render-start"`). Este evento se emite normalmente en cuanto se puede confirmar que se ha iniciado el renderizado del documento insertado. Consulta la documentación de los elementos AMP para saber si emiten este evento.

El activador del elemento de inserción debe incluir un [`selector`](#element-selector) que apunte al elemento insertado:
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request",
    "selector": "#embed1"
  }
}
```

El documento también emite el evento de inicio de renderizado, el cual se puede configurar del siguiente modo:
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request"
  }
}
```

##### Activador de carga inicial <a name="initial-load-trigger"></a>

El evento de carga inicial (`"on": "ini-load"`) se activa cuando se ha cargado el contenido inicial de un elemento AMP o de un documento AMP.

La carga inicial se define en relación con el contenedor y su tamaño inicial.
En concreto, se define siguiendo estos criterios:
- Documentos: todos los elementos del primer viewport.
- Elementos de inserción: todos los elementos de contenido del documento insertado que se colocan dentro del tamaño inicial del elemento de inserción.
- Elementos AMP sencillos (p. ej., `amp-img` ): los propios recursos, como una imagen o un vídeo.

El activador del elemento de inserción o del elemento AMP debe incluir un [`selector`](#element-selector) que apunte al elemento:
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request",
    "selector": "#embed1"
  }
}
```

El documento también emite el evento de inicio de carga, el cual se puede configurar del siguiente modo:
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request"
  }
}
```

##### Activador de visibilidad de páginas y elementos <a name="page-and-element-visibility-trigger"></a>

Utiliza el activador de visibilidad de páginas (`"on": "visible"`) para activar una solicitud cuando la página sea visible. La activación de este activador se puede configurar mediante `visibilitySpec`.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
  }
}
```

El activador de visibilidad de elementos se puede configurar para cualquier elemento AMP o la ruta de un documento mediante [`selector`](#element-selector). El activador se activará cuando el elemento especificado coincida con los parámetros de visibilidad, los cuales se pueden personalizar mediante `visibilitySpec`.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "elementview",
    "selector": "#ad1",
    "visibilitySpec": {/* optional visibility spec */}
  }
}
```

Ten en cuenta que el selector solo se puede utilizar para especificar un único elemento, no una colección de elementos. El elemento puede ser un [elemento AMP ampliado](https://github.com/ampproject/amphtml/blob/master/spec/amp-tag-addendum.md#amp-specific-tags) o la ruta de un documento.

El activador de visibilidad de elementos espera la señal que ha especificado la propiedad `waitFor` en `visibilitySpec` antes de hacer un seguimiento de la visibilidad de los elementos. Si no se especifica `waitFor`, dicha propiedad espera la señal [`ini-load`](#initial-load-trigger) del elemento. Para obtener más información, consulta la documentación de `waitFor`.
Si se especifica `reportWhen`, el activador espera esa señal antes de enviar el evento. Esta función es útil, por ejemplo, para enviar eventos de analíticas cuando la página está cerrada.

##### Activador de errores <a name="error-trigger"></a>

El evento de error de usuario (`"on": "user-error"`) se activa cuando se produce un error atribuible al autor de la página o al software que se usa para publicar la página; por ejemplo, cuando la configuración de un componente AMP es incorrecta, cuando hay anuncios mal configurados o cuando las afirmaciones fallan. Los errores de usuario también se registran en la consola para desarrolladores.

```javascript
"triggers": {
  "userError": {
    "on": "user-error",
     "request": "error"
  }
}
```
[tip type="note"]
Hay un [problema conocido](https://github.com/ampproject/amphtml/issues/10891) que sigue registrando errores de inserciones de iframe A4A, que son irrelevantes para la página.
[/tip]


**<a id="visibility-spec"></a>Especificación de visibilidad**

La propiedad `visibilitySpec` es un conjunto de condiciones y propiedades que se pueden aplicar a activadores `visible` o `hidden` para cambiarlos cuando se activan. Si se especifican varias propiedades, todas deben definirse en "true" para que pueda activarse una solicitud. Estas son las propiedades de configuración que se admiten en `visibilitySpec`:

- `waitFor`: esta propiedad indica que el activador de visibilidad debe esperar una determinada señal antes de hacer un seguimiento de la visibilidad. Los valores compatibles son `none`, `ini-load` y `render-start`. Si `waitFor` no tiene ningún valor definido, se le asigna el valor predeterminado [`ini-load`](#initial-load-trigger) cuando se especifica el selector; si la propiedad tiene un valor definido, se le asigna el valor `none`.
- `reportWhen`: esta propiedad indica que el activador de visibilidad debe esperar una determinada señal antes de enviar el activador. El único valor admitido es `documentExit`. No se puede usar `reportWhen` y `repeat` en la misma especificación de visibilidad. Ten en cuenta que cuando se especifica `reportWhen`, el informe se enviará en el momento en que aparece la señal, aunque no se cumplan los requisitos de visibilidad en ese momento o no se hayan cumplido con anterioridad. Las variables relevantes (`totalVisibleTime`, etc.) se rellenarán de acuerdo con los requisitos de visibilidad de esta `visibilitySpec`.
- `continuousTimeMin` y `continuousTimeMax`: estas propiedades indican que se debe activar una solicitud cuando un elemento, o cualquier parte de este, ha estado dentro del viewport durante un periodo de tiempo continuado comprendido entre los valores mínimo y máximo especificados. El tiempo se expresa en milisegundos. Si no se especifica ningún valor para `continuousTimeMin`, se le asigna el valor predeterminado, que es 0.
- `totalTimeMin` y `totalTimeMax`: estas propiedades indican que se debe activar una solicitud cuando un elemento, o cualquier parte de este, ha estado dentro del viewport durante un periodo de tiempo comprendido entre los valores mínimo y máximo especificados. El tiempo se expresa en milisegundos. Si no se especifica ningún valor para `totalTimeMin`, se le asigna el valor predeterminado, que es 0.
- `visiblePercentageMin` y `visiblePercentageMax`: estas propiedades indican que se debe activar una solicitud cuando la proporción de un elemento visible en el viewport se encuentre entre los porcentajes mínimos y máximos especificados. Los valores porcentuales válidos son los comprendidos entre el 0 y el 100. Ten en cuenta que el límite superior (`visiblePercentageMax`) es inclusivo. El límite inferior (`visiblePercentageMin`) es exclusivo, a menos que ambos límites se definan en 0 o en 100. Si a ambos límites se les asigna el valor 0, el activador se activa cuando el elemento no está visible. Si se les asigna el valor 100, el activador se activa cuando el elemento es completamente visible. Cuando estas propiedades se definen junto con otras propiedades relacionadas con el tiempo, solo se cuenta el momento en que se cumplen estas propiedades. Los valores predeterminados de `visiblePercentageMin` y `visiblePercentageMax` son 0 y 100, respectivamente.
- `repeat`: si esta propiedad se define en `true`, el activador se activa cada vez que se cumplen las condiciones de `visibilitySpec`. En el siguiente ejemplo, si el elemento se desplaza al 51 % de la vista, luego al 49 % y después al 51 % de nuevo, el activador se activa dos veces. Sin embargo, si el valor asignado a `repeat` es `false`, el activador se activa una vez. El valor predeterminado de `repeat` es `false`. No se puede usar `reportWhen` y `repeat` en la misma especificación de visibilidad.

```javascript
visibilitySpec: {
  visiblePercentageMin: 50,
  repeat: true,
  }
```

Se puede usar `visiblePercentageThresholds` como una abreviatura para crear varias instancias de `visibilitySpec`, cuya única diferencia sea `visiblePercentageMin` y `visiblePercentageMax`. Por ejemplo, los siguientes activadores son equivalentes:

```javascript
// Two triggers with visibilitySpecs that only differ in visiblePercentageMin and visiblePercentageMax:
"triggers": {
  "pageView_30_to_40": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 30,
      "visiblePercentageMax": 40,
      "continuousTimeMin": 1000,
    }
  }

  "pageView_40_to_50": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 40,
      "visiblePercentageMax": 50,
      "continuousTimeMin": 1000,
    }
  }
}

// A single trigger equivalent to both of the above:
"triggers": {
  "pageView": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageThresholds": [[30, 40], [40, 50]],
      "continuousTimeMin": 1000,
    }
  }
}
```
Además de las condiciones anteriores, `visibilitySpec` también habilita determinadas variables, las cuales se explican en este [artículo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#visibility-variables).

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "waitFor": "ini-load",
      "reportWhen": "documentExit",
      "visiblePercentageMin": 20,
      "totalTimeMin": 500,
      "continuousTimeMin": 200
    }
  }
}
```
Además de las variables que se proporcionan como parte de los activadores, también puedes especificar otras variables o anulaciones de variables de las [variables como atributo de datos](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute). Si se utilizan, estos atributos de datos deben formar parte del elemento especificado como [`selector`](#element-selector).

#####Activador de clics <a name="click-trigger"></a>

Usa el activador de clics (`"on": "click"`) para activar una solicitud cuando se hace clic en un elemento especificado. Utiliza [`selector`](#element-selector) para controlar los elementos que activarán esta solicitud. El activador activará todos los elementos que coincidan con el selector especificado.

```javascript
"vars": {
  "id1": "#socialButtonId",
  "id2": ".shareButtonClass"
},
"triggers": {
  "anchorClicks": {
    "on": "click",
    "selector": "a, ${id1}, ${id2}",
    "request": "event",
    "vars": {
      "eventId": 128
    }
  }
}
```

Además de las variables que se proporcionan como parte de los activadores, también puedes especificar otras variables o anulaciones de variables de las [variables como atributo de datos](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute). Si se utilizan, estos atributos de datos deben formar parte del elemento especificado como `selector`.

##### Activador de desplazamiento <a name="scroll-trigger"></a>

Utiliza el activador de desplazamiento (`"on": "scroll"`) para activar una solicitud en determinadas condiciones cuando se desplaza la página. Este activador proporciona [variables especiales](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#interaction) que indican los límites que han provocado el envío de una solicitud. Usa `scrollSpec` para controlar cuándo se activará esta función:

- `scrollSpec`: este objeto puede contener `verticalBoundaries` y `horizontalBoundaries`. Se necesita al menos una de las dos propiedades para activar el evento de desplazamiento. Los valores de las dos propiedades deben ser matrices de números que contengan los límites en los que se genera un evento de desplazamiento. Por ejemplo, en el siguiente fragmento de código, el evento de desplazamiento se activará cuando se desplace la página verticalmente un 25 %, 50 % y 90 %. Además, el evento también se activará cuando se desplace la página horizontalmente al 90 % de la anchura de desplazamiento. Para que la página siga funcionando, los límites de desplazamiento se redondean al múltiplo de `5` más próximo.

```javascript
"triggers": {
  "scrollPings": {
    "on": "scroll",
    "scrollSpec": {
      "verticalBoundaries": [25, 50, 90],
      "horizontalBoundaries": [90]
    },
    "request": "event"
  }
}
```

##### Activador de temporizador <a name="timer-trigger"></a>

Utiliza el activador de temporizador (`"on": "timer"`) para activar una solicitud en un intervalo de tiempo normal. Usa `timerSpec` para controlar cuándo se activará:

- `timerSpec`: especificación para activadores de tipo `timer`. A menos que se especifique `startSpec`, el temporizador se activará inmediatamente (puede estar desactivado de forma predeterminada) y, a partir de ahí, se activará a un intervalo especificado.
    - `interval`: duración del intervalo de tiempo, expresado en segundos.
      - `maxTimerLength`: duración máxima durante la cual se activará el temporizador, expresado en segundos. Cuando se alcance el valor de `maxTimerLength`, se activará otra solicitud. El valor predeterminado es de 2 horas. Si se incluye la especificación `stopSpec`, pero no se define un valor en maxTimerLength, el valor predeterminado será infinito.
        - `immediate`: indica si el temporizador se activa de forma inmediata o no. El valor booleano predeterminada es "true".

```javascript
"triggers": {
  "pageTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 10,
      "maxTimerLength": 600
    },
    "request": "pagetime"
  }
}
```

Para configurar un temporizador que controle los tiempos de los eventos de usuario, utiliza estas opciones:

- `startSpec`: especificación para activar cuándo se inicia un temporizador. Utiliza el valor `on` y `selector` para hacer el seguimiento de determinados eventos. Si una configuración incluye la especificación `startSpec`, pero no `stopSpec`, solo se detendrá cuando se haya alcanzado el valor de `maxTimerLength`.
- `stopSpec`: especificación para activar cuándo se detiene un temporizador. Si una configuración incluye la especificación `stopSpec` y no `startSpec`, se iniciará inmediatamente, pero solo se detendrá en el evento especificado.

```javascript
"triggers": {
  "videoPlayTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 5,
      "startSpec": {
        "on": "video-play",
        "selector": "amp-video"
      },
      "stopSpec": {
        "on": "video-pause",
        "selector": "amp-video"
      }
    },
    "request": "videoRequest"
  }
}
```

Consulta las especificaciones sobre [activadores](#triggers) para obtener información detallada sobre la creación de activadores de temporizador anidados. Ten en cuenta que no se permite utilizar un activador de temporizador para iniciar o detener un temporizador.

##### Activador oculto <a name="hidden-trigger"></a>

Utiliza el activador oculto (`"on": "hidden"`) para activar una solicitud cuando la página se oculte.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
  }
}
```

Se puede incluir [`visibleSpec`](#visibility-spec) para que la solicitud solo se active si se cumplen las condiciones de duración de visibilidad.
```json
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
    "visibilitySpec": {
      "selector": "#anim-id",
      "visiblePercentageMin": 20,
      "totalTimeMin": 3000,
    }
  }
}
```
Esta es la interpretación de la configuración anterior:

<blockquote>
Cuando la página se oculta, activa una solicitud si el elemento #anim-id ha estado visible (más del 20 % de la superficie del viewport) durante más de 3 segundos en total.
</blockquote>

##### Activadores de acceso <a name="access-triggers"></a>

El sistema de AMP Access genera numerosos eventos para distintos estados del flujo de acceso. Para obtener más información sobre los activadores de acceso (`"on": "access-*"`), consulta el artículo sobre [AMP Access y analíticas](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access/amp-access-analytics.md).

#### Activadores de analíticas de vídeo <a name="video-analytics-triggers"></a>

Las analíticas de vídeo proporcionan varios activadores (`"on": "video-*"`) que los editores pueden utilizar para hacer el seguimiento de diferentes eventos que se producen durante el ciclo de vida de un vídeo. Encontrarás más información en el artículo sobre [analíticas de vídeo para AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-video-analytics.md).

#### Objeto transport <a name="transport"></a>

El objeto de configuración `transport` especifica cómo enviar una solicitud. El valor es un objeto con campos que indican los métodos de transporte admitidos.

* `beacon`: indica que se puede usar [`navigator.sendBeacon`](https://developer.mozilla.org/es/docs/Web/API/Navigator/sendBeacon) para enviar la solicitud. Se enviará una solicitud POST con credenciales. El cuerpo de la solicitud que se envíe estará vacío a menos que `useBody` se defina en "true". Para obtener más información sobre `useBody`, consulta el apartado [Opción useBody para parámetros de URL adicionales](#use-body-for-extra-url-params).
* `xhrpost`: indica que se puede usar `XMLHttpRequest` para enviar la solicitud. Se enviará una solicitud POST con credenciales. El cuerpo de la solicitud que se envíe estará vacío a menos que `useBody` se defina en "true". Para obtener más información sobre `useBody`, consulta el apartado [Opción useBody para parámetros de URL adicionales](#use-body-for-extra-url-params).
* `image`: indica que la solicitud se puede enviar generando una etiqueta `Image`. Se enviará una solicitud GET. Para evitar que la consola emita advertencias por falta de respuestas o errores en las solicitudes, define `"image": {"suppressWarnings": true}`.

Los proveedores acreditados por el Media Rating Council (MRC, consejo de calificación de medios de los Estados Unidos) pueden utilizar un cuarto mecanismo de transporte, "iframe transport", añadiendo una cadena de URL a iframe-transport-vendors.js. Esto indica que se debe crear un iframe y su atributo `src` se debe definir en esta URL; las solicitudes se enviarán a ese iframe a través de `window.postMessage()`. En este caso, no es necesario que las solicitudes sean direcciones URL completas. Solo se puede especificar `iframe` en `iframe-transport-vendors.js`; no se puede insertar en la etiqueta `amp-analytics` ni se puede especificar a través de la configuración remota. Además, el marco del proveedor puede enviar una respuesta, que amp-ad-exit usará. Consulta las páginas de [analytics-iframe-transport-remote-frame.html](https://github.com/ampproject/amphtml/blob/master/examples/analytics-iframe-transport-remote-frame.html) y [fake_amp_ad_with_iframe_transport.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html); el primer archivo envía un objeto JSON de respuesta de {'collected-data': 'abc'}, y el segundo utiliza ese objeto para sustituir 'abc' por 'bar_' en finalUrl.

Si se habilitan varios de estos métodos de transporte, la prioridad es `iframe` &gt; `beacon` &gt; `xhrpost` &gt; `image`. Solo se utilizará un método de transporte y será el de mayor prioridad permitido que esté disponible. Si el user-agent del cliente no admite alguno de los métodos, se usará el siguiente método habilitado en la escala de prioridad. De forma predeterminada, los cuatro métodos anteriores están habilitados.

En el ejemplo siguiente, no se especifica una URL de `iframe`, y `beacon` y `xhrpost` están definidos en `false`, por lo que no se utilizarán aunque tengan mayor prioridad que `image`. De forma predeterminada, `image` se definiría en `true`, pero se indica explícitamente en este caso. Si el user-agent del cliente admite el método de `image`, se utilizará; de lo contrario, no se enviaría ninguna solicitud.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true
}
```

Para obtener más información, consulta [este ejemplo en el que se implementa la API de cliente de transporte de iframe](https://github.com/ampproject/amphtml/blob/master/examples/analytics-iframe-transport-remote-frame.html) y [esta página de ejemplo que incorpora ese iframe](https://github.com/ampproject/amphtml/blob/master/examples/analytics-iframe-transport.amp.html). En el ejemplo se carga un [anuncio falso](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html) que contiene la etiqueta `amp-analytics`. Ten en cuenta que el contenido del anuncio falso incluye algunas instrucciones de configuración adicionales que se deben seguir.

##### Opción useBody para parámetros de URL adicionales <a name="use-body-for-extra-url-params"></a>

La opción de configuración `useBody` indica si se debe incluir `extraUrlParams` en el cuerpo de la solicitud POST en lugar de en la URL como parámetros de consulta con codificación URL.

`useBody` solo está disponible para los métodos de transporte `beacon` y `xhrpost`. Si `useBody` se define en "true" y se utiliza junto con cualquiera de estos métodos de transporte, los `extraUrlParams` se envían en el cuerpo de la solicitud POST. De lo contrario, el cuerpo de la solicitud que se envíe estará vacío y los `extraUrlParams` se incluirán como parámetros de URL.

Con `useBody`, puedes incluir objetos anidados en `extraUrlParams`. Sin embargo, si la solicitud usa otras opciones de transporte que no admiten `useBody` (por ejemplo, `image`), estos objetos anidados se codificarán tipo string en la URL como `[object Object]`.

```javascript
"transport": {
  "beacon": true,
  "xhrpost": true,
  "useBody": true,
  "image": false
}
```

##### Política de referencia <a name="referrer-policy"></a>

La política de referencia se puede especificar como campo `referrerPolicy` en la configuración de `transport`. Actualmente, solo se admite `no-referrer`.
La política de referencia solo está disponible para el método de transporte `image`. Si se especifica `referrerPolicy: no-referrer`, los métodos de transporte `beacon` y `xhrpost` se anulan y se les asigna el valor `false`.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true,
  "referrerPolicy": "no-referrer"
}
```

#### Vinculaciones <a name="linkers"></a>

La función `linkers` se utiliza para habilitar la sincronización de IDs entre diferentes dominios. `amp-analytics` utilizará un [objeto de configuración](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/linker-id-forwarding.md#format) para crear una "cadena de linker", que se añadirá a los enlaces salientes especificados en la página como parámetro de URL. Cuando un usuario hace clic en uno de estos enlaces, la página de destino leerá la cadena de vinculación del parámetro de URL para sincronizar los ID. Normalmente, se utiliza para unir sesiones de usuario en un dominio proxy AMP y en un dominio de editor.

En el artículo sobre [reenvío de IDs de vinculación](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/linker-id-forwarding.md) encontrarás información detallada sobre cómo definir la configuración de vinculación.

Para ingerir este parámetro, consulta el artículo sobre [recepción de IDs de vinculación](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/linker-id-receiving.md) y sabrás cómo se crea.

#### Cookies <a name="cookies"></a>

La función `cookies` admite la escritura de cookies en el dominio de origen extrayendo información de [`QUERY_PARAM`](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#query-parameter) y [`LINKER_PARAM`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/linker-id-receiving.md#linker-param) de la URL del documento. Se puede utilizar junto con las funciones de `linkers` para realizar la sincronización de los ID desde el dominio proxy AMP hasta las páginas AMP del dominio de un editor.

Para obtener más información sobre cómo definir la configuración de `cookies`, consulta el apartado sobre la [recepción de parámetros de vinculación en páginas AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/linker-id-receiving.md#receiving-linker-params-on-amp-pages).

## Validación <a name="validation"></a>

Consulta [las reglas de amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/validator-amp-analytics.protoascii) en la especificación de la herramienta de validación de AMP.

### Atributos válidos para `<amp-analytics>` <a name="valid-attributes-for-"></a>

Estos son los atributos válidos para el componente `amp-analytics`:

**type**

Especifica el tipo de proveedor.  Para obtener más información, consulta la lista de [proveedores de analíticas](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md).

Ejemplo:

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json"></amp-analytics>
```

**config**

Se trata de un atributo opcional que se puede utilizar para cargar una configuración desde una URL remota especificada. La URL especificada debe utilizar el esquema HTTPS. Consulta también el atributo `data-include-credentials` más abajo. La URL puede incluir [variables de URL de AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). La respuesta debe seguir las [directrices de seguridad de AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).

Ejemplo:

```html
<amp-analytics config="https://example.com/analytics.config.json"></amp-analytics>
```

**data-credentials**<a name="data-credentials"></a>

Si se define en `include`, se activa la capacidad de leer y escribir cookies en la solicitud especificada mediante el atributo `config`. Es un atributo opcional.

**data-consent-notification-id**

Si se proporciona, la página no procesará las solicitudes de analíticas hasta que el usuario confirme (acepte) [amp-user-notification](amp-user-notification.md) con el ID de elemento HTML especificado. Es un atributo opcional.

## Analytics para componentes AMP <a name="analytics-for-amp-components"></a>

Los desarrolladores de componentes AMP pueden implementar colecciones de datos mediante las analíticas para AMP. Para obtener más información, consulta el artículo sobre la [implementación de analíticas para componentes AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-components-analytics.md).
