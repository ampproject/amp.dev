---
'$title': Improving the interactivity
$order: 2
description: スターターコードで提供されるのは、ごく基本的なユーザーエクスペリエンスです。次のように、いくつかの方法を使ってユーザーエクス...
---

スターターコードで提供されるのは、ごく基本的なユーザー エクスペリエンスです。次のように、いくつかの方法を使ってユーザー エクスペリエンスを向上させることができます。

- インジケーターを追加して、現在のスライドとスライドの総数を表示する。
- ユーザーが別のシャツの色を選択したら、画像カルーセルを変更して、選択された色のシャツの画像を表示する。

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) コンポーネントの導入以前は、こうした機能の追加は不可能でした。実際に [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) を使用して、こうした新機能をサンプルコードに追加してみましょう。

## `amp-bind` コンポーネントのインストール

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) は、データバインディングや JS のような式を使ってカスタマイズされたインタラクティブ性を実現する AMP コンポーネントです。[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) を使用するには、それをページにインストールする必要があります。

[`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) ファイルを開き、ページの `<head>` セクションにある AMP コンポーネントのリストに、下記のスクリプトを追加します。

```html
<script
  async
  custom-element="amp-bind"
  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
></script>
```

## スライドのインジケータの追加

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) は、要素の属性をカスタムの式にバインドすることで機能します。こうした式では「状態」（可変の JSON データ）を参照できます。この状態は [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) に含まれる [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) コンポーネントを通じて初期化できます。

### スライドのステータスを初期化する

画像カルーセルに現在表示されているスライドのインデックスをトラッキングする、状態変数を初期化しましょう。[`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) を開き、ページの `<body>` の先頭（`<header>` の前）に下記のスクリプトを追加します。

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 要素内のデータには、要素に関連付けられている ID を使ってアクセスできます。たとえば、次の式フラグメントを使ってこの変数を参照できます。

```javascript
selected.slide; // Evaluates to 0.
```

### スライドのステータスを更新する

次に、ユーザーがカルーセルのスライドを変更したときにこの変数を更新しましょう。これを行うには、既存の [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 要素に下記の `"on"` アクションを追加します。

```html
<amp-carousel
  type="slides"
  layout="fixed-height"
  height="250"
  id="carousel"
  on="slideChange:AMP.setState({selected: {slide: event.index}})"
></amp-carousel>
```

これで、[`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) に表示されているスライドが変わるたびに、アクション `AMP.setState` が下記の引数で呼び出されます。

```javascript
{
  selected: {
    slide: event.index;
  }
}
```

`event.index` 式の評価結果は新しいスライドのインデックスになり、`AMP.setState()` アクションによってこのオブジェクトリテラルが現在の状態にマージされます。これにより、`selected.slide` の現在の値が `event.index` の値に置き換えられます。

[tip type="tip"] <strong>ヒント:</strong> `AMP.setState()` は、ネストされたオブジェクト リテラルのディープマージを行います。詳しくは、[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) のドキュメントをご覧ください。[/tip]

### インジケータの要素をバインドする

次に、現在表示されているスライドをトラッキングするこの状態変数を使って、スライドのインジケータを作成しましょう。スライドのインジケータの要素を見つけて（`<!-- TODO: "Add a slide indicator" -->` を検索）、その子要素に以下のバインドを追加します。

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]` は `class` 属性を変更するバインドです。これを使用して、任意の要素に対して CSS クラスを追加または削除できます。

**試してみる**: ページを更新してスライドを変更してみましょう。

カルーセルのスライドを変更すると、次のようになります。

1. `slideChange` イベントがトリガーされます。
2. 上記により、`AMP.setState` アクションが呼び出されます。
3. 上記により、状態変数 `selected.slide` が更新されます。
4. 上記により、インジケータの `<span>` 要素の `[class]` バインドが更新されます。

これで、スライドのインジケーターが機能します。

[tip type="success"]

ユーザーがスライドのインジケータのドットをタップしたときに、選択された項目で画像カルーセルを更新する、という機能を追加できるかどうか考えてみましょう。ヒントとしては、[`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) で `tap` イベントと `[slide]` バインドを使用します。

[/tip]

## カルーセルの画像の変更

色の選択を変えたときに別の色のシャツの画像が表示されるようになると便利です。[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) を使って、[`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 内の [`amp-img`](../../../../documentation/components/reference/amp-img.md) 要素で `[src]` をバインドすることでこの処理を実装できます。

### SKU の状態を初期化する

まず、状態データを、各色のシャツの画像のソース URL で初期化する必要があります。新しい [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 要素を使ってこの処理を行います。

```html
<!-- Available shirts. Maps unique string identifier to color and image URL string. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blue",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "brown",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "dark green",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "gray",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "light gray",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "navy",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "wine",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

この [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 要素には、シャツの ID 文字列（つまり、SKU）を、対応するシャツの色と画像 URL にマッピングする JSON オブジェクトが含まれています。ここには JSON 配列を使用することもできますが、オブジェクトを使用すると、後で紹介する便利な処理が可能になります。

これで、シャツの ID を使って画像 URL にアクセスできるようになりました。たとえば、`shirts['10014'].color` の評価結果は `"dark green"` になり、`shirts['10030'].image` は `"wine"` 色のシャツの画像 URL を返します。

### 選択されている SKU をトラッキングする

選択されている SKU をトラッキングする別の状態変数を追加すれば、[`amp-img`](../../../../documentation/components/reference/amp-img.md) 要素に式をバインドして、選択されている SKU が変わったときに `src` 属性が更新されるようにすることができます。次のように、既存の `amp-state#selected` 要素の JSON に新しい `sku` キーを追加します。

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### SKU の状態を更新する

[`amp-selector`](../../../../documentation/components/reference/amp-selector.md) に "on" アクションを追加します。このアクションは、別の色が選択されるたびに `selected.sku` 変数を更新します。

```html
<amp-selector
  name="color"
  on="select:AMP.setState({selected: {sku: event.targetOption}})"
></amp-selector>
```

[tip type="tip"] <strong>ヒント:</strong> この処理は、[`amp-selector`](../../../../documentation/components/reference/amp-selector.md) 内の各 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 子要素に `on="tap:AMP.setState(...)` アクションを追加することによっても実装できます。[`amp-selector`](../../../../documentation/components/reference/amp-selector.md) の利点の 1 つは、上記のような方法でマークアップを単純化できることです。[/tip]

### 画像要素をバインドする

次に、[`amp-img`](../../../../documentation/components/reference/amp-carousel.md) にバインドを追加します。

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img
  width="200"
  height="250"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="300"
  height="375"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="400"
  height="500"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
```

[tip type="note"] <strong>注意:</strong> 実際には、カルーセル内の各画像はそれぞれ別の `src` を持つ可能性があります。そのようにするには、上記の単一の画像を複数の画像で置き換えます。説明を簡単にするため、このチュートリアルでは単一の画像を異なるサイズで使用しています。 [/tip]

**試してみる**: ページを更新して、シャツに別の色を選択してみましょう。別の色を選択するとカルーセルの画像が更新され、選択した色のシャツが表示されます。
