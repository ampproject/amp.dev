---
"$title": AMP Optimizer 작동 원리
"$order": '1'
description: AMP Optimizer는 유효한 AMPHTML 문서를 입력 값으로 사용하고 "수동으로" 실행하기엔 매우 복잡한 추가 최적화를 적용하여 최적화된 버전으로 변환합니다. 이 가이드는 AMP Optimizer 작동 원리를 자세히 설명합니다.
formats:
- websites
- stories
author: sebastianbenz
---

AMP Optimizer는 유효한 AMPHTML 문서를 입력하고 "수동으로" 실행하기엔 매우 복잡한 추가 최적화를 적용하여 최적화된 버전으로 변환합니다. `transformed` 속성을 통해 `html` 요소의 <strong>변환된 AMP</strong> 결과를 확인할 수 있습니다.

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self;v=1">
```

참조: AMP 캐시는 변환된 다른 플래그를 사용합니다. 예를 들어 Google AMP 캐시는 `transformed=google;v=1`를 추가합니다.

AMP Optimizer는 서버 사이드 렌더링 레이아웃에서 이미지 최적화까지 다양한 AMP 최적화를 수행합니다. 다음 예시는 AMP 페이지 및 최적화 버전 간의 차이를 보여줍니다([클릭하여 큰 버전으로 보기](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

이 가이드의 나머지 부분에서 최적화를 보다 상세히 설명해 드리겠습니다.

### 서버 사이드 렌더링 AMP 레이아웃

서버 사이드 렌더링 AMP 레이아웃은 AMP 페이지의 로딩 퍼포먼스를 개선하는 데 가장 큰 잠재력을 보유합니다. 콘텐츠 이동을 방지하기 위해 AMP는 웹사이트의 헤더에 [AMP 상용구 코드](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites)를 추가하도록 요청합니다. AMP 상용구는 페이지 바디의 불투명도를 0으로 설정하여 페이지 콘텐츠를 숨김 처리합니다. AMP가 로드된 후 페이지 레이아웃을 계산할 수 있습니다. 그 후에는 AMP가 바디의 불투명도를 1로 설정하여 페이지 콘텐츠가 표시되도록 합니다. 안타깝게도 이 접근 방식을 취할 경우 AMP 프레임워크를 다운로드해야 페이지 렌더링을 시작할 수 있습니다.

이를 개선하기 위해 사용자 에이전트에 페이지를 서빙하기 전 `responsive` 또는 `fixed-height` 레이아웃 등의 AMP 레이아웃을 서버 측에서 미리 렌더링할 수 있습니다. 이러한 방식을 통해 페이지 로드 중 [콘텐츠 이동](https://web.dev/cls/)을 방지하며 AMP 상용구를 제거할 수 있습니다.

서버 사이드 렌더링은 3가지 기능을 수행합니다.

⁣**1. AMP 상용구 제거: ** AMP 레이아웃을 사용한 각 요소에 레이아웃 전용 마크업이 삽입됩니다.

⁣**2. Inline AMP-internal CSS styles: ** the AMP-boilerplate code is replaced by the <a href="https://cdn.ampproject.org/v0.css">AMP-runtime CSS styles</a>: &lt;style amp-runtime>...&lt;/style>. For non-server-side rendered documents, AMP adds these styles at runtime. However, server-side-rendered AMP pages require these for the AMP layouts to work before AMP has been loaded. To avoid potential version conflicts, at runtime, AMP will check if the version specified in i-amphtml-version="011905222334000" differs from the current AMP version and will update the CSS with the latest version if not.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

⁣**3. 서버 측에서 렌더링된 AMP 레이아웃: ** AMP 레이아웃을 사용한 각 요소에 레이아웃 전용 크기 변경 마크업이 삽입됩니다.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

경고: AMP 상용구를 항상 제거할 수 있는 것은 아닙니다. `html` 속성에 `i-amphtml-no-boilerplate` 요소가 포함되었는지 확인하여 상용구 제거 여부를 알 수 있습니다. 예를 들어, `amp-experiment` 컴포넌트는 런타임에서 페이지 콘텐츠를 변경합니다. 콘텐츠 이동을 방지하려면 `amp-experiment`가 페이지에 사용된 경우 AMP 상용구 코드도 포함되어야 합니다.

### 히어로 이미지 최적화

AMP Optimizer는 첫 번째 뷰포트의 이미지 렌더링에 소요되는 시간을 현저히 개선할 수 있습니다. 이는 [Core Web Vitals](https://web.dev/vitals) 충족을 위해 [LCP 시간](https://web.dev/lcp/)을 최적화하는 데 매우 중요합니다.

AMP에서는 `amp-img`를 `data-hero`와 함께 주석 처리하여 히어로 이미지를 명시적으로 선언할 수 있습니다.

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

AMP Optimizer는 기타 중요 리소스의 대역폭 차단을 방지하기 위해 페이지에서 최대 2개의 히어로 이미지를 지원합니다. 이러한 제한이 적합하지 않다면 [문의해 주세요](https://github.com/ampproject/amp-toolbox/issues).

또한 AMP Optimizer는 `amp-img`, `amp-iframe`, `amp-video`, 또는 `amp-video-iframe` 요소의 히어로 이미지를 자동으로 탐지하여 이미지 `src`에 `link rel=preload`를 삽입하니다. 자동 탐지는 HTML 마크업 및 이미지 레이아웃을 분석하여 첫 번째 뷰포트의 큰 이미지를 탐지하는 방식으로 실행됩니다.

`amp-img`의 경우 AMP Optimizer를 통해 `amp-img` 내부의 `img` 태그를 서버 측에서 렌더링할 수도 있습니다. 이로써 AMP 런타임 요청 없이도 브라우저에서 바로 이미지를 렌더링할 수 있습니다.

### 이미지 최적화

AMP Optimizer는 AMP 레이아웃 전용 `srcset` 속성을 생성하여 최적화된 반응형 이미지를 서빙하는 데 도움을 줍니다. 예를 들어, 다음 `amp-img` 선언의 경우,

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

다음 `srcset` 정의를 통해 개선됩니다.

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

이 예시가 작동하려면 빌드/호스팅 환경에서 이미지 사이즈 변경/최적화를 지원해야 합니다. 이미지 최적화의 적합한 통합 방식과 관련한 개별 옵티마이저 가이드를 참조하세요.

### AMP 모듈 빌드(곧 지원 예정)

일부 소규모 버전의 AMP 런타임 및 컴포넌트의 경우 [JavaScript 모듈](https://v8.dev/features/modules#browser)을 기반으로 지원되므로 사용자가 AMP 페이지를 볼 때 다운로드해야 할 JavaScript 크기가 더 작습니다. AMP Optimizer는 기본적으로 다음 코드의 변환을 지원하여 AMP 모듈을 활성화합니다.

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

변환된 코드는 다음과 같습니다.

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

`type="module"`을 이해하는 브라우저는 `nomodule` 속성이 있는 스크립트를 무시합니다. 즉, 최신 브라우저를 사용하는 사용자는 더 작은 크기의 런타임 번들로 혜택을 받고, 오래된 브라우저를 사용하는 경우 AMP 런타임의 모듈이 아닌 버전으로 폴백되는 것입니다.

참조: AMP 모듈 빌드를 인라인화하는 데 AMP 런타임 CSS가 필요하므로 해당 빌드는 변환된 AMP에만 지원됩니다.
