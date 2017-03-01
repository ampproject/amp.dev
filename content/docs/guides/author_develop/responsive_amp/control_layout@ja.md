---
$title: サポートされるレイアウト
---

要素をレスポンシブにするには、`layout=responsive` を指定します。

[TOC]

## layout 属性でサポートされる値

デフォルトでは、レスポンシブ レイアウトを使用してください。

layout 属性でサポートされる値の詳細なリストは次のとおりです。

<table>
  <thead>
    <tr>
      <th class="col-twenty" data-th="Layout type">レイアウト タイプ</th>
      <th class="col-twenty" data-th="Width/height required">幅と高さが必須かどうか</th>
      <th data-th="Behavior">動作</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>nodisplay</code></td>
      <td class="col-twenty" data-th="Description">いいえ</td>
      <td data-th="Behavior">この要素は表示されません。このレイアウトはすべての AMP 要素に適用できます。このコンポーネントは、表示スタイルが「なし」の場合のように、画面上で占有するスペースがありません。この要素はユーザーの操作（[<code>amp-lightbox</code>](/docs/reference/extended/amp-lightbox.html) など）で表示されることを想定しています。</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed</code></td>
      <td class="col-twenty" data-th="Description">はい</td>
      <td data-th="Behavior">この要素は固定の幅と高さを持ち、レスポンシブではありません。ただし、<a href="/docs/reference/amp-pixel.html"><code>amp-pixel</code> 要素と <a href="/docs/reference/extended/amp-audio.html"><code>amp-audio</code></a> 要素は例外です。</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>responsive</code></td>
      <td class="col-twenty" data-th="Description">はい</td>
      <td data-th="Behavior">この要素の幅はコンテナ要素の幅に等しくなり、高さは自動的に、幅と高さの属性によって決まるアスペクト比になるよう調整されます。このレイアウトは <a href="/docs/reference/amp-img.html"><code>amp-img</code></a> や <a href="/docs/reference/amp-video.html"><code>amp-video</code> など、ほとんどの AMP 要素に適しています。使用できるスペースは親要素によって決まりますが、<code>max-width</code> CSS を使ってカスタマイズすることもできます。</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed-height</code></td>
      <td class="col-twenty" data-th="Description">高さのみ</td>
      <td data-th="Behavior">この要素は使用できるスペースを占有しますが、高さはそのまま変更されません。このレイアウトは、水平に配置されるコンテンツを含む要素 <a href="/docs/reference/extended/amp-carousel.html"><code>amp-carousel</code></a> など）に適しています。<code>width</code> 属性については、何も指定しないか、または <code>auto</code> に設定する必要があります。</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fill</code></td>
      <td class="col-twenty" data-th="Description">いいえ</td>
      <td data-th="Behavior">この要素は、幅と高さの両方について使用できるスペースを占有します。つまり、fill 要素のレイアウトはその親と一致します。</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>container</code></td>
      <td class="col-twenty" data-th="Description">いいえ</td>
      <td data-th="Behavior">この要素は、通常の HTML <code>div</code> のように、子要素でサイズを定義できます。このコンポーネントは、それ自体は特定のレイアウトを持たず、コンテナとして機能することが想定されています。子要素は直ちにレンダリングされます。</td>
    </tr>
  </tbody>
</table>

### width と height が定義されていない場合

`width` や `height` が指定されていない場合、AMP ランタイムはデフォルトで次の値を使用します。

* [`amp-pixel`](/docs/reference/amp-pixel.html): 幅と高さの両方がデフォルトで 0 に設定されます。
* [`amp-audio`](/docs/reference/extended/amp-audio.html): デフォルトの幅と高さはブラウザから推測されます。

### layout 属性が定義されていない場合

レイアウトの動作は次のように決まります。

* `height` が存在し、`width` が存在しないか `auto` に設定されている場合は、`fixed-height` レイアウトと見なされます。
* `width` または `height` 属性が `sizes` 属性とともに指定されている場合は、`responsive` レイアウトと見なされます。
* `width` または `height` 属性が存在する場合は、`fixed` レイアウトと見なされます。
* `width` 属性と `height` 属性が存在しない場合は、`container` レイアウトと見なされます。

