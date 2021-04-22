---
'$title': AMP とアプリの統合
$order: 2
description: このガイドは、AMP ページの統合とリンクを希望するモバイルおよびウェブアプリ開発者を対象としています。たとえば、共有された URL の AMP バージョンを...
formats:
  - websites
---

このガイドは、AMP ページの統合とリンクを希望するモバイルおよびウェブアプリ開発者を対象としています。たとえば、共有された URL の AMP バージョンを読み込んで、ユーザーエクスペリエンスを高速化するモバイル チャットアプリについて考えてみましょう。

## AMP へのリンクの変換

AMP を使用すると、ネイティブまたはモバイルのウェブアプリ内で外部のウェブサイトをほぼ瞬時に レンダリングすることができます。これは、コンテンツ内の URL を 対応する AMP URL（存在する場合）と照合し、元のバージョンではなく AMP バージョンを 開くことで実現できます。ツール （[Google の AMP URL API](https://developers.google.com/amp/cache/use-amp-url) など）を使用することで、 この処理をスムーズに行えます。

たとえば、次のメッセージは、 すべての URL を一致する AMP バージョン（存在する場合）で置き換えることによって、AMP バージョンを提供するように変換できます。読み込み 時間を短縮し、有効な AMP が確実に提供されるようにするには、 AMP キャッシュ内にキャッシュされた AMP ページにリンクする必要があります。

元のメッセージ:

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

変換されたメッセージ:

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="tip"] <strong>ヒント:</strong> アプリの環境設定で、AMP バージョンではなく非 AMP バージョンを 表示するオプションを選択できるようにすることを検討してください。 [/tip]

### リンクを変換する方法

プログラムでリンクを変換する方法は 3 つあります。

1. **書き込み時にサーバー側で変換（推奨）**: URL の書き込み時に Google の AMP URL API を介して AMP URL を取得し、サーバー側に AMP URL を格納します。共有のために 元の URL が必要となる場合があるため、両方の URL をクライアントに渡します。 クライアント側のネットワークリクエストが少なくなるため、この手法の採用をおすすめします。この手法を採用するときは、定期的 （毎日など）に AMP バージョンのリンクをスキャンすることが重要です。これは、ウェブサイトで AMP 形式が採用されるケースが 増えているからです。
2. **読み取り時にサーバー側で変換（場合により有効）**: コンテンツをクライアントに渡す前に、Google の AMP URL API を介して AMP URL を取得します。上で述べたように、 共有のために元の URL が必要となる場合があるため、両方の URL（AMP と非 AMP）をクライアントに 渡します。この手法は、ファンアウトがあまり行われないサービスに適しています。
3. **クライアント側で変換（サーバー側で実行できない場合）**: クライアント側で Google の AMP URL API を介して AMP URL を取得します。この手法は、サーバー側で URL 変換を実行できない場合（エンドツーエンドの暗号化を 使用するメッセージング アプリなど）に使用します。コンテンツが利用できるようになったら、ユーザーの操作が行われる前に すぐに URL 変換を開始してください。

[tip type="important"] <strong>重要:</strong> Google の AMP API を介した AMP URL のリクエストを ユーザー操作の結果として行わないでください。追加のネットワークリクエストが発生し、アプリのパフォーマンスが 低下するためです。代わりに、上記の 3 つの手法のいずれかを 使用してください。 [/tip]

#### Google の AMP URL API

Google では、AMP URL API を提供して、リストに指定された URL （[公式ドキュメント](https://developers.google.com/amp/cache/use-amp-url) / [デモ](../../../documentation/examples/documentation/Using_the_AMP_URL_API.html)）と一致する AMP HTML URL を取得します。URL は 正規バージョンである必要はありません。AMP バージョンが存在する場合、レスポンスには 元の AMP URL と Google AMP キャッシュ上にキャッシュされている AMP ページの URL が含まれます。

たとえば、URL のリストは次のようになります。

```json
{
  "urls": [
    "https://www.example.org/article-with-amp-version",
    "http://www.example.com/no-amp-version.html"
  ]
}
```

レスポンスの本文には、JSON 形式の AMP URL マッピングが含まれています。

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL not found.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="note"] <strong>注意:</strong> Google 以外の AMP キャッシュ上にキャッシュされた AMP ページの URL は、 AMP URL API で取得できません。ただし、返された AMP URL（ampURL）からキャッシュされた URL を簡単に派生させることが できます。 [/tip]

