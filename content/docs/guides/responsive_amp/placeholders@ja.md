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

{% call callout('注', type='note') %}
プレースホルダは AMP 要素でなくてもかまいません。HTML 要素もプレースホルダとして使用できます。
{% endcall %}

## フォールバック

`fallback` 属性を使用して、ブラウザがサポートしていない要素に対する代わりの動作を指定します。たとえば、`fallback` 属性を使用して、ブラウザが特定の機能に対応していないことをユーザーに伝えます。

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

`fallback` 属性は、AMP 要素だけでなく、どの HTML 要素でも設定できます。指定する場合、`fallback` 要素は AMP 要素の直接の子にする必要があります。

## プレースホルダとフォールバックの相互関係

動的なコンテンツに依存する AMP コンポーネント（`amp-twitter`、`amp-list` など）では、フォールバックとプレースホルダの相互関係は次のようになります:

<ol>
  <li>コンテンツが読み込まれている最中は、プレースホルダが表示されます。</li>
  <li>コンテンツが正常に読み込まれると、プレースホルダは非表示となり、コンテンツが表示されます。</li>
  <li>コンテンツの読み込みに失敗した場合:
    <ol>
      <li>フォールバック要素がある場合は、フォールバックが表示されます。</li>
      <li>それ以外の場合は、引き続きプレースホルダが表示されます。</li>
    </ol>
  </li>
</ol>

## 読み込みインジケータを非表示にする

ほとんどの AMP 要素は、「読み込みインジケータ」を表示するようホワイトリストに登録されています。読み込みインジケータとは、要素がまだ完全に読み込まれていないことを示す基本的なアニメーションです。要素に `noloading` 属性を追加して、この動作を無効にすることができます。

