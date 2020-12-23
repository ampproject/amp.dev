---
"$title": 検証エラーの解決
"$order": '2'
description: ここでは、AMP ページでの AMP 検証エラーを確認し、解決していきます。お使いのコンソールでは、異なる順序でエラーが表示される場合がありますので、ご了承ください。
---

ここでは、AMP ページでの AMP 検証エラーを確認し、解決していきます。お使いのコンソールでは、異なる順序でエラーが表示される場合がありますので、ご了承ください。

## 文字セットを指定する

まず、次のエラーを修正します。

<pre class="error-text">
The mandatory tag 'meta charset=utf-8' is missing or incorrect.
</pre>

AMP でテキストを正しく表示するには、ページの文字セットを指定する必要があります。また、`<head>` タグの最初の子として、meta charset 情報を指定する必要があります。このタグを最初に指定する理由は、meta charset タグより前に追加されたコンテンツを再解釈しないようにするためです。

`<head>` タグの最初の行として次のコードを**追加**します。

```html
<meta charset="utf-8" />
```

ファイルを**保存**して、ページを再読み込みします。文字セットエラーが表示されなくなったことを確認します。

## 正規リンクを指定する

次のエラーを見てみましょう。

<pre class="error-text">
The mandatory tag 'link rel=canonical' is missing or incorrect.
</pre>

すべての AMP ドキュメントで、そのドキュメントの「正規（canonical）」バージョンを参照するリンクを指定する必要があります。正規ページの概要と正規リンクのさまざまな手法については、このチュートリアルの[ページが検出されるようにする](discoverable.md)の手順で詳しく取り上げます。

このチュートリアルでは、正規ページに変換する元の HTML 記事を検討しましょう。

`<meta charset="utf-8" />` タグの下に次のコードを**追加**します。

```html
<link rel="canonical" href="/article.html">
```

[tip type="note"] 単独の正規の AMP ページを作成できます。その場合でも正規リンクは必要ですが、AMP 記事自体を指すようにしてください。

```html
<link rel="canonical" href="article.amp.html">
```

[/tip]

ここで、ページを**再読み込み**します。まだ修正すべき多数のエラーがありますが、正規リンクのエラーは表示されなくなりました。

## AMP 属性の指定

AMP では、ページのルートの `<html>` 要素で属性を指定し、ページを AMP ドキュメントとして宣言する必要があります。

<pre class="error-text">
The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'
The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.
</pre>

上記のエラーを解決するには、次のように、`<html>` タグに `⚡` 属性を追加します。

```html
<html ⚡ lang="en">
```

ページを再読み込みして、両方のエラーがなくなったことを確認しましょう。

[tip type="note"] `⚡` を指定するのがおすすめの方法ですが、次のように、`⚡` 属性の代わりに `amp` 属性を使用することもできます。

```html
<html amp lang="en">
```

[/tip]

## ビューポートの指定

次は、以下のエラーを対処しましょう。

<pre class="error-text">
The mandatory tag 'meta name=viewport' is missing or incorrect.
</pre>

AMP にはビューポートの `width` と `minimum-scale` の定義が必要です。これらの値はそれぞれ、`device-width`、`1` と定義する必要があります。ビューポートは、HTML ページの `<head>` タグに含まれる共通のタグです。

ビューポートに関するエラーを解決するには、次の HTML スニペットを `<head>` タグに追加します。

```html
<meta name="viewport" content="width=device-width">
```

