---
$title: AMP アナリティクスについて深く学ぶ
toc: true
---
[TOC]


このガイドでは
[amp-analytics コンポーネント](/docs/reference/extended/amp-analytics.html)について詳しく学ぶため、
以下のように `amp-analytics` 設定のサンプルを主要な構成要素に分割します。

このガイドページでは以下のサンプルを使用して説明を進めます。
このサンプルはページビューとユーザーによるリンクのクリックをトラッキングして、
アナリティクス データをサードパーティのプロバイダーである
[Google アナリティクス](https://developers.google.com/analytics/devguides/collection/amp-analytics/) に送信します。

[sourcecode:html]
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
[/sourcecode]

**注:** 上のコード例は学習用のサンプルなので、実用的ではありません。このサンプルではプロバイダ設定を簡略化しているので、アナリティクス プロバイダーと連動している場合は、あまり意味がないかもしれません。サンプル設定についてはアナリティクス プロバイダーのドキュメントを参照するようにしてください。

## アナリティクス データの送信先: type 属性

AMP でサポートしている一般的なデータ収集方法は、以下の 2 つです。

* 社内アナリティクス システム用にサイトオーナーが所有しているエンドポイントでの収集
* ベンダー ソリューションと相互運用するためにベンダーが所有しているエンドポイントでの収集
（ベンダーソリューションは、[Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html)、[Chartbeat](http://support.chartbeat.com/docs/)、[Google アナリティクス] (https://developers.google.com/analytics/devguides/collection/amp-analytics/)などです）

アナリティクス データをアナリティクス プロバイダーに送信するには、
`amp-analytics` タグの中に `type` 属性を含めます。
値は、
[amp-analytics 仕様](/docs/reference/extended/amp-analytics.html)に定義されているように、適切なベンダーに設定します。

たとえば `<amp-analytics type="googleanalytics">` とすると、アナリティクス データは
サードパーティのアナリティクス プロバイダー である Google アナリティクスに送信されます。
サイトオーナーが所有するエンドポイントにデータを送信する場合は、
`type` 属性を含めないようにするだけです。
そうすると、アナリティクス データは
[リクエスト](/ja/docs/guides/analytics/deep_dive_analytics.html#送信データの内容:-requests-属性)ごとに指定のエンドポイントに送信されます。

アナリティクス ベンダーの設定を行うと、
簡単に `amp-analytics` を使い始めることができます。
詳細についてはベンダーのドキュメントや
ヘルプ リソースをご覧ください。
上述のとおり、
AMP を統合済みのベンダーと
その仕様書へのリンクの一覧は、
[amp-analytics 仕様](/docs/reference/extended/amp-analytics.html)に定義されているように、適切なベンダーに設定します。

アナリティクス ベンダーの方は
、
[自身のアナリティクス設定を AMP HTML に統合する](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md)で詳細をご確認ください。

## リモート設定を読み込む: config 属性

AMP ページに `amp-analytics` 用の設定をすべて含める必要はありません。

その代わりに、一部またはすべての設定用のリモート URL を
呼び出すことができます。

これにより、特定のリクエストを元に設定を変えるような処理も
可能になります。
サイトオーナーとしてリモート ファイルを管理している場合は、
設定データを構築するために必要な処理をサーバー側で
すべて行うことができます。

リモート設定を読み込むには、
まず `amp-analytics` タグに config 属性を含めます。

[sourcecode:html]
<amp-analytics config="https://example.com/analytics.account.config.json">
[/sourcecode]

次にリモート URL で動作する JSON コンテンツを作成します。
このシンプルな例では、
JSON オブジェクトに含まれる設定は、アナリティクス アカウント用の変数値だけです。

以下は `https://example.com/analytics.account.config.json` のコンテンツの例です。

[sourcecode:html]
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
[/sourcecode]

最後にリモートファイルの内容が
`amp-analytics` 設定の適切な位置に入っていることを確認します。
ここでは、`pageview` と `event` のどちらのリクエストでも、
`account` 変数の値が
リモート URL 内のアカウント値に自動で設定されます（`"account": "UA-XXXXX-Y"`）。

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

**重要:** AMP では同じ変数の重複使用については検証しません。
値は以下の変数置換の優先順位に従って追加されます。
その中で最も優先度が高いのがリモート URL 内の値です
（[変数置換の順序](/ja/docs/guides/analytics/deep_dive_analytics.html#変数置換の順序)をご覧ください）。

## リクエスト、トリガー、転送

`requests` 属性は送信データの内容
（`pageviews`、`events` など）と
データの送信先（データ転送に使用する URL）を定義します。

`triggers` 属性はアナリティクス データの送信タイミング
（ユーザーがページを表示したとき、リンクをクリックしたときなど）を定義します。

`transport` 属性はリクエストの送信方法
（具体的にはプロトコル）を定義します。

これらの設定の詳細については、このページの続きをご覧ください
（こちらの
[amp-analytics リファレンス](/docs/reference/extended/amp-analytics.html)もあわせてご確認ください）。

### 送信データの内容: requests 属性

`request-name` はトリガー設定に使用され、
特定のイベントが発生したときに、どのリクエストを送信するかを指定します。
`request-value` は `https` URL です。
これらの値には、他のリクエストや変数を参照するためのプレースホルダーのトークンが
含まれる場合があります。

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

一部のアナリティクス プロバイダー（Google アナリティクスを含む）は、
すでに
 `type` 属性で使用する設定を公開しています。
アナリティクス プロバイダーを使用する場合は、
`requests` 情報を含める必要がない場合もあります。
ベンダーのドキュメントを参照して、
`requests` の設定が必要かどうか、必要であればその設定方法をご確認ください。

#### 追加リクエストの URL: 追加の URL パラメータ

[extraUrlParams](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#extra-url-params)
属性は、通常「&foo=baz」経由のリクエスト URL のクエリ文字列につける追加パラメータを指定します。

`amp-analytics` の例ではリクエストに追加パラメータ  <code>cd1</code> をつけて、
パラメータの値を「AMP」に設定しています。

[sourcecode:html]
  "extraUrlParams": {
    "cd1": "AMP"
  }
[/sourcecode]

### リクエストの送信タイミング: triggers 属性

`triggers` 属性はトリガー名とトリガー設定のキー値ペアから成り、
アナリティクス リクエストの送信タイミングを指定します。
トリガー名には任意の文字列を指定でき、大文字および小文字の英字、数字が
使用できます。

たとえば、
以下の `amp-analytics` 要素は
`https://example.com/analytics` に、ドキュメントの初回読み込み時と
`a` タグのクリック時に毎回リクエストを送信するよう設定されています。

[sourcecode:html]
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
[/sourcecode]

AMP では以下のトリガー設定をサポートしています。

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
      <td data-th="Description">リッスンするイベントです。値は <code>click</code>、<code>scroll</code>、<code>timer</code>、<code>visible</code>を取ります。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code>（必須）</td>
      <td data-th="Description">（<a href="/ja/docs/guides/analytics/deep_dive_analytics.html#送信データの内容:-requests-属性">リクエスト</a>の指定どおりに）送信するリクエスト名です。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">最上位の設定で定義された <code>vars</code> をオーバーライドしたり、このトリガー固有の <code>vars</code> を指定したりするためのキー値ペアを含むオブジェクトです（<a href="/ja/docs/guides/analytics/deep_dive_analytics.html#変数置換の順序">変数置換の順序</a>についてもご覧ください）。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code>（<code>on</code> が <code>click</code> に設定されているときは必須）</td>
      <td data-th="Description">トラッキングする要素を絞り込む CSS セレクターです。すべての要素をトラッキングするには <code>*</code> という値を使います。この設定は <code>click</code> トリガーとあわせて使用します。<a href="/ja/docs/guides/analytics/use_cases.html#ページクリックをトラッキングする">ページクリック</a>と<a href="/ja/docs/guides/analytics/use_cases.html#ソーシャル-インタラクションをトラッキングする">ソーシャル インタラクション</a>をトラッキングするためのセレクターの使用方法について、ご確認ください。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code>（<code>on</code> が <code>scroll</code> に設定されているときは必須）</td>
      <td data-th="Description">どのような状況でページがスクロールされた場合に <code>scroll</code> イベントを発生させるかを制御します。このオブジェクトには <code>verticalBoundaries</code> と <code>horizontalBoundaries</code> が含まれます。<code>scroll</code> イベントを発生させるには、この 2 つの属性のうち少なくとも 1 つが必要です。属性の値はどちらも、スクロール イベントが発生する境界値を含む数値の配列にする必要があります。<a href="/ja/docs/guides/analytics/use_cases.html#スクロールをトラッキングする">スクロールをトラッキングする</a>の例をご覧ください。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code>（<code>on</code> が <code>timer</code> に設定されているときは必須）</td>
      <td data-th="Description">どのタイミングで <code>timer</code> イベントを発生させるかを制御します。タイマーはイベント発生時と、それ以降は指定した間隔でトリガーされます。この設定は <code>timer</code> トリガーと一緒に使用します。</td>
    </tr>
  </tbody>
</table>

**重要:** 同じ名称のトリガーがある場合、
優先度の低い設定トリガーは優先度の高い設定トリガーに上書きされます
（[変数置換の順序](/ja/docs/guides/analytics/deep_dive_analytics.html#変数置換の順序)をご覧ください）。

### データの送信方法: transport 属性

`transport` 属性はリクエストの送信方法を指定します。
デフォルトで有効な方法は以下の 3 つです。

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
      <td data-th="Description">リクエストの送信に <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> が使えるよう指定します。<code>POST</code> リクエストは、認証情報と空のボディと一緒に送信されます。</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">リクエストの送信に <code>XMLHttpRequest</code> が使えるよう指定します。<code>POST</code> リクエストは、認証情報と空のボディと一緒に送信されます。</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description"><code>Image</code> タグを生成することで、リクエストが送信できるよう指定します。これにより <code>GET</code> リクエストが送信されます。</td>
    </tr>
  </tbody>
</table>

有効かつ使用が許可された利用可能な転送メソッドのうち、最も優先度の高いものが 1 つだけ使用されます。


優先順位は `beacon` > `xhrpost` > `image` の順です。
クライアントのユーザー エージェントがそのメソッドをサポートしていない場合は、その次に優先度の高いメソッドで有効になっているもの使われます。


`transport` 属性を設定に含めるとリクエストが送信されない場合があるので、転送オプションを制限したい場合のみ使うようにしてください。



以下の例では `beacon` と `xhrpost` が false に設定されているので、これらは `image` よりも優先度が高いにもかかわらず使用されません。


クライアントのユーザー エージェントが `image` メソッドに対応していれば、このメソッドが使用されますが、非対応の場合はリクエストが送信されません。


[sourcecode:html]
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
[/sourcecode]

## 変数置換の順序

AMP では以下の優先順位に従って変数に値を設定します。

1. （`config` による）リモート設定
2. `triggers` 内のトリガーにネストされた `vars`
3. `amp-analytics` 内の最上位にネストされた `vars`
4. プラットフォームが提供する値

この例には、リモート設定、最上位に定義された変数、トリガー内に定義された変数、プラットフォーム レベルで定義された変数が含まれています。


[sourcecode:html]
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
[/sourcecode]

`var` は複数の場所で定義されていますが、変数の優先順位に従い、この値は一度だけ設定されます。

つまり上記の例で、`account` がリモート設定で UA-XXXXX-Y と定義されている場合、各変数の値は以下のようになります。


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
