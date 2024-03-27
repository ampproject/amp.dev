---
$title: AMP 런타임 사전 로드
$order: 30
tags:
- lcp
- fid
---

필수 애셋을 사전 로드하면 해당 애셋이 먼저 제공되어 성능이 향상됩니다. AMP 페이지에는 프레임워크의 JavaScript가 필요하므로 사전 로드하세요! [AMP 옵티마이저](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/)를 통해 다음 코드를 페이지에 자동으로 추가하거나 직접 추가할 수 있습니다.

```
<link as=script href=https://ampjs.org/v0.js rel=preload>
```
