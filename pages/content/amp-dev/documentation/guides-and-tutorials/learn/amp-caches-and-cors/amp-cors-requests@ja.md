---
'$title': AMP における CORS
$order: 12
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: 多くの AMP コンポーネントと拡張機能は、クロスオリジンリソースシェアリング（CORS）
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cors-requests.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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

多くの AMP コンポーネントと拡張機能は、クロスオリジンリソースシェアリング（CORS）リクエストを使用することで、リモートエンドポイントを活用しています。このドキュメントでは、AMP で CORS を使用する際の主な側面について説明します。CORS そのものについては、[W3 CORS Spec](https://www.w3.org/TR/cors/) を参照してください。

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#why-do-i-need-cors-for-my-own-origin-" data-md-type="link">自分のオリジンに CORS を使用する必要があるのはなぜですか？</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">CORS リクエストに cookie を使用する</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">AMP における CORS セキュリティ</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">CORS リクエストの検証</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link">1) 特定委の CORS オリジンのリクエストを許可する</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) same-origin リクエストを許可する</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">CORS レスポンスヘッダーの送信</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered"><a href="#access-control-allow-origin-origin" data-md-type="link">Access-Control-Allow-Origin: </a></li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">状態が変化するリクエストの処理</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link">サンプルウォークスルー: CORS リクエストとレスポンスの処理</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">AMP での CORS のテスト</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## 自分のオリジンに CORS を使用する必要があるのはなぜですか？ <a name="why-do-i-need-cors-for-my-own-origin"></a>

自分のオリジンへのリクエストになぜ CORS を使用する必要があるのかがわからない方もいるでしょう。では、その理由を詳しく探ってみましょう。

動的データをフェッチする AMP コンポーネント（amp-form、amp-list など）は、データを取得するためにリモートエンドポイントに CORS リクエストを送信します。AMP ページにそのようなコンポーネントが含まれる場合は、それらのリクエストが失敗しないように、CORS を処理する必要があります。

これを、例を使って説明します。

製品の一覧を価格付きで示す AMP ページがあるとします。ページの価格を更新するには、ユーザーはボタンをクリックし、それによって JSON エンドポイントから最新の価格が取得されます（amp-list コンポーネントを使用）。この JSON はあなたのドメイン上にあります。

ページが*自分のドメイン*にあり、JSON も*自分のドメイン*にあるなら、問題はありませんよね！

そうですね。でも、ユーザーは、どのようにして AMP ページにたどり着いたのでしょうか。アクセスしているのはキャッシュされたページですか？ユーザーが AMP ページに直接アクセスせずに、別のプラットフォームからページにたどり着いた可能性が非常に高いといえます。たとえば、Google 検索では、AMP ページを素早くレンダリングできるように、Google AMP キャッシュを使用しています。これらのページはキャッシュされたページで、Google AMP キャッシュから配信されます。これは、*異なる*ドメインです。ユーザーがボタンをクリックして価格と更新しようとすると、キャッシュされた AMP ページは、価格を取得するために、オリジンドメイン（あなたのドメイン）にリクエストを送信するわけですが、オリジン間の不一致（キャッシュ -> オリジンドメイン）が生じます。このようなクロスオリジンリクエストを許可するには、CORS を処理する必要があります。処理しなければ、リクエストは失敗してしまいます。

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript><img alt="CORSとキャッシュ" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png"></noscript></amp-img>

**ではどうすればいいですか？**

1. 動的データをフェッチする AMP ページの場合は、_自分のドメインでだけでなく_、キャッシュされたページも必ずテストしてください。（以下の「[AMP での CORS のテスト](#testing-cors-in-amp)」セクションを参照してください。）
2. CORS リクエストとレスポンスの処理について、このドキュメントの指示に従ってください。

## CORS リクエストに cookie を使用する <a name="utilizing-cookies-for-cors-requests"></a>

CORS リクエストを使用するほとんどの AMP コンポーネントは、[クレデンシャルモード](https://fetch.spec.whatwg.org/#concept-request-credentials-mode)を自動的に設定するか、作成者が任意に有効化することができます。たとえば、[`amp-list`](https://amp.dev/documentation/components/amp-list) コンポーネントは CORS JSON エンドポイントから動的コンテンツをフェッチし、作成者が `credentials` 属性を通じてクレデンシャルモードを設定することを許可します。

_例: cookie を介して amp-list にパーソナライズコンテンツを含める_

[sourcecode:html]
<amp-list
credentials="include"
src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"

>   <template type="amp-mustache">

    Your personal offer: ${% raw %}{{price}}{% endraw %}

  </template>
</amp-list>
[/sourcecode]

クレデンシャルモードを指定すると、オリジンは、CORS リクエストに cookie を含めてレスポンスに設定することができます（[サードパーティ cookie の制限](#third-party-cookie-restrictions)が適用されます）。

### サードパーティ cookie の制限 <a name="third-party-cookie-restrictions"></a>

AMP でのクレデンシャル CORS リクエストには、ブラウザに指定されたサードパーティ cookie の制限が適用されます。これらの制限はブラウザやプラットフォームによって異なりますが、一部のブラウザでは、ユーザーが過去にファーストパーティ（トップ）ウィンドウでオリジンを訪問したことがなければ、オリジンが cookie を設定できなくなっています。言い換えると、ユーザーがオリジンのウェブサイトに直接訪問したことがある場合のみ、cookie が設定されるということになります。このため、CORS を介してアクセスされるサービスにおいて、デフォルトで cookie が設定されると考えてはいけません。

## AMP における CORS セキュリティ <a name="cors-security-in-amp"></a>

AMP ページのリクエストとレスポンスの有効性と安全性を確保するには、以下を行う必要があります。

1. [リクエストを検証する](#verify-cors-requests)。
2. [適切なレスポンスヘッダーを送信する](#send-cors-response-headers)。

バックエンドで Node を使用している場合は、[AMP CORS ミドルウェア](https://www.npmjs.com/package/amp-toolbox-cors)を使用できます。これは、[AMP Toolbox](https://github.com/ampproject/amp-toolbox) の一部です。

### CORS リクエストの検証 <a name="verify-cors-requests"></a>

エンドポイントが CORS リクエストを受信したら、次の項目を行います。

1. [CORS <code>Origin</code> ヘッダーが許可されたオリジンであることを検証する（サイト運営者のオリジンと AMP キャッシュ）](#verify-cors-header)。
2. [Origin ヘッダーがない場合は、リクエストが同一のオリジンから発行されたものであることを確認する（`AMP-Same-Origin`）](#allow-same-origin-requests)。

#### 1) 特定委の CORS オリジンのリクエストを許可する <a name="1-allow-requests-for-specific-cors-origins"></a>

<span id="verify-cors-header"></span>

CORS エンドポイントは、`Origin` HTTP ヘッダーを通じてリクエストを発行するオリジンを受け取ります。エンドポイントが許可するリクエストは、（1）サイト運営者自身のオリジンであり、（2）[https://cdn.ampproject.org/caches.json](https://cdn.ampproject.org/caches.json) に記載される `cacheDomain` オリジンである必要があります。

たとえば、エンドポイントは、以下から送られるリクエストを許可します。

- Google AMP Cache subdomain: `https://<publisher's domain>.cdn.ampproject.org` <br>(for example, `https://nytimes-com.cdn.ampproject.org`)

[tip type="read-on"] AMP キャッシュの URL 形式については、以下のリソースを参照してください。

- [Google AMP キャッシュの概要](https://developers.google.com/amp/cache/overview) [/tip]

#### 2) same-origin リクエストを許可する <a name="2-allow-same-origin-requests"></a>

<span id="allow-same-origin-requests"></span>

`Origin` ヘッダーが欠落している same-origin リクエストの場合、AMP は以下のカスタムヘッダーを設定します。

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

このカスタムヘッダーは、XHR リクエストが同一のオリジンで発行されたものである場合に AMP ランタイムによって送信されます（キャッシュなしの URL から配信されるドキュメント）。`AMP-Same-Origin:true` ヘッダーを含むリクエストを許可してください。

### CORS レスポンスヘッダーの送信 <a name="send-cors-response-headers"></a>

CORS リクエストを検証した後に生成される HTTP レスポンスには、以下のヘッダーが含まれている必要があります。

##### Access-Control-Allow-Origin: &lt;origin&gt; <a name="access-control-allow-origin-origin"></a>

このヘッダーは、<code>origin</code> は CORS <code>Origin</code> リクエストヘッダーで許可されたリクエスト元のオリジン（<code>"https://<サイト運営者のサブドメイン>.cdn.ampproject.org"</code> など）を参照するという <a href="https://www.w3.org/TR/cors/">W3 CORS Spec</a> の要件です。

W3 CORS 仕様書では、レスポンスで <code>\*</code> の値を返すことを許可していますが、セキュリティを改善するために、以下のようにする必要があります。

- `Origin` ヘッダーが存在する場合は、<code>Origin</code> ヘッダーの値を検証してエコーする。

### 状態が変化するリクエストの処理 <a name="processing-state-changing-requests"></a>

[tip type="important"] リクエストを処理する*前*に、以下の検証チェックを実行してください。この検証によって、CSRF 攻撃に対する保護を得、信頼できないソースのリクエストを処理しないようにすることができます。 [/tip]

システムの状態を変更する可能性のあるリクエスト（ユーザーがメーリングリストを購読するか購読解除するなど）を処理する前に、以下のことを確認します。

**`Origin` ヘッダーが設定されている場合**:

1. オリジンが以下の値のいずれかに一致しない場合は、中断してエラーレスポンスを返します。

   - `<publisher's domain>.cdn.ampproject.org`
   - サイト運営者のオリジン（あなたのオリジン）

   `*` は、ワイルドカード一致であり、実際のアスタリスク（\*）ではありません。

2. 含まれている場合は、リクエストを処理します。

**`Origin` ヘッダーが設定されていない場合**:

1. リクエストに `AMP-Same-Origin: true` ヘッダーが含まれているかどうかを確認します。このヘッダーが含まれていない場合は、中断してエラーレスポンスを返します。
2. 一致する場合は、リクエストを処理します。

## サンプルウォークスルー: CORS リクエストとレスポンスの処理 <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

エンドポイントへの CORS リクエストで考えられるシナリオには 2 つあります。

1. 同一のオリジンから送信されるリクエスト。
2. キャッシュされたオリジン（AMP キャッシュ）から送信されるリクエスト。

これらのシナリオを例を使って考察してみましょう。この例では、`article-amp.html` という AMP ページをホストする `example.com` サイトを管理しています。この AMP ページには、同じく `example.com` サイトにホストされた `data.json` ファイルから動的データを取得する `amp-list` が含まれます。ここでは、AMP ページから発信される `data.json` ファイルへのリクエストを処理したいと思います。これらのリクエストは、同じオリジンの AMP ページ（非キャッシュ）または別のオリジンの AMP ページ（キャッシュ）から送信されます。

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript><img alt="CORSの例" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png"></noscript></amp-img>

### 許可されるオリジン <a name="allowed-origins"></a>

CORS と AMP についてわかっていることに基づいて（上記の「[CORS リクエストの検証](#verify-cors-requests)」より）、この例では以下のドメインからのリクエストを許可することにします。

- `example.com` --- サイト運営者のドメイン
- `example-com.cdn.ampproject.org` --- Google AMP キャッシュのサブドメイン

### 許可されるリクエストに対するレスポンスヘッダー <a name="response-headers-for-allowed-requests"></a>

許可されるオリジンから送られるリクエストについては、レスポンスには以下のヘッダーを含めます。

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

以下は、この CORS レスポンスに追加するレスポンスヘッダーです。

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### 疑似 CORS ロジック <a name="pseudo-cors-logic"></a>

CORS リクエストとレスポンスを処理するロジックは、以下の疑似コードに簡略化できます。

[sourcecode:text]
IF CORS header present
IF origin IN allowed-origins
allow request & send response
ELSE
deny request
ELSE
IF "AMP-Same-Origin: true"
allow request & send response
ELSE
deny request
[/sourcecode]

#### CORS サンプルコード <a name="cors-sample-code"></a>

以下は、CORS リクエストとレスポンスの処理に使用できるサンプルの JavaScript です。

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var origin;
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
'https://cdn.ampproject.org',
];
var allowedSourceOrigin = 'https://example.com'; //publisher's origin
// If same origin
if (req.headers['amp-same-origin'] == 'true') {
origin = sourceOrigin;
// If allowed CORS origin & allowed source origin
} else if (
allowedOrigins.indexOf(req.headers.origin) != -1 &&
sourceOrigin == allowedSourceOrigin
) {
origin = req.headers.origin;
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}

res.setHeader('Access-Control-Allow-Credentials', 'true');
res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**注意**: 実際に稼働するコードサンプルについては、[amp-cors.js](https://github.com/ampproject/amphtml/blob/main/build-system/server/amp-cors.js) を参照してください。

### シナリオ 1: 同一オリジンの AMP ページからリクエストを取得する <a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

以下のシナリオでは、`article-amp.html` ページが `data.json` ファイルをリクエストします。オリジンは同一です。

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript><img alt="CORSの例" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png"></noscript></amp-img>

リクエストをよく見ると、以下の内容が見つかります。

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

このリクエストは同じオリジンから送信されるものであるため、`Origin` ヘッダーはありませんが、カスタム AMP リクエストヘッダーの `AMP-Same-Origin: true` が存在します。このリクエストは同じオリジン（`https://example.com`）から送信されたものであるため、許可することができます。

レスポンスヘッダーは、以下のようになります。

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### シナリオ 2: キャッシュされた AMP ページからリクエストを取得する <a name="scenario-2-get-request-from-cached-amp-page"></a>

以下のシナリオでは、Google AMP キャッシュにキャッシュされた `article-amp.html` ページが `data.json` ファイルをリクエストしているため、オリジンが異なります。

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript><img alt="CORSの例" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png"></noscript></amp-img>

リクエストをよく見ると、以下の内容が見つかります。

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

このリクエストには `Origin` ヘッダーが含まれているため、許可されるオリジンから送信されたものであるかを検証します。これは許可されるオリジンから送信されたものであることがわかるため、このリクエストを許可することができます。

レスポンスヘッダーは、以下のようになります。

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## キャッシュされたフォントの使用 <a name="working-with-cached-fonts"></a>

Google AMP キャッシュは、AMP HTML ドキュメント、画像、およびフォントをキャッシュすることで、AMP ページの速度を最適化しています。AMP ページを高速化する一方で、キャッシュされたリソースの安全を維持することも大切です。そのため、AMP キャッシュが、オリジンの `Access-Control-Allow-Origin` 値を尊重しながら、キャッシュされたリソース（通常、フォント）に対してどのように応答するかを変更する必要があります。

### 過去の振る舞い（2019 年 10 月以前） <a name="past-behavior-before-october-2019"></a>

AMP ページが `@font-face src` 属性の `https://example.com/some/font.ttf` を読み込む際、AMP キャッシュはフォントファイルをキャッシュして、以下のように `Access-Control-Allow-Origin` にワイルドカードを使用してリソースを配信していました。

- URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Access-Control-Allow-Origin: \*

### 新しい振る舞い（2019 年 10 月以降） <a name="new-behavior-october-2019-and-after"></a>

現在の実装は許容範囲内ですが、これによりクロスオリジンサイトのフォントが予期せずに使用される可能性があります。この変更では、AMP キャッシュはオリジンサーバーが応答するのとまったく同じ `Access-Control-Allow-Origin` 値で応答し始めます。キャッシュされた AMP ドキュメントからフォントを正しく読み込むために、ヘッダーで AMP キャッシュのオリジンを受け入れる必要があります。

以下は実装の例です。

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
];
// If allowed CORS origin
if (allowedOrigins.indexOf(req.headers.origin) != -1) {
res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}
}
[/sourcecode]

例として、`https://example.com/amp.html` に /some/font.ttf を読み込む場合、オリジンサーバーは、以下のように、Access-Control-Allow-Origin ヘッダーを使って応答する必要があります。

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript><img alt="CORSフォントの例" src="https://amp.dev/static/img/docs/cors-font.jpg"></noscript></amp-img>

[tip type="note"] フォントファイルがあらゆるオリジンからアクセスできるようになっている場合は、`Access-Control-Allow-Origin` のワイルドカードで応答でき、AMP キャッシュもその値をエコーして、`Access-Control-Allow-Origin: *` で応答するようになります。すでにこの設定が使用されている場合は、何の変更もいりません。 [/tip]

この変更は 2019 年 10 月半ばに適用する予定です。フォントを独自にホストしているすべての AMP サイト運営者は、この変更による影響があるかどうかを確認してください。

#### ロールアウトの計画 <a name="roll-out-plan"></a>

- 2019/9/30: リリースには、この変更が適用されるドメインに対するより正確な制御が含まれています。 このビルドは今週中にロールアウトされる予定です。
- 2019/10/7: テストドメインで手動テストを実行できるようになります。
- 2019/10/14（テストの結果によって変更の可能性あり）: 機能は、一般に向けてロールアウトされます。

関連する[課題はこちら](https://github.com/ampproject/amphtml/issues/24834)でフォローしてください。

## AMP での CORS のテスト <a name="testing-cors-in-amp"></a>

AMP ページをテストする際は、AMP ページのキャッシュバージョンもテストに含めるようにしてください。

### キャッシュ URL でページを確認する <a name="verify-the-page-via-the-cache-url"></a>

キャッシュされた AMP ページが正しく表示されて機能することを確認します。

1. ブラウザで、AMP ページにアクセスするために AMP キャッシュが 使用する URL を開きます。キャッシュ URL の形式は、こちらの [AMP By Example のツール](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/)で確認できます。

   例:

   - URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
   - AMP キャッシュ URL 形式: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. ブラウザの開発ツールを開き、エラーがないこととすべてのリソースが正しく読み込まれることを確認します。

### サーバーのレスポンスヘッダーを確認する <a name="verify-your-server-response-headers"></a>

サーバーが正しい HTTP レスポンスヘッダーを送信しているかどうかは、`curl` コマンドを使用して確認することができます。`curl` コマンドに、リクエスト URL と追加する任意のカスタムヘッダーを指定します。

**構文**: `curl <request-url> -H <custom-header> - I`

#### 同一のオリジンから送信されるリクエストのテスト <a name="test-request-from-same-origin"></a>

same-origin リクエストでは、AMP システムによってカスタムの `AMP-Same-Origin:true` ヘッダーが追加されます。

以下は、 `https://ampbyexample.com` から `examples.json` ファイル（同じドメイン上）へのリクエストをテストするための curl コマンドです。

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

コマンドの結果に、正しいレスポンスヘッダーが示されます（注意: 余計な情報は省略されています）。

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### キャッシュされた AMP ページから送信されるリクエストのテスト <a name="test-request-from-cached-amp-page"></a>

同一ドメインからではない （キャッシュ）CORS リクエストでは、リクエストの一部に `origin` ヘッダーが含まれます。

以下は、Google AMP キャッシュにキャッシュされた AMP ページから `examples.json` ファイルへのリクエストをテストするための curl コマンドです。

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

コマンドの結果に、正しいレスポンスヘッダーが示されます。

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```
