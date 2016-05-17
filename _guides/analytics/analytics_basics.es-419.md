---
layout: page
title: Analytics&#58; aspectos básicos
order: 0
locale: es-419
---

Comienza aquí para informarte acerca de los aspectos básicos del análisis de AMP.

{% include toc.html %}

## ¿amp-pixel o amp-analytics?

AMP proporciona dos componentes para satisfacer tus necesidades en términos de análisis y medición:
[amp-pixel](/docs/reference/amp-pixel.html) y
[amp-analytics](/docs/reference/extended/amp-analytics.html).
Ambas opciones envían datos del análisis a un terminal definido.

Si buscas un comportamiento, como un simple
[píxel de seguimiento](https://en.wikipedia.org/wiki/Web_beacon#Implementation),
el componente `amp-pixel` proporciona seguimiento básico de las vistas de la página y
los datos de vista de la página se envían a una dirección URL definida.
Algunas integraciones con un proveedor pueden llamar a este componente,
en cuyo caso especificarán el terminal de URL exacto. 

Para la mayoría de las soluciones de análisis, usa `amp-analytics`.
El seguimiento de vistas de páginas también funciona en `amp-analytics`.
Sin embargo, también puedes realizar un seguimiento de la captación de usuarios con cualquier tipo de contenido de la página,
incluidos los clics en vínculos y botones.
A su vez, puedes obtener una medición del punto hasta el cual el usuario navegó en la página y
si usó o no redes sociales, entre otras alternativas
(consulta
[Análisis profundo de AMP Analytics](/docs/guides/analytics/deep_dive_analytics.html)).

Como parte de la integración con la plataforma de AMP,
los proveedores han ofrecido configuraciones de `amp-analytics` predefinidas
a fin de que resulte fácil capturar datos y enviarlos a sus herramientas de seguimiento.
Accede a documentación del proveedor desde la
[especificación de amp-analytics](/docs/reference/extended/amp-analytics.html).

En tus páginas puedes usar `amp-pixel` y `amp-analytics`:
`amp-pixel` para un seguimiento de vistas de página simple
y`amp-analytics` para todo lo demás.
También puedes agregar múltiplos de cada etiqueta.
Si trabajas con varios proveedores de herramientas de análisis,
necesitarás una etiqueta por solución.
Recuerda que las páginas AMP más simples son mejores para los usuarios.
Por lo tanto, si no necesitas etiquetas adicionales no las uses.

## Crea una configuración de análisis simple

Aprende a crear una configuración simple para
[amp-pixel](/docs/reference/amp-pixel.html) y
[amp-analytics](/docs/reference/extended/amp-analytics.html).

### Configuración simple de amp-pixel

Para crear una configuración simple de `amp-pixel`,
inserta algo como lo siguiente en el cuerpo de tu página AMP:

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
{% endhighlight %}

En este ejemplo,
los datos de las vistas de página se envían a la dirección URL definida junto con un número aleatorio.
La variable `RANDOM` es una de muchas
[variables de sustitución en la plataforma AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).
Obtén más información sobre la
[Sustitución de variables](/docs/guides/analytics/analytics_basics.html#variable-substitution) aquí.

El componente [amp-pixel](/docs/reference/amp-pixel.html)
está integrado,
por lo que no necesitas una declaración de inclusión como la que se requiere
para los componentes ampliados de AMP, incluido `amp-analytics`.
Sin embargo, debes colocar la etiqueta `amp-pixel` tan cerca como sea posible
del inicio de tu `<body>`.
El píxel de seguimiento solo se activará cuando aparezca la etiqueta.
Si `amp-pixel` se posiciona cerca de la parte inferior de la página,
es posible que no se active.

### Configuración simple de amp-analytics

Si deseas crear una configuración simple para
[amp-analytics](/docs/reference/extended/amp-analytics.html),
primero debes incluir esta declaración de `custom-element`
en el `<head>` del documento de AMP (consulta también la sección de
[declaración de inclusión de componentes](/docs/reference/extended.html#component-inclusion-declaration)):

{% highlight html %}
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
{% endhighlight %}

El siguiente ejemplo es similar al [ejemplo de `amp-pixel`](/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration).
Cada vez que una página es visible,
el evento desencadenante se activa y
envía los datos de vista de página a una dirección URL definida junto con un Id. aleatorio: 

{% highlight html %}
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
{% endhighlight %}

En el ejemplo anterior, definimos una solicitud llamada “pageview” para que sea https://foo.com/pixel?RANDOM. Como se indicó antes, RANDOM se reemplaza por un número aleatorio, de modo que el aspecto final de la solicitud será el siguiente: https://foo.com/pixel?0.23479283687235653498734.

Cuando la página es visible
(según se especifique con la palabra clave de activación `visible`),
se activa un evento y se envía la solicitud de `pageview`.
El atributo triggers determina cuándo se debe activar la solicitud de vistas de página.
Obtén más información acerca de los atributos [requests y triggers](/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports).

## Sustitución de variables

Los componentes [amp-pixel](/docs/reference/amp-pixel.html) y
[amp-analytics](/docs/reference/extended/amp-analytics.html)
permiten todas las sustituciones de variables de URL estándares (consulta
[Sustitución de variables de AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)).
En el ejemplo siguiente,
se envía la solicitud de vistas de página a la URL
junto con la URL canónica del documento de AMP actual, su título y un
[Id. de cliente](/docs/guides/analytics/analytics_basics.html#user-identification):

{% highlight html %}
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
{% endhighlight %}

Debido a su simpleza,
la etiqueta `amp-pixel` solo puede incluir variables definidas por la plataforma
o que el tiempo de ejecución de AMP pueda analizar desde la página AMP.
En el ejemplo anterior,
la plataforma completa los valores para
`canonicalURL` y `clientId(site-user-id)`.
La etiqueta `amp-analytics` puede incluir las mismas variables que`amp-pixel`,
o bien variables exclusivas dentro de la configuración de la etiqueta.

Usa el formato `${varName}` en una cadena de solicitud de una página
o una variable definida por la plataforma.
La etiqueta `amp-analytics` reemplazará la plantilla por su valor real
al crearse la solicitud de análisis (consulta también
[Variables admitidas en amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

En el siguiente ejemplo de `amp-analytics`,
la solicitud de vistas de página se envía a la URL
con datos adicionales extraídos de las sustituciones de variables,
algunos proporcionados por la plataforma y
otros definidos en línea,
dentro de la configuración de `amp-analytics`:

{% highlight html %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
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
{% endhighlight %}

En el ejemplo anterior,
las variables `account` y `title` se definen
en la configuración de `amp-analytics`.
Las variables `canonicalUrl` y `clientId` no se definen en la configuración,
por lo cual la plataforma reemplaza sus valores.

**Importante:** La sustitución de variables es flexible.
Puedes definir las mismas variables en diferentes ubicaciones,
y el tiempo de ejecución de AMP analizará los valores en ese orden de precedencia
(consulta [Orden de sustitución de variables](/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)).

## Identificación de usuarios

Los sitios web usan cookies para almacenar en el navegador información específica de un usuario.
Las cookies se pueden usar para indicar que un usuario visitó un sitio con anterioridad.
En AMP,
las páginas pueden provenir del sitio web de un editor o de un caché
(como el Google AMP Cache).
El sitio web del editor y el caché posiblemente tengan dominios diferentes.
Por motivos de seguridad,
los navegadores pueden limitar el acceso a las cookies de otro dominio
y a menudo lo harán (consulta también
[Seguimiento de usuarios en diferentes orígenes](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md)).

De forma predeterminada,
AMP administrará el suministro de un Id. de cliente, ya sea para acceder a la página desde el sitio web original de un editor o a través de un caché.
El Id. de cliente generado por AMP tiene un valor `"amp-"`
seguido por una cadena `base64` codificada y se mantiene igual
para el usuario si vuelve a visitar la página.

AMP administra la lectura y escritura del Id. de cliente en todos los casos.
Esto es particularmente evidente cuando se accede a una página
a través de un caché o se la muestra fuera del contexto de visualización
del sitio original del editor.
En esa circunstancia, no es posible acceder a las cookies del sitio del editor.

Cuando se accede a una página AMP desde el sitio de un editor,
es posible notificar al framework del Id. de cliente que usa AMP sobre una cookie de reserva
que se puede buscar y usar.
En este caso,
el argumento `cid-scope-cookie-fallback-name` de la variable `clientId` 
se interpreta como un nombre de cookie.
El formato puede ser de
`CLIENT_ID(cid-scope-cookie-fallback-name)` o
`${clientId(cid-scope-cookie-fallback-name)}`.

Por ejemplo:

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
{% endhighlight %}

Si AMP detecta que esa cookie está definida,
la sustitución de Id. de cliente devolverá el valor de esta.
Si AMP detecta que la cookie no está definida,
AMP generará un valor con la forma `amp-` seguido
por una cadena base64 aleatoria codificada.

Obtén más información acerca de la sustitución de Id. de cliente,
incluida la manera de agregar un Id. de notificación de usuario opcional, en
[Variables admitidas en AMP Analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).
