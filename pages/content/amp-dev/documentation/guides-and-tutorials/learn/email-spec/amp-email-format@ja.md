---
'$title': AMP for Email 形式
$order: 1
formats:
  - email
teaser:
  text: '必要なマークアップ '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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

AMP は、モバイルクライアント向けの超高速ウェブページを開発できることで知られているテクノロジーです。AMP は、パフォーマンスとセキュリティへの焦点を追加した機能を簡単に有効化できる、JavaScript 支援 HTML タグ一式を指します。カルーセル、レスポンシブフォーム要素、リモートエンドポイントからのフレッシュコンテンツの取得など、さまざまな機能を備えた [AMP コンポーネント](https://amp.dev/documentation/components/)が用意されています。

AMP for Email 形式は、メールメッセージに使用できる [AMP コンポーネントのサブセット](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md)です。AMP メールの受信者は、直接メール内で AMP コンポーネントを閲覧し、対話することができます。

## 必要なマークアップ

以下のコードは、有効な AMP メールメッセージを構成する最小限のマークアップを示します。

[sourcecode:html]

<!DOCTYPE html>
<html ⚡4email>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

AMP メールメッセージには、以下の要件があります。

- <a name="dctp"></a>先頭に `<!doctype html>` doctype を指定します。[🔗](#dctp)
- <a name="ampd"></a>最上位階層のタグを `<html ⚡4email>` タグにします（`<html amp4email>` も使用できます）。[🔗](#ampd)
- <a name="crps"></a>`<head>` と `<body>` タグが必要です（HTML ではオプションです）。[🔗](#crps)
- <a name="chrs"></a>`<meta charset="utf-8">` タグを head タグの最初の子要素とします。[🔗](#chrs)
- <a name="scrpt"></a>head タグ内に `<script async src="https://cdn.ampproject.org/v0.js"></script>` タグを含めます。[🔗](#scrpt)
- <a name="boilerplate"></a>head タグ内に amp4email ボイラープレート（`<style amp4email-boilerplate>body{visibility:hidden}</style>`）を含めて、最初に AMP JS が読み込まれるまでコンテンツを非表示にします。[🔗](#boilerplate)

全 AMPHTML マークアップは 200,000 バイト以内である必要があります。

## 構造とレンダリング <a name="structure-and-rendering"></a>

AMP for Email は、[RFC 1521, section 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3) に定義される標準の `multipart/alternative` [MIME](https://en.wikipedia.org/wiki/MIME) サブタイプに依存しています。

_詳細は、「[AMP メールの構造とレンダリング](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-structure.md)」を参照してください。_

## サポートされている AMP コンポーネント <a name="supported-amp-components"></a>

_「[AMP for Email 対応コンポーネント](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md)」を参照してください。_

## HTML の要件 <a name="html-requirements"></a>

_「[AMP for Email でサポートされている HTML](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-html.md)」を参照してください。_

## CSS の要件 <a name="css-requirements"></a>

### サポートされているセレクタとプロパティ<a name="supported-selectors-and-properties"></a>

_「[AMP for Email でサポートされている CSS](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-css.md)」を参照してください。_

### AMP ドキュメントでの CSS の指定 <a name="specifying-css-in-an-amp-document"></a>

AMP ドキュメントのすべての CSS は、head 内の `<style amp-custom>` タグまたはインラインの `style` 属性に含める必要があります。

[sourcecode:html]
...

<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>

...

</head>
[/sourcecode]

注意: 全 `<style>` タグは、50,000 バイト以内である必要があります。これは、バリデータによってチェックされます。

## ドキュメントの寸法 <a name="document-dimensions"></a>

- **最適な幅**: 800px 以下（幅がこれより広い場合、一部のクライアントのコンテンツが予期されない状態で切り捨てられる場合があります）。

- **高さ**: 可変。クライアント側でユーザーがコンテンツをスクロールできます。

## 検証 <a name="validation"></a>

AMP の既存の検証ツールを使用して、メールメッセージが AMP for Email 形式の厳しい条件を満たしていることを確認できます。

詳細は、「[AMP メールの検証](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/)」を参照してください。

## プライバシーとセキュリティ <a name="privacy-and-security"></a>

### メールの開封と対話の追跡 <a name="tracking-email-opens-and-interaction"></a>

AMPHTML では、HTML メールと同様に、ピクセル追跡テクニックを使用して、メールの開封状態を追跡することができます。ユーザーが外部サービスから発行するデータへのリクエストも、ユーザーがメッセージと対話していることを示しますが、メールクライアントに、リモート画像の読み込みやその他の外部リクエストを無効化できる機能が備わっている場合があります。

### AMP 固有の分析 <a name="amp-specific-analytics"></a>

以下の AMP 固有の分析テクニックはサポートされていません。

- [AMP `CLIENT_ID`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [変数置換 ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### コンポーネント固有の考慮事項 <a name="component-specific-considerations"></a>

[`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) または [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) 内で画像をリクエストすることによって、ユーザーがメッセージと対話していることが送信者に示されます。

[`<amp-form>`](https://amp.dev/documentation/components/amp-form) でのリダイレクトは、ランアイム時に使用できません。

## フィードバックとサポート <a name="feedback--support"></a>

AMP for Email のサポートとフィードバックについては、次のチャンネルをご利用ください: [ongoing-participation](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#ongoing-participation)
