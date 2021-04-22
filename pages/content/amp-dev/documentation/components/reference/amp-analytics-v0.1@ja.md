---
$title: amp-analytics
$category@: ads-analytics
teaser:
  text: AMP ドキュメントからアナリティクス データを収集します。
---


<!--
Copyright 2019 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



AMP ドキュメントからアナリティクス データを収集します。

<table>
  <tr>
    <td class="col-fourty"><strong>必要なスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>例</strong></td>
    <td>AMP By Example の <a href="https://ampbyexample.com/components/amp-analytics/">amp-analytics の例</a>をご覧ください。</td>
  </tr>
</table>


## ベンダーや社内へのアナリティクス データの送信 <a name="sending-analytics-to-a-vendor-or-in-house"></a>

サイトで AMP アナリティクスを使い始める前に、ユーザー エンゲージメント分析にサードパーティのアナリティクス ツールを使用するか、社内のソリューションを使用するかを決める必要があります。

[tip type="read-on"] AMP アナリティクスについて詳しくは、[アナリティクスの設定](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md)ガイドをご覧ください。
[/tip]

### アナリティクス ベンダーへのデータの送信 <a name="analytics-vendors"></a>

AMP アナリティクスでは、1 回の測定で得たデータを複数の URL に送信できます。すでに 1 社以上のアナリティクス ベンダーを利用している場合は、[アナリティクス ベンダー](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md)の一覧で、該当のソリューションが AMP と統合されているかどうかをご確認ください。

統合型 AMP アナリティクス ベンダーの場合:

1. `<amp-analytics>` タグに `type` 属性を追加して、その値を指定されている[ベンダー](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md)に設定します。
1. どのデータを収集してトラッキングするかを決め、設定データにその詳細を指定します。アナリティクス データの収集方法については、ベンダーのドキュメントをご覧ください。

