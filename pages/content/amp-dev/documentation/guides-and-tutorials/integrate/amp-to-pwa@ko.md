---
'$title': Preload your PWA from your AMP pages
$order: 1
description: AMP 페이지를 사이트의 진입점으로 만든 다음, 보이지 않는 곳에서 PWA를 준비한 후 전환하는 것이 좋습니다...
formats:
  - websites
author: pbakaus
---

**AMP 페이지를 사이트의 진입점으로 만든 다음**, 향후 사용자 여정을 위해 **보이지 않는 곳에서 PWA를 준비**한 후 전환하는 것이 좋습니다.

- 모든 콘텐츠 "리프" 페이지(개요 페이지가 아닌 특정 콘텐츠가 포함된 페이지)는 AMP로 게시되어 거의 즉각적으로 로드됩니다.
- 이러한 AMP에서는 사용자가 콘텐츠를 즐기는 동안 AMP의 특별 요소인 [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)를 사용하여 캐시 및 PWA 셸을 준비합니다.
- 사용자가 웹사이트에서 다른 링크(예: 앱과 더욱 비슷한 환경을 제공하기 위한 하단의 행동 유도 버튼)를 클릭하면 서비스 워커가 그 요청을 가로채어 페이지를 넘겨받고 PWA 셸을 대신 로드합니다.

계속 읽어나가며 이 개발 패턴을 사용하는 이유와 방법을 알아보세요.

## PWA 연결로 사용자 여정 개선하기

### 초기 사용자 획득을 위한 AMP

AMP는 사용자가 검색 엔진, 친구에게 받은 공유 링크 또는 다른 사이트의 링크를 통해 자연스럽게 발견하는 콘텐츠 페이지인 **리프 페이지**에 이상적인 솔루션입니다. AMP 페이지는 AMP의 [전문 사전 렌더링](../../../about/how-amp-works.html)을 사용하여 아주 빠르게 로드되므로 이탈률이 훨씬 낮습니다. 최신 [Doubleclick 연구](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/)에 따르면 **전체 사용자 중 53% 이상이 3초 안에 페이지가 로드되지 않으면 이탈**한다고 합니다.

### 활발한 상호작용 및 참여를 위한 PWA

반면 프로그레시브 웹 앱을 사용하면 더 활발한 상호작용과 참여를 유도할 수 있습니다. 하지만 AMP 페이지처럼 *첫 로드가 즉각적으로 이루어지는 특징*은 없습니다. 그 중심에는 서비스 워커라는 기술이 있습니다. 서비스 워커는 페이지의 모든 애셋을 캐시할 수 있도록 지원하는 클라이언트 측 프록시입니다. 하지만 서비스 워커는 첫 로드 *이후*에만 활성화됩니다.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='AMP와 PWA의 장단점 비교') }}

## `amp-install-serviceworker`로 PWA 준비하기

AMP를 사용하면 AMP 캐시에서 AMP 페이지가 게시되는 경우에도 AMP 페이지 내에서 프로그레시브 웹 앱의 서비스 워커를 설치할 수 있습니다. 설치가 올바르게 이루어졌다면 AMP 페이지 중 하나에서 PWA로 연결되는 링크는 AMP 페이지로 처음 이동하는 것과 비슷하게 거의 즉시 로드되는 것처럼 느껴집니다.

도움말: 아직 서비스 워커에 익숙하지 않다면 Jake Archibald의 [Udacity 교육 과정](https://www.udacity.com/course/offline-web-applications--ud899)을 추천해 드립니다.

먼저 스크립트를 통해 페이지의 `<head>`에 컴포넌트를 추가하여 [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)를 사용하는 방식으로 모든 AMP 페이지에 서비스 워커를 설치합니다.

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

그런 다음 `<body>` 안에 다음을 추가합니다. 실제 서비스 워커로 연결되도록 수정하세요.

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

마지막으로 서비스 워커 설치 단계에서 PWA에 필요한 리소스를 캐시합니다.

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
'/',
'/styles/main.css',
'/script/main.js'
];

self.addEventListener('install', function(event) {
// Perform install steps
event.waitUntil(
caches.open(CACHE_NAME)
.then(function(cache) {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
});
[/sourcecode]

[tip type="tip"] <strong>도움말 –</strong> 서비스 워커를 다루는 더 쉬운 방법도 있습니다. [서비스 워커 도우미 라이브러리](https://github.com/GoogleChrome/sw-helpers)를 참조하세요. [/tip]

## AMP 페이지의 모든 링크를 PWA로 연결하기

AMP 페이지에 있는 링크는 대부분 더 많은 콘텐츠를 담은 페이지로 연결될 가능성이 높습니다. 첫 로드 이후 링크 클릭 시 프로그레시브 웹 앱으로 "업그레이드"되어 확실하게 이어지도록 하는 데 [AMP 사용 방식에 따라](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) 두 가지 전략을 활용할 수 있습니다.

### 1. 표준 페이지를 AMP 페이지와 연결하는 경우

표준 웹사이트(AMP가 아닌 페이지)가 있고, 이러한 표준 페이지로 연결되는 AMP 페이지를 생성하는 경우입니다. 이는 현재 가장 일반적인 AMP 사용 방식이며, AMP 페이지의 링크가 사이트의 표준 버전으로 연결될 가능성이 높습니다. **다행히 표준 사이트가 PWA인 경우, 별도로 해야 할 작업은 없습니다**.

### 2. 표준 사이트가 AMP인 경우

표준 페이지가 *AMP 페이지*인 경우입니다. 전체 웹사이트를 AMP로 만들고, AMP를 라이브러리로 사용합니다. 재미있는 사실은 여러분이 보고 계시는 이 사이트도 이런 방식으로 만들어졌다는 것입니다. **이 시나리오에서는 AMP 페이지에 있는 링크 대부분이 다른 AMP 페이지로 연결됩니다.**

이제 `your-domain.com/pwa`와 같은 별도의 경로에 PWA를 배포할 수 있고, 이미 실행 중인 서비스 워커를 사용하여 **사용자가 AMP 페이지의 링크를 클릭할 때 브라우저 탐색을 가로챌 수** 있습니다.

[sourcecode:javascript]
self.addEventListener('fetch', event => {
if (event.request.mode === 'navigate') {
event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

이 기술에서 특히 흥미로운 점은 이제 점진적 개선을 사용하여 AMP에서 PWA로 이동한다는 것입니다. 하지만 아직 서비스 워커가 지원되지 않는 브라우저를 사용하는 경우 AMP에서 AMP로 이동하고 PWA로 이동하지 않는다는 의미이기도 합니다.

AMP는 이 문제를 [셸 URL 재작성](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite)이라는 방법으로 해결합니다. 서비스 워커가 지원되지 않는 경우 <a><code>amp-install-serviceworker</code></a> 태그에 폴백 URL 패턴을 추가하면 AMP가 페이지에서 일치하는 링크를 모두 재작성하여 다른 기존의 셸 URL로 연결하도록 지시할 수 있습니다.

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

이러한 속성이 있다면 AMP에서 첫 로드 이후 클릭되는 모든 링크는 서비스 워커에 관계없이 PWA로 연결됩니다.

[tip type="read-on"] <strong>자세히 알아보기 –</strong> 여기까지 따라오셨다면 기존 AMP 페이지를 재사용하여 PWA를 구축해보면 어떨까요? 방법은 [이 문서](amp-in-pwa.md)를 참조하세요. [/tip]
