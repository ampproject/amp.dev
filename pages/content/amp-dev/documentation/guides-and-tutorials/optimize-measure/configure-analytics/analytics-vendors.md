---
$title: Analytics Vendors
order: 3
formats:
  - websites
  - stories
  - ads
teaser:
  text: >-
    This document lists analytics vendors that have built-in configurations for
    use with the amp-analytics component.
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vendors-list.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!--
  Run to insert missing sections:
    amp check-analytics-vendors-list --fix

  (Some are intentionally commented-out and should be kept for the CI check.)
-->



This document lists analytics vendors that have built-in configurations for use with the [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics/) component.

Vendors that wish to integrate their service with [`<amp-analytics>`](https://amp.dev/documentation/components/amp-analytics/) should refer to the details in [Integrate your analytics tools with AMP](https://amp.dev/documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools).

<!--
### _fake_ <a name="_fake_"></a>

Type attribute value: `_fake_`
-->

### Acquia Lift <a name="acquia-lift"></a>

Type attribute value: `acquialift`

Adds support for Acquia Lift. The `decisionApiUrl`, `accountId` and `siteId` must be specified. More information about Acquia Lift can be found at [https://app.lift.acquia.com/](https://app.lift.acquia.com/).

### Adobe Analytics <a name="adobe-analytics"></a>

Type attribute value: `adobeanalytics`, `adobeanalytics_nativeConfig`

Adds support for Adobe Analytics. More details for adding Adobe Analytics support can be found at [experienceleague.adobe.com](https://experienceleague.adobe.com/docs/analytics/implementation/other/amp.html).

[tip type="important"]

Do not use both the `adobeanalytics` and `adobeanalytics_nativeConfig` types on the same page. If you attempt to do so, you can generate errors in the browser console and double-count visitors.

[/tip]

<!--
### adobeanalytics_nativeConfig (included above) <a name="adobeanalytics_nativeconfig-included-above"></a>

Type attribute value: `adobeanalytics_nativeConfig`
-->

### AFS Analytics <a name="afs-analytics"></a>

Type attribute value: `afsanalytics`

Adds support for AFS Analytics. Additionally, the `websiteid` and `server` variables must be specified. More details for adding AFS Analytics support can be found at [afsanalytics.com](https://www.afsanalytics.com/articles/developers/).

### Alexa Internet <a name="alexa-internet"></a>

Type attribute value: `alexametrics`

<!-- markdown-link-check-disable -->

Adds support for Alexa Certified Site Metrics. The `atrk_acct` and `domain` variables must be specified. More information can be found at [Alexa’s Certified Metrics FAQ](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics).

<!-- markdown-link-check-enable -->

### Amplitude <a name="amplitude"></a>

Type attribute value: `amplitude`

### AppsFlyer <a name="appsflyer"></a>

Type attribute value: `appsflyer`

<!-- markdown-link-check-disable -->

Adds support for AppsFlyer. More details for adding AppsFlyer support can be found at [appsflyer.com](https://support.appsflyer.com/hc/en-us/articles/360001610038#amp-support)

<!-- markdown-link-check-enable -->

### AT Internet <a name="at-internet"></a>

Type attribute value: `atinternet`

Adds support for AT Internet. More details for adding AT Internet support can be found at [developers.atinternet-solutions.com](https://developers.atinternet-solutions.com/as2-tagging-en/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/index.html).

### Baidu Analytics <a name="baidu-analytics"></a>

Type attribute value: `baiduanalytics`

<!-- markdown-link-check-disable -->

Adds support for Baidu Analytics. More details for adding Baidu Analytics support can be found at [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0).

<!-- markdown-link-check-enable -->

<!--
### bg.canary <a name="bgcanary"></a>

Type attribute value: `bg.canary`
-->

<!--
### bg <a name="bg"></a>

Type attribute value: `bg`
-->

### Black Crow AI <a name="black-crow-ai"></a>

Type attribute value: `blackcrowai`

Adds support for Black Crow AI. You are required to fill out the `site_name` variable which is assigned to you by your account manager. If you wish to send scores to Google, please also include your GA account ID (i.e. `UA-123401-1`).

### BlueConic <a name="blueconic"></a>

Type attribute value: `blueconic`

### Blue Triangle <a name="blue-triangle"></a>

Type attribute value: `bluetriangle`

<!-- markdown-link-check-disable -->

Adds support for blue Triangle. More details can be found at [help.bluetriangle.com](https://help.bluetriangle.com/hc/en-us/articles/1500006133061).

<!-- markdown-link-check-enable -->

### Browsi <a name="browsi"></a>

Type attribute value: `browsi`

### Burt <a name="burt"></a>

Type attribute value: `burt`

Adds support for Burt. Additionally, the `trackingKey` variable must be specified. It's also possible to specify the optional variables `category` and `subCategory`. More details can be found at [burtcorp.com](http://burtcorp.com).

### BySide <a name="byside"></a>

Type attribute value: `byside`

### Captain Metrics <a name="captain-metrics"></a>

Type attribute value: `captainmetrics`

### Chartbeat <a name="chartbeat"></a>

Type attribute value: `chartbeat`

Adds support for Chartbeat. More details for adding Chartbeat support can be found at [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp).

### Clicky Web Analytics <a name="clicky-web-analytics"></a>

Type attribute value: `clicky`

Adds support for Clicky Web Analytics. More details for adding Clicky support can be found at [clicky.com](https://clicky.com/help/apps-plugins).

### colanalytics <a name="colanalytics"></a>

Type attribute value: `colanalytics`

### comScore <a name="comscore"></a>

Type attribute value: `comscore`

Adds support for comScore Unified Digital Measurement™ pageview analytics. Requires defining _var_ `c2` with comScore-provided _c2 id_. More information can be found at [comscore.com](http://www.comscore.com).

### Cxense <a name="cxense"></a>

Type attribute value: `cxense`

<!-- markdown-link-check-disable -->

Adds support for Cxense Insight analytics. Requires defining _var_ `siteId` with Cxense-provided _siteId_. More details can be found at [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration).

<!-- markdown-link-check-enable -->

### Deep.BI <a name="deepbi"></a>

Type attribute value: `deepbi`

### EPICA <a name="epica"></a>

Type attribute value: `epica`

Adds support for EPICA page views and events.

### Eulerian Analytics <a name="eulerian-analytics"></a>

Type attribute value: `euleriananalytics`

Adds support for Eulerian Technologies Analytics. Requires defining _var_ `analyticsHost` with Eulerian delegated domain. More details can be found at [eulerian.wiki](https://eulerian.wiki).

### Facebook Pixel <a name="facebook-pixel"></a>

Type attribute value: `facebookpixel`

Adds support for the [Facebook Pixel](https://www.facebook.com/business/a/facebook-pixel). In your [`amp-analytics`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./amp-analytics.md) configuration, you must define your Pixel ID as `pixelId: YOUR-PIXEL-ID`. The events supported along with the corresponding event values that can be specified are detailed in the [Facebook Pixel developer documentation](https://developers.facebook.com/docs/facebook-pixel).

### Gemius <a name="gemius"></a>

Type attribute value: `gemius`

Adds support for Gemius Audience/Prism analytics. Additionally, the gemius-provided `prefix` and `identifier` variables must be specified. It's also possible to specify the optional variable `extraparams` (key1=value1|key2=value2). More details can be found at [gemius.com](https://www.gemius.com).

### GfK Sensic <a name="gfk-sensic"></a>

Type attribute value: `gfksensic`

Adds support for GfK Sensic audio stream usage analytics.
Please refer to our [client documentation](https://confluence-docu.gfk.com/display/SENSIC/AMP+Integration) for details.

### Google Ads <a name="google-ads"></a>

Type attribute value: `googleadwords`

Adds support for Google Ads conversion tracking and remarketing. See more details in the Google Ads help center for [conversion tracking](https://support.google.com/adwords/answer/1722054?hl=en) and [remarketing](https://support.google.com/adwords/answer/2453998?hl=en). Both tags can be used independent of each other.

### Google Analytics <a name="google-analytics"></a>

Type attribute value: `googleanalytics`

Adds support for Google Analytics. More details for adding Google Analytics support can be found at [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### gtag <a name="gtag"></a>

Type attribute value: `gtag`

### Google Tag Manager <a name="google-tag-manager"></a>

Type attribute value: N/A

Unlike other analytics vendors, Google Tag Manager is a tag management service, and does not require the `type` attribute. Google Tag Manager is [supported](https://developers.google.com/google-ads/amp/landing-pages#google_tag_manager) in AMP. Consult the Google Tag Manager documentation for [supported tags](https://support.google.com/tagmanager/answer/6106924) and for instructions on [adding Google Tag Manager to your AMP page](https://support.google.com/tagmanager/answer/6103696).

### Ibeat Analytics <a name="ibeat-analytics"></a>

Type attribute value: `ibeatanalytics`

Adds support for Ibeat Analytics.

<!-- markdown-link-check-disable -->

### INFOnline / IVW <a name="infonline--ivw"></a>

Type attribute value: `infonline`

Adds support for [INFOnline](https://www.infonline.de) / [IVW](http://www.ivw.de). Requires a copy of [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) on a different subdomain than the including AMP file ([why?](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md)). The file must be served via HTTPS. For example, if your AMP files are hosted on `www.example.com`, then `amp-analytics-infonline.html` needs to be on another subdomain such as `iframe.example.com` or `assets.example.com`.

<!-- markdown-link-check-enable -->

Additionally, the following variables must be defined:

-   `st`: offer ID
-   `co`: comment
-   `cp`: code
-   `url`: HTTPS location of `amp-analytics-infonline.html`

More details for adding INFOnline / IVW support can be found at [www.infonline.de](https://www.infonline.de/).

### INFOnline anonymous <a name="infonline-anonymous"></a>

Type attribute value: `infonline_anonymous`

Adds support for the [anonymous INFOnline](https://www.infonline.de). Requires a copy of [infonline-anonymous.html](https://www.infonline.de/amp/infonline-anonymous.html) on a different subdomain than the including AMP file ([why?](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md)). The file must be served via HTTPS. For example, if your AMP files are hosted on `www.example.com`, then `infonline-anonymous.html` needs to be on another subdomain such as `iframe.example.com` or `assets.example.com`.

Additionally, the following variables must be defined:

-   `st`: offer ID
-   `co`: comment
-   `cp`: code
-   `url`: HTTPS location of `infonline-anonymous.html`
-   `dn`: The relay domain name

More details for adding INFOnline anonymous support can be found at [www.infonline.de](https://www.infonline.de/).

### INFOnline base <a name="infonline-base"></a>

Type attribute value: `infonline_base`

Additionally, the following variables must be defined:

-   `st`: offer ID
-   `co`: comment
-   `cp`: code
-   `url`: HTTPS location of `amp.html` on the service platform or sub domain
-   `dn`: The relay domain name

More details for adding INFOnline anonymous support can be found at [www.infonline.de](https://www.infonline.de/).

### ip-label <a name="ip-label"></a>

Type attribute value: `iplabel`

### Keen <a name="keen"></a>

Type attribute value: `keen`

Adds support for Keen. Additionally, the following `vars` must be defined:

-   `projectId`: your project id
-   `writeKey`: your write key

Use `extraUrlParams` to add more data. Configuration details can be found at [keen.io/docs/api](https://keen.io/docs/api/).

### Kenshoo <a name="kenshoo"></a>

Type attribute value: `kenshoo`

<!-- markdown-link-check-disable -->

Adds support for Kenshoo. More information and configuration details can be found at [helpcenter.kenshoo.com](https://helpcenter.kenshoo.com/hc/en-us/articles/360025260592).

<!-- markdown-link-check-enable -->

### Krux <a name="krux"></a>

Type attribute value: `krux`

<!-- markdown-link-check-disable -->

Adds support for Krux. Configuration details can be found at [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608).

<!-- markdown-link-check-enable -->

### Linkpulse <a name="linkpulse"></a>

Type attribute value: `linkpulse`

Adds support for Linkpulse. Configuration details can be found at [docs.linkpulse.com](https://www.kilkaya.com/).

### Lotame <a name="lotame"></a>

Type attribute value: `lotame`

Adds support for Lotame. More information and configuration details can be found at [my.lotame.com](https://my.lotame.com/).

### Mapp Intelligence <a name="mapp-intelligence"></a>

Type attribute value: `mapp_intelligence`

Adds support for Mapp Intelligence tracking. More information and configuration details can be found at [docs.mapp.com](https://docs.mapp.com/v1/docs/en/accelerated-mobile-pages-amp).

### Marin Software <a name="marin-software"></a>

Type attribute value: `marinsoftware`

### Médiamétrie <a name="médiamétrie"></a>

Type attribute value: `mediametrie`

Adds support for Médiamétrie tracking pages. Requires defining _var_ `serial`. Vars `level1` to `level4` are optional. More information can be found at [mediametrie.com](http://www.mediametrie.com/).

### mediarithmics <a name="mediarithmics"></a>

Type attribute value: `mediarithmics`

Adds support for mediarithmics. More information and configuration details can be found at `https://developer.mediarithmics.com`.

### mediator <a name="mediator"></a>

Type attribute value: `mediator`

### Memo <a name="memo"></a>

Type attribute value: `memo`

### Yandex Metrica <a name="yandex-metrica"></a>

Type attribute value: `metrika`

Adds support for Yandex Metrica. Configuration details can be found at [Yandex Support](https://yandex.com/support/metrica/code/install-counter-amp.xml).

### Moat Analytics <a name="moat-analytics"></a>

Type attribute value: `moat`

Adds support for Moat. Please contact your Moat representative for configuration details. More information on Moat can be found at [https://docs.oracle.com/en/cloud/saas/data-cloud-moat/about_moat/moat_analytics_how_it_works.html](https://docs.oracle.com/en/cloud/saas/data-cloud-moat/about_moat/moat_analytics_how_it_works.html).

### Mobify <a name="mobify"></a>

Type attribute value: `mobify`

Adds support for Mobify. More details for adding Mobify support can be found at [docs.mobify.com](https://docs.mobify.com/amp-sdk/latest/guides/amp-analytics/).

### MoEngage <a name="moengage"></a>

Type attribute value: `moengage`

### mParticle <a name="mparticle"></a>

Type attribute value: `mparticle`

Adds support for mParticle. More details for adding mParticle support can be found at [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp).

### SOASTA mPulse <a name="soasta-mpulse"></a>

Type attribute value: `mpulse`

<!-- markdown-link-check-disable -->

Adds support for [SOASTA mPulse](https://www.soasta.com/mPulse). Configuration details can be found at [docs.soasta.com](http://docs.soasta.com/).

<!-- markdown-link-check-enable -->

### Navegg <a name="navegg"></a>

Type attribute value: `navegg`

### Neodata <a name="neodata"></a>

Type attribute value: `neodata`

Adds support for Neodata Audience Platform. Please contact our support team to get set up with your `sysId`, `tagId` and `advId` parameters in the `vars` section.

### New Relic <a name="new-relic"></a>

Type attribute value: `newrelic`

Adds support for New Relic Browser to measure AMP throughput and performance. By adding the `newrelic` attribute value you’ll need to add your `app ID` and `license key` from your New Relic Browser account to start capturing data. More details can be found on the New Relic Browser AMP docs page at [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser).

### Nielsen <a name="nielsen"></a>

Type attribute value: `nielsen`

Adds support for Nielsen DCR. Please contact your Nielsen representative to get set up with your `apid` as well as assist in defining the remaining parameters in the `vars` section. For more information, see [Nielsen's support documentation](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

### Nielsen Marketing Cloud <a name="nielsen-marketing-cloud"></a>

Type attribute value: `nielsen-marketing-cloud`

Adds support for Nielsen Marketing Cloud. More details can be found at [Nielsen Marketing Cloud](https://www.nielsen.com/solutions/media-planning/marketing-cloud/).

### OEWA <a name="oewa"></a>

Type attribute value: `oewa`

<!-- markdown-link-check-disable -->

Adds support for [OEWA](http://www.oewa.at). Requires a copy of [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) on a different subdomain than the including AMP file ([why?](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md)). The file must be served via HTTPS. For example, if your AMP files are hosted on `www.example.com`, then `amp-analytics-oewa.html` needs to be on another subdomain such as `oewa-amp.example.com`. More details for adding OEWA support can be found [here](http://www.oewa.at/Implementierung).

<!-- markdown-link-check-enable -->

Additionally, the following variables must be defined:

In the `vars` section:

-   `s`: offer
-   `cp`: category path

In the `requests` section:

-   `url`: HTTPS location of `amp-analytics-oewa.html`

### oewadirect <a name="oewadirect"></a>

Type attribute value: `oewadirect`

[tip type="important"]

This is a variation of `oewa` that does not use the iframe-ping solution and has a better client detection by using `AMP CLIENT_ID`. This is currently EXPERIMENTAL, and prohibited by the OEWA because it does not use `oewa2.js`.

[/tip]

### Oracle Infinity Analytics <a name="oracle-infinity-analytics"></a>

Type attribute value: `oracleInfinityAnalytics`

### Parsely <a name="parsely"></a>

Type attribute value: `parsely`

Adds support for Parsely. Configuration details can be found at [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html).

### Permutive <a name="permutive"></a>

Type attribute value: `permutive`

Adds support for Permutive event collection. Additionally, the following `vars` must be defined:

-   `namespace`: your Permutive AMP namespace
-   `key`: your Permutive public API key
    <!-- markdown-link-check-disable -->
    Use `extraUrlParams` to add additional event properties. Full configuration details can be found at [support.permutive.com](https://support.permutive.com/hc/en-us).
    <!-- markdown-link-check-enable -->

### Permutive-ampscript <a name="permutive-ampscript"></a>

Type attribute value: `permutive-ampscript`

Adds support for Permutive event collection via the Permutive SDK running inside `amp-script`. This is a newer version of the `Permutive` configuration mentioned above. It will soon replace the old configuration.

<!-- markdown-link-check-disable -->

To add additional properties to Permutive events use the `extraUrlParams` property and use the `customProperties` key to define any custom properties. The value should be a valid json object. Full configuration details can be found at [support.permutive.com](https://support.permutive.com/hc/en-us).

<!-- markdown-link-check-enable -->

### Piano <a name="piano"></a>

Type attribute value: `piano`

<!--
(The following link 404s, it's unclear whether vendor is still supported or if docs are now private.)

Adds support for Piano. Configuration details can be found at `http://vx.piano.io/javascript-tracking-amp`
-->

### Pinpoll <a name="pinpoll"></a>

Type attribute value: `pinpoll`

Adds support for Pinpoll. Configuration details can be found at [pinpoll.com](https://pinpoll.com/).

### Pistats <a name="pistats"></a>

Type attribute value: `piStats`

### Piwik PRO Analytics Suite <a name="piwik-pro-analytics-suite"></a>

Type attribute value: `ppasanalytics`

Adds support for Piwik PRO Analytics Suite. Configuration details can be found at [piwik.pro](https://developers.piwik.pro/en/latest/integrations/AMP_integration.html).

### Pressboard <a name="pressboard"></a>

Type attribute value: `pressboard`

Adds support for Pressboard. Configuration details can be found at [help.pressboardmedia.com](https://help.pressboardmedia.com/implementing-google-amp).

### Quantcast Measurement <a name="quantcast-measurement"></a>

Type attribute value: `quantcast`

<!-- markdown-link-check-disable -->

Adds support for Quantcast Measurement. More details for adding Quantcast Measurement can be found at [quantcast.com](https://www.quantcast.com/help/guides/)

<!-- markdown-link-check-enable -->

### Rakam <a name="rakam"></a>

Type attribute value: `rakam`

### reppublika <a name="reppublika"></a>

Type attribute value: `reppublika`

### Retargetly <a name="retargetly"></a>

Type attribute value: `retargetly`

### RudderStack <a name="rudderstack"></a>

Type attribute value: `rudderstack`

<!-- markdown-link-check-disable -->

Adds support for RudderStack page views and events.
Find out more on the implementation check our documentation at [docs.rudderstack.com](https://docs.rudderstack.com/rudderstack-sdk-integration-guides/amp-analytics).

<!-- markdown-link-check-enable -->

### Segment <a name="segment"></a>

Type attribute value: `segment`

Adds support for segment page views and events.
To see the full list of fields that you can send, see [Segment Spec](https://segment.com/docs/connections/spec/).

### SensorsData <a name="sensorsdata"></a>

Type attribute value: `sensorsanalytics`

Adds support for Sensors Data. More details for adding Sensors Data support can be found at [sensorsdata.com](https://manual.sensorsdata.cn/).

### ShinyStat <a name="shinystat"></a>

Type attribute value: `shinystat`

### Snowplow Analytics <a name="snowplow-analytics"></a>

Type attribute value: `snowplow`, `snowplow_v2`

Adds support for Snowplow Analytics. More details for adding Snowplow Analytics support can be found at [docs.snowplowanalytics.com](https://docs.snowplowanalytics.com/docs/collecting-data/collecting-from-own-applications/google-amp-tracker/).

<!--
### snowplow_v2 (included above) <a name="snowplow_v2-included-above"></a>

Type attribute value: `snowplow_v2`
-->

### subscriptions-propensity <a name="subscriptions-propensity"></a>

Type attribute value: `subscriptions-propensity`

### Taboola <a name="taboola"></a>

Type attribute value: `taboola`

Adds support for Taboola. More details for adding Taboola support can be found at [Taboola](https://taboola.com).

### Tail <a name="tail"></a>

Type attribute value: `tail`

Adds support for Tail. More details for adding Tail support can be found at [tail.digital](https://tail.digital).

### TEA Analytics <a name="tea-analytics"></a>

Type attribute value: `teaanalytics`

Adds support for TEA Analytics. More details for adding TEA Analytics support can contact with Kimberly (wuqian56@gmail.com).

### Tealium Collect <a name="tealium-collect"></a>

Type attribute value: `tealiumcollect`

Adds support for Tealium Collect. More details for adding Tealium Collect support can be found at [docs.tealium.com](https://docs.tealium.com/platforms/amp/install/).

### Rambler/TOP-100 <a name="ramblertop-100"></a>

Type attribute value: `top100`

Adds support for Rambler/TOP-100. Configuration details can be found at [top100.rambler.ru](https://top100.rambler.ru).

### Top.Mail.Ru <a name="topmailru"></a>

Type attribute value: `topmailru`

Adds support for Top.Mail.Ru. Configuration details can be found at [Top.Mail.Ru Help](https://top.mail.ru/help/en/code/amp).

### Treasure Data <a name="treasure-data"></a>

Type attribute value: `treasuredata`

Adds support for Treasure Data. Configuration details can be found at [docs.treasuredata.com](https://docs.treasuredata.com/display/public/INT/Google+Accelerated+Mobile+Pages+AMP).

### Triboo Data Analytics <a name="triboo-data-analytics"></a>

Type attribute value: `tribooanalytics`

### Umeng+ Analytics <a name="umeng-analytics"></a>

Type attribute value: `umenganalytics`

Adds support for Umeng+ Analytics. More details for adding Umeng+ Analytics support can be found at [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5).

### Upscore <a name="upscore"></a>

Type attribute value: `upscore`

### Vpon Analytics <a name="vpon-analytics"></a>

Type attribute value: `vponanalytics`

Adds support for Vpon Analytics. Configuration details can be found at [Vpon Analytics](https://cmp.vpadn.com/dmp/doc/amp_analytics.html).

### Webengage <a name="webengage"></a>

Type attribute value: `webengage`.

<!--
### webtrekk (deprecated, see below) <a name="webtrekk-deprecated-see-below"></a>

Type attribute value: `webtrekk`
-->

### Webtrekk <a name="webtrekk"></a>

Type attribute value: `webtrekk_v2`

[tip type="important"]

<span style="text-decoration: line-through;">`webtrekk`</span> is deprecated. **Use `webtrekk_v2` instead.**

[/tip]