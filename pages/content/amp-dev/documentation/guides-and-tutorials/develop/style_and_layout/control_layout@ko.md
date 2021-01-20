---
$title: 레이아웃 및 미디어 쿼리
---

AMP는 **미디어 쿼리** 및 **요소 쿼리**를 모두 지원하며, 개별 요소의 **레이아웃**을 효과적으로 제어할 수 있는 기능이 기본적으로 내장되어 있습니다. `layout` 속성을 사용하면 CSS만 사용할 때보다 훨씬 간편하게 완전한 반응형 디자인을 만들어 작업할 수 있습니다.

## 반응형 이미지 간단하게 만들기

`width`와 `height`를 지정하고 레이아웃을 `responsive`로 설정한 다음
이미지 애셋이 다양한 화면 크기에 맞게 사용될 수 있도록
[`srcset`](art_direction.md)로 지정하여 반응형 이미지를 만듭니다.

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="이미지">
</amp-img>
[/sourcecode]

이 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 요소는 컨테이너 요소의 너비에 맞춰
크기를 자동 조절하며
높이는 주어진 너비와 높이에 따른 가로세로 비율에 맞게
자동 조정됩니다. 직접 브라우저 창의 크기를 조절해 보세요.

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

[tip type="success"]

[`amp-img`](../../../../documentation/components/reference/amp-img.md)의 비교 라이브 데모를 확인해 보세요. [AMP By Example의 라이브 데모](../../../../documentation/examples/documentation/amp-img.html)

[/tip]

## 레이아웃 속성 <a name="the-layout-attribute"></a>

`layout` 속성을 사용하면 요소가 화면에 렌더링되어야 하는 방식을
요소별로 쉽게 제어할 수 있습니다. CSS만으로도 작업 대부분을 할 수 있지만
훨씬 어렵고 수많은 수정 과정이 요구됩니다. 대신 `layout` 속성을 사용하세요.

### `layout` 속성에 지원되는 값

`layout` 속성에 다음 값을 사용할 수 있습니다.

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-thirty">레이아웃 유형</th>
      <th data-th="Width/height required" class="col-twenty">너비/높이<br>필요 여부</th>
      <th data-th="Behavior">동작</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type"><code>nodisplay</code></td>
      <td data-th="Description">아니요</td>
      <td data-th="Behavior">요소가 표시되지 않습니다. 이 레이아웃은 모든 AMP 요소에 적용할 수 있습니다. 표시 스타일이 없는 것처럼 구성요소가 화면에서 공간을 차지하지 않습니다. 예를 들면 <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>처럼 사용자 작업에 따라 요소가 스스로 화면에 표시되는 것으로 간주합니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed</code></td>
      <td data-th="Description">예</td>
      <td data-th="Behavior">요소의 너비와 높이가 고정되어 있으며 반응이 지원되지 않습니다. <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> 및 <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a> 요소만 예외입니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>responsive</code></td>
      <td data-th="Description">예</td>
      <td data-th="Behavior">요소는 컨테이너 요소의 높이에 맞춰 크기가 조정되며, 높이는 너비와 높이 속성에 따른 가로세로 비율에 맞춰 크기를 자동 조절합니다. 이 레이아웃은 <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>, <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>를 포함한 대부분의 AMP 요소에 적합합니다. 사용 가능한 공간은 상위 요소에 따라 다르며 <code>max-width</code> CSS를 사용하여 맞춤설정할 수 있습니다.<p><strong>참고</strong>: <code>"layout=responsive"</code>를 사용하는 요소는 고유 크기가 없습니다. 요소의 크기는 컨테이너 요소에 따라 결정됩니다. AMP 요소를 표시하려면 포함하는 요소의 너비와 높이를 지정해야 합니다. 포함하는 요소에 <code>"display:table"</code>을 지정하지 마세요. 지정할 경우 AMP 요소 표시가 재정의되어 AMP 요소가 표시되지 않게 렌더링됩니다.</p></td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed-height</code></td>
      <td data-th="Description">높이만</td>
      <td data-th="Behavior">요소는 사용 가능한 공간에 위치하지만 높이는 변하지 않습니다. 이 레이아웃은 수평으로 위치한 콘텐츠가 있는 <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a>과 같은 요소에 적합합니다. <code>width</code> 속성은 존재하지 않거나 <code>auto</code>와 동일해야 합니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fill</code></td>
      <td data-th="Description">아니요</td>
      <td data-th="Behavior">요소는 너비와 높이 모두 사용 가능한 공간에 위치합니다. 다시 말해 fill 요소의 레이아웃은 상위 요소와 일치해야 합니다. 요소가 상위 컨테이너를 채우려면 상위 컨테이너가 `position:relative` 또는 `position:absolute`를 지정해야 합니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>container</code></td>
      <td data-th="Description">아니요</td>
      <td data-th="Behavior">일반적인 HTML <code>div</code>처럼 하위 요소가 크기를 결정합니다. 구성요소 자체는 특정 레이아웃이 없지만 컨테이너 역할만 하는 것으로 간주됩니다. 하위 요소가 즉시 렌더링됩니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>flex-item</code></td>
      <td data-th="Description">아니요</td>
      <td data-th="Behavior">상위 요소가 유연한 컨테이너인 경우(예: <code>display:flex</code>) 요소 및 상위 요소의 기타 요소가 상위 컨테이너의 나머지 공간에 위치합니다. 요소 크기는 <code>display:flex</code> CSS 레이아웃에 따라 상위 요소 및 상위 요소 내 다른 요소의 개수에 의해 결정됩니다.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>intrinsic</code></td>
      <td data-th="Description">예</td>
      <td data-th="Behavior">요소는 사용 가능한 공간에 위치하며, 높이는 요소의 실제 크기에 도달하거나 CSS 제한(예: max-width)에 도달하지 <em>않는 한</em> <code>width</code> 및 <code>height</code> 속성에 따른 가로세로 비율에 맞춰 높이 크기를 자동 조절합니다. 너비 및 높이 속성은 반드시 있어야 합니다. 이 레이아웃은 <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>, <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> 등을 포함한 대부분의 AMP 요소에 적합합니다. 사용 가능한 공간은 상위 요소에 따라 다르며 <code>max-width</code> CSS를 사용하여 맞춤설정할 수도 있습니다. 이 레이아웃은 고유 높이 및 너비가 있다는 점에서 <code>responsive</code>와 구별됩니다. <code>responsive</code> 레이아웃이 0x0을 렌더링하고 <code>intrinsic</code> 레이아웃이 실제 크기 또는 CSS 제한 중 더 작은쪽으로 팽창하는 플로팅 요소 내에서 가장 분명하게 나타납니다. </td>
    </tr>
  </tbody>
