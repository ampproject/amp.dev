---
$title: はじめに
---
[TOC]

これは、 AMP を始めるためのクイックスタートガイドです。

詳細な説明については [初めての AMP ページを作成する](/ja/docs/tutorials/create.html) チュートリアルをご覧ください。

### ステップ1: AMP HTML テンプレートの取得

これは、 AMP ページに必要な基本のHTMLです。

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

{% call callout('もっと読む', type='read') %}
AMP ページに [必要なマークアップ](/ja/docs/reference/spec.html#required-markup) をご覧ください。
{% endcall %}

### ステップ2: ページにコンポーネントを追加する

imageのようなコンポーネントを追加して AMP ページを構築します。

```html
<amp-img src="https://www.ampproject.org/examples/images/amp.jpg"
  width="900" height="508" layout="responsive"></amp-img>
```

または Youtube ビデオ

```html
<!-- このscriptは amp-youtube に必須で、<head>内に記述する必要があります -->
<script async custom-element="amp-youtube"
      src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>

...

<amp-youtube data-videoid="9Cfxm7cikMY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
```

他にもたくさんあります。 [AMP の利用可能コンポーネント](/ja/docs/reference/components.html)を見てください。

### ステップ3: 要素をスタイルする

AMP ページの要素をスタイルするには、`<head>`内の`<style amp-custom>`というインラインスタイルシートにCSSを追加します。

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

{% call callout('もっと読む', type='read') %}
AMP ページで [サポートされているCSS](/ja/docs/guides/responsive/style_pages.html) をご覧ください。
{% endcall %}

### ステップ4: AMP HTML を検証する

AMP ページが有効な AMP HTML であることを [AMP Validator](https://validator.ampproject.org/) で確認してください。

使用できる他の検証ツールについては、 [AMP ページの検証](/ja/docs/guides/validate.html) を見てください。

### 次のステップ

更に AMP ページの基礎を知るためには、 [初めての AMP ページを作成する](/ja/docs/tutorials/create.html) チュートリアルをご覧ください。

あなたの役に立つ他のリソースがあります。

* [ページを検出可能にする](/ja/docs/guides/discovery.html)
* [アナリティクスの設定をする](/ja/docs/guides/analytics_amp.html)
* [ユーザー エンゲージメントを向上させる](/ja/docs/guides/engagement.html)
* [AMP BY Example](https://ampbyexample.com/) ライブデモ