## AMP キャッシュの使用

[AMP キャッシュ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md)は、 有効な AMP ドキュメントを配信するための、プロキシベースのコンテンツ配信ネットワーク（CDN）です。 AMP キャッシュは次のような目的で設計されています。

- 有効な AMP ページのみを配信する。
- AMP ページが効率的、安全にプリロードされるようにする。
- コンテンツに対して、ユーザーにメリットのある追加のパフォーマンス最適化を行う。

現在、2 つの AMP キャッシュプロバイダがあります。

- [Google AMP キャッシュ](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

そのため、アプリで AMP ファイルを表示するには、次の 2 つの方法のいずれかを選択する必要があります。

1. サイト運営者がホストするバージョン
2. AMP キャッシュでホストされるバージョン

次の理由から、AMP キャッシュを使用することをおすすめします。

- 読み込み時間が速く、待ち時間が短いため、ユーザーエクスペリエンスが向上する（読み込み時間は 1 秒以上高速）。
- クライアントに依存するアーティファクトを追加キャッシュすることで、パフォーマンスと帯域幅のメリットがある（クライアントの表示領域のサイズに応じて 同じ画像の異なるバージョンをキャッシュするなど）。
- 元の AMP ファイルが有効な AMP ではなくなり、ユーザー エクスペリエンスが 低下する可能性がある。この場合、AMP キャッシュは最後の有効な バージョンの AMP ファイルを提供します。
- あまりまともでないサイト運営者は、AMP キャッシュクローラとユーザーに異なるドキュメントを提供することがある。AMP キャッシュを使用すると、常にキャッシュと同じ AMP ファイルを参照できます。

[tip type="important"] <strong>重要:</strong> AMP キャッシュを介して AMP ページを提供する場合、閲覧者が AMP の生成元を はっきりと確認でき、ユーザーが正規 URL を共有できるようにします （この詳細については、次の 2 つのセクションも参照してください）。 [/tip]

## AMP ビューアの実装

AMP ランタイムにはビューア API が用意されており、この API により、AMP ランタイムと ビューア間でメッセージを送受信するためのプロトコルが提供されます。このプロトコルにより、 AMP ドキュメントのプリレンダリング、スワイプによる記事間の移動、AMP ランタイムの 計装を管理できます。AMP ビューア API の詳細については、 [AMP ビューアと AMP ページの接続](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) ガイドをご覧ください。[ウェブ](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md) および [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) 用のビューアの実装は、 [GitHub](https://github.com/ampproject/amp-viewer) で入手できます。Android 用 ビューアはまだ利用できません。[この回答](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038) （Stack Overflow のサイト）を参照して、AMP ページを表示するための WebView の最適な構成方法をご確認ください。

ここでは、AMP ビューアを実装する際の一般的なおすすめの方法をご紹介します。

- AMP ページを AMP キャッシュから提供します（読み込み時間が 1 秒超速くなります）。
- 記事のサイト運営者のオリジンを表示します（折りたためるヘッダーなどを使用します）。
- 共有アクションを提供します（下記の「[AMP コンテンツの共有](integrate-with-apps.md#sharing-amp-content)」 もご覧ください）。
- WebView ベースのビューアでは、サードパーティの Cookie を有効にします。
- 使用するプラットフォーム / アプリのリファラーを設定します。

### AMP コンテンツの共有 <a name="sharing-amp-content"></a>

プラットフォームの AMP ビューア内から AMP ドキュメントを共有する場合、 技術的に可能な限り、プラットフォームは正規 URL を共有する必要があります。たとえば、 プラットフォームに共有ボタンを設置する場合、正規 URL が共有されるように設定する必要があります。

AMP プロジェクトの理念は、ユーザーに提示するドキュメントの バージョンはプラットフォームが選択すべきであるということです。この理由から、 別のプラットフォームに共有する場合は（AMP バージョンではなく）正規バージョンを共有し、 ターゲットプラットフォームで適切なバージョンが選択されるのを期待するのが最も理にかなっています。
