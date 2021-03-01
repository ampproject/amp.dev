---
'$title': Working with remote data
$order: 3
description: 페이지 로드 시 바인딩할 수 있는 데이터가 가져오기에 너무 크거나 복잡한 경우 어떻게 해야 할까요? 또는 검색하는 데 시간이 오래 걸리는 가격이 각 SKU에 지정된 경우에는...
toc: 'true'
---

페이지 로드 시 바인딩할 수 있는 데이터가 가져오기에 너무 크거나 복잡한 경우 어떻게 해야 할까요? 또는 검색하는 데 시간이 오래 걸리는 가격이 각 SKU에 지정된 경우에는 어떻게 할까요? 표시되지 않는 항목의 SKU 가격을 찾는 것은 시간 낭비입니다.

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state)는 [`src`](../../../../documentation/components/reference/amp-bind.md) 속성을 통한 원격 데이터 가져오기를 지원하며, CORS 엔드포인트에서 JSON을 가져옵니다. 페이지 로드 시 한 번만 가져오며 데이터를 최신 상태로 유지하는 데 유용합니다(특히 캐시에서 제공되는 경우).

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 요소의 `src` 속성을 바인딩할 수도 있습니다. 즉 사용자의 동작이 원격 JSON 데이터 가져오기를 트리거할 수 있으며 이렇게 가져온 데이터는 페이지에 바인딩할 수 있는 상태가 됩니다.

[/tip]

## 주문 가능한 셔츠 사이즈 가져오기

샘플을 통해 원격 데이터를 가져와서 SKU의 가격을 찾는 기능을 살펴보겠습니다. `app.js`의 Express.js 개발 서버에는 이미 엔드포인트 `/shirts/sizesAndPrices?shirt=<sku>`가 있으며, 셔츠 SKU가 제공되면 주문 가능한 사이즈 및 사이즈별 가격을 반환합니다. 네트워크 지연 시간을 시뮬레이션하기 위해 1초의 인위적인 지연이 있는 응답을 전송합니다.

| 요청                                  | 응답                                         |
| ------------------------------------- | -------------------------------------------- |
| `GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}` |

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 요소 내의 JSON 데이터와 유사하게, 가져오기 시 반환되는 원격 데이터는 요소의 `id` 속성에 병합되어 사용할 수 있습니다. 예를 들어 위의 예제 응답에서 반환되는 데이터는 다음과 같은 표현식에서 액세스할 수 있습니다.

| 표현식                       | 결과   |
| ---------------------------- | ------ |
| `shirts['1001'].sizes['XS']` | `8.99` |

### 데이터 바인딩

이제 전자상거래 예제에 적용해 보겠습니다. 먼저 새 SKU 선택 시 이 셔츠 데이터를 가져와보죠. `amp-state#shirts` 요소에 `[src]` 바인딩을 추가합니다.

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state
  id="shirts"
  [src]="'/shirts/sizesAndPrices?sku=' + selected.sku"
></amp-state>
```

### 주문 불가한 사이즈 표시

다음으로, 주어진 SKU에서 주문 불가 사이즈를 명확하게 표시해 보겠습니다. `"unavailable"` CSS 클래스는 요소에 대각선을 추가합니다. 이 클래스를 주문 불가 사이즈인 [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) 내의 요소에 추가할 수 있습니다.

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

이제 페이지를 새로고침하고 시도해 보세요. 새 SKU(셔츠 색상)를 선택하면 약간의 지연 후 주문 불가 사이즈에 선이 그어집니다.

### 초기 상태 지정

여기서 사소한 문제가 생깁니다. 기본으로 선택되는 색상인 검은색 셔츠는 어떻게 해야 할까요? [`amp-bind`](../../../../documentation/components/reference/amp-bind.md)는 명시적인 사용자 동작의 응답으로만 실행되므로 검은색 셔츠의 사이즈 및 가격 데이터를 `amp-state#shirts`에 추가해야 합니다.

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

또한 관련 요소의 기본 상태를 업데이트해야 합니다.

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
      <td
        class="unavailable"
        [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'"
      >
        <div option="M">M</div>
      </td>
      <td
        class="unavailable"
        [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'"
      >
        <div option="L">L</div>
      </td>
      <td
        class="unavailable"
        [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'"
      >
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

참고: [`amp-bind`](../../../../documentation/components/reference/amp-bind.md)는 페이지 로드 시 실행되지 않으며 명시적인 사용자 동작의 응답으로만 실행됩니다. 따라서 [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) 사용 여부와 무관하게 모든 페이지의 초기 페이지 로드가 일관적으로 빨라집니다.

## 가변적인 셔츠 가격

주문할 수 있는 사이즈는 올바르게 표시했으니 이제 올바른 가격도 표시해 보겠습니다.

AMPPAREL 매장은 특이하게도 색상과 사이즈에 따라 셔츠 가격이 달라집니다. 따라서 사용자가 선택한 사이즈를 추적하기 위해서는 새 변수가 필요합니다. 다음과 같이 사이즈 [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) 요소에 새로운 동작을 추가합니다.

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector
  name="size"
  on="select:AMP.setState({selectedSize: event.targetOption})"
></amp-selector>
```

`amp-state#selected` 요소를 통해 `selectedSize`의 값을 초기화하는 게 아니라는 점에 주목하세요. 의도적으로 기본 선택된 사이즈를 제공하지 않고 대신 사용자가 사이즈를 선택하도록 하기 때문입니다.

[tip type="tip"] <strong>도움말 –</strong> `AMP.setState()`는 기존 변수를 수정하는 것 외에 새 변수를 정의하는 데에도 사용할 수 있습니다. 표현식에서 정의되지 않은 변수를 `null`로 간주합니다. [/tip]

선택된 기본 사이즈가 없으므로 가격 라벨을 래핑하는 새로운 `<span>` 요소를 추가하고 기본 텍스트를 "---"로 변경합니다.

```html
<h6>
  PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

이제 올바른 가격이 표시됩니다. 시도해 보세요.

## 조건부로 활성화되는 버튼

이제 거의 다 끝나갑니다. 선택한 사이즈를 주문할 수 없는 경우 "장바구니에 추가" 버튼이 비활성화되도록 하겠습니다.

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input
  type="submit"
  value="ADD TO CART"
  disabled
  class="mdl-button mdl-button--raised mdl-button--accent"
  [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]"
/>
```

**사용해보기**: 주문 불가 사이즈를 선택하면 장바구니에 추가할 수 없습니다.
