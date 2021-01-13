---
"$title": 시작 코드에 익숙해지기
"$order": '1'
description: AMP 페이지는 안정적인 성능을 제공하기 위한 몇 가지 제한사항이 있는 HTML 페이지입니다. AMP 페이지에는 해당 페이지가 AMP 페이지임을 알 수 있는 몇 가지 특별한 마크업이 있습니다.
---

## AMP 상용구

AMP 페이지는 안정적인 성능을 제공하기 위한 몇 가지 제한사항이 있는 HTML 페이지입니다. AMP 페이지에는 해당 페이지가 AMP 페이지임을 알 수 있는 몇 가지 특별한 마크업이 있습니다.

기본적인 AMP 페이지는 다음과 같습니다.

```html
<!DOCTYPE html>
<html amp>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="hello-world.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

가이드에 사용된 시작 코드([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html))는 기본적인 AMP 페이지에 이미지, 텍스트 등의 페이지 콘텐츠와 몇 가지 AMP 구성요소를 더한 것입니다.

## AMP 구성요소

AMP 구성요소는 AMP 페이지에 풍부한 상호작용을 더해주는 추가적인 기능과 UI 구성요소를 제공합니다. 시작 코드는 다음과 같은 AMP 구성요소를 사용합니다.

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
<script
  async
  custom-template="amp-mustache"
  src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"
></script>
<script
  async
  custom-element="amp-form"
  src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
></script>
<script
  async
  custom-element="amp-selector"
  src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"
></script>
```

시작 코드는 몇 가지 기본적인 상호작용을 제공합니다.

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): 해당 제품의 다양한 모습을 보여주는 이미지 캐러셀입니다.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): [`amp-form`](../../../../documentation/components/reference/amp-form.md) 서버 응답을 렌더링하는 템플릿 시스템입니다.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): AMP 페이지에 필요한 `<form>` 요소에 사용되는 특수한 기능을 추가합니다.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): 요소 그룹에서 하나 또는 여러 요소를 선택하는 의미론적 방법을 제공합니다. [`amp-form`](../../../../documentation/components/reference/amp-form.md) 입력 소스로 사용할 수 있습니다.

## 기본적인 상호작용

**사용해보기**: 이미지 캐러셀을 스와이프하고 '장바구니에 추가' 버튼을 탭하세요.

- 이미지 캐러셀([`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md))은 해당 제품의 다양한 모습을 보여줍니다.
- 페이지 하단에 있는 '장바구니에 추가' 버튼을 탭하면 제품이 사용자의 장바구니에 추가([`amp-form`](../../../../documentation/components/reference/amp-form.md) 사용)됩니다.

**사용해보기**: 이미지 캐러셀을 스와이프하고 "장바구니에 추가" 버튼을 탭하세요.
