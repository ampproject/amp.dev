---
layout: page
title: AMP가 성능을 향상시키는 방식
order: 2
locale: ko
---

AMP 페이지가 빠르고 즉시 로드되는 이유는 다음과 같은 최적화 조합 때문입니다.

{% include toc.html %}

읽는 것보다 듣는 것을 선호하는 경우, AMP 엔지니어링 책임자인 Malte Ubl의 다음 동영상을 통해 다음 단락과 유사한 내용을 청취할 수 있습니다.

<amp-youtube
    data-videoid="hVRkG1CQScA"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

## 비동기 스크립트만 허용

JavaScript의 성능은 강력하며,
페이지의 거의 모든 측면을 수정할
수 있습니다. 그러나 DOM 생성을 차단할 수가 있고 페이지 렌더링을 지연시킬 수도
있습니다(참고 항목 [JavaScript로 상호작용 추가](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)).
JavaScript에서 페이지 렌더링이 지연되는 것을 막기 위해
AMP는 비동기 JavaScript만을 허용합니다. 

AMP 페이지에는 작성자가 작성한 JavaScript는 포함될 수 없습니다.
JavaScript를 사용하는 대신, 사용자 지정 AMP 요소에서
상호작용 페이지 기능이 처리됩니다.
사용자 지정 AMP 요소에는 이면에 JavaScript가 있을 수도 있지만,
이들 요소가 성능 악화를 유발하지 않도록 세심하게 설계되었습니다.

