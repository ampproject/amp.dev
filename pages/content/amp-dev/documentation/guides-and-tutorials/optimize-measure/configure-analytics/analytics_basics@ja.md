---
$title: "アナリティクス: 基本"
---

このページで AMP アナリティクスの基本を学びましょう。

## amp-pixel または amp-analytics を使う <a name="use-amp-pixel-or-amp-analytics"></a>

AMP にはアナリティクスや測定に役立つ 2 つのコンポーネント、[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) と [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)があります。どちらを使用してもアナリティクスのデータは指定したエンドポイントに送信されます。

シンプルな [トラッキング ピクセル](https://en.wikipedia.org/wiki/Web_beacon#Implementation)のような動作が好みであれば、[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) コンポーネントの基本的なページビュー トラッキングがおすすめです。ページビュー データは指定の URL に送信されます。統合するベンダーによっては、このコンポーネントが必要になることがあり、その場合はベンダーが正確なエンドポイント URL を指定します。

ほとんどのアナリティクス ソリューションでは、 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) を使用します。ページビュー トラッキングも [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) で動作します。リンクやボタンのクリックなど、あらゆるページ コンテンツに対するユーザー エンゲージメントもトラッキングできます。ユーザーがページをどのくらいスクロールしたか、ソーシャル メディアを使用しているかなどもわかります。

詳細: 詳しくは、[AMP アナリティクスについて深く学ぶ](deep_dive_analytics.md)をご覧ください。