</table>

[tip type="success"]

[AMP 레이아웃 시연](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html) 페이지를 방문하여 다양한 레이아웃이 화면 크기 조절에 어떻게 반응하는지 알아보세요.

[/tip]

### 너비와 높이가 정의되지 않은 경우에는 어떻게 하나요? <a name="what-if-width-and-height-are-undefined"></a>

`width` 또는 `height`가 지정되지 않은 일부 경우에
AMP 런타임이 다음과 같이 기본값을 설정할 수 있습니다.

* [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md): 너비와 높이 모두 기본값을 0으로 설정합니다.
* [`amp-audio`](../../../../documentation/components/reference/amp-audio.md): 기본 너비와 높이 모두 브라우저를 통해 추정합니다.

### <code>layout</code> 속성이 지정되지 않은 경우에는 어떻게 하나요? <a name="what-if-the-layout-attribute-isnt-specified"></a>

<code>layout</code> 속성이 지정되지 않으면 AMP에서 적절한 값을
추정하거나 짐작합니다.

<table>
  <thead>
    <tr>
      <th data-th="Rule">규칙</th>
      <th data-th="Inferred layout" class="col-thirty">추정된 레이아웃</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule"><code>height</code>가 있으며 <code>width</code>가 없거나 <code>auto</code>와 동일함</td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>sizes</code> 속성과 함께 <code>width</code> 또는 <code>height</code> 속성이 있음</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code> 또는 <code>height</code> 속성이 있음</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule"><code>width</code> 및 <code>height</code>가 없음</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## 미디어 쿼리 사용

### CSS 미디어 쿼리

[`@media`](https://developer.mozilla.org/ko-KR/docs/Web/CSS/@media)를 사용하여
다른 웹사이트에서 하는 것처럼 페이지 레이아웃의 디자인과 동작을 관리합니다.
브라우저 창의 크기와 방향을 변경하는 경우
새로운 검색결과에 따라 미디어 쿼리가 재평가되어
요소가 숨겨지고 표시됩니다.

[tip type="read-on"]

[반응성을 위한 CSS 미디어 쿼리 사용](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=ko)에서 미디어 쿼리를 적용하여 레이아웃을 관리하는 방법을 자세히 알아보세요.

[/tip]

### 요소 미디어 쿼리 <a name="element-media-queries"></a>

AMP에서 사용할 수 있는 또 다른 반응형 디자인 기능은 `media` 속성입니다.
이 속성은 모든 AMP 요소에 사용할 수 있습니다.
글로벌 스타일시트의 미디어 쿼리와 유사하게 작동하지만
한 페이지의 특정 요소에만 영향을 미칩니다.

예를 들어 다음과 같이 상호 배타적인 미디어 쿼리를 가진 두 개의 이미지가 있습니다.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="527"
    height="355"
    layout="responsive">
</amp-img>
[/sourcecode]

화면 너비에 따라 둘 중 한 가지 이미지를 가져오거나 렌더링합니다.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="466"
    height="193"
    layout="responsive">
</amp-img>
[/sourcecode]
