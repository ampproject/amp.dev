---
'$title': AMP로 미인증 사용자 상태 관리하기
$order: 2
formats:
  - websites
teaser:
  text: '**목차**'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

**목차**

- [배경 설명 ](#background)
- [구현 가이드 ](#implementation-guide)
  - [시작하기 전](#before-getting-started)
  - [태스크 1: 퍼블리셔 출처의 비 AMP 페이지에서 식별자 설정 및 분석 핑 전송](#task1)
  - [태스크 2: AMP 페이지에서 amp-analytics 핑에 클라이언트 ID 대체 값을 포함하여 식별자 설정 및 분석 핑 전송](#task2)
  - [태스크 3: 퍼블리셔 출처의 페이지에서 분석 핑 처리](#task3)
  - [태스크 4: AMP 캐시 또는 AMP 뷰어 표시 컨텍스트의 분석 핑 처리 및 식별자 매핑 설정(필요한 경우) ](#task4)
  - [태스크 5: 연결 시 클라이언트 ID 사용 및 양식 제출 ](#task5)
- [강력 권고 사항 ](#strongly-recommended-practices)

오늘날의 웹에서 사용자 상태는 중요한 개념입니다. 사용자 상태를 관리하여 활성화 가능한 사용 사례를 살펴보세요.

- 상품 판매자는 사용자가 두 번째 방문할 경우 몇 주 전 해당 사용자가 첫 방문 시 장바구니에 추가해둔 동일한 항목을 보여주는 유용한 **장바구니** 기능을 추가할 수 있습니다. 이러한 경험은 사용자가 과거에 구매를 고려했던 항목을 의식하도록 하여 해당 항목의 구매 가능성을 높여줍니다.
- 뉴스 퍼블리셔는 여러 번 기사를 읽은 독자의 데이터에 기반하여 **추천 기사**를 맞춤 제공할 수 있습니다. 이에 따라 독자는 관심을 유지하고 더 많은 콘텐츠를 탐색합니다.
- 어떤 유형이든 사이트를 운영 중인 웹사이트 개발자는 **분석** 데이터를 수집하여 2회의 페이지뷰가 있을 시 동일 사용자가 해당 페이지를 두 번 방문한 것인지 혹은 두 명의 다른 사용자가 한 페이지를 두 번 방문한 것인지 밝혀낼 수 있습니다. 이러한 인사이트를 통해 사이트의 퍼포먼스를 확인하고 궁극적으로 개선 방법을 찾는 데 도움이 됩니다.

이 글은 보다 성공적으로 **AMP에서 미인증 사용자 상태를 관리**하는 데 도움을 드리고자 고안되었습니다. 이로써 사용자가 로그인 등을 통해 식별 정보를 제공하지 않더라도 원활한 사용자 경험을 선사할 수 있습니다. 이 주제에 접근하는 과정에서의 어려움 및 고려 사항을 검토한 후, 이 가이드는 AMP로 지원되는 사용자 상태를 간략히 설명하고 기술적 구현의 접근 방식에 대한 권고 사항을 제안합니다.

## 배경 설명 <a name="background"></a>

AMP 페이지는 웹사이트, Google 검색 또는 타사 앱과 같은 여러 컨텍스트에서 페이지를 표시할 수 있으므로 사용자 상태에 관한 이 주제는 AMP에서 주의 깊게 살펴볼 만한 내용입니다. 이 섹션에서는 사용자가 이러한 컨텍스트 사이를 이동할 경우 사용자 상태 관리의 어려움을 소개합니다.

### AMP 페이지의 컨텍스트 표시 <a name="display-contexts-for-amp-pages"></a>

AMP를 콘텐츠가 어디서든 빠르게 로드될 수 있게 지원하는 휴대용 콘텐츠 형식으로 생각하실 수 있습니다. AMP 문서는 세 가지 주요 컨텍스트에서 표시됩니다.

- 퍼블리셔의 출처
- AMP 캐시
- AMP 뷰어

<table>
  <tr>
    <th width="20%">컨텍스트</th>
    <th width="20%">비 AMP 페이지 지원 여부</th>
    <th width="20%">AMP 페이지 지원 여부</th>
    <th>샘플 URL</th>
  </tr>
  <tr>
    <td>퍼블리셔의 출처</td>
    <td>지원</td>
    <td>지원</td>
    <td><code>https://example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>AMP 캐시</td>
    <td>미지원</td>
    <td>지원</td>
    <td><code>https://example-com.cdn.ampproject.org/s/example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>AMP 뷰어</td>
    <td>미지원</td>
    <td>지원</td>
    <td><code>https://google.com/amp/s/example.com/article.amp.html</code></td>
  </tr>
</table>

이 상황들을 더 자세히 살펴보도록 하겠습니다.

**컨텍스트 1: 퍼블리셔의 출처.** AMP 페이지는 퍼블리셔의 사이트에서 호스팅되고 해당 사이트를 통해 액세스 가능하도록 배포됩니다. 예를 들어, `https://example.com`에서 `https://example.com/article.amp.html`를 찾을 수 있습니다.

퍼블리셔는 콘텐츠를 AMP 페이지로만 게시하거나 두 가지 버전으로 게시하도록 선택할 수 있습니다(즉, AMP 콘텐츠가 비 AMP 콘텐츠와 "한 쌍"으로 제공되는 것입니다). 이와 같은 “한 쌍” 모델을 사용할 경우 검색 엔진, 소셜 미디어 사이트 및 기타 플랫폼에서 페이지의 AMP 버전을 검색할 수 있도록 [특정 단계](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery)를 거쳐야 합니다. 두 가지 게시 접근 방식 모두 완전히 지원되며, 어떤 방식을 선택할지는 퍼블리셔가 정하게 됩니다.

> **참고:**
> 앞서 설명해드린 “한 쌍” 게시 모델에 따르면 퍼블리셔의 출처(상단의 예시에서는 `https://example.com`)는 **AMP 및 비 AMP 콘텐츠에 모두 액세스할 수 있는** 컨텍스트입니다. 물론 아래 설명과 같이 AMP 캐시 및 AMP 뷰어는 AMP 콘텐츠만을 전달하므로, 컨텍스트 1은 두 가지 버전이 모두 지원되는 유일한 컨텍스트입니다.

**컨텍스트 2: AMP 캐시.** AMP 파일이 타사 캐시로 클라우드에서 캐싱되면 콘텐츠가 사용자의 모바일 기기에 도달하는 데 필요한 시간이 단축됩니다.

콘텐츠 제작자는 AMP 형식을 사용하여 AMP 파일의 콘텐츠가 타사에서 캐싱 가능하도록 제작합니다. 이러한 유형의 프레임워크를 통해 퍼블리셔는 콘텐츠를 지속적으로 제어하지만(위에 설명된 바와 같이 출처에 게시하는 방식으로), 플랫폼에서는 콘텐츠를 캐싱 또는 미러링하여 사용자에게 최적의 속도로 전달합니다.

통상적으로 이러한 방식으로 지원되는 콘텐츠는 다른 도메인에서 생성됩니다. 예를 들어 [Google AMP 캐시](https://developers.google.com/amp/cache/overview)는 `https://cdn.ampproject.org`를 사용하여 `https://example-com.cdn.ampproject.org/s/example.com/article.amp.html`와 같은 콘텐츠를 전달했습니다.

**컨텍스트 3: AMP 뷰어.** 이 AMP 형식은 타사 AMP 뷰어에 임베딩을 지원할 수 있도록 제작되었습니다. 이로써 AMP 파일 및 뷰어 경험 간 높은 수준의 협업이 가능해졌고, 스마트하고 안전한 콘텐츠 사전 로딩 및 사전 렌더링, 전체 AMP 페이지 간의 스와이핑과 같은 혁신적 어포던스 등의 이점을 제공했습니다.

AMP 캐시 사례와 마찬가지로 AMP 뷰어의 도메인도 퍼블리셔 출처와 달라야 합니다. 예를 들어 Google 검색의 뷰어는 `https://google.com`에서 호스팅되며 Google AMP 캐시에서 퍼블리셔 콘텐츠를 요청하는 iframe을 임베딩합니다.

### 다양한 컨텍스트에 따른 다양한 상태 관리<a name="multiple-contexts-means-multiple-state-management"></a>

퍼블리셔는 각각의 디스플레이 컨텍스트의 사용자 상태를 별도로 관리합니다. 상태 유지에 쿠키 또는 로컬 저장소를 활용하는 AMP의 [클라이언트 ID](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#client-id)는 AMP 페이지에서 사용자를 위한 안정적인 가명 식별자가 사용되도록 필수 지원을 제공합니다. 구현의 관점에서 쿠키 또는 로컬 저장소가 사용될 경우 AMP는 디스플레이 컨텍스트에 따라 무엇을 사용할지 선택합니다. 퍼블리셔의 개수가 수백, 수천 개로 확장된 상태를 관리하는 기술적 실현 가능성이 이러한 선택에 영향을 미칩니다.

하지만 AMP 페이지 퍼블리셔는 여러 컨텍스트가 포함된 사용자 여정을 (무심코) 설계할 가능성이 높습니다. 그럼 이제 앞서 살펴본 장바구니 사용 사례를 확인하고 전체적인 **사용자 스토리**를 완성하는 데 필요한 세부 사항을 추가해보겠습니다.

> _1일 차에 사용자는 Google 검색을 통해 Example Inc.의 AMP 페이지를 발견합니다. Google 검색은 AMP 뷰어에서 AMP 페이지를 로드합니다. 페이지를 둘러보는 동안 사용자는 장바구니에 항목 4개를 추가하지만 결제까지 진행하지는 않습니다. 2주 후 15일 차에 사용자는 구매를 고려하던 4개의 항목을 기억해내고 결제해야겠다고 생각합니다. 따라서 `https://example.com`를 통해 Example Inc. 홈페이지에 직접 액세스하고(이 홈페이지는 비 AMP 페이지) 해당 항목 4개가 바구니에 계속 저장되어 있음을 발견합니다._

이 시나리오에서 사용자가 AMP 뷰어 컨텍스트에서 게시자 출처 컨텍스트로 이동했으며, 이벤트 사이에 시간이 흘렀음에도 일관성 있는 장바구니 경험이 제공되었습니다. 이러한 경험은 무척 합리적이며, 여러분이 장바구니 기능을 설계하는 중이라면 지원을 추가하는 것이 좋습니다. 그렇다면 이 기능은 어떻게 구현할 수 있을까요?

**이 기능 및 사용자 상태가 포함된 모든 경험을 구현하려면 사용자가 이동하는 모든 컨텍스트는 개별적으로 관리되는 상태를 서로 공유해야 합니다.** 컨텍스트의 경계를 가로질러 사용자 식별자가 포함된 쿠키 값을 공유한다는 아이디어가 “완벽!”하다고 생각하시겠죠. 다만, 한 가지 작은 문제가 있습니다. 바로 이러한 각각의 컨텍스트는 동일한 퍼블리셔에서 제어되는 ​​콘텐츠를 표시하지만, 각 컨텍스트의 도메인이 다르기 때문에 서로를 타사로 간주한다는 점입니다.

<amp-img alt="AMP's ability to be displayed in many contexts means that each of those contexts has its own storage for identifiers" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/contexts-with-different-storage.png" width="1030" height="868">
  <noscript><img alt="AMP가 여러 컨텍스트에 표시되는 기능은 각 컨텍스트에 식별자를위한 자체 저장소가 있음을 의미합니다." src="https://github.com/ampproject/amphtml/raw/master/spec/img/contexts-with-different-storage.png"></noscript></amp-img>

다음 논의에서 확인하실 수 있는 것처럼 쿠키와 상호작용 시 타사 위치에 있을 경우 사용자의 브라우저 설정 구성 방식에 따라 문제가 발생할 수 있습니다. 특히 타사 쿠키가 특정 상황에서 차단된 경우 컨텍스트 사이에서 정보 공유 기능도 차단됩니다. 반면 타사 쿠키 작동이 허용된 경우 정보가 공유될 수 있습니다.

## 구현 가이드 <a name="implementation-guide"></a>

이 섹션에서는 사용자 상태 관리에 대한 권고 사항을 제공합니다. 아래 태스크는 진행 과정으로 제시되지만 크게 2가지 부분으로 볼 수 있습니다.

**1번째 부분: 기본적 구현:** 태스크 1-4는 기본 작업을 완료하는 데 반드시 필요합니다. 이때 부분적 구현 완료에 필요한 최소한의 기능 집합을 사용하여 AMP 클라이언트 ID 대체, 쿠키 읽기 및 작성, 백엔드 매핑 테이블 관리 등을 수행합니다. 그런데 왜 "부분적"일까요? 이 태스크에서 수행되는 단계가 쿠키의 읽기 및 작성에 의존적이며 특정 상황에서 브라우저의 쿠키 설정에 따라 금지될 수 있기 때문입니다. 이러한 태스크 집합만으로는 모든 시나리오에서 사용자 상태를 완전히 관리하기에 부족할 수 있습니다.

기초를 마련한 후 다음으로 더 협소한 범위의 사용 사례를 통해 이 주제를 다시 살펴보며, 그 경우에는 사용 사례의 완전한 솔루션이 제시됩니다.

**2번째 부분: 연결 시 클라이언트 ID 사용 및 양식 제출:** 태스크 5에서는 연결 순회/양식 제출 기능을 활용하여 컨텍스트 경계 사이로 AMP 클라이언트 ID 정보를 전달하는 방법을 학습합니다. 이때 사용자는 한 페이지에서 다른 페이지로 바로 이동합니다.

> **주의:**
> 다음 구현 가이드는 쿠키의 사용 및 작업을 권장합니다. [강력 권고 사항](#strongly-recommended-practices) 섹션에서 염두에 두어야 할 중요한 조언을 확인해 주세요.

### 시작하기 전 <a name="before-getting-started"></a>

아래의 기술 지침을 한 단계씩 따라가는 과정에서 **사용자 상태**를 사용자를 대표하는 안정적 **식별자**에 바인딩한다고 가정하겠습니다. 예를 들어 식별자는 `n34ic982n2386n30`처럼 표시될 것입니다. 다음으로 서버 측에서 장바구니 콘텐츠, 이전에 읽은 기사 목록 또는 사용 사례별 기타 데이터와 같은 사용자 상태 정보의 집합에 `n34ic982n2386n30`를 연결합니다.

<amp-img alt="A single identifier could be used to manage user state for many use cases" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/identifiers-for-use-cases.png" width="1276" height="376">
  <noscript><img alt="단일 식별자를 사용하여 많은 사용 사례에서 사용자 상태를 관리 할 수 있습니다." src="https://github.com/ampproject/amphtml/raw/master/spec/img/identifiers-for-use-cases.png"></noscript></amp-img>

이 문서의 나머지 부분에서 명확한 표현을 위해 달러(`$`) 기호를 앞에 붙여 가독성을 높인 식별자인 다양한 문자열을 호출합니다.

[sourcecode:text]
n34ic982n2386n30 ⇒ $sample_id
[/sourcecode]

**사용 사례:** 이 가이드에서는 간단한 페이지뷰 추적(분석)을 위해 사용자 집계를 가장 정확하게 수행할 수 있도록 설계된 예시를 살펴볼 예정입니다. 즉 사용자가 다른 컨텍스트(AMP 및 비 AMP 페이지 간 교차 포함)에서 특정 퍼블리셔의 콘텐츠에 액세스하는 경우에도, 해당 퍼블리셔의 기존 비 AMP 페이지만을 탐색하는 경우와 마찬가지로 액세스 횟수가 사용자에 대한 단일한 이해로 집계됩니다.

**안정적 쿠키 값의 가용성에 대한 추정:** 또한 시간이 지나도 쿠키 값이 유지되어 사용자 세션에서 지원될 수 있도록 사용자가 동일한 기기, 브라우저 및 비공개/시크릿 브라우징이 아닌 모드를 사용한다고 가정합니다. 그렇지 않은 경우 이 기술이 작동할 것으로 기대할 수 없습니다. 필요한 경우 사용자의 인증된(즉, 로그인된) 아이덴티티를 기반으로 사용자 상태를 관리합니다.

**아래의 개념은 다른 사용 사례로 확장 가능:** 이번에는 분석 사용 사례에 중점을 두지만 아래에서 전달하는 개념은 컨텍스트 간 사용자 상태 관리가 필요한 다른 사용 사례에 맞게 개선될 수 있습니다.

<a id="task1"></a>

### 태스크 1: 퍼블리셔 출처의 비 AMP 페이지에서 식별자 설정 및 분석 핑 전송<a name="task-1-for-non-amp-pages-on-the-publisher-origin-set-up-an-identifier-and-send-analytics-pings"></a>

퍼블리셔 출처에서 제공되는 비 AMP 페이지에 대한 분석 구성부터 시작해보겠습니다. 이러한 분석 구성은 Google Analytics 또는 Adobe Analytics와 같은 분석 패키지를 사용하거나 사용자 지정 구현을 작성하는 등의 다양한 방식으로 수행할 수 있습니다.

벤더의 분석 패키지를 사용하는 경우 해당 패키지는 자체 구성 코드 및 API를 통해 쿠키 설정과 핑 전송을 모두 처리합니다. 이런 경우에는 아래 단계를 읽고 현재 분석 접근 방식에 적합한지 확인하는 것이 좋지만 태스크 완료의 일환으로 따로 변경할 사항은 없습니다.

직접 분석을 설정하려는 경우 태스크의 나머지 부분에서 지침을 제공합니다.

##### 퍼스트 파티 쿠키를 사용하여 식별자 설정 <a name="set-up-an-identifier-using-first-party-cookies"></a>

퍼블리셔 출처에서 제공되는 비 AMP 페이지를 사용 중인 경우 이러한 페이지에서 사용될 수 있도록 일관적이고 안정적인 식별자를 설정합니다. 해당 설정은 일반적으로 [퍼스트 파티 쿠키를 통해 구현](https://en.wikipedia.org/wiki/HTTP_cookie#Tracking)됩니다.

예시의 목적에 맞춰 사용자의 최초 방문 시 생성된 쿠키 이름이 `uid`(“user identifier”)로 설정되었다고 가정하겠습니다. 사용자의 최초 방문이 아닌 경우 이전에 최초 방문 시 설정되었던 값을 확인합니다.

즉 퍼블리셔 출처의 비 AMP 페이지 상태에는 두 가지 케이스가 있습니다.

**케이스 1: 최초 방문.** 비 AMP 페이지에 최초로 방문할 시에는 쿠키가 없습니다. 쿠키가 설정되기 전 확인한 경우 `uid`에 해당하는 쿠키에 설정된 값이 표시되지 않습니다.

[sourcecode:bash]

> document.cookie
> ""
> [/sourcecode]

최초 로드 중 쿠키가 설정됩니다. 페이지가 로드된 후 다음을 실행하면 설정된 값을 확인할 수 있습니다.

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

**케이스 2: 최초 방문이 아닌 경우.** 쿠키가 설정되어 있으므로 페이지의 개발자 콘솔을 열면 다음과 같이 표시됩니다.

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

##### 분석 핑 전송 <a name="send-analytics-pings"></a>

식별자 설정이 완료되면 분석 핑에 통합하여 페이지뷰 추적을 시작할 수 있습니다.

구체적인 구현은 원하는 구성에 따라 다르겠지만 일반적으로 핑(요청)을 분석 서버에 전송할 방법을 찾고 계실 겁니다. 분석 서버는 요청 자체 URL에 유용한 데이터를 포함하고 있습니다. 다음 예시는 요청에 쿠키 값을 포함하는 방식까지 지시합니다.

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier
[/sourcecode]

상기 예시에서 사용자 식별자는 특정 쿼리 매개변수인 `user_id`로 표시되었습니다.

[sourcecode:text]
user_id=$publisher_origin_identifier
[/sourcecode]

“`user_id`”의 사용은 분석 서버가 처리하고자 하는 내용에 따라 결정되어야 하며 로컬에서 식별자를 저장하는 쿠키의 이름과 특별히 연관된 것은 아닙니다.

<a id="task2"></a>

### 태스크 2: AMP 페이지에서 amp-analytics 핑에 클라이언트 ID 대체 값을 포함하여 식별자 설정 및 분석 핑 전송 <a name="task-2-for-amp-pages-set-up-an-identifier-and-send-analytics-pings-by-including-client-id-replacement-in-amp-analytics-pings"></a>

이제 AMP 페이지로 이동하여 분석용 식별자를 설정하고 전송하는 방식을 살펴보겠습니다. 이러한 방식은 AMP 페이지가 표시되는 컨텍스트에 관계없이 적용 가능하므로, AMP 캐시를 통해 지원되거나 AMP 뷰어에 표시되는 퍼블리셔 출처의 모든 AMP 페이지에서 사용할 수 있습니다.

클라이언트 ID가 필요한 기능을 사용하여 AMP는 클라이언트 ID 값을 생성 및 저장하고 이를 필요로 하는 기능에 표시하는 "내부적" 작업을 수행합니다. AMP 클라이언트 ID를 사용할 수 있는 주요 기능은 [amp-analytics](https://amp.dev/documentation/components/amp-analytics)입니다. 분석 사용 사례를 구현하는 데 필요한 바로 그 기능이죠.

AMP 페이지에서 클라이언트 ID를 포함한 amp-analytics 핑을 구성합니다.

<table>
  <tr>
    <td width="40%"><strong>amp-analytics 구성 예시:</strong></td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=${clientId(uid)}</code></td>
  </tr>
  <tr>
    <td><strong>네트워크를 통한 구성 예시:</strong></td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id</code><p><em>이러한 경우 <code>${clientId(uid)}</code>는 AMP에서 그 순간 생성되거나 사용자의 브라우저가 로컬로 저장한 항목에 따라 반환될 실제 값으로 대체됩니다.</em></p>
</td>
  </tr>
</table>

클라이언트 ID 대체 값으로 전달된 `${clientId(uid)`가 `uid`라는 점에 유의하세요. 이는 [태스크 1](#task1)에서 설명드린 것처럼 퍼블리셔 출처에서 사용된 동일 쿠키 이름과 일치시키려는 의도적인 선택입니다. 가장 원활한 통합을 위해 동일한 기술이 적용되어야 합니다.

amp-analytics 구현의 나머지 부분은 [amp-analytics 구성](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/)에서 amp-analytics 요청 설정 방법 또는 분석 벤더의 요청 수정 등의 자세한 내용을 참조하세요. 직접 정의하거나 기타 [AMP 대체](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)를 활용하여 추가 데이터를 전송하도록 핑을 더 많이 수정할 수 있습니다.

> **유용한 정보:**
> 클라이언트 ID 기능에 전달된 매개변수에 `uid`라는 이름이 사용된 이유는 무엇일까요? `clientId(...)` 대체 시 필요한 매개변수는 범위를 정의하는 데 사용됩니다. 실제로 클라이언트 ID 기능은 다양한 사용 사례에서 활용하고 결과적으로 많은 클라이언트 ID를 생성할 수 있습니다. 이 매개변수는 사용 사례별로 다르므로 클라이언트 ID를 사용하고자 하는 사례에 따라 지정할 수 있습니다. 예를 들어 광고주와 같은 타사에 다른 식별자를 전송하고 이러한 목표 달성을 위해 "범위" 매개변수를 사용할 수 있습니다.

퍼블리셔 출처에서 "범위"를 쿠키로 치환하여 생각하면 간편합니다. <a>태스크 2</a>에서 클라이언트 ID의 <code>uid</code> 값을 추천함으로써 <a>태스크 1</a>에서 <code>uid</code>라고 명명한 쿠키를 사용한 선택과 일치하게 됩니다.

<a id="task3"></a>

### 태스크 3: 퍼블리셔 출처의 페이지에서 분석 핑 처리 <a name="task-3-process-analytics-pings-from-pages-on-the-publisher-origin"></a>

태스크 1과 태스크 2에서 수행된 설정으로 인해, 퍼블리셔 출처의 AMP 버전(모든 컨텍스트) 또는 비 AMP 버전에 액세스가 발생할 경우 분석 핑은 동일한 식별자를 사용합니다. [태스크 2](#task2)의 다음 지침에 따라 [태스크 1](#task1)에서 사용된 쿠키 이름과 동일한 이름의 클라이언트 ID "범위"를 선택하면 AMP가 동일한 쿠키를 다시 사용합니다.

아래 표에 설명되어 있습니다.

<table>
  <tr>
    <td width="40%">
<strong>퍼블리셔 출처의 비 AMP 페이지</strong>에서 전달된 분석 핑 예시</td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code></td>
  </tr>
  <tr>
    <td>
<strong>퍼블리셔 출처의 AMP 페이지</strong>에서 전달된 분석 핑 예시</td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code><br><em>이번에는 동일합니다! <code>uid</code>의 범위 값을 선택하면 <code>uid</code> 쿠키의 기본 값인 <code>$publisher_origin_identifier</code>가 사용됩니다.</em>
</td>
  </tr>
</table>

<a id="task4"></a>

### 태스크 4: AMP 캐시 또는 AMP 뷰어 표시 컨텍스트의 분석 핑 처리 및 식별자 매핑 설정(필요한 경우) <a name="task-4-process-analytics-pings-from-amp-cache-or-amp-viewer-display-contexts-and-establish-identifier-mappings-if-needed"></a>

[태스크 2](#task2)에서 분석 핑을 설정하여 AMP 캐시 또는 AMP 뷰어에 표시된 AMP 페이지 데이터를 전송했을 시에도 문제가 발생했습니다. 이전에 논의된 것처럼 AMP 캐시 및 AMP 뷰어의 컨텍스트는 퍼블리셔 출처 컨텍스트와 다르며, 따라서 식별자를 유지하는 방식도 달라집니다. 과도한 사용자 수 집계와 같은 문제를 방지하도록 핑을 처리하기 위해 다음 [단계](#implementation-steps)를 통해 가능한 한 자주 식별자가 조정되도록 설정해보겠습니다.

수행할 단계의 설명을 위해 먼저 과도 집계 문제가 발생하는 정확한 이유를 다시 검토하면 도움이 됩니다.

#### 문제 검토 <a name="reviewing-the-problem"></a>

다음 플로우를 고려합니다.

1. 사용자가 **AMP 뷰어 디스플레이 컨텍스트의 AMP 페이지**를 방문합니다(예: `https://google.com/amp/s/example.com/article.amp.html`). AMP 뷰어에는 퍼블리셔 출처의 `uid` 쿠키에 대한 액세스 권한이 없으므로 `$amp_client_id`의 임의 값이 생성되어 사용자를 식별합니다.
2. 다음으로 동일한 사용자가 **퍼블리셔 출처 `https://example.com`의 페이지**를 방문합니다. [태스크 3](#task3)에서 설명된 것처럼 사용자는 `$publisher_origin_identifier`로 식별됩니다.

(1) 및 (2)는 다른 출처(또는 컨텍스트)에서 발생합니다. 그렇기에 공유된 상태는 없으며 `$amp_client_id`도 `$publisher_origin_identifier`와 다릅니다. 그렇다면 효과는 어떨까요? (1)의 경우 사용자 한 명처럼 보이는 단일 페이지뷰 세션이며 (2)의 경우 다른 사용자로부터 발생한 듯한 다른 단일 페이지뷰 세션입니다. **즉 사용자가 `https://example.com` 콘텐츠에 계속 참여한 경우에도 사용자 수가 과도 집계되며 (1)의 사용자는 바운스(일회성 페이지 방문)처럼 보입니다.**

#### 솔루션 전략 <a name="solution-strategy"></a>

과도 집계 문제를 해결하려면 다음 전략을 사용해야 합니다. 이 전략의 효과는 타사 쿠키를 읽거나 작성하는 것이 허용되는지에 따라 달라집니다.

- **즉각적인 식별자 조정: 퍼블리셔 출처 쿠키에 액세스하거나 해당 쿠키를 변경할 수 있는 경우**, 퍼블리셔 출처 식별자를 사용 또는 생성하고 분석 요청에 포함된 다른 식별자는 무시합니다. 두 컨텍스트 간 활동을 성공적으로 연결할 수 있습니다.
- **지연된 식별자 조정: 퍼블리셔 출처 식별자(쿠키)에 액세스하거나 해당 쿠키를 변경할 수 없는 경우**, 분석 요청 자체에 포함된 AMP 클라이언트 ID로 폴백합니다. (타사 쿠키 차단으로 인해) 불가능한 새 퍼블리셔 출처 식별자(쿠키)를 사용하거나 생성하는 대신 해당 식별자를 “**별칭**”으로 사용하고, 별칭을 **매핑 테이블**에 추가합니다. 두 컨텍스트 간의 활동을 즉시 연결할 수는 없지만 매핑 테이블을 사용하면 사용자가 나중에 방문할 경우 AMP 클라이언트 ID 값을 퍼블리셔 출처의 식별자와 연결할 수 있습니다. 이러한 작업이 수행되면 활동을 연결하고 동일한 사용자가 다른 컨텍스트에서 페이지를 방문한 경우 조정하는 데 필요한 정보를 얻을 수 있습니다. 태스크 5는 사용자가 한 페이지에서 다른 페이지로 즉시 이동하는 특정 시나리오의 완전한 솔루션을 제시합니다.

#### 구현 단계 <a name="implementation-steps"></a>

서버에서 기존 퍼블리셔 출처 식별자를 검사합니다.

분석 요청의 일부로 전송된 쿠키를 읽습니다. 예시에서는 example.com의 `uid` 쿠키를 검사하는 것을 의미합니다.

- `uid` 값을 성공적으로 읽은 경우 해당 값을 분석 데이터 기록에 사용합니다(**분석 기록 식별자**). [태스크 1](#task1)에서 살펴본 것처럼 식별자의 값이 `$publisher_origin_identifier`임을 알 수 있습니다. 분석 기록 식별자가 설정되면 [데이터 저장](#data-storage) 섹션으로 바로 이동할 수 있습니다.
- `uid` 값을 읽지 못한 경우 매핑 테이블과 관련된 다음 단계에 따라 진행합니다.

##### 매핑 테이블 <a name="mapping-table"></a>

매핑 테이블은 다음과 같이 분석 핑에 표시된 AMP 클라이언트 ID 값을 퍼블리셔 출처 식별자에 연결합니다.

<table>
  <tr>
    <th width="50%"><strong>퍼블리셔 출처의 사용자 ID</strong></th>
    <th width="50%"><strong>퍼블리셔 출처가 아닌 AMP 페이지의 사용자 ID(“별칭”)</strong></th>
  </tr>
  <tr>
    <td>퍼블리셔 출처의 식별자에서 발생하거나 퍼블리셔 출처 식별자 액세스가 불가능한 경우 예비 값으로 생성됨</td>
    <td>AMP 클라이언트 ID에서 발생</td>
  </tr>
</table>

퍼블리셔 출처 식별자를 읽는 데 실패했음을 확인한 직후 분석 핑에 포함된 AMP 클라이언트 ID가 매핑에 사용되었는지 검사합니다. 검사를 위해 먼저 수신 amp-analytics 요청을 참조하여 클라이언트 ID 값을 얻습니다. 예를 들어 다음 요청의 경우,

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id
[/sourcecode]

AMP 클라이언트 ID `$amp_client_id`에 해당하는 강조 표시된 부분을 추출합니다.

다음으로 매핑 테이블을 검사하여 “별칭” 열에서 동일한 값을 찾습니다.

<table>
  <tr>
    <th width="50%"><strong>퍼블리셔 출처의 사용자 ID</strong></th>
    <th width="50%"><strong>퍼블리셔 출처가 아닌 AMP 페이지의 사용자 ID(“별칭”)</strong></th>
  </tr>
  <tr>
    <td><code>$existing_publisher_origin_identifier</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

상기 예시에서 이미 존재하는 기록이 발견되었습니다. AMP 클라이언트 ID와 한 쌍으로 구성된 발견 값은 분석 기록 식별자가 되며, 예시에서는 `$existing_publisher_origin_identifier`입니다. 분석 기록 식별자가 설정된 후 [데이터 저장](#data-storage) 섹션으로 바로 이동할 수 있습니다.

반면 AMP 클라이언트 ID를 매핑에서 찾을 수 없는 경우 매핑을 생성해야 합니다.

1. **예비 퍼블리셔 출처 식별자**를 생성합니다. 다음 예시에서는 해당 식별자를 `$prospective_identifier`로 명명합니다. 상단의 [태스크 1](#task1)에서 설명된 것처럼 이 값은 퍼블리셔 출처의 값을 설정한 방식과 일치하도록 생성되어야 합니다.
2. 다음으로 예비 출처 식별자를 퍼블리셔 출처의 쿠키로 [설정](https://en.wikipedia.org/wiki/HTTP_cookie#Setting_a_cookie)합니다. 타사 쿠키 작성이 가능한 경우 설정은 성공적으로 완료되며 그렇지 않으면 실패합니다.
3. 이제 {예비 퍼블리셔 출처 식별자, AMP 클라이언트 ID} 쌍을 저장합니다.

결과적으로 생성한 매핑은 다음과 같이 표시됩니다.

<table>
  <tr>
    <th><strong>퍼블리셔 출처의 사용자 ID</strong></th>
    <th><strong>퍼블리셔 출처가 아닌 AMP 페이지의 사용자 ID(“별칭”)</strong></th>
  </tr>
  <tr>
    <td> <code>$prospective_identifier</code>(핑 수신 시점에 JIT 방식으로 생성됨)</td>
    <td> <code>$amp_client_id</code> (분석 핑에서 발생)</td>
  </tr>
</table>

퍼블리셔 출처의 상태와 값이 연결되어 있으므로 예비 퍼블리셔 출처 식별자를 분석 기록 식별자로 사용합니다. 예시에서 그 값은 `$prospective_identifier`이며, 다음의 [데이터 저장](#data-storage) 섹션에서 사용됩니다.

##### 데이터 저장 <a name="data-storage"></a>

이제 분석 기록 식별자가 확인되었으므로 해당 식별자로 키 처리된 사용자 상태 정보(이 경우엔 분석 데이터)를 실제로 저장할 수 있습니다.

[sourcecode:text]
{analytics record identifier, analytics data ...}
[/sourcecode]

<a id="task5"></a>

### 태스크 5: 연결 시 클라이언트 ID 사용 및 양식 제출 <a name="task-5-using-client-id-in-linking-and-form-submission"></a>

일반적으로 타사 쿠키 읽기 및 작성이 허용되지 않은 경우 사용자 상태 관리를 완전히 효과적으로 수행하는 것이 불가능한 상황이 발생합니다. 태스크 1-4에서 수행한 단계는 두 가지 방식으로 도움이 됩니다: (1) 타사 쿠키 읽기 및 작성이 허용되는 경우 완전히 효과적인 솔루션을 제공 (2) 브라우저 쿠키 설정으로 인해 즉각적인 조정이 불가능한 경우 교차 컨텍스트 식별자를 조정하는 최후의 기회를 활용하도록 시스템을 설정.

이 태스크에서는 사용자가 **연결 또는 양식 제출을 통해** 한 페이지에서 다른 페이지로 이동하는 경우 유용한 최적화를 추가적으로 다룰 예정입니다. 이 사례에 아래 설명된 구현 작업이 추가되면 컨텍스트 간 사용자 상태를 관리하는 완벽하게 효율적인 방식을 설정할 수 있습니다.

<amp-img alt="Links can be used to pass the identifier information of one context into another (linked) context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-form-identifier-forwarding.png" width="866" height="784">
  <noscript><img alt="링크를 사용하여 한 컨텍스트의 식별자 정보를 다른 (연결된) 컨텍스트로 전달할 수 있습니다." src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-form-identifier-forwarding.png"></noscript></amp-img>

##### 대체 기능 사용 <a name="using-substitution-features"></a>

[AMP 변수 대체](https://github.com/ampproject/amphtml/blob/master/spec/./amp-var-substitutions.md)의 두 가지 유형을 활용한 접근 방식을 따릅니다.

**발신 링크를 업데이트하여 클라이언트 ID 대체 기능 사용하기:** 새 쿼리 매개변수인 `ref_id`(“referrer ID”)를 정의합니다. 이 매개변수는 URL 내에 표시되며 **시작 컨텍스트의 식별자**를 사용자에게 알려줍니다. 쿼리 매개변수를 AMP 클라이언트 ID 대체 값과 동일하게 설정합니다.

[sourcecode:html]
<a
href="https://example.com/step2.html?ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**발신 링크에 클라이언트 ID를 전달하는 대안적 솔루션:** 데이터 속성 `data-amp-addparams`의 일부로 새 쿼리 매개변수`ref_id`를 정의하고 매개변수 대체가 필요한 쿼리에는`data-amp-replace` 일부로 세부 사항을 제공합니다. 이러한 접근 방식을 활용하면 URL을 깔끔하게 설정하고 `data-amp-addparams`에 지정된 매개변수를 동적으로 추가할 수 있습니다.

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

`data-amp-addparams`를 통해 여러 쿼리 매개변수를 전달 시에는 다음과 같이 분리된 `&`이 필요합니다.

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)&pageid=p123"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**양식 입력 값을 업데이트하여 클라이언트 ID 대체 값으로 사용:** `orig_user_id`와 같은 입력 필드의 이름을 정의합니다. AMP 클라이언트 ID의 대체 값으로 사용할 수 있도록 양식 필드의 `default-value`를 지정합니다.

[sourcecode:html]
<input
  name="ref_id"
  type="hidden"
  value="CLIENT_ID(uid)"
  data-amp-replace="CLIENT_ID"
/>
[/sourcecode]

이러한 단계를 수행하면 클라이언트 ID가 대상 서버에서 지원되거나 링크 클릭 또는 양식 제출 후 사용자에게 표시되는 페이지의 URL 매개변수로 사용될 수 있습니다(**대상 컨텍스트**). 이름(또는 “키”)가`ref_id`로 설정되는 이유는 상기 구현에서 그렇게 정의되었으며 클라이언트 ID와 동일한 관련 값을 보유하기 때문입니다. 예를 들어 위에서 정의된 링크(`<a>` 태그)를 따라가면 사용자는 다음 URL로 이동합니다.

[sourcecode:http]
https://example.com/step2.html?ref_id=$amp_client_id
[/sourcecode]

<amp-img alt="Example of how an identifier in an AMP viewer context can be passed via link into a publisher origin context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-1.png" width="1038" height="890">
  <noscript><img alt="AMP 뷰어 컨텍스트의 식별자가 링크를 통해 게시자 원본 컨텍스트로 전달되는 방법의 예" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-1.png"></noscript></amp-img>

사용자가 URL 매개변수로 또는 헤더 내에 `ref_id` 값이 포함된 페이지를 방문할 경우 `ref_id` 식별자를 페이지에서 자체적으로 노출된 식별자(쿠키 값)와 함께 처리할 수 있습니다. 분석 핑에 식별자 두 개를 모두 포함하면 분석 서버는 동시에 두 값을 처리할 수 있으며 두 값이 연결되어 있음을 이해하여 백엔드에 해당 관계를 반영합니다. 다음 단계에서는 자세한 실행 방법을 살펴보겠습니다.

##### URL 쿼리 매개변수 추출 <a name="extracting-url-query-parameters"></a>

대체 기능을 사용하여 링크 탐색 플로우 또는 양식 제출 플로우를 설정합니다. 이러한 플로우에서 특히 클라이언트 ID와 같은 정보가 대상 서버에 노출되거나 사용자가 탐색을 마친 후 클라이언트에서 읽을 수 있는 URL 매개변수로 노출됩니다.

정보가 서버에만 노출된 경우(예: 양식 POST를 통해), 정보 처리를 진행하고 결과 페이지를 렌더링할 수 있습니다. 이러한 데이터 처리 시에는 아래에 설명된 [매개변수 유효성 검사](#parameter-validation) 단계를 참조하세요.

URL을 통해 정보가 제공되며 해당 정보를 처리하고자 할 경우 사용 가능한 몇 가지 접근 방식이 있습니다.

- 리디렉션 중 처리(서버 측 처리)
- 랜딩 페이지에서 처리(클라이언트 측 처리)

**리디렉션 중 처리(서버 측 처리)**

리디렉션 중 처리를 수행하려면 서버에서 요청을 처리하고 관련 매개변수를 추출합니다. 아래에 설명된 [매개변수 유효성 검사](#parameter-validation) 단계를 참조하세요. 기타 관련 식별자가 포함된 쿠키 값과 함께 데이터를 처리하고 매개변수가 포함되지 않은 URL로 리디렉션합니다.

**랜딩 페이지에서 처리(클라이언트 측 처리)**

랜딩 페이지에서 처리할 경우 페이지가 AMP 페이지인지 비 AMP 페이지인지에 따라 접근 방식이 다릅니다.

<amp-img alt="Example of how to construct an analytics ping that contains an identifier from the previous context provided via URL and an identifier from the current context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-2.png" width="1326" height="828">
  <noscript><img alt="URL을 통해 제공된 이전 컨텍스트의 식별자와 현재 컨텍스트의 식별자를 포함하는 분석 핑을 구성하는 방법의 예" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-2.png"></noscript></amp-img>

분석 요청이 퍼블리셔 출처의 페이지에서 발생한 경우 <code>uid</code>에 해당하는 값을 분석 기록 식별자로 선택해야 합니다. `orig_uid` 값은 “별칭”으로 선택합니다.

[sourcecode:http] https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)} [/sourcecode]

네트워크에서 전송될 경우 실제 값은 대체됩니다.

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$referrer_page_identifier&user_id=$current_page_identifier
[/sourcecode]

상기 예시를 계속 진행하여 다음 코드를 사용합니다.

[sourcecode:text]
$referrer_page_identifier is $amp_client_id
$current_page_identifier is $publisher_origin_id
[/sourcecode]

따라서 핑은 실제로 다음과 같습니다.

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$amp_client_id&user_id=$publisher_origin_id
[/sourcecode]

하단의 [매개변수 유효성 검사](#parameter-validation) 섹션에서 간략히 설명된 단계에 따라 쿼리 매개변수 값의 인증 유효성을 검증하는 것이 좋습니다.

_비 AMP 페이지로 업데이트:_ 마찬가지로 퍼블리셔 출처에서 지원되는 비 AMP 페이지의 경우에도 URL에 포함된 `ref_id` 값을 추출하여 전송합니다. 하단의 [매개변수 유효성 검사](#parameter-validation) 섹션에서 간략히 설명된 단계에 따라 해당 값의 인증 유효성을 검증합니다. 다음으로 `ref_id`에서 파생된 `orig_user_id` 및 퍼스트 파티 쿠키 식별자의 값에 기반한 `user_id`가 모두 포함된 분석 핑을 구성합니다.

<blockquote>
<p><strong>중요:</strong></p>
<p>랜딩 페이지에서 클라이언트 측 매개변수 처리를 선택한 경우, 랜딩 페이지는 식별자 획득이 가능해진 즉시 URL의 식별자 정보를 제거해야 합니다.</p>
<p>매개변수 제거 전 매개변수를 읽기 위해 실행해야 할 다른 코드의 다음 사항을 확인하세요.</p>
<ul>
  <li>제거하기 전 실행됨.</li>
  <li>매개변수를 읽고 제거한 코드가 데이터를 저장한 위치에 액세스 가능함.</li>
</ul>
<p>비 AMP 페이지에서 이 작업을 수행하려면 다음 JavaScript를 사용하여 URL의 모든 쿼리 매개변수를 제거합니다.</p>
<pre>var href = location.href.replace(/\?[^{{'[% raw %]'}}#]{{'{% endraw %}'}}+/, '');<br>history.replaceState(null, null, href);</pre>
<p>필요한 경우 조정하여 제거할 쿼리 매개변수 개수를 줄일 수 있습니다.</p>
</blockquote>

##### 분석 핑의 여러 식별자 처리 <a name="processing-multiple-identifiers-in-an-analytics-ping"></a>

[태스크 4](#task4)에서 식별자 값을 하나만 포함하도록 분석 핑을 구성했던 것과 달리 지금까지 태스크 5에서 수행한 단계에는 `orig_user_id` 및 `user_id`라는 식별자 두 개가 포함되었습니다. 다음으로 인바운드 분석 핑의 일부인 식별자 두 개를 처리하는 방법을 알아보겠습니다.

계속 진행하기 전 아래의 [매개변수 유효성 검사](#parameter-validation)에서 설명된 단계를 참조하여 `orig_user_id` 및 `user_id`로 표시된 값 모두를 신뢰할 것인지 확인합니다.

해당 값 중 하나가 매핑 테이블에 포함되어 있는지 확인합니다. 상기 예시에서는 첫 번째 페이지뷰는 퍼블리셔 출처가 아닌 AMP 페이지에서 발생하고, 다음으로 두 번째 페이지뷰는 퍼블리셔 출처에서 발생했습니다. 결과적으로 분석 핑 쿼리 매개변수의 값은 다음과 같습니다.

**케이스 1: 퍼블리셔 출처의 페이지에서 분석 핑이 전송된 경우 식별자 배열**

<table>
  <tr>
    <th width="20%"></th>
    <th width="40%"><strong>퍼블리셔 출처의 사용자 ID</strong></th>
    <th width="40%"><strong>퍼블리셔 출처가 아닌 AMP 페이지의 사용자 ID(“별칭”)</strong></th>
  </tr>
  <tr>
    <td><strong>분석 핑에서 표시되는 방식</strong></td>
    <td><code>user_id=$publisher_origin_id</code></td>
    <td><code>orig_user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>매개변수 키</strong></td>
    <td><code>user_id</code></td>
    <td><code>orig_user_id</code></td>
  </tr>
  <tr>
    <td><strong>매개변수 값</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

상기 예시 플로우가 구성된 방식에 따라 첫 번째 페이지뷰에서 발생한 식별자는 맨 오른쪽 열에 해당하며 두 번째 페이지뷰에서 발생한 식별자는 중간 열에 해당합니다.

대신 사용자가 퍼블리셔 출처에서 지원되는 페이지부터 시작하여 추후 퍼블리셔 출처에 없는 AMP 페이지로 이동한 경우, 매개변수의 키는 역순으로 출력되지만 값이 참조된 해당 방식은 그렇지 않습니다(즉, `$amp_client_id`는 항상 퍼블리셔 출처가 아닌 AMP 페이지에 저장된 식별자를 참조합니다).

**케이스 1: 퍼블리셔 출처가 아닌 AMP 페이지에서 분석 핑이 전송된 경우 식별자 배열**

<table>
  <tr>
    <th width="20%"> </th>
    <th width="40%"><strong>퍼블리셔 출처의 사용자 ID</strong></th>
    <th width="40%"><strong>퍼블리셔 출처가 아닌 AMP 페이지의 사용자 ID(“별칭”)</strong></th>
  </tr>
  <tr>
    <td><strong>분석 핑에서 표시되는 방식</strong></td>
    <td><code>orig_user_id=$publisher_origin_id</code></td>
    <td><code>user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>매개변수 키</strong></td>
    <td><code>orig_user_id</code></td>
    <td><code>user_id</code></td>
  </tr>
  <tr>
    <td><strong>매개변수 값</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

매핑 테이블을 검색할 경우에는 적용되는 상황에 유의하고 값이 표시될 것으로 기대되는 매핑 테이블의 열에서 값을 검색합니다. 예를 들어 분석 핑이 퍼블리셔 출처의 페이지에서 전송되는 경우(케이스 1) 매핑 테이블 열 중 "퍼블리셔 출처의 사용자 ID"에서 `user_id`로 키 처리된 값을 검사하고 "퍼블리셔 출처가 아닌 AMP 페이지의 사용자 ID(‘별칭’)" 열에서 `orig_user_id`로 키 처리된 값을 검사합니다.

매핑 테이블에서 사용 중인 식별자 값을 찾을 수 없는 경우 새 매핑을 설정합니다.

- 분석 요청이 퍼블리셔 출처의 페이지에서 발생한 경우 `uid`에 해당하는 값을 분석 기록 식별자로 선택해야 합니다. `orig_uid` 값은 “별칭”으로 선택합니다.
- 분석 요청이 퍼블리셔 출처의 페이지에서 발생하지 않은 경우 `uid`에 해당하는 값을 “별칭”으로 선택해야 합니다. 다음으로 [태스크 4](#task4)의 나머지 지침에 따라 진행하여 예비 퍼블리셔 출처 식별자를 생성하고 이 값을 출처의 쿠키로 설정합니다.

##### 매개변수 유효성 검사 <a name="parameter-validation"></a>

URL에 포함된 값은 악의적으로 변경되거나, 형식이 잘못되거나, 예상되는 값이 아닐 수 있습니다. 때때로 이런 경우를 사이트 간 요청 위조(CSRF)라고 부릅니다. 분석 서버가 수신한 분석 핑이 분석 핑을 전송할 것으로 예상되는 페이지에서 발생하였는지 확인하는 게 중요한 것처럼 URL의 일부 값을 "전달"할 경우에도 신뢰할 수 있는 값인지 확인하려면 참조자의 유효성을 검사해야 합니다.

예를 들어 위의 단계에서 사용자가 클릭하여 해당 페이지로 이동할 수 있도록 다음 URL을 구성했습니다.

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$amp_client_id
[/sourcecode]

하지만 사용자 또는 공격자가 URL을 다음과 같이 변경할 수도 있습니다.

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$malicious_value
[/sourcecode]

`$amp_client_id`의 인스턴스만 처리하고 `$malicious_value`의 인스턴스 사용은 방지하는 것이 좋습니다.

**URL 쿼리 매개변수를 통해 수신한 값의 유효성을 검증하는 추천 단계:** 랜딩 페이지의 참조자가 예상된 URL과 일치하는지 확인합니다. 일반적으로 이 값은 유효한 CORS 요청에서 이전에 표시된 식별자 값을 포함하는 것으로 확인된 값이어야 합니다. 이처럼 알려진 식별자만을 허용하시길 권장합니다.

비 AMP 페이지에서는 클라이언트 측에서 바로 `document.referrer`를 검사하거나 서버 측에서 유효성 검사를 수행할 수 있도록 분석 핑의 일부로 해당 값을 전달합니다. 참조된 값이 신뢰할 수 있는 값인 경우 상기 예시의 `orig_user_id`처럼 랜딩 페이지 URL에서 생성된 값을 허용하고 처리할 수 있습니다.

AMP 페이지에서 참조 값을 분석 핑의 일부로 전달하려면 [Document Referrer](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#document-referrer) 대체 변수를 사용합니다. 사용 가능한 옵션은 서버 측 처리뿐입니다. 자세히 설명해 드리자면 랜딩 페이지에서 전송할 수 있는 분석 핑으로 (1) 현재 페이지의 클라이언트 Client ID 값, (2) 참조 페이지에서 클라이언트 ID 값으로 설정한 URL, (3) (2)의 값의 유효성 검사를 위해 참조된 정보가 포함된 핑은 다음과 같습니다: `https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}&referrer=${documentReferrer}`

참조자를 신뢰할 수 없는 경우 URL 매개변수로 제공된 값은 모두 거절하고 사용하지 마십시오.

## 강력 권고 사항 <a name="strongly-recommended-practices"></a>

### 연결은 하나만 유지 <a name="keep-just-one-association"></a>

**두 컨텍스트의 식별자 간 연결은 하나만 유지되어야 합니다.** 이전에 귀하께서 발행한 쿠키 또는 기타 식별자와 연결된 AMP 클라이언트 ID가 귀하께서 발행한 새 쿠키 또는 사용자 식별자와 함께 표시될 경우, 보유한 상태 중 이전 쿠키 및 사용자 식별자에 대한 상태는 모두 삭제하는 것이 좋습니다.

이 단계를 통해 사용자의 개인정보 보호에 대한 기대에 부응할 수 있습니다. 이전 섹션에서 상세히 기술된 것처럼, AMP의 사용자 상태를 관리를 위해 AMP가 표시되는 여러 컨텍스트의 다양한 식별자 저장 및 연결을 종종 수행하게 됩니다. **이러한 상황은 사용자가 예상하지 못하거나 사용자에게 명확히 공개하지 않은 데이터 재구성 또는 추적 작업을 수행하는 데 악용되어서는 안 됩니다(예: 사용자가 사이트 쿠키를 삭제한 이후)**

### 쿠키 및 로컬 저장소 삭제에 대한 존중<a name="respect-cookie-and-local-storage-deletions"></a>

**모든 쿠키 및 로컬 저장소 삭제 기능을 생성하는 제어를 비롯하여 사용자가 이용할 수 있는 모든 개인정보 제어를 존중해야 합니다.** 사용자가 식별자 관계의 한 쪽을 명시적으로 삭제한 후에는 AMP 클라이언트 ID 또는 AMP 인프라를 [삭제된 식별자 재구성에 사용](https://en.wikipedia.org/wiki/Zombie_cookie)해서는 안 됩니다.

### 현지법 및 규정 준수 <a name="comply-with-local-laws-and-regulations"></a>

**두 개 이상의 도메인에서 쿠키/식별자를 연결하려면 개인정보 보호정책을 업데이트하거나 추가 사용자 공지를 제공하거나 일부 관할 구역의 경우 최종 사용자 동의를 얻어야 할 수도 있습니다.** 각 퍼블리셔는 안정적인 식별자를 제공하는 영구 저장 수단으로 쿠키 또는 로컬 저장소가 사용되는 AMP 클라이언트 ID 사용을 분석하고 데이터 수집, 저장, 처리 및 사용자 공지와 관련한 현지 법규 및 규정을 준수해야 합니다.
