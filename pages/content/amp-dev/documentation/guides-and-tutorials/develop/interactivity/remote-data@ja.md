---
"$title": リモートデータとの連携
"$order": '3'
description: バインド可能なデータが大きすぎたり複雑すぎたりしてページの読み込み時に取得できない場合は、どうすればよいでしょうか。また、各 SKU の価格を調べるのに ...
toc: 'true'
---

バインド可能なデータが大きすぎたり複雑すぎたりしてページの読み込み時に取得できない場合は、どうすればよいでしょうか。また、各 SKU の価格を調べるのに時間がかかってしまうときはどうでしょうか。表示されていない商品について SKU の価格を調べるのは、無駄な作業です。

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) では、その [`src`](../../../../documentation/components/reference/amp-bind.md#attributes) 属性によってリモートデータをフェッチできます。この属性は CORS エンドポイントから JSON をフェッチします。こうしたフェッチは、ページの読み込み時に一度行われるもので、（特にキャッシュから配信されるときに）データの鮮度を確保するのに役立ちます。

また、[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 要素については、`src` 属性をバインドすることも可能です。つまり、ユーザーの操作により、リモート JSON データがフェッチされるようにして、該当のページをバインド可能な状態に変えることができます。

[/tip]

## シャツの購入可能なサイズのフェッチ

ここに用意した例で、リモートデータ取得機能を利用して SKU の価格を調べてみましょう。使用する Express.js 開発用サーバーでは、`app.js` にすでにエンドポイント `/shirts/sizesAndPrices?shirt=<sku>` が含まれており、特定のシャツ（shirt）の SKU に関して、購入可能なサイズと各サイズの価格が返されるようになっています。このサーバーは、ネットワーク遅延をシミュレートするために人為的に 1 秒遅らせて応答を送信します。

リクエスト | レスポンス
--- | ---
`GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}`

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 要素内の JSON データと同様に、こうしたフェッチから返されるリモートデータは、その要素の `id` 属性の下に統合されて利用可能となります。たとえば、上記の例の応答から返されたデータは、次のような式でアクセスできます。

式 | 結果
--- | ---
`shirts['1001'].sizes['XS']` | `8.99`

### データをバインドする

では、ここで e コマースの例に応用してみましょう。まず、新しい SKU が選択されるときに、このシャツのデータをフェッチしましょう。`[src]` バインディングを `amp-state#shirts` 要素に追加します。

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### 購入できないサイズを示す

次に、特定の SKU について購入できないサイズを明示しましょう。`"unavailable"` CSS クラスは、要素に斜線を追加します。これは、購入できないサイズに対応する [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) 内の要素に追加することが可能です。

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

それでは、ページを再読み込みして、お試しください。新しい SKU（シャツの色）が選択されると、購入できないサイズに（わずかな遅れの後に）取り消し線が付けられることになります。

### 初期状態を指定する

しかし、小さな問題が 1 つあります。たとえば、黒のシャツを、デフォルトで選択された色とする場合はどうでしょうか。黒のシャツのサイズと価格のデータを `amp-state#shirts` に追加することが必要となります。これは、明示的なユーザー操作に対してのみ [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) が実行されるためです。

```html
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg",
        "sizes": {
          "XS": 8.99,
          "S": 9.99
        }
      },
<!-- ... -->
```

次に、関連する要素のデフォルトの状態を更新する必要があります。

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <!-- Add the 'unavailable' class to the next three <td> elements
           to be consistent with the available sizes of the default SKU. -->
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

[tip type="note"] <strong>注意:</strong>  [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) は、明示的なユーザー操作に対してのみ実行され、ページの読み込み時には実行されません。そのため、[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) の使用に関係なく、最初のページの読み込みを常に速くすることができます。[/tip]

## 変化するシャツの価格

購入可能なサイズが正しく表示されるようになったので、価格も正確に表示できるようにしましょう。

この AMPPAREL ストアでは、シャツの価格は、色およびサイズの両方によって異なっています。つまり、ユーザーの選んだサイズを追跡するための新しい変数が必要です。新しいアクションをサイズの [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) 要素に追加します。

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

ここで、`selectedSize` の値は `amp-state#selected` 要素により初期化していません。これは、デフォルトで選択されるサイズを意図的に指定しないでおき、代わりに、ユーザーにサイズを選択させるようにしたいためです。

[tip type="tip"] <strong>ヒント:</strong> `AMP.setState()` は、既存の変数に変更を加えるだけでなく、新しい変数を定義する際にも使用できます。式では、未定義の変数は `null` と評価されます。 [/tip]

価格のラベルを囲む新しい `<span>` 要素を追加して、デフォルトで選択されるサイズがないので、デフォルトのテキストを「---」に変更します。

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

これで価格を正確に表示できるようになりました。ぜひお試しください。

## 条件に応じて有効になるボタン

あともう一息です！選択されたサイズが購入できない場合に [Add to cart] ボタンが無効になるようにしましょう。

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**試してみる**: 購入できないサイズを選択した場合は、そのサイズの商品をカートに追加することはできません。
