---
$title: srcset、sizes、heights を使ったレスポンシブな画像
$order: 4
toc: true
---
[TOC]

## srcset

`srcset` 属性を使用すると、さまざまなメディア式に基づいて要素のアセットを制御できます。特に、すべての [`amp-img`](/ja/docs/reference/amp-img.html) タグで使用して、さまざまな画面サイズに基づいて画像アセットを指定できます。

次の例では、`srcset` が画面の幅に基づいて使用される画像を指定しています。`w` 記述子は、リスト内の各画像の幅をブラウザに伝えます。

[sourcecode:html]
<amp-img
src="wide.jpg" width="640" height="480"
srcset="wide.jpg 640w,
narrow.jpg 320w">
</amp-img>
[/sourcecode]

{% call callout('注', type='note') %}
AMP では、すべてのブラウザで srcset に `w` 記述子を使用できます。
{% endcall %}

`srcset` を使ってレスポンシブな画像を作成する方法について詳しくは、[レスポンシブな画像の使用に関する記事](http://alistapart.com/article/using-responsive-images-now) をご覧ください。

## sizes

`srcset` と一緒に `sizes` 属性も使用できます。`sizes` 属性では、メディア式に基づいた要素のサイズの計算方法を指定します。ユーザー エージェントは、計算された要素のサイズに基づいて、`srcset` 属性で指定されたソースのうち最も関連するソースを選択します。

次の例をご覧ください。

[sourcecode:html]
<amp-img
  src="wide.jpg" width="640" height="480"
  srcset="wide.jpg 640w, narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw">

</amp-img>
[/sourcecode]

この `sizes` 属性では、ビューポートが 650 ピクセル以上の場合は、要素の幅をビューポートのサイズの 50% にすると定義しています。たとえば、ビューポートが 800 ピクセルの場合、要素の幅は 400 ピクセルに設定されます。ブラウザでは、デバイス ピクセル比を 1 と想定し、400 ピクセルと比較して `srcset` のリソースを選択します。この例では `narrow.jpg`（320 ピクセル）が選択されます。

{% call callout('重要', type='caution') %}
sizes 属性とともに width と height も指定されている場合、layout はデフォルトで `responsive` に設定されます。
{% endcall %}


`sizes` および `srcset` 属性とメディアクエリの比較について詳しくは、[srcset と sizes](https://ericportis.com/posts/2014/srcset-sizes/) に関するブログ投稿をご覧ください。

## heights

`responsive` レイアウトを使用できる AMP カスタム要素はすべて、`heights` 属性にも対応しています。この属性の値は、[img サイズ属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/img) と同様、メディア式に基づくサイズ式ですが、大きく異なる点が 2 つあります。

1. 適用されるのは、要素の幅ではなく高さです。
2. `86%` などのパーセント値を使用できます。パーセント値を使用する場合、その値は要素の幅に対する比率を示します。

`heights` 属性とともに `width` と `height` も指定されている場合、`layout` はデフォルトで `responsive` に設定されます。

次の例をご覧ください。

[sourcecode:html]
<amp-img src="https://acme.org/image1.png"
  width="320" height="256"
  heights="(min-width:500px) 200px, 80%">

</amp-img>
[/sourcecode]

この例では、要素の高さはデフォルトで幅の 80% ですが、ビューポートが `500px` より広い場合、`200px` が上限となります。
