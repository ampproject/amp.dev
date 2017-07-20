---
$title: "分析ベンダー"
$order: 4
toc: true
---

[TOC]

こちらで取り上げている分析ベンダーについては、[amp-analytics](/ja/docs/reference/components/amp-analytics.html) コンポーネントで使用する組み込みの設定があります。

`type` 属性を使って分析ベンダーの名前を指定することにより、すぐに `amp-analytics` を設定してそれぞれのプロダクトを利用できます。追加の設定（ユーザー ID など）が必要な場合もあります。

ご利用のベンダーのドキュメント（以下のセクションでリンクが記載されているものもあります）をご覧ください。また、[vendors.js](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/0.1/vendors.js) ファイルでも、各ベンダーの設定の詳細をご確認いただけます。

**例:**

次のスニペットでは、`type` に `XYZ` という分析ベンダーを指定しています。

```html
<amp-analytics type="XYZ"> ... </amp-analytics>
```

{% call callout('参考情報', type='read') %}
トラッキング分析について詳しくは、[amp-analytics](/ja/docs/reference/components/amp-analytics.html) に関する説明をご覧ください
{% endcall %}

## ベンダー

### Acquia Lift

type 属性の値: `acquialift`

この値を指定すると、Acquia Lift を利用できるようになります。`decisionApiUrl`、`accountId`、`siteId` を指定する必要があります。Acquia Lift について詳しくは、次のサイトをご覧ください。[https://docs.acquia.com/lift](https://docs.acquia.com/lift)

### Adobe Analytics

type 属性の値: `adobeanalytics`

この値を指定すると、Adobe Analytics を利用できるようになります。Adobe Analytics の利用を有効にする方法について詳しくは、[marketing.adobe.com](https://marketing.adobe.com/resources/help/en_US/sc/implement/accelerated-mobile-pages.html) をご覧ください。

### AFS Analytics

type 属性の値: `afsanalytics`

この値を指定すると、AFS Analytics を利用できるようになります。さらに、`websiteid` 変数と `server` 変数も指定する必要があります。AFS Analytics の利用を有効にする方法について詳しくは、[afsanalytics.com](https://www.afsanalytics.com/articles/developers/) をご覧ください。

### AT Internet

type 属性の値: `atinternet`

この値を指定すると、AT Internet を利用できるようになります。AT Internet の利用を有効にする方法について詳しくは、[developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/) をご覧ください。

### Baidu Analytics

type 属性の値: `baiduanalytics`

この値を指定すると、Baidu Analytics を利用できるようになります。Baidu Analytics の利用を有効にする方法について詳しくは、[tongji.baidu.com](http://tongji.baidu.com/web/help/article?id=268&type=0) をご覧ください。

### Burt

type 属性の値: `burt`

この値を指定すると、Burt を利用できるようになります。さらに、`trackingKey` 変数も指定する必要があります。オプションの変数として `category` や `subCategory` を指定することもできます。詳しくは [burtcorp.com](http://burtcorp.com) をご覧ください。

### Chartbeat

type 属性の値: `chartbeat`

この値を指定すると、Chartbeat を利用できるようになります。Chartbeat の利用を有効にする方法について詳しくは、[support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp) をご覧ください。

### Clicky Web Analytics

type 属性の値: `clicky`

この値を指定すると、Clicky Web Analytics を利用できるようになります。Clicky の利用を有効にする方法について詳しくは、[clicky.com](https://clicky.com/help/apps-plugins) をご覧ください。

### comScore

type 属性の値: `comscore`

この値を指定すると、comScore Unified Digital Measurement&trade; のページビュー分析を利用できるようになります。必須の設定として、変数 `c2` に comScore 提供の *c2 id* を指定します。詳しくは [comscore.com](http://www.comscore.com) をご覧ください。

### Cxense

type 属性の値: `cxense`

この値を指定すると、Cxense Insight の分析を利用できるようになります。必須の設定として、変数 `siteId` に Cxense 提供の*サイト ID* を指定します。詳しくは [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration) をご覧ください。

### Dynatrace

type 属性の値: `dynatrace`

この値を指定すると、Dynatrace のリアル ユーザー モニタリングを利用できるようになります。必須の設定として、変数 `app` に Dynatrace 提供の*アプリケーション ID*  、変数 `tenant` に Dynatrace 提供の*環境 ID* を指定します。Dynatrace のリアル ユーザー モニタリング機能を追加する方法について詳しくは、[dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/) をご覧ください。

### Eulerian Analytics

type 属性の値: `euleriananalytics`

この値を指定すると、Eulerian Technologies Analytics を利用できるようになります。必須の設定として、変数 `analyticsHost` に Eulerian から割り当てられたドメインを指定します。詳しくは [eulerian.wiki](https://eulerian.wiki) をご覧ください。

### Gemius

type 属性の値: `gemius`

この値を指定すると、Gemius Audience や Gemius Prism の分析を利用できるようになります。さらに、Gemius 提供の `prefix` 変数と `identifier` 変数も指定する必要があります。オプションの変数として `extraparams` (key1=value1|key2=value2）を指定することもできます。詳しくは [gemius.com](https://www.gemius.com) をご覧ください。

### Google AdWords

type 属性の値: `googleadwords`

この値を指定すると、Google AdWords のコンバージョン トラッキングやリマーケティングを利用できるようになります。詳しくは、AdWords ヘルプセンターで [コンバージョン トラッキング](https://support.google.com/adwords/answer/1722054?hl=en)  と [リマーケティング](https://support.google.com/adwords/answer/2453998?hl=en)についての記事をそれぞれご覧ください。どちらのタグも相互に独立して使用できます。

### Google アナリティクス

type 属性の値: `googleanalytics`

この値を指定すると、Google アナリティクスを利用できるようになります。Google アナリティクスの利用を有効にする方法について詳しくは、[developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/) をご覧ください。

### INFOnline / IVW

type 属性の値: `infonline`

この値を指定すると、[INFOnline](https://www.infonline.de) や [IVW](http://www.ivw.de) を利用できるようになります。使用する AMP ファイルとは別のサブドメインに [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) のコピーが必要です（[理由](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)）。このファイルは HTTPS 経由で配信する必要があります。たとえば、AMP ファイルが `www.example.com` でホストされている場合、`amp-analytics-infonline.html` は別のサブドメイン（`iframe.example.com` や `assets.example.com` など）になければなりません。

さらに、次の変数も指定する必要があります。

* `st`: Angebotskennung
* `co`: コメント
* `cp`: コード
* `url`: `amp-analytics-infonline.html` の場所（HTTPS）

INFOnline や IVW の利用を有効にする方法について詳しくは、[www.infonline.de](https://www.infonline.de/downloads/web-mew-und-ctv/) をご覧ください。

### Krux

type 属性の値: `krux`

この値を指定すると、Krux を利用できるようになります。設定の詳細については、[help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608) をご覧ください。

### Linkpulse

type 属性の値: `linkpulse`

この値を指定すると、Linkpulse を利用できるようになります。設定の詳細については、[docs.linkpulse.com](http://docs.linkpulse.com) をご覧ください。

### Lotame

type 属性の値: `lotame`

この値を指定すると、Lotame を利用できるようになります。詳しい情報や設定の詳細については、[mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP) をご覧ください。

### Médiamétrie

type 属性の値: `mediametrie`

この値を指定すると、Médiamétrie のページ トラッキングを利用できるようになります。必須の設定として、変数 `serial` を定義します。変数 `level1` から `level4` までは省略可能です。詳しくは [mediametrie.com](http://www.mediametrie.com/) をご覧ください。

### mParticle

type 属性の値: `mparticle`

この値を指定すると、mParticle を利用できるようになります。mParticle の利用を有効にする方法について詳しくは、[docs.mparticle.com](http://docs.mparticle.com/?javascript#amp) をご覧ください。

### Nielsen

type 属性の値: `nielsen`

この値を指定すると、Nielsen DCR を利用できるようになります。`apid` の設定が必要な場合や、`vars` セクションで残りのパラメータを指定する際にサポートが必要な場合は、Nielsen の担当者にお問い合わせください。詳しくは、[Nielsen のサポート ドキュメント](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API) をご覧ください。

### OEWA

type 属性の値: `oewa`

この値を指定すると、[OEWA](https://www.oewa.at) を利用できるようになります。使用する AMP ファイルとは別のサブドメインに [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) のコピーが必要です（[理由](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)）。このファイルは HTTPS 経由で配信する必要があります。たとえば、AMP ファイルが `www.example.com` でホストされている場合、`amp-analytics-oewa.html` は別のサブドメイン（`oewa-amp.example.com` など）になければなりません。OEWA の利用を有効にする方法について詳しくは、[こちら](http://www.oewa.at/basic/implementierung) をご覧ください。

さらに、次の変数も指定する必要があります。

`vars` セクション:

- `s`: サービス
- `cp`: カテゴリパス

`requests` セクション:

- `url`: `amp-analytics-oewa.html` の場所（HTTPS）

{% call callout('注', type='caution') %}
iframe-ping のソリューションを使用しない `oewadirect` というバリエーションもあります。こちらは、`AMP CLIENT_ID` を使うことでクライアントが検出されやすくなりますが、現在のところ試験運用中であり、`oewa2.js` を使用しないため OEWA により禁止されています。
{% endcall %}

### Parsely

type 属性の値: `parsely`

この値を指定すると、Parsely を利用できるようになります。設定の詳細については、[parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html) をご覧ください。

### Piano

type 属性の値: `piano`

この値を指定すると、Piano を利用できるようになります。設定の詳細については、[vx.piano.io](http://vx.piano.io/javascript-tracking-amp) をご覧ください。

### Quantcast Measurement

type 属性の値: `quantcast`

この値を指定すると、Quantcast Measurement を利用できるようになります。Quantcast Measurement の機能を追加する方法について詳しくは、次のサイトをご覧ください。[quantcast.com](https://www.quantcast.com/help/guides/)

### Segment

type 属性の値: `segment`

この値を指定すると、Segment のページビューやイベントのデータを利用できるようになります。送信できる項目の一覧については、[Segment の仕様](https://segment.com/docs/spec/) をご覧ください。

### SOASTA mPulse

type 属性の値: `mpulse`

この値を指定すると、[SOASTA mPulse](https://www.soasta.com/mPulse) を利用できるようになります。設定の詳細については、[docs.soasta.com](http://docs.soasta.com/) をご覧ください。

### SimpleReach

type 属性の値: `simplereach`

この値を指定すると、SimpleReach を利用できるようになります。設定の詳細については、[simplereach.com/docs](http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation) をご覧ください。

### Snowplow Analytics

type 属性の値: `snowplow`

この値を指定すると、Snowplow Analytics を利用できるようになります。Snowplow Analytics の利用を有効にする方法について詳しくは、[github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker) をご覧ください。

### Rambler/TOP-100

type 属性の値: `top100`

この値を指定すると、Rambler/TOP-100 を利用できるようになります。設定の詳細については、[top100.rambler.ru](https://top100.rambler.ru/docs) をご覧ください.

### Webtrekk

type 属性の値: `webtrekk`

この値を指定すると、Webtrekk を利用できるようになります。設定の詳細については、[supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html) をご覧ください。

### Yandex Metrica

type 属性の値: `metrika`

この値を指定すると、Yandex Metrica を利用できるようになります。設定の詳細については、[Yandex のサポートページ](https://yandex.com/support/metrica/code/install-counter-amp.xml) をご覧ください。
