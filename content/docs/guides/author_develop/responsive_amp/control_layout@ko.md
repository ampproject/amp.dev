---
$title: 레이아웃 & 미디어쿼리
$order: 1
toc: true
---
[TOC]


AMP는 개별 요소의 **레이아웃** 을 제어하는 강력한 내장형 방법과 함께, **미디어 쿼리** 및 **요소 쿼리** 를 둘 다 지원합니다.
`layout` 속성은 CSS만 사용하는 것보다 더 쉽게 완전한 반응형 디자인을 생성하고 동작하게 합니다.

## 쉽게 만드는 반응형 이미지

`width`와 `height`를 정의하여 반응형 이미지를 생성하고, `responsive`로 레이아웃을 설정하며,
다양한 스크린 사이즈에서 어떤 이미지를 사용할 지 [`srcset`](/docs/guides/responsive/art_direction.html)으로 감지합니다:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

이 `amp-img` 요소의 가로 너비는 해당 요소를 담고있는 요소(container element) 요소의
가로 너비에 따라 자동으로 맞춰지며, 높이는 width와 height로 정의한 해상도에 맞춰 자동으로 설정됩니다.
이 브라우저 창을 리사이징 해보길 바랍니다:

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

{% call callout('팁', type='success') %}
`amp-img` 요소의 기초부터 고급 예제는 [Live Demo](https://ampbyexample.com/components/amp-img/)에서 확인 가능합니다.
{% endcall %}

## 레이아웃 속성
`layout` 속성을 사용하면 각 요소의 화면 상 렌더링 방식을 쉽게 제어할 수 있습니다.
대부분은 순수 CSS로도 가능하지만 훨씬 어렵고, 무수한 핵이 필요합니다.
대신해서 `layout` 속성을 사용하길 권장합니다.

### `layout` 속성에서 지원하는 값

아래 값들을 `layout` 속성에서 사용할 수 있습니다:

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-twenty">레이아웃 타입</th>
      <th data-th="Width/height required" class="col-twenty">Width/height 필수 여부</th>
      <th data-th="Behavior">동작</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>nodisplay</code></td>
      <td data-th="Description" class="col-twenty">필수 아님</td>
      <td data-th="Behavior">요소가 나타나지 않습니다. 이 레이아웃은 모든 AMP 요소에 적용 가능합니다. 컴포넌트는 display 스타일이 none인 것 처럼 스크린 상에 공간을 가지지 않습니다. 사용자 조작으로 요소가 보이게 할 수 있습니다. 예를 들면, <a href="/docs/reference/extended/amp-lightbox.html"><code>amp-lightbox</code></a> 같은 게 있습니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed</code></td>
      <td data-th="Description" class="col-twenty">필수</td>
      <td data-th="Behavior">반응형 지원 없이 요소의 너비와 높이를 고정합니다. <a href="/docs/reference/amp-pixel.html"><code>amp-pixel</code></a> 요소 및 <a href="/docs/reference/extended/amp-audio.html"><code>amp-audio</code></a> 요소는 예외입니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>responsive</code></td>
      <td data-th="Description" class="col-twenty">필수</td>
      <td data-th="Behavior">
      해당 요소의 컨테이너 요소 너비를 기준으로 크기가 정해지며,
      해당 요소의 높이는 width와 height 속성에서 제공하는 해상도를 기준으로 자동으로 지정합니다.
      이 레이아웃은 <a href="/docs/reference/amp-img.html"><code>amp-img</code></a>, <a href="/docs/reference/amp-video.html"><code>amp-video</code></a>를 포함한 대부분의 AMP 요소에서 잘 동작합니다.
      부모 요소에 의존하여 공백이 가능하며, <code>max-width</code> CSS를 이용하여 커스터마이징도 가능하다.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed-height</code></td>
      <td data-th="Description" class="col-twenty">Height만 필수</td>
      <td data-th="Behavior">요소는 가용한 너비를 최대한 차지하지만 높이는 바뀌지 않습니다. 이 레이아웃은 수평 위치 콘텐츠를 포함하는 <a href="/docs/reference/extended/amp-carousel.html"><code>amp-carousel</code></a> 같은 요소에서 잘 동작합니다. <code>width</code> 속성은 존재하지 않거나 <code>auto</code>와 같아야합니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fill</code></td>
      <td data-th="Description" class="col-twenty">필수 아님</td>
      <td data-th="Behavior">width와 height 양쪽 모두를 포함한 요소가 사용할 수 있는 공간을 모두 가집니다. 다르게 말하자면, fill 요소 레이아웃은 그 부모와 매치합니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>container</code></td>
      <td data-th="Description" class="col-twenty">필수 아님</td>
      <td data-th="Behavior">HTML <code>div</code>처럼 해당 요소의 자식 요소가 사이즈를 결정합니다. 컴포넌트는 자체적으로 특정 레이아웃을 가지지 않지만 컨테이너로써 동작합니다. 그 자식요소는 즉시 렌더합니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>flex-item</code></td>
      <td data-th="Description" class="col-twenty">필수 아님</td>
      <td data-th="Behavior">부모가 flex 컨테이너일 때, 그 부모 요소 내 요소와 다른 요소는 부모 컨테이너의 나머지 공간을 가집니다 (즉, <code>display:flex</code>). 요소 사이즈는 <code>display:flex</code> CSS 레이아웃에 따라 부모 요소 및  부모 요소 내 다른 요소의 갯수에 의해 결정됩니다.</td>
    </tr>
  </tbody>
</table>

### width와 height가 없는 경우 어떻게 되나요?

흔하지는 않겠지만 `width`와 `height`가 정의되지 않은 경우,
AMP 런타임은 아래 값을 기본값으로 합니다:

* [`amp-pixel`](/docs/reference/amp-pixel.html): width와 height 둘 다 0을 기본으로 합니다.
* [`amp-audio`](/docs/reference/extended/amp-audio.html): 브라우저에서 암시하는 width와 height를 기본으로 합니다.

### <code>layout</code> 속성이 정의되지 않은 경우 어떻게 되나요?

만약 <code>layout</code> 속성이 정의되지 않은 경우,
AMP는 적절한 값을 암시하거나 추측합니다:

<table>
  <thead>
    <tr>
      <th data-th="Rule">규칙</th>
      <th data-th="Inferred layout" class="col-thirty">암시하는 layout</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"><code>height</code>가 존재하고 <code>width</code>가 없거나 <code>auto</code>와 같은 경우</td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule">
      <code>width</code>나 <code>height</code> 속성이 <code>sizes</code> 속성과 존재하는 경우</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code>나 <code>height</code> 속성이 존재하는 경우</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code>와 <code>height</code>가 존재하지 않는 경우</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## 미디어쿼리 사용

### CSS 미디어쿼리

다른 웹사이트에서 하듯 [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)를 사용하여
페이지 레이아웃이 어떻게 보여질 지와 어떻게 동작할 지 제어할 수 있습니다.
브라우저 창의 사이즈나 방향이 바뀔 때,
미디어쿼리는 재계산 결과에 따라 요소를 보이게 하거나 가립니다.

{% call callout('팁', type='success') %}
허용하는 미디어쿼리에서 레이아웃을 어떻게 제어하는 지에 대한 더 자세한 정보는 [Use CSS media queries for responsiveness](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en) 문서를 확인하길 바랍니다.
{% endcall %}

### 요소 미디어쿼리

AMP에서 사용할 수 있는 반응형 디자인의 확장 피쳐는 `media` 속성입니다.
이 속성은 모든 AMP 요소에서 사용 가능합니다.
이는 전역 스타일시트 내 미디어쿼리처럼 동작하지만, 단일 페이지에서 정의한 요소에서만 동작합니다.

예를 들어, 상호 배타적 미디어 쿼리를 가진 2개 이미지가 있습니다.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive">
</amp-img>
[/sourcecode]

스크린 너비에 의존하여, 하나 혹은 그 외의 것을 가져온 후 렌더링합니다.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive">
</amp-img>
[/sourcecode]
