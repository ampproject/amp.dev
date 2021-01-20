---
"$title": スターターコードについて
"$order": '1'
description: AMP ページは、安定したパフォーマンスのために制限がいくつか課せられた HTML ページです。AMP ページには、AMP ページであることを示す特別なマークアップが含まれています。
---

## AMP のボイラープレート

AMP ページは、安定したパフォーマンスのために制限がいくつか課された HTML ページです。AMP ページには、AMP ページであることを示す特別なマークアップが含まれています。

基本的な構成の AMP ページは次のようになります。

```html
<!DOCTYPE html>
<html amp>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="hello-world.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

[tip] [ボイラープレートジェネレータ](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)を使用すると、AMP ページの基本的なスケルトンを素早くセットアップするだけでなく、構造化データのスニペットも利用できるため、PWA などを作成することもできます。[/tip]

## AMP コンポーネント

チュートリアルのスターターコード（<a><code>static/index.html</code></a>）は、ページコンテンツ（画像、テキストなど）やいくつかの AMP コンポーネントを伴う必要最小限の AMP ページを作成します。

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
<script
  async
  custom-template="amp-mustache"
  src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"
></script>
<script
  async
  custom-element="amp-form"
  src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
></script>
<script
  async
  custom-element="amp-selector"
  src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"
></script>
```

AMP コンポーネントは、AMP ページにリッチなインタラクティブ性を追加する機能や UI コンポーネントを提供するものです。スターターコードでは、次の AMP コンポーネントが使用されています。

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): 商品を複数のビューで表示する画像カルーセル。
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): amp-form からサーバーのレスポンスをレンダリングするためのテンプレートシステム。
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): AMP ページに必要な `<form>` 要素に対し、特別な機能を追加します。
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): 要素のグループから 1 つまたは複数の要素を意味に基づき選択できるようにします。[`amp-form`](../../../../documentation/components/reference/amp-form.md) の入力ソースとして使用可能です。

## 基本的なインタラクティビティ

スターターコードは、次のような基本的なインタラクティブ性を提供します。

- 画像カルーセル（[`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)）で、商品を複数のビューで表示します。
- ページ下部にある [Add to cart] ボタンをタップすることで、（[`amp-form`](../../../../documentation/components/reference/amp-form.md) により）商品をユーザーのカートに追加できます。

**試してみる**: 画像カルーセルをスワイプして [Add to cart] ボタンをタップします。
