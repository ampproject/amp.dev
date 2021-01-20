---
$title: amp-carousel
$category@: layout
teaser:
  text: 横軸に沿って複数の類似コンテンツを表示します。
---


<!--
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



汎用カルーセルは、横軸に沿って複数の類似コンテンツを表示します。優れた柔軟性とパフォーマンスを備えています。

<table>
  <tr>
    <td width="40%"><strong>必須のスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>
      <ul>
        <li>カルーセル: fixed、fixed-height、nodisplay。</li>
        <li>スライド: fill、fixed、fixed-height、flex-item、nodisplay、responsive。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>例</strong></td>
    <td>AMP By Example:<ul>
      <li><a href="https://ampbyexample.com/components/amp-carousel/">amp-carousel の例</a></li>
      <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/">amp-carousel を備えた画像ギャラリー</a></li></ul></td>
    </tr>
  </table>

# 動作 <a name="behavior"></a>

`amp-carousel` コンポーネントの直接の子は、それぞれカルーセル内の 1 つのアイテムと見なされます。各ノードに対して、任意の HTML 子を指定することもできます。

カルーセルは、任意の数のアイテムと、アイテム 1 つ分を前後に移動するナビゲーション矢印（省略可）で構成されます。

ユーザーがスワイプを行ったり、矢印キーを使用したり、オプションのナビゲーション矢印をクリックしたりすると、カルーセルがアイテム間を移動します。

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel width="450"
  height="300">
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
    width="450"
    height="300"></amp-img>
</amp-carousel>
```
[/example]

# 特定のスライドに進む <a name="advancing-to-a-specific-slide"></a>

要素の `on` 属性のメソッドを `tap:carousel-id.goToSlide(index=N)` に設定した場合、ユーザーのタップまたはクリックによって、「carousel-id」ID のカルーセルが index=N のスライドに進みます（1 番目のスライドは index=0、2 番目のスライドは index=1 で、以降も順に続いていきます）。

以下の例の場合、カルーセルは 3 つの画像で構成されており、カルーセルの下にプレビュー ボタンが配置されます。ユーザーがいずれかのボタンをクリックすると、対応するカルーセル アイテムが表示されます。

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel id="carousel-with-preview"
    width="450"
    height="300"
    layout="responsive"
    type="slides">
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="apples"></amp-img>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="lemons"></amp-img>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="blueberries"></amp-img>
  </amp-carousel>
  <div class="carousel-preview">
    <button on="tap:carousel-with-preview.goToSlide(index=0)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
        width="60"
        height="40"
        alt="apples"></amp-img>
    </button>
    <button on="tap:carousel-with-preview.goToSlide(index=1)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
        width="60"
        height="40"
        alt="lemons"></amp-img>
    </button>
    <button on="tap:carousel-with-preview.goToSlide(index=2)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
        width="60"
        height="40"
        alt="blueberries"></amp-img>
    </button>
  </div>
```
[/example]

