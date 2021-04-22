---
$title: "Analytics: aspectos básicos"
---

Con este artículo conocerás los aspectos básicos de Analytics en las páginas AMP.

## ¿Se debe utilizar amp-pixel o amp-analytics? <a name="use-amp-pixel-or-amp-analytics"></a>

AMP ofrece dos componentes distintos para poder realizar los análisis y mediciones que necesites: [amp-pixel](../../../../documentation/components/reference/amp-pixel.md) y [amp-analytics](../../../../documentation/components/reference/amp-analytics.md). Ambas opciones envían análisis a un punto determinado.

Si lo que buscas es un comportamiento como el de un [píxel de seguimiento sencillo](https://en.wikipedia.org/wiki/Web_beacon#Implementation), opta por el componente [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), que te permite obtener datos básicos del seguimiento de páginas vistas. Además, estos datos se envían a la URL que se defina. Puede que este componente sea necesario en algunas integraciones con un proveedor. En este caso, determinarán el punto de acceso a la URL.

En la mayor parte de las soluciones de análisis se debe utilizar [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). El seguimiento de páginas vistas también funciona con [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). También puedes hacer el seguimiento de la interacción de los usuarios con cualquier tipo de contenido de la página, incluidos los clics en los enlaces y en los botones. Además, permite medir hasta qué punto de la página llegó el usuario o saber si el usuario utilizó los medios sociales, entre otros datos.

Más información: Consulta el artículo [Información detallada de AMP Analytics](deep_dive_analytics.md)

Como parte de la integración en la plataforma AMP, los proveedores han ofrecido configuraciones de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) predefinidas, con lo que es más fácil captar datos y enviarlos a las herramientas de seguimiento. Se puede acceder a la documentación del proveedor desde la lista [de proveedores de Analytics](analytics-vendors.md).

En lo que respecta a tus páginas, puedes utilizar tanto [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) como [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) en ellas: [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) para realizar un seguimiento sencillo de páginas vistas y [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) para todo lo demás. También puedes añadir varias veces la misma etiqueta. Si estás trabajando con varios proveedores de Analytics, necesitarás una etiqueta por cada solución. Ten en cuenta que los usuarios prefieren páginas AMP más sencillas, así que no utilices etiquetas adicionales si no son necesarias.

## Crear una configuración de análisis sencilla

Aprende a crear una configuración de [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)
y [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) sencilla.

### Configuración de amp-pixel sencilla

Para crear una configuración de [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) sencilla, inserta en tu página AMP algún elemento como el que se muestra en el siguiente ejemplo:

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

En este ejemplo, los datos sobre páginas vistas se envían a la URL definida junto con un número aleatorio. La variable `RANDOM` es una de las muchas [variables de sustitución de la plataforma AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md). Obtén más información acerca de [la sustitución de variables](analytics_basics.md#variable-substitution) en este artículo.

El componente [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) está integrado, de modo que no necesitas ninguna declaración de inclusión como sucedería si fuera un componente ampliado de AMP, como [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). No obstante, debes colocar la etiqueta [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) lo más cerca posible del inicio de tu etiqueta `<body>`. El píxel de seguimiento solo se activará cuando se visualice la etiqueta. Si [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) se coloca cerca del final de la página, no se activará.

### Configuración de amp-analytics sencilla

Para crear una configuración de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)  sencilla, antes debes incluir en el documento AMP la declaración `custom-element` que se indica a continuación `<head>`
(consulta la sección sobre [cómo incluir componentes](../../../../documentation/components/index.html)):

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

