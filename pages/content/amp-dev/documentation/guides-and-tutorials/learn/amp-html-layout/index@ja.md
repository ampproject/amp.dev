---
"$title": AMPHTML のレイアウトシステム
order: '1'
formats:
- websites
- email
- stories
- ads
teaser:
  text: '概要 '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

## 概要

レイアウトシステムの第一の目標は、JavaScript やデータ呼び出しなどのリモートリソースが完了する前に、ランタイムが要素のサイズを推論できるように、AMP 要素がレイアウトを表現できるようにすることです。レンダリングとスクロールの素早い方向転換を大幅に減らすことができるため、重要なことです。

AMP レイアウトシステムは、これに留意した上で、良好なパフォーマンスを確保する、少量ではありながら柔軟性に長けるレイアウトをサポートするように設計されています。このシステムは、要素のレイアウトとサイズのニーズを表現するために、`layout`、`width`、`height`、`sizes`、および `heights` などの一連の属性を使用しています。

## 動作 <a name="behavior"></a>

非コンテナ型の AMP 要素（`layout != container`）は、プレースホルダ（`placeholder` 属性を参照）を除くすべての子要素が非表示となる未解決/未構築モードで起動します。要素を完全に構築するために必要な JavaScript とデータペイロードがダウンロードされ初期化中であったとしても、AMP ランタイムはすでに、CSS クラスと `layout`、`width`、`height`、および `media` 属性に依存するだけで、要素のサイズをどのように設定し、レイアウトするのかを理解しています。ほとんどの場合、<code>placeholder</code> が指定されている場合は、すべての要素のスペースを確保するように、サイズと位置が調整されます。

`placeholder` は、要素が構築されて最初のレイアウトが完成するとすぐに非表示になります。この時点で、要素のすべての子要素の構築と配置が適切に行われて、表示可能な状態になっており、ユーザーの入力を受け取れるようになっていることが期待されています。これがデフォルトの振る舞いです。`placeholder` をより素早く非表示にしたり、長く表示したりするなど、 各要素のデフォルトの動作をオーバーライドすることができます。

要素のサイズと表示は、ランタイムによって `layout`、`width`、`height`、および `media` 属性に基づいて設定されます。レイアウトのルールはすべて、内部的に CSS wo介して実装されます。CSS スタイルを介して要素のサイズを推論できず、その子要素によってサイズ変更が不可能な場合は、すぐに利用できるサイズを定義するか、動的に挿入するかが要素に求められます。これは、この要素のサイズを変更できないということではなく、`responsive` 、`fixed-height`、`fill`、および `flex-item` レイアウトの場合には、レイアウトはそれに完全に応答するため、レンダリング中、スクロール中、ダウンロード後など、明示的なユーザーアクションがなければサイズを変更できないということです。

要素に誤った構成が適用されている場合、PROD ではまったくレンダリングされず、DEV モードではエラーの状態でランタイムによってレンダリングされます。このようなエラーには、`layout`、`width`、および `height` 属性の無効な、またはサポートされていない値などがあります。

## レイアウト属性 <a name="layout-attributes"></a>

### `width` と `height` <a name="width-and-height"></a>

`layout` 属性の値によって、AMP コンポーネント要素には、整数のピクセル値を含む `width` と `height` 属性が必要です。実際のレイアウトの動作は、以下に示すように、`layout` 属性によって決定します。

いくつかのケースでは、`width` または `height` が指定されていない場合、AMP ランタイムは次のようにデフォルトの動作を示します。

- `amp-pixel`: `width` と `height` の両方が 0 に設定されます。
- `amp-audio`: ブラウザのデフォルトの `width` と `height` が推論されます。

### `layout` <a name="layout"></a>

AMP は、AMP コンポーネントがドキュメントレイアウト内でどのように動作するか指定する一連のレイアウトを提供しており、以下の表に示すいずれかの値で `layout` 属性を追加することで、コンポーネントのレイアウトを指定することができます。

