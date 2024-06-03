---
$title: amp-access
$category@: dynamic-content
teaser:
  text: AMP 페이월 및 구독 지원을 제공합니다.
---



AMP 액세스 또는 'AMP 페이월 및 구독 지원'을 통해 게시자는 독자의 가입 상태, 조회수 및 기타 요인을 기반으로 독자가 액세스할 수 있는 콘텐츠와 제한 사항을 제어할 수 있습니다.

# amp-access <a name="amp-access"></a>



<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

<table>
  <tr>
    <td><strong>지원 대상</strong></td>
    <td>공개 버전</td>
  </tr><tr>
  <td class="col-fourty"><strong>필수 스크립트</strong></td>
  <td>
    <div>
      <code>&lt;script async custom-element="amp-access" src="https://cdn.ampproject.org/v0/amp-access-0.1.js">&lt;/script></code>
    </div>
  </td>
</tr>
<tr>
  <td class="col-fourty"><strong>예</strong></td>
  <td><a href="https://ampbyexample.com/components/amp-access/">amp-access의 주석이 포함된 코드 예</a></td>
</tr>
</table>

## `amp-subscriptions`에 대한 관계 <a name="relationship-to-amp-subscriptions"></a>

[`amp-subscriptions`](amp-subscriptions.md) 확장 프로그램은 `amp-access`와 유사한 기능을 제공합니다. 그러나 좀 더 특수화된 액세스 페이월 프로토콜을 지원합니다. 주목할 만한 차이점은 다음과 같습니다.

1. `amp-subscriptions` 승인 응답은 amp-access 승인과 유사하지만, 엄격하게 정의되고 표준화되어 있습니다.
1. `amp-subscriptions` 확장 프로그램을 사용하면 페이지가 액세스/페이월 결정에 참여할 수 있도록 여러 서비스를 구성할 수 있습니다. 이러한 서비스는 동시에 실행되며 긍정적인 응답을 반환하는 서비스를 기반으로 우선순위가 지정됩니다.
1. AMP 뷰어는 액세스 증명으로서 게시자와의 독립적인 계약을 기반으로 `amp-subscriptions`에 서명된 승인 응답을 제공할 수 있습니다.
1. `amp-subscriptions` 콘텐츠 마크업은 표준화되어 있으므로 앱과 크롤러가 프리미엄 콘텐츠 섹션을 쉽게 감지할 수 있습니다.

마크업의 표준화, 다중 공급자 지원 및 개선된 뷰어 지원이 제공되므로 새로운 게시자 및 페이월 공급자 구현에는 `amp-subscriptions`를 사용하는 것이 좋습니다.

## 솔루션 <a name="solution"></a>

제안된 솔루션은 다음의 결정 및 흐름에서 게시자에게 제어 기능을 제공합니다.
- 사용자 생성 및 유지 관리
- 한도 측정 제어(특정 수의 무료 보기 허용)
- 로그인 흐름 책임
- 사용자 인증 책임
- 액세스 규칙 및 승인 책임
- 문서 단위로 액세스 매개변수에 대한 유연성

이 솔루션은 다음 구성요소로 구성됩니다.

