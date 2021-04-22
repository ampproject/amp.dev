---
$title: amp-access
$category@: dynamic-content
teaser:
  text: AMP ペイウォールとサブスクリプションのサポートを提供します。
---



サイト運営者は amp-access（「AMP ペイウォールとサブスクリプションのサポート」）を利用することで、リーダーのサブスクリプション ステータス、視聴回数などの要素に基づき、リーダーがアクセスできるコンテンツや制限事項を管理できます。

# amp-access <a name="amp-access"></a>



<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

<table>
  <tr>
    <td><strong>提供状況</strong></td>
    <td>安定版</td>
  </tr><tr>
  <td class="col-fourty"><strong>必要なスクリプト</strong></td>
  <td>
    <div>
      <code>&lt;script async custom-element="amp-access" src="https://cdn.ampproject.org/v0/amp-access-0.1.js">&lt;/script></code>
    </div>
  </td>
</tr>
<tr>
  <td class="col-fourty"><strong>例</strong></td>
  <td><a href="https://ampbyexample.com/components/amp-access/">amp-access のアノテーション付きコードの例</a></td>
</tr>
</table>

## `amp-subscriptions` との関係 <a name="relationship-to-amp-subscriptions"></a>

[`amp-subscriptions`](amp-subscriptions.md) 拡張機能は `amp-access` と同様の機能を備えています。ただしこの拡張機能は、特殊用途向けのアクセス ペイウォール プロトコルをサポートしています。この 2 つのコンポーネントの主な違いを以下に示します。

1. `amp-subscriptions` の利用資格の応答は amp-access の承認に似ていますが、厳密に定義および標準化されています。
1. `amp-subscriptions` 拡張機能を使用すると、ページに複数のサービスを設定して、アクセスやペイウォールに関する意思決定に参加することができます。これらのサービスは同時に実行され、どのサービスが肯定的な応答を返すかに応じて優先順位付けされます。
1. AMP ビューアは、サイト運営者との個別の合意に基づく署名付き承認応答をアクセスの証拠として `amp-subscriptions` に提供できます。
1. `amp-subscriptions` ではコンテンツ マークアップが標準化されているため、アプリやクローラがプレミアム コンテンツ セクションを簡単に検出できます。

マークアップの標準化、複数プロバイダのサポート、ビューアのサポートの強化といった理由から、新規のサイト運営者やペイウォール プロバイダの実装では `amp-subscriptions` を使用することをおすすめします。

## ソリューション <a name="solution"></a>

ここで提案するソリューションにより、サイト運営者は以下の意思決定やフローを管理できます。
- ユーザーの作成と管理
- メータリングの管理（一定数の無料視聴の許可）
- ログインフロー
- ユーザー認証
- アクセスのルールと承認
- ドキュメントごとのアクセス パラメータの柔軟性

ソリューションは以下のコンポーネントで構成されます。

