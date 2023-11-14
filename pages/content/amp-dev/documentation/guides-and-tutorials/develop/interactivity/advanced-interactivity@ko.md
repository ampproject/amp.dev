---
'$title': Improving the interactivity
$order: 2
description: '시작 코드는 매우 기본적인 사용자 환경을 제공합니다. 몇 가지 방법을 통해 사용자 환경을 개선할 수 있습니다. 표시기를 추가하여...'
---

시작 코드는 매우 기본적인 사용자 환경을 제공합니다. 몇 가지 방법을 통해 사용자 환경을 개선할 수 있습니다.

- 현재 슬라이드 및 슬라이드의 총 개수를 표시하는 표시기를 추가합니다.
- 사용자가 다른 셔츠 색상을 선택하면 이미지 캐러셀을 변경하여 선택된 색상의 셔츠 이미지를 표시합니다.

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) 컴포넌트가 도입되기 전에는 이와 같은 기능을 추가할 수 없었습니다. [`amp-bind`](../../../../documentation/components/reference/amp-bind.md)를 직접 경험하고 신규 기능을 샘플 코드에 추가해 보겠습니다!

## `amp-bind` 컴포넌트 설치

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md)는 AMP 데이터 바인딩과 JS와 유사한 표현식을 통해 사용자 지정의 상호작용을 제공하는 컴포넌트입니다. [`amp-bind`](../../../../documentation/components/reference/amp-bind.md)를 사용하려면 페이지에 설치해야 합니다.

