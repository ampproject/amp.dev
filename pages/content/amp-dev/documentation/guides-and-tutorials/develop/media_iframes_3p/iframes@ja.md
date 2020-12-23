---
"$title": iframe の追加
"$order": '10'
description: ここでは、ページにインクルードメディアコンテンツを表示したり、iframe を使用して AMP の制限を受けずに高度なコンテンツを表示したりする方法について解説します。
formats:
- ウェブサイト
components:
- iframe
author: pbakaus
contributors:
- Meggin
- bpaduch
---

ここでは、ページにインクルードメディアコンテンツを表示したり、iframe を使用して AMP の制限を受けずに高度なコンテンツを表示したりする方法について解説します。

## 基本

[`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) 要素を使用すると、ページに iframe を表示できます。

iframe は、メインページのコンテキストでサポートされていないコンテンツ（ユーザー作成の JavaScript を必要とするコンテンツなど）を AMP で表示する場合に特に便利です。

### `amp-iframe` の要件

- 最初のビューポートが上部から **600 ピクセル** または **75%** 以上離れていること。
- HTTPS 経由でのみリソースをリクエストできること（allow-same-origin を指定している場合を除き、リソースのオリジンはコンテナとは別である必要があります）。

[tip type="read-on"] <strong>参考情報 –</strong> <a><code>amp-iframe</code> の仕様</a>もご覧ください。[/tip]

### Include the script

ページに [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) を含めるには、 まず `<head>` に以下のスクリプトを追加します。これにより、拡張コンポーネントの追加コードが読み込まれます。

[sourcecode:html]
<script async custom-element="amp-iframe"
  src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

### Write the markup

以下の例では、レスポンシブ [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) を作成して、<a>Google Maps Embed API</a> を通じて Google マップを組み込んでいます。

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe">
</amp-iframe>
```

## プレースホルダの使用

`placeholder` 属性を指定した要素（[`amp-img`](../../../../documentation/components/reference/amp-img.md) 要素など）を [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) に追加して、iframe が表示できる状態になるまでプレースホルダとしてレンダリングされるようにすると、[`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) をドキュメントの一番上に表示することが可能です。

[tip type="read-on"] <strong>参考情報 –</strong>: プレースホルダについて詳しくは、「<a>プレースホルダを含む iframe</a>」をご覧ください。 [/tip]

プレースホルダを使用した例:

```html
<amp-iframe width="400" height="225"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://giphy.com/embed/OWabwoEn7ezug">
  <amp-img placeholder layout="fill"
      src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>
```

次のようにレンダリングされます。

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## 例

より高度な [<code>amp-iframe</code>](../../../../documentation/components/reference/amp-iframe.md) の例については、<a>AMP By Example</a> をご覧ください。
