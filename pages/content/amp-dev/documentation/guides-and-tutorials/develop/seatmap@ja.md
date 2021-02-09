---
'$title': シートマップの作成
$order: 104
description: シートマップは、チケット発行業者のウェブアプリの重要な要素ですが、AMP で実装するのは困難です。AMP でシートマップを実装する方法につい学習します。
tutorial: 'true'
formats:
  - websites
author: kul3r4
contributors:
  - pbakaus
---

シートマップは、チケット発行業者のウェブアプリの重要な要素ではありますが、AMP で実装するのは至難の業です。この記事では、提供されている AMP コンポーネントを組み合わせ、AMP でシートマップを実装する方法について学習します。

[tip] 以下で説明する実践を実装したライブサンプルは、[こちら](../../../documentation/examples/documentation/SeatMap.html)にあります。 [/tip]

## 必要な AMP コンポーネント

必要なコンポーネントの確認から始めましょう。

### amp-pan-zoom

[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) は、ダブルタップやピンチ操作によってコンテンツを拡大縮小させるためのコンポーネントです。シートマップ実装の基礎として使用します。

### amp-list

[`amp-list`](../../../documentation/components/reference/amp-list.md) は、CORS JSON エンドポイントから動的にコンテンツをフェッチし、提供されるテンプレートを使ってレンダリングするコンポーネントです。シートマップの現在の空席状況をフェッチし、ユーザーに最新のデータを表示できるようにします。

### amp-bind

[`amp-bind`](../../../documentation/components/reference/amp-bind.md) は、ページにインタラクティビティを追加するコンポーネントです。ここでは、選択されたシート数を追跡するために必要となります。

### amp-selector

[`amp-selector`](../../../documentation/components/reference/amp-selector.md) は、オプションのメニューを提示するコントロールで、ユーザーが操作することができます。シートマップ全体をオプションのメニューとし、各シートをオプションとして考えます。CSS 表現を使用することで、シートの選択状態のスタイリングが非常に簡単になります。たとえば、以下の表現の場合、シートが選択されるとオレンジ色で塗りつぶされます。

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## 必要なもの

1. 各シートを `rect` 要素で表現する SVG としてシートマップを描画するには、各シートの情報が必要です。位置 `x` と `y`、`width`、 `height` のほか、矩形の角に丸みをつけるには `rx` と `ry` が必要となります。
2. 予約するために使用できる各シートの一意の識別子。
3. `viewbox` 属性に使用するシートマップの総幅と総高さ。

## シートマップの描画

シートマップは、[`amp-list`](../../../documentation/components/reference/amp-list.md) と [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md) を使ってレンダリングされます。[`amp-list`](../../../documentation/components/reference/amp-list.md) 呼び出しからデータを受け取ると、そのデータを使用してシートをイテレートできます。

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## 予約不可シートのスタイリング

上記の例では、`{% raw %}{{unavailable}}{% endraw %}` は JSON エンドポイントが返して予約不可シートのスタイリングに使用すフィールドの値です。このアプローチでは、テンプレートがページ全体の `<html>` 要素をラップできないため、シートが予約不可能である場合に `option="{{id}}"` 属性を削除できません。

以下のようにタグを繰り返す方法が、別のより冗長的なアプローチとして考えられます。

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## シートマップのサイズ設定

シートマップのサイズが固定されていない限り、シートマップを含む [`amp-list`](../../../documentation/components/reference/amp-list.md) のサイズを設定するのは困難です。[`amp-list`](../../../documentation/components/reference/amp-list.md) には、固定した寸法か `layout="fill"`（親コンテナの利用可能なスペースを使用する）の使用が必要となります。この問題は、以下の 2 つの方法で解決できます。

1. ページのヘッダーやフッターといったほかのコンポーネントが使用するスペースがわかったら、利用できるスペースを計算します。この計算は、CSS 内で `calc` 式を使用して、[`amp-list`](../../../documentation/components/reference/amp-list.md) の親 div の `min-height` として割り当てて行います。
2. ページレイアウトの高さがわかったら、flex レイアウトを使用します。

## amp-pan-zoom のスタイリング

前のセクションで説明したアプローチを使用する場合、[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) には、`layout="fill"` も使用する必要があります。

[tip type="tip"] **ヒント –** シートマップの周りにホワイトスペースを維持して、ピンチとズームの領域にするには、以下を行います。

- svg をラッピングする div を追加する
- パディングを追加する

ラッピングする div がなく、代わりに SVG にマージンを追加すると、マージンの部分はピンチとズームの領域に追加されません。[/tip]

## 状態の処理

ユーザーがさまざまなシートをクリックする場合、`amp-state` と以下のいずれかを使って、選択されたシートの `id` を変数に入れて追跡することができます。

- 各シートに [`amp-bind`](../../../documentation/components/reference/amp-bind.md) 式を追加して、選択されたシートをリストに追加する
- または、選択されたすべてのシートがリストに追加されるように、[`amp-selector`](../../../documentation/components/reference/amp-selector.md) とアクション `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` を使用する

最初のアプローチの場合は、[`amp-selector`](../../../documentation/components/reference/amp-selector.md) を追加する必要はありませんが、シートが選択または選択解除されるたびに、それぞれの [`amp-bind`](../../../documentation/components/reference/amp-bind.md) 式が評価されることになるため、シートマップの動作が非常に遅くなる可能性があります。

2 つ目のアプローチでは、テンプレートがレンダリングする各シートに対し、[`amp-bind`](../../../documentation/components/reference/amp-bind.md) 式の重複を減らすことができます。

## 最終的な HTML 構造

参考までに、シートマップの最終 HTML を以下に示します。

[sourcecode:html]
{% raw %}<div class="seatmap-container">
<amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
<template type="amp-mustache">
<amp-pan-zoom layout="fill" class="seatmap">
<amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
<div class="svg-container">
<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>
</div>
</amp-selector>
</amp-pan-zoom>
</template>
</amp-list>

</div>{% endraw %}
[/sourcecode]
