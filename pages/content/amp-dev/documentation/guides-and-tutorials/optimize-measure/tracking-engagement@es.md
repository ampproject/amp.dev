---
$title: Cómo configurar análisis básicos para sus páginas de AMP
$order: 100
description: Las plataformas de análisis generalmente se integran en los sitios web mediante fragmentos de JavaScript para estilos integrados en el código y llamadas de funciones, los cuales activan eventos que se regresan al sistema de análisis.
tutorial: true
---

Las plataformas de análisis generalmente se integran en los sitios web mediante fragmentos de JavaScript para estilos integrados en el código y llamadas de funciones, los cuales activan eventos que se regresan al sistema de análisis. AMP proporciona una configuración flexible para la sintaxis de JSON, con la finalidad de que varios de los socios que participan en el análisis puedan replicar este proceso.

[tip] **SUGERENCIA –** Si utiliza Google Analytics como su proveedor de análisis, obtenga más información sobre [ `amp-analytics`](../../../documentation/components/reference/amp-analytics.md). [/tip]

## Para el contexto: análisis en páginas que no son de AMP

El siguiente es un ejemplo del seguimiento habitual de Google Analytics basado en JavaScript. Lo reescribiremos en el formato JSON de [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) pero primero, veamos el enfoque tradicional:

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

Este JavaScript es bastante sencillo, envía una notificación para realizar un seguimiento del evento pageview.

## Paso 1: incluya el script `amp-analytics`

Para replicar esta función en AMP, lo primero que debemos hacer es **incluir** la biblioteca de componentes [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md)  en el `<head>` de nuestro documento:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

## Paso 2: agregue el código de configuración

Luego, vamos a **agregar** el componente [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) al final del <code>body</code>  en el documento:

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

Al igual que en el ejemplo de JavaScript que se encuentra en la parte superior de esta página, este fragmento de [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) enviará una notificación a Google Analytics para indicarle que se visualizó una página.

Para especificar esto, establecimos el `type` en ` googleanalytics` y luego, en el formato JSON, creamos un activador al que llamamos “default pageview”. Este activador se habilitará cuando la página esté visible (debido al  `"on": "visible"`) y cuando se habilite, enviaremos una solicitud de análisis `pageview` a Google Analytics con los `vars` que especificamos.

El formato JSON que se utilizó para configurar [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) es muy flexible cuando se trata de describir cuáles son los datos que se enviarán para el análisis y cuándo deben enviarse. El componente [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) contiene información detallada sobre el formato.

## Paso 3: agregar más activadores

Basándonos en el ejemplo anterior, podemos **agregar** otro activador llamado `"click on #header trigger"`:

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

Como puede suponer por el nombre del nuevo activador, este se habilitará cuando haga clic sobre el elemento con el ID `"header"` (que está especificado por `"on": "click"` y `"selector": "#header"`). Cuando este activador se habilite, enviaremos la solicitud `event` a nuestro proveedor de análisis, donde especificaremos un par de variables que se incluirán en la solicitud.

Si tiene una plataforma de seguimiento personalizada con la que desea integrarse, todavía puede utilizar [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) y definir sus propios endpoints personalizados para la URL, con los cuales podrá enviar datos de seguimiento. Obtenga más información en la documentación de referencia del componente [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md).

[tip type="note"] **NOTA –**  `“UA-YYYY-Y”` es el ejemplo de una cuenta en Google Analytics. Si utiliza este ejemplo en su página, debe reemplazarlo en Google Analytics con el código de seguimiento de su propio sitio web. [/tip]

[tip type="tip"] **SUGERENCIA –** Si está interesado en un sistema de seguimiento más sencillo, le recomendamos que eche un vistazo a [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md). Si solamente necesita realizar un seguimiento de las pageviews, [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md) es una solución más ligera que [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md), porque su único objetivo es resolver los requisitos habituales de los pixeles de seguimiento. Puede obtener más información en [Analytics: la guía básica](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
