---
$title: amp-analytics
$category@: ads-analytics
teaser:
  text: AMP 문서에서 애널리틱스 데이터를 캡처합니다.
---


<!--
Copyright 2019 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



AMP 문서에서 애널리틱스 데이터를 캡처합니다.

<table>
  <tr>
    <td class="col-fourty"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>예</strong></td>
    <td>예제별 AMP의 <a href="https://ampbyexample.com/components/amp-analytics/">amp-analytics 예</a>를 참조하세요.</td>
  </tr>
</table>


## 공급업체 또는 사내로 애널리틱스를 전송하고 있습니까? <a name="sending-analytics-to-a-vendor-or-in-house"></a>

사이트에서 AMP 애널리틱스를 사용하기 전에, 타사 애널리틱스 도구를 사용하여 사용자 참여도를 분석할지 아니면 자체적인 사내 솔루션을 사용할지를 결정해야 합니다.

[tip type="read-on"]
[애널리틱스 구성](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md) 가이드에서 AMP 애널리틱스에 대해 자세히 알아보세요.
[/tip]

### 애널리틱스 공급업체로 데이터 전송 <a name="analytics-vendors"></a>

AMP 애널리틱스는 한 번 측정하여 여러 곳에 보고하도록 특별히 설계되었습니다. 하나 이상의 애널리틱스 공급업체와 이미 작업하고 있는 경우, 솔루션이 AMP와 통합되었는지 알아보려면 [애널리틱스 공급업체](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md)의 목록을 검토하세요.

통합된 AMP 애널리틱스 공급업체의 경우:

1. `<amp-analytics>` 태그에서 `type` 속성을 추가하고 값을 지정된 [공급업체](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md)로 설정합니다.
1. 어떤 데이터를 확보 및 추적할지 결정하고 구성 데이터에서 세부정보를 지정합니다. 애널리틱스 데이터를 확보하는 방법에 관한 정보는 공급업체의 도움말을 참조하세요.