AMP プラットフォームを統合するにあたり、データの取得やトラッキング ツールへの転送が簡単に行えるよう、プロバイダーはあらかじめ定義した [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 設定を提示しています。ベンダーのドキュメントは、[アナリティクス ベンダー](analytics-vendors.md) リストからアクセスできます。

ページで [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) と [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) を両方使うことも可能です。[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) はシンプルなページビュー トラッキング用で、[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) はそれ以外の全機能に対応しています。各タグを複数追加することもできます。アナリティクス プロバイダーを複数使っている場合は、ソリューションごとに 1 つのタグが必要です。ユーザーにとって AMP ページはシンプルであるほど良いので、余分なタグは使わないようにしましょう。

## シンプルなアナリティクス設定にする

次に、[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) と [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) のシンプルな設定方法を説明します。

### シンプルな amp-pixel 設定

シンプルに [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) を設定するには、以下のような記載を AMP ページのボディ部に挿入します。

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

この例では、ページビュー データは乱数とともに指定の URL に送信されます。`RANDOM` 変数は、数ある [AMP プラットフォームの置換変数](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)のうちの 1 つです。[置換変数](analytics_basics.md)について詳しくは、こちらをご覧ください。

[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) は組み込みのコンポーネントなので、[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) のような AMP 拡張コンポーネントと違って、宣言を追加する必要はありません。ただし [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) タグは、極力 `<body>` の先頭付近に配置してください。トラッキング ピクセルはタグが表示されてから呼び出されるので、[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) がページ上のボタンの近くにあると、トラッキング ピクセルが呼び出されない可能性があります。

### シンプルな amp-analytics 設定

シンプルに [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) を設定するには、まず `custom-element` 宣言を AMP ドキュメントの `<head>` 内に入れます（[コンポーネントを組み込むための宣言](../../../../documentation/components/index.html)もご覧ください）。

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

以下の例は [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)と似ています。ページが表示されるたびにイベントが発生して、ページビュー データがランダム ID とともに指定の URL に送信されます。

```html
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
```

上の例では、pageview というリクエストを `https://foo.com/pixel?RANDOM` と定義しています。 は乱数に置換されます。そのため、最終的なリクエストは次のようになります。`https://foo.com/pixel?0.23479283687235653498734`

(トリガー キーワード `visible` を使って指定したとおり）ページが表示されると、イベントが発生して `pageview` リクエストが送信されます。ページビュー リクエストが送信されるタイミングは、トリガー属性で定義します。詳しくは、[リクエストとトリガー](deep_dive_analytics.md#requests-triggers--transports)をご覧ください。

## 置換変数 <a name="variable-substitution"></a>

[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) と [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) コンポーネントは、どちらも標準的な URL の変数置換をすべて許可します（[AMP HTML の変数置換](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)をご覧ください）。次の例では、ページビュー リクエストを、現在の AMP ドキュメントの正規化された URL とそのタイトル（title）、[クライアント ID](analytics_basics.md#user-identification) とともに URL に送信します。

```html
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
```

[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) タグはシンプルなので、プラットフォームで定義された変数か、AMP ランタイムで AMP ページから解析できる変数のみを含めることができます。上の例では、`canonicalURL` と `clientId(site-user-id)` の値はプラットフォームで設定されます。[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) タグには、[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) と同じ変数も、タグ設定内で一意に定義された変数も含めることができます。

ページのリクエスト文字列やプラットフォームで定義された変数には、`${varName}` フォーマットを使います。[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)
タグは、アナリティクス リクエストの作成時に、テンプレートを実際の値に置き換えます（[amp-analytics でサポートされる変数](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)もご覧ください）。

以下の [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) の例では、ページビュー リクエストが、変数置換で抽出された追加データやプラットフォームから提供されたデータ、[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 設定内でインライン定義されたデータとともに URL に送信されます。

```html
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
```

上の例では、変数 `account` と `title` は [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 設定内で定義されています。変数 `canonicalUrl` と `clientId` は定義されていないので、プラットフォーム側で置換されます。

重要: 変数置換は柔軟性が高いため、同じ変数を別の場所で使用できます。この場合、AMP ランタイムは先行順に値を解析します（[変数置換の順序](deep_dive_analytics.md#variable-substitution-ordering)をご覧ください）。

## ユーザー認証 <a name="user-identification"></a>

ウェブサイトは Cookie を使用してユーザー固有の情報をブラウザに保存します。Cookie によって、ユーザーが以前そのサイトにアクセスしたことがあるかどうかがわかります。AMP では、ページはサイト運営者のウェブサイト、またはキャッシュ（Google AMP Cache など）のどちらかによって提供されます。サイト運営者のウェブサイトとキャッシュのドメインは、たいてい異なります。ブラウザはセキュリティ上の理由により、別ドメインの Cookie へのアクセスを制限することが可能で、多くの場合、実際に制限されています（[ドメインをまたぐユーザー トラッキング](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)もご覧ください）。

AMP はデフォルトで、サイト運営者の元のウェブサイトからのページアクセスと、キャッシュ経由のアクセスの両方に対して、クライアント ID を提供できるようになっています。AMP で生成されたクライアント ID の値は、`「amp-」` の後に `base64` でエンコードされたランダムな文字列が続きます。同じユーザーが再度アクセスした場合、この値は変わりません。

AMP は、どのような場合でもクライアント ID の読み書きを行います。この点は、ページがキャッシュによって表示されている場合や、サイト運営者の元のサイトの表示コンテキスト以外で表示されている場合に特に重要になります。このようなケースでは、サイト運営者のサイトの Cookie にはアクセスできません。

AMP ページがサイト運営者のサイトから提供されている場合は、AMP で使用するクライアント ID フレームワークに対して、検索して使用すべきフォールバック Cookie を通知することができます。この場合、変数 `cid-scope-cookie-fallback-name` の引数 `clientId` が Cookie 名として認識されます。フォーマットは `CLIENT_ID(cid-scope-cookie-fallback-name)`、または `${clientId(cid-scope-cookie-fallback-name)}`のどちらを使用しても構いません。

次に例を示します。

```html
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
```

AMP で Cookie が設定済みと判断されると、クライアント ID は置換されて Cookie の値が返されます。AMP で Cookie が未設定と判断されると、AMP は `amp-` の後ろに base64 エンコードされたランダムな文字列をつけたフォーマットの値を生成します。

クライアント ID の置換や任意のユーザー通知 ID の追加方法については、[AMP アナリティクスでサポートされる変数](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)をご覧ください。

詳細: 引き続き、[AMP アナリティクスについて深く学ぶ](deep_dive_analytics.md)と[ユースケース](use_cases.md) でアナリティクスの詳細をご覧ください。
