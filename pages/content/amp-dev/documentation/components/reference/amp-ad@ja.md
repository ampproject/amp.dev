---
$category@: ads-analytics
formats:
- websites
teaser:
  text: 広告を表示するコンテナです。
---

# amp-ad / amp-embed

広告を表示するコンテナです。`amp-embed` は `amp-ad` タグの別名です。タグ名は異なりますが、そのすべての機能を受け継いでいます。より正確な意味では、`amp-embed` を使用します。AMP ドキュメントでは、HTTPS 経由で配信される広告と埋め込みのみを表示できます。

# `amp-ad` / `amp-embed`


[tip type="note"] `amp-ad` / `amp-embed` の仕様は今後、大幅に変更される可能性があります。現在は、広告を自動表示できる形式に設計されています。
[/tip]


<!---
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
    <td><code>&lt;script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js">&lt;/script></code><br>注: amp-ad はこのスクリプトがなくても機能しますが、将来にわたって互換性を維持するためにこのスクリプトを使用することを強くおすすめします。</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">サポートされるレイアウト</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、intrinsic、nodisplay、responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>例</strong></td>
    <td>AMP By Example の <a href="https://ampbyexample.com/components/amp-ad/">amp-ad の例</a>をご覧ください。</td>
  </tr>
</table>

## 動作

広告は、AMP ドキュメントの他のすべてのリソースと同じように、`<amp-ad>` と呼ばれる特別なカスタム要素とともに読み込まれます。広告ネットワークから提供される JavaScript を AMP ドキュメント内で実行することはできません。代わりに、AMP ランタイムは（iframe サンドボックス経由で）別のオリジンから iframe を AMP ドキュメントとして読み込み、広告ネットワークの JavaScript をその iframe サンドボックス内で実行します。

