---
"$title": 広告による AMP ページの収益化
"$order": '0'
description: このガイドでは、AMP ページで広告を表示する手順とベストプラクティスを紹介します。AMP で広告を表示するには、カスタム amp-ad コンポーネントを追加する必要があります...
formats:
- websites
---

このガイドでは、AMP ページで広告を表示する手順とベストプラクティスを紹介します。

## ページに広告を追加する

非 AMP ページ（従来の HTML）で広告を表示する場合、広告ネットワークから広告を配信するための JavaScript のスニペットをページに追加します。AMP ページではパフォーマンスとセキュリティ上の理由から、第三者の提供する JavaScript を含めることはできません。そのため、AMP で広告を表示するには、AMP ページにカスタムの [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) コンポーネントを追加する必要があります。

[tip type="tip"] <strong>ヒント –</strong>[ ](../../../../documentation/components/reference/amp-ad.md)<a>AMP By Example のライブデモ</a>で、AMP ページへ amp-ad タグを追加する方法をご覧いただけます。[/tip]

では、AMP ページで広告を表示できるように、コンポーネントを追加する方法を順を追って確認しましょう。

### 手順 1: amp-ad スクリプトを追加する

<a><code data-md-type="codespan">amp-ad</code></a> コンポーネントは、AMP ライブラリのカスタム広告拡張機能で、内部的には <a><code>amp-ad</code></a> はパフォーマンスの最適化を重視して設計されたカスタム JavaScript です。<a><code>amp-ad</code></a> コンポーネントを実行するには、このコンポーネントに必須の JavaScript を AMP ページの <code>head</code> セクションに追加する必要があります。

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

### 手順 2: AMP ページに amp-ad タグを追加する

100 個以上の[アドサーバーとネットワーク](ads_vendors.md)で、AMP との統合機能が組み込み込まれています。特定の広告ネットワークの広告を追加するには、<a><code data-md-type="codespan">amp-ad</code></a> タグを追加して、<code>type</code> 属性でネットワークを指定します。

この例では、a9 ネットワークの広告を配信するための広告スロットを追加しています。

```html
<amp-ad type="a9">
</amp-ad>
```

### 手順 3: 広告ユニットのサイズを指定する

Add the `width` and `height` attributes to the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)  tag.  This specifies the size of the ad on your AMP page:

