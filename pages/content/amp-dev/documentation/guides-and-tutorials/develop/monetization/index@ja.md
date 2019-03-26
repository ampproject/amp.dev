---
$title: 広告で AMP ページを収益化する
---

このガイドでは、AMP ページで広告を表示する手順とおすすめの方法を紹介します。

## ページに広告を追加する

非 AMP ページ（通常の HTML）で広告を表示する場合、通常は広告ネットワークから広告を配信するための JavaScript のスニペットをページに追加します。AMP ページではパフォーマンスとセキュリティ上の理由から、第三者の提供する JavaScript を含めることはできません。そのため、AMP で広告を表示するには、AMP ページにカスタムの [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) コンポーネントを追加する必要があります。

[tip type="success"]

[AMP By Example のライブデモ]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})で、AMP ページへ amp-ad タグを追加する方法をご覧いただけます。

[/tip]

AMP ページで広告を表示するためのコンポーネントを追加する方法を、順を追って紹介します。

### 手順 1: amp-ad スクリプトを追加する

`<amp-ad>` コンポーネントは、AMP ライブラリのカスタム広告拡張機能で、実際にはパフォーマンスの最適化を重視して設計されたカスタムの JavaScript です。`<amp-ad>` コンポーネントを実行するには、このコンポーネントに必須の JavaScript を AMP ページの `head` セクションに追加する必要があります。

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

### 手順 2: AMP ページに amp-ad タグを追加する

100 以上の[広告サーバーとネットワーク]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}})で、AMP との統合機能が組み込み込まれています。特定の広告ネットワークの広告を追加するには、`<amp-ad>` タグを追加して、`type` 属性でネットワークを指定します。

この例では、a9 ネットワークの広告を配信するための広告スロットを追加します。

```html
<amp-ad type="a9">
</amp-ad>
```

### 手順 3: 広告ユニットのサイズを指定する

`<amp-ad>` タグに `width` 属性と `height` 属性を追加します。こうした属性を追加することで、AMP ページ上の広告のサイズを指定できます。

```html hl_lines="2"
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### 手順 4: 広告ネットワークのパラメータを設定する

各ネットワークには、広告を配信するために必要な固有のデータ属性があります。利用する広告ネットワークの `<amp-ad>` のドキュメントを参照して、必要な属性を追加します。以下の例では、a9 ネットワークで必要とされる、広告のサイズなどの詳細を指定する追加のパラメータを設定しています。

```html hl_lines="3 4 5"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

### 手順 5: （省略可）プレースホルダを指定する

広告ネットワークによっては、広告が表示されるようになるまでの間プレースホルダを表示できます。プレースホルダを指定することで、空白のスペースが表示されるのを防ぎ、ユーザーの利便性を向上させることができます。プレースホルダを指定するには、`placeholder` 属性が設定された子要素を追加します。詳しくは、[プレースホルダとフォールバック]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}})をご覧ください。

```html hl_lines="6"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### 手順 6: （省略可）フォールバックを指定する

広告ネットワークによっては、利用できる広告がない場合にフォールバック要素を表示することができます。フォールバックを指定するには、`fallback` 属性が設定された子要素を追加します。詳しくは、[プレースホルダとフォールバック]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}})をご覧ください。

```html hl_lines="6"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

これで、AMP ページで広告が配信されます。

## 直接販売の AMP HTML 広告を配信する

[`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})を使用します。

## 広告リクエストにターゲティング データを追加する

サイト運営者は、高速フェッチ配信メカニズムのリアルタイム設定（RTC）機能を利用して、自社や第三者が実行時に取得したターゲティング情報を広告リクエストに追加することができます。RTC では個々の広告スロットにおいて、ターゲティング サーバーに対して最大 5 回のコールアウトが可能で、コールアウトの結果は広告リクエストに追加されます。広告で RTC を利用するには、お使いの広告ネットワークが RTC と高速フェッチに対応している必要があります。

RTC について詳しくは、以下の YouTube 動画をご覧ください。

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='ヘッダー入札を利用した効果的な AMP の収益化についての動画を見る']

また、RTC に関する以下の資料でも詳細をご確認いただけます。

*   [AMP RTC サイト運営者向け実装ガイド](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
*   [AMP のリアルタイム設定](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)

## おすすめの方法

AMP ページで広告効果を最大化するためのヒントをいくつか紹介します。

### プレースメントと管理: 広告のプレースメントを最適化する

*   **AMP ページで非 AMP ページと同じ数の広告の配置**して、ページあたりの収益を最大化します。
*   **最初の広告を最初のビューポートのすぐ下（「スクロールして最初に現れる位置」）に配置**して、最適なユーザー エクスペリエンスを提供します。
*   高度な CSS やメディアクエリを使用している場合を除き、**広告ユニットをページの中央揃えにレイアウト**して、最適なモバイルウェブ エクスペリエンスをユーザーに提供します。
*   AMP の広告枠で[マルチサイズ広告リクエスト](https://github.com/ampproject/amphtml/blob/master/ads/README.md#support-for-multi-size-ad-requests)を有効にして、広告オークションの競争を促進して収益の増加を図ります。

### 需要と価格設定: 適切な広告料金を得る

*   **AMP ページでの広告ユニットをすべての販売チャネル（直接および間接を含む）で販売**して、AMP ページの広告枠の競争率を最大限に高めます。
*   **AMP ページでの広告枠の価格設定**を非 AMP ページでの広告枠と同程度にします。掲載結果を確認し、必要に応じて価格を調整します。
*   AMP ページでの広告枠で**広告需要のあるすべてのチャネルが必ず競合する**ようにして、競争を促進します。

### 広告の種類: 最も適した種類の広告を配信する

*   [IAB のガイドライン](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf)に沿って、**負荷の大きいクリエイティブは避けます**。
*   広告の読み込み時にコンテンツのリフローが発生する、**インタースティシャルなどの広告フォーマットの使用は避けます**。
*   data-loading-strategy を prefer-viewability-over-views に設定して、**視認性を最適化します**。
*   [サポートされているプレーヤー]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}#media).url.path}}) を利用して**動画コンテンツ内に広告を配置**して、さまざまな種類のコンテンツを収益化します。
*   **ネイティブ広告を取り入れて**、マルチサイズ広告リクエストを使用してディスプレイ広告と競合させることにより、読者に高い利便性を提供するとともに、需要圧力を高めます。

### イノベーション: 高い魅力を持った広告プロダクトを提供する

*   **付随的な AMP ページで広告を実装**することで増収を図ります。
    *   [カルーセル内の広告]({{g.doc('/content/amp-dev/documentation/examples/documentation/Carousel_Ad.html', locale=doc.locale).url.path}})
    *   [ライトボックス内の広告]({{g.doc('/content/amp-dev/documentation/examples/documentation/Lightbox_Ad.html', locale=doc.locale).url.path}})
    *   [その他]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}})
*   **直接販売の広告に新しいフォーマットを導入**し、セールスチームが影響力の強い革新的な広告プロダクトを販売できるようにします。
    *   [追尾広告]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-sticky-ad.html', locale=doc.locale).url.path}})
    *   [フライングカーペット]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-fx-flying-carpet.html', locale=doc.locale).url.path}})

## その他のリソース

*   [AMP HTML 広告テンプレート]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}})
*   [デモ: AMP ページでの `amp-ad` の追加方法]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
