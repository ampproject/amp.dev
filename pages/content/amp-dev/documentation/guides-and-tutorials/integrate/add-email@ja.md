---
'$title': 既存のメールへの AMP の追加
$order: 1
author: CrystalOnScript
formats:
  - email
---

AMP for Email 形式は、新しい MIME パートとして組み込まれます。AMP for Email をサポートするプロバイダにメールが送信されれば表示されますが、そうでなくでも心配はいりません！プロバイダは HTML またはプレーンテキストのフォールバックを表示します。このガイドを使用して、メールに AMP を含めましょう。

# AMP MIME パートを含める

メールは、[MIME ツリー](https://en.wikipedia.org/wiki/MIME)として構成されています。このツリーには、メッセージ本文と添付ファイルが含まれます。メールに AMP を含めるには、コンテンツタイプ `text/x-amp-html` の新しい MIME パートを追加する必要があります。

AMP MIME パートは、`multipart/alternative` ノードの配下にネストされている必要があり、既存の `text/html` または `text/plain` パートとともに存在する必要があります。こうすることで、メールのメッセージをすべてのクライアントでレンダリングさせることができます。

```html
From: Person A
<persona@example.com>
  To: Person B
  <personb@example.com>
    Subject: An AMP email! Content-Type: multipart/alternative;
    boundary="001a114634ac3555ae05525685ae" --001a114634ac3555ae05525685ae
    Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes Hello
    World in plain text! --001a114634ac3555ae05525685ae Content-Type:
    text/x-amp-html; charset="UTF-8"

    <!DOCTYPE html>
    <html ⚡4email data-css-strict>
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
        Hello World in AMP!
      </body>
    </html>
    --001a114634ac3555ae05525685ae-- Content-Type: text/html; charset="UTF-8"

    <span>Hello World in HTML!</span>
    --001a114634ac3555ae05525685ae</personb@example.com
  ></persona@example.com
>
```

[tip type="important"] 一部のメールクライアントは最後の MIME パートのみをレンダリングします。メールを確実にレンダリングするには、`text/x-amp-html` MIME パートを `text/html` MIME パートの前に配置してください。[/tip]

# 受信者が AMP メールを転送したり、それに返信したりするとどうなりますか？

ユーザーが AMP メールを転送したり、それに返信したりすると、MIME ツリーから `text/x-amp-html` パートが取り除かれます。MIME タイプをサポートするクライアントに AMP メールを送信する場合でも、HTML パートに代替コンテンツを提供しておくことが重要なのはこのためです。
