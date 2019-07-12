---
$category@: ads-analytics
formats:
- websites
teaser:
  text: Representa un contenedor que puede mostrar un anuncio.
---

# amp-ad/amp-embed

Representa un contenedor que puede mostrar un anuncio. `amp-embed` funciona como un alias de la etiqueta `amp-ad`, ya que deriva todas sus funciones con un nombre de etiqueta diferente. Recomendamos utilizar `amp-embed` cuando sea más preciso semánticamente. Los documentos AMP solo admiten inserciones o anuncios servidos mediante HTTPS.

# `amp-ad` / `amp-embed`



[tip type="note"]
Es probable que la especificación de `amp-ad`/`amp-embed` evolucione significativamente con el tiempo. El enfoque actual de estos componentes se ha diseñado para poner en funcionamiento el formato para poder mostrar anuncios.
[/tip]


<!---
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
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Diseños admitidos</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay y responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Ejemplos</strong></td>
    <td>Consulta el <a href="https://ampbyexample.com/components/amp-ad/">ejemplo de amp-ad</a> de AMP By Example.</td>
  </tr>
</table>

## Comportamiento

Los anuncios se cargan en los documentos AMP como cualquier otro recurso mediante un elemento personalizado especial llamado `<amp-ad>`. No se puede ejecutar JavaScript proporcionado por redes publicitarias en documentos AMP. En su lugar, el tiempo de ejecución de AMP cargará un iframe desde otro origen (a través de una zona de pruebas de iframe) como documento AMP y ejecutará el JS de la red publicitaria dentro de dicha zona de pruebas.

