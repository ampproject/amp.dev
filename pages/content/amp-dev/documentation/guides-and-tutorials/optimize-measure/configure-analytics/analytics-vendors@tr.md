---
'$title': Analitik Sağlayıcıları
$order: 3
formats:
  - websites
  - stories
  - ads
teaser:
  text: Bu belge, amp-analytics bileşeniyle kullanılmak üzere yerleşik yapılandırmalara sahip analytics sağlayıcılarını listeler.
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

Bu belge, [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics/) bileşeniyle kullanılmak üzere yerleşik yapılandırmalara sahip analitik sağlayıcılarını listeler.

Hizmetlerini [`<amp-analytics>`](https://amp.dev/documentation/components/amp-analytics/) ile entegre etmek isteyen sağlayıcılar, [Analiz araçlarınızı AMP ile entegre etme](https://amp.dev/documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools) bölümündeki ayrıntılara bakmalıdır.

### Acquia Lift <a name="acquia-lift"></a>

Tür özellik değeri: `acquialift`

Acquia Lift için destek ekler. `decisionApiUrl`, `accountId` ve `siteId` belirtilmelidir. Acquia Lift hakkında daha fazla bilgi [https://docs.acquia.com/lift](https://docs.acquia.com/lift) adresinde bulunabilir.

### Adobe Analytics <a name="adobe-analytics"></a>

Tür özellik değeri: `adobeanalytics`

Adobe Analytics için destek ekler. Adobe Analytics desteğinin eklenmesiyle ilgili daha fazla ayrıntı [marketing.adobe.com](https://marketing.adobe.com/resources/help/en_US/sc/implement/accelerated-mobile-pages.html) adresinde bulunabilir.

### AFS Analytics <a name="afs-analytics"></a>

Tür özellik değeri: `afsanalytics`

AFS Analytics için destek ekler. Ek olarak, `websiteid` ve `server` değişkenleri belirtilmelidir. AFS Analytics desteği eklemeyle ilgili daha fazla ayrıntı [afsanalytics.com](https://www.afsanalytics.com/articles/developers/) adresinde bulunabilir.

### Alexa Internet <a name="alexa-internet"></a>

Tür özellik değeri: `alexametrics`

Alexa Sertifikalı Site metrikleri için destek ekler. `atrk_acct` ve `domain` değişkenleri belirtilmelidir. Daha fazla bilgi [Alexa'nın Sertifikalı Metrikler SSS](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics) bölümünde bulunabilir.

### Amplitude <a name="amplitude"></a>

Tür özellik değeri: `amplitude`

### AT Internet <a name="at-internet"></a>

Tür özellik değeri: `atinternet`

AT Internet için destek ekler. AT Internet desteğine eklemek için daha fazla ayrıntı [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/) adresinde bulunabilir.

### Baidu Analytics <a name="baidu-analytics"></a>

Tür özellik değeri: `baiduanalytics`

Baidu Analytics için destek ekler. Baidu Analytics desteği eklemek için daha fazla ayrıntı [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0) adresinde bulunabilir.

### BlueConic <a name="blueconic"></a>

Tür özellik değeri: `blueconic`

### Browsi <a name="browsi"></a>

Tür özellik değeri: `browsi`

### Burt <a name="burt"></a>

Tür özellik değeri: `burt`

Burt için destek ekler. Ayrıca, `trackingKey` değişkeni belirtilmelidir. İsteğe bağlı değişkenler `category` ve `subCategory` belirtmek de mümkündür. Daha fazla ayrıntı [burtcorp.com](http://burtcorp.com) adresinde bulunabilir.

### BySide <a name="byside"></a>

Tür özellik değeri: `byside`

### Captain Metrics <a name="captain-metrics"></a>

Tür özellik değeri: `captainmetrics`

### Chartbeat <a name="chartbeat"></a>

Tür özellik değeri: `chartbeat`

Chartbeat için destek ekler. Chartbeat desteği eklemek için daha fazla ayrıntı [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp) adresinde bulunabilir.

### Clicky Web Analytics <a name="clicky-web-analytics"></a>

Tür özellik değeri: `clicky`

Clicky Web Analytics için destek ekler. Clicky desteği eklemek için daha fazla ayrıntı [clicky.com](https://clicky.com/help/apps-plugins) adresinde bulunabilir.

### comScore <a name="comscore"></a>

Tür özellik değeri: `comscore`

comScore Unified Digital Measurement™ sayfa görüntüleme analizi için destek ekler. comScore tarafından sağlanan _c2 id_ ile _var_ `c2` tanımlanmasını gerektirir. Daha fazla bilgi [comscore.com](http://www.comscore.com) adresinde bulunabilir.

### Cxense <a name="cxense"></a>

Tür özellik değeri: `cxense`

Cxense Insight analitiği için destek ekler. _var_ `siteId` Cxense tarafından sağlanan _siteId_ ile tanımlanmasını gerektirir. Daha fazla ayrıntı [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration) adresinde bulunabilir.

### Deep.BI <a name="deepbi"></a>

Tür özellik değeri: `deepbi`

### Dynatrace <a name="dynatrace"></a>

Tür özellik değeri: `dynatrace`

Dynatrace gerçek kullanıcı izleme için destek ekler. _var_ `app` Dynatrace tarafından sağlanan _application id_ ve _var_ `tenant` ile Dynatrace tarafından sağlanan _ortam tanımlayıcısı_ ile tanımlanmasını gerektirir. Dynatrace gerçek kullanıcı izlemesini eklemek için daha fazla ayrıntı [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/) adresinde bulunabilir.

### EPICA <a name="epica"></a>

Tür özellik değeri: `epica`

EPICA sayfa görünümleri ve etkinlikleri için destek ekler. Daha fazla ayrıntı [EPICA belgelerinde](https://www.epica.ai) bulunabilir.

### Eulerian Analytics <a name="eulerian-analytics"></a>

Tür özellik değeri: `euleriananalytics`

Eulerian Technologies Analytics için destek ekler. _var_ `analyticsHost` ile Eulerian yetkilendirilmiş etki alanıyla tanımlanmasını gerektirir. Daha fazla ayrıntı [eulerian.wiki](https://eulerian.wiki) adresinde bulunabilir.

### Facebook Pixel <a name="facebook-pixel"></a>

Tür özellik değeri: `facebookpixel`

[Facebook Pixel](https://www.facebook.com/business/a/facebook-pixel) için destek ekler. [`amp-analytics`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/./amp-analytics.md) yapılandırmanızda, Pixel ID'nizi `pixelId: YOUR-PIXEL-ID` olarak tanımlamalısınız. Belirtilebilen ilgili olay değerleriyle birlikte desteklenen olaylar, [Facebook Pixel geliştirici belgelerinde](https://developers.facebook.com/docs/ads-for-websites/pixel-events) ayrıntılı olarak açıklanmıştır.

### Gemius <a name="gemius"></a>

Tür özellik değeri: `gemius`

Gemius Audience/Prism analizi için destek ekler. Ayrıca gemius tarafından sağlanan `prefix` ve `identifier` değişkenler de belirtilmelidir. Ayrıca isteğe bağlı değişken `extraparams` (key1=value1|key2=value2) belirtmek de mümkündür. [gemius.com](https://www.gemius.com) adresinde daha fazla ayrıntı bulunabilir.

### GfK Sensic <a name="gfk-sensic"></a>

Tür özellik değeri: `gfksensic`

GfK Sensic ses akışı kullanım analizi için destek ekler. Ayrıntılar için lütfen [müşteri belgelerimize](https://confluence-docu.gfk.com/display/SENSIC/AMP+Integration) bakın.

### Google Ads <a name="google-ads"></a>

Tür özellik değeri: `googleadwords`

Google Ads dönüşüm izleme ve yeniden pazarlama için destek ekler. [Dönüşüm izleme](https://support.google.com/adwords/answer/1722054?hl=en) ve [yeniden pazarlama](https://support.google.com/adwords/answer/2453998?hl=en) için Google Ads yardım merkezinde daha fazla ayrıntıya bakın. Her iki etiket de birbirinden bağımsız olarak kullanılabilir.

### Google Analytics <a name="google-analytics"></a>

Tür özellik değeri: `googleanalytics`

Google Analytics için destek ekler. Google Analytics desteğini eklemeyle ilgili daha fazla ayrıntı, [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/) adresinde bulunabilir.

### Google Etiket Yöneticisi <a name="google-tag-manager"></a>

Tür özellik değeri: N/A

Diğer analiz sağlayıcıların aksine, Google Etiket Yöneticisi bir etiket yönetimi hizmetidir ve `type` özniteliğini gerektirmez. Google Etiket Yöneticisi, AMP'de [desteklenmektedir](https://developers.google.com/google-ads/amp/landing-pages#google_tag_manager). [Desteklenen etiketler](https://support.google.com/tagmanager/answer/6106924) ve [Google Etiket Yöneticisi'ni AMP sayfanıza ekleme](https://support.google.com/tagmanager/answer/6103696) talimatları için Google Etiket Yöneticisi belgelerine bakın.

### Ibeat Analytics <a name="ibeat-analytics"></a>

Tür özellik değeri: `ibeatanalytics`

Ibeat Analytics için destek ekler. Ibeat desteği eklemek için daha fazla ayrıntı [Ibeat Entegrasyon Desteği](https://ibeat.indiatimes.com/support.html#h.a5rit14mwie1) adresinde bulunabilir.

### INFOnline / IVW <a name="infonline--ivw"></a>

Tür özellik değeri: `infonline`

[INFOnline](https://www.infonline.de) / [IVW](http://www.ivw.de) için destek ekler. AMP dosyası dahil farklı bir alt etki alanında [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) dosyasının bir kopyasını gerektirir ([neden?](https://github.com/ampproject/amphtml/blob/main/spec/amp-iframe-origin-policy.md)). Dosya HTTPS aracılığıyla sunulmalıdır. Örneğin, AMP dosyalarınız `www.example.com`'da barındırılıyorsa, `amp-analytics-infonline.html`'in `iframe.example.com` veya `assets.example.com` gibi başka bir alt etki alanında olması gerekir.

Ek olarak, aşağıdaki değişkenler tanımlanmalıdır:

- `st`: teklif kimliği
- `co`: yorum
- `cp`: kod
- `url`: `amp-analytics-infonline.html`'in HTTPS konumu

INFOnline / IVW desteği eklemek için daha fazla ayrıntı [www.infonline.de](https://www.infonline.de/) adresinde bulunabilir.

### INFOnline anonymous <a name="infonline-anonymous"></a>

Tür özellik değeri: `infonline-anonymous`

[anonymous INFOnline](https://www.infonline.de) için destek ekler. [infonline-anonymous.html](https://www.infonline.de/amp/infonline-anonymous.html)'in AMP dosyası dahil olmak üzere farklı bir alt etki alanında bir kopyasını gerektirir ([neden?](https://github.com/ampproject/amphtml/blob/main/spec/amp-iframe-origin-policy.md)). Dosya HTTPS aracılığıyla sunulmalıdır. Örneğin, AMP dosyalarınız `www.example.com`'da barındırılıyorsa, `infonline-anonymous.html`'in `iframe.example.com` veya `assets.example.com` gibi başka bir alt etki alanında olması gerekir.

Ek olarak, aşağıdaki değişkenler tanımlanmalıdır:

- `st`: teklif kimliği
- `co`: yorum
- `cp`: kod
- `url`: `infonline-anonymous.html`'in HTTPS konumu
- `dn`: Geçiş etki alanı adı

INFOnline anonymous desteği eklemek için daha fazla ayrıntı [www.infonline.de](https://www.infonline.de/) adresinde bulunabilir.

### ip-label <a name="ip-label"></a>

Tür özellik değeri: `iplabel`

### Keen <a name="keen"></a>

Tür özellik değeri: `keen`

Keen için destek ekler. Ek olarak, aşağıdaki `vars` tanımlanmalıdır:

- `projectId`: proje kimliğiniz
- `writeKey`: yazma anahtarınız

Daha fazla veri eklemek için `extraUrlParams` kullanın. Yapılandırma ayrıntıları [keen.io/docs/api](https://keen.io/docs/api/) adresinde bulunabilir.

### Kenshoo <a name="kenshoo"></a>

Tür özellik değeri: `kenshoo`

Kenshoo için destek ekler. Daha fazla bilgi ve yapılandırma ayrıntıları [helpcenter.kenshoo.com](https://helpcenter.kenshoo.com/hc/en-us/articles/360025260592) adresinde bulunabilir.

### Krux <a name="krux"></a>

Tür özellik değeri: `krux`

Krux için destek ekler. Yapılandırma ayrıntıları [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608) adresinde bulunabilir.

### Linkpulse <a name="linkpulse"></a>

Tür özellik değeri: `linkpulse`

Linkpulse için destek ekler. Yapılandırma ayrıntıları [docs.linkpulse.com](http://docs.linkpulse.com) adresinde bulunabilir.

### Lotame <a name="lotame"></a>

Tür özellik değeri: `lotame`

Lotame için destek ekler. Daha fazla bilgi ve yapılandırma ayrıntıları [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP) adresinde bulunabilir.

### Mapp Intelligence <a name="mapp-intelligence"></a>

Tür özellik değeri: `mapp_intelligence`

Mapp Intelligence izleme desteği ekler. Daha fazla bilgi ve yapılandırma ayrıntıları [docs.mapp.com](https://docs.mapp.com/pages/viewpage.action?pageId=10027966) adresinde bulunabilir.

### Marin Software <a name="marin-software"></a>

Tür özellik değeri: `marinsoftware`

### Médiamétrie <a name="m%C3%A9diam%C3%A9trie"></a>

Tür özellik değeri: `mediametrie`

Médiamétrie izleme sayfaları için destek ekler. _var_ `serial` tanımlanmasını gerektirir. Vars `level1` ila `level4` isteğe bağlıdır. Daha fazla bilgi [mediametrie.com](http://www.mediametrie.com/) adresinde bulunabilir.

### mediarithmics <a name="mediarithmics"></a>

Tür özellik değeri: `mediarithmics`

mediarithmics için destek ekler. Daha fazla bilgi ve yapılandırma ayrıntıları `https://developer.mediarithmics.com` adresinde bulunabilir.

### Memo <a name="memo"></a>

Tür özellik değeri: `memo`

### Metrika <a name="metrika"></a>

Tür özellik değeri: `metrika`

### Moat Analytics <a name="moat-analytics"></a>

Tür özellik değeri: `moat`

Moat için destek ekler. Yapılandırma ayrıntıları için lütfen Moat temsilcinizle iletişime geçin. Moat hakkında daha fazla bilgi [moat.com/analytics](https://moat.com/analytics) adresinde bulunabilir.

### Mobify <a name="mobify"></a>

Tür özellik değeri: `mobify`

Mobify için destek ekler. Mobify desteği eklemeyle ilgili daha fazla ayrıntı [docs.mobify.com](https://docs.mobify.com/amp-sdk/latest/guides/amp-analytics/) adresinde bulunabilir.

### MoEngage <a name="moengage"></a>

Tür özellik değeri: `moengage`

### mParticle <a name="mparticle"></a>

Tür özellik değeri: `mparticle`

MParticle için destek ekler. MParticle desteği eklemek için daha fazla ayrıntı [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp) adresinde bulunabilir.

### Navegg <a name="navegg"></a>

Tür özellik değeri: `navegg`

### New Relic <a name="new-relic"></a>

Tür özellik değeri: `newrelic`

AMP verimini ve performansını ölçmek için New Relic Browser için destek ekler. `newrelic` özellik değerini ekleyerek, verileri yakalamaya başlamak için New Relic Browser hesabınızdan `app ID` ve `license key` eklemeniz gerekir. [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser) adresindeki New Relic Browser AMP belgeleri sayfasında daha fazla ayrıntı bulunabilir.

### Nielsen <a name="nielsen"></a>

Tür özellik değeri: `nielsen`

Nielsen DCR için destek ekler. `apid` ayarlamak ve `vars` bölümünde kalan parametreleri tanımlamaya yardımcı olmak için lütfen Nielsen temsilcinizle iletişime geçin. Daha fazla bilgi için [Nielsen'in destek belgelerine](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API) bakın.

### Nielsen Marketing Cloud <a name="nielsen-marketing-cloud"></a>

Tür özellik değeri: `nielsen-marketing-cloud`

Nielsen Marketing Cloud için destek ekler. [Nielsen Marketing Cloud](http://www.nielsen.com/us/en/solutions/capabilities/nielsen-marketing-cloud.html)'da daha fazla ayrıntı bulunabilir.

### OEWA <a name="oewa"></a>

Tür özellik değeri: `oewa`

`[OEWA](https://www.oewa.at)` için destek ekler. AMP dosyası dahil farklı bir alt etki alanında [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html)'in bir kopyasını gerektirir ([why?](https://github.com/ampproject/amphtml/blob/main/spec/amp-iframe-origin-policy.md)). Dosya HTTPS aracılığıyla sunulmalıdır. Örneğin, AMP dosyalarınız `www.example.com`'da barındırılıyorsa, `amp-analytics-oewa.html`'in `oewa-amp.example.com` gibi başka bir alt etki alanında olması gerekir. OEWA desteği eklemeyle ilgili daha fazla ayrıntı [burada](http://www.oewa.at/Implementierung)bulunabilir.

Ek olarak, aşağıdaki değişkenler tanımlanmalıdır:

`vars` bölümünde:

- `s`: teklif
- `cp`: kategori yolu

`requests` bölümünde:

- `url`: `amp-analytics-oewa.html`'in HTTPS konumu

[tip type="note"] **NOT –** iframe-ping çözümünü kullanmayan ve `AMP CLIENT_ID` kullanarak daha iyi bir istemci algılamasına sahip `oewadirect` adlı bir varyasyon var. Bu, şu anda DENEYSELDİR ve `oewa2.js` kullanmadığı için OEWA tarafından yasaklanmıştır. [/tip]

### Oracle Infinity Analytics <a name="oracle-infinity-analytics"></a>

Tür özellik değeri: `oracleInfinityAnalytics`

### Parsely <a name="parsely"></a>

Tür özellik değeri: `parsely`

Parsely için destek ekler. Yapılandırma ayrıntıları [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html) adresinde bulunabilir.

### Permutive <a name="permutive"></a>

Tür özellik değeri: `permutive`

Permutive olay koleksiyonu için destek ekler. Ek olarak, aşağıdaki `vars` tanımlanmalıdır:

- `namespace`: Permutive AMP ad alanınız
- `key`: Permutive public API anahtarınız

Ek olay özellikleri eklemek için `extraUrlParams` kullanın. Tam yapılandırma ayrıntıları [support.permutive.com](http://support.permutive.com) adresinde bulunabilir.

### Pistats <a name="pistats"></a>

Tür özellik değeri: `piStats`

### Piano <a name="piano"></a>

Tür özellik değeri: `piano`

Piano için destek ekler. Yapılandırma ayrıntıları [vx.piano.io](http://vx.piano.io/javascript-tracking-amp) adresinde bulunabilir.

### Pinpoll <a name="pinpoll"></a>

Tür özellik değeri: `pinpoll`

Pinpoll için destek ekler. Yapılandırma ayrıntıları [pinpoll.com](https://pinpoll.com/) adresinde bulunabilir.

### Pressboard <a name="pressboard"></a>

Tür özellik değeri: `pressboard`

Pressboard için destek ekler. Yapılandırma ayrıntıları [help.pressboard.ca](http://help.pressboard.ca/publisher-resources/getting-started/implementing-google-amp) adresinde bulunabilir.

### Quantcast Measurement <a name="quantcast-measurement"></a>

Tür özellik değeri: `quantcast`

Quantcast Measurement için destek ekler. Quantcast Measurement eklemek için daha fazla ayrıntı [quantcast.com](https://www.quantcast.com/help/guides/)'da bulunabilir.

### Rakam <a name="rakam"></a>

Tür özellik değeri: `rakam`

### reppublika <a name="reppublika"></a>

Tür özellik değeri: `reppublika`

### Retargetly <a name="retargetly"></a>

Tür özellik değeri: `retargetly`

### RudderStack <a name="rudderstack"></a>

Tür özellik değeri: `rudderstack`

RudderStack sayfa görünümleri ve olayları için destek ekler. Uygulama hakkında daha fazla bilgi için [belgelerimize](https://docs.rudderstack.com/sdk-integration-guide/getting-started-with-javascript-sdk/amp-analytics) bakın.

### Segment <a name="segment"></a>

Tür özellik değeri: `segment`

Segment sayfa görünümleri ve olaylar için destek ekler. Gönderebileceğiniz alanların tam listesini görmek için bkz. [Segment Spesifikasyonu](https://segment.com/docs/spec/).

### ShinyStat <a name="shinystat"></a>

Tür özellik değeri: `shinystat`

### SOASTA mPulse <a name="soasta-mpulse"></a>

Tür özellik değeri: `mpulse`

[SOASTA mPulse](https://www.soasta.com/mPulse) için destek ekler. Yapılandırma ayrıntıları [docs.soasta.com](http://docs.soasta.com/) adresinde bulunabilir.

### SimpleReach <a name="simplereach"></a>

Tür özellik değeri: `simplereach`

SimpleReach için destek ekler. Yapılandırma ayrıntıları `http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation` adresinde bulunabilir.

### Snowplow Analytics <a name="snowplow-analytics"></a>

Tür özellik değeri: `snowplow`, `snowplow_v2`

Snowplow Analytics için destek ekler. Snowplow Analytics desteğini eklemeyle ilgili daha fazla ayrıntı [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker) adresinde bulunabilir.

### Rambler/TOP-100 <a name="ramblertop-100"></a>

Tür özellik değeri: `top100`

Rambler/TOP-100 için destek ekler. Yapılandırma ayrıntıları [top100.rambler.ru](https://top100.rambler.ru) adresinde bulunabilir.

### TEA Analytics <a name="tea-analytics"></a>

Tür özellik değeri: `teaanalytics`

TEA Analytics için destek ekler. TEA Analytics desteği eklemek için daha fazla ayrıntı Kimberly (wuqian56@gmail.com) ile iletişime geçebilir.

### Tealium Collect <a name="tealium-collect"></a>

Tür özellik değeri: `tealiumcollect`

Tealium Collect için destek ekler. Tealium Collect desteğinin eklenmesiyle ilgili daha fazla ayrıntı [docs.tealium.com](https://docs.tealium.com/platforms/amp/install/) adresinde bulunabilir.

### Top.Mail.Ru <a name="topmailru"></a>

Tür özellik değeri: `topmailru`

Top.Mail.Ru için destek ekler. Yapılandırma ayrıntıları [Top.Mail.Ru Yardım](https://help.mail.ru/top/amp-analytics)'da bulunabilir.

### Treasure Data <a name="treasure-data"></a>

Tür özellik değeri: `treasuredata`

Treasure Data için destek ekler. Yapılandırma detayları [treasuredata.com](https://docs.treasuredata.com/articles/javascript-sdk-google-amp) adresinde bulunabilir.

### Umeng+ Analytics <a name="umeng-analytics"></a>

Tür özellik değeri: `umenganalytics`

Umeng + Analytics için destek ekler. Umeng + Analytics desteğini eklemeyle ilgili daha fazla ayrıntı [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5) adresinde bulunabilir.

### Upscore <a name="upscore"></a>

Tür özellik değeri: `upscore`

### Vpon Analytics <a name="vpon-analytics"></a>

Tür özellik değeri: `vponanalytics`

Vpon Vpon Analytics için destek ekler. Yapılandırma ayrıntıları [Vpon Analytics](https://cmp.vpadn.com/dmp/doc/amp_analytics.html) adresinde bulunabilir.

### Webengage <a name="webengage"></a>

Tür özelliği `webengage`

### Webtrekk <a name="webtrekk"></a>

Öznitelik değeri ~~`webtrekk`~~ kullanımdan kaldırılmıştır (31/12/2018 tarihinde kaldırılacaktır) - bunun yerine `webtrekk_v2` kullanın

Webtrekk için destek ekler. Yapılandırma detayları [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html) adresinde bulunabilir.

### Yandex Metrica <a name="yandex-metrica"></a>

Tür özellik değeri: `metrika`

Yandex Metrica için destek ekler. Yapılandırma ayrıntıları [Yandex Destek](https://yandex.com/support/metrica/code/install-counter-amp.xml)'te bulunabilir.
