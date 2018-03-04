---
$title: "Proveedores Analytics"
$order: 4
toc: true
---
[TOC]

En este documento se enumeran los proveedores de Analytics que tienen configuraciones integradas para su uso con el componente [`amp-analytics`](/es/docs/reference/components/amp-analytics.html).

Al especificar el nombre de un proveedor de análisis con el atributo `type`, puede configurar rápidamente `amp-analytics` para utilizar el producto respectivo. La configuración adicional (como su ID de usuario) puede seguir siendo necesaria.

Puede consultar la documentación de su proveedor si está vinculada en las secciones siguientes.

{% call callout('Tip', type='success') %}
Si se siente cómodo explorando el código, puede explorar las configuraciones sin procesar del archivo [vendors.js](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/0.1/vendors.js) -en inglés.
{% endcall %}

**Ejemplo:**

Aquí hay un fragmento que especifica el tipo (`type`) de un proveedor de analytics llamado `XYZ`:

```html
<amp-analytics type="XYZ"> ... </amp-analytics>
```

{% call callout('Read on', type='read') %}
Aprende más acerca del seguimiento de analytics con [`amp-analytics`](/es/docs/reference/components/amp-analytics.html).
{% endcall %}

## Proveedores

### Acquia Lift

Valor del atributo type: `acquialift`

