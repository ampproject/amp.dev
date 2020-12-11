---
$title: AMP 런타임의 JavaScript 모듈 버전 사용
$order: 25
tags:
- lcp
- fid
---

사용자와 사용자의 대역폭을 존중하는 것은 중요합니다. [JavaScript 모듈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)을 활용하면 최신 웹 브라우저의 페이지 성능에 긍정적 차이를 크게 유발할 수 있습니다. [`experimentEsm`](https://www.npmjs.com/package/@ampproject/toolbox-optimizer#experimentesm) 플래그와 최신 [AMP 옵티마이저](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) 버전을 함께 사용하여 AMP 런타임 및 AMP 컴포넌트의 JavaScript 모듈 버전을 사용하도록 선택할 수 있습니다. 구현을 최신 상태로 유지하여 JavaScript 프로그램을 개별 모듈로 분할하고 필요한 모듈만 가져오세요! 단 이 기능은 실험적 기능이며(출시 예정) AMP 페이지에 사용할 경우 해당 페이지의 유효성이 손상될 수 있습니다.
