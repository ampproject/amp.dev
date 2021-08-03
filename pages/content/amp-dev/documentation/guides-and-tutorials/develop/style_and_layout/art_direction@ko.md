---
'$title': srcset, sizes & heights를 이용한 반응형 이미지 구성
$order: 4
description: 여러 미디어 표현식을 기준으로 요소의 애셋을 제어하기 위해 srcset 속성을 사용합니다. 특히 모든 amp-img 태그에서 해당 속성을 사용하여...
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

## srcset

여러 미디어 표현식을 기준으로 요소의 애셋을 제어하기 위해 `srcset` 속성을 사용합니다. 특히 모든 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 태그에서 해당 속성을 사용하여 다양한 화면 크기에 맞는 이미지 애셋을 지정할 수 있습니다. `<amp-img>` 태그에 <code>srcset</code> 속성은 있지만 <code>sizes</code> 속성이 없을 경우, AMP는 <a class="" href="https://developer.mozilla.org/ko/docs/Web/HTML/Element/img"> <code>sizes</code>의 HTML5 정의</a>를 충족하는 <code>sizes</code> 속성을 `<amp-img>` 태그의 모든 기본 `<img>` 태그에 자동으로 생성합니다.

다음의 간단한 예제에서 `srcset` 속성은 화면 너비를 기준으로 사용할 이미지를 지정합니다. `w` 디스크립터가 목록의 각 이미지 너비를 브라우저에 알려줍니다.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
>
</amp-img>
```

[/example]

[tip type="note"] <strong>참고 –</strong> AMP는 `w` 디스크립터가 포함된 srcset을 모든 브라우저에서 지원합니다. [/tip]

`srcset`를 활용하여 반응형 이미지를 제작하는 상세한 방법은 [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now) 글을 참고하시길 바랍니다.

## 사이즈

`srcset`와 함께 `sizes` 속성을 사용할 수 있습니다. AMP의 `sizes` 속성은 미디어 표현식을 기준으로 요소 사이즈를 어떻게 계산할지 설명합니다. <strong>모든 AMP 요소의 <code>sizes</code>를 정의할 경우 AMP는 일치하는 미디어 쿼리에 따라 해당 요소의 너비를 인라인 스타일로 지정합니다.</strong> 사용자 에이전트는 계산된 요소 사이즈를 기준으로 `srcset` 속성에서 제공되는 애셋 중 가장 적절한 애셋을 선택합니다.

아래 예제를 참고하길 바랍니다:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw"
>
</amp-img>
```

[/example]

`sizes` 속성은 뷰포트가 650px 이상인 경우 요소의 너비를 뷰포트 사이즈의 50%로 정의합니다. 예를 들어 뷰포트가 800px인 경우 요소의 너비는 400px입니다. 다음으로 브라우저는 기기의 픽셀 해상도를 1로 가정하여 `srcset`의 리소스 중 400px에 가장 근접한 이미지인 `narrow.jpg`(320px)를 선택합니다.

[tip type="important"] <strong>중요 –</strong> 사이즈 속성이 너비 및 높이와 함께 지정된 경우 기본 레이아웃은 `responsive`로 정의합니다. [/tip]

<a class="" href="https://gitlocalize.com/repo/4863/ko/pages/content/amp-dev/documentation/guides-and-tutorials/learn/common_attributes.md">AMP <code data-md-type="codespan">sizes</code> 속성의 자세한 내용</a>을 읽어보세요.

## 높이

모든 AMP 사용자 지정 요소는 `responsive` 레이아웃을 허용하며, `heights` 속성도 지원합니다. 이 속성의 값은 [img sizes 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)과 유사하게 미디어 표현식을 기반으로 사이즈를 정의하지만 2가지 주요한 차이점이 있습니다.

1. 요소의 너비가 아닌 높이에 적용됩니다.
2. 퍼센트 값(예: `86%`)을 허용합니다. 퍼센트 값이 사용될 경우 요소의 너비에 대한 백분율을 의미합니다.

`heights` 속성이 `width`, `height`와 함께 지정된 경우 기본 `layout`은 ` responsive`로 정의합니다.

예제:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
```

[/example]

이 예제에서 요소의 높이는 너비의 80%로 지정되었지만, 뷰포트가 `500px`보다 큰 경우 `200px`까지만 허용됩니다.
