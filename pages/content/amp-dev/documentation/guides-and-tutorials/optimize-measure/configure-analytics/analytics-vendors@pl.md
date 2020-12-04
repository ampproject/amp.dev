---
"$title": Dostawcy usług analityki
order: '3'
formats:
- websites
- stories
- ads
teaser:
  text: Ten dokument zawiera listę dostawców usług analityki, mających wbudowane konfiguracje do użytku ze składnikiem amp-analytics.
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

Ten dokument zawiera listę dostawców usług analityki, mających wbudowane konfiguracje do użytku ze składnikiem [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics/).

Dostawcy, którzy chcą integrować swoją usługę z elementem [`<amp-analytics>`](https://amp.dev/documentation/components/amp-analytics/) powinni zapoznać się ze szczegółami w artykule [Integracja narzędzi analitycznych z AMP](https://amp.dev/documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools).

### Acquia Lift <a name="acquia-lift"></a>

Wartość atrybutu type: `acquialift`

Dodaje obsługę Acquia Lift. Należy określić właściwości `decisionApiUrl`, `accountId` i `siteId`. Więcej informacji o Acquia Lift można znaleźć na stronie [https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics <a name="adobe-analytics"></a>

Wartość atrybutu type: `adobeanalytics`

Dodaje obsługę Adobe Analytics. Więcej szczegółów dotyczących dodawania obsługi Adobe Analytics można znaleźć na stronie [marketing.adobe.com](https://marketing.adobe.com/resources/help/en_US/sc/implement/accelerated-mobile-pages.html).

### AFS Analytics <a name="afs-analytics"></a>

Wartość atrybutu type: `afsanalytics`

Dodaje obsługę AFS Analytics. Dodatkowo należy określić zmienne `websiteid` i `server`. Więcej szczegółów dotyczących dodawania obsługi AFS Analytics można znaleźć na stronie [afsanalytics.com](https://www.afsanalytics.com/articles/developers/).

### Alexa Internet <a name="alexa-internet"></a>

Wartość atrybutu type: `alexametrics`

Dodaje obsługę Alexa Certified Site Metrics. Należy określić zmienne `atrk_acct` oraz `domain`. Więcej informacji można znaleźć na stronie [Alexa's Certified Metrics FAQ](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics).

### Amplitude <a name="amplitude"></a>

Wartość atrybutu type: `amplitude`

### AT Internet <a name="at-internet"></a>

Wartość atrybutu type: `atinternet`

Dodaje obsługę AT Internet. Więcej szczegółów dotyczących dodawania obsługi AT Internet można znaleźć na stronie [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/).

### Baidu Analytics <a name="baidu-analytics"></a>

Wartość atrybutu type: `baiduanalytics`

Dodaje obsługę dla Baidu Analytics. Więcej szczegółów dotyczących dodawania obsługi Baidu Analytics można znaleźć na stronie [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0).

### BlueConic <a name="blueconic"></a>

Wartość atrybutu type: `blueconic`

### Browsi <a name="browsi"></a>

Wartość atrybutu type: `browsi`

### Burt <a name="burt"></a>

Wartość atrybutu type: `burt`

Dodaje obsługę Burt. Dodatkowo należy określić zmienną `trackingKey`. Możliwe jest także określenie zmiennych opcjonalnych `category` i `subCategory`. Więcej szczegółów można znaleźć na stronie [burtcorp.com](http://burtcorp.com).

### BySide <a name="byside"></a>

Wartość atrybutu type: `byside`

### Captain Metrics <a name="captain-metrics"></a>

Wartość atrybutu type: `captainmetrics`

### Chartbeat <a name="chartbeat"></a>

Wartość atrybutu type: `chartbeat`

Dodaje obsługę Chartbeat. Więcej szczegółów dotyczących dodawania obsługi Chartbeat można znaleźć na stronie [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp).

### Clicky Web Analytics <a name="clicky-web-analytics"></a>

Wartość atrybutu type: `clicky`

Dodaje obsługę Clicky Web Analytics. Więcej szczegółów dotyczących dodawania obsługi Clicky można znaleźć na stronie [clicky.com](https://clicky.com/help/apps-plugins).

### comScore <a name="comscore"></a>

Wartość atrybutu type: `comscore`

Dodaje obsługę analityki odsłon comScore Unified Digital Measurement™. Wymaga określenia *zmiennej* `c2` przy użyciu podanego przez comScore *identyfikatora c2*. Więcej informacji można znaleźć na stronie [comscore.com](http://www.comscore.com).

### Cxense <a name="cxense"></a>

Wartość atrybutu type: `cxense`

Dodaje obsługę usług analityki Cxense Insight. Wymaga zdefiniowania *zmiennej* `siteId` przy użyciu podanego przez Cxense *siteId*. Więcej szczegółów można znaleźć na stronie [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration).

### Deep.BI <a name="deepbi"></a>

Wartość atrybutu type: `deepbi`

### Dynatrace <a name="dynatrace"></a>

Wartość atrybutu type: `dynatrace`

Dodaje obsługę monitorowania rzeczywistych użytkowników Dynatrace. Wymaga określenia *zmiennej* `app` przy użyciu podanego przez Dynatrace *identyfikatora aplikacji* i *zmiennej* `tenant` przy użyciu podanego przez Dynatrace *identyfikatora środowiska*. Więcej szczegółów na temat dodawania monitorowania rzeczywistych użytkowników Dynatrace można znaleźć na stronie [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/).

### EPICA <a name="epica"></a>

Wartość atrybutu type: `epica`

Dodaje obsługę odsłon i zdarzeń EPICA. Więcej szczegółów można znaleźć na stronie [dokumentacji EPICA](https://www.epica.ai).

### Eulerian Analytics <a name="eulerian-analytics"></a>

Wartość atrybutu type: `euleriananalytics`

Dodaje obsługę Eulerian Technologies Analytics. Wymaga określenia *zmiennej* `analyticsHost` przy użyciu domeny delegowanej Eulerian. Więcej szczegółów można znaleźć na stronie [eulerian.wiki](https://eulerian.wiki).

### Piksel Facebooka <a name="facebook-pixel"></a>

Wartość atrybutu type: `facebookpixel`

Dodaje obsługę [piksela Facebooka](https://www.facebook.com/business/a/facebook-pixel). W konfiguracji składnika [`amp-analytics`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./amp-analytics.md) musisz określić identyfikator piksela `pixelId: YOUR-PIXEL-ID`. Obsługiwane zdarzenia wraz z odpowiadającymi im wartościami zdarzeń, które można określić, są szczegółowo opisane w [dokumentacji programistycznej piksela Facebooka](https://developers.facebook.com/docs/ads-for-websites/pixel-events).

### Gemius <a name="gemius"></a>

Wartość atrybutu type: `gemius`

Dodaje obsługę usług analityki Gemius Audience/Prism. Dodatkowo należy określić podane przez Gemius zmienne `prefix` i `identifier`. Możliwe jest również określenie opcjonalnej zmiennej `extraparams` (key1=value1|key2=value2). Więcej szczegółów można znaleźć na stronie [gemius.com](https://www.gemius.com).

### GfK Sensic <a name="gfk-sensic"></a>

Wartość atrybutu type: `gfksensic`

Dodaje obsługę analityki wykorzystania strumienia audio GfK Sensic. Aby uzyskać szczegółowe informacje, zapoznaj się z naszą [dokumentacją klienta](https://confluence-docu.gfk.com/display/SENSIC/AMP+Integration).

### Google Ads <a name="google-ads"></a>

Wartość atrybutu type: `googleadwords`

Dodaje obsługę śledzenia i remarketingu konwersji reklam Google Ads. Więcej szczegółów znajdziesz w centrum pomocy Google Ads dla [śledzenia konwersji](https://support.google.com/adwords/answer/1722054?hl=en) i [remarketingu](https://support.google.com/adwords/answer/2453998?hl=en). Oba znaczniki można stosować niezależnie od siebie.

### Google Analytics <a name="google-analytics"></a>

Wartość atrybutu type: `googleanalytics`

Dodaje obsługę Google Analytics. Więcej szczegółów dotyczących dodawania obsługi Google Analytics można znaleźć na stronie [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Google Tag Manager <a name="google-tag-manager"></a>

Wartość atrybutu type: nd.

W odróżnieniu od innych dostawców usług analityki, Google Tag Manager jest usługą zarządzania znacznikami i nie wymaga atrybutu `type`. Usługa Google Tag Manager jest [obsługiwana](https://developers.google.com/google-ads/amp/landing-pages#google_tag_manager) w AMP. Informacje na temat [obsługiwanych znaczników](https://support.google.com/tagmanager/answer/6106924) oraz instrukcje dotyczące [dodawania usługi Google Tag Manager do strony AMP](https://support.google.com/tagmanager/answer/6103696) znajdują się w dokumentacji usługi Google Tag Manager.

### Ibeat Analytics <a name="ibeat-analytics"></a>

Wartość atrybutu type: `ibeatanalytics`

Dodaje obsługę Ibeat Analytics. Więcej szczegółów dotyczących dodawania obsługi Ibeat można znaleźć na stronie [Obsługa integracji Ibeat](https://ibeat.indiatimes.com/support.html#h.a5rit14mwie1).

### INFOnline / IVW <a name="infonline--ivw"></a>

Wartość atrybutu type: `infonline`

Dodaje obsługę [INFOnline](https://www.infonline.de)/[IVW](http://www.ivw.de). Wymaga kopii pliku [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) w innej subdomenie niż zawierająca plik AMP ([powód?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). Plik musi być serwowany przez HTTPS. Jeśli pliki AMP znajdują się na przykład w domenie `www.example.com`, plik `amp-analytics-infonline.html` musi znajdować się w innej subdomenie, takiej jak `iframe.example.com` lub `assets.example.com`.

Dodatkowo należy zdefiniować następujące zmienne:

- `st`: identyfikator oferty
- `co`: komentarz
- `cp`: kod
- `url`: lokalizacja HTTPS pliku `amp-analytics-infonline.html`

Więcej szczegółów dotyczących dodawania obsługi INFOnline/IVW można znaleźć na stronie [www.infonline.de](https://www.infonline.de/).

### INFOnline anonymous <a name="infonline-anonymous"></a>

Wartość atrybutu type: `infonline-anonymous`

Dodaje obsługę [anonymous INFOnline](https://www.infonline.de). Wymaga kopii pliku [infonline-anonymous.html](https://www.infonline.de/amp/infonline-anonymous.html) w innej subdomenie niż zawierająca plik AMP ([powód?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). Plik musi być serwowany przez HTTPS. Jeśli pliki AMP znajdują się na przykład w domenie `www.example.com`, plik `infonline-anonymous.html` musi znajdować się w innej subdomenie, takiej jak `iframe.example.com` lub `assets.example.com`.

Dodatkowo należy zdefiniować następujące zmienne:

- `st`: identyfikator oferty
- `co`: komentarz
- `cp`: kod
- `url`: lokalizacja HTTPS pliku `infonline-anonymous.html`
- `dn`: nazwa domeny przekazywania

Więcej szczegółów dotyczących dodawania obsługi INFOnline anonymous można znaleźć na stronie [www.infonline.de](https://www.infonline.de/).

### ip-label <a name="ip-label"></a>

Wartość atrybutu type: `iplabel`

### Keen <a name="keen"></a>

Wartość atrybutu type: `keen`

Dodaje obsługę Keen. Dodatkowo należy zdefiniować następujące `zmienne`:

- `projectId`: identyfikator projektu
- `writeKey`: klucz zapisu

Użyj sekcji `extraUrlParams`, aby dodać więcej danych. Szczegóły dotyczące konfiguracji można znaleźć na stronie [keen.io/docs/api](https://keen.io/docs/api/).

### Kenshoo <a name="kenshoo"></a>

Wartość atrybutu type: `kenshoo`

Dodaje obsługę Kenshoo. Dodatkowe informacje i szczegóły konfiguracji można znaleźć na stronie [helpcenter.kenshoo.com](https://helpcenter.kenshoo.com/hc/en-us/articles/360025260592).

### Krux <a name="krux"></a>

Wartość atrybutu type: `krux`

Dodaje obsługę Krux. Szczegóły dotyczące konfiguracji można znaleźć na stronie [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608).

### Linkpulse <a name="linkpulse"></a>

Wartość atrybutu type: `linkpulse`

Dodaje obsługę Linkpulse. Szczegóły dotyczące konfiguracji można znaleźć na stronie [docs.linkpulse.com](http://docs.linkpulse.com).

### Lotame <a name="lotame"></a>

Wartość atrybutu type: `lotame`

Dodaje obsługę Lotame. Więcej informacji i szczegóły konfiguracji można znaleźć na stronie [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP).

### Mapp Intelligence <a name="mapp-intelligence"></a>

Wartość atrybutu type: `mapp_intelligence`

Dodaje obsługę śledzenia Mapp Intelligence. Więcej informacji i szczegółów konfiguracji można znaleźć na stronie [docs.mapp.com](https://docs.mapp.com/pages/viewpage.action?pageId=10027966).

### Marin Software <a name="marin-software"></a>

Wartość atrybutu type: `marinsoftware`

### Médiamétrie <a name="m%C3%A9diam%C3%A9trie"></a>

Wartość atrybutu type: `mediametrie`

Dodaje obsługę stron śledzenia Médiamétrie. Wymaga zdefiniowania *zmiennej* `serial`. Zmienne `level1` do `level4` są opcjonalne. Więcej informacji można znaleźć na stronie [mediametrie.com](http://www.mediametrie.com/).

### mediarithmics <a name="mediarithmics"></a>

Wartość atrybutu type: `mediarithmics`

Dodaje obsługę mediarithmics. Więcej informacji i szczegóły konfiguracji można znaleźć na stronie `https://developer.mediarithmics.com`.

### Memo <a name="memo"></a>

Wartość atrybutu type: `memo`

### Metrika <a name="metrika"></a>

Wartość atrybutu type: `metrika`

### Moat Analytics <a name="moat-analytics"></a>

Wartość atrybutu type: `moat`

Dodaje obsługę Moat. W celu uzyskania szczegółów konfiguracji należy skontaktować się z przedstawicielem firmy Moat. Więcej informacji na temat Moat można znaleźć na stronie [moat.com/analytics](https://moat.com/analytics).

### Mobify <a name="mobify"></a>

Wartość atrybutu type: `mobify`

Dodaje obsługę Mobify. Więcej szczegółów na temat dodawania obsługi Mobify można znaleźć na stronie [docs.mobify.com](https://docs.mobify.com/amp-sdk/latest/guides/amp-analytics/).

### MoEngage <a name="moengage"></a>

Wartość atrybutu type: `moengage`

### mParticle <a name="mparticle"></a>

Wartość atrybutu type: `mparticle`

Dodaje obsługę mParticle. Więcej szczegółów dotyczących dodawania obsługi mParticle można znaleźć na stronie [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp).

### Navegg <a name="navegg"></a>

Wartość atrybutu type: `navegg`

### New Relic <a name="new-relic"></a>

Wartość atrybutu type: `newrelic`

Dodaje obsługę New Relic Browser do pomiaru przepustowości i wydajności AMP. Dodając wartość atrybutu `newrelic` musisz dodać swój `app ID` oraz `license key` z konta New Relic Browser, aby móc rozpocząć rejestrowanie danych. Więcej szczegółów można znaleźć na stronie dokumentacji AMP New Relic Browser pod adresem [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser).

### Nielsen <a name="nielsen"></a>

Wartość atrybutu type: `nielsen`

Dodaje obsługę Nielsen DCR. Skontaktuj się z przedstawicielem firmy Nielsen, aby skonfigurować swój `apid` oraz pomoc w zdefiniowaniu pozostałych parametrów w sekcji `vars`. Więcej informacji można znaleźć w dokumentacji pomocy techniczej firmy Nielsen.

### Nielsen Marketing Cloud <a name="nielsen-marketing-cloud"></a>

Wartość atrybutu type: `nielsen-marketing-cloud`

Dodaje wsparcie Nielsen Marketing Cloud. Więcej szczegółów można znaleźć w witrynie [Nielsen Marketing Cloud](http://www.nielsen.com/us/en/solutions/capabilities/nielsen-marketing-cloud.html).

### OEWA <a name="oewa"></a>

Wartość atrybutu type: `oewa`

Dodaje obsługę  `[OEWA](https://www.oewa.at)`. Wymaga kopii pliku [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) w innej subdomenie niż zawierająca plik AMP ([powód?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). Plik musi być serwowany przez HTTPS. Jeśli pliki AMP znajdują się na przykład w domenie `www.example.com`, plik `amp-analytics-oewa.html` musi znajdować się w innej subdomenie, takiej jak `oewa-amp.example.com`. Więcej szczegółów na temat dodawania obsługi OEWA można znaleźć [tutaj](http://www.oewa.at/Implementierung).

Dodatkowo należy zdefiniować następujące zmienne:

W sekcji `vars`:

- `s`: oferta
- `cp`: ścieżka kategorii

W sekcji `requests`:

- `url`: lokalizacja HTTPS pliku `amp-analytics-oewa.html`

[tip type="note"] **UWAGA —** istnieje odmiana o nazwie `oewadirect`, która nie używa rozwiązania iframe-ping i ma lepsze wykrywanie klienta przy użyciu `AMP CLIENT_ID`. Jest to obecnie EKSPERYMENT zabroniony przez OEWA, ponieważ nie używa skryptu `oewa2.js`. [/tip]

### Oracle Infinity Analytics <a name="oracle-infinity-analytics"></a>

Wartość atrybutu type: `oracleInfinityAnalytics`

### Parsely <a name="parsely"></a>

Wartość atrybutu type: `parsely`

Dodaje obsługę Parsely. Szczegóły dotyczące konfiguracji można znaleźć na stronie [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html).

### Permutive <a name="permutive"></a>

Wartość atrybutu type: `permutive`

Dodaje obsługę zbierania zdarzeń Permutive. Dodatkowo należy zdefiniować następujące zmienne w sekcji `vars`:

- `namespace`: przestrzeń nazw AMP Permutive
- `key`: klucz publiczny interfejsu API Permutive

Aby dodać więcej właściwości zdarzeń, użyj sekcji `extraUrlParams`. Pełne szczegóły dotyczące konfiguracji można znaleźć na stronie [support.permutive.com](http://support.permutive.com).

### Pistats <a name="pistats"></a>

Wartość atrybutu type: `piStats`

### Piano <a name="piano"></a>

Wartość atrybutu type: `piano`

Dodaje obsługę Piano. Szczegóły dotyczące konfiguracji można znaleźć na stronie [vx.piano.io](http://vx.piano.io/javascript-tracking-amp).

### Pinpoll <a name="pinpoll"></a>

Wartość atrybutu type: `pinpoll`

Dodaje obsługę Pinpoll. Szczegóły dotyczące konfiguracji można znaleźć na stronie [pinpoll.com](https://pinpoll.com/).

### Pressboard <a name="pressboard"></a>

Wartość atrybutu type: `pressboard`

Dodaje obsługę Pressboard. Szczegóły dotyczące konfiguracji można znaleźć na stronie [help.pressboard.ca](http://help.pressboard.ca/publisher-resources/getting-started/implementing-google-amp).

### Quantcast Measurement <a name="quantcast-measurement"></a>

Wartość atrybutu type: `quantcast`

Dodaje obsługę Quantcast Measurement. Więcej szczegółów na temat dodawania obsługi Quantcast Measurement można znaleźć na stronie [quantcast.com](https://www.quantcast.com/help/guides/)

### Rakam <a name="rakam"></a>

Wartość atrybutu type: `rakam`

### reppublika <a name="reppublika"></a>

Wartość atrybutu type: `reppublika`

### Retargetly <a name="retargetly"></a>

Wartość atrybutu type: `retargetly`

### RudderStack <a name="rudderstack"></a>

Wartość atrybutu type: `rudderstack`

Dodaje obsługę RudderStack dla odsłon i zdarzeń na stronie. Dowiedz się więcej na temat implementacji z naszej [dokumentacji](https://docs.rudderstack.com/sdk-integration-guide/getting-started-with-javascript-sdk/amp-analytics).

### Segment <a name="segment"></a>

Wartość atrybutu type: `segment`

Dodaje obsługę Segment dla odsłon stron i zdarzeń. Aby zobaczyć pełną listę pól, które można wysyłać, zobacz [specyfikację Segment](https://segment.com/docs/spec/).

### ShinyStat <a name="shinystat"></a>

Wartość atrybutu type: `shinystat`

### SOASTA mPulse <a name="soasta-mpulse"></a>

Wartość atrybutu type: `mpulse`

Dodaje obsługę [SOASTA mPulse](https://www.soasta.com/mPulse). Szczegóły dotyczące konfiguracji można znaleźć na stronie [docs.soasta.com](http://docs.soasta.com/).

### SimpleReach <a name="simplereach"></a>

Wartość atrybutu type: `simplereach`

Dodaje obsługę SimpleReach. Szczegóły dotyczące konfiguracji można znaleźć na stronie `http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation`.

### Snowplow Analytics <a name="snowplow-analytics"></a>

Wartość atrybutu type: `snowplow`, `snowplow_v2`

Dodaje obsługę Snowplow Analytics. Więcej szczegółów na temat dodawania obsługi Snowplow Analytics można znaleźć na stronie [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker).

### Rambler/TOP-100 <a name="ramblertop-100"></a>

Wartość atrybutu type: `top100`

Dodaje obsługę Rambler/TOP-100. Szczegóły dotyczące konfiguracji można znaleźć na stronie [top100.rambler.ru](https://top100.rambler.ru).

### TEA Analytics <a name="tea-analytics"></a>

Wartość atrybutu type: `teaanalytics`

Dodaje obsługę TEA Analytics. Aby uzyskać więcej informacji na temat dodawania obsługi TEA Analytics, należy skontaktować się z Kimberly (wuqian56@gmail.com).

### Tealium Collect <a name="tealium-collect"></a>

Wartość atrybutu type: `tealiumcollect`

Dodaje obsługę Tealium Collect. Więcej szczegółów dotyczących dodawania obsługi Tealium Collect można znaleźć na stronie [docs.tealium.com](https://docs.tealium.com/platforms/amp/install/).

### Top.Mail.Ru <a name="topmailru"></a>

Wartość atrybutu type: `topmailru`

Dodaje obsługę Top.Mail.Ru. Szczegóły dotyczące konfiguracji można znaleźć na stronie [pomocy Top.Mail.Ru](https://help.mail.ru/top/amp-analytics).

### Treasure Data <a name="treasure-data"></a>

Wartość atrybutu type: `treasuredata`

Dodaje obsługę Treasure Data. Szczegóły konfiguracji można znaleźć na stronie [treasuredata.com](https://docs.treasuredata.com/articles/javascript-sdk-google-amp).

### Umeng+ Analytics <a name="umeng-analytics"></a>

Wartość atrybutu type: `umenganalytics`

Dodaje obsługę Umeng+ Analytics. Więcej szczegółów dotyczących dodawania obsługi Umeng+ Analytics można znaleźć na stronie [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5).

### Upscore <a name="upscore"></a>

Wartość atrybutu type: `upscore`

### Vpon Analytics <a name="vpon-analytics"></a>

Wartość atrybutu type: `vponanalytics`

Dodaje obsługę Vpon Analytics. Szczegóły dotyczące konfiguracji można znaleźć na stronie [Vpon Analytics](https://cmp.vpadn.com/dmp/doc/amp_analytics.html).

### Webengage <a name="webengage"></a>

Atrybut type `webengage`

### Webtrekk <a name="webtrekk"></a>

Wartość tego atrybutu ~~`webtrekk`~~ jest niezalecana (zostanie usunięta 31/12/2018) — w zamian należy używać wartości `webtrekk_v2`

Dodaje obsługę Webtrekk. Szczegóły dotyczące konfiguracji można znaleźć na stronie [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html).

### Yandex Metrica <a name="yandex-metrica"></a>

Wartość atrybutu type: `metrika`

Dodaje obsługę Yandex Metrica. Szczegóły dotyczące konfiguracji można znaleźć na stronie [Yandex Support](https://yandex.com/support/metrica/code/install-counter-amp.xml).