애널리틱스 공급업체가 AMP와 통합되지 않은 경우 공급업체에 연락하여 지원을 요청하세요. 또한 AMP 프로젝트에서 공급업체의 추가를 요청하는 이슈를 생성할 것을 권장합니다. [AMP HTML에서 애널리틱스 도구 통합](../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md)도 참조하세요. 아니면 공급업체와 작업하여 데이터를 지정된 URL로 전송하세요. 아래의 [사내 데이터 전송](#sending-data-in-house) 섹션에서 자세히 알아보세요.

*예: 타사 애널리틱스 제공업체로 데이터 전송*

다음 예에서는 AMP와 통합을 완료한 타사 애널리틱스 제공업체인 Nielsen으로 애널리틱스 데이터가 전송됩니다. Nielsen에 대한 애널리틱스 데이터를 구성하는 방법에 대한 자세한 내용은 [Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API) 설명서에서 찾아볼 수 있습니다.

```html
<amp-analytics type="nielsen">
  <script type="application/json">
    {
      "vars": {
        "apid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "apv": "1.0",
        "apn": "내 AMP 웹사이트",
        "section": "엔터테인먼트",
        "segA": "음악",
        "segB": "뉴스",
        "segC": "Google AMP"
        }
      }
  </script>
</amp-analytics>
```

### 사내 데이터 전송 <a name="sending-data-in-house"></a>

사용자 참여도를 측정할 수 있는 자체적인 사내 솔루션이 있는 경우 데이터를 전송할 URL만 있으면 AMP 애널리틱스를 솔루션과 통합할 수 있습니다. 또한 다양한 URL로 데이터를 전송할 수 있습니다. 예를 들어, 한 URL로는 페이지 조회수 데이터를 전송하고, 다른 URL로는 소셜 참여도 데이터를 전송할 수 있습니다.

[tip type="note"]
AMP와 통합되지 않은 애널리틱스 공급업체와의 작업이 사내 솔루션에 포함된 경우, 공급업체와 협력하여 어떤 구성 정보가 필요한지 확인하세요.
[/tip]

특정 URL로 데이터를 전송하려면:

1. 어떤 데이터를 확보 및 추적할지 결정하고 [구성 데이터에서 세부정보를 지정](#specifying-configuration-data)합니다.
1. [`requests`](#requests) 구성 개체에서 추적할 요청 유형을 지정하고(예: 페이지 조회수, 트리거된 특정 이벤트) 추적 데이터를 전송할 URL도 지정합니다.

[tip type="note"]
애널리틱스 요청의 리퍼러 헤더에서 AMP URL을 처리할 때 `usqp` 매개변수를 제외하거나 무시하세요. 이 매개변수는 Google이 Google AMP 캐시에 대한 실험을 트리거하는 데 사용됩니다.
[/tip]

*예: URL로 데이터 전송*

다음은 페이지 조회수를 추적하는 간단한 예입니다.  페이지가 표시될 때마다 트리거 이벤트가 발생하고, 임의의 ID와 함께 정의된 URL로 페이지 조회수 데이터가 전송됩니다.

```html
<amp-analytics></amp-analytics></p>

<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
```

[tip type="success"]
일반적인 몇 가지 추적 사용 사례를 보려면(예: 페이지 조회수, 페이지 클릭수, 스크롤링 등) [애널리틱스: 사용 사례](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/use_cases.md)를 참조하세요.
[/tip]

## 구성 데이터 지정 <a name="specifying-configuration-data"></a>

`<amp-analytics>` 요소에서, 무엇을 측정할지와 애널리틱스 데이터를 어디로 보낼지에 대한 세부정보가 포함된 JSON 구성 개체를 지정합니다.

`<amp-analytics>`에 대한 구성 개체는 다음 형식을 사용합니다.

```javascript
{
  "requests": {
    request-name: request-value,
    ...
  },
  "vars": {
    var-name: var-value,
    ...
  },
  "extraUrlParams": {
    extraurlparam-name: extraurlparam-value,
    ...
  },
  "triggers": {
    trigger-name: trigger-object,
    ...
  },
  "transport": {
    "beacon": *boolean*,
    "xhrpost": *boolean*,
    "image": *boolean*,
  }
}
```

### 인라인 또는 원격 구성 <a name="inline-or-remote-configuration"></a>

구성 데이터는 인라인으로 지정할 수도 있고 `config` 속성에서 URL을 지정하여 원격으로 가져올 수도 있습니다. 또한, `type` 속성을 사용하여 인기 있는 애널리틱스 공급업체에 대한 내장된 구성을 선택할 수도 있습니다.

둘 이상의 이러한 소스에서 온 구성 데이터를 사용하는 경우 구성 개체(변수, 요청 및 트리거)가 다음과 같은 방식으로 병합됩니다.

1. 원격 구성이 인라인 구성보다 우선합니다.
1. 인라인 구성이 공급업체 구성보다 우선합니다.

#### 원격 구성 로드 <a name="loading-remote-configuration"></a>

원격 구성을 로드하려면 `<amp-analytics>` 요소에서 구성 데이터에 대한 `config` 속성 및 URL을 지정합니다. 지정된 URL은 HTTPS 체계를 사용해야 합니다. URL에는 [AMP URL 변수](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)가 포함될 수 있습니다. 쿠키에 액세스하려면 [`data-credentials`](#data-credentials) 속성을 참조하세요. 응답은 [AMP CORS 보안 지침](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)을 따라야 합니다.

이 예에서는 지정된 URL에서 구성 데이터를 로드하기 위해 `config` 속성을 지정합니다.

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

#### 구성 재작성기 <a name="configuration-rewriter"></a>

구성 재작성기는 애널리틱스 제공업체가 제공된 구성을 동적으로 재작성할 수 있도록 설계되었습니다. 이는 원격 구성 기능과 유사하지만, 사용자가 제공한 구성을 서버에 대한 요청에 추가로 포함합니다. 현재 이 기능은 애널리틱스 공급업체에서만 사용할 수 있습니다.

애널리틱스 공급업체는 서버 url을 사용하여 configRewriter 속성을 지정합니다.
```js
export const VENDOR_ANALYTICS_CONFIG = {
  ...
  'configRewriter': {
    'url': 'https://www.vendor.com/amp-config-rewriter',
  },
  ...
}
```

런타임은 제공된 원격 구성과 병합된 인라인 구성을 포함하는 요청을 공급업체가 지정한 configRewriter 엔드포인트로 전송합니다. 공급업체에서는 구조의 이 데이터 서버 측을 사용하며 새로 재작성된 구성을 반영합니다.

런타임은 제공된 모든 구성을 병합하여 가장 높은 우선순위에서 가장 낮은 우선순위로 최종 구성을 결정합니다.

1. 재작성된 구성
1. 인라인 구성
1. 공급업체가 정의한 구성

##### 변수 그룹 <a name="variable-groups"></a>

애널리틱스 제공업체는 변수 그룹 기능을 사용하여, 사용자가 쉽게 사용할 수 있도록 사전 정의된 변수 집합을 그룹화할 수 있습니다. 이러한 변수는 해석 과정을 거친 후 지정된 `configRewriter` 엔드포인트로 전송됩니다.

애널리틱스 제공업체는 이 기능을 사용하도록 설정하려면 `configRewriter` 구성 내에 새 `varGroups` 개체를 만들어야 합니다. 그런 다음 게시자는 애널리틱스 구성에서 사용하도록 설정할, 명명된 애널리틱스 공급업체가 만든 `varGroups`를 포함할 수 있습니다. [AMP HTML 대체 가이드](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)에서 지원되는 모든 변수를 사용할 수 있습니다. *중요사항*: ${varName} 변형은 작동하지 않습니다.

예를 들어, 다음과 같은 구성을 가지고 있는 공급업체가 있을 수 있습니다.
```js
// 이것은 공급업체가 미리 정의한 것입니다.
export const VENDOR_ANALYTICS_CONFIG = {
  ...
  'configRewriter': {
    'url': 'https://www.vendor.com/amp-config-rewriter',
    'varGroups' : {
      'group1': {
        'referrer': 'DOCUMENT_REFERRER',
        'source': 'SOURCE_URL',
      'group2': {
        'title': 'TITLE',
      },
    },
  },
},
  ...
}
```

제공업체의 `<amp-analytics>` 구성 내 지정된 `varGroups`에 대해 `{enabled: true}`를 포함하여 변수 그룹이 사용되도록 지정할 수 있습니다. `enabled`는 예약된 키워드이므로 변수 이름으로 사용할 수 없습니다.

다음의 예에서는 `group1`과 `group2`가 모두 사용하도록 설정되었습니다. 구체적으로 사용하도록 설정되지 않은 그룹은 무시됩니다. 이제 런타임은 사용하도록 설정된 이 모든 변수를 해석한 다음 구성 재작성기 URL로 전송할 단일 `configRewriter.vars` 개체로 병합합니다.

```html
  /* 게시자 페이지에 포함됨 */
  <amp-analytics type="myVendor" id="myVendor" data-credentials="include">
    <script type="application/json">
    {
      "configRewriter": {
        "varGroups": {
          "group1": {
            "enabled": true
          },
          "group2": {
            "enabled": true
          }
        }
      }
    }
    </script>
  </amp-analytics>
```

이 예에서 요청 본문은 다음과 같을 수 있습니다.
```json
  /* 구성 재작성기 서버로 전송됨. */
  "configRewriter": {
    "vars": {
      "referrer": "https://www.example.com",
      "source": "https://www.amp.dev",
      "title": "Cool Amp Tips"
    }
  }
```

### 구성 데이터 개체 <a name="configuration-data-objects"></a>

#### 요청 <a name="requests"></a>

`requests` 구성 개체는 데이터를 애널리틱스 플랫폼으로 전송하는 데 사용되는 URL은 물론 요청 동작의 일괄 처리 또는 보고를 위한 URL도 지정합니다. `request-name`은 특정 이벤트(예: `페이지 조회수`, `이벤트` 등)에 대한 응답으로 어떤 요청을 전송해야 할지를 지정합니다. `request-value`는 https URL을 포함하며, 다른 요청이나 변수를 참조하는 자리표시자 토큰을 포함할 수 있습니다. `request-value`는 또한 선택적 요청 구성을 포함하는 개체일 수 있습니다.

##### 요청 구성 <a name="request-configs"></a>

개체로 요청을 정의하기 위한 속성은 다음과 같습니다.

- `baseUrl`: 요청의 URL을 정의합니다(필수사항).
- `reportWindow`: 요청 보고를 중지할 시간(초)을 지정하기 위한 선택적인 속성입니다. `important: true`의 트리거는 최대 보고 기간 제약 조건을 재정의합니다.

이 예에서는 모든 요청이 유효합니다.

```javascript
"requests": {
  "base": "https://example.com/analytics?a=${account}&u=${canonicalUrl}&t=${title}",
  "pageview": {
    "baseUrl": "${base}&type=pageview"
  },
  "event": {
    "baseUrl": "${base}&type=event&eventId=${eventId}",
    "batchInterval": 5,
    "reportWindow" : 30
  }
}
```

일부 애널리틱스 제공업체는 이미 제공된 구성을 가지고 있으며, 이 구성은 `type` 속성을 통해 사용할 수 있습니다. 애널리틱스 제공업체를 사용하는 경우 요청 정보를 포함하지 않아도 될 수 있습니다. 요청 구성 여부와 방법에 대해 알아보려면 공급업체 설명서를 참조하세요.

##### 구성 일괄 처리 <a name="batching-configs"></a>

요청 핑의 수를 줄이려면 요청 구성에서 일괄 처리 동작을 지정할 수 있습니다. 동일한 요청을 사용하는 `triggers`의 [`extraUrlParams`](#extra-url-params)가 요청의 `baseUrl`에 추가됩니다.

일괄 처리 속성은 다음과 같습니다.

- `batchInterval`: 이 속성은 일괄 처리 대기열에서 요청 핑을 플러시할 시간 간격(초)을 지정합니다. `batchInterval`은 숫자 또는 숫자 배열일 수 있습니다(최소 시간 간격은 200ms). 요청은 배열의 모든 값을 고려한 다음 배열의 끝에 도달하면 마지막 간격 값(또는 단일 값)을 반복합니다.

예를 들어 다음 구성은 `https://example.com/analytics?rc=1&rc=2`와 같이 하나의 샘플 요청 핑으로 2초마다 단일 요청 핑을 보냅니다.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": 2,
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

다음 구성은 1초 후에 첫 번째 요청 핑을 보내고 그 이후 3초마다 요청을 보냅니다. 첫 번째 요청 핑은 `https://example.com/analytics?rc=1`과 같고, 두 번째 요청 핑은 `https://example.com/analytics?rc=2&rc=3&rc=4`와 같습니다.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": [1, 3],
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

#### 변수 <a name="vars"></a>

`amp-analytics` 구성요소는 요청에 사용될 수 있는 많은 기본 변수를 정의합니다. 이러한 모든 변수 목록은 [`amp-analytics` 변수 가이드](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md)에서 이용할 수 있습니다. [AMP HTML 대체 가이드](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)에서 지원되는 모든 변수도 지원됩니다.

`vars` 구성 개체를 사용하여 새로운 키-값 쌍을 정의하거나 `request` 값에서 참조할 수 있는 기존 변수를 재정의할 수 있습니다. 새로운 변수는 일반적으로 게시자 관련 정보를 지정하는 데 사용됩니다.  배열은 쉼표 구분 기호를 유지하는 한편 별도로 URL을 인코딩해야 하는 경우 값 목록을 지정하는 데 사용할 수 있습니다.

```javascript
"vars": {
  "account": "ABC123",
  "countryCode": "tr",
  "tags": ["Swift,Jonathan", "Gulliver's Travels"]
}
```

#### 추가 URL 매개변수 <a name="extra-url-params"></a>

`extraUrlParams` 구성 개체는 요청에 포함할 추가 매개변수를 지정합니다. 기본적으로 추가 URL 매개변수는 일반적인 "&amp;foo=baz" 규칙을 통해 요청 URL의 쿼리 문자열에 추가됩니다.

다음은 요청에 `&a=1&b=2&c=3`을 추가하는 예입니다.

```javascript
"extraUrlParams": {
  "a": "1",
  "b": "2",
  "c": "3"
}
```

`useBody`를 사용할 수 있고 `beacon` 또는 `xhrpost` 전송 메서드를 통해 요청이 전송되는 경우, URL 대신 요청 본문을 통해 `extraUrlParams`를 전송할 수 있습니다. 이 경우 매개변수는 URL에 인코딩되거나 병합되지 않습니다. 자세한 내용은 [추가 URL 매개변수에 본문 사용](#use-body-for-extra-url-params)을 참조하세요.

`extraUrlParamsReplaceMap` 속성은 `extraUrlParams` 구성의 키를 사전 처리하기 위해 `String.replace()`에 대한 매개변수 역할을 하는 키와 값의 맵을 지정합니다. 예를 들어 `extraUrlParams` 구성이 `"page.title": "The title of my page"`를 정의하고 `extraUrlParamsReplaceMap`이 `"page.": "_p_"`를 정의하면 `&_p_title=The%20title%20of%20my%20page%20`이 요청에 추가됩니다.

`extraUrlParamsReplaceMap`은 `extraUrlParams`를 사용하는 데 필요하지 않습니다. `extraUrlParamsReplaceMap`이 정의되어 있지 않으면 문자열 대체가 발생하지 않으며 `extraUrlParams`에 정의된 문자열이 있는 그대로 사용됩니다.

`useBody`를 사용할 수 있고 `beacon` 또는 `xhrpost` 전송 메서드를 통해 요청이 전송되는 경우, `extraUrlParamsReplaceMap` 문자열 대체는 `extraUrlParams`의 최상위 키에서만 수행됩니다.

#### 트리거 <a name="triggers"></a>

`triggers` 구성 개체는 애널리틱스 요청을 언제 전송해야 할지를 설명합니다. `triggers` 속성은 trigger-name 및 trigger-configuration의 키-값 쌍을 포함합니다. 트리거 이름에는 영숫자 문자(a-z, A-Z, 0-9)로 구성된 문자열을 사용할 수 있습니다. 우선순위가 낮은 구성의 트리거는 우선순위가 높은 구성의 동일한 이름을 가진 트리거에 의해 재정의됩니다.

* `on`(필수사항) 수신 대기할 이벤트. 유효한 값은 `render-start`, `ini-load`, `click`, `scroll`, `timer`, `visible`, `hidden`, `user-error`, [`access-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md) 및 [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md)입니다.
* `request`(필수사항) 전송할 요청의 이름(`requests` 섹션에 지정된 대로).
* `vars` 최상위 구성에 정의된 `vars`를 재정의하거나 이 트리거에 대한 고유한 vars를 지정하는 데 사용되는 키-값 쌍을 포함하는 개체.
* `important`는 일괄 처리 동작 또는 보고서 창을 지원하는 요청과 작동하도록 지정할 수 있습니다. `important`를 `true`로 설정하면 일괄 처리된 요청 대기열을 일부 특정 트리거로 플러시하는 데 도움이 될 수 있습니다. 이 경우 중요한 트리거 이벤트를 잃지 않고 요청 핑 수를 줄일 수 있습니다. `important`를 `true`로 설정하면 또한 요청의 `reportWindow` 값을 재정의하여 중요한 요청 핑을 전송할 수 있습니다.
* `selector` 및 `selectionMethod`는 `click` 및 `visible`과 같은 일부 트리거에 대해 지정할 수 있습니다. 자세한 내용은 [요소 선택기](#element-selector)를 참조하세요.
* `scrollSpec`(`on`이 `scroll`로 설정된 경우 필수사항) 이 구성은 `scroll` 트리거와 함께 사용됩니다. 자세한 내용은 아래에서 확인하실 수 있습니다.
* `timerSpec`(`on`이 `timer`로 설정된 경우 필수사항) 이 구성은 `timer` 트리거와 함께 사용됩니다. 자세한 내용은 아래에서 확인하실 수 있습니다.
* `sampleSpec` 이 개체는 요청을 전송하기 전에 샘플링하는 방법을 정의하는 데 사용됩니다. 이 설정을 사용하면 무작위 입력 또는 다른 플랫폼 지원 변수를 기반으로 샘플링할 수 있습니다. 이 개체에는 해시를 생성하는 데 사용되는 입력 및 해시가 충족해야 할 임곗값을 지정하기 위한 구성이 포함되어 있습니다.
    * `sampleOn` 이 문자열 템플릿은 플랫폼 변수를 채움으로써 확장되며, 아래의 임곗값에 설명된 샘플링 로직을 위한 숫자를 생성하기 위해 해시됩니다.
    * `threshold` 이 구성은 특정 기준을 충족하지 않는 요청을 필터링하는 데 사용됩니다. 요청을 애널리틱스 공급업체에 전달하려면 다음 로직이 true `HASH(sampleOn) < threshold`가 되어야 합니다.</li>
* `videoSpec`(`on`이 `video-*`로 설정된 경우 사용됨) 이 구성은 [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md) 트리거와 함께 사용됩니다.

예를 들면, 다음 구성을 사용하여 무작위 입력을 기반으로 요청의 50%를 샘플링하거나 클라이언트 ID를 기반으로 1%를 샘플링할 수 있습니다.

```javascript
'triggers': {
  'sampledOnRandom': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${random}',
      'threshold': 50,
    },
  },
  'sampledOnClientId': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${clientId(cookieName)}',
      'threshold': 1,
    },
  },
},
```

##### 요소 선택기 <a name="element-selector"></a>

`click` 및 `visible`과 같은 일부 트리거에서는 선택기 속성을 사용하여 단일 요소 또는 요소 모음을 지정할 수 있습니다. 각 트리거는 선택기를 일치하는 모든 요소에 적용할지 첫 번째 요소에 적용할지, 모든 요소에 대해 일치를 확인할지 AMP 요소에 대해서만 확인할지 등 서로 다른 제한과 해석을 선택한 요소에 적용할 수 있습니다. 자세한 내용은 관련된 각 트리거에 대한 설명서를 참조하세요.

선택기 속성은 다음과 같습니다.

- `selector` 이 속성은 CSS/DOM 쿼리를 사용하여 요소 또는 요소 모음을 찾는 데 사용됩니다. 요소가 어떻게 일치하는가에 대한 의미는 `selectionMethod`를 사용하여 변경할 수 있습니다. 이 속성의 값은 다음 중 하나일 수 있습니다.
    - 유효한 CSS 선택기. 예: `#ad1` 또는 `amp-ad`.
    - `:root` - 문서 루트와 일치하는 특별한 선택기.
- `selectionMethod` 이 속성을 지정할 경우 값은 `scope` 또는 `closest` 중 하나가 됩니다. `scope`인 경우 `amp-analytics` 태그의 상위 요소 내에서 요소를 선택할 수 있습니다. `closest`는 지정된 선택기를 충족하는 `amp-analytics` 태그와 가장 가까운 상위 요소를 검색합니다. 기본값은 `scope`입니다.

##### 렌더 시작 트리거 삽입 <a name="embed-render-start-trigger"></a>

iframe에 다른 문서(예: 광고)를 삽입하는 AMP 요소는 렌더 시작 이벤트(`"on": "render-start"`)를 보고할 수 있습니다. 일반적으로 이 이벤트는 삽입된 문서의 렌더링이 시작되었음을 확인하는 즉시 발생합니다. 특정 AMP 요소가 이 이벤트를 발생시키는지 확인하려면 설명서를 참조하세요.

삽입 요소에 대한 트리거는 요소의 삽입을 가리키는 [`selector`](#element-selector)를 포함해야 합니다.
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request",
    "selector": "#embed1"
  }
}
```

렌더 시작 이벤트는 문서 자체에 의해서도 발생되며 다음과 같이 구성할 수 있습니다.
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request"
  }
}
```

##### 초기 로드 트리거 <a name="initial-load-trigger"></a>

초기 로드 이벤트(`"on": "ini-load"`)는 AMP 요소 또는 AMP 문서의 초기 내용이 로드될 때 트리거됩니다.

'초기 로드'는 컨테이너 및 초기 크기와의 관계로 정의됩니다.
구체적인 내용은 다음과 같습니다.

- 문서의 경우: 첫 번째 표시 영역의 모든 요소.
- 삽입 요소의 경우: 삽입 요소의 초기 크기 내에 배치된 삽입 문서의 모든 콘텐츠 요소.
- 간단한 AMP 요소의 경우(예: `amp-img`): 리소스 자체(예: 이미지 또는 동영상).

삽입 또는 AMP 요소의 트리거에는 요소를 가리키는 [`selector`](#element-selector)를 포함해야 합니다.
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request",
    "selector": "#embed1"
  }
}
```

초기 로드 이벤트는 문서 자체에 의해서도 발생하며 다음과 같이 구성할 수 있습니다.
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request"
  }
}
```

##### 페이지 및 요소 가시성 트리거 <a name="page-and-element-visibility-trigger"></a>

페이지가 표시될 때 요청이 실행되도록 하려면 페이지 가시성 트리거(`"on": "visible"`)를 사용합니다. 이 트리거의 실행은 `visibilitySpec`을 사용하여 구성할 수 있습니다.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
  }
}
```

요소 가시성 트리거는 [`selector`](#element-selector)를 사용하여 모든 AMP 요소 또는 문서 루트에 대해 구성할 수 있습니다. 지정된 요소가 `visibilitySpec`을 사용하여 맞춤화할 수 있는 가시성 매개변수와 일치할 때 트리거가 발생합니다.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "elementview",
    "selector": "#ad1",
    "visibilitySpec": {/* 선택적 가시성 사양 */}
  }
}
```

