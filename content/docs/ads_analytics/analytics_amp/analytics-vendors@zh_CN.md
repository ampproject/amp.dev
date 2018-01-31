---
$title: 分析数据供应商
$order: 4
toc: true
---
[TOC]

 本文档所列的是内置了可与 [`amp-analytics`](/docs/reference/components/amp-analytics.html) 组件结合使用的配置的分析数据供应商。

通过使用 `type` 属性指定分析数据供应商的名称，您可以快速配置 `amp-analytics` 以使用相应的产品。不过，您可能仍需要进行其他配置（例如您的用户 ID）。

 请参阅您的供应商提供的文档（下文中可能提供了相应链接）。此外，您还可以查看 [vendors.js](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/0.1/vendors.js) 文件，获取有关每个供应商相应配置的更多信息。

**示例：**

以下代码段为某个名为 `XYZ` 的分析数据供应商指定了 `type`：

```html
<amp-analytics type="XYZ">  ...</amp-analytics>
```


{% call callout('阅读', type='read') %}
 详细了解如何使用 [`amp-analytics`](/zh_cn/docs/reference/components/amp-analytics.html) 
跟踪分析数据。{% endcall %}

## 供应商

### Acquia Lift

type 属性值：`acquialift`

 添加对 Acquia Lift 的支持。必须指定 `decisionApiUrl`、`accountId` 和 `siteId`。要详细了解 Acquia Lift，请访问[https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics

type 属性值：`adobeanalytics`

 添加对 Adobe Analytics 的支持。要详细了解如何添加 Adobe Analytics 支持，请访问 [marketing.adobe.com](https://marketing.adobe.com/resources/help/zh_CN/sc/implement/accelerated-mobile-pages.html)。

### AFS Analytics

type 属性值：`afsanalytics`

 添加对 AFS Analytics 的支持。此外，还必须指定 `websiteid` 和 `server` 变量。要详细了解如何添加 AFS Analytics 支持，请访问 [afsanalytics.com](https://www.afsanalytics.com/articles/developers/)。

### AT Internet

type 属性值：`atinternet`

 添加对 AT Internet 的支持。要详细了解如何添加 AT Internet 支持，请访问 [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/)。

### Baidu Analytics

type 属性值：`baiduanalytics`

 添加对 Baidu Analytics 的支持。要详细了解如何添加 Baidu Analytics 支持，请访问 [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0)。

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

 添加对 comScore Unified Digital Measurement&trade; 网页浏览分析的支持。需要使用 comScore 提供的 `c2` id 定义*变量*  *c2 id* 。有关详情，请访问 [comscore.com](http://www.comscore.com)。

### Cxense

type 属性值：`cxense`

 添加对 Cxense Insight Analytics 的支持。需要使用 Cxense 提供的 `siteId` 定义*变量*  *siteId* 。有关详情，请访问 [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration)。

### Dynatrace

type 属性值：`dynatrace`

 添加对 Dynatrace 真实用户监控功能的支持。需要使用 Dynatrace 提供的应用 ID 定义*变量*  `app`*application id*  并使用 Dynatrace 提供的环境标识符定义*变量*  `tenant`*environment identifier* 。要详细了解如何添加 Dynatrace 真实用户监控功能，请访问 [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/)。

### Eulerian Analytics

type 属性值：`euleriananalytics`

 添加对 Eulerian Technologies Analytics 的支持。需要使用 Eulerian 代理网域定义*变量*  `analyticsHost`。有关详情，请访问 [eulerian.wiki](https://eulerian.wiki)。

### Gemius

type 属性值：`gemius`

 添加对 Gemius Audience/Prism Analytics 的支持。此外，必须指定 Gemius 提供的 `prefix` 和 `identifier` 变量，还可以指定可选变量 `extraparams` (key1=value1|key2=value2)。有关详情，请访问 [gemius.com](https://www.gemius.com)。

### Google AdWords

type 属性值：`googleadwords`

 添加对 Google AdWords 转化跟踪和再营销功能的支持。要详细了 [解转化跟踪](https://support.google.com/adwords/answer/1722054?hl=en)  和[再营销] (https://support.google.com/adwords/answer/2453998?hl=en)，请访问 AdWords 帮助中心。这两种代码均可独立使用。

### Google Analytics（分析）

type 属性值：`googleanalytics`

 添加对 Google Analytics（分析）的支持。要详细了解如何添加 Google Analytics（分析）支持，请访问[developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/)。

### INFOnline/IVW

type 属性值：`infonline`

 添加对 [INFOnline](https://www.infonline.de)  /[IVW](http://www.ivw.de) 的支持。要求 [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) 的副本必须位于不同于 AMP 文件所在网域的子网域上（[为什么](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)。文件必须通过 HTTPS 提供。例如，如果您的 AMP 文件托管在 `www.example.com` 上，则 `amp-analytics-infonline.html` 必须位于其他子网域（例如 `iframe.example.com` 或 `assets.example.com`）上。

此外，还必须定义以下变量：

* `st`：Angebotskennung
* `co`：评论
* `cp`：代码
* `url`：`amp-analytics-infonline.html` 的 HTTPS 位置

 要详细了解如何添加 INFOnline/IVW 支持，请访问 [www.infonline.de](https://www.infonline.de/downloads/web-mew-und-ctv/)。

### Krux

type 属性值：`krux`

 添加对 Krux 的支持。有关配置的详情，请访问 [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608)。

### Linkpulse

type 属性值：`linkpulse`

 添加对 Linkpulse 的支持。有关配置的详情，请访问 [docs.linkpulse.com](http://docs.linkpulse.com)。

### Lotame

type 属性值：`lotame`

 添加对 Lotame 的支持。有关详情和配置详细信息，请访问 [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP)。

### Médiamétrie

type 属性值：`mediametrie`

 添加对 Médiamétrie 跟踪网页功能的支持。需要定义*变量*  `serial`。变量 `level1` 到 `level4` 为可选变量。有关详情，请访问 [mediametrie.com](http://www.mediametrie.com/)。

### mParticle

type 属性值：`mparticle`

 添加对 mParticle 的支持。要详细了解如何添加 mParticle 支持，请访问 [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp)。

### Nielsen

type 属性值：`nielsen`

 添加对 Nielsen DCR 的支持。请与您的 Nielsen 代表联系，以设置您的 `apid`，并在定义 `vars` 部分中的剩余参数时获取相关帮助。要了解详情，请参阅 [Nielsen 的支持文档](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API)。

### OEWA

type 属性值：`oewa`

 添加对 [OEWA](https://www.oewa.at) 的支持。要求 [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) 的副本必须位于不同于 AMP 文件所在网域的子网域上（[为什么](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)）。文件必须通过 HTTPS 提供。例如，如果您的 AMP 文件托管在 `www.example.com` 上，则 `amp-analytics-oewa.html` 必须位于其他子网域（例如 `oewa-amp.example.com`）上。要详细了解如何添加 OEWA 支持，[请点击此处](http://www.oewa.at/basic/implementierung)。

此外，还必须定义以下变量：

在 `vars` 部分中：

- `s`：优惠
- `cp`：类别路径

在 `requests` 部分中：

- `url`：`amp-analytics-oewa.html` 的 HTTPS 位置

{% call callout('注意', type='caution') %}
有一个名为 `oewadirect` 的变量，它不使用 iframe-ping 解决方案，但可使用 `AMP CLIENT_ID` 更高效地检测客户端。该变量目前仍处于试验阶段，而且由于它不使用 `oewa2.js`，OEWA 不允许使用该变量。
{% endcall %}

### Parsely

type 属性值：`parsely`

 添加对 Parsely 的支持。有关配置的详情，请访问 [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html)。

### Piano

type 属性值：`piano`

 添加对 Piano 的支持。有关配置的详情，请访问 [vx.piano.io](http://vx.piano.io/javascript-tracking-amp)。

### Quantcast Measurement

type 属性值：`quantcast`

 添加对 Quantcast Measurement 的支持。要详细了解如何添加 Quantcast Measurement 支持，请访问 [quantcast.com](https://www.quantcast.com/help/guides/)

### Segment

type 属性值：`segment`

 添加对 Segment 网页浏览和事件的支持。要查看您可以发送的字段的完整列表，请参阅 [Segment 规范](https://segment.com/docs/spec/)。

### SOASTA mPulse

type 属性值：`mpulse`

 添加对 [SOASTA mPulse](https://www.soasta.com/mPulse) 的支持。有关配置的详情，请访问 [docs.soasta.com](http://docs.soasta.com/)。

### SimpleReach

type 属性值：`simplereach`

 添加对 SimpleReach 的支持。有关配置的详情，请访问 [simplereach.com/docs](http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation)。

### Snowplow Analytics

type 属性值：`snowplow`

 添加对 Snowplow Analytics 的支持。要详细了解如何添加 Snowplow Analytics 支持，请访问[github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker)。

### Rambler/TOP-100

type 属性值：`top100`

 添加对 Rambler/TOP-100 的支持。有关配置的详情，请访问 [top100.rambler.ru](https://top100.rambler.ru/docs).

### Webtrekk

type 属性值：`webtrekk`

 添加对 Webtrekk 的支持。有关配置的详情，请访问 [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html)。

### Yandex Metrica

type 属性值：`metrika`

 添加对 Yandex Metrica 的支持。有关配置的详情，请访问 [Yandex Support](https://yandex.com/support/metrica/code/install-counter-amp.xml)。

