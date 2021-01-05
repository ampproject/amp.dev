---
"$title": AMP メールの検証
"$order": '1'
author: CrystalOnScript
formats:
- email
---

AMP メールはリッチインタラクティブと動的なエクスペリエンスをユーザーに提供するために AMP JS ライブラリを使用しています。このため、メールプロバイダはメッセージを検証する必要があります。有効な AMP マークアップによって、メールの安全性を確保し、ユーザーエクスペリエンスの標準を超えた体験を提供することができます。

# メールが有効な AMP であることを確認するには、どうすればよいですか？

メールを有効な AMP メールであることを検証するには、いくつかの方法があります。これらはすべて全く同じ結果をだすため、開発スタイルに最も適したものを選択してください。

## ウェブベースの検証ツール

AMP の[ウェブベースの検証ツール](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL)は AMP for Email プラットフォームをサポートしています。ウェブベースの検証ツールは、AMP メールをツールに張り付けて使用します。検証エラーは、インラインで直接フラグされます。

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}

## コマンドライン検証ツール

[AMP HTML 検証用のコマンドラインツール](https://www.npmjs.com/package/amphtml-validator)を使用して、AMP メールのファイルを検証できます。

### インストール

1. システムに、[Node.js とそのパッケージマネージャ「npm」](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)があることを確認します。
2. 次のコマンドを実行して、AMP HTML 検証用コマンドラインツールをインストールします。`npm install -g amphtml-validator`

### 使用方法

コマンドラインツールをインストールしたら、`<amphtml file>` を AMP メールコンテンツを含むファイルに置き換えてから次のコマンドを実行します。

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

メールが有効である場合、コマンドラインツールに `PASS` の結果が表示されます。無効である場合は、検出されたエラーが表示されます。

## AMP Playground

AMP ペールは、[AMP Playground](https://playground.amp.dev/?runtime=amp4email)を使って検証することもできます。ウェブベースの検証ツールと同様に、AMP メールをツールに張り付けると、Playground が検証エラーをインラインに直接フラグします。

### 送信されたメールの検証

記述した AMP メールのマークアップをこのページで説明したツールで検証していても、送信後に無効となる場合がたまにあります。これが起きる最も一般的な理由は、メールを ESP に送信した後に、[ESP](https://amp.dev/support/faq/email-support/) がメールのマークアップを変更して無効化するためです。たとえば、ESP が SparkPost であり、SparkPost で HTTPS 追跡ピクセルを構成していない場合、SparkPost は安全でない HTTP 追跡ピクセルをメールに追加します。AMP メールでは HTTPS 画像のみを使用できるため、AMP メールは無効になってしまいます。

受信トレイに送信されたメールが有効な AMP であるかどうかを確認するには、以下のように行います。

1. メールクライアントから、[AMP メールを `.eml` ファイルとしてダウンロードします。](https://www.codetwo.com/kb/export-email-to-file)
2. [AMP Playground](https://playground.amp.dev/?runtime=amp4email) を開きます。
3. "IMPORT EMAIL" をクリックし、ダウンロードした `.eml` ファイルを選択します。

Playground は、ダウンロードした AMP メールをインラインエディタにインポートして、検証エラーをフラグします。

# メールが有効でない場合は、どうなりますか？

AMP Validator は、開発中に便利なツールというだけではありません。AMP メールをサポートするメールプロバイダは、指定された HTML または Plain Text MIME タイプに自動的にフォールバックするため、AMP メールは、Validator に合格する場合にのみ送信するようにしてください。
