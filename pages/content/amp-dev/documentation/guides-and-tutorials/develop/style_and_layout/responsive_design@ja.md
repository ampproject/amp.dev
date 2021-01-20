---
$title: レスポンシブな AMP ページを作成する
---

## はじめに

レスポンシブ ウェブ デザインとは、ユーザーのニーズに対応する可変レイアウトのウェブページ、つまり端末の画面のサイズや向きにフィットするページを作成することです。AMP ではレスポンシブ ウェブ デザインを簡単に実現できます。AMP はあらゆる種類の画面や端末に対応しており、組み込みのレスポンシブ コンポーネントを提供しています。

このガイドでは、次のようなレスポンシブの基本要素を AMP を利用して実装する方法について説明します。

- [ビューポートの制御](#controlling-the-viewport)
- [レスポンシブ レイアウトの作成](#creating-a-responsive-layout)
- [メディアの拡大縮小](#scaling-media-for-the-page)

## ビューポートの制御 <a name="controlling-the-viewport"></a>

ウェブページを最適化して、拡大縮小によってコンテンツがあらゆる端末のブラウザ ウィンドウに収まるようにするには、`meta` ビューポート要素を指定する必要があります。このビューポート要素は、ブラウザでウェブページの表示エリア（ビューポート）をどのように拡大縮小およびサイズ設定するかを指定します。

この要素にどの値を使用するかが問題になりますが、AMP では指定する値がすでに決まっています。AMP ページ用の[必須のマークアップ](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#required-markup)の一環として、下記のようにビューポートを指定する必要があります。

```html
<meta name="viewport" content="width=device-width" />
```

上記は、レスポンシブ サイトに使用する一般的なビューポートの設定です。有効な AMP ページにするうえで `initial-scale=1` は必須ではありませんが、そうすることでページが最初に読み込まれるときのズームレベルが 1 に設定されるため、このように設定することをおすすめします。

## レスポンシブ レイアウトの作成 <a name="creating-a-responsive-layout"></a>

レスポンシブ デザインでは、CSS の [`@media`](https://developer.mozilla.org/ja/docs/Web/CSS/@media) クエリを使用して、ページのコンテンツを変更することなく、さまざまな画面サイズに合わせてウェブページのスタイルを調整できます。AMP でも、同じ CSS の `@media` クエリを引き続き使用できます。さらに、AMP 要素をより細かく制御するために、要素に `media` 属性を指定できます。これは特に、メディアクエリに基づいて要素を表示または非表示にする必要がある場合に役立ちます。`media` 属性の使用例については、[画像のアート ディレクションを変更する](#changing-the-art-direction-of-an-image)をご覧ください。

各要素をサイズ変更して画面にフィットさせる処理は、複雑になる場合があります。<sup><a href="#fn1" id="ref1">\*</a></sup>しかし、AMP では、要素の `width` および `height` 属性と一緒に `"layout=responsive"` 属性を指定するだけで、要素を簡単にレスポンシブにすることができます。要素に `responsive` レイアウトを適用すると、その要素はコンテナ要素の幅と同じになるよう自動的にサイズ変更され、高さも要素の `width` と `height` によって指定されるアスペクト比に基づいて変更されます。ほとんどの AMP 要素が `responsive` レイアウトに対応しています。対応しているレイアウトについては各要素のリファレンス ドキュメントをご覧ください。

要素は `"layout=responsive"` を指定することで簡単にレスポンシブにできますが、引き続き、パソコンやタブレットを含むすべての画面サイズで要素の表示がどうなるかについて考慮する必要があります。よくあるミスとして、画像が画面の幅全体を使ってしまうことが挙げられます。その場合、意図したサイズ以上に画像が広がってしまい、大画面のユーザーの利便性の低下につながります。デフォルトでは、`layout=responsive` が指定された要素はコンテナ要素の幅全体を使用します。多くの場合、そうした要素では幅は制限されていません（つまり、width=100%）。画像のコンテナの幅を制限するだけで、画像の表示を改善できます。たとえば、"body" または "main" に "max-width" のルールを設定することで、すべての画像の最大幅を特定の値に制限できます。

##### 例: レスポンシブな画像の幅を制限する

以下の例では、花の画像（640 x 427 px）を表示します。あらゆる画面サイズでこの画像を表示したいので、`width` と `height` を指定し、レイアウトを `responsive` に設定しています。

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

ただし、所定のサイズ以上に画像が広がらないよう、カスタム CSS を介してコンテナの `max-width` を 700 px に設定しています。

```html
<style amp-custom>
  .resp-img {
    max-width: 700px;
  }
</style>
```

詳細情報: AMP のさまざまなレイアウトについて詳しくは、[レイアウトとメディアクエリ](control_layout.md#the-layout-attribute)をご覧ください。

<a id="fn1"></a>
[tip type="note"]
**\* "width=100%" スタイルを使って要素を簡単にサイズ変更できるのに、要素をサイズ変更して画面にフィットさせる処理が複雑である理由: ** レスポンシブな要素を、パフォーマンス指標やユーザーの利便性に悪影響を与えずにページに表示する処理が、複雑な部分になります。"width=100%" を指定すれば簡単に画像を画面にフィットさせることができますが、パフォーマンスへの影響が生じます。ブラウザは、まず画像をダウンロードして画像のサイズを取得し、次に画面サイズに合わせて画像をサイズ変更したうえで、ページをリフローおよび再描画する必要があります。AMP ではレンダリング パスが最適化されており、まずページのレイアウトが行われ、その際に [`amp-img`](../../../../documentation/components/reference/amp-img.md) で指定されたサイズに基づいて画像のプレースホルダが確保され（その値を使用してアスペクト比を算出）、次にリソースがダウンロードされて、ページが描画されます。リフローは不要となっています。
[/tip]

## ページに合わせたメディアの拡大縮小 <a name="scaling-media-for-the-page"></a>

画面の特性に応じてページ上にメディアを正しく表示することは、レスポンシブ デザインで最も難しい部分かもしれません。このセクションでは、AMP ページにレスポンシブな動画や画像を埋め込む方法について説明します。

### 動画を埋め込む

ウェブページに動画を含める場合、ユーザーに動画のコンテンツと動画のコントローラが適切に表示されるようにする（つまり、オーバーフローしないようにする）必要があります。そのためには通常、CSS メディアクエリ、コンテナ、他の CSS を組み合わせて使用します。AMP では、ページに動画の要素を追加し、その要素に `layout=responsive` を指定するだけで済みます。その他の CSS は不要です。

##### 例: YouTube 動画を埋め込む

以下の例では、埋め込んだ YouTube 動画を、端末の画面のサイズと向きに合わせて表示します。[`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) 要素に `"layout=responsive"` を追加することで、動画はウィンドウに収まるようにサイズ変更され、指定された `width` と `height` に沿ってアスペクト比が保たれます。

[example preview="top-frame" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

AMP ページには数多くの種類の動画を追加できます。詳しくは、利用可能な[メディア コンポーネント](../../../../documentation/components/index.html)の一覧をご覧ください。

### レスポンシブな画像を表示する <a name="displaying-responsive-images"></a>

画像はウェブページの大部分（[ページのデータ量の約 65%](http://httparchive.org/interesting.php#bytesperpage)）を構成しています。少なくとも、どのような画面サイズや画面の向きでも画像が表示される（つまり、スクロール、ピンチ、ズームをしなくても画像全体を見られる）ようにする必要があります。AMP では `"layout=responsive"` 属性を使ってこれを簡単に実現できます（[画像や動画を含める](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)をご覧ください）。基本となるレスポンシブの画像に加えて、複数の画像リソースを配信して次のようにすることをおすすめします。

- [解像度に合った鮮明な画像を配信する](#serving-crisp-images-for-the-right-resolution)
- [画像のアート ディレクションを変更する](#changing-the-art-direction-of-an-image)
- [最適な形式の画像を配信する](#providing-optimized-images)

#### 解像度に合った鮮明な画像を配信する <a name="serving-crisp-images-for-the-right-resolution"></a>

高解像度の画面（Retina ディスプレイなど）ではくっきりとした鮮明な画像を配信するメリットはありますが、低解像度の端末では不必要に長い読み込み時間の原因となることから、同じ画像を使用するのは避けるべきです。`srcset` に幅の記述子（`w`）を使用することで、非 AMP ページと AMP ページの両方で画面のピクセル密度に応じて適切な画像を配信できます。

注: DPR（`x`）ベースの srcset セレクタでも機能しますが、柔軟性を高めるために `w` セレクタの使用をおすすめします。以前は（古い srcset の提案では）、`w` 記述子はビューポートの幅を指していましたが、現在は画像のソースファイルの幅を指すように変更されており、ユーザー エージェントでこの値を使用して各画像の実際のピクセル密度を計算し、適切な画像を選択して表示することができます。

##### 例: 画面にフィットするくっきりした画像を表示する

以下の例では、アスペクト比が同じで解像度の異なる複数の画像ファイルが使用されています。さまざまな解像度の画像を用意することで、ブラウザが端末の解像度に応じて最適な画像を選択できます。さらに、画像の表示サイズを次のように指定しています。

- ビューポートの幅が 400 px 以下の場合、画像をビューポートの幅の 100% で表示します。
- ビューポートの幅が 900 px 以下の場合、画像をビューポートの幅の 75% で表示します。
- 900 px より大きい場合、画像を 600 px の幅で表示します。

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="apple"
  src="{{server_for_email}}/static/inline-examples/images/apple.jpg"
  height="596"
  width="900"
  srcset="{{server_for_email}}/static/inline-examples/images/apple-900.jpg 900w,
            {{server_for_email}}/static/inline-examples/images/apple-800.jpg 800w,
            {{server_for_email}}/static/inline-examples/images/apple-700.jpg 700w,
            {{server_for_email}}/static/inline-examples/images/apple-600.jpg 600w,
            {{server_for_email}}/static/inline-examples/images/apple-500.jpg 500w,
            {{server_for_email}}/static/inline-examples/images/apple-400.jpg 400w"
  sizes="(max-width: 400px) 100vw,
            (max-width: 900px) 75vw, 600px"
>
</amp-img>
```

[/example]

たとえば、端末のビューポートの幅が 412 px で DPR が 2.6 の場合、上記のコードに基づいて画像をビューポートの幅の 75% で表示する必要があるため、ブラウザは 803 px（412 _ 0.75 _ 2.6）に近い画像である `apple-800.jpg` を選択します。

詳細情報: AMP での srcset と sizes の使用について詳しくは、[srcset、sizes、heights を使ったレスポンシブな画像](art_direction.md)をご覧ください。

#### 画像のアート ディレクションを変更する <a name="changing-the-art-direction-of-an-image"></a>

アート ディレクションとは、特定のブレークポイント向けに画像のビジュアル特性を適合させることを指します。たとえば、画面の幅が狭くなったら単に画像を縮小するのではなく、トリミングして焦点を絞ったバージョンの画像を配信したり、ブレークポイントごとに完全に別の画像を配信したりするほうがよい場合があります。HTML ではそうした処理を `picture` 要素を使って実現できます。AMP では `media` 属性を使うことでアート ディレクションを実現できます。

##### 例: ブレークポイントによって異なるサイズの画像を配信する

以下の例では、ある猫の画像を異なる形でトリミングしたファイルが 3 つあり、それぞれを別々のブレークポイントで表示します。ビューポートの幅に応じて次のように処理されます。

- 670 px 以上の場合、`cat-large.jpg`（650 x 340 px）を表示
- 470 ～ 669 px の場合、`cat-medium.jpg`（450 x 340 px）を表示
- 469 px 以下の場合、`cat-small.jpg`（226 x 340 px）を表示

注: 画像のサイズを固定する（つまり、歪みが生じないようにする）必要があるため、レイアウトの値は指定していません。幅と高さが設定されているため、デフォルトで `layout=fixed` に設定されます。詳しくは、[「layout 属性が指定されていない場合」](control_layout.md#what-if-the-layout-attribute-isnt-specified)をご覧ください。

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="grey cat"
  media="(min-width: 670px)"
  width="650"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-large.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(min-width: 470px) and (max-width: 669px)"
  width="450"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-medium.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(max-width: 469px)"
  width="226"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-small.jpg"
></amp-img>
```

[/example]

詳細情報: AMP でのアート ディレクションについて詳しくは、[srcset、sizes、heights を使ったレスポンシブな画像](art_direction.md)をご覧ください。

#### 最適な画像を配信する <a name="providing-optimized-images"></a>

読み込みの速いページを配信するには、画像のサイズ、品質、形式を最適化する必要があります。常に、ファイルサイズを許容される最低限の品質レベルまで小さくしてください。[ImageAlpha](http://pngmini.com/lossypng.html) や [TinyPNG](https://tinypng.com/) などのさまざまなツールを利用して、画像を「圧縮」できます。また、一部の画像形式では、圧縮能力が他の形式よりも優れています（例: WebP や JPEG XR のほうが JPEG よりも圧縮能力に優れています）。ユーザーに最も適した画像を配信するとともに、ユーザーのブラウザが対応している画像を配信する必要があります（[ブラウザによっては対応していない画像形式があります](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)）。

HTML では `picture` タグを使うことで、異なる画像形式を配信できます。AMP では `picture` タグはサポートされていませんが、`fallback` 属性を使うことで、異なる画像を配信できます。

詳細情報: フォールバックについて詳しくは、[プレースホルダとフォールバック](placeholders.md)をご覧ください。

##### 例: 異なる画像形式を配信する

以下の例では、ブラウザが WebP に対応している場合は mountains.webp を配信し、対応していない場合は mountains.jpg を配信します。

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

便利なことに、Google AMP Cache など一部のキャッシュでは、画像が自動的に圧縮されて WebP 形式や適切な解像度に変換されます。ただし、キャッシュを利用していないプラットフォームもあるため、デベロッパーの側でも手動で画像を最適化する必要があります。

詳細情報: Google AMP Cache によって適用される画像の最適化について詳しくは、ブログ記事[「Google AMP Cache、AMP Lite、そして高速化のニーズ」](https://developers-jp.googleblog.com/2017/01/google-amp-cache-and-amp-lite.html)をご覧ください。

## 参考となる例

レスポンシブ AMP ページを作成するうえでの参考となる例をいくつか紹介します。

#### 本番環境

- [Getty Images「2016 in Focus」](http://www.gettyimages.com/2016/)
- [BRIT + CO の Holiday Gift Guide](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### AMP によるページ作成の参考情報

- [Examples: サンプルとテンプレート](../../../../documentation/examples/index.html)
- [Templates](../../../../documentation/templates/index.html)
- [AMP Conf ワークショップ コードラボ: 美しい AMP の作成](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)