**例**: アスペクト比の決定に width と height が使用された単純なレスポンシブ画像。

[sourcecode:html]
<amp-img
  src="/img/amp.jpg"
  width="1080"
  height="610"
  layout="responsive"
  alt="an image"
></amp-img>
[/sourcecode]

以下は、`layout` 属性でサポートされている値です。

<table>
  <thead>
    <tr>
      <th width="30%">値</th>
      <th>動作と要件</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>なし</td>
      <td>値が指定されていない場合、コンポーネントのレイアウトは次のように推論されます。         <ul>           <li> <code>height</code> が存在し、<code>width</code> が欠落しているか <code>auto</code> に設定されている場合、<code>fixed-height</code> レイアウトが使用されます。</li>           <li> <code>width</code> と <code>height</code> が <code>sizes</code> または <code>heights</code> 属性とともに存在する場合、<code>responsive</code> レイアウトが使用されます。</li>           <li> <code>width</code> と <code>height</code> が存在する場合、<code>fixed</code> レイアウトが使用されます。</li>           <li> <code>width</code> と <code>height</code> が欠落している場合、<code>container</code> レイアウトが使用されます。</li>         </ul> </td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>通常の HTML <code>div</code> のように、子要素によってサイズが定義されます。コンポーネントには特定のレイアウトが指定されておらず、コンテナとしてのみ機能すると見なされます。子要素は直ちにレンダリングされます。</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>要素は幅と高さの両方のの観点から利用可能なスペースを使用します。言い換えると、<code>fill</code> 要素のレイアウトとサイズは親要素に一致します。要素が親コンテナを満たすようにするには、"fill" レイアウトを指定し、親コンテナに <code>position:relative</code> または <code>position:absolute</code> を指定するようにしてください。</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>要素の幅と高さは固定されており、レスポンシブはサポートされません。<code>width</code> と <code>height</code> 属性が指定されている必要があります。<code>amp-pixel</code> と <code>amp-audio</code> コンポーネントについては例外です。</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>要素は利用可能なスペースを使用しますが、高さは固定されたままになります。このレイアウトは、水平方向にコンテンツが配置される <code>amp-carousel</code> などの要素に最適です。<code>height</code> 属性が指定されている必要があります。<code>width</code> 属性は含まないか、<code>auto</code> に指定する必要があります。</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td> <code>flex-item</code> レイアウトが指定された要素とそのような親要素に含まれる子要素は、親要素がフレキシブルコンテナ（<code>display: flex</code>）である場合の親コンテナの残りのスペースを使用します。<code>width</code> と <code>height</code> 属性は不要です。</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>要素は利用可能なスペースを使用し、 <code>amp-img</code> に渡された `width` と `height` 属性に達するか、`max-width` などの CSS 制約に達する<em>まで</em>、<code>width</code> と <code>height</code> 属性によって指定されたアスペクト比に、高さを自動調整します。width と height 属性が指定されている櫃夜ぐああります。このレイアウトは、<code>amp-img</code> や <code>amp-carousel</code> などを含む AMP 要素に最も適しています。利用できるスペースは親要素によって決まりますが、<code>max-width</code> CSS を使用してカスタマイズすることも可能です。このレイアウトは、固有の高さと幅を持つという点で、<code>responsive</code> とは異なり、この差は、<code>responsive</code> レイアウトが 0x0 をレンダリングし、<code>intrinsic</code> レイアウトがその自然なサイズまたは CSS 制約の小さい方に膨らむフロート要素内で最も明確に現れます。</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>要素は表示されません。また、表示スタイルが <code>none</code> であるかのように、スペースもまったく使用されません。このレイアウトはすべての AMP 要素に適用することができます。要素はユーザーアクション（<code>amp-lightbox</code> など）によって表示されるものと見なされます。<code>width</code> と <code>height</code> 属性は不要です。</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>要素は利用可能なスペースを使用し、高さは <code>width</code> と <code>height</code> 属性によって指定されたアスペクト比に自動設定されます。このレイアウトは、<code>amp-img</code> や <code>amp-video</code> などを含むほとんどの AMP 要素に最適です。利用できるスペースは親要素によって決まりますが、<code>max-width</code> CSS を使ってカスタマイズすることもできます。<code>width</code> と <code>height</code> 属性を使用する必要があります。<p><strong>注意</strong>: <code>"layout=responsive"</code> を使用する要素には固有のサイズはありません。要素のサイズはそのコンテナ要素によって決定されます。AMP 要素が確実に表示されるようにするには、コンテナ要素の幅と高さを指定しておく必要があります。コンテナ要素に <code>"display:table"</code> を指定すると、AMP 要素の表示がオーバーライドされ、AMP 要素が非表示状態でレンダリングされます。</p> </td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

