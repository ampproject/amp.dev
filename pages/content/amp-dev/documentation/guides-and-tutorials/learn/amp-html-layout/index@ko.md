---
'$title': AMPHTML 레이아웃 시스템
$order: 1
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: '개요 '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

## 개요

레이아웃 시스템의 주요 목표는 JavaScript 및 데이터 호출과 같은 원격 리소스가 완료되기 전 런타임이 요소의 크기를 추론할 수 있도록 AMP 요소가 레이아웃을 표시하게 지원하는 것입니다. 이를 통해 렌더링 및 스크롤 시 끊김 현상을 현저히 줄일 수 있으므로 중요합니다.

이를 염두에 두고 AMP 레이아웃 시스템은 우수한 성능을 보장하는 몇 가지의 유연한 레이아웃을 지원하도록 설계되었습니다. 이 시스템은 요소의 레이아웃과 크기 요건을 표현하는 데 `layout`, `width`, `height`, `sizes` 및 `heights` 등의 속성 집합에 의존합니다.

## 동작 <a name="behavior"></a>

컨테이너가 아닌 AMP 요소(즉, `layout != container`)는 플레이스홀더를 제외한 모든 하위 요소가 숨김 처리된 미해결/미작성 모드에서 시작됩니다(`placeholder` 속성 참조). 요소를 완전히 구성하는 데 필요한 JavaScript 및 데이터 페이로드의 다운로드와 초기화가 진행 중일 시에도 AMP 런타임은 CSS 클래스와 `layout`, `width`, `height`,`media` 속성에만 의존하는 요소의 크기를 조정하고 레이아웃을 구성하는 방법을 이미 이해합니다. 대부분 사례에서 `placeholder`가 지정된 경우에는 요소의 전체 공간을 채우도록 크기와 위치가 정해질 것입니다.

요소가 작성되고 첫 번째 레이아웃이 완료된 직후 `placeholder`는 숨김 처리됩니다. 이때 요소의 모든 하위 요소 작성과 위치 지정이 적절히 완료되어야 하며 요소는 표시되고 사용자의 입력 값을 받을 준비를 마쳐야 합니다. 이것이 기본 동작입니다. 각 요소는 `placeholder`를 더 빨리 숨김 처리하거나 더 오래 유지하는 것처럼 재정의할 수 있습니다.

런타임의 `layout`, `width`, `height` 및 `media` 속성에 따라 요소의 크기가 설정되고 요소가 표시됩니다. 모든 레이아웃 규칙은 내부적으로 CSS를 통해 구현됩니다. 요소의 크기가 CSS를 통해 추론 가능하며 하위 요소에 따라 변경(즉시 제공되거나 동적으로 삽입)되지 않는 경우 요소가 "크기를 정의"한다고 볼 수 있습니다. 그렇다고 요소의 크기를 변경할 수 없는 것은 아닙니다. 이 레이아웃은 `responsive`, `fixed-height`, `fill` 및 `flex-item` 레이아웃처럼 완전히 반응형으로 동작할 수 있습니다. 다만 명시적 사용자 액션 없이 크기가 변경되지 않는다는 것을 의미할 뿐입니다(예: 렌더링 또는 스크롤 중, 다운로드 후).

PROD에서 요소가 잘못 구성된 경우 렌더링되지 않으며 DEV 모드에서 런타임이 오류 상태의 요소를 렌더링합니다. 가능한 오류에는 잘못되거나 지원되지 않는 `layout`, `width`, `height` 속성 값이 포함됩니다.

## 레이아웃 속성 <a name="layout-attributes"></a>

### `width` 및 `height` <a name="width-and-height"></a>

`layout` 속성 값에 따라 AMP 컴포넌트 요소에는 정수 픽셀 값을 포함하는 `width` 및 `height` 속성이 있어야 합니다. 실제 레이아웃 동작은 하단에 명시된 바와 같이 `layout` 속성에 따라 결정됩니다.

종종 `width` 또는 `height` 속성이 지정되지 않은 경우 AMP 런타임은 다음과 같이 기본 값을 설정할 수 있습니다.

- `amp-pixel`: `width` 및 `height` 속성의 기본 값이 모두 0으로 설정됩니다.
- `amp-audio`: `width` 및 `height` 속성의 기본 값은 브라우저에서 추론됩니다.

### `layout` <a name="layout"></a>

AMP는 문서 레이아웃에서 AMP 컴포넌트의 동작 방식을 지정하는 레이아웃 집합을 제공합니다. 아래 표에서 명시된 값 중 하나를 포함하는 `layout` 속성을 추가하여 컴포넌트 레이아웃을 지정할 수 있습니다.

