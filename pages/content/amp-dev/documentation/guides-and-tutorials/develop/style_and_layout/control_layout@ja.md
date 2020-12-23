---
"$title": Layout & media queries
"$order": '1'
description: "AMP supports both media queries & element queries, plus comes with a powerful, built-in way to control the layout of individual elements. The layout attribute makes working with ..."
formats:
- websites
- email
- ads
- stories
author: Meggin
contributors:
- pbakaus
---

AMP は**メディアクエリ**と**要素クエリ**の両方をサポートしており、また、個別の要素の**レイアウト**を制御する便利な機能も備えています。`layout` 属性を使用すると、完全なレスポンシブ デザインの適用と作成が、CSS だけを使う場合よりもはるかに簡単になります。

## レスポンシブな画像を簡単に作成

レスポンシブな画像を作成するには、`width` と `height` を指定し、layout を `responsive` に設定します。 また、[`srcset`](art_direction.md) を使って、 さまざまな画面サイズに基づいて使用される画像アセットを指定します。

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

この [`amp-img`](../../../../documentation/components/reference/amp-img.md) 要素は、コンテナ要素の幅に 自動的に適合します。 高さは、指定された幅と高さによって決まるアスペクト比に 自動的に設定されます。このブラウザのウィンドウをサイズ変更して、動作を確認してみてください。

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

[tip type="tip"]<a>AMP By Example のライブデモ]</a>,[`amp-img`](../../../../documentation/components/reference/amp-img.md).url.path}}) の動作を比較したライブデモをご覧ください。[/tip]

## layout 属性 <a name="the-layout-attribute"></a>

`layout` 属性を使うと、画面上で要素をどのように表示するかを 要素ごとに簡単に制御できます。こうした制御の多くは CSS だけでも実現できますが、 その場合は指定が大変になるほか、さまざまな CSS ハックが必要になります。代わりに `layout` 属性をお使いください。

### `layout` 属性でサポートされている値

`layout` 属性には以下の値を使用できます。

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-thirty">レイアウトの種類</th>
      <th data-th="Width/height required" class="col-twenty">幅 / 高さ<br>の指定</th>
      <th data-th="Behavior">動作</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type"><code>nodisplay</code></td>
      <td data-th="Description">不要</td>
      <td data-th="Behavior">要素は表示されません。このレイアウトはすべての AMP 要素に適用できます。このコンポーネントは、表示スタイルが「なし」の場合のように、画面上で占有するスペースがありません。この要素はユーザーの操作（<a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a> など）で表示されることを想定しています。</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed</code></td>
      <td data-th="Description">必要</td>
      <td data-th="Behavior">要素は固定の幅と高さを持ち、レスポンシブではありません。ただし、<a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> 要素と <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a> 要素は例外です。</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>responsive</code></td>
      <td data-th="Description">必要</td>
      <td data-th="Behavior">要素の幅はコンテナ要素の幅と同じになるように調整され、高さも要素の width 属性と height 属性によって指定されるアスペクト比になるよう自動的にサイズ変更されます。このレイアウトは <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> や <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> など、ほとんどの AMP 要素に適しています。使用できるスペースは親要素によって決まりますが、<code>max-width</code> CSS を使ってカスタマイズすることもできます。<p><strong>注</strong>: <code>"layout=responsive"</code> の要素には、本来の所定のサイズはありません。要素のサイズはコンテナ要素によって決まります。AMP 要素を確実に表示するには、コンテナ要素に width と height を指定する必要があります。コンテナ要素に <code>"display:table"</code> を指定しないでください。指定すると AMP 要素の display 属性がオーバーライドされ、AMP 要素が不可視になります。</p> </td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed-height</code></td>
      <td data-th="Description">高さのみ必要</td>
      <td data-th="Behavior">要素は使用できるスペースを占有しますが、高さはそのまま変更されません。このレイアウトは、水平に配置されるコンテンツを含む要素（<a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> など）に適しています。<code>width</code> 属性については、指定しないか、または <code>auto</code> に設定する必要があります。</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fill</code></td>
      <td data-th="Description">不要</td>
      <td data-th="Behavior">要素は、幅と高さの両方について使用できるスペースを占有します。つまり、fill に設定した要素のレイアウトはその親と同じになります。要素を親コンテナいっぱいに表示するには、親コンテナに `position:relative` または `position:absolute` を指定しておきます。</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>container</code></td>
      <td data-th="Description">不要</td>
      <td data-th="Behavior">この要素では、通常の HTML の <code>div</code> のように、子要素でサイズを定義できます。このコンポーネントは、それ自体は特定のレイアウトを持たず、コンテナとして機能することが想定されています。子要素は直ちにレンダリングされます。</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>flex-item</code></td>
      <td data-th="Description">不要</td>
      <td data-th="Behavior">親がフレキシブル コンテナ（<code>display:flex</code>）の場合、この要素、およびこの要素の親に含まれる他の要素は、親コンテナの残りのスペースを占有します。要素のサイズは、親要素と、<code>display:flex</code> CSS レイアウトに沿ってその親要素内に含まれる他の要素の数によって決まります。</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>intrinsic</code></td>
      <td data-th="Description">必要</td>
      <td data-th="Behavior">要素は使用できるスペースを占有し、高さは要素の本来のサイズか CSS による制限（max-width など）に達するまで、<code>width</code> 属性と <code>height</code> 属性で指定されたアスペクト比で自動的にサイズ変更されます。<em></em>width 属性と height 属性を指定する必要があります。このレイアウトは、<a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> や <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> など、ほとんどの AMP 要素に適しています。使用できるスペースは親要素によって決まりますが、<code>max-width</code> CSS を使ってカスタマイズすることもできます。<code>responsive</code> とは異なり、このレイアウトには本来の所定の高さと幅が存在します。このことが最もよくわかるのは float が指定された要素内です。<code>responsive</code> のレイアウトでは 0x0 がレンダリングされますが、<code>intrinsic</code> のレイアウトでは、本来の所定のサイズか CSS による制限のどちらか小さいほうを上限にサイズ変更されて表示されます。</td>
    </tr>
  </tbody>