El siguiente ejemplo es parecido al [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Cuando se visualiza una página, el evento de activación se pone en marcha y envía los datos de página vista junto con un número de identificación aleatorio a una URL previamente definida:

```html
<amp-analytics>

<script type="application/json">
{
  "requests": {
      "pageview": "https://foo.com/pixel?RANDOM",
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

En el ejemplo anterior hemos definido una solicitud denominada "pageview" para que fuera `https://foo.com/pixel?RANDOM`.  Como hemos explicado anteriormente, RANDOM se sustituye por un número aleatorio, de modo que la solicitud al final tendrá un aspecto similar a este `https://foo.com/pixel?0.23479283687235653498734`.

Al visualizarse la página (según lo especificado por el uso de la palabra clave de activación `visible`), se activa un evento y se envía la solicitud de `pageview` mencionada. El atributo triggers determina el momento en el que se activa la solicitud de página vista. Obtén más información sobre las [solicitudes y los activadores](deep_dive_analytics.md#requests-triggers--transports).

## Sustitución de variables <a name="variable-substitution"></a>

Los componentes [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)
y [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)
permiten todas las sustituciones de variables de URL estándares (consulta el artículo sobre [sustituciones de variables AMP HTML](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md). En el ejemplo siguiente, la solicitud de página vista se envía a la URL junto con la URL canónica del documento de AMP actual, su title y un [ID de cliente](analytics_basics.md):

```html
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
```

La sencillez de la etiqueta [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)
solo le permite incluir las variables definidas por la plataforma o con un tiempo de ejecución AMP que permita hacer un análisis desde la página AMP. En el ejemplo anterior, la plataforma rellena los valores de `canonicalURL` y de `clientId(site-user-id)`. La etiqueta [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) puede incluir las mismas variables que [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), así como variables con una definición única en la configuración de etiquetas.

Utiliza el formato `${varName}` en las cadenas de solicitudes que usan una variable definida para la página o la plataforma. La etiqueta [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) sustituirá la plantilla con su valor real en el momento de crear la solicitud de Analytics (consulta el artículo sobre [variables admitidas en `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

En el ejemplo de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) que se encuentra a continuación, la solicitud de página vista se envía a la URL junto con otros datos extraídos de las sustituciones de variables, algunos proporcionados por la plataforma y otros definidos como insertados en la configuración de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics>

<script type="application/json">

  {"requests": {
      "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
      "account": "ABC123",
  },
  "triggers": {
      "someEvent": {
        "on": "visible",
        "request": "pageview",
        "vars": {
          "title": "My homepage",
      }
    }
  }
}
</script>
</amp-analytics>
```

En el ejemplo anterior, las variables, `account` y `title` aparecen definidas en la configuración [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Las variables `canonicalUrl` y `clientId` no están definidas en la configuración y, por lo tanto, la plataforma sustituye sus valores.

Importante: La sustitución de variables es flexible, lo que significa que puedes tener las mismas variables definidas en distintas ubicaciones y que el tiempo de ejecución de AMP analizará los valores en este orden de procedencia (consulta el apartado [Orden de sustitución de variables](deep_dive_analytics.md#variable-substitution-ordering) ).

## Identificación del usuario <a name="user-identification"></a>

Los sitios web usan cookies para almacenar información concreta sobre el uso que se hace del navegador. Estas cookies pueden servir para saber si el usuario ya había visitado un sitio web. En AMP, las páginas se pueden publicar desde el sitio web del editor o una caché (como por ejemplo la Google AMP Cache). Lo más probable es que el sitio web del editor y la caché tengan dominios distintos. Por motivos de seguridad, los navegadores pueden, y suelen, limitar el acceso a las cookies de otro dominio (consulta también el artículo sobre [el seguimiento de usuarios en diversos orígenes](https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md)).

De manera predeterminada, AMP realizará la gestión de cuentas de un ID de cliente tanto si el acceso a la página se hace desde el sitio web original del editor como si se hace a través de una caché. El ID de cliente generado por AMP tiene un valor de `"amp-"` followed by a random `base64` y se mantiene para el usuario si este vuelve a visitar la página.

AMP gestiona la lectura y la escritura del ID de cliente en todos los casos. Esto es especialmente importante cuando se publica una página a través de una caché o se muestra fuera del contexto de visualización del sitio web original del editor. En estos casos, no se puede acceder a las cookies del sitio web del editor.

Cuando se publica una página AMP a través del sitio web de un editor, se puede decir al framework del ID de cliente que usa AMP que busque y use una cookie alternativa. En este caso, el argumento `cid-scope-cookie-fallback-name` de la variable `clientId` se interpreta como el nombre de una cookie. El formato puede aparecer como `CLIENT_ID(cid-scope-cookie-fallback-name)` o `${clientId(cid-scope-cookie-fallback-name)}`.

Por ejemplo,

```html
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
```

Si AMP detecta que esta cookie está definida, la sustitución del ID de cliente devolverá el valor de la cookie. Si AMP detecta que esta cookie no está definida, AMP generará un valor de la forma `amp-` seguida por una cadena codificada base64 aleatoria.

Si quieres obtener más información acerca de la sustitución del ID de cliente y de cómo añadir una ID de notificación del usuario opcional, consulta el artículo sobre [variables compatibles con las analíticas de AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md).

Más información: Obtén más información sobre Analytics en [Información detallada de AMP Analytics](deep_dive_analytics.md) y [Casos de uso](use_cases.md).
