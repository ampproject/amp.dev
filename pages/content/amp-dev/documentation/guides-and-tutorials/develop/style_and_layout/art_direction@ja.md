---
'$title': srcset、sizes、heights を使ったレスポンシブ画像
$order: 4
description: srcset 属性を使用すると、さまざまなメディア式に基づいて要素のアセットを制御できます。特に、すべての amp-img タグで使用して、さまざまな画面 ...
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

## srcset

`srcset` 属性を使用すると、さまざまなメディア式に基づいて要素のアセットを制御できます。特に、すべての [`amp-img`](../../../../documentation/components/reference/amp-img.md) タグで使用して、さまざまな画面サイズに基づいて画像アセットを指定できます。AMP は、`<amp-img>` に <code>srcset</code> 属性が指定されていても <code>sizes</code> が存在しない場合、基礎となるすべての `<amp-img>` の `<img>` タグに対し、<a><code>sizes</code> の HTML5 定義を満たす</a><code>sizes</code> 属性を自動生成します。

次の例では、`srcset` が画面の幅に基づいて使用される画像を指定しています。`w` 記述子は、リスト内の各画像の幅をブラウザに伝えます。

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
>
</amp-img>
```

[/example]

[tip type="note"] <strong>注意:</strong> AMP では、すべてのブラウザで srcset に `w` 記述子を使用できます。 [/tip]

`srcset` を使ってレスポンシブ画像を作成する方法については、[レスポンシブ画像の使用](http://alistapart.com/article/using-responsive-images-now)をご覧ください。

## sizes

`srcset` と一緒にオプションの AMP `sizes` 属性も使用できます。AMP `sizes` 属性では、メディア式に基づいた要素のサイズの計算方法を指定します。<strong>任意の AMP 要素に <code>sizes</code> を定義すると、一致するメディアクエリに従って、その要素に幅のインラインスタイルが設定されます。</strong>ユーザーエージェントは、計算された要素のサイズに基づいて、<code>srcset</code> 属性で指定されたソースのうち最も関連するソースを選択します。

次の例をご覧ください。

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw"
>
</amp-img>
```

[/example]

この `sizes` 属性では、ビューポートが 650 ピクセル以上の場合は、要素の幅をビューポートのサイズの 50% にすると定義しています。たとえば、ビューポートが 800 ピクセルの場合、要素の幅は 400 ピクセルに設定されます。ブラウザでは、デバイスピクセル比を 1 と想定し、400 ピクセルと比較して `srcset` のリソースを選択します。この例では `hummingbird-narrow.jpg`（320 ピクセル）が選択されます。

[tip type="important"] <strong>重要:</strong> sizes 属性とともに width と height も指定されている場合、layout はデフォルトで `responsive` に設定されます。[/tip]

<a>AMP <code data-md-type="codespan">sizes</code> 属性については、こちら</a>をお読みください。

## heights

`responsive` レイアウトを使用できる AMP カスタム要素はすべて、`heights` 属性にも対応しています。この属性の値は、[img サイズ属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/img) と同様、メディア式に基づくサイズ式ですが、大きく異なる点が 2 つあります。

1. 適用されるのは、要素の幅ではなく高さです。
2. `86%` などのパーセント値を使用できます。パーセント値を使用する場合、その値は要素の幅に対する比率を示します。

`heights` 属性とともに `width` と `height` も指定されている場合、`layout` はデフォルトで `responsive` に設定されます。

次の例をご覧ください。

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
```

[/example]

この例では、要素の高さはデフォルトで幅の 80% ですが、ビューポートが `500px` より広い場合、`200px` が上限となります。
