---
$title: amp-ad
$category@: ads-analytics
teaser:
  text: Un contenitore per la visualizzazione di un annuncio.
---



Un contenitore per la visualizzazione di un annuncio. `amp-embed` è un alias del tag `amp-ad`, da cui derivano tutte le sue funzionalità con un nome tag diverso. Utilizza `amp-embed` quando semanticamente è più preciso. I documenti AMP supportano solo annunci/incorporamenti pubblicati tramite HTTPS.

# <a name="amp-ad"></a> amp-ad / amp-embed


[tip type="note"]
È probabile che la specifica di `amp-ad`/`amp-embed` subirà modifiche significative nel corso del tempo. L'approccio attuale è progettato per eseguire il bootstrap del formato in modo da pubblicare gli annunci.
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
    <td class="col-fourty"><strong>Descrizione</strong></td>
    <td>Un contenitore per la visualizzazione di un annuncio. <code>amp-embed</code> è un alias del tag <code>amp-ad</code>, da cui derivano tutte le sue funzionalità con un nome tag diverso. Utilizza <code>amp-embed</code> quando semanticamente è più preciso. I documenti AMP supportano solo annunci/incorporamenti pubblicati tramite HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js">&lt;</code><br>Nota: amp-ad potrebbe continuare a funzionare anche senza questo script, ma lo consigliamo vivamente per questioni di compatibilità futura.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Esempi</strong></td>
    <td>Vedi l'<a href="https://ampbyexample.com/components/amp-ad/">esempio amp-ad</a> del sito AMP by Example.</td>
  </tr>
</table>

## Comportamento <a name="behavior"></a>

Gli annunci vengono caricati come tutte le altre risorse nei documenti AMP, insieme a uno speciale
elemento personalizzato chiamato `<amp-ad>`. All'interno del documento AMP non è possibile eseguire codice JavaScript fornito da reti pubblicitarie. Invece, il runtime AMP carica un iframe da
un'origine diversa (tramite la sandbox iframe) come documento AMP ed esegue il codice
JavaScript della rete pubblicitaria all'interno della sandbox iframe.

