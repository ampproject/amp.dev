---
$title: amp-ad
$category@: ads-analytics
teaser:
  text: Representa un contenedor que puede mostrar un anuncio.
---



Representa un contenedor que puede mostrar un anuncio. `amp-embed` funciona como un alias de la etiqueta `amp-ad`, ya que deriva todas sus funciones con un nombre de etiqueta diferente. Recomendamos utilizar `amp-embed` cuando sea más preciso semánticamente. Los documentos AMP solo admiten inserciones o anuncios servidos mediante HTTPS.

# <a name="amp-ad"></a> amp-ad / amp-embed



[tip type="note"]
Es probable que la especificación de `amp-ad`/`amp-embed` evolucione significativamente con el tiempo. El enfoque actual de estos componentes se ha diseñado para poner en funcionamiento el formato para poder mostrar anuncios.
[/tip]


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

<table>
  <tr>
    <td class="col-fourty"><strong>Descripción</strong></td>
    <td>Representa un contenedor que puede mostrar un anuncio. <code>amp-embed</code> funciona como un alias de la etiqueta <code>amp-ad</code>, ya que deriva todas sus funciones con un nombre de etiqueta diferente. Recomendamos utilizar <code>amp-embed</code> cuando sea más preciso semánticamente. Los documentos AMP solo admiten inserciones o anuncios servidos mediante HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js">&lt;</code><br>Nota: amp-ad puede funcionar sin esta secuencia de comandos, pero se recomienda encarecidamente su uso para mantener la compatibilidad con versiones futuras.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay y responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Ejemplos</strong></td>
    <td>Consulta el <a href="https://ampbyexample.com/components/amp-ad/">ejemplo de amp-ad</a> de AMP By Example.</td>
  </tr>
</table>

## Comportamiento <a name="behavior"></a>

Los anuncios se cargan en los documentos AMP como cualquier otro recurso mediante un elemento personalizado especial llamado `<amp-ad>`. No se puede ejecutar JavaScript proporcionado por redes publicitarias en documentos AMP. En su lugar, el tiempo de ejecución de AMP cargará un iframe desde otro origen (a través de una zona de pruebas de iframe) como documento AMP y ejecutará el JS de la red publicitaria dentro de dicha zona de pruebas.

