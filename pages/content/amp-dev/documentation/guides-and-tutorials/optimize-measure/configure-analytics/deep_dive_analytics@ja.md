---
"$title": AMP アナリティクスの詳細
"$order": '1'
description: このガイドでは、amp-analytics コンポーネントについて、amp-analytics の設定例を次に示す主な構成ブロックに分けて詳しく説明します。
formats:
- ウェブサイト
- ストーリー
---

このガイドでは、 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) コンポーネントについて、[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) の設定例を次に示す主な構成ブロックに分けて詳しく説明します。

以降では、以下の設定例を使用します。この例は、ページビューとリンクのユーザークリックをトラッキングして、サードパーティプロバイダである [Google アナリティクス](https://developers.google.com/analytics/devguides/collection/amp-analytics/)にアナリティクスデータを送信します。

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
```

上記のコードは学習用のサンプルであり、そのまま実際の環境で使用することはできません。特に、上記のアナリティクスプロバイダの設定を簡略化している点は、プロバイダを利用しているユーザーにとって問題になるかもしれません。特定の設定例については、ご利用の[アナリティクスプロバイダのドキュメント](analytics-vendors.md)をご確認ください。

## アナリティクスデータの送信先: type 属性

AMP は、一般的なデータ収集方法として次の 2 つをサポートするように設計されています。

- Ingestion by a publisher-owned endpoint for in-house analytics systems.
- Ingestion by a vendor-owned endpoint for interoperability with a vendor solution (for example, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

アナリティクス データをアナリティクス プロバイダに送信するには、 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) タグに `type` 属性を指定します。 値は、 [アナリティクス ベンダー](analytics-vendors.md)の一覧に記載されている各ベンダーの値を指定します。

For example: `<amp-analytics type="googleanalytics">` sends analytics data to the third-party analytics provider, Google Analytics. To send data to a publisher-owned endpoint, simply don’t include the `type` attribute; the analytics data is sent to the defined endpoints for each [request](deep_dive_analytics.md).

アナリティクス ベンダーの設定を行うと、手早く [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) を使い始めることができます。 詳細については、ご利用のベンダーのドキュメントや ヘルプリソースをご確認ください。 AMP を統合済みのベンダーの一覧と、 各ベンダーのドキュメントへのリンクは、 前述の [アナリティクス ベンダー](analytics-vendors.md)の一覧をご覧ください。

アナリティクス ベンダーの 方は、 [自身のアナリティクス設定を AMP HTML に統合する](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md)方法についての説明をご確認ください。

## リモート設定を読み込む: config 属性

AMP ページに [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) のすべての設定を追加する必要はありません。代わりに、設定のすべてまたは一部を記述したリモート URL を呼び出すことができます。

リモート URL を使用すると、特定のリクエストに応じて設定を変更するといった処理もできるようになります。サイト運営者としてリモートファイルを管理している場合は、設定データの較正に必要なすべてのサーバー側処理を実施できます。

リモート設定を読み込むには、まず <a><code>amp-analytics</code></a> タグに config 属性を追加します。

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

次に、リモート URL に設置する JSON コンテンツを作成します。この例は簡略化されているため、JSON オブジェクトにはアナリティクスアカウントの変数値しか含まれていません。

サンプルで使用している <code>https://example.com/analytics.account.config.json</code> では、次のようになっています。

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
```

最後に、リモートファイルの内容が <a><code>amp-analytics</code></a> 設定の適切な場所に読み込まれるようにします。以下では、<code>pageview</code> リクエストと <code>event</code> リクエストの <code>account</code> 変数の値が、自動駅にリモート URL のアカウント値（<code>"account": "UA-XXXXX-Y"</code>）に設定されます。

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

[tip type="important"] <strong>重要 –</strong> AMP では、同じ変数が複数使用されていないかどうかの検証は行われません。値は、変数置換の優先順位に基づいて設定され、リモート URL の値が最優先されます（「<a>変数置換の順序</a>」をご覧ください）。[/tip]

## requests、triggers、transport <a name="requests-triggers--transports"></a>

<code>requests</code> 属性では、送信するデータの種類（<code>pageviews</code>、<code>events</code> など）とデータの送信先（データ転送に使用する URL) を指定します。

