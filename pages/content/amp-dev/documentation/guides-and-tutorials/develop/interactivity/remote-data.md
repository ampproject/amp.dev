---
$title: Working with remote data
$order: 3
description: 'What if your bindable data is too large or complex to retrieve at page load? Or what if each SKU has a price that takes a ...'
toc: true
---



What if your bindable data is too large or complex to retrieve at page load? Or what if each SKU has a price that takes a long time to look up? Looking up prices for SKUs for non-viewed items is wasted work.

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) supports fetching remote data via its [`src`](../../../../documentation/components/reference/amp-bind.md#attributes)attribute, which fetches JSON from a CORS endpoint. This fetch is performed once and at page load and is useful for ensuring freshness of data (especially when served from a cache).

You can also bind the `src` attribute for the [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) element. This means that a user action can trigger a fetch of remote JSON data into the page's bindable state.

[/tip]

## Fetching available sizes for a shirt

Let's make use of the ability to fetch remote data to look up prices of SKUs in our sample. Our Express.js development server in `app.js` already has an endpoint `/shirts/sizesAndPrices?shirt=<sku>` which, given a shirt SKU, returns the available sizes and price for each size. It sends the response with an artificial delay of one second to simulate network latency.

|  Request                              |  Response |
|---------------------------------------|-----------|
| `GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}` |

Similar to the JSON data within [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) elements, the remote data returned from these fetches are merged into and available under the element's `id` attribute. For example, the data returned from the example response above can be accessed in an expression:


|  Expression                  |  Result |
|------------------------------|---------|
| `shirts['1001'].sizes['XS']` | `8.99`  |

### Bind the data

Now, let's apply this to our e-commerce example. First let's fetch this shirt data when a new SKU is selected. Add a `[src]` binding to our `amp-state#shirts` element:

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### Indicate unavailable sizes

Next, let's clearly mark unavailable sizes as such for a given SKU. The `"unavailable"` CSS class adds a diagonal line through an element -- we can add it to the elements within [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) corresponding to unavailable sizes:

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

Now, reload the page and try it out. Selecting a new SKU (shirt color) will cause unavailable sizes to be crossed-out (after a short delay).

### Specify initial states

There's a small problem though -- what about the black shirt, the default selected color?  We'll need to add the size and price data of the black shirt to `amp-state#shirts` because [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) only runs in response to explicit user action:

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

And, we'll need to update the default state of relevant elements:

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

[tip type="note"]
**NOTE –**  [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) does not run on page load -- only in response to explicit user action. This makes sure the initial page load is consistently fast across pages regardless of [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) usage.
[/tip]

## Variable shirt prices

Now that we correctly display the available sizes, let's make sure the correct price also displays.

Our AMPPAREL store is peculiar in that shirt price is specific to both color AND size. That means we need a new variable to track the user-selected size. Add a new action to our size [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) element:

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

Notice that we're not initializing the value of `selectedSize` via the `amp-state#selected` element. That's because we intentionally don't provide a default selected size and instead want to force the user to choose a size.

[tip type="tip"]
**TIP –** `AMP.setState()` can be used for defining new variables in addition to modifying exist ones. Expressions will evaluate undefined variables to `null`.
[/tip]

Add a new `<span>` element wrapping the price label and change the default text to "---" since there's no default size selection.

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

And we have correct prices! Try it out.

## Conditionally-enabled button

We're almost done! Let's disable the "Add to cart" button when the selected size is unavailable:

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**Try it out**:  If you select a size that's unavailable, you can't add it to the cart.
