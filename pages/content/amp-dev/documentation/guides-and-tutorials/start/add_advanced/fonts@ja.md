---
$title: フォントを追加する
---

AMP では、ドキュメントの読み込み時間をできるだけ高速にするために、外部スタイルシートを使用できないようになっています。ただし、**フォント**はこのルールの例外となっています。

AMP ページにカスタム フォントを埋め込むには、次の 2 つの方法を利用できます。

1. `<link>` タグを使用する: ホワイトリストに登録されているフォント プロバイダのフォントでのみ利用できます。
2. `@font-face` CSS ルールを使用する: この方法に制約はなく、あらゆるフォントで利用できます。

このチュートリアルでは、`<link>` タグを使用してページにフォントを追加します。次のように `<head>` にスタイルシートのリンクを**追加**して、Raleway フォントをリクエストします。

```html
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway">
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

ページを**更新**して、新しい外観を確認します。また、AMP 検証ツールの出力をチェックして、この外部スタイルシートのリクエストに関するエラーが出ていないことを確認します。

[tip type="note"]
ドキュメントにフォントを含めるために、コンポーネントを追加する必要はありません。ただし、[`amp-font`](/ja/docs/reference/components/amp-font.html) という名前のコンポーネントが存在します。`amp-font` コンポーネントはウェブフォントの読み込みには使用されません。このコンポーネントは、ウェブフォントが正しく読み込まれたかどうかを検出し、必要に応じて適切な応答を行うために使用できます。

amp-font を使用して、フォントが完全に読み込まれるまでテキストを非表示にしておけば、表示中のテキストが一時的なフォントから本来のフォントに途中で切り替わることがなくなります。また、フォントを読み込めなかった場合は一時的なフォントでテキストが表示されるようにしておくことをおすすめします。そうすることで、ユーザーにテキストが何も表示されないという最悪のシナリオを回避できます。詳しくは、[`amp-font`](/ja/docs/reference/components/amp-font.html) のリファレンス ドキュメントをご覧ください。
[/tip]

これで AMP のニュース記事は完成です。ページは次のようになります。

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='完成したニュース記事') }}


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/navigating.md', locale=doc.locale).url.path}}"><span class="arrow-prev">前へ</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">次へ</span></a>
</div>
