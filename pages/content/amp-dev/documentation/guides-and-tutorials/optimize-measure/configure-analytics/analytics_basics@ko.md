---
"$title": 'Analytics: the basics'
"$order": '0'
description: AMP는 분석 및 측정용으로 amp-pixel 및 amp-analytics라는 두 가지 컴포넌트를 제공합니다. 두 가지 옵션 모두 애널리틱스 데이터를 정의된 엔드포인트로 전송합니다.
formats:
- websites
- stories
---

AMP 애널리틱스의 기초에 관해 알아보세요.

## amp-pixel과 amp-analytics 중 무엇을 사용해야 할까요? <a name="use-amp-pixel-or-amp-analytics"></a>

AMP는 분석 및 측정용으로 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 및 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)라는 두 가지 컴포넌트를 제공합니다. 두 가지 옵션 모두 애널리틱스 데이터를 정의된 엔드포인트로 전송합니다.

[추적 픽셀](https://en.wikipedia.org/wiki/Web_beacon#Implementation)과 같은 단순한 동작을 사용하려면 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 컴포넌트가 기본적인 페이지 조회수 추적을 지원합니다. 페이지 조회수 데이터는 정의된 URL로 전송됩니다. 일부 공급업체와 통합 시 이 컴포넌트가 필요한 경우도 있습니다. 이런 경우 공급업체에서 정확한 URL 엔드포인트를 지정합니다.

대부분의 애널리틱스 솔루션은 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)를 사용합니다. 페이지 조회수 추적은 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)으로도 작동합니다. 한편 링크 및 버튼 클릭 등 모든 유형의 페이지 콘텐츠를 대상으로 한 사용자 참여도 역시 추적할 수 있습니다. [filter formats="websites"] 또한 사용자가 페이지를 얼마나 스크롤했는지와 사용자의 소셜 미디어 참여 여부도 측정할 수 있습니다.[/filter] [filter formats="stories"] 또한 사용자가 스토리를 얼마나 탭했는지와 사용자의 대화형 요소 참여 여부도 측정할 수 있습니다. [/filter]

[tip type="read-on"] [AMP 애널리틱스 심층 분석](deep_dive_analytics.md)을 참조하세요. [/tip]

AMP 플랫폼 통합의 일환으로 공급업체는 사전 정의된 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 구성을 제공하여 데이터를 손쉽게 캡처하고 추적 도구로 간편하게 전송할 수 있도록 했습니다. 공급업체 문서에 액세스하려면 [애널리틱스 공급업체](analytics-vendors.md) 목록을 참조하세요.

페이지에서 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 및 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)를 모두 사용할 수 있습니다. [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)은 간단한 페이지 조회수 추적에, [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)는 기타 모든 용도로 사용 가능합니다. 또한 각각의 태그를 여러 개 추가할 수도 있습니다. 여러 애널리틱스 공급업체와 협업하는 경우 솔루션마다 별도의 태그가 필요합니다. AMP 페이지가 단순할수록 사용자에게 편리하므로 굳이 추가 태그가 필요 없다면 사용하지 않는 것이 좋습니다.

## 단순한 애널리틱스 구성 생성

단순한 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 및 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 구성의 생성 방법을 알아보세요.

### 단순한 amp-pixel 구성

단순한 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 구성을 생성하려면 다음과 같은 코드를 AMP 페이지 바디에 삽입합니다.

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

이 예에서 페이지 조회수 데이터는 임의의 숫자로 정의된 URL에 전송됩니다. `RANDOM` 변수는 [AMP 플랫폼에서 사용되는 다양한 대체 변수 중 하나](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)입니다. [변수 대체](analytics_basics.md#variable-substitution)와 관련한 자세한 내용을 알아보세요.

[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 컴포넌트는 기본으로 제공되므로 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)와 같은 AMP 확장 컴포넌트와는 달리 삽입(inclusion) 선언이 필요하지 않습니다. 하지만 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 태그는 `<body>` 시작 부분에 최대한 가깝게 배치해야 합니다. 추적 픽셀은 태그가 뷰 안에 포함될 경우에만 시작됩니다. 만약 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)이 페이지 하단에 위치할 경우 추적 픽셀이 시작되지 않을 수도 있습니다.

### 단순한 amp-analytics 구성

단순한 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 구성을 생성하려면 우선 `custom-element` 선언을 AMP 문서의 `<head>`에 삽입해야 합니다([컴포넌트 삽입 선언](../../../../documentation/components/index.html) 참조).

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

다음의 예는 [`amp-pixel` 예시](../../../../documentation/components/reference/amp-pixel.md)와 유사합니다. 페이지가 표시될 때마다 트리거 이벤트가 시작되며 페이지 조회수 데이터가 임의의 ID로 정의된 URL에 전송됩니다.

```html
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
```

