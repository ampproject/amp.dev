---
$title: ユーザー エンゲージメントを向上させる
---
ここでは、AMP でユーザー エンゲージメントを高めるためのヒントを紹介します。

### AMP ページと非 AMP ページで統一感のあるブランディングとリッチなコンテンツでブランドを識別しやすくする

- **AMP ページにブランドを反映する。** 非 AMP ページと同じヘッダーやデザイン（色、間隔、書体など）を使用することで、そのブランドのページであることをすぐに認識できるようにします。

- **最も魅力的なコンテンツで目を引く。**  AMP ページに変換する際は、画像、動画、埋め込み、構造化データ、コメント、ソーシャル メディアなど、目を引くページ要素を含めます。詳しくは、[サードパーティ コンテンツを含める]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/third_party_components.md', locale=doc.locale).url.path}})をご覧ください。

- **AMP ページを常に最新にする。**  ライブブログを、[`amp-live-list`](/ja/docs/reference/components/amp-live-list.html) を使って動的に更新します。

### ユーザー エンゲージメントと定着率を最適化する

- **双方向のエクスペリエンスを提供する。**  AMP ページで、たとえば [`amp-carousel`](/ja/docs/reference/components/amp-carousel.html)  コンポーネントを使って魅力的な画像カルーセルを作成します。また、AMP ではネイティブにサポートされていない双方向性を、[`amp-iframe`](/ja/docs/reference/components/amp-iframe.html) を使って組み込みます。

- **ユーザーの行動経路をカスタマイズする。**  ログインボタンを追加します。有料コンテンツがある場合は [`amp-access`](/ja/docs/reference/components/amp-access.html) を使ってルールや特典を実装します。

- **ユーザーの行動経路を拡げる。** 関連記事や推奨記事など、サイト内の関連コンテンツへのリンクを設定します。

- **おすすめのコンテンツを紹介する。** [`amp-list`](/ja/docs/reference/components/amp-list.html) を使っておすすめのコンテンツを追加します。

- **メニューを実装する。** [`amp-sidebar`](/ja/docs/reference/components/amp-sidebar.html) を使って、サイト内の他のコンテンツに簡単に移動できるようにします。

- **コンテンツを共有しやすくする。** [`amp-social-share`](/ja/docs/reference/components/amp-social-share.html) で独自の共有ボタンを作成します。

- **双方向性を追加する。**  見込み顧客の発掘、ニュースレターの登録、コメントのサポートなどを、[`amp-form`](/ja/docs/reference/components/amp-form.html) を使って追加します。

- **広告タイプを検討してエクスペリエンスを高める。**  AMP 広告フォーマットとして、[`amp-sticky-ad`](/ja/docs/reference/components/amp-sticky-ad.html) や [`amp-fx-flying-carpet`](/ja/docs/reference/components/amp-fx-flying-carpet.html) を使用してエクスペリエンスを高めます。収益化の[ヒント]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/monetization.md', locale=doc.locale).url.path}})を参考にしてください。

- **アプリのダウンロードを促進する。**
 [`amp-app-banner`](/ja/docs/reference/components/amp-app-banner.html) を使って、バナーにアプリ インストール リンクを追加します。

- **遷移を高速化する。**  非 AMP プログレッシブ ウェブアプリ（PWA）サイトへの遷移を高速化するため、[`amp-install-serviceworker`](/ja/docs/reference/components/amp-install-serviceworker.html) を使ってキャッシュにデータを書き込みます。

### オープンソース AMP プロジェクトに参加して開発に貢献する

- **AMP のロードマップを確認する。**  更新や機能に関するロードマップは [ampproject.org/roadmap](/roadmap/) で確認できます。

- **参加する。**  ソースコードの提供、バグ報告、フィードバックは [GitHub](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md) からお願いします。AMP に関する意見交換は [Stack Overflow](https://stackoverflow.com/questions/tagged/amp-html) で行っています。

- **AMP について学ぶ。**  AMP コンポーネントの使用方法は [AMP サンプル](https://ampbyexample.com/)を参考にしてください。