アナリティクス ベンダーが AMP を統合していない場合は、ベンダーに問い合わせてサポートを依頼してください。AMP プロジェクトに問題を報告し、ベンダーを追加するようリクエストすることをおすすめします。また、[AMP HTML にアナリティクス ツールを統合する](../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md)方法もご確認ください。さらに、指定された URL にデータを送信する際には、ベンダーと協力してください。詳しくは、以下の[社内へのデータの送信](#sending-data-in-house)をご覧ください。

*例: 第三者アナリティクス プロバイダへのデータの送信*

次の例では、AMP を統合済みの第三者アナリティクス プロバイダである Nielsen にアナリティクス データを送信します。Nielsen 向けにアナリティクス データを設定する方法について詳しくは、[Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API) のドキュメントをご覧ください。

```html
<amp-analytics type="nielsen">
  <script type="application/json">
  {
    "vars": {
      "apid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
      "apv": "1.0",
      "apn": "My AMP Website",
      "section": "Entertainment",
      "segA": "Music",
      "segB": "News",
      "segC": "Google AMP"
    }
  }
  </script>
</amp-analytics>
```

### 社内へのデータの送信 <a name="sending-data-in-house"></a>

ユーザー エンゲージメントの測定に社内のソリューションを使用する場合は、URL さえあれば、AMP アナリティクスをそのソリューションと統合できます。この URL がデータの送信先となります。データは複数の URL に送信することもできます。たとえば、ページビュー データとソーシャル エンゲージメント データをそれぞれ別の URL に送信できます。

[tip type="note"] 社内のソリューションにおいて AMP を統合していないアナリティクス ベンダーと連携して作業を行う場合、そのベンダーと共同で必要な設定情報を確認してください。
[/tip]

特定の URL にデータを送信する方法は次のとおりです。

1. どのデータを収集してトラッキングするかを決め、[設定データにその詳細を指定](#specifying-configuration-data)します。
1. [`requests`](#requests) 設定オブジェクトで、トラッキングするリクエストのタイプ（ページビュー、特定のトリガー イベントなど）と、トラッキング データの送信先の URL を指定します。

[tip type="note"] アナリティクス リクエストのリファラー ヘッダー内の AMP URL を処理するときには、`usqp` パラメータを取り除くか無視します。このパラメータは、Google が Google AMP キャッシュのテストをトリガーする際に使用されます。
[/tip]

*例: URL へのデータの送信*

以下に、ページビューをトラッキングする簡単な例を示します。ページが表示されるたびにトリガー イベントが起動し、ページビュー データがランダムな ID とともに定義済みの URL に送信されます。

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM"
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

[tip type="success"] トラッキングの一般的なユースケース（ページの視聴回数、ページのクリック数、スクロールなど）については、[アナリティクス: ユースケース](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/use_cases.md)をご覧ください、
[/tip]

## 設定データの指定 <a name="specifying-configuration-data"></a>

`<amp-analytics>` 要素では、測定の対象やアナリティクス データの送信先に関する詳細情報を格納する JSON 設定オブジェクトを指定します。

`<amp-analytics>` の設定オブジェクトの形式は次のとおりです。

```javascript
{
  "requests": {
    request-name: request-value,
    ...
  },
  "vars": {
    var-name: var-value,
    ...
  },
  "extraUrlParams": {
    extraurlparam-name: extraurlparam-value,
    ...
  },
  "triggers": {
    trigger-name: trigger-object,
    ...
  },
  "transport": {
    "beacon": *boolean*,
    "xhrpost": *boolean*,
    "image": *boolean*,
  }
}
```

### インラインまたはリモート設定 <a name="inline-or-remote-configuration"></a>

設定データは、インラインで指定することも、`config` 属性で URL を指定してリモートで取得することも可能です。また、`type` 属性を使用して、一般的なアナリティクス ベンダーの組み込み設定を選択することもできます。

複数の提供元の設定データを使用する場合、設定オブジェクト（変数、リクエスト、トリガー）がマージされます。この場合、優先順位は次のようになります。

1. リモート設定がインライン設定よりも優先される。
1. インライン設定がベンダー設定よりも優先される。

#### リモート設定の読み込み <a name="loading-remote-configuration"></a>

リモート設定を読み込むには、`<amp-analytics>` 要素で、`config` 属性と設定データの URL を指定します。URL の指定では HTTPS スキームを使用する必要があります。URL には [AMP URL 変数](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)を含めることができます。Cookie にアクセスする場合は、[`data-credentials`](#data-credentials) 属性を確認してください。レスポンスは [AMP CORS セキュリティ ガイドライン](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)に準拠する必要があります。

次の例では、指定した URL から設定データを読み込むように `config` 属性を指定しています。

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

#### 設定リライタ <a name="configuration-rewriter"></a>

設定リライタ機能では、指定された設定をアナリティクス プロバイダが動的に書き換えることができます。この機能はリモート設定機能に似ていますが、ユーザーが指定した設定をサーバーへのリクエストに追加することができます。現在のところ、この機能を有効にできるのはアナリティクス ベンダーだけです。

アナリティクス ベンダーは、サーバーの URL を使用して configRewriter プロパティを指定します。
```js
export const VENDOR_ANALYTICS_CONFIG = {
    ...
    'configRewriter': {
      'url': 'https://www.vendor.com/amp-config-rewriter',
    },
    ...
}
```

ランタイムは、指定されたリモート設定とマージされたインライン設定を含むリクエストを、ベンダーが指定した configRewriter エンドポイントに送信します。ベンダーはこのデータをサーバー側で使用して、新たに書き換えられた設定を作成して返します。

ランタイムはその後、指定されたすべての設定をマージして、以下のように優先順位の高い順に最終的な設定を決定します。

1. 書き換えられた設定
1. インライン設定
1. ベンダーが定義した設定

##### 変数グループ <a name="variable-groups"></a>

変数グループは、ユーザーが簡単に有効化できる定義済みの変数セットをアナリティクス プロバイダがグループ化するための機能です。これらの変数は解決され、指定の `configRewriter` エンドポイントに送信されます。

アナリティクス プロバイダはこの機能を有効にするために、`configRewriter` 設定の内部に新しい `varGroups` オブジェクトを作成する必要があります。サイト運営者はその後、指名したアナリティクス プロバイダが作成した有効化対象の `varGroups` をアナリティクス設定に含めることができます。[AMP HTML の置換ガイド](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)でサポートされている変数はすべて使用できます。*重要な注意事項*: ${varName} バリアントは使用できません。

あるベンダーによる設定例を以下に示します。
```js
// This is predefined by vendor.
export const VENDOR_ANALYTICS_CONFIG = {
    ...
    'configRewriter': {
      'url': 'https://www.vendor.com/amp-config-rewriter',
      'varGroups' : {
        'group1': {
          'referrer': 'DOCUMENT_REFERRER',
          'source': 'SOURCE_URL',
        'group2': {
          'title': 'TITLE',
        },
      },
    },
  },
    ...
}
```

  プロバイダの `<amp-analytics>` 設定内に特定の `varGroups` に対する `{enabled: true}` を含めることで、どの変数グループを有効にするかを指定できます。`enabled` は予約キーワードのため、変数名として使用することはできません。

  以下の例では、`group1` と `group2` の両方が有効化されています。明確に有効化されていないグループは無視されます。ランタイムは、有効化された変数をすべて解決し、1 つの `configRewriter.vars` オブジェクトにマージします。このオブジェクトが設定リライタの URL に送信されます。

```html
  /* Included on publisher page */
  <amp-analytics type="myVendor" id="myVendor" data-credentials="include">
    <script type="application/json">
    {
      "configRewriter": {
        "varGroups": {
          "group1": {
            "enabled": true
          },
          "group2": {
            "enabled": true
          }
        }
      }
    }
    </script>
  </amp-analytics>
```

この例のリクエストの本文は次のようになります。

```json
  /* Sent to configuration rewriter server. */
  "configRewriter": {
    "vars": {
      "referrer": "https://www.example.com",
      "source": "https://www.amp.dev",
      "title": "Cool Amp Tips"
    }
  }
```

### 設定データ オブジェクト <a name="configuration-data-objects"></a>

#### リクエスト <a name="requests"></a>

`requests` 設定オブジェクトでは、アナリティクス プラットフォームへのデータの送信に使用する URL を指定するだけでなく、リクエストの動作のバッチ処理やレポート作成も行います。`request-name` では、特定のイベント（`pageview`、`event` など）の発生時に送信する必要があるリクエストを指定します。`request-value` には HTTPS URL を含めます。この値には、他のリクエストや変数を参照可能なプレースホルダ トークンを含めることができます。`request-value` には、オプションのリクエスト設定を含むオブジェクトを指定することも可能です。

##### リクエストの設定 <a name="request-configs"></a>

オブジェクトを指定してリクエストを定義する場合は、以下のプロパティを使用します。

- `baseUrl`: リクエストの URL を定義します（必須）。
- `reportWindow`: リクエストのレポートを停止する期間（秒）を指定します（オプション）。`important: true` が指定されたトリガーが起動すると、最長レポート期間の制約が無効になります。

次の例のリクエストはすべて有効です。

```javascript
"requests": {
  "base": "https://example.com/analytics?a=${account}&u=${canonicalUrl}&t=${title}",
  "pageview": {
    "baseUrl": "${base}&type=pageview"
  },
  "event": {
    "baseUrl": "${base}&type=event&eventId=${eventId}",
    "batchInterval": 5,
    "reportWindow" : 30
  }
}
```

アナリティクス プロバイダは既定の設定を持っている場合があり、その設定を使用するには `type` 属性を指定します。アナリティクス プロバイダを利用している場合、リクエスト情報の設定が不要なことがあります。リクエストの設定が必要かどうかや、その方法については、ベンダーのドキュメントをご確認ください。

##### バッチ処理の設定 <a name="batching-configs"></a>

リクエストの ping の回数を減らすために、リクエストの設定でバッチ処理の動作を指定できます。同じリクエストを使用する `triggers` からの [`extraUrlParams`](#extra-url-params) がリクエストの `baseUrl` に追加されます。

バッチ処理のプロパティには以下のものがあります。

- `batchInterval`: このプロパティでは、バッチ処理のキューに登録されているリクエストの ping を実行する間隔（秒）を指定します。`batchInterval` には単一の数値または数値の配列を指定できます（最小間隔は 200 ミリ秒）。リクエストは配列内のすべての値を使用します。配列の最後に達すると、その最後の値が繰り返し使用されます（単一の数値を指定した場合は、その値が繰り返し使用されます）。

たとえば次の設定では、単一のリクエストの ping が 2 秒ごとに送信されます。リクエストの ping は `https://example.com/analytics?rc=1&rc=2` のようになります。
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": 2,
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

次の設定では、1 秒後に 1 つ目のリクエストの ping が送信され、その後は 3 秒ごとにリクエストが送信されます。1 つ目のリクエストの ping は `https://example.com/analytics?rc=1`、2 つ目のリクエストの ping は `https://example.com/analytics?rc=2&rc=3&rc=4` のようになります。
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": [1, 3],
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

#### 変数 <a name="vars"></a>

`amp-analytics` コンポーネントでは、リクエストで使用できる各種の基本的な変数が定義されています。そのすべての変数のリストを [`amp-analytics` 変数ガイド](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md)で確認できます。また、[AMP HTML の置換ガイド](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)でサポートされている変数はすべて使用できます。

`vars` 設定オブジェクトを使用すると、新しい Key-Value ペアを定義したり、`request` の値で参照可能な既存の変数をオーバーライドしたりできます。新しい変数は一般に、サイト運営者固有の情報を指定するために使用します。配列を使用すると、カンマ区切り記号を維持しながら、個別に URL エンコードする必要がある値のリストを指定できます。

```javascript
"vars": {
  "account": "ABC123",
  "countryCode": "tr",
  "tags": ["Swift,Jonathan", "Gulliver's Travels"]
}
```

#### その他の URL パラメータ <a name="extra-url-params"></a>

`extraUrlParams` 設定オブジェクトでは、リクエストに含めるその他のパラメータを指定します。デフォルトでは、その他の URL パラメータは、通常の「&amp;foo=baz」の規則に沿ってリクエスト URL のクエリ文字列に追加されます。

次の例では、`&a=1&b=2&c=3` がリクエストに追加されます。

```javascript
"extraUrlParams": {
  "a": "1",
  "b": "2",
  "c": "3"
}
```

`useBody` が有効化されていて、リクエストが `beacon` または `xhrpost` 転送メソッドによって送信される場合、`extraUrlParams` が URL ではなくリクエストの本文で送信されることがあります。この場合、パラメータの URL エンコードやフラット化は行われません。詳しくは、[追加の URL パラメータの送信に本文を使用する](#use-body-for-extra-url-params)をご覧ください。

`extraUrlParamsReplaceMap` 属性では、`extraUrlParams` 設定のキーを前処理する `String.replace()` のパラメータとなるキーと値のマッピングを指定します。たとえば、`extraUrlParams` 設定で `"page.title": "The title of my page"` が定義されていて、`extraUrlParamsReplaceMap` で `"page.": "_p_"` が定義されている場合、`&amp;_p_title=The%20title%20of%20my%20page%20` がリクエストに追加されます。

`extraUrlParamsReplaceMap` は `extraUrlParams` を使用するうえで必須ではありません。`extraUrlParamsReplaceMap` が定義されていない場合、文字列の置換は行われず、`extraUrlParams` で定義されている文字列がそのまま使用されます。

`useBody` が有効化されていて、リクエストが `beacon` または `xhrpost` 転送メソッドによって送信される場合、`extraUrlParamsReplaceMap` の文字列の置換は `extraUrlParams` の最上位レベルのキーでのみ行われます。

#### トリガー <a name="triggers"></a>

`triggers` 設定オブジェクトでは、アナリティクス リクエストを送信するタイミングを指定します。`triggers` 属性は、トリガー名とトリガー設定という Key-Value ペアで構成されます。トリガー名には、英数字（a-zA-Z0-9）からなる任意の文字列を使用できます。優先順位の低い設定に記述されたトリガーは、優先順位の高い設定に記述された同名のトリガーによってオーバーライドされます。

* `on`（必須）: リッスンするイベント。有効な値は、`render-start`、`ini-load`、`click`、`scroll`、`timer`、`visible`、`hidden`、`user-error`、[`access-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md)、[`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md) です。
* `request`（必須）: 送信するリクエストの名前（`requests` セクションで指定したリクエスト）。
* `vars`: Key-Value ペアを含むオブジェクトで、最上位レベルの設定で指定された `vars` をオーバーライドするため、またはこのトリガーに固有の vars を指定するために使用します。
* `important`: バッチ処理の動作やレポート期間をサポートするリクエストを使用する際に指定できます。`important` を `true` に設定すると、バッチ処理されるリクエストのキューを特定のトリガーで実行できます。この場合、重要なトリガー イベントを失うことなくリクエストの ping の回数を減らすことができます。`important` を `true` に設定すると、重要なリクエストの ping をとにかく送信するようにリクエストの `reportWindow` の値をオーバーライドすることもできます。
* `selector` と `selectionMethod`: 一部のトリガー（`click` や `visible` など）に対して指定できます。詳しくは、[要素セレクタ](#element-selector)をご覧ください。
* `scrollSpec`（`on` が `scroll` に設定されている場合は必須）: この設定は `scroll` トリガーと組み合わせて使用します。詳しくは以下をご覧ください。
* `timerSpec`（`on` が `timer` に設定されている場合は必須）: この設定は `timer` トリガーと組み合わせて使用します。詳しくは以下をご覧ください。
* `sampleSpec`: このオブジェクトは、リクエストを送信する前にサンプリングする方法を定義するために使用します。この設定を使用すると、ランダムな入力またはプラットフォームでサポートされているその他の変数に基づいてサンプリングを実行できます。このオブジェクトに含まれる設定で、ハッシュの生成に使用する入力と、ハッシュが満たす必要があるしきい値を指定します。
    * `sampleOn`: この文字列テンプレートは、プラットフォーム変数を入力することによって拡張され、以下の threshold で説明するサンプリング ロジック用の数値を生成するためにハッシュ化されます。
    * `threshold`: この設定は、特定の条件を満たしていないリクエストを除外するために使用します。アナリティクス ベンダーに送信するリクエストでは、ロジック `HASH(sampleOn) < threshold` を true に設定する必要があります。</li>
* `videoSpec`（`on` が `video-*` に設定されている場合に使用します）: この設定は [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md) トリガーと組み合わせて使用します。

たとえば、次の設定を使用すると、ランダムな入力の場合はリクエストの 50% を、クライアント ID の場合はリクエストの 1% をサンプリングできます。

```javascript
'triggers': {
  'sampledOnRandom': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${random}',
      'threshold': 50,
    },
  },
  'sampledOnClientId': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${clientId(cookieName)}',
      'threshold': 1,
    },
  },
},
```

##### 要素セレクタ <a name="element-selector"></a>

`click` や `visible` などのトリガーを使用すると、セレクタ プロパティを使って単一の要素または要素のコレクションを指定できます。トリガーごとに異なる制限事項や解釈（一致するすべての要素と最初の要素のみのどちらにセレクタを適用するか、どの要素をマッチングできるか（すべてまたは AMP 要素のみ）など）を、選択した要素に適用することができます。詳しくは、関連する各トリガーのドキュメントをご覧ください。

セレクタ

- `selector`: このプロパティは、CSS / DOM クエリを使って単一の要素または要素のコレクションを検出するために使用します。要素のマッチング方法のセマンティクスは、`selectionMethod` を使用して変更できます。このプロパティの値には次のいずれかを指定できます。
    - 有効な CSS セレクタ（`#ad1`、`amp-ad` など）。
    - `:root`: ドキュメント ルートに一致する特別なセレクタ。
- `selectionMethod`: このプロパティを指定する場合、`scope` または `closest` のいずれかを設定できます。`scope` では、`amp-analytics` タグの親要素内の要素から選択できます。`closest` では、特定のセレクタに適合する `amp-analytics` タグの最も近い祖先が検索されます。デフォルト値は `scope` です。

##### レンダリング開始トリガーを埋め込む <a name="embed-render-start-trigger"></a>

iframe 内に他のドキュメントを埋め込む AMP 要素（広告など）では、レンダリング開始イベント（`"on": "render-start"`）をレポートできます。このイベントは通常、埋め込まれたドキュメントのレンダリングが開始されたことを確認できるようになるとすぐに発行されます。特定の AMP 要素がこのイベントを発行するかどうかを確認するには、その要素のドキュメントを参照してください。

埋め込み要素のトリガーには、埋め込み要素を指す [`selector`](#element-selector) を含める必要があります。
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request",
    "selector": "#embed1"
  }
}
```

レンダリング開始イベントはドキュメント自体からも発行され、次のように設定できます。
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request"
  }
}
```

##### 初期読み込みトリガー <a name="initial-load-trigger"></a>

AMP 要素または AMP ドキュメントの最初のコンテンツが読み込まれると、初期読み込みイベント（`"on": "ini-load"`）がトリガーされます。

「初期読み込み」は、コンテナとその初期サイズとの関係で定義されます。具体的には、次のように定義されます。

- ドキュメントの場合: 最初のビューポート内のすべての要素。
- 埋め込み要素の場合: 埋め込み要素の初期サイズの範囲内に配置される、埋め込みドキュメント内のすべてのコンテンツ要素。
- 単純な AMP 要素（`amp-img` など）の場合: リソース自体（画像や動画など）。

埋め込み要素または AMP 要素のトリガーには、要素を指す [`selector`](#element-selector) を含める必要があります。
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request",
    "selector": "#embed1"
  }
}
```

初期読み込みイベントはドキュメント自体からも発行され、次のように設定できます。
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request"
  }
}
```

##### ページと要素の表示トリガー <a name="page-and-element-visibility-trigger"></a>

ページが表示可能になったときにリクエストを開始するには、ページの表示トリガー（`"on": "visible"`）を使用します。このトリガーの起動は、`visibilitySpec` を使用して設定できます。

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
  }
}
```

要素の表示トリガーは、[`selector`](#element-selector) を使用して、AMP 要素またはドキュメント ルートに対して設定します。トリガーは、指定した要素が表示パラメータと一致したときに起動されます。表示パラメータは `visibilitySpec` を使用してカスタマイズできます。

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "elementview",
    "selector": "#ad1",
    "visibilitySpec": {/* optional visibility spec */}
  }
}
```

セレクタは、要素のコレクションではなく単一の要素を指定する場合にのみ使用できます。要素には、[AMP 拡張要素](https://github.com/ampproject/amphtml/blob/main/spec/amp-tag-addendum.md#amp-specific-tags)またはドキュメント ルートのいずれかを指定できます。

要素の表示トリガーは、`visibilitySpec` の `waitFor` プロパティで指定されたシグナルを受け取ってから要素の表示をトラッキングします。`waitFor` が指定されていない場合は、要素の [`ini-load`](#initial-load-trigger) シグナルを待機します。詳しくは、`waitFor` のドキュメントをご覧ください。`reportWhen` が指定されている場合、トリガーはそのシグナルを受け取ってからイベントを送信します。これは、ページが閉じているときにアナリティクス イベントを送信する場合などに役立ちます。

##### エラートリガー <a name="error-trigger"></a>

ユーザーエラー イベント（`"on": "user-error"`）は、ページの作成者またはページを公開する際に使用したソフトウェアに起因するエラーが発生したときにトリガーされます。こうしたエラーには、AMP コンポーネントや広告の設定ミス、アサーションの失敗などがあります。ユーザーエラーはデベロッパー コンソールでもレポートされます。

```javascript
"triggers": {
  "userError": {
    "on": "user-error",
     "request": "error"
  }
}
```

注: ページと関係のない A4A iframe の埋め込みに起因するエラーがいまだにレポートされるという[既知の問題](https://github.com/ampproject/amphtml/issues/10891)があります。

**<a id="visibility-spec"></a>表示の仕様**

`visibilitySpec` は、`visible` または `hidden` トリガーが起動するタイミングを変更するために適用可能な一連の条件とプロパティです。複数のプロパティが指定されている場合、リクエストを開始できるようにするには、すべて true に設定する必要があります。`visibilitySpec` では以下の設定プロパティがサポートされています。

- `waitFor`: このプロパティは、表示トリガーが特定のシグナルを受け取ってから表示をトラッキングする必要があることを示します。指定できる値は、`none`、`ini-load`、`render-start` です。`waitFor` が未定義の場合のデフォルト値は、セレクタが指定されている場合は [`ini-load`](#initial-load-trigger)、指定されていない場合は `none` に設定されます。
- `reportWhen`: このプロパティは、表示トリガーが特定のシグナルを受け取ってからトリガーを送信する必要があることを示します。指定できる値は `documentExit` だけです。`reportWhen` と `repeat` の両方を同じ visibilitySpec で使用することはできません。`reportWhen` が指定されていると、表示要件がその時点で満たされていない場合や、それまで満たされていなかった場合でも、シグナルを受け取ったときにレポートが送信されます。関連する変数（`totalVisibleTime` など）は、この `visibilitySpec` の表示要件に従って設定されます。
- `continuousTimeMin` と `continuousTimeMax`: これらのプロパティは、要素（の一部）がビューポート内に連続して表示されていた時間が指定の最短時間と最長時間の間の場合、リクエストが開始されることを示します。これらの時間はミリ秒単位で表します。`continuousTimeMin` が指定されていない場合、デフォルトで 0 に設定されます。
- `totalTimeMin` と `totalTimeMax`: これらのプロパティは、要素（の一部）がビューポート内に表示されていた合計時間が指定の最短時間と最長時間の間の場合、リクエストが開始されることを示します。これらの時間はミリ秒単位で表します。`totalTimeMin` が指定されていない場合、デフォルトで 0 に設定されます。
- `visiblePercentageMin` と `visiblePercentageMax`: これらのプロパティは、ビューポート内に表示可能な要素の割合が指定の最小値と最大値の間の場合、リクエストが開始されることを示します。0〜100 のパーセント値を指定できます。上限（`visiblePercentageMax`）は含まれます。上限と下限の両方が 0 または 100 に設定されている場合を除き、下限（`visiblePercentageMin`）は含まれません。両方とも 0 に設定されている場合は、要素が表示できなくなるとトリガーが起動します。両方とも 100 に設定されている場合は、要素が完全に表示されるとトリガーが起動します。これらのプロパティが他のタイミング関連のプロパティとともに定義されている場合、これらのプロパティが満たされている時間のみがカウントされます。`visiblePercentageMin` と `visiblePercentageMax` のデフォルト値はそれぞれ 0 と 100 です。
- `repeat`: このプロパティが `true` に設定されている場合、`visibilitySpec` の条件が満たされるたびにトリガーが起動します。次の例では、要素がビューの 51% の位置にスクロールされ、その後 49% の位置にスクロールされてから再び 51% の位置にスクロールされた場合、トリガーが 2 回起動します。ただし、`repeat` が `false` に設定されている場合は、トリガーは 1 回だけ起動します。`repeat` のデフォルト値は `false` です。`reportWhen` と `repeat` の両方を同じ visibilitySpec で使用することはできません。

```javascript
visibilitySpec: {
  visiblePercentageMin: 50,
  repeat: true,
  }
```

`visiblePercentageThresholds` は、複数の `visibilitySpec` インスタンスを作成する場合の簡略表現として使用できます（`visiblePercentageMin` と `visiblePercentageMax` の部分のみが異なります）。たとえば、以下は同じ内容です。

```javascript
// Two triggers with visibilitySpecs that only differ in visiblePercentageMin and visiblePercentageMax:
"triggers": {
  "pageView_30_to_40": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 30,
      "visiblePercentageMax": 40,
      "continuousTimeMin": 1000,
    }
  }

  "pageView_40_to_50": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 40,
      "visiblePercentageMax": 50,
      "continuousTimeMin": 1000,
    }
  }
}

// A single trigger equivalent to both of the above:
"triggers": {
  "pageView": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageThresholds": [[30, 40], [40, 50]],
      "continuousTimeMin": 1000,
    }
  }
}
```

`visibilitySpec` を使用すると、上記の条件だけでなく、[こちらのページ](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#visibility-variables)に記載されている特定の変数も有効化できます。

```javascript
        "triggers": {
          "defaultPageview": {
            "on": "visible",
            "request": "pageview",
            "selector": "#ad1",
            "visibilitySpec": {
              "waitFor": "ini-load",
              "reportWhen": "documentExit",
              "visiblePercentageMin": 20,
              "totalTimeMin": 500,
              "continuousTimeMin": 200
            }
          }
        }
```

トリガーの一部として提供された変数だけでなく、[データ属性としての変数](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute)のオーバーライドも指定できます。これらのデータ属性を使用する場合、[`selector`](#element-selector) として指定した要素の一部である必要があります。

##### クリック トリガー <a name="click-trigger"></a>

指定した要素がクリックされたときにリクエストを開始するには、クリック トリガー（`"on": "click"`）を使用します。リクエストを開始させる要素の制御には [`selector`](#element-selector) を使用します。指定したセレクタと一致するすべての要素のトリガーが起動します。

```javascript
"vars": {
  "id1": "#socialButtonId",
  "id2": ".shareButtonClass"
},
"triggers": {
  "anchorClicks": {
    "on": "click",
    "selector": "a, ${id1}, ${id2}",
    "request": "event",
    "vars": {
      "eventId": 128
    }
  }
}
```

トリガーの一部として提供された変数だけでなく、[データ属性としての変数](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute)のオーバーライドも指定できます。これらのデータ属性を使用する場合、`selector` として指定した要素の一部である必要があります。

##### スクロール トリガー <a name="scroll-trigger"></a>

ページがスクロールされたときに特定の条件下でリクエストを開始するには、スクロール トリガー（`"on": "scroll"`）を使用します。このトリガーは、リクエストの送信をトリガーした境界を示す[特別な変数](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#interaction)を提供します。このトリガーを起動するタイミングを制御するには、`scrollSpec` を使用します。

- `scrollSpec`: このオブジェクトには `verticalBoundaries` と `horizontalBoundaries` を含めることができます。スクロール イベントを発生させるには、この 2 つのプロパティのうち少なくとも 1 つが必要です。両プロパティの値は、スクロール イベントが発生する境界を囲む数値の配列にする必要があります。たとえば次のコード スニペットでは、ページが垂直方向に 25%、50%、90% スクロールされると、スクロール イベントが発生します。また、ページが水平方向にスクロール幅の 90% までスクロールされたときにもイベントが発生します。ページのパフォーマンスを維持するには、スクロール境界の値を最も近い `5` の倍数に丸めます。

```javascript
"triggers": {
  "scrollPings": {
    "on": "scroll",
    "scrollSpec": {
      "verticalBoundaries": [25, 50, 90],
      "horizontalBoundaries": [90]
    },
    "request": "event"
  }
}
```

##### タイマー トリガー <a name="timer-trigger"></a>

リクエストを一定間隔で開始するには、タイマー トリガー（`"on": "timer"`）を使用します。このトリガーを起動するタイミングを制御するには、`timerSpec` を使用します。

- `timerSpec`: `timer` タイプのトリガーの仕様。`startSpec` が指定されている場合を除き、タイマーは、イベント発生時（デフォルトで設定解除できます）と、それ以降の指定の間隔でトリガーされます。
    - `interval`: タイマーの間隔（秒）。
    - `maxTimerLength`: タイマーが起動する期間の最大長（秒）。`maxTimerLength` に達すると、追加のリクエストがトリガーされます。デフォルト値は 2 時間です。`stopSpec` が指定されているが、maxTimerLength が指定されていない場合、デフォルト値は無限大に設定されます。
    - `immediate`: タイマーを即座にトリガーするかどうかを示します（ブール値）。デフォルト値は true です。

```javascript
"triggers": {
  "pageTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 10,
      "maxTimerLength": 600
    },
    "request": "pagetime"
  }
}
```

ユーザー イベントのタイミングを調節するタイマーを設定するには、以下のプロパティを使用します。

- `startSpec`: タイマーの開始をトリガーするための仕様。特定のイベントをトラッキングするには、`on` と `selector` の値を使用します。設定で `startSpec` は指定されているが、`stopSpec` が指定されていない場合、タイマーは `maxTimerLength` に達した後にのみ停止します。
- `stopSpec`: タイマーの停止をトリガーするための仕様。設定で `stopSpec` は指定されているが、`startSpec` が指定されていない場合、タイマーは即座に開始され、指定のイベントが発生したときにのみ停止します。

```javascript
"triggers": {
  "videoPlayTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 5,
      "startSpec": {
        "on": "video-play",
        "selector": "amp-video"
      },
      "stopSpec": {
        "on": "video-pause",
        "selector": "amp-video"
      }
    },
    "request": "videoRequest"
  }
}
```

ネストされたタイマー トリガーの作成方法について詳しくは、[トリガー](#triggers)の仕様をご覧ください。タイマーを開始または停止するためにタイマー トリガーを使用することはできません。

##### 非表示トリガー <a name="hidden-trigger"></a>

ページが非表示になったときにリクエストを開始するには、非表示トリガー（`"on": "hidden"`）を使用します。

```javascript
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
  }
}
```

[`visibilitySpec`](#visibility-spec) を含めると、表示期間の条件を満たしている場合にのみリクエストを開始できます。
```json
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
    "visibilitySpec": {
      "selector": "#anim-id",
      "visiblePercentageMin": 20,
      "totalTimeMin": 3000,
    }
  }
}
```
上記の設定は次のように解釈できます。

<blockquote>
要素 #anim-id が合計で 3 秒以上にわたって（ビューポートの 20% を超える範囲に）表示された場合、ページが非表示になったときにリクエストを開始します。
</blockquote>

##### アクセス トリガー <a name="access-triggers"></a>

amp-access システムは、アクセスフローのさまざまな状態で各種イベントを発行します。アクセス トリガー（`"on": "access-*"`）について詳しくは、[amp-access とアナリティクス](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md)をご覧ください。

#### 動画分析トリガー <a name="video-analytics-triggers"></a>

動画分析には、サイト運営者が動画のライフサイクル中に発生するさまざまなイベントをトラッキングするための各種トリガー（`"on": "video-*"`）が用意されています。詳しくは、[AMP 動画分析](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md)をご覧ください。

#### 転送 <a name="transport"></a>

`transport` 設定オブジェクトでは、リクエストの送信方法を指定します。値は、使用可能な転送方法を示すフィールドを含むオブジェクトです。

* `beacon`: リクエストの送信に [`navigator.sendBeacon`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) を使用できることを示します。認証情報を含む POST リクエストを送信します。`useBody` が true の場合以外は、本文が空のリクエストが送信されます。`useBody` について詳しくは、[追加の URL パラメータの送信に本文を使用する](#use-body-for-extra-url-params)をご覧ください。
* `xhrpost`: リクエストの送信に `XMLHttpRequest` を使用できることを示します。認証情報を含む POST リクエストを送信します。`useBody` が true の場合以外は、本文が空のリクエストが送信されます。`useBody` について詳しくは、[追加の URL パラメータの送信に本文を使用する](#use-body-for-extra-url-params)をご覧ください。
* `image`: `Image` タグを生成してリクエストを送信できることを示します。GET リクエストを送信します。空のレスポンスやリクエストの失敗が原因のコンソールの警告を抑制するには、`"image": {"suppressWarnings": true}` を設定します。

MRC 認定ベンダーは URL 文字列を iframe-transport-vendors.js に追加することで、第四の転送メカニズムである「iframe 転送」を利用できます。これは、URL に設定された `src` 属性を使用して iframe を作成する必要があること、リクエストは `window.postMessage()` によって iframe に送信されることを示します。この場合、リクエストは正式な URL である必要はありません。`iframe` は `iframe-transport-vendors.js` でのみ指定できます。`amp-analytics` タグ内のインラインで指定したり、リモート設定で指定したりすることはできません。さらに、ベンダー フレームでレスポンスを送信して、amp-ad-exit で使用することができます。詳しくは、[analytics-iframe-transport-remote-frame.html](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) と [fake_amp_ad_with_iframe_transport.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html) をご覧ください。前者のファイルでは {'collected-data': 'abc'} のレスポンス JSON オブジェクトを送信し、後者のファイルではそのオブジェクトを使用して、finalUrl 内の「bar_」を「abc」に置換します。

上記の転送方法のうち 2 つ以上が有効になっている場合、優先順位は `iframe`、`beacon`、`xhrpost`、`image` の順になります。使用できる転送方法は 1 つのみで、使用可能な方法のうち最も優先順位の高いものが使用されます。クライアントのユーザー エージェントが最も優先順位の高い方法をサポートしていない場合は、有効な方法のうち、次に優先順位の高い方法が使用されます。デフォルトでは、上記の 4 つのすべての方法が有効になっています。

次の例では、`iframe` の URL が指定されておらず、`beacon` と `xhrpost` が `false` に設定されています。そのため、これらは `image` より優先順位が高いにもかかわらず、どちらも使用されません。`image` はデフォルトで `true` に設定されますが、ここでは明示的に宣言されています。クライアントのユーザー エージェントが `image` をサポートしている場合は、この方法が使用されます。サポートしていない場合、リクエストは送信されません。

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true
}
```

詳しくは、[iframe 転送用のクライアント API の実装例](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html)と[その iframe を組み込むページの例](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport.amp.html)をご覧ください。この例では、`amp-analytics` タグが含まれている[偽の広告](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html)を読み込みます。偽の広告コンテンツには追加の設定手順が含まれており、その手順に従う必要があります。

##### 追加の URL パラメータの送信に本文を使用する <a name="use-body-for-extra-url-params"></a>

`useBody` 設定オプションでは、追加の URL パラメータを URL エンコードされたクエリ パラメータとして URL に含める代わりに、POST リクエストの本文に `extraUrlParams` を含めるかどうかを指定します。

`useBody` を使用できる転送方法は、`beacon` と `xhrpost` だけです。`useBody` が true に設定されていて、これらの転送方法のいずれかと組み合わせて使用する場合、`extraUrlParams` は POST リクエストの本文で送信されます。それ以外の場合は、本文が空のリクエストが送信され、`extraUrlParams` が URL パラメータとして追加されます。

`useBody` を使用すると、ネストされたオブジェクトを `extraUrlParams` に含めることができます。ただし、リクエストの転送方法が `useBody` をサポートしていない他の方法（`image` など）に切り替えられると、そのネストされたオブジェクトは文字列変換され、`[object Object]` として URL に追加されます。

```javascript
"transport": {
  "beacon": true,
  "xhrpost": true,
  "useBody": true,
  "image": false
}
```

##### 参照 URL のポリシー <a name="referrer-policy"></a>

参照 URL のポリシーは、`transport` 設定の `referrerPolicy` フィールドとして指定できます。現時点では、`no-referrer` のみがサポートされています。参照 URL のポリシーを利用できる転送方法は `image` だけです。`referrerPolicy: no-referrer` が指定されている場合は、`beacon` と `xhrpost` の転送方法が `false` に変更されます。

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true,
  "referrerPolicy": "no-referrer"
}
```

#### リンカー <a name="linkers"></a>

`linkers` 機能は、クロスドメイン ID の同期を有効にする場合に使用します。`amp-analytics` では、[設定オブジェクト](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md#format)を使用して「リンカー文字列」を作成します。この文字列は、URL パラメータとしてページ上の指定の発信リンクに付加されます。ユーザーがこれらのリンクのいずれかをクリックすると、リンク先ページで URL パラメータからリンカー文字列が読み取られ、ID の同期が実行されます。この方法は通常、AMP プロキシ ドメインとサイト運営者のドメイン間でユーザー セッションを結合する場合に使用します。

リンカーの設定方法について詳しくは、[リンカー ID の転送](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md)をご覧ください、

このパラメータを取り込む必要がある場合は、[リンカー ID の受信](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md)で、このパラメータの作成方法に関する情報をご確認ください。

#### Cookie <a name="cookies"></a>

`cookies` 機能を使用すると、ドキュメントの URL から [`QUERY_PARAM`](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md#query-parameter) と [`LINKER_PARAM`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#linker-param) の情報を抽出して、元のドメインに Cookie を書き込むことができます。`linkers` 機能とともに使用すると、AMP プロキシ ドメインからサイト運営者のドメイン上の AMP ページへの ID の同期を実行できます。

`cookies` の設定方法について詳しくは、[AMP ページでのリンカー パラメータの受信](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#receiving-linker-params-on-amp-pages)をご覧ください。

## 検証 <a name="validation"></a>

AMP 検証ツールの仕様で [amp-analytics のルール](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/validator-amp-analytics.protoascii)をご確認ください。

### `<amp-analytics>` の有効な属性 <a name="valid-attributes-for-"></a>

`amp-analytics` コンポーネントで使用できる属性を以下に示します。

**type**

ベンダーのタイプを指定します。詳しくは、[アナリティクス ベンダー](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md)のリストをご覧ください。

例:

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json"></amp-analytics>
```

**config**

このオプションの属性を使用すると、指定したリモート URL から設定を読み込むことができます。URL の指定では HTTPS スキームを使用する必要があります。以下の `data-include-credentials` 属性もご確認ください。URL には [AMP URL 変数](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)を含めることができます。レスポンスは [AMP CORS セキュリティ ガイドライン](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)に準拠する必要があります。

例:

```html
<amp-analytics config="https://example.com/analytics.config.json"></amp-analytics>
```

**data-credentials**<a name="data-credentials"></a>

`include` に設定すると、`config` 属性で指定したリクエストで Cookie の読み取りと書き込みを行えるようになります。この属性はオプションです。

**data-consent-notification-id**

この属性を指定すると、特定の HTML 要素 ID が設定された [amp-user-notification](amp-user-notification.md) をユーザーが確認（承認）するまで、ページでアナリティクス リクエストを処理できなくなります。この属性はオプションです。

## AMP コンポーネントのアナリティクス <a name="analytics-for-amp-components"></a>

AMP コンポーネントのデベロッパーは、AMP アナリティクスを使用してデータのコレクションを実装できます。詳しくは、[AMP コンポーネントのアナリティクスの実装](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-components-analytics.md)をご覧ください。
