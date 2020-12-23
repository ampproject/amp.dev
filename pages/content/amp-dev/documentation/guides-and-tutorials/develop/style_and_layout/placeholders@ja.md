---
"$title": プレースホルダとフォールバック
"$order": '3'
descriptions: 認識されているパフォーマンスと進行中の機能強化を考慮すると、可能な場合には、プレースホルダとフォールバックを AMP に使用することがベストプラクティスと言えます。
formats:
- ウェブサイト
- メール
- 広告
- ストーリー
components:
- iframe
author: pbakaus
contributors:
- bpaduch
---

認識されているパフォーマンスと進行中の機能強化を考慮すると、可能な場合には、プレースホルダとフォールバックを AMP に使用することがベストプラクティスと言えます。

要素によっては、制限を緩和できるようにするだけでも設定する価値があります。たとえば、[`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder) のプレースホルダを設定すれば、iframe をページの上部に表示させることができます。このプレースホルダがないと表示することはできません。

## プレースホルダ

`placeholder` 属性が指定された要素は、 親 AMP 要素のプレースホルダとして機能します。 指定する場合、`placeholder` 要素は AMP 要素の直接の子にする必要があります。 `placeholder` として指定された要素は常に親 AMP 要素に入れられます（`fill`）。

<amp-anim src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300">
  <amp-img placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill">
  </amp-img>
</amp-anim>


デフォルトでは、AMP 要素のリソースがダウンロードまたは初期化されていない場合でも、 プレースホルダが AMP 要素にすぐに表示されます。 AMP 要素の準備ができると、通常その要素がプレースホルダを非表示にしてコンテンツを表示します。

[tip type="note"] <strong>注意 –</strong>  プレースホルダは AMP 要素でなくてもかまいません。 任意の HTML 要素をプレースホルダとして使用できます。[/tip]

## フォールバック <a name="fallbacks"></a>

要素に `fallback` 属性を指定すると、その要素は次のようなフォールバックとして機能します。

- ブラウザがサポートしていない要素
- コンテンツを読み込めなかった場合（削除されたツイートなど）
- 画像の種類がサポートされていない場合（すべてのブラウザでサポートされていない WebP など）

AMP要素だけでなく、*&nbsp;any {/ em1} HTML要素に` fallback {/ code0}属性を設定できます。指定する場合、` fallback {/ code2}要素はAMP要素の直接の子である必要があります。``*

##### 例: サポートされていない機能の場合

次の例では、`fallback` 属性を使うことで、ブラウザが特定の機能をサポートしていないことをユーザーに伝えています。

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

次の例では、`fallback` 属性を使用して、WebP 形式がサポートされていない場合に JPEG ファイルを使用するようにブラウザに指示しています。

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

動的コンテンツに依存する AMP コンポーネント（[`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md)、[`amp-list`](../../../../documentation/components/reference/amp-list.md) など）では、フォールバックとプレースホルダは次のように作用します。

<ol>
  <li>コンテンツの読み込み中はプレースホルダが表示されます。</li>
  <li>コンテンツが正常に読み込まれた場合は、プレースホルダは非表示にされ、コンテンツが表示されます。</li>
  <li>コンテンツの読み込みに失敗した場合は、次のようになります。     <ol>       <li>フォールバック要素がある場合は、フォールバックが表示されます。</li>       <li>フォールバック要素がない場合は、そのままプレースホルダが表示されます。</li>     </ol>
</li>
</ol>

## 読み込みインジケータを非表示にする

ほとんどの AMP 要素は、「読み込みインジケータ」を表示するようホワイトリストに登録されています。 読み込みインジケータとは、要素がまだ完全に読み込まれていないことを示す基本的なアニメーションです。 要素に `noloading` 属性を追加すると、この動作を無効にすることができます。
