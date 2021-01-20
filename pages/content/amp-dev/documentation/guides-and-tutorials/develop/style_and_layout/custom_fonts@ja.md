---
"$title": カスタムフォントの追加
"$order": '6'
description: AMP ページでは外部のスタイルシートを使用できませんが、カスタムフォントは例外です。ページにカスタムフォントを埋め込む方法には ...
formats:
- websites
- ads
- stories
author: pbakaus
---

AMP ページでは外部のスタイルシートを使用できませんが、カスタムフォントは例外です。ページにカスタムフォントを埋め込む方法は 2 つあります。

1. `<link>` タグを使用する（ホワイトリストに登録されているフォントプロバイダのみ）
2. `@font-face` を指定する（制限なし、すべてのフォントで可能）

### 1. `<link>`

以下のように `<link>` タグを使用します（通常はページの head 内に指定します）。

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

次のプロバイダがホワイトリストに登録されており、リンクタグ経由でのフォント配信が許可されています。

- Typography.com: **https://cloud.typography.com**
- Fonts.com: **https://fast.fonts.net**
- Google Fonts: **https://fonts.googleapis.com**
- Typekit: **https://use.typekit.net**
- Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

### 2. `@font-face`

または、AMP スタイルシート内で [<code>@font-face</code>](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) を使用することもできます。

[sourcecode:html]
<style amp-custom>
  @font-face {
    font-family: "Bitstream Vera Serif Bold";
    src: url("https://somedomain.org/VeraSeBd.ttf");
  }

  body {
    font-family: "Bitstream Vera Serif Bold", serif;
  }
</style>
[/sourcecode]

[tip type="note"] <strong>注意:</strong>   `@font-face` を介して追加されるフォントは、HTTP または HTTPS スキームで取得する必要があります。[/tip]