<code>triggers</code> 属性では、アナリティクスデータを送信するタイミングを指定します。たとえば、ユーザーがページを表示したときやリンクをクリックしたときなどです。

<code>transport</code> 属性では、リクエストの送信方法、 つまり使用するプロトコルを指定します。

これらの設定の詳細については後述します（あわせて、「<a><code data-md-type="codespan">amp-analytics</code> リファレンス</a>」の該当する項目をご確認ください）。

### 送信するデータ: requests 属性 <a name="what-data-gets-sent-requests-attribute"></a>

トリガー設定では、`request-name` を使用して、 特定のイベントの発生時に送信するリクエストを指定します。<code>request-value</code> には、<code>https</code> の URL を指定します。これらの値には、他のリクエストや変数を参照するプレースホルダトークンを含めることができます。

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Google アナリティクスなど一部のアナリティクス プロバイダは 設定を提供しており、`type` 属性を介してその設定を使用できます。またアナリティクス プロバイダを利用している場合は、<code>requests</code> 情報の設定が不要な場合があります。<code>requests</code> の設定が必要かどうかや、その方法については、ベンダーのドキュメントをご覧ください。

#### リクエスト URL への追記: extraUrlParams

[extraUrlParams](../../../../documentation/components/reference/amp-analytics.md) 属性では、リクエスト URL のクエリ文字列に追記する追加のパラメータを指定できます。指定したパラメータは、一般的な「&foo=baz」の表記規則に基づいて追記されます。

この <a><code data-md-type="codespan">amp-analytics</code></a> の例では、追加パラメータ `cd1` を リクエストに追記し、値を「AMP」に設定しています。

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### データを送信するタイミング: triggers 属性

`triggers` 属性では、アナリティクス リクエストを送信するタイミングを指定します。この属性は、トリガー名とトリガー設定というキーと値のペアで構成されます。トリガー名には、英数字（a-zA-Z0-9）からなる 任意の文字列を使用できます。

