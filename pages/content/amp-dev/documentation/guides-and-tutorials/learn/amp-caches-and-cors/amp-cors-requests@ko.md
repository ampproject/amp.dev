---
"$title": AMP의 CORS
order: '12'
formats:
- websites
- email
- stories
- ads
teaser:
  text: 여러 AMP 컴포넌트 및 확장자는 원격 엔드포인트를 활용할 수 있습니다.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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

여러 AMP 컴포넌트 및 확장자는 교차 출처 리소스 공유(CORS) 요청을 통해 원격 엔드포인트를 활용할 수 있습니다. 이 문서에서는 AMP의 CORS 사용과 관련한 주요 측면을 설명합니다. CORS 자체에 대한 설명은 [W3 CORS 사양](https://www.w3.org/TR/cors/)을 참조하세요.

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#why-do-i-need-cors-for-my-own-origin-" data-md-type="link">내 출처에 CORS가 필요한 이유</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">CORS 요청 시 쿠키 사용</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">AMP의 CORS 보안</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">CORS 요청 검증</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link">1) 특정 CORS 출처의 요청 허용</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) 동일 출처 요청 허용</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">CORS 응답 헤더 전송</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered"><a href="#access-control-allow-origin-origin" data-md-type="link">Access-Control-Allow-Origin: </a></li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">상태 변경 요청 처리</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link">예시 검토: CORS 요청 및 응답 처리</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">AMP에서 CORS 테스팅</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## 내 출처에 CORS가 필요한 이유 <a name="why-do-i-need-cors-for-my-own-origin"></a>

내 출처에 대한 요청에 CORS가 필요한 이유는 쉽게 이해되지 않을 수 있습니다. 지금부터 그 이유를 한번 살펴보겠습니다.

동적 데이터(예: amp-form, amp-list 등)을 가져오는 AMP 컴포넌트는 데이터를 검색하기 위해 원격 엔드포인트에 CORS 요청을 전송합니다. AMP 페이지에 이러한 컴포넌트가 포함된 경우 CORS를 처리하여 요청 실패를 방지해야 합니다.

예시를 통해 자세히 설명해드리겠습니다.

가격이 표시된 제품이 나열된 AMP 페이지가 있다고 가정해보죠. 이때 사용자가 해당 페이지의 가격을 업데이트하려면 버튼을 클릭하여 JSON 엔드포인트에서 최신 가격을 검색해야 합니다(amp-list 컴포넌트로 수행됨). JSON은 내 도메인에 있습니다.

그렇다면 페이지가 *내 도메인에 있고* JSON도 *내 도메인에 있습니다*. 아무 문제도 없는 듯하네요!

하지만 사용자는 AMP 페이지에 어떻게 들어왔나요? 사용자가 액세스하는 페이지는 캐시된 페이지인가요? 사용자는 AMP 페이지에 직접 액세스하는 것보다 다른 플랫폼을 통해 페이지를 발견했을 가능성이 높습니다. 예를 들어 Google 검색은 Google AMP 캐시를 사용하여 AMP 페이지를 빠르게 렌더링합니다. 즉 이러한 페이지는 Google AMP 캐시를 통해 지원되는 캐시된 페이지이며 도메인이 *다른* 것입니다. 사용자가 페이지의 가격을 업데이트하기 위해 버튼을 클릭하면 캐시된 AMP 페이지는 출처 도메인 페이지로 요청이 전송하여 가격을 불러옵니다. 하지만 출처 간 가격은 일치하지 않습니다(캐시 -> 출처 도메인). 이와 같은 교차 출처 요청을 허용하려면 CORS를 처리해야 합니다. 그렇지 않으면 요청은 실패하게 됩니다.

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript><img alt="CORS 및 캐시" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png"></noscript></amp-img>

**자, 그럼 이제 어떻게 해야 할까요?**

1. 동적 데이터를 가져오는 AMP 페이지의 경우 해당 페이지의 캐시된 버전을 테스트해야 합니다. *내 도메인만 테스트하는 것이 아닙니다.*(아래에서 [AMP의 CORS 테스트](#testing-cors-in-amp) 섹션 참조)
2. 이 문서의 설명에 따라 CORS 요청 및 응답을 처리합니다.

## CORS 요청에 쿠키 사용<a name="utilizing-cookies-for-cors-requests"></a>

CORS 요청을 사용하는 대부분의 AMP 컴포넌트는 자동으로 [자격 증명 모드](https://fetch.spec.whatwg.org/#concept-request-credentials-mode)를 설정하거나 작성자가 해당 모드를 선택적으로 활성화하도록 허용합니다. 예를 들어 [`amp-list`](https://amp.dev/documentation/components/amp-list) 컴포넌트는 CORS JSON 엔드포인트에서 동적 콘텐츠를 가져오고 `credentials` 속성을 통해 작성자가 자격 증명 모드를 설정하도록 허용합니다.

*예시: 쿠키를 통해 amp-list로 맞춤형 콘텐츠 포함*

[sourcecode:html]
<amp-list
  credentials="include"
  src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"
>
  <template type="amp-mustache">
    Your personal offer: ${% raw %}{{price}}{% endraw %}
  </template>
</amp-list>
[/sourcecode]

원본은 자격 증명 모드를 지정하여 CORS 요청에 쿠키를 포함하고 응답 시에도 쿠키를 사용할 수 있습니다([타사 쿠키 제한](#third-party-cookie-restrictions)에 따라 달라집니다).

### 타사 쿠키 제한 <a name="third-party-cookie-restrictions"></a>

AMP에서 자격 증명된  CORS 요청에도 브라우저에 지정된 제한과 동일한 타사 쿠키 제한이 적용됩니다. 이러한 제한은 브라우저와 플랫폼에 따라 다르지만 일부 브라우저에서는 사용자가 이전에  퍼스트 파티(최상위) 창의 원본에 방문했을 경우에만 원본에서 쿠키를 설정할 수 있습니다. 즉, 사용자가 원본 웹사이트를 직접 방문한 후에만 설정이 가능한 것입니다. 그렇기에 CORS를 통해 액세스한 서비스는 기본적으로 쿠키 설정이 가능하다고 가정할 수 없습니다.

## AMP의 CORS 보안 <a name="cors-security-in-amp"></a>

AMP 페이지의 유효하고 안전한 요청 및 응답을 위해 다음 절차를 준수해야 합니다.

1. [요청 검증](#verify-cors-requests).
2. [적절한 응답 헤더 전송](#send-cors-response-headers).

백엔드에서 Node가 사용될 경우 [AMP Toolbox](https://github.com/ampproject/amp-toolbox)의 일부인 [AMP CORS 미들웨어](https://www.npmjs.com/package/amp-toolbox-cors)를 활용할 수 있습니다.

### CORS 요청 검증<a name="verify-cors-requests"></a>

엔드포인트에서 CORS 요청을 수신한 경우:

1. [CORS <code>Origin</code> 헤더가 허용된 출처인지 검증합니다(퍼블리셔 출처 + AMP 캐시)](#verify-cors-header).
2. [Origin 헤더가 없을 경우 요청이 동일한 출처의 요청인지 확인합니다(`AMP-Same-Origin` 사용)](#allow-same-origin-requests).

#### 1) 특정 CORS 출처의 요청 허용<a name="1-allow-requests-for-specific-cors-origins"></a>

<span id="verify-cors-header"></span>

CORS 엔드포인트는 `Origin` HTTP 헤더를 통해 출처 요청을 수신합니다. 엔드포인트에서 허용되어야 하는 요청은 다음과 같습니다: (1) 퍼블리셔의 출처, (2) [https://cdn.ampproject.org/caches.json](https://cdn.ampproject.org/caches.json)에 열거된 모든 `cacheDomain` 출처.

예를 들어 엔드포인트는 다음과 같은 출처의 요청을 허용해야 합니다.

- Google AMP 캐시 서브도메인: `https://<publisher's domain>.cdn.ampproject.org` <br>(예: `https://nytimes-com.cdn.ampproject.org`)

[tip type="read-on"] AMP 캐시 URL 형식과 관련한 정보는 다음 리소스를 참조하세요.

- [Google AMP 캐시 개요](https://developers.google.com/amp/cache/overview) [/tip]

#### 2) 동일 출처 요청 허용 <a name="2-allow-same-origin-requests"></a>

<span id="allow-same-origin-requests"></span>

`Origin` 헤더가 누락된 동일 출처 요청의 경우 AMP는 다음과 같은 사용자 지정 헤더를 설정합니다.

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

동일한 출처(캐시가 아닌 URL에서 지원되는 문서)에서 XHR 요청이 생성되었을 시 AMP 런타임은 이러한 사용자 지정 헤더를 전송합니다. `AMP-Same-Origin:true` 헤더가 포함된 요청을 허용하세요.

### CORS 응답 헤더 전송 <a name="send-cors-response-headers"></a>

CORS 요청 검증 후 발생한 HTTP 응답에는 다음 헤더가 포함되어야 합니다.

##### Access-Control-Allow-Origin: <origin> </origin><a name="access-control-allow-origin-origin"></a>

이 헤더는 <a href="https://www.w3.org/TR/cors/">W3 CORS 사양</a>의 요구 사항이며 <code>origin</code>은 CORS <code>Origin</code> 요청 헤더를 통해 허용된 요청 출처를 의미합니다(예: <code>"https://<publisher's subdomain>.cdn.ampproject.org"</code>).

W3 CORS 사양은 응답에서 <code>*</code> 값이 반환되는 것을 허용하지만 보안 강화를 위해 다음을 수행합니다.

- `Origin` 헤더가 있을 경우 <code>Origin</code> 헤더의 값을 검증하고 에코 처리합니다.

### 상태 변경 요청 처리 <a name="processing-state-changing-requests"></a>

[tip type="important"] 요청을 처리하기 *전* 이 검증을 수행합니다. 이 검증은 CSRF 공격에 대응하는 보호를 제공하고 신뢰할 수 없는 출처의 요청 처리를 방지하는 데 유용합니다. [/tip]

시스템 상태를 변경할 수 있는 요청을 처리하기 전(예: 사용자가 메일링 리스트에 등록하거나 등록을 해제한 경우) 다음 사항을 확인합니다.

**`Origin` 헤더가 설정된 경우**:

1. 출처가 다음 값 중 하나와 일치하지 않는 경우 중단하고 오류 응답을 반환합니다.

    - `<publisher's domain>.cdn.ampproject.org`
    - 퍼블리셔의 출처(내 출처)

    `*`가 와일드카드 일치를 나타내지만 실제 별표 기호( * )는 아닌 경우.

2. 이외의 경우엔 요청을 처리합니다.

**`Origin` 헤더가 설정되지 않은 경우**:

1. 요청에 `AMP-Same-Origin: true` 헤더가 포함되었는지 검증합니다. 요청에 이 헤더가 포함되지 않은 경우 중단하고 오류 응답을 반환합니다.
2. 이외의 경우엔 요청을 처리합니다.

## 예시 검토: CORS 요청 및 응답 처리 <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

엔드포인트로 CORS 요청 시 고려해야 할 두 가지 시나리오가 있습니다.

1. 동일 출처의 요청.
2. 캐시된 출처의 요청(AMP 캐시에서).

예시를 통해 이 시나리오를 검토하도록 하겠습니다. 예시에서 이름이 `article-amp.html.`인 AMP 페이지를 호스팅하는 `example.com` 사이트를 관리합니다. 이 AMP 페이지에는 `amp-list`가 포함되어 `example.com`에서 호스팅되는 `data.json` 파일의 동적 데이터를 검색할 수 있습니다. 이때 AMP 페이지에서 가져온 `data.json` 파일로 요청을 처리하려 합니다. 출처가 동일한 AMP 페이지(캐시되지 않음) 또는 출처가 다른 AMP 페이지(캐시됨)에서 이러한 요청이 전송될 수 있습니다.

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript><img alt="CORS 예" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png"></noscript></amp-img>

### 허용된 출처 <a name="allowed-origins"></a>

CORS 및 AMP에 대해 알고 있는 사실을 기반으로(상단의 [CORS 요청 검증](#verify-cors-requests)), 이번 예시에서는 다음 도메인의 요청을 허용합니다.

- `example.com` --- 퍼블리셔 도메인
- `example-com.cdn.ampproject.org` --- Google AMP 캐시 서브도메인

### 허용된 요청에 대한 응답 헤더<a name="response-headers-for-allowed-requests"></a>

허용된 출처의 요청에 대한 응답은 다음 헤더를 포함합니다.

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

CORS 응답에 포함될 수 있는 추가 응답 헤더는 다음과 같습니다.

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### 유사 CORS 로직 <a name="pseudo-cors-logic"></a>

CORS 요청 및 응답을 처리하는 로직은 다음 의사 코드로 간소화될 수 있습니다.

[sourcecode:text]
IF CORS header present
   IF origin IN allowed-origins
      allow request & send response
   ELSE
      deny request
ELSE
   IF "AMP-Same-Origin: true"
      allow request & send response
   ELSE
      deny request
[/sourcecode]

#### CORS 샘플 코드 <a name="cors-sample-code"></a>

CORS 요청 및 응답을 처리하는 데 사용할 수 있는 샘플 JavaScript 함수:

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
  var unauthorized = 'Unauthorized Request';
  var origin;
  var allowedOrigins = [
    'https://example.com',
    'https://example-com.cdn.ampproject.org',
    'https://cdn.ampproject.org',
  ];
  var allowedSourceOrigin = 'https://example.com'; //publisher's origin
  // If same origin
  if (req.headers['amp-same-origin'] == 'true') {
    origin = sourceOrigin;
    // If allowed CORS origin & allowed source origin
  } else if (
    allowedOrigins.indexOf(req.headers.origin) != -1 &&
    sourceOrigin == allowedSourceOrigin
  ) {
    origin = req.headers.origin;
  } else {
    res.statusCode = 403;
    res.end(JSON.stringify({message: unauthorized}));
    throw unauthorized;
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**참고**: 동작하는 코드 샘플은 [amp-cors.js](https://github.com/ampproject/amphtml/blob/master/build-system/server/amp-cors.js)를 참조하세요.

### 시나리오 1: 동일 출처의 AMP 페이지에서 요청 받기 <a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

다음 시나리오에서 `article-amp.html` 페이지는 `data.json` 파일을 요청합니다. 출처는 동일합니다.

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript><img alt="CORS 예" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png"></noscript></amp-img>

이 요청을 검사하면 다음 정보를 확인할 수 있습니다.

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

동일 출처의 요청이므로 `Origin` 헤더는 없지만 사용자 지정 AMP 요청 헤더인 `AMP-Same-Origin: true`는 있습니다. 출처가 동일하므로 이 요청은 허용할 수 있습니다(`https://example.com`).

응답 헤더는 다음과 같습니다.

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### 시나리오 2: 캐시된 AMP 페이지에서 요청 받기 <a name="scenario-2-get-request-from-cached-amp-page"></a>

다음 시나리오에서 Google AMP 캐시에 캐시된 `article-amp.html` 페이지는 `data.json` 파일을 요청합니다. 출처는 다릅니다.

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript><img alt="CORS 예" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png"></noscript></amp-img>

이 요청을 검사하면 다음 정보를 확인할 수 있습니다.

[sourcecode:text] Request URL: https://example.com/data.json Request Method: GET Origin: https://example-com.cdn.ampproject.org [/sourcecode]

요청에 `Origin` 헤더가 포함되므로 허용된 출처에서 받은 요청임이 확인됩니다. 허용된 출처의 요청이므로 허용할 수 있습니다.

응답 헤더는 다음과 같습니다.

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## 캐시된 글꼴로 작업 <a name="working-with-cached-fonts"></a>

Google AMP 캐시는 AMP HTML 문서, 이미지 및 글꼴을 캐싱하여 AMP 페이지의 속도를 최적화합니다. AMP 페이지 속도를 향상하는 동안 캐시된 리리소스 보호에도 주의를 기울여야 합니다. 출처의 `Access-Control-Allow-Origin` 값을 고려하여 AMP 캐시가 캐시된 리소스(일반적으로 글꼴)에 응답하는 방식을 변경하겠습니다.

### 기존 동작(2019년 10월 이전) <a name="past-behavior-before-october-2019"></a>

AMP 페이지가 `@font-face src` 속성의 `https://example.com/some/font.ttf`를 로딩할 시 AMP 캐시는 글꼴 파일을 캐싱하고 아래와 같이 `Access-Control-Allow-Origin` 와일드 카드를 통해 리소스를 지원합니다.

- URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Access-Control-Allow-Origin: *

### 새 동작(2019년 10월 이후) <a name="new-behavior-october-2019-and-after"></a>

현재 구현은 허용되지만 교차 출처 사이트의 글꼴이 예기치 않게 사용될 수 있습니다. 이 변경을 통해 AMP 캐시는 원본 서버에서 응답하는 동일한 `Access-Control-Allow-Origin` 값을 응답하기 시작합니다. 캐시된 AMP 문서에서 글꼴을 적절히 로드하려면 헤더를 통해 AMP 캐시 출처를 허용해야 합니다.

구현 샘플은 다음과 같습니다.

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
  var unauthorized = 'Unauthorized Request';
  var allowedOrigins = [
    'https://example.com',
    'https://example-com.cdn.ampproject.org',
  ];
  // If allowed CORS origin
  if (allowedOrigins.indexOf(req.headers.origin) != -1) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  } else {
    res.statusCode = 403;
    res.end(JSON.stringify({message: unauthorized}));
    throw unauthorized;
  }
}
[/sourcecode]

예를 들어 `https://example.com/amp.html`에서 /some/font.ttf를 로드하려면 원본 서버는 아래와 같이 Access-Control-Allow-Origin를 통해 응답해야 합니다.

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript><img alt="CORS 글꼴 예" src="https://amp.dev/static/img/docs/cors-font.jpg"></noscript></amp-img>

[tip type="note"] 모든 출처에서 글꼴 파일에 액세스할 수 있는 경우  `Access-Control-Allow-Origin` 와일드 카드를 통해 응답할 수 있으며 AMP 캐시도 그 값을 에코 처리하여 `Access-Control-Allow-Origin: *`로 응답하게 됩니다. 이미 이 설정을 사용 중이라면 변경은 필요하지 않습니다. [/tip]

2019년 10월 중순 변경 예정이며, 자체 호스팅 글꼴을 사용하는 모든 AMP 퍼블리셔는 이로 인해 영향받은 사항이 있는지 확인하시길 부탁드립니다.

#### 릴리스 계획 <a name="roll-out-plan"></a>

- 2019-09-30: 이 변경 사항이 적용될 도메인에 대한 보다 정밀한 제어가 릴리스에 포함됩니다. 이 빌드는 이번 주중 출시됩니다.
- 2019-10-07: 수동 테스팅을 위한 테스트 도메인이 활성화됩니다.
- 2019-10-14(테스팅 결과에 따름): 전반적으로 기능이 출시될 예정입니다.

관련 [이슈는 여기에서](https://github.com/ampproject/amphtml/issues/24834) 확인하세요.

## AMP에서 CORS 테스팅 <a name="testing-cors-in-amp"></a>

AMP 페이지를 테스팅할 경우 AMP 페이지의 캐시된 버전 테스트도 포함되어야 합니다.

### 캐시 URL을 통한 페이지 유효성 검사 <a name="verify-the-page-via-the-cache-url"></a>

캐시된 AMP 페이지의 렌더링 및 기능 적합성을 확인하는 방법:

1. AMP 캐시가 AMP 페이지에 액세스할 때 사용할 URL을 브라우저에서 엽니다. [예시별 AMP 도구](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/)에서 캐시 URL 형식을 확인할 수 있습니다.

    예시는 다음과 같습니다.

    - URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
    - AMP 캐시 URL 형식: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. 브라우저의 개발 도구를 열어 오류가 없으며 모든 리소스가 적절히 로드되었음을 확인합니다.

### 서버 응답 헤더 유효성 검사 <a name="verify-your-server-response-headers"></a>

`curl` 명령어를 사용하면 서버에서 올바른 HTTP 응답 헤더를 전송하는지 확인할 수 있습니다. `curl` 명령어에 요청 URL 및 추가하고자 하는 사용자 지정 헤더를 제공합니다.

**구문**: `curl <request-url> -H <custom-header> - I`

#### 동일 출처의 요청 테스트 <a name="test-request-from-same-origin"></a>

AMP 시스템은 동일 출처 요청에 사용자 지정 `AMP-Same-Origin:true` 헤더를 추가합니다.

`https://ampbyexample.com`에서 `examples.json` 파일로의 요청을 테스팅하는 curl 명령어는 다음과 같습니다(동일한 도메인).

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

명령어 결과는 올바른 응답 헤더를 표시합니다(참고: 추가 정보는 정리되었습니다).

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### 캐시된 AMP 페이지의 요청 테스트 <a name="test-request-from-cached-amp-page"></a>

도메인이 동일하지 않은(즉, 캐시) CORS 요청에서 `origin` 헤더는 요청의 일부입니다.

Google AMP 캐시로 캐시된 AMP 페이지에서 to the `examples.json` 파일로의 요청을 테스팅하는 curl 명령어는 다음과 같습니다.

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

명령어 결과는 올바른 응답 헤더를 표시합니다.

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```
