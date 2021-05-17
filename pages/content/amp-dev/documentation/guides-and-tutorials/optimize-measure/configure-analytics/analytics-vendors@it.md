---
'$title': Fornitori di strumenti di analisi
$order: 3
formats:
  - websites
  - stories
  - ads
teaser:
  text: Questo documento elenca i fornitori di strumenti di analisi che dispongono di configurazioni integrate da utilizzare con il componente amp-analytics.
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vendors-list.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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

Questo documento elenca i fornitori di strumenti di analisi che dispongono di configurazioni integrate da utilizzare con il componente [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics/).

Vendors that wish to integrate their service with [`<amp-analytics>`](https://amp.dev/documentation/components/amp-analytics/) should refer to the details in [Integrate your analytics tools with AMP](https://amp.dev/documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools).

### Acquia Lift <a name="acquia-lift"></a>

Valore dell'attributo type: `acquialift`

Fornisce il supporto per Acquia Lift. È necessario specificare i componenti `decisionApiUrl`, `accountId` e `siteId`. Maggiori informazioni su Acquia Lift sono disponibili su [https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics <a name="adobe-analytics"></a>

Valore dell'attributo type: `adobeanalytics`

Fornisce il supporto per Adobe Analytics. Ulteriori dettagli sull'aggiunta di Adobe Analytics sono disponibili su [marketing.adobe.com](https://marketing.adobe.com/resources/help/en_US/sc/implement/accelerated-mobile-pages.html).

### AFS Analytics <a name="afs-analytics"></a>

Valore dell'attributo type:: `afsanalytics`

Fornisce il supporto per AFS Analytics. Inoltre, occorre indicare le variabili `websiteid` e `server`. Ulteriori informazioni sull'aggiunta di AFS Analytics sono disponibili su [afsanalytics.com](https://www.afsanalytics.com/articles/developers/).

### Alexa Internet <a name="alexa-internet"></a>

Valore dell'attributo type:: `alexametrics`

<!-- markdown-link-check-disable -->

Adds support for Alexa Certified Site Metrics. The `atrk_acct` and `domain` variables must be specified. More information can be found at [Alexa’s Certified Metrics FAQ](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics).

<!-- markdown-link-check-enable -->

### Amplitude <a name="amplitude"></a>

Valore dell'attributo type: `amplitude`

### AT Internet <a name="at-internet"></a>

Type attribute value: `atinternet`

Adds support for AT Internet. More details for adding AT Internet support can be found at [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/).

### Baidu Analytics <a name="baidu-analytics"></a>

Type attribute value: `baiduanalytics`

Adds support for Baidu Analytics. More details for adding Baidu Analytics support can be found at [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0).

### BlueConic <a name="blueconic"></a>

Valore dell'attributo type: `blueconic`

### Browsi <a name="browsi"></a>

Valore dell'attributo type: `browsi`

### Burt <a name="burt"></a>

Type attribute value: `burt`

Adds support for Burt. Additionally, the `trackingKey` variable must be specified. It's also possible to specify the optional variables `category` and `subCategory`. More details can be found at [burtcorp.com](http://burtcorp.com).

### BySide <a name="byside"></a>

Valore dell'attributo type: `byside`

### Captain Metrics <a name="captain-metrics"></a>

Valore dell'attributo type: `captainmetrics`

### Chartbeat <a name="chartbeat"></a>

Type attribute value: `chartbeat`

Adds support for Chartbeat. More details for adding Chartbeat support can be found at [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp).

### Clicky Web Analytics <a name="clicky-web-analytics"></a>

Type attribute value: `clicky`

Adds support for Clicky Web Analytics. More details for adding Clicky support can be found at [clicky.com](https://clicky.com/help/apps-plugins).

### comScore <a name="comscore"></a>

Type attribute value: `comscore`

Adds support for comScore Unified Digital Measurement™ pageview analytics. Requires defining _var_ `c2` with comScore-provided _c2 id_. More information can be found at [comscore.com](http://www.comscore.com).

### Cxense <a name="cxense"></a>

Type attribute value: `cxense`

Adds support for Cxense Insight analytics. Requires defining _var_ `siteId` with Cxense-provided _siteId_. More details can be found at [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration).

### Deep.BI <a name="deepbi"></a>

Valore dell'attributo type: `deepbi`

### Dynatrace <a name="dynatrace"></a>

Type attribute value: `dynatrace`

Fornisce supporto per il monitoraggio utenti in tempo reale di Dynatrace. Richiede la definizione di <em>var</em> <code>app</code> con un _ID applicazione_ fornito da Dynatrace e di <var>var</var> <code>tenant</code> con un _identificatore di ambiente_ fornito da Dynatrace. Maggiori dettagli per l'aggiunta del monitoraggio utenti in tempo reale di Dynatrace sono disponibili su [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/).

### EPICA <a name="epica"></a>

Valore dell'attributo type: `epica`

Fornisce supporto per le visualizzazioni di pagina e gli eventi EPICA. Maggiori dettagli si trovano su [EPICA docs](https://www.epica.ai).

### Eulerian Analytics <a name="eulerian-analytics"></a>

Valore dell'attributo type: `euleriananalytics`

Fornisce supporto per Eulerian Technologies Analytics. Richiede la definizione di _var_ `analyticsHost` con dominio delegato da Eulerian. Maggiori informazioni sono disponibili su [eulerian.wiki](https://eulerian.wiki).

### Facebook Pixel <a name="facebook-pixel"></a>

Valore dell'attributo type: `facebookpixel`

Fornisce supporto per [Facebook Pixel](https://www.facebook.com/business/a/facebook-pixel). Nella configurazione di [`amp-analytics`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/./amp-analytics.md), occorre definire il proprio Pixel ID con `pixelId: YOUR-PIXEL-ID`. Gli eventi supportati e i loro corrispodenti valori che possono essere indicati, sono descritti in dettaglio nella [documentazione per gli sviluppatori di Facebook Pixel](https://developers.facebook.com/docs/ads-for-websites/pixel-events).

### Gemius <a name="gemius"></a>

Valore dell'attributo type: `gemius`

Fornisce supporto per gli strumenti di analisi Gemius Audience/Prism. Inoltre, è necessario indicare le variabili `prefix` e `identifier` fornite da gemius. È anche possibile indicare la variabile opzionale `extraparams` (key1=value1|key2 = value2). Maggiori dettagli si possono trovare su [gemius.com](https://www.gemius.com).

### GfK Sensic <a name="gfk-sensic"></a>

Valore dell'attributo type: `gfksensic`

Fornisce supporto per gli strumenti di analisi dei flussi audio di GfK Sensic. Per i dettagli fare riferimento alla nostra [documentazione del cliente](https://confluence-docu.gfk.com/display/SENSIC/AMP+Integration).

### Google Ads <a name="google-ads"></a>

Valore dell'attributo type: `googleadwords`

Fornisce il supporto per il tracciamento dei risultati di conversioni e remarketing di Google Ads. Ulteriori dettagli sono disponibili nel Centro assistenza di Google Ads per [conversion tracking](https://support.google.com/adwords/answer/1722054?hl=en) e [remarketing](https://support.google.com/adwords/answer/2453998?hl=en). Entrambi i tag possono essere utilizzati indipendentemente l'uno dall'altro.

### Google Analytics <a name="google-analytics"></a>

Valore dell'attributo type: `googleanalytics`

Fornisce supporto per Google Analytics. Ulteriori dettagli per l'aggiunta di Google Analytics sono disponibili su [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Google Tag Manager <a name="google-tag-manager"></a>

Valore dell'attributo type: N/A

A differenza di altri fornitori di strumenti di analisi, Google Tag Manager è un servizio di gestione dei tag e non richiede l'attributo `type`. Google Tag Manager è [supportato](https://developers.google.com/google-ads/amp/landing-pages#google_tag_manager) in AMP. Consultare la documentazione di Google Tag Manager per i [tag supportati](https://support.google.com/tagmanager/answer/6106924) e per istruzioni [sull'aggiunta di Google Tag Manager alle pagine AMP](https://support.google.com/tagmanager/answer/6103696).

### Ibeat Analytics <a name="ibeat-analytics"></a>

Valore dell'attributo type:: `ibeatanalytics`

Fornisce supporto per Ibeat Analytics. Maggiori dettagli per l'aggiunta di Ibeat sono disponibili su [Ibeat Integration Support](https://ibeat.indiatimes.com/support.html#h.a5rit14mwie1).

### INFOnline / IVW <a name="infonline--ivw"></a>

Valore dell'attributo type: `infonline`

Fornisce supporto per [INFOnline](https://www.infonline.de) / [IVW](http://www.ivw.de). Richiede una copia di [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) su un sottodominio diverso da quello che include il file AMP ([come mai?](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md)). Il file deve essere fornito tramite HTTPS. Ad esempio, se i tuoi file AMP sono ospitati su `www.example.com`, allora `amp-analytics-infonline.html` deve trovarsi in altri sottodomini quali `iframe.example.com` o `assets.example.com`.

Inoltre, è necessario definire le seguenti variabili:

- `st`: offer ID
- `co`: comment
- `cp`: code
- `url`: sito HTTPS di `amp-analytics-infonline.html`

Maggiori dettagli per l'aggiunta di INFOnline / IVW sono disponibili su [www.infonline.de](https://www.infonline.de/).

### INFOnline anonymous <a name="infonline-anonymous"></a>

Valore dell'attributo type:: `infonline-anonymous`

Fornisce supporto per [anonymous INFOnline](https://www.infonline.de). Richiede una copia di [infonline-anonymous.html](https://www.infonline.de/amp/infonline-anonymous.html) su un sottodominio diverso da quello che include il file AMP ([come mai?](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md)). Il file deve essere fornito tramite HTTPS. Ad esempio, se i tuoi file AMP sono ospitati su `www.example.com`, `infonline-anonymous.html` deve trovarsi in un altro sottodominio, come `iframe.example.com` o `assets.example.com`.

Inoltre, è necessario definire le seguenti variabili:

- `st`: ID offerta
- `co`: commento
- `cp`: codice
- `url`: sito HTTPS di `infonline-anonymous.html`
- `dn`: nome del dominio di inoltro

Maggiori dettagli per l'aggiunta di INFOnline anonymous sono disponibili su [www.infonline.de](https://www.infonline.de/).

### ip-label <a name="ip-label"></a>

Valore dell'attributo type: `iplabel`

### Keen <a name="keen"></a>

Valore dell'attributo type: `keen`

Fornisce supporto per Keen. Inoltre, è necessario definire le seguenti `vars`:

- `projectId`: id del proprio progetto
- `writeKey`: chiave di scrittura

Usa `extraUrlParams` per aggiungere più dati. I dettagli di configurazione sono disponibili su [keen.io/docs/api](https://keen.io/docs/api/).

### Kenshoo <a name="kenshoo"></a>

Valore dell'attributo type: `kenshoo`

Fornisce supporto per Kenshoo. Ulteriori informazioni e dettagli sulla configurazione sono disponibili su [helpcenter.kenshoo.com](https://helpcenter.kenshoo.com/hc/en-us/articles/360025260592).

### Krux <a name="krux"></a>

Valore dell'attributo type: `krux`

<!-- markdown-link-check-disable -->

Fornisce supporto per Krux. I dettagli di configurazione possono essere trovati su [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608).

<!-- markdown-link-check-enable -->

### Linkpulse <a name="linkpulse"></a>

Valore dell'attributo type: `linkpulse`

Fornisce supporto per Linkpulse. I dettagli di configurazione sono disponibili su [docs.linkpulse.com](http://docs.linkpulse.com).

### Lotame <a name="lotame"></a>

Valore dell'attributo type: `lotame`

Adds support for Lotame. More information and configuration details can be found at [my.lotame.com](https://my.lotame.com/t/83h37h9/overview-1st-party-data-collection-in-google-amp).

### Mapp Intelligence <a name="mapp-intelligence"></a>

Valore dell'attributo type: `mapp_intelligence`

Fornisce supporto per le funzioni di tracciamento di Mapp Intelligence. Ulteriori informazioni e dettagli sulla configurazione sono disponibili su [docs.mapp.com](https://docs.mapp.com/pages/viewpage.action?pageId=10027966).

### Marin Software <a name="marin-software"></a>

Valore dell'attributo type: `marinsoftware`

### Médiamétrie <a name="m%C3%A9diam%C3%A9trie"></a>

Valore dell'attributo type: `mediametrie`

Fornisce supporto per gli strumenti di tracciamento pagine di Médiamétrie. Richiede la definizione di _var_ `serial`. Le variabili da `level1` a `level4` sono opzionali. Maggiori informazioni possono essere trovate su [mediametrie.com](http://www.mediametrie.com/).

### mediarithmics <a name="mediarithmics"></a>

Valore dell'attributo type: `mediarithmics`

Fornisce supporto per mediarithmics. Ulteriori informazioni e dettagli sulla configurazione sono disponibili su `https://developer.mediarithmics.com`.

### Memo <a name="memo"></a>

Valore dell'attributo type: `memo`

### Metrika <a name="metrika"></a>

Valore dell'attributo type: `metrika`

### Moat Analytics <a name="moat-analytics"></a>

Valore dell'attributo type: `moat`

Fornisce supporto per Moat. Si prega di contattare il proprio rappresentante Moat per i dettagli di configurazione. Ulteriori informazioni su Moat sono disponibili su [moat.com/analytics](https://moat.com/analytics).

### Mobify <a name="mobify"></a>

Valore dell'attributo type:: `mobify`

Fornisce supporto per Mobify. Maggiori dettagli per l'aggiunta di Mobify sono disponibili su [docs.mobify.com](https://docs.mobify.com/amp-sdk/latest/guides/amp-analytics/).

### MoEngage <a name="moengage"></a>

Valore dell'attributo type: `moengage`

### mParticle <a name="mparticle"></a>

Valore dell'attributo type: `mparticle`

Fornisce supporto per mParticle. Maggiori dettagli per l'aggiunta di mParticle sono disponibili su [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp).

### Navegg <a name="navegg"></a>

Valore dell'attributo type: `navegg`

### New Relic <a name="new-relic"></a>

Valore dell'attributo type: `newrelic`

Fornisce supporto per New Relic Browser, strumento che permette di misurare la velocità effettiva e le prestazioni AMP. Aggiungendo il valore dell'attributo `newrelic`, sarà necessario aggiungere l'`app ID` e la `license key` del proprio account New Relic Browser per iniziare l'acquisizione dei dati. Maggiori dettagli sono disponibili nella pagina dei documenti AMP di New Relic Browser all'indirizzo [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser).

### Nielsen <a name="nielsen"></a>

Valore dell'attributo type: `nielsen`

Fornisce supporto per Nielsen DCR. Contattare il proprio rappresentante Nielsen per configurare il prorio `apid` e la definizione dei parametri rimanenti nella sezione `vars`. Per ulteriori informazioni, consultare [la documentazione di supporto di Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

### Nielsen Marketing Cloud <a name="nielsen-marketing-cloud"></a>

Valore dell'attributo type: `nielsen-marketing-cloud`

Fornisc supporto per Nielsen Marketing Cloud. Maggiori dettagli sono disponibili su [Nielsen Marketing Cloud](http://www.nielsen.com/us/en/solutions/capabilities/nielsen-marketing-cloud.html).

### OEWA <a name="oewa"></a>

Valore dell'attributo type: `oewa`

Fornisce supporto per `[OEWA](https://www.oewa.at)`. Richiede una copia di [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) su un sottodominio diverso da quello che include il file AMP ([come mai?](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md)). Il file deve essere fornito tramite HTTPS. Ad esempio, se i tuoi file AMP sono ospitati su `www.example.com`, `amp-analytics-oewa.html` deve trovarsi in un altro sottodominio, come `oewa-amp.example.com` . Ulteriori dettagli per l'aggiunta di OEWA sono disponibili [qui](http://www.oewa.at/Implementierung).

Inoltre, è necessario definire le seguenti variabili:

Nella sezione `vars`:

- `s`: offerta
- `cp`: percorso categoria

Nella sezione `requests`:

- `url`: sito HTTPS di `amp-analytics-oewa.html`

[tip type="note"] **NOTA:** Esiste una variante denominata `oewadirect` che non utilizza la soluzione iframe-ping e ha un migliore rilevamento del client utilizzando `AMP CLIENT_ID` . Questo strumento è attualmente in fase SPERIMENTALE e il suo uso non è ammesso dall'OEWA perché non utilizza `oewa2.js`. [/tip]

### Oracle Infinity Analytics <a name="oracle-infinity-analytics"></a>

Valore dell'attributo type: `oracleInfinityAnalytics`

### Parsely <a name="parsely"></a>

Type attribute value: `parsely`

Adds support for Parsely. Configuration details can be found at [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html).

### Permutive <a name="permutive"></a>

Valore dell'attributo type: `permutive`

Fornisce supporto per la raccolta di eventi tramite Permutive. Inoltre, è necessario definire le seguenti `vars`:

- `namespace`: lo spazio dei nomi AMP di Permutive
- `key`: la chiave API pubblica di Permutive

Usare `extraUrlParams` per aggiungere ulteriori proprietà dell'evento. I dettagli completi della configurazione possono essere trovati su [support.permutive.com](http://support.permutive.com).

### Pistats <a name="pistats"></a>

Valore dell'attributo type: `piStats`

### Piano <a name="piano"></a>

Type attribute value: `piano`

Adds support for Piano. Configuration details can be found at `http://vx.piano.io/javascript-tracking-amp`

### Pinpoll <a name="pinpoll"></a>

Valore dell'attributo type: `pinpoll`

Fornisce supporto per Pinpoll. I dettagli di configurazione sono disponibili su [pinpoll.com](https://pinpoll.com/).

### Pressboard <a name="pressboard"></a>

Valore dell'attributo type: `pressboard`

Fornisce supporto per Pressboard. I dettagli di configurazione possono essere trovati su [help.pressboard.ca](http://help.pressboard.ca/publisher-resources/getting-started/implementing-google-amp).

### Quantcast Measurement <a name="quantcast-measurement"></a>

Type attribute value: `quantcast`

<!-- markdown-link-check-disable -->

Adds support for Quantcast Measurement. More details for adding Quantcast Measurement can be found at [quantcast.com](https://www.quantcast.com/help/guides/)

<!-- markdown-link-check-enable -->

### Rakam <a name="rakam"></a>

Valore dell'attributo type: `rakam`

### reppublika <a name="reppublika"></a>

Valore dell'attributo type: `reppublika`

### Retargetly <a name="retargetly"></a>

Valore dell'attributo type: `retargetly`

### RudderStack <a name="rudderstack"></a>

Valore dell'attributo type: `rudderstack`

Adds support for RudderStack page views and events. Find out more on the implementation check our documentation at `https://docs.rudderstack.com/sdk-integration-guide/getting-started-with-javascript-sdk/amp-analytics`.

### Segment <a name="segment"></a>

Type attribute value: `segment`

Adds support for segment page views and events. To see the full list of fields that you can send, see [Segment Spec](https://segment.com/docs/spec/).

### ShinyStat <a name="shinystat"></a>

Valore dell'attributo type: `shinystat`

### SOASTA mPulse <a name="soasta-mpulse"></a>

Type attribute value: `mpulse`

Adds support for [SOASTA mPulse](https://www.soasta.com/mPulse). Configuration details can be found at [docs.soasta.com](http://docs.soasta.com/).

### SimpleReach <a name="simplereach"></a>

Type attribute value: `simplereach`

Adds support for SimpleReach. Configuration details can be found at `http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation`.

### Snowplow Analytics <a name="snowplow-analytics"></a>

Type attribute value: `snowplow`, `snowplow_v2`

Adds support for Snowplow Analytics. More details for adding Snowplow Analytics support can be found at [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker).

### Tail <a name="tail"></a>

Type attribute value: `tail`

Adds support for Tail. More details for adding Tail support can be found at [tail.digital](https://tail.digital).

### Rambler/TOP-100 <a name="ramblertop-100"></a>

Type attribute value: `top100`

Adds support for Rambler/TOP-100. Configuration details can be found at [top100.rambler.ru](https://top100.rambler.ru).

### TEA Analytics <a name="tea-analytics"></a>

Valore dell'attributo type: `teaanalytics`

Fornisce supporto per TEA Analytics. Per maggiori dettagli sull'aggiunta di TEA Analytics, contattare Kimberly (wuqian56@gmail.com).

### Tealium Collect <a name="tealium-collect"></a>

Valore dell'attributo type: `tealiumcollect`

Fornisce supporto per Tealium Collect. Maggiori dettagli per l'aggiunta di Tealium Collect sono disponibili su [docs.tealium.com](https://docs.tealium.com/platforms/amp/install/).

### Top.Mail.Ru <a name="topmailru"></a>

Type attribute value: `topmailru`

Adds support for Top.Mail.Ru. Configuration details can be found at [Top.Mail.Ru Help](https://help.mail.ru/top/amp-analytics).

### Treasure Data <a name="treasure-data"></a>

Type attribute value: `treasuredata`

Adds support for Treasure Data. Configuration details can be found at `https://docs.treasuredata.com/articles/javascript-sdk-google-amp`.

### Umeng+ Analytics <a name="umeng-analytics"></a>

Type attribute value: `umenganalytics`

Adds support for Umeng+ Analytics. More details for adding Umeng+ Analytics support can be found at [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5).

### Upscore <a name="upscore"></a>

Valore dell'attributo type: `upscore`

### Vpon Analytics <a name="vpon-analytics"></a>

Valore dell'attributo type: `vponanalytics`

Fornisce supporto per Vpon Vpon Analytics. I dettagli di configurazione sono disponibili su [Vpon Analytics](https://cmp.vpadn.com/dmp/doc/amp_analytics.html).

### Webengage <a name="webengage"></a>

Attributo type `webengage`

### Webtrekk <a name="webtrekk"></a>

The attribute value ~~`webtrekk`~~ is deprecated (will remove on 31/12/2018) - use `webtrekk_v2` instead

Adds support for Webtrekk. Configuration details can be found at [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html).

### Yandex Metrica <a name="yandex-metrica"></a>

Type attribute value: `metrika`

Adds support for Yandex Metrica. Configuration details can be found at [Yandex Support](https://yandex.com/support/metrica/code/install-counter-amp.xml).
