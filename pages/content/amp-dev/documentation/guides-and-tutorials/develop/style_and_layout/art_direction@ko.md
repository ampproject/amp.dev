---
$title: srcset, sizes & heights를 이용한 반응형 이미지 처리
---

## srcset

여러 미디어 표현식을 기준으로 요소의 에셋을 제어하기 위해 `srcset` 속성을 사용할 수 있습니다.
특히 다양한 스크린 사이즈별 이미지 에셋을 정의하기 위해,
모든 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 태그에서 사용합니다.

다음 간단한 예제에서,
`srcset`은 화면 너비(screen width)를 기준으로 image를 정의합니다.
`w` 설명자는 브라우저에서 리스트 내 각 이미지의 width를 말해줍니다.

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w">
</amp-img>
```
[/example]

노트: AMP는 `w` 설명자가 있는 srcset을 모든 브라우저에서 지원합니다.

`srcset`을 사용한 반응형 이미지 제작 방법에 대한 더 자세한 내용은
[반응형 이미지 사용하기 (Now)](http://alistapart.com/article/using-responsive-images-now)를 참고하시길 바랍니다.

## 사이즈

`srcset`과 함께 `sizes` 속성을 사용할 수 있습니다.
`sizes` 속성은 미디어 표현식을 기준으로 요소 사이즈를 어떻게 게산할 지 설명합니다.
요소의 계산된 사이즈를 기준으로, 유저 에이전트는 `srcset` 속성에서 제공하는 에셋 중 가장 적절한 에셋을 선택합니다.

아래 예제를 참고하길 바랍니다:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw">
</amp-img>
```
[/example]

`sizes` 속성은 viewport가 650px이거나 그 이상인 경우,
요소의 너비를 viewport 사이즈의 50%로 정의합니다.
예를 들어, viewport가 800px인 경우,
요소의 너비는 400px입니다.
이 경우 브라우저에서는 `srcset` 리소스 중 가장 400px과 가까우며,
디바이스 픽셀 해상도를 1로 가정하여, `narrow.jpg`(320px)를 불러옵니다

중요: sizes 속성이 width 및 height와 함께 정의된 경우, 기본 layout은 `responsive`로 정의합니다.

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

[example preview="top-frame" playground="true"]
```html
<amp-img alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%">
</amp-img>
```
[/example]

이 예제에서 요소의 height는 width의 80%로 정의되어있지만,
viewport가 `500px`보다 큰 경우 `200px`이 됩니다.
