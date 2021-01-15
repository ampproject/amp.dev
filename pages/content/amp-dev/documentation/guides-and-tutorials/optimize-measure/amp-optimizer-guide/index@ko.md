---
"$title": AMP Optimizer 사용하기
"$order": '2'
"$hidden": 'true'
description: AMP Optimizer는 AMP 캐시 최적화를 사이트에 통합하는 도구입니다. AMP Optimizer 사용은 우수한 페이지 환경을 제작하고 Core Web Vitals 컴플라이언스를 달성하는 데 중요합니다. 이 가이드는 AMP 페이지 최적화를 위한 AMP Optimizer의 모범 사용 사례를 설명합니다.
formats:
- websites
- stories
author: sebastianbenz
---

AMP Optimizer는 AMP 캐시 최적화를 사이트에 통합하는 도구입니다. AMP Optimizer 사용은 우수한 [페이지 환경](https://developers.google.com/search/docs/guides/page-experience)을 제작하고 [Core Web Vitals](https://web.dev/vitals/) 컴플라이언스를 달성하는 데 중요합니다. AMP Optimizer의 작동 방식에 대해 자세히 알아보시려면 [상세한 AMP 최적화 가이드](explainer.md)를 참조하세요.

## AMP는 이미 빠르지 않나요?

아마 "AMP는 빠르고 혁신적인 기술이 아니었나?"라는 생각을 하실 수도 있습니다. 게다가 그 의문은 적절합니다. AMP 런타임은 최적화를 통해 빠른 속도를 제공하며 모든 유효한 AMP 페이지는 빠르게 로드됩니다. 하지만 추가 퍼포먼스 최적화를 서벙서 구현하여 브라우저에서 AMP 페이지가 더욱 빠르게 로드되는 데 도움을 받을 수 있습니다.

초반에는 AMP 캐시가 AMP 페이지의 대부분을 지원했습니다. 이 캐시는 페이지의 최적화를 추가로 수행하여 강력한 사용자 경험을 보장했습니다. 하지만 시간이 지나며 더 많은 표면 웹이 AMP 페이지에 연결되기 시작했고 개발자들도 AMP로 전체 웹사이트를 개발하기 시작했습니다. 그렇기에 AMP 팀은 모두가 자체 출처에서 AMP 캐시와 같은 퍼포먼스로 AMP 페이지를 지원할 수 있도록 AMP Optimizer 개발을 시작한 것입니다.

## AMP Optimizer 통합

AMP Optimizer를 사용하는 세 가지 방식이 있습니다.

1. 기본으로 옵티마이저 통합을 제공하는 사이트 생성기 또는 CMS 사용.
2. 빌드 시스템 또는 서버에 AMP Optimizer 통합.
3. 호스팅 환경에 AMP Optimizer 통합.

### CMS 및 사이트 생성기

최적화된 AMP를 게시하는 최선의 방식은 AMP Optimizer 지원이 기본으로 제공되는 사이트 생성기 또는 CMS를 사용하는 것입니다. 이런 경우 AMP 페이지는 자동으로 최적화됩니다. 현재 다음 사이트 생성기 및 CMS에서 AMP Optimizer 통합을 지원합니다.

- [AMP WordPress 플러그인](https://wordpress.org/)을 통한 [WordPress](https://wordpress.org/plugins/amp/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/)을 통한 [Eleventy](https://www.11ty.dev/)
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### 사용자 지정 빌드 또는 서버 통합

또한 AMP Optimizer를 직접 통합할 수도 있습니다. 제공되는 여러 오픈 소스 AMP Optimizer 구현을 활용해 보세요.

- [AMP Optimizer(Node.js)](node-amp-optimizer.md): 최적화된 AMP 생성을 위한 Node.js 기반의 라이브러리. amp.dev에서 시작 가이드를 확인해 보세요. 이 구현은 AMP 팀에서 관리합니다.
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer(Python)](https://github.com/chasefinch/amp-renderer): Node AMP Optimizer의 Python 포트.

여러분의 서버 및 정적 사이트를 통해 동적으로 렌더링되는 페이지 통합 옵션도 다양하게 지원됩니다.

1. **Build-time**: 정적 사이트의 경우 빌드의 일부로 AMP를 최적화하는 것이 최선입니다. 이 접근 방식에서는 AMP 페이지가 퍼포먼스에 영향을 미치지 않으므로 이상적입니다. [AMP Optimizer + Gulp 통합의 다음 예시를 확인해 보세요](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp).
2. **Render-time**: 웹사이트의 동적인 특성이 두드러지거나 정적으로 변환을 적용할 수 없는 경우 서버에서 AMP 문서가 렌더링된 후 최적화를 수행할 수 있습니다. 이때 서빙에 소요되는 시간을 단축하려면 변환된 페이지를 다음 요청 시 캐싱하는 것이 최선입니다. 페이지 모음이 메모리에 적합할 정도로 작은 경우 CDN 수준, 사이트의 내부 인프라(예: Memcached) 또는 서버 자체에서 캐싱을 수행할 수 있습니다. 이러한 접근 방식에 대해 자세히 알아보려면 [AMP Optimizer를 Express.JS에 통합하는 다음 데모를](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express) 참조하세요.

### 호스팅 제공 업체 통합

일부 호스팅 제공 업체는 웹페이지 배포 또는 서빙 시 사용자 지정 로직 실행을 허용합니다. 이 방식도 AMP Optimizer 통합에 적합한 옵션입니다. 통합 예시는 다음과 같습니다.

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/)([곧 지원 예정](https://github.com/ampproject/amp-toolbox/issues/878))
- AMP Optimizer Docker Image([곧 지원 예정](https://github.com/ampproject/amp-toolbox/issues/879))
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
