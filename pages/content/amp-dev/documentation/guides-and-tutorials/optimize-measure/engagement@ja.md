---
'$title': ユーザーエンゲージメントの向上
$order: 6
description: ここでは、AMP でユーザーエンゲージメントを高めるためのヒントを紹介します。AMP ページと非 AMP ページで統一感のあるブランディングとリッチなコンテンツでブランドを識別しやすくしましょう
formats:
  - websites
---

ここでは、AMP でユーザーエンゲージメントを高めるためのヒントを紹介します。

### AMP ページと非 AMP ページで統一感のあるブランディングとリッチなコンテンツでブランドを識別しやすくしましょう

- **AMP ページにブランドを反映する。** 非 AMP ページと同じヘッダーやデザインスキーム（色、間隔、書体など）を使用することで、そのブランドのページであることをすぐに認識できるようにします。

- **最も魅力的なコンテンツで目を引く。**AMP ページに変換する際は、画像、動画、埋め込み、構造化データ、コメント、ソーシャルメディアなど、目を引くページ要素を含めます。詳しくは、[サードパーティコンテンツを含める](../../../documentation/guides-and-tutorials/develop/media_iframes_3p/third_party_components.md)をご覧ください。

- **AMP ページを常に最新にする。**ライブブログを、[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) を使って動的に更新します。

### ユーザーエンゲージメントと定着率を最適化する

- **双方向のエクスペリエンスを提供する。**AMP ページで、たとえば [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md) コンポーネントを使って魅力的な画像カルーセルを作成します。また、AMP ではネイティブにサポートされていない双方向性を、[`amp-iframe`](../../../documentation/components/reference/amp-iframe.md) を使って組み込みます。

- **ユーザーの行動経路をカスタマイズする。**ログインボタンを追加します。有料コンテンツがある場合は [`amp-access`](../../../documentation/components/reference/amp-access.md) を使ってルールや特典を実装します。

- **ユーザーの行動経路を拡げる。** 関連記事や推奨記事など、サイト内の関連コンテンツへのリンクを設定します。

- **おすすめのコンテンツを紹介する。** [`amp-list`](../../../documentation/components/reference/amp-list.md) を使っておすすめのコンテンツを追加します。

- **メニューを実装する。** [`amp-sidebar`](../../../documentation/components/reference/amp-sidebar.md) を使って、サイト内の他のコンテンツに簡単に移動できるようにします。

- **コンテンツを共有しやすくする。** [`amp-social-share`](../../../documentation/components/reference/amp-social-share.md) で独自の共有ボタンを作成します。

- **双方向性を追加する。**見込み顧客の発掘、ニュースレターの登録、コメントのサポートなどを、[`amp-form`](../../../documentation/components/reference/amp-form.md) を使って追加します。

- **広告タイプを検討してエクスペリエンスを高める。**AMP 広告フォーマットとして、[`amp-sticky-ad`](../../../documentation/components/reference/amp-sticky-ad.md) や [`amp-fx-flying-carpet`](../../../documentation/components/reference/amp-fx-flying-carpet.md) を使用してエクスペリエンスを高めます。収益化の[ヒント](../../../documentation/guides-and-tutorials/develop/monetization/index.md)を参考にしてください。

- **アプリのダウンロードを促進する。** [`amp-app-banner`](../../../documentation/components/reference/amp-app-banner.md) を使って、バナーにアプリ インストール リンクを追加します。

- **遷移を高速化する。**非 AMP プログレッシブ ウェブアプリ（PWA）サイトへの遷移を高速化するため、[`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) を使ってキャッシュにデータを書き込みます。

### オープンソース AMP プロジェクトに参加して開発に貢献する

- **AMP のロードマップを確認する。**更新や機能に関するロードマップは [roadmap](../../../community/roadmap.html) で確認できます。

- **参加する。**ソースコードの提供、バグ報告、フィードバックは [GitHub](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md) からお願いします。AMP に関する意見交換は [Stack Overflow](https://stackoverflow.com/questions/tagged/amp-html) で行っています。

- **AMP について学ぶ。**AMP コンポーネントの使用方法は [AMP サンプル](../../../documentation/examples/index.html)を参考にしてください。