타사 JS가 iframe에서 허용되기는 하지만,
렌더링을 차단할 수는 없습니다.
예를 들어, 타사 JS가
[super-bad-for-performance `document.write` API](http://www.stevesouders.com/blog/2012/04/10/dont-docwrite-scripts/)를 사용하는 경우,
기본 페이지의 렌더링을 차단하지 않습니다.

## 모든 리소스의 크기를 정적으로 지정

이미지, 광고, iframe과 같은 외부 리소스는 그 크기를 HTML에
지정해야 합니다. 그러면 리소스가 다운로드되기 전에 AMP가 각 요소의 크기와 위치를 결정할 수 있습니다.
AMP는 리소스의 다운로드를 기다리지 않고 페이지의 레이아웃을 로드합니다.

AMP는 리소스 레이아웃에서 문서 레이아웃을 분리합니다.
전체 문서를 레이아웃하기 위해 단 하나의 HTTP 요청만
필요합니다([+fonts](#font-triggering-must-be-efficient)).
AMP는 브라우저에서 값비싼 스타일 재계산과 레이아웃을
피하도록 최적화되었기 때문에, 리소스가 로드될 때 레이아웃이 다시 수행되지 않습니다.

## 확장 메커니즘이 렌더링을 차단하지 않도록 함

AMP는 확장 메커니즘이 페이지 렌더링을 차단하지 않도록 합니다.
AMP는
[라이트박스](/docs/reference/extended/amp-lightbox.html),
[인스타그램 삽입](/docs/reference/extended/amp-instagram.html),
[트윗](/docs/reference/extended/amp-twitter.html) 등에 대해 확장을 지원합니다.
이들은 추가적인 HTTP 요청을 필요로 하지만, 이들 요청은
페이지 레이아웃과 렌더링을 차단하지 않습니다. 

사용자 지정 스크립트를 사용하는 모든 페이지는 이 페이지에
사용자 지정 태그가 포함될 것임을 AMP 시스템에게 알려야 합니다.
예를 들어, [`amp-iframe`](/docs/reference/extended/amp-iframe.html)
스크립트는 `amp-iframe` 태그가 있을 것임을 시스템에게 알립니다.
AMP는 안에 무엇이 포함될지 알기도 전에 iframe 박스를 만듭니다. 

{% highlight html %}
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight %}

## 모든 타사 JavaScript를 주요 경로에서 제거

타사 JS는 비동기 JS 로드를 사용하는 것을 선호합니다.
또한 더 많은 동기 스크립트를 `document.write`하는 것을 선호합니다.
예를 들어, 5개의 광고가 있고 각 광고가 1초의 지연 시간 연결에
3번의 동기 로드를 수행한다면, JS 로드 시에 18초의 로드 시간이
걸립니다. 

AMP 페이지는 샌드박싱된 iframe에서만 타사 JavaScript를 허용합니다.
페이지를 iframe으로 제한함으로써, 기본 페이지의 실행을 차단할 수 없습니다.
페이지가 여러 번의 스타일 재계산을 트리거하더라도,
작은 iframe에는 DOM이 거의 없습니다. 

스타일 재계산 및 레이아웃은 DOM 크기에 따라 다르므로,
페이지의 스타일 재계산 및 레이아웃에 비해 iframe 재계산이 매우
빠릅니다.

## 모든 CSS는 인라인이어야 하며 크기가 한정되어야 합니다.

CSS는 모든 렌더링을 차단하고, 페이지 로드를 차단하며, 팽창되는 경향이 있습니다.
AMP HTML 페이지에서는 인라인 스타일만 허용됩니다.
이 경우, 대부분의 웹페이지와 비교하여 1개 또는 대개
그 이상의 HTTP 요청을 주요 렌더링 경로에서 제거합니다.

또한 인라인 스타일 시트는 최대 크기가 50KB입니다.
이 크기는 매우 정교한 페이지에도 충분한 크기이지만,
CSS를 양호한 상태로 유지하려면 페이지 작성자가 필요합니다.

## 글꼴 트리거는 효율적이어야 합니다

웹 글꼴은 매우 크므로,
[웹 글꼴 최적화](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)는
성능에 매우 중요합니다.
몇 개의 동기 스크립트와 몇 개의 외부 스타일 시트만 있는
일반적인 페이지에서 브라우저는 이 모든 것이 수행될 때까지 방대한 글꼴의 다운로드가 시작되기를 계속해서 기다립니다.

AMP 시스템은 글꼴의 다운로드가 시작될 때까지 0개의 HTTP 요청을 선언합니다.
이것이 가능한 이유는 AMP에 있는 모든 JS가 비동기 특성을
가지고 있고 인라인 스타일 시트만 허용되기 때문입니다. 브라우저가 글꼴을
다운로드하는 것을 차단하는 HTTP 요청은 없습니다.

## 스타일 재계산 최소화

무엇인가를 측정할 때마다 브라우저가
전체 페이지를 레이아웃해야 하기 때문에 값비싼 스타일 재계산이 트리거됩니다.
AMP 페이지에서는 모든 쓰기 동작보다 모든 DOM 읽기 동작이 먼저 발생합니다.
이렇게 하면 프레임당 최대 한 번의 스타일 재계산이 보장됩니다.

스타일 및 레이아웃 재계산이 미치는 영향을
[렌더링 성능](https://developers.google.com/web/fundamentals/performance/rendering/)에서 자세히 알아보세요.

## GPU 가속 애니메이션만 실행

빠른 최적화를 위한 유일한 방법은 GPU에서 실행하는 것입니다.
GPU는 레이어에 대해 알고 있으며, 이 레이어에서
무엇인가를 수행하는 방법을 알고 있으며, 레이어를 이동하고 사라지게 할
수 있지만, 페이지 레이아웃을 업데이트할 수는 없습니다. 이 작업을 브라우저에 넘겨주지만 이것은 좋지 않습니다.

애니메이션 관련 CSS의 규칙은 애니메이션이 GPU 가속이 되도록 보장합니다.
구체적으로 AMP는 변형 및 불투명에 대해서만 애니메이션과
전환을 허용하므로, 페이지 레이아웃이 필요하지 않습니다.
[애니메이션 변경을 위해 변형 및 불투명
사용](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count) 방법에 대해 알아보세요.

## 리소스 로드의 우선순위 지정

AMP는 모든 리소스 다운로드를 제어하고, 리소스 로드의
우선순위를 지정하며, 필요한 리소스만 로드하고, 늦게 로드되는 리소스를 프리패치합니다. 

AMP는 리소스를 다운로드할 때 이 다운로드를 최적화하므로,
현재 가장 중요한 리소스가 먼저 다운로드됩니다.
이미지와 광고는 사용자가 볼 가능성이 있거나 사용자가
빠르게 스크롤할 가능성이 있는 경우에만 다운로드됩니다.  

AMP는 또한 늦게 로드되는 리소스를 프리패치합니다.
리소스는 최대한 늦게 로드되지만 최대한 일찍 프리패치됩니다.
이런 식으로 로드는 매우 빨리 이루어지지만, 실제로 리소스가
사용자에게 표시될 때만 CPU가 사용됩니다.

## 즉시 페이지 로드

HTTP 요청 시 최대한 빠르게 수행되도록 보장하기 위해, 새 [preconnect API](http://www.w3.org/TR/resource-hints/#dfn-preconnect)가
자주 사용됩니다.
이 API를 사용하면, 탐색하기 원하는 내용을 사용자가 명시적으로
지정하기 전에 페이지를 렌더링할 수 있습니다. 사용자가
실제로 페이지를 선택할 쯤이면 이미 페이지가 사용 가능하고 즉시
로드될 것입니다.

사전 렌더링은 모든 웹 콘텐츠에 적용될 수 있지만,
많은 대역폭과 CPU를 소모할 수도 있습니다. AMP는 이러한 요인들을 모두 줄이도록 최적화되어 있습니다. 사전 렌더링은 중요한 리소스만을 다운로드하며, CPU를 많이
소모할 수 있는 리소스는 렌더링하지 않습니다.

즉시 로드하기 위해 AMP 문서를 사전 렌더링할 경우,
표시되는 리소스만 실제로 다운로드됩니다.
즉시 로드하기 위해 AMP 문서를 사전 렌더링할 경우,
CPU를 많이 사용할 수도 있는 리소스(예: 타사 iframe)는 다운로드되지 않습니다. 


[AMP HTML이 사전 로드 스캐너를 최대한 활용하지 않는 이유](https://medium.com/@cramforce/why-amp-html-does-not-take-full-advantage-of-the-preload-scanner-7e7f788aa94e)에 대해 자세히 알아보세요.

## 도움을 주시면 AMP가 더 빨라집니다
AMP는 오픈 소스 작업입니다.
여러분이 도움을 주시면 AMP가 한층 더 빨라집니다.
[기고 방법](/docs/support/contribute.html)에 대해 알아보세요.
