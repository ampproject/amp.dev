---
$title: amp-ad
$category@: ads-analytics
teaser:
  text: 広告を表示するコンテナです。
---



広告を表示するコンテナです。`amp-embed` は `amp-ad` タグの別名です。タグ名は異なりますが、そのすべての機能を受け継いでいます。より正確な意味では、`amp-embed` を使用します。AMP ドキュメントでは、HTTPS 経由で配信される広告と埋め込みのみを表示できます。

# <a name="amp-ad"></a> amp-ad / amp-embed


[tip type="note"] `amp-ad` / `amp-embed` の仕様は今後、大幅に変更される可能性があります。現在は、広告を自動表示できる形式に設計されています。
[/tip]


<!--
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
    <td class="col-fourty"><strong>説明</strong></td>
    <td>広告を表示するコンテナ。<code>amp-embed</code> は <code>amp-ad</code> タグの別名です。タグ名は異なりますが、そのすべての機能を受け継いでいます。より正確な意味では、<code>amp-embed</code> を使用します。AMP ドキュメントでは、HTTPS 経由で配信される広告と埋め込みのみを表示できます。</td>
  </tr>
  <tr>
    <td width="40%"><strong>必要なスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://ampjs.org/v0/amp-ad-0.1.js">&lt;/script></code><br>注: amp-ad はこのスクリプトがなくても機能しますが、将来にわたって互換性を維持するためにこのスクリプトを使用することを強くおすすめします。</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、intrinsic、nodisplay、responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>例</strong></td>
    <td>AMP By Example の <a href="https://ampbyexample.com/components/amp-ad/">amp-ad の例</a>をご覧ください。</td>
  </tr>
</table>

## 動作 <a name="behavior"></a>

広告は、AMP ドキュメントの他のすべてのリソースと同じように、`<amp-ad>` と呼ばれる特別なカスタム要素とともに読み込まれます。広告ネットワークから提供される JavaScript を AMP ドキュメント内で実行することはできません。代わりに、AMP ランタイムは（iframe サンドボックス経由で）別のオリジンから iframe を AMP ドキュメントとして読み込み、広告ネットワークの JavaScript をその iframe サンドボックス内で実行します。