[`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) 파일을 열고 다음 스크립트를 페이지 `<head>` 섹션의 AMP 컴포넌트 목록에 추가합니다.

```html
<script
  async
  custom-element="amp-bind"
  src="https://ampjs.org/v0/amp-bind-0.1.js"
></script>
```

## 슬라이드 표시기 추가

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md)는 요소 속성을 사용자 지정 표현식에 바인딩하여 작동합니다. 이 표현식은 "상태"(변경 가능한 JSON 데이터)를 참조할 수 있습니다. 이 상태는 [`amp-bind`](../../../../documentation/components/reference/amp-bind.md)에 포함된 [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 컴포넌트를 통해 초기화할 수 있습니다.

### 슬라이드 상태 초기화

이제 상태 변수를 초기화하여 이미지 캐러셀에 현재 표시된 슬라이드의 색인을 추적해 보겠습니다. [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)을 열고 페이지 `<body>` 상단(`<header>` 이전)에 다음을 추가하세요.

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 요소 내의 데이터는 연결된 ID로 액세스할 수 있습니다. 예를 들어 다음 표현식 조각으로 해당 변수를 참조할 수 있습니다.

```javascript
selected.slide; // Evaluates to 0.
```

### 슬라이드 상태 업데이트

다음으로 사용자가 캐러셀의 슬라이드를 변경하는 경우 기존 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 요소에 다음의 `"on"` 작업을 추가하여 이 변수를 업데이트해 보겠습니다.

```html
<amp-carousel
  type="slides"
  layout="fixed-height"
  height="250"
  id="carousel"
  on="slideChange:AMP.setState({selected: {slide: event.index}})"
></amp-carousel>
```

이제 표시된 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 슬라이드가 변경될 때마다 `AMP.setState` 작업은 다음 인수를 사용하여 호출됩니다.

```javascript
{
  selected: {
    slide: event.index;
  }
}
```

`event.index` 표현식은 새 슬라이드 색인을 평가하고 `AMP.setState()` 작업으로 이 객체 리터럴이 현재 상태로 병합됩니다. 이렇게 하면 `selected.slide`의 현재 값이 `event.index` 값으로 대체됩니다.

[tip type="tip"] <strong>도움말 –</strong> `AMP.setState()`는 중첩된 객체 리터럴을 완전히 병합합니다. 자세한 내용은 [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) 문서를 참조하세요.[/tip]

### 표시기 요소 바인딩

다음으로 현재 표시된 슬라이드를 추적하는 이 상태 변수를 활용하여 슬라이드 표시기를 만들어 보겠습니다. 슬라이드 표시기 요소를 찾고(`<!-- TODO: "Add a slide indicator" -->`) 다음 바인딩을 하위 요소에 추가합니다.

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

`[class]`는 `class` 속성을 변경하는 바인딩이며 이를 사용하여 모든 요소에 CSS 클래스를 추가하거나 삭제할 수 있습니다.

**직접 해보기**: 페이지를 새로고침하고 슬라이드를 변경해 보세요.

캐러셀의 슬라이드를 변경하면 다음과 같은 작업이 실행됩니다.

1. `slideChange event`를 트리거하며 ...
2. `AMP.setState` 작업이 호출되고 ...
3. 상태 변수 `selected.slide`가 업데이트되고 ...
4. 표시기 `<span>` 요소의 `[class]` 바인딩이 업데이트됩니다.

좋습니다! 이제 슬라이드 표시기가 작동합니다.

[tip type="success"]

기능을 추가하여 사용자가 슬라이드의 표시기 점을 탭하면 선택된 항목으로 이미지 캐러셀을 업데이트할 수 있는지 확인합니다. 참고로 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)에서 `tap` 이벤트와 `[slide]` 바인딩을 사용합니다.

[/tip]

## 캐러셀의 이미지 변경

선택된 색상을 변경할 때 다른 셔츠 색상의 이미지가 표시되면 좋습니다. [`amp-bind`](../../../../documentation/components/reference/amp-bind.md)를 사용하여 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 내에서 `[src]`를 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 요소에 바인딩하면 가능합니다.

### SKU 상태 초기화

먼저 각 색상 셔츠의 이미지 소스 URL로 상태 데이터를 초기화해야 합니다. 새 [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) 요소로 이 작업을 실행해 보겠습니다.

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

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state)요소에는 셔츠 식별자 문자열(예: SKU)을 해당 셔츠의 색상 및 이미지 URL에 매핑하는 JSON 객체가 포함되어 있습니다. JSON 배열은 여기에서도 작동하지만 객체를 사용하면 다른 멋진 작업을 할 수 있습니다. 이러한 작업은 곧 제공될 예정입니다.

이제 셔츠의 식별자를 통해 이미지 URL에 액세스할 수 있습니다. 예를 들어 `shirts['10014'].color`는 `"dark green"`을 평가하고 `shirts['10030'].image `는 `"wine"` 셔츠 색상의 이미지 URL을 반환합니다.

### 선택된 SKU 추적

선택된 SKU를 추적하는 다른 상태 변수를 추가하면 표현식을 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 요소에 바인딩하고 선택된 SKU가 변경될 경우 `src` 속성을 업데이트할 수 있습니다. 새 `sku` 키를 기존 `amp-state#selected` 요소의 JSON에 추가합니다.

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

### SKU 상태 업데이트

새 색상이 선택될 때마다 `selected.sku` 변수를 업데이트하는 [`amp-selector`](../../../../documentation/components/reference/amp-selector.md)에 "on" 작업을 추가합니다.

```html
<amp-selector
  name="color"
  on="select:AMP.setState({selected: {sku: event.targetOption}})"
></amp-selector>
```

[tip type="tip"] <strong>도움말 –</strong> `on="tap:AMP.setState(...)` 작업을 [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) 내의 각 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 하위 요소에 추가함으로써 실행할 수도 있습니다. [`amp-selector`](../../../../documentation/components/reference/amp-selector.md)의 장점 중 하나는 이러한 방식으로 마크업을 단순화한다는 것입니다. [/tip]

### 이미지 요소 바인딩

다음으로 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 요소에 바인딩을 추가합니다.

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

[tip type="note"] <strong>참고 –</strong> 실제 상황에서는 캐러셀의 각 이미지에 다른 `src`가 있을 가능성이 높습니다. 이는 하나의 이미지를 이미지 배열로 대체함으로써 실행할 수 있습니다. 간단한 설명을 위해 이 튜토리얼에서는 하나의 이미지를 다양한 배율로 사용합니다. [/tip]

**직접 해보기**: 페이지를 새로고침하고 다른 색상의 셔츠를 선택하세요. 다른 색상을 선택하면 캐러셀의 이미지가 업데이트되어 선택한 색상의 셔츠가 표시됩니다.
