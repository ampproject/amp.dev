---
$title: レスポンシブな AMP ページを作成する
---

AMP でレスポンシブな要素を作成するのはとても簡単です。要素に `layout=responsive` を指定します。

[TOC]

## レスポンシブな画像を作成する

外部から読み込まれるすべてのリソース（画像など）には、リソースが読み込まれるときにページでジャンプやリフローが起きないように、リソースのサイズと位置を指定しておく必要があります。

レスポンシブな画像を作成するには、幅と高さを指定し、レイアウトを「responsive」に設定します。また、[`srcset`](/docs/guides/responsive/style_pages.html) を使って、さまざまなスクリーン サイズに基づいて使用される画像アセットを指定します。

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

この `amp-img` 要素は、コンテナ要素の幅に自動的に適合します。高さは、指定された幅と高さによって決まるアスペクト比に自動的に設定されます。

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857" layout="responsive"></amp-img>

[AMP by Example の amp-img](https://ampbyexample.com/components/amp-img/) もご覧ください。

## ページにスタイルを追加する

ドキュメントの先頭で、`<style amp-custom>` タグ内にすべてのスタイルを追加します。次に例を示します。

[sourcecode:html]
<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html" >
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
[/sourcecode]

**重要:** `<style amp-custom>` タグは、AMP で複数使用することが許可されていないため、ページに 1 つだけ配置してください。

一般的な CSS プロパティを使用し、クラスまたは要素のセレクタを使ってコンポーネントのスタイルを定義します。次に例を示します。

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**重要:** スタイルが AMP でサポートされていることを確認してください。パフォーマンス上の理由からサポートされていないスタイルもあります（[サポートされる CSS](/docs/guides/responsive/style_pages.html) もご覧ください）。

## サイズと位置の要素

リソースのダウンロードを待たずにページのレイアウトを読み込めるように、AMP はドキュメントのレイアウトとリソースの読み込みを分離しています。

`width` 属性と `height` 属性を指定して、表示可能なすべての AMP 要素のサイズと位置を指定してください。これらの属性によって要素のアスペクト比が示唆されるため、コンテナのスケーリングが可能になります。

レイアウトを「responsive」に設定します。これにより、要素のサイズはコンテナ要素の幅に適合され、要素の高さは、幅と高さの属性によって決まるアスペクト比に自動的に調整されます。

詳しくは、[AMP でサポートされるレイアウト](/docs/guides/responsive/control_layout.html)をご覧ください。

## スタイルとレイアウトを検証する

AMP 検証ツールを使用して、ページの CSS とレイアウトの値をテストします。

検証ツールでは、ページの CSS が 50,000 バイトの制限を超えていないことを確認し、許可されていないスタイルがないかチェックし、さらに、ページのレイアウトがサポートされており、形式が正しいかどうか確認します。[スタイルエラーとレイアウト エラー](/docs/reference/validation_errors.html#style-and-layout-errors)の詳細なリストもご覧ください。

50,000 バイトの制限を超える CSS のページでは、コンソールに次のようなエラーが表示されます。

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

詳しくは、[AMP ページの検証方法についての記事](/docs/guides/validate.html)（スタイルエラーを特定して修正する方法など）をご覧ください。
