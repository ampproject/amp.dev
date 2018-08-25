---
$title: プレースホルダとフォールバック
$order: 3
toc: true
components:
- iframe
---
[TOC]

知覚パフォーマンスとプログレッシブ エンハンスメントの観点から、AMP では可能な限りプレースホルダとフォールバックを設定することをおすすめします。

 要素によっては、制限を緩和できるだけでも設定する価値があります。たとえば、[`<amp-iframe>`](/ja/docs/reference/components/amp-iframe.html#iframe-with-placeholder) のプレースホルダを設定すれば、ページの上部で使用できるようになります。このプレースホルダがないと動作しません。

## プレースホルダ

`placeholder` 属性で指定された要素は、親 AMP 要素のプレースホルダとして機能します。 指定する場合、`placeholder` 要素は AMP 要素の直接の子にする必要があります。`placeholder` として指定された要素は常に親 AMP 要素の中に入ります（`fill`）。

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

デフォルトでは、AMP 要素のリソースのダウンロードや初期化がまだ行われていない場合でも、プレースホルダが AMP 要素にすぐに表示されます。準備ができると、AMP 要素は通常はプレースホルダを非表示にして、コンテンツを表示します。

注: プレースホルダは AMP 要素でなくてもかまいません。HTML 要素もプレースホルダとして使用できます。

## フォールバック

要素で `fallback` 属性を使うことで代わりの動作を指定できます。

* ブラウザがサポートしていない要素
* コンテンツを読み込めなかった場合（削除されたツイートなど）
* 画像の種類がサポートされていない場合（WebP は一部のブラウザでサポートされません）

`fallback` 属性は、AMP 要素だけでなく、「あらゆる」HTML 要素で設定できます。この属性を指定する場合は、`fallback` 要素を AMP 要素の直接の子にする必要があります。

##### 例: サポートされていない機能

次の例では、`fallback` 属性を使用して、ブラウザが特定の機能に対応していないことをユーザーに伝えます。

<!--embedded video example  -->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

## 読み込みインジケータを非表示にする

ほとんどの AMP 要素は、「読み込みインジケータ」を表示するようホワイトリストに登録されています。読み込みインジケータとは、要素がまだ完全に読み込まれていないことを示す基本的なアニメーションです。要素に `noloading` 属性を追加して、この動作を無効にすることができます。

