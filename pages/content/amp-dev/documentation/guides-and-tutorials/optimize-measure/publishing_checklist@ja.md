---
'$title': AMP 公開チェックリスト
$order: 0
description: レスポンシブウェブデザインは、デバイスの画面サイズや向きに合ったページといったユーザーのニーズに合わせてフルードウェブページを構築することです。...
formats:
  - websites
author: CrystalOnScript
contributors:
  - sebastianbenz
---

このチェックリストに従って、最大限の AMP エクスペリエンスを提供するサイトを実現しましょう！

# AMP 仕様の検証を確保する

AMP には、AMP キャッシュからコンテンツをプリロードしてユーザーの待機時間を短縮するなど、ビルトインのメリットが豊富に備わっています。こういったメリットを活用するには、ページが有効な AMP ドキュメントである必要があります。AMP 検証ツールがエラーをレポートしたままページを公開すると、AMP キャッシュはインデックスを作成できない可能性があり、エラーページとして配信されてしまう可能性があります。

以下のツールを使用すると、無効な AMP ページを公開することはありあｍせん。

- [AMP ページの検証](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [AMP 検証ツール ](https://validator.ampproject.org/)
- [Google AMP Tester](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [AMP ツール](../../../documentation/tools.html?format=websites)

# キャッシュされた AMP ページにサーバーアクセスを許可する

良いニュースです。有効な AMP ページは自動的に既存の AMP キャッシュにオプトインされるようになっています！つまり、ユーザーは、安全かつ効率的に読み込むコンテンツを体験することになります。こういった最適化は素晴らしいことですが、ささやかな難点が伴います。一部のユーザーには、あなたのドメインに一致しないドメインの AMP ページが配信されてしまいます。このため、[`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) や [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites) などの動的な AMP コンポーネントを使用している場合は、ページがサイトデータにアクセスできなくなってしまう可能性があります。こういったエラーはクロスオリジンリソース共有または CORS 問題と呼ばれます。すべての利用可能な [AMP キャッシュ](https://ampjs.org/caches.json)からの CORS リクエストを有効にして、安全性に対抗するのではなく、それに対応するようにしましょう！バックエンドで Node.js を使用している場合は、[amp-cors ミドルウェア](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors)を使用できます。

サーバーアクセス権の付与について、以下を参照してください。

- [AMP ページのキャッシュの仕組み](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [AMP における CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- Node.js 用の [AMP CORS ミドルウェア](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors)

# Signed Exchanges 対応の安全で共有可能なコンテンツ

Signed Exchanges（SXG）を介して、ドメインの URL を維持し、アナリティクスを単純化しましょう。SXG で AMP ページを配信することで、デジタル署名はドキュメントと主張された URL を結び付けて情報を保護します。この動作では、ユーザーセッションと cookie はファーストパーティとして扱われるため、潜在的なアナリティクスのギャップが埋められます。SXG を実装することで、通常の AMP コンテンツの「代わりに」ではなく、それに加えて、署名付きの AMP コンテンツを配信することができます。

Signed Exchanges の実装について、以下を参照してください。

- [Signed Exchanges を使った AMP の配信](signed-exchange.md?format=websites)
- [Signed HTTP Exchanges](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [Signed exchanges for better AMP URLs and easier analytics（AMP Conf '19）](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# キャッシュされたページのテスト

AMP キャッシュは、ユーザーが求めるとすぐに配信できるように、画像、フォント、およびページコンテンツを保存します。このため、AMP ページが AMP キャッシュから配信される場合に、期待どおりの見栄えで機能するようにテストすることが重要です。

AMP ページを AMP キャッシュに追加する場合は、[ブラウザの開発者ツール](https://developers.google.com/web/tools/chrome-devtools/)を使用して、すべての外部リソースが読み込み可能であることを確認します。以下に、注意すべき点をリストしています。

- 画像
- 動画
- amp-analytics エンドポイント
- amp-pixel エンドポイント
- カスタムフォント
- iframe

AMP キャッシュについて、以下を参照してください。

- [Google AMP キャッシュの使用](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [Google での AMP について、Google AMP キャッシュ](https://developers.google.com/amp/cache/overview)
- [AMP キャッシュ問題のデバッグ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [AMP キャッシュ URL 形式とリクエスト処理](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# AMP ファイルが検索エンジンで検出可能であることを確認する

AMP のみで構築されたページ（AMP ファースト）と AMP ダブルを使ったページ（ペア AMP）はすべて検出可能であることを確認する必要があります！すべての AMP ページの `<head>` には、`<link rel="canonical" href="$SOME_URL">` が必要です。AMP ファーストページはそのページ自身にリンクし、非 AMP ページとペアになった AMP ページは相互にリンクされている必要があります。

[Schema.org](https://schema.org/) メタデータが有用な情報を追加していることを確認してください！ほかのサイトや検索エンジンがコンテンツを共有する際に必要となる場合があります。

ウェブロボット、ウェブワンダラー、クローラー、スパイダーは、すべてのコンテンツを検索するプログラムの名称です。このプログラムはウェブを徘徊し、検索エンジンによるウェブコンテンツのインデックス作成を手助けし、ユーザーのクエリに適切な結果を提供できるようにしています！適切な指示を `robots.txt` ファイルに含め、適切なヘッダーをセットアップし、こういったプログラムがサイトを見つけられるようにしましょう。

以下のように、[robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en) ファイルでクローラーを除外しないようにしてください。

```
User-agent: *
Disallow: /amp/                            <= don't!
```

以下のように、AMP HTML ファイルにロボットの `noindex` メタタグを追加しないでください。

```
<meta name="robots" content="noindex" />   <= don't!
```

以下のように、AMP ファイルの X-Robots-Tag HTTP ヘッダーとして `noindex` を含めないようにしてください。

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

ページを検出可能にする方法は、以下を参照してください。

- [ページを検出可能にする ](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [ロボットのメタタグと X-Robots-Tag HTTP ヘッダーの仕様](https://developers.google.com/search/reference/robots_meta_tag)
- [AMP のインデックス作成に関するよくある質問](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# ユーザートラフィックとジャーニーの測定

正しいメトリックを収集することは、有用なアナリティクスを実施する上で欠かすことはできません。サイトへの AMP の導入がユーザーにどのような影響を与えるのかをテストする際は、正しいものを測定していることを確認してください。 アナリティクスによって AMP がもたらす変化が考慮されなければ、検出漏れ、誤検出、または関連性のない結果が生じてしまいます。探しているもの、それをどのように測定するかをよく理解してください！

AMP 向けの適切なアナリティクスを設定する方法については、以下を参照してください。

- [So your AMP test doesn't perform — now what?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Cache vs. non-cache analysis](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [Measuring user journeys across the AMP Cache and your website](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Measuring success: What's new in AMP analytics & experiments（AMP Conf '19）](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [Signed exchanges for better AMP URLs and easier analytics (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
