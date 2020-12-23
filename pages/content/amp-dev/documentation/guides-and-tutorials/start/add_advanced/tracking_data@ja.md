---
"$title": アナリティクスによるエンゲージメントのトラッキング
"$order": '4'
description: Analytics platforms are commonly integrated into websites through inline JavaScript snippets and function calls, which trigger events that are sent back to the analytics system.
---

アナリティクスプラットフォームは、インライン JavaScript スニペットと関数呼び出しを使用してウェブサイトに統合するのが一般的で、ウェブサイトでイベントがトリガーされると、このメカニズムによってアナリティクスシステムに通知されます。AMP は、複数のアナリティクスパートナー向けに、柔軟な JSON 構成構文を提供してこのプロセスを再現しています。

以下は、従来の JavaScript 主導の Google アナリティクスによるトラッキングの例です。これを [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) JSON 形式に書き換えますが、まずは従来のアプローチを見てみましょう。

```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```

非常にシンプルなこの JavaScript は、ページビュー イベントをトラッキングするための通知を送信します。

AMP でこの機能を再現するには、まず、対象ドキュメントの `<head>` 内に [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) コンポーネント ライブラリを**含める**必要があります。

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

次に、[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) コンポーネントをドキュメントの `body` の最後に**追加**してみましょう。

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    }
  }
}
</script>
</amp-analytics>
```

ページ上部の JavaScript の例と同様に、この [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) スニペットは、ページが表示されたことを示す通知を Google アナリティクスに送信します。

これを指定するため、AMP では、`type` を `googleanalytics` に設定して、JSON で「デフォルト ページビュー」という名前のトリガーを作成しました。このトリガーは、ページが表示されると（`"on": "visible"` の指定に従って）起動し、続いて `vars` に指定された値を含む `pageview` アナリティクス リクエストを Google アナリティクスに送信します。

[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) の設定に使用される JSON は非常に柔軟な形式で、送信するアナリティクス データと送信するタイミングを記述することができます。形式に関する詳細な情報は、[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)に記載されています。

上記の例を基にして、次のように別のトリガー `"click on #header trigger"` を**追加**することもできます。

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    },
    "click on #header trigger": {
      "on": "click",
      "selector": "#header",
      "request": "event",
      "vars": {
        "eventCategory": "examples",
        "eventAction": "clicked-header"
      }
    }
  }
}
</script>
</amp-analytics>
```

名前から推測できるように、この新しいトリガーは ID `"header"` を持つ要素がクリックされたときに起動します（`"on": "click"` および `"selector": "#header"` によって指定されています）。このトリガーは、指定された 2 つの変数を含む `event` リクエストをアナリティクス プロバイダに送信します。

カスタム トラッキング プラットフォームを統合する場合でも、[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) を使用して、トラッキング データの送信先となる独自の URL エンドポイントを定義できます。詳しくは、[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) コンポーネントのリファレンス ドキュメントをご覧ください。

注: `“UA-YYYY-Y”` は Google アナリティクス アカウントの例です。このサンプルをご自身のサイトで使用する場合は、実際のウェブサイトの Google アナリティクス トラッキング コードに置き換える必要があります。

ヒント: より単純なトラッキング システムについては、[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)をご覧ください。
