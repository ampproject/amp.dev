---
$title: 분석 설정
---

## 시작하기 전 결정할 사항

모든 분석 솔루션은 필요한 데이터와
데이터를 분석하기 위한 방법을 기반으로 구축됩니다. 시작하기 전에 결정해야 할 사항은 다음과 같습니다.

* 사용자 참여도를 분석하는 데 타사 분석 도구 또는
자체적인 사내 솔루션 중 무엇을 사용할 것인가?
* 사용자 참여도를 파악하기 위해 어떤 사용자 행동을 측정할 것인가?

### 데이터 제공 대상(공급업체 또는 자체 전송?)

사용자 참여도 측정을 위한 자체적인 사내 솔루션이 있는 경우,
이 솔루션으로 AMP 애널리틱스를 통합하기 위해 필요한 것은 URL뿐입니다.
이 URL을 통해 데이터를 전송할 것입니다.
다양한 URL로 데이터를 전송할 수도 있습니다.
예를 들어 페이지 조회수 데이터를 한 URL로 전송하고,
소셜 참여도 데이터를 다른 URL로 보낼 수 있습니다.

AMP 애널리틱스는 한 번 측정하여 여러 곳에 보고하도록 특별히 설계되었습니다.
이미 하나 이상의 분석 공급업체와 협력 중이라면,
[분석 공급업체](analytics-vendors.md) 목록에서 공급업체가 솔루션을 AMP와 통합했는지 확인하세요.
통합한 경우, 설정 세부정보를 검토하고 안내를 따르세요.

분석 공급업체가 AMP와 통합하지 않은 경우,
공급업체에 연락하여 지원을 요청합니다.
또한 [AMP 프로젝트에서 문제를 제기](https://github.com/ampproject/amphtml/issues/new)하여
공급업체를 추가하도록 요청하는 것이 좋습니다.
또한
[AMP HTML 분석 도구 통합](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md)을 확인해 보세요.

### 필요한 데이터

참여도 측정을 위해 사용자에 관해 어떤 데이터를 확보해야 할까요?
먼저 이 데이터를 파악해야 설정할 수 있습니다.

고려해야 할 주요 데이터 요소:

* 페이지 조회수만 추적할 것인가, 아니면 추가 사용자 참여도 패턴도 추적할 것인가?
([amp-pixel 또는 amp-analytics](../../../../documentation/components/reference/amp-pixel.md#use-amp-pixel-or-amp-analytics)도 참조)
* 사용자, 콘텐츠, 기기 또는 브라우저에 관한
어떤 유형의 데이터를 확보할 것인가? ([Variable substitution](analytics_basics.md#variable-substitution)도 참조)
* 어떤 방법으로 사용자를 파악할 것인가?([사용자 파악](analytics_basics.md#variable-substitution)도 참조)

[tip type="read-on"]

[애널리틱스: 기본사항](analytics_basics.md)에서 애널리틱스에 대해 계속해서 자세히 알아보세요.

[/tip]
