---
'$title': 이미지 및 동영상 삽입
$order: 8
description: 일반적인 HTML 페이지와 마찬가지로 AMP에도 이미지, 동영상 및 오디오 콘텐츠를 삽입할 수 있습니다. AMP 요소의 차이점과 페이지에 해당 요소를 삽입하는 방법을 알아보세요.
formats:
  - websites
  - stories
  - email
  - ads
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

일반적인 HTML 페이지와 마찬가지로, AMP 에도 **이미지**, **동영상**, "**오디오** 콘텐츠를 삽입할 수 있습니다."

## 왜 `<img>`, `<video>`, `<audio>` 를 사용할 수 없나요?

AMP 는 `<img>` 와 같이 미디어를 표시하는 기본 HTML 요소를 지원하지 않습니다. 대신 이러한 요소에 해당하는 구성요소를 제공하는데, 그 이유는 다음과 같습니다.

- 애셋이 로드되기 전에 페이지의 레이아웃을 파악해야 하며, 이는 [첫 표시 영역을 미리 로드하는 데 필수적입니다.](../../../../about/how-amp-works.html#size-all-resources-statically)
- 네트워크의 레이지 로드 요청을 제어하고 [리소스의 우선순위를 효과적으로 지정해야 합니다.](../../../../about/how-amp-works.html#prioritize-resource-loading)

주의: 지원되지 않는 <code>&lt;img></code>, <code>&lt;video></code>, <code>&lt;audio></code> 도 렌더링이 됩니다. 하지만 AMP 에서 <a href="../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md">페이지를 확인하지</a> 못하여 AMP 의 다양한 이점을 누릴 수 없게 됩니다.

## 이미지

다음과 같이 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 요소를 사용하여 페이지에 이미지를 삽입합니다.

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
</amp-img>
```

[/example]

이는 가장 기본적인 예로, 이미지는 지정된 높이와 너비로 고정되어 표시됩니다. 최소한 너비와 높이가 명시적으로 설정되어 있어야 합니다.

#### 자바스크립트가 사용 중지되었을 때 이미지 표시

As `<amp-img>` 는 자바스크립트를 사용하므로, 사용자가 스크립트를 사용 중지한 경우 이미지가 표시되지 않습니다. 이 경우, 다음과 같이 `<img>`, `<noscript>` 를 사용하여 이미지 대신 표시할 내용을 지정해야 합니다.

[example preview="inline" playground="true"]

```html
<amp-img
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
  <noscript>
    <img
      src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
      width="264"
      height="195"
    />
  </noscript>
</amp-img>
```

[/example]

### 고급 레이아웃

AMP 에서는 표준 CSS/HTML 에서보다 훨씬 쉽게 완전 반응형 이미지를 생성할 수 있습니다. 아래는 가장 기본적인 형식으로, `layout="responsive"` 를 추가하기만 하면 됩니다.

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive"
>
</amp-img>
```

[/example]

읽어보기: Learn more about [고급 레이아웃 기술](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) 에 관해 자세히 알아보세요.

### 동작 및 플레이스홀더

AMP HTML 런타임은 이미지 리소스를 효과적으로 관리하여 표시 영역 위치, 시스템 리소스, 연결 대역폭 등과 같은 요인을 바탕으로 리소스 로드를 지연시킬지 우선할지 선택할 수 있습니다.

읽어보기: [이미지의 대체 내용 및 자리표시자를 제공](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) 하는 방법에 관해 자세히 알아보세요.

## 애니메이션 이미지

The [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) 요소는 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 요소와 아주 유사하며, GIF 와 같은 애니메이션 이미지의 로드 및 재생을 관리하는 추가 기능을 제공합니다.

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
>
  <amp-img
    placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
  >
  </amp-img>
</amp-anim>
```

[/example]

참고: 이 구성요소를 사용하려면<code> &lt;script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js">&lt;/script></code> 를 페이지 헤드에 삽입하세요.

## 동영상

페이지에 동영상을 삽입하려면 [`amp-video`](../../../../documentation/components/reference/amp-video.md) 요소를 사용합니다.

직접 HTML5 동영상 파일 삽입에만 이 요소를 사용하세요. 이 요소는 `src` 속성으로 지정한 비디오 리소스를 AMP 가 결정한 시간에 레이지 로드합니다.

동영상이 시작하기 전에 플레이스홀더를 삽입하고, 브라우저에서 HTML5 동영상을 지원하지 않는 경우 대체할 내용을 삽입합니다. 예를 들면 다음과 같습니다.

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

## 오디오

페이지에 오디오 리소스를 삽입하려면 [`amp-audio`](../../../../documentation/components/reference/amp-audio.md) 요소를 사용합니다.

직접 HTML5 오디오 파일 삽입에만 이 요소를 사용하세요. AMP 페이지에 삽입되는 모든 외부 리소스와 같이, 이 요소는 `src` 속성으로 지정한 오디오 리소스를 AMP가 결정한 시간에 레이지 로드합니다.

브라우저가 HTML5 오디오를 지원하지 않는 경우 대체를 포함합니다. 예를 들면 다음과 같습니다.

[example preview="inline" playground="true" imports="amp-audio:0.1"]

```html
<amp-audio width="400"
  height="200"
  {% if format == 'stories' %}  layout="nodisplay" autoplay
  {% endif %}
  src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio.</p>
  </div>
  <source type="audio/mpeg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <source type="audio/ogg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.ogg">
</amp-audio>
```

[/example]

참고: 이 구성요소를 사용하려면 <code>&lt;script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js">&lt;/script></code> 를 페이지 헤드에 삽입하세요.
