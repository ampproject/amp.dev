---
'$title': AMP 분석 심층적으로 살펴보기
$order: 1
description: 이 가이드에서는 amp-analytics 컴포넌트를 심층적으로 살펴보고 amp-analytics 구성 예시를 다음과 같은 주요 구성 요소로 나누어 봅니다.
formats:
  - 웹사이트
  - 스토리
---

이 가이드에서는 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 컴포넌트를 심층적으로 살펴보고 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 구성을 다음과 같은 주요 구성 요소로 나누어 봅니다.

가이드의 나머지 부분에서는 이 구성 예시를 사용하여 페이지 조회 수와 사용자 링크 클릭 수를 추적하고 타사 제공업체인 [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)로 분석 데이터를 전송합니다.

```html
<amp-analytics
  type="googleanalytics"
  config="https://example.com/analytics.account.config.json"
>
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
      "transport": {
        "beacon": false,
        "xhrpost": false,
        "image": true
      }
    }
  </script>
</amp-analytics>
```

위의 예시는 이해를 돕기 위한 코드이지만, 현실성 있는 예시는 아닙니다. 분석 제공업체와 함께 작업하는 경우에는 상기 예시가 의미가 없을 수도 있습니다. 제공업체 구성에서는 복잡성이 제거됩니다. 구성 예시와 관련한 정보는 [분석 제공업체의 문서](analytics-vendors.md)를 참조하세요.

## 분석 데이터 전송 위치: type 속성

AMP는 데이터 수집의 두 가지 일반적인 패턴을 지원하도록 만들어졌습니다.

