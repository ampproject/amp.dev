---
$category@: dynamic-content
formats:
  - websites
  - email
  - ads
teaser:
  text: Allows you to create forms to submit input fields in an AMP document.
toc: true
$title: amp-form
---

<!--
       Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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
    <td width="40%"><strong>説明</strong></td>
    <td><code>form</code> タグと <code>input</code> タグを作成します。</td>
  </tr>
  <tr>
    <td><strong>必要なスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">サポートされるレイアウト</a></strong></td>
    <td>なし</td>
  </tr>
  <tr>
    <td><strong>例</strong></td>
    <td>AMP By Example の <a href="https://ampbyexample.com/components/amp-form/">amp-form</a> の例をご覧ください。</td>
  </tr>
</table>


# 動作 <a name="behavior"></a>

`amp-form` 拡張機能を使用すると、AMP ドキュメントの入力フィールドを送信するためのフォーム（`<form>`）を作成できます。また、`amp-form` 拡張機能には、ブラウザに実装されていない動作を補うための[ポリフィル](#polyfills)が用意されています。

[tip type="important"] データをフォームで送信する場合、サーバー エンドポイントが [CORS セキュリティ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)の要件を満たしている必要があります。
[/tip]

`<form>` を作成する前に、`<amp-form>` 拡張機能に必要なスクリプトを追加する必要があります。そうしないと、ドキュメントが無効になります。値を送信する以外の目的で `input` タグを使用する場合（`<form>` の外部での入力など）、`amp-form` 拡張機能を読み込む必要はありません。

以下に、基本的なフォームの例を示します。

[example preview="inline" playground="true" imports="amp-form" template="amp-mustache"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"{% if not format=='email'%}  
    target="_top"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          required>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          required>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
    <div submit-success>
      <template type="amp-mustache">
        Subscription successful!
      </template>
    </div>
    <div submit-error>
      <template type="amp-mustache">
        Subscription failed!
      </template>
    </div>
  </form>
```
[/example]

# 属性 <a name="attributes"></a>

# target <a name="target"></a>

フォームの送信後にフォームの回答を表示する場所を指定します。値には `_blank` または `_top` を指定する必要があります。

# action <a name="action"></a>

フォームの入力を処理するサーバー エンドポイントを指定します。値には `https` URL（絶対または相対）を指定する必要があります。CDN へのリンクは指定できません。

* `method=GET` の場合: この属性または [`action-xhr`](#action-xhr) を使用します。
* `method=POST` の場合: [`action-xhr`](#action-xhr) 属性を使用します。

[tip type="note"] `target` 属性と `action` 属性は non-xhr GET リクエストにのみ使用します。AMP ランタイムはリクエストの作成に `action-xhr` を使用し、`action` と `target` は無視します。`action-xhr` が使用されていない場合、AMP は `action` エンドポイントに対する GET リクエストを作成し、`target` を使用して新しいウィンドウを開きます（`_blank` の場合）。`amp-form` 拡張機能が読み込みに失敗した場合、AMP ランタイムは `action` と `target` を使用するように切り替えることがあります。
[/tip]

# action-xhr <a name="action-xhr"></a>

フォームの入力を処理し、XMLHttpRequest（XHR）でフォームを送信するサーバー エンドポイントを指定します。XHR リクエスト（AJAX リクエストと呼ばれることもあります）では、ブラウザでページを完全に読み込んだり新しいページを開いたりしなくてもリクエストを作成できます。ブラウザは、[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) を使用（可能な場合）してバックグラウンドでリクエストを送信します。また、古いブラウザの場合は、代わりに [XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) を使用します。

[tip type="important"] XHR エンドポイントは、[CORS セキュリティ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)の要件を満たしている必要があります。
[/tip]

この属性は、`method=POST` の場合は必須、`method=GET` の場合はオプションです。

`action-xhr` の値には、`action` と同じまたは別のエンドポイントを指定できます。また、上記と同様の `action` に関する要件があります。

フォームの送信に成功した後にユーザーをリダイレクトする方法については、以下の[送信後のリダイレクト](#redirecting-after-a-submission)をご覧ください。

# その他のフォーム属性 <a name="other-form-attributes"></a>

その他の[フォーム属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)はすべてオプションです。

# custom-validation-reporting <a name="custom-validation-reporting"></a>

これは、カスタム検証レポート戦略を有効にして選択するためのオプションの属性です。`show-first-on-submit`、`show-all-on-submit`、`as-you-go` のいずれかを指定できます。

詳しくは、[カスタム検証](#custom-validations)をご覧ください。

# 入力とフィールド <a name="inputs-and-fields"></a>

**使用可**:

* フォーム関連のその他の要素: `<textarea>`、`<select>`、`<option>`、`<fieldset>`、`<label>`、`<input type=text>`、`<input type=submit>` など
* `<input type=password>`、`<input type=file>`（`<form method=POST action-xhr>` 内）
* [`amp-selector`](amp-selector.md)

**使用不可**:

* `<input type=button>`、`<input type=image>`
* 入力のフォーム関連の属性の大部分: `form`、`formaction`、`formtarget`、`formmethod` など

（今後、これらのルールの緩和が再検討される可能性があります。これらの属性が必要な場合は[お知らせください](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#suggestions-and-feature-requests)。また、ユースケースをご提示ください）

有効な入力とフィールドについて詳しくは、AMP 検証ツールの仕様で [amp-form のルール](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)をご覧ください。

# アクション <a name="actions"></a>

`amp-form` 要素では以下のアクションを使用できます。

| アクション | 説明 |
|--------|-------------|
| `submit` | 特定のアクション（リンクのタップ、[入力の変更に基づくフォームの送信](#input-events)など）が行われたときにフォームの送信をトリガーできます。 |
| `clear` | フォームの各入力の値を空にします。これにより、フォームの入力を簡単にやり直すことができます。 |

[tip type="read-on"] [AMP のアクションとイベント](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)の詳細をご確認ください。
[/tip]

# イベント <a name="events"></a>

`amp-form` では以下のイベントを使用できます。

| イベント | 発行のタイミング |
|-------|-------------|
| `submit` | フォームが送信され、送信が完了する前。 |
| `submit-success` | フォームの送信が完了し、レスポンスが成功したとき。 |
| `submit-error` | フォームの送信が完了し、レスポンスがエラーになったとき。 |
| `verify` | 非同期検証が開始されたとき。 |
| `verify-error` | 非同期検証が完了し、レスポンスがエラーになったとき。 |
| `valid` | フォームの検証ステータスが（[レポート戦略](#reporting-strategies)に従って）「有効」に変わったとき。 |
| `invalid` | フォームの検証ステータスが（[レポート戦略](#reporting-strategies)に従って）「無効」に変わったとき。 |

これらのイベントは [`on` 属性](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on)を介して使用できます。

以下の例では、`submit-success` と `submit-error` の両方のイベントをリッスンし、イベントに応じて各種のライトボックスを表示します。

```html

<form ...="" on="submit-success:success-lightbox;submit-error:error-lightbox">
</form>

```

[この例のコード全体](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html)をご覧ください。


# 入力イベント <a name="input-events"></a>

AMP では、子の `<input>` 要素で `change` イベントと `input-debounced` イベントを使用できます。このため、[`on` 属性](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on)を使用して、入力値が変更されたときに任意の要素のアクションを実行できます。

一般的な使用例として、入力の変更時にフォームを送信することができます（ラジオボタンを選択してアンケートに回答する、`select` 入力から言語を選択してページを翻訳するなど）。

[example preview="inline" playground="true" imports="amp-form"]
```html
<form id="myform"
    method="post"
    action-xhr="https://example.com/myform"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <input name="answer1"
          value="Value 1"
          type="radio"
          on="change:myform.submit">Value 1
      </label>
      <label>
        <input name="answer1"
          value="Value 2"
          type="radio"
          on="change:myform.submit">Value 2
      </label>
    </fieldset>
  </form>
```
[/example]

[この例のコード全体](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html)をご覧ください。

# アナリティクス トリガー <a name="analytics-triggers"></a>

`amp-form` 拡張機能は、[amp-analytics](amp-analytics.md) の設定でトラッキング可能な以下のイベントをトリガーします。

| イベント | 発行のタイミング |
|---------------------------|-----------------------------------|
| `amp-form-submit`         | フォーム リクエストが開始されたとき。 |
| `amp-form-submit-success` | 成功のレスポンスを受信したとき（レスポンスのステータスが `2XX` の場合など）。 |
| `amp-form-submit-error`   | 失敗のレスポンスを受信したとき（レスポンスのステータスが `2XX` でない場合など）。 |

次の例のように、これらのイベントを送信するようにアナリティクスを設定できます。

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "event": "https://www.example.com/analytics/event?eid=${eventId}",
        "searchEvent": "https://www.example.com/analytics/search?formId=${formId}&query=${formFields[query]}"
      },
      "triggers": {
        "formSubmit": {
          "on": "amp-form-submit",
          "request": "searchEvent"
        },
        "formSubmitSuccess": {
          "on": "amp-form-submit-success",
          "request": "event",
          "vars": {
            "eventId": "form-submit-success"
          }
        },
        "formSubmitError": {
          "on": "amp-form-submit-error",
          "request": "event",
          "vars": {
            "eventId": "form-submit-error"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

これらの 3 つのイベントでは、特定のフォームおよびフォーム内のフィールドに対応する一連の変数が生成されます。これらの変数はアナリティクスに使用できます。

たとえば、次のフォームには 1 つのフィールドがあります。

```html

<form id="submit_form" action-xhr="/comment" method="POST">
  <input type="text" name="comment">
    <input type="submit" value="説明">
    </form>
```

`amp-form-submit`、`amp-form-submit-success`、`amp-form-submit-error` のいずれかのイベントが発生すると、フォームで指定された値を含む以下の変数が生成されます。

  * `formId`
  * `formFields[comment]`

# 成功 / エラー レスポンスのレンダリング <a name="successerror-response-rendering"></a>

[amp-mustache](amp-mustache.md) などの[拡張テンプレート](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#templates)を使用することで、成功またはエラー レスポンスをフォームにレンダリングできます。また、[amp-bind](amp-bind.md) によるデータ バインディングと以下のレスポンス属性を使用して成功レスポンスをレンダリングすることもできます。

| レスポンス属性 | 説明 |
|-----------|---------------------|
| `submit-success` | レスポンスが成功の場合（ステータスが `2XX` の場合など）、成功メッセージの表示に使用できます。 |
| `submit-error` | レスポンスが失敗の場合（ステータスが `2XX` でない場合など）、送信エラーの表示に使用できます。 |
| `submitting` | フォームの送信中にメッセージを表示する場合に使用できます。この属性のテンプレートから、表示目的でフォームの入力フィールドにアクセスできます。`submitting` 属性の使用方法については、[以下のフォームの例](#example-submitting)をご覧ください。 |

# テンプレートを使用したレスポンスのレンダリング方法: <a name="to-render-responses-with-templating"></a>

* `<form>` 要素の*直接の子*にレスポンス属性を適用します。
* 子要素の内部で `<template></template>` タグまたは `<script type="text/plain"></script>` タグを使用してテンプレートを含めるか、`template="id_of_other_template"` 属性でテンプレートを参照することにより、子要素でレスポンスをレンダリングします。
* レスポンスの有効な JSON オブジェクトを `submit-success` と `submit-error` に指定します。成功とエラーのどちらのレスポンスにも `Content-Type: application/json` ヘッダーを含める必要があります。

<a id="example-submitting"></a>

# 例: フォームに成功、エラー、送信中のメッセージを表示する <a name="example-form-displays-success-error-and-submitting-messages"></a>

次の例では、フォーム内のインライン テンプレートにレスポンスがレンダリングされます。

```html
{% raw %}<form ...="">
  <fieldset>
    <input type="text" name="firstName">
      ...
    </fieldset>
    <div verify-error="">
      <template type="amp-mustache">
        There is a mistake in the form!
        {{#verifyErrors}}{{message}}{{/verifyErrors}}
    </template>
  </div>
  <div submitting="">
    <template type="amp-mustache">
      Form submitting... Thank you for waiting {{name}}.
    </template>
  </div>
  <div submit-success="">
    <template type="amp-mustache">
      Success! Thanks {{name}} for subscribing! Please make sure to check your email {{email}}
    to confirm! After that we'll start sending you weekly articles on {{#interests}}<b>{{name}}</b> {{/interests}}.
  </template>
</div>
<div submit-error="">
  <template type="amp-mustache">
    Oops! {{name}}, {{message}}.
  </template>
</div>
</form>
{% endraw %}
```

サイト運営者の `action-xhr` エンドポイントから以下の JSON レスポンスが返されます。

成功:

```json
{
  "name": "Jane Miller",
  "interests": [{"name": "Basketball"}, {"name": "Swimming"}, {"name": "Reading"}],
  "email": "email@example.com"
}
```

エラー:
```json
{
  "name": "Jane Miller",
  "message": "The email (email@example.com) you used is already subscribed."
}
```

`submit-success` 属性と `submit-error` 属性が指定された要素に設定されたテンプレートの ID を `template` 属性の値として使用することで、ドキュメント内で以前に定義した参照テンプレートにレスポンスをレンダリングできます。

```html
{% raw %}<template id="submit_success_template" type="amp-mustache">
  Success! Thanks {{name}} for subscribing! Please make sure to check your email {{email}}
to confirm! After that we'll start sending you weekly articles on {{#interests}}<b>{{name}}</b> {{/interests}}.
</template>
<template id="submit_error_template" type="amp-mustache">
  Oops! {{name}}, {{message}}.
</template></p>

<form ...="">
  <fieldset>
    ...
  </fieldset>
  <div submit-success="" template="submit_success_template"></div>
  <div submit-error="" template="submit_error_template"></div>
</form>
{% endraw %}
```

[この例のコード全体](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html)をご覧ください。

# データ バインディングを使用して成功レスポンスをレンダリングするには <a name="to-render-a-successful-response-with-data-binding"></a>

* [on 属性](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)を使用して、フォームの submit-success** 属性を [`AMP.setState()`](amp-bind.md#updating-state-with-amp.setstate%28%29) にバインドします。
* `event` プロパティを使用して、レスポンス データを収集します。
* 状態の属性を目的の要素に追加して、フォーム レスポンスをバインドします。

以下に、[`amp-bind`](amp-bind.md) を使用してフォームの `submit-success` レスポンスをレンダリングする例を示します。
```html
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Subscribe to our newsletter</p>
<form method="post"
      action-xhr="/components/amp-form/submit-form-input-text-xhr"
      target="_ top"
      on="submit-success: AMP.setState({'subscribe': event.response.name})">
  <div>
    <input type="text"
        name="name"
        placeholder="Name..."
        required>
    <input type="email"
      name="email"
      placeholder="Email..."
      required>
  </div>
  <input type="submit" value="Subscribe">
</form>
```

フォームの送信が成功すると、次のような JSON レスポンスが返されます。

```json
{
  "name": "Jane Miller",
  "email": "email@example.com"
}
```
その後、`amp-bind` により、`<p>` 要素のテキストが `subscibe` の状態と一致するように更新されます。

```html
...
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Thanks Jane Miller! You have successfully subscribed.</p>
...
```

# 送信後のリダイレクト <a name="redirecting-after-a-submission"></a>

`AMP-Redirect-To` レスポンス ヘッダーを設定し、リダイレクト URL を指定することにより、フォームの送信が成功した後にユーザーを新しいページにリダイレクトできます。リダイレクト URL には HTTPS URL を指定する必要があります。そうしないと、AMP によってエラーがスローされ、リダイレクトが行われなくなります。HTTP レスポンス ヘッダーはサーバーで設定されます。

`Access-Control-Expose-Headers` レスポンス ヘッダーを更新し、許可されるヘッダーのリストに `AMP-Redirect-To` を追加してください。これらのヘッダーについて詳しくは、[AMP の CORS セキュリティ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)をご覧ください。

*レスポンス ヘッダーの例:*

```text
AMP-Redirect-To: https://example.com/forms/thank-you
Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To
```

[tip type="success"] AMP By Example の[更新に伴うフォームの送信](https://ampbyexample.com/components/amp-form/#form-submission-with-page-update)と[商品ページ](https://ampbyexample.com/samples_templates/product_page/#product-page)をご確認ください。フォームの送信後にリダイレクトを使用する例が紹介されています。
[/tip]

# カスタム検証 <a name="custom-validations"></a>

`amp-form` 拡張機能では、`custom-validation-reporting` 属性をレポート戦略（`show-first-on-submit`、`show-all-on-submit`、`as-you-go` のいずれか）と組み合わせて使用することで、独自のカスタム検証 UI を作成できます。

フォームでカスタム検証を指定する方法は次のとおりです。

1. `form` の `custom-validation-reporting` 属性を[検証レポート戦略](#reporting-strategies)のいずれかに設定します。
1. 特別な属性でマークアップされた独自の検証 UI を指定します。AMP は特別な属性を検出すると、指定したレポート戦略に応じて適切なタイミングでその属性をレポートします。

以下に例を示します。

[example preview="inline" playground="true" imports="amp-form"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"
    custom-validation-reporting="show-all-on-submit"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          id="name5"
          required
          pattern="\w+\s\w+">
        <span visible-when-invalid="valueMissing"
          validation-for="name5"></span>
        <span visible-when-invalid="patternMismatch"
          validation-for="name5">
          Please enter your first and last name separated by a space (e.g. Jane Miller)
        </span>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          id="email5"
          required>
        <span visible-when-invalid="valueMissing"
          validation-for="email5"></span>
        <span visible-when-invalid="typeMismatch"
          validation-for="email5"></span>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
  </form>
```
[/example]

その他の例については、[examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html) をご覧ください。

検証メッセージに関しては、要素にテキスト コンテンツが含まれていない場合、ブラウザのデフォルトの検証メッセージが AMP によって入力されます。上の例では、`name5` の入力が空の状態で検証が開始されたとき（ユーザーがフォームを送信しようとしたとき）に、AMP によってブラウザの検証メッセージが `<span visible-when-invalid="valueMissing" validation-for="name5"></span>` に指定され、この `span` がユーザーに表示されます。

[tip type="important"] 入力の無効な状態の種類ごとに独自の検証 UI を用意する必要があります。そうしないと、エラー状態が存在しない場合、`custom-validation-reporting` がユーザーに表示されなくなります。有効な状態については、[W3C HTML の検証レポートに関する公式ドキュメント](https://www.w3.org/TR/html50/forms.html#validitystate)をご覧ください。
[/tip]

# レポート戦略 <a name="reporting-strategies"></a>

`custom-validation-reporting` 属性の以下のレポート オプションのいずれかを指定します。

# show-first-on-submit <a name="show-first-on-submit"></a>

`show-first-on-submit` レポート オプションは、デフォルトの検証が開始されたときのブラウザのデフォルトの動作によく似ています。検出された最初の検証エラーが表示され、そこで停止します。

# show-all-on-submit <a name="show-all-on-submit"></a>

`show-all-on-submit` レポート オプションでは、フォームの送信時にすべての無効な入力に対する検証エラーがすべて表示されます。このオプションは、検証の概要を表示する場合に便利です。

# as-you-go <a name="as-you-go"></a>

`as-you-go` レポート オプションを使用すると、入力の操作中に検証メッセージを確認できます。たとえば、ユーザーが無効なメールアドレスを入力すると、エラーがすぐに表示されます。値を修正すると、エラーが表示されなくなります。

# interact-and-submit <a name="interact-and-submit"></a>

`interact-and-submit` レポート オプションは、`show-all-on-submit` と `as-you-go` の動作を組み合わせたものです。操作後に個々のフィールドにエラーが即座に表示され、フォームの送信時にすべての無効なフィールドに関するエラーが表示されます。

# 検証 <a name="verification"></a>

HTML5 の検証で提供されるフィードバックは、ページで利用できる情報のみに基づくものです（値が特定のパターンと一致するかどうかなど）。`amp-form` 検証では、HTML5 の検証だけでは得られないユーザー フィードバックを得ることができます。たとえば、フォームで検証を使用すると、メールアドレスが登録済みかどうか、市区町村名フィールドと郵便番号フィールドが対応しているかどうかなどを確認できます。

以下に例を示します。
```html
{% raw %}<h4>検証の例</h4>
<form method="post" action-xhr="/form/verify-json/post" verify-xhr="/form/verify-json/post"{% if not format=='email'%}   target="_blank"{% endif %}>
  <fieldset>
    <label>
      <span>Email</span>
      <input type="text" name="email" required="">
      </label>
      <label>
        <span>Zip Code</span>
        <input type="tel" name="zip" required="" pattern="[0-9]{5}(-[0-9]{4})?">
        </label>
        <label>
          <span>City</span>
          <input type="text" name="city" required="">
          </label>
          <label>
            <span>Document</span>
            <input type="file" name="document" no-verify="">
            </label>
            <div class="spinner"></div>
            <input type="submit" value="送信">
            </fieldset>
            <div submit-success="">
              <template type="amp-mustache">
                <p>Congratulations! You are registered with {{email}}</p>
              </template>
            </div>
            <div submit-error="">
              <template type="amp-mustache">
                {{#verifyErrors}}
              <p>{{message}}</p>
              {{/verifyErrors}}
            {{^verifyErrors}}
          <p>Something went wrong. Try again later?</p>
          {{/verifyErrors}}
      </template>
    </div>
  </form>
{% endraw %}
```

フォームは、リクエストが検証リクエストであり、正式な送信ではないことをサーバーに伝えるために、フォームデータの一部として `__amp_form_verify` フィールドを送信します。これにより、検証と送信用に同じエンドポイントが使用されている場合には検証リクエストが保存されないことをサーバーが認識できます。

以下に、検証のエラー レスポンスの例を示します。
```json
  {
    "verifyErrors": [
      {"name": "email", "message": "That email is already taken."},
    {"name": "zip", "message": "The city and zip do not match."}
  ]
}
```

`verify-xhr` リクエストからフィールドを削除するには、`no-verify` 属性を入力要素に追加します。

その他の例については、[examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html) をご覧ください。

# 変数の置換 <a name="variable-substitutions"></a>

`amp-form` 拡張機能では、非表示の入力と `data-amp-replace` 属性が指定されている入力に対して、[プラットフォーム変数の置換](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)を行うことができます。各フォームの送信時に、`amp-form` がフォーム内の `input[type=hidden][data-amp-replace]` をすべて検出し、その `value` 属性に対して変数置換を適用して、置換の結果で値を置き換えます。

使用する変数のスペース区切りの文字列を `data-amp-replace` で指定することにより、各入力の置換に使用する変数を指定する必要があります（以下の例を参照）。AMP は、明示的に指定されていない変数の置換を行いません。

以下に、置換の前後の入力の例を示します（アナリティクスではなく変数置換のプラットフォーム構文を使用する必要があることに注意してください）。
```html
<!-- Initial Load -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: CANONICAL_URL - RANDOM - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="CLIENT_ID(myid)"
        data-amp-replace="CLIENT_ID">
  ...
</form>
```

ユーザーがフォームを送信しようとすると、AMP が変数の解決を試み、すべてのフィールドの `value` 属性を適切に置換して更新します。XHR の送信ではたいてい、すべての変数の置換と解決が行われます。ただし、XHR 以外の GET 送信では、非同期で解決する必要がある値は、あらかじめ解決されていないことが原因で利用できない可能性があります。たとえば `CLIENT_ID` は、あらかじめ解決およびキャッシュされていない場合は解決されません。

```html
<!-- User submits the form, variables values are resolved into fields' value -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: https://example.com/hello - 0.242513759125 - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="amp:asqar893yfaiufhbas9g879ab9cha0cja0sga87scgas9ocnas0ch"
        data-amp-replace="CLIENT_ID">
    ...
</form>
```

上の `CANONICAL_HOSTNAME` は、最初のフィールドの `data-amp-replace` 属性でホワイトリストに登録されていないため、置換されていません。

その後は送信のたびに置換が行われます。詳しくは、[AMP での変数の置換](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)をご覧ください。

# ポリフィル <a name="polyfills"></a>

`amp-form` 拡張機能には、一部のブラウザに実装されていない動作や機能、または次のバージョンの CSS で実装される動作や機能を補うためのポリフィルが用意されています。

# 無効な送信のブロックと検証メッセージのバブル <a name="invalid-submit-blocking-and-validation-message-bubble"></a>

現在（2016 年 8 月）、WebKit ベースのエンジンを使用しているブラウザは、無効なフォームの送信をサポートしていません。これには、すべてのプラットフォームの Safari と、すべての iOS ブラウザが含まれます。`amp-form` 拡張機能は、無効な送信をすべてブロックする動作をサポートしており、無効な入力に対して検証メッセージのバブルを表示します。

# ユーザー操作の疑似クラス <a name="user-interaction-pseudo-classes"></a>

`:user-invalid` および `:user-valid` 疑似クラスは、[将来の CSS セレクタ 4 の仕様](https://drafts.csswg.org/selectors-4/#user-pseudos)に含まれています。フックを改良し、フィールドが有効か無効かに関係なく、いくつかの条件に基づいてそのスタイルを設定できるようにするために導入されたものです。

`:invalid` と `:user-invalid` の主な違いの 1 つは、要素に適用されるタイミングです。`:user-invalid` クラスは、ユーザーがフィールドに対して重要な操作を行った後に適用されます（フィールドへの入力、フィールドのぼかしなど）。

`amp-form` 拡張機能には、これらの疑似クラスのポリフィルを提供する[クラス](#classes-and-css-hooks)が用意されています。`amp-form` 拡張機能は、これらのクラスを祖先の `fieldset` 要素や `form` にも伝播します。

# `<textarea>` の検証 <a name="-validation"></a>

正規表現マッチングは、`<textarea>` を除くほとんどの入力要素でネイティブにサポートされている一般的な検証機能です。この機能にはポリフィルが用意されており、`<textarea>` 要素に `pattern` 属性を指定できます。

amp-form では、`<textarea>` 要素に `autoexpand` 属性を指定できます。この属性を使用すると、テキスト領域を拡大および縮小させることができ、ユーザーがフィールドの最大サイズまで入力できるようになります。ユーザーがフィールドのサイズを手動で変更すると、autoexpand が動作しなくなります。

```html
<textarea autoexpand></textarea>
```

# スタイル設定 <a name="styling"></a>

# クラスと CSS フック <a name="classes-and-css-hooks"></a>

`amp-form` 拡張機能には、サイト運営者がフォームと入力のスタイルを設定するためのクラスと CSS フックが用意されています。

以下のクラスを使用すると、フォームの送信状態を指定できます。

* `.amp-form-initial`
* `.amp-form-verify`
* `.amp-form-verify-error`
* `.amp-form-submitting`
* `.amp-form-submit-success`
* `.amp-form-submit-error`

以下のクラスは、[ユーザー操作の疑似クラス用のポリフィル](#user-interaction-pseudo-classes)です。

* `.user-valid`
* `.user-invalid`

サイト運営者はこれらのクラスを使用して入力とフィールドセットのスタイルを設定し、ユーザー アクションに対応することができます（ユーザーが無効な入力をぼかした後に赤枠で強調するなど）。

これらのクラスの[使用例](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html)をご覧ください。

[tip type="success"] あらかじめスタイルが設定された、レスポンシブな AMP フォームの要素については、[AMP Start](https://ampstart.com/components#form-elements) をご覧ください。これらの要素は AMP ページで使用することができます。
[/tip]

# セキュリティ上の考慮事項 <a name="security-considerations"></a>

# XSRF に対する保護 <a name="protecting-against-xsrf"></a>

[AMP CORS 仕様](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)を遵守するだけでなく、[状態の変化に関するリクエストの処理](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)#processing-state-changing-requests)のセクションに特に注意して、[XSRF 攻撃](https://en.wikipedia.org/wiki/Cross-site_request_forgery)から保護してください。この攻撃では、攻撃者が現在のユーザー セッションを利用して、ユーザーが気付かないうちに不正なコマンドを実行できます。

一般に、ユーザーからの入力を受け付ける場合は以下の点に注意してください。

* 状態の変化に関するリクエストには POST のみを使用します。
* XHR 以外の GET リクエストは、ナビゲーション（検索など）用にのみ使用します。
    * XHR 以外の GET リクエストは正確なオリジンやヘッダーを受け取らないため、バックエンドは上記のメカニズムでは XSRF から保護することができません。
    * 一般に、XHR GET リクエストまたは XHR 以外の GET リクエストは、ナビゲーションまたは情報取得用にのみ使用します。</li>
* XHR 以外の POST リクエストは、AMP ドキュメントでは使用できません。これは、このリクエストでの `Origin` ヘッダーの設定方法がブラウザ間で統一されていないためです。また、XSRF からの保護では、このヘッダーのサポートに関する問題が生じます。このヘッダーは見直しが行われ、導入が遅れる可能性があります。このヘッダーが必要だとお考えの場合は、問題を報告してください。
