---
$title: 자체 기술을 AMP와 통합하기
---

지금까지 게시자들은 14억 개 이상의 AMP 문서를 제작했고, 이 문서들은 750,000가지가 넘는 도메인에 호스팅되어 있습니다. 이미 AMP를 통합한 100곳 이상의 기술 기업의 적극적인 참여가 없었더라면 이러한 성장은 불가능했을 것입니다.

웹상의 게시자나 광고주를 대상으로 하는 기술 제공업체라면 AMP를 지원하시기 바랍니다. 고객은 계속해서 여러분의 기술을 활용할 수 있으며, 더 나은 웹을 만들겠다는 여러분과 AMP의 공통된 목표에도 한 걸음 더 다가갈 수 있습니다.

AMP를 통합하는 방법으로는 크게 다음과 같은 4가지가 있습니다.

## 1. amp-analytics 확장 프로그램 지원
AMP 애널리틱스를 사용하면 구성된 트리거에 따라 이벤트를 서버로 돌려보낼 수 있습니다. AMP 통합을 시작하려면 [애널리틱스 통합 가이드](../../../guides-and-tutorials/optimize-measure/configure-analytics/index.md)를 확인하세요.

동적 매개변수가 있는 추적 픽셀을 추적 URL에 추가하기만 하면 되는 경우 [`amp-pixel`](../../../components/reference/amp-pixel.md)을 확인하세요. 여러분의 기술을 AMP와 함께 사용하려는 개발자를 위해 지원 페이지에서 사용법을 제공하시기 바랍니다.

20곳 이상의 분석 서비스 제공업체에서 [`amp-analytics`](../../../components/reference/amp-analytics.md)  지원합니다. 다음은 분석 서비스 제공업체 [Parse.ly](https://www.parsely.com/help/integration/google-amp/)의 [샘플 참여 요청](https://github.com/ampproject/amphtml/pull/1595)입니다.

## 2. amp-ad 확장 프로그램 사용

[`amp-ad`](../../../components/reference/amp-ad.md) 확장 프로그램은 AMP 페이지에 디스플레이 광고를 게재하기 위한 것입니다. 90곳 이상의 광고 기술 제공업체에서 AMP를 지원합니다.  amp-ad 확장 프로그램을 사용하려면 [개발 개요](https://github.com/ampproject/amphtml/tree/master/ads#overview)를 읽어 보거나 amp-ad 확장 프로그램 지원과 관련된 [개발자 안내](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request)를 확인하세요. 여러분의 회사에서 제공하는 광고 기술에 따라 다음의 [통합 안내](ad-integration-guide.md)를 유용하게 참고할 수도 있습니다.

90곳 이상의 광고 제공업체에서 [`amp-ad`](../../../components/reference/amp-ad.md)  같은 광고 관련 기능을 지원합니다. 다음은 광고 네트워크 [Criteo](https://github.com/ampproject/amphtml/blob/main/ads/criteo.md)의 샘플 [참여 요청](https://github.com/ampproject/amphtml/pull/2299)입니다.

## 3. amp-call-tracking 확장 프로그램 사용

통화 추적 측정 서비스를 제공하는 경우 새로운 [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md) 확장 프로그램으로 사용 사례를 지원할 수 있습니다. 이 확장 프로그램은 하이퍼링크에 있는 전화번호를 동적으로 대체하여 통화 추적을 가능하게 해 줍니다. 즉, CORS 요청을 실행하여 번호를 대체합니다.

이 확장 프로그램이 어떻게 도움이 될지 알아보려면 [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md)을 읽어 보세요.

## 4. 새로운 확장 프로그램/삽입 추가

[`amp-analytics`](../../../components/reference/amp-analytics.md)  [`amp-pixel`](../../../components/reference/amp-pixel.md) 또는 [`amp-ad`](../../../components/reference/amp-ad.md)  사용하여 사용 사례를 지원할 수 없다면 [GitHub에 문제를 게시](https://github.com/ampproject/amphtml/issues/new)하여 다른 옵션을 논의해 보세요. Google에서는 다양한 회사에서 폭넓게 사용될 수 있는 신규 확장 프로그램을 환영합니다. 자세한 내용은 [확장된 구성요소로 참여하기](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#contributing-extended-components) 섹션을 확인하세요.

## 5. amp-iframe 사용

잠깐, 다섯 번째 방법이 있다고요? 사실 이 방법은 최후의 수단입니다. 위의 방법 중 아무것도 도움이 되지 않는 경우, 일반적인 [`amp-iframe`](../../../components/reference/amp-iframe.md) 태그를 사용하여 게시자가 내 콘텐츠를 삽입하게 할 수 있습니다. 하지만 성능 및 사용자 환경과 관련된 몇 가지 함정([여기](../../../components/reference/amp-iframe.md#guideline:-prefer-specific-amp-components-to-amp-iframe)에서 확인)으로 인해 이 접근방식에는 몇 가지 단점이 있습니다.

## 요약

시작하려면 [타사 개발자 가이드라인](https://github.com/ampproject/amphtml/blob/main/3p/README.md)을 확인하세요. AMP 프로젝트에서는 이미 다양한 타사 사용 사례를 지원하고 있지만, 아직 개발되지 않은 웹 기능도 많습니다.

예를 들어, AMP에서는 아직 동적 통화 추적 사용 사례가 지원되지 않습니다. 하지만 이 사용 사례를 지원하기 위해 커뮤니티와 [적극적으로 협력](https://github.com/ampproject/amphtml/issues/5276)하고 있습니다.

질문이나 제안할 내용이 있다면 언제든지 [문제를 제기](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#filing-issues)하거나 [논의 채널](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#discussion-channels) 중 하나를 통해 문의해 주시기 바랍니다.

## 추가 리소스

- [AMP 프로젝트 사이트](https://amp.dev/ko/)
- [AMP GitHub 프로젝트](https://github.com/ampproject/amphtml)
- [AMP 블로그](https://amphtml.wordpress.com/)
- [AMP 프로젝트 로드맵](/content/amp-dev/community/roadmap.html)