## @media と media を使用する

[`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) を使用すると、他のウェブサイトと同様に、ページ レイアウトの見え方や動作をコントロールできます。ブラウザ ウィンドウのサイズや向きが変わると、メディアクエリが再評価され、新しい結果に基づいて要素の表示、非表示が決まります。

メディアクエリを適用してレイアウトを制御する方法について詳しくは、[CSS メディアクエリを使用してレスポンシブにする](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=ja)をご覧ください。

AMP で使用できるレスポンシブ デザイン向けのもう 1 つの機能として `media` 属性があります。この属性はすべての AMP 要素で使用できます。グローバル スタイルシートのメディアクエリと同様に機能しますが、1 つのページ上の特定の要素にのみ影響します。

たとえば、相互に排他的なメディアクエリを含む 2 つの画像があるとします。

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
[/sourcecode]

画面の幅に応じて、どちらか一方が取得され、レンダリングされます。

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
[/sourcecode]

## srcset と sizes を使用する

`srcset` 属性を使用すると、さまざまなメディア式に基づいて要素のアセットを制御できます。特に、すべての [`amp-img`](/docs/reference/amp-img.html) タグで使用して、さまざまな画面サイズに基づいて画像アセットを指定できます。

次の簡単な例の `srcset` では、画面の幅に基づいて使用される画像を指定しています。`w` 記述子は、リスト内の各画像の幅をブラウザに伝えます。

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
[/sourcecode]

**注:** AMP では、すべてのブラウザで `w` 記述子を使用できます。

`srcset` を使ってレスポンシブな画像を作成する方法について詳しくは、[レスポンシブな画像の使用に関する記事](http://alistapart.com/article/using-responsive-images-now)をご覧ください。

`srcset` と一緒に `sizes` 属性も使用できます。`sizes` 属性では、メディア式に基づいた要素のサイズの計算方法を指定します。ユーザー エージェントは、計算された要素のサイズに基づいて、`srcset` 属性で指定されたソースのうち最も関連するソースを選択します。

次の例をご覧ください。

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
[/sourcecode]

この `sizes` 属性では、ビューポートが 650 ピクセル以上の場合は、要素の幅をビューポートのサイズの 50% にすると定義しています。たとえば、ビューポートが 800 ピクセルの場合、要素の幅は 400 ピクセルに設定されます。ブラウザでは、デバイス ピクセル比を 1 と想定し、400 ピクセルと比較して `srcset` のリソースを選択します。この例では `narrow.jpg`（320 ピクセル）が選択されます。

**重要:** sizes 属性とともに width と height も指定されている場合、レイアウトはデフォルトで `responsive` に設定されます。

`sizes` および `srcset`属性とメディアクエリの比較について詳しくは、[srcset と sizes に関するブログ投稿](https://ericportis.com/posts/2014/srcset-sizes/)をご覧ください。

## placeholder と fallback を使用する

### placeholder

`placeholder` 属性でマークされた要素は、親 AMP 要素のプレースホルダとして機能します。指定する場合、`placeholder` 要素は AMP 要素の直接の子にする必要があります。

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

デフォルトでは、AMP 要素のリソースのダウンロードや初期化がまだ行われていない場合でも、プレースホルダが AMP 要素にすぐに表示されます。準備ができると、AMP 要素は通常はプレースホルダを非表示にして、コンテンツを表示します。

**注:** プレースホルダは AMP 要素でなくてもかまいません。任意の HTML 要素をプレースホルダとして使用できます。

### fallback

`fallback` 属性を使用して、ブラウザがサポートしていない要素に対する代わりの動作を指定します。たとえば、`fallback` 属性を使用して、ブラウザが特定の機能に対応していないことをユーザーに伝えます。

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

`fallback` 属性は、AMP 要素だけでなく、どの HTML 要素でも設定できます。指定する場合、`fallback` 要素は AMP 要素の直接の子にする必要があります。

### noloading

ほとんどの AMP 要素は、「読み込みインジケータ」を表示するようホワイトリストに登録されています。読み込みインジケータとは、要素がまだ完全に読み込まれていないことを示す基本的なアニメーションです。要素に `noloading` 属性を追加して、この動作を無効にすることができます。