`<amp-ad>` requiere que se definan valores de anchura y altura de acuerdo con la [regla](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#tldr-summary-of-layout-requirements--behaviors) correspondiente a su tipo de diseño, así como un argumento `type` que seleccione la red publicitaria que se mostrará. Todos los atributos `data-*` de la etiqueta se transfieren automáticamente como argumentos al código que renderiza el anuncio. Los atributos `data-` que se necesitan para un determinado tipo de red varían en función de la red publicitaria, y deben consultarse en la documentación de cada una de ellas.

#### Ejemplo: Mostrar algunos anuncios <a name="example-displaying-a-few-ads"></a>

[example preview="inline" playground="true" imports="amp-ad"]
```html
<amp-ad type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
    width="300"
    height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  </amp-ad>
  <amp-ad width="300"
    height="250"
    type="industrybrains"
    data-width="300"
    data-height="250"
    data-cid="19626-3798936394">
  </amp-ad>
  <amp-embed type="taboola"
    width="400"
    height="300"
    layout="responsive"
    data-publisher="amp-demo"
    data-mode="thumbnails-a"
    data-placement="Ads Example"
    data-article="auto">
  </amp-embed>
```
[/example]

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (obligatorio)</strong></td>
    <td>Especifica un identificador para la <a href="#supported-ad-networks">red publicitaria</a>. El atributo <code>type</code> selecciona la plantilla que se utilizará para la etiqueta de anuncio.</td>
  </tr>
  <tr>
    <td width="40%"><strong>src (opcional)</strong></td>
    <td>Utiliza este atributo para cargar una etiqueta de secuencia de comandos para la red publicitaria especificada. Se puede utilizar para las redes publicitarias que requieren que se inserte una sola etiqueta de secuencia de comandos en la página web. El valor <code>src</code> debe tener un prefijo que esté incluido en la lista blanca de la red publicitaria especificada, y el valor debe utilizar el protocolo <code>https</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>La mayoría de las redes publicitarias requieren más configuración, que se puede transferir a la red mediante atributos HTML del tipo <code>data-</code>. Los nombres de los parámetros pasan de ser nombres estándar de atributos de datos (separados mediante guiones) a alternar mayúsculas y minúsculas (camel case). Por ejemplo, "data-foo-bar" se envía al anuncio para su configuración como "fooBar". Consulta la documentación de la <a href="#supported-ad-networks">red de anuncios</a> específica para saber qué atributos se pueden usar en ella.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-vars-foo-bar</strong></td>
    <td>Los atributos que empiezan por <code>data-vars-</code> están reservados para las <a href="https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute">variables de <code>amp-analytics</code></a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>json (opcional)</strong></td>
    <td>Utiliza este atributo para transferir una configuración al anuncio como un objeto JSON complejo de forma arbitraria. El objeto se transfiere al anuncio tal cual, sin que se produzca ningún cambio en los nombres.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id (opcional)</strong></td>
    <td>Si se proporciona, es necesario confirmar <a href="amp-user-notification.md">amp-user-notification</a> con el ID de HTML hasta que el "ID de cliente de AMP" del usuario (similar a una cookie) se transmita al anuncio. Esto quiere decir que el renderizado de los anuncios no se produce hasta que el usuario confirma la notificación.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-loading-strategy (opcional)</strong></td>
    <td>Indica al anuncio que empiece a cargarse cuando haya un número determinado de viewports entre la ubicación del anuncio y el viewport actual. Sin el atributo <code>data-loading-strategy</code>, el número es 3 de forma predeterminada. Puedes especificar un valor en forma de número decimal en el intervalo de [0, 3]. Si no se especifica un valor, es 1.25 de forma predeterminada. Usa un valor menor para obtener un mayor grado de visibilidad (es decir, para aumentar las probabilidades de que un usuario vea un anuncio después de que se cargue), con el riesgo de que se generen menos impresiones (es decir, de que se carguen menos anuncios). Si se especifica el atributo pero el valor se deja en blanco, el sistema asigna un valor en forma de número decimal que optimiza la visibilidad sin afectar drásticamente a las impresiones. Ten en cuenta que especificar <code>prefer-viewability-over-views</code> como valor también optimiza automáticamente la visibilidad.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-ad-container-id (opcional)</strong></td>
    <td>Indica el ID de componente contenedor al anuncio, en el caso de que se intente ocultar este último. El componente contenedor debe ser un <code>&lt;amp-layout&gt;</code> que sea elemento principal del anuncio. Cuando se especifica <code>data-ad-container-id</code> y se encuentra un componente de contenedor <code>&lt;amp-layout&gt;</code>, el tiempo de ejecución de AMP intentará ocultar el componente contenedor en lugar del componente del anuncio en los casos en los que no se devuelva ningún anuncio. Esta función puede ser útil cuando hay presente un indicador de anuncio.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>atributos comunes</strong></td>
    <td>Este elemento incluye <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atributos comunes</a> que se aplican a los componentes de AMP.</td>
  </tr>
</table>

## Marcador de posición <a name="placeholder"></a>

De forma opcional, `amp-ad` admite un elemento secundario con el atributo `placeholder`. Si la red publicitaria lo admite, este elemento se mostrará hasta que el anuncio esté disponible para publicarse. Obtén más información sobre los [marcadores de posición y los respaldos](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## No hay ningún anuncio disponible <a name="no-ad-available"></a>

Si no hay ningún anuncio disponible para el espacio, AMP intenta ocultar el elemento `amp-ad` (es decir, define `display: none`), ya que determina que esta operación se puede llevar a cabo sin afectar a la posición de desplazamiento del usuario. Si el anuncio está en el viewport actual, no se ocultará porque afecta a la posición de desplazamiento del usuario; de lo contrario, se ocultará.

En caso de que falle el intento de ocultar el anuncio, el componente `amp-ad` admite un elemento secundario con el atributo `fallback`. Si hay un elemento de respaldo personalizado presente, se muestra; de lo contrario, AMP aplica un respaldo predeterminado.

Ejemplo con un respaldo:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Publicar anuncios de vídeo <a name="serving-video-ads"></a>

Hay 3 formas de monetizar anuncios de vídeo en AMP:

1. AMP admite de forma nativa ciertos reproductores de vídeo que se pueden utilizar para monetizar anuncios, como BrightCove, DailyMotion, etc. Para obtener una lista completa, consulta los componentes [multimedia](../../../documentation/components/index.html#media).

2. Utiliza el componente [amp-ima-video](amp-ima-video.md), que incluye un SDK de IMA y un reproductor de vídeo HTML5 integrados.
3. Si utilizas un reproductor de vídeo que no es compatible con AMP, puedes incluirlo mediante [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
Si usas este método, ten en cuenta que:

    * Debe haber una imagen de póster si cargas el reproductor en el primer viewport. [Más información](amp-iframe.md#iframe-with-placeholder)
    * Tanto el vídeo como la imagen de póster se deben servir a través de HTTPS.</li>

## Publicar anuncios desde un dominio personalizado <a name="running-ads-from-a-custom-domain"></a>

AMP admite la carga del iframe de arranque que se utiliza para cargar anuncios de un dominio personalizado, como el tuyo.

Para habilitarlo, copia el archivo [remote.html](https://github.com/ampproject/amphtml/blob/main/3p/remote.html) en tu servidor web. A continuación, añade la siguiente metaetiqueta a tus archivos de AMP:

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  El atributo `content` de la metaetiqueta es la URL absoluta de la copia del archivo remote.html que está en tu servidor web. Esta URL debe utilizar un esquema "https", y no puede encontrarse en el mismo origen que tus archivos AMP. Por ejemplo, si alojas archivos AMP en `www.example.com`, esta URL no puede estar en `www.example.com`, pero sí en `something-else.example.com`. Para obtener más información sobre los orígenes de iframe permitidos, consulta la [política de origen de iframe](https://github.com/ampproject/amphtml/blob/main/spec/amp-iframe-origin-policy.md).

### Seguridad <a name="security"></a>

**Valida los datos entrantes** antes de transferirlos a la función `draw3p` para asegurarte de que el iframe funciona del modo previsto. Esto se aplica, en concreto, a las redes publicitarias que permiten la inyección de código JavaScript personalizado.

Los iframes también deben obligar a que solo se les incluya en los orígenes a los que tienen previsto unirse. Dichos orígenes serían:

* Tus propios orígenes
* `https://cdn.ampproject.org` para la caché de AMP

En el caso de la caché de AMP, también debes comprobar que el origen de la fuente (el origen del documento que sirve cdn.ampproject.org) sea uno de tus orígenes.

La aplicación de los orígenes se puede llevar a cabo con el tercer argumento de `draw3p` junto con la directiva [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options), para así obtener compatibilidad total con el navegador.

### Mejorar la configuración de anuncios entrantes <a name="enhance-incoming-ad-configuration"></a>

Esto es completamente opcional: a veces se puede querer mejorar la solicitud de anuncio antes de enviarla al servidor de anuncios.

Si tu red publicitaria admite [Fast Fetch](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md#creating-an-amp-ad), utiliza entonces la función [Real-Time Config (RTC)](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-documentation.md) (por ejemplo, las integraciones de DoubleClick y AdSense admiten Fast Fetch y RTC).

Si tu red de anuncios utiliza Delayed Fetch, puedes transferir una retrollamada a la llamada a la función `draw3p` en el archivo [remote.html](https://github.com/ampproject/amphtml/blob/main/3p/remote.html). La retrollamada recibe la configuración entrante como primer argumento y, a continuación, recibe otra retrollamada como segundo argumento (denominada `done` en el ejemplo que aparece más abajo). Se debe ejecutar esta retrollamada con la configuración actualizada para que se lleve a cabo el renderizado de anuncios.

Ejemplo:

```JS
draw3p(function(config, done) {
  config.targeting = Math.random() > 0.5 ? 'sport' : 'fashion';
  // Don't actually call setTimeout here. This should only serve as an
  // example that is OK to call the done callback asynchronously.
  setTimeout(function() {
    done(config);
  }, 100)
}, ['allowed-ad-type'], ['your-domain.com']);
```

## Estilo <a name="styling"></a>

Los elementos `<amp-ad>` no pueden contener o estar dentro de contenedores que tengan definido `position: fixed` de CSS, con la excepción de `amp-lightbox`.
Esto se debe a las implicaciones que tienen en la experiencia de usuario los anuncios superpuestos de página completa. Es posible que se permita en el futuro utilizar formatos de anuncio similares, en contenedores controlados por AMP que mantengan ciertas características invariables de experiencia de usuario.

## Validación <a name="validation"></a>

Consulta las [reglas de amp-ad](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad/validator-amp-ad.protoascii) en la especificación de la herramienta de validación de AMP.

## Redes publicitarias admitidas <a name="supported-ad-networks"></a>

* [A8](https://github.com/ampproject/amphtml/blob/main/ads/a8.md)
* [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md)
* [AccessTrade](https://github.com/ampproject/amphtml/blob/main/ads/accesstrade.md)
* [Adblade](https://github.com/ampproject/amphtml/blob/main/ads/adblade.md)
* [AdButler](https://github.com/ampproject/amphtml/blob/main/ads/adbutler.md)
* [Adform](https://github.com/ampproject/amphtml/blob/main/ads/adform.md)
* [Adfox](https://github.com/ampproject/amphtml/blob/main/ads/adfox.md)
* [Ad Generation](https://github.com/ampproject/amphtml/blob/main/ads/adgeneration.md)
* [Adhese](https://github.com/ampproject/amphtml/blob/main/ads/adhese.md)
* [Adincube](https://github.com/ampproject/amphtml/blob/main/ads/adincube.md)
* [ADITION](https://github.com/ampproject/amphtml/blob/main/ads/adition.md)
* [Adman](https://github.com/ampproject/amphtml/blob/main/ads/adman.md)
* [AdmanMedia](https://github.com/ampproject/amphtml/blob/main/ads/admanmedia.md)
* [Admixer](https://github.com/ampproject/amphtml/blob/main/ads/admixer.md)
* [AdOcean](https://github.com/ampproject/amphtml/blob/main/ads/adocean.md)
* [AdPicker](https://github.com/ampproject/amphtml/blob/main/ads/adpicker.md)
* [AdPlugg](https://github.com/ampproject/amphtml/blob/main/ads/adplugg.md)
* [Adpon](https://github.com/ampproject/amphtml/blob/main/ads/adpon.md)
* [AdReactor](https://github.com/ampproject/amphtml/blob/main/ads/adreactor.md)
* [AdSense](https://github.com/ampproject/amphtml/blob/main/ads/google/adsense.md)
* [AdSensor](https://github.com/ampproject/amphtml/blob/main/ads/adsensor.md)
* [AdsNative](https://github.com/ampproject/amphtml/blob/main/ads/adsnative.md)
* [AdSpeed](https://github.com/ampproject/amphtml/blob/main/ads/adspeed.md)
* [AdSpirit](https://github.com/ampproject/amphtml/blob/main/ads/adspirit.md)
* [AdStir](https://github.com/ampproject/amphtml/blob/main/ads/adstir.md)
* [AdTech](https://github.com/ampproject/amphtml/blob/main/ads/adtech.md)
* [AdThrive](https://github.com/ampproject/amphtml/blob/main/ads/adthrive.md)
* [AdUnity](https://github.com/ampproject/amphtml/blob/main/ads/adunity.md)
* [Ad Up Technology](https://github.com/ampproject/amphtml/blob/main/ads/aduptech.md)
* [Adventive](https://github.com/ampproject/amphtml/blob/main/ads/adventive.md)
* [Adverline](https://github.com/ampproject/amphtml/blob/main/ads/adverline.md)
* [Adverticum](https://github.com/ampproject/amphtml/blob/main/ads/adverticum.md)
* [AdvertServe](https://github.com/ampproject/amphtml/blob/main/ads/advertserve.md)
* [Adyoulike](https://github.com/ampproject/amphtml/blob/main/ads/adyoulike.md)
* [Affiliate-B](https://github.com/ampproject/amphtml/blob/main/ads/affiliateb.md)
* [AJA](https://github.com/ampproject/amphtml/blob/main/ads/aja.md)
* [AMoAd](https://github.com/ampproject/amphtml/blob/main/ads/amoad.md)
* [AppNexus](https://github.com/ampproject/amphtml/blob/main/ads/appnexus.md)
* [AppVador](https://github.com/ampproject/amphtml/blob/main/ads/appvador.md)
* [Atomx](https://github.com/ampproject/amphtml/blob/main/ads/atomx.md)
* [Baidu](https://github.com/ampproject/amphtml/blob/main/ads/baidu.md)
* [BeOpinion](amp-beopinion.md)
* [Bidtellect](https://github.com/ampproject/amphtml/blob/main/ads/bidtellect.md)
* [brainy](https://github.com/ampproject/amphtml/blob/main/ads/brainy.md)
* [Broadstreet Ads](https://github.com/ampproject/amphtml/blob/main/ads/broadstreetads.md)
* [CA A.J.A. Infeed](https://github.com/ampproject/amphtml/blob/main/ads/caajainfeed.md)
* [CA-ProFit-X](https://github.com/ampproject/amphtml/blob/main/ads/caprofitx.md)
* [Cedato](https://github.com/ampproject/amphtml/blob/main/ads/cedato.md)
* [Chargeads](https://github.com/ampproject/amphtml/blob/main/ads/chargeads.md)
* [Colombia](https://github.com/ampproject/amphtml/blob/main/ads/colombia.md)
* [Connatix](https://github.com/ampproject/amphtml/blob/main/ads/connatix.md)
* [Content.ad](https://github.com/ampproject/amphtml/blob/main/ads/contentad.md)
* [Criteo](https://github.com/ampproject/amphtml/blob/main/ads/criteo.md)
* [CSA](https://github.com/ampproject/amphtml/blob/main/ads/google/csa.md)
* [CxenseDisplay](https://github.com/ampproject/amphtml/blob/main/ads/eas.md)
* [Dianomi](https://github.com/ampproject/amphtml/blob/main/ads/dianomi.md)
* [Directadvert](https://github.com/ampproject/amphtml/blob/main/ads/directadvert.md)
* [DistroScale](https://github.com/ampproject/amphtml/blob/main/ads/distroscale.md)
* [Dot and Media](https://github.com/ampproject/amphtml/blob/main/ads/dotandads.md)
* [Doubleclick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md)
* [eADV](https://github.com/ampproject/amphtml/blob/main/ads/eadv.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/main/ads/epeex.md)
* [E-Planning](https://github.com/ampproject/amphtml/blob/main/ads/eplanning.md)
* [Ezoic](https://github.com/ampproject/amphtml/blob/main/ads/ezoic.md)
* [Felmat](https://github.com/ampproject/amphtml/blob/main/ads/felmat.md)
* [FlexOneELEPHANT](https://github.com/ampproject/amphtml/blob/main/ads/f1e.md)
* [FlexOneHARRIER](https://github.com/ampproject/amphtml/blob/main/ads/f1h.md)
* [Flite](https://github.com/ampproject/amphtml/blob/main/ads/flite.md)
* [fluct](https://github.com/ampproject/amphtml/blob/main/ads/fluct.md)
* [FreeWheel](https://github.com/ampproject/amphtml/blob/main/ads/freewheel.md)
* [Fusion](https://github.com/ampproject/amphtml/blob/main/ads/fusion.md)
* [GenieeSSP](https://github.com/ampproject/amphtml/blob/main/ads/genieessp.md)
* [Giraff](https://github.com/ampproject/amphtml/blob/main/ads/giraff.md)
* [GMOSSP](https://github.com/ampproject/amphtml/blob/main/ads/gmossp.md)
* [GumGum](https://github.com/ampproject/amphtml/blob/main/ads/gumgum.md)
* [Holder](https://github.com/ampproject/amphtml/blob/main/ads/holder.md)
* [I-Mobile](https://github.com/ampproject/amphtml/blob/main/ads/imobile.md)
* [Imonomy](https://github.com/ampproject/amphtml/blob/main/ads/imonomy.md)
* [iBillboard](https://github.com/ampproject/amphtml/blob/main/ads/ibillboard.md)
* [Imedia](https://github.com/ampproject/amphtml/blob/main/ads/imedia.md)
* [Improve Digital](https://github.com/ampproject/amphtml/blob/main/ads/improvedigital.md)
* [Index Exchange](https://github.com/ampproject/amphtml/blob/main/ads/ix.md)
* [Industrybrains](https://github.com/ampproject/amphtml/blob/main/ads/industrybrains.md)
* [InMobi](https://github.com/ampproject/amphtml/blob/main/ads/inmobi.md)
* [Innity](https://github.com/ampproject/amphtml/blob/main/ads/innity.md)
* [Kargo](https://github.com/ampproject/amphtml/blob/main/ads/kargo.md)
* [Kiosked](https://github.com/ampproject/amphtml/blob/main/ads/kiosked.md)
* [Kixer](https://github.com/ampproject/amphtml/blob/main/ads/kixer.md)
* [Kuadio](https://github.com/ampproject/amphtml/blob/main/ads/kuadio.md)
* [Ligatus](https://github.com/ampproject/amphtml/blob/main/ads/ligatus.md)
* [LockerDome](https://github.com/ampproject/amphtml/blob/main/ads/lockerdome.md)
* [LOKA](https://github.com/ampproject/amphtml/blob/main/ads/loka.md)
* [MADS](https://github.com/ampproject/amphtml/blob/main/ads/mads.md)
* [MANTIS](https://github.com/ampproject/amphtml/blob/main/ads/mantis.md)
* [Media.net](https://github.com/ampproject/amphtml/blob/main/ads/medianet.md)
* [MediaImpact](https://github.com/ampproject/amphtml/blob/main/ads/mediaimpact.md)
* [Mediavine](https://github.com/ampproject/amphtml/blob/main/ads/mediavine.md)
* [Medyanet](https://github.com/ampproject/amphtml/blob/main/ads/medyanet.md)
* [Meg](https://github.com/ampproject/amphtml/blob/main/ads/meg.md)
* [MicroAd](https://github.com/ampproject/amphtml/blob/main/ads/microad.md)
* [MixiMedia](https://github.com/ampproject/amphtml/blob/main/ads/miximedia.md)
* [Mixpo](https://github.com/ampproject/amphtml/blob/main/ads/mixpo.md)
* [Monetizer101](https://github.com/ampproject/amphtml/blob/main/ads/monetizer101.md)
* [mox](https://github.com/ampproject/amphtml/blob/main/ads/mox.md)
* [myTarget](https://github.com/ampproject/amphtml/blob/main/ads/mytarget.md)
* [myWidget](https://github.com/ampproject/amphtml/blob/main/ads/mywidget.md)
* [Nativo](https://github.com/ampproject/amphtml/blob/main/ads/nativo.md)
* [Navegg](https://github.com/ampproject/amphtml/blob/main/ads/navegg.md)
* [Nend](https://github.com/ampproject/amphtml/blob/main/ads/nend.md)
* [NETLETIX](https://github.com/ampproject/amphtml/blob/main/ads/netletix.md)
* [Noddus](https://github.com/ampproject/amphtml/blob/main/ads/noddus.md)
* [Nokta](https://github.com/ampproject/amphtml/blob/main/ads/nokta.md)
* [OneAD](https://github.com/ampproject/amphtml/blob/main/ads/onead.md)
* [OnNetwork](https://github.com/ampproject/amphtml/blob/main/ads/onnetwork.md)
* [Open AdStream (OAS)](https://github.com/ampproject/amphtml/blob/main/ads/openadstream.md)
* [OpenX](https://github.com/ampproject/amphtml/blob/main/ads/openx.md)
* [Pixels](https://github.com/ampproject/amphtml/blob/main/ads/pixels.md)
* [plista](https://github.com/ampproject/amphtml/blob/main/ads/plista.md)
* [polymorphicAds](https://github.com/ampproject/amphtml/blob/main/ads/polymorphicads.md)
* [popin](https://github.com/ampproject/amphtml/blob/main/ads/popin.md)
* [Pressboard](https://github.com/ampproject/amphtml/blob/main/ads/pressboard.md)
* [PromoteIQ](https://github.com/ampproject/amphtml/blob/main/ads/promoteiq.md)
* [PubGuru](https://github.com/ampproject/amphtml/blob/main/ads/pubguru.md)
* [PubMatic](https://github.com/ampproject/amphtml/blob/main/ads/pubmatic.md)
* [Pubmine](https://github.com/ampproject/amphtml/blob/main/ads/pubmine.md)
* [PulsePoint](https://github.com/ampproject/amphtml/blob/main/ads/pulsepoint.md)
* [Purch](https://github.com/ampproject/amphtml/blob/main/ads/purch.md)
* [Rambler&amp;Co](https://github.com/ampproject/amphtml/blob/main/ads/capirs.md)
* [RbInfoxSg](https://github.com/ampproject/amphtml/blob/main/ads/rbinfox.md)
* [Realclick](https://github.com/ampproject/amphtml/blob/main/ads/realclick.md)
* [recomAD](https://github.com/ampproject/amphtml/blob/main/ads/recomad.md)
* [Red for Publishers](https://github.com/ampproject/amphtml/blob/main/ads/rfp.md)
* [Relap](https://github.com/ampproject/amphtml/blob/main/ads/relap.md)
* [Revcontent](https://github.com/ampproject/amphtml/blob/main/ads/revcontent.md)
* [RevJet](https://github.com/ampproject/amphtml/blob/main/ads/revjet.md)
* [Rubicon Project](https://github.com/ampproject/amphtml/blob/main/ads/rubicon.md)
* [RUNative](https://github.com/ampproject/amphtml/blob/main/ads/runative.md)
* [SAS CI 360 Match](https://github.com/ampproject/amphtml/blob/main/ads/sas.md)
* [Sekindo](https://github.com/ampproject/amphtml/blob/main/ads/sekindo.md)
* [Sharethrough](https://github.com/ampproject/amphtml/blob/main/ads/sharethrough.md)
* [Sklik](https://github.com/ampproject/amphtml/blob/main/ads/sklik.md)
* [SlimCut Media](https://github.com/ampproject/amphtml/blob/main/ads/slimcutmedia.md)
* [Smart AdServer](https://github.com/ampproject/amphtml/blob/main/ads/smartadserver.md)
* [smartclip](https://github.com/ampproject/amphtml/blob/main/ads/smartclip.md)
* [sogou Ad](https://github.com/ampproject/amphtml/blob/main/ads/sogouad.md)
* [Sortable](https://github.com/ampproject/amphtml/blob/main/ads/sortable.md)
* [SOVRN](https://github.com/ampproject/amphtml/blob/main/ads/sovrn.md)
* [Speakol](https://github.com/ampproject/amphtml/blob/main/ads/speakol.md)
* [SpotX](https://github.com/ampproject/amphtml/blob/main/ads/spotx.md)
* [SunMedia](https://github.com/ampproject/amphtml/blob/main/ads/sunmedia.md)
* [Swoop](https://github.com/ampproject/amphtml/blob/main/ads/swoop.md)
* [TcsEmotion](https://github.com/ampproject/amphtml/blob/main/ads/tcsemotion.md)
* [Teads](https://github.com/ampproject/amphtml/blob/main/ads/teads.md)
* [torimochi](https://github.com/ampproject/amphtml/blob/main/ads/torimochi.md)
* [TripleLift](https://github.com/ampproject/amphtml/blob/main/ads/triplelift.md)
* [Trugaze](https://github.com/ampproject/amphtml/blob/main/ads/trugaze.md)
* [UZOU](https://github.com/ampproject/amphtml/blob/main/ads/uzou.md)
* [ValueCommerce](https://github.com/ampproject/amphtml/blob/main/ads/valuecommerce.md)
* [video intelligence](https://github.com/ampproject/amphtml/blob/main/ads/videointelligence.md)
* [Videonow](https://github.com/ampproject/amphtml/blob/main/ads/videonow.md)
* [Viralize](https://github.com/ampproject/amphtml/blob/main/ads/viralize.md)
* [UAS](https://github.com/ampproject/amphtml/blob/main/ads/uas.md)
* [ucfunnel](https://github.com/ampproject/amphtml/blob/main/ads/ucfunnel.md)
* [Unruly](https://github.com/ampproject/amphtml/blob/main/ads/unruly.md)
* [VMFive](https://github.com/ampproject/amphtml/blob/main/ads/vmfive.md)
* [Webediads](https://github.com/ampproject/amphtml/blob/main/ads/webediads.md)
* [Weborama](https://github.com/ampproject/amphtml/blob/main/ads/weborama.md)
* [Widespace](https://github.com/ampproject/amphtml/blob/main/ads/widespace.md)
* [Wisteria](https://github.com/ampproject/amphtml/blob/main/ads/wisteria.md)
* [WPMedia](https://github.com/ampproject/amphtml/blob/main/ads/wpmedia.md)
* [Xlift](https://github.com/ampproject/amphtml/blob/main/ads/xlift.md)
* [Yahoo](https://github.com/ampproject/amphtml/blob/main/ads/yahoo.md)
* [YahooJP](https://github.com/ampproject/amphtml/blob/main/ads/yahoojp.md)
* [Yandex](https://github.com/ampproject/amphtml/blob/main/ads/yandex.md)
* [Yengo](https://github.com/ampproject/amphtml/blob/main/ads/yengo.md)
* [Yieldbot](https://github.com/ampproject/amphtml/blob/main/ads/yieldbot.md)
* [Yieldmo](https://github.com/ampproject/amphtml/blob/main/ads/yieldmo.md)
* [Yieldone](https://github.com/ampproject/amphtml/blob/main/ads/yieldone.md)
* [Yieldpro](https://github.com/ampproject/amphtml/blob/main/ads/yieldpro.md)
* [Zedo](https://github.com/ampproject/amphtml/blob/main/ads/zedo.md)
* [Zucks](https://github.com/ampproject/amphtml/blob/main/ads/zucks.md)

## Tipos de inserción admitidos <a name="supported-embed-types"></a>

* [24smi](https://github.com/ampproject/amphtml/blob/main/ads/24smi.md)
* [Bringhub](https://github.com/ampproject/amphtml/blob/main/ads/bringhub.md)
* [Dable](https://github.com/ampproject/amphtml/blob/main/ads/dable.md)
* [Engageya](https://github.com/ampproject/amphtml/blob/main/ads/engageya.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/main/ads/epeex.md)
* [Insticator](https://github.com/ampproject/amphtml/blob/main/ads/insticator.md)
* [Jubna](https://github.com/ampproject/amphtml/blob/main/ads/jubna.md)
* [Outbrain](https://github.com/ampproject/amphtml/blob/main/ads/outbrain.md)
* [Postquare](https://github.com/ampproject/amphtml/blob/main/ads/postquare.md)
* [PubExchange](https://github.com/ampproject/amphtml/blob/main/ads/pubexchange.md)
* [Smi2](https://github.com/ampproject/amphtml/blob/main/ads/smi2.md)
* [Taboola](https://github.com/ampproject/amphtml/blob/main/ads/taboola.md)
* [Zen](https://github.com/ampproject/amphtml/blob/main/ads/zen.md)
* [ZergNet](https://github.com/ampproject/amphtml/blob/main/ads/zergnet.md)