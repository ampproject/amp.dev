---
$title: 플레이스홀더 및 폴백
$order: 3
toc: true
components:
- iframe
---
[TOC]

체감 성능과 점진적 향상을 위해 가능한 경우 AMP 에 플레이스홀더와 폴백을 제공하는 것이 좋습니다.

 이렇게 하면 일부 요소의 제한이 완화되는 경우도 있습니다. 예를 들어 [`<amp-iframe>`](/ko/docs/reference/components/amp-iframe.html#iframe-with-placeholder) 에 플레이스홀더를 제공하면 페이지 상단에 사용할 수 있습니다. 이는 플레이스홀더 없이는 불가능한 방법입니다.

## 플레이스홀더

`placeholder` 속성으로 표시된 요소는 상위 AMP 요소의 플레이스홀더 역할을 합니다. 지정된 경우 `placeholder` 요소는 AMP 요소의 직접 하위 요소여야 합니다. `placeholder` 로 표시된 요소는 항상 상위 AMP 요소에 `fill` 을 적용합니다.

<!--embedded amp-anim responsive example -->
<div>
<amp-iframe height="253"
layout="fixed-height"
sandbox="allow-scripts allow-forms allow-same-origin"
resizable
src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.responsive.embed.html">
<div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
<div placeholder></div>
</amp-iframe>
</div>

AMP 요소의 플레이스홀더는 기본적으로 AMP 요소의 리소스가 다운로드되지 않았거나 초기화되지 않은 경우에도 즉시 표시됩니다. 일반적으로 AMP 요소가 준비되면 플레이스홀더가 숨겨지고 콘텐츠가 표시됩니다.

참고: 플레이스홀더가 AMP 요소일 필요는 없습니다. HTML 요소라면 모두 플레이스홀더 역할을 할 수 있습니다.

## 폴백

`fallback` 속성을 사용하여 브라우저에서 지원하지 않는 요소를 대체할 동작을 지정할 수 있습니다. 예를 들어, `fallback` 속성을 사용하여 브라우저에서 특정 기능이 지원되지 않는 경우 사용자에게 알릴 수 있습니다.

<!--embedded video example  -->
<div>
<amp-iframe height="234"
layout="fixed-height"
sandbox="allow-scripts allow-forms allow-same-origin"
resizable
src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
<div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
<div placeholder></div>
</amp-iframe>
</div>

`fallback` 속성은 AMP 요소뿐 아니라 모든 HTML 요소에 설정할 수 있습니다. 지정된 경우 `fallback` 요소는 반드시 AMP 요소의 직접 하위 요소여야 합니다.

## 플레이스홀더 상호작용 및 폴백

`amp-twitter`, `amp-list` 등 동적 콘텐츠에 의존하는 AMP 구성요소의 경우, 대체 요소 및 플레이스홀더의 상호작용이 작동하는 방식은 다음과 같습니다:

<ol>
  <li>콘텐츠가 로드되는 동안 플레이스홀더를 표시합니다.</li>
  <li>콘텐츠가 성공적으로 로드되면 플레이스홀더를 숨기고 콘텐츠를 표시합니다.</li>
  <li>콘텐츠가 로드되지 않은 경우 다음과 같이 표시됩니다.
    <ol>
      <li>대체 요소가 있는 경우 표시합니다.</li>
      <li>그렇지 않은 경우 계속해서 플레이스홀더를 표시합니다.</li>
    </ol>
  </li>
</ol>

## 로딩 표시기 숨기기

많은 AMP 요소는 '로딩 표시기' 를 표시하도록 허용되어 있습니다. '로딩 표시기' 는 요소가 아직 완전히 로드되지 않았음을 알리는 기본 애니메이션입니다. `noloading` 속성을 추가하여 요소에 이 동작을 사용하지 않도록 선택할 수 있습니다.

