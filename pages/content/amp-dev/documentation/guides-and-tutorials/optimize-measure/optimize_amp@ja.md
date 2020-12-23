---
"$title": ホストされた AMP ページの最適化
"$order": '7'
description: AMP ランタイムは高速化に最適化されているため、AMP ページが AMP キャッシュから配信される場合に、完全に最適化された上で、最高の読み込みパフォーマンスを発揮します...
formats:
- websites
- stories
author: sebastianbenz
---

このガイドでは、ウェブマスター向けに、ホストされた AMP ウェブサイトの最適化方法に関するヒントとガイダンスを提供します。

### AMP はデフォルトで高速化されているのではないですか？

AMP ランタイムは[高速化に最適化](../../../about/how-amp-works.html)されているため、AMP ページが [AMP キャッシュ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md)から配信される場合に、完全に最適化された上で、最高の読み込みパフォーマンスを発揮します。たとえば、ユーザーがモバイルの Google 検索からあなたの AMP ページたどり着いた場合、ページはデフォルトで AMP キャッシュから配信されるようになっています。

ただし、AMP ページは必ずしも AMP キャッシュから配信されるわけではありません。ほかのトラフィックソースにおいては自身のサーバーから AMP ページを表示するように、ウェブサイトで指定している可能性もあるからです。この場合の最も一般的なユースケースは、ユーザーが直接サイトにアクセスする、[tasty.co](https://tasty.co) のような AMP だけで構築されたサイトです。また、もう 1 つのトラフィックソースには、標準的なモバイルバージョンの代わりに [AMP ページにリンクし始めた](https://searchengineland.com/twitter-ramps-amp-278300) Twitter が挙げられます。つまり、ユーザーが Twitter のモバイルアプリでリンクをクリックすると、サイト運営者オリジンの AMP バージョンに移動することになります（存在する場合）。

その結果、AMP ページが AMP キャッシュからのみ配信されるという確信を必ず持つことができません。このように、独自のサイトから AMP ページを配信する場合、AMP ページが最適な読み込みパフォーマンスを提供できるようにすることが重要となります。

AMP ページはデフォルトで高速に読み込めるようになっていますが、ブラウザによる AMP ページの読み込みをさらに高速化するための追加のパフォーマンス最適化があります。このガイドでは、AMP ページを公開する際に考慮すべき最適化をいくつか説明します。このガイドを読み進める前に、すべての[基本的なウェブパフォーマンスに関するベストプラクティス](#basic-optimizations)をすでに理解しておく必要があります。特に、読み込みパフォーマンスには、画像最適化が大きく影響します。

たとえば、以下の最適化テクニックを適用することができます。

- [Optimized AMP runtime loading](#optimize-the-amp-runtime-loading)
- [ヒーロー画像のプリロード](#preload-hero-images)（画像のサイズ/エンコーディング自体は未変更）
- [カスタムフォントの最適化](#optimize-custom-fonts)（画像のサイズ/エンコーディング自体は未変更）

["The Scenic" テンプレート](../../../documentation/templates/index.html)は、[3G 接続で 2 秒早く読み込まれます](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0)。

詳細を省略する場合は、[AMP ボイラープレートジェネレータ](/boilerplate)を参照してください。これを使用して、カスタムの最適化 AMP ページを生成することができます。

### AMP ランタイム読み込みの最適化<a name="optimize-the-amp-runtime-loading"></a>

AMP では、`<head>` セクションに許可されるマークアップを制限していますが、依然として最適化の余地はあります。鍵となるは、レンダリングをブロックするすべてのスクリプトとカスタムフォントの読み込みができる限り高速化されるように、`<head>` セクションを構造化することです。

以下に、`<head>` セクション内の推奨されるコード順を示します。

[sourcecode:html]

<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="This is the AMP Boilerplate.">
    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0.js">
    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
    <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-experiment" src="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"></script>
    <!-- Import other AMP Extensions here -->
    <style amp-custom>
      /* Add your styles here */
    </style>
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <link rel="canonical" href=".">
    <title>My AMP Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
[/sourcecode]

では、順を追って確認しましょう。

1. 最初のタグは、`meta charset` タグで、その後に残りの `meta` タグを挿入します。

2. 次に、`<link as=script href=https://cdn.ampproject.org/v0.js rel=preload>` で AMP ランタイム `v0.js` `<script>` タグをプリロードします。[AMP ボイラープレート](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) は AMP ランタイムが読み込まれるまで `body { visibility:hidden }` 経由でドキュメントを非表示にするため、AMP ランタイムはできるだけ早い段階でダウンロードし始めます。AMP ランタイムをプリロードすると、ブラウザに最優先でスクリプトをダウンロードするように指示されます。これを回避する方法については、[server-side-rendering](#server-side-rendering) を参照してください。{amp-img6} {/amp-img6}

3. If your page includes render-delaying extensions (e.g., amp-experiment, amp-dynamic-css-classes, amp-story), preload those extensions as they're required by the AMP runtime for rendering the page.

[sourcecode:html]
<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/amp-custom-css-0.1.js">
<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/story-1.0.js">[/sourcecode]

1. Google Fonts を使う場合など、前もってフルリソース URL がわかっていない他のオリジンへの接続を高速化するために、[preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/) を使います。

[sourcecode:html]<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>[/sourcecode]

1. Load the AMP runtime:

[sourcecode:html]<script async src="https://cdn.ampproject.org/v0.js"></script>[/sourcecode]

1. [遅延レンダリング拡張機能](https://github.com/ampproject/amphtml/blob/master/src/render-delaying-services.js)（[`amp-experiment`](../../../documentation/components/reference/amp-experiment.md)、[`amp-dynamic-css-classes`](../../../documentation/components/reference/amp-dynamic-css-classes.md)、[`amp-story`](../../../documentation/components/reference/amp-story.md) など）用に `<script>` タグを指定します。
2. 残りの拡張機能（[`amp-bind`](../../../documentation/components/reference/amp-bind.md) など）用に `<script>` タグを指定します。これらの拡張機能は遅延レンダリングではないため、プリロードしてはいけません。初期レンダリングに必要な重要な帯域幅が奪われてしまいます。
3. `<style amp-custom>` タグを使用して、カスタムスタイルを指定します。
4. `<head>` セクションに使用できる他のタグを追加します。特に、外部フォントについては、レンダリングを阻害しないように最後に追加するようにしてください。
5. 最後に、[AMP ボイラープレートコード](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md)を指定します。ボイラープレートコードを最後に追加することで、カスタムスタイルが誤ってボイラープレート CSS ルールをオーバーライドしないようにすることができます。

[tip] AMP キャッシュはこのようなすべての最適化を自動的に実行します。AMP オプティマイザツールを使用すると、自分のオリジンで最適化を自動的に実行することができます。 [/tip]

### ヒーロー画像のプリロード <a name="preload-hero-images"></a>

[AMP HTML は、`amp-img`](../../../documentation/components/reference/amp-img.md) という独自の画像要素を使用します。[`amp-img`](../../../documentation/components/reference/amp-img.md) には、従来の HTML `img` タグに比べて多くのメリットがありますが、AMP ランタイムが読み込まれてからでないと画像ダウンロードを開始できないという欠点があります。製品ページのヒーロー画像といった一部の画像では、画像をできるだけ素早く読み込むことが非常に重要となります。こういった場合は、画像をプリロードし、ブラウザができる限り早い段階でダウンロードできるようにし、AMP ランタイムが読み込まれるまで待機しないでいいようにすることが最善です。

[sourcecode:html]

<head>
  <link rel="preload" href="/images/elephants.png" as="image">
</head>
<body>
  ...
  <amp-img width="404" height="720" layout="responsive"
           src="/images/elephants.png" alt="..." >
  </amp-img>
</body>
[/sourcecode]

しかし、レスポンシブレイアウトに、画面の幅によって異なるヒーロー画像が必要な場合はそうすればよいのでしょうか。たとえば、以下のように、デスクトップには幅広い画像を指定し、モバイルには幅の狭い画像を指定するといった場合です。

[sourcecode:html]
<amp-img width="404" height="720"
    alt="..." layout="responsive"
    src="/images/elephants_narrow.png"
    media="(max-width: 415px)">
</amp-img>
<amp-img height="720"
    alt="..." layout="fixed-height"
    src="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
</amp-img>
[/sourcecode]

便利なことに `link rel=preload` はメディアクエリもサポートしているため、以下のように、preload 文に同じメディアクエリを使用することができます。

[sourcecode:html]

<link rel="preload" as="image"
    href="/images/elephants_narrow.png"
    media="(max-width: 415px)">
<link rel="preload" as="image"
    href="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
[/sourcecode]

ちなみに、同じアプローチは、[`amp-video`](../../../documentation/components/reference/amp-video.md) ポスター画像にも使用できます。

[sourcecode:html]

<link rel="preload" href="/images/poster.jpg" as="image">
...
 <amp-video width="480" height="270" src="elephant.mp4"
             poster="/images/poster.jpg"
             layout="responsive">
     ...
</amp-video>
[/sourcecode]

preload 文は、必ずビューポートの宣言の*後*に配置するようにしてください。ブラウザが画面の幅を判定するには、ビューポートのサイズが必要です。

[sourcecode:html]

<meta name="viewport" content="width=device-width">
...
<link rel="preload" media="(max-width: 415px)" ...>
[/sourcecode]

[tip type="important"] 重要な画像のみをプリロードするようにしてください。画像のダウンロードによって、ほかの重要なダウンロードに必要な帯域幅が消耗されてしまう可能性があるためです。 [/tip]

### サーバーワーカーの使用の検討

すべての[主要なブラウザはサービスワーカーをサポート](https://caniuse.com/#feat=serviceworkers)するようになったため、サービスワーカーをサイトに追加すべきかどうかを評価するとよいかもしれません。

確実に高速なナビゲーションを実現できるとわかっているアーキテクチャ上のパターンには 2 つあります。

- シングルページアプリケーション: アプリシェルモデル（AMP コンテキストでは [AMP-in-PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md) と呼ばれる）です。このパターンでは、サービスワーカーが AMP ドキュメントをアプリシェルベースの PWA エクスペリエンスにアップグレードする必要があります。
- マルチページアプリケーション: [合成リソースのストリーミング](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses)。サービスワーカーは静的なヘッダーとフッターをキャッシュし、ストリーミングを使用して、コンテンツを読み込みながらキャッシュされた部分的なレスポンスを即時に返します。

上記のいずれのパターンも使用されておらず、全サイトをキャッシュするのが不可能な場合（小規模なサイトであれば可能でしょうが）、サービスワーカーは[パフォーマンスに悪影響](https://developers.google.com/web/updates/2017/02/navigation-preload)を及ぼす可能性があります。この場合には、サービスワーカーを**使用しない**のが最善と言えます。

ただし、ウェブサイトを[ホーム画面にインストール可能](https://developers.google.com/web/fundamentals/app-install-banners/)にする場合、またはオフラインでエクスペリエンスを提供する場合は、サービスワーカーを使用する必要があります。この場合は、[ナビゲーションプリロード](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw)を使用し、潜在的な減速を緩和することが重要です（注意: 現在のところ、ナビゲーションプリロード機能は、Chrome でのみサポートされています）。

以下は、AMP ウェブサイトがサービスワーカーを使用する場合のベストプラクティスです。

- [AMP ランタイム](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime)と拡張機能（[`amp-carousel`](../../../documentation/components/reference/amp-carousel.md) など）をプレキャッシュします。
- ほとんどのページで使用されるロゴ、フォント、およびその他の静的コンテンツをプレキャッシュします。
- ロゴ、フォント、および画像の配信には、[cache-first strategy](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) を使用します。
- AMP ランタイムおよび拡張機能の配信には、[stale-while-revalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) ストラテジーを使用します。
- ナビゲーションリクエストにネットワーク優先ストラテジーを使用する場合は、[ナビゲーションプレロード](https://developers.google.com/web/updates/2017/02/navigation-preload)を有効化します。

AMP サイトでサービスワーカーを使用し始めようと考えている方は、上記のすべてのベストプラクティスを実装するサービスワーカーを提供するこちらの[サンプル](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg)をお試しください。

[tip type="note"] AMP ランタイムは、更新を素早く利用できるように、max-age を 50 分にして配信されています。ブラウザのキャッシュミスの可能性を回避するために、AMP ランタイムをサービスワーカーから配信するようにすると良いでしょう。 [/tip]

プリキャッシュは、キャッシュされた AMP ページからオリジン上の非 AMP ページに移行するだけでなく、キャッシュされた AMP ページからオリジン上の AMP ページに移行する場合にも関係があります。これは、AMP キャッシュがエバーグリーン URL から最新のリリースバージョンに AMP ランタイム URL を書き換えるためです。以下にその例を示します。

`https://cdn.ampproject.org/v0.js` -> `https://cdn.ampproject.org/rtv/001515617716922/v0.js`.

その結果、自分のオリジンから配信される AMP ページはブラウザのキャッシュ機能の恩恵を受けないため、この場合はもう一度（バージョン管理されていない）AMP ランタイムをダウンロードしなければなりません。サービスワーカーを使用すると、バージョン管理されていない AMP ランタイムをプリキャッシュし、移行を高速化することができます。AMP キャッシュが AMP ランタイム URL をバージョン管理する理由については、[こちらのドキュメント](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime)を参照してください。

[tip type="note"] Safari では、ページが AMP キャッシュから配信される場合にオリジンにサービスワーカーをインストールできないという、サービスワーカーの実装方法に関する大きな違いがあります。[/tip]

### カスタムフォントの最適化 <a name="optimize-custom-fonts"></a>

AMP では、フォントの読み込みを最適化する方法がいくつかあります（[ほとんどの方法は、実際のところ AMP 固有の方法ではありません](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)）。

- 可能であれば、[font-display: optional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) を使用します。この場合、すでにキャッシュに存在するフォントのみが使用され、カスタムフォントがまだ読み込まれていない場合は、システムフォントにフォールバックします。
- ウェブフォントを最適化します（WOFF2 を使ってカスタムフォントを配信するなど）。
- Preload custom fonts:

[sourcecode:html]
<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2" >[/sourcecode]

- If you are using Google fonts, or any other font provider with unknown font URLs, preconnect the respective font server:

[sourcecode:html]
 <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
[/sourcecode]

最後に、ただし重要なこととして、ページで使用するカスタムフォント数を最小限に抑えるようにします。可能であれば、カスタムフォントの代わりにシステムフォントを使用してください。システムフォントは、ウェブサイトをユーザーのオペレーティングシステムに一致させることができます。また、読み込まれるリソースを減らすことができます。

### サーバー側レンダリングの AMP レイアウト

サーバー側レンダリングの AMP レイアウトは、読み込み時間をさらに高速化するために AMP キャッシュが使用するテクニックです。サーバー側レンダリングを使用すると、AMP ボイラープレートを削除することが可能になるため、AMP ランタイム JavaScript を実行せずに AMP ドキュメントをレンダリングできます。たとえば、サーバー側でレンダリングされた AMP ボイラープレートジェネレータは通常の AMP バージョンよりも [2 倍も高速にレンダリング](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual)されます！

AMP ページを公開している場合は、ぜひ [AMP オプティマイザ](amp-optimizer-guide/index.md)の使用を検討してください。AMP オプティマイザを使うと、サーバー側レンダリング AMP レイアウトを含み、独自のバックエンドから最適化された AMP ページを配信することができます。また、このドキュメントで説明されたその他の多くの最適化を自動的に実行することもできます。

### 基本的な最適化 <a name="basic-optimizations"></a>

もちろん、すべての基本のウェブパフォーマンス最適化は、AMP ページにも適用されます。

- 動画と[画像の最適化](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)。画像最適化は、読み込みのパフォーマンスに大きな影響を与えます。
- [CSS と HTML の圧縮および縮小化](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer)。AMP ページのすべての CSS はインライン化されるため、[purifycss](https://github.com/purifycss/purifycss) などを使用して、未使用の CSS を除去する価値があります。
- [HTTP キャッシング](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)の使用
- その他多数。
