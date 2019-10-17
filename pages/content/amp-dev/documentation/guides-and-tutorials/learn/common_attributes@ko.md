---
$title: 일반 속성
---

[TOC]

AMP는 여러 가지 AMP 구성요소 및 HTML 요소로 확장되는 일반 속성 집합을 제공합니다.  이 문서에서는 각각의 일반 속성을 설명합니다.

## fallback

fallback은 브라우저에서 요소를 지원하지 않거나 필요한 리소스를 로드하지 못한 경우 사용자에게 알려 주기 위한 규칙입니다. `fallback` 속성은 대체 동작을 지원하는 AMP 요소의 직접 하위 요소인 모든 HTML 요소에 배치할 수 있습니다. fallback과 관련된 정확한 작동은 요소의 구현에 따라 달라지지만, fallback 요소는 주로 일반 요소를 대신해 표시됩니다.

일반적으로 함께 사용되는 항목: 이미지, 애니메이션, 오디오, 동영상

예:

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive" >
  <div fallback>이 기기에서 애니메이션 이미지를 표시할 수 없습니다.</div>
</amp-anim>
[/sourcecode]

자세한 내용은 [자리표시자 및 대체 동작](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)을 참조하세요.


## heights

`responsive` 레이아웃을 지원하는 모든 AMP 요소는 `heights` 속성도 지원합니다. 이 속성의 값은 미디어 표현에 따른 크기 표현이며, [`img` 태그의 sizes 속성](https://developer.mozilla.org/ko-KR/docs/Web/HTML/Element/img)과 비슷하지만 2가지 중요한 차이점이 있습니다.


1. 요소의 너비가 아닌 높이에 적용되는 값입니다.
2. 백분율 값이 허용됩니다. 백분율 값은 요소 너비에 대한 백분율을 나타냅니다. 예를 들어 `80%`라는 값은 요소의 높이가 요소 너비의 80%라는 사실을 뜻합니다.

참고: `heights` 속성이 `width` 및 `height`와 함께 지정되는 경우 `layout`의 기본값은 'responsive`입니다.

예:

[sourcecode:html]
<amp-img src="amp.png"
    width="320" height="256"
    heights="(min-width:500px) 200px, 80%">
</amp-img>
[/sourcecode]

자세한 내용은 [srcset, sizes, heights를 이용한 미적 이미지 처리](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md)를 참조하세요.

## layout

AMP는 AMP 구성요소가 문서 레이아웃에서 어떻게 작동할지 지정하는 [레이아웃](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) 집합을 제공합니다. 요소에 지원되는 레이아웃 값 중 하나와 함께 `layout` 속성을 추가하여 구성요소의 레이아웃을 지정할 수 있습니다. 해당하는 요소에 관한 도움말에서 어떤 값이 지원되는지 확인하세요.

예:

[sourcecode:html]
<amp-img src="/img/amp.jpg"
    width="1080"
    height="610"
    layout="responsive"
    alt="이미지">
</amp-img>
[/sourcecode]

자세한 내용은 [레이아웃 및 미디어 쿼리](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) 및 [레이아웃 사양](amp-html-layout/index.md)을 참조하세요.

## media <a name="media"></a>

모든 AMP 요소는 `media` 속성을 지원합니다. `media` 값은 미디어 쿼리입니다. 쿼리가 일치하지 않으면 요소가 렌더링되지 않고 요소의 리소스를 가져올 수 없으며, 하위 요소의 리소스까지 가져오지 못할 수도 있습니다. 브라우저 창의 크기와 방향이 변경되는 경우 새로운 결과에 따라 미디어 쿼리가 재평가되며 요소가 숨겨지고 표시됩니다.

예:

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="466"
    height="355" layout="responsive"></amp-img>
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="527"
    height="193" layout="responsive"></amp-img>
[/sourcecode]

자세한 내용은 [레이아웃 및 미디어 쿼리](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries)를 참조하세요.

## noloading

`noloading` 속성은 이 요소에서 '로드 중 표시기'가 **사용 중지**되어야 하는지를 나타냅니다. 여러 AMP 요소에서는 요소가 완전히 로드되지 않았음을 나타내는 기본 애니메이션인 '로드 중 표시기'가 표시됩니다.

일반적으로 함께 사용되는 항목: 이미지, 애니메이션, 동영상, 광고

예:

[sourcecode:html]
<amp-img src="card.jpg"
    noloading
    height="190"
    width="297"
    layout="responsive">
</amp-img>
[/sourcecode]

## on

`on` 속성은 요소에 이벤트 핸들러를 설정하는 데 사용됩니다. 지원되는 이벤트는 요소에 따라 다릅니다.

일반적으로 함께 사용되는 항목: 라이트박스, 사이드바, 실시간 목록, 양식

구문:

[sourcecode:text]
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
[/sourcecode]

예:

[sourcecode:html]
<button on="tap:my-lightbox">라이트박스 열기</button>
<amp-lightbox id="my-lightbox" layout="nodisplay">
  ...
</amp-lightbox>
[/sourcecode]

자세한 내용은 [AMP 작업 및 이벤트](amp-actions-and-events.md)를 참조하세요.

## placeholder

`placeholder` 속성은 이 속성으로 표시된 요소가 상위 AMP 요소의 플레이스홀더 역할을 한다는 것을 나타냅니다. 이 속성은 placeholder를 지원하는 AMP 요소의 직접 하위 요소인 모든 HTML 요소에 배치할 수 있습니다. 기본적으로 AMP 요소의 리소스가 다운로드되거나 초기화되지 않은 경우에도 AMP 요소의 플레이스홀더가 즉시 표시됩니다. 준비가 완료되면 AMP 요소는 일반적으로 플레이스홀더를 숨기고 콘텐츠를 표시합니다. placeholder 속성과 관련된 정확한 작동은 요소의 구현에 따라 달라집니다.

일반적으로 함께 사용되는 항목: 이미지, 애니메이션, 동영상, 광고

예:

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

자세한 내용은 [자리표시자 및 대체 동작](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)을 참조하세요.


## sizes

`responsive` 레이아웃을 지원하는 모든 AMP 요소는 `sizes` 속성도 지원합니다. `sizes` 속성의 값은 [`img` 태그의 sizes 속성](https://developer.mozilla.org/ko-KR/docs/Web/HTML/Element/img)에 설명된 것과 같은 크기 표현이지만, 이미지뿐만 아니라 모든 요소로 확장됩니다.

예:

[sourcecode:html]
<amp-img src="amp.png"
    width="400" height="300"
    layout="responsive"
    sizes="(min-width: 320px) 320px, 100vw">
</amp-img>
[/sourcecode]

자세한 내용은 [srcset, sizes, heights를 이용한 미적 이미지 처리](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md)를 참조하세요.

## width 및 height

일부 [레이아웃](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute)의 경우 AMP 구성요소에 정수 픽셀 값이 포함된 `width` 및 `height` 속성이 있어야 합니다.

예:

[sourcecode:html]
<amp-anim width="245"
    height="300"
    src="/img/cat.gif"
    alt="고양이 애니메이션">
</amp-anim>
[/sourcecode]

자세한 내용은 [레이아웃 및 미디어 쿼리](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) 및 [레이아웃 사양](amp-html-layout/index.md)을 참조하세요.