**예시**: 가로세로비를 결정하는 데 너비와 높이가 사용되는 간단한 반응형 이미지.

[sourcecode:html]
<amp-img
src="/img/amp.jpg"
width="1080"
height="610"
layout="responsive"
alt="an image"

> </amp-img>
> [/sourcecode]

`layout` 속성에 지원되는 값:

<table>
  <thead>
    <tr>
      <th width="30%">값</th>
      <th>동작 및 요구 사항</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>없음</td>
      <td>값이 지정되지 않았거나 컴포넌트 레이아웃이 다음과 같이 추론된 경우:         <ul>           <li> <code>height</code>는 있지만 <code>width</code>가 없거나 <code>auto</code>로 설정된 경우에는 <code>fixed-height</code> 레이아웃이 추정됩니다.</li>           <li> <code>width</code> 및 <code>height</code> 속성이<code>sizes</code> 또는 <code>heights</code> 속성과 함께 있을 경우 <code>responsive</code> 레이아웃이 추정됩니다.</li>           <li> <code>width</code> 및 <code>height</code> 속성이 있으면  <code>fixed</code> 레이아웃이 추정됩니다.</li>           <li> <code>width</code> 및 <code>height</code> 속성이 없으면 <code>container</code> 레이아웃이 추정됩니다.</li>         </ul> </td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>일반적인 HTML <code>div</code>처럼 하위 요소가 크기를 정의합니다. 컴포넌트 자체는 특정 레이아웃을 갖지 않지만 컨테이너 역할만 하는 것으로 추정됩니다. 하위 요소가 즉시 렌더링됩니다.</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>요소는 너비와 높이 모두 사용 가능한 공간에 위치합니다. 즉 <code>fill</code> 요소의 레이아웃과 크기는 상위 요소와 일치해야 합니다. 요소가 상위 컨테이너를 채우려면 "fill" 레이아웃을 지정하고 상위 컨테이너가 <code>position:relative</code> 또는 <code>position:absolute</code>를 지정해야 합니다.</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>요소의 너비와 높이가 고정되어 있으며 반응성은 지원되지 않습니다. <code>width</code> 및 <code>height</code> 속성이 있어야 하며 유일한 예외는 <code>amp-pixel</code> 및 <code>amp-audio</code> 컴포넌트입니다.</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>요소는 사용 가능한 공간에 위치하지만 높이는 변하지 않습니다. 이 레이아웃은 수평으로 위치한 콘텐츠를 포함하는 <code>amp-carousel</code>과 같은 요소에 적합합니다. <code>height</code> 속성은 반드시 필요하지만<code>width</code> 속성은 존재하지 않거나 <code>auto</code>와 동일해야 합니다.</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>상위 요소가 유연한 컨테이너인 경우(예: <code>display: flex</code>) 요소 및 레이아웃 유형이 <code>flex-item</code>로 지정된 상위 요소의 기타 요소는 상위 컨테이너의 나머지 공간에 위치합니다. <code>width</code> 및 <code>height</code> 속성은 필요하지 않습니다.</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>요소는 사용 가능한 공간에 위치하며 <code>amp-img</code>로 전달된 `width` 및 `height`를 통해 정의된 요소의 크기에 도달하거나 `max-width`와 같은 CSS 제한에 도달할 때<em>까지</em> <code>width</code> 및 <code>height</code> 속성으로 제공된 가로세로비에 맞춰 높이를 자동으로 변경합니다. 너비 및 높이 속성은 반드시 필요합니다. 이 레이아웃은 <code>amp-img</code>, <code>amp-carousel</code>  등을 비롯한 대부분의 AMP 요소에 적합합니다. 사용 가능한 공간은 상위 요소에 따라 다르며 <code>max-width</code> CSS를 사용하여 맞춤 설정할 수도 있습니다. 이 레이아웃은 고유 높이 및 너비가 있다는 점에서 <code>responsive</code>와 구별됩니다. <code>responsive</code> 레이아웃이 0x0을 렌더링하고 <code>intrinsic</code> 레이아웃이 실제 크기 또는 CSS 제한 중 더 작은 쪽에 맞춰 커지는 플로팅 요소 내에서 가장 분명하게 나타납니다.</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>요소가 표시되지 않으며 디스플레이 스타일이 <code>none</code>으로 지정된 것처럼 화면에서 공간을 차지하지 않습니다. 이 레이아웃은 모든 AMP 요소에 적용할 수 있습니다. 사용자 액션에 따라 요소가 스스로 화면에 표시되는 것으로 추정합니다(예: <code>amp-lightbox</code>). <code>width</code> 및 <code>height</code> 속성은 필요하지 않습니다.</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>요소는 사용 가능한 공간에 위치하며 <code>width</code> 및 <code>height</code> 속성으로 제공된 가로세로비에 맞춰 높이를 자동으로 변경합니다. 이 레이아웃은 <code>amp-img</code>, <code>amp-video</code> 등을 비롯한 대부분의 AMP 요소에 적합합니다. 사용 가능한 공간은 상위 요소에 따라 다르며 <code>max-width</code> CSS를 사용하여 맞춤 설정할 수 있습니다. <code>width</code> 및 <code>height</code> 속성은 반드시 필요합니다.<p><strong>참고</strong>: <code>"layout=responsive"</code>를 사용하는 요소는 고유 크기가 없습니다. 요소의 크기는 컨테이너 요소에 따라 결정됩니다. AMP 요소를 표시하려면 포함하는 요소의 너비와 높이를 지정해야 합니다. 포함하는 요소에 <code>"display:table"</code>을 지정하지 않습니다. 지정할 경우 AMP 요소 표시가 재정의되어 AMP 요소가 표시되지 않게 렌더링됩니다.</p> </td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

