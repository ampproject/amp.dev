---
$title: 이미지 및 비디오 가져오기
$order: 1

toc: true
---

[TOC]

일반 HTML 페이지처럼, AMP에서도 **images**, **video**, **audio** 를 가져올 수 있습니다.
AMP와 비교했을 때 차이점과 어떻게 페이지에서 가져올 수 있는 지 살펴봅시다.

## 왜 `<img>`, `<video>`, `<audio>`가 아닌가요?

AMP는 `<img>` 같은 미디어를 표현하는 기본 HTML을 지원하지 않습니다.
아래와 같은 이유로 기본 HTML과 동등한 컴포넌트를 제공합니다:

* [뷰포트의 사전 로딩](/ko/learn/about-how/#size-all-resources-statically)을 지원하려면 자원을 불러오기 전의 페이지 레이아웃에 대한 이해가 필수적입니다.
* [효과적으로 자원을 불러오는 과정의 우선순위를 정하거나 지연](/ko/learn/about-how/#prioritize-resource-loading)하기 위해 네트워크 요청을 제어할 필요가 있습니다.

<aside class="caution">
  <strong>주의:</strong>
  <span>위에서 말한 것들을 지원하지는 않지만, 그것들은 렌더링 <i>될 것이며</i>,
  AMP는 <a href="/ko/docs/guides/debug/validate.html">페이지 검증</a>을 하지 않으며,
  AMP에서 제공하는 모든 혜택을 얻지 못할 것입니다.</span>
</aside>

## 이미지

페이지에 이미지를 가져올 때는 [`amp-img`](/ko/docs/reference/components/amp-img.html) 요소를 사용합니다:

[sourcecode:html]
<amp-img src="fixed.jpg" width="264" height="96"></amp-img>
[/sourcecode]

위 예제에서, 이미지는 정의된 고정 height와 width에 맞추어 표현될 것입니다.
최소한, 명시적인 width와 height는 설정해야합니다.

### 고급 레이아웃

AMP는 표준 CSS/HTML에 비교했을 때 훨씬 쉽게 반응형 이미지를 만듭니다.
기본 형태에서, `layout="responsive"`를 추가하기만 하면 됩니다:

[sourcecode:html]
<amp-img src="responsive.jpg" width="527" height="193" layout="responsive">
</amp-img>
[/sourcecode]

<aside class="success">
  <strong>더 읽기:</strong>
  <span>더 상세한 내용은 <a href="/ko/docs/guides/author-develop/responsive/control_layout.html">레이아웃 & 미디어쿼리</a>를 참고하길 바랍니다.</span>
</aside>

### 동작 및 플레이스홀더

AMP HTML 런타임은 뷰포트 위치, 시스템 리소스, 연결 대역폭, 그 외의 요인을 바탕으로
리소스 로딩 우선순위나 지연을 선택하여 이미지 리소스를 관리할 수 있습니다.

<aside class="success">
  <strong>더 읽기:</strong>
  <span>더 상세한 내용은 <a href="/ko/docs/guides/author-develop/responsive/placeholders.html">이미지를 위한 플레이스홀더 & 폴백</a>을 참고하길 바랍니다.</span>
</aside>

## 애니메이션되는 이미지

[`amp-anim`](/ko/docs/reference/components/amp-anim.html) 요소는 `amp-img` 요소와 매우 유사하며,
GIF 같이 애니메이션되는 이미지의 재생 및 로딩을 제어하는 기능을 추가로 제공합니다.

[sourcecode:html]
<amp-anim width="400" height="300" src="my-gif.gif">
  <amp-img placeholder width="400" height="300" src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
[/sourcecode]

<aside class="note">
  <strong>노트:</strong>
  <span>이 컴포넌트를 사용할 때 페이지의 헤드에 <code>&lt;script async custom-element="amp-anim"
  src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"&gt;&lt;/script&gt;</code>를 추가해야합니다.</span>
</aside>

## 비디오

페이지에 비디오를 가져올 때는 [`amp-video`](/ko/docs/reference/components/amp-video.html) 요소를 사용합니다.

이 요소는 직접적으로 HTML5 비디오 파일을 가져올 때만 사용해야 합니다.
요소는 `src` 속성에 정의된 비디오 리소스를 AMP에서 정의한 시간에 lazy 로딩합니다.

비디오가 시작하기 전에 보여줄 플레이스홀더를 포함할 수 있으며,
브라우저에서 HTML5 비디오를 지원하지 않는 경우 등을 대비한 폴백을 제공할 수 있습니다:

[sourcecode:html]
<amp-video width="400" height="300" src="https://yourhost.com/videos/myvideo.mp4"
  poster="myvideo-poster.jpg">
  <div fallback>
    <p>브라우저에서 HTML5 비디오를 지원하지 않습니다.</p>
  </div>
</amp-video>
[/sourcecode]

## Audio

페이지에 오디오 리소스를 가져올 때는
[`amp-audio`](/ko/docs/reference/components/amp-audio.html) 요소를 사용합니다.

이 요소는 직접적으로 HTML5 오디오 파일을 가져올 때만 사용해야 합니다.
AMP 페이지에서 가져오는 모든 다른 외부 리소스처럼,
요소는 `src` 속성에 정의된 오디오 리소스를 AMP에서 정의한 시간에 lazy 로딩합니다.

오디오가 시작하기 전에 보여줄 플레이스홀더를 포함할 수 있으며,
브라우저에서 HTML5 오디오를 지원하지 않는 경우 등을 대비한 폴백을 제공할 수 있습니다:

[sourcecode:html]
<amp-audio width="400" height="300" src="https://yourhost.com/audios/myaudio.mp3">
  <div fallback>
    <p>브라우저에서 HTML5 오디오를 지원하지 않습니다.</p>
  </div>
  <source type="audio/mpeg" src="foo.mp3">
  <source type="audio/ogg" src="foo.ogg">
</amp-audio>
[/sourcecode]

<aside class="note">
  <strong>노트:</strong>
  <span>이 컴포넌트를 사용할 때 페이지의 헤드에 <code>&lt;script async custom-element="amp-anim"
  src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"&gt;&lt;/script&gt;</code>를 추가해야합니다.</span>
</aside>
