---
'$title': Integrate your analytics tool with AMP
$order: 1
formats:
  - websites
  - stories
teaser:
  text: 概要
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## 概要 <a name="overview"></a>

トラフィックやビジターに関するデータを把握するためのサイト運営者向け SaaS（サービスとしてのソフトウェア）ツールを提供している場合、そのサービスを `amp-analytics` に統合することができます。こうすることで、顧客は AMP HTML ページのトラフィックパターンを閲覧できるようになります。

## 始める前に <a name="before-you-begin"></a>

分析サービスを AMP HTML ランタイムに追加する前に、以下の内容を実施する必要があります。

- 分析サービスを使用する上で AMP HTML ドキュメントに必要となる[変数](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)と[リクエスト](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#requests)の種類を特定する。
- サービスに関連するページから分析リクエストが送信されるようにするトリガーを特定する。
- ファーストパーティとサードパーティ AMP のコンテキストで[ユーザーを追跡する](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)かどうか、そしてその方法を検討する。
- 分析ダッシュボードが AMP トラフィックをどのように処理するかを確認する。
- `amp-analytics` に欠落した機能がないかを確認し、必要な機能について[リクエストを提出](https://github.com/ampproject/amphtml/issues/new)する。
- AMP アナリティクスは、あらかじめ構成されたエンドポイントに変数を送信します。既存のエンドポイントがない場合、その構築方法の概要について、[こちらのサンプル](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)を参照してください。
  - `iframe` を除くすべてのトランスポートタイプでは、変数は HTTPS リクエストのクエリ文字列パラメータとして送信されます。
  - `iframe` トランスポートタイプについては、変数は `window.postMessage` を通じて、作成された iframe に送信されます。この場合、メッセージは URL である必要はありません。このオプションは、MRC 認定ベンダーのみが利用できます。
- `amp-analytics` との統合によって、既存のポリシー（特にプライバシーポリシー）や契約にどのような影響が生まれる可能性があるかを検討する。

## AMP HTML ランタイムへの構成の追加 <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. 分析サービスを AMP HTML のランタイムに追加することを述べた [Intent-To-Implement（実装意図）の課題](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features) を作成します。説明に **cc @ampproject/wg-analytics** を必ず含めてください。
2. 以下の内容を実装するパッチを開発します。
   1. 以下のような、デフォルト外のオプションを含めた新しい構成 json ファイル `${vendorName}.json` を vendors [フォルダ](https://github.com/ampproject/amphtml/tree/master/extensions/amp-analytics/0.1/vendors):
      1. 追加のデフォルト変数用の `"vars": {}`。
      2. サービスが使用するリクエスト用の `"requests": {}`。
      3. 必要な場合は `"optout":`。現時点では、優れたオプトアウトシステムが用意されていないため、あなたに合ったものを設計できるように、お問い合わせください。
      4. 必要な場合は `"warningMessage":`。コンソールにベンダーからの警告情報（説明や移行）を表示します。
   2. iframe トランスポートを使用する場合は、`"*vendor-name*": "*url*"` を含む iframe-transport-vendors.js の ANALYTICS_IFRAME_TRANSPORT_CONFIG に新しい行を追加します。
   3. [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) リファレンス内の例。
   4. [extensions/amp-analytics/0.1/test/vendor-requests.json ](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json) ファイルのテスト。
   5. [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./analytics-vendors-list.md) ファイルの対応ベンダーリストに分析サービスを追加します。種類、説明、および使用方法のドキュメントへのリンクを含めてください。
3. [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) に配置した新しい例をテストし、この例のヒット数が期待通りに動作していることを確認します。たとえば、必要なデータが収集され、分析ダッシュボードに表示されることを確認します。
4. Intent-To-Implement 課題を参照する、このパッチのプルリクエストを提出します。
5. サービスの使用方法ドキュメントを更新し、顧客に伝えます。
6. [AMP リポの外部で統合テスト](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests)を管理することを強くお勧めします。

## タグマネージャー <a name="tag-managers"></a>

タグ管理サービスには、AMP アナリティクスと統合するためのオプションが 2 つ用意されています。

- **エンドポイントアプローチ:** `amp-analytics` の追加エンドポイントとして機能し、バックエンドでマーケティング管理を実施します。
- **Config アプローチ:** 各サイト運営者固有の、動的に生成された JSON config ファイルを通じて、タグ管理を実施します。

エンドポイントアプローチは、前のセクションで説明した標準アプローチと同じです。config アプローチには、サイト運営者固有の amp-analytics の構成を作成する作業があり、互換性のあるすべてのアナリティクスパッケージが含まれます。サイト運営者は、以下のような構文を使用して構成を含めます。

[sourcecode:html]
<amp-analytics
config="https://my-awesome-tag-manager.example.com/user-id.json"

> </amp-analytics>
> [/sourcecode]

このアプローチを使用する場合は、サイト運営者向けの AMP アナリティクスの統合に関するドキュメントを参照してください。

## その他のリソース <a name="further-resources"></a>

- ディープダイブ: [Why not just use an iframe?](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/why-not-iframe.md)
- ディープダイブ: [Managing non-authenticated user state with AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)
- [amp-analytics サンプル](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics) リファレンスドキュメント
- [amp-analytics variables](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md) リファレンスドキュメント
