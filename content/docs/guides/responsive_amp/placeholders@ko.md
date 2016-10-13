---
$title: 플레이스홀더 & 폴백
$order: 3
---
[TOC]

컨텐츠 인식 가능성과 단계적 기능향상을 추구하기 위해,
플레이스홀더와 가능한 많은 폴백을 제공하는 게 모범 사례입니다.

일부 요소에서는 제한을 완화하여 당신이 하려는 일을 할 수 있게 해줍니다.
예를 들어, 만약 [`<amp-iframe>`](/docs/reference/components/amp-iframe.html#iframe-with-placeholder) 요소에 플레이스홀더를 제공하면,
페이지의 최상단에서 사용할 수 있습니다. (플레이스홀더가 없다면 동작하지 않습니다)

## 플레이스홀더

특정 요소에 `placeholder` 속성을 정의하면 부모 AMP 요소의 플레이스홀더로 동작합니다.
만약 정의한다면, `placeholder` 요소는 AMP 요소의 직계 자식 요소여야 합니다.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive">
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

기본적으로, AMP 요소의 리소스가 다운로드되거나 초기화되지 않았더라도,
플레이스홀더는 AMP 요소를 위해 즉시 나타납니다.
AMP 요소가 준비되면, 플레이스홀더를 가리고 컨텐츠를 나타냅니다.

<aside class="note">
  <strong>노트:</strong>
  <span>플레이스홀더는 AMP 요소가 아닙니다; 어떤 HTML요소던 플레이스홀더로 사용할 수 있습니다.</span>
</aside>

## 폴백

`fallback` 속성은 브라우저에서 지원하지 않는 요소의 폴백 동작을 정의하는 속성입니다.
예를 들어, `fallback` 속성을 사용하면 특정 특성을 지원하지 않는 브라우저를 사용하는 유저에게 적절한 대체 정보를 제공할 수 있습니다.


[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg">
  <div fallback>
    <p>브라우저에서 HTML5를 지원하지 않습니다.</p>
  </div>
</amp-video>
[/sourcecode]

AMP 요소가 아닌 일반 HTML 요소에 `fallback` 속성을 정의할 수 있습니다.
만약 정의한다면, `fallback` 요소는 AMP 요소의 직계 자식 요소여야 합니다.

## 로딩 인디케이터 가리기

많은 AMP 요소는 요소가 완전히 로딩되기 전까지 보여주는 기본 애니메이션인 "로딩 인디케이터"를 보여줍니다.
요소에 `noloading` 속성을 추가함으로써 이런 동작을 없앨 수 있습니다.
