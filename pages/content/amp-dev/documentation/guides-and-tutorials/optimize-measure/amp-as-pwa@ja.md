---
$title: AMP ページでプログレッシブ ウェブアプリ機能を有効にする
---

{{ image('/static/img/docs/pwamp_add_to_homescreen.png', 848, 1500, align='right third', caption='AMPbyExample で表示される「ホーム画面に追加」のプロンプト') }}

多くのウェブサイトでは、AMP を使えば必要なことがすべてできるようになります。たとえば [Examples](../../../documentation/examples/index.html) は、AMP でもありプログレッシブ ウェブアプリでもあります。

1. [ウェブアプリ マニフェスト](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) が設定されていて、これにより「ホーム画面に追加」のバナーが表示される
1. [Service Worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) を使用しているので、特にオフライン アクセスなどが可能になる

ユーザーが AMP 対応プラットフォームから [Examples](../../../documentation/examples/index.html) にアクセスした後、クリックで引き続き同じサイトへ進む場合、AMP キャッシュから離れて配信元に移動することになります。このような場合も当然、ウェブサイトは AMP ライブラリを使用しますが、この時点で配信元に存在しているので、Service Worker を利用したり、インストールを求めるメッセージを表示したりすることなどが可能です。

Service Worker は、ページの AMP キャッシュ バージョンには対応できません。配信元へ進む際に使用してください。

## ウェブアプリ マニフェストを追加する

AMP ページに[ウェブアプリ マニフェスト](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) を追加すると、ユーザーが端末のホーム画面にサイトをインストールできるようになります。AMP のウェブアプリ マニフェストについては、特別なことは何もありません。

まず、マニフェストを作成します。

[sourcecode:json]
{
  "short_name": "ABE",
  "name": "AMPByExample",
  "icons": [
    {
      "src": "launcher-icon-1x.png",
      "type": "image/png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-2x.png",
      "type": "image/png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-4x.png",
      "type": "image/png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html?launcher=true"
}
[/sourcecode]

次に、この作成したマニフェストに、AMP ページの `<head>` からリンクします。

[sourcecode:html]
<link rel="manifest" href="/manifest.json">
[/sourcecode]

ヒント: 詳しくは、[Web Fundamentals のウェブアプリ マニフェストについての説明](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) をご覧ください。

## Service Worker をインストールしてオフライン アクセスを有効にする

Service Worker は、ページとサーバーの間に存在するクライアント サイドのプロキシです。Service Worker を利用すると、オフラインでの優れたユーザー エクスペリエンスを実現したり、アプリケーション シェルのシナリオの読み込みを高速化したり、プッシュ通知を送信したりできます。

メモ: Service Worker をご存知ない場合は、[Web Fundamentals の概要説明](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) をご覧ください。

Service Worker は、ブラウザで見つけて実行できるように、特定のページに登録する必要があります。デフォルトでは、こうした登録は [少しの JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration) を利用して行います。AMP ページの場合、[`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) コンポーネントを使って同じことができます。

登録するには、まず [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) コンポーネントを、そのスクリプトを使ってページの `<head>` に含めます。

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

ユーザーが（通常 AMP キャッシュから提供される最初のクリックではなく）配信元の AMP ページに移動した場合、Service Worker が引き継いで [多様な優れた方法](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux) で対処できます。

## Service Worker を使って AMP ページを拡張する

上記の方法を利用して AMP ウェブサイトへのオフライン アクセスを有効にするだけでなく、**ページが配信元から提供されたらすぐに** 拡張することも可能です。これは、Service Worker の `fetch` イベントにより応答を編集して、必要な応答を返すことができるためです。

[sourcecode:js]
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })

        // 応答が返される前にここで編集する
        ...

        return response || fetchPromise;
      })
    })
  );
});
[/sourcecode]

この方法を使うと、AMP ページを修正して、あらゆる追加機能について
[AMP の検証](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) に失敗するのを防ぐことができます。たとえば次のような機能です。

* カスタム JS を必要とする動的な機能
* サイト向けにカスタマイズされたコンポーネントやサイトにのみ関連するコンポーネント