`width` と `minimum-scale` に指定する値は、AMP で必須の値です。`initial-scale` の定義は必須ではありませんが、モバイルウェブの開発では指定するのが一般的であり、おすすめします。ビューポートとレスポンシブデザインについて詳しくは、[ビューポートの設定](https://developers.google.com/speed/docs/insights/ConfigureViewport)をご覧ください。

先ほどと同じように、ページを**再読み込み**して、エラーが消えたかどうか確認しましょう。

## 外部スタイルシートの置き換え

次のエラーはスタイルシートの使用に関連しています。

<pre class="error-text">
The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.
</pre>

特にこのエラーは、`<head>` タグ内の次のスタイルシート リンクタグについて指摘しています。

```html
<link href="base.css" rel="stylesheet" />
```

問題は、これが外部スタイルシートの参照であることです。AMP では、ドキュメントの読み込み時間をできるだけ高速にするために、外部スタイルシートを使用できないようになっています。代わりに、AMP ドキュメントでは、<code><style amp-custom></style></code> タグを使って、すべてのスタイルシートのルールをインラインで追加する必要があります。

```html
<style amp-custom>

/* The content from base.css */

</style>
```

それでは、エラーを解決しましょう。

1. `<head>` 内でスタイルシートを指している `<link>` タグを**削除**し、インラインの `<style amp-custom></style>` タグで置き換えます。style タグの `amp-custom` 属性は必須です。
2. [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) ファイルから `<style amp-custom></style>` タグに、すべてのスタイルを**コピー**します。

ここで再び、ページを**再読み込み**して、スタイルシートに関するエラーが消えたことを確認しましょう。

[tip type="note"] <strong>注意:</strong>   インラインのスタイル指定が必須なだけでなく、すべてのスタイル情報について 50 KB というファイルサイズの制限もあります。AMP ページで CSS をインライン化する前に、[SASS](http://sass-lang.com/) などの CSS プリプロセッサを使用して CSS を圧縮してください。 [/tip]

[tip type="important"] <strong>重要:</strong> AMP ドキュメント全体で style タグは 1 つだけ指定できます。AMP ページで複数の外部スタイルシートを参照している場合は、これらのスタイルシートを 1 セットのルールにまとめる必要があります。AMP で有効な CSS ルールについて詳しくは、[サポートされる CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md) をご覧ください。 [/tip]

## サードパーティ JavaScript の除外

CSS をインライン化することにより、スタイルシートは比較的簡単に AMP に合わせて修正できますが、JavaScript にはこれは当てはまりません。

<pre class="error-text">
The tag 'script' is disallowed except in specific forms.
</pre>

一般に AMP では、次の 2 つの主な要件を満たした場合にのみ、スクリプトが許可されます。

1. すべての JavaScript を非同期にする必要があります（script タグで `async` 属性を指定します）。
2. ページ上の JavaScript は AMP ライブラリ用と AMP コンポーネント用です。

つまり、実際には、以下の場合を除いて、ユーザーが作成した JavaScript やサードパーティの JavaScript は AMP では使用できません。

[tip type="note"] ユーザーが作成したスクリプトやサードパーティのスクリプトに対する制限には、次のような例外があります。

1. ページにメタデータを追加するスクリプトや、AMP コンポーネントを設定するスクリプト。これらには、type 属性 `application/ld+json` または `application/json` を指定します。
2. iframe に含まれるスクリプト。iframe に JavaScript を含める方法は、最終手段と考えてください。可能な限り、[AMP コンポーネント](../../../../documentation/components/index.html)を使用して JavaScript の機能を置き換えてください。次のセクションでは、最初の AMP コンポーネントについて検討します。 [/tip]

外部の [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js) ファイルを開いてみましょう。どのようになっていますか。このファイルでは JavaScript コードは空になっていて、次のような情報のコメントのみが含まれているはずです。

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

この外部 JavaScript ファイルはウェブサイトの機能的なコンポーネントではないため、参照全体を削除してかまいません。

ドキュメントから次の外部 JavaScript の参照を**削除**します。

```html
<script type="text/javascript" src="base.js"></script>
```

ここで、ページを**再読み込み**して、スクリプトに関するエラーが消えたことを確認しましょう。

## AMP CSS ボイラープレートの指定

以下のエラーでは、ボイラープレート コードがないことを指摘しています。

<pre class="error-text">
The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.
The mandatory tag 'head > style : boilerplate' is missing or incorrect.
The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.
</pre>

すべての AMP ドキュメントには次のような AMP ボイラープレート コードが必要です。

```html
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
```

ドキュメントの `<head>` タグの下部にボイラープレート コードを**追加**します。

`<style amp-boilerplate>` タグでは、AMP JavaScript ライブラリが読み込まれるまで、最初は本文のコンテンツを非表示にしておき、その後で、コンテンツをレンダリングします。これは、「FOUC（Flash Of Unstyled Content）」とも呼ばれる、スタイルが指定されていないコンテンツがレンダリングされる現象を防ぐための対策です。これにより、ページのコンテンツがすべて一度に表示され、スクロールせずに見える範囲が一緒にレンダリングされるので、ユーザーにとっては瞬時に表示されるように感じられます。2 番目のタグでは、ブラウザで JavaScript が無効になっている場合に、このロジックを元に戻します。

## `<img>` を `<amp-img>` で置き換える

AMP では、メディアの表示に対応するデフォルトの HTML をサポートしていません。そのため、次のようなエラーが発生します。

<pre class="error-text">
The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
</pre>

AMP には、`<img>` タグを置き換えるための専用のウェブコンポーネントとして、[`<amp-img>`](../../../../documentation/components/reference/amp-img.md) タグが用意されています。

```html
<amp-img src="mountains.jpg"></amp-img>
```

`<img>` タグを上記の [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) タグで**置き換えて**から、Validator を再度実行してください。新しいエラーがいくつか発生します。

<pre class="error-text">
Layout not supported: container
The implied layout 'CONTAINER' is not supported by tag 'amp-img'.
</pre>

なぜ [`amp-img`](../../../../documentation/components/reference/amp-img.md) によって別のエラーが発生したのでしょうか。[`amp-img`](../../../../documentation/components/reference/amp-img.md) は従来の HTML img タグを直接置き換えたものではないからです。[`amp-img`](../../../../documentation/components/reference/amp-img.md) を使用する場合は、追加の要件があります。

### AMP のレイアウト システム

このレイアウト エラーは、[`amp-img`](../../../../documentation/components/reference/amp-img.md) が `container` レイアウト タイプをサポートしていないことを伝えています。AMP の設計における最も重要な概念の 1 つは、ウェブページのレンダリングに必要な DOM リフローの量を削減することに重点を置いている点です。

DOM リフローを削減するため、AMP には、ページのダウンロードとレンダリングのライフサイクルのできるだけ早い段階で、ページのレイアウトを認識できるようにするレイアウト システムがあります。

下の図は、HTML ページの通常のレイアウトの仕組みと AMP の手法を比較したものです。左側の方法では、広告や画像が読み込まれるたびにテキストがリフローされる様子がわかります。これに対し、AMP のレイアウト方法では、画像や広告の読み込みに時間がかかる場合でも、テキストが移動されることはありません。

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="コンテンツの通常のレイアウトの仕組みと AMP の手法の比較") }}

