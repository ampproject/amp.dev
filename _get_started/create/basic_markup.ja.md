---
layout: page
title: AMP HTML ページを作成する
order: 0
locale: ja
---

まずは以下のマークアップから見ていきましょう。
このボイラープレートをコピーして html 拡張子のファイルとして保存してください。

{% highlight html %}
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
{% endhighlight %}

この時点ではまだ、ボディ部のコンテンツはとてもシンプルです。一方、ページのヘッド部には一見ではわかりづらいコードがたくさん追加されています。では、必須となるマークアップを分解していきます。

## 必須マークアップ

AMP HTML ドキュメントが満たすべき条件は以下のとおりです。

  - `<!doctype html>` という文書型宣言で開始する。
  - 最上位階層のタグを `<html ⚡>`（`<html amp>` でも可）にする。
  - `<head>` タグと `<body>` タグ（HTML ではどちらも任意）を含める。
  - ヘッド部に `<link rel="canonical" href="$SOME_URL" />` タグを入れて、AMP HTML 版の通常の HTML バージョンを指定する。該当する HTML が存在しない場合は自身を指定する。
  - head タグの最初の子要素を `<meta charset="utf-8">` タグにする。
  - head タグ内に `<meta name="viewport" content="width=device-width,minimum-scale=1">` タグを含める。initial-scale=1 も入れることをお勧めします。
  - head タグの最後の要素を `<script async src="https://cdn.ampproject.org/v0.js"></script>` タグにする（これによって AMP JS ライブラリがインクルードされ、読み込まれます）。
  - 次の内容を `<head>` タグの中に含める。
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## 省略可能なメタデータ

このサンプルでは最小限必要なものに加えて、ヘッド部に Schema.org の定義を含めています。これは AMP においては必須ではありませんが、[Google 検索のニュース カルーセルのデモ（スマートフォンで確認してください）](https://g.co/ampdemo)のように、特定の環境にコンテンツを配信する際は必要になります。

Twitter など、他のさまざまな環境で必要になる全メタデータについては、[こちらのサンプルを参考にして](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples)詳細をご確認ください。Google 検索における AMP について詳しく知りたい方は、[AMP 対応のトップニュース](https://developers.google.com/structured-data/carousels/top-stories)をご覧ください。

<hr>

ここまでで、初めて AMP ページを作成する上で必要な作業をすべて説明しましたが、まだボディ部はほとんど手をつけていません。次のセクションでは、イメージなどの基本要素の追加方法、カスタム AMP 要素、ページをスタイリングしてレスポンシブなレイアウトを作成する方法をご紹介します。

{% include button.html title="ステップ 2 に進む" link="/docs/get_started/create/include_image.ja.html" %}
