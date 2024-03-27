---
'$title': カルーセルの追加
$order: 3
description: モバイルページでよく使われるもう 1 つの機能はカルーセルです。amp-carousel コンポーネントを使用すると、AMP ページにカルーセルを簡単に追加できます。
---

モバイルページでよく使われるもう 1 つの機能はカルーセルです。[`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) コンポーネントを使用すると、AMP ページにカルーセルを簡単に追加できます。まずは、画像のカルーセルなどの簡単な例から見てみましょう。

## シンプルな画像のカルーセル

次の JavaScript リクエストをドキュメントの `<head>` タグに**追加**して、必ず [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) コンポーネントライブラリを含めてください。

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

次に、幅と高さをあらかじめ定義して、シンプルな画像のカルーセルをレスポンシブレイアウトに埋め込んでみましょう。ページに以下を**追加**します。

```html
<amp-carousel layout="fixed-height" height="168" type="carousel">
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

ページを**更新**すると、次のカルーセルが表示されます。

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='シンプルな画像のカルーセル') }}

[`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) コンポーネントはさまざまな方法で設定できます。一度に 1 つの画像のみが表示されるように UI を変更して、カルーセルをレスポンシブレイアウトにしてみましょう。

これを行うには、まず [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) の `type` を `carousel` から `slides` に**変更**し、`layout` を `responsive` に**変更**して、`width` を 300 に**設定**します（`height` と `width` の両方を必ず定義してください）。`"layout=responsive"` 属性を [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) の子コンポーネント [`amp-img`](../../../../documentation/components/reference/amp-img.md) に**追加**します。

ページを**再読み込み**します。今度は、一連の要素がスクロールされるのではなく、一度に 1 つの要素が表示されます。横方向に**スワイプ**して、要素間を移動してみてください。3 番目の要素までスワイプすると、それ以上スワイプできなくなります。

次に、`loop` 属性を**追加**します。ページを**更新**し、すぐに左にスワイプしてみてください。カルーセルは無限にループします。

最後に、このカルーセルが 2 秒おきに自動で回転するようにしましょう。[`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) に `autoplay` 属性と、値を `2000` に指定した `delay` 属性（例: `delay="2000"`）を**追加**します。

最終結果は次のようになります。

```html
<amp-carousel
  layout="responsive"
  width="300"
  height="168"
  type="slides"
  autoplay
  delay="2000"
  loop
>
  <amp-img
    src="mountains-1.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-2.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-3.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
</amp-carousel>
```

ページを**更新**して回転してみましょう。

[tip type="note"] <strong>注意:</strong> [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) のタイプが `carousel` のときに使用したレイアウトタイプが `fixed-height` だったことにお気づきでしょうか。`carousel` タイプでサポートされるレイアウトタイプは限られています。たとえば、`carousel` タイプでは `responsive` レイアウトをサポートしていません。名前が示すように、fixed-height 要素は使用できるスペースを占有しますが、高さは変わりません。fixed-height 要素の場合、`height` 属性の定義は必須ですが、`width` 属性は `auto` に設定することも、未設定のままにすることもできます。[/tip]

## カルーセルコンテンツの混在

画像のカルーセルは優れた効果を発揮しますが、より複雑なコンテンツをカルーセルに表示するにはどうすればよいでしょうか。では、広告、テキスト、画像をすべて 1 つのカルーセルに配置し、組み合わせて使ってみましょう。[`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) は本当にそのようなコンテンツの組み合わせをすべて同時に処理できるでしょうか。もちろん処理できます。

まず、次のスタイルを `<style amp-custom>` に**追加**して、[`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) および [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) コンポーネントが一体となって安全に機能するようにします。

```css
amp-fit-text {
  white-space: normal;
}
```

次に、シンプルなカルーセルを次のものと**置き換え**ます。

```html
<amp-carousel layout="fixed-height" height="250" type="carousel">
  <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

  <amp-ad
    width="300"
    height="250"
    type="doubleclick"
    data-slot="/35096353/amptesting/image/static"
  >
    <div placeholder>This ad is still loading.</div>
  </amp-ad>

  <amp-fit-text width="300" height="250" layout="fixed">
    Big, bold article quote goes here.
  </amp-fit-text>
</amp-carousel>
```

ページを**更新**すると、次のように表示されます。

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='コンテンツを組み合わせたカルーセル') }}

詳しくは、[`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) コンポーネントのリファレンスドキュメントをご覧ください。

[tip type="note"] <strong>注意:</strong> 最後の例では、[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) コンポーネントに `placeholder` 属性を持つ子要素 `div` が含まれていたことにお気づきですか。このチュートリアルの前半では、`fallback` 属性を持つ [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) の同様のシナリオがありました。プレースホルダとフォールバックの違いは何でしょうか。`fallback` 要素は、親要素が読み込まれなかった場合、つまり利用可能な広告がない場合に表示されます。一方 `placeholder` 要素は、読み込み中に親要素の代わりに表示されます。いわば、これらは親要素の読み込みプロセスの前後に表示される要素です。詳しくは、[プレースホルダとフォールバック](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)をご覧ください。[/tip]