`<amp-ad>` requiere que se definan valores de anchura y altura de acuerdo con la [regla](https://www.ampproject.org/docs/design/amp-html-layout#%28tl;dr%29-summary-of-layout-requirements-&amp;-behaviors) correspondiente a su tipo de diseño, así como un argumento `type` que seleccione la red publicitaria que se mostrará. Todos los atributos `data-*` de la etiqueta se transfieren automáticamente como argumentos al código que renderiza el anuncio. Los atributos `data-` que se necesitan para un determinado tipo de red varían en función de la red publicitaria, y deben consultarse en la documentación de cada una de ellas.

#### Ejemplo: Mostrar algunos anuncios

<!--ejemplo insertado - aparece en ampproject.org -->

<div>
  <amp-iframe height="522" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampad.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Show more" overflow="" tabindex="0" role="button">Mostrar código completo</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

## Atributos

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
    <td>Los atributos que empiezan por <code>data-vars-</code> están reservados para las <a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute">variables de <code>amp-analytics</code></a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>json (opcional)</strong></td>
    <td>Utiliza este atributo para transferir una configuración al anuncio como un objeto JSON complejo de forma arbitraria. El objeto se transfiere al anuncio tal cual, sin que se produzca ningún cambio en los nombres.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id (opcional)</strong></td>
    <td>Si se proporciona, es necesario confirmar <a href="https://www.ampproject.org/docs/reference/components/amp-user-notification.html">amp-user-notification</a> con el ID de HTML hasta que el "ID de cliente de AMP" del usuario (similar a una cookie) se transmita al anuncio. Esto quiere decir que el renderizado de los anuncios no se produce hasta que el usuario confirma la notificación.</td>
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
    <td>Este elemento incluye <a href="https://www.ampproject.org/docs/reference/common_attributes">atributos comunes</a> que se aplican a los componentes de AMP.</td>
  </tr>
</table>

## Marcador de posición

De forma opcional, `amp-ad` admite un elemento secundario con el atributo `placeholder`. Si la red publicitaria lo admite, este elemento se mostrará hasta que el anuncio esté disponible para publicarse. Obtén más información sobre los [marcadores de posición y los respaldos](https://www.ampproject.org/docs/guides/responsive/placeholders).

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## No hay ningún anuncio disponible

Si no hay ningún anuncio disponible para el espacio, AMP intenta ocultar el elemento `amp-ad` (es decir, define `display: none`), ya que determina que esta operación se puede llevar a cabo sin afectar a la posición de desplazamiento del usuario. Si el anuncio está en el viewport actual, no se ocultará porque afecta a la posición de desplazamiento del usuario; de lo contrario, se ocultará.

En caso de que falle el intento de ocultar el anuncio, el componente `amp-ad` admite un elemento secundario con el atributo `fallback`. Si hay un elemento de respaldo personalizado presente, se muestra; de lo contrario, AMP aplica un respaldo predeterminado.

Ejemplo con un respaldo:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Publicar anuncios de vídeo

Hay 3 formas de monetizar anuncios de vídeo en AMP:

1. AMP admite de forma nativa ciertos reproductores de vídeo que se pueden utilizar para monetizar anuncios, como BrightCove, DailyMotion, etc. Para obtener una lista completa, consulta los componentes [multimedia](https://www.ampproject.org/docs/reference/components#media).

2. Utiliza el componente [amp-ima-video](https://www.ampproject.org/docs/reference/components/amp-ima-video.html), que incluye un SDK de IMA y un reproductor de vídeo HTML5 integrados.
3. Si utilizas un reproductor de vídeo que no es compatible con AMP, puedes incluirlo mediante [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
Si usas este método, ten en cuenta que:

    * Debe haber una imagen de póster si cargas el reproductor en el primer viewport. [Más información](https://www.ampproject.org/docs/reference/components/amp-iframe#iframe-with-placeholder)
    * Tanto el vídeo como la imagen de póster se deben servir a través de HTTPS.</li>

## Publicar anuncios desde un dominio personalizado

AMP admite la carga del iframe de arranque que se utiliza para cargar anuncios de un dominio personalizado, como el tuyo.

Para habilitarlo, copia el archivo [remote.html](../../3p/remote.html) en tu servidor web. A continuación, añade la siguiente metaetiqueta a tus archivos de AMP:

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  El atributo `content` de la metaetiqueta es la URL absoluta de la copia del archivo remote.html que está en tu servidor web. Esta URL debe utilizar un esquema "https", y no puede encontrarse en el mismo origen que tus archivos AMP. Por ejemplo, si alojas archivos AMP en `www.example.com`, esta URL no puede estar en `www.example.com`, pero sí en `something-else.example.com`. Para obtener más información sobre los orígenes de iframe permitidos, consulta la [política de origen de iframe](../../spec/amp-iframe-origin-policy.md).

### Seguridad

**Valida los datos entrantes** antes de transferirlos a la función `draw3p` para asegurarte de que el iframe funciona del modo previsto. Esto se aplica, en concreto, a las redes publicitarias que permiten la inyección de código JavaScript personalizado.

Los iframes también deben obligar a que solo se les incluya en los orígenes a los que tienen previsto unirse. Dichos orígenes serían:

* Tus propios orígenes
* `https://cdn.ampproject.org` para la caché de AMP

En el caso de la caché de AMP, también debes comprobar que el origen de la fuente (el origen del documento que sirve cdn.ampproject.org) sea uno de tus orígenes.

La aplicación de los orígenes se puede llevar a cabo con el tercer argumento de `draw3p` junto con la directiva [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options), para así obtener compatibilidad total con el navegador.

### Mejorar la configuración de anuncios entrantes

Esto es completamente opcional: a veces se puede querer mejorar la solicitud de anuncio antes de enviarla al servidor de anuncios.

Si tu red publicitaria admite [Fast Fetch](https://www.ampproject.org/docs/ads/adnetwork_integration#creating-an-amp-ad-implementation), utiliza entonces la función [Real-Time Config (RTC)](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (por ejemplo, las integraciones de DoubleClick y AdSense admiten Fast Fetch y RTC).

Si tu red de anuncios utiliza Delayed Fetch, puedes transferir una retrollamada a la llamada a la función `draw3p` en el archivo [remote.html](../../3p/remote.html). La retrollamada recibe la configuración entrante como primer argumento y, a continuación, recibe otra retrollamada como segundo argumento (denominada `done` en el ejemplo que aparece más abajo). Se debe ejecutar esta retrollamada con la configuración actualizada para que se lleve a cabo el renderizado de anuncios.

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

## Estilo

Los elementos `<amp-ad>` no pueden contener o estar dentro de contenedores que tengan definido `position: fixed` de CSS, con la excepción de `amp-lightbox`.
Esto se debe a las implicaciones que tienen en la experiencia de usuario los anuncios superpuestos de página completa. Es posible que se permita en el futuro utilizar formatos de anuncio similares, en contenedores controlados por AMP que mantengan ciertas características invariables de experiencia de usuario.

## Validación

Consulta las [reglas de amp-ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) en la especificación de la herramienta de validación de AMP.

## Redes publicitarias admitidas

* [A8](../../ads/a8.md)
* [A9](../../ads/a9.md)
* [AccessTrade](../../ads/accesstrade.md)
* [Adblade](../../ads/adblade.md)
* [AdButler](../../ads/adbutler.md)
* [Adform](../../ads/adform.md)
* [Adfox](../../ads/adfox.md)
* [Ad Generation](../../ads/adgeneration.md)
* [Adhese](../../ads/adhese.md)
* [Adincube](../../ads/adincube.md)
* [ADITION](../../ads/adition.md)
* [Adman](../../ads/adman.md)
* [AdmanMedia](../../ads/admanmedia.md)
* [Admixer](../../ads/admixer.md)
* [AdOcean](../../ads/adocean.md)
* [AdPicker](../../ads/adpicker.md)
* [AdPlugg](../../ads/adplugg.md)
* [Adpon](../../ads/adpon.md)
* [AdReactor](../../ads/adreactor.md)
* [AdSense](../../ads/google/adsense.md)
* [AdSensor](../../ads/adsensor.md)
* [AdsNative](../../ads/adsnative.md)
* [AdSpeed](../../ads/adspeed.md)
* [AdSpirit](../../ads/adspirit.md)
* [AdStir](../../ads/adstir.md)
* [AdTech](../../ads/adtech.md)
* [AdThrive](../../ads/adthrive.md)
* [AdUnity](../../ads/adunity.md)
* [Ad Up Technology](../../ads/aduptech.md)
* [Adventive](../../ads/adventive.md)
* [Adverline](../../ads/adverline.md)
* [Adverticum](../../ads/adverticum.md)
* [AdvertServe](../../ads/advertserve.md)
* [Adyoulike](../../ads/adyoulike.md)
* [Affiliate-B](../../ads/affiliateb.md)
* [AMoAd](../../ads/amoad.md)
* [AppNexus](../../ads/appnexus.md)
* [AppVador](../../ads/appvador.md)
* [Atomx](../../ads/atomx.md)
* [Baidu](../../ads/baidu.md)
* [BeOpinion](../amp-beopinion/amp-beopinion.md)
* [Bidtellect](../../ads/bidtellect.md)
* [brainy](../../ads/brainy.md)
* [Broadstreet Ads](../../ads/broadstreetads.md)
* [CA A.J.A. Infeed](../../ads/caajainfeed.md)
* [CA-ProFit-X](../../ads/caprofitx.md)
* [Cedato](../../ads/cedato.md)
* [Chargeads](../../ads/chargeads.md)
* [Colombia](../../ads/colombia.md)
* [Connatix](../../ads/connatix.md)
* [Content.ad](../../ads/contentad.md)
* [Criteo](../../ads/criteo.md)
* [CSA](../../ads/google/csa.md)
* [CxenseDisplay](../../ads/eas.md)
* [Dianomi](../../ads/dianomi.md)
* [Directadvert](../../ads/directadvert.md)
* [DistroScale](../../ads/distroscale.md)
* [Dot and Media](../../ads/dotandads.md)
* [Doubleclick](../../ads/google/doubleclick.md)
* [eADV](../../ads/eadv.md)
* [E-Planning](../../ads/eplanning.md)
* [Ezoic](../../ads/ezoic.md)
* [Felmat](../../ads/felmat.md)
* [FlexOneELEPHANT](../../ads/f1e.md)
* [FlexOneHARRIER](../../ads/f1h.md)
* [Flite](../../ads/flite.md)
* [fluct](../../ads/fluct.md)
* [FreeWheel](../../ads/freewheel.md)
* [Fusion](../../ads/fusion.md)
* [GenieeSSP](../../ads/genieessp.md)
* [Giraff](../../ads/giraff.md)
* [GMOSSP](../../ads/gmossp.md)
* [GumGum](../../ads/gumgum.md)
* [Holder](../../ads/holder.md)
* [I-Mobile](../../ads/imobile.md)
* [Imonomy](../../ads/imonomy.md)
* [iBillboard](../../ads/ibillboard.md)
* [Imedia](../../ads/imedia.md)
* [Improve Digital](../../ads/improvedigital.md)
* [Index Exchange](../../ads/ix.md)
* [Industrybrains](../../ads/industrybrains.md)
* [InMobi](../../ads/inmobi.md)
* [Innity](../../ads/innity.md)
* [Kargo](../../ads/kargo.md)
* [Kiosked](../../ads/kiosked.md)
* [Kixer](../../ads/kixer.md)
* [Kuadio](../../ads/kuadio.md)
* [Ligatus](../../ads/ligatus.md)
* [LockerDome](../../ads/lockerdome.md)
* [LOKA](../../ads/loka.md)
* [MADS](../../ads/mads.md)
* [MANTIS](../../ads/mantis.md)
* [Media.net](../../ads/medianet.md)
* [MediaImpact](../../ads/mediaimpact.md)
* [Mediavine](../../ads/mediavine.md)
* [Medyanet](../../ads/medyanet.md)
* [Meg](../../ads/meg.md)
* [MicroAd](../../ads/microad.md)
* [MixiMedia](../../ads/miximedia.md)
* [Mixpo](../../ads/mixpo.md)
* [Monetizer101](../../ads/monetizer101.md)
* [mox](../../ads/mox.md)
* [myTarget](../../ads/mytarget.md)
* [myWidget](../../ads/mywidget.md)
* [Nativo](../../ads/nativo.md)
* [Navegg](../../ads/navegg.md)
* [Nend](../../ads/nend.md)
* [NETLETIX](../../ads/netletix.md)
* [Noddus](../../ads/noddus.md)
* [Nokta](../../ads/nokta.md)
* [OneAD](../../ads/onead.md)
* [OnNetwork](../../ads/onnetwork.md)
* [Open AdStream (OAS)](../../ads/openadstream.md)
* [OpenX](../../ads/openx.md)
* [Pixels](../../ads/pixels.md)
* [plista](../../ads/plista.md)
* [polymorphicAds](../../ads/polymorphicads.md)
* [popin](../../ads/popin.md)
* [Pressboard](../../ads/pressboard.md)
* [PromoteIQ](../../ads/promoteiq.md)
* [PubGuru](../../ads/pubguru.md)
* [PubMatic](../../ads/pubmatic.md)
* [Pubmine](../../ads/pubmine.md)
* [PulsePoint](../../ads/pulsepoint.md)
* [Purch](../../ads/purch.md)
* [Rambler&amp;Co](../../ads/capirs.md)
* [RbInfoxSg](../../ads/rbinfox.md)
* [Realclick](../../ads/realclick.md)
* [recomAD](../../ads/recomad.md)
* [Red for Publishers](../../ads/rfp.md)
* [Relap](../../ads/relap.md)
* [Revcontent](../../ads/revcontent.md)
* [RevJet](../../ads/revjet.md)
* [Rubicon Project](../../ads/rubicon.md)
* [RUNative](../../ads/runative.md)
* [SAS CI 360 Match](../../ads/sas.md)
* [Sekindo](../../ads/sekindo.md)
* [Sharethrough](../../ads/sharethrough.md)
* [Sklik](../../ads/sklik.md)
* [SlimCut Media](../../ads/slimcutmedia.md)
* [Smart AdServer](../../ads/smartadserver.md)
* [smartclip](../../ads/smartclip.md)
* [sogou Ad](../../ads/sogouad.md)
* [Sortable](../../ads/sortable.md)
* [SOVRN](../../ads/sovrn.md)
* [Speakol](../../ads/speakol.md)
* [SpotX](../../ads/spotx.md)
* [SunMedia](../../ads/sunmedia.md)
* [Swoop](../../ads/swoop.md)
* [TcsEmotion](../../ads/tcsemotion.md)
* [Teads](../../ads/teads.md)
* [torimochi](../../ads/torimochi.md)
* [TripleLift](../../ads/triplelift.md)
* [Trugaze](../../ads/trugaze.md)
* [UZOU](../../ads/uzou.md)
* [ValueCommerce](../../ads/valuecommerce.md)
* [video intelligence](../../ads/videointelligence.md)
* [Videonow](../../ads/videonow.md)
* [Viralize](../../ads/viralize.md)
* [UAS](../../ads/uas.md)
* [ucfunnel](../../ads/ucfunnel.md)
* [Unruly](../../ads/unruly.md)
* [VMFive](../../ads/vmfive.md)
* [Webediads](../../ads/webediads.md)
* [Weborama](../../ads/weborama.md)
* [Widespace](../../ads/widespace.md)
* [Wisteria](../../ads/wisteria.md)
* [WPMedia](../../ads/wpmedia.md)
* [Xlift](../../ads/xlift.md)
* [Yahoo](../../ads/yahoo.md)
* [YahooJP](../../ads/yahoojp.md)
* [Yandex](../../ads/yandex.md)
* [Yengo](../../ads/yengo.md)
* [Yieldbot](../../ads/yieldbot.md)
* [Yieldmo](../../ads/yieldmo.md)
* [Yieldone](../../ads/yieldone.md)
* [Yieldpro](../../ads/yieldpro.md)
* [Zedo](../../ads/zedo.md)
* [Zucks](../../ads/zucks.md)

## Tipos de inserción admitidos

* [24smi](../../ads/24smi.md)
* [AJA](../../ads/aja.md)
* [Bringhub](../../ads/bringhub.md)
* [Dable](../../ads/dable.md)
* [Engageya](../../ads/engageya.md)
* [Epeex](../../ads/epeex.md)
* [Jubna](../../ads/jubna.md)
* [Outbrain](../../ads/outbrain.md)
* [Postquare](../../ads/postquare.md)
* [PubExchange](../../ads/pubexchange.md)
* [Smi2](../../ads/smi2.md)
* [Taboola](../../ads/taboola.md)
* [Zen](../../ads/zen.md)
* [ZergNet](../../ads/zergnet.md)
