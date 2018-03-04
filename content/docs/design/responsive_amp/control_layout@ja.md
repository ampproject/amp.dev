---
$title: レイアウトとメディアクエリ
---

[TOC]

 AMP は、**メディアクエリ**  と**要素クエリ** の両方をサポートしているのに加えて、要素ごとの**レイアウト** を管理できる便利な機能をあらかじめ備えています。`layout` 属性を使うと、CSS だけを使う場合よりも簡単にレスポンシブ デザインへの対応や完全なレスポンシブ デザインの作成を行えます。

## レスポンシブな画像を手軽に作成

 レスポンシブな画像を作成するには、`width` と `height` を指定し、レイアウトを `responsive` に設定します。さらに、[srcset](ja/docs/guides/responsive/art_direction.html) を使って、さまざまな画面サイズに基づいて使用される画像アセットを指定します。

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

この `amp-img` 要素は、画像の幅をコンテナ要素の幅に自動的に合わせます。また、高さについては、指定された幅と高さによって決まるアスペクト比に自動的に設定されます。試しに、このブラウザ ウィンドウのサイズを変えてみてください。

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

{% call callout('ヒント', type='success') %}
 `amp-img` の基本的な設定と高度な設定のサンプルを並べて比較するライブデモをご覧ください。[ライブデモ](https://ampbyexample.com/components/amp-img/) 
{% endcall %}

## layout 属性

`layout` 属性を使うと、要素を画面上でどのように表示するかを、要素ごとに簡単に指定できます。こうした設定の多くは CSS のみでも可能ですが、いくつもの作業が必要となり、はるかに複雑です。そこで、`layout` 属性を代わりに使用します。

### `layout` 属性でサポートされる値

`layout` 属性で使用できる値は次のとおりです。

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-twenty">レイアウト タイプ</th>
      <th data-th="Width/height required" class="col-twenty">幅と高さの指定</th>
      <th data-th="Behavior">動作</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>nodisplay</code></td>
      <td data-th="Description" class="col-twenty">不要</td>
      <td data-th="Behavior"> 要素は表示されません。このレイアウトはすべての AMP 要素に適用できます。このコンポーネントは、表示スタイルが none（なし）の場合のように、画面上での占有スペースがありません。この要素は、ユーザーの操作（たとえば <a href="ja/docs/reference/extended/amp-lightbox.html"><code>amp-lightbox</code></a>）で表示されることを想定しています。</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed</code></td>
      <td data-th="Description" class="col-twenty">必要</td>
      <td data-th="Behavior"> 要素は幅と高さが固定され、レスポンシブではありません。ただし、<a href="ja/docs/reference/amp-pixel.html"><code>amp-pixel</code></a>  要素と <a href="ja/docs/reference/extended/amp-audio.html"><code> amp-audio</code></a> 要素は例外です。</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>responsive</code></td>
      <td data-th="Description" class="col-twenty">必要</td>
      <td data-th="Behavior"> 要素の幅はコンテナ要素の幅に等しくなり、高さについては、幅と高さの属性によって決まるアスペクト比になるよう自動的に調整されます。このレイアウトは、<a href="ja/docs/reference/amp-img.html"><code>amp-img</code></a> や <a href="ja/docs/reference/amp-video.html"><code>amp-video</code></a> など、ほとんどの AMP 要素に適しています。使用できるスペースは親要素によって決まりますが、<code>max-width</code> CSS を使ってカスタマイズすることもできます。</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed-height</code></td>
      <td data-th="Description" class="col-twenty">高さのみ必要</td>
      <td data-th="Behavior"> 要素は使用できるスペースを占有しますが、高さは変わりません。このレイアウトは、水平に配置されるコンテンツを含む要素（<a href="ja/docs/reference/extended/amp-carousel.html"><code>amp-carousel</code></a>   など）に適しています。なお、<code>width</code>  属性については、何も指定しないか、または<code> auto </code>に設定する必要があります。</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fill</code></td>
      <td data-th="Description" class="col-twenty">不要</td>
      <td data-th="Behavior">要素は、幅と高さの両方について使用できるスペースを占有します。つまり、fill 要素のレイアウトはその親と同じになります。</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>container</code></td>
      <td data-th="Description" class="col-twenty">不要</td>
      <td data-th="Behavior"> この要素は、子要素でサイズを定義できるという点で、HTML の<code> div </code>要素とほぼ同じです。このコンポーネントは、それ自体では特定のレイアウトを持たず、コンテナとして機能することが想定されます。子要素は直ちにレンダリングされます。</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>flex-item</code></td>
      <td data-th="Description" class="col-twenty">不要</td>
      <td data-th="Behavior"> この要素と、その親要素に含まれる他の要素は、親要素がフレキシブル コンテナ（<code>display:flex</code>）である場合に、親要素の残りのスペースを占有します。要素のサイズは、<code>display:flex</code> CSS レイアウトに基づいて、親要素、および親要素に含まれる他の要素の数によって決まります。</td>
    </tr>
  </tbody>
</table>

### 幅と高さが指定されていない場合

`width` または `height` が指定されていない場合、AMP ランタイムはデフォルトで次の値を使用します。

* [amp-pixel](ja/docs/reference/amp-pixel.html): 幅と高さの両方がデフォルトで 0 に設定されます。
* [amp-audio](ja/docs/reference/extended/amp-audio.html): ブラウザから推測される幅と高さをデフォルトとして使用します。

###  <code>layout</code> 属性が指定されていない場合

<code>layout</code> 属性が指定されていない場合、AMP では適切な値を推定しようと試みます。

<table>
  <thead>
    <tr>
      <th data-th="Rule">ルール</th>
      <th data-th="Inferred layout" class="col-thirty">推定されるレイアウト</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"><code>height</code>  は指定されているが、<code>width</code> は指定されていない、または <code>`auto`</code> に設定されている</td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule"> <code>width</code>  属性または <code>height</code> 属性が <code>sizes</code> 属性とともに指定されている</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code>  属性または <code>height</code> 属性が指定されている</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code>  と <code>height</code> が指定されていない</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## メディアクエリを使用する

### CSS メディアクエリ

 [@media](https://developer.mozilla.org/ja/docs/Web/CSS/@media) を使用すると、他のウェブサイトの場合と同じように、ページ レイアウトの見え方や動作を管理できます。ブラウザ ウィンドウのサイズや向きが変わると、メディアクエリが再評価され、新しい結果に基づいて要素の表示、非表示が決まります。

{% call callout('ヒント', type='success') %}
 メディアクエリを使用してレイアウトを管理する方法について詳しくは、[CSS メディアクエリを使用してレスポンシブにする](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en)
をご覧ください。{% endcall %}

### 要素のメディアクエリ

AMP で使用できるレスポンシブ デザイン向けのもう 1 つの機能として `media` 属性があります。この属性はすべての AMP 要素で使用できます。グローバル スタイルシートのメディアクエリと同様に機能しますが、1 つのページ上の特定の要素にのみ影響します。

たとえば、相互に排他的なメディアクエリが定義された 2 つの画像があるとします。

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive">
</amp-img>
[/sourcecode]

この場合は、画面の幅に応じて、どちらか一方が取得され、レンダリングされます。

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive">
</amp-img>
[/sourcecode]

