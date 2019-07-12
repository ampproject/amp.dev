---
$category@: ads-analytics
formats:
- websites
teaser:
  text: Un contenitore per la visualizzazione di un annuncio.
---

# amp-ad/amp-embed

Un contenitore per la visualizzazione di un annuncio. `amp-embed` è un alias del tag `amp-ad`, da cui derivano tutte le sue funzionalità con un nome tag diverso. Utilizza `amp-embed` quando semanticamente è più preciso. I documenti AMP supportano solo annunci/incorporamenti pubblicati tramite HTTPS.

# `amp-ad` / `amp-embed`


[tip type="note"]
È probabile che la specifica di `amp-ad`/`amp-embed` subirà modifiche significative nel corso del tempo. L'approccio attuale è progettato per eseguire il bootstrap del formato in modo da pubblicare gli annunci.
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
    <td class="col-fourty"><strong>Descrizione</strong></td>
    <td>Un contenitore per la visualizzazione di un annuncio. <code>amp-embed</code> è un alias del tag <code>amp-ad</code>, da cui derivano tutte le sue funzionalità con un nome tag diverso. Utilizza <code>amp-embed</code> quando semanticamente è più preciso. I documenti AMP supportano solo annunci/incorporamenti pubblicati tramite HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js">&lt;</code><br>Nota: amp-ad potrebbe continuare a funzionare anche senza questo script, ma lo consigliamo vivamente per questioni di compatibilità futura.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Layout supportati</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Esempi</strong></td>
    <td>Vedi l'<a href="https://ampbyexample.com/components/amp-ad/">esempio amp-ad</a> del sito AMP by Example.</td>
  </tr>
</table>

## Comportamento

Gli annunci vengono caricati come tutte le altre risorse nei documenti AMP, insieme a uno speciale
elemento personalizzato chiamato `<amp-ad>`. All'interno del documento AMP non è possibile eseguire codice JavaScript fornito da reti pubblicitarie. Invece, il runtime AMP carica un iframe da
un'origine diversa (tramite la sandbox iframe) come documento AMP ed esegue il codice
JavaScript della rete pubblicitaria all'interno della sandbox iframe.

