---
$title: Seguimiento del compromiso con analíticas
---

Las plataformas de Google Analytics se integran comúnmente en sitios web a través de fragmentos JavaScript en línea y llamadas de función, que activan eventos que se envían al sistema analítico. AMP proporciona una sintaxis de configuración flexible de JSON para replicar este proceso para varios partners de análisis.

El siguiente es un ejemplo de seguimiento tradicional de Google Analytics basado en JavaScript. Vamos a reescribir esto en el formato JSON de [amp-analytics'](/es/docs/reference/components/amp-analytics.html), pero primero, veamos el enfoque tradicional:

```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```

Este JavaScript es bastante simple; envía una notificación para realizar un seguimiento del evento pageview.

Para replicar esta funcionalidad en AMP, primero debemos **incluir** la biblioteca de componentes [amp-analytics](/es/docs/reference/components/amp-analytics.html)  en el `<head>` de nuestro documento:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Luego, vamos a **agregar** el componente `amp-analytics` al final del `body del documento:

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

Puede parecer más complicado, pero en realidad es un formato muy flexible para describir varios tipos diferentes de eventos. Además, el formato de JSON no incluye la gota del código del Javascript que vimos en el ejemplo tradicional, que podría conducir potencialmente a errores si se altera accidentalmente.

En el formato JSON, la tecla `triggers` incluye un conjunto de claves que representan todos los disparadores de eventos que queremos realizar el seguimiento. Las claves de estos desencadenantes son descripciones del evento, por ejemplo, `"default pageview"`. El valor de clave de `title` representa el nombre de la página que se está viendo.

Basándonos en el ejemplo anterior, podemos **agregar** otro disparador denominado `"click on #header trigger"`:

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

Este disparador es exactamente lo que suena. Utilizando el selector DOM `"#header"`, podemos consultar una etiqueta con el ID de `"#header"`. Para el evento `"click"`, enviamos una acción de evento `“clicked-header”` a la plataforma de análisis con la etiqueta de categoría `“examples”`.

Si tiene una plataforma de seguimiento personalizada con la que desea integrarse, puede seguir utilizando `amp-analytics` y definir sus propios puntos finales de URL personalizados para enviar datos de seguimiento. Obtenga más información en la documentación de referencia del componente [amp-analytics](/es/docs/reference/components/amp-analytics.html).

Nota: En todos estos ejemplos de análisis, `“UA-YYYY-Y”` debe reemplazarse con el código de seguimiento de Google Analytics de su propio sitio web.

Tip: Si está interesado en un sistema de seguimiento más simple, puede que desee echar un vistazo a [amp-pixel](/es/docs/reference/components/amp-pixel.html). Si sólo necesita realizar el seguimiento de las vistas de página, amp-pixel es una solución más ligera que amp-analytics porque sólo tiene como objetivo resolver los requisitos del seguimiento de píxeles tradicional. Obtenga más información en [Analytics: aspectos básicos]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md', locale=doc.locale).url.path}}).

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/adding_carousels.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/navigating.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próximo</span></a>
</div>
