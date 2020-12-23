---
"$title": AMP HTML ページの作成
"$order": '1'
description: 'HTTPS の使用: AMP ページとコンテンツを作成する際は、（HTTP ではなく）HTTPS プロトコルの使用をぜひ検討してください。AMP ドキュメント自体では HTTPS は必須ではありませんが ...'
author: pbakaus
contributors:
- bpaduch
---

まずは以下のマークアップから見ていきましょう。これは、今後のボイラープレートとしても利用できます。 これをコピーし、.html 拡張子のファイルとして保存してください。

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
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
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

この例では body 内のコンテンツはとてもシンプルですが、ページの head 内には一見わかりづらいコードが多数あります。では、必要なマークアップを分解してみましょう。

HTTPS の使用: AMP ページとコンテンツを作成するときは、（HTTP ではなく）HTTPS プロトコルの使用をぜひ検討してください。AMP ドキュメント自体や画像、フォントには HTTPS は必須ではありませんが、HTTPS を必要とする AMP 機能は数多くあります（動画、iframe など）。AMP ページですべての AMP 機能を最大限に活用するためには、HTTPS プロトコルを使用してください。HTTPS の詳細については、[HTTPS を使用する理由](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https)をご覧ください。

[tip type="tip"] 新しい AMP ページを手っ取り早く作成し始めるには、<a>AMP Boilerplate Generator</a> を利用できます。[/tip]

## 必要なマークアップ

AMP HTML ドキュメントに関するルール

ルール | 説明
--- | ---
先頭に `<!doctype html>` doctype を指定します。 | HTML の標準です。
最上位階層のタグを `<html ⚡>` にする<br>（`<html amp>` も可 ）。 | ページを AMP コンテンツとして識別します。
`<head>` タグと `<body>` タグを含む。 | HTML では任意ですが、AMP では任意ではありません。
`<meta charset="utf-8">` タグを `<head>` タグの最初の子要素にする。 | ページのエンコードを識別します。
`<script async src="https://cdn.ampproject.org/v0.js"></script>` タグを `<head>` タグの 2 番目の子要素にする。 | AMP JS ライブラリを含めて読み込みます。
`<head>` タグ内に `<link rel="canonical" href="$SOME_URL">` タグを含める。 | この AMP HTML ドキュメントの通常の HTML バージョンを指定するか、そのような HTML バージョンが存在しない場合は、このドキュメント自体を指定します。詳しくは、[ページを検出可能にする](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md)をご覧ください。
Contain a `<meta name="viewport" content="width=device-width"> It's also recommended to include `initial-scale=1`. | レスポンシブなビューポートを指定します。詳しくは、[レスポンシブな AMP ページの作成](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md)をご覧ください。
`<head>` タグ内に [AMP ボイラープレート コード](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md)を含める。 | AMP JS が読み込まれるまで、最初はコンテンツを非表示にするための CSS ボイラープレートです。

## 省略できるメタデータ

このサンプルには、最低限の要件に加えて、head 内に Schema.org の定義も含まれています。これは AMP においては必須ではありませんが、コンテンツを特定の場所（Google 検索のトップニュースカルーセル内など）に配信する際に必要となります。

[tip type="read-on"] 詳しくは、次のリソースを参照してください。

- [Google 検索用の AMP の準備方法](https://developers.google.com/amp/docs) - AMP ページを Google 検索用に準備する方法について説明します。
- [メタデータのサンプル](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples) - 他のさまざまな場所（Twitter など）で必要となる全メタデータについて詳しく説明します。 [/tip]

<hr>

AMP ページを初めて作成するのに必要な情報は以上です。ただしもちろん、本文に表示されるコンテンツはまだ多くありません。次のセクションでは、画像などの基本要素やカスタム AMP 要素を追加する方法、ページのスタイルを設定する方法、レスポンシブなレイアウトを作成する方法について説明します。
