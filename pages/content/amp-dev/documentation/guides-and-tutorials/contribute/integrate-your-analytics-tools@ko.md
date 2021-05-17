---
'$title': AMP를 활용한 분석 도구 통합
$order: 1
formats:
  - websites
  - stories
teaser:
  text: '개요 '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## 개요

트래픽 및 방문자에 대한 퍼블리셔의 이해를 개선하기 위한 SaaS 도구를 운영하는 경우 서비스와 `amp-analytics` 통합을 고려하실 수 있습니다. 이러한 통합은 고객이 AMP HTML 페이지의 트래픽 패턴을 확인하는 데 유용합니다.

## 준비 단계 <a name="before-you-begin"></a>

분석 서비스를 AMP HTML 런타임에 추가하기 전 준비해야 할 사항은 다음과 같습니다.

- 분석 서비스의 AMP HTML 문서에 필요한 [변수](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md) 및 [요청](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-analytics.md#requests)의 종류를 확인합니다.
- 서비스와 관련한 페이지에서 전송되는 분석 요청을 발생시키는 트리거를 확인합니다.
- 퍼스트 파티 및 타사 AMP 컨텍스트에서의 [사용자 추적](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-managing-user-state.md) 여부 및 방식을 고려합니다.
- 분석 대시보드에서 AMP 트래픽을 처리하는 방식을 규정합니다.
- `amp-analytics`의 누락된 기능 및 필요한 기능에 대한 [파일 요청](https://github.com/ampproject/amphtml/issues/new)을 확인합니다.
- AMP 분석은 변수를 사전 구성된 엔드포인트로 전송합니다. 기존 엔드포인트가 없다면 엔드포인트 구축 방법을 간단히 설명하는 다음 [예시](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)를 참조하세요.
  - `iframe`을 제외한 모든 전송 유형에서 변수는 HTTPS 요청의 쿼리 문자열 매개변수로 전송됩니다.
  - `iframe` 전송 유형에서 iframe이 생성되며 `window.postMessage`를 통해 변수가 전송됩니다. 이런 경우 메시지가 URL일 필요는 없습니다. 이 옵션은 MRC 공인 공급 업체에만 제공됩니다.
- `amp-analytics`와 통합이 현재 정책(특히 개인정보 보호정책) 또는 계약에 어떤 영향을 미치는지 고려합니다.

## AMP HTML 런타임에 구성 추가 <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. AMP HTML 런타임에 분석 서비스 구성이 추가될 것임을 명시하는 [Intent-To-Implement 이슈](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../docs/contributing.md#contributing-features)를 생성합니다. 설명에 **cc @ampproject/wg-analytics**가 포함되었는지 확인하세요.
2. 다음을 구현하는 패치를 개발합니다.
   1. 상단의 옵션 및 다음과 같이 기본 이외 옵션을 포함하는 공급 업체 [폴더](https://github.com/ampproject/amphtml/tree/main/extensions/amp-analytics/0.1/vendors)의 신규 구성 json 파일 `${vendorName}.json`.
      1. `"vars": {}` 추가 기본 변수.
      2. `"requests": {}` 서비스에 사용될 요청.
      3. `"optout":` 필요한 경우. 현재 적합한 선택 해제 시스템이 없으므로 원활히 기능하는 시스템을 설계할 수 있도록 의견을 보내주세요.
      4. `"warningMessage":` 필요한 경우. 콘솔에서 공급 업체의 경고 정보를 표시합니다(예: 사용 중단 또는 마이그레이션).
   2. iframe 전송을 사용하는 경우 `"*vendor-name*": "*url*"`를 포함하는 iframe-transport-vendors.js의 ANALYTICS_IFRAME_TRANSPORT_CONFIG에 새 라인을 추가합니다.
   3. [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) 참조의 예제.
   4. [extensions/amp-analytics/0.1/test/vendor-requests.json ](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json) 파일의 테스트.
   5. [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/./analytics-vendors-list.md) 파일의 지원되는 공급 업체 목록에 분석 서비스를 추가합니다. 유형, 설명, 사용 문서 링크를 포함합니다.
3. [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../examples/analytics-vendors.amp.html)에 추가된 신규 예제를 테스트하여 기능이 예상대로 작동하는지 확인합니다. 예를 들어, 필요한 데이터가 수집되어 분석 대시보드에 표시되는지 확인합니다.
4. 이 패치로 Pull 요청을 제출하고 Intent-To-Implement 이슈를 참조합니다.
5. 서비스 사용 문서를 업데이트하고 고객에게 정보를 제공합니다.
6. [AMP 저장소 외부의 통합 테스트](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests)를 유지하시길 권장합니다.

## 태그 관리자 <a name="tag-managers"></a>

태그 관리자 서비스에는 AMP 분석과 통합을 위한 두 가지 옵션이 포함됩니다.

- **엔드포인트 접근 방식:** `amp-analytics`에 적합한 추가 엔드포인트로 기능하며 백엔드에서 마케팅 관리를 수행합니다.
- **구성 접근 방식:** 퍼블리셔마다 고유하게 동적으로 생성된 JSON 구성 파일을 통해 태그 관리를 수행합니다.

엔드포인트 접근 방식은 이전 섹션에서 자세히 설명해드린 표준 접근 방식과 동일합니다. 구성 접근 방식은 각 퍼블리셔 전용의 고유한 amp-analytics 구성을 생성하고 호환 가능한 분석 패키지를 모두 포함합니다. 퍼블리셔는 다음과 유사한 구문을 사용하여 구성을 포함할 수 있습니다.

[sourcecode:html]
<amp-analytics
config="https://my-awesome-tag-manager.example.com/user-id.json"

> </amp-analytics>
> [/sourcecode]

이 접근 방식을 취하려면 퍼블리셔의 AMP 분석 통합과 관련한 문서를 검토하세요.

## 추가 리소스 <a name="further-resources"></a>

- 자세한 내용: [iframe을 사용하지 않는 이유](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/why-not-iframe.md)
- 자세한 내용: [AMP로 미인증 사용자 관리하기](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-managing-user-state.md)
- [amp-analytics 예시](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics) 참조 문서
- [amp-analytics variables](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md) 참조 문서
