---
$title: srcset, sizes & heights를 이용한 미적 이미지 처리
---
[TOC]


## srcset

여러 미디어 표현식을 기준으로 요소 자원을 제어하기 위해 `srcset` 속성을 사용할 수 있습니다.
특히, 여러 스크린 사이즈별 이미지 자원을 정의하기 위해,
모든 [`amp-img`](/docs/reference/components/amp-img.html) 태그에서 사용합니다.

아래의 간단한 예제에서,
`srcset`은 화면 너비(screen width)를 기준으로 image를 정의합니다.
`w` 설명자는 브라우저에서 리스트 내 각 이미지의 width를 말해줍니다.

<!--embedded amp-img example using srcset -->
<div>
<amp-iframe height="231"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.srcset.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('노트', type='note') %}
AMP는 `w` 설명자가 있는 srcset을 모든 브라우저에서 지원합니다.
{% endcall %}

`srcset`을 사용한 반응형 이미지 제작 방법에 대한 더 자세한 내용은
[반응형 이미지 사용하기 (Now)](http://alistapart.com/article/using-responsive-images-now)를 참고하시길 바랍니다.

## 사이즈

`srcset`과 함께 `sizes` 속성을 사용할 수 있습니다.
`sizes` 속성은 미디어 표현을 기준으로 요소 사이즈를 어떻게 게산할 지 설명합니다.
요소의 계산된 사이즈를 기준으로, 유저 에이전트는 `srcset` 속성에서 제공하는 자원 중 가장 적절한 자원을 선택합니다.

아래 예제를 참고하길 바랍니다:

<!--embedded amp-img example using sizes -->
<div>
<amp-iframe height="231"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.sizes.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

`sizes` 속성은 뷰포트가 650px 이상인 경우,
요소의 너비를 viewport 사이즈의 50%로 정의합니다.
예를 들어, viewport가 800px인 경우,
요소의 너비는 400px입니다.
이 경우 브라우저에서는 `srcset` 리소스 중 가장 400px과 가까우며,
디바이스 픽셀 해상도를 1로 가정하여, `narrow.jpg`(320px)를 불러옵니다

{% call callout('중요', type='caution') %}
sizes 속성이 width와 height와 함께 정의된 경우, 기본 layout은 `responsive`로 정의합니다.
{% endcall %}

`sizes`와 `srcset` 속성이 미디어 쿼리에 비교하여 어떻게 동작하는 지에 대한 더 상세한 정보는,
[Srcset and sizes](https://ericportis.com/posts/2014/srcset-sizes/) 블로그 글을 참고하길 바랍니다.

## heights

모든 AMP 커스텀 요소는 `responsive` 레이아웃을 허용하며, `heights` 속성도 허용합니다.
이 속성의 값은 [img sizes attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)와
비슷하게 미디어 표현에 의존하여 사이즈를 정의하지만, 큰 차이점이 두개 있습니다.

 1. 요소의 너비가 아닌 높이를 허용합니다.
 2. `86%`같은 퍼센트 값을 허용합니다.
 퍼센트 값은 요소의 너비에 비례합니다.

`heights` 속성이 `width`, `height`와 함께 정의되어 있을 때 기본 `layout`은` responsive`으로 정의합니다.

예:

<!--embedded amp-img example using heights -->
<div>
<amp-iframe height="193"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.heights.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

이 예제에서 요소의 height는 width의 80%로 정의되어있지만,
viewport가 `500px`보다보다 큰 경우 `200px`이 됩니다.