`responsive` レイアウトをサポートするすべての AMP 要素は、`sizes` 属性もサポートしています。この属性の値は、[img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) に記述されたとおりの sizes 式ですが、画像だけでなく、すべての要素に適用されます。手短に言えば、`sizes` 属性は、メディア条件に応じてどのように要素の幅が計算されるかを説明する属性です。

`sizes` 属性が `width` と `height` とともに指定されている場合、`layout` は `responsive` になります。

**例**: `sizes` 属性の使用

以下の例では、ビューポートの幅が `320px` より大きい場合に、画像の幅は 320px になり、そうでない場合は、100vw（ビューポートの幅の 100%）になります。

[sourcecode:html]
<amp-img
  src="https://acme.org/image1.png"
  width="400"
  height="300"
  layout="responsive"
  sizes="(min-width: 320px) 320px, 100vw"
>
</amp-img>
[/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

`sizes` 属性はほかに依存することなく、要素にインラインの `width` スタイルを設定します。`disable-inline-width` と `sizes` を組み合わせると、AMP 要素は、`amp-img` 内にネストされた `img` と同様に、`sizes` が通常 AMP で設定するようにインライン `width` を**設定することなく** 、要素の基盤のタグに `sizes` の値を伝搬します。

**例**: `disable-inline-width` 属性の使用

以下の例では、`<amp-img>` 要素の幅は影響されず、`sizes` は、`srcset` のソースの 1 つを選択するためだけに使用されます。

[sourcecode:html]
<amp-img
  src="https://acme.org/image1.png"
  width="400"
  height="300"
  layout="responsive"
  sizes="(min-width: 320px) 320px, 100vw"
  disable-inline-width
>
</amp-img>
[/sourcecode]

### `heights` <a name="heights"></a>

`responsive` レイアウトをサポートするすべての AMP 要素は、`heights` 属性もサポートしています。この属性の値は、[img sizes 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)と同様にメディア式に基づく sizes 式ですが、以下のような主な違いが 2 つあります。

1. 要素の高さに適用され、幅には適用されません。
2. パーセント値を使用できます（`86%` など）。パーセント値が使用される場合、要素の幅のパーセント率を示します。

`heights` 属性が `width` と `height` とともに指定されている場合、`layout` は `responsive` になります。

**例**: `heights` 属性の使用

以下の例では、画像の高さは幅の 80% になりますが、ビューポートの幅が `500px` より大きい場合、高さは最大 `200px` になります。`heights` 属性が `width` と `height` とともに指定されているため、レイアウトは `responsive` になります。

[sourcecode:html]
<amp-img
  src="https://acme.org/image1.png"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
[/sourcecode]

### `media` <a name="media"></a>

ほとんどの AMP 要素は `media` 属性をサポートしています。`media` の値はメディアクエリです。クエリに一致しない場合、要素はまったく表示されず、そのリソースと潜在的にその子リソースはフェッチされません。ブラウザウィンドウのサイズや向きが変化すると、メディアクエリが再評価され、その新しい結果に基づいて、要素の表示と非表示が決定されます。

**例**: `media` 属性の使用

以下の例では、相互に排他的なメディアクエリを使用する 2 つの画像を使用しています。画面の幅に応じて、これらのうち 1 つの画像がフェッチされ、レンダリングされます。`media` 属性はすべての AMP 要素で利用できるため、広告などの画像以外の要素にも使用することができます。

[sourcecode:html]
<amp-img
  media="(min-width: 650px)"
  src="wide.jpg"
  width="466"
  height="355"
  layout="responsive"
></amp-img>
<amp-img
  media="(max-width: 649px)"
  src="narrow.jpg"
  width="527"
  height="193"
  layout="responsive"
></amp-img>
[/sourcecode]

### `placeholder` <a name="placeholder"></a>

`placeholder` 属性は、AMP 要素にだけでなく、あらゆる HTML 要素に設定することができます。`placeholder` 属性は、この属性でマークされた要素が親 AMP 要素のプレースホルダとして機能することを示します。示されている場合、プレースホルダは AMP 要素の直接の子要素である必要があります。デフォルトでは、AMP 要素のリソースがまだダウンロード済みまたは初期化済みでない場合であっても、プレースホルダがすぐに表示されるようになっています。準備が整うと、通常、AMP 要素はプレースホルダを非表示にしてコンテンツを表示しますが、プレースホルダに関する実際の動作は、要素の実装によって異なります。

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

`fallback` 属性は、AMP 要素にだけでなく、あらゆる HTML 要素にも設定することができます。フォールバックは、要素がユーザーに対し、ブラウザが要素をサポートしていないことを伝えることのできる方法です。指定されている場合、フォールバック要素は AMP 要素の直接の子要素である必要があります。フォールバックに関する実際の動作は、要素の実装によって異なります。

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

`noloading` 属性は、要素の「ローディングインジケータ」をオフにするかどうかを指定する属性です。多くの AMP 要素は「ローディングインジケータ」の表示を許可されています。このインジケータは、要素が完全には読み込まれていないことを示す基本アニメーションです。この属性を追加することで、その要素にかかわるこの動作をオプトアウトすることができます。

## (tl;dr) レイアウトの要件と動作のまとめ <a name="tldr-summary-of-layout-requirements--behaviors"></a>

以下の表は、`layout` 属性での使用が許可されているパラメータ、CSS クラス、およびスタイルです。以下の事項に注意してください。

1. `-amp-` 接頭辞が付いた CSS クラスと、`i-amp-` 接頭辞が付いた要素は、AMP 内部での処理とみなされ、ユーザーのスタイルシートで使用することはできません。ここでは、情報提供の目的でのみ示されています。
2. この表では `width` と `height` が必須に指定されていますが、`amp-pixel` と `amp-audio` の場合にはデフォルトのルールが適用されます。

<table>
  <thead>
    <tr>
      <th width="21%">レイアウト</th>
      <th width="20%">Width/<br>Height 必須？</th>
      <th width="20%">サイズを定義？</th>
      <th width="20%">追加要素</th>
      <th width="19%">CSS "display"</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>いいえ</td>
      <td>いいえ</td>
      <td>なし</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>いいえ</td>
      <td>はい。親のサイズ。</td>
      <td>なし</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>はい</td>
      <td>はい。<code>width</code> と <code>height</code> で指定。</td>
      <td>なし</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td> <code>height</code> のみ。 <code>width</code> に <code>auto</code> を使用可</td>
      <td>はい。親コンテナと <code>height</code> で指定。</td>
      <td>なし</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>いいえ</td>
      <td>いいえ</td>
      <td>はい。親コンテナに基づく。</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>はい</td>
      <td>はい。親コンテナと<code>width:height</code> のアスペクト比に基づく。</td>
      <td>はい。<code>i-amphtml-sizer</code> </td>
      <td> <code>block</code>（<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element" rel="nofollow">置換要素</a>のように動作する）</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>いいえ</td>
      <td>いいえ</td>
      <td>なし</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>はい</td>
      <td>はい。親コンテナと<code>width:height</code> のアスペクト比に基づく。</td>
      <td>はい。<code>i-amphtml-sizer</code> </td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>