`<amp-ad>` richiede che i valori di larghezza e altezza siano specificati in base alla [regola](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#tldr-summary-of-layout-requirements--behaviors) del suo tipo di layout. Richiede un argomento `type` che selezioni quale rete pubblicitaria mostrare. Tutti gli attributi `data-*` nel tag sono trasmessi automaticamente come argomenti al codice che fa visualizzare l'annuncio. Quali attributi `data-` sono necessari per un determinato tipo di rete dipende dalla rete pubblicitaria e devono essere specificati.

#### Esempio: visualizzazione di alcuni annunci <a name="example-displaying-a-few-ads"></a>

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

## Attributi <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (obbligatorio)</strong></td>
    <td>Specifica un identificatore per la <a href="#supported-ad-networks">rete pubblicitaria</a>. L'attributo <code>type</code> seleziona il modello da utilizzare per il tag annuncio.</td>
  </tr>
  <tr>
    <td width="40%"><strong>src (facoltativo)</strong></td>
    <td>Utilizza questo attributo per caricare un tag script per la rete pubblicitaria specificata. Puoi utilizzarlo per reti pubblicitarie che richiedono l'inserimento di un solo tag script nella pagina. Il valore <code>src</code> deve disporre di un prefisso consentito per la rete pubblicitaria e deve utilizzare il protocollo <code>https</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>La maggior parte delle reti pubblicitarie necessita di un'ulteriore configurazione, che può essere trasmessa alla rete tramite attributi <code>data-</code> HTML. I nomi dei parametri sono soggetti alla conversione standard degli attributi dei dati dai trattini alla notazione a cammello. Ad esempio, "data-foo-bar" viene inviato all'annuncio per la configurazione come "fooBar". Consulta la documentazione relativa alla <a href="#supported-ad-networks">rete pubblicitaria</a> in cui possono essere utilizzati gli attributi.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-vars-foo-bar</strong></td>
    <td>Gli attributi che iniziano con <code>data-vars-</code> sono riservati ad <a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute"><code>amp-analytics</code> vars</a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>json (facoltativo)</strong></td>
    <td>Utilizza questo attributo per trasmettere una configurazione all'annuncio come un oggetto JSON arbitrariamente complesso. In questo modo, l'oggetto verrà trasmesso all'annuncio così com'è, senza alcuna alterazione dei nomi.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id (facoltativo)</strong></td>
    <td>Se fornito, richiede la conferma di <a href="amp-user-notification.md">amp-user-notification</a> con l'HTML-id specificato fino a quando "ID client AMP" dell'utente (simile a un cookie) non viene trasmesso all'annuncio. Ciò significa che il rendering dell'annuncio viene rimandato fino alla conferma della notifica da parte dell'utente.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-loading-strategy (facoltativo)</strong></td>
    <td>Indica all'annuncio di iniziare il caricamento quando si trova entro il numero specificato di aree visibili di distanza da quella attuale. Senza l'attributo <code>data-loading-strategy</code>, tale numero è 3 per impostazione predefinita. Puoi specificare un valore float nell'intervallo [0, 3]. Se il valore non è specificato, viene impostato su 1.25. Utilizza un valore inferiore per ottenere un maggiore grado di visibilità, ossia la probabilità che un annuncio, una volta caricato, venga visto. Così facendo, però, rischierai di generare meno impressioni, ovvero meno annunci caricati. Se specifichi l'attributo ma non il valore, il sistema assegna un valore float, che ottimizza per la visibilità senza avere un impatto eccessivamente negativo sulle impressioni. Tieni presente che, specificando <code>prefer-viewability-over-views</code> come valore, ottimizzerai comunque in modo automatico la visibilità.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-ad-container-id (facoltativo)</strong></td>
    <td>Informa l'annuncio dell'ID componente del contenitore nel caso in cui si tenti di comprimere. Il componente del contenitore deve essere un componente <code>&lt;amp-layout&gt;</code> che è un elemento principale rispetto all'annuncio. Quando specifichi <code>data-ad-container-id</code> e viene trovato un componente del contenitore <code>&lt;amp-layout&gt;</code>, il runtime AMP tenterà di comprimere il componente del contenitore anziché il componente dell'annuncio in caso di mancato riempimento. Questa funzione può essere utile quando è presente un indicatore di annunci.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>Questo elemento include <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">attributi comuni</a> estesi ai componenti AMP.</td>
  </tr>
</table>

## Segnaposto <a name="placeholder"></a>

Facoltativamente, `amp-ad` può supportare un elemento secondario con l'attributo `placeholder`. Se supportato dalla rete pubblicitaria, questo elemento viene mostrato finché l'annuncio è disponibile per la visualizzazione. Per ulteriori informazioni, consulta l'articolo relativo a [segnaposto e fallback](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## Nessun annuncio disponibile <a name="no-ad-available"></a>

Se non è disponibile nessun annuncio per lo slot, AMP tenta di comprimere l'elemento `amp-ad` (ovvero, viene impostato su `display: none`). AMP fa in modo che questa operazione venga eseguita senza influire sulla posizione di scorrimento dell'utente. Se l'annuncio si trova nell'area visibile corrente non verrà compresso, in quanto ciò influirebbe sulla posizione di scorrimento dell'utente; tuttavia, se l'annuncio è esterno all'area visibile corrente, verrà compresso.

Nel caso in cui il tentativo di compressione fallisca, il componente `amp-ad` supporta un elemento secondario con l'attributo `fallback`. Se è presente un elemento di riserva, viene mostrato l'elemento di riserva personalizzato. In caso contrario, AMP applica un elemento di riserva predefinito.

Esempio con elemento di riserva:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Pubblicare annunci video <a name="serving-video-ads"></a>

Sono tre i modi per monetizzare video in AMP con gli annunci video:

1. AMP supporta in modo nativo diversi video player, come BrightCove, DailyMotion e altri in grado di monetizzare gli annunci. Per un elenco completo, consulta i componenti [multimediali](../../../documentation/components/index.html#media).

2. Utilizza il componente [amp-ima-video](amp-ima-video.md) che include un SDK IMA incorporato e un video player HTML5
3. Se il tuo video player non è supportato in AMP, puoi pubblicare il tuo video player personalizzato con [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
Se utilizzi `amp-iframe`:

    * Assicurati che ci sia un poster se il player viene caricato nella prima area visibile. [Ulteriori dettagli](amp-iframe.md#iframe-with-placeholder).
    * Video e poster devono essere pubblicati tramite HTTPS.</li>

## Pubblicare annunci da un dominio personalizzato <a name="running-ads-from-a-custom-domain"></a>

AMP supporta il caricamento dell'iframe bootstrap utilizzato per caricare gli annunci da un dominio personalizzato, come il tuo.

Per attivarlo, copia il file [remote.html](https://github.com/ampproject/amphtml/blob/master/3p/remote.html) sul tuo server web. In seguito, aggiungi il seguente meta tag ai tuoi file AMP:

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  L'attributo `content` del meta tag è l'URL assoluto della tua copia del file html remoto sul server web. L'URL deve utilizzare uno schema "https" e non può trovarsi sulla stessa origine dei file AMP. Ad esempio, se i file AMP sono ospitati su `www.example.com`, l'URL non deve trovarsi su `www.example.com` ma su `something-else.example.com`. Consulta le [norme relative alle origini di iframe](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md) per ulteriori dettagli sulle origini consentite per iframe.

### Sicurezza <a name="security"></a>

**Convalida i dati in arrivo** prima di trasmetterli alla funzione `draw3p` in modo da assicurarti che il tuo iframe funzioni come previsto. Questo vale in particolare per le reti pubblicitarie che consentono l'inserimento di codice JavaScript personalizzato.

Gli iframe dovrebbero anche far sì che vengano inseriti come iframe solo nelle origini previste. Tali origini sono:

* Le tue origini
* `https://cdn.ampproject.org` per la cache AMP

Nel caso della cache AMP, devi anche controllare che la "provenienza dell'origine" (l'origine del documento pubblicato da cdn.ampproject.org) sia una delle tue origini.

L'applicazione delle origini può essere effettuata con il terzo argomento di `draw3p` e deve essere eseguita utilizzando la direttiva [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) per garantire il supporto completo del browser.

### Migliorare la configurazione degli annunci in arrivo <a name="enhance-incoming-ad-configuration"></a>

Questa operazione è completamente facoltativa. Potresti voler migliorare la richiesta di annuncio prima che questa venga effettuata all'ad server.

Se la rete pubblicitaria supporta il [recupero veloce](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md#creating-an-amp-ad), utilizza la [Configurazione in tempo reale (RTC, Real Time Config)](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md); ad esempio, le integrazioni DoubleClick e AdSense supportano entrambe il recupero veloce e la Configurazione in tempo reale.

Se la rete pubblicitaria utilizza il recupero ritardato, puoi trasmettere un callback alla chiamata funzione `draw3p` all'interno del file [remote.html](https://github.com/ampproject/amphtml/blob/master/3p/remote.html). Il callback riceve la configurazione in entrata come primo argomento, quindi riceve un altro callback come secondo argomento (chiamato `done` nell'esempio di seguito). Questo callback deve essere chiamato con la configurazione aggiornata affinché la visualizzazione dell'annuncio possa proseguire.

Esempio:

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

## Stili <a name="styling"></a>

Gli elementi `<amp-ad>` non possono possedere o essere inseriti essi stessi in contenitori impostati su CSS `position: fixed`, con l'eccezione di `amp-lightbox`.
Ciò è dovuto alle implicazioni UX degli annunci in overlay a pagina intera. È possibile che in futuro si consentano formati di annunci simili all'interno di contenitori controllati da AMP che mantengano determinati elementi UX non modificati.

## Convalida <a name="validation"></a>

Consulta le [regole amp-ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) nella specifica dello strumento di convalida AMP.

## Reti pubblicitarie supportate <a name="supported-ad-networks"></a>

* [A8](https://github.com/ampproject/amphtml/blob/master/ads/a8.md)
* [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md)
* [AccessTrade](https://github.com/ampproject/amphtml/blob/master/ads/accesstrade.md)
* [Adblade](https://github.com/ampproject/amphtml/blob/master/ads/adblade.md)
* [AdButler](https://github.com/ampproject/amphtml/blob/master/ads/adbutler.md)
* [Adform](https://github.com/ampproject/amphtml/blob/master/ads/adform.md)
* [Adfox](https://github.com/ampproject/amphtml/blob/master/ads/adfox.md)
* [Ad Generation](https://github.com/ampproject/amphtml/blob/master/ads/adgeneration.md)
* [Adhese](https://github.com/ampproject/amphtml/blob/master/ads/adhese.md)
* [Adincube](https://github.com/ampproject/amphtml/blob/master/ads/adincube.md)
* [ADITION](https://github.com/ampproject/amphtml/blob/master/ads/adition.md)
* [Adman](https://github.com/ampproject/amphtml/blob/master/ads/adman.md)
* [AdmanMedia](https://github.com/ampproject/amphtml/blob/master/ads/admanmedia.md)
* [Admixer](https://github.com/ampproject/amphtml/blob/master/ads/admixer.md)
* [AdOcean](https://github.com/ampproject/amphtml/blob/master/ads/adocean.md)
* [AdPicker](https://github.com/ampproject/amphtml/blob/master/ads/adpicker.md)
* [AdPlugg](https://github.com/ampproject/amphtml/blob/master/ads/adplugg.md)
* [Adpon](https://github.com/ampproject/amphtml/blob/master/ads/adpon.md)
* [AdReactor](https://github.com/ampproject/amphtml/blob/master/ads/adreactor.md)
* [AdSense](https://github.com/ampproject/amphtml/blob/master/ads/google/adsense.md)
* [AdSensor](https://github.com/ampproject/amphtml/blob/master/ads/adsensor.md)
* [AdsNative](https://github.com/ampproject/amphtml/blob/master/ads/adsnative.md)
* [AdSpeed](https://github.com/ampproject/amphtml/blob/master/ads/adspeed.md)
* [AdSpirit](https://github.com/ampproject/amphtml/blob/master/ads/adspirit.md)
* [AdStir](https://github.com/ampproject/amphtml/blob/master/ads/adstir.md)
* [AdTech](https://github.com/ampproject/amphtml/blob/master/ads/adtech.md)
* [AdThrive](https://github.com/ampproject/amphtml/blob/master/ads/adthrive.md)
* [AdUnity](https://github.com/ampproject/amphtml/blob/master/ads/adunity.md)
* [Ad Up Technology](https://github.com/ampproject/amphtml/blob/master/ads/aduptech.md)
* [Adventive](https://github.com/ampproject/amphtml/blob/master/ads/adventive.md)
* [Adverline](https://github.com/ampproject/amphtml/blob/master/ads/adverline.md)
* [Adverticum](https://github.com/ampproject/amphtml/blob/master/ads/adverticum.md)
* [AdvertServe](https://github.com/ampproject/amphtml/blob/master/ads/advertserve.md)
* [Adyoulike](https://github.com/ampproject/amphtml/blob/master/ads/adyoulike.md)
* [Affiliate-B](https://github.com/ampproject/amphtml/blob/master/ads/affiliateb.md)
* [AJA](https://github.com/ampproject/amphtml/blob/master/ads/aja.md)
* [AMoAd](https://github.com/ampproject/amphtml/blob/master/ads/amoad.md)
* [AppNexus](https://github.com/ampproject/amphtml/blob/master/ads/appnexus.md)
* [AppVador](https://github.com/ampproject/amphtml/blob/master/ads/appvador.md)
* [Atomx](https://github.com/ampproject/amphtml/blob/master/ads/atomx.md)
* [Baidu](https://github.com/ampproject/amphtml/blob/master/ads/baidu.md)
* [BeOpinion](amp-beopinion.md)
* [Bidtellect](https://github.com/ampproject/amphtml/blob/master/ads/bidtellect.md)
* [brainy](https://github.com/ampproject/amphtml/blob/master/ads/brainy.md)
* [Broadstreet Ads](https://github.com/ampproject/amphtml/blob/master/ads/broadstreetads.md)
* [CA A.J.A. Infeed](https://github.com/ampproject/amphtml/blob/master/ads/caajainfeed.md)
* [CA-ProFit-X](https://github.com/ampproject/amphtml/blob/master/ads/caprofitx.md)
* [Cedato](https://github.com/ampproject/amphtml/blob/master/ads/cedato.md)
* [Chargeads](https://github.com/ampproject/amphtml/blob/master/ads/chargeads.md)
* [Colombia](https://github.com/ampproject/amphtml/blob/master/ads/colombia.md)
* [Connatix](https://github.com/ampproject/amphtml/blob/master/ads/connatix.md)
* [Content.ad](https://github.com/ampproject/amphtml/blob/master/ads/contentad.md)
* [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md)
* [CSA](https://github.com/ampproject/amphtml/blob/master/ads/google/csa.md)
* [CxenseDisplay](https://github.com/ampproject/amphtml/blob/master/ads/eas.md)
* [Dianomi](https://github.com/ampproject/amphtml/blob/master/ads/dianomi.md)
* [Directadvert](https://github.com/ampproject/amphtml/blob/master/ads/directadvert.md)
* [DistroScale](https://github.com/ampproject/amphtml/blob/master/ads/distroscale.md)
* [Dot and Media](https://github.com/ampproject/amphtml/blob/master/ads/dotandads.md)
* [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md)
* [eADV](https://github.com/ampproject/amphtml/blob/master/ads/eadv.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/master/ads/epeex.md)
* [E-Planning](https://github.com/ampproject/amphtml/blob/master/ads/eplanning.md)
* [Ezoic](https://github.com/ampproject/amphtml/blob/master/ads/ezoic.md)
* [Felmat](https://github.com/ampproject/amphtml/blob/master/ads/felmat.md)
* [FlexOneELEPHANT](https://github.com/ampproject/amphtml/blob/master/ads/f1e.md)
* [FlexOneHARRIER](https://github.com/ampproject/amphtml/blob/master/ads/f1h.md)
* [Flite](https://github.com/ampproject/amphtml/blob/master/ads/flite.md)
* [fluct](https://github.com/ampproject/amphtml/blob/master/ads/fluct.md)
* [FreeWheel](https://github.com/ampproject/amphtml/blob/master/ads/freewheel.md)
* [Fusion](https://github.com/ampproject/amphtml/blob/master/ads/fusion.md)
* [GenieeSSP](https://github.com/ampproject/amphtml/blob/master/ads/genieessp.md)
* [Giraff](https://github.com/ampproject/amphtml/blob/master/ads/giraff.md)
* [GMOSSP](https://github.com/ampproject/amphtml/blob/master/ads/gmossp.md)
* [GumGum](https://github.com/ampproject/amphtml/blob/master/ads/gumgum.md)
* [Holder](https://github.com/ampproject/amphtml/blob/master/ads/holder.md)
* [I-Mobile](https://github.com/ampproject/amphtml/blob/master/ads/imobile.md)
* [Imonomy](https://github.com/ampproject/amphtml/blob/master/ads/imonomy.md)
* [iBillboard](https://github.com/ampproject/amphtml/blob/master/ads/ibillboard.md)
* [Imedia](https://github.com/ampproject/amphtml/blob/master/ads/imedia.md)
* [Improve Digital](https://github.com/ampproject/amphtml/blob/master/ads/improvedigital.md)
* [Index Exchange](https://github.com/ampproject/amphtml/blob/master/ads/ix.md)
* [Industrybrains](https://github.com/ampproject/amphtml/blob/master/ads/industrybrains.md)
* [InMobi](https://github.com/ampproject/amphtml/blob/master/ads/inmobi.md)
* [Innity](https://github.com/ampproject/amphtml/blob/master/ads/innity.md)
* [Kargo](https://github.com/ampproject/amphtml/blob/master/ads/kargo.md)
* [Kiosked](https://github.com/ampproject/amphtml/blob/master/ads/kiosked.md)
* [Kixer](https://github.com/ampproject/amphtml/blob/master/ads/kixer.md)
* [Kuadio](https://github.com/ampproject/amphtml/blob/master/ads/kuadio.md)
* [Ligatus](https://github.com/ampproject/amphtml/blob/master/ads/ligatus.md)
* [LockerDome](https://github.com/ampproject/amphtml/blob/master/ads/lockerdome.md)
* [LOKA](https://github.com/ampproject/amphtml/blob/master/ads/loka.md)
* [MADS](https://github.com/ampproject/amphtml/blob/master/ads/mads.md)
* [MANTIS](https://github.com/ampproject/amphtml/blob/master/ads/mantis.md)
* [Media.net](https://github.com/ampproject/amphtml/blob/master/ads/medianet.md)
* [MediaImpact](https://github.com/ampproject/amphtml/blob/master/ads/mediaimpact.md)
* [Mediavine](https://github.com/ampproject/amphtml/blob/master/ads/mediavine.md)
* [Medyanet](https://github.com/ampproject/amphtml/blob/master/ads/medyanet.md)
* [Meg](https://github.com/ampproject/amphtml/blob/master/ads/meg.md)
* [MicroAd](https://github.com/ampproject/amphtml/blob/master/ads/microad.md)
* [MixiMedia](https://github.com/ampproject/amphtml/blob/master/ads/miximedia.md)
* [Mixpo](https://github.com/ampproject/amphtml/blob/master/ads/mixpo.md)
* [Monetizer101](https://github.com/ampproject/amphtml/blob/master/ads/monetizer101.md)
* [mox](https://github.com/ampproject/amphtml/blob/master/ads/mox.md)
* [myTarget](https://github.com/ampproject/amphtml/blob/master/ads/mytarget.md)
* [myWidget](https://github.com/ampproject/amphtml/blob/master/ads/mywidget.md)
* [Nativo](https://github.com/ampproject/amphtml/blob/master/ads/nativo.md)
* [Navegg](https://github.com/ampproject/amphtml/blob/master/ads/navegg.md)
* [Nend](https://github.com/ampproject/amphtml/blob/master/ads/nend.md)
* [NETLETIX](https://github.com/ampproject/amphtml/blob/master/ads/netletix.md)
* [Noddus](https://github.com/ampproject/amphtml/blob/master/ads/noddus.md)
* [Nokta](https://github.com/ampproject/amphtml/blob/master/ads/nokta.md)
* [OneAD](https://github.com/ampproject/amphtml/blob/master/ads/onead.md)
* [OnNetwork](https://github.com/ampproject/amphtml/blob/master/ads/onnetwork.md)
* [Open AdStream (OAS)](https://github.com/ampproject/amphtml/blob/master/ads/openadstream.md)
* [OpenX](https://github.com/ampproject/amphtml/blob/master/ads/openx.md)
* [Pixel](https://github.com/ampproject/amphtml/blob/master/ads/pixels.md)
* [plista](https://github.com/ampproject/amphtml/blob/master/ads/plista.md)
* [polymorphicAds](https://github.com/ampproject/amphtml/blob/master/ads/polymorphicads.md)
* [popin](https://github.com/ampproject/amphtml/blob/master/ads/popin.md)
* [Pressboard](https://github.com/ampproject/amphtml/blob/master/ads/pressboard.md)
* [PromoteIQ](https://github.com/ampproject/amphtml/blob/master/ads/promoteiq.md)
* [PubGuru](https://github.com/ampproject/amphtml/blob/master/ads/pubguru.md)
* [PubMatic](https://github.com/ampproject/amphtml/blob/master/ads/pubmatic.md)
* [Pubmine](https://github.com/ampproject/amphtml/blob/master/ads/pubmine.md)
* [PulsePoint](https://github.com/ampproject/amphtml/blob/master/ads/pulsepoint.md)
* [Purch](https://github.com/ampproject/amphtml/blob/master/ads/purch.md)
* [Rambler&amp;Co](https://github.com/ampproject/amphtml/blob/master/ads/capirs.md)
* [RbInfoxSg](https://github.com/ampproject/amphtml/blob/master/ads/rbinfox.md)
* [Realclick](https://github.com/ampproject/amphtml/blob/master/ads/realclick.md)
* [recomAD](https://github.com/ampproject/amphtml/blob/master/ads/recomad.md)
* [Red for Publishers](https://github.com/ampproject/amphtml/blob/master/ads/rfp.md)
* [Relap](https://github.com/ampproject/amphtml/blob/master/ads/relap.md)
* [Revcontent](https://github.com/ampproject/amphtml/blob/master/ads/revcontent.md)
* [RevJet](https://github.com/ampproject/amphtml/blob/master/ads/revjet.md)
* [Rubicon Project](https://github.com/ampproject/amphtml/blob/master/ads/rubicon.md)
* [RUNative](https://github.com/ampproject/amphtml/blob/master/ads/runative.md)
* [SAS CI 360 Match](https://github.com/ampproject/amphtml/blob/master/ads/sas.md)
* [Sekindo](https://github.com/ampproject/amphtml/blob/master/ads/sekindo.md)
* [Sharethrough](https://github.com/ampproject/amphtml/blob/master/ads/sharethrough.md)
* [Sklik](https://github.com/ampproject/amphtml/blob/master/ads/sklik.md)
* [SlimCut Media](https://github.com/ampproject/amphtml/blob/master/ads/slimcutmedia.md)
* [Smart AdServer](https://github.com/ampproject/amphtml/blob/master/ads/smartadserver.md)
* [smartclip](https://github.com/ampproject/amphtml/blob/master/ads/smartclip.md)
* [sogou Ad](https://github.com/ampproject/amphtml/blob/master/ads/sogouad.md)
* [Sortable](https://github.com/ampproject/amphtml/blob/master/ads/sortable.md)
* [SOVRN](https://github.com/ampproject/amphtml/blob/master/ads/sovrn.md)
* [Speakol](https://github.com/ampproject/amphtml/blob/master/ads/speakol.md)
* [SpotX](https://github.com/ampproject/amphtml/blob/master/ads/spotx.md)
* [SunMedia](https://github.com/ampproject/amphtml/blob/master/ads/sunmedia.md)
* [Swoop](https://github.com/ampproject/amphtml/blob/master/ads/swoop.md)
* [TcsEmotion](https://github.com/ampproject/amphtml/blob/master/ads/tcsemotion.md)
* [Teads](https://github.com/ampproject/amphtml/blob/master/ads/teads.md)
* [torimochi](https://github.com/ampproject/amphtml/blob/master/ads/torimochi.md)
* [TripleLift](https://github.com/ampproject/amphtml/blob/master/ads/triplelift.md)
* [Trugaze](https://github.com/ampproject/amphtml/blob/master/ads/trugaze.md)
* [UZOU](https://github.com/ampproject/amphtml/blob/master/ads/uzou.md)
* [ValueCommerce](https://github.com/ampproject/amphtml/blob/master/ads/valuecommerce.md)
* [video intelligence](https://github.com/ampproject/amphtml/blob/master/ads/videointelligence.md)
* [Videonow](https://github.com/ampproject/amphtml/blob/master/ads/videonow.md)
* [Viralize](https://github.com/ampproject/amphtml/blob/master/ads/viralize.md)
* [UAS](https://github.com/ampproject/amphtml/blob/master/ads/uas.md)
* [ucfunnel](https://github.com/ampproject/amphtml/blob/master/ads/ucfunnel.md)
* [Unruly](https://github.com/ampproject/amphtml/blob/master/ads/unruly.md)
* [VMFive](https://github.com/ampproject/amphtml/blob/master/ads/vmfive.md)
* [Webediads](https://github.com/ampproject/amphtml/blob/master/ads/webediads.md)
* [Weborama](https://github.com/ampproject/amphtml/blob/master/ads/weborama.md)
* [Widespace](https://github.com/ampproject/amphtml/blob/master/ads/widespace.md)
* [Wisteria](https://github.com/ampproject/amphtml/blob/master/ads/wisteria.md)
* [WPMedia](https://github.com/ampproject/amphtml/blob/master/ads/wpmedia.md)
* [Xlift](https://github.com/ampproject/amphtml/blob/master/ads/xlift.md)
* [Yahoo](https://github.com/ampproject/amphtml/blob/master/ads/yahoo.md)
* [YahooJP](https://github.com/ampproject/amphtml/blob/master/ads/yahoojp.md)
* [Yandex](https://github.com/ampproject/amphtml/blob/master/ads/yandex.md)
* [Yengo](https://github.com/ampproject/amphtml/blob/master/ads/yengo.md)
* [Yieldbot](https://github.com/ampproject/amphtml/blob/master/ads/yieldbot.md)
* [Yieldmo](https://github.com/ampproject/amphtml/blob/master/ads/yieldmo.md)
* [Yieldone](https://github.com/ampproject/amphtml/blob/master/ads/yieldone.md)
* [Yieldpro](https://github.com/ampproject/amphtml/blob/master/ads/yieldpro.md)
* [Zedo](https://github.com/ampproject/amphtml/blob/master/ads/zedo.md)
* [Zucks](https://github.com/ampproject/amphtml/blob/master/ads/zucks.md)

## Tipi di incorporamenti supportati <a name="supported-embed-types"></a>

* [24smi](https://github.com/ampproject/amphtml/blob/master/ads/24smi.md)
* [Bringhub](https://github.com/ampproject/amphtml/blob/master/ads/bringhub.md)
* [Dable](https://github.com/ampproject/amphtml/blob/master/ads/dable.md)
* [Engageya](https://github.com/ampproject/amphtml/blob/master/ads/engageya.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/master/ads/epeex.md)
* [Insticator](https://github.com/ampproject/amphtml/blob/master/ads/insticator.md)
* [Jubna](https://github.com/ampproject/amphtml/blob/master/ads/jubna.md)
* [Outbrain](https://github.com/ampproject/amphtml/blob/master/ads/outbrain.md)
* [Postquare](https://github.com/ampproject/amphtml/blob/master/ads/postquare.md)
* [PubExchange](https://github.com/ampproject/amphtml/blob/master/ads/pubexchange.md)
* [Smi2](https://github.com/ampproject/amphtml/blob/master/ads/smi2.md)
* [Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md)
* [Zen](https://github.com/ampproject/amphtml/blob/master/ads/zen.md)
* [ZergNet](https://github.com/ampproject/amphtml/blob/master/ads/zergnet.md)