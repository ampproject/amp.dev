---
$title: 자리표시자 및 대체 콘텐츠
---
[TOC]

성능 인지와 점진적 개선이라는 관점에서 AMP에 가능한 한 자리표시자와 대체 콘텐츠를 제공하는 것이 좋습니다.

일부 요소는 제한을 완화하여 효과를 얻을 수 있습니다. 예를 들어 [`<amp-iframe>`](/ko/docs/reference/components/amp-iframe.html#iframe-with-placeholder)을 제공하는 경우 페이지 상단 근처에서 사용할 수 있습니다(없으면 작동하지 않음).

## 자리표시자

`placeholder` 속성으로 표시된 요소는
상위 AMP 요소의 자리표시자 역할을 합니다.
지정된 경우 `placeholder` 요소는 AMP 요소의 직접 하위 요소여야 합니다.
`placeholder`로 표시된 요소는 항상 상위 AMP 요소를 `fill`합니다.

<!--embedded amp-anim responsive example -->
<div>
<amp-iframe height="253"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.responsive.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">전체 코드 표시</div>
  <div placeholder></div> 
</amp-iframe>
</div>

기본적으로 AMP 요소의 리소스가 다운로드되거나 초기화되지 않아도
자리표시자는 AMP 요소에 즉시 표시됩니다.
준비가 완료되면 AMP 요소는 일반적으로 자리표시자를 숨기고 콘텐츠를 표시합니다.

[tip type="note"]

자리표시자가 꼭 AMP 요소일 필요는 없습니다.
모든 HTML 요소는 자리표시자 역할을 할 수 있습니다.

[/tip]

## 대체 콘텐츠

다음과 같은 경우 요소에 `fallback` 속성을 지정하여 대체 동작을 나타낼 수 있습니다.

* 요소를 브라우저에서 지원하지 않는 경우
* 콘텐츠를 로드하지 못한 경우(예: 트윗이 삭제됨)
* 이미지 유형이 지원되지 않는 경우(예: WebP는 모든 브라우저에서 지원되지 않음)

`fallback` 속성은 AMP 요소뿐 아니라 *모든* HTML 요소에도 설정할 수 있습니다. 지정된 경우 `fallback` 요소는 AMP 요소의 직접 하위 요소여야 합니다.

##### 예: 지원되지 않는 기능

다음 예에서 `fallback` 속성을 사용하여 사용자에게 브라우저가 특정 기능을 지원하지 않음을 알립니다.

<!--embedded video example  -->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">전체 코드 표시</div>
  <div placeholder></div> 
</amp-iframe>
</div>

##### 예: 다른 이미지 형식 게재

다음 예에서 `fallback` 속성을 사용하여 WebP 형식이 지원되지 않으면 JPEG 파일을 사용하라고 브라우저에 알립니다. 

<div>
<amp-iframe height=309 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.webp.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">전체 코드 표시</div><div placeholder></div></amp-iframe></div>

## 자리표시자 및 대체 콘텐츠 상호작용

동적 콘텐츠에 의존하는 AMP 요소(예: `amp-twitter`, `amp-list`)에서 대체 콘텐츠 및 자리표시자는 다음과 같이 상호작용합니다.

<ol>
  <li>콘텐츠가 로드되는 동안 자리표시자를 표시합니다.</li>
  <li>콘텐츠가 로드되면 자리표시자를 숨기고 콘텐츠를 표시합니다.</li>
  <li>콘텐츠를 로드하지 못한 경우
    <ol>
      <li>대체 요소가 있다면 대체 콘텐츠를 표시합니다.</li>
      <li>없다면 계속 자리표시자를 표시합니다.</li>
    </ol>
  </li>
</ol>

## 로드 중 표시기 숨기기

많은 AMP 요소는 목록에 추가되어 요소가 완전히 로드되지 않았음을 나타내는
기본 애니메이션인 '로드 중 표시기'를 표시합니다.
요소는 `noloading` 속성을 추가하여 이 동작을 차단할 수 있습니다.
 