1. [**AMP リーダー ID**](#amp-reader-id): AMP エコシステムから提供される ID。AMP で表示されるリーダーの一意の識別子です。
1. [**アクセス コンテンツ マークアップ**](#access-content-markup): サイト運営者が作成するマークアップ。ドキュメントのどの部分をどのような状況で表示するかを定義します。
1. [**承認エンドポイント**](#authorization-endpoint): サイト運営者が指定するエンドポイント。リーダーがドキュメントのどの部分を使用できるかを説明する応答を返します。
1. [**Pingback エンドポイント**](#pingback-endpoint): サイト運営者が指定するエンドポイント。ドキュメントの「ビュー」インプレッションを送信するために使用されます。
1. [**ログインリンクとログインページ**](#login-page-and-login-link): サイト運営者はこのコンポーネントを使用して、リーダーを認証し、その ID を AMP リーダー ID に関連付けることができます。

Google AMP キャッシュによってドキュメントがリーダーに返されます。一部のセクションはアクセス コンテンツ マークアップによって非表示にされます。AMP ランタイムは承認エンドポイントを呼び出し、その応答を使用して、アクセス コンテンツ マークアップで定義されているとおりに各セクションの表示と非表示を切り替えます。ドキュメントがリーダーに表示された後、AMP ランタイムは Pingback エンドポイントを呼び出します。サイト運営者は Pingback エンドポイントを使用して、カウントダウン メーター（利用した無料視聴の回数）を更新することができます。

このソリューションでは、ログインページやサブスクリプション ページを起動するログインリンクを AMP ドキュメント内に配置することもできます。サイト運営者はこのページでリーダーを認証し、システム内でのリーダーの ID を AMP リーダー ID に関連付けることができます。

このソリューションは基本的に、（非表示であっても）ドキュメント全体をリーダーに送信し、制限付きセクションの表示と非表示を承認応答に基づいて切り替えます。ただし、このソリューションには「server」オプションも用意されています。このオプションでは、制限付きセクションが最初のドキュメントの配信から除外され、承認の確認後に初めてダウンロードすることができます。

amp-access を利用するには、サイト運営者が上述のコンポーネントを実装する必要があります。アクセス コンテンツ マークアップと承認エンドポイントは必須です。Pingback エンドポイントとログインページはオプションです。

### AMP リーダー ID <a name="amp-reader-id"></a>

アクセス サービスとユースケースのサポートのために、amp-access にはリーダー ID** のコンセプトが導入されています。

リーダー ID は、AMP エコシステムで作成される匿名かつ一意の ID です。この ID はリーダーとサイト運営者の各ペアに対して一意であるため、リーダーは 2 つの異なるサイト運営者に対して別々に識別されます。これは非可逆的な ID です。AMP とサイト運営者間のあらゆるやり取りに使用され、非常に高いエントロピーを持ちます。サイト運営者はリーダー ID を使用してリーダーを特定し、独自の ID システムにマッピングすることができます。

リーダー ID はユーザーのデバイス上で作成され、長期にわたって使用されます。ただし、通常のブラウザ ストレージ ルール（シークレット ウィンドウに関するルールを含む）に従います。リーダー ID の所定のライフサイクルは、前回の使用から 1 年、またはユーザーが Cookie をクリアするまでのいずれかです。リーダー ID は今のところ、デバイス間では共有されません。

リーダー ID は、ExternalCID（[こちら](https://docs.google.com/document/d/1f7z3X2GM_ASb3ZCI_7tngglxwS6WoWi1EB3aKzdf6vo/edit#heading=h.hb9q0wpwwhuf)を参照）の作成に使用されるメカニズムに似た方法で作成されます（リーダー ID の例: `amp-OFsqR4pPKynymPyMmplPNMvxSTsNQob3TnK-oE3nwVT0clORaZ1rkeEz8xej-vV6`）。

### amp-access と Cookie <a name="amp-access-and-cookies"></a>

サイト運営者は、独自の認証 Cookie を使用することも、リーダー ID を使用することもできます。また、これらの両方を組み合わせて使用することも可能です。

### アクセス コンテンツ マークアップ <a name="access-content-markup"></a>

アクセス コンテンツ マークアップは、承認エンドポイントから返される承認応答に基づいて、どのセクションを表示または非表示にするかを決定します。アクセス コンテンツ マークアップは特別なマークアップ属性で記述されます。

### 承認エンドポイント <a name="authorization-endpoint"></a>

承認エンドポイントはサイト運営者によって指定され、AMP ランタイムまたは Google AMP キャッシュから呼び出されます。これは、認証済み CORS GET エンドポイントです。承認エンドポイントから返されるアクセス パラメータをコンテンツ マークアップで使用することで、ドキュメントのさまざまな部分の表示と非表示を切り替えることができます。

### Pingback エンドポイント <a name="pingback-endpoint"></a>

Pingback エンドポイントはサイト運営者によって指定され、AMP ランタイムまたは Google AMP キャッシュから呼び出されます。これは、認証済み CORS POST エンドポイントです。リーダーがドキュメントの表示を開始すると、AMP ランタイムが自動的にこのエンドポイントを呼び出します。Pingback エンドポイントは、リーダーがログインフローを正常に完了した後にも呼び出されます。Pingback の主な目的の 1 つは、サイト運営者がメータリング情報を更新できるようにすることです。

Pingback はオプションです。無効にするには、`noPingback` 設定プロパティを `true` に設定します。

### ログインページとログインリンク <a name="login-page-and-login-link"></a>

ログインページはサイト運営者によって実装、提供され、AMP ランタイムから呼び出されます。通常はブラウザ ダイアログとして表示されます。

ログインページは、リーダーがログインリンクをタップするとトリガーされます。サイト運営者はドキュメント内の任意の場所にログインリンクを配置できます。

## 仕様 v0.1 <a name="specification-v01"></a>

### 設定 <a name="configuration"></a>

すべてのエンドポイントは、AMP ドキュメントの先頭で、JSON オブジェクトとして設定されます。

```html

<script id="amp-access" type="application/json">
  {
    "property": value,
    ...
    }
</script>

```

以下のプロパティがこの設定内で定義されます。

<table>
  <tr>
    <th>プロパティ</th>
    <th>値</th>
    <th>説明</th>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorization</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>承認エンドポイントの HTTPS URL。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>pingback</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>Pingback エンドポイントの HTTPS URL。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>noPingback</code></td>
    <td>true / false</td>
    <td>true の場合、Pingback が無効になります。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>login</code></td>
    <td class="col-twenty"><code>&lt;URL&gt;</code> または<br><Map[文字列, URL]></td>
    <td>ログインページの HTTPS URL、またはさまざまなタイプのログインページの一連の URL。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationFallbackResponse</code></td>
    <td><オブジェクト></td>
    <td>承認応答が失敗した場合にその代わりに使用される JSON オブジェクト。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationTimeout</code></td>
    <td><数値></td>
    <td>承認リクエストが失敗とみなされるまでのタイムアウト時間（ミリ秒）。デフォルト値は 3000 です。3000 を超える値は開発環境でのみ使用できます。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>type</code></td>
    <td>「client」または「server」</td>
    <td>デフォルト値は「client」です。「server」オプションは設計中です。準備が整い次第、このタイプのドキュメントが更新される予定です。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>namespace</code></td>
    <td>文字列</td>
    <td>デフォルト値は空です。複数のアクセス プロバイダが指定されている場合、名前空間は必須です。</td>
  </tr>
</table>

<URL>** の値には、代入変数を含む HTTPS URL を指定します。代入変数について詳しくは、以下の[アクセス URL 変数](#access-url-variables)をご覧ください。

    以下に、amp-access の設定の例を示します。

```html

<script id="amp-access" type="application/json">
{
  "authorization":
      "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
  "pingback":
      "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
  "login":
      "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
  "authorizationFallbackResponse": {"error": true}
}
</script>

```

#### 複数のアクセス プロバイダ <a name="multiple-access-providers"></a>

複数のアクセス プロバイダを指定するには、単一のオブジェクトの代わりに配列を使用し、エントリごとに `namespace` を指定します。

```html

<script id="amp-access" type="application/json">
[
  {
    "property": value,
    ...
    "namespace": value
  },
  ...
]
</script>
```

### アクセス URL 変数 <a name="access-url-variables"></a>

各種エンドポイントの URL を設定する場合、サイト運営者は代入変数を使用できます。代入変数の完全なリストは [AMP 変数の仕様](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)で定義されています。さらにこの仕様では、アクセス固有の変数（`READER_ID`、`AUTHDATA` など）がいくつか追加されています。主な変数について以下の表で説明します。

<table>
  <tr>
    <th>変数</th>
    <th>説明</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>READER_ID</code></td>
    <td>AMP リーダー ID。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AUTHDATA(field)</code></td>
    <td>承認応答のフィールドの値。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RETURN_URL</code></td>
    <td>AMP ランタイムによって指定される、ログイン ダイアログの戻り先 URL のプレースホルダ。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>SOURCE_URL</code></td>
    <td>AMP ドキュメントのソース URL。ドキュメントが CDN から提供される場合、AMPDOC_URL には CDN URL が指定されます。一方、SOURCE_URL には元のソース URL が指定されます。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AMPDOC_URL</code></td>
    <td>AMP ドキュメントの URL。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>CANONICAL_URL</code></td>
    <td>AMP ドキュメントの正規 URL。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>DOCUMENT_REFERRER</code></td>
    <td>参照 URL。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>VIEWER</code></td>
    <td>AMP ビューアの URL。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RANDOM</code></td>
    <td>乱数。ブラウザ キャッシュの防止に役立ちます。</td>
  </tr>
</table>

以下に、リーダー ID、正規 URL、リファラー情報、ランダムな CacheBuster で拡張された URL の例を示します。
```text
https://pub.com/access?
  rid=READER_ID
  &url=CANONICAL_URL
  &ref=DOCUMENT_REFERRER
  &_=RANDOM
```

AUTHDATA 変数は Pingback URL とログイン URL で使用できます。この変数を使用すると、承認応答の任意のフィールドを URL パラメータとして渡すことができます（例: `AUTHDATA(isSubscriber)`）。`AUTHDATA(other.isSubscriber)` のように、ネストされた式も使用できます。名前空間を使用する場合、フィールドの前に名前空間を追加できます（例: `AUTHDATA(anamespace.afield)`）。

### アクセス コンテンツ マークアップ <a name="access-content-markup-1"></a>

アクセス コンテンツ マークアップでは、表示または非表示にするセクションを記述します。アクセス コンテンツ マークアップは、任意の HTML 要素上に配置可能な 2 つの AMP 属性（`amp-access` と `amp-access-hide`）で構成されます。

`amp-access` 属性は、承認エンドポイントから返される承認応答に基づいて true または false を設定する式を提供します。設定された値は、要素とそのコンテンツが表示可能かどうかを示します。

`amp-access` の値は、SQL に似た言語で定義されたブール式です。文法の定義については、[付録 A](#appendix-a-amp-access-expression-grammar) をご覧ください。ブール式は次のように定義されます。
```html

<div amp-access="expression">…</div>
```
プロパティと値は、承認エンドポイントから返される承認応答のプロパティと値です。これにより、柔軟なシステムが実現され、さまざまなアクセス シナリオに対応できます。名前空間を使用する場合は、プロパティ名の前に名前空間を追加します（例: 「anamespace.aproperty」）。

「amp-access-hide」属性を使用すると、承認応答を受け取る前にオプティミスティックに要素を非表示にすることができます（この要素は表示可能です）。この属性は、「デフォルトで非表示」というセマンティクスを規定します。後で承認エンドポイントから返される承認応答によってこのデフォルト値が無効にされ、セクションが表示されることがあります。「amp-access-hide」属性を省略すると、セクションがデフォルトで表示または追加されます。「amp-access-hide」属性は「amp-access」属性と組み合わせて使用する必要があります。
```html
<div amp-access="expression" amp-access-hide>…</div>
```

承認リクエストが失敗すると「amp-access」の式が評価されないため、セクションが表示されるかどうかは、ドキュメントで「amp-access-hide」属性が最初に指定されているかどうかによって決まります。

「amp-access-* 」属性のセットを必要に応じて拡張することで、難読化やレンダリングに関するさまざまなニーズに対応できます。

承認リクエストが失敗し、「authorizationFallbackResponse」応答がドキュメントで指定されていない場合、「amp-access」の式が評価されないため、セクションが表示されるかどうかは、ドキュメントで「amp-access-hide」属性が最初に指定されているかどうかによって決まります。

以下に、サブスクリプション ステータスに基づいてログインリンクまたは完全なコンテンツを表示する例を示します。
```html
<header>
  Title of the document
</header>
<div>
  First snippet in the document.
</div>

<div amp-access="NOT subscriber" amp-access-hide>
  <a on="tap:amp-access.login">Become a subscriber now!</a>
</div>

<div amp-access="subscriber">
  Full content.
</div>

```
subscriber** は、承認エンドポイントから返される承認応答のブール値フィールドです。このセクションは、デフォルトでは非表示です（オプションです）。この例では、コンテンツ全体をオプティミスティックに表示しています。

以下に、メータリングの状態に関する免責事項をリーダーに表示する例を示します。
```html
{% raw %}
<section amp-access="views <= maxViews">
  <template amp-access-template type="amp-mustache">
    You are reading article {{views}} out of {{maxViews}}.
  </template>
</section>
{% endraw %}
```

以下に、プレミアム サブスクライバーに追加のコンテンツを表示する例を示します。
```html
<section amp-access="subscriptonType = 'premium'">
  Shhh… No one but you can read this content.
</section>
```

### 承認エンドポイント <a name="authorization-endpoint-1"></a>

承認エンドポイントは、[設定](#configuration)で説明した `authorization` プロパティを使用して設定します。これは、認証済み CORS GET エンドポイントです。このリクエストを保護する方法については、[CORS のオリジンのセキュリティ](#cors-origin-security)をご覧ください。

承認エンドポイントは、[アクセス URL 変数](#access-url-variables)で定義されているパラメータをすべて受け取ることができます。たとえば、AMP リーダー ID とドキュメント URL を渡すことができます。サイト運営者は、URL パラメータだけでなく、HTTP プロトコルで当然提供される情報（リーダーの IP アドレスなど）も使用できます。`READER_ID` は必須です。

このエンドポイントでは、コンテンツのさまざまな部分の表示と非表示を切り替えるためのコンテンツ マークアップの式で使用可能な承認応答を生成します。

リクエストの形式は次のとおりです。
```text
https://publisher.com/amp-access.json?
rid=READER_ID
&url=SOURCE_URL
```
応答は自由形式の JSON オブジェクトです。制限事項がいくつかありますが、応答にはすべてのプロパティと値を含めることができます。制限事項は次のとおりです。
- プロパティ名は、`amp-access` 式の文法（[付録 A](#appendix-a-amp-access-expression-grammar) を参照）で定義されている制限事項に従う必要があります。つまり、プロパティ名には「amp-access」の仕様に準拠していない文字（スペースやダッシュなど）を含めることはできません。
- プロパティ値に指定できる型は、文字列、数値、ブール値のいずれかのみです。
- 値は、同じ型（文字列、数値、ブール値）の値を持つオブジェクトとしてネストすることもできます。
- シリアル化された承認応答の合計サイズが 500 バイトを超えることはできません。
- 個人を特定できる情報（PII）または個人データを応答に含めないでください。

以下に、承認エンドポイントから返すことができるプロパティの一部を示します。
- メータリング情報: 許容される最大視聴回数と現在の視聴回数。
- リーダーがログイン中か、サブスクライバーか。
- サブスクリプションの詳細なタイプ: 基本、プレミアム
- 地理情報: 国、地域、カスタムの公開地域

以下に、リーダーがサブスクライバーではなく、1 か月に最大 10 件の記事を閲覧できる場合に、すでに 6 件の記事を閲覧しているときの応答の例を示します。
```json
{
  "maxViews": 10,
  "currentViews": 6,
  "subscriber": false
}
```
以下に、リーダーがログイン中で、サブスクリプション タイプがプレミアムの場合の応答の例を示します。
```json
{
  "loggedIn": true,
  "subscriptionType": "premium"
}
```
この RPC は、事前レンダリング フェーズで呼び出されることがありますが、リーダーが実際にドキュメントを見ることはできないため、メーターのカウントダウンには使用しないでください。

もう 1 つの重要な考慮事項は、AMP ランタイムで承認エンドポイントをドキュメントのインプレッションあたり複数回呼び出さなければならない場合があるという点です。このような状況は、リーダーのアクセス パラメータが大きく変化したと AMP ランタイムが判断したとき（ログインフローが正常に完了した後など）に生じることがあります。

承認応答は、以下の 3 つの目的で、AMP ランタイムや拡張機能で使用されます。

1. `amp-access` の式を評価する場合。
2. `<template>` テンプレート（`amp-mustache` など）を評価する場合。
3. `AUTHDATA(field)` を使用して、Pingback URL とログイン URL に変数を追加する場合。

承認エンドポイントは、認証済み CORS エンドポイントとして AMP ランタイムから呼び出されます。そのため、CORS プロトコルの実装が必要になります。[CORS のオリジンのセキュリティ](#cors-origin-security)で説明するように、CORS のオリジンとアクセス元のオリジンを使用して、このサービスへのアクセスを制限する必要があります。このエンドポイントでは、必要に応じてサイト運営者の Cookie を使用できます。たとえば、リーダー ID とサイト運営者のユーザー ID 間のバインディングを関連付けることができます。AMP 自体はこれについて把握する必要はありません（また、把握することを望みません）。詳しくは、[AMP リーダー ID](#amp-reader-id) および [amp-access と Cookie](#amp-access-and-cookies) をご覧ください。

AMP ランタイム（厳密にはブラウザ）は、承認エンドポイントを呼び出すときにキャッシュ応答ヘッダーを監視します。そのため、キャッシュされた応答は再利用できます。これは、望ましい場合もあれば、望ましくない場合もあります。望ましくない場合、サイト運営者は、適切なキャッシュ制御ヘッダーまたはエンドポイント URL の `RANDOM` 変数置換（あるいはその両方）を使用できます。

承認リクエストが失敗すると、AMP ランタイムは「authorizationFallbackResponse」にフォールバックします（設定で指定されている場合）。この場合、承認応答の代わりに「authorizationFallbackResponse」プロパティの値を使用して、通常どおりに承認フローが続行されます。「authorizationFallbackResponse」が指定されていない場合、承認フローは失敗します。その場合、`amp-access` の式が評価されないため、セクションが表示されるかどうかは、ドキュメントで `amp-access-hide` 属性が最初に指定されているかどうかによって決まります。

承認リクエストは自動的にタイムアウトし、3 秒後に失敗したとみなされます。

AMP ランタイムは承認フローで以下の CSS クラスを使用します。

1. `amp-access-loading` CSS クラス: 承認フローの開始時にドキュメント ルートに設定され、承認フローが完了または失敗すると削除されます。
2. `amp-access-error` CSS クラス: 承認フローが失敗したときにドキュメント ルートに設定されます。

server** オプションでは、単純な HTTPS エンドポイントと同様に、Google AMP キャッシュから承認エンドポイントが呼び出されます。つまり、その場合はサイト運営者の Cookie を配信できません。

### Pingback エンドポイント <a name="pingback-endpoint-1"></a>

Pingback は、[設定](#configuration)で説明した `pingback` プロパティを使用して設定します。これは、認証済み CORS POST エンドポイントです。このリクエストを保護する方法については、[CORS のオリジンのセキュリティ](#cors-origin-security)をご覧ください。

Pingback URL はオプションです。無効にするには、`"noPingback": true` を使用します。

Pingback URL には、[アクセス URL 変数](#access-url-variables)で定義されているパラメータをすべて指定できます。たとえば、AMP リーダー ID とドキュメント URL を渡すことができます。`READER_ID` は必須です。

Pingback は応答を生成しません。AMP ランタイムはすべての応答を無視します。

Pingback エンドポイントの呼び出しは、リーダーがドキュメントの表示を開始したときと、リーダーがログインフローを正常に完了した後に行われます。

サイト運営者は以下の目的で Pingback を使用できます。
- ページの無料視聴回数をカウントダウンする
- AMP リーダー ID をサイト運営者の ID にマッピングする（Pingback が認証済み CORS エンドポイントとしてサイト運営者の Cookie に含まれることがあるため）

リクエストの形式は次のとおりです。
```text
https://publisher.com/amp-pingback?
rid=READER_ID
&url=SOURCE_URL
```

### ログインページ <a name="login-page"></a>

ログインページの URL は、[設定](#configuration)で説明した `login` プロパティを使用して設定します。

設定では、単一のログイン URL、またはログインのタイプが統一された複数のログイン URL を指定できます。以下に、単一のログイン URL の例を示します。
```json
{
  "login": "https://publisher.com/amp-login.html?rid={READER_ID}"
  }
```

以下に、複数のログイン URL の例を示します。
```json
{
  "login": {
    "signin": "https://publisher.com/signin.html?rid={READER_ID}",
    "signup": "https://publisher.com/signup.html?rid={READER_ID}"
    }
  }
```

URL には、[アクセス URL 変数](#access-url-variables)で定義されているパラメータをすべて指定できます。たとえば、AMP リーダー ID とドキュメント URL を渡すことができます。`RETURN_URL` クエリ置換を使用すると、リターン URL のクエリ パラメータ（例: `?ret=RETURN_URL`）を指定できます。リターン URL は必須です。`RETURN_URL` クエリ置換が指定されていない場合、デフォルトのクエリ パラメータ名（「return」）が指定されたリターン URL が自動的に挿入されます。

ログインページは通常のウェブページです。[ブラウザ ダイアログ](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)として正常に機能する必要があること以外に特別な制約はありません。詳しくは、[ログインフロー](#login-flow)をご覧ください。

リクエストの形式は次のとおりです。
```text
https://publisher.com/amp-login.html?
rid=READER_ID
&url=SOURCE_URL
&return=RETURN_URL
```
`RETURN_URL` クエリ置換が指定されていない場合、「return」URL パラメータが AMP ランタイムによって自動的に追加されます。ログインページの作業の完了後、次の形式で指定された「リターン URL」にリダイレクトする必要があります。
```text
RETURN_URL#success=true|false
```
URL ハッシュ パラメータ「success」が使用されていることに注目してください。ログインが成功したかどうかに応じて、値が「true」または「false」に設定されます。可能であれば、成功と失敗のどちらの場合にも、ログインページからシグナルが送信されるようにするのが理想的です。

`success=true` シグナルが返された場合、AMP ランタイムは承認エンドポイントと Pingback エンドポイントを繰り返し呼び出してドキュメントの状態を更新し、新しいアクセス プロファイルを使用して「視聴」を報告します。

#### ログインリンク <a name="login-link"></a>

サイト運営者は、ドキュメントのコンテンツ内の任意の場所にログインリンクを配置できます。

ログイン URL は、[設定](#configuration)で説明した「login」プロパティを使用して 1 つ以上設定します。

ログインリンクは、「on」属性を指定できる HTML 要素で宣言できます。通常は、アンカー要素またはボタン要素で宣言します。単一のログイン URL を設定する場合の形式は次のとおりです。
```html
<a on="tap:amp-access.login">Login or subscribe</a>
```

複数のログイン URL を設定する場合の形式は、`tap:amp-access.login-{type}` です。たとえば、次のように設定します。
```html
<a on="tap:amp-access.login-signup">Subscribe</a>
```

名前空間を使用する場合の形式は、`tap:amp-access.login-{namespace}` または `tap:amp-access.login-{namespace}-{type}` です。

AMP では、ログインとサブスクリプションを区別しません。この区別は、サイト運営者が複数のログイン URL とログインリンクを使用することによって設定できます。また、サイト運営者側で設定することもできます。

## amp-analytics** との統合 <a name="integration-with-amp-analytics"></a>

amp-analytics** との統合は、[amp-access-analytics.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md) に記載されています。

## CORS のオリジンのセキュリティ <a name="cors-origin-security"></a>

承認エンドポイントと Pingback エンドポイントは CORS エンドポイントであり、[AMP CORS のセキュリティ仕様](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)で説明されているセキュリティ プロトコルを実装する必要があります。

## メータリング <a name="metering"></a>

メータリングとは、リーダーがプレミアム コンテンツを一定期間内に複数回無料で視聴できるシステムです。割り当て量に達すると、リーダーにペイウォールが開始されたことが示され、その後は、アップセル メッセージと登録 / ログインリンクを含む部分的なコンテンツが表示されます。たとえば、メータリングは「リーダーは 1 か月あたり 10 件の記事を無料で読むことができます」のように定義できます。

amp-access には、従量制のアクセスを実装するための以下の機能が用意されています。

1. メータリング情報を保存するには READER_ID を使用します。サイト運営者が第三者のコンテキストで Cookie を設定できるとは限らないため、このデータはサーバー側に保存する必要があります。
2. 「既読件数」は Pingback エンドポイントでのみ更新できます。
3. 重複しないドキュメントのみが割り当て量に対してカウントされます。つまり、同じドキュメントを 10 回更新しても、視聴回数は 1 回です。そのため、承認エンドポイントと Pingback エンドポイントでは `SOURCE_URL` または同様の URL 変数を挿入できます。詳しくは、[アクセス URL 変数](#access-url-variables)をご覧ください。

## First-Click-Free <a name="first-click-free"></a>

Google の First-Click-Free（FCF）ポリシーについては、[こちら](https://support.google.com/news/publisher/answer/40543)をご覧ください。最新情報の詳細については、[こちら](https://googlewebmastercentral.blogspot.com/2015/09/first-click-free-update.html)をご覧ください。

FCF を実装するには、サイト運営者が（1）各視聴の参照元サービスを特定でき、（2）各リーダーの 1 日あたりの視聴回数をカウントできる必要があります。

どちらの手順も amp-access の仕様に記載されています。[アクセス URL 変数](#access-url-variables)で説明したように、`DOCUMENT_REFERRER` URL 置換を使用して、参照 URL を承認 URL と Pingback URL に挿入することができます。視聴回数をカウントするには、サーバー側の Pingback エンドポイントを使用します。これは、[メータリング](#metering)で説明したメータリングの実装によく似ています。

## ログインフロー <a name="login-flow"></a>

AMP では、ファーストパーティのウィンドウ、ポップアップ、タブとしてログイン ダイアログを起動します。AMP ビューアは、ログイン ダイアログで最上位のブラウザ API を利用できるよう、可能な限りブラウザ コンテキストでログイン ダイアログの起動を試みる必要があります。

ログインフローは、リーダーがログインリンクをクリックしたときに AMP ランタイムによって開始され、その後、以下の手順が行われます。

1. ログイン ダイアログ（ファーストパーティ ウィンドウ）が AMP ランタイムまたは AMP ビューアによって起動され、指定されているログイン URL に移動します。この URL には、「リターン URL」の URL クエリ パラメータ（`&amp;return=RETURN_URL`）が含まれています。その他の各種パラメータ（リーダー ID など）を URL に追加することも可能です。詳しくは、[ログインページ](#login-page)をご覧ください。
2. サイト運営者が自由形式のログインページを表示します。
3. リーダーがログイン手順を行います（ユーザー名とパスワードの入力、ソーシャル ログインの使用など）。
4. リーダーがログイン情報を送信します。サイト運営者が認証と Cookie の設定を行い、最後に、前にリクエストされた「リターン URL」にリーダーをリダイレクトします。リダイレクトには URL ハッシュ パラメータ `success` が含まれます。このパラメータは、`true` または `false` のいずれかに設定されます。
5. ログイン ダイアログが「リターン URL」にリダイレクトします。
6. AMP ランタイムがドキュメントを再承認します。

サイト運営者側で行う必要があるのは 手順 2～5 のみです。サイト運営者は、独自のログインページを提供し、リダイレクトの完了後に正しくリダイレクトされていることを確認するだけです。ダイアログとして正常に機能する必要があること以外、ログインページに特別な制約はありません。

通常どおり、ログインページの呼び出しにはリーダー ID を含める必要があります。また、サイト運営者は ID マッピングにリーダー ID を使用できます。さらに、サイト運営者はファーストパーティ ウィンドウとして Cookie を受け取って設定することもできます。リーダーがサイト運営者側ですでにログインしていることがわかった場合、サイト運営者は `success=true` 応答を使用して「リターン URL」にすぐにリダイレクトすることをおすすめします。

## AMP 用語集 <a name="amp-glossary"></a>

* **AMP ドキュメント** - AMP 形式で作成された HTML ドキュメント。AMP 検証ツールによって検証され、Google AMP キャッシュでキャッシュすることも可能です。
* **AMP 検証ツール** - HTML ドキュメントの静的分析を実行し、ドキュメントが AMP 形式に準拠しているかどうかに応じて成功または失敗を返すコンピュータ プログラム。
* **AMP ランタイム** - AMP ドキュメントを実行する JavaScript ランタイム。
* **Google AMP キャッシュ** - AMP ドキュメントのプロキシ キャッシュ。
* **AMP ビューア** - AMP ドキュメントの表示や埋め込みを行うウェブまたはネイティブ アプリ。
* **Publisher.com** - AMP サイトの運営者のサイト。
* **CORS エンドポイント** - クロスオリジンの HTTPS エンドポイント。詳しくは、[https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) をご覧ください。リクエストを保護する方法については、[CORS のオリジンのセキュリティ](#cors-origin-security)をご覧ください。
* **リーダー** - AMP ドキュメントを閲覧している実際のユーザー。
* **AMP 事前レンダリング** - AMP ビューアでは、非表示のドキュメントを表示する前にレンダリングする事前レンダリングを利用できます。これにより、パフォーマンスを大幅に向上させることができます。ただし、ドキュメントの事前レンダリングではリーダーが実際にドキュメントを見ることはできないため、ビューが構成されないことを考慮することが重要です。

## 改訂 <a name="revisions"></a>

* 2016 年 9 月 2 日: 「noPingback」設定プロパティとオプションの Pingback。
* 2016 年 3 月 3 日: ログイン後に Pingback が再送信されるようになりました（v0.5）。
* 2016 年 2 月 19 日: サンプルを修正し、URL 変数置換から `{}` を削除。
* 2016 年 2 月 15 日: 承認の失敗時に使用できる「authorizationFallbackResponse」プロパティを[設定](#configuration)と[承認エンドポイント](#authorization-endpoint)で使用できるようになりました。
* 2016 年 2 月 11 日: [承認エンドポイント](#authorization-endpoint)における承認リクエストのタイムアウト。
* 2016 年 2 月 11 日: ネストされたフィールド参照（`object.field` など）を使用できるようになりました。
* 2016 年 2 月 9 日: [First-Click-Free](#first-click-free) セクションと[メータリング](#metering) セクション。
* 2016 年 2 月 3 日: 「アクセス元のオリジン」のセキュリティの仕様を [CORS のオリジンのセキュリティ](#cors-origin-security)に追加。
* 2016 年 2 月 1 日: ログインページの「return」クエリ パラメータを、RETURN_URL URL 置換を使用してカスタマイズできるようになりました。

## 付録 A: 「amp-access」の式の文法 <a name="appendix-a-amp-access-expression-grammar"></a>

最新の BNF の文法は [access-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/0.1/access-expr-impl.jison) ファイルで確認できます。

この文法の一部を以下に示します。

```javascript
search_condition:
  search_condition OR search_condition
  | search_condition AND search_condition
  | NOT search_condition
  | '(' search_condition ')'
  | predicate

predicate:
    comparison_predicate | truthy_predicate

comparison_predicate:
    scalar_exp '=' scalar_exp
    | scalar_exp '!=' scalar_exp
    | scalar_exp '<' scalar_exp
    | scalar_exp '<=' scalar_exp
    | scalar_exp '>' scalar_exp
    | scalar_exp '>=' scalar_exp

truthy_predicate: scalar_exp

scalar_exp: literal | field_ref

field_ref: field_ref '.' field_name | field_name

literal: STRING | NUMERIC | TRUE | FALSE | NULL
```

`amp-access` の式は AMP ランタイムと Google AMP キャッシュによって評価されることに注意してください。この部分をサイト運営者が実装する必要があるというわけではありません。上の抜粋は情報の提供だけを目的としたものです。

## 詳細な説明 <a name="detailed-discussion"></a>

このセクションでは、amp-access の仕様の基礎となる設計について詳細に説明し、設計オプションを明らかにします。近日公開予定。

## 検証 <a name="validation"></a>

AMP 検証ツールの仕様で [amp-access のルール](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/validator-amp-access.protoascii)をご確認ください。