Agrega soporte para Acquia Lift. Debe especificarse `decisionApiUrl`, `accountId` y `siteId`. Más información sobre Acquia Lift se puede encontrar en [https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics

Valor del atributo type: `adobeanalytics`

Agrega soporte para Adobe Analytics. Más detalles para agregar soporte de Adobe Analytics en [marketing.adobe.com](https://marketing.adobe.com/resources/help/es_ES/sc/implement/accelerated-mobile-pages.html).

### AFS Analytics

Valor del atributo type: `afsanalytics`

Agrega soporte para AFS Analytics. Adicionalmente, las variables `websiteid` y `server` deben ser definidas. Más información en [afsanalytics.com](https://www.afsanalytics.com/articles/developers/).

### AT Internet

Valor del atributo type: `atinternet`

Agrega soporte para AT Internet. Más información en [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/).

### Baidu Analytics

Valor del atributo type: `baiduanalytics`

Agrega soporte para Baidu Analytics. Más información en [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0).

### Burt

Valor del atributo type: `burt`

Agrega soporte para Burt. Adicionalmente, la variable `trackingKey` debe ser definida. También es posible especificar variables opcionales `category` y `subCategory`. Más información en [burtcorp.com](http://burtcorp.com).

### Chartbeat

Valor del atributo type: `chartbeat`

Agrega soporte para Chartbeat. Más información en [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp).

### Clicky Web Analytics

Valor del atributo type: `clicky`

Agrega soporte para Clicky Web Analytics. Más información en [clicky.com](https://clicky.com/help/apps-plugins).

### comScore

Valor del atributo type: `comscore`

Agrega soporte para comScore Unified Digital Measurement™ pageview analytics. Requiere definir *var* `c2` con comScore-provided *c2 id*. Más información en [comscore.com](http://www.comscore.com).

### Cxense

Valor del atributo type: `cxense`

Agrega soporte para Cxense Insight analytics. Requiere definir *var* `siteId` con Cxense-provided *siteId*. Más información en [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration).

### Dynatrace

Valor del atributo type: `dynatrace`

Agrega soporte para Dynatrace. Requiere definir *var* `app` con *application id* y *var* `tenant` con *environment identifier*. Más información en [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/).

### Eulerian Analytics

Valor del atributo type: `euleriananalytics`

Agrega soporte para Eulerian Technologies Analytics. Requiere definir *var* `analyticsHost` con dominio Eulerian delegado. Puedes encontrar más detalles en [eulerian.wiki](https://eulerian.wiki).

### Gemius

Valor del atributo type: `gemius`

Agrega soporte para Gemius Audience/Prism analytics. Adicionalmente, las variables `prefix` e `identifier` deben ser especificadas. También es posible especificar la variable opcional `extraparams` (key1=value1|key2=value2). Más detalles pueden ser encontrados en  [gemius.com](https://www.gemius.com).

### Google AdWords

Valor del atributo type: `googleadwords`

Agrega soporte para Google AdWords para el seguimiento de conversion y remarketing. Para ver más detalles consulta la página de ayuda de AdWords para [conversion tracking](https://support.google.com/adwords/answer/1722054?hl=en) y [remarketing](https://support.google.com/adwords/answer/2453998?hl=en). Ambos tags pueden ser usados independientemente uno de otro.

### Google Analytics

Valor del atributo type: `googleanalytics`

Agrega soporte para Google Analytics. Puedes encontrar más detalles de Google Analytics en [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### INFOnline / IVW

Valor del atributo type: `infonline`

Agrega soporte para [INFOnline](https://www.infonline.de) / [IVW](http://www.ivw.de). Requiere una copia de [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) en un subdominio diferente al que está alojada la página AMP ([¿por qué?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). El archivo debe ser servido vía HTTPS. Por ejemplo, si las páginas AMP están alojadas en `www.example.com`, entonces `amp-analytics-infonline.html` necesita ser alojado en otro subdominio como `iframe.example.com` o `assets.example.com`.

Adicionalmente, las siguientes variables deben ser definidas:

* `st`: Angebotskennung
* `co`: comment
* `cp`: code
* `url`: dirección HTTPS para `amp-analytics-infonline.html`

Más detalles para agregar el soporte INFOnline / IVW puede ser encontrado en [www.infonline.de](https://www.infonline.de/downloads/web-mew-und-ctv/).

### Krux

Valor del atributo type: `krux`

Agrega soporte para Krux.  Puedes encontrar más información en [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608).

### Linkpulse

Valor del atributo type: `linkpulse`

Agrega soporte para Linkpulse. Puedes encontrar detalles de configuración en [docs.linkpulse.com](http://docs.linkpulse.com).

### Lotame

Valor del atributo type: `lotame`

Agrega soporte para Lotame.  Puedes encontrar más información y detalles de configuración en [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP).

### Médiamétrie

Valor del atributo type: `mediametrie`

Agrega soporte para Médiamétrie tracking pages. Requiere definir la *var* `serial`. Variables de `level1` al `level4` son opcionales.  Más información puede ser encontrada en [mediametrie.com](http://www.mediametrie.com/).

### mParticle

Valor del atributo type: `mparticle`

Agrega soporte para mParticle. Más detalles para agregar soporte a mParticle en [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp).

### Nielsen

Valor del atributo type: `nielsen`

Agrega soporte para Nielsen DCR. Por favor contacte a su representante de Nielsen para recibir asistencia y configurar tu `apid` y la definición de los parámetros en la sección `vars`. Para más información, leer [Nielsen's support documentation](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

### OEWA

Valor del atributo type: `oewa`

Agrega soporte para [OEWA](https://www.oewa.at). Requiere una copia de [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) en un subdominio diferente al que incluye el archivo AMP ([¿por qué?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). El archivo debe ser alojado vía HTTPS. Por ejemplo, si tu página AMP está alojada en `www.example.com`, entonces el `amp-analytics-oewa.html` necesita ser alojado en otro subdominio como por ejemplo `oewa-amp.example.com`. Para más detalles sobre cómo agregar soporte de OEWA puedes leer [aquí](http://www.oewa.at/basic/implementierung).

Adicionalmente, las siguientes variables deben ser definidas:

En la sección `vars`:

- `s`: oferta
- `cp`: ruta de categoría

En la sección `requests`:

- `url`: dirección HTTPS para `amp-analytics-oewa.html`

{% call callout('Nota', type='caution') %}
Existe una variación denominada `oewadirect` que no utiliza la solución iframe-ping y tiene una mejor detección de cliente mediante `AMP CLIENT_ID`. Esto es actualmente EXPERIMENTAL, y está prohibido por el OEWA porque no usa `oewa2.js`.
{% endcall %}

### Parsely

Valor del atributo type: `parsely`

Agrega soporte para Parsely. Puedes encontrar detalles sobre configuración en [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html).

### Piano

Valor del atributo type: `piano`

Agrega soporte para Piano.  Puedes encontrar detalles sobre configuración en [vx.piano.io](http://vx.piano.io/javascript-tracking-amp).

### Quantcast Measurement

Valor del atributo type: `quantcast`

Agrega soporte para Quantcast Measurement. Puedes encontrar más detalles para agregar Quantcast Measurement en [quantcast.com](https://www.quantcast.com/help/guides/)

### Segment

Valor del atributo type: `segment`

Agrega soporte para segment.
Para leer la lista completa de campos que puedes usar, lee [Segment Spec](https://segment.com/docs/spec/).

### SOASTA mPulse

Valor del atributo type: `mpulse`

Agrega soporte para [SOASTA mPulse](https://www.soasta.com/mPulse). Puedes encontrar detalles sobre configuración en [docs.soasta.com](http://docs.soasta.com/).

### SimpleReach

Valor del atributo type: `simplereach`

Agrega soporte para SimpleReach.  Puedes encontrar detalles sobre configuración en [simplereach.com/docs](http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation).

### Snowplow Analytics

Valor del atributo type: `snowplow`

Agrega soporte para Snowplow Analytics. Puedes encontrar detalles para agregar soporte a Snowplow Analytics en  [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker).

### Rambler/TOP-100

Valor del atributo type: `top100`

Agrega soporte para Rambler/TOP-100.  Puedes encontrar detalles sobre configuración en [top100.rambler.ru](https://top100.rambler.ru/docs).

### Webtrekk

Valor del atributo type: `webtrekk`

Agrega soporte para Webtrekk. Puedes encontrar detalles sobre configuración en [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html).

### Yandex Metrica

Valor del atributo type: `metrika`

Agrega soporte para Yandex Metrica.  Puedes encontrar detalles sobre configuración en [Yandex Support](https://yandex.com/support/metrica/code/install-counter-amp.xml).