```html
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### 手順 4: 広告ネットワークのパラメータを設定する

各ネットワークには、広告を配信するために必要な固有のデータ属性があります。利用する広告ネットワークの [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) のドキュメントを参照して、必要な属性を追加してください。以下の例では、a9 ネットワークで必要とされる、広告のサイズなどの詳細を指定する追加のパラメータを設定しています。

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

### 手順 5: （省略可）プレースホルダを指定する

広告ネットワークによっては、広告が表示可能となるまでの間プレースホルダを表示できます。プレースホルダを指定することで、空白のスペースが表示されるのを防ぎ、ユーザーエクスペリエンスを向上させることができます。プレースホルダを指定するには、`placeholder` 属性が設定された子要素を追加します。詳しくは、「[プレースホルダとフォールバック](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)」をご覧ください。

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### 手順 6: （省略可）フォールバックを指定する

広告ネットワークによっては、配信できる広告がない場合にフォールバック要素を表示することができます。フォールバックを指定するには、`fallback` 属性が設定された子要素を追加します。詳しくは、「[プレースホルダとフォールバック](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)」をご覧ください。

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

これで、AMP ページで広告が配信されるようになりました。

## 直接販売の AMPHTML 広告を配信する

[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) コンポーネントは、指定したネットワークの広告を配信でき、広告ネットワークで AMPHTML がサポートされているのであれば、標準的な HTML 広告と AMPHTML 広告を使用できます。直接販売広告を AMPHTML 広告として配信するには、[AMPHTML 広告の仕様](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md)の要件に従って AMPHTML で広告を作成し、[AMPHTML 広告を配信するアドサーバー](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/a4a-readme.md#publishers)を使用します。

## 広告リクエストにターゲティング データを追加する

サイト運営者は、高速フェッチ配信メカニズムのリアルタイム設定（RTC）機能を利用して、自社や第三者が実行時に取得したターゲティング情報を広告リクエストに追加することができます。RTC では個々の広告スロットにおいて、ターゲティング サーバーに対して最大 5 回のコールアウトが可能で、コールアウトの結果は広告リクエストに追加されます。広告で RTC を利用するには、ご利用の広告ネットワークが RTC と高速フェッチに対応している必要があります。

RTC について詳しくは、以下の YouTube 動画をご覧ください。

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='ヘッダー入札を利用した効果的な AMP の収益化についての動画を見る']

また、RTC に関する以下の資料でも詳細をご確認いただけます。

- [AMP RTC サイト運営者向け実装ガイド](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
- [AMP のリアルタイム設定](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)

## ベストプラクティス

AMP ページで広告効果を最大化するためのヒントをいくつか紹介します。

### プレースメントと管理: 広告のプレースメントを最適化する

- AMP ページで非 AMP ページと**同じ数の広告を配置**して、ページあたりの収益を最大化します。
- **最初の広告を最初のビューポートのすぐ下（「スクロールして最初に現れる位置」）に配置**して、最適なユーザーエクスペリエンスを提供します。
- 高度な CSS やメディアクエリを使用している場合を除き、**広告ユニットをページの中央揃えにレイアウト**して、最適なモバイルウェブエクスペリエンスをユーザーに提供します。
- AMP の広告枠で[マルチサイズ広告リクエスト](https://github.com/ampproject/amphtml/blob/master/ads/README.md#support-for-multi-size-ad-requests)を有効にして、広告オークションの競争を促進して収益の増加を図ります。

### 需要と価格設定: 適切な広告料金を得る

- **AMP ページの広告ユニットをすべての販売チャネル（直接および間接を含む）で販売**して、AMP ページの広告枠の競争率を最大限に高めます。
- **AMP ページの広告枠の価格設定**を非 AMP ページの広告枠と同程度にします。掲載結果を確認し、必要に応じて価格を調整します。
- AMP ページの広告枠で**広告需要のあるすべてのチャネルが必ず競合する**ようにして、競争を促進します。

### 広告の種類: 最も適した種類の広告を配信する

- [IAB のガイドライン](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf)に沿って、**負荷の大きいクリエイティブは避けます**。
- 広告の読み込み時にコンテンツのリフローを生じる、**インタースティシャルなどの広告形態の使用は避けます**。
- data-loading-strategy を prefer-viewability-over-views に設定して、**ビューアビリティを最適化します**。
- [サポートされているプレーヤー](../../../../documentation/components/index.html#media)や [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) を利用して**動画コンテンツ内に広告を配置**して、さまざまな種類のコンテンツを収益化します。
- **ネイティブ広告を取り入れて**、マルチサイズ広告リクエストを使用してディスプレイ広告と競合させることにより、読者に最高のユーザーエクスペリエンスを提供しながら需要圧力を高めます。

### イノベーション: 魅力にあふれる広告商品を提供する

- **付随的な AMP ページで広告を実装**することで増収を図ります。
    - [カルーセル内の広告](../../../../documentation/examples/documentation/Carousel_Ad.html)
    - [ライトボックス内の広告](../../../../documentation/examples/documentation/Lightbox_Ad.html)
    - [その他](../../../../documentation/examples/index.html)
- **直接販売広告に新しい形態を導入**し、セールスチームが影響力の強い革新的な広告商品を販売できるようにします。
    - [スティッキー広告](../../../../documentation/examples/documentation/amp-sticky-ad.html)
    - [フライングカーペット](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## その他のリソース

- [AMPHTML 広告テンプレート](../../../../documentation/examples/index.html)
- [デモ: AMP ページでの `amp-ad` の追加方法](../../../../documentation/components/reference/amp-ad.md)
