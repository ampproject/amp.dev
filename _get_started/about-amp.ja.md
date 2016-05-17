---
layout: page
title: AMP とは
order: 0
locale: ja
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

AMP を使用してウェブページを作成すると、静的コンテンツを高速でレンダリングできます。
以下は AMP を構成する 3 つの要素です。

{% include toc.html %}

**AMP HTML** は、パフォーマンスを保証するための制約が設けられた HTML で、
通常の HTML より優れたリッチ コンテンツを作成できる拡張機能が備わっています。
そして AMP HTML ページのレンダリングを高速化するのが、**AMP JS** ライブラリです。
**Google AMP Cache** は（必要に応じて）AMP HTML ページを配信します。

## AMP HTML

AMP HTML は基本的に、カスタム AMP プロパティを追加した HTML です。
以下は最もシンプルな AMP HTML ファイルです。

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

AMP HTML ページ内のタグは、ほとんどが通常の HTML タグですが、
一部の HTML タグは AMP 専用のタグに置き換わっています
（[APM 仕様書の HTML タグ](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)の説明もご覧ください）。
これらのカスタム要素は AMP HTML コンポーネントと呼ばれ、
このコンポーネントを使うと高パフォーマンスな共通のパターンを簡単に実装できます。

たとえば [`amp-img`](/docs/reference/amp-img.html) タグは、
`srcset` をフルサポートしています。まだこの機能に対応していないブラウザでも問題ありません。
[初めての AMP HTML ページを作成する](/docs/get_started/create_page.html)方法もご覧ください。

## AMP JS

[AMP JS ライブラリ](https://github.com/ampproject/amphtml/tree/master/src)では、
[AMP のパフォーマンス最適化処理](/docs/get_started/technical_overview.html)がすべて実装されています。
さらにリソースの読み込み処理を制御し、上記のカスタムタグを提供することで
ページのレンダリングを確実に高速化します。

最も重要な最適化処理の 1 つが、外部リソースからの読み込みを完全に非同期にすることです。これによりページ内の要素がレンダリング処理をブロックすることはなくなります。

その他のパフォーマンス改善技術として、すべての iframe をサンドボックス化する、リソースを読み込む前にページ内のすべての要素のレイアウトを事前計算する、低速の CSS セレクターを無効するなどの方法が導入されています。

[最適化](/docs/get_started/technical_overview.html)に加えて、制限について詳しく知りたい方は [AMP HTML の仕様書をご覧ください](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)。

## Google AMP Cache

Google AMP Cache はプロキシベースのコンテンツ デリバリ ネットワークで、有効な AMP ドキュメントをすべて配信します。

Google AMP Cache は取得した AMP HTML ページをキャッシュして、自動でページのパフォーマンスを改善します。
この機能を使用すると、最大限効率化をするために [HTTP 2.0](https://http2.github.io/) を使用している共通の場所からドキュメントやすべての JS ファイルとイメージが読み込まれます。



キャッシュに付随するビルトインの [検証システム](https://github.com/ampproject/amphtml/tree/master/validator)は、該当ページが機能すること、そして外部リソースに依存しないことを保証します。



この検証システムは一連のアサーションを実行し、ページのマークアップが AMP HTML の仕様に準拠しているかを確認します。


もう 1 つの検証ツールは、すべての AMP ページにバンドルされているものです。このツールでは、ページのレンダリング時に検証エラーが直接ブラウザのコンソールに出力されます。そのため、複雑なコード変更がパフォーマンスやユーザー エクスペリエンスにどのような影響を及ぼすかを確認できます。



詳細は、[AMP HTML ページをテストする](/docs/guides/validate.html)をご覧ください。