</table>

[tip type="tip"] **TIP –** Visit the [Demonstrating AMP layouts](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html) page to see how the various layouts respond to screen resizing. [/tip]

### width や height が定義されていない場合 <a name="what-if-width-and-height-are-undefined"></a>

`width` や `height` が指定されていない場合、 AMP ランタイムはデフォルトで次の値を使用します。

- <code>amp-pixel</code>: `width` と <code>height</code> の両方が 0 に設定されます。
- <code>amp-audio</code>: ブラウザのデフォルトの `width` と <code>height</code> が推論されます。

### <code>layout</code> 属性が指定されていない場合 <a name="what-if-the-layout-attribute-isnt-specified"></a>

<code>layout</code> 属性が指定されていない場合、AMP では 次のように適切な値の推測を試みます。

<table>
  <thead>
    <tr>
      <th data-th="Rule">ルール</th>
      <th data-th="Inferred layout" class="col-thirty">推測されるレイアウト</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"> <code>height</code> は設定されているが、<code>width</code> は設定されていないか <code>auto</code> が指定されている</td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule"> <code>sizes</code> 属性とともに、<code>width</code> 属性か <code>height</code> 属性が設定されている</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule"> <code>width</code> 属性または <code>height</code> 属性が設定されている</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule"> <code>width</code> 属性も <code>height</code> 属性も設定されていない</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## メディアクエリの使用

### CSS のメディアクエリ

[`@media`](https://developer.mozilla.org/ja-JP/docs/Web/CSS/@media) を 使用すると、他のウェブサイトと同様に、ページ レイアウトの見え方や動作をコントロールできます。 ブラウザ ウィンドウのサイズや向きが変わると、 メディアクエリが再評価されて、その新しい結果を基に、要素が表示されるか非表示になるかが 決まります。

メディアクエリを適用してレイアウトを制御する方法について詳しくは、[CSS メディアクエリを使用してレスポンシブにする](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=ja)をご覧ください。

### 要素のメディアクエリ <a name="element-media-queries"></a>

AMP で使用できるレスポンシブ デザイン向けのもう 1 つの機能として `media` 属性があります。 この属性はすべての AMP 要素で使用できます。 グローバル スタイルシートのメディアクエリと同様に機能しますが、 1 つのページ上にある特定の要素にのみ影響します。

たとえば、相互に排他的なメディアクエリが指定された 2 つの画像があるとします。

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="527"
    height="355"
    layout="responsive">
</amp-img>
[/sourcecode]

画面の幅に応じて、どちらか一方が取得され、レンダリングされます。

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="466"
    height="193"
    layout="responsive">
</amp-img>
[/sourcecode]
