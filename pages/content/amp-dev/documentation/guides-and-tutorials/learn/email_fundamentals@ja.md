---
'$title': AMP for Email の基礎
$order: 1
description: 有効な AMP メールを記述し始めるために知っておく必要のあること。
author: CrystalOnScript
formats:
  - email
---

AMP を使用し慣れている方には朗報です！AMP for Email は AMP HTML ライブラリのサブセットにすぎません。AMP のことをよく知らない方にも朗報です！有効な AMP メールを記述し始めるために知っておく必要のあることすべてが、このガイドで説明されています！

## 必要なマークアップ

AMP メールは、外観的に従来の HTML メールに似ていますが、異なる点がいくつかあります。以下は、有効な AMP メールを作成するために必要な最小限のマークアップを示しています。

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    Hello, AMP4EMAIL world.
  </body>
</html>
```

AMP メールをサポートするメールプロバイダーは、ユーザーに楽しく安全なエクスペリエンスを提供できるように、セキュリティチェックを設定しています。AMP で構築されたメールは、以下のすべての要件を満たす必要があります。

- `<!doctype html>` doctype で開始すること。これは、HTML の標準でもあります。
- トップレベルの `<html amp4email>` タグ、または非常に見栄えのよいメールの場合は `<html ⚡4email>` タグを含めること。このタグは、ドキュメントを AMP メールとして扱うように定義しています。
- `<head>` タグと `<body>` タグの両方を定義すること。これは HTML ではオプションですが、AMP では元の状態を保持する必要があります！
- `<meta charset="utf-8>` タグを `<head>` タグの最初の子として含めること。これはページのエンコーディングを識別するタグです。
- AMP ライブラリは、 `<head>` タグに配置された `<script async src="https://cdn.ampproject.org/v0.js"></script>` タグにインポートすること。これがない場合、AMP から得られる優れた動的機能が機能しません！これは、`<head>` の `<meta charset="utf-8">` の直下に、なるべく早い段階で含めることをベストプラクティスとしています。
- `<head>` に AMP for Email ボイラープレートを配置し、最初に AMP ライブラリが読み込まれるまでメールコンテンツを非表示にすること。

```html
<head>
  ...
  <style amp4email-boilerplate>
    body {
      visibility: hidden;
    }
  </style>
</head>
```

### AMP 固有タグの置換

AMP for Email ライブラリは AMP HTML ライブラリのサブセットであるため、同じルールの多くが適用されます。リソースを多く使用する HTML タグの代わりに AMP 固有のタグを使用し、そのタグには幅と高さを定義する必要があります。このようにすることで、AMP ボイラープレートは、ユーザーのデバイスでコンテンツがどのように表示されるかを判定するまで、そのコンテンツを非表示にすることができます。

#### 画像

ページを効果的に表示するには、すべての `<img>` タグを [`<amp-img>`](../../../documentation/components/reference/amp-img.md) に置き換えてください。`<amp-img>` タグには、幅と高さが定義されている必要があり、[AMP のレイアウトシステム](amp-html-layout/index.md)をサポートします。

```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

`<amp-img>` タグには、レスポンシブデザインを制御し、フォールバックを設定するための強力な方法が組み込まれています。

[tip type="note"] AMP の[レイアウトとメディアクエリ](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email)、および [画像フォールバック](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)の設定方法について、詳細をご覧ください。[/tip]

#### GIF

AMP は、GIF 画像の特殊タグとして、[`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email) を作成しました。これにより、AMP ランタイムは、アニメーションが画面外にある場合の CPU 使用率を抑制することができます。`<amp-img>` と同様に、幅と高さが定義されており、要素に終了タグを含める必要があります。

```
<amp-anim
    width="400"
    height="300"
    src="my-gif.gif">
</amp-anim>
```

さらに、`src` ファイルが読み込み中であるときに表示するオプションの `placeholder` 子要素と、AMP レイアウトシステムもサポートしています。

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## スタイル付きのメール <a name="emails-with-style"></a>

すべてのメールクライアントと同様に、AMP でもインライン `style` 属性を使用できますが、メールの head の `<style amp-custom>` タグ内で CSS もサポートしています。

```html
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
</style>
...
</head>
```

HTML メールと同様に、AMP for Email でも、一部の CSS セレクタとプロパティをサポートしています。

