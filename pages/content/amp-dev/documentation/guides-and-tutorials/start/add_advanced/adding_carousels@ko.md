---
"$title": Adding carousels
"$order": '3'
description: 또 다른 모바일 페이지의 일반적인 특징은 캐러셀입니다.  amp-carousel 구성요소를 사용하여 AMP 페이지에 캐러셀을 쉽게 추가할 수 있습니다.
---

또 다른 모바일 페이지의 일반적인 특징은 캐러셀입니다.  [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 구성요소를 사용하여 AMP 페이지에 캐러셀을 쉽게 추가할 수 있습니다. 이미지 캐러셀과 같은 간단한 예로 시작해 보겠습니다.

## 간단한 이미지 캐러셀

다음 자바스크립트 요청을 문서의 `<head>` 태그에 **추가**하여 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 구성요소 라이브러리를 포함하세요.

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
```

다음으로 반응형 레이아웃을 갖추고 너비 및 높이가 사전 지정된 간단한 이미지 캐러셀을 삽입해 보겠습니다. 페이지에 다음 내용을 **추가**합니다.

```html
<amp-carousel layout="fixed-height" height="168" type="carousel" >
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

페이지를 **새로고침**하면 캐러셀이 표시됩니다.

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='간단한 이미지 캐러셀') }}

[`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 구성요소는 다양한 방법으로 구성될 수 있습니다.  UI를 변경하여 한 번에 하나의 이미지만 표시되는 반응형 캐러셀의 레아이웃을 만들어 보겠습니다.

이렇게 하려면 먼저 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)의 `type`을 `carousel`에서 `slides`로 **변경**하고, `layout`을 `responsive`로 **변경**한 다음, `width`를 300으로 **설정**합니다. 이때 `height`와 `width`가 모두 설정되어 있어야 합니다.  `"layout=responsive"` 속성을 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)의 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 하위 요소에 **추가**합니다.

페이지를 **새로고침**합니다. 이제 요소 목록이 스크롤되는 대신 한 번에 한 개의 요소만 표시됩니다. 요소 간에 이동하려면 수평으로 **스와이프**해 보세요. 세 번째 요소로 스와이프하면 더 이상 스와이프할 수 없습니다.

이제 `loop` 속성을 **추가**합니다. 페이지를 **새로고침**한 다음, 즉시 왼쪽으로 스와이프해 보세요. 캐러셀이 끝없이 계속됩니다.

마지막으로 캐러셀이 2초마다 자동으로 넘어가게 해 보겠습니다. `autoplay` 속성 및 값이 `2000`인 `delay` 속성(예: `delay="2000"`)을 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)에 **추가**합니다.

최종 결과는 다음과 같을 것입니다.

```html
<amp-carousel layout="responsive" width="300" height="168" type="slides" autoplay delay="2000" loop>
  <amp-img src="mountains-1.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168" layout="responsive"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168" layout="responsive"></amp-img>
</amp-carousel>
```

페이지를 **새로고침**하여 테스트해 보세요.

[tip type="note"] [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)의 유형이 `carousel`일 때 `fixed-height` 레이아웃 유형을 사용한다는 것을 눈치채셨을 것입니다.  `carousel` 유형에 지원되는 레이아웃 유형은 제한되어 있습니다. 예를 들어 `carousel` 유형은 `responsive` 레이아웃을 지원하지 않습니다.  이름에서 알 수 있듯이 fixed-height 요소는 사용할 수 있는 공간을 차지하지만 높이는 변하지 않고 유지됩니다. fixed-height 요소의 경우 `height` 속성은 정의하고 `width` 속성은 `auto`로 설정하거나 설정하지 않아야 합니다. [/tip]

## 혼합 캐러셀 콘텐츠

이미지 캐러셀도 좋지만, 캐러셀에 더 복잡한 콘텐츠를 표시하려면 어떻게 할까요? 광고, 텍스트, 이미지를 모두 하나의 캐러셀에 혼합하여 배치해 보겠습니다. [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)  이렇게 복잡하게 섞여 있는 콘텐츠를 한 번에 처리할 수 있을까요? 물론 처리할 수 있습니다.

먼저 `<style amp-custom>`에 이 스타일을 **추가**하여 [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) 및 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 구성요소가 함께 안정적으로 작동할 수 있도록 하겠습니다.

```css
amp-fit-text {
    white-space: normal;
}
```

이제 처음에 만든 간단한 캐러셀을 다음으로 **바꿉니다**.

```html
<amp-carousel layout="fixed-height" height="250" type="carousel" >
    <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

    <amp-ad width="300" height="250"
      type="doubleclick"
      data-slot="/35096353/amptesting/image/static">
        <div placeholder>This ad is still loading.</div>
    </amp-ad>

    <amp-fit-text width="300" height="250" layout="fixed">
      Big, bold article quote goes here.
    </amp-fit-text>
</amp-carousel>
```

페이지를 **새로고침**하면 다음과 같이 표시됩니다.

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='혼합 콘텐츠 캐러셀') }}

자세히 알아보려면 [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) 구성요소 참조 문서를 확인하세요.

마지막 예를 보면 [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) 구성요소에 하위 `div` 요소와 `placeholder` 속성이 포함되어 있습니다. 이전 가이드에서 `fallback`을 사용한 [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)가 포함된 비슷한 시나리오를 본 적이 있습니다. placeholder와 fallback 요소의 차이는 무엇일까요? `Fallback` 요소는 상위 요소를 로드할 수 없을 때(예: 표시할 광고가 없는 경우) 표시됩니다. 반면에 `placeholder` 요소는 상위 요소를 로드하는 중에 상위 요소 대신 표시됩니다. 어떤 의미에서 이러한 요소는 상위 요소의 로드 과정 전후에 표시됩니다. [자리표시자 및 대체 동작](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) 가이드에서 자세히 알아볼 수 있습니다.