- Ingestion by a publisher-owned endpoint for in-house analytics systems.
- Ingestion by a vendor-owned endpoint for interoperability with a vendor solution (for example, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

분석 제공업체에 분석 데이터를 보내려면 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 태그에 `type` 속성을 포함하고 [분석 공급업체](analytics-vendors.md) 목록에 정의된 적절한 공급업체로 값을 설정하세요.

예를 들어 `<amp-analytics type="googleanalytics">`는 분석 데이터를 제3자 분석 제공업체인 Google 애널리틱스로 보냅니다. 게시자 소유 엔드포인트로 데이터를 보내려면 `type` 속성을 포함하지 마세요. [요청](deep_dive_analytics.md#what-data-gets-sent-requests-attribute)마다 정의된 엔드포인트로 분석 데이터가 전송됩니다.

분석 공급업체 구성을 사용하면 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)를 빠르게 시작할 수 있습니다. 자세한 안내는 공급업체의 문서와 도움말 자료를 참조하세요. 앞서 언급했듯이 이미 AMP와 통합한 공급업체 목록 및 공급업체 관련 문서 링크는 [분석 공급업체](analytics-vendors.md) 목록에서 찾을 수 있습니다.

분석 공급업체라면 [자체 분석 구성을 AMP HTML로 통합](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md)하는 방법을 자세히 알아보세요.

## 원격 구성 로드: config 속성

AMP 페이지에 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 구성 전체를 포함할 필요가 없습니다. 대신 구성 전체 또는 일부의 원격 URL을 호출할 수 있습니다.

이렇게 하면 특정 요청에 따라 구성을 다르게 지정할 수 있습니다. 원격 파일 제어 권한이 있는 퍼블리셔라면 구성 데이터를 만드는 데 필요한 서버 측 프로세스를 실행할 수 있습니다.

원격 구성을 로드하는 첫 번째 단계는 <a><code>amp-analytics</code></a> 태그에 config 속성을 포함하는 것입니다.

```html
<amp-analytics
  config="https://example.com/analytics.account.config.json"
></amp-analytics>
```

다음으로 원격 URL에 포함된 JSON 콘텐츠를 만듭니다. 이 간단한 예에서 JSON 개체에 포함된 구성은 분석 계정의 변수 값일 뿐입니다.

<code>https://example.com/analytics.account.config.json</code>의 예시 콘텐츠:

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
```

마지막으로 원격 파일의 내용을 <a><code>amp-analytics</code></a> 구성의 적절한 위치로 가져와야 합니다. 이때 <code>pageview</code> 및 <code>event</code> 요청 모두의 <code>account</code> 변수 값은 원격 URL의 계정 값으로 자동 설정됩니다(<code>"account": "UA-XXXXX-Y"</code>).

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

[tip type="important"] <strong>중요 –</strong> AMP는 동일한 변수의 여러 가지 용도에 대한 유효성을 검사하지 않습니다. 값은 선호하는 변수 대체 순위에 따라 채워지며 원격 URL의 값의 순위는 최상위입니다([변수 대체 순위](../../../../documentation/components/reference/amp-analytics.md) 참조). [/tip]

## Requests, triggers 및 transports <a name="requests-triggers--transports"></a>

<code>requests</code> 속성은 ‘전송되는 데이터’ (예: <code>pageviews</code>, <code>events</code>) 및 데이터가 전송되는 위치(데이터 전송에 사용되는 URL)를 정의합니다.

<code>triggers</code> 속성은 사용자가 페이지를 조회하는 시점, 사용자가 링크를 클릭하는 시점처럼 분석 데이터가 전송되어야 하는 시점을 나타냅니다.

<code>transport</code> 속성은 요청을 전송하는 방법, 더 구체적으로는 프로토콜을 전송하는 방법을 지정합니다.

계속 읽어나가며 속성의 구성을 자세히 알아보세요(<a class="" href="https://gitlocalize.com/repo/4863/ko/pages/content/amp-dev/documentation/components/reference/amp-analytics.md"><code data-md-type="codespan">amp-analytics</code> 참조</a>에서도 구성 관련 정보를 확인할 수 있습니다).

### 전송되는 데이터: requests 속성 <a name="what-data-gets-sent-requests-attribute"></a>

`request-name`은 트리거 구성에 사용되어 특정 이벤트에 대한 응답으로 전송되어야 하는 요청을 지정합니다. <code>request-value</code>는 <code>https</code> URL입니다. URL 값에는 다른 요청 또는 변수를 참조할 수 있는 플레이스홀더 토큰을 포함할 수 있습니다.

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Google Analytics를 비롯한 일부 분석 제공업체에서는 이미 구성을 제공하고 있으며 `type` 속성을 통해 구성을 사용할 수 있습니다. 분석 제공업체를 사용 중이면 <code>requests</code> 정보를 포함할 필요가 없습니다. 공급업체 문서를 통해 <code>requests</code>를 구성 필요 여부와 방법을 확인해 보세요.

#### 요청 URL 추가: Extra URL Params

[extraUrlParams](../../../../documentation/components/reference/amp-analytics.md) 속성은 일반적인 "&foo=baz" 규칙을 통해 요청 URL의 쿼리 문자열에 덧붙일 추가 매개변수를 지정합니다.

<a><code data-md-type="codespan">amp-analytics</code></a> 예시에서는 요청에 추가 매개변수 `cd1`을 덧붙이고 매개변수 값을 "AMP"로 설정합니다.

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### 데이터가 전송되는 시점: triggers 속성

`triggers` 속성은 분석 요청이 전송되어야 하는 시점을 나타냅니다. 이 속성은 트리거-이름 및 트리거-구성의 키-값 쌍을 포함합니다. 트리거 이름에는 영숫자 문자(a-zA-Z0-9)가 조합된 모든 문자열을 사용할 수 있습니다.

예를 들면 다음 [<code>amp-analytics</code>](../../../../documentation/components/reference/amp-analytics.md#extra-url-params) 요소는 문서가 처음 로드될 때와 <code>a</code> 태그가 클릭될 때마다 <code>https://example.com/analytics</code>로 요청을 전송하도록 구성됩니다.

```js
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
```

[tip type="important"] <strong>중요 –</strong> 위의 방법은 AMP 페이지에서만 권장되며 AMP HTML 광고에는 권장되지 않습니다. 페이지의 콘텐츠보다 분석 우선순위가 낮으므로 클릭 손실을 방지하려면 브라우저 리디렉션을 사용하여 클릭을 추적하는 것이 좋습니다. [/tip]

AMP는 다음 트리거 구성을 지원합니다.

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">트리거 구성</th>
      <th data-th="Description">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"> <code>on</code>(필수)</td>
      <td data-th="Description">리스너로 보내는 이벤트입니다. 유효한 값은 <code>click</code>, <code>scroll</code>, <code>timer</code>, <code>visible</code>입니다.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>request</code>(필수)</td>
      <td data-th="Description">전송하는 요청의 이름입니다(<a href="deep_dive_analytics.md#what-data-gets-sent-requests-attribute">요청</a>에 지정되어 있음).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">최상위 구성에 정의된 <code>vars</code>를 재정의하거나 이 트리거에 고유한 <code>vars</code>를 지정하는데 사용되는 키-값 쌍을 포함하는 개체입니다(<a href="deep_dive_analytics.md#variable-substitution-ordering">변수 대체 순위</a> 참조).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>selector</code>(<code>on</code>이 <code>click</code>으로 설정된 경우 필수)</td>
      <td data-th="Description">추적해야 할 요소를 상세검색하는 데 사용되는 CSS 선택 도구입니다. <code>*</code> 값을 사용하여 모든 요소를 추적합니다. 이 구성은 <code>click</code> 트리거와 함께 사용됩니다. <a href="use_cases.md#tracking-page-clicks">페이지 클릭 수 추적</a> 및 <a href="use_cases.md#tracking-social-interactions">소셜 상호작용 추적</a>을 위해 선택 도구를 사용하는 방법을 알아보세요.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>scrollSpec</code>(<code>on</code>이 <code>scroll</code>로 설정된 경우 필수)</td>
      <td data-th="Description">페이지가 스크롤될 때 <code>scroll</code> 이벤트가 실행되는 조건을 제어합니다. 이 개체는 <code>verticalBoundaries</code> 및 <code>horizontalBoundaries</code>를 포함합니다. <code>scroll</code> 이벤트가 실행되려면 두 속성 중 적어도 하나가 필요합니다. 두 속성의 값은 스크롤 이벤트가 생성된 경계를 포함하는 숫자 배열이어야 합니다. <a href="use_cases.md#tracking-scrolling">스크롤 추적</a>에서 예시를 확인해 보세요.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>timerSpec</code>(<code>on</code>이 <code>timer</code>로 설정된 경우 필수)</td>
      <td data-th="Description"> <code>timer</code> 이벤트가 실행되는 시기를 제어합니다. 타이머가 즉시 트리거되며, 이후로는 지정된 간격에 따라 트리거됩니다. 이 구성은 <code>timer</code> 트리거와 함께 사용됩니다.</td>
    </tr>
  </tbody>
</table>

[tip type="important"] <strong>중요 –</strong> 우선순위가 낮은 구성의 트리거는 우선순위가 높은 구성의 동일한 이름을 가진 트리거에 의해 재정의됩니다([변수 대체 순위](../../../../documentation/components/reference/amp-analytics.md) 참조). [/tip]

### 데이터가 전송되는 방식: transport 속성

<code>transport</code> 속성은 요청을 전송하는 방법을 지정합니다. 기본적으로 다음 세 가지 방법이 사용됩니다.

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">전송 방법</th>
      <th data-th="Description">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description"> <a href="https://developer.mozilla.org/ko-KR/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a>을 사용하여 요청을 전송할 수 있음을 나타냅니다. 이 방법을 사용하면 사용자 인증 정보가 포함된 <code>POST</code> 요청과 빈 본문이 전송됩니다.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description"> <code>XMLHttpRequest</code>를 사용하여 요청을 전송할 수 있음을 나타냅니다. 이 방법을 사용하면 사용자 인증 정보가 포함된 <code>POST</code> 요청과 빈 본문이 전송됩니다.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description"> <code>Image</code> 태그를 생성하여 요청을 전송할 수 있음을 나타냅니다. 이 방법을 사용하면 <code>GET</code> 요청이 전송됩니다.</td>
    </tr>
  </tbody>
</table>

가장 높은 우선순위의 한 가지 전송 방법만 사용되는데 이 전송 방법은 사용 설정되어 허용되고 사용 가능해야 합니다. 우선순위는 <code>beacon</code> > <code>xhrpost</code> > <code>image</code> 순서입니다. 고객의 사용자 에이전트에서 방법을 지원하지 않으면 다음으로 우선순위가 높은 방법이 사용되도록 설정됩니다.

전송 옵션을 제한하고 싶을 경우에만 구성에 <code>transport</code> 속성을 포함합니다. 그렇지 않으면 요청을 중단할 수 있습니다.

하단 예시에서 <code>beacon</code> 및 <code>xhrpost</code>은 false로 지정되었으므로 해당 항목들은 <code>image</code>보다 우선순위를 갖더라도 사용되지 않습니다. 클라이언트 사용자 에이전트에서 <code>image</code> 메소드를 지원할 경우엔 사용됩니다. 그렇지 않은 경우 전송되는 요청은 없습니다.

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## 변수 대체 순위 <a name="variable-substitution-ordering"></a>

AMP는 우선순위에 따라 변수 값을 채웁니다.

1. 원격 구성(`config`를 통함)
2. `triggers` 내의 트리거 안에 중첩된 `vars`
3. [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 내에서 최상위 수준으로 중첩된 `vars`
4. 플랫폼 제공 값

이 예시에는 원격 구성과 트리거 및 플랫폼 수준에서 최상위로 정의된 변수가 있습니다.

```html
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
```

여러 위치에 동일한 `var`가 정의되어 있으면 변수 우선순위가 값을 한 번만 설정합니다. 따라서 위의 예시에서와 같이 원격 구성이 `account`를 UA-XXXXX-Y로 정의하면 다음과 같이 다양한 var 값을 가지게 됩니다.

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">값</th>
      <th data-th="Defined By" class="col-thirty">정의 주체</th>
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
      <td data-th="Value">내 홈페이지</td>
      <td data-th="Defined By">트리거</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">원격 구성</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">내 사용자</td>
      <td data-th="Defined By">트리거</td>
    </tr>
  </tbody>
</table>
