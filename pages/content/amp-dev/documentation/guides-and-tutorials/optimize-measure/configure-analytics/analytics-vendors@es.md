---
$title: Proveedores de Analytics
---

En este documento se enumeran los proveedores de analíticas que cuentan con configuraciones integradas que se pueden usar con el componente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

Para enviar datos de analíticas a un proveedor tercero, sigue estos pasos:

1. En la etiqueta [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), añade el atributo `type` y establece su valor en el proveedor especificado tal y como se describe en la sección [*Proveedores*](#vendors) a continuación.
2. Define qué datos quieres registrar y supervisar, y especifica estos detalles en los datos de configuración. Consulta la documentación del proveedor para obtener instrucciones sobre cómo registrar datos de analíticas.

En el ejemplo siguiente, enviamos datos de páginas vistas a [Google Analytics](#google-analytics), un proveedor de analíticas tercero con una configuración integrada para [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)

```html
<amp-analytics type="googleanalytics" id="analytics1">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"
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

Si se te da bien leer código, puedes consultar las configuraciones sin procesar del archivo [`vendors.js`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/0.1/vendors.js).

[/tip]

[tip type="note"]

Los proveedores que quieran integrar su servicio con [`<amp-analytics>`](../../../../documentation/components/reference/amp-analytics.md) deben consultar los detalles en [Integrar tus herramientas de analíticas con AMP](../../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md).

[/tip]

<hr>

## Proveedores <a name="vendors"></a>

### Acquia Lift

Escribe el valor de atributo: `acquialift`

Permite añadir compatibilidad con Acquia Lift. Se deben especificar los valores `decisionApiUrl`, `accountId` y `siteId`. Puedes encontrar más información sobre Acquia Lift en [https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics

Escribe el valor de atributo: `adobeanalytics`

Permite añadir compatibilidad con Adobe Analytics. Puedes encontrar más información sobre cómo añadir compatibilidad con Adobe Analytics en [marketing.adobe.com](https://marketing.adobe.com/resources/help/es_ES/sc/implement/accelerated-mobile-pages.html).

### AFS Analytics

Escribe el valor de atributo: `afsanalytics`

Permite añadir compatibilidad con AFS Analytics. Además, debes especificar las variables `websiteid` y `server`. Puedes encontrar más información sobre cómo añadir compatibilidad con AFS Analytics en [afsanalytics.com](https://www.afsanalytics.com/articles/developers/).

### Alexa Internet

Escribe el valor de atributo: `alexametrics`

Permite añadir compatibilidad con las métricas de sitio web certificadas de Alexa. Debes especificar las variables `atrk_acct` y `domain`. Puedes encontrar más información en las [Preguntas frecuentes sobre las métricas certificadas de Alexa](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics).

### AT Internet

Escribe el valor de atributo: `atinternet`

Permite añadir compatibilidad con AT Internet. Puedes encontrar más información sobre cómo añadir compatibilidad con AT Internet en [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/).

### Baidu Analytics

Escribe el valor de atributo: `baiduanalytics`

Permite añadir compatibilidad con Baidu Analytics. Puedes encontrar más información sobre cómo añadir compatibilidad con Baidu Analytics en [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0).

### Burt

Escribe el valor de atributo: `burt`

Permite añadir compatibilidad con Burt. Además, debes especificar la variable `trackingKey`. También es posible especificar las variables opcionales `category` y `subCategory`. Puedes encontrar más información en [burtcorp.com](http://burtcorp.com).

### Chartbeat

Escribe el valor de atributo: `chartbeat`

Permite añadir compatibilidad con Chartbeat. Puedes encontrar más información sobre cómo añadir compatibilidad con Chartbeat en [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp).

### Clicky Web Analytics

Escribe el valor de atributo: `clicky`

Permite añadir compatibilidad con Clicky Web Analytics. Puedes encontrar más información sobre cómo añadir compatibilidad con Clicky en [clicky.com](https://clicky.com/help/apps-plugins).

### comScore

Escribe el valor de atributo: `comscore`

Permite añadir compatibilidad con las analíticas de página vista de Medición digital unificada de comScore™. Requiere la definición de la *variable* `c2` con el valor *c2 id* proporcionado por comScore. Puedes encontrar más información en [comscore.com](http://www.comscore.com).

Cxense

Escribe el valor de atributo: `cxense`

Permite añadir compatibilidad con las analíticas de Cxense Insight. Requiere la definición de la *variable* `siteId` con el *ID de sitio web* proporcionado por Cxense. Puedes encontrar más información en [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration).

### Dynatrace

Escribe el valor de atributo: `dynatrace`

Permite añadir compatibilidad con la supervisión de usuarios reales de Dynatrace. Requiere la definición de la *variable* `app` con el *ID de aplicación* proporcionado por Dynatrace y la *variable* `tenant` con el *identificador de entorno* proporcionado por Dynatrace. Puedes encontrar más información sobre cómo añadir la supervisión de usuarios reales de Dynatrace en [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/).

### Eulerian Analytics

Escribe el valor de atributo: `euleriananalytics`

Permite añadir compatibilidad con Eulerian Technologies Analytics. Requiere la definición de la *variable* `analyticsHost` con el dominio delegado por Eulerian. Puedes encontrar más información en [eulerian.wiki](https://eulerian.wiki).

### Facebook Pixel

Escribe el valor de atributo: `facebookpixel`

Permite añadir compatibilidad con [Facebook Pixel](https://www.facebook.com/business/a/facebook-pixel). Debes definir tu ID de Pixel como `pixelId: TU-PIXEL-ID` en tu configuración de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Puedes encontrar los eventos compatibles junto con los valores de evento correspondientes que se pueden especificar en la [documentación del desarrollador de Facebook Pixel](https://developers.facebook.com/docs/ads-for-websites/pixel-events).

### Gemius

Escribe el valor de atributo: `gemius`

Permite añadir compatibilidad con las analíticas de Gemius Audience/Prism. Además, debes especificar las variables `prefix` e `identifier` proporcionadas por gemius. También es posible especificar la variable opcional `extraparams` (clave1=valor1|clave2=valor2). Puedes encontrar más información en [gemius.com](https://www.gemius.com).

### Google AdWords

Escribe el valor de atributo: `googleadwords`

Permite añadir compatibilidad con el seguimiento de conversiones y el remarketing de Google AdWords. Puedes encontrar más información en el Centro de Ayuda de AdWords para el [seguimiento de conversiones](https://support.google.com/adwords/answer/1722054?hl=es) y [remarketing](https://support.google.com/adwords/answer/2453998?hl=es). Se pueden utilizar ambas etiquetas de forma independiente.

### Google Analytics <a name="google-analytics"></a>

Escribe el valor de atributo: `googleanalytics`

Permite añadir compatibilidad con Google Analytics. Puedes encontrar más información sobre cómo añadir compatibilidad con Google Analytics en [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### INFOnline / IVW

Escribe el valor de atributo: `infonline`

Permite añadir compatibilidad con [INFOnline](https://www.infonline.de) / [IVW](http://www.ivw.de). Requiere una copia de [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) en un subdominio diferente del que incluye el archivo AMP [¿por qué?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md). El archivo se debe servir a través de HTTPS. Por ejemplo, si tus archivos AMP están alojados en `www.example.com`, entonces `amp-analytics-infonline.html` debe estar en otro subdominio, como `iframe.example.com` o `assets.example.com`.

Además, debes definir estas variables:

* `st`: ID de oferta
* `co`: comentario
* `cp`: código
* `url`: ubicación HTTPS de `amp-analytics-infonline.html`

Puedes obtener más información sobre cómo añadir compatibilidad con INFOnline / IVW en [www.infonline.de](https://www.infonline.de/downloads/web-mew-und-ctv/).

### Krux

Escribe el valor de atributo: `krux`

Permite añadir compatibilidad con Krux.  Puedes encontrar información sobre la configuración en [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608).

### Linkpulse

Escribe el valor de atributo: `linkpulse`

Permite añadir compatibilidad con Linkpulse. Puedes encontrar información sobre la configuración en [docs.linkpulse.com](http://docs.linkpulse.com).

### Lotame

Escribe el valor de atributo: `lotame`

Permite añadir compatibilidad con Lotame.  Puedes encontrar más información y detalles sobre la configuración en [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP).

### Médiamétrie

Escribe el valor de atributo: `mediametrie`

Permite añadir compatibilidad con las páginas de seguimiento de Médiamétrie. Requiere la definición de la *variable* `serial`. Las variables de `level1` a `level4` son opcionales.  Puedes encontrar más información en [mediametrie.com](http://www.mediametrie.com/).

### mediarithmics

Escribe el valor de atributo: `mediarithmics`

Permite añadir compatibilidad con mediarithmics. Puedes encontrar más información y detalles sobre la configuración en [developer.mediarithmics.com](https://developer.mediarithmics.com/).

### mParticle

Escribe el valor de atributo: `mparticle`

Permite añadir compatibilidad con mParticle. Puedes encontrar más información sobre cómo añadir compatibilidad con mParticle en [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp).

### New Relic

Escribe el valor de atributo: `newrelic`

Permite añadir compatibilidad con New Relic Browser para medir el rendimiento y funcionamiento de AMP. Si añades el valor de atributo `newrelic`, tendrás que añadir los valores `app ID` y `license key` de tu cuenta de New Relic Browser para poder empezar a registrar datos. Puedes encontrar más información en la página de documentos AMP de New Relic Browser en [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser).

### Nielsen

Escribe el valor de atributo: `nielsen`

Permite añadir compatibilidad con Nielsen DCR. Ponte en contacto con tu representante de Nielsen para obtener la configuración de `apid`, así como para obtener ayuda para definir los parámetros restantes en la sección `vars`. Para obtener más información, consulta la [documentación de asistencia de Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

### Nielsen Marketing Cloud

Escribe el valor de atributo: `nielsen-marketing-cloud`

Permite añadir compatibilidad con Nielsen Marketing Cloud. Puedes encontrar más información en [Nielsen Marketing Cloud](http://www.nielsen.com/us/en/solutions/capabilities/nielsen-marketing-cloud.html).

### OEWA

Escribe el valor de atributo: `oewa`

Permite añadir compatibilidad con [OEWA](https://www.oewa.at). Requiere una copia de [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) en un subdominio diferente del que incluye el archivo AMP [¿por qué?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md). El archivo se debe servir a través de HTTPS. Por ejemplo, si tus archivos AMP están alojados en `www.example.com`, entonces `amp-analytics-oewa.html` debe estar en otro subdominio, como `oewa-amp.example.com`. Puedes encontrar más información sobre cómo añadir compatibilidad con OEWA [aquí](http://www.oewa.at/Implementierung).

Además, debes definir estas variables:

En la sección `vars`:

- `s`: oferta
- `cp`: ruta de la categoría

En la sección `requests`:

- `url`: ubicación HTTPS de `amp-analytics-oewa.html`

[tip type="note"]

Existe una variación denominada `oewadirect` que no utiliza la solución iframe-ping y tiene una mejor detección de clientes mediante `AMP CLIENT_ID`.  Actualmente, es una versión EXPERIMENTAL y está prohibida en OEWA porque no utiliza `oewa2.js`.

[/tip]

### Parsely

Escribe el valor de atributo: `parsely`

Permite añadir compatibilidad con Parsely. Puedes encontrar información sobre la configuración en [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html).

### Piano

Escribe el valor de atributo: `piano`

Permite añadir compatibilidad con Piano.  Puedes encontrar información sobre la configuración en [vx.piano.io](http://vx.piano.io/javascript-tracking-amp).

### Medición de Quantcast

Escribe el valor de atributo: `quantcast`

Permite añadir compatibilidad con la medición de Quantcast. Puedes encontrar más información sobre cómo añadir compatibilidad con Medición de Quantcast en [quantcast.com](https://www.quantcast.com/help/guides/).

### Segment

Escribe el valor de atributo: `segment`

Permite añadir compatibilidad con las páginas vistas y los eventos de Segment.
Puedes encontrar una lista completa de los campos que puedes enviar en [Segment Spec](https://segment.com/docs/spec/).

### SOASTA mPulse

Escribe el valor de atributo: `mpulse`

Permite añadir compatibilidad con [SOASTA mPulse](https://www.soasta.com/mPulse). Puedes encontrar información sobre la configuración en [docs.soasta.com](http://docs.soasta.com/).

### SimpleReach

Escribe el valor de atributo: `simplereach`

Permite añadir compatibilidad con SimpleReach.  Puedes encontrar información sobre la configuración en [simplereach.com/docs](http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation).

### Snowplow Analytics

Escribe el valor de atributo: `snowplow`

Permite añadir compatibilidad con Snowplow Analytics. Puedes encontrar más información sobre cómo añadir compatibilidad con Snowplow Analytics en [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker).

### Rambler/TOP-100

Escribe el valor de atributo: `top100`

Permite añadir compatibilidad con Rambler/TOP-100. Puedes encontrar información sobre la configuración en [top100.rambler.ru](https://top100.rambler.ru/docs).

### Top.Mail.Ru

Escribe el valor de atributo: `topmailru`

Permite añadir compatibilidad con Top.Mail.Ru. Puedes encontrar información sobre la configuración en la [ayuda de Top.Mail.Ru](https://help.mail.ru/top/amp-analytics).

### Umeng+ Analytics

Escribe el valor de atributo: `umenganalytics`

Permite añadir compatibilidad con Umeng+ Analytics. Puedes encontrar más detalles sobre cómo añadir compatibilidad con Umeng+ Analytics en [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5).

### Treasure Data

Escribe el valor de atributo: `treasuredata`

Permite añadir compatibilidad con Treasure Data. Puedes encontrar información sobre la configuración en [treasuredata.com](https://docs.treasuredata.com/articles/javascript-sdk-google-amp).

### Webtrekk

El valor de atributo ~~`webtrekk`~~ está obsoleto (se eliminará el 31/12/2018); utiliza `webtrekk_2` en su lugar.

Permite añadir compatibilidad con Webtrekk. Puedes encontrar información sobre la configuración en [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/es/public/amp-analytics.html).

### Yandex.Metrica

Escribe el valor de atributo: `metrika`

Permite añadir compatibilidad con Yandex.Metrica.  Puedes encontrar información sobre la configuración en la [página de asistencia de Yandex](https://yandex.com/support/metrica/code/install-counter-amp.xml).