`responsive` 레이아웃을 지원하는 모든 AMP 요소는 `sizes` 속성도 지원합니다. 이 속성의 값은 [img 크기](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)에서 설명된 것처럼 크기를 표시하지만 이미지뿐이 아닌 모든 요소로 확장됩니다. 즉 `sizes` 속성은 미디어 조건에 따라 요소의 너비가 계산되는 방식을 설명합니다.

`sizes` 속성이 `width` 및 `height` 속성과 함께 지정되면 `layout`은 기본적으로 `responsive`로 설정됩니다.

**예시**: `sizes` 속성 사용

다음 예시에서 뷰포트 너비가 `320px`보다 클 경우 이미지 너비는 320px이며 이외의 경우 100vw입니다(뷰포트 너비의 100%).

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"

> </amp-img>
> [/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

`sizes` 속성 자체는 요소에 인라인 `width` 스타일을 설정합니다. `sizes` 속성이 `disable-inline-width`과 함께 사용될 경우, AMP의 일반적인 `sizes` 속성과 달리 `width`를 자체적으로 설정하지 않고도 AMP 요소가 `amp-img`에 중첩된 `img`와 마찬가지로 `sizes` 값을 요소의 기본 태그로 전달합니다.

**예시**: `disable-inline-width` 속성 사용

다음 사례에서 `<amp-img>` 요소의 너비는 영향받지 않으며 `sizes`는 `srcset`의 출처 중 하나를 선택하는 데만 사용됩니다.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"
disable-inline-width

> </amp-img>
> [/sourcecode]

### `heights` <a name="heights"></a>

`responsive`을 지원하는 모든 AMP 요소는 `heights` 속성도 지원합니다. 이 속성의 값은 [img sizes attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)와 유사하게 미디어 표현에 따라 크기를 표시하지만 두 가지 주요한 차이점이 있습니다.

1. 요소의 너비가 아닌 높이에 적용됩니다.
2. 퍼센트 값이 허용됩니다(예: `86%`). 퍼센트 값을 사용할 경우 요소의 너비 %를 나타냅니다.

`heights` 속성이 `width` 및 `height`와 함께 지정될 경우 `layout`은 기본적으로 <code>responsive</code>로 설정됩니다.

**예시**: `heights` 속성 사용

이 예시에서 이미지의 높이는 기본적으로 너비의 80%로 지정되지만 뷰포트 너비가 `500px`보다 클 경우 최대 높이는 `200px`입니다. `heights` 속성이 `width` 및 `height`와 함께 지정되므로 레이아웃은 기본적으로 `responsive`로 설정됩니다.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="320"
height="256"
heights="(min-width:500px) 200px, 80%"

> </amp-img>
> [/sourcecode]

### `media` <a name="media"></a>

대부분의 AMP 요소는 `media` 속성을 지원합니다. `media`의 값은 미디어 쿼리입니다. 쿼리가 일치하지 않을 경우 요소는 렌더링되지 않으며 관련 리소스나 잠재적으로는 하위 요소의 리소스도 가져올 수 없습니다. 브라우저 창의 크기나 방향이 변경되면 미디어 쿼리가 재평가되며 새 결과에 따라 요소가 숨겨지거나 표시됩니다.

**예시**: `media` 속성 사용

다음 예시에서는 상호배타적 미디어 쿼리가 포함된 이미지 2개를 사용합니다. 화면 너비에 따라 이미지 2개 중 하나를 가져와 렌더링합니다. `media` 속성은 모든 AMP 요소에서 지원되므로 광고처럼 이미지가 아닌 요소와 함께 사용될 수 있습니다.

[sourcecode:html]
<amp-img
media="(min-width: 650px)"
src="wide.jpg"
width="466"
height="355"
layout="responsive"

> </amp-img>
> <amp-img
>   media="(max-width: 649px)"
>   src="narrow.jpg"
>   width="527"
>   height="193"
>   layout="responsive"
> </amp-img>
> [/sourcecode]

### `placeholder` <a name="placeholder"></a>

`placeholder` 속성은 AMP 요소만이 아닌 모든 HTML 요소에 설정될 수 있습니다. `placeholder` 속성은 이 속성으로 표시된 요소가 상위 AMP 요소의 플레이스홀더 역할을 한다는 점을 나타냅니다. 지정된 경우 플레이스홀더 요소는 AMP 요소의 직접 하위 요소여야 합니다. 기본적으로 AMP 요소의 리소스가 다운로드 또는 초기화되지 않은 경우에도 AMP 요소에 플레이스홀더가 표시됩니다. 일반적으로 준비가 완료되면 AMP 요소는 플레이스홀더를 숨기고 콘텐츠를 표시합니다. 플레이스홀더와 관련한 정확한 동작은 요소의 구현에 따라 결정됩니다.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
<amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

`fallback` 속성은 AMP 요소만이 아닌 모든 HTML 요소에 설정될 수 있습니다. 폴백 속성이 설정되면 요소는 브라우저에서 해당 요소가 지원되지 않는다는 점을 사용자에게 알릴 수 있습니다. 지정된 경우 폴백 요소는 AMP 요소의 직접 하위 요소여야 합니다. 폴백과과 관련한 정확한 동작은 요소의 구현에 따라 결정됩니다.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">

  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

`noloading` 속성은 이 요소에서 "로딩 표시기" 사용이 중단되어야 하는지를 나타냅니다. 요소가 완전히 로드되지 않았음을 나타내는 기본 애니메이션인 "로딩 표시기"를 표시하도록 많은 AMP 요소가 허용 목록에 포함됩니다. 해당 요소는 이 속성을 추가하여 동작 사용을 해제할 수 있습니다.

## (tl;dr) 레이아웃 요구 사항 및 동작 요약 <a name="tldr-summary-of-layout-requirements--behaviors"></a>

다음 표는 허용되는 매개변수, CSS 클래스 및 `layout` 속성에 사용되는 스타일을 명시합니다. 다음 사항에 유의하세요.

1. `-amp-`가 접두어가 표시된 모든 CSS 클래스 및 `i-amp-`가 접두어가 있는 요소는 AMP 내부의 클래스 및 요소로 간주되며 사용자 스타일시트에서 사용은 허용되지 않습니다. 이곳에는 정보 제공 목적으로만 표시됩니다.
2. 표에서 `width` 및 `height` 속성이 필수 사항으로 지정되었더라도 `amp-pixel` 및 `amp-audio` 사례처럼 기본 규칙이 적용될 수 있습니다.

<table>
  <thead>
    <tr>
      <th width="21%">레이아웃</th>
      <th width="20%">너비/<br>높이 필수 여부</th>
      <th width="20%">크기 정의 여부</th>
      <th width="20%">추가 요소</th>
      <th width="19%">CSS "디스플레이"</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>필수 아님</td>
      <td>정의 안 함</td>
      <td>없음</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>필수 아님</td>
      <td>정의함. 상위 요소 크기.</td>
      <td>없음</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>필수</td>
      <td>정의함.  <code>width</code> 및 <code>height</code>로 지정.</td>
      <td>없음</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td> <code>height</code>만 필수. <code>width</code>는 <code>auto</code>로 가능.</td>
      <td>정의함. 상위 컨테이너 및 <code>height</code>로 지정.</td>
      <td>없음</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>필수 아님</td>
      <td>정의 안 함</td>
      <td>있음. 상위 컨테이너에 따름.</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>필수</td>
      <td>정의함. 상위 컨테이너 및 <code>width:height</code> 가로세로비에 따름.</td>
      <td>있음. <code>i-amphtml-sizer</code>.</td>
      <td> <code>block</code>(<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element" rel="nofollow">대체된 요소</a>처럼 동작)</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>필수 아님</td>
      <td>정의 안 함</td>
      <td>없음</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>필수</td>
      <td>정의함. 상위 컨테이너 및 <code>width:height</code> 가로세로비에 따름</td>
      <td>있음. <code>i-amphtml-sizer</code>.</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>
