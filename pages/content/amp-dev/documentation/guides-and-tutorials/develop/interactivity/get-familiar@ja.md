---
$title: スターター コードについて
---

[TOC]

## AMP のボイラープレート
AMP ページは、安定したパフォーマンスのために制限がいくつか課された HTML ページです。AMP ページには、AMP ページであることを示す特別なマークアップが含まれています。

基本的な構成の AMP ページは次のようになります。

```html
<!doctype html>
<html amp>
<head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>Hello World!</body>
</html>
```

## AMP のコンポーネント

チュートリアルのスターター コード（[`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)）は、基本的な AMP ページとそのページ コンテンツ（画像、テキストなど）を作成するだけでなく、いくつかの AMP コンポーネントも追加します。

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"></script>
<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
<script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
```

AMP コンポーネントでさらに機能や UI コンポーネントが加わることにより、AMP ページのインタラクティビティが向上します。スターター コードでは次のような AMP コンポーネントを使用します。

- [`<amp-carousel>`](/ja/docs/reference/components/amp-carousel.html): 商品を複数のビューで表示する画像カルーセル。
- [`<amp-mustache>`](/ja/docs/reference/components/amp-mustache.html): amp-form からサーバーの応答をレンダリングするためのテンプレート システム。
- [`<amp-form>`](/ja/docs/reference/components/amp-form.html): AMP ページに必要な `<form>` 要素に対し、特別な機能を追加します。
- [`<amp-selector>`](/ja/docs/reference/components/amp-form.html): 要素のグループから 1 つまたは複数の要素を意味に基づき選択できるようにします。amp-form の入力ソースとして使用可能です。

## 基本的なインタラクティビティ

スターター コードにより、次のような基本的なインタラクティビティを実現できます。

- 画像カルーセル（`<amp-carousel>`）で、商品を複数のビューで表示します。
- ページ下部にある [カートに追加] ボタンをタップすることで、（`<amp-form>` により）商品をユーザーのカートに追加できます。


**試してみる**: 画像カルーセルをスワイプして [カートに追加] ボタンをタップします。

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/prereqs-setup.md', locale=doc.locale).url.path}}"><span class="arrow-prev">前へ</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/advanced-interactivity.md', locale=doc.locale).url.path}}"><span class="arrow-next">次へ</span></a>
</div>
 
