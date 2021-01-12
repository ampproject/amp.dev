---
"$title": Working with remote data
"$order": '3'
description: 如果您的可绑定数据过大或过于复杂，以致无法在网页加载时检索，该怎么办？或者，如果每个库存量单位 (SKU) 的价格…
toc: 'true'
---

如果您的可绑定数据过大或过于复杂，以致无法在网页加载时检索，该怎么办？或者，如果每个库存量单位 (SKU) 的价格都需要系统花费很长时间才能完成查询，该怎么办？针对用户不想查看的商品查询 SKU 价格纯粹是徒劳。

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 支持通过其 [`src`](../../../../documentation/components/reference/amp-bind.md#attributes) 属性提取远程数据，该属性会从 CORS 端点提取 JSON。此项提取操作会在网页加载时执行 1 次，因此有助于确保数据的新鲜度（尤其是当数据由缓存提供时）。

您也可以为 [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 元素绑定 `src` 属性。这意味着，用户操作会触发系统提取远程 JSON 数据，将这些数据纳入相应网页的可绑定状态。

[/tip]

## 提取衬衫的有货尺码

我们不妨利用远程数据提取功能来查询我们所用示例中的 SKU 价格。我们在 `app.js` 中的 Express.js 开发服务器已具有 `/shirts/sizesAndPrices?shirt=<sku>` 端点；一旦用户选定了衬衫 SKU，该端点即会返回所有有货的尺码以及每种尺码的价格。它会在人为的 1 秒延迟后发送响应，以模拟网络延迟。

请求 | 响应
--- | ---
`GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}`

与 [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 元素中的 JSON 数据类似，这些提取操作所返回的远程数据会被合并到相应元素的 `id` 属性中，且会显示在该属性下。例如，要访问上文中的示例响应所返回的数据，您可以使用如下表达式：

表达式 | 结果
--- | ---
`shirts['1001'].sizes['XS']` | `8.99`

### 绑定数据

现在，我们就将上述原理应用到我们的电子商务示例中。首先，我们要提取与所选的新 SKU 对应的衬衫数据。为此，我们要将所需的 `[src]` 绑定添加到我们的 `amp-state#shirts` 元素中：

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### 指明无货的尺码

接下来，我们将为所选 SKU 清晰地标明无货的尺码。`"unavailable"` CSS 类会在相应元素上添加一条对角线 - 我们可将它添加到 [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) 内与无货尺码对应的元素中：

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

现在，请重新加载该网页并试着操作一下。选择新的 SKU（衬衫颜色）会导致无货尺码被划上一条对角线（在短暂延迟后）。

### 指定初始状态

但有个小问题 - 该如何对待黑色（默认选择的颜色）衬衫呢？我们需要将黑色衬衫的尺码和价格数据添加到 `amp-state#shirts` 中，因为 [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) 只会为响应明确的用户操作而运行：

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

并且，我们需要更新相关元素的默认状态：

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

[tip type="note"] **注**：[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) 不会在网页加载时运行，它只会为响应明确的用户操作而运行。这样可以确保所有网页都能以非常快的速度完成初始网页加载，无论网页是否使用了 [`amp-bind`](../../../../documentation/components/reference/amp-bind.md)。[/tip]

## 可变的衬衫价格

鉴于我们已能正确显示有货尺码，下面我们将确保也能显示正确的价格。

我们的 AMPPAREL 商店的独特之处在于，衬衫价格同时取决于颜色和尺码。这意味着，我们需要使用一个新的变量来跟踪用户所选的尺码。为此，我们将在我们的尺码 [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) 元素中添加一项新操作：

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

请注意：我们不会通过 `amp-state#selected` 元素对 `selectedSize` 的值进行初始化，因为我们有意不提供默认选定尺码，而是希望强制用户选择一种尺码。

[tip type="tip"] <strong>提示</strong>：`AMP.setState()` 可用于定义新变量以及修改现有变量。相关表达式对未定义变量的计算结果将是 `null`。
[/tip]

然后，添加一个新的 `<span>` 元素来封装价格标签，并将默认文本改为“---”，因为没有默认尺码选择。

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

现在，我们也能显示正确的价格了！试试看。

## 有条件启用的按钮

我们就快大功告成了！下面，我们将设置在所选尺码无货时停用“Add to cart”按钮：

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**试试看**：如果您选择的尺码无货，您便无法将其加入购物车。