# 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type</strong></td>
    <td>カルーセル アイテムの表示タイプを指定します。以下のように指定します。
      <ul>
        <li><code>carousel</code> （デフォルト）: すべてのスライドを表示し、横方向にスクロールできます。このタイプがサポートしているレイアウトは、<code>fixed</code>, <code>fixed-height</code>, <code>nodisplay</code> に限られます。</li>
        <li><code>slides</code>: 一度に 1 つのスライドだけを表示します。このタイプがサポートしているレイアウトは、<code>fill</code>, <code>fixed</code>, <code>fixed-height</code>, <code>flex-item</code>, <code>nodisplay</code>, <code>responsive</code> です。</li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>height（必須）</strong></td>
      <td>カルーセルの高さをピクセル単位で指定します。</td>
    </tr>
    <tr>
      <td width="40%"><strong>controls（省略可）</strong></td>
      <td>モバイル デバイス上でカルーセル アイテムを移動するための左矢印と右矢印を常に表示します。
          デフォルトでは、モバイル上のナビゲーション矢印は数秒後に非表示になります。
          矢印の表示設定は、スタイル設定を通じて指定することもできます。また、メディアクエリを使用することで、特定の画面幅の場合に限り矢印を表示することもできます。パソコン上では、子が 1 つだけでない限り、常に矢印が表示されます。</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-next-button-aria-label（省略可）</strong></td>
        <td><code>amp-carousel-button-next</code> の aria-label を設定します。値を指定しなかった場合、「カルーセル内の次のアイテム」が aria-label のデフォルトになります。</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-prev-button-aria-label（省略可）</strong></td>
        <td><code>amp-carousel-button-prev</code> の aria-label を設定します。値を指定しなかった場合、「カルーセル内の前のアイテム」が aria-label のデフォルトになります。</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-button-count-format（省略可）</strong></td>
        <td><code>(%s of %s)</code> といった形式のフォーマット文字列で、<code>amp-carousel-button-next</code> / <code>amp-carousel-button-prev</code> の aria-label のサフィックスとして使用されます。これにより、スクリーン リーダーを使用しているユーザーに向けて、カルーセルの進行状況を知らせることができます。値を指定しなかった場合、「(%s of %s)」がデフォルトになります。</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay（省略可）</strong></td>
        <td>ユーザーの操作なしでスライドを次のスライドに移動します。<br>
          値を指定しなかった場合:
          <ul>
            <li>デフォルトでは、5,000 ミリ秒（5 秒）間隔で次のスライドに移動します。この設定は <code>delay</code> 属性によってオーバーライドできます。</li>
            <li><code>loop</code> 属性が存在しない場合は、<code>amp-carousel</code> に <code>loop</code> 属性が付加されます。</li>
            <li>自動再生を行うには 2 枚以上のスライドが必要です。</li>
            <li>適用されるのは <code>type=slides</code> を指定したカルーセルに限られます。</li>
          </ul>
          値を指定した場合:
          <ul>
            <li><code>loop</code> 属性が存在しない場合は、<code>amp-carousel</code> に <code>loop</code> 属性が付加されます。</li>
            <li>必要な数のループを行った後、<code>loop</code> 属性を削除します。</li>
          </ul></td>
        </tr>
        <tr>
          <td width="40%"><strong>delay（省略可）</strong></td>
          <td><code>autoplay</code> が有効なときに、次のスライドに進むまでの時間をミリ秒単位で指定します。<code>delay</code> 属性を適用できるのは、<code>type=slides</code> を指定したカルーセルに限られます。</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop（省略可）</strong></td>
          <td>ユーザーが最初のアイテムの前や最終アイテムの次に進むことを許可します。ループを行うには少なくとも 3 つのスライドが必要です。<code>loop</code> 属性を適用できるのは、<code>type=slides</code> を指定したカルーセルに限られます。
            <em>例: controls、loop、delay 付き autoplay を有効にしたスライド カルーセルを表示する</em>

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel type="slides"
  width="450"
  height="300"
  controls
  loop
  {% if not format=='email'%}  autoplay
  delay="3000"{% endif %}
  data-next-button-aria-label="Go to next slide"
  data-previous-button-aria-label="Go to previous slide">
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
    width="450"
    height="300"></amp-img>
</amp-carousel>
```
[/example]</td>
          </tr>
          <tr>
            <td width="40%"><strong>共通の属性</strong></td>
            <td>この要素には、AMP コンポーネントに拡張された<a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">共通の属性</a>が含まれます。</td>
          </tr>
        </table>

# スタイル設定 <a name="styling"></a>

* `amp-carousel` 要素セレクタを使用して、自由にスタイルを設定できます。
* カルーセル アイテムをターゲティングするには、`.amp-carousel-slide` クラスセレクタを使用します。
* `amp-carousel` ボタンが無効になっている場合、ボタンは非表示になります。
* デフォルトでは、`.amp-carousel-button` はボタンの背景画像としてインライン SVG を使用します。下記の例のように、独自の SVG や画像でオーバーライドすることができます。

*例: デフォルト `.amp-carousel-button` インライン SVG*

```css
.amp-carousel-button-prev {
  left: 16px;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" fill="#fff" /></svg>');
}
```

*例: デフォルト `.amp-carousel-button` インライン SVG をオーバーライドする*

```css
.amp-carousel-button-prev {
  left: 5%;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" fill="#fff" /></svg>');
}
```

# 検証 <a name="validation"></a>

AMP 検証ツール仕様の [amp-carousel ルール](https://github.com/ampproject/amphtml/blob/master/extensions/amp-carousel/validator-amp-carousel.protoascii)をご覧ください。
