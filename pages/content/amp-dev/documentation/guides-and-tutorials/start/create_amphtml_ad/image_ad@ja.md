---
"$title": 画像広告の作成
"$order": '1'
description: 広告には、広告サイトへのハイパーリンクが付いた単純な画像を使用します。画像の表示には amp-img タグを使用します。以下は、そのコードです。
---

AMPTHLML 広告ドキュメントの `<body>` に HTML と AMP タグを含めることができますが、すべてのタグが許可されているわけではありません。許可されているタグのリストについて、[AMPHTML 広告の仕様](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins)を参照子くてください。

広告には、広告サイトへのハイパーリンクが付いた単純な画像を使用します。画像の表示には [`amp-img`](../../../../documentation/components/reference/amp-img.md) タグを使用します。以下は、そのコードです。

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
</body>
```

ブラウザで html ファイルを開くと、以下の画像が表示されます。

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

画像広告をクリックすると、広告サイト（AMP プロジェクトサイト）に移動します。
