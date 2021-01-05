---
"$title": Creating the bookend
"$order": '7'
description: 画面、「ブックエンド」を作成していきましょう。最後の画面はストーリーの締めくくりとなるものです。この画面に、ソーシャル共有ボタンやストーリーの関連リンクを表示することで ...
author: bpaduch
---

すべてのページを追加できたところで、次はストーリーの最後の画面、「ブックエンド」を作成していきましょう。最後の画面はストーリーの締めくくりとなるものです。この画面に、ソーシャル共有ボタンやストーリーの関連リンクを表示することで、読者にストーリーを共有してもらったり、読者をサイト上の別のコンテンツに誘導したりできます。

ブックエンド画面上の情報は、`<amp-story-bookend>` タグで指定された JSON ファイルから読み込まれます。このチュートリアルでは、ブックエンド データを含む JSON ファイル（[bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)）を用意してありますので、こちらのファイルを使用します。

`<amp-story-bookend>` タグは、[`amp-story`](../../../../documentation/components/reference/amp-story.md) 内の最後のタグにする必要があります。終了タグ `</amp-story>` の直前に、`<amp-story-bookend></amp-story-bookend>` を**追加**しましょう。`amp-story-bookend` タグ内では、次のように `src` 属性で `bookend.json` ファイルを指定し、`layout="nodisplay"` を設定します。

```html
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

ブラウザを更新し、最後の画面に移動すると、次のブックエンドが表示されるはずです。

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Bookend' ) }}

では、この JSON ファイルの中身を見てみましょう。[bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) ファイルをお使いのテキスト エディタで開いてみてください。

すべてのブックエンド画面には、`bookendVersion` が必要です。このチュートリアルでは、次のように `v1.0` を設定します。

```json
"bookendVersion": "v1.0",
```

ソーシャル共有ボタンを設置すると、Twitter や Facebook、Pinterest などのソーシャル プラットフォームでコンテンツを共有してもらうことができます。shareProviders オブジェクトでソーシャル共有プロバイダを指定し、各ソーシャル プラットフォームの[タイプ名](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers)を含む配列を作成します。

このチュートリアルでは、共有プロバイダとして Facebook、Twitter、メールを指定します。

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='Bookend social share' ) }}

ブックエンド画面の残りの部分には、関連コンテンツを表示します。すべての関連コンテンツを `components` オブジェクトに記述します。

関連コンテンツや関連リンクの表示にはさまざまなコンポーネントを使用でき、各コンポーネントには type 属性を指定します。使用可能なコンポーネントは次のとおりです。

<table>
<thead><tr>
  <th width="20%">Type</th>
  <th>Description</th>
</tr></thead>
<tbody>
  <tr>
    <td>heading</td>
    <td>一連の記事の見出しを指定できます。   <pre class="nopreline">
  {
    "type": "heading",
    "text": "More to read"
  },
  </pre>     <br>     <figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_heading.png" width="720" height="140" layout="responsive" alt="bookend heading"></amp-img>
    </figure></td>
  </tr>
  <tr>
    <td>small</td>
    <td>関連記事へのリンクを設定できます。必要に応じて、小さい画像を指定することもできます。   <pre class="nopreline">
  {
    "type": "small",
    "title": "Learn about cats",
    "url": "https://wikipedia.org/wiki/Cat",
    "image": "assets/bookend_cats.jpg"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_small.png" width="720" height="267" layout="responsive" alt="bookend small article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>landscape</td>
    <td>記事やその他のコンテンツ（動画など）へのリンクを設定できます。このタイプに関連付けられた画像は、横向きで大きく表示されます。  <pre class="nopreline">
  {
    "type": "landscape",
    "title": "Learn about border collies",
    "url": "https://wikipedia.org/wiki/Border_Collie",
    "image": "assets/bookend_dogs.jpg",
    "category": "Dogs"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_landscape.png" width="720" height="647" layout="responsive" alt="bookend landscape article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>portrait</td>
    <td>ストーリーやその他のコンテンツへのリンクを設定できます。このタイプに関連付けられた画像は、縦向きで大きく表示されます。  <pre class="nopreline">
  {
    "type": "portrait",
    "title": "Learn about macaws",
    "url": "https://wikipedia.org/wiki/Macaw",
    "image": "assets/bookend_birds.jpg",
    "category": "birds"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_portrait.png" width="720" height="1018" layout="responsive" alt="bookend portrait article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>cta-link</td>
    <td>詳細、登録などのボタンとして表示されるカスタム外部リンクを設定できます。  <pre class="nopreline">
  {
    "type": "cta-link",
    "links": [
      {
        "text": "Learn more",
        "url": "https://amp.dev/about/stories.html"
      }
    ]
  }
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_cta.png" width="720" height="137" layout="responsive" alt="bookend cta"></amp-img>
    </figure></pre>
</td>
  </tr>
</tbody>
</table>

ブックエンド コンポーネントについてさらに詳しく学ぶ場合は、[`amp-story`](../../../../documentation/components/reference/amp-story.md) のリファレンス ドキュメントをご覧ください。

ストーリーは完成間近です。コンテンツを公開する前に、AMP HTML が有効かどうかを確認してみましょう。
