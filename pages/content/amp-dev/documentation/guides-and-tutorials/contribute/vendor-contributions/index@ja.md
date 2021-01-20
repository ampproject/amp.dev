---
$title: 貴社のテクノロジーに AMP を統合する
---

サイト運営者の間では、すでに 14 億以上の AMP ドキュメントが作成され、75 万以上の固有ドメインでホストされています。このような成長は、すでに AMP を統合している 100 社以上のサードパーティ テクノロジー企業からの力強い支援がなければ不可能でした。

ウェブ上のサイト運営者や広告主向けのテクノロジー プロバイダの皆様は、お客様が貴社のテクノロジーを利用し続け、よりよいウェブを構築するという私たちに共通のビジョンを実現できるように、AMP のサポートを追加することをおすすめします。

AMP を統合するには主に 4 つの方法があります。

## 1. amp-analytics 拡張機能のサポートを追加する
AMP アナリティクスを使用すると、貴社で設定したトリガーに基づいてサーバーにイベントを返送することができます。使用を開始する際は、[アナリティクス統合ガイド](../../../guides-and-tutorials/optimize-measure/configure-analytics/index.md)をご覧ください。

動的パラメータを含むトラッキング ピクセルをトラッキング URL に追加する必要がある場合は、[`amp-pixel`](../../../components/reference/amp-pixel.md) をご確認ください。貴社のテクノロジーと AMP を併用したいデベロッパーに向けて、サポートページに使用方法を掲載するようおすすめします。

20 社以上のアナリティクス プロバイダが [`amp-analytics`](../../../components/reference/amp-analytics.md) のサポートを導入しています。アナリティクス プロバイダ [Parse.ly](https://www.parsely.com/help/integration/google-amp/) による[プルリクエストの例](https://github.com/ampproject/amphtml/pull/1595)をご覧ください。

## 2. amp-ad 拡張機能を使用する

[`amp-ad`](../../../components/reference/amp-ad.md) 拡張機能は、AMP ページにディスプレイ広告を配信するためのものです。90 社以上の広告テクノロジー プロバイダが AMP のサポートを導入しています。開始する際は、[開発の概要](https://github.com/ampproject/amphtml/tree/master/ads#overview)をお読みください。また、amp-ad 拡張機能のサポートの追加に関する[デベロッパー向けの手順](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request)もご覧ください。提供している広告テクノロジーによっては、こちらの[統合の手順](ad-integration-guide.md)も役立ちます。

90 社以上の広告プロバイダが [`amp-ad`](../../../components/reference/amp-ad.md) のような広告関連機能のサポートを導入しています。広告ネットワーク [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md) による[プルリクエスト](https://github.com/ampproject/amphtml/pull/2299)の例をご覧ください。

## 3. amp-call-tracking 拡張機能を使用する

コール トラッキング測定サービスを提供している場合は、貴社のユースケースに新しい [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md) 拡張機能を活用できる可能性があります。この拡張機能は、数値を置換する CORS リクエストを実行することで、ハイパーリンク内の電話番号を動的に置換し、コール トラッキングを実現します。

この拡張機能の利用方法について詳しくは、[`amp-call-tracking`](../../../components/reference/amp-call-tracking.md)をご覧ください。

## 4. 新しい拡張機能や埋め込みを追加する

貴社のユースケースに [`amp-analytics`](../../../components/reference/amp-analytics.md) [`amp-pixel`](../../../components/reference/amp-pixel.md) [`amp-ad`](../../../components/reference/amp-ad.md) の使用が適さない場合は、[GitHub の問題]を公開して、代わりの方法について検討してください。Google はさまざまな企業で幅広くご利用いただける新しい拡張機能を歓迎いたします。詳しくは、[拡張コンポーネントへの貢献](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#contributing-extended-components)をご覧ください。

## 5. amp-iframe を使用する

さらに 5 つ目の方法をご紹介しますが、これは最後の手段としてお考えください。上記のどの方法もニーズに適していない場合は、汎用的な [`amp-iframe`](../../../components/reference/amp-iframe.md) タグを使って、サイト運営者が貴社のコンテンツを埋め込むことができるようにします。しかし、この方法には、パフォーマンスやユーザー エクスペリエンスに関する落とし穴に起因するマイナス面がいくつかあります。詳しくは、[こちら](../../../components/reference/amp-iframe.md#guideline:-prefer-specific-amp-components-to-amp-iframe)をご覧ください。

## まとめ

開始するにあたっては、まず、Google の[サードパーティ デベロッパー向けガイドライン](https://github.com/ampproject/amphtml/blob/master/3p/README.md)をご覧ください。AMP プロジェクトでは、すでにさまざまなサードパーティのユースケースをサポートしていますが、まだ構築されていないウェブの機能があるはずです。

たとえば、動的なコール トラッキングはまだ AMP でサポートされていないユースケースですが、このサポートを追加するため、コミュニティと[積極的に協力](https://github.com/ampproject/amphtml/issues/5276)しているところです。

ご質問やご提案がある場合は、お気軽に[問題を送信](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#filing-issues)してください。または、いずれかの[ディスカッション チャンネル](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#discussion-channels)にご投稿ください。

## その他のリソース

- [AMP プロジェクト サイト](https://amp.dev/)
- [AMP GitHub プロジェクト](https://github.com/ampproject/amphtml)
- [AMP ブログ](https://blog.amp.dev/)
- [AMP プロジェクトのロードマップ](/content/amp-dev/community/roadmap.html)
