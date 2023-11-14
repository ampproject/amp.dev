---
'$title': Seguimiento del compromiso mediante estadísticas
$order: 4
description: Las plataformas de análisis se integran comúnmente en sitios web mediante fragmentos JavaScript en línea y llamadas de función, los cuales activan eventos que se envían al sistema de análisis.
---

Las plataformas de análisis generalmente se integran en los sitios web mediante fragmentos de JavaScript para estilos integrados en el código y llamadas de funciones, los cuales activan eventos que se regresan al sistema de análisis. AMP proporciona una configuración flexible para la sintaxis de JSON, con la finalidad de que varios de los socios que participan en el análisis puedan replicar este proceso.

El siguiente es un ejemplo de seguimiento tradicional de Google Analytics basado en JavaScript. Vamos a reescribir esto en el formato JSON de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), pero primero, veamos el enfoque tradicional:

```html
<script>
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    'script',
    '//www.google-analytics.com/analytics.js',
    'ga'
  );

  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
</script>
```

Este JavaScript es bastante simple, envía una notificación para hacer un seguimiento del evento pageview.

Para replicar esta función en AMP, primero debemos **incluir** la biblioteca de componentes [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) en el `<head>` de nuestro documento:

```html
<script
  async
  custom-element="amp-analytics"
  src="https://ampjs.org/v0/amp-analytics-0.1.js"
></script>
```

Después, **agregaremos** el componente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) al final del <code>body</code> del documento:

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-YYYY-Y"
      },
      "triggers": {
        "default pageview": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "Name of the Article"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Al igual que con el ejemplo de JavaScript en la parte superior de esta página, este fragmento de <a><code>amp-analytics</code></a> enviará una notificación a Google Analytics para indicar que se vio una página.

Para especificar esto, configuramos el `type` en ` googleanalytics` y luego, en el JSON, creamos un activador que llamamos "vista de página predeterminada". Este activador se accionará cuando la página esté visible (debido al `"on": "visible"`) y cuando se active, enviaremos una solicitud de análisis de <code>pageview</code> a Google Analytics. con las <code>vars</code> que especificamos.

El JSON que se usa para configurar <a><code data-md-type="codespan">amp-analytics</code></a> es un formato muy flexible para describir cuáles datos de análisis se enviarán y cuándo enviarlos. El <a><code>amp-analytics</code></a> tiene detalles completos sobre el formato.

Basándonos en el ejemplo anterior, podemos <strong>agregar</strong> otro disparador denominado `"click on #header trigger"`:

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-YYYY-Y"
      },
      "triggers": {
        "default pageview": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "Name of the Article"
          }
        },
        "click on #header trigger": {
          "on": "click",
          "selector": "#header",
          "request": "event",
          "vars": {
            "eventCategory": "examples",
            "eventAction": "clicked-header"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Como puede adivinarse por el nombre de este nuevo activador, se accionará cuando se haga clic en el elemento con el ID <code>"encabezado"</code> (especificado por `"en": "clic"` y <code>"selector": "#header"</code>). Cuando se accione este activador, enviaremos la solicitud `event` a nuestro proveedor de análisis, especificando un par de variables que se incluirán en la solicitud.

Nota: En todos estos ejemplos de análisis, `“UA-YYYY-Y”` debe reemplazarse con el código de seguimiento de Google Analytics de su propio sitio web.

[tip type="note"] **NOTA:** <code>“UA-YYYY-Y”</code> es un ejemplo de cuenta de Google Analytics. Debe reemplazarse con el código de seguimiento de Google Analytics de su propio sitio web si utiliza este ejemplo en su sitio. [/tip]

[tip type="tip"] **SUGERENCIA:** Si le interesa un sistema de seguimiento más sencillo, recomendamos que le dé un vistazo a [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Si solamente necesita realizar un seguimiento de las vistas de página, [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) es una solución más ligera que [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), ya que su único objetivo es resolver los requisitos habituales de los píxeles de seguimiento. Puede obtener más información en [Analytics: la guía básica](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
