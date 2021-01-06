---
"$title": AMP ページから PWA の事前読み込み
"$order": '1'
description: サイトのエントリポイントを AMP ページにして、その裏側で PWA を準備し、以降のページでは PWA に切り替える ...
formats:
- websites
author: pbakaus
---

**サイトのエントリポイントを AMP ページ**にして、**その裏側で PWA を準備**し、以降のページでは PWA に切り替えるという効果的な使い方をご紹介します。

- 全コンテンツの「末端」ページ（概要ページではなく、特定のコンテンツが含まれているページ）は AMP として公開され、ほぼ一瞬で読み込まれます。
- こうした AMP では AMP の特別な要素 [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) を使用して、ユーザーがコンテンツを楽しんでいる間に、キャッシュと PWA シェルを使用できるようにします。
- ユーザーがウェブサイト上の別のリンク（たとえば、よりアプリのようなエクスペリエンスを提供するために下部に設置したコールトゥアクションなど）をクリックすると、Service Worker がそのリクエストを検出し、ページを引き継いで、代わりに PWA シェルを読み込みます。

この開発パターンを使用する理由とその方法について、以下に説明します。

## PWA に接続してユーザージャーニーを向上

### 最初のユーザー獲得に適した AMP

AMP は、検索エンジンによるオーガニック検索、友だちから送られた共有リンク、別のサイトに設置されているリンクなどを通じてユーザーが見つけるコンテンツ ページ（いわゆる「リーフページ」）に適したソリューションです。AMP では[特殊な事前レンダリング](../../../about/how-amp-works.html)が実行されるため、AMP ページは極めて高速に読み込まれ、結果として離脱率を大幅に下げることにもつながります（最近行われた [DoubleClick の調査](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/)では、**ページの読み込みに 3 秒かかると全ユーザーの 53% 以上が離脱する**ことがわかっています）。

### インタラクティブ性が高くエンゲージメントに効果的な PWA

一方、プログレッシブウェブアプリは、インタラクティブ性が高くエンゲージメントを強化することが可能ですが、AMP ページが持つ<em>最初の高速読み込みという特徴</em>はありません。プログレッシブウェブアプリの中核にある Service Worker という技術は、クライアント側のプロキシとしてページのあらゆる種類のアセットをキャッシュします。ただし、Service Worker が有効になるのは最初の読み込みの<em>後</em>なのです。

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='AMP と PWA のメリットとデメリット') }}

## `amp-install-serviceworker` による PWA の準備

AMP では、プログレッシブウェブアプリの Service Worker を AMP ページ内からインストールすることができます。その AMP ページが AMP キャッシュから配信される場合でも問題ありません。インストールが成功すると、いずれかの AMP ページから PWA へのリンクが、AMP ページの最初の高速読み込みのようにほぼ一瞬で機能するようになります。

[tip type="tip"] <strong>ヒント:</strong> Service Worker についてよく知らないという方は、Jake Archibald の [Udacity のコース](https://www.udacity.com/course/offline-web-applications--ud899)を受講することをおすすめします。[/tip]

まず、[`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) を使用してすべての AMP ページに Service Worker をインストールします。つまり、次のようにスクリプトを使って、このコンポーネントをページの `<head>` に追加します。

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

次に、下記のコードを `<body>` 内に追加します（実際にお使いの Service Worker に変更してください）。

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

最後に、Service Worker のインストール手順の中で、PWA に必要なリソースをキャッシュします。

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
[/sourcecode]

[tip type="tip"] <strong>ヒント:</strong> Service Worker には、簡単な利用方法がいろいろあります。[Service Worker ヘルパーライブラリ](https://github.com/GoogleChrome/sw-helpers)をご覧ください。[/tip]

## AMP ページ上のすべてのリンクで PWA に誘導する

おそらく、AMP ページ上の大部分のリンクは多くのコンテンツ ページにつながっていることでしょう。初回以降のリンクのクリックがプログレッシブウェブアプリに「アップグレード」されるようにする場合、[AMP の使用方法に応じて](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md)次の 2 つの方法があります。

### 1. 正規ページと AMP ページを組み合わせている場合

このケースでは、正規のウェブサイト（非 AMP）を公開していると同時に、その正規ページにリンクする AMP ページも作成してあります。AMP の使用方法としては現在これが最も一般的です。AMP ページ上のリンクはほとんどの場合、正規のサイトにリンクされています。**正規のサイトが PWA の場合はすべて AMP から PWA に設定されていることになるので、特に必要な作業はありません**。

### 2. 正規のサイトが AMP の場合

このケースでは、正規ページが AMP ページです。つまり、ウェブサイト全体が AMP を使って作成されていて、AMP はライブラリとして使用されています（ちなみに、今あなたが読んでいるこのサイトもこの方法で作成されています）。**この場合、AMP ページ上のほとんどのリンクは別の AMP ページにつながっています。**

そこで、ある独立したパス（たとえば `your-domain.com/pwa`）で PWA を実装し、Service Worker を使用します。この Service Worker は、**ユーザーが AMP ページ上のリンクをクリックしたときにブラウザナビゲーションを検出する**よう、すでに動作しているものです。

[sourcecode:javascript]
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

この方法で特に注目したいのは、AMP から PWA に移動するためにプログレッシブ エンハンスメントを使用している点です。ただし、Service Worker に未対応のブラウザの場合は、AMP から PWA には移動できず、AMP から AMP に移動することになります。

AMP では、「[シェル URL の書き換え](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite)」と呼ばれる方法でこの問題に対処します。フォールバック URL パターンを <a><code>amp-install-serviceworker</code></a> タグに追加することにより、Service Worker に非対応であることが検出された場合に、特定のページ上の一致するすべてのリンクを書き換えて、代わりに従来からある別のシェル URL に移動するよう AMP に指示することができます。

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

これらの属性を指定することで、Service Worker 対応かどうかにかかわらず、AMP ページで発生する初回以降のすべてのクリックで PWA に移動できるようになります。

[tip type="read-on"] <strong>詳細情報:</strong> ここまでお読みいただいたら、次は既存の AMP ページを再利用して PWA を作成してみましょう。<a>こちらをご覧ください</a>。[/tip]
