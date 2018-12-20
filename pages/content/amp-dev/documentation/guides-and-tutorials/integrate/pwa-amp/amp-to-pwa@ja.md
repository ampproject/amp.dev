---
$title: AMP ページからプログレッシブ ウェブアプリを事前に読み込む
---
[TOC]

**サイトの入り口を AMP ページに**して、**その裏側でプログレッシブ ウェブアプリ（PWA）を準備**し、以降のページでは PWA に切り替えるという効果的な使い方をご紹介します。

* 全コンテンツの「末端」ページ（概要ページではなく、特定のコンテンツが含まれているページ）は AMP として公開され、ほぼ一瞬で読み込まれます。
* こうした AMP では AMP の特別な要素 [`<amp-install-serviceworker>`](/ja/docs/reference/components/amp-install-serviceworker.html) を使用して、ユーザーがコンテンツを楽しんでいる間に、キャッシュと PWA シェルを使用できるようにします。
* ユーザーがウェブサイト上の別のリンク（たとえば、下部に設置した、アプリのように使うためのカスタム外部リンク）をクリックすると、Service Worker がそのリクエストを検出し、ページを引き継いで、代わりに PWA シェルを読み込みます。

この開発パターンを使用する理由とその方法について、以下に説明します。


## PWA にリンクすることでユーザー エクスペリエンスを向上させる

### 最初のユーザー獲得に適した AMP

AMP は、検索エンジンによるオーガニック検索、友だちから送られた共有リンク、別のサイトに設置されているリンクなどを通じてユーザーが見つけるコンテンツ ページ（いわゆる「末端ページ」）に適したソリューションです。AMP では [特殊な事前レンダリング](/ja/learn/about-how/)が実行されるため、AMP ページは極めて高速に読み込まれ、結果として離脱率を大幅に下げることにもつながります（最近行われた [DoubleClick の調査](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/)では、**ページの読み込みに 3 秒かかると全ユーザーの 53% 以上が離脱する**ことがわかっています）。

### インタラクティブ性が高くエンゲージメントに効果的な PWA

一方、プログレッシブ ウェブアプリは、インタラクティブ性が高くエンゲージメントを強化することが可能ですが、AMP ページが持つ最初の高速読み込みという特徴はありません。プログレッシブ ウェブアプリの中核にある Service Worker という技術は、クライアント側のプロキシとしてページのあらゆる種類のアセットをキャッシュします。ただし、Service Worker が有効になるのは最初の読み込みの後なのです。

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='AMP と PWA のメリットとデメリット') }}

## `amp-install-serviceworker` を使用して PWA を準備する

AMP では、プログレッシブ ウェブアプリの Service Worker を AMP ページ内からインストールすることができます。その AMP ページが AMP キャッシュから配信される場合でも問題ありません。インストールが成功すると、いずれかの AMP ページから PWA へのリンクが、AMP ページの最初の高速読み込みのようにほぼ一瞬で機能するようになります。

ヒント: Service Worker についてよく知らないという方は、Jake Archibald の [Udacity のコース](https://www.udacity.com/course/offline-web-applications--ud899)を受講することをおすすめします。

まず、[`<amp-install-serviceworker>`](/ja/docs/reference/components/amp-install-serviceworker.html) を使用してすべての AMP ページに Service Worker をインストールします。つまり、次のようにスクリプトを使って、このコンポーネントをページの `<head>` に追加します。

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
  // インストール手順を実行する
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
[/sourcecode]

ヒント: Service Worker には、簡単な利用方法がいろいろあります。[Service Worker の使い方を集めたライブラリ](https://github.com/GoogleChrome/sw-helpers)をご覧ください。

## AMP ページ上のすべてのリンクで PWA に誘導する

<<<<<<< HEAD
おそらく、AMP ページ上の大部分のリンクは多くのコンテンツ ページにつながっていることでしょう。初回以降のリンクのクリックがプログレッシブ ウェブアプリに「アップグレード」されるようにする場合、[AMP の使用方法に応じて]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}})次の 2 つの方法があります。
=======
おそらく、AMP ページ上の大部分のリンクは多くのコンテンツ ページにつながっていることでしょう。初回以降のリンクのクリックがプログレッシブ ウェブアプリに「アップグレード」されるようにする場合、[AMP の使用方法に応じて]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}})次の 2 つの方法があります。
>>>>>>> 3aeec0a67c667957f9f54faf118da91faf46313f

### 1. 正規ページと AMP ページを組み合わせている場合

このケースでは、正規のウェブサイト（AMP ではないサイト）を公開していると同時に、その正規ページにリンクする AMP ページも作成してあります。AMP の使用方法としては現在これが最も一般的です。AMP ページ上のリンクはほとんどの場合、正規のサイトにリンクされています。**正規のサイトが PWA の場合はすべて AMP から PWA に設定されていることになるので、特に必要な作業はありません**。

### 2. 正規のサイトが AMP の場合

このケースでは、正規ページが AMP ページです。つまり、ウェブサイト全体が AMP を使って作成されていて、AMP はライブラリとして使用されています（ちなみに、今あなたが読んでいるこのサイトもこの方法で作成されています）。**この場合、AMP ページ上のほとんどのリンクは別の AMP ページにつながっています。**

そこで、ある独立したパス（たとえば `your-domain.com/pwa`）で PWA を実装し、Service Worker を使用します。この Service Worker は、**ユーザーが AMP ページ上のリンクをクリックしたときにブラウザ ナビゲーションを検出する**よう、すでに動作しているものです。

[sourcecode:javascript]
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa'));

      // 実際のリソースのダウンロードをただちに開始します。
      fetch(event.request.url);
    }

});
[/sourcecode]

この方法で特に注目したいのは、AMP から PWA に移動するためにプログレッシブ エンハンスメントを使用している点です。ただし、Service Worker に未対応のブラウザの場合は、AMP から PWA には移動できず、AMP から AMP に移動することになります。

AMP では、[シェル URL の書き換え](/ja/docs/reference/components/amp-install-serviceworker.html#shell-url-rewrite)と呼ばれる方法でこの問題に対処します。フォールバック URL パターンを [`<amp-install-serviceworker>`](/ja/docs/reference/components/amp-install-serviceworker.html) タグに追加することにより、Service Worker に非対応であることが検出された場合に、特定のページ上の一致するすべてのリンクを書き換えて、代わりに従来からある別のシェル URL に移動するよう AMP に指示することができます。

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

これらの属性を指定することで、Service Worker 対応かどうかにかかわらず、AMP ページで発生する初回以降のすべてのクリックで PWA に移動できるようになります。

詳細情報: ここまでお読みいただいたら、次は既存の AMP ページを再利用して PWA を作成してみましょう。[こちらの説明をご覧ください](/ja/docs/integration/pwa-amp/amp-in-pwa.html)。
