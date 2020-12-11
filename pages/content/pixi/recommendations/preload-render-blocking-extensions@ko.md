---
$title: 렌더링 차단 컴포넌트 사전 로드
$order: 40
tags:
- lcp
- fid
---

최초 렌더링을 차단하는 컴포넌트를 사전 로드하면 사용자가 최대한 빠르게 콘텐츠를 확인하고 해당 콘텐츠와 상호작용할 수 있습니다. 주의해야 할 렌더링 차단 컴포넌트에는 [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) 및 [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/) 등이 있습니다. import 스크립트에 `rel="preload"` 속성을 삽입하여 사전 로드하세요.

```
<link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
```

[AMP 옵티마이저](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/)는 자동 사전 로드를 지원합니다!