위의 예에서는 페이지 조회수라는 요청을 `https://foo.com/pixel?RANDOM`으로 정의했습니다. 앞서 논의한 대로 RANDOM은 임의의 숫자로 대체되어 이 요청은 `https://foo.com/pixel?0.23479283687235653498734`로 표시됩니다.

페이지가 표시되면(트리거 키워드 `visible`을 사용하여 지정됨) 이벤트가 트리거되어 `pageview` 요청이 전송됩니다. 트리거 속성이 페이지 조회수 요청의 시작 시점을 결정합니다. [요청 및 트리거](deep_dive_analytics.md#requests-triggers--transports)와 관련한 자세한 내용을 알아보세요.

[filter formats="stories"]

## AMP 스토리 기본 구성

웹사이트의 일반적인 사용자 여정은 스토리와 큰 차이가 있습니다. 웹사이트에서 사용자는 헤드라인을 읽고 페이지 하단으로 스크롤하여 다음 페이지 링크를 클릭하기 전 양식과 상호작용할 수 있습니다. 한편 스토리는 전체 뷰포트를 차지하고 사용자는 스크롤이 아닌 탭 동작을 통해 이동합니다.

{{ image('/static/img/docs/guides/analytics-pages.png', 660, 501, alt='PWA 이미지' ) }}

화면 간의 콘텐츠는 현저히 다르기 때문에 많은 사람들이 스토리의 각 신규 [`<amp-story-page>`](../../../../documentation/components/reference/amp-analytics.md)를 새로운 조회수로 측정하려 합니다. 하지만 페이지는 전체 스토리의 단일한 요소에 불과하며 일반적으로 사용자는 스토리의 전체적 내용을 파악하기 위해 여러 스토리 페이지를 살펴봅니다. 그러므로 문제는 조회수처럼 단순한 지표를 집계하는 방식이 분석적 접근에 있어 얼마나 큰 영향을 미치는지 이해하는 것입니다.

{{ image('/static/img/docs/guides/analytics-setup-stories.png', 1037, 528, alt='PWA 이미지' ) }}

AMP 애널리틱스를 활용하면 어떤 애널리틱스 공급업체를 사용해도 상단의 내용을 쉽게 구현할 수 있습니다. 예를 들어 Google Analytics의 [전체 사이트 태그](https://developers.google.com/gtagjs/)는 하단의 코드 조각처럼 표시됩니다.

```html
<amp-analytics type="gtag" data-credentials="include">
 <script type="application/json">
  {
    "vars": {
      "gtag_id":"YOUR_GOOGLE_ANALYTICS_ID",
      "config": {
        "YOUR_GOOGLE_ANALYTICS_ID": {
          "groups":"default"
        }
      }
    },
    "triggers": {
      "storyProgress": {
        "on":"story-page-visible",
        "vars": {
          "event_name":"custom",
          "event_action":"story_progress",
          "event_category":"${title}",
          "event_label":"${storyPageId}",
          "send_to": [
            "YOUR_GOOGLE_ANALYTICS_ID"
          ]
        }
      },
      "storyEnd": {
        "on":"story-last-page-visible",
        "vars": {
          "event_name":"custom",
          "event_action":"story_complete",
          "event_category":"${title}",
          "send_to": [
            "YOUR_GOOGLE_ANALYTICS_ID"
          ]
        }
      }
    }
  }
 </script>
</amp-analytics>
```

이러한 기본 구성만으로 AMP 스토리에서 완전하게 작동하는 구성을 생성할 수 있습니다.

기본 구성보다 다양한 기능을 원하신다면 <a class="" href="https://blog.amp.dev/2019/08/28/analytics-for-your-amp-stories/?_gl=1*pw0bu5*_ga*MzM1MjQ0ODE5LjE1NjUwMzU1MTg">Analytics for your AMP Stories</a> 글을 읽고 Google Analytics의 고급 활용 사례를 확인해보세요.

[/filter]

## 변수 대체 <a name="user-identification"></a>

<a><code data-md-type="codespan">amp-pixel</code></a> 및 <a><code data-md-type="codespan">amp-analytics</code></a> 컴포넌트는 모든 표준 URL 변수 대체을 허용합니다(<a class="" href="https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md">AMP HTML 변수 대체</a> 참조). 다음 예시에서는 페이지 조회수 요청이 URL로 전송되며, 현재 AMP 문서의 기본 URL, 제목, <a class="" href="https://gitlocalize.com/repo/4863/ko/pages/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md#user-identification">클라이언트 ID</a>도 함께 전송됩니다.

```html
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
```

<a><code>amp-pixel</code></a> 태그는 간소하므로 플랫폼에서 정의된 변수나 AMP 런타임이 AMP 페이지에서 파싱할 수 있는 변수만 삽입될 수 있습니다. 상단 예시의 경우 플랫폼에서 <code>canonicalURL</code> 및 <code>clientId(site-user-id)</code> 값이 채워집니다. <a><code>amp-analytics</code></a> 태그에는 <a><code>amp-pixel</code></a>과 동일한 변수 및 태그 구성 내에 고유하게 정의된 변수를 삽입할 수 있습니다.

페이지 또는 플랫폼에서 정의된 변수 요청 문자열에는 `${varName}` 형식을 사용합니다. 애널리틱스 요청 구성 시점에 <a><code>amp-analytics</code></a> 태그는 템플릿을 해당 태그의 실제 값으로 대체합니다(<a class="" href="https://gitlocalize.com/repo/4863/ko/pages/content/amp-dev/documentation/components/reference/amp-analytics.md"><code>amp-analytics</code>에서 지원되는 변수</a> 참조).

다음 [<code>amp-analytics</code>](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md) 예시에서 페이지 조회수 요청은 변수 대체를 통해 추출된 추가 데이터와 함께 지정된 URL로 전송됩니다. 이 데이터 중 일부는 플랫폼에서 제공되며 일부는 <a><code>amp-analytics</code></a> 구성 내에서 인라인으로 정의됩니다.

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}"
      },
      "vars": {
        "account":"ABC123"
      },
      "triggers": {
        "someEvent": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "My homepage"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

상단 예시의 경우 <code>account</code> 및 <code>title</code> 변수가 <a><code>amp-analytics</code></a> 구성에서 정의됩니다. <code>canonicalUrl</code> 및 <code>clientId</code> 변수는 구성에서 정의되지 않기 때문에 이러한 변수의 값은 플랫폼에서 대체됩니다.

[tip type="important"] **중요 –** 변수 대체는 유연하게 조정될 수 있습니다. 서로 다른 위치에 동일한 변수가 정의될 수 있으며, AMP 런타임은 순서에 따라 값을 파싱합니다(<a>변수 대체 순서</a> 참조) [/tip]

## 사용자 식별 <a name="user-identification"></a>

웹사이트는 쿠키를 사용하여 특정 사용자의 정보를 브라우저에 저장합니다. 사용자가 이전에 사이트에 방문했는지 판별하는 데 쿠키가 사용됩니다. AMP에서는 퍼블리셔의 웹사이트 또는 캐시(Google AMP 캐시 등)를 통해 페이지가 제공되빈다. 퍼블리셔의 웹사이트 및 캐시는 서로 다른 도메인을 사용할 가능성이 높습니다. 보안상의 이유로 브라우저는 다른 도메인의 쿠키 액세스를 제한할 수 있으며 실제로 제한하기도 합니다([여러 출처의 사용자 추적](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md) 참조).

기본적으로 AMP는 퍼블리셔의 출처 웹사이트 또는 캐시 중 페이지가 액세스된 경로와 무관하게 클라이언트 ID 제공을 관리합니다. AMP에서 생성된 클라이언트 ID에는 `"amp-"` 값과 `base64`로 인코딩된 임의의 문자열이 포함됩니다. 해당 ID는 동일한 사용자가 다시 방문할 경우 동일하게 유지됩니다.

모든 경우에 AMP는 클라이언트 ID의 판독 및 기록을 관리합니다. 특히 페이지가 캐시를 통해 제공되거나, 퍼블리셔의 출처 사이트의 표시 컨텍스트 외부에서 표시될 경우 중요합니다. 이러한 환경에서는 퍼블리셔 사이트 쿠키에 대한 액세스는 지원되지 않습니다.

퍼블리셔 사이트가 AMP 페이지를 제공하는 경우, 검색하고 사용할 폴백 쿠키를 AMP에서 사용되는 클라이언트 ID 프레임워크에 알려줄 수 있습니다. 이때 `clientId`의 `cid-scope-cookie-fallback-name` 인수는 쿠키 이름으로 해석됩니다. 서식 지정은 `CLIENT_ID(cid-scope-cookie-fallback-name)` 또는 `${clientId(cid-scope-cookie-fallback-name)}`로 표시됩니다.

예시는 다음과 같습니다.

```html
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
```

이 쿠키가 설정된 것으로 AMP에서 확인되면 클라이언트 ID 대체를 통해 쿠키값이 반환됩니다. 이 쿠키가 설정되지 않은 것으로 AMP에서 확인된 경우 AMP는 `amp-` 및 base64로 인코딩된 임의의 문자열 형식을 갖춘 값을 생성합니다.

선택적 사용자 알림 ID를 추가하는 방법을 비롯한 클라이언트 ID 대체의 상세한 내용은 [AMP 애널리틱스에서 지원되는 변수](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)에서 확인할 수 있습니다.

더 알아보기: [AMP 애널리틱스 심층 분석](deep_dive_analytics.md) 및 [활용 사례](use_cases.md) 글을 읽고 애널리틱스에 대해 자세히 알아보세요.