`<amp-ad>` では、そのレイアウト タイプの[ルール](https://www.ampproject.org/docs/design/amp-html-layout#%28tl;dr%29-summary-of-layout-requirements-&amp;-behaviors)に沿って、幅と高さの値を指定する必要があります。また、表示する広告ネットワークを指定する `type` 引数が必要です。タグのすべての `data-*` 属性は、最終的に広告をレンダリングするコードに引数として自動的に渡されます。特定のタイプのネットワークで必要な `data-` 属性は広告ネットワークによって異なるため、広告ネットワークとともに記述する必要があります。

#### 例: 複数の広告の表示

<!--embedded example - displays in ampproject.org -->

<div>
  <amp-iframe height="522" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampad.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="すべて表示" overflow="" tabindex="0" role="button">コード全体を表示</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

## 属性

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
    <td><code>data-vars-</code> で始まる属性は、<a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute"><code>amp-analytics</code> の変数</a>用に予約されています。</td>
  </tr>
  <tr>
    <td width="40%"><strong>json（オプション）</strong></td>
    <td>恣意的に複雑化された JSON オブジェクトとして設定を広告に渡すには、この属性を使用します。オブジェクトは広告にそのまま渡されます。名前の分割は行われません。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id（オプション）</strong></td>
    <td>この属性を指定する場合、（Cookie に似た）ユーザーの「AMP クライアント ID」が広告に渡されるまで、指定された HTML ID による <a href="https://www.ampproject.org/docs/reference/components/amp-user-notification.html">amp-user-notification</a> の確認が必要になります。つまり、ユーザーが通知を確認するまで広告レンダリングが遅延します。</td>
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
    <td>この要素には、AMP コンポーネントに拡張された<a href="https://www.ampproject.org/docs/reference/common_attributes">共通の属性</a>が含まれます。</td>
  </tr>
</table>

## プレースホルダ

`amp-ad` は必要に応じて、`placeholder` 属性が設定された子要素をサポートします。広告ネットワークでこの子要素がサポートされている場合、広告を表示できるようになるまでこの子要素が表示されます。詳しくは、[プレースホルダとフォールバック](https://www.ampproject.org/docs/guides/responsive/placeholders)をご覧ください。

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## 表示可能な広告がない場合

スロットに表示できる広告がない場合、AMPは `amp-ad` 要素を折りたたもうとします（つまり、この要素を `display: none` に設定しようとします）。AMP は、ユーザーのスクロール位置に影響を及ぼさずにこの処理を実行できるかどうかを判断します。広告が現在のビューポート内に表示されている場合は、ユーザーのスクロール位置に影響が及ぶため、広告は折りたたまれませんが、広告が現在のビューポートの外部に表示されている場合は、広告が折りたたまれます。

折りたたむことができない場合のために、`amp-ad` コンポーネントは `fallback` 属性が設定された子要素をサポートしています。フォールバック要素が指定されている場合は、カスタマイズされたフォールバック要素が表示されます。指定されていない場合、AMP はデフォルトのフォールバックを適用します。

フォールバックが指定されている例:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## 動画広告の配信

動画広告で AMP の動画を収益化する方法には次の 3 つがあります。

1. AMP は、広告を収益化できるさまざまな動画プレーヤー（BrightCove、DailyMotion など）を標準でサポートしています。完全なリストについては、[メディア](https://www.ampproject.org/docs/reference/components#media) コンポーネントをご覧ください。

1. IMA SDK と HTML5 動画プレーヤーが組み込まれている [amp-ima-video](https://www.ampproject.org/docs/reference/components/amp-ima-video.html) コンポーネントを使用します。
1. AMP でサポートされていない動画プレーヤーを使用する場合は、[amp-iframe](https://ampbyexample.com/components/amp-iframe/) を使用してカスタム プレーヤーを提供できます。`amp-iframe` のアプローチを使用する場合は、次のようにします。

    * 最初のビューポートでプレーヤーを読み込む場合は、ポスターがあることを確認します。詳しくは、[こちら](https://www.ampproject.org/docs/reference/components/amp-iframe#iframe-with-placeholder)をご覧ください。
    * 動画とポスターは HTTPS 経由で配信する必要があります。</li>

## カスタム ドメインからの広告の掲載

AMP は、独自のドメインなどのカスタム ドメインから広告を読み込むために使用するブートストラップ iframe の読み込みをサポートしています。

この機能を有効にするには、[remote.html](../../3p/remote.html) ファイルをウェブサーバーにコピーして、次のメタタグを AMP ファイルに追加します。

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  メタタグの `content` 属性には、ウェブサーバーにコピーした remote.html ファイルの絶対 URL を指定します。この URL には「https」スキーマを使用する必要があります。このファイルを AMP ファイルと同じオリジンに格納することはできません。たとえば、AMP ファイルを `www.example.com` にホストする場合、この URL に `www.example.com` を指定することはできませんが、`something-else.example.com` は指定できます。iframe 用に使用できるオリジンについて詳しくは、[iframe のオリジン ポリシー](../../spec/amp-iframe-origin-policy.md)をご覧ください。

### セキュリティ

受信データを `draw3p` 関数に渡す前に**検証**を行って、iframe が想定どおりの動作のみを行うことを確認します。これは、カスタムの JavaScript インジェクションが可能な広告ネットワークの場合は特に当てはまります。

また、iframe は、iframe を必要とするオリジンにのみ設定する必要があります。オリジンは次のいずれかになります。

* 専用のオリジン
* AMP キャッシュの `https://cdn.ampproject.org`

AMP キャッシュの場合は、「ソースオリジン」（cdn.ampproject.org から配信されるドキュメントのオリジン）が自分のオリジンのいずれかであることを確認する必要もあります。

オリジンの適用は、`draw3p` の 3 番目の引数で行うことができます。さらに、ブラウザが完全にサポートされている場合、[allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) ディレクティブを使用して行う必要もあります。

### 配信元の広告設定の拡張

この機能はあくまでも任意です。広告サーバーへの広告リクエストを作成する前に、広告リクエストを拡張したい場合があります。

広告ネットワークが[高速フェッチ](https://www.ampproject.org/docs/ads/adnetwork_integration#creating-an-amp-ad-implementation)をサポートしている場合は、[リアルタイム設定](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)（RTC）を使用してください（たとえば、DoubleClick と AdSense の統合により、高速フェッチと RTC がサポートされます）。

広告ネットワークで遅延フェッチを使用している場合は、[remote.html](../../3p/remote.html) ファイルで `draw3p` 関数の呼び出しにコールバックを渡すことができます。コールバックは 1 つ目の引数として配信元の設定を受け取り、2 つ目の引数として別のコールバックを受け取ります（以下の例では `done` が呼び出されています）。広告レンダリングを続行するには、設定を更新してこのコールバックを呼び出す必要があります。

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

## スタイル設定

CSS の `position: fixed` が設定されているコンテナに `<amp-ad>` 要素自体を含めたり配置したりすることはできません（`amp-lightbox` を除く）。これは、ページ全体のオーバーレイ広告の UX に影響するためです。UX を一定に維持できるよう、AMP が管理するコンテナの内部で同様の広告フォーマットを使用できるようにすることが今後検討される可能性があります。

## 検証

AMP 検証ツールの仕様で [amp-ad のルール](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii)をご確認ください。

## サポートされている広告ネットワーク

* [A8](../../ads/a8.md)
* [A9](../../ads/a9.md)
* [AccessTrade](../../ads/accesstrade.md)
* [Adblade](../../ads/adblade.md)
* [AdButler](../../ads/adbutler.md)
* [Adform](../../ads/adform.md)
* [Adfox](../../ads/adfox.md)
* [Ad Generation](../../ads/adgeneration.md)
* [Adhese](../../ads/adhese.md)
* [Adincube](../../ads/adincube.md)
* [ADITION](../../ads/adition.md)
* [Adman](../../ads/adman.md)
* [AdmanMedia](../../ads/admanmedia.md)
* [Admixer](../../ads/admixer.md)
* [AdOcean](../../ads/adocean.md)
* [AdPicker](../../ads/adpicker.md)
* [AdPlugg](../../ads/adplugg.md)
* [Adpon](../../ads/adpon.md)
* [AdReactor](../../ads/adreactor.md)
* [AdSense](../../ads/google/adsense.md)
* [AdSensor](../../ads/adsensor.md)
* [AdsNative](../../ads/adsnative.md)
* [AdSpeed](../../ads/adspeed.md)
* [AdSpirit](../../ads/adspirit.md)
* [AdStir](../../ads/adstir.md)
* [AdTech](../../ads/adtech.md)
* [AdThrive](../../ads/adthrive.md)
* [AdUnity](../../ads/adunity.md)
* [Ad Up Technology](../../ads/aduptech.md)
* [Adventive](../../ads/adventive.md)
* [Adverline](../../ads/adverline.md)
* [Adverticum](../../ads/adverticum.md)
* [AdvertServe](../../ads/advertserve.md)
* [Adyoulike](../../ads/adyoulike.md)
* [Affiliate-B](../../ads/affiliateb.md)
* [AMoAd](../../ads/amoad.md)
* [AppNexus](../../ads/appnexus.md)
* [AppVador](../../ads/appvador.md)
* [Atomx](../../ads/atomx.md)
* [Baidu](../../ads/baidu.md)
* [BeOpinion](../amp-beopinion/amp-beopinion.md)
* [Bidtellect](../../ads/bidtellect.md)
* [brainy](../../ads/brainy.md)
* [Broadstreet Ads](../../ads/broadstreetads.md)
* [CA A.J.A. Infeed](../../ads/caajainfeed.md)
* [CA-ProFit-X](../../ads/caprofitx.md)
* [Cedato](../../ads/cedato.md)
* [Chargeads](../../ads/chargeads.md)
* [Colombia](../../ads/colombia.md)
* [Connatix](../../ads/connatix.md)
* [Content.ad](../../ads/contentad.md)
* [Criteo](../../ads/criteo.md)
* [CSA](../../ads/google/csa.md)
* [CxenseDisplay](../../ads/eas.md)
* [Dianomi](../../ads/dianomi.md)
* [Directadvert](../../ads/directadvert.md)
* [DistroScale](../../ads/distroscale.md)
* [Dot and Media](../../ads/dotandads.md)
* [DoubleClick](../../ads/google/doubleclick.md)
* [eADV](../../ads/eadv.md)
* [E-Planning](../../ads/eplanning.md)
* [Ezoic](../../ads/ezoic.md)
* [Felmat](../../ads/felmat.md)
* [FlexOneELEPHANT](../../ads/f1e.md)
* [FlexOneHARRIER](../../ads/f1h.md)
* [Flite](../../ads/flite.md)
* [fluct](../../ads/fluct.md)
* [FreeWheel](../../ads/freewheel.md)
* [Fusion](../../ads/fusion.md)
* [GenieeSSP](../../ads/genieessp.md)
* [Giraff](../../ads/giraff.md)
* [GMOSSP](../../ads/gmossp.md)
* [GumGum](../../ads/gumgum.md)
* [Holder](../../ads/holder.md)
* [I-Mobile](../../ads/imobile.md)
* [Imonomy](../../ads/imonomy.md)
* [iBillboard](../../ads/ibillboard.md)
* [Imedia](../../ads/imedia.md)
* [Improve Digital](../../ads/improvedigital.md)
* [Index Exchange](../../ads/ix.md)
* [Industrybrains](../../ads/industrybrains.md)
* [InMobi](../../ads/inmobi.md)
* [Innity](../../ads/innity.md)
* [Kargo](../../ads/kargo.md)
* [Kiosked](../../ads/kiosked.md)
* [Kixer](../../ads/kixer.md)
* [Kuadio](../../ads/kuadio.md)
* [Ligatus](../../ads/ligatus.md)
* [LockerDome](../../ads/lockerdome.md)
* [LOKA](../../ads/loka.md)
* [MADS](../../ads/mads.md)
* [MANTIS](../../ads/mantis.md)
* [Media.net](../../ads/medianet.md)
* [MediaImpact](../../ads/mediaimpact.md)
* [Mediavine](../../ads/mediavine.md)
* [Medyanet](../../ads/medyanet.md)
* [Meg](../../ads/meg.md)
* [MicroAd](../../ads/microad.md)
* [MixiMedia](../../ads/miximedia.md)
* [Mixpo](../../ads/mixpo.md)
* [Monetizer101](../../ads/monetizer101.md)
* [mox](../../ads/mox.md)
* [myTarget](../../ads/mytarget.md)
* [myWidget](../../ads/mywidget.md)
* [Nativo](../../ads/nativo.md)
* [Navegg](../../ads/navegg.md)
* [Nend](../../ads/nend.md)
* [NETLETIX](../../ads/netletix.md)
* [Noddus](../../ads/noddus.md)
* [Nokta](../../ads/nokta.md)
* [OneAD](../../ads/onead.md)
* [OnNetwork](../../ads/onnetwork.md)
* [Open AdStream（OAS）](../../ads/openadstream.md)
* [OpenX](../../ads/openx.md)
* [Pixels](../../ads/pixels.md)
* [plista](../../ads/plista.md)
* [polymorphicAds](../../ads/polymorphicads.md)
* [popin](../../ads/popin.md)
* [Pressboard](../../ads/pressboard.md)
* [PromoteIQ](../../ads/promoteiq.md)
* [PubGuru](../../ads/pubguru.md)
* [PubMatic](../../ads/pubmatic.md)
* [Pubmine](../../ads/pubmine.md)
* [PulsePoint](../../ads/pulsepoint.md)
* [Purch](../../ads/purch.md)
* [Rambler&amp;Co](../../ads/capirs.md)
* [RbInfoxSg](../../ads/rbinfox.md)
* [Realclick](../../ads/realclick.md)
* [recomAD](../../ads/recomad.md)
* [Red for Publishers](../../ads/rfp.md)
* [Relap](../../ads/relap.md)
* [Revcontent](../../ads/revcontent.md)
* [RevJet](../../ads/revjet.md)
* [Rubicon Project](../../ads/rubicon.md)
* [RUNative](../../ads/runative.md)
* [SAS CI 360 Match](../../ads/sas.md)
* [Sekindo](../../ads/sekindo.md)
* [Sharethrough](../../ads/sharethrough.md)
* [Sklik](../../ads/sklik.md)
* [SlimCut Media](../../ads/slimcutmedia.md)
* [Smart AdServer](../../ads/smartadserver.md)
* [smartclip](../../ads/smartclip.md)
* [sogou Ad](../../ads/sogouad.md)
* [Sortable](../../ads/sortable.md)
* [SOVRN](../../ads/sovrn.md)
* [Speakol](../../ads/speakol.md)
* [SpotX](../../ads/spotx.md)
* [SunMedia](../../ads/sunmedia.md)
* [Swoop](../../ads/swoop.md)
* [TcsEmotion](../../ads/tcsemotion.md)
* [Teads](../../ads/teads.md)
* [torimochi](../../ads/torimochi.md)
* [TripleLift](../../ads/triplelift.md)
* [Trugaze](../../ads/trugaze.md)
* [UZOU](../../ads/uzou.md)
* [ValueCommerce](../../ads/valuecommerce.md)
* [video intelligence](../../ads/videointelligence.md)
* [Videonow](../../ads/videonow.md)
* [Viralize](../../ads/viralize.md)
* [UAS](../../ads/uas.md)
* [ucfunnel](../../ads/ucfunnel.md)
* [Unruly](../../ads/unruly.md)
* [VMFive](../../ads/vmfive.md)
* [Webediads](../../ads/webediads.md)
* [Weborama](../../ads/weborama.md)
* [Widespace](../../ads/widespace.md)
* [Wisteria](../../ads/wisteria.md)
* [WPMedia](../../ads/wpmedia.md)
* [Xlift](../../ads/xlift.md)
* [Yahoo](../../ads/yahoo.md)
* [YahooJP](../../ads/yahoojp.md)
* [Yandex](../../ads/yandex.md)
* [Yengo](../../ads/yengo.md)
* [Yieldbot](../../ads/yieldbot.md)
* [Yieldmo](../../ads/yieldmo.md)
* [Yieldone](../../ads/yieldone.md)
* [Yieldpro](../../ads/yieldpro.md)
* [Zedo](../../ads/zedo.md)
* [Zucks](../../ads/zucks.md)

## サポートされている埋め込みタイプ

* [24smi](../../ads/24smi.md)
* [AJA](../../ads/aja.md)
* [Bringhub](../../ads/bringhub.md)
* [Dable](../../ads/dable.md)
* [Engageya](../../ads/engageya.md)
* [Epeex](../../ads/epeex.md)
* [Jubna](../../ads/jubna.md)
* [Outbrain](../../ads/outbrain.md)
* [Postquare](../../ads/postquare.md)
* [PubExchange](../../ads/pubexchange.md)
* [Smi2](../../ads/smi2.md)
* [Taboola](../../ads/taboola.md)
* [Zen](../../ads/zen.md)
* [ZergNet](../../ads/zergnet.md)
