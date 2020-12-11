---
"$title": Analytics Anbieter
order: '3'
formats:
- websites
- stories
- ads
teaser:
  text: Dieses Dokument listet Analytics Anbieter auf, die integrierte Konfigurationen für die Komponente amp-analytics bereitstellen.
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vendors-list.md.
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

This document lists analytics vendors that have built-in configurations for use with the [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics/) component.

Vendors that wish to integrate their service with [`<amp-analytics>`](https://amp.dev/documentation/components/amp-analytics/) should refer to the details in [Integrate your analytics tools with AMP](https://amp.dev/documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools).

### Acquia Lift <a name="acquia-lift"></a>

Wert des Attributs "type": `acquialift`

Fügt Unterstützung für Acquia Lift hinzu. Die Angabe von `decisionApiUrl`, `accountId` und `siteId` ist erforderlich. Weitere Informationen zu Acquia Lift findest du unter [https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics <a name="adobe-analytics"></a>

Wert des Attributs "type": `adobeanalytics`

Fügt Unterstützung für Adobe Analytics hinzu. Weitere Informationen dazu, wie du Unterstützung für Adobe Analytics hinzufügst, findest du unter [marketing.adobe.com](https://marketing.adobe.com/resources/help/en_US/sc/implement/accelerated-mobile-pages.html).

### AFS Analytics <a name="afs-analytics"></a>

Wert des Attributs "type": `afsanalytics`

Fügt Unterstützung für AFS Analytics hinzu. Zusätzlich müssen die Variablen `websiteid` und `server` angegeben werden. Weitere Informationen dazu, wie du Unterstützung für AFS Analytics hinzufügst, findest du unter [afsanalytics.com](https://www.afsanalytics.com/articles/developers/).

### Alexa Internet <a name="alexa-internet"></a>

Wert des Attributs "type": `alexametrics`

Adds support for Alexa Certified Site Metrics. The `atrk_acct` and `domain` variables must be specified. More information can be found at [Alexa’s Certified Metrics FAQ](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics).

### Amplitude <a name="amplitude"></a>

Wert des Attributs "type": `amplitude`

### AT Internet <a name="at-internet"></a>

Type attribute value: `atinternet`

Adds support for AT Internet. More details for adding AT Internet support can be found at [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/).

### Baidu Analytics <a name="baidu-analytics"></a>

Type attribute value: `baiduanalytics`

Adds support for Baidu Analytics. More details for adding Baidu Analytics support can be found at [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0).

### BlueConic <a name="blueconic"></a>

Wert des Attributs "type": `blueconic`

### Browsi <a name="browsi"></a>

Wert des Attributs "type": `browsi`

### Burt <a name="burt"></a>

Type attribute value: `burt`

Adds support for Burt. Additionally, the `trackingKey` variable must be specified. It's also possible to specify the optional variables `category` and `subCategory`. More details can be found at [burtcorp.com](http://burtcorp.com).

### BySide <a name="byside"></a>

Wert des Attributs "type": `byside`

### Captain Metrics <a name="captain-metrics"></a>

Wert des Attributs "type": `captainmetrics`

### Chartbeat <a name="chartbeat"></a>

Type attribute value: `chartbeat`

Adds support for Chartbeat. More details for adding Chartbeat support can be found at [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp).

### Clicky Web Analytics <a name="clicky-web-analytics"></a>

Type attribute value: `clicky`

Adds support for Clicky Web Analytics. More details for adding Clicky support can be found at [clicky.com](https://clicky.com/help/apps-plugins).

### comScore <a name="comscore"></a>

Type attribute value: `comscore`

Adds support for comScore Unified Digital Measurement™ pageview analytics. Requires defining *var* `c2` with comScore-provided *c2 id*. More information can be found at [comscore.com](http://www.comscore.com).

### Cxense <a name="cxense"></a>

Type attribute value: `cxense`

Adds support for Cxense Insight analytics. Requires defining *var* `siteId` with Cxense-provided *siteId*. More details can be found at [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration).

### Deep.BI <a name="deepbi"></a>

Wert des Attributs "type": `deepbi`

### Dynatrace <a name="dynatrace"></a>

Type attribute value: `dynatrace`

Adds support for Dynatrace real user monitoring. Requires defining *var* `app` with a Dynatrace provided *application id* and *var* `tenant` with a Dynatrace provided *environment identifier*. More details for adding Dynatrace real user monitoring can be found at [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/).

### EPICA <a name="epica"></a>

Wert des Attributs "type": `epica`

Fügt Unterstützung für EPICA Seitenaufrufe und Events hinzu. Weitere Informationen dazu findest du in der [Dokumentation zu EPICA](https://www.epica.ai).

### Eulerian Analytics <a name="eulerian-analytics"></a>

Wert des Attributs "type": `euleriananalytics`

Fügt Unterstützung für Eulerian Technologies Analytics hinzu. Erfordert die Definition von *var* `analyticsHost` mit der von Eulerian delegierten Domäne. Weitere Informationen dazu findest du unter [eulerian.wiki](https://eulerian.wiki).

### Facebook Pixel <a name="facebook-pixel"></a>

Wert des Attributs "type": `facebookpixel`

Fügt Unterstützung für [Facebook Pixel](https://www.facebook.com/business/a/facebook-pixel) hinzu. In deiner Konfiguration für [`amp-analytics`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./amp-analytics.md) muss die Pixel ID als `pixelId: YOUR-PIXEL-ID` definiert sein. Die unterstützten Events sowie die entsprechenden Event Werte, die angegeben werden können, findest du in der [Entwicklerdokumentation zu Facebook Pixel](https://developers.facebook.com/docs/ads-for-websites/pixel-events).

### Gemius <a name="gemius"></a>

Wert des Attributs "type": `gemius`

Fügt Unterstützung für Gemius Audience/Prism Analytics hinzu. Zusätzlich müssen die von Gemius bereitgestellte Variablen `prefix` und `identifier` angegeben werden. Darüber hinaus können die optionalen Variablen `extraparams` (key1=value1|key2=value2) angegeben werden. Weitere Informationen dazu findest du unter [gemius.com](https://www.gemius.com).

### GfK Sensic <a name="gfk-sensic"></a>

Wert des Attributs "type": `gfksensic`

Fügt Unterstützung für die Analyse von Audiostreams von GfK Sensic hinzu. Weitere Informationen dazu findest du in unserer [Client Dokumentation](https://confluence-docu.gfk.com/display/SENSIC/AMP+Integration).

### Google Ads <a name="google-ads"></a>

Wert des Attributs "type": `googleadwords`

Fügt Unterstützung für Conversion Tracking und Remarketing von Google Ads hinzu. Weitere Informationen zu [Conversion-Tracking](https://support.google.com/adwords/answer/1722054?hl=en) und [Remarketing](https://support.google.com/adwords/answer/2453998?hl=en) findest du in der Google Ads Hilfe. Beide Tags können unabhängig voneinander verwendet werden.

### Google Analytics <a name="google-analytics"></a>

Wert des Attributs "type": `googleanalytics`

Fügt Unterstützung für Google Analytics hinzu. Weitere Informationen dazu, wie du Unterstützung für Google Analytics hinzufügst, findest du unter [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Google Tag Manager <a name="google-tag-manager"></a>

Wert des Attributs "type": N/A

Im Gegensatz zu anderen Analytics Anbietern ist Google Tag Manager ein Dienst zur Verwaltung von Tags und erfordert nicht das Attribut `type`. Google Tag Manager wird in AMP [unterstützt](https://developers.google.com/google-ads/amp/landing-pages#google_tag_manager). In der Dokumentation zu Google Tag Manager findest du die [unterstützten Tags](https://support.google.com/tagmanager/answer/6106924) und Anweisungen zum [Hinzufügen von Google Tag Manager zu deiner AMP Seite](https://support.google.com/tagmanager/answer/6103696).

### Ibeat Analytics <a name="ibeat-analytics"></a>

Wert des Attributs "type": `ibeatanalytics`

Fügt Unterstützung für Ibeat Analytics hinzu. Weitere Informationen dazu, wie du Unterstützung für Ibeat Analytics hinzufügst, findest du unter [Unterstützung für Ibeat Integration](https://ibeat.indiatimes.com/support.html#h.a5rit14mwie1).

### INFOnline / IVW <a name="infonline--ivw"></a>

Wert des Attributs "type": `infonline`

Fügt Unterstützung für [INFOnline](https://www.infonline.de) / [IVW](http://www.ivw.de) hinzu. Erfordert eine Kopie von [amp-analyse-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) in einer anderen Subdomäne als die AMP Datei mit der Einbindung ([warum?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). Die Datei muss über HTTPS bereitgestellt werden. Wenn deine AMP Dateien beispielsweise auf `www.example.com` gehostet werden, muss sich `amp-analytics-infonline.html` in einer anderen Subdomäne wie z. B. `iframe.example.com` oder `assets.example.com` befinden.

Zusätzlich dazu müssen folgende Variablen definiert werden:

- `st`: offer ID
- `co`: comment
- `cp`: code
- `url`: HTTPS location of `amp-analytics-infonline.html`

Weitere Informationen zum Hinzufügen der Unterstützung für INFOnline / IVW findest du unter [www.infonline.de](https://www.infonline.de/).

### INFOnline anonymous <a name="infonline-anonymous"></a>

Wert des Attributs "type": `infonline-anonymous`

Fügt Unterstützung für [INFOnline anonymous](https://www.infonline.de) hinzu. Erfordert eine Kopie von [infonline-anonym.html](https://www.infonline.de/amp/infonline-anonymous.html) in einer anderen Subdomäne als die AMP Datei mit der Einbindung ([warum?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). Die Datei muss über HTTPS bereitgestellt werden. Wenn deine AMP Dateien beispielsweise auf `www.example.com` gehostet werden, muss sich `infonline-anonymous.html` in einer anderen Subdomäne wie z. B. `iframe.example.com` oder `assets.example.com` befinden.

Zusätzlich dazu müssen folgende Variablen definiert werden:

- `st`: ID des Angebots
- `co`: Kommentar
- `cp`: Code
- `url`: HTTPS URL von `infonline-anonymous.html`
- `dn`: Name der Relaydomäne

Weitere Informationen dazu, wie du Unterstützung für INFOnline anonymous hinzufügst, findest du unter [www.infonline.de](https://www.infonline.de/).

### ip-label <a name="ip-label"></a>

Wert des Attributs "type": `iplabel`

### Keen <a name="keen"></a>

Wert des Attributs "type": `keen`

Fügt Unterstützung für Keen hinzu. Zusätzlich dazu muss `vars` mit den folgenden Werten definiert werden:

- `projectId`: deine Projekt ID
- `writeKey`: dein Write Key

Verwende `extraUrlParams`, um weitere Daten hinzuzufügen. Einzelheiten zur Konfiguration findest du unter [keen.io/docs/api](https://keen.io/docs/api/).

### Kenshoo <a name="kenshoo"></a>

Wert des Attributs "type": `kenshoo`

Fügt Unterstützung für Kenshoo hinzu. Weitere Informationen und Einzelheiten zur Konfiguration findest du unter [helpcenter.kenshoo.com](https://helpcenter.kenshoo.com/hc/en-us/articles/360025260592).

### Krux <a name="krux"></a>

Wert des Attributs "type": `krux`

Fügt Unterstützung für Krux hinzu. Einzelheiten zur Konfiguration findest du unter [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608).

### Linkpulse <a name="linkpulse"></a>

Wert des Attributs "type": `linkpulse`

Fügt Unterstützung für Linkpulse hinzu. Einzelheiten zur Konfiguration findest du unter [docs.linkpulse.com](http://docs.linkpulse.com).

### Lotame <a name="lotame"></a>

Wert des Attributs "type": `lotame`

Fügt Unterstützung für Lotame hinzu. Weitere Informationen und Einzelheiten zur Konfiguration findest du unter [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP).

### Mapp Intelligence <a name="mapp-intelligence"></a>

Wert des Attributs "type": `mapp_intelligence`

Fügt Unterstützung für Tracking mit Mapp Intelligence hinzu. Weitere Informationen und Einzelheiten zur Konfiguration findest du unter [docs.mapp.com](https://docs.mapp.com/pages/viewpage.action?pageId=10027966).

### Marin Software <a name="marin-software"></a>

Wert des Attributs "type": `marinsoftware`

### Médiamétrie <a name="m%C3%A9diam%C3%A9trie"></a>

Wert des Attributs "type": `mediametrie`

Fügt Unterstützung für das Tracking von Seiten mit Médiamétrie hinzu. Erfordert die Definition von *var* `serial`. Die Variablen `level1` bis `level4` sind optional. Weitere Informationen dazu findest du unter [mediametrie.com](http://www.mediametrie.com/).

### mediarithmics <a name="mediarithmics"></a>

Wert des Attributs "type": `mediarithmics`

Fügt Unterstützung für mediarithmics hinzu. Weitere Informationen und Einzelheiten zur Konfiguration findest du unter `https://developer.mediarithmics.com`.

### Memo <a name="memo"></a>

Wert des Attributs "type": `memo`

### Metrika <a name="metrika"></a>

Wert des Attributs "type": `metrika`

### Moat Analytics <a name="moat-analytics"></a>

Wert des Attributs "type": `moat`

Fügt Unterstützung für Moat hinzu. Bitte wende dich an deinen Ansprechpartner bei Moat, um Einzelheiten zur Konfiguration zu erfahren. Weitere Informationen zu Moat findest du unter [moat.com/analytics](https://moat.com/analytics).

### Mobify <a name="mobify"></a>

Wert des Attributs "type": `mobify`

Fügt Unterstützung für Mobify hinzu. Weitere Informationen dazu, wie du  Unterstützung für Mobify hinzufügst, findest du unter [docs.mobify.com](https://docs.mobify.com/amp-sdk/latest/guides/amp-analytics/).

### MoEngage <a name="moengage"></a>

Wert des Attributs "type": `moengage`

### mParticle <a name="mparticle"></a>

Wert des Attributs "type": `mparticle`

Fügt Unterstützung für mParticle hinzu. Weitere Informationen dazu, wie du Unterstützung für mParticle hinzufügst, findest du unter [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp).

### Navegg <a name="navegg"></a>

Wert des Attributs "type": `navegg`

### New Relic <a name="new-relic"></a>

Wert des Attributs "type": `newrelic`

Fügt Unterstützung für New Relic Browser zur Messung des AMP Durchsatzes und der Leistung hinzu. Wenn du den Attributwert `newrelic` hinzufügst, musst du die Werte `app ID` und `license key` aus deinem New Relic Browser Account hinzufügen, um mit der Datenerfassung zu beginnen. Weitere Informationen dazu findest du bei New Relic Browser auf der Seite mit der AMP Dokumentation unter [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser).

### Nielsen <a name="nielsen"></a>

Wert des Attributs "type": `nielsen`

Fügt Unterstützung für Nielsen DCR hinzu. Bitte wende dich an deinen Ansprechpartner bei Nielsen, um die Einrichtung mit deiner `apid` vorzunehmen und Hilfe bei der Definition der übrigen Parameter im Abschnitt `vars` zu erhalten. Weitere Informationen dazu findest du in der [Begleitdokumentation von Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

### Nielsen Marketing Cloud <a name="nielsen-marketing-cloud"></a>

Wert des Attributs "type": `nielsen-marketing-cloud`

Fügt Unterstützung für Nielsen Marketing Cloud hinzu. Weitere Informationen dazu findest du unter [Nielsen Marketing Cloud](http://www.nielsen.com/us/en/solutions/capabilities/nielsen-marketing-cloud.html).

### OEWA <a name="oewa"></a>

Wert des Attributs "type": `oewa`

Fügt Unterstützung für `[OEWA](https://www.oewa.at)` hinzu. Erfordert eine Kopie von [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) in einer anderen Subdomäne als die AMP Datei mit der Einbindung ([warum?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). Die Datei muss über HTTPS bereitgestellt werden. Wenn deine AMP Dateien beispielsweise auf `www.example.com` gehostet werden, muss sich `amp-analytics-oewa.html` in einer anderen Subdomäne wie z. B. `oewa-amp.example.com` befinden. Weitere Informationen dazu, wie du Unterstützung für OEWA hinzufügst, findest du [hier](http://www.oewa.at/Implementierung).

Zusätzlich dazu müssen folgende Variablen definiert werden:

In the `vars` section:

- `s`: Angebot
- `cp`: Pfad der Kategorie

Im Abschnitt `requests`:

- `url`: HTTPS URL von `amp-analytics-oewa.html`

[tip type="note"] **NOTE –** There is a variation named `oewadirect` that does not use the iframe-ping solution and has a better client detection by using `AMP CLIENT_ID`. This is currently EXPERIMENTAL, and prohibited by the OEWA because it does not use `oewa2.js`. [/tip]

### Oracle Infinity Analytics <a name="oracle-infinity-analytics"></a>

Wert des Attributs "type": `oracleInfinityAnalytics`

### Parsely <a name="parsely"></a>

Type attribute value: `parsely`

Adds support for Parsely. Configuration details can be found at [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html).

### Permutive <a name="permutive"></a>

Wert des Attributs "type": `permutive`

Fügt Unterstützung für Permutive hinzu. Zusätzlich dazu muss `vars` mit den folgenden Werten definiert werden:

- `namespace`: dein Permutive AMP Namespace
- `key`: dein öffentlicher Permutive API Schlüssel

Verwende `extraUrlParams`, um zusätzliche Event Eigenschaften hinzuzufügen. Ausführliche Informationen zur Konfiguration findest du unter [support.permutive.com](http://support.permutive.com).

### Pistats <a name="pistats"></a>

Wert des Attributs "type": `piStats`

### Piano <a name="piano"></a>

Type attribute value: `piano`

Adds support for Piano. Configuration details can be found at [vx.piano.io](http://vx.piano.io/javascript-tracking-amp).

### Pinpoll <a name="pinpoll"></a>

Wert des Attributs "type": `pinpoll`

Fügt Unterstützung für Pinpoll hinzu. Einzelheiten zur Konfiguration findest du unter [pinpoll.com](https://pinpoll.com/).

### Pressboard <a name="pressboard"></a>

Wert des Attributs "type": `pressboard`

Fügt Unterstützung für Pressboard hinzu. Einzelheiten zur Konfiguration findest du unter [help.pressboard.ca](http://help.pressboard.ca/publisher-resources/getting-started/implementing-google-amp).

### Quantcast Measurement <a name="quantcast-measurement"></a>

Type attribute value: `quantcast`

Adds support for Quantcast Measurement. More details for adding Quantcast Measurement can be found at [quantcast.com](https://www.quantcast.com/help/guides/)

### Rakam <a name="rakam"></a>

Wert des Attributs "type": `rakam`

### reppublika <a name="reppublika"></a>

Wert des Attributs "type": `reppublika`

### Retargetly <a name="retargetly"></a>

Wert des Attributs "type": `retargetly`

### RudderStack <a name="rudderstack"></a>

Wert des Attributs "type": `rudderstack`

Fügt Unterstützung für Seitenaufrufe und Events in RudderStack hinzu. Weitere Informationen zur Implementierung findest du in unserer [Dokumentation](https://docs.rudderstack.com/sdk-integration-guide/getting-started-with-javascript-sdk/amp-analytics).

### Segment <a name="segment"></a>

Type attribute value: `segment`

Adds support for segment page views and events. To see the full list of fields that you can send, see [Segment Spec](https://segment.com/docs/spec/).

### ShinyStat <a name="shinystat"></a>

Wert des Attributs "type": `shinystat`

### SOASTA mPulse <a name="soasta-mpulse"></a>

Type attribute value: `mpulse`

Adds support for [SOASTA mPulse](https://www.soasta.com/mPulse). Configuration details can be found at [docs.soasta.com](http://docs.soasta.com/).

### SimpleReach <a name="simplereach"></a>

Type attribute value: `simplereach`

Adds support for SimpleReach. Configuration details can be found at `http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation`.

### Snowplow Analytics <a name="snowplow-analytics"></a>

Type attribute value: `snowplow`, `snowplow_v2`

Adds support for Snowplow Analytics. More details for adding Snowplow Analytics support can be found at [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker).

### Rambler/TOP-100 <a name="ramblertop-100"></a>

Type attribute value: `top100`

Adds support for Rambler/TOP-100. Configuration details can be found at [top100.rambler.ru](https://top100.rambler.ru).

### TEA Analytics <a name="tea-analytics"></a>

Wert des Attributs "type": `teaanalytics`

Fügt Unterstützung für TEA Analytics hinzu. Weitere Informationen dazu, wie du Unterstützung für TEA Analytics hinzufügst, erhältst du direkt von Kimberly (wuqian56@gmail.com).

### Tealium Collect <a name="tealium-collect"></a>

Wert des Attributs "type": `tealiumcollect`

Fügt Unterstützung für Tealium Collect hinzu. Weitere Informationen dazu, wie du Unterstützung für Tealium Collect hinzufügst, findest du unter [docs.tealium.com](https://docs.tealium.com/platforms/amp/install/).

### Top.Mail.Ru <a name="topmailru"></a>

Type attribute value: `topmailru`

Adds support for Top.Mail.Ru. Configuration details can be found at [Top.Mail.Ru Help](https://help.mail.ru/top/amp-analytics).

### Treasure Data <a name="treasure-data"></a>

Type attribute value: `treasuredata`

Adds support for Treasure Data. Configuration details can be found at [treasuredata.com](https://docs.treasuredata.com/articles/javascript-sdk-google-amp).

### Umeng+ Analytics <a name="umeng-analytics"></a>

Type attribute value: `umenganalytics`

Adds support for Umeng+ Analytics. More details for adding Umeng+ Analytics support can be found at [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5).

### Upscore <a name="upscore"></a><a name="upscore"></a>

Wert des Attributs "type": `upscore`

### Vpon Analytics <a name="vpon-analytics"></a>

Wert des Attributs "type": `vponanalytics`

Fügt Unterstützung für Vpon Vpon Analytics hinzu. Einzelheiten zur Konfiguration findest du unter [Vpon Analytics](https://cmp.vpadn.com/dmp/doc/amp_analytics.html).

### Webengage <a name="webengage"></a>

Wert des Attributs "type": `webengage`

### Webtrekk <a name="webtrekk"></a>

The attribute value ~~`webtrekk`~~ is deprecated (will remove on 31/12/2018) - use `webtrekk_v2` instead

Adds support for Webtrekk. Configuration details can be found at [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html).

### Yandex Metrica <a name="yandex-metrica"></a>

Type attribute value: `metrika`

Adds support for Yandex Metrica. Configuration details can be found at [Yandex Support](https://yandex.com/support/metrica/code/install-counter-amp.xml).
