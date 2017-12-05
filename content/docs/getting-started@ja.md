---
$title: はじめに
---
[TOC]

これは AMP の使用を開始するためのクイックスタート ガイドです。

詳しい手順については、「[初めての AMP ページを作成する](/ja/docs/tutorials/create.html)」チュートリアルをご覧ください。

### ステップ 1: AMP HTML テンプレートを取得する

これは AMP ページに必要な基本の HTML です。

```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello AMP world</title>
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Hello AMP World!</h1>
  </body>
</html>
```

{% call callout('詳細情報', type='read') %}
詳しくは、AMP ページの[必須のマークアップ](/ja/docs/reference/spec.html#required-markup)についてご覧ください。
{% endcall %}

### ステップ 2: ページにコンポーネントを追加する

画像などのコンポーネントを追加して AMP ページを構築します。

```html
<amp-img src="https://www.ampproject.org/examples/images/amp.jpg"
  width="900" height="508" layout="responsive"></amp-img>
```

YouTube 動画の場合:

```html
<!-- this script is required for amp-youtube and must be in the <head> section  -->
<script async custom-element="amp-youtube"
      src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>

...

<amp-youtube data-videoid="9Cfxm7cikMY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
```

詳しくは、[AMP で使用可能なコンポーネント](/ja/docs/reference/components.html)のリストをご覧ください。

### ステップ 3: 要素のスタイルを設定する

AMP ページの要素のスタイルを設定するには、ドキュメントの `<head>` 内で `<style amp-custom>` というインライン スタイルシートに CSS を追加します。

```html
<style amp-custom>
  amp-img {
    margin: 0.5em;
  }
  body {
    max-width: 900px;
  }
</style>
```

{% call callout('詳細情報', type='read') %}
詳しくは、AMP ページで[サポートされる CSS](/ja/docs/guides/responsive/style_pages.html) をご覧ください。
{% endcall %}

### ステップ 4: AMP HTML を検証する

ページを [AMP Validator](https://validator.ampproject.org/) で検証して、AMP ページが有効な AMP HTML であることを確認します。

使用できる他の検証ツールについては、[AMP ページを検証する](/ja/docs/guides/validate.html)をご覧ください。

### 次のステップ

AMP ページの基本をさらに理解するには、「[初めての AMP ページを作成する](/ja/docs/tutorials/create.html)」チュートリアルをご覧ください。

役立つその他のリソースを以下にご紹介します。

* [ページを検出可能にする](/ja/docs/guides/discovery.html)
* [ページにアナリティクスを追加する](/ja/docs/guides/analytics_amp.html)
* [ユーザー エンゲージメントを向上させる](/ja/docs/guides/engagement.html)
* [AMP BY Example](https://ampbyexample.com/) ライブデモ
 
 
