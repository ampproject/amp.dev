---
$title: "Analytics: aspectos básicos"
$order: 0
toc: true
---

Con este artículo conocerás los aspectos básicos de Analytics en las páginas AMP.

[TOC]

## ¿Se debe utilizar amp-pixel o amp-analytics?

AMP ofrece dos componentes distintos para poder realizar los análisis y mediciones que necesites: [amp-pixel](/es/docs/reference/amp-pixel.html) y [amp-analytics](/es/docs/reference/extended/amp-analytics.html). Ambas opciones envían análisis a un punto determinado.

Si lo que buscas es un comportamiento como el de un [píxel de seguimiento sencillo](https://en.wikipedia.org/wiki/Web_beacon#Implementation), opta por el componente `amp-pixel`, que te permite obtener datos básicos del seguimiento de páginas vistas. Además, estos datos se envían a la URL que se defina. Puede que este componente sea necesario en algunas integraciones con un proveedor. En este caso, determinarán el punto de acceso a la URL.

En la mayor parte de las soluciones de análisis se debe utilizar `amp-analytics`. El seguimiento de páginas vistas también funciona con `amp-analytics`. También puedes hacer el seguimiento de la interacción de los usuarios con cualquier tipo de contenido de la página, incluidos los clics en los enlaces y en los botones. Además, permite medir hasta qué punto de la página llegó el usuario o saber si el usuario utilizó los medios sociales, entre otros datos.

{% call callout('Más información', type='read') %}
Consulta el artículo [Información detallada de AMP Analytics](/es/docs/guides/analytics/deep_dive_analytics.html)
.{% endcall %}

Como parte de la integración en la plataforma AMP, los proveedores han ofrecido configuraciones de `amp-analytics` predefinidas, con lo que es más fácil captar datos y enviarlos a las herramientas de seguimiento. Se puede acceder a la documentación del proveedor desde la lista [de proveedores de Analytics](/es/docs/guides/analytics/analytics-vendors.html).

En lo que respecta a tus páginas, puedes utilizar tanto `amp-pixel` como `amp-analytics` en ellas: `amp-pixel` para realizar un seguimiento sencillo de páginas vistas y `amp-analytics` para todo lo demás. También puedes añadir varias veces la misma etiqueta. Si estás trabajando con varios proveedores de Analytics, necesitarás una etiqueta por cada solución. Ten en cuenta que los usuarios prefieren páginas AMP más sencillas, así que no utilices etiquetas adicionales si no son necesarias.

## Crear una configuración de análisis sencilla


Aprende a crear una configuración de [amp-pixel](/es/docs/reference/amp-pixel.html)
y [amp-analytics](/es/docs/reference/extended/amp-analytics.html) sencilla.

### Configuración de amp-pixel sencilla

Para crear una configuración de `amp-pixel` sencilla, inserta en tu página AMP algún elemento como el que se muestra en el siguiente ejemplo:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
[/sourcecode]

En este ejemplo, los datos sobre páginas vistas se envían a la URL definida junto con un número aleatorio. La variable `RANDOM` es una de las muchas [variables de sustitución de la plataforma AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). Obtén más información acerca de [la sustitución de variables](/es/docs/guides/analytics/analytics_basics.html#variable-substitution) en este artículo.

El componente [amp-pixel](/es/docs/reference/amp-pixel.html) está integrado, de modo que no necesitas ninguna declaración de inclusión como sucedería si fuera un componente ampliado de AMP, como `amp-analytics`. No obstante, debes colocar la etiqueta `amp-pixel` lo más cerca posible del inicio de tu etiqueta `<body>`. El píxel de seguimiento solo se activará cuando se visualice la etiqueta. Si `amp-pixel` se coloca cerca del final de la página, no se activará.

### Configuración de amp-analytics sencilla


Para crear una configuración de [amp-analytics](/es/docs/reference/extended/amp-analytics.html)  sencilla, antes debes incluir en el documento AMP la declaración `custom-element` que se indica a continuación `<head>`
(consulta la sección sobre [cómo incluir componentes](/es/docs/reference/extended.html#component-inclusion-declaration)):

[sourcecode:html]

<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>

[/sourcecode]

El siguiente ejemplo es parecido al [ejemplo de `amp-pixel`](/es/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration). Cuando se visualiza una página, el evento de activación se pone en marcha y envía los datos de página vista junto con un número de identificación aleatorio a una URL previamente definida:

[sourcecode:html]
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
[/sourcecode]

En el ejemplo anterior hemos definido una solicitud denominada "pageview" para que fuerahttps://foo.com/pixel?RANDOM.  Como hemos explicado anteriormente, RANDOM se sustituye por un número aleatorio, de modo que la solicitud al final tendrá un aspecto similar a este https://foo.com/pixel?0.23479283687235653498734.

Al visualizarse la página (según lo especificado por el uso de la palabra clave de activación `visible`), se activa un evento y se envía la solicitud de `pageview` mencionada. El atributo triggers determina el momento en el que se activa la solicitud de página vista. Obtén más información sobre las [solicitudes y los activadores](/es/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports).

## Sustitución de variables

Los componentes [amp-pixel](/es/docs/reference/amp-pixel.html)
y [amp-analytics](/es/docs/reference/extended/amp-analytics.html)
permiten todas las sustituciones de variables de URL estándares (consulta el artículo sobre [sustituciones de variables AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). En el ejemplo siguiente, la solicitud de página vista se envía a la URL junto con la URL canónica del documento de AMP actual, su title y un [ID de cliente](/es/docs/guides/analytics/analytics_basics.html#user-identification):

[sourcecode:html]
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
[/sourcecode]

La sencillez de la etiqueta `amp-pixel`
solo le permite incluir las variables definidas por la plataforma o con un tiempo de ejecución AMP que permita hacer un análisis desde la página AMP. En el ejemplo anterior, la plataforma rellena los valores de `canonicalURL` y de `clientId(site-user-id)`. La etiqueta `amp-analytics` puede incluir las mismas variables que `amp-pixel`, así como variables con una definición única en la configuración de etiquetas.

Utiliza el formato `${varName}` en las cadenas de solicitudes que usan una variable definida para la página o la plataforma. La etiqueta `amp-analytics` sustituirá la plantilla con su valor real en el momento de crear la solicitud de Analytics (consulta el artículo sobre [variables admitidas en amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

En el ejemplo de `amp-analytics` que se encuentra a continuación, la solicitud de página vista se envía a la URL junto con otros datos extraídos de las sustituciones de variables, algunos proporcionados por la plataforma y otros definidos como insertados en la configuración de `amp-analytics`:

[sourcecode:html]
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
[/sourcecode]

En el ejemplo anterior, las variables, `account` y `title` aparecen definidas en la configuración `amp-analytics`. Las variables `canonicalUrl` y `clientId` no están definidas en la configuración y, por lo tanto, la plataforma sustituye sus valores.

{% call callout('Importante', type='caution') %}
La sustitución de variables es flexible, lo que significa que puedes tener las mismas variables definidas en distintas ubicaciones y que el tiempo de ejecución de AMP analizará los valores en este orden de procedencia (consulta el apartado [Orden de sustitución de variables](/es/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)
).{% endcall %}

## Identificación del usuario


Los sitios web usan cookies para almacenar información concreta sobre el uso que se hace del navegador. Estas cookies pueden servir para saber si el usuario ya había visitado un sitio web. En AMP, las páginas se pueden publicar desde el sitio web del editor o una caché (como por ejemplo la Google AMP Cache). Lo más probable es que el sitio web del editor y la caché tengan dominios distintos. Por motivos de seguridad, los navegadores pueden, y suelen, limitar el acceso a las cookies de otro dominio (consulta también el artículo sobre [el seguimiento de usuarios en diversos orígenes](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)).

De manera predeterminada, AMP realizará la gestión de cuentas de un ID de cliente tanto si el acceso a la página se hace desde el sitio web original del editor como si se hace a través de una caché. El ID de cliente generado por AMP tiene un valor de `"amp-"` followed by a random `base64` y se mantiene para el usuario si este vuelve a visitar la página.

AMP gestiona la lectura y la escritura del ID de cliente en todos los casos. Esto es especialmente importante cuando se publica una página a través de una caché o se muestra fuera del contexto de visualización del sitio web original del editor. En estos casos, no se puede acceder a las cookies del sitio web del editor.

Cuando se publica una página AMP a través del sitio web de un editor, se puede decir al framework del ID de cliente que usa AMP que busque y use una cookie alternativa. En este caso, el argumento `cid-scope-cookie-fallback-name` de la variable `clientId` se interpreta como el nombre de una cookie. El formato puede aparecer como `CLIENT_ID(cid-scope-cookie-fallback-name)` o `${clientId(cid-scope-cookie-fallback-name)}`.

Por ejemplo,

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
[/sourcecode]

Si AMP detecta que esta cookie está definida, la sustitución del ID de cliente devolverá el valor de la cookie. Si AMP detecta que esta cookie no está definida, AMP generará un valor de la forma `amp-` seguida por una cadena codificada base64 aleatoria.


Si quieres obtener más información acerca de la sustitución del ID de cliente y de cómo añadir una ID de notificación del usuario opcional, consulta el artículo sobre [variables compatibles con las analíticas de AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).

{% call callout('Más información', type='read') %}
Obtén más información sobre Analytics en [Información detallada de AMP Analytics](/es/docs/guides/analytics/deep_dive_analytics.html) y [Casos de uso](/es/docs/guides/analytics/use_cases.html)
.{% endcall %}