1. [**AMP 독자 ID**](#amp-reader-id): AMP 생태계에서 제공. AMP에 표시되는 독자의 고유한 식별자.
1. [**액세스 콘텐츠 마크업**](#access-content-markup): 게시자가 작성. 어떤 환경에서 문서의 어떤 부분을 표시할지를 정의.
1. [**승인 엔드포인트**](#authorization-endpoint): 게시자가 제공. 독자가 사용할 수 있는 문서의 부분을 설명하는 응답을 반환.
1. [**핑백 엔드포인트**](#pingback-endpoint): 게시자가 제공하며 문서의 '보기' 노출수 전송에 사용됨.
1. [**로그인 링크 및 로그인 페이지**](#login-page-and-login-link): 게시자가 독자를 인증하고 AMP 독자 ID로 ID를 연결하도록 허용.

Google AMP 캐시는 액세스 콘텐츠 마크업을 사용하여 일부 섹션을 가린 상태로 문서를 독자에게 반환합니다. AMP 런타임은 승인 엔드포인트를 호출하고, 응답을 사용하여 액세스 콘텐츠 마크업에 정의된 대로 서로 다른 섹션을 숨기거나 표시합니다. 독자에게 문서가 표시되면, AMP 런타임은 게시자가 카운트다운 미터(사용된 무료 보기 수)를 업데이트하는 데 사용할 수 있는 핑백 엔드포인트를 호출합니다.

게시자는 솔루션을 통해 또한 로그인/구독 페이지를 시작하는 로그인 링크를 AMP 문서에 배치할 수 있습니다. 이 페이지에서 게시자는 독자를 인증하고 시스템 독자 ID를 AMP 독자 ID와 연결할 수 있습니다.

기본적으로 이 솔루션은 전체(일부는 가려짐) 문서를 독자에게 전송하고, 단순히 승인 응답을 기반으로 제한된 섹션을 표시하거나 숨깁니다. 그러나 솔루션에서 '서버' 옵션도 제공합니다. 이 옵션에서는 제한된 섹션이 초기 문서 전달에서 제외되며 승인이 확인된 후에야 다운로드가 가능합니다.

AMP 액세스를 지원하려면 게시자가 위에서 설명한 구성요소를 구현해야 합니다. 액세스 콘텐츠 마크업 및 승인 엔드포인트는 필수사항입니다. 핑백 엔드포인트 및 로그인 페이지는 선택사항입니다.

### AMP 독자 ID <a name="amp-reader-id"></a>

액세스 서비스 및 사용 사례를 지원하기 위해 AMP 액세스에 *독자 ID*라는 개념이 도입되었습니다*.

독자 ID는 AMP 생태계에 의해 생성된 익명의 고유 ID로, 각 독자/게시자 쌍 단위로 고유합니다. 즉, 서로 다른 두 게시자가 한 독자를 다르게 인식합니다. 독자 ID는 되돌릴 수 없는 ID로서 모든 AMP/게시자 통신에 포함되며 엔트로피가 매우 높습니다. 게시자는 독자 ID를 사용하여 독자를 식별하고 자체 ID 시스템에 매핑할 수 있습니다.

독자 ID는 사용자 기기에서 구성되며 수명이 길지만, 시크릿 창의 규칙을 포함하여 일반적인 브라우저 저장 규칙을 따릅니다. 독자 ID의 의도된 수명주기는 사용 시 1년 또는 사용자가 쿠키를 지울 때까지입니다. 현재 독자 ID는 기기 간에 공유되지 않습니다.

독자 ID는 [여기](https://docs.google.com/document/d/1f7z3X2GM_ASb3ZCI_7tngglxwS6WoWi1EB3aKzdf6vo/edit#heading=h.hb9q0wpwwhuf)에 설명된 ExternalCID를 구축하는 데 사용된 메커니즘과 유사하게 구성됩니다. 독자 ID의 예: `amp-OFsqR4pPKynymPyMmplPNMvxSTsNQob3TnK-oE3nwVT0clORaZ1rkeEz8xej-vV6`.

### AMP 액세스 및 쿠키 <a name="amp-access-and-cookies"></a>

게시자는 자체 인증 쿠키 또는 독자 ID를 사용하거나 둘을 조합하여 사용할 수 있습니다.

### 액세스 콘텐츠 마크업 <a name="access-content-markup"></a>

액세스 콘텐츠 마크업은 승인 엔드포인트에서 반환된 승인 응답을 기반으로 표시할 섹션과 숨길 섹션을 결정합니다. 특수한 마크업 속성을 통해 설명됩니다.

### 승인 엔드포인트 <a name="authorization-endpoint"></a>

승인은 게시자가 제공하고 AMP 런타임 또는 Google AMP 캐시가 호출하는 엔드포인트이며, 인증된 CORS GET 엔드포인트입니다. 이 엔드포인트는 콘텐츠 마크업이 문서의 서로 다른 부분을 숨기거나 표시하기 위해 사용할 수 있는 액세스 매개변수를 반환합니다.

### 핑백 엔드포인트 <a name="pingback-endpoint"></a>

핑백은 게시자가 제공하고 AMP 런타임 또는 Google AMP 캐시가 호출하는 엔드포인트이며, 인증된 CORS POST 엔드포인트입니다. 독자가 문서를 보기 시작하면 자동으로 AMP 런타임이 이 엔드포인트를 호출합니다. 독자가 로그인 흐름을 성공적으로 완료한 후에도 이 엔드포인트가 호출됩니다. 핑백의 주요 목표 중 하나는 게시자가 한도 측정 정보를 업데이트하는 것입니다.

핑백은 선택사항이며, `noPingback` 구성 속성을 `true`로 설정하여 사용을 중지할 수 있습니다.

### 로그인 페이지 및 로그인 링크 <a name="login-page-and-login-link"></a>

로그인 페이지는 게시자가 구현 및 제공하고 AMP 런타임이 호출합니다. 일반적으로 브라우저 대화상자로 표시됩니다.

로그인 페이지는 게시자가 문서의 아무 곳에나 배치할 수 있는 로그인 링크를 독자가 탭할 때 트리거됩니다.

## 사양 v0.1 <a name="specification-v01"></a>

### 구성 <a name="configuration"></a>

모든 엔드포인트는 AMP 문서에서 문서의 HEAD에 있는 JSON 개체로서 구성됩니다.

```html

<script id="amp-access" type="application/json">
  {
    "property": value,
    ...
    }
</script>

```

이 구성에서는 다음 속성이 정의됩니다.

<table>
  <tr>
    <th>속성</th>
    <th>값</th>
    <th>설명</th>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorization</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>승인 엔드포인트에 대한 HTTPS URL.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>pingback</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>핑백 엔드포인트에 대한 HTTPS URL.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>noPingback</code></td>
    <td>true/false</td>
    <td>true인 경우 핑백을 사용하지 않도록 설정합니다.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>login</code></td>
    <td class="col-twenty"><code>&lt;URL&gt;</code> 또는<br><code>&lt;Map[string, URL]&gt;</code></td>
    <td>로그인 페이지에 대한 HTTPS URL 또는 서로 다른 로그인 페이지 유형에 대한 URL 집합.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationFallbackResponse</code></td>
    <td><code>&lt;object&gt;</code></td>
    <td>실패할 경우 승인 응답 대신 사용되는 JSON 개체.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationTimeout</code></td>
    <td><code>&lt;number&gt;</code></td>
    <td>승인 요청이 실패한 것으로 간주되기까지의 시간 제한(밀리초). 기본값은 3000입니다. 3000보다 큰 값은 개발 환경에서만 허용됩니다. </td>
  </tr>
  <tr>
    <td class="col-fourty"><code>type</code></td>
    <td>"client" 또는 "server"</td>
    <td>기본값은 "client"입니다. server' 옵션은 디자인을 논의 중이며, 준비가 완료되면 문서가 업데이트됩니다.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>namespace</code></td>
    <td>문자열</td>
    <td>기본값은 비어 있습니다. 여러 액세스 공급자가 지정된 경우 네임스페이스가 필요합니다.</td>
  </tr>
</table>

*`<URL>`* 값은 대체 변수가 있는 HTTPS URL을 지정합니다. 대체 변수에 대해서는 아래의 [URL 변수에 액세스](#access-url-variables) 섹션에서 자세히 설명합니다.

다음은 AMP 액세스 구성의 예입니다.

```html

<script id="amp-access" type="application/json">
{
  "authorization":
      "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
  "pingback":
      "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
  "login":
      "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
  "authorizationFallbackResponse": {"error": true}
}
</script>

```

#### 다중 액세스 공급자 <a name="multiple-access-providers"></a>

단일 개체 대신 배열을 사용하고 각 항목에 대해 `namespace`를 제공하기 위해 다중 액세스 공급자를 지정하는 것이 가능합니다.

```html
<script id="amp-access" type="application/json">
[
  {
    "property": value,
    ...
    "namespace": value
  },
  ...
]
</script>
```

### URL 변수에 액세스 <a name="access-url-variables"></a>

다양한 엔드포인트에 대한 URL을 구성할 때 게시자는 대체 변수를 사용할 수 있습니다. 이러한 변수의 전체 목록은 [AMP 변수 사양](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md)에 정의되어 있습니다. 또한 `READER_ID` 및 `AUTHDATA`와 같은 몇몇 액세스별 변수도 추가됩니다. 가장 관련 있는 변수 중 일부는 아래 표에 설명되어 있습니다.

<table>
  <tr>
    <th>변수</th>
    <th>설명</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>READER_ID</code></td>
    <td>AMP 독자 ID.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AUTHDATA(field)</code></td>
    <td>승인 응답 입력란의 값.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RETURN_URL</code></td>
    <td>AMP 런타임이 Login Dialog에 대해 지정한 반환 URL의 자리 표시자.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>SOURCE_URL</code></td>
    <td>이 AMP 문서의 소스 URL. 문서가 CDN에서 제공되는 경우 AMPDOC_URL은 CDN URL이 되는 반면 SOURCE_URL은 원래의 소스 URL이 됩니다.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AMPDOC_URL</code></td>
    <td>이 AMP 문서의 URL.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>CANONICAL_URL</code></td>
    <td>이 AMP 문서의 표준 URL.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>DOCUMENT_REFERRER</code></td>
    <td>리퍼러 URL.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>VIEWER</code></td>
    <td>AMP 뷰어의 URL.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RANDOM</code></td>
    <td>임의의 숫자. 브라우저 캐싱을 피하는 데 도움이 됩니다.</td>
  </tr>
</table>

다음은 독자 ID, 표준 URL, 리퍼러 정보 및 임의 캐시버스터로 확장된 URL의 예입니다.
```text
https://pub.com/access?
  rid=READER_ID
  &url=CANONICAL_URL
  &ref=DOCUMENT_REFERRER
  &_=RANDOM
```

AUTHDATA 변수는 핑백 및 로그인 URL에서 사용할 수 있습니다. 이 변수를 사용하면 승인 응답의 입력란을 URL 매개변수로서 전달할 수 있습니다. 예: `AUTHDATA(isSubscriber)`. `AUTHDATA(other.isSubscriber)`와 같은 중첩된 표현식도 허용됩니다. 네임스페이스를 사용하는 경우 `AUTHDATA(anamespace.afield)`와 같이 입력란 앞에 네임스페이스를 추가할 수 있습니다.

### 액세스 콘텐츠 마크업 <a name="access-content-markup-1"></a>

표시되거나 숨겨지는 섹션을 설명하는 액세스 콘텐츠 마크업은 두 가지 AMP 속성, 즉 `amp-access` 및 `amp-access-hide`로 구성되며 이러한 속성은 어떤 HTML 요소에나 배치할 수 있습니다.

`amp-access` 속성은 승인 엔드포인트가 반환하는 승인 응답에 따라 true 또는 false를 산출하는 표현식을 제공합니다. 결과 값은 요소 및 내용 표시 여부를 나타냅니다.

`amp-access` 값은 SQL과 유사한 언어로 정의되는 부울 식입니다. 문법은 [부록 A](#appendix-a-amp-access-expression-grammar)에 정의되어 있습니다. 정의되는 방식은 다음과 같습니다.
```html

<div amp-access="expression">...</div>
```
속성 및 값은 승인 엔드포인트가 반환하는 승인 응답의 속성 및 값을 참조합니다. 이는 다양한 액세스 시나리오를 지원하는 유연한 시스템을 제공합니다. 네임스페이스를 사용하는 경우 속성 이름 앞에 네임스페이스를 추가하면 됩니다(예: `anamespace.aproperty`).

`amp-access-hide` 속성은 요소를 표시할 수 있는 승인 응답을 수신하기 전에 안정적으로 요소를 숨기기 위해 사용할 수 있습니다. 이 속성은 "기본적으로 보이지 않음"의 의미를 제공합니다. 나중에 승인에 의해 반환되는 승인 응답은 이 기본값을 취소하고 섹션을 보이게 만들 수 있습니다. `amp-access-hide` 속성이 생략되면 섹션은 기본적으로 표시/포함됩니다. `amp-access-hide` 속성은 `amp-access` 속성과 결합해서만 사용할 수 있습니다.
```html
<div amp-access="expression" amp-access-hide>...</div>
```

승인 요청이 실패하면 `amp-access` 식은 평가되지 않으며 섹션의 표시 여부는 문서에서 처음 제공한 `amp-access-hide` 속성에 의해 결정됩니다.

다양한 난독화 및 렌더링 요구를 지원하기 위해 필요에 따라 `amp-access-* '속성 세트를 확장할 수 있습니다.

승인 요청이 실패하고 "authorizationFallbackResponse" 응답이 문서에 지정되어 있지 않으면, `amp-access` 식은 평가되지 않으며 섹션의 표시 여부는 문서에서 처음 제공한 `amp-access-hide` 속성에 의해 결정됩니다.

다음은 로그인 링크 또는 구독 상태를 기반으로 한 전체 콘텐츠를 보여주는 예입니다.
```html
<header>
  문서 제목
</header>
<div>
  문서의 첫 번째 스니펫.
</div>

<div amp-access="NOT subscriber" amp-access-hide>
  <a on="tap:amp-access.login">지금 구독자가 되세요!</a>
</div>

<div amp-access="subscriber">
  전체 콘텐츠.
</div>

```
여기에서
- *subscriber* 는 승인 엔드포인트에 의해 반환된 승인 응답에 있는 부울 입력란입니다. 이 섹션은 기본적으로 숨겨져 있으며 선택사항입니다.
이 예에서는 전체 콘텐츠를 안정적으로 표시하도록 설정합니다.

다음은 독자에게 한도 측정 상태에 대한 고지 사항을 보여주는 또 다른 예입니다.
```html
{% raw %}
<section amp-access="views <= maxViews">
  <template amp-access-template type="amp-mustache">
    {{maxViews}}개 중 {{views}} 문서를 읽는 중입니다.
  </template>
</section>
{% endraw %}
```

다음은 프리미엄 구독자에게 추가 콘텐츠를 보여주는 예입니다.
```html
<section amp-access="subscriptonType = 'premium'">
  쉿… 고객님만 이 내용을 읽고 계십니다.
</section>
```

### 승인 엔드포인트 <a name="authorization-endpoint-1"></a>

승인은 [AMP 액세스 구성](#configuration) 섹션의 `authorization` 속성을 통해 구성되며, 인증된 CORS GET 엔드포인트입니다. 이 요청을 보호하는 방법은 [CORS 오리진 보안](#cors-origin-security)을 참조하세요.

승인은 [URL 변수에 액세스](#access-url-variables) 섹션에 정의된 대로 매개변수를 사용할 수 있습니다. 예를 들면 AMP 독자 ID 및 문서 URL을 전달할 수 있습니다. URL 매개변수 외에도 게시자는 독자의 IP 주소와 같이 HTTP 프로토콜을 통해 자연스럽게 전달되는 정보를 사용할 수 있습니다. `READER_ID`는 반드시 포함해야 합니다.

이 엔드포인트는 콘텐츠의 서로 다른 부분을 표시하기/숨기기 위해 콘텐츠 마크업 식에서 사용할 수 있는 승인 응답을 생성합니다.

요청 형식은 다음과 같습니다.
```text
https://publisher.com/amp-access.json?
rid=READER_ID
&url=SOURCE_URL
```
응답은 자유 형식의 JSON 개체이며, 몇 가지 제한을 제외하고 어떤 속성과 값도 포함할 수 있습니다. 제한 사항은 다음과 같습니다.
- 속성 이름은 `amp-access` 식 문법에 정의된 제한을 준수해야 합니다([부록 A](#appendix-a-amp-access-expression-grammar) 참조). 즉, 속성 이름에는 공백, 대시, 그리고 "amp-access" 사양을 따르지 않는 다른 문자를 포함할 수 없습니다.
- 속성 값은 문자열, 숫자, 부울 중 하나일 수 있습니다.
- 동일한 유형(문자열, 숫자, 부울)의 값을 갖는 개체로서 값을 중첩할 수도 있습니다.
- 직렬화된 승인 응답의 전체 크기는 500바이트를 초과할 수 없습니다.
- 응답에 PII(개인 식별 정보) 또는 개인 정보를 포함하지 않도록 유의하세요.

다음은 승인 엔드포인트에서 반환할 수 있는 속성에 대한 가능한 작은 아이디어 목록입니다.
- 한도 측정 정보: 허용되는 최대 보기 수 및 현재 보기 수.
- 독자가 로그인했는지 또는 구독자인지 여부.
- 좀 더 자세한 구독 유형: 기본, 프리미엄
- 지역: 국가, 지역, 맞춤형 게시 지역

다음은 독자가 구독자가 아니며 월 10개 기사로 측정되는데 이미 6개 기사를 본 경우 응답의 예입니다.
```json
{
  "maxViews": 10,
  "currentViews": 6,
  "subscriber": false
}
```
다음은 독자가 로그인했으며 프리미엄 구독 유형을 가지고 있는 경우 응답의 예입니다.
```json
{
  "loggedIn": true,
  "subscriptionType": "premium"
}
```
이 RPC는 사전 렌더링 단계에서 호출될 수 있는데, 독자가 실제로 문서를 안 볼 수도 있기 때문에 측정 카운트다운에 사용해서는 안 됩니다.

또 다른 중요한 고려 사항은 경우에 따라 AMP 런타임이 문서 노출당 승인 엔드포인트를 여러 번 호출해야 할 수도 있다는 것입니다. 이는 성공적인 로그인 흐름 이후와 같이 독자에 대한 액세스 매개변수가 크게 변경되었다고 AMP 런타임이 판단하는 경우 발생할 수 있습니다.

승인 응답은 AMP 런타임 및 확장 프로그램에서 세 가지 목적으로 사용할 수 있습니다.

1. `amp-access` 식을 평가할 때.
2. `amp-mustache`와 같은 `<template>` 템플릿을 평가할 때.
3. `AUTHDATA(field)`를 사용하여 핑백 및 로그인 URL에 추가 변수를 제공할 때.

승인 엔드포인트는 AMP 런타임이 인증된 CORS 엔드포인트로서 호출합니다. 따라서 CORS 프로토콜을 구현해야 합니다. [CORS 오리진 보안](#cors-origin-security)에 설명된 대로, 이 서비스에 대한 액세스를 제한하려면 CORS 오리진 및 소스 오리진을 사용해야 합니다. 이 엔드포인트는 필요에 따라 게시자 쿠키를 사용할 수 있습니다. 예를 들어 독자 ID와 게시자 자신의 사용자 ID 간에 바인딩을 연결할 수 있습니다. AMP 자체는 이에 대해 알 필요가 없습니다(모르는 것이 낫습니다). 자세한 내용은 [AMP 독자 ID](#amp-reader-id) 및 [AMP 액세스 및 쿠키](#amp-access-and-cookies) 문서를 참조하세요.

AMP 런타임(또는 브라우저)은 승인 엔드포인트를 호출할 때 캐시 응답 헤더를 관찰합니다. 따라서 캐시된 응답을 다시 사용할 수 있습니다. 이는 바람직할 수도 있고 아닐 수도 있습니다. 바람직하지 않은 경우, 게시자는 적절한 캐시 제어 헤더 및/또는 엔드포인트 URL에 대한 `RANDOM` 변수 대체를 사용할 수 있습니다.

승인 요청이 실패하면, AMP 런타임은 "authorizationFallbackResponse"로 폴백합니다(구성에 지정되어 있는 경우). 이 경우 승인 응답 대신 "authorizationFallbackResponse" 속성의 값을 사용해 정상적으로 승인 흐름이 진행됩니다. "authorizationFallbackResponse"가 지정되어 있지 않으면 승인 흐름이 실패합니다. 이 경우 `amp-access` 식은 평가되지 않으며 섹션의 표시 여부는 문서에서 처음 제공한 `amp-access-hide` 속성에 의해 결정됩니다.

승인 요청은 자동으로 시간 초과되며 3초 후 실패한 것으로 간주됩니다.

AMP 런타임은 승인 흐름 중에 다음과 같은 CSS 클래스를 사용합니다.

1. 승인 흐름이 시작되면 문서 루트에 `amp-access-loading` CSS 클래스가 설정되고, 완료되거나 실패할 경우 제거됩니다.
2. 승인 흐름이 실패할 경우 문서 루트에 `amp-access-error` CSS 클래스가 설정됩니다.

*server* 옵션에서, 승인 엔드포인트에 대한 호출은 Google AMP 캐시에 의해 Simple HTTPS 엔드포인트로서 수행됩니다. 따라서 이 경우에는 게시자의 쿠키를 전달할 수 없습니다.

### 핑백 엔드포인트 <a name="pingback-endpoint-1"></a>

핑백은 [AMP 액세스 구성](#configuration) 섹션의 `pingback` 속성을 통해 구성되며, 인증된 CORS POST 엔드포인트입니다. 이 요청을 보호하는 방법은 [CORS 오리진 보안](#cors-origin-security)을 참조하세요.

핑백 URL은 선택사항입니다. `'noPingback': true`를 통해 사용을 중지할 수 있습니다.

핑백 URL은 [URL 변수에 액세스](#access-url-variables) 섹션에 정의된 대로 매개변수를 사용할 수 있습니다. 예를 들면 AMP 독자 ID 및 문서 URL을 전달할 수 있습니다. `READER_ID`는 반드시 포함해야 합니다.

핑백은 응답을 생성하지 않습니다. AMP 런타임은 응답을 무시합니다.

독자가 문서를 보기 시작하고 성공적으로 로그인 흐름을 완료한 이후 핑백 엔드포인트가 호출됩니다.

게시자는 다음을 위해 핑백을 사용하도록 선택할 수 있습니다.
- 페이지의 무료 보기 수 카운트다운
- AMP 독자 ID를 게시자의 ID에 매핑(인증된 CORS 엔드포인트로서 핑백은 게시자 쿠키를 포함할 수 있기 때문).

요청 형식은 다음과 같습니다.
```text
https://publisher.com/amp-pingback?
rid=READER_ID
&url=SOURCE_URL
```

### 로그인 페이지 <a name="login-page"></a>

로그인 페이지의 URL은 [AMP 액세스 구성](#configuration) 섹션의 `login` 속성을 통해 구성됩니다.

구성은 단일 로그인 URL을 지정하거나 로그인 유형으로 입력된 로그인 URL의 맵을 지정할 수 있습니다. 다음은 단일 로그인 URL의 예입니다.
```json
{
  "login": "https://publisher.com/amp-login.html?rid={READER_ID}"
  }
```

다음은 다중 로그인 URL의 예입니다.
```json
{
  "login": {
    "signin": "https://publisher.com/signin.html?rid={READER_ID}",
    "signup": "https://publisher.com/signup.html?rid={READER_ID}"
    }
  }
```

URL은 [URL 변수에 액세스](#access-url-variables) 섹션에 정의된 대로 매개변수를 사용할 수 있습니다. 예를 들면 AMP 독자 ID 및 문서 URL을 전달할 수 있습니다. `RETURN_URL` 쿼리 대체를 사용하여 반환 URL의 쿼리 매개변수를 지정할 수 있습니다(예: `?ret=RETURN_URL`). 반환 URL은 필수사항이며, `RETURN_URL` 대체가 지정되지 않은 경우 기본 쿼리 매개변수 이름인 'return'과 함께 자동으로 삽입됩니다.

로그인 페이지는 특별한 제약 조건이 없는 일반 웹페이지이며, [브라우저 대화상자](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)로서 정상적으로 작동해야 합니다. 자세한 내용은 [로그인 흐름](#login-flow) 섹션을 참조하세요.

요청 형식은 다음과 같습니다.
```text
https://publisher.com/amp-login.html?
rid=READER_ID
&url=SOURCE_URL
&return=RETURN_URL
```
`RETURN_URL` 대체가 지정되지 않은 경우 “return” URL 매개변수는 AMP 런타임에 의해 자동으로 추가됩니다. 로그인 페이지의 작업이 완료되면, 다음과 같은 형식의 지정된 “반환 URL”로 리디렉션해야 합니다.
```text
RETURN_URL#success=true|false
```
URL 해시 매개변수 'success'의 사용에 유의하세요. 로그인이 성공했는지 취소되었는지에 따라 값은 'true' 또는 'false'가 됩니다. 가능하면 성공 또는 실패의 경우 모두 로그인 페이지가 신호를 전송하는 것이 바람직합니다.

`success=true` 신호가 반환되면, AMP 런타임은 승인 및 핑백 엔드포인트에 대한 호출을 반복하여 문서의 상태를 업데이트하고 새 액세스 프로필과 함께 '보기'를 보고합니다.

#### 로그인 링크 <a name="login-link"></a>

게시자는 문서 내용의 원하는 위치에 로그인 링크를 배치할 수 있습니다.

[AMP 액세스 구성](#configuration) 섹션의 'login' 속성을 통해 하나 이상의 로그인 URL이 구성됩니다.

로그인 링크는 'on' 속성을 허용하는 HTML 요소에서 선언할 수 있습니다. 일반적으로 앵커 또는 버튼 요소가 이에 해당합니다. 단일 로그인 URL을 구성할 경우 형식은 다음과 같습니다.
```html
<a on="tap:amp-access.login">로그인 또는 구독</a>
```

다중 로그인 URL을 구성할 경우 형식은 `tap:amp-access.login-{type}`입니다. 예:
```html
<a on="tap:amp-access.login-signup">구독</a>
```

네임스페이스를 사용할 경우 형식은 `tap:amp-access.login-{namespace}` 또는 `tap:amp-access.login-{namespace}-{type}`입니다.

AMP는 로그인과 구독을 구분하지 않습니다. 이러한 구분은 다중 로그인 URL/링크를 사용하여 게시자가 구성하거나 게시자 측에서 구성됩니다.

## *amp-analytics* 와 통합 <a name="integration-with-amp-analytics"></a>

*amp-analytics* 와의 통합은 [amp-access-analytics.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md)에 문서화되어 있습니다.

## CORS 오리진 보안 <a name="cors-origin-security"></a>

승인 및 핑백 엔드포인트는 CORS 엔드포인트이며 [AMP CORS 보안 사양](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)에 설명된 보안 프로토콜을 구현해야 합니다.

## 한도 측정 <a name="metering"></a>

한도 측정은 일정 기간 여러 문서 보기에 대해 독자에게 프리미엄 콘텐츠를 무료로 보여주는 시스템입니다. 일정한 할당량에 도달하면 독자에게 페이월 시작이 안내되고, 업셀 메시지 및 가입/로그인 링크와 함께 부분 콘텐츠가 표시됩니다. 예를 들어, '독자는 매월 10개의 기사를 무료로 읽을 수 있습니다'라고 한도 측정을 정의할 수 있습니다.

AMP 액세스는 한도 측정 액세스를 구현하기 위해 다음과 같은 기능을 제공합니다.

1. 한도 측정 정보를 저장하는 데 READER_ID를 사용해야 합니다. 게시자가 제3자 컨텍스트에서 쿠키를 항상 설정할 수 있을 것으로 기대할 수 없으므로, 데이터는 서버 측에 저장해야 합니다.
2. '읽기 횟수'는 핑백 엔드포인트에서만 업데이트할 수 있습니다.
3. 고유한 문서에 대해서만 할당량을 계산할 수 있습니다. 즉, 동일한 문서를 10번 새로 고치더라도 단일 보기가 됩니다. 이를 위해 승인 및 핑백 엔드포인트는 `SOURCE_URL` 또는 유사한 URL 변수를 삽입할 수 있습니다. [URL 면수에 액세스](#access-url-variables)를 참조하세요.

## 첫 번째 클릭 무료 <a name="first-click-free"></a>

Google의 첫 번째 클릭 무료(FCF) 정책은 [여기](https://support.google.com/news/publisher/answer/40543)에 설명되어 있으며, 좀 더 자세한 최신 업데이트는 [여기](https://googlewebmastercentral.blogspot.com/2015/09/first-click-free-update.html)에서 확인할 수 있습니다.

FCF를 구현하려면 게시자는 (1) 각 보기에 대해 참조 서비스를 결정할 수 있어야 하며, (2) 각 독자에 대해 일별 보기 수를 계산할 수 있어야 합니다.

두 단계 모두 AMP 액세스 사양에 포함됩니다. [URL 변수에 액세스](#access-url-variables)에 설명된 대로 `DOCUMENT_REFERRER` URL 대체를 사용하여 승인 및 핑백 URL에 리퍼러를 삽입할 수 있습니다. 서버 측에서 핑백 엔드포인트를 사용해 보기 카운팅을 수행할 수 있습니다. 이는 [한도 측정](#metering)에 설명된 한도 측정 구현과 매우 유사합니다.

## 로그인 흐름 <a name="login-flow"></a>

AMP는 자체 창, 팝업 또는 탭으로 로그인 대화상자를 시작합니다. 가능한 경우 AMP 뷰어는 최상위 브라우저 API를 사용할 수 있도록 브라우저 컨텍스트에서 로그인 대화상자를 시작하려고 시도해야 합니다.

로그인 흐름은 독자가 로그인 링크를 활성화할 때 AMP 런타임에 의해 시작되며, 자세히 설명하자면 다음과 같은 단계를 따릅니다.

1. 로그인 대화상자(자체 창)가 AMP 런타임 또는 뷰어에 의해 지정된 로그인 URL에 대해 열립니다. URL에는 별도의 "반환 URL" URL 쿼리 매개변수 (`&amp;return=RETURN_URL`)이 포함됩니다. 독자 ID와 같은 여러 개의 다른 매개변수를 URL로 확장할 수도 있습니다. 자세한 내용은 [로그인 페이지](#login-page) 섹션을 참조하세요.
2. 게시자가 자유 형식의 로그인 페이지를 표시합니다.
3. 독자가 사용자 이름/비밀번호 입력, 소셜 로그인 사용 등과 같은 로그인 단계를 수행합니다.
4. 독자가 로그인을 제출합니다. 게시자가 인증을 완료하고 쿠키를 설정한 다음 이전에 요청한 '반환 URL'로 독자를 리디렉션합니다. 리디렉션에는 URL 해시 매개변수 `success`가 포함되며, 값은 `true` 또는 `false`일 수 있습니다.
5. 로그인 대화상자가 "반환 URL"로 리디렉션됩니다.
6. AMP 런타임이 문서를 다시 승인합니다.

2~5단계만 게시자가 처리해야 합니다. 게시자는 자체 로그인 페이지를 제공하고 완료 시 올바른 리디렉션을 보장하기만 하면 됩니다. 로그인 페이지에는 특별한 제약 조건이 없으며, 대화상자로서 잘 작동해야 됩니다.

항상 그렇듯이, 로그인 페이지 호출에 독자 ID를 포함해야 합니다. 게시자는 ID 매핑을 위해 독자 ID를 사용할 수 있습니다. 게시자는 자체 창에서 쿠키를 수신하게 되며 설정할 수도 있습니다. 독자가 이미 게시자 측에 로그인한 것으로 밝혀지면, 게시자는 `success=true` 응답과 함께 "반환 URL"로 즉시 리디렉션하는 것이 좋습니다.

## AMP 용어집 <a name="amp-glossary"></a>

* **AMP 문서** - AMP 형식을 따르고 AMP 유효성 검사 도구에 의해 검증된 HTML 문서. Google AMP 캐시에서 AMP 문서를 캐시할 수 있습니다.
* **AMP 유효성 검사 도구** - HTML 문서의 정적 분석을 수행하고 문서가 AMP 형식을 따르는지에 따라 성공 또는 실패를 반환하는 컴퓨터 프로그램.
* **AMP 런타임** - AMP 문서를 실행하는 자바스크립트 런타임.
* **Google AMP 캐시** - AMP 문서의 프록싱 캐시.
* **AMP 뷰어** - AMP 문서를 표시/삽입하는 웹 또는 기본 애플리케이션.
* **Publisher.com** - AMP 게시자의 사이트.
* **CORS 엔드포인트** - Cross-Origin HTTPS 엔드포인트. 자세한 내용은 [https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)를 참조하세요. 요청을 보호하는 방법은 [CORS 오리진 보안](#cors-origin-security)을 참조하세요.
* **독자** - AMP 문서를 보는 실제 사람.
* **AMP 사전 렌더링** - AMP 뷰어는 숨겨진 문서를 표시되기 전에 렌더링하는 사전 렌더링을 이용할 수 있습니다. 이렇게 할 경우 성능이 상당히 향상됩니다. 그러나 독자가 실제로 문서를 보지 않을 수 있으므로 문서 사전 렌더링은 보기로 계산되지 않는다는 사실을 고려하는 것이 중요합니다.

## 버전 <a name="revisions"></a>

* 2016년 9월 2일: 'noPingback' 구성 속성 및 선택적 핑백
* 2016년 3월 3일: 로그인 후 핑백 재전송(v0.5)
* 2016년 2월 19일: URL var 대체에서 `{}`를 제거하도록 샘플 수정
* 2016년 2월 15일: [구성](#configuration) 및 [승인 엔드포인트](#authorization-endpoint)가 승인 실패 시 사용할 수 있는 "authorizationFallbackResponse" 속성을 허용
* 2016년 2월 11일: [승인 엔드포인트](#authorization-endpoint)에서 승인 요청 시간 제한
* 2016년 2월 11일: `object.field`와 같은 중첩된 입력란 참조 허용
* 2016년 2월 9일: [첫 번째 클릭 무료](#first-click-free) 및 [한도 측정](#metering) 섹션
* 2016년 2월 3일: '소스 오리진' 보안에 대한 사양이 [CORS 오리진 보안](#cors-origin-security)에 추가됨
* 2016년 2월 1일: RETURN_URL URL 대체를 사용해 로그인 페이지에 대한 'return' 쿼리 매개변수 맞춤화 가능

## 부록 A: 'amp-access' 식 문법 <a name="appendix-a-amp-access-expression-grammar"></a>

최근 BNF 문법은 [access-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/0.1/access-expr-impl.jison) 파일에서 확인할 수 있습니다.

이 문법의 주요 발췌 내용:
```javascript
search_condition:
  search_condition OR search_condition
  | search_condition AND search_condition
  | NOT search_condition
  | '(' search_condition ')'
  | predicate

predicate:
    comparison_predicate | truthy_predicate

comparison_predicate:
    scalar_exp '=' scalar_exp
    | scalar_exp '!=' scalar_exp
    | scalar_exp '<' scalar_exp
    | scalar_exp '<=' scalar_exp
    | scalar_exp '>' scalar_exp
    | scalar_exp '>=' scalar_exp

truthy_predicate: scalar_exp

scalar_exp: literal | field_ref

field_ref: field_ref '.' field_name | field_name

literal: STRING | NUMERIC | TRUE | FALSE | NULL
```

`amp-access` 식은 AMP 런타임 및 Google AMP 캐시에 의해 평가됩니다. 게시자가 구현해야 하는 사양의 일부가 아닙니다. 정보 제공을 위해 여기에 있는 것입니다.

## 자세한 설명 <a name="detailed-discussion"></a>

이 섹션에서는 amp-access 사양의 기본 설계에 대해 자세히 설명하고 설계 선택 사항을 안내합니다. 곧 제공될 예정입니다.

## 유효성 검사 <a name="validation"></a>

AMP 유효성 검사 도구 사양의 [amp-access 규칙](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/validator-amp-access.protoascii)을 참조하세요.
