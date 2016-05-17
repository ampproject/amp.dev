---
layout: page
title: Analytics 구성
order: 5
folder: analytics
locale: ko
---

## 시작하기 전에 결정하세요.

모든 분석 솔루션은 여러분에게 어떤 데이터가 필요한지
그리고 여러분이 이 데이터를 분석하는 방법을 알고 있다는 전제 하에 작성됩니다. 시작하기 전에 결정하세요:

* 사용자 참여 분석을 위해 타사의 분석 도구를 사용하겠습니까
아니면 자신의 사내 솔루션을 사용하겠습니까?
* 사용자 참여를 이해하기 위해 어떤 사용자 동작을 측정하겠습니까?

### 데이터를 공급업체나 자신에게 보내겠습니까?

사용자 참여를 측정하기 위한 사내 솔루션이 있는 경우,
AMP Analytics를 이 솔루션과 통합하기 위해 URL만 있으면 됩니다.
여기에서 데이터를 보냅니다.
또한 데이터를 다양한 URL로 보낼 수도 있습니다.
예를 들어, 페이지 뷰 데이터를 한 URL로 보내고,
소셜 참여 데이터를 다른 URL로 보낼 수 있습니다.

AMP Analytics는 한 번의 측정으로 여러 곳에 보고하도록 특별히 설계되었습니다.
하나 이상의 분석 공급업체와 이미 작업 중인 경우,
[amp-analytics 사양](/docs/reference/extended/amp-analytics.html)
을 참조하여 이들 업체가 자사의 솔루션을 AMP와 통합했는지 여부를
확인하세요.
이들 업체가 솔루션을 통합했다면, 사양에서 해당 문서의 링크를
누르고 지시에 따릅니다.

분석 공급업체가 AMP와 통합하지 않은 경우에는,
이 공급업체에 연락하여 지원을 요청하세요.
또한 [AMP 프로젝트에서 문제점을 생성](https://github.com/ampproject/amphtml/issues/new)
하도록 권장하며, 공급업체가 추가되도록 요청하세요.
참고 항목
[AMP HTML에서 분석 도구 통합](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### 어떤 데이터가 필요합니까?

사용자 참여를 측정하기 위해 사용자에 관한 어떤 데이터를 캡처하겠습니까?
이를 구성하려면 먼저 이 데이터를 식별해야 합니다.

고려할 핵심 데이터 포인트:

* 페이지 뷰만 추적하겠습니까 아니면 추가적인 사용자 참여
패턴도 추적하겠습니까(참고 항목 [amp-pixel 또는 amp-analytics](/docs/guides/analytics/analytics_basics.html#use-amp-pixel-or-amp-analytics))?
* 사용자, 콘텐츠 기기 또는 브라우저에 관한 어떤 데이터를 캡처하겠습니까
(참고 항목 [변수 대체](/docs/guides/analytics/analytics_basics.html#variable-substition))?
* 어떻게 사용자를 식별하겠습니까(참고 항목 [사용자 식별](/docs/guides/analytics/analytics_basics.html#user-identification))?
