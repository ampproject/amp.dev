---
$title: '애널리틱스: 기초'
$order: 0
toc: true
---

AMP 애널리틱스의 기초에 관해 알아보세요.

[TOC]

## amp-pixel과 amp-analytics 중 무엇을 사용해야 할까요?


AMP는 분석 및 측정용으로 [amp-pixel](/ko/docs/reference/amp-pixel.html) 
및 [amp-analytics](/ko/docs/reference/extended/amp-analytics.html) 라는 두 가지 구성요소를 제공합니다. 두 가지 옵션 모두 애널리틱스 데이터를 정의된 엔드포인트로 전송합니다.


추적 픽셀과 같은 [단순한 행동을](https://en.wikipedia.org/wiki/Web_beacon#Implementation) 사용하려면 `amp-pixel` 구성요소를 통해 기본적인 페이지 조회수 추적을 할 수 있습니다. 페이지 조회수 데이터는 정의된 URL로 전송됩니다. 공급업체와의 통합으로 인해 이 구성요소가 필요할 때도 있습니다. 이 경우 공급업체에서 정확한 URL 엔드포인트를 지정합니다.

 대부분의 애널리틱스 솔루션의 경우 `amp-analytics` 를 사용할 수 있습니다. 페이지 조회수 추적은 `amp-analytics` 에서도 작동합니다. 한편 링크 및 버튼 클릭 등 모든 유형의 페이지 콘텐츠를 대상으로 한 사용자 참여도 추적할 수 있습니다. 또한 사용자가 페이지를 얼마나 스크롤했는지와 사용자의 소셜 미디어 참여 여부도 측정할 수 있습니다.

{% call callout('자세히 알아보기', type='read') %}
 AMP 애널리틱스 [심도 있게 알아보기](/ko/docs/guides/analytics/deep_dive_analytics.html)
를 참조하세요. {% endcall %}

 AMP 플랫폼 통합의 일환으로 제공업체에서는 사전 정의된 `amp-analytics` 
구성을 제공하여 데이터를 손쉽게 캡처하고 이를 추적 도구로 간편하게 전송할 수 있도록 했습니다. 업체 문서에 액세스하려면 [애널리틱스 공급업체](/ko/docs/guides/analytics/analytics-vendors.html) 목록을 참조하세요.

 페이지에서 `amp-pixel`  및 `amp-analytics` 
둘 다 사용 가능합니다. `amp-pixel` 은 간단한 페이지 조회수를 추적하는 데 사용할 수 있으며 `amp-analytics` 는 기타 모든 용도로 사용 가능합니다. 또한 각 태그를 여러 개 추가할 수도 있습니다. 여러 애널리틱스 제공업체와 함께 일하는 경우 솔루션마다 별도의 태그가 필요합니다. AMP 페이지가 단순할수록 사용자가 사용하기에 편리하므로 여분의 태그가 필요 없는 경우 사용하지 않는 것이 좋습니다.

## 단순한 애널리틱스 구성 만들기


단순한 [amp-pixel](/ko/docs/reference/amp-pixel.html) 
및 [amp-analytics](/ko/docs/reference/extended/amp-analytics.html) 구성을 만드는 방법을 자세히 알아보세요.

### 단순한 amp-pixel 구성

 단순한 `amp-pixel` 구성을 만들려면 다음과 같은 예를 AMP 페이지 본문에 삽입하세요.

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
[/sourcecode]

 이 예에서 페이지 조회수 데이터는 임의의 숫자와 함께 정의된 URL으로 전송됩니다. `RANDOM` 
변수는 [AMP 플랫폼에서 사용되는 다양한 치환 변수 중 하나입니다](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). 여기에서 [변수 치환](/ko/docs/guides/analytics/analytics_basics.html#variable-substitution) 에 관해 자세히 알아보세요.

 [amp-pixel](/ko/docs/reference/amp-pixel.html) 구성요소는 내장되어 있으므로 `amp-analytics` 와 같은 AMP의 확장 구성요소와는 달리 포함 선언이 없어도 됩니다. 하지만 `amp-pixel` 태그는 `<body>` 가 시작하는 부분에 최대한 가깝게 위치시켜야 합니다. 추적 픽셀은 태그가 뷰 안에 들어오는 경우에만 시작됩니다. 만약 `amp-pixel` 이 페이지 하단에 위치하게 되면 추적 픽셀이 시작되지 않을 수도 있습니다.

### 단순한 amp-analytics 구성


단순한 [amp-analytics](/ko/docs/reference/extended/amp-analytics.html) 구성을 작성하려면 우선 `custom-element` 선언을 AMP 문서의 `<head>` 
에 포함시켜야 합니다 ([구성요소 포함 선언](/ko/docs/reference/extended.html#component-inclusion-declaration) 참고).

[sourcecode:html]

<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>

[/sourcecode]

 다음의 예는 [ `amp-pixel` 예](/ko/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration) 와 유사합니다. 페이지가 표시될 때마다 트리거 이벤트가 시작되며, 임의의 ID와 함께 페이지 조회수 데이터가 정의된 URL에 전송됩니다.

[sourcecode:html]
<amp-analytics>

<script type="application/json">

  {"requests": 
    {"pageview": "https://foo.com/pixel?RANDOM
  ", },"triggers": 
    {"trackPageview": 
      {"on": "visible",
      "request": "pageview"
    
} } }</script>

</amp-analytics>
[/sourcecode]

 위의 예에서는 페이지 조회수라는 요청을 https://foo.com/pixel?RANDOM 으로 정의했습니다. 앞에서 논의한 대로 RANDOM은 임의의 숫자로 치환되기 때문에 이 요청은 다음과 같이 표시됩니다. https://foo.com/pixel?0.23479283687235653498734

 페이지가 표시되면 (트리거 키워드 `visible` 을 사용하여 지정됨) 이벤트가 시작되며 `pageview` 요청이 전송됩니다. 트리거 속성은 페이지 조회수 요청이 언제 시작될지 결정합니다. [요청 및 트리거](/ko/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports) 에 관해 자세히 알아보세요.

## 변수 치환

[amp-pixel](/ko/docs/reference/amp-pixel.html) 
및 [amp-analytics](/ko/docs/reference/extended/amp-analytics.html) 
구성요소 둘 다 모든 표준 URL 변수 치환을 허용합니다 ([AMP HTML 변수 치환](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)
참조). 다음의 예에서는 페이지 조회수 요청이 URL로 전송되며, 현재 AMP 문서의 기본 URL, title, [클라이언트 ID](/ko/docs/guides/analytics/analytics_basics.html#user-identification) 도 함께 전송됩니다.

[sourcecode:html]
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
[/sourcecode]

`amp-pixel` 
태그는 단순하므로 플랫폼에서 정의된 변수나 AMP 런타임이 AMP 페이지에서 파싱할 수 있는 변수만 포함할 수 있습니다. 위의 예에서는 플랫폼에서 `canonicalURL` 및 `clientId(site-user-id)` 값이 자동완성됩니다. `amp-analytics` 태그에는 `amp-pixel` 과 동일한 변수 및 태그 구성 내에 고유하게 정의된 변수를 포함시킬 수 있습니다.

 페이지 또는 플랫폼에서 정의된 변수 요청 문자열에서 `${varName}` 형식을 사용하세요. 애널리틱스 요청이 구축될 때 `amp-analytics` 
태그로 인해 템플릿이 실제 값으로 대체됩니다 ([amp-analytics 에서 지원되는 변수](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md) 참조).

 다음의 `amp-analytics` 예에서 페이지 조회수 요청은 변수 치환에서 추출된 추가 데이터와 함께 지정된 URL로 전송됩니다. 이 데이터 중 일부는 플랫폼에서 제공되며 일부는 `amp-analytics` 구성 내에서 인라인으로 정의됩니다.

[sourcecode:html]
<amp-analytics>

<script type="application/json">

  {"requests": 
    {"pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": 
    {"account": 
  "ABC123", },"triggers": 
    {"someEvent": 
      {"on": "visible",
      "request": "pageview",
      "vars": 
        {"title": 
"My homepage", } } } }</script>

</amp-analytics>
[/sourcecode]

 위의 예에서 `account`  및 `title`  변수는 `amp-analytics` 구성에서 정의됩니다. `canonicalUrl` 및 `clientId` 변수는 구성에서 정의되지 않기 때문에 이러한 변수의 값은 플랫폼에 의해 치환됩니다.

{% call callout('중요', type='caution') %}
 변수 치환은 유연하게 조정될 수 있습니다. 서로 다른 위치에서 동일한 변수가 정의될 수 있으며, AMP 런타임에서는 [변수 치환 순서](/ko/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)
에 나와 있는 우선순위에 따라 값이 파싱됩니다. {% endcall %}

## 사용자 식별


웹사이트에서는 쿠키를 사용하여  특정 사용자에 대한 정보를 브라우저에 저장합니다. 쿠키를 사용하여 사용자가 이전에 사이트에 방문했는지 알 수 있습니다. AMP 에서는 게시자의 웹사이트 또는 캐시 (Google AMP 캐시 등) 를 통해 페이지를 게재할 수 있습니다. 게시자의 웹사이트 및 캐시는 서로 다른 도메인을 사용할 가능성이 큽니다. 보안상의 이유로 브라우저에서는 다른 도메인의 쿠키를 대상으로 한 액세스를 제한할 수 있으며 실제로 제한하기도 합니다 ([여러 출처의 사용자 추적] (https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md) 참조).

 기본적으로 AMP 는 페이지가 게시자의 원래 웹사이트와 캐시 중 어느 쪽을 통해 액세스되었든 간에 클라이언트 ID 제공을 관리합니다. AMP 에서 생성된 클라이언트 ID 에는 `amp-` 값 및 `base64` 로 인코딩된 문자열이 포함되며 동일한 사용자가 다시 방문하면 동일하게 유지됩니다.

모든 경우에 AMP 는 클라이언트 ID 의 읽기 및 쓰기를 관리합니다. 특히 페이지가 캐시를 통해 게재되거나 기타 방식으로 게시자의 원래 사이트에 표시되는 맥락을 벗어나 표시될 때 이러한 점을 확인할 수 있습니다. 이 경우 게시자 사이트 쿠키에 대한 액세스는 사용할 수 없습니다.

 AMP 페이지가 게시자 사이트에서 게재되는 경우 AMP 에서 사용하는 클라이언트 ID 프레임워크를 보면 검색 및 사용할 대체 쿠키를 알 수 있습니다. 이 경우 `cid-scope-cookie-fallback-name` 인수 (`clientId` 변수에 포함됨) 가 
쿠키 이름으로 해석됩니다. 해당 서식은 `CLIENT_ID(cid-scope-cookie-fallback-name)` 
또는 `${clientId(cid-scope-cookie-fallback-name)}` 으로 표시됩니다.

예:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
[/sourcecode]

 AMP 에서 이 쿠키가 설정되었다는 사실이 확인된 경우 클라이언트 ID 치환으로 인해 쿠키값이 반환됩니다. AMP 에서 이 쿠키가 설정되지 않았다는 사실이 확인된 경우 AMP 는 `amp-` 형식으로 된 값과 base64 로 인코딩된 임의의 문자열을 생성합니다.


사용자 알림 ID 추가 (선택사항) 등 클라이언트 ID 치환에 관해 자세히 알아보려면 [AMP 애널리틱스에서 지원되는 변수](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md) 를 확인하세요.

{% call callout('자세히 알아보기', type='read') %}
 애널리틱스에 관해 자세히 알아보려면 계속해서 [AMP 애널리틱스 심도 있게 알아보기](/ko/docs/guides/analytics/deep_dive_analytics.html)  및 [사용 사례](/ko/docs/guides/analytics/use_cases.html)
를 확인하세요. 
{% endcall %}