`<amp-ad>` richiede che i valori di larghezza e altezza siano specificati in base alla [regola](https://www.ampproject.org/docs/design/amp-html-layout#%28tl;dr%29-summary-of-layout-requirements-&amp;-behaviors) del suo tipo di layout. Richiede un argomento `type` che selezioni quale rete pubblicitaria mostrare. Tutti gli attributi `data-*` nel tag sono trasmessi automaticamente come argomenti al codice che fa visualizzare l'annuncio. Quali attributi `data-` sono necessari per un determinato tipo di rete dipende dalla rete pubblicitaria e devono essere specificati.

#### Esempio: visualizzazione di alcuni annunci

<!--embedded example - displays in ampproject.org -->

<div>
  <amp-iframe height="522" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampad.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Espandi" overflow="" tabindex="0" role="button">Mostra il codice completo</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

## Attributi

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
    <td>Se fornito, richiede la conferma di <a href="https://www.ampproject.org/docs/reference/components/amp-user-notification.html">amp-user-notification</a> con l'HTML-id specificato fino a quando "ID client AMP" dell'utente (simile a un cookie) non viene trasmesso all'annuncio. Ciò significa che il rendering dell'annuncio viene rimandato fino alla conferma della notifica da parte dell'utente.</td>
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
    <td>Questo elemento include <a href="https://www.ampproject.org/docs/reference/common_attributes">attributi comuni</a> estesi ai componenti AMP.</td>
  </tr>
</table>

## Segnaposto

Facoltativamente, `amp-ad` può supportare un elemento secondario con l'attributo `placeholder`. Se supportato dalla rete pubblicitaria, questo elemento viene mostrato finché l'annuncio è disponibile per la visualizzazione. Per ulteriori informazioni, consulta l'articolo relativo a [segnaposto e fallback](https://www.ampproject.org/docs/guides/responsive/placeholders).

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## Nessun annuncio disponibile

Se non è disponibile nessun annuncio per lo slot, AMP tenta di comprimere l'elemento `amp-ad` (ovvero, viene impostato su `display: none`). AMP fa in modo che questa operazione venga eseguita senza influire sulla posizione di scorrimento dell'utente. Se l'annuncio si trova nell'area visibile corrente non verrà compresso, in quanto ciò influirebbe sulla posizione di scorrimento dell'utente; tuttavia, se l'annuncio è esterno all'area visibile corrente, verrà compresso.

Nel caso in cui il tentativo di compressione fallisca, il componente `amp-ad` supporta un elemento secondario con l'attributo `fallback`. Se è presente un elemento di riserva, viene mostrato l'elemento di riserva personalizzato. In caso contrario, AMP applica un elemento di riserva predefinito.

Esempio con elemento di riserva:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Pubblicare annunci video

Sono tre i modi per monetizzare video in AMP con gli annunci video:

1. AMP supporta in modo nativo diversi video player, come BrightCove, DailyMotion e altri in grado di monetizzare gli annunci. Per un elenco completo, consulta i componenti [multimediali](https://www.ampproject.org/docs/reference/components#media).

2. Utilizza il componente [amp-ima-video](https://www.ampproject.org/docs/reference/components/amp-ima-video.html) che include un SDK IMA incorporato e un video player HTML5
3. Se il tuo video player non è supportato in AMP, puoi pubblicare il tuo video player personalizzato con [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
Se utilizzi `amp-iframe`:

    * Assicurati che ci sia un poster se il player viene caricato nella prima area visibile. [Ulteriori dettagli](https://www.ampproject.org/docs/reference/components/amp-iframe#iframe-with-placeholder).
    * Video e poster devono essere pubblicati tramite HTTPS.</li>

## Pubblicare annunci da un dominio personalizzato

AMP supporta il caricamento dell'iframe bootstrap utilizzato per caricare gli annunci da un dominio personalizzato, come il tuo.

Per attivarlo, copia il file [remote.html](../../3p/remote.html) sul tuo server web. In seguito, aggiungi il seguente meta tag ai tuoi file AMP:

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  L'attributo `content` del meta tag è l'URL assoluto della tua copia del file html remoto sul server web. L'URL deve utilizzare uno schema "https" e non può trovarsi sulla stessa origine dei file AMP. Ad esempio, se i file AMP sono ospitati su `www.example.com`, l'URL non deve trovarsi su `www.example.com` ma su `something-else.example.com`. Consulta le [norme relative alle origini di iframe](../../spec/amp-iframe-origin-policy.md) per ulteriori dettagli sulle origini consentite per iframe.

### Sicurezza

**Convalida i dati in arrivo** prima di trasmetterli alla funzione `draw3p` in modo da assicurarti che il tuo iframe funzioni come previsto. Questo vale in particolare per le reti pubblicitarie che consentono l'inserimento di codice JavaScript personalizzato.

Gli iframe dovrebbero anche far sì che vengano inseriti come iframe solo nelle origini previste. Tali origini sono:

* Le tue origini
* `https://cdn.ampproject.org` per la cache AMP

Nel caso della cache AMP, devi anche controllare che la "provenienza dell'origine" (l'origine del documento pubblicato da cdn.ampproject.org) sia una delle tue origini.

L'applicazione delle origini può essere effettuata con il terzo argomento di `draw3p` e deve essere eseguita utilizzando la direttiva [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) per garantire il supporto completo del browser.

### Migliorare la configurazione degli annunci in arrivo

Questa operazione è completamente facoltativa. Potresti voler migliorare la richiesta di annuncio prima che questa venga effettuata all'ad server.

Se la rete pubblicitaria supporta il [recupero veloce](https://www.ampproject.org/docs/ads/adnetwork_integration#creating-an-amp-ad-implementation), utilizza la [Configurazione in tempo reale (RTC, Real Time Config)](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md); ad esempio, le integrazioni DoubleClick e AdSense supportano entrambe il recupero veloce e la Configurazione in tempo reale.

Se la rete pubblicitaria utilizza il recupero ritardato, puoi trasmettere un callback alla chiamata funzione `draw3p` all'interno del file [remote.html](../../3p/remote.html). Il callback riceve la configurazione in entrata come primo argomento, quindi riceve un altro callback come secondo argomento (chiamato `done` nell'esempio di seguito). Questo callback deve essere chiamato con la configurazione aggiornata affinché la visualizzazione dell'annuncio possa proseguire.

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

## Stili

Gli elementi `<amp-ad>` non possono possedere o essere inseriti essi stessi in contenitori impostati su CSS `position: fixed`, con l'eccezione di `amp-lightbox`.
Ciò è dovuto alle implicazioni UX degli annunci in overlay a pagina intera. È possibile che in futuro si consentano formati di annunci simili all'interno di contenitori controllati da AMP che mantengano determinati elementi UX non modificati.

## Convalida

Consulta le [regole amp-ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) nella specifica dello strumento di convalida AMP.

## Reti pubblicitarie supportate

* [A8](../../ads/a8.md)
* [A9](../../ads/a9.md)
* [AccessTrade](../../ads/accesstrade.md)
* [Adblade](../../ads/adblade.md)
* [AdButler](../../ads/adbutler.md)
* [Adform](../../ads/adform.md)
* [Adfox](../../ads/adfox.md)
* [Ad Generation](../../ads/adgeneration.md)
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
* [Ad Up Technology](../../ads/aduptech.md)
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
* [CA A.J.A. Infeed](../../ads/caajainfeed.md)
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
* [Dot and Media](../../ads/dotandads.md)
* [DoubleClick](../../ads/google/doubleclick.md)
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
* [Index Exchange](../../ads/ix.md)
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
* [Open AdStream (OAS)](../../ads/openadstream.md)
* [OpenX](../../ads/openx.md)
* [Pixel](../../ads/pixels.md)
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
* [Red for Publishers](../../ads/rfp.md)
* [Relap](../../ads/relap.md)
* [Revcontent](../../ads/revcontent.md)
* [RevJet](../../ads/revjet.md)
* [Rubicon Project](../../ads/rubicon.md)
* [RUNative](../../ads/runative.md)
* [SAS CI 360 Match](../../ads/sas.md)
* [Sekindo](../../ads/sekindo.md)
* [Sharethrough](../../ads/sharethrough.md)
* [Sklik](../../ads/sklik.md)
* [SlimCut Media](../../ads/slimcutmedia.md)
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
* [video intelligence](../../ads/videointelligence.md)
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

## Tipi di incorporamenti supportati

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
