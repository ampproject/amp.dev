---
$title: 레이아웃 및 미디어 쿼리
---

[TOC]

 AMP 에서는 **미디어 쿼리**  및 **요소 쿼리가 모두 지원되며,** 개별 요소의 **레이아웃** 을 제어할 수 있는 강력한 방법을 기본적으로 갖추고 있습니다. `layout` 속성을 사용하면 CSS 만 사용할 때보다 완벽한 반응형 디자인을 다루고 구축하기가 훨씬 쉬워집니다.

## 간편한 반응형 이미지

 `width` 및 `height`를 지정하고 레이아웃을 `responsive` 로 설정한 다음 [`srcset`](/ja/docs/guides/responsive/art_direction.html) 를 사용하여 다양한 화면 크기에 따라 사용할 광고 애셋을 지정합니다.

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

이 `amp-img` 요소는 자동으로 컨테이너 요소의 너비에 맞춰지며, 높이는 주어진 너비와 높이에 의해 결정된 가로세로 비율에 맞춰 자동으로 설정됩니다. 다음의 브라우저 창 크기를 조정하여 직접 시도해 보세요.

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

{% call callout('도움말', type='success') %}
 자세한 `amp-img` 실시간 데모에서 기본/응용 예시를 확인하세요. [실시간 데모](https://ampbyexample.com/components/amp-img/)
{% endcall %}

## 레이아웃 속성

`layout` 속성을 사용하면 요소가 화면에서 렌더링되는 방식을 요소별로 간편하게 제어할 수 있습니다. 다음 중에는 CSS만 사용해서 제어할 수 있는 것도 많지만, 훨씬 어렵고 수많은 요령이 필요합니다. 대신 `layout` 속성을 사용해 보세요.

### `layout` 속성에 지원되는 값

`layout` 속성에서는 다음 값을 사용할 수 있습니다.

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-twenty">레이아웃 유형</th>
      <th data-th="Width/height required" class="col-twenty">너비/높이 필요</th>
      <th data-th="Behavior">동작</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>nodisplay</code></td>
      <td data-th="Description" class="col-twenty">아니요</td>
      <td data-th="Behavior"> 요소가 표시되지 않습니다. 이 레이아웃은 모든 AMP 요소에 적용할 수 있습니다. 마치 디스플레이 스타일이 없는 것과 같이 구성요소가 화면의 공간을 전혀 차지하지 않습니다. 사용자 작업에 따라 요소가 표시될 수 있다고 간주됩니다(예:<a href="/ja/docs/reference/extended/amp-lightbox.html"> <code>amp-lightbox</code></a>).</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed</code></td>
      <td data-th="Description" class="col-twenty">예</td>
      <td data-th="Behavior"> 요소의 너비와 높이가 고정되어 있으며 반응성이 지원되지 않습니다. 유일한 예외는<a href="/ja/docs/reference/amp-pixel.html"> <code>amp-pixel</code></a>  및<a href="/ja/docs/reference/extended/amp-audio.html"> <code>amp-audio</code></a> 요소입니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>responsive</code></td>
      <td data-th="Description" class="col-twenty">예</td>
      <td data-th="Behavior"> 요소의 크기가 컨테이너 요소의 너비에 맞춰지며, 높이는 너비와 높이 속성에 따라 주어진 가로세로 비율에 맞춰 자동으로 조정됩니다. 이 레이아웃은<a href="/ja/docs/reference/amp-img.html"> <code>amp-img</code></a> ,<a href="/ja/docs/reference/amp-video.html"> <code>amp-video</code></a> 등 대부분의 AMP 요소에 적합합니다. 사용 가능한 공간은 상위 요소에 따라 달라지며 <code>max-width</code> CSS 를 사용하여 맞춤설정할 수 있습니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fixed-height</code></td>
      <td data-th="Description" class="col-twenty">높이만 필요함</td>
      <td data-th="Behavior"> 요소가 사용 가능한 공간을 차지하나 높이는 변경되지 않은 상태로 유지됩니다. 이 레이아웃은<a href="/ja/docs/reference/extended/amp-carousel.html"> <code>amp-carousel</code></a>  등 가로로 배치된 콘텐츠가 포함된 요소에 적합합니다. The <code>width</code>  속성은 제시되지 않거나 <code>auto</code> 와 같아야 합니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>fill</code></td>
      <td data-th="Description" class="col-twenty">아니요</td>
      <td data-th="Behavior">요소가 너비와 높이 모두 사용 가능한 공간을 차지합니다. 즉, fill 요소의 레이아웃은 상위 요소와 일치합니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>container</code></td>
      <td data-th="Description" class="col-twenty">아니요</td>
      <td data-th="Behavior"> 일반적인 HTML<code> div </code>와 비슷하게 요소의 크기가 하위 요소에 따라 정의됩니다. 구성요소에 특정한 레이아웃이 없으며 컨테이너 역할만 하는 것으로 간주됩니다. 하위 요소는 즉시 렌더링됩니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type" class="col-twenty"><code>flex-item</code></td>
      <td data-th="Description" class="col-twenty">아니요</td>
      <td data-th="Behavior"> 요소 및 요소의 상위 요소에 속하는 다른 요소들은 상위 요소가 유연한 컨테이너 (<code>display:flex</code>) 일 경우 상위 컨테이너의 남은 공간을 차지합니다. 요소의 크기는 상위 요소에 따라 결정되며, 상위 요소 내 다른 요소의 개수는 <code>display:flex</code> CSS 레이아웃에 따라 결정됩니다.</td>
    </tr>
  </tbody>
</table>

### 너비와 높이가 정의되지 않은 경우 어떻게 하나요?

드물지만 `width` 또는 `height` 가 지정되지 않은 경우, AMP 런타임에서 이러한 값의 기본값을 다음과 같이 지정할 수 있습니다.

* [`amp-pixel`](/ja/docs/reference/amp-pixel.html): 너비와 높이의 기본값이 모두 0으로 설정됩니다.
* [`amp-audio`](/ja/docs/reference/extended/amp-audio.html): 브라우저를 통해 기본 너비와 높이를 추정합니다.

###  What if the <code>layout</code> 속성이 지정되지 않은 경우 어떻게 하나요?

 If the <code>layout</code> 속성이 지정되지 않은 경우, AMP 에서 다음과 같이 적절한 값을 추정하려고 시도합니다.

<table>
  <thead>
    <tr>
      <th data-th="Rule">규칙</th>
      <th data-th="Inferred layout" class="col-thirty">추정된 레이아웃</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"><code>height</code>  이 존재하며 <code>width</code>  는 존재하지 않거나 <code>auto</code> 와 동일</td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code>  또는 <code>height</code>  속성이 <code>sizes</code> 속성과 함께 존재</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code>  또는 <code>height</code> 속성이 존재</td>
      <td data-th="Inferred layout"> <code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code>  및 <code>height</code> 가 존재하지 않음</td>
      <td data-th="Inferred layout"> <code>container</code></td>
    </tr>
  </tbody>
</table>

## 미디어 쿼리 사용하기

### CSS 미디어 쿼리

 Use [`@media`](https://developer.mozilla.org/ja/docs/Web/CSS/@media) 를 사용하여 다른 웹사이트에서처럼 페이지 레이아웃의 모양과 작동 방식을 제어하세요. 브라우저 창의 크기 또는 방향이 바뀌면 미디어 쿼리가 재평가되고 새로운 결과에 따라 요소가 숨겨지거나 표시됩니다.

{% call callout('도움말', type='success') %}
 Learn more about controlling layout by applying media queries in [CSS 미디어 쿼리를 사용하여 반응성 제어하기](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en)
에서 미디어 쿼리를 적용하여 레이아웃을 제어하는 방법을 자세히 알아보세요. {% endcall %}

### 요소 미디어 쿼리

반응형 디자인과 관련된 AMP 의 추가 기능으로 `media` 속성이 있습니다. 이 속성은 모든 AMP 요소에 사용할 수 있으며, 전역 스타일시트의 미디어 쿼리와 유사하게 작동하지만 단일 페이지의 특정 요소에만 영향을 미칩니다.

예를 들어, 다음은 상호 배타적인 미디어 쿼리가 사용된 2개의 이미지입니다.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive">
</amp-img>
[/sourcecode]

화면 너비에 따라 2개 중 하나를 가져와 렌더링하게 됩니다.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive">
</amp-img>
[/sourcecode]
