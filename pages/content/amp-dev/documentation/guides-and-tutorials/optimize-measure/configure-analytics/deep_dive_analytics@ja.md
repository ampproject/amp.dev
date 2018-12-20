---
$title: AMP アナリティクスについて詳しく知る
---
[TOC]

このガイドでは、
[amp-analytics コンポーネント](/ja/docs/reference/components/amp-analytics.html)
について詳しく説明するため、`amp-analytics` の設定サンプルをパートごとに分けて解説します。

このガイドで使用するのは、以下の設定サンプルです。
このサンプルは、ページビューとユーザーによるリンククリックをトラッキングして、
サードパーティのプロバイダである 
[Google アナリティクス](https://developers.google.com/analytics/devguides/collection/amp-analytics/)にアナリティクス データを送信します。

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

[tip type="note"]

上記のコードは学習用のサンプルであり、そのまま実際の環境で使用することはできません。特に、アナリティクス プロバイダの設定を簡略化している点は、プロバイダを利用しているユーザーにとって問題になるかもしれません。特定のアナリティクス プロバイダの設定サンプルについては、[各プロバイダのドキュメント](/ja/docs/analytics/analytics-vendors.html)をご確認ください。
[/tip]

## アナリティクス データの送信先: type 属性

AMP は、一般的なデータ収集方法として次の 2 つをサポートしています。

* サイト運営者所有のエンドポイントによる収集（アナリティクス システムを社内で運用している場合）
* ベンダー所有のエンドポイントによる収集（
[Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html)、[Chartbeat](http://support.chartbeat.com/docs/)、[Google アナリティクス](https://developers.google.com/analytics/devguides/collection/amp-analytics/)などのベンダー ソリューションと相互運用する場合）

アナリティクス データをアナリティクス プロバイダに送信するには、
`amp-analytics` タグに `type` 属性を指定します。
値は、
[アナリティクス ベンダー](/ja/docs/analytics/analytics-vendors.html)の一覧に記載されている各ベンダーの値を指定します。

たとえば、`<amp-analytics type="googleanalytics">` とすると、
サードパーティのアナリティクス プロバイダである Google アナリティクスにアナリティクス データが送信されます。
サイト運営者所有のエンドポイントにデータを送信する場合は、
`type` 属性の指定を省略します。
このようにすると、アナリティクス データは
[リクエスト](/ja/docs/analytics/deep_dive_analytics.html#what-data-gets-sent-requests-attribute)ごとに指定のエンドポイントに送信されます。

アナリティクス ベンダーの設定を行うと、手早く 
`amp-analytics` を使い始めることができます。
詳細については、ご利用のベンダーのドキュメントや
ヘルプリソースをご確認ください。
AMP を統合済みのベンダーの一覧と、
各ベンダーのドキュメントへのリンクは、
前述の
[アナリティクス ベンダー](/ja/docs/analytics/analytics-vendors.html)の一覧をご覧ください。

アナリティクス ベンダーの
方は、
[自身のアナリティクス設定を AMP HTML に統合する](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md)方法についての説明をご確認ください。

## リモート設定を読み込む: config 属性

`amp-analytics` のすべての設定を 
AMP ページに記述する必要はありません。
代わりに、設定の一部またはすべてを記述した
リモート URL を呼び出すこともできます。

リモート URL を使用すると、特定のリクエストに基づいて
設定を変更するといった処理もできるようになります。
サイト運営者としてリモート ファイルを管理している場合は、
設定データの構成に必要なすべての
サーバー側処理を実施できます。

リモート設定を読み込むには、まず、
`amp-analytics` タグに config 属性を指定します。

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

次に、リモート URL に設置する JSON コンテンツを作成します。
この簡潔なサンプルで使用している 
JSON オブジェクトには、アナリティクス アカウントの変数値だけが含まれています。

サンプルで使用している `https://example.com/analytics.account.config.json` の中身は次のようになっています。

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
```

最後に、リモート ファイルの内容が 
`amp-analytics` 設定の適切な場所に読み込まれるようにします。
以下では、`pageview` リクエストと `event` リクエストの 
`account` 変数の値が、自動的にリモート URL の
アカウント値（`"account": "UA-XXXXX-Y"`）に設定されます。

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```


[tip type="important"]

AMP では、同じ変数が複数使用されていないかどうかの検証は行われません。
値は、変数置換の優先順位に基づいて設定され、
リモート URL の値が最優先されます（[変数置換の順序](/ja/docs/analytics/deep_dive_analytics.html#variable-substitution-ordering)についての説明をご確認ください）。

[/tip]

## requests、triggers、transport

`requests` 属性では、送信するデータの種類
（`pageviews` や `events` など）
とデータの送信先（データ転送に使用する URL）を指定します。

`triggers` 属性では、アナリティクス データを送信するタイミングを指定します。
たとえば、ユーザーがページを表示したときやリンクをクリックしたときなどです。

`transport` 属性では、リクエストの送信方法、
つまり使用するプロトコルを指定します。

これらの設定の詳細については後述します
（あわせて、
[amp-analytics リファレンス](/ja/docs/reference/components/amp-analytics.html)の該当する項目をご確認ください）。

### 送信するデータ: requests 属性

トリガー設定では、`request-name` を使用して、
特定のイベントの発生時に送信するリクエストを指定します。
`request-value` には、`https` の URL を指定します。
これらの値には、他のリクエストや変数を参照する
プレースホルダ トークンを含めることができます。

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Google アナリティクスなど一部のアナリティクス プロバイダは
設定を提供しており、
`type` 属性を介してその設定を使用できます。
またアナリティクス プロバイダを利用している場合は、
`requests` 情報の設定が不要な場合があります。
`requests` の設定が必要かどうかや、
その方法については、ベンダーのドキュメントをご確認ください。

#### リクエスト URL への追記: extraUrlParams

[extraUrlParams](/ja/docs/reference/components/amp-analytics.html#extra-url-params) 
属性では、リクエスト URL のクエリ文字列に追記する追加のパラメータを指定できます。指定したパラメータは、一般的な「&foo=baz」の表記規則に基づいて追記されます。

この `amp-analytics` のサンプルでは、追加パラメータ `cd1` を
リクエストに追記し、値を「AMP」に設定しています。

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### データを送信するタイミング: triggers 属性

`triggers` 属性では、アナリティクス リクエストを送信するタイミングを指定します。
この属性は、トリガー名とトリガー設定というキーと値のペアで構成されます。
トリガー名には、英数字（a-zA-Z0-9）からなる
任意の文字列を使用できます。

たとえば、
次の `amp-analytics` の抜粋では、ドキュメントが最初に読み込まれたときと、
`a` タグがクリックされるたびに、リクエストを `https://example.com/analytics` に
送信するよう設定しています。

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

[tip type="important"]
 上記の方法は、AMP ページについてのみ推奨され、AMP HTML 広告には推奨されません。アナリティクスの優先度はページのコンテンツよりも低いため、クリックのトラッキングには、クリックのロスを回避できるブラウザ リダイレクトを使用することをおすすめします。
[/tip]

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
      <td data-th="Trigger Config"><code>on</code>（必須）</td>
      <td data-th="Description">リッスンするイベントです。指定できる値は、<code>click</code>、<code>scroll</code>、<code>timer</code>、<code>visible</code> です。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code>（必須）</td>
      <td data-th="Description">送信するリクエストの名前（<a href="/ja/docs/analytics/deep_dive_analytics.html#what-data-gets-sent-requests-attribute">requests</a> で指定した名前）です。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">キーと値のペアを含むオブジェクトで、最上位の設定で指定された <code>vars</code> をオーバーライドするため、またはこのトリガーに固有の <code>vars</code> を指定するために使用します（<a href="/ja/docs/analytics/deep_dive_analytics.html#variable-substitution-ordering">変数置換の順序</a>についての説明もご覧ください）。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code>（<code>on</code> が <code>click</code> に設定されている場合は必須）</td>
      <td data-th="Description">トラッキングする要素を絞り込む CSS セレクタです。すべての要素をトラッキングする場合は、値を <code>*</code> に設定します。この設定は、<code>click</code> トリガーと組み合わせて使用します。セレクタを使用して<a href="/ja/docs/analytics/use_cases.html#tracking-page-clicks">ページクリックをトラッキングする方法</a>と<a href="/ja/docs/analytics/use_cases.html#tracking-social-interactions">ソーシャル インタラクションをトラッキングする方法</a>についてご確認ください。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code>（<code>on</code> が <code>scroll</code> に設定されている場合は必須）</td>
      <td data-th="Description">どのような状況でページがスクロールされた場合に <code>scroll</code> イベントを発生させるかを管理します。このオブジェクトには、<code>verticalBoundaries</code> と <code>horizontalBoundaries</code> を含めることができます。<code>scroll</code> イベントを発生させるには、この 2 つのプロパティのうち少なくとも 1 つが必要です。両プロパティの値は、スクロール イベントが発生する境界を囲む数値の配列にする必要があります。<a href="/ja/docs/analytics/use_cases.html#tracking-scrolling">スクロールをトラッキングする方法</a>の例をご確認ください。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code>（<code>on</code> が <code>timer</code> に設定されている場合は必須）</td>
      <td data-th="Description"><code>timer</code> イベントを発生させるタイミングを管理します。タイマーは、イベント発生時と、それ以降の指定の間隔でトリガーされます。この設定は、<code>timer</code> トリガーと組み合わせて使用します。</td>
    </tr>
  </tbody>
</table>

[tip type="important"]

優先順位の低い設定に記述されたトリガーは、優先順位の高い設定に記述された同名のトリガーによってオーバーライドされます（[変数置換の順序](/ja/docs/analytics/deep_dive_analytics.html#variable-substitution-ordering)をご確認ください）。

[/tip]

### データの送信方法: transport 属性

`transport` 属性では、リクエストの送信方法を指定します。
デフォルトでは、次の 3 つの方法が有効になっています。

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
      <td data-th="Description"><code>Image</code> タグを生成することでリクエストを送信できることを示します。この方法では、<code>GET</code> リクエストが送信されます。</td>
    </tr>
  </tbody>
</table>

転送方法は、有効かつ使用が許可され、
利用できるもののうち、
最も優先度の高い方法が 1 つだけ使用されます。
転送方法の優先順位は、`beacon` > `xhrpost` > `image` です。
クライアントのユーザー エージェントが最も優先順位の高い方法をサポートしていない場合は、
有効な方法のうち、次に優先順位の高い方法が使用されます。

`transport` 属性を指定すると、リクエストが
送信されなくなる場合があります。このため、
転送方法を限定したい場合にのみ使用するようにしてください。

次の例では、
`beacon` と `xhrpost` を false に設定しているため、
`image` より優先順位が高いにもかかわらず、どちらの方法も使用されません。
クライアントのユーザー エージェントが `image` をサポートしている場合は
この方法が使用され、サポートしていない場合、リクエストは送信されません。

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## 変数置換の順序

AMP では、次の優先順位に沿って変数に値が設定されます。

1. リモート設定（`config` で指定）
2. `triggers` のトリガー内にネストされた `vars`
3. `amp-analytics` の最上位にネストされた `vars`
4. プラットフォームが提供する値

次の例には、リモート設定、
最上位に定義された変数、トリガー内に定義された変数、プラットフォーム レベルで定義された変数が含まれています。

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

同じ `var` が複数の場所で定義されている場合、
その変数の値は、変数の優先順位に沿って一度だけ設定されます。
そのため、上記の例において、リモート設定で `account` が UA-XXXXX-Y と定義されている場合、
各変数の値は次のようになります。

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
 
