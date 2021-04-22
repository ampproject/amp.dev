---
$title: 分析工具供应商
---

本文档列出了具有可与 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 组件配合使用的内置配置的分析工具供应商。

要向第三方供应商发送分析数据，请执行以下操作：

1. 在 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 标记中，添加 `type` 属性并将其值设为指定的供应商，如下方[供应商](#vendors)部分所述。
2. 确定要捕获和跟踪哪些数据，并在配置数据中指定这些详细信息。有关如何捕获分析数据的说明，请参阅供应商的文档。

在下面的示例中，我们将网页浏览数据发送到 [Google Analytics（分析）](#google-analytics)（一个内置了 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 相关配置的第三方分析提供商）：

```html
<amp-analytics type="googleanalytics" id="analytics1">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

[tip type="success"]

如果您喜欢研究代码，可以在 [`vendors.js`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/0.1/vendors.js) 文件中探索原始配置。

[/tip]

[tip type="note"]

对于希望将其服务与 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)一文中的详细信息。

[/tip]

<hr>

## 供应商 <a name="vendors"></a>

### Acquia Lift

type 属性值：`acquialift`

添加对 Acquia Lift 的支持。必须指定 `decisionApiUrl`、`accountId` 和 `siteId`。要详细了解 Acquia Lift，请访问 [https://docs.acquia.com/lift](https://docs.acquia.com/lift)。

### Adobe Analytics

type 属性值：`adobeanalytics`

添加对 Adobe Analytics 的支持。要详细了解如何添加 Adobe Analytics 支持，请访问 [marketing.adobe.com](https://marketing.adobe.com/resources/help/zh_CN/sc/implement/accelerated-mobile-pages.html)。

### AFS Analytics

type 属性值：`afsanalytics`

添加对 AFS Analytics 的支持。此外，必须指定 `websiteid` 和 `server` 变量。要详细了解如何添加 AFS Analytics 支持，请访问 [afsanalytics.com](https://www.afsanalytics.com/articles/developers/)。

### Alexa Internet

type 属性值：`alexametrics`

添加对 Alexa Certified Site Metrics 的支持。必须指定 `atrk_acct` 和 `domain` 变量。有关详情，请参阅 [Alexa 的认证指标常见问题解答](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics)。

### AT Internet

type 属性值：`atinternet`

添加对 AT Internet 的支持。要详细了解如何添加 AT Internet 支持，请访问 [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/)。

### 百度统计 (Baidu Analytics)

type 属性值：`baiduanalytics`

添加对百度统计的支持。要详细了解如何添加百度统计支持，请访问 [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0)。

### Burt

type 属性值：`burt`

添加对 Burt 的支持。此外，必须指定 `trackingKey` 变量，还可以指定可选变量 `category` 和 `subCategory`。有关详情，请访问 [burtcorp.com](http://burtcorp.com)。

### Chartbeat

type 属性值：`chartbeat`

添加对 Chartbeat 的支持。要详细了解如何添加 Chartbeat 支持，请访问 [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp)。

### Clicky Web Analytics

type 属性值：`clicky`

添加对 Clicky Web Analytics 的支持。要详细了解如何添加 Clicky 支持，请访问 [clicky.com](https://clicky.com/help/apps-plugins)。

### comScore

type 属性值：`comscore`

添加对 comScore Unified Digital Measurement™ 网页浏览分析工具的支持。需要使用 comScore 提供的 c2 id 定义变量 `c2`。有关详情，请访问 [comscore.com](http://www.comscore.com)。

### Cxense

type 属性值：`cxense`

添加对 Cxense Insight 分析工具的支持。需要使用 Cxense 提供的 siteId 定义变量 `siteId`。有关详情，请访问 [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration)。

### Dynatrace

type 属性值：`dynatrace`

添加对 Dynatrace 真实用户监控功能的支持。需要使用 Dynatrace 提供的应用 ID 定义变量 `app`，并使用 Dynatrace 提供的环境标识符定义变量 `tenant`。要详细了解如何添加 Dynatrace 真实用户监控功能，请访问 [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/)。

### Eulerian Analytics

type 属性值：`euleriananalytics`

添加对 Eulerian Technologies Analytics 的支持。需要使用 Eulerian 委托的网域定义变量 `analyticsHost`。有关详情，请访问 [eulerian.wiki](https://eulerian.wiki)。

### Facebook Pixel

type 属性值：`facebookpixel`

添加对 [Facebook Pixel](https://www.facebook.com/business/a/facebook-pixel) 的支持。在您的 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 配置中，您必须将 Pixel ID 设定为 `pixelId: YOUR-PIXEL-ID`。要详细了解受支持的事件以及可以指定的相应事件值，请参阅 [Facebook Pixel 开发者文档](https://developers.facebook.com/docs/ads-for-websites/pixel-events)。

### Gemius

type 属性值：`gemius`

添加对 Gemius Audience/Prism Analytics 的支持。此外，必须指定 gemius 提供的 `prefix` 和 `identifier` 变量，还可以指定可选变量 `extraparams` (key1=value1|key2=value2)。有关详情，请访问 [gemius.com](https://www.gemius.com)。

### Google AdWords

type 属性值：`googleadwords`

添加对 Google AdWords 转化跟踪和再营销功能的支持。要详细了解[转化跟踪](https://support.google.com/adwords/answer/1722054?hl=zh-CN)和[再营销](https://support.google.com/adwords/answer/2453998?hl=zh-CN)，请访问 AdWords 帮助中心。这两种代码均可独立使用。

### Google Analytics <a name="google-analytics"></a>

type 属性值：`googleanalytics`

添加对 Google Analytics（分析）的支持。要详细了解如何添加 Google Analytics（分析）支持，请访问 [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/)。

### INFOnline/IVW

type 属性值：`infonline`

添加对 [INFOnline](https://www.infonline.de)/[IVW](http://www.ivw.de) 的支持。需要一个 [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) 副本，且该副本必须位于不同于 AMP 文件所在网域的子网域上（[为什么？](https://github.com/ampproject/amphtml/blob/main/spec/amp-iframe-origin-policy.md)）。该文件必须通过 HTTPS 提供。例如，如果您的 AMP 文件托管在 `www.example.com` 上，则 `amp-analytics-infonline.html` 必须位于其他子网域（例如 `iframe.example.com` 或 `assets.example.com`）上。

此外，还必须定义以下变量：

* `st`：服务 ID
* `co`：注释
* `cp`：代码
* `url`：`amp-analytics-infonline.html` 的 HTTPS 位置

要详细了解如何添加 INFOnline/IVW 支持，请访问 [www.infonline.de](https://www.infonline.de/downloads/web-mew-und-ctv/)。

### Krux

type 属性值：`krux`

添加对 Krux 的支持。有关配置详情，请访问 [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608)。

### Linkpulse

type 属性值：`linkpulse`

添加对 Linkpulse 的支持。有关配置详情，请访问 [docs.linkpulse.com](http://docs.linkpulse.com)。

### Lotame

type 属性值：`lotame`

添加对 Lotame 的支持。有关详情和配置详细信息，请访问 [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP)。

### Médiamétrie

type 属性值：`mediametrie`

添加对 Médiamétrie 网页跟踪工具的支持。需要定义变量 `serial`。变量 `level1` 至 `level4` 为可选变量。有关详情，请访问 [mediametrie.com](http://www.mediametrie.com/)。

### mediarithmics

type 属性值：`mediarithmics`

添加对 mediarithmics 的支持。有关详情和配置详细信息，请访问 [developer.mediarithmics.com](https://developer.mediarithmics.com/)。

### mParticle

type 属性值：`mparticle`

添加对 mParticle 的支持。要详细了解如何添加 mParticle 支持，请访问 [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp)。

### New Relic

type 属性值：`newrelic`

添加对 New Relic Browser 的支持，以衡量 AMP 吞吐量和表现。添加 `newrelic` 属性值时，需要添加 `app ID` 和 `license key`（需登录您的 New Relic Browser 帐号获取），才能开始捕获数据。有关详情，请访问 New Relic Browser AMP 文档页面 [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser)。

### Nielsen

type 属性值：`nielsen`

添加对 Nielsen DCR 的支持。请与您的 Nielsen 代表联系，以设置 `apid` 并获取定义 `vars` 部分剩余参数方面的帮助。有关详情，请参阅 [Nielsen 的支持文档](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API)。

### Nielsen Marketing Cloud

type 属性值：`nielsen-marketing-cloud`

添加对 Nielsen Marketing Cloud 的支持。有关详情，请访问 [Nielsen Marketing Cloud](http://www.nielsen.com/us/en/solutions/capabilities/nielsen-marketing-cloud.html)。

### OEWA

type 属性值：`oewa`

添加对 [OEWA](https://www.oewa.at) 的支持。需要一个 [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) 副本，且该副本必须位于不同于 AMP 文件所在网域的子网域上（[为什么？](https://github.com/ampproject/amphtml/blob/main/spec/amp-iframe-origin-policy.md)）。该文件必须通过 HTTPS 提供。例如，如果您的 AMP 文件托管在 `www.example.com` 上，则 `amp-analytics-oewa.html` 必须位于其他子网域（例如 `oewa-amp.example.com`）上。要详细了解如何添加 OEWA 支持，请点击[此处](http://www.oewa.at/Implementierung)。

此外，还必须定义以下变量：

在 `vars` 部分中：

- `s`：服务
- `cp`：类别路径

在 `requests` 部分中：

- `url`：`amp-analytics-oewa.html` 的 HTTPS 位置

[tip type="note"]

有一个名为 `oewadirect` 的变量，它不使用 iframe-ping 解决方案，但可以使用 `AMP CLIENT_ID` 更高效地检测客户端。该变量目前仍处于试验阶段，而且由于它不使用 `oewa2.js`，已被 OEWA 禁用。

[/tip]

### Parsely

type 属性值：`parsely`

添加对 Parsely 的支持。有关配置详情，请访问 [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html)。

### Piano

type 属性值：`piano`

添加对 Piano 的支持。有关配置详情，请访问 [vx.piano.io](http://vx.piano.io/javascript-tracking-amp)。

### Quantcast Measurement

type 属性值：`quantcast`

添加对 Quantcast Measurement 的支持。要详细了解如何添加 Quantcast Measurement 支持，请访问 [quantcast.com](https://www.quantcast.com/help/guides/)

### Segment

type 属性值：`segment`

添加对 Segment 网页浏览和事件的支持。
要查看可以发送的字段的完整列表，请参阅 [Segment 规范](https://segment.com/docs/spec/)。

### SOASTA mPulse

type 属性值：`mpulse`

添加对 [SOASTA mPulse](https://www.soasta.com/mPulse) 的支持。有关配置详情，请访问 [docs.soasta.com](http://docs.soasta.com/)。

### SimpleReach

type 属性值：`simplereach`

添加对 SimpleReach 的支持。有关配置详情，请访问 [simplereach.com/docs](http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation)。

### Snowplow Analytics

type 属性值：`snowplow`

添加对 Snowplow Analytics 的支持。要详细了解如何添加 Snowplow Analytics 支持，请访问 [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker)。

### Rambler/TOP-100

type 属性值：`top100`

添加对 Rambler/TOP-100 的支持。有关配置详情，请访问 [top100.rambler.ru](https://top100.rambler.ru/docs)。

### TEA Analytics

type 属性值：`teaanalytics`

添加对 TEA Analytics 的支持。有关配置详情，请联系 Kimberly (wuqian56@gmail.com)。

### Top.Mail.Ru

type 属性值：`topmailru`

添加对 Top.Mail.Ru 的支持。有关配置详情，请参阅 [Top.Mail.Ru 帮助](https://help.mail.ru/top/amp-analytics)。

### Umeng+ Analytics

type 属性值：`umenganalytics`

添加对 Umeng+ Analytics 的支持。要详细了解如何添加 Umeng+ Analytics 支持，请访问 [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5)。

### Treasure Data

type 属性值：`treasuredata`

添加对 Treasure Data 的支持。有关配置详情，请访问 [treasuredata.com](https://docs.treasuredata.com/articles/javascript-sdk-google-amp)。

### Webtrekk

属性值 ~~`webtrekk`~~ 已被弃用（将于 2018 年 12 月 31 日被移除），请改用 `webtrekk_2`

添加对 Webtrekk 的支持。有关配置详情，请访问 [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/cn/public/amp-analytics.html)。

### Yandex Metrica

type 属性值：`metrika`

添加对 Yandex Metrica 的支持。有关配置详情，请参阅 [Yandex 支持](https://yandex.com/support/metrica/code/install-counter-amp.xml)。

### Vpon Analytics

Type attribute value: `vponanalytics`

添加对 Vpon Analytics 的支持。有关配置详情，请参阅 [Vpon Analytics](https://cmp.vpadn.com/dmp/doc/amp_analytics.html).
