---
'$title': フォントの追加
$order: 6
description: 'AMP ページにカスタムフォントを埋め込むには、次の 2 つの方法を利用できます。1. <link> タグを使用する: ホワイトリストに登録されているフォントプロバイダのフォントのみ ...'
---

AMP では、ドキュメントの読み込み時間をできるだけ高速にするために、外部スタイルシートを使用できないようになっています。ただし、**フォント**はこのルールの例外となっています。

AMP ページにカスタムフォントを埋め込むには、次の 2 つの方法を利用できます。

1. `<link>` タグを使用する: ホワイトリストに登録されているフォントプロバイダのフォントでのみ利用できます。
2. `@font-face` CSS ルールを使用する: この方法に制約はなく、あらゆるフォントで利用できます。

このチュートリアルでは、`<link>` タグを使用してページにフォントを追加します。次のように `<head>` にスタイルシートのリンクを**追加**して、Raleway フォントをリクエストします。

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://fonts.googleapis.com/css?family=Raleway"
/>
```

次に、CSS の `body` セレクタを次のように**更新**して、Raleway への参照を含めます。

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

ページを**更新**して、新しい外観を確認します。また、AMP Validator の出力をチェックして、この外部スタイルシートのリクエストに関するエラーが出ていないことを確認します。

[tip type="note"] ウェブフォントはウェブサイトのパフォーマンスに悪影響を与えかねません。これは高速な AMP サイトであってもです。<a><code>font-display</code></a> CSS プロパティを使用して、フォントの読み込み動作を最適化しましょう。 [/tip]

これで AMP のニュース記事は完成です。ページは次のようになります。

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='完成したニュース記事') }}
