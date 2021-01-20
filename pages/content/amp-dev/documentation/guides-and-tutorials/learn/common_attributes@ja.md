---
"$title": 一般的な要素属性
"$order": '1'
description: AMP には、さまざまな AMP コンポーネント（および HTML 要素）に拡張される共通の属性を使用できます。ここでは、そうした共通の属性それぞれについて説明します。
toc: 'true'
---

AMP には、さまざまな AMP コンポーネント（および HTML 要素）に拡張される共通の属性を使用できます。ここでは、そうした共通の属性それぞれについて説明します。

## fallback

フォールバックは、該当の要素について、ブラウザがその要素に対応していないことや、基になるリソースの読み込みに失敗したことをユーザーに伝えるためのものです。`fallback` 属性は、フォールバックに対応している AMP 要素の直接の子であれば、どの HTML 要素にも配置できます。フォールバックが正確に動作するかどうかは、その要素の実装によって決まりますが、フォールバック要素は通常、標準的な要素の代わりに表示されます。

多くの場合、画像、アニメーション、オーディオ、動画と一緒に使用します。

例:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive" >
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
```

詳しくは、[プレースホルダとフォールバック](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) をご覧ください。

## heights

`responsive` レイアウトに対応する AMP 要素はすべて、`heights` 属性にも対応しています。この属性の値は、メディアの式に基づくサイズの式です。[`img` タグの sizes 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/img) と似ていますが、大きな違いが 2 つあります。

1. この値は、要素の幅ではなく高さに適用されます。
2. パーセントの値を使用できます。パーセント値は要素の幅の割合を示すものです。たとえば、`80%` という値は、要素の高さが幅の 80% になることを示しています。

メモ: `heights` 属性を `width` および `height` と一緒に指定すると、`layout` はデフォルトで `responsive` に設定されます。

例：

```html
<amp-img src="amp.png"
    width="320" height="256"
    heights="(min-width:500px) 200px, 80%">
</amp-img>
```

詳しくは、[srcset、sizes、heights を使った画像読み込みについての説明](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md) をご覧ください。

## layout

AMP では、一連の [レイアウト](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) を使って、AMP コンポーネントがドキュメントのレイアウトでどのように動作するかを指定できます。特定のコンポーネントのレイアウトを指定するには、`layout` 属性と、その要素で使用可能なレイアウト値をいずれか 1 つ追加します（使用できる値については、該当要素のドキュメントをご覧ください）。

例:

```html
<amp-img src="/img/amp.jpg"
    width="1080"
    height="610"
    layout="responsive"
    alt="an image">
</amp-img>
```

詳しくは、[レイアウトとメディアクエリ](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) および [レイアウトの仕様](amp-html-layout/index.md) をご覧ください。

## media <a name="media"></a>

すべての AMP 要素は `media` 属性に対応しています。`media` の値はメディアクエリです。クエリが一致しない場合、該当の要素はレンダリングされず、そのリソースは（場合によってはその子リソースも）取得されません。ブラウザ ウィンドウのサイズや向きが変わると、メディアクエリが再評価されて、その新しい結果を基に、要素が表示されるか非表示になるかが決まります。

例:

```html
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="466"
    height="355" layout="responsive"></amp-img>
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="527"
    height="193" layout="responsive"></amp-img>
```

詳しくは、[レイアウトとメディアクエリ](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries) をご覧ください。

## noloading

`noloading` 属性は、この要素について「読み込みインジケータ」を**オフ**にする必要があるかどうかを示します。多くの AMP 要素は「読み込みインジケータ」を表示します。このインジケータは、要素がまだ完全に読み込まれていないことを示す基本的なアニメーションです。

多くの場合、画像、アニメーション、動画、広告と一緒に使用します。

例:

```html
<amp-img src="card.jpg"
    noloading
    height="190"
    width="297"
    layout="responsive">
</amp-img>
```

## on

`on` 属性は、イベント ハンドラを要素にインストールするために使用します。対応可能なイベントは要素によって異なります。

多くの場合、ライトボックス、サイドバー、ライブリスト、フォームと一緒に使用します。

構文:

```text
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
```

例:

```html
<button on="tap:my-lightbox">Open lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay">
  ...
</amp-lightbox>
```

詳しくは、[AMP のアクションとイベントについてのページ](amp-actions-and-events.md) をご覧ください。

## placeholder

`placeholder` 属性は、この属性でマークされた要素が親 AMP 要素のプレースホルダとして機能することを示します。この属性は、プレースホルダに対応している AMP 要素の直接の子であれば、どの HTML 要素にも配置できます。デフォルトでは、AMP 要素のリソースのダウンロードや初期化が済んでいない場合でも、その AMP 要素のプレースホルダがすぐに表示されます。準備ができると、AMP 要素は通常、プレースホルダを非表示にしてコンテンツを表示します。プレースホルダが正確に動作するかどうかは、その要素の実装によって決まります。

多くの場合、画像、アニメーション、動画、広告と一緒に使用します。

例:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
```

詳しくは、[プレースホルダとフォールバック](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) をご覧ください。

## sizes

`responsive` レイアウトに対応する AMP 要素はすべて、`sizes` 属性にも対応しています。`sizes` 属性の値は、[`img` タグの sizes 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/img) についての説明のとおり、サイズの式ですが、画像だけでなくあらゆる要素に拡張されます。

例:

```html
<amp-img src="amp.png"
    width="400" height="300"
    layout="responsive"
    sizes="(min-width: 320px) 320px, 100vw">
</amp-img>
```

次のネストされた`img`タグを生成します。

```html
<img decoding="async"
    src="amp.png"
    sizes="(min-width: 320px) 320px, 100vw"
    class="i-amphtml-fill-content i-amphtml-replaced-content">
```

詳しくは、[srcset、sizes、heights を使った画像読み込みについての説明](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md) をご覧ください。

## <code>width</code> と <code>height</code> <a></a>

一部の [レイアウト](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) では、AMP コンポーネントに、整数のピクセル値を含む `width` と `height` の属性を指定する必要があります。

例:

```html
<amp-anim width="245"
    height="300"
    src="/img/cat.gif"
    alt="cat animation">
</amp-anim>
```

詳しくは、[レイアウトとメディアクエリ](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) および [レイアウトの仕様](amp-html-layout/index.md) をご覧ください。
