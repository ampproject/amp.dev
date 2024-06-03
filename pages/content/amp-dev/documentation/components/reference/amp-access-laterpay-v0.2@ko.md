---
$title: amp-access-laterpay
$category@: dynamic-content
formats:
  - websites
teaser:
  text: 게시자가 LaterPay 소액결제 플랫폼과 손쉽게 통합할 수 있습니다.
---

<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



게시자가 [LaterPay](https://www.laterpay.net) 소액결제 플랫폼과 손쉽게 통합할 수 있습니다. `amp-access-laterpay`는 [AMP 액세스](amp-access.md)를 기반으로 하며 AMP 액세스가 필요합니다.

<table>
  <tr>
    <td class="col-fourty"><strong>필수 스크립트</strong></td>
    <td>
      <small>'amp-access-laterpay', 'amp-access', 'amp-analytics'용 스크립트가 필요합니다.</small>
      <div>
        <code>&lt;script async custom-element="amp-access" src="https://cdn.ampproject.org/v0/amp-access-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-access-laterpay" src="https://cdn.ampproject.org/v0/amp-access-laterpay-0.2.js"></script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td><strong>예</strong></td>
    <td>AMP By Example의 <a href="https://ampbyexample.com/components/amp-access-laterpay/">annotated amp-access-laterpay</a> 예를 참조하세요.</td>
  </tr>
</table>


## 동작 <a name="behavior"></a>

[LaterPay](https://laterpay.net)는 사용자가 클릭 두 번으로 모든 온라인 콘텐츠를 구매하고, 사전 등록, 개인 데이터 또는 결제 없이 즉시 액세스할 수 있는 소액결제 플랫폼입니다. 사용자는 구매 금액이 웹사이트 전체에서 총 5달러 또는 5유로에 도달한 경우에만 금액을 지불합니다. 콘텐츠 제공업체는 개별 상품 또는 고정 요금이나 제한된 시간만큼 콘텐츠에 액세스할 수 있는 시간 패스를 판매할 수 있습니다.

[커넥터 스크립트 통합](https://docs.laterpay.net/connector/)으로 LaterPay를 통합하는 경우 AMP 페이지에서는 이 통합을 사용할 수 없습니다. `amp-access-laterpay`는 커넥터 스크립트와 유사하여 비슷한 기능을 제공하지만 AMP 페이지용으로 빌드되었습니다.

간단히 `amp-access-laterpay`를 유일한 통합 방법으로 사용하여 LaterPay를 통해 콘텐츠를 판매할 수도 있습니다.

`amp-access-laterpay` 구성요소는 내부적으로 AMP 액세스를 사용해 AMP 액세스와 비슷한 동작을 제공하지만, LaterPay 서비스와 함께 사용하도록 맞춤설정되었습니다.

AMP 액세스와 함께 사용하려는 자체 페이월 서비스가 있고 동일한 페이지에서 이 서비스를 LaterPay와 함께 사용하려는 경우 [그렇게 할 수도 있습니다](#using-amp-access-laterpay-together-with-amp-access).

`amp-access-laterpay` 구성요소는 LaterPay 서비스와 함께 사용하도록 미리 구성되었기 때문에 승인이나 핑백 구성이 필요하지 않습니다. 또한 로그인 링크를 수동으로 설정할 필요가 없습니다.

게시자의 LaterPay 계정에 다양한 구매 옵션을 구성할 수 있으며, 구성요소에서는 구성을 가져와서 이용 가능한 구매 옵션 목록을 만듭니다.

구매 옵션을 구성하는 방법을 알아보려면 [LaterPay 커넥터](https://docs.laterpay.net/connector/configuration/), LaterPay의 기존 프런트 엔드 통합 구성에 관한 문서를 참조하세요.

생성된 목록은 게시자의 환경설정에 따라 스타일이 지정되고 표시될 수 있습니다.

또한 이 구성요소는 [액세스 콘텐츠 마크업](amp-access.md#access-content-markup)을 사용해 콘텐츠를 표시하고 숨깁니다.

## 구성 <a name="configuration"></a>

구성은 AMP 액세스와 비슷하지만 승인, 핑백, 로그인 링크가 필요하지 않습니다.

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "property": value
      }
    }
</script>
```

`laterpay` 구성 개체에 다음 값을 설정할 수 있습니다.

<table>
  <tr>
    <th class="col-fourty">속성</th>
    <th class="col-twenty">값</th>
    <th class="col-fourty">설명</th>
  </tr>
  <tr>
    <td><code>articleTitleSelector</code></td>
    <td>CSS 선택기 <strong>필수</strong></td>
    <td>페이지에서 기사 제목을 포함하는 요소를 결정하는 CSS 선택기입니다. 이 속성을 사용하면 기사를 구매할 때 표시되는 페이지에 제목이 포함되어 사용자가 구매 내용을 알 수 있습니다.</td>
  </tr>
  <tr>
    <td><code>articleId</code></td>
    <td>쉼표로 구분된 식별자 목록</td>
    <td>기본적으로 기사의 URL은 구매 옵션과 일치시키는 데 사용되지만, 구매 옵션의 URL 경로를 지정하는 대신 LaterPay 커넥터 UI에 기사 ID를 설정한 다음 <code>articleId</code> 속성을 사용해 구매 옵션과 기사를 일치시킬 수 있습니다.
      <br>
        기사의 URL에 의한 구매 옵션 일치가 충분히 유연하지 않은 경우 필요합니다. 이 속성이 유용한 몇 가지 예제 시나리오를 자세히 살펴보려면 <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/article_id/">LaterPay Connector() 구성 페이지</a>를 참조하세요.</td>
      </tr>
      <tr>
        <td><code>jwt</code></td>
        <td>동적 결제 구성을 위한 JWT 토큰</td>
        <td>이 옵션을 사용하면 이용 가능한 유료 콘텐츠 구성으로 서명된 JSON 웹 토큰을 지정할 수 있습니다. 즉, LaterPay의 커넥터 관리 인터페이스에 수동으로 지정하는 것이 아니라 페이지에서 프로그래매틱 방식으로 생성되는 인페이지 구성을 제공할 수 있습니다. 이 옵션은 여러 기사의 단일 구매를 구성할 때 특히 유용할 수 있습니다.
          <br>
            이 토큰을 만드는 방법과 토큰에 지정될 수 있는 콘텐츠에 대한 자세한 내용은 커넥터 스크립트 통합에 관한 LaterPay의 <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/config_token/#jwt-object-properties">JWT 유료 콘텐츠 API</a> 문서를 참조하세요.
          </td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td>문자열</td>
          <td>언어에 적합한 가격 형식 지정 스타일을 정의합니다.</td>
        </tr>
        <tr>
          <td><code>localeMessages</code></td>
          <td>개체</td>
          <td>게시자가 생성된 구매 옵션 목록에 표시된 텍스트를 맞춤설정하거나 현지화할 수 있게 합니다. 자세한 내용은 <a href="#localization">현지화</a> 섹션을 참조하세요.</td>
        </tr>
        <tr>
          <td><code>scrollToTopAfterAuth</code></td>
          <td>부울</td>
          <td>true이면 승인 프로세스가 완료된 후 페이지를 맨 위로 스크롤합니다. 이 옵션은 대화상자를 표시하는 위치가 페이지 하단에 있고 사용자가 페이지로 돌아간 후 현재 스크롤 위치로 인해 혼란스러워할 수 있는 경우 유용합니다.</td>
        </tr>
        <tr>
          <td><code>region</code></td>
          <td>문자열</td>
          <td><code>eu</code> 또는 <code>us</code> <a href="https://connectormwi.laterpay.net/docs/regions-environments-locales.html">LaterPay 지역</a>에 있는 경우 지정합니다.</td>
        </tr>
        <tr>
          <td><code>sandbox</code></td>
          <td>부울</td>
          <td>샌드박스 모드를 사용해 서버 구성을 테스트하는 경우에만 필요합니다. AMP의 <a href="../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime">개발 모드</a>도 사용해야 합니다.</td>
        </tr>
      </table>

## 액세스 콘텐츠 마크업 사용 및 구매 목록 표시 <a name="using-access-content-markup-and-showing-the-purchase-list"></a>

액세스 콘텐츠 마크업은 AMP 액세스와 동일한 방식으로 사용되어야 합니다.

ID `amp-access-laterpay-dialog`가 포함된 요소는 사용자가 기사 액세스 권한이 없을 때 구매 옵션 목록을 렌더링합니다. 이 목록은 몇 가지 매우 기본적인 스타일 지정을 포함하고 있으며 게시자의 페이지에 더욱 통합된 느낌을 주도록 맞춤설정될 수 있습니다.

기본 스타일 지정을 사용하려면 `amp-access-laterpay` 클래스를 추가해야 합니다.

```html
<section amp-access="NOT error AND NOT access" amp-access-hide="">
  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide="">
  죄송합니다. 문제가 발생했습니다.
</section>

<div amp-access="access" amp-access-hide="">
  <p>...기사 내용...</p>
</div>

```

## 스타일 지정 <a name="styling"></a>

여러 클래스가 생성된 마크업의 일부 요소에 적용됩니다. 클래스가 없는 요소는 CSS 요소 선택기를 통해 명확히 참조될 수 있습니다.

일부 기본 레이아웃 CSS가 이미 있지만 게시자는 페이지의 디자인과 분위기가 일치하도록 스타일을 지정하는 것이 좋습니다.

대화상자용으로 생성된 구조의 형식은 다음과 같습니다.

```html

<div id="amp-access-laterpay-dialog" class="amp-access-laterpay">
  <div class="amp-access-laterpay-container">
    <p class="amp-access-laterpay-header">
      선택사항이며 헤더 언어 메시지가 정의된 경우 표시됩니다.
    </p>
    <ul>
      <li>
        <label>
          <input name="purchaseOption" type="radio">
            <div class="amp-access-laterpay-metadata">
              <span class="amp-access-laterpay-title">구매 옵션 제목</span>
              <p class="amp-access-laterpay-description">구매 옵션 설명</p>
            </div>
          </label>
          <p class="amp-access-laterpay-price-container">
            <span class="amp-access-laterpay-price">0.15</span>
            <sup class="amp-access-laterpay-currency">USD</sup>
          </p>
        </li>
        <!-- ... 다른 구매 옵션을 위한 추가 목록 항목 ... -->
      </ul>
      <button class="amp-access-laterpay-purchase-button">지금 구매</button>
      <p class="amp-access-laterpay-already-purchased-container">
        <a href="...">이미 구매함</a>
      </p>
      <p class="amp-access-laterpay-footer">
        선택사항이며 바닥글 언어 메시지가 정의된 경우 표시됩니다.
      </p>
    </div>
    <p class="amp-access-laterpay-badge"><a href="https://laterpay.net" target="_blank">LaterPay</a> 제공</p>
  </div>

```

## 현지화 <a name="localization"></a>

구매 옵션의 대화상자에 표시된 텍스트는 게시자가 LaterPay 커넥터 UI에 정의합니다.

나머지 텍스트는 확장된 구성요소의 일부이며 다음과 같이 구성 옵션을 통해 변경 및 현지화될 수 있습니다.

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "localeMessages": {
        "messageKey": "message value"
        }
      }
    }
</script>

```

다음 메시지 키는 번역되거나 맞춤설정될 수 있지만 원래 의미와 의도가 유지되어야 합니다.

<table>
  <tr>
    <th class="col-fourty">키</th>
    <th class="col-fourty">설명</th>
    <th>기본값</th>
  </tr>
  <tr>
    <td><code>payLaterButton</code></td>
    <td>나중에 지불할 수 있는 옵션용 구매 버튼에 표시되는 텍스트입니다.</td>
    <td>'지금 구매하고 나중에 지불'</td>
  </tr>
  <tr>
    <td><code>payNowButton</code></td>
    <td>구매 시 지불해야 할 옵션용 구매 버튼에 표시되는 텍스트입니다.</td>
    <td>'지금 구매'</td>
  </tr>
  <tr>
    <td><code>defaultButton</code></td>
    <td>옵션이 선택되기 전 구매 버튼에 표시되는 기본 텍스트입니다.</td>
    <td>'지금 구매'</td>
  </tr>
  <tr>
    <td><code>alreadyPurchasedLink</code></td>
    <td>사용자가 이전에 기사를 구매했지만 쿠키를 분실했거나 쿠키가 다른 기기에 있는 경우 이 링크를 사용해 LaterPay에 로그인하고 구매 항목을 검색할 수 있습니다.</td>
    <td>'이미 구매함'</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>header</code></td>
    <td>머리글 텍스트(선택사항)입니다.</td>
    <td></td>
  </tr>
  <tr>
    <td class="col-fourty"><code>footer</code></td>
    <td>바닥글 텍스트(선택사항)입니다.</td>
    <td></td>
  </tr>
</table>

## 애널리틱스 <a name="analytics"></a>

`amp-access-laterpay`는 `amp-access` 기반이므로 `amp-access`에서 보낸 모든 [애널리틱스 이벤트](amp-access.md#integration-with-amp-analytics)를 지원합니다.

[https://ampexample.laterpay.net/](https://ampexample.laterpay.net/)의 예는 모두 실제 작동 방식에 관한 더 완전한 예를 보려는 경우 이러한 애널리틱스 이벤트를 보내도록 구성되어 있습니다.

## AMP 액세스와 함께 AMP 액세스 LaterPay 사용 <a name="using-amp-access-laterpay-together-with-amp-access"></a>

기존 구독 시스템이 있고 개별 기사 판매에만 LaterPay를 사용하려는 경우 AMP 액세스와 AMP 액세스 LaterPay를 함께 사용하여 동일한 페이지에 두 가지 판매 방법을 동시에 사용할 수 있습니다.

먼저 기존 페이월과 함께 AMP 액세스를 구성하는 방법을 알아보려면 [AMP 액세스](amp-access.md) 문서를 참조하세요.

[여러 제공업체](amp-access.md#multiple-access-providers) 섹션에서는 네임스페이스로 여러 제공업체를 설정하는 방법을 설명합니다.

LaterPay 및 기존 페이월 통합과 함께 사용하는 경우 필수 구성 형식은 다음과 같을 수 있습니다.

```html

<script id="amp-access" type="application/json">
  [
    {
      "vendor": "laterpay",
      "laterpay": {
        "region": "us"
      },
      "namespace": "laterpay"
    },
    {
      "authorization":
          "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
      "pingback":
          "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
      "login":
          "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
      "authorizationFallbackResponse": {"error": true},
      "namespace": "publishername"
    }
  ]
</script>

```

반면 콘텐츠 액세스 마크업 형식은 다음과 같이 될 수 있습니다.

```html
<section amp-access="NOT error AND NOT laterpay.access AND NOT publishername.access" amp-access-hide>
  <p>
    <a on="tap:amp-access.login-publishername">PublisherName 구독에 액세스하려면 여기에서 로그인하세요.</a>
  </p>

  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide>
  죄송합니다. 문제가 발생했습니다.
</section>

<div amp-access="laterpay.access OR publishername.access" amp-access-hide>
  <p>...기사 내용...</p>
</div>

```

[https://ampexample.laterpay.net/dual-amp-access.html](https://ampexample.laterpay.net/dual-amp-access.html)에서 더 완전한 예를 참조하세요.

## 관련 문서 <a name="related-documentation"></a>

* [AMP 액세스](amp-access.md)
* [LaterPay](https://www.laterpay.net)
* [LaterPay: 소액결제 작동 원리](https://docs.laterpay.net/how_we_do_micropayments/)
* [LaterPay 커넥터](https://connectormwi.laterpay.net/docs/index.html): AMP 액세스 LaterPay와 비슷하지만 AMP가 아닌 페이지를 위한 것입니다.

## 확인 <a name="validation"></a>

AMP 유효성 검사기 사양의 [amp-access-laterpay 규칙](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access-laterpay/validator-amp-access-laterpay.protoascii)을 참조하세요.
