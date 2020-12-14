---
"$title": Nhà cung cấp công cụ phân tích
order: '3'
formats:
- websites
- stories
- ads
teaser:
  text: Tài liệu này liệt kê những nhà cung cấp công cụ phân tích có cấu hình tích hợp để sử dụng với  thành phần amp-analytics.
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

Tài liệu này liệt kê những nhà cung cấp công cụ phân tích có cấu hình tích hợp để sử dụng với  thành phần [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics/).

Những nhà cung cấp nào muốn tích hợp dịch vụ của họ với [`<amp-analytics>`](https://amp.dev/documentation/components/amp-analytics/) nên tham khảo những chi tiết trong [Tích hợp công cụ phân tích với AMP](https://amp.dev/documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools).

### Acquia Lift <a name="acquia-lift"></a>

Type attribute value: `acquialift`

Adds support for Acquia Lift. The `decisionApiUrl`, `accountId` and `siteId` must be specified. More information about Acquia Lift can be found at [https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics <a name="adobe-analytics"></a>

Giá trị thuộc tính type: `adobeanalytics`

Adds support for Adobe Analytics. More details for adding Adobe Analytics support can be found at [marketing.adobe.com](https://marketing.adobe.com/resources/help/en_US/sc/implement/accelerated-mobile-pages.html).

### AFS Analytics <a name="afs-analytics"></a>

Giá trị thuộc tính type: `afsanalytics`

Adds support for AFS Analytics. Additionally, the `websiteid` and `server` variables must be specified. More details for adding AFS Analytics support can be found at [afsanalytics.com](https://www.afsanalytics.com/articles/developers/).

### Alexa Internet <a name="alexa-internet"></a>

Giá trị thuộc tính type: `alexametrics`

<!-- markdown-link-check-disable -->

Adds support for Alexa Certified Site Metrics. The `atrk_acct` and `domain` variables must be specified. More information can be found at [Alexa’s Certified Metrics FAQ](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics).

<!-- markdown-link-check-enable -->

### Amplitude <a name="amplitude"></a>

Giá trị thuộc tính type: `amplitude`

### AT Internet <a name="at-internet"></a>

Giá trị thuộc tính type: `atinternet`

Adds support for AT Internet. More details for adding AT Internet support can be found at [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/).

### Baidu Analytics <a name="baidu-analytics"></a>

Giá trị thuộc tính type: `baiduanalytics`

Adds support for Baidu Analytics. More details for adding Baidu Analytics support can be found at [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0).

### BlueConic <a name="blueconic"></a>

Giá trị thuộc tính type: `blueconic`

### Browsi <a name="browsi"></a>

Giá trị thuộc tính type: `browsi`

### Burt <a name="burt"></a>

Giá trị thuộc tính type: `burt`

Adds support for Burt. Additionally, the `trackingKey` variable must be specified. It's also possible to specify the optional variables `category` and `subCategory`. More details can be found at [burtcorp.com](http://burtcorp.com).

### BySide <a name="byside"></a>

Giá trị thuộc tính type: `byside`

### Captain Metrics <a name="captain-metrics"></a>

Giá trị thuộc tính type: `captainmetrics`

### Chartbeat <a name="chartbeat"></a>

Giá trị thuộc tính type: `chartbeat`

Adds support for Chartbeat. More details for adding Chartbeat support can be found at [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp).

### Clicky Web Analytics <a name="clicky-web-analytics"></a>

Giá trị thuộc tính type: `clicky`

Adds support for Clicky Web Analytics. More details for adding Clicky support can be found at [clicky.com](https://clicky.com/help/apps-plugins).

### comScore <a name="comscore"></a>

Giá trị thuộc tính type: `comscore`

Adds support for comScore Unified Digital Measurement™ pageview analytics. Requires defining *var* `c2` with comScore-provided *c2 id*. More information can be found at [comscore.com](http://www.comscore.com).

### Cxense <a name="cxense"></a>

Giá trị thuộc tính type: `cxense`

Adds support for Cxense Insight analytics. Requires defining *var* `siteId` with Cxense-provided *siteId*. More details can be found at [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration).

### Deep.BI <a name="deepbi"></a>

Giá trị thuộc tính type: `deepbi`

### Dynatrace <a name="dynatrace"></a>

Giá trị thuộc tính type: `dynatrace`

Adds support for Dynatrace real user monitoring. Requires defining *var* `app` with a Dynatrace provided *application id* and *var* `tenant` with a Dynatrace provided *environment identifier*. More details for adding Dynatrace real user monitoring can be found at [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/).

### EPICA <a name="epica"></a>

Giá trị thuộc tính type: `epica`

Adds support for EPICA page views and events. More details can be found at [EPICA docs](https://www.epica.ai).

### Eulerian Analytics <a name="eulerian-analytics"></a>

Giá trị thuộc tính type: `euleriananalytics`

Adds support for Eulerian Technologies Analytics. Requires defining *var* `analyticsHost` with Eulerian delegated domain. More details can be found at [eulerian.wiki](https://eulerian.wiki).

### Facebook Pixel <a name="facebook-pixel"></a>

Giá trị thuộc tính type: `facebookpixel`

Adds support for the [Facebook Pixel](https://www.facebook.com/business/a/facebook-pixel). In your [`amp-analytics`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./amp-analytics.md) configuration, you must define your Pixel ID as `pixelId: YOUR-PIXEL-ID`. The events supported along with the corresponding event values that can be specified are detailed in the [Facebook Pixel developer documentation](https://developers.facebook.com/docs/ads-for-websites/pixel-events).

### Gemius <a name="gemius"></a>

Giá trị thuộc tính type: `gemius`

Adds support for Gemius Audience/Prism analytics. Additionally, the gemius-provided `prefix` and `identifier` variables must be specified. It's also possible to specify the optional variable `extraparams` (key1=value1|key2=value2). More details can be found at [gemius.com](https://www.gemius.com).

### GfK Sensic <a name="gfk-sensic"></a>

Giá trị thuộc tính type: `gfksensic`

Adds support for GfK Sensic audio stream usage analytics. Please refer to our [client documentation](https://confluence-docu.gfk.com/display/SENSIC/AMP+Integration) for details.

### Google Ads <a name="google-ads"></a>

Giá trị thuộc tính type: `googleadwords`

Adds support for Google Ads conversion tracking and remarketing. See more details in the Google Ads help center for [conversion tracking](https://support.google.com/adwords/answer/1722054?hl=en) and [remarketing](https://support.google.com/adwords/answer/2453998?hl=en). Both tags can be used independent of each other.

### Google Analytics <a name="google-analytics"></a>

Giá trị thuộc tính type: `googleanalytics`

Adds support for Google Analytics. More details for adding Google Analytics support can be found at [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Google Tag Manager <a name="google-tag-manager"></a>

Type attribute value: N/A

Khác với những nhà cung cấp khách đối với công cụ phân tích, Google Tag Manager là dịch vụ quản lí thẻ, và không cần có thuộc tính `type`. Google Tag Manager được [hỗ trợ](https://developers.google.com/google-ads/amp/landing-pages#google_tag_manager) trong AMP. Hãy tham khảo tài liệu Google Tag Manager để biết [những thẻ được hỗ trợ](https://support.google.com/tagmanager/answer/6106924) và biết các chỉ dẫn cho việc [thêm Google Tag Manager vào trang AMP của bạn](https://support.google.com/tagmanager/answer/6103696).

### Ibeat Analytics <a name="ibeat-analytics"></a>

Giá trị thuộc tính type: `ibeatanalytics`

Adds support for Ibeat Analytics. More details for adding Ibeat support can be found at [Ibeat Integration Support](https://ibeat.indiatimes.com/support.html#h.a5rit14mwie1).

### INFOnline / IVW <a name="infonline--ivw"></a>

Giá trị thuộc tính type: `infonline`

Adds support for [INFOnline](https://www.infonline.de) / [IVW](http://www.ivw.de). Requires a copy of [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) on a different subdomain than the including AMP file ([why?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). The file must be served via HTTPS. For example, if your AMP files are hosted on `www.example.com`, then `amp-analytics-infonline.html` needs to be on another subdomain such as `iframe.example.com` or `assets.example.com`.

Ngoài ra, những biến số sau cần phải được định nghĩa:

- `st`: ID cung ứng
- `co`: bình luận
- `cp`: mã
- `url`: vị trí HTTPS của `amp-analytics-infonline.html`

Chi tiết khác về việc thêm sự hỗ trợ của INFOnline / IVW có thể được tìm thấy tại [www.infonline.de](https://www.infonline.de/).

### INFOnline anonymous <a name="infonline-anonymous"></a>

Giá trị thuộc tính type: `infonline-anonymous`

Adds support for the [anonymous INFOnline](https://www.infonline.de). Requires a copy of [infonline-anonymous.html](https://www.infonline.de/amp/infonline-anonymous.html) on a different subdomain than the including AMP file ([why?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). The file must be served via HTTPS. For example, if your AMP files are hosted on `www.example.com`, then `infonline-anonymous.html` needs to be on another subdomain such as `iframe.example.com` or `assets.example.com`.

Ngoài ra, những biến số sau cần phải được định nghĩa:

- `st`: ID cung ứng
- `co`: bình luận
- `cp`: mã
- `url`: vị trí HTTPS của `infonline-anonymous.html`
- `dn`: Tên miền chuyển tiếp

Chi tiết khác về việc thêm sự hỗ trợ của INFOnline anonymous có thể được tìm thấy tại [www.infonline.de](https://www.infonline.de/).

### ip-label <a name="ip-label"></a>

Giá trị thuộc tính type: `iplabel`

### Keen <a name="keen"></a>

Giá trị thuộc tính type: `keen`

Adds support for Keen. Additionally, the following `vars` must be defined:

- `projectId`: id dự án
- `writeKey`: khoá ghi dữ liệu

Dùng `extraUrlParams` để đưa vào thêm dữ liệu. Chi tiết cấu hình có thể được tìm thấy tại [keen.io/docs/api](https://keen.io/docs/api/).

### Kenshoo <a name="kenshoo"></a>

Giá trị thuộc tính type: `kenshoo`

Adds support for Kenshoo. More information and configuration details can be found at [helpcenter.kenshoo.com](https://helpcenter.kenshoo.com/hc/en-us/articles/360025260592).

### Krux <a name="krux"></a>

Giá trị thuộc tính type: `krux`

<!-- markdown-link-check-disable -->

Adds support for Krux. Configuration details can be found at [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608).

<!-- markdown-link-check-enable -->

### Linkpulse <a name="linkpulse"></a>

Giá trị thuộc tính type: `linkpulse`

Adds support for Linkpulse. Configuration details can be found at [docs.linkpulse.com](http://docs.linkpulse.com).

### Lotame <a name="lotame"></a>

Giá trị thuộc tính type: `lotame`

Adds support for Lotame. More information and configuration details can be found at [my.lotame.com](https://my.lotame.com/t/83h37h9/overview-1st-party-data-collection-in-google-amp).

### Mapp Intelligence <a name="mapp-intelligence"></a>

Giá trị thuộc tính type: `mapp_intelligence`

Adds support for Mapp Intelligence tracking. More information and configuration details can be found at [docs.mapp.com](https://docs.mapp.com/pages/viewpage.action?pageId=10027966).

### Marin Software <a name="marin-software"></a>

Giá trị thuộc tính type: `marinsoftware`

### Médiamétrie <a name="m%C3%A9diam%C3%A9trie"></a>

Giá trị thuộc tính type: `mediametrie`

Adds support for Médiamétrie tracking pages. Requires defining *var* `serial`. Vars `level1` to `level4` are optional. More information can be found at [mediametrie.com](http://www.mediametrie.com/).

### mediarithmics <a name="mediarithmics"></a>

Giá trị thuộc tính type: `mediarithmics`

Adds support for mediarithmics. More information and configuration details can be found at `https://developer.mediarithmics.com`.

### Memo <a name="memo"></a>

Giá trị thuộc tính type: `memo`

### Metrika <a name="metrika"></a>

Giá trị thuộc tính type: `metrika`

### Moat Analytics <a name="moat-analytics"></a>

Giá trị thuộc tính type: `moat`

Adds support for Moat. Please contact your Moat representative for configuration details. More information on Moat can be found at [moat.com/analytics](https://moat.com/analytics).

### Mobify <a name="mobify"></a>

Giá trị thuộc tính type: `mobify`

Adds support for Mobify. More details for adding Mobify support can be found at [docs.mobify.com](https://docs.mobify.com/amp-sdk/latest/guides/amp-analytics/).

### MoEngage <a name="moengage"></a>

Giá trị thuộc tính type: `moengage`

### mParticle <a name="mparticle"></a>

Giá trị thuộc tính type: `mparticle`

Adds support for mParticle. More details for adding mParticle support can be found at [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp).

### Navegg <a name="navegg"></a>

Giá trị thuộc tính type: `navegg`

### New Relic <a name="new-relic"></a>

Giá trị thuộc tính type: `newrelic`

Adds support for New Relic Browser to measure AMP throughput and performance. By adding the `newrelic` attribute value you’ll need to add your `app ID` and `license key` from your New Relic Browser account to start capturing data. More details can be found on the New Relic Browser AMP docs page at [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser).

### Nielsen <a name="nielsen"></a>

Giá trị thuộc tính type: `nielsen`

Adds support for Nielsen DCR. Please contact your Nielsen representative to get set up with your `apid` as well as assist in defining the remaining parameters in the `vars` section. For more information, see [Nielsen's support documentation](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

### Nielsen Marketing Cloud <a name="nielsen-marketing-cloud"></a>

Giá trị thuộc tính type: `nielsen-marketing-cloud`

Adds support for Nielsen Marketing Cloud. More details can be found at [Nielsen Marketing Cloud](http://www.nielsen.com/us/en/solutions/capabilities/nielsen-marketing-cloud.html).

### OEWA <a name="oewa"></a>

Giá trị thuộc tính type: `oewa`

Adds support for `[OEWA](https://www.oewa.at)`. Requires a copy of [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) on a different subdomain than the including AMP file ([why?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). The file must be served via HTTPS. For example, if your AMP files are hosted on `www.example.com`, then `amp-analytics-oewa.html` needs to be on another subdomain such as `oewa-amp.example.com`. More details for adding OEWA support can be found [here](http://www.oewa.at/Implementierung).

Ngoài ra, những biến số sau phải được định nghĩa:

Trong phần `vars`:

- `s`: cung ứng
- `cp`: đường dẫn danh mục

Trong phần `requests`:

- `url`: vị trí HTTPS của `amp-analytics-oewa.html`

[tip type="note"] **LƯU Ý –** Có một biến thể mang tên `oewadirect` vốn không dùng đến giải pháp iframe-ping và có cách phát hiện máy khách tốt hơn bằng cách dùng `AMP CLIENT_ID`. Điều này hiện đang ở dạng THỬ NGHIỆM, và bị OEWA cấm vì nó không dùng `oewa2.js`. [/tip]

### Oracle Infinity Analytics <a name="oracle-infinity-analytics"></a>

Giá trị thuộc tính type: `oracleInfinityAnalytics`

### Parsely <a name="parsely"></a>

Giá trị thuộc tính type: `parsely`

Adds support for Parsely. Configuration details can be found at [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html).

### Permutive <a name="permutive"></a>

Giá trị thuộc tính type: `permutive`

Adds support for Permutive event collection. Additionally, the following `vars` must be defined:

- `namespace`: không gian tên AMP Permutive
- `key`: khoá API công khai của Permutive

Dùng `extraUrlParams` để thêm các thuộc tính bổ sung cho sự kiện. Chi tiết cấu hình đầy đủ có thể được tìm thấy tại [support.permutive.com](http://support.permutive.com).

### Pistats <a name="pistats"></a>

Giá trị thuộc tính type: `piStats`

### Piano <a name="piano"></a>

Giá trị thuộc tính type: `piano`

Adds support for Piano. Configuration details can be found at `http://vx.piano.io/javascript-tracking-amp`

### Pinpoll <a name="pinpoll"></a>

Giá trị thuộc tính type: `pinpoll`

Adds support for Pinpoll. Configuration details can be found at [pinpoll.com](https://pinpoll.com/).

### Pressboard <a name="pressboard"></a>

Giá trị thuộc tính type: `pressboard`

Adds support for Pressboard. Configuration details can be found at [help.pressboard.ca](http://help.pressboard.ca/publisher-resources/getting-started/implementing-google-amp).

### Quantcast Measurement <a name="quantcast-measurement"></a>

Giá trị thuộc tính type: `quantcast`

<!-- markdown-link-check-disable -->

Adds support for Quantcast Measurement. More details for adding Quantcast Measurement can be found at [quantcast.com](https://www.quantcast.com/help/guides/)

<!-- markdown-link-check-enable -->

### Rakam <a name="rakam"></a>

Giá trị thuộc tính type: `rakam`

### reppublika <a name="reppublika"></a>

Giá trị thuộc tính type: `reppublika`

### Retargetly <a name="retargetly"></a>

Giá trị thuộc tính type: `retargetly`

### RudderStack <a name="rudderstack"></a>

Giá trị thuộc tính type: `rudderstack`

Adds support for RudderStack page views and events. Find out more on the implementation check our documentation at `https://docs.rudderstack.com/sdk-integration-guide/getting-started-with-javascript-sdk/amp-analytics`.

### Segment <a name="segment"></a>

Giá trị thuộc tính type: `segment`

Adds support for segment page views and events. To see the full list of fields that you can send, see [Segment Spec](https://segment.com/docs/spec/).

### ShinyStat <a name="shinystat"></a>

Giá trị thuộc tính type: `shinystat`

### SOASTA mPulse <a name="soasta-mpulse"></a>

Giá trị thuộc tính type: `mpulse`

Adds support for [SOASTA mPulse](https://www.soasta.com/mPulse). Configuration details can be found at [docs.soasta.com](http://docs.soasta.com/).

### SimpleReach <a name="simplereach"></a>

Giá trị thuộc tính type: `simplereach`

Adds support for SimpleReach. Configuration details can be found at `http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation`.

### Snowplow Analytics <a name="snowplow-analytics"></a>

Giá trị thuộc tính type: `snowplow`, `snowplow_v2`

Adds support for Snowplow Analytics. More details for adding Snowplow Analytics support can be found at [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker).

### Tail <a name="tail"></a>

Type attribute value: `tail`

Adds support for Tail. More details for adding Tail support can be found at [tail.digital](https://tail.digital).

### Rambler/TOP-100 <a name="ramblertop-100"></a>

Giá trị thuộc tính type: `top100`

Adds support for Rambler/TOP-100. Configuration details can be found at [top100.rambler.ru](https://top100.rambler.ru).

### TEA Analytics <a name="tea-analytics"></a>

Giá trị thuộc tính type: `teaanalytics`

Adds support for TEA Analytics. More details for adding TEA Analytics support can contact with Kimberly (wuqian56@gmail.com).

### Tealium Collect <a name="tealium-collect"></a>

Giá trị thuộc tính type: `tealiumcollect`

Adds support for Tealium Collect. More details for adding Tealium Collect support can be found at [docs.tealium.com](https://docs.tealium.com/platforms/amp/install/).

### Top.Mail.Ru <a name="topmailru"></a>

Giá trị thuộc tính type: `topmailru`

Adds support for Top.Mail.Ru. Configuration details can be found at [Top.Mail.Ru Help](https://help.mail.ru/top/amp-analytics).

### Treasure Data <a name="treasure-data"></a>

Giá trị thuộc tính type: `treasuredata`

Adds support for Treasure Data. Configuration details can be found at `https://docs.treasuredata.com/articles/javascript-sdk-google-amp`.

### Umeng+ Analytics <a name="umeng-analytics"></a>

Giá trị thuộc tính type: `umenganalytics`

Adds support for Umeng+ Analytics. More details for adding Umeng+ Analytics support can be found at [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5).

### Upscore <a name="upscore"></a>

Giá trị thuộc tính type: `upscore`

### Vpon Analytics <a name="vpon-analytics"></a>

Giá trị thuộc tính type: `vponanalytics`

Adds support for Vpon Vpon Analytics. Configuration details can be found at [Vpon Analytics](https://cmp.vpadn.com/dmp/doc/amp_analytics.html).

### Webengage <a name="webengage"></a>

Thuộc tính type: `webengage`

### Webtrekk <a name="webtrekk"></a>

The attribute value ~~`webtrekk`~~ is deprecated (will remove on 31/12/2018) - use `webtrekk_v2` instead

Adds support for Webtrekk. Configuration details can be found at [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html).

### Yandex Metrica <a name="yandex-metrica"></a>

Giá trị thuộc tính type: `metrika`

Adds support for Yandex Metrica. Configuration details can be found at [Yandex Support](https://yandex.com/support/metrica/code/install-counter-amp.xml).