たとえば、 次の [<code>amp-analytics</code>](../../../../documentation/components/reference/amp-analytics.md#extra-url-params) 要素では、ドキュメントが最初に読み込まれたときと、 <code>a</code> タグがクリックされるたびに、リクエストを <code>https://example.com/analytics</code> に 送信するよう設定しています。

```js
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
  "trackAnchorClicks": {
    "on": "click",
    "selector": "a",
    "request": "event",
    "vars": {
      "eventId": "42",
      "eventLabel": "clicked on a link"
    }
  }
}
```

[tip type="important"]  <strong>重要 –</strong> 上記の方法は、AMP ページについてのみ推奨され、AMPHTML 広告には推奨されません。アナリティクスの優先度はページのコンテンツよりも低いため、クリックのトラッキングには、クリックのロスを回避できるブラウザリダイレクトを使用することをお勧めします。[/tip]

AMP では次のトリガー設定をサポートしています。

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">トリガー設定</th>
      <th data-th="Description">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"> <code>on</code>（必須）</td>
      <td data-th="Description">リスンするイベントです。指定できる値は、<code>click</code>、<code>scroll</code>、<code>timer</code>、<code>visible</code> です。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>request</code>（必須）</td>
      <td data-th="Description">送信するリクエストの名前です（<a href="deep_dive_analytics.md#what-data-gets-sent-requests-attribute">requests</a> で指定した名前）。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">キーと値のペアを含むオブジェクトで、最上位の設定で指定された <code>vars</code> をオーバーライドするため、またはこのトリガーに固有の <code>vars</code> を指定するために使用します（<a href="deep_dive_analytics.md#variable-substitution-ordering">変数置換の順序</a>についての説明もご覧ください）。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>selector</code>（<code>on</code> が <code>click</code> に設定されている場合は必須）</td>
      <td data-th="Description">トラッキングする要素を絞り込む CSS セレクタです。すべての要素をトラッキングする場合は、値を <code>*</code> に設定します。この設定は、<code>click</code> トリガーと組み合わせて使用します。セレクタを使用して<a href="use_cases.md#tracking-page-clicks">ページクリックをトラッキングする方法</a>と<a href="use_cases.md#tracking-social-interactions">ソーシャル インタラクションをトラッキングする方法</a>についてご確認ください。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>scrollSpec</code>（<code>on</code> が <code>scroll</code> に設定されている場合は必須）</td>
      <td data-th="Description">どのような状況でページがスクロールされた場合に <code>scroll</code> イベントを発生させるかを管理します。このオブジェクトには、<code>verticalBoundaries</code> と <code>horizontalBoundaries</code> を含めることができます。<code>scroll</code> イベントを発生させるには、この 2 つのプロパティのうち少なくとも 1 つが必要です。両プロパティの値は、スクロールイベントが発生する境界を囲む数値の配列にする必要があります。<a href="use_cases.md#tracking-scrolling">スクロールをトラッキングする方法</a>の例をご確認ください。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>timerSpec</code>（<code>on</code> が <code>timer</code> に設定されている場合は必須）</td>
      <td data-th="Description"> <code>timer</code> イベントを発生させるタイミングを管理します。タイマーは、イベント発生時と、それ以降の指定の間隔でトリガーされます。この設定は、<code>timer</code> トリガーと組み合わせて使用します。</td>
    </tr>
  </tbody>
</table>

[tip type="important"] <strong>重要 –</strong> 同じ名前のトリガーがある場合、優先順位の高い設定のトリガーが優先順位の低いトリガーより優先されるため、低い方がオーバーライドされます（「<a>変数置換の順序</a>」をご覧ください）。 [/tip]

### データの送信方法: transport 属性

<code>transport</code> では、リクエストの送信方法を指定します。デフォルトでは、次の 3 つのメソッドが有効化されています。

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">転送方法</th>
      <th data-th="Description">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">リクエストの送信に <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> が使用できることを示します。この方法では、<code>POST</code> リクエストが認証情報および空のボディとともに送信されます。</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">リクエストの送信に <code>XMLHttpRequest</code> が使用できることを示します。この方法では、<code>POST</code> リクエストが認証情報および空のボディとともに送信されます。</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description"> <code>Image</code> タグを生成することでリクエストを送信できることを示します。この方法では、<code>GET</code> リクエストが送信されます。</td>
    </tr>
  </tbody>
</table>

使用される transport メソッドは 1 つのみで、有効化されている利用可能な許可された、優先順位の最も高いメソッドです。優先順位は <code>beacon</code> > <code>xhrpost</code> > <code>image</code> です。クライアントのユーザーエージェントがあるメソッドをサポートしていない場合、その次に有効化されている優先順位の高いメソッドが使用されます。

転送オプションを制限する場合にのみ、<code>transport</code> 属性を追加します。リクエストを中止することも可能です。

次の例では、<code>beacon</code> と <code>xhrpost</code> が false に設定されているため、これらの優先順位は <code>image</code> よりも高いにもかかわらず、使用されることはありません。クライアントのユーザーエージェントが <code>image</code> メソッドをサポートしている場合はそれが使用されますが、サポートされていない場合はリクエストは送信されません。

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## 変数置換の順序 <a name="variable-substitution-ordering"></a>

AMP は優先順位に従って、変数に値を代入します。

1. リモート設定（`config` で指定）
2. `triggers` のトリガー内にネストされた `vars`
3. [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) の最上位にネストされた `vars`
4. プラットフォームが提供する値

この例では、最上位に定義された変数、トリガー内、およびプラットフォームレベルに、リモート設定があります。

```html
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
```

同じ `var` が複数の場所で定義されている場合、その変数の値は、変数の優先順位に沿って一度だけ設定されます。 そのため、上記の例のように、リモート設定で `account` が UA-XXXXX-Y と定義されている場合、 各変数の値は次のようになります。

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">値</th>
      <th data-th="Defined By" class="col-thirty">定義場所</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">プラットフォーム</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">トリガー</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">リモート設定</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">トリガー</td>
    </tr>
  </tbody>
</table>
