---
$title: プレースホルダとフォールバック
---

知覚パフォーマンスとプログレッシブ エンハンスメントの観点から、AMP ではできる限りプレースホルダとフォールバックを設定することをおすすめします。

要素によっては、制限を緩和できるようにするだけでも設定する価値があります。たとえば、[`<amp-iframe>`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder) のプレースホルダを設定すれば、iframe をページの上部に表示させることができます。このプレースホルダがないと動作しません。

## プレースホルダ

`placeholder` 属性で指定された要素は、
親 AMP 要素のプレースホルダとして機能します。
指定する場合、`placeholder` 要素は AMP 要素の直接の子にする必要があります。
`placeholder` として指定された要素は常に親 AMP 要素の中に入ります（`fill`）。

[example preview="inline" playground="true" imports="amp-anim:0.1"]
```html
<amp-anim src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300">
  <amp-img placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill">
  </amp-img>
</amp-anim>
```
[/example]

デフォルトでは、AMP 要素のリソースがダウンロードや初期化されていない場合でも、
プレースホルダが AMP 要素にすぐに表示されます。
準備ができると、AMP 要素は通常、プレースホルダを非表示にしてコンテンツを表示します。

[tip type="note"]

プレースホルダは AMP 要素でなくてもかまいません。
任意の HTML 要素をプレースホルダとして使用できます。

[/tip]

## フォールバック <a name="fallbacks"></a>

要素で `fallback` 属性を使うことで代わりの動作を指定できます。

* ブラウザがサポートしていない要素
* コンテンツを読み込めなかった場合（削除されたツイートなど）
* 画像の種類がサポートされていない場合（WebP はすべてのブラウザでサポートされていないなど）

`fallback` 属性は、AMP 要素だけでなく、*どの* HTML 要素でも設定できます。指定する場合、`fallback` 要素は AMP 要素の直接の子にする必要があります。

##### 例: サポートされていない機能の場合

次の例では、`fallback` 属性を使用して、ブラウザが特定の機能に対応していないことをユーザーに伝えます。

[example preview="inline" playground="true" imports="amp-video:0.1"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

##### 例: 異なる画像形式を配信する場合

次の例では、`fallback` 属性を使用して、WebP フォーマットがサポートされていない場合は JPEG ファイルを使用するようにブラウザに指示します。

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

## プレースホルダとフォールバックの相互作用

動的コンテンツ（[`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md)、[`amp-list`](../../../../documentation/components/reference/amp-list.md) など）に依存する AMP コンポーネントでは、フォールバックとプレースホルダは次のように作用します。

<ol>
  <li>コンテンツの読み込み中はプレースホルダが表示されます。</li>
  <li>コンテンツが正常に読み込まれた場合は、プレースホルダは非表示にされ、コンテンツが表示されます。</li>
  <li>コンテンツの読み込みに失敗した場合は、次のようになります。
    <ol>
      <li>フォールバック要素がある場合は、フォールバックが表示されます。</li>
      <li>フォールバック要素がない場合は、プレースホルダが表示され続けます。</li>
    </ol>
  </li>
</ol>

## 読み込みインジケータを非表示にする

ほとんどの AMP 要素は、「読み込みインジケータ」を表示するようホワイトリストに登録されています。
読み込みインジケータとは、要素がまだ完全に読み込まれていないことを示す基本的なアニメーションです。
要素に `noloading` 属性を追加して、この動作を無効にすることができます。
 