모음이 아닌 단일 요소를 지정할 경우에만 selector를 사용할 수 있습니다. 요소는 [AMP 확장 요소](https://github.com/ampproject/amphtml/blob/main/spec/amp-tag-addendum.md#amp-specific-tags) 또는 문서 루트일 수 있습니다.

요소 가시성 트리거는 요소 가시성을 추적하기 전에 `visibilitySpec`의 `waitFor` 속성에 의해 지정된 신호를 기다립니다. `waitFor`를 지정하지 않을 경우 요소의 [`ini-load`](#initial-load-trigger) 신호를 기다립니다. 자세한 내용은 `waitFor` 문서를 참조하세요.
`reportWhen`이 지정된 경우 트리거는 이벤트를 전송하기 전에 신호를 기다립니다. 이는 예를 들어 페이지가 닫힐 때 애널리틱스 이벤트를 보내는 데 유용합니다.

##### 오류 트리거 <a name="error-trigger"></a>

페이지 작성자 때문에 또는 페이지 게시에 사용된 소프트웨어 때문에 오류가 발생할 때 사용자 오류 이벤트(`"on": "user-error"`)가 트리거됩니다. 여기에는 AMP 구성요소의 구성 오류, 잘못 구성된 광고 또는 실패한 어설션이 포함됩니다(이에 제한되지 않음). 사용자 오류는 개발자 콘솔에서도 보고됩니다.

```javascript
"triggers": {
  "userError": {
    "on": "user-error",
     "request": "error"
  }
}
```

참고: 페이지와 관련이 없는 A4A iframe 삽입에서 여전히 오류를 보고하는 [알려진 문제](https://github.com/ampproject/amphtml/issues/10891)가 있습니다.

**<a id="visibility-spec"></a>가시성 사양**

`visibilitySpec`은 `visible` 또는 `hidden` 트리거에 적용하여, 발생 시 변경할 수 있는 조건 및 속성의 집합입니다. 여러 속성이 지정된 경우, 요청이 발생하려면 속성값이 모두 true여야 합니다. `visibilitySpec`에서 지원되는 구성 속성은 다음과 같습니다.

- `waitFor`: 이 속성은 가시성을 추적하기 전에 가시성 트리거가 특정 신호를 기다려야 함을 나타냅니다. 지원 값은 `none`, `ini-load` 및 `render-start`입니다. `waitFor`가 정의되지 않은 경우, selector가 지정되어 있으면 기본값은 [`ini-load`](#initial-load-trigger)이고 그렇지 않으면 `none`입니다.
- `reportWhen`: 이 속성은 트리거를 전송하기 전에 가시성 트리거가 특정 신호를 기다려야 함을 나타냅니다. 유일한 지원 값은 `documentExit`입니다. 동일한 visibilitySpec에서 `reportWhen`과 `repeat`를 모두 사용하지 못할 수 있습니다. `reportWhen`이 지정된 경우 가시성 요구사항이 해당 시점에 충족되지 않거나 이전에 충족되지 않았더라도 신호 발생 시 보고서가 전송됩니다. 관련 변수(`totalVisibleTime`, etc.)는 이 `visibilitySpec`의 가시성 요구사항에 따라 채워집니다.
- `continuousTimeMin` 및 `continuousTimeMax`: 이러한 속성은 지정된 최소 시간과 최대 시간 사이의 연속된 시간 동안 요소(의 일부)가 표시 영역에 머문 경우 요청이 실행되어야 함을 나타냅니다. 시간은 밀리초 단위로 표시됩니다. 지정되지 않은 경우 `continuousTimeMin`의 기본값은 0입니다.
- `totalTimeMin` 및 `totalTimeMax`: 이러한 속성은 지정된 최소 시간과 최대 시간 사이의 총 시간 동안 요소(의 일부)가 표시 영역에 머문 경우 요청이 실행되어야 함을 나타냅니다. 시간은 밀리초 단위로 표시됩니다. 지정되지 않은 경우 `totalTimeMin`의 기본값은 0입니다.
- `visiblePercentageMin` 및 `visiblePercentageMax`: 이러한 속성은 표시 영역에 표시되는 요소의 비율이 지정된 최소 백분율과 최대 백분율 사이에 있는 경우 요청이 실행되어야 함을 나타냅니다. 유효한 백분율 값은 0과 100 사이입니다. 상한과 하한이 모두 0 또는 100으로 설정되지 않은 경우, 상한(`visiblePercentageMax`)은 포함되고 하한(`visiblePercentageMin`)은 제외됩니다. 둘 다 0으로 설정되었다면 요소가 보이지 않을 때 트리거가 실행됩니다. 둘 다 100으로 설정되었다면 요소가 완전히 보일 때 트리거가 실행됩니다. 이러한 속성을 다른 타이밍 관련 속성과 함께 정의하면, 이러한 속성이 충족되는 시간만 계산됩니다. `visiblePercentageMin`과 `visiblePercentageMax`의 기본값은 각각 0과 100입니다.
- `repeat`: 이 속성을 `true`로 설정하면 `visibilitySpec` 조건이 충족될 때마다 트리거가 실행됩니다. 다음 예의 경우, 보기에서 요소를 51%로 스크롤한 다음 49%로 스크롤하고 다시 51%로 스크롤하면 트리거가 두 번 실행됩니다. 그러나 `repeat`가 `false`이면 트리거가 한 번만 실행됩니다. `repeat`의 기본값은 `false`입니다. 동일한 visibilitySpec에는 `reportWhen` 및 `repeat`를 모두 사용하지 못할 수 있습니다.

```javascript
visibilitySpec: {
  visiblePercentageMin: 50,
  repeat: true,
  }
```

`visiblePercentageMin` 및 `visiblePercentageMax`에서만 차이가 있는 여러 `visibilitySpec` 인스턴스를 만들기 위한 간단한 방법으로 `visiblePercentageThresholds`를 사용할 수 있습니다. 예를 들어 다음은 동일합니다.

```javascript
// visiblePercentageMin 및 visiblePercentageMax에서만 차이가 있는 visibilitySpec의 두 트리거:
"triggers": {
  "pageView_30_to_40": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 30,
      "visiblePercentageMax": 40,
      "continuousTimeMin": 1000,
    }
  }

  "pageView_40_to_50": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 40,
      "visiblePercentageMax": 50,
      "continuousTimeMin": 1000,
    }
  }
}

// 위의 둘과 같은 단일 트리거:
"triggers": {
  "pageView": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageThresholds": [[30, 40], [40, 50]],
      "continuousTimeMin": 1000,
    }
  }
}
```

위의 조건 외에도 `visibilitySpec`은 [여기](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#visibility-variables)에 설명된 특정 변수를 사용하도록 설정합니다.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "waitFor": "ini-load",
      "reportWhen": "documentExit",
      "visiblePercentageMin": 20,
      "totalTimeMin": 500,
      "continuousTimeMin": 200
    }
  }
}
```

트리거의 일부로 제공된 변수 외에도 [데이터 속성으로서의 변수](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute)를 추가로 지정하거나 재정의할 수 있습니다. 이러한 데이터 속성은(사용되는 경우) [`selector`](#element-selector)로서 지정된 요소의 일부여야 합니다.

##### 클릭 트리거 <a name="click-trigger"></a>

지정된 요소를 클릭할 때 요청이 실행되도록 하려면 클릭 트리거(`"on": "click"`)를 사용합니다. 어떤 요소가 이 요청을 실행할지를 제어하려면 [`selector`](#element-selector)를 사용합니다. 지정된 selector와 일치하는 모든 요소에 대해 트리거가 실행됩니다.

```javascript
"vars": {
  "id1": "#socialButtonId",
  "id2": ".shareButtonClass"
},
"triggers": {
  "anchorClicks": {
    "on": "click",
    "selector": "a, ${id1}, ${id2}",
    "request": "event",
    "vars": {
      "eventId": 128
    }
  }
}
```

트리거의 일부로 제공된 변수 외에도 [데이터 속성으로서의 변수](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute)를 추가로 지정하거나 재정의할 수 있습니다. 이러한 데이터 속성은(사용되는 경우) `selector`로서 지정된 요소의 일부여야 합니다.

##### 스크롤 트리거 <a name="scroll-trigger"></a>

페이지를 스크롤할 때 특정 조건에서 요청이 실행되도록 하려면 스크롤 트리거(`"on": "scroll"`)를 사용합니다. 이 트리거는 요청 전송을 트리거한 경계를 나타내는 [특별한 변수](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#interaction)를 제공합니다. 실행 시기를 제어하려면 `scrollSpec`을 사용합니다

- `scrollSpec` 이 개체에는 `verticalBoundaries` 및 `horizontalBoundaries`를 포함할 수 있습니다. 스크롤 이벤트가 발생하려면 적어도 두 가지 속성 중 하나가 필요합니다. 두 속성의 값은 스크롤 이벤트가 생성된 경계를 포함하는 숫자 배열이어야 합니다. 예를 들어 다음 코드 스니펫에서는 페이지가 세로로 25%, 50% 및 90% 스크롤될 때 스크롤 이벤트가 발생합니다. 또한 페이지가 스크롤 너비의 90%까지 가로로 스크롤될 때도 이벤트가 발생합니다. 페이지 실행을 유지하기 위해 스크롤 경계가 가장 가까운 `5`의 배수로 반올림됩니다.

```javascript
"triggers": {
  "scrollPings": {
    "on": "scroll",
    "scrollSpec": {
      "verticalBoundaries": [25, 50, 90],
      "horizontalBoundaries": [90]
    },
    "request": "event"
  }
}
```

##### 타이머 트리거 <a name="timer-trigger"></a>

일정한 간격으로 요청을 실행하려면 타이머 트리거(`"on": "timer"`)를 사용합니다. 발생 시기를 제어하려면 `timerSpec`을 사용합니다

- `timerSpec` `timer` 유형의 트리거에 대한 사양. `startSpec`을 지정하지 않으면 타이머가 즉시 트리거되고(기본적으로 설정 해제 가능) 그 이후에는 지정된 간격으로 트리거됩니다.
    - `interval` 타이머 간격 시간(초).
    - `maxTimerLength` 타이머를 실행할 최대 지속 시간(초). `maxTimerLength`에 도달하면 추가 요청이 트리거됩니다. 기본값은 2시간입니다. `stopSpec`이 있지만 maxTimerLength가 지정되지 않은 경우 기본값은 무한대입니다.
    - `immediate` 타이머를 즉시 트리거하거나 트리거하지 않습니다. 부울 형식이고 기본값은 true입니다.

```javascript
"triggers": {
  "pageTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 10,
      "maxTimerLength": 600
    },
    "request": "pagetime"
  }
}
```

사용자 이벤트가 타이머를 사용하는 시기를 구성하려면 다음을 이용합니다.

- `startSpec` 타이머가 시작되는 시기의 트리거에 대한 사양. 특정 이벤트를 추적하려면 `on` 및 `selector`의 값을 사용합니다. `startSpec`은 있지만 `stopSpec`은 없는 구성은 `maxTimerLength`에 도달한 이후에야 중지됩니다.
- `stopSpec` 타이머가 중지하는 시기의 트리거에 대한 사양. `stopSpec`은 있지만 `startSpec`은 없는 구성은 즉시 시작되지만 지정된 이벤트에서만 중지됩니다.

```javascript
"triggers": {
  "videoPlayTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 5,
      "startSpec": {
        "on": "video-play",
        "selector": "amp-video"
      },
      "stopSpec": {
        "on": "video-pause",
        "selector": "amp-video"
      }
    },
    "request": "videoRequest"
  }
}
```

중첩된 타이머 트리거 생성에 대한 자세한 내용은 [트리거](#triggers)에 대한 사양을 참조하세요. 타이머 트리거를 사용하여 타이머를 시작하거나 중지하는 것은 허용되지 않습니다.

##### 숨겨진 트리거 <a name="hidden-trigger"></a>

페이지가 숨겨질 때 요청이 실행되도록 하려면 숨겨진 트리거(`"on": "hidden"`)를 사용합니다.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
  }
}
```

