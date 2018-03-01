---
$title: "アナリティクス: 基本"
$order: 0
toc: true
---

このページで AMP アナリティクスの基本を学びましょう。

[TOC]

## amp-pixel または amp-analytics を使う

AMP にはアナリティクスや測定に役立つ 2 つのコンポーネント、[amp-pixel](/ja/docs/reference/amp-pixel.html) と [amp-analytics](/ja/docs/reference/extended/amp-analytics.html)があります。どちらを使用してもアナリティクスのデータは指定したエンドポイントに送信されます。

シンプルな [トラッキング ピクセル](https://en.wikipedia.org/wiki/Web_beacon#Implementation)のような動作が好みであれば、`amp-pixel` コンポーネントの基本的なページビュー トラッキングがおすすめです。ページビュー データは指定の URL に送信されます。統合するベンダーによっては、このコンポーネントが必要になることがあり、その場合はベンダーが正確なエンドポイント URL を指定します。

ほとんどのアナリティクス ソリューションでは、 `amp-analytics` を使用します。ページビュー トラッキングも `amp-analytics` で動作します。リンクやボタンのクリックなど、あらゆるページ コンテンツに対するユーザー エンゲージメントもトラッキングできます。ユーザーがページをどのくらいスクロールしたか、ソーシャル メディアを使用しているかなどもわかります。

{% call callout('詳細', type='read') %}
詳しくは、[AMP アナリティクスについて深く学ぶ](/ja/docs/guides/analytics/deep_dive_analytics.html)をご覧ください。
{% endcall %}

AMP プラットフォームを統合するにあたり、データの取得やトラッキング ツールへの転送が簡単に行えるよう、プロバイダーはあらかじめ定義した `amp-analytics` 設定を提示しています。ベンダーのドキュメントは、[アナリティクス ベンダー](/ja/docs/guides/analytics/analytics-vendors.html) リストからアクセスできます。

ページで `amp-pixel` と `amp-analytics` を両方使うことも可能です。`amp-pixel` はシンプルなページビュー トラッキング用で、`amp-analytics` はそれ以外の全機能に対応しています。各タグを複数追加することもできます。アナリティクス プロバイダーを複数使っている場合は、ソリューションごとに 1 つのタグが必要です。ユーザーにとって AMP ページはシンプルであるほど良いので、余分なタグは使わないようにしましょう。

## シンプルなアナリティクス設定にする

次に、[amp-pixel](/ja/docs/reference/amp-pixel.html) と [amp-analytics](/ja/ocs/reference/extended/amp-analytics.html) のシンプルな設定方法を説明します。

### シンプルな amp-pixel 設定

シンプルに `amp-pixel` を設定するには、以下のような記載を AMP ページのボディ部に挿入します。

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
[/sourcecode]

この例では、ページビュー データは乱数とともに指定の URL に送信されます。`RANDOM` 変数は、数ある [AMP プラットフォームの置換変数](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)のうちの 1 つです。[置換変数](/ja/docs/guides/analytics/analytics_basics.html#variable-substitution)について詳しくは、こちらをご覧ください。

[amp-pixel](/ja/docs/reference/amp-pixel.html) は組み込みのコンポーネントなので、`amp-analytics` のような AMP 拡張コンポーネントと違って、宣言を追加する必要はありません。ただし `amp-pixel` タグは、極力 `<body>` の先頭付近に配置してください。トラッキング ピクセルはタグが表示されてから呼び出されるので、`amp-pixel` がページ上のボタンの近くにあると、トラッキング ピクセルが呼び出されない可能性があります。

### シンプルな amp-analytics 設定

シンプルに [amp-analytics](/docs/reference/extended/amp-analytics.html) を設定するには、まず `custom-element` 宣言を AMP ドキュメントの `<head>` 内に入れます（[コンポーネントを組み込むための宣言](/docs/reference/extended.html#component-inclusion-declaration)もご覧ください）。

[sourcecode:html]
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
[/sourcecode]

以下の例は [amp-pixel の例](/ja/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration)と似ています。ページが表示されるたびにイベントが発生して、ページビュー データがランダム ID とともに指定の URL に送信されます。

[sourcecode:html]
<amp-analytics>

<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
   }
  }
</script>
</amp-analytics>
[/sourcecode]

上の例では、pageview というリクエストを https://foo.com/pixel?RANDOM と定義しています。 は乱数に置換されます。そのため、最終的なリクエストは次のようになります。https://foo.com/pixel?0.23479283687235653498734

(トリガー キーワード `visible` を使って指定したとおり）ページが表示されると、イベントが発生して `pageview` リクエストが送信されます。ページビュー リクエストが送信されるタイミングは、トリガー属性で定義します。詳しくは、[リクエストとトリガー](/ja/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports)をご覧ください。

## 置換変数

[amp-pixel](/ja/docs/reference/amp-pixel.html) と [amp-analytics](/ja/docs/reference/extended/amp-analytics.html) コンポーネントは、どちらも標準的な URL の変数置換をすべて許可します（[AMP HTML の変数置換](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)をご覧ください）。次の例では、ページビュー リクエストを、現在の AMP ドキュメントの正規化された URL とそのタイトル（title）、[クライアント ID](/ja/docs/guides/analytics/analytics_basics.html#user-identification) とともに URL に送信します。

[sourcecode:html]
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
[/sourcecode]

`amp-pixel` タグはシンプルなので、プラットフォームで定義された変数か、AMP ランタイムで AMP ページから解析できる変数のみを含めることができます。上の例では、`canonicalURL` と `clientId(site-user-id)` の値はプラットフォームで設定されます。`amp-analytics` タグには、`amp-pixel` と同じ変数も、タグ設定内で一意に定義された変数も含めることができます。

ページのリクエスト文字列やプラットフォームで定義された変数には、`${varName}` フォーマットを使います。`amp-analytics`
タグは、アナリティクス リクエストの作成時に、テンプレートを実際の値に置き換えます（[amp-analytics でサポートされる変数](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)もご覧ください）。

以下の `amp-analytics` の例では、ページビュー リクエストが、変数置換で抽出された追加データやプラットフォームから提供されたデータ、`amp-analytics` 設定内でインライン定義されたデータとともに URL に送信されます。

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
   "someEvent": {
     "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

上の例では、変数 `account` と `title` は `amp-analytics` 設定内で定義されています。変数 `canonicalUrl` と `clientId` は定義されていないので、プラットフォーム側で置換されます。

{% call callout('重要', type='caution') %}
変数置換は柔軟性が高いため、同じ変数を別の場所で使用できます。この場合、AMP ランタイムは先行順に値を解析します（[変数置換の順序](/ja/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)をご覧ください）。
{% endcall %}

## ユーザー認証


ウェブサイトは Cookie を使用してユーザー固有の情報をブラウザに保存します。Cookie によって、ユーザーが以前そのサイトにアクセスしたことがあるかどうかがわかります。AMP では、ページはサイト運営者のウェブサイト、またはキャッシュ（Google AMP Cache など）のどちらかによって提供されます。サイト運営者のウェブサイトとキャッシュのドメインは、たいてい異なります。ブラウザはセキュリティ上の理由により、別ドメインの Cookie へのアクセスを制限することが可能で、多くの場合、実際に制限されています（[ドメインをまたぐユーザー トラッキング](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)もご覧ください）。

AMP はデフォルトで、サイト運営者の元のウェブサイトからのページアクセスと、キャッシュ経由のアクセスの両方に対して、クライアント ID を提供できるようになっています。AMP で生成されたクライアント ID の値は、`「amp-」` の後に `base64` でエンコードされたランダムな文字列が続きます。同じユーザーが再度アクセスした場合、この値は変わりません。

AMP は、どのような場合でもクライアント ID の読み書きを行います。この点は、ページがキャッシュによって表示されている場合や、サイト運営者の元のサイトの表示コンテキスト以外で表示されている場合に特に重要になります。このようなケースでは、サイト運営者のサイトの Cookie にはアクセスできません。

AMP ページがサイト運営者のサイトから提供されている場合は、AMP で使用するクライアント ID フレームワークに対して、検索して使用すべきフォールバック Cookie を通知することができます。この場合、変数 `cid-scope-cookie-fallback-name` の引数 `clientId` が Cookie 名として認識されます。フォーマットは `CLIENT_ID(cid-scope-cookie-fallback-name)`、または `${clientId(cid-scope-cookie-fallback-name)}`のどちらを使用しても構いません。

次に例を示します。

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
[/sourcecode]

AMP で Cookie が設定済みと判断されると、クライアント ID は置換されて Cookie の値が返されます。AMP で Cookie が未設定と判断されると、AMP は `amp-` の後ろに base64 エンコードされたランダムな文字列をつけたフォーマットの値を生成します。


クライアント ID の置換や任意のユーザー通知 ID の追加方法については、[AMP アナリティクスでサポートされる変数](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)をご覧ください。

{% call callout('詳細', type='read') %}
引き続き、[AMP アナリティクスについて深く学ぶ](/ja/docs/guides/analytics/deep_dive_analytics.html)と[ユースケース](/ja/docs/guides/analytics/use_cases.html) でアナリティクスの詳細をご覧ください。
{% endcall %}
