---
$title: プレースホルダとフォールバック
---
[TOC]

知覚パフォーマンスとプログレッシブ エンハンスメントの観点から、AMP ではできる限りプレースホルダとフォールバックを設定することをおすすめします。

要素によっては、制限を緩和できるようにするだけでも設定する価値があります。たとえば、[`<amp-iframe>`](/ja/docs/reference/components/amp-iframe.html#iframe-with-placeholder) のプレースホルダを設定すれば、iframe をページの上部に表示させることができます。このプレースホルダがないと動作しません。

## プレースホルダ

`placeholder` 属性で指定された要素は、
親 AMP 要素のプレースホルダとして機能します。
指定する場合、`placeholder` 要素は AMP 要素の直接の子にする必要があります。
`placeholder` として指定された要素は常に親 AMP 要素の中に入ります（`fill`）。

<!--embedded amp-anim responsive example -->
<div>
<amp-iframe height="253"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.responsive.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe> 
</div>

デフォルトでは、AMP 要素のリソースがダウンロードや初期化されていない場合でも、
プレースホルダが AMP 要素にすぐに表示されます。
準備ができると、AMP 要素は通常、プレースホルダを非表示にしてコンテンツを表示します。

[tip type="note"]

プレースホルダは AMP 要素でなくてもかまいません。
任意の HTML 要素をプレースホルダとして使用できます。

[/tip]

## フォールバック

要素で `fallback` 属性を使うことで代わりの動作を指定できます。

* ブラウザがサポートしていない要素
* コンテンツを読み込めなかった場合（削除されたツイートなど）
* 画像の種類がサポートされていない場合（WebP はすべてのブラウザでサポートされていないなど）

`fallback` 属性は、AMP 要素だけでなく、*どの* HTML 要素でも設定できます。指定する場合、`fallback` 要素は AMP 要素の直接の子にする必要があります。

##### 例: サポートされていない機能の場合

次の例では、`fallback` 属性を使用して、ブラウザが特定の機能に対応していないことをユーザーに伝えます。

<!--embedded video example  -->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="さらに表示">コードをすべて表示</div>
  <div placeholder></div> 
</amp-iframe> 
</div>

##### 例: 異なる画像形式を配信する場合

次の例では、`fallback` 属性を使用して、WebP フォーマットがサポートされていない場合は JPEG ファイルを使用するようにブラウザに指示します。

<div>
<amp-iframe height=309 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.webp.embed.html"><div overflow tabindex=0 role=button aria-label="さらに表示">コードをすべて表示</div><div placeholder></div></amp-iframe></div>

## プレースホルダとフォールバックの相互作用

動的コンテンツ（`amp-twitter`、`amp-list` など）に依存する AMP コンポーネントでは、フォールバックとプレースホルダは次のように作用します。

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
 