가시성 지속 시간 조건이 충족될 경우에만 요청이 실행되도록 하려면 [`visibilitySpec`](#visibility-spec)을 포함할 수 있습니다.
```json
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
    "visibilitySpec": {
      "selector": "#anim-id",
      "visiblePercentageMin": 20,
      "totalTimeMin": 3000,
    }
  }
}
```
위 구성은 다음과 같이 해석할 수 있습니다.

<blockquote>
페이지가 숨겨질 때 #anim-id 요소가 총 3초 넘게 표시된 경우(표시 영역의 20% 초과) 요청을 실행합니다.
</blockquote>

##### 액세스 트리거 <a name="access-triggers"></a>

AMP 액세스 시스템은 액세스 흐름의 여러 상태에 대해 여러 이벤트를 실행합니다. 액세스 트리거(`"on": "access-*"`)에 대한 자세한 내용은 [AMP 액세스 및 애널리틱스](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md)를 참조하세요.

#### 동영상 애널리틱스 트리거 <a name="video-analytics-triggers"></a>

동영상 애널리틱스는 게시지가 동영상의 수명 주기 동안 발생하는 여러 이벤트를 추적하기 위해 사용할 수 있는 여러 트리거(`"on": "video-*"`)를 제공합니다. 자세한 내용은 [AMP 동영상 애널리틱스](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md)에서 확인할 수 있습니다.

#### 전송 <a name="transport"></a>

`transport` 구성 개체는 요청을 전송하는 방법을 지정합니다. 이 값은 어떤 전송 방법이 허용되는지를 나타내는 입력란이 있는 개체입니다.

* `beacon` [`navigator.sendBeacon`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)을 사용하여 요청을 전송할 수 있음을 나타내며, 사용자 인증 정보가 있는 POST 요청을 전송합니다. `useBody`가 true가 아니면 본문이 비어 있는 상태로 요청이 전송됩니다. `useBody`에 대한 자세한 내용은 [추가 URL 매개변수에 본문 사용](#use-body-for-extra-url-params)을 참조하세요.
* `xhrpost` `XMLHttpRequest`를 사용하여 요청을 전송할 수 있음을 나타내며, 사용자 인증 정보가 있는 POST 요청을 전송합니다. `useBody`가 true가 아니면 본문이 비어 있는 상태로 요청이 전송됩니다. `useBody`에 대한 자세한 내용은 [추가 URL 매개변수에 본문 사용](#use-body-for-extra-url-params)을 참조하세요.
* `image` `Image` 태그를 생성하여 요청을 전송할 수 있음을 나타냅니다. 이 경우 GET 요청이 전송됩니다. 빈 응답 또는 요청 실패로 인한 콘솔 경고를 표시하지 않으려면 `"image": {"suppressWarnings": true}`로 설정합니다.

MRC 공인 공급업체는 iframe-transport-vendors.js에 URL 문자열을 추가하여 네 번째 전송 메커니즘인 'iframe 전송'을 활용할 수 있습니다. 이는 `src` 속성을 이 URL로 설정하여 iframe을 만들어야 하며, 요청이 `window.postMessage()`를 통해 이 iframe으로 전송될 것임을 나타냅니다. 이 경우 요청은 제대로 갖춰진 URL일 필요가 없습니다. `iframe`은 `iframe-transport-vendors.js`에서만 지정할 수 있으며, `amp-analytics` 태그에서 인라인으로 지정하거나 원격 구성을 통해 지정할 수 없습니다. 또한, 공급업체 프레임은 amp-ad-exit에서 사용할 응답을 전송할 수 있습니다. [analytics-iframe-transport-remote-frame.html](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) 및 [fake_amp_ad_with_iframe_transport.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html)을 참조하세요. 전자는 {'collected-data': 'abc'}의 응답 JSON 개체를 전송하고, 후자는 개체를 사용하여 finalUrl의 'bar_'을 'abc'로 대체합니다.

위의 전송 방법 중 둘 이상이 사용되는 경우 우선순위는 `iframe` &gt; `beacon` &gt; `xhrpost` &gt; `image`입니다. 하나의 전송 방법만 사용되는데, 이것이 사용 가능하며 허용되는 최고 우선순위가 됩니다. 클라이언트의 사용자 에이전트가 방법을 지원하지 않으면 다음으로 우선순위가 높은 방법이 사용됩니다. 기본적으로 위의 네 가지 방법이 모두 사용 설정됩니다.

아래의 예에서 `iframe` URL은 지정되지 않았고 `beacon` 및 `xhrpost`는 `false`로 설정되었으므로 `image`보다 우선순위가 높아도 사용되지 않습니다. `image`는 기본적으로 `true`로 설정되지만 여기에서는 명시적으로 선언되었습니다. 클라이언트의 사용자 에이전트가 `image` 방법을 지원하면 이 방법이 사용되고, 지원하지 않으면 요청이 전송되지 않습니다.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true
}
```

자세한 내용은 [iframe 전송 클라이언트 API 구현 예](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) 및 [iframe 통합 예 페이지](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport.amp.html)를 참조하세요. 이 예에서는 `amp-analytics` 태그가 포함된 [가짜 광고](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html)를 로드합니다. 가짜 광고 콘텐츠에는 수행해야 할 몇 가지 추가 구성 지침이 포함되어 있습니다.

##### 추가 URL 매개변수에 본문 사용 <a name="use-body-for-extra-url-params"></a>

`useBody` 구성 옵션은 URL 인코딩된 쿼리 매개변수 대신 POST 요청 본문에 `extraUrlParams`를 포함할지 여부를 나타냅니다.

`useBody`는 `beacon` 및 `xhrpost` 전송 방법에만 사용할 수 있습니다. `useBody`가 true이고 이러한 전송 방법 중 하나와 사용되는 경우 `extraUrlParams`가 POST 요청 본문에 포함되어 전송됩니다. 그렇지 않은 경우 요청이 빈 본문과 함께 전송되고 `extraUrlParams`는 URL 매개변수로서 포함됩니다.

`useBody`를 사용하면 `extraUrlParams`에 중첩된 개체를 포함할 수 있습니다. 그러나 요청이 `useBody`를 지원하지 않는 다른 전송 옵션(예: `image`)으로 돌아가면, 중첩된 개체는 `[object Object]`로서 URL에 문자열화되어 포함됩니다.

```javascript
"transport": {
  "beacon": true,
  "xhrpost": true,
  "useBody": true,
  "image": false
}
```

##### 리퍼러 정책 <a name="referrer-policy"></a>

리퍼러 정책은 `transport` 구성에서 `referrerPolicy` 입력란으로 지정할 수 있습니다. 현재 `no-referrer`만 지원됩니다.
리퍼러 정책은 `image` 전송에만 사용할 수 있습니다. `referrerPolicy: no-referrer`가 지정되면 `beacon` 및 `xhrpost` 전송이 `false`로 재정의됩니다.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true,
  "referrerPolicy": "no-referrer"
}
```

#### 링커 <a name="linkers"></a>

`linkers` 기능은 도메인 간 ID 동기화를 사용하도록 설정하는 데 사용됩니다. `amp-analytics`는 [구성 개체](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md#format)를 사용하여, URL 매개변수로서 페이지의 지정된 발신 링크에 추가되는 '링커 문자열'을 만듭니다. 사용자가 이러한 링크 중 하나를 클릭하면 대상 페이지가 URL 매개변수에서 링커 문자열을 읽어 ID 동기화를 수행합니다. 이는 일반적으로 AMP 프록시 도메인과 게시자 도메인 전체에서 사용자 세션에 참가하는 데 사용됩니다.

링커 구성 설정에 대한 자세한 내용은 [링커 ID 전달](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md)을 참조하세요.

이 매개변수를 가져와야 하는 경우 이 매개변수를 만드는 방법에 대한 정보는 [링커 ID 수신](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md)을 참조하세요.

#### 쿠키 <a name="cookies"></a>

`cookies` 기능은 문서 URL에서 [`QUERY_PARAM`](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md#query-parameter) 및 [`LINKER_PARAM`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#linker-param) 정보를 추출하여 원래 도메인에 쿠키를 기록하도록 지원합니다. 이를 `linkers` 기능과 함께 사용하면, AMP 프록시 도메인에서 게시자 도메인의 AMP 페이지로 ID 동기화를 수행할 수 있습니다.

`cookies` 구성 설정에 대한 자세한 내용은 [AMP 페이지에서 링커 매개변수 수신](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#receiving-linker-params-on-amp-pages)을 참조하세요.

## 유효성 검사 <a name="validation"></a>

AMP 유효성 검사 도구 사양의 [amp-analytics rules](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/validator-amp-analytics.protoascii)를 참조하세요.

### `<amp-analytics>`의 유효한 속성 <a name="valid-attributes-for-"></a>

다음은 `amp-analytics` 구성요소의 유효한 속성입니다.

**type**

공급업체 유형을 지정합니다.  자세한 내용은 [애널리틱스 공급업체](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md)의 목록을 참조하세요.

예:

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json"></amp-analytics>
```

**config**

지정된 원격 URL에서 구성을 로드하는 데 사용할 수 있는 선택적 속성입니다. 지정된 URL은 HTTPS 체계를 사용해야 합니다. 아래의 `data-include-credentials` 속성도 참조하세요. URL에는 [AMP URL 변수](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)가 포함될 수 있습니다. 응답은 [AMP CORS 보안 지침](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)을 따라야 합니다.

예:

```html
<amp-analytics config="https://example.com/analytics.config.json"></amp-analytics>
```

**data-credentials**<a name="data-credentials"></a>

값을 `include`로 설정하면 `config` 속성을 통해 지정된 요청에서 쿠키를 읽고 쓸 수 있습니다. 이 속성은 선택사항입니다.

**data-consent-notification-id**

이 속성을 제공하는 경우, 지정된 HTML 요소 ID가 포함된 [amp-user-notification](amp-user-notification.md)을 사용자가 확인할 때까지 페이지에서 애널리틱스 요청을 처리하지 않습니다. 이 속성은 선택사항입니다.

## AMP 구성요소에 대한 애널리틱스 <a name="analytics-for-amp-components"></a>

AMP 구성요소 개발자는 AMP 애널리틱스를 사용하여 데이터 수집을 구현할 수 있습니다. 자세한 내용은 [AMP 구성요소에 대한 애널리틱스 구현](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-components-analytics.md)을 참조하세요.