AMP のレイアウト システムでは、ページ上の要素をさまざまな方法（サイズの固定、レスポンシブ デザイン、高さの固定など）で配置し、拡大縮小できます。

この記事のケースでは、レイアウト システムは [`amp-img`](../../../../documentation/components/reference/amp-img.md) のレイアウト タイプを `container` タイプと推測しました。しかし、`container` タイプは、子要素を含む要素にのみ適用可能です。`container` タイプは [`amp-img`](../../../../documentation/components/reference/amp-img.md) タグに対応していないため、このエラーの原因となりました。

なぜ `container` タイプが推測されたのでしょうか。その理由は、[`amp-img`](../../../../documentation/components/reference/amp-img.md) タグに `height` 属性を指定していなかったためです。HTML では、ページ上の要素に固定の幅と高さを常に指定することで、リフローを削減できます。AMP では、AMP が要素のアスペクト比を事前に判断できるように、amp-img 要素の幅と高さを定義する必要があります。

次のように、[`<amp-img>`](../../../../documentation/components/reference/amp-img.md) タグに `width` と `height` を**追加**してください。

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

ページを更新して、Validator で確認してみましょう。エラーが表示されなくなるはずです。

これで有効な AMP ドキュメントになりましたが、ページ上の配置が不自然なため、画像の見栄えがよくありません。デフォルトでは、[`amp-img`](../../../../documentation/components/reference/amp-img.md) の高さと幅を指定した場合、AMP は指定に合わせてサイズを修正します。しかし、どのような画面サイズでも、AMP が画像を*レスポンシブ*に拡大縮小してページに合わせられたら、最適でしょう。

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="この画像はレスポンシブではない")}}

AMP では、指定された幅と高さから要素のアスペクト比を算出できます。それにより、AMP レイアウト システムはさまざまな方法で要素を配置し、拡大縮小できます。`layout` 属性は、要素をどのように配置し、拡大縮小するかを AMP に伝えます。

画像の拡大縮小とサイズ変更が行われるように、layout 属性を `responsive` に**設定**しましょう。

```html
<amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
```

これで、画像が正しいアスペクト比になり、画面の幅にレスポンシブに収まりました。

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="画像がレスポンシブになった") }}

[tip type="read-on"] <strong>参考情報:</strong> AMP レイアウトシステムについて詳しくは、[AMP レイアウトの仕様](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)をご覧ください。 [/tip]

## エラーをすべて解決！

AMP ドキュメントは次のようになります。

```html
<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width">

    <link rel="canonical" href="/article.html">
    <link rel="shortcut icon" href="amp_favicon.png">

    <title>News Article</title>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>

      <amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
    </article>
  </body>
</html>
```

ページを更新して、コンソールの出力を確認してください。次のようなメッセージが表示されるはずです。

<pre class="success-text">
AMP validation successful.
</pre>

### よくある質問

- [What is DOM reflow?](http://stackoverflow.com/a/27637245)
- [What if the layout attribute isn’t defined?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [What if width and height are undefined?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
