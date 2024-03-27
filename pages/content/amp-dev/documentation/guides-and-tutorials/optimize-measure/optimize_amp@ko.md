---
'$title': 호스팅된 AMP 페이지 최적화
$order: 7
description: AMP 런타임은 속도 향상을 위해 최적화됩니다. 또한 AMP 캐시가 AMP 페이지를 지원할 경우 해당 페이지는 전적으로 최적화되어 최상의 로딩 성능을 제공합니다...
formats:
  - websites
  - stories
author: sebastianbenz
---

이 가이드는 웹마스터를 위해 호스팅된 AMP 웹사이트를 최적화하는 팁과 설명을 제공합니다.

### AMP는 기본적으로 빠르지 않나요?

AMP 런타임은 [속도 향상을 위해 최적화](../../../about/how-amp-works.html)됩니다. 또한 [AMP 캐시](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md)가 AMP 페이지를 지원할 경우 해당 페이지는 전적으로 최적화되어 최상의 로딩 성능을 제공합니다. 예를 들어 사용자가 모바일의 Google 검색을 통해 AMP 페이지로 유입될 경우 기본적으로 AMP 캐시가 페이지를 지원합니다.

하지만 항상 AMP 캐시가 AMP 페이지를 지원하는 것은 아닙니다. 다른 트래픽 소스의 경우 웹사이트는 자체 서버에서 AMP 페이지를 표시하도록 결정할 수 있습니다. 가장 흔한 사용 사례는 사용자가 바로 사이트로 이동하는 [tasty.co](https://tasty.co)처럼 전적으로 AMP로 작성된 사이트입니다. 또 다른 트래픽 소스는 Twitter입니다. Twitter는 표준 모바일 버전을 제공하는 대신 [AMP 페이지 연결을 시작](https://searchengineland.com/twitter-ramps-amp-278300)했습니다. 즉, 사용자가 Twitter 모바일 앱의 링크를 클릭하면 해당 링크가 고유 원본 페이지의 AMP 버전으로 연결됩니다(제공될 경우).

결과적으로 AMP 페이지가 항상 AMP 캐시를 통해서만 지원된다고 확신할 수 없습니다. 자체 서버에서 AMP 페이지를 지원할 경우 AMP 페이지에서 최적의 로딩 성능을 제공하는 것이 중요합니다.

AMP 페이지는 기본적으로 빠르게 로드되지만 성능 최적화 기술을 추가로 구현하여 브라우저에서 AMP 페이지를 더욱 빠르게 로드할 수 있습니다. 이 가이드에서는 AMP 페이지를 게시할 때 고려해야 할 몇 가지 추가 최적화 기능을 설명합니다. 하지만 가이드를 읽기 전 [기본 웹 성능 모범 사례](#basic-optimizations)를 이해했는지 확인하세요. 특히 이미지 최적화는 로딩 성능에 큰 영향을 미칩니다.

예를 들어 다음과 같은 최적화 기술을 적용할 수 있습니다.

- [최적화된 AMP 런타임 로딩](#optimize-the-amp-runtime-loading)
- [사전 로드된 히어로 이미지](#preload-hero-images)(이미지 크기/자체 인코딩은 변경되지 않음)
- [사용자 지정 글꼴 최적화](#optimize-custom-fonts)(이 사례의 경우 Google 폰트)

["The Scenic" 템플릿](../../../documentation/templates/index.html)은 [3G 연결 시 2초 빠르게](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0) 로드됩니다.

세부 사항을 생략하려면 최적화된 사용자 지정 AMP 페이지를 생성하는 데 사용할 수 있는 [AMP 상용구 생성기](/boilerplate)를 확인하세요.

### AMP 런타임 로딩 최적화 <a name="optimize-the-amp-runtime-loading"></a>

AMP는 이미 `<head>` 섹션에서 허용되는 마크업에 상당한 제한을 두고 있지만 그럼에도 최적화 옵션은 존재합니다. 핵심은 `<head>` 섹션에서 렌더링 차단 스크립트 및 사용자 지정 글꼴이 최대한 빠르게 로드되도록 구성하는 것입니다.

AMP 페이지의 `<head>` 섹션에 권장되는 정렬은 다음과 같습니다.

[sourcecode:html]

<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="This is the AMP Boilerplate.">
    <link rel="preload" as="script" href="https://ampjs.org/v0.js">
    <link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
    <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
    <script async src="https://ampjs.org/v0.js"></script>
    <script async custom-element="amp-experiment" src="https://ampjs.org/v0/amp-experiment-0.1.js"></script>
    <!-- Import other AMP Extensions here -->
    <style amp-custom>
      /* Add your styles here */
    </style>
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <link rel="canonical" href=".">
    <title>My AMP Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
[/sourcecode]

한 단계씩 살펴보도록 하겠습니다.

1. 첫 번째 태그는 `meta charset` 태그여야 하며 그다음에는 남은 `meta` 태그를 배치해야 합니다.

2. 다음으로 `<link as=script href=https://ampjs.org/v0.js rel=preload>`를 활용해 AMP 런타임 `v0.js` `<script>` 태그를 미리 로드합니다. AMP 런타임이 로드될 때까지 [AMP 상용구는](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) `body { visibility:hidden }`를 통해 문서를 숨김 처리하므로 AMP 런타임은 최대한 빨리 다운로드를 시작해야 합니다. AMP 런타임을 미리 로드할 경우 브라우저에서 우선순위가 더 높은 스크립트를 다운로드하도록 지시할 수 있습니다. 이를 방지하는 방법을 알아보려면 [server-side-rendering](#server-side-rendering)을 참조하세요. {amp-img6} {/amp-img6}

3. 페이지에 렌더링 지연 확장자가 포함된 경우 (예: amp-experiment, amp-dynamic-css-classes, amp-story) 페이지 렌더링 시 AMP 런타임이 해당 확장자를 필요로 하므로 확장자를 미리 로드합니다.

[sourcecode:html]

<link as="script" rel="preload" href="https://ampjs.org/v0/amp-custom-css-0.1.js">
<link as="script" rel="preload" href="https://ampjs.org/v0/amp-experiment-0.1.js">
<link as="script" rel="preload" href="https://ampjs.org/v0/story-1.0.js">[/sourcecode]

1. [사전 연결](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/)을 사용하여 전체 출처 URL을 미리 알 수 없는 다른 출처에 대한 연결 속도를 개선합니다(예: Google Fonts 사용 시).

[sourcecode:html]<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>[/sourcecode]

1. AMP 런타임을로드합니다:

[sourcecode:html]<script async src="https://ampjs.org/v0.js"></script>[/sourcecode]

1. [렌더링 지연 확장자](https://github.com/ampproject/amphtml/blob/main/src/render-delaying-services.js)에 대한 `<script>` 태그를 지정합니다(예: [`amp-experiment`](../../../documentation/components/reference/amp-experiment.md) [`amp-dynamic-css-classes`](../../../documentation/components/reference/amp-dynamic-css-classes.md) 및 [`amp-story`](../../../documentation/components/reference/amp-story.md)
2. 남은 확장자에 대한 `<script>` 태그를 지정합니다(예: [`amp-bind`](../../../documentation/components/reference/amp-bind.md) ...). 이러한 확장자는 렌더링 지연 확장자가 아닙니다. 그렇기에 초기 렌더링 시 중요한 대역폭을 차지할 수 있으므로 사전 로드되어선 안 됩니다.
3. `<style amp-custom>` 태그를 사용하여 사용자 지정 스타일을 지정합니다.
4. `<head>` 섹션에서 허용된 기타 태그를 추가합니다. 특히 외부 글꼴은 렌더링을 차단하므로 마지막에 추가되어야 합니다.
5. 마지막으로 [AMP 상용구 코드](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md)를 지정합니다. 상용구 코드를 지정하면 사용자 지정 스타일이 예기치 않게 상용구 CSS 규칙을 재정의하지 않도록 방지할 수 있습니다.

[tip] AMP 캐시는 모든 최적화(및 기타)를 자동으로 수행합니다. AMP Optimizer 도구를 활용하여 고유 원본에서 최적화를 자동으로 수행할 수 있습니다. [/tip]

### 히어로 이미지 사전 로드 <a name="preload-hero-images"></a>

[AMP HTML는 자체 이미지 요소인 `amp-img`를 사용합니다](../../../documentation/components/reference/amp-img.md). [`amp-img`](../../../documentation/components/reference/amp-img.md)에는 기존 HTML `img` 태그보다 많은 장점이 있지만 한 가지 단점은 이미지 다운로드 시작 전에 AMP 런타임이 로드되어야 한다는 것입니다. 제품 페이지의 히어로 이미지와 같은 일부 이미지는 최대한 빠르게 로딩되는 것이 중요합니다. 이러한 경우 브라우저에서 이미지 다운로드를 최대한 빨리 시작하고 AMP 런타임이 로드되길 기다릴 필요가 없도록 이미지를 사전 로드하는 것이 최선입니다.

[sourcecode:html]

<head>
  <link rel="preload" href="/images/elephants.png" as="image">
</head>
<body>
  ...
  <amp-img width="404" height="720" layout="responsive"
           src="/images/elephants.png" alt="..." >
  </amp-img>
</body>
[/sourcecode]

하지만 화면 너비에 따라 반응형 레이아웃에 다른 히어로 이미지가 필요한 경우에는 어떻게 해야 할까요? 예를 들어 다음과 같이 데스크톱에는 넓은 이미지가 모바일에는 좁은 이미지가 요구됩니다.

[sourcecode:html]
<amp-img width="404" height="720"
    alt="..." layout="responsive"
    src="/images/elephants_narrow.png"
    media="(max-width: 415px)">
</amp-img>
<amp-img height="720"
    alt="..." layout="fixed-height"
    src="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
</amp-img>
[/sourcecode]

다행히 `link rel=preload`는 미디어 쿼리도 지원하므로 사전 로드 구문에서 다음과 같이 동일한 미디어 쿼리를 사용할 수 있습니다.

[sourcecode:html]

<link rel="preload" as="image"
    href="/images/elephants_narrow.png"
    media="(max-width: 415px)">
<link rel="preload" as="image"
    href="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
[/sourcecode]

동일한 접근 방식은 [`amp-video`](../../../documentation/components/reference/amp-video.md) 포스터 이미지에도 적합합니다:

[sourcecode:html]

<link rel="preload" href="/images/poster.jpg" as="image">
...
 <amp-video width="480" height="270" src="elephant.mp4"
             poster="/images/poster.jpg"
             layout="responsive">
     ...
</amp-video>
[/sourcecode]

브라우저에서 화면 너비를 확인하는 데 뷰포트 치수가 필요하므로 뷰포트 선언 _다음에_ 사전 로드 구문을 배치해야 합니다.

[sourcecode:html]

<meta name="viewport" content="width=device-width">
...
<link rel="preload" media="(max-width: 415px)" ...>
[/sourcecode]

[tip type="important"] 중요한 이미지만 사전 로드하세요. 그렇지 않으면 이미지 다운로드 시 기타 중요 다운로드에 필요한 대역폭이 소모될 수 있습니다. [/tip]

### 서비스 워커 사용 고려하기

이제 모든 [주요 브라우저에서 서비스 워커를 지원](https://caniuse.com/#feat=serviceworkers)하므로 사이트에 서비스 워커를 추가하는 것의 적합성을 평가하는 편이 좋습니다.

안정적이며 빠른 탐색에 적합한 두 가지 종류의 아키텍처 패턴이 있습니다.

- 단일 페이지 애플리케이션: App Shell 모델(AMP 컨텍스트에서는 [AMP-in-PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)로 지칭). 이 패턴을 사용하려면 서비스 워커를 통해 AMP 문서를 앱 쉘 기반 PWA 환경으로 업그레이드해야 합니다.
- 멀티 페이지 애플리케이션: [복합 리소스 스트리밍](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses). 서비스 워커는 정적 헤더 및 푸터를 캐싱하고 콘텐츠 로딩 중 스트리밍을 사용해 캐시된 부분 응답을 즉시 반환합니다.

이 패턴 중 어느 것도 사용되지 않을 경우 전체 사이트를 캐싱할 수 없어(아주 규모가 작은 사이트에만 적합) 서비스 워커가 [부정적 성능 영향](https://developers.google.com/web/updates/2017/02/navigation-preload)을 미칠 수 있습니다. 이런 경우엔 서비스 워커를 사용하지 **않는** 것이 최선입니다.

하지만 [홈 화면에서 설치 가능한](https://developers.google.com/web/fundamentals/app-install-banners/) 웹사이트를 구현하거나 오프라인 경험을 제공하고 싶다면 서비스 워커를 사용해야 합니다. 이런 경우 [내비게이션 사전 로드](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw)를 통해 잠재적 속도 저하를 줄이는 것이 중요합니다(참고: 현재 내비게이션 사전 로드는 Chrome에서만 지원됩니다).

AMP 웹사이트에서 서비스 워커가 사용될 경우 모범 사례는 다음과 같습니다.

- [AMP 런타임](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime) 및 확장자 사전 캐싱(예: [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)).
- 페이지 대부분에서 사용되는 로고, 글꼴 및 기타 정적 콘텐츠 사전 캐싱.
- [캐시 우선 전략](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)을 사용한 로고, 글꼴 및 이미지 지원.
- [stale-while-revalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) 전략을 사용한 AMP 런타임 및 확장자 지원.
- 내비게이션 요청에 네트워크 우선 전략 사용 시 [내비게이션 사전 로드](https://developers.google.com/web/updates/2017/02/navigation-preload) 확인.

AMP 사이트에서 서비스 워커 사용을 시작할 방법을 모색 중이라면 다음 [샘플](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg)을 통해 모든 모범 사례를 구현한 서비스 워커를 확인해보세요.

[tip type="note"] 업데이트를 빠르게 지원하기 위해 AMP 런타임은 불과 50분의 만료 시간으로 지원됩니다. 발생 가능한 브라우저 캐시 누락을 방지하려면 서비스 워커에서 AMP 런타임을 지원하는 것도 좋은 방법입니다.[/tip]

사전 캐싱은 캐시된 AMP 페이지에서 고유 원본의 비 AMP 페이지로의 전환만이 아닌 캐시된 AMP 페이지에서 고유 원본의 AMP 페이지로 전환과도 관련이 있습니다. 그 이유는 AMP 캐시가 AMP 런타임 URL을 불변 URL에서 최신 릴리스 버전으로 재작성하기 때문입니다. 예시는 다음과 같습니다.

`https://ampjs.org/v0.js` -> `https://ampjs.org/rtv/001515617716922/v0.js`.

결과적으로 고유 원본에서 지원되는 AMP 페이지에서 브라우저 캐싱이 유용하지 않으며 이런 경우 (버전이 없는) AMP 런타임을 다시 다운로드해야 합니다. 서비스 워커를 사용하면 버전이 없는 AMP 런타임을 사전 캐싱하여 전환 속도를 높일 수 있습니다. AMP 캐시가 AMP 런타임 URL을 버전화하는 이유를 자세히 알아보려면 [이 문서](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime)를 읽어보세요.

[tip type="note"] Safari에서는 서비스 워커 구현 방식에 큰 차이가 있습니다. Safari에서는 페이지가 AMP 캐시로 지원되는 경우 원본에 서비스 워커를 설치할 수 없습니다.[/tip]

### 사용자 지정 글꼴 최적화 <a name="optimize-custom-fonts"></a>

AMP를 사용하면 글꼴 로딩을 최적화하는 데 수행할 수 있는 몇 가지 작업이 있습니다([사실 그 중 대다수는 AMP에만 한정되지 않습니다](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)):

- 가능하다면 [font-display: optional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)을 사용하세요. 이미 캐시에 포함된 글꼴만을 사용하고 사용자 지정 글꼴이 로드되지 않을 경우 시스템 글꼴로 폴백합니다.
- 웹 글꼴을 최적화합니다(예: WOFF2를 사용해 사용자 지정 글꼴 지원).
- 사용자 정의 글꼴 미리로드:

[sourcecode:html]

<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2" >[/sourcecode]

- Google Fonts를 사용하거나 알 수 없는 글꼴 URL을 지원하는 기타 글꼴 제공업체를 사용할 경우 각 폰트 서버를 사전 연결합니다:

[sourcecode:html]

 <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
[/sourcecode]

마지막으로 페이지에서 사용되는 사용자 지정 글꼴 개수를 최소로 유지하세요. 가능하다면 사용자 지정 글꼴 대신 시스템 글꼴을 사용하는 것이 좋습니다. 시스템 글꼴을 활용하면 웹사이트가 사용자의 운영 시스템에 일치하고 추가 리소스 로딩이 방지됩니다.

### 서버 사이드 렌더링 AMP 레이아웃<a name="server-side-rendering"></a>

서버 사이드 렌더링 AMP 레이아웃은 AMP 캐시가 로딩 시간을 개선하기 위해 사용하는 기술입니다. 서버 사이드 렌더링을 활용하면 AMP 상용구를 제거하여 AMP 런타임 JavaScript를 실행하지 않고도 AMP 문서를 표시할 수 있습니다. 예를 들어, AMP 상용구 생성기의 서버 사이드 렌더링 버전은 일반 AMP 버전보다 [렌더링 속도가 두 배 빠릅니다](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual)!

AMP 페이지를 게시할 경우 [AMP Optimizer](amp-optimizer-guide/index.md) 사용을 고려하는 편이 좋습니다. AMP Optimizer를 사용하면 서버 사이드 렌더링 AMP 레이아웃이 포함된 자체 백엔드에서 최적화된 AMP 페이지를 지원할 수 있습니다. 또한 AMP Optimizer는 이 문서에 설명된 다양한 기타 최적화를 자동으로 수행합니다.

### 기본 최적화 <a name="basic-optimizations"></a>

물론 모든 기본적 웹 성능 최적화는 AMP 페이지에도 적용됩니다.

- [이미지 및 동영상 최적화](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization). 이미지 최적화는 로딩 성능에 큰 영향을 미칩니다.
- [CSS & HTML 압축 및 축소](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer). AMP 페이지의 모든 CSS는 인라인되어 있으므로 [purifycss](https://github.com/purifycss/purifycss) 등을 활용해 사용하지 않는 CSS를 제거하는 것도 좋은 방법입니다.
- [HTTP 캐싱](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching) 사용.
- 그 외 다수