AMP をサポートするメールクライアントで許可されている CSS の全リストについては、「[AMP for Email 対応 CSS](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md)」を参照してください。

[tip type="important"] AMP では、スタイリングに 75,000 バイトのサイズ制限を設けています。 [/tip]

## 許可されている AMP コンポーネント

AMP コンポーネントの動的でビジュアルなインタラクティビティ機能こそ、AMP メールを未来のメールにする機能です。

AMP for Email 仕様の一部として、[AMP for Email の対応コンポーネントリスト](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md)が提供されています。

## リクエストの認証

動的なパーソナライズメールコンテンツには、ユーザーの認証が必要ですが、ユーザーデータを保護するために、AMP メールから送信されるすべての HTTP リクエストは、プロキシされて cookie が取り除かれる可能性があります。

AMP メールから送信されたリクエストを認証するには、アクセストークンを使用することができます。

### アクセストークン

アクセストークンを使用して、ユーザーを認証できます。アクセストークンはメール送信者によって提供・確認されます。送信者はトークンを使用して、AMP メールにアクセスできるユーザーのみがそのメールに含まれるリクエストを行えるようにします。アクセストークンは、暗号的に安全で、時間とスコープが制限されている必要があります。これらはリクエストの URL 内に含められます。

以下の例は、`<amp-list>` を使用して認証データを表示します。

```html
<amp-list
  src="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  height="300"
>
  <template type="amp-mustache"> ... </template>
</amp-list>
```

同様に、`<amp-form>` を使用する際は、アクセストークンを `action-xhr` URL に配置します。

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

#### 例

以下の例では、ログイン済みのユーザーがアカウントにメモを追加し、後で閲覧することのできる架空のメモ取りサービスを使用しています。このサービスはユーザー（`jane@example.com`）に、以前にとったメモのリストが記載されたメールを送信します。ユーザーの最新のメモのリストは、JSON 形式でエンドポイント（`https://example.com/personal-notes`）にあります。

メールを送信する前に、サービスは暗号的に安全な使用制限付きのアクセストークンを `jane@example.com: A3a4roX9x` 用に生成します。このアクセストークンは、URL クエリ内の `exampletoken` フィールド名に含まれます。

```html
<amp-list
  src="https://example.com/personal-notes?exampletoken=A3a4roX9x"
  height="300"
>
  <template type="amp-mustache">
    <p>{{note}}</p>
  </template>
</amp-list>
```

エンドポイント `https://example.com/personal-notes` は、exampletoken パラメータの検証とそのトークンに関連付けられたユーザーの検索を行います。

### 使用制限付きのアクセストークン

使用制限付きアクセストークンは、メッセージが送信されたユーザーによってアクションが実行されたことを保証することで、リクエストのスプーフィングや[リプレイアタック](https://en.wikipedia.org/wiki/Replay_attack)に対する保護を提供しています。アクションが呼び出されたときに一意のトークンパラメータをリクエストパラメータに追加して検証することで、保護を実現しています。

トークンパラメータは、特定のアクションと特定のユーザーのみが使用できるキーとして生成されます。そのため、リクエストアクションが実行される前に、トークンが有効であり、そのユーザーに対して生成されたものと一致していることを確認しなければなりません。トークンが一致している場合は、アクションを実行することができ、そのトークンはそれ以降無効となります。

アクセストークンは、HttpActionHandler の URL プロパティの一部としてユーザーに送信されます。たとえば、アプリケーションが `http://www.example.com/approve?requestId=123` で承認リクエストを処理する場合、それに `accessToken` を追加して、`http://www.example.com/approve?requestId=123&accessToken=xyz` に送信されたリクエストをリスンすることを検討してください。

`requestId=123` と `accessToken=xyz` の組み合わせは、前もって生成する必要のあるもので、`accessToken` が `requestId` から除去されないことを確実にする必要があります。`requestId=123` が伴っていても `accessToken` が不足している承認リクエストや、`accessToken` が `xyz` と同等でない承認リクエストは拒否されなければなりません。このリクエストは通ったら、同じ ID とアクセストークンを使用する以降のリクエストも、拒否される必要があります。

## さまざまなメールクライアントでのテスト

AMP for Email をサポートするメールクライアントは、統合に役立つ独自のドキュメントとテストツールを提供しています。

詳細と、メールクライアント固有のドキュメントへのリンクについては、「[AMP メールのテスト](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)」を参照してください。
