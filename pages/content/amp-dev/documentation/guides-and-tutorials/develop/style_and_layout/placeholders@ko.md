---
$title: 플레이스홀더 및 대체 콘텐츠
$order: 3
descriptions: 인지된 성능 및 점진적 개선을 위해 가능한 경우 AMP 모범 사례로 플레이스홀더 및 대체 콘텐츠를 제공합니다.
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

인지된 성능 및 점진적 개선을 위해 가능한 경우 AMP 모범 사례로 플레이스홀더 및 대체 콘텐츠를 제공합니다.

일부 요소는 제한을 완화하여 효과를 얻을 수 있습니다. 예를 들어 [`<amp-iframe>`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder)에 플레이스홀더를 제공하는 경우 페이지 상단 근처에서 사용할 수 있습니다(없으면 작동하지 않음).

## 플레이스홀더

`placeholder` 속성으로 표시된 요소는 상위 AMP 요소의 플레이스홀더 역할을 합니다. 지정된 경우 `placeholder` 요소는 AMP 요소의 직접 하위 요소여야 합니다. `placeholder`로 표시된 요소는 항상 상위 AMP 요소를 `fill`합니다.

[example preview="inline" playground="true" imports="amp-anim:0.1"]
```html
<amp-anim src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300">
  <amp-img placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill">
  </amp-img>
</amp-anim>
```
[/example]

기본적으로 AMP 요소의 리소스가 다운로드되거나 초기화되지 않아도 플레이스홀더는 AMP 요소에 즉시 표시됩니다. 준비가 완료되면 AMP 요소는 일반적으로 플레이스홀더를 숨기고 콘텐츠를 표시합니다.

[tip type="note"] <strong>참고 –</strong> 플레이스홀더가 꼭 AMP 요소일 필요는 없습니다. 모든 HTML 요소는 플레이스홀더 역할을 할 수 있습니다. [/tip]

## 대체 콘텐츠 <a name="fallbacks"></a>

요소에 `fallback` 속성을 지정하여 다음 상황에서 대체 콘텐츠 동작을 알려줄 수 있습니다.

- 브라우저에서 요소를 지원하지 않는 경우
- 콘텐츠를 로드하지 못한 경우(예: 트윗이 삭제됨)
- 이미지 유형이 지원되지 않는 경우(예: WebP는 모든 브라우저에서 지원되지 않음)

`fallback` 속성은 AMP 요소뿐 아니라 *모든* HTML 요소에도 설정할 수 있습니다. 지정된 경우 `fallback` 요소는 AMP 요소의 직접 하위 요소여야 합니다.

##### 예: 지원되지 않는 기능

다음 예시의 경우 `fallback` 속성을 지정하여 브라우저가 특정 기능을 지원하지 않는다는 사실을 사용자에게 알려줄 수 있습니다.

[example preview="inline" playground="true" imports="amp-video:0.1"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

##### 예: 다른 이미지 형식 게재

다음 예시의 경우 `fallback` 속성을 사용하여 WebP 형식이 지원되지 않으면 JPEG 파일을 사용하라고 브라우저에 알립니다.

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

## 플레이스홀더 및 대체 콘텐츠 상호작용

동적 콘텐츠에 의존하는 AMP 요소(예: [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md), [`amp-list`](../../../../documentation/components/reference/amp-list.md))에서 대체 콘텐츠 및 플레이스홀더는 다음과 같이 상호작용합니다.

<ol>
  <li>콘텐츠가 로드되는 동안 플레이스홀더를 표시합니다.</li>
  <li>콘텐츠가 로드되면 플레이스홀더를 숨기고 콘텐츠를 표시합니다.</li>
  <li>콘텐츠를 로드하지 못한 경우     <ol>
<li>대체 요소가 있다면 대체 콘텐츠를 표시합니다.</li> <li>없다면 계속 플레이스홀더를 표시합니다.</li>
</ol>
</li>
</ol>

## 로드 중 표시기 숨기기

많은 AMP 요소는 허용 목록에 추가되어 요소가 완전히 로드되지 않았음을 나타내는 기본 애니메이션인 '로드 중 표시기'를 표시합니다. 요소는 `noloading` 속성을 추가하여 이 동작을 차단할 수 있습니다.
