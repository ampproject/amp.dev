---
$title: AMP Analytics에 대한 상세 정보
toc: true
---
[TOC]


이 가이드에서는
[amp-analytics 구성 요소](/docs/reference/extended/amp-analytics.html)에 대해
상세히 살펴보고, 샘플 `amp-analytics` 구성을 다음과 같은 주요 빌딩 블록으로 구분합니다.

이 가이드의 나머지 부분에서는 이 구성 샘플을 사용합니다.
이 샘플은 페이지 뷰와 사용자의 링크 클릭을 추적하고, 그 분석 데이터를 타사 제공자인
[Google 애널리틱스](https://developers.google.com/analytics/devguides/collection/amp-analytics/)로
보냅니다.

[sourcecode:html]
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
[/sourcecode]

**참고:** 위의 예시 코드는 학습을 돕기 위한 것이며 절대로 실제 샘플이 아닙니다. 분석 제공자들과 작업 중인 경우에는 위의 샘플이 맞지 않을 수 있습니다. 제공자의 구성은 복잡성을 없애줍니다. 샘플 구성에 대해서는 분석 제공자의 문서를 참조하세요.

## 분석 데이터를 보내는 위치: type 특성

AMP는 두 가지 공통된 패턴의 데이터 수집을 지원하도록 설계됩니다.

* 사내 분석 시스템용으로 게시자가 소유한 엔드포인트에서 수집.
* 공급업체 솔루션과의 호환성을 위해 공급업체가 소유한 엔드포인트에서 수집
(예: [Adobe 애널리틱스](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google 애널리틱스](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

분석 데이터를 분석 제공자에게 보내려면,
`type` 특성을 `amp-analytics` 태그에 포함시키고, [amp-analytics 사양](/docs/reference/extended/amp-analytics.html)에 정의된 대로 그 값을
적절한 공급업체로
설정합니다.

예: `<amp-analytics type="googleanalytics">`는 분석 데이터를
타사 분석 제공자인 Google 애널리틱스로 보냅니다.
게시자가 소유한 엔드포인트로 데이터를 보내려면,
`type` 특성을 포함시키지 않으면 됩니다.
각
[요청](/ko/docs/guides/analytics/deep_dive_analytics.html#보낼-데이터:-requests-특성)에 대해 정의된 엔드포인트로 분석 데이터가 보내집니다.

분석 공급업체 구성은 `amp-analytics`로 시작하기 위한
빠른 방법입니다.
자세한 내용은 공급업체의 문서와
도움말 리소스를 참조하십시오.
이전에 언급한 것처럼,
이미 AMP와 통합한 공급업체의
목록과 특정 문서의 링크는
[amp-analytics 사양](/docs/reference/extended/amp-analytics.html)에서 찾을 수 있습니다.

분석 공급업체인
경우,
[자신의 분석 구성을 AMP HTML에 통합](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md)에 대해 자세히 알아보세요.

## 원격 구성 로드: config 특성

`amp-analytics`의 모든 구성을 AMP 페이지에 전부
포함시킬 필요는 없습니다.
그 대신, 구성의 일부 또는 전부에 대해 원격 URL을
호출할 수 있습니다.

이렇게 하면 특정 요청에 따라 구성을 변경하는 등의
작업을 수행할 수 있습니다.
게시자로서 원격 파일 제어 권한이 있는 경우,
구성 데이터를 생성하는 데 필요한 모든 서버측 처리를 수행할 수
있습니다.

원격 구성을 로드하기 위한 첫
단계는 config 특성을 `amp-analytics` 태그에 포함시키는 것입니다.

[sourcecode:html]
<amp-analytics config="https://example.com/analytics.account.config.json">
[/sourcecode]

그 다음 단계는 원격 URL에 존재하는 JSON 콘텐츠를 만드는 것입니다.
이 샘플 예시에서,
JSON 객체에 포함된 구성은 분석 계정을 위한 단순한 변수 값에 불과합니다.

`https://example.com/analytics.account.config.json`의 예시 콘텐츠:

[sourcecode:html]
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
[/sourcecode]

마지막 단계는 원격 파일에 있는 것을 `amp-analytics` 구성의
적절한 장소에 넣는 것입니다.
`pageview` 및 `event` 요청에서 모두
`account` 변수 값은
원격 URL의 계정 값(`"account": "UA-XXXXX-Y"`)으로 자동 설정됩니다.

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

**중요:** AMP는 동일 변수가 여러 번 사용되는 것을 검사하지 않습니다.
변수 대체
우선순위에 따라 값이 채워지며, 원격 URL의
값은 이 순서에서 맨 위입니다([변수 대체 순서](/ko/docs/guides/analytics/deep_dive_analytics.html#변수-대체-순서) 참조).

## requests, triggers 및 transport

`requests` 특성은 '보낼 데이터'(예:`pageviews`, `events`)와
이 데이터를 보낼
위치(데이터 전송에 사용되는 URL)를 정의합니다.

`triggers` 특성은 분석 데이터를 보내야 하는 시기를 나타냅니다(예:
사용자가 페이지를 볼 때, 사용자가 링크를 클릭할 때).

`transport` 특성은 요청을 보내는 방법을 지정합니다(보다
구체적으로, 프로토콜).

이 구성에 대해 더 알아보려면 계속 읽어보세요.
(또한
[amp-analytics 참조](/docs/reference/extended/amp-analytics.html)에서 이들 구성에 대해 살펴볼 수 있습니다.)

### 보낼 데이터: requests 특성

`request-name`은 트리거 구성에 사용되며, 특정 이벤트에
응답하여 어떤 요청을 보내야 하는지를 지정합니다.
`request-value`는 `https` URL입니다.
이 값에는 다른 요청이나 변수를 참조할 수 있는 자리표시자
토큰이 포함될 수도 있습니다.

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

일부 분석 제공자(Google 애널리틱스 포함)는
이미 구성을 제공했으며,
`type` 특성을 통해 이 구성을 사용할 수 있습니다.
분석 제공자를 사용 중인 경우,
`requests` 정보를 포함하지 않아도 됩니다.
`requests`의 구성 여부와 그 방법을 알아보려면 공급업체
문서를 참조하세요.

#### 요청 URL 추가: Extra URL Params

[extraUrlParams](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#extra-url-params)
특성은 일반적인 "&foo=baz" 규칙을 통해 요청 URL의 쿼리 문자열에 추가할 추가 매개변수를 지정합니다.

`amp-analytics` 예시에서는 추가 매개변수인  <code>cd1</code>을
요청에 추가하고 그 매개변수 값을 "AMP"로 설정합니다.

[sourcecode:html]
  "extraUrlParams": {
    "cd1": "AMP"
  }
[/sourcecode]

### 데이터를 보낼 시기: triggers 특성

`triggers` 특성은 분석 요청을 보내야 하는 시기를 나타냅니다.
여기에는 트리거-이름 및 트리거-구성의 키-값 쌍이 포함됩니다.
트리거 이름에는 영숫자 문자(a-zA-Z0-9)로 구성된 임의 문자열을
사용할 수 있습니다.

예를 들어,
문서가 먼저 로드되고 `a` 태그가 클릭될
때마다 요청을 `https://example.com/analytics`로 보내기 위해
다음과 같은 `amp-analytics` 요소가 구성됩니다.

[sourcecode:html]
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
  "trackAnchorClicks": {
    "on": "click",
    "selector": "a",
    "request": "event",
    "vars": {
      "eventId": "42",
      "eventLabel": "clicked on a link"
    }
  }
}
[/sourcecode]

AMP는 다음과 같은 트리거 구성을 지원합니다.

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">트리거 구성</th>
      <th data-th="Description">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (필수)</td>
      <td data-th="Description">수신할 이벤트. 유효한 값은 <code>click</code>, <code>scroll</code>, <code>timer</code> 및 <code>visible</code>입니다.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (필수)</td>
      <td data-th="Description">보낼 요청의 이름(<a href="/ko/docs/guides/analytics/deep_dive_analytics.html#보낼-데이터:-requests-특성">요청에 지정</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">최상위 config에 정의된 <code>vars</code>를 재정의하는 데 사용하거나 또는 이 트리거에 고유한 <code>vars</code>를 지정하는 데 사용할 키-값 쌍이 포함된 객체(참고 항목 <a href="/ko/docs/guides/analytics/deep_dive_analytics.html#변수-대체-순서">변수 대체 순서</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (<code>on</code>이 <code>click</code>으로 설정된 경우 필요)</td>
      <td data-th="Description">추적할 요소를 세분화하는 데 사용되는 CSS 선택기. 값 <code>*</code>를 사용하여 모든 요소를 추적합니다. 이 구성은 <code>click</code> 트리거와 함께 사용됩니다. 선택기를 사용하여 <a href="/ko/docs/guides/analytics/use_cases.html#페이지-클릭-추적">페이지 클릭</a> 및 <a href="/ko/docs/guides/analytics/use_cases.html#소셜-상호작용-추적">소셜 상호작용</a>을 추적하는 방법에 대해 알아보세요.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (<code>on</code>이 <code>scroll</code>로 설정된 경우 필요)</td>
      <td data-th="Description">페이지가 스크롤될 때 <code>scroll</code> 이벤트가 발생하는 조건을 제어합니다. 이 객체에는 <code>verticalBoundaries</code> 및 <code>horizontalBoundaries</code>가 포함될 수 있습니다. <code>scroll</code> 이벤트가 발생하기 위해서는 최소한 두 속성 중 하나가 필요합니다. 두 속성의 값들은 스크롤 이벤트가 생성되는 경계를 포함하는 숫자 배열이어야 합니다. <a href="/ko/docs/guides/analytics/use_cases.html#소셜-상호작용-추적">스크롤 추적</a>에서 이 예시를 참조하세요.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (<code>on</code>이 <code>timer</code>로 설정된 경우 필요)</td>
      <td data-th="Description"><code>timer</code> 이벤트가 발생하는 시기를 제어합니다. 타이머는 즉시 트리거되며 그 다음에는 지정된 간격마다 트리거됩니다. 이 구성은 <code>timer</code> 트리거와 함께 사용됩니다.</td>
    </tr>
  </tbody>
</table>

**중요:** 순위가 더 낮은 구성의 트리거는 순위가 더 높은
구성의 동일 이름을 가진 트리거에 의해 재정의됩니다
([변수 대체 순서](/ko/docs/guides/analytics/deep_dive_analytics.html#변수-대체-순서) 참조).

### 데이터 보내는 방식: transport 특성

`transport` 특성은 요청을 보내는 방법을 지정합니다.
기본적으로 다음과 같은 세 가지 메서드가 활성화됩니다.

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">전송 메서드</th>
      <th data-th="Description">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">요청을 전송하는 데 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a>을 사용할 수 있음을 나타냅니다. 이 메서드는 <code>POST</code> 요청을 사용자 인증 정보 및 빈 본문과 함께 보냅니다.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description"><code>XMLHttpRequest</code>를 사용하여 요청을 전송할 수 있음을 나타냅니다. 이 메서드는 <code>POST</code> 요청을 사용자 인증 정보 및 빈 본문과 함께 보냅니다.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description"><code>Image</code> 태그를 생성하여 요청을 보낼 수 있음을 나타냅니다. 이 메서드는 <code>GET</code> 요청을 보냅니다.</td>
    </tr>
  </tbody>
</table>

전송 메서드는 하나만 사용되며,
우선순위가 가장 높은 메서드가 활성화되고
허용되며 사용할 수 있습니다.
순위는 `beacon` > `xhrpost` > `image`입니다.
클라이언트의 사용자 에이전트가 메서드를 지원하지
않는 경우, 그 다음으로 우선순위가 높은 활성화된 메서드가 사용됩니다.

전송 옵션을 제한하려는 경우에만 `transport` 특성을 구성에
포함합니다. 그렇지 않은 경우에는 요청을
중단시킬 수 있습니다.

아래 예시에서
`beacon` 및 `xhrpost`가 false로 설정되므로,
`image`보다 우선순위가 더 높더라도 사용되지 않을 것입니다.
클라이언트의 사용자 에이전트가 `image` 메서드를 지원하는 경우 해당 메서드가
사용될 것입니다. 그렇지 않은 경우 요청이 보내지지 않습니다.

[sourcecode:html]
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
[/sourcecode]

## 변수 대체 순서

AMP는 다음과 같은 우선순위 순서대로 변수에 값을 채웁니다.

1. 원격 구성(`config`를 통해).
2. `triggers` 내의 트리거 내에 중첩된 `vars`.
3. `amp-analytics` 내에 중첩된 최상위에 있는 `vars`.
4. 플랫폼이 제공하는 값.

이 예시에는 원격 구성과 최상위 수준, 트리거 및 플랫폼
수준에 정의된 변수가 있습니다.

[sourcecode:html]
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
[/sourcecode]

동일한 `var`가 여러 위치에 정의된 경우,
변수의 우선순위 순서에 따라 그 값이 설정됩니다.
따라서, 위의 예시에서 원격 구성이 `account`를 UA-XXXXX-Y로 정의한 경우,
다양한 vars의 값은 다음과 같습니다.

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">값</th>
      <th data-th="Defined By" class="col-thirty">다음에 의해 정의됨</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">플랫폼</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">트리거</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">원격 구성</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">트리거</td>
    </tr>
  </tbody>
</table>
