---
$title: カバーページを作成する
---

[TOC]

AMP ストーリーのページは、`<amp-story-page>` コンポーネントで表します。`<amp-story>` 内には 1 つ以上の `<amp-story-page>` コンポーネントを含めることができ、この `<amp-story-page>` コンポーネントにストーリーの個別の画面を格納します。ドキュメントの順序で 1 番目に指定したページが、ストーリーで最初に表示されるページとなります。

ページを作成するには、`amp-story` の子要素として `<amp-story-page>` を**追加**します。ページには固有の ID を**割り当て**ます。ここでは、最初のページ（カバーページ）に、固有の ID `cover` を割り当てます。

```html hl_lines="6 7"
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
   <amp-story-page id="cover">
   </amp-story-page>
</amp-story>
```

これでカバーページのシェルができました。しかし、このままではストーリーとして有効ではありません。ページ内に 1 つ以上の**レイヤ**を指定する必要があります。
{{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='2 つのレイヤがあるカバーページ', align='right third' ) }}

## ページ内のレイヤ

AMP のレイヤも、グラフィックスのレイヤのように視覚効果を生み出すために使用できます。たとえば 2 つのレイヤを重ねることで、1 つ目のレイヤを最下層とし、その上に次のレイヤを表示できます。

ここで作成するカバーページは、次の 2 つのレイヤで構成します。

* **レイヤ 1**: 背景として表示する画像
* **レイヤ 2**: ストーリーのタイトルとバイライン

### レイヤ 1 を作成する

ではまず、カバーページに 1 番目のレイヤを追加します。このレイヤには、画面全体に表示する画像を含めます。

レイヤを作成するには、`<amp-story-page>` の子要素として `<amp-story-grid-layer>` を追加します。画像を画面全体に表示したいので、`amp-story-grid-layer` に `template="fill"` 属性を指定します。レイヤ内には、`<amp-image>` 要素を追加して `cover.jpg` ファイルを指定します。画像のサイズは 720 x 1280 ピクセルとし、レスポンシブにするため `layout="responsive"`と指定します。このレイヤは次のようになります。

```html hl_lines="2 3 4 5 6 7"
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

### レイヤ 2 を作成する

これで背景ができました。次は、背景の上に見出しとバイラインを表示するため、背景レイヤの上に重ねる 2 番目のレイヤを作成します。2 番目のレイヤは、1 番目のレイヤとほぼ同じ手順で作成できます（`fill` テンプレートの代わりに **`vertical`** テンプレートを使用します）。しかし、その前にさまざまなテンプレートの違いを紹介し、`<amp-story-grid-layer>` 内に AMP 要素や HTML 要素を配置する方法について説明します。

#### テンプレートを使って要素を配置する

`<amp-story-grid-layer>` 要素には、その子要素がグリッド状に配置されます（ベースになっているのは [CSS グリッド](https://www.w3.org/TR/css-grid-1/)です）。子要素の配置方法を指定するには、以下に紹介するレイアウト テンプレートのいずれか 1 つを指定する必要があります。

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">テンプレート: Fill</h5></td>
</tr>
<tr> 
    <td width="65%"><strong>fill</strong> テンプレートは、レイヤ内の 1 番目の子要素を画面全体に表示します。レイヤ内のそれ以外の子要素は表示されません。
    
    <p>fill テンプレートは、画像や動画を背景として表示したい場合に適しています。</p>
   <code class="nopad"><pre>&lt;amp-story-grid-layer template="fill">
  &lt;amp-img src="dog.png"
      width="720" height="1280" 
      layout="responsive">
  &lt;/amp-img>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>   
    {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">テンプレート: Vertical</h5></td>
</tr>
<tr> 
    <td width="65%"><strong>vertical</strong> テンプレートは、子要素を y 軸に沿って配置します。つまり、要素は画面の上端から順番に並べられ、x 軸方向に画面の最下部まで表示されます。

    <p>vertical テンプレートは、要素を垂直に積み重ねるように、順番に並べて表示したい場合に適しています。</p>

   <code class="nopad"><pre>&lt;amp-story-grid-layer template="vertical">
  &lt;p>element 1&lt;/p>
  &lt;p>element 2&lt;/p>
  &lt;p>element 3&lt;/p>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">テンプレート: Horizontal</h5></td>
</tr>
<tr> 
    <td width="65%"><strong>horizontal</strong> テンプレートは、子要素を x 軸に沿って配置します。つまり、要素は画面の左端から順番に並べられ、y 軸方向に画面の右端まで表示されます。

    <p>horizontal テンプレートは、要素を水平に隣接するように、順番に並べて表示したい場合に適しています。</p>

    <code class="nopad"><pre>&lt;amp-story-grid-layer template="horizontal">
  &lt;p>element 1&lt;/p>
  &lt;p>element 2&lt;/p>
  &lt;p>element 3&lt;/p>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>
    {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">テンプレート: Thirds</h5></td>
</tr>
<tr> 
<td width="65%">
<strong>thirds</strong> テンプレートを使用すると、画面を水平方向に三等分し、それぞれの領域にコンテンツを割り当てることができます。

<p>名前付きの <code>grid-area</code> を指定して、三分割したどの領域（<code>upper-third</code>、<code>middle-third</code>、または <code>lower-third</code>）にコンテンツを割り当てるかを指定することもできます。グリッド領域を名前付きにしておくと、要素が表示されるときのデフォルトの動作を変更する場合にも便利です。レイヤ内に要素が 2 つある場合には、たとえば 1 つ目の要素を <code>grid-area="upper-third"</code> に割り当て、2 つ目の要素を <code>grid-area="lower-third"</code> に割り当てることができます。</p>

<code class="nopad"><pre>&lt;amp-story-grid-layer template="thirds">
  &lt;h1 grid-area="upper-third">element 1&lt;/h1>
  &lt;p grid-area="lower-third">element 2&lt;/p>
&lt;/amp-story-grid-layer>
</pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### カバーページを完成させる

レイヤ テンプレートについて理解できたら、2 番目のレイヤを追加してカバーページを完成させましょう。

レイヤ 2 の見出しとバイラインを前面に表示し、それに続いて要素が次々と表示されるようにしたいので、ここでは `vertical` テンプレートを指定します。2 番目のレイヤ `amp-story-grid-layer` は次のようになります（1 番目のレイヤの後に記述します）。

```html hl_lines="4 5 6 7"
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

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">前へ</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/add_more_pages.md', locale=doc.locale).url.path}}"><span class="arrow-next">次へ</span></a>
</div>
 
 
 
