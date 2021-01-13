---
"$title": カバーページの作成
"$order": '4'
description: ページを作成するには、amp-story の子要素として <amp-story-page> 要素を追加します。ページには固有の ID を割り当てます。ここでは、最初のページ（カバーページ）に、固有の ...
author: bpaduch
---

ウェブストーリーでは、`<amp-story-page>` コンポーネントを使用してページを表します。[`amp-story`](https://gitlocalize.com/repo/4863/ja/pages/content/amp-dev/documentation/components/reference/amp-story.md) には 1 つ以上の `<amp-story-page>` コンポーネントページを含めることができ、1 つのストーリーを構成するスクリーンが含まれます。ウェブストーリーに表示される最初のページは、ドキュメントの順序で最初に指定したページです。

ページを作成するには、[`amp-story`](../../../../documentation/components/reference/amp-story.md) の子要素として `<amp-story-page>` を**追加**します。ページには固有の ID を**割り当て**ます。ここでは、最初のページ（カバーページ）に、固有の ID `cover` を割り当てます。

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
   <amp-story-page id="cover">
   </amp-story-page>
</amp-story>
```

これでカバーページのシェルができました。しかし、このままではストーリーとして有効ではありません。ページ内に 1 つ以上の**レイヤー**を指定する必要があります。 {{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='2 つのレイヤーがあるカバーページ', align='right third' ) }}

## ページ内のレイヤー

AMP ストーリーページのレイヤーも、グラフィックスのレイヤーのように視覚効果を生み出すために使用できます。たとえば 2 つのレイヤーを重ねることで、1 つ目のレイヤーを最下層とし、その上に次のレイヤーを表示できます。

ここで作成するカバーページは、次の 2 つのレイヤーで構成します。

- **レイヤー 1**: 背景として表示する画像
- **レイヤー 2**: ストーリーのタイトルとバイライン

### レイヤー 1 を作成する

ではまず、カバーページに 1 番目のレイヤーを追加します。このレイヤーには、画面全体に表示する画像を含めます。

レイヤーを作成するには、`<amp-story-page>` の子要素として `<amp-story-grid-layer>` を追加します。画像を画面全体に表示したいので、`amp-story-grid-layer` に `template="fill"` 属性を指定します。レイヤー内には、[`amp-img`](../../../../documentation/components/reference/amp-img.md) 要素を追加して `cover.jpg` ファイルを指定します。画像のサイズは 720 x 1280 ピクセルとし、レスポンシブにするため `layout="responsive"`と指定します。このレイヤーは次のようになります。

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img src="assets/cover.jpg"
        width="720" height="1280"
        layout="responsive">
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

ページがどのように表示されるか見てみましょう。ブラウザで <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a> にアクセスしてください。

次のように表示されるはずです。

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### レイヤー 2 を作成する

これで背景ができました。次は、背景の上に見出しとバイラインを表示するため、背景レイヤーの上に重ねる 2 番目のレイヤーを作成します。2 番目のレイヤーは、1 番目のレイヤーとほぼ同じ手順で作成できます（`fill` テンプレートの代わりに **`vertical`** テンプレートを使用します）。しかし、その前にさまざまなテンプレートの違いを紹介し、`<amp-story-grid-layer>` 内に AMP 要素や HTML 要素を配置する方法について説明します。

#### テンプレートを使って要素を配置する

`<amp-story-grid-layer>` 要素には、その子要素がグリッド状に配置されます（ベースになっているのは [CSS グリッド](https://www.w3.org/TR/css-grid-1/)です）。子要素の配置方法を指定するには、以下に紹介するレイアウト テンプレートのいずれか 1 つを指定する必要があります。

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">テンプレート: Fill</h5></td>
</tr>
<tr>
    <td width="65%"> <strong>fill</strong> テンプレートは、レイヤー内の 1 番目の子要素を画面全体に表示します。レイヤー内のそれ以外の子要素は表示されません。     <p>fill テンプレートは、画像や動画を背景として表示したい場合に適しています。</p>    <code class="nopad"><pre><amp-story-grid-layer template="fill">   <amp-img src="dog.png" width="720" height="1280" layout="responsive">   </amp-img> </amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">テンプレート: Vertical</h5></td>
</tr>
<tr>
    <td width="65%">
<strong>Vertical</strong> テンプレートは、子要素を Y 軸に沿って配置します。要素は画面の上部に整列され、X 軸に沿って画面全体を占有します。このテンプレートは、縦方向に要素を重ね合わせる際にうまく機能します。<code class="nopad"><pre><amp-story-grid-layer template="vertical">   <p>element 1</p>   <p>element 2</p>   <p>element 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">テンプレート: Horizontal</h5></td>
</tr>
<tr>
    <td width="65%"> <strong>horizontal</strong> テンプレートは、子要素を x 軸に沿って配置します。つまり、要素は画面の左端から順番に並べられ、y 軸方向に画面の右端まで表示されます。     <p>horizontal テンプレートは、要素を水平に隣接するように、順番に並べて表示したい場合に適しています。</p>     <code class="nopad"><pre><amp-story-grid-layer template="horizontal">   <p>要素 1</p>   <p>要素 2</p>   <p>要素 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">テンプレート: Thirds</h5></td>
</tr>
<tr>
<td width="65%">
<strong>Thirds</strong> テンプレートは、画面を均等に 3 つの行区画に分割し、各区画にコンテンツを挿入できるようにします。また、名前付きの <code>grid-area</code> を指定することで、コンテンツを示す区画を示すことができます。区画は、<code>upper-third</code>、<code>middle-third</code>、または <code>lower-third</code> として指定します。名前付きグリッド領域は要素が表示する場所の動作を変更する際に役立ちます。たとえば、レイヤーに 2 つの要素がある場合、最初の要素を <code>grid-area="upper-third"</code> 、2 番目の要素を <code>grid-area="lower-third"</code> に表示するように指定します。<code class="nopad"><pre><amp-story-grid-layer template="thirds">   <h1 grid-area="upper-third">要素 1</h1>   <p grid-area="lower-third">要素 2</p> </amp-story-grid-layer> </pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### カバーページを完成させる

レイヤーテンプレートについて理解できたら、2 番目のレイヤーを追加してカバーページを完成させましょう。

レイヤー 2 の見出しとバイラインを前面に表示し、それに続いて要素が次々と表示されるようにしたいので、ここでは `vertical` テンプレートを指定します。2 番目のレイヤー `amp-story-grid-layer` は次のようになります（1 番目のレイヤーの後に記述します）。

```html
<amp-story-grid-layer>
 <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

ブラウザの表示を更新して確認してみましょう。これでカバーページは完成です。

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='完成したカバーページ' ) }}
