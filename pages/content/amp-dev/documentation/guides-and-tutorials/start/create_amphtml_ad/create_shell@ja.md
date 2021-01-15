---
"$title": 広告用シェルの作成
"$order": '0'
description: 使い慣れているテキストエディタで、my-amphtml-ad.html という HTML ファイルを作成します。以下の HTML マークアップをそのファイルにコピーします。
---

[AMPHTML 広告に必要な HTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) は、[AMP ページに必要な AMPHTML](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md) が変形したものです。AMPHTML 広告のシェルを作成して、必要となるコードに慣れましょう。

使い慣れているテキストエディタで、**`my-amphtml-ad.html`** という HTML ファイルを作成します。以下の HTML マークアップをそのファイルにコピーします。

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>My amphtml ad</title>
  <meta name="viewport" content="width=device-width">
</head>
<body>
</body>
</html>
```

このマークアップは、有効な基本の HTML ファイルのマークアップです。`meta` ビューポートタグが含まれているところに注目してください。[レスポンシブビューポート](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#controlling-the-viewport)を使用しています。

では、この HTML を AMPHTML 広告になるように変更しましょう。

`<html>` タグに、`⚡4ads` 属性を追加します。この属性は、ドキュメントを AMPHTML 広告として識別するものです。または、`amp4ads` 属性を指定することもできます。これも有効です。

```html
<!doctype html>
<html ⚡4ads>
<head>
...
```

[tip type="note"] **注意 –** AMP ページとは異なり、[AMPHTML 広告には `<link rel="canonical">` タグ](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#amphtml-ad-format-rules)は必要ありません。 [/tip]

AMPHTML 広告には独自の AMP ランタイムバージョンが必要であるため、以下の `<script>` タグをドキュメントの `<head>` セクションに追加します。

```html
<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
```

AMPHTML 広告クリエイティブには、AMP ページとは異なる非常に単純な[ボイラープレート](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#boilerplate)スタイル行が必要です。以下のコードを `<head>` セクションに追加します。

```html
<style amp4ads-boilerplate>body{visibility:hidden}</style>
```

AMPHTML 広告にスタイルを指定するには、<code><head></code> セクションに <code><style amp-custom></style></code> を使用し、CSS をインラインで AMPHTML ドキュメントに埋め込む必要があります。ここでは基本的な画像広告をレンダリングしており、CSS は必要ないため、このタグは追加しません。

[tip type="note"] **注意–** AMPHTML 広告におけるインラインスタイルシートの最大サイズは *20 キロバイト*です。詳細は、[AMPHTML 広告仕様の CSS 要件](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#css)を参照してください。 [/tip]

以下は、HTML ファイルの全コードです。

```html
<!doctype html>
<html ⚡4ads>
<head>
  <meta charset="utf-8">
  <title>My amphtml ad</title>
  <meta name="viewport" content="width=device-width">
  <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
  <style amp4ads-boilerplate>body{visibility:hidden}</style>
</head>
<body>
</body>
</html>
```

これで、AMPHTML ファイルは完成しましたが、まだ中身がありませんので、画像広告を作成することにしましょう。