`<amp-ad>` では、そのレイアウト タイプの[ルール](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#tldr-summary-of-layout-requirements--behaviors)に沿って、幅と高さの値を指定する必要があります。また、表示する広告ネットワークを指定する `type` 引数が必要です。タグのすべての `data-*` 属性は、最終的に広告をレンダリングするコードに引数として自動的に渡されます。特定のタイプのネットワークで必要な `data-` 属性は広告ネットワークによって異なるため、広告ネットワークとともに記述する必要があります。

#### 例: 複数の広告の表示 <a name="example-displaying-a-few-ads"></a>

[example preview="inline" playground="true" imports="amp-ad"]
```html
<amp-ad type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
    width="300"
    height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  </amp-ad>
  <amp-ad width="300"
    height="250"
    type="industrybrains"
    data-width="300"
    data-height="250"
    data-cid="19626-3798936394">
  </amp-ad>
  <amp-embed type="taboola"
    width="400"
    height="300"
    layout="responsive"
    data-publisher="amp-demo"
    data-mode="thumbnails-a"
    data-placement="Ads Example"
    data-article="auto">
  </amp-embed>
```
[/example]

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type（必須）</strong></td>
    <td><a href="#supported-ad-networks">広告ネットワーク</a>の識別子を指定します。<code>type</code> 属性では、広告タグに使用するテンプレートを選択します。</td>
  </tr>
  <tr>
    <td width="40%"><strong>src（オプション）</strong></td>
    <td>この属性を使用して、指定した広告ネットワーク用のスクリプトタグを読み込みます。この属性は、ページに挿入するスクリプトタグを 1 つだけ必要とする広告ネットワークで使用できます。<code>src</code> の値には、指定した広告ネットワークのホワイトリストに登録されているプレフィックスを指定する必要があります。また、値には <code>https</code> プロトコルを使用する必要があります。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>ほとんどの広告ネットワークには詳細な設定が必要です。この設定は、HTML の <code>data-</code> 属性を使用してネットワークに渡すことができます。パラメータ名は標準的なデータ属性に従い、キャメルケース変換されます。たとえば「data-foo-bar」は、広告に送信されると「fooBar」として設定されます。属性を使用できる<a href="#supported-ad-networks">広告ネットワーク</a>に関するドキュメントをご覧ください。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-vars-foo-bar</strong></td>
    <td><code>data-vars-</code> で始まる属性は、<a href="https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute"><code>amp-analytics</code> の変数</a>用に予約されています。</td>
  </tr>
  <tr>
    <td width="40%"><strong>json（オプション）</strong></td>
    <td>恣意的に複雑化された JSON オブジェクトとして設定を広告に渡すには、この属性を使用します。オブジェクトは広告にそのまま渡されます。名前の分割は行われません。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id（オプション）</strong></td>
    <td>この属性を指定する場合、（Cookie に似た）ユーザーの「AMP クライアント ID」が広告に渡されるまで、指定された HTML ID による <a href="amp-user-notification.md">amp-user-notification</a> の確認が必要になります。つまり、ユーザーが通知を確認するまで広告レンダリングが遅延します。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-loading-strategy（オプション）</strong></td>
    <td>現在のビューポートから離れた場所にある一定数のビューポート内に広告を表示する場合、広告に対して読み込みを開始するよう指示します。<code>data-loading-strategy</code> 属性が指定されていない場合、デフォルト値は 3 になります。フロートの値は [0, 3] の範囲で指定できます（値が指定されていない場合は 1.25 に設定されます）。値を小さくすると視認性が高まりますが（つまり、広告がいったん読み込まれると、表示される可能性が高くなる）、広告の表示回数が少なくなる（広告の読み込み回数が少なくなる）リスクがあります。属性が指定されているが、値が空のままの場合は、システムによってフロートの値が割り当てられ、表示回数に大きな影響を与えることなく視認性を高めるように最適化されます。<code>prefer-viewability-over-views</code> を値として指定すると、視認性も自動的に最適化されます。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-ad-container-id（オプション）</strong></td>
    <td>折りたたもうとした場合に、コンテナ コンポーネント ID を広告に通知します。コンテナ コンポーネントは、広告の親の <code>&lt;amp-layout&gt;</code> コンポーネントである必要があります。<code>data-ad-container-id</code> が指定されている場合にこのような <code>&lt;amp-layout&gt;</code> コンテナ コンポーネントが検出されると、AMP ランタイムは広告が表示されていない間、広告コンポーネントではなくコンテナ コンポーネントを折りたたもうとします。この機能は、広告インジケーターが表示されている場合に便利です。
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>共通の属性</strong></td>
    <td>この要素には、AMP コンポーネントに拡張された<a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">共通の属性</a>が含まれます。</td>
  </tr>
</table>

## プレースホルダ <a name="placeholder"></a>

`amp-ad` は必要に応じて、`placeholder` 属性が設定された子要素をサポートします。広告ネットワークでこの子要素がサポートされている場合、広告を表示できるようになるまでこの子要素が表示されます。詳しくは、[プレースホルダとフォールバック](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)をご覧ください。

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## 表示可能な広告がない場合 <a name="no-ad-available"></a>

スロットに表示できる広告がない場合、AMPは `amp-ad` 要素を折りたたもうとします（つまり、この要素を `display: none` に設定しようとします）。AMP は、ユーザーのスクロール位置に影響を及ぼさずにこの処理を実行できるかどうかを判断します。広告が現在のビューポート内に表示されている場合は、ユーザーのスクロール位置に影響が及ぶため、広告は折りたたまれませんが、広告が現在のビューポートの外部に表示されている場合は、広告が折りたたまれます。

折りたたむことができない場合のために、`amp-ad` コンポーネントは `fallback` 属性が設定された子要素をサポートしています。フォールバック要素が指定されている場合は、カスタマイズされたフォールバック要素が表示されます。指定されていない場合、AMP はデフォルトのフォールバックを適用します。

フォールバックが指定されている例:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## 動画広告の配信 <a name="serving-video-ads"></a>

動画広告で AMP の動画を収益化する方法には次の 3 つがあります。

1. AMP は、広告を収益化できるさまざまな動画プレーヤー（BrightCove、DailyMotion など）を標準でサポートしています。完全なリストについては、[メディア](../../../documentation/components/index.html#media) コンポーネントをご覧ください。

1. IMA SDK と HTML5 動画プレーヤーが組み込まれている [amp-ima-video](amp-ima-video.md) コンポーネントを使用します。
1. AMP でサポートされていない動画プレーヤーを使用する場合は、[amp-iframe](https://ampbyexample.com/components/amp-iframe/) を使用してカスタム プレーヤーを提供できます。`amp-iframe` のアプローチを使用する場合は、次のようにします。

    * 最初のビューポートでプレーヤーを読み込む場合は、ポスターがあることを確認します。詳しくは、[こちら](amp-iframe.md#iframe-with-placeholder)をご覧ください。
    * 動画とポスターは HTTPS 経由で配信する必要があります。</li>

## カスタム ドメインからの広告の掲載 <a name="running-ads-from-a-custom-domain"></a>

AMP は、独自のドメインなどのカスタム ドメインから広告を読み込むために使用するブートストラップ iframe の読み込みをサポートしています。

この機能を有効にするには、[remote.html](https://github.com/ampproject/amphtml/blob/main/3p/remote.html) ファイルをウェブサーバーにコピーして、次のメタタグを AMP ファイルに追加します。

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  メタタグの `content` 属性には、ウェブサーバーにコピーした remote.html ファイルの絶対 URL を指定します。この URL には「https」スキーマを使用する必要があります。このファイルを AMP ファイルと同じオリジンに格納することはできません。たとえば、AMP ファイルを `www.example.com` にホストする場合、この URL に `www.example.com` を指定することはできませんが、`something-else.example.com` は指定できます。iframe 用に使用できるオリジンについて詳しくは、[iframe のオリジン ポリシー](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md)をご覧ください。

### セキュリティ <a name="security"></a>

受信データを `draw3p` 関数に渡す前に**検証**を行って、iframe が想定どおりの動作のみを行うことを確認します。これは、カスタムの JavaScript インジェクションが可能な広告ネットワークの場合は特に当てはまります。

また、iframe は、iframe を必要とするオリジンにのみ設定する必要があります。オリジンは次のいずれかになります。

* 専用のオリジン
* AMP キャッシュの `https://cdn.ampproject.org`

AMP キャッシュの場合は、「ソースオリジン」（cdn.ampproject.org から配信されるドキュメントのオリジン）が自分のオリジンのいずれかであることを確認する必要もあります。

オリジンの適用は、`draw3p` の 3 番目の引数で行うことができます。さらに、ブラウザが完全にサポートされている場合、[allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) ディレクティブを使用して行う必要もあります。

### 配信元の広告設定の拡張 <a name="enhance-incoming-ad-configuration"></a>

この機能はあくまでも任意です。広告サーバーへの広告リクエストを作成する前に、広告リクエストを拡張したい場合があります。

広告ネットワークが[高速フェッチ](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md#creating-an-amp-ad)をサポートしている場合は、[リアルタイム設定](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-documentation.md)（RTC）を使用してください（たとえば、DoubleClick と AdSense の統合により、高速フェッチと RTC がサポートされます）。

広告ネットワークで遅延フェッチを使用している場合は、[remote.html](https://github.com/ampproject/amphtml/blob/main/3p/remote.html) ファイルで `draw3p` 関数の呼び出しにコールバックを渡すことができます。コールバックは 1 つ目の引数として配信元の設定を受け取り、2 つ目の引数として別のコールバックを受け取ります（以下の例では `done` が呼び出されています）。広告レンダリングを続行するには、設定を更新してこのコールバックを呼び出す必要があります。

例:

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

## スタイル設定 <a name="styling"></a>

CSS の `position: fixed` が設定されているコンテナに `<amp-ad>` 要素自体を含めたり配置したりすることはできません（`amp-lightbox` を除く）。これは、ページ全体のオーバーレイ広告の UX に影響するためです。UX を一定に維持できるよう、AMP が管理するコンテナの内部で同様の広告フォーマットを使用できるようにすることが今後検討される可能性があります。

## 検証 <a name="validation"></a>

AMP 検証ツールの仕様で [amp-ad のルール](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad/validator-amp-ad.protoascii)をご確認ください。

## サポートされている広告ネットワーク <a name="supported-ad-networks"></a>

* [A8](https://github.com/ampproject/amphtml/blob/main/ads/a8.md)
* [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md)
* [AccessTrade](https://github.com/ampproject/amphtml/blob/main/ads/accesstrade.md)
* [Adblade](https://github.com/ampproject/amphtml/blob/main/ads/adblade.md)
* [AdButler](https://github.com/ampproject/amphtml/blob/main/ads/adbutler.md)
* [Adform](https://github.com/ampproject/amphtml/blob/main/ads/adform.md)
* [Adfox](https://github.com/ampproject/amphtml/blob/main/ads/adfox.md)
* [Ad Generation](https://github.com/ampproject/amphtml/blob/main/ads/adgeneration.md)
* [Adhese](https://github.com/ampproject/amphtml/blob/main/ads/adhese.md)
* [Adincube](https://github.com/ampproject/amphtml/blob/main/ads/adincube.md)
* [ADITION](https://github.com/ampproject/amphtml/blob/main/ads/adition.md)
* [Adman](https://github.com/ampproject/amphtml/blob/main/ads/adman.md)
* [AdmanMedia](https://github.com/ampproject/amphtml/blob/main/ads/admanmedia.md)
* [Admixer](https://github.com/ampproject/amphtml/blob/main/ads/admixer.md)
* [AdOcean](https://github.com/ampproject/amphtml/blob/main/ads/adocean.md)
* [AdPicker](https://github.com/ampproject/amphtml/blob/main/ads/adpicker.md)
* [AdPlugg](https://github.com/ampproject/amphtml/blob/main/ads/adplugg.md)
* [Adpon](https://github.com/ampproject/amphtml/blob/main/ads/adpon.md)
* [AdReactor](https://github.com/ampproject/amphtml/blob/main/ads/adreactor.md)
* [AdSense](https://github.com/ampproject/amphtml/blob/main/ads/google/adsense.md)
* [AdSensor](https://github.com/ampproject/amphtml/blob/main/ads/adsensor.md)
* [AdsNative](https://github.com/ampproject/amphtml/blob/main/ads/adsnative.md)
* [AdSpeed](https://github.com/ampproject/amphtml/blob/main/ads/adspeed.md)
* [AdSpirit](https://github.com/ampproject/amphtml/blob/main/ads/adspirit.md)
* [AdStir](https://github.com/ampproject/amphtml/blob/main/ads/adstir.md)
* [AdTech](https://github.com/ampproject/amphtml/blob/main/ads/adtech.md)
* [AdThrive](https://github.com/ampproject/amphtml/blob/main/ads/adthrive.md)
* [AdUnity](https://github.com/ampproject/amphtml/blob/main/ads/adunity.md)
* [Ad Up Technology](https://github.com/ampproject/amphtml/blob/main/ads/aduptech.md)
* [Adventive](https://github.com/ampproject/amphtml/blob/main/ads/adventive.md)
* [Adverline](https://github.com/ampproject/amphtml/blob/main/ads/adverline.md)
* [Adverticum](https://github.com/ampproject/amphtml/blob/main/ads/adverticum.md)
* [AdvertServe](https://github.com/ampproject/amphtml/blob/main/ads/advertserve.md)
* [Adyoulike](https://github.com/ampproject/amphtml/blob/main/ads/adyoulike.md)
* [Affiliate-B](https://github.com/ampproject/amphtml/blob/main/ads/affiliateb.md)
* [AJA](https://github.com/ampproject/amphtml/blob/main/ads/aja.md)
* [AMoAd](https://github.com/ampproject/amphtml/blob/main/ads/amoad.md)
* [AppNexus](https://github.com/ampproject/amphtml/blob/main/ads/appnexus.md)
* [AppVador](https://github.com/ampproject/amphtml/blob/main/ads/appvador.md)
* [Atomx](https://github.com/ampproject/amphtml/blob/main/ads/atomx.md)
* [Baidu](https://github.com/ampproject/amphtml/blob/main/ads/baidu.md)
* [BeOpinion](amp-beopinion.md)
* [Bidtellect](https://github.com/ampproject/amphtml/blob/main/ads/bidtellect.md)
* [brainy](https://github.com/ampproject/amphtml/blob/main/ads/brainy.md)
* [Broadstreet Ads](https://github.com/ampproject/amphtml/blob/main/ads/broadstreetads.md)
* [CA A.J.A. Infeed](https://github.com/ampproject/amphtml/blob/main/ads/caajainfeed.md)
* [CA-ProFit-X](https://github.com/ampproject/amphtml/blob/main/ads/caprofitx.md)
* [Cedato](https://github.com/ampproject/amphtml/blob/main/ads/cedato.md)
* [Chargeads](https://github.com/ampproject/amphtml/blob/main/ads/chargeads.md)
* [Colombia](https://github.com/ampproject/amphtml/blob/main/ads/colombia.md)
* [Connatix](https://github.com/ampproject/amphtml/blob/main/ads/connatix.md)
* [Content.ad](https://github.com/ampproject/amphtml/blob/main/ads/contentad.md)
* [Criteo](https://github.com/ampproject/amphtml/blob/main/ads/criteo.md)
* [CSA](https://github.com/ampproject/amphtml/blob/main/ads/google/csa.md)
* [CxenseDisplay](https://github.com/ampproject/amphtml/blob/main/ads/eas.md)
* [Dianomi](https://github.com/ampproject/amphtml/blob/main/ads/dianomi.md)
* [Directadvert](https://github.com/ampproject/amphtml/blob/main/ads/directadvert.md)
* [DistroScale](https://github.com/ampproject/amphtml/blob/main/ads/distroscale.md)
* [Dot and Media](https://github.com/ampproject/amphtml/blob/main/ads/dotandads.md)
* [DoubleClick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md)
* [eADV](https://github.com/ampproject/amphtml/blob/main/ads/eadv.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/main/ads/epeex.md)
* [E-Planning](https://github.com/ampproject/amphtml/blob/main/ads/eplanning.md)
* [Ezoic](https://github.com/ampproject/amphtml/blob/main/ads/ezoic.md)
* [Felmat](https://github.com/ampproject/amphtml/blob/main/ads/felmat.md)
* [FlexOneELEPHANT](https://github.com/ampproject/amphtml/blob/main/ads/f1e.md)
* [FlexOneHARRIER](https://github.com/ampproject/amphtml/blob/main/ads/f1h.md)
* [Flite](https://github.com/ampproject/amphtml/blob/main/ads/flite.md)
* [fluct](https://github.com/ampproject/amphtml/blob/main/ads/fluct.md)
* [FreeWheel](https://github.com/ampproject/amphtml/blob/main/ads/freewheel.md)
* [Fusion](https://github.com/ampproject/amphtml/blob/main/ads/fusion.md)
* [GenieeSSP](https://github.com/ampproject/amphtml/blob/main/ads/genieessp.md)
* [Giraff](https://github.com/ampproject/amphtml/blob/main/ads/giraff.md)
* [GMOSSP](https://github.com/ampproject/amphtml/blob/main/ads/gmossp.md)
* [GumGum](https://github.com/ampproject/amphtml/blob/main/ads/gumgum.md)
* [Holder](https://github.com/ampproject/amphtml/blob/main/ads/holder.md)
* [I-Mobile](https://github.com/ampproject/amphtml/blob/main/ads/imobile.md)
* [Imonomy](https://github.com/ampproject/amphtml/blob/main/ads/imonomy.md)
* [iBillboard](https://github.com/ampproject/amphtml/blob/main/ads/ibillboard.md)
* [Imedia](https://github.com/ampproject/amphtml/blob/main/ads/imedia.md)
* [Improve Digital](https://github.com/ampproject/amphtml/blob/main/ads/improvedigital.md)
* [Index Exchange](https://github.com/ampproject/amphtml/blob/main/ads/ix.md)
* [Industrybrains](https://github.com/ampproject/amphtml/blob/main/ads/industrybrains.md)
* [InMobi](https://github.com/ampproject/amphtml/blob/main/ads/inmobi.md)
* [Innity](https://github.com/ampproject/amphtml/blob/main/ads/innity.md)
* [Kargo](https://github.com/ampproject/amphtml/blob/main/ads/kargo.md)
* [Kiosked](https://github.com/ampproject/amphtml/blob/main/ads/kiosked.md)
* [Kixer](https://github.com/ampproject/amphtml/blob/main/ads/kixer.md)
* [Kuadio](https://github.com/ampproject/amphtml/blob/main/ads/kuadio.md)
* [Ligatus](https://github.com/ampproject/amphtml/blob/main/ads/ligatus.md)
* [LockerDome](https://github.com/ampproject/amphtml/blob/main/ads/lockerdome.md)
* [LOKA](https://github.com/ampproject/amphtml/blob/main/ads/loka.md)
* [MADS](https://github.com/ampproject/amphtml/blob/main/ads/mads.md)
* [MANTIS](https://github.com/ampproject/amphtml/blob/main/ads/mantis.md)
* [Media.net](https://github.com/ampproject/amphtml/blob/main/ads/medianet.md)
* [MediaImpact](https://github.com/ampproject/amphtml/blob/main/ads/mediaimpact.md)
* [Mediavine](https://github.com/ampproject/amphtml/blob/main/ads/mediavine.md)
* [Medyanet](https://github.com/ampproject/amphtml/blob/main/ads/medyanet.md)
* [Meg](https://github.com/ampproject/amphtml/blob/main/ads/meg.md)
* [MicroAd](https://github.com/ampproject/amphtml/blob/main/ads/microad.md)
* [MixiMedia](https://github.com/ampproject/amphtml/blob/main/ads/miximedia.md)
* [Mixpo](https://github.com/ampproject/amphtml/blob/main/ads/mixpo.md)
* [Monetizer101](https://github.com/ampproject/amphtml/blob/main/ads/monetizer101.md)
* [mox](https://github.com/ampproject/amphtml/blob/main/ads/mox.md)
* [myTarget](https://github.com/ampproject/amphtml/blob/main/ads/mytarget.md)
* [myWidget](https://github.com/ampproject/amphtml/blob/main/ads/mywidget.md)
* [Nativo](https://github.com/ampproject/amphtml/blob/main/ads/nativo.md)
* [Navegg](https://github.com/ampproject/amphtml/blob/main/ads/navegg.md)
* [Nend](https://github.com/ampproject/amphtml/blob/main/ads/nend.md)
* [NETLETIX](https://github.com/ampproject/amphtml/blob/main/ads/netletix.md)
* [Noddus](https://github.com/ampproject/amphtml/blob/main/ads/noddus.md)
* [Nokta](https://github.com/ampproject/amphtml/blob/main/ads/nokta.md)
* [OneAD](https://github.com/ampproject/amphtml/blob/main/ads/onead.md)
* [OnNetwork](https://github.com/ampproject/amphtml/blob/main/ads/onnetwork.md)
* [Open AdStream（OAS）](https://github.com/ampproject/amphtml/blob/main/ads/openadstream.md)
* [OpenX](https://github.com/ampproject/amphtml/blob/main/ads/openx.md)
* [Pixels](https://github.com/ampproject/amphtml/blob/main/ads/pixels.md)
* [plista](https://github.com/ampproject/amphtml/blob/main/ads/plista.md)
* [polymorphicAds](https://github.com/ampproject/amphtml/blob/main/ads/polymorphicads.md)
* [popin](https://github.com/ampproject/amphtml/blob/main/ads/popin.md)
* [Pressboard](https://github.com/ampproject/amphtml/blob/main/ads/pressboard.md)
* [PromoteIQ](https://github.com/ampproject/amphtml/blob/main/ads/promoteiq.md)
* [PubGuru](https://github.com/ampproject/amphtml/blob/main/ads/pubguru.md)
* [PubMatic](https://github.com/ampproject/amphtml/blob/main/ads/pubmatic.md)
* [Pubmine](https://github.com/ampproject/amphtml/blob/main/ads/pubmine.md)
* [PulsePoint](https://github.com/ampproject/amphtml/blob/main/ads/pulsepoint.md)
* [Purch](https://github.com/ampproject/amphtml/blob/main/ads/purch.md)
* [Rambler&amp;Co](https://github.com/ampproject/amphtml/blob/main/ads/capirs.md)
* [RbInfoxSg](https://github.com/ampproject/amphtml/blob/main/ads/rbinfox.md)
* [Realclick](https://github.com/ampproject/amphtml/blob/main/ads/realclick.md)
* [recomAD](https://github.com/ampproject/amphtml/blob/main/ads/recomad.md)
* [Red for Publishers](https://github.com/ampproject/amphtml/blob/main/ads/rfp.md)
* [Relap](https://github.com/ampproject/amphtml/blob/main/ads/relap.md)
* [Revcontent](https://github.com/ampproject/amphtml/blob/main/ads/revcontent.md)
* [RevJet](https://github.com/ampproject/amphtml/blob/main/ads/revjet.md)
* [Rubicon Project](https://github.com/ampproject/amphtml/blob/main/ads/rubicon.md)
* [RUNative](https://github.com/ampproject/amphtml/blob/main/ads/runative.md)
* [SAS CI 360 Match](https://github.com/ampproject/amphtml/blob/main/ads/sas.md)
* [Sekindo](https://github.com/ampproject/amphtml/blob/main/ads/sekindo.md)
* [Sharethrough](https://github.com/ampproject/amphtml/blob/main/ads/sharethrough.md)
* [Sklik](https://github.com/ampproject/amphtml/blob/main/ads/sklik.md)
* [SlimCut Media](https://github.com/ampproject/amphtml/blob/main/ads/slimcutmedia.md)
* [Smart AdServer](https://github.com/ampproject/amphtml/blob/main/ads/smartadserver.md)
* [smartclip](https://github.com/ampproject/amphtml/blob/main/ads/smartclip.md)
* [sogou Ad](https://github.com/ampproject/amphtml/blob/main/ads/sogouad.md)
* [Sortable](https://github.com/ampproject/amphtml/blob/main/ads/sortable.md)
* [SOVRN](https://github.com/ampproject/amphtml/blob/main/ads/sovrn.md)
* [Speakol](https://github.com/ampproject/amphtml/blob/main/ads/speakol.md)
* [SpotX](https://github.com/ampproject/amphtml/blob/main/ads/spotx.md)
* [SunMedia](https://github.com/ampproject/amphtml/blob/main/ads/sunmedia.md)
* [Swoop](https://github.com/ampproject/amphtml/blob/main/ads/swoop.md)
* [TcsEmotion](https://github.com/ampproject/amphtml/blob/main/ads/tcsemotion.md)
* [Teads](https://github.com/ampproject/amphtml/blob/main/ads/teads.md)
* [torimochi](https://github.com/ampproject/amphtml/blob/main/ads/torimochi.md)
* [TripleLift](https://github.com/ampproject/amphtml/blob/main/ads/triplelift.md)
* [Trugaze](https://github.com/ampproject/amphtml/blob/main/ads/trugaze.md)
* [UZOU](https://github.com/ampproject/amphtml/blob/main/ads/uzou.md)
* [ValueCommerce](https://github.com/ampproject/amphtml/blob/main/ads/valuecommerce.md)
* [video intelligence](https://github.com/ampproject/amphtml/blob/main/ads/videointelligence.md)
* [Videonow](https://github.com/ampproject/amphtml/blob/main/ads/videonow.md)
* [Viralize](https://github.com/ampproject/amphtml/blob/main/ads/viralize.md)
* [UAS](https://github.com/ampproject/amphtml/blob/main/ads/uas.md)
* [ucfunnel](https://github.com/ampproject/amphtml/blob/main/ads/ucfunnel.md)
* [Unruly](https://github.com/ampproject/amphtml/blob/main/ads/unruly.md)
* [VMFive](https://github.com/ampproject/amphtml/blob/main/ads/vmfive.md)
* [Webediads](https://github.com/ampproject/amphtml/blob/main/ads/webediads.md)
* [Weborama](https://github.com/ampproject/amphtml/blob/main/ads/weborama.md)
* [Widespace](https://github.com/ampproject/amphtml/blob/main/ads/widespace.md)
* [Wisteria](https://github.com/ampproject/amphtml/blob/main/ads/wisteria.md)
* [WPMedia](https://github.com/ampproject/amphtml/blob/main/ads/wpmedia.md)
* [Xlift](https://github.com/ampproject/amphtml/blob/main/ads/xlift.md)
* [Yahoo](https://github.com/ampproject/amphtml/blob/main/ads/yahoo.md)
* [YahooJP](https://github.com/ampproject/amphtml/blob/main/ads/yahoojp.md)
* [Yandex](https://github.com/ampproject/amphtml/blob/main/ads/yandex.md)
* [Yengo](https://github.com/ampproject/amphtml/blob/main/ads/yengo.md)
* [Yieldbot](https://github.com/ampproject/amphtml/blob/main/ads/yieldbot.md)
* [Yieldmo](https://github.com/ampproject/amphtml/blob/main/ads/yieldmo.md)
* [Yieldone](https://github.com/ampproject/amphtml/blob/main/ads/yieldone.md)
* [Yieldpro](https://github.com/ampproject/amphtml/blob/main/ads/yieldpro.md)
* [Zedo](https://github.com/ampproject/amphtml/blob/main/ads/zedo.md)
* [Zucks](https://github.com/ampproject/amphtml/blob/main/ads/zucks.md)

## サポートされている埋め込みタイプ <a name="supported-embed-types"></a>

* [24smi](https://github.com/ampproject/amphtml/blob/main/ads/24smi.md)
* [Bringhub](https://github.com/ampproject/amphtml/blob/main/ads/bringhub.md)
* [Dable](https://github.com/ampproject/amphtml/blob/main/ads/dable.md)
* [Engageya](https://github.com/ampproject/amphtml/blob/main/ads/engageya.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/main/ads/epeex.md)
* [Insticator](https://github.com/ampproject/amphtml/blob/main/ads/insticator.md)
* [Jubna](https://github.com/ampproject/amphtml/blob/main/ads/jubna.md)
* [Outbrain](https://github.com/ampproject/amphtml/blob/main/ads/outbrain.md)
* [Postquare](https://github.com/ampproject/amphtml/blob/main/ads/postquare.md)
* [PubExchange](https://github.com/ampproject/amphtml/blob/main/ads/pubexchange.md)
* [Smi2](https://github.com/ampproject/amphtml/blob/main/ads/smi2.md)
* [Taboola](https://github.com/ampproject/amphtml/blob/main/ads/taboola.md)
* [Zen](https://github.com/ampproject/amphtml/blob/main/ads/zen.md)
* [ZergNet](https://github.com/ampproject/amphtml/blob/main/ads/zergnet.md)