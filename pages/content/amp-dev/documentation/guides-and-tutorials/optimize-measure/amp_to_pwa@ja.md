---
'$title': AMP サイトから PWA への変換
$order: 10
description: ブラウザ内にリソースをキャッシュすることで、PWA は、データ、アセット、およびオフラインページをユーザーに提供し、ユーザーの関心を維持し、情報を提供し続けることができます。
tutorial: 'true'
formats:
  - websites
author: crystalonscript
---

プログレッシブウェブアプリは[サービスワーカー](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)の力を借りて、様々なネットワーク強度で、リッチなオフライン機能と一貫したユーザーエクスペリエンスを実現しています。ブラウザ内にリソースをキャッシュすることで、PWA は、データ、アセット、およびオフラインページをユーザーに提供し、ユーザーの関心を維持して情報を提供し続けることができます。

このチュートリアルでは、AMP サービスワーカーが提供するウェブマニフェストとサービスワーカーを追加することで、AMP サイトをオフライン機能付きのインストール可能な PWA に変換する方法を学習します。

# スターターコードのダウンロードと実行

[スターターコードを](/static/files/tutorials/amptopwa.zip)ダウンロードします。

ローカルウェブサーバーを使用して、ウェブサイトをプレビューします。

[tip type="default"] **ヒント –** 簡易ウェブサーバーの場合は、`python -m SimpleHTTPServer` を実行します。 [/tip]

Lyrical Lightning という Mobile Music Magic フェスティバルのランディングページが表示されます。ホームページには、バンドの演奏スケジュールとステージが表示されたリンクがあります。

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

スケジュールへのアクセスが発生する可能性の高いイベント会場では、サイトのユーザーのネットワーク接続にはむらがあります。このため、ユーザーのホーム画面にインストールして、オフラインでもすべての重要な機能を提供できるように、このサイトを PWA に変換するのが最適と言えます。

# ウェブアプリマニフェストの作成

[ウェブアプリマニフェスト](https://developers.google.com/web/fundamentals/web-app-manifest/)は、ウェブアプリケーションに関する情報とユーザーのモバイルデバイスやデスクトップに「インストール」される場合にどのように動作するのかをブラウザに示す単純な JSON ファイルです。[「ホーム画面に追加」プロンプト](https://developers.google.com/web/fundamentals/app-install-banners/)を示す場合、多くのブラウザでは、マニフェストが必要となります。

以下のコードを使用して、`manifest.json` というファイルをリポジトリに追加します。

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# AMP サービスワーカーの追加

サービスワーカーは、ウェブページとは別にバックグラウンドでブラウザが実行するスクリプトで、リクエストをキャッシュしてパフォーマンスを改善し、オフライン機能を提供するすることによって、ブラウザの機能を拡張します。始めからサービスワーカーを構築することもできますが、AMP は [AMP サービスワーカー](https://github.com/ampproject/amp-sw) を提供しており、AMP スクリプト、アセット、およびドキュメントのキャッシュだけでなく、[ナビゲーションのプレロード](https://developers.google.com/web/updates/2017/02/navigation-preload)といった一般的なベストプラクティスの実装など、多数のステップを直接自動化することができます。

AMP サービスワーカーは、インストールされると、ユーザーがリクエストするたびに、自動的に [AMP スクリプト](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching)と[ドキュメントをキャッシュ](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching)するようになります。基本的な AMP サービスワーカーの追加から始めてみましょう。

## サービスワーカーファイルの作成

`sw.js` というファイルを作成して、以下のコードを追加します。

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

たった 2 行のコードで、AMP サービスワーカーをユーザーのサービスワーカーにインポートして初期化することができます。

## AMP ページへのサービスワーカーの自動インストール

AMP ウェブサイトは、[`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) コンポーネントを使用して、ユーザーがコンテンツを楽しむ間にブラウザのバックグラウンドにサービスワーカーをインストールします。

`index.html` の head に必要なスクリプトタグを配置し、`<body>` に `<amp-install-serviceworker>` を配置します。

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **Important –** The service worker should be served from the root directory (`/sw.js`) to be able to cache all the content of your site. [/tip]

The `<amp-install-serviceworker>` installs the service worker by creating an iframe and running the `data-iframe-src` file. Create the `install-sw.html` file and add the following code:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

iframe は、AMP サービスワーカーファイルをブラウザに登録します。

# キャッシュされる項目のカスタマイズ

AMP サービスワーカーには、ユーザーが構成可能なオプションのフィールドを提供し、アプリのニーズに合わせて最適化できるメリットがあります。

音楽祭アプリは、画像アセットをキャッシュし、ラインアップのリンクを事前にフェッチし、オフラインページを指定することができます。

## アセットのキャッシュ

画像、動画、およびフォントなどの[アセットをキャッシュ](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching)するように、AMP サービスワーカーを構成することができます。これを使用して、背景画像と AMP ロゴをキャッシュすることにします。`sw.js` ファイルを開いて、以下のコードで更新します。

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

キャッシュストラテジーを [cache first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) に指定しました。これは、アプリがネットワークにリクエストする前に、先にキャッシュから配信しようとすることを意味します。背景画像や AMP ロゴを更新することはないため、特にこのアプリではこれが役立ちます。

## リンクのプリフェッチ

AMP サービスワーカーは、`data-rel=prefetch` 属性のあるリンクをプリフェッチします。このため、以前に訪問したことのないページでもオフラインで表示することができるようになります。この属性を `lineup.html` のリンクタグに追加することにします。

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# オフラインページの表示

プリフェッチしなかったページへのリンクで予期しなかったケースやクリックに対応するために、汎用的なブラウザのオフラインページを表示する代わりに、一貫した「オンブランド」のユーザーエクスペリエンスを提供するオフラインページを追加します。[`offline.html` をここから](/static/files/tutorials/offline.zip)ダウンロードして、`sw.js` を以下のコードに更新します。

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# PWA のテスト

[Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps) を使って、AMP サービスワーカーが必要なアセットをキャッシュし、理想とするオフラインソリューションを提供していることをテストすることができます。

Windows では `Ctrl + Shift + I` キー、Mac では `Cmd + Opt + I` キーを押して、DevTools パネルを開き、Lyrical Lyghtning をテストしてみましょう。また、ページを右クリックして、メニューから `inspect` を選択することもできます。`Application` を選択すると、サービスワーカーの登録が表示されます。

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

`offline` ボックスをクリックして、オフラインモードに切り替えます。`see full lineup` リンクをクリックして `offline.html` に移動し、適切にキャッシュされ、プリフェッチされているかどうかを確認します。

[tip type="default"] **ヒント –** プログレッシブウェブアプリの機能の完全分析を行うには、[Google の Lighhouse tool](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool) を使ってレポートを生成することができます。 [/tip]

# お疲れ様でした！

AMP で PWA を作成しました。このチュートリアルでは、以下の内容について学習しました。

- [ウェブアプリマニフェスト](https://developers.google.com/web/fundamentals/web-app-manifest/)の作成
- [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) による AMP へのサービスワーカーのインストール
- [AMP サービスワーカー](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)のカスタマイズ
- [リンクのプリフェッチ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- オフラインページの作成

さらに、[サービスワーカー](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)と[オフライン UX に関する考慮事項](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux)をお読みください。[分析によるエンゲージメントの追跡](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html)方法を学習し、[AMP ページ用の基本分析の構成方法](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html)を説明したチュートリアルを実行してください。
