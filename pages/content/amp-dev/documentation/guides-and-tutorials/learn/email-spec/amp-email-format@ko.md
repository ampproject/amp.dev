---
'$title': 이메일용 AMP 형식
$order: 1
formats:
  - email
teaser:
  text: '필수 마크업 '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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

AMP는 모바일 클라이언트에서 매우 빠른 웹 페이지를 개발하는 데 사용되는 기술입니다. AMP는 JavaScript로 지원되는 HTML 태그 집합이며 성능과 보안에 중점을 둔 기능을 쉽게 구현합니다. 캐러셀부터 반응형 양식 요소, 원격 엔드포인트에서 새로운 콘텐츠 검색까지 아우르는 모든 기능이 [AMP 컴포넌트](https://amp.dev/documentation/components/)로 제공됩니다.

이메일용 AMP 형식은 이메일 메시지에 사용 가능한 [AMP 컴포넌트의 하위 집합](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-components.md)을 제공합니다. AMP 이메일 수신자는 이메일에서 바로 AMP 컴포넌트를 보고 상호작용할 수 있습니다.

## 필수 마크업

다음 코드는 유효한 AMP 이메일 메시지를 구성하는 최소한의 마크업을 보여줍니다.

[sourcecode:html]

<!DOCTYPE html>
<html ⚡4email>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

AMP 이메일의 필수 요건은 다음과 같습니다.

- <a name="dctp"></a>doctype `<!doctype html>`로 시작. [🔗](#dctp)
- <a name="ampd"></a>최상위 태그로 `<html ⚡4email>` 태그 사용 (`<html amp4email>`도 사용 가능). [🔗](#ampd)
- <a name="crps"></a>`<head>` 및 `<body>` 태그 사용(HTML에서는 선택 사항). [🔗](#crps)
- <a name="chrs"></a>헤드 태그의 첫 번째 하위 요소로 `<meta charset="utf-8">` 태그 사용. [🔗](#chrs)
- <a name="scrpt"></a>헤드 태그 내에 `<script async src="https://cdn.ampproject.org/v0.js"></script>` 태그 사용. [🔗](#scrpt)
- AMP JS 로드 시까지 우선 콘텐츠를 숨김 처리하려면 헤드 태그 내에 <a name="boilerplate"></a>amp4email 상용구 사용(`<style amp4email-boilerplate>body{visibility:hidden}</style>`) [🔗](#boilerplate)

전체 AMPHTML 마크업은 200,000 바이트를 초과할 수 없습니다.

## 구조 및 렌더링 <a name="structure-and-rendering"></a>

이메일용 AMP는 [RFC 1521, 섹션 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3)에서 정의된 것처럼 표준 `multipart/alternative` [MIME](https://en.wikipedia.org/wiki/MIME) 서브타입에 의존합니다.

_자세한 내용은 [AMP 이메일의 구조 및 렌더링](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-structure.md)을 참조하세요._

## 지원되는 AMP 컴포넌트<a name="supported-amp-components"></a>

_<a>이메일용 AMP 지원 컴포넌트</a>를 참조하세요._

## HTML 요구 사항<a name="html-requirements"></a>

_[이메일용 AMP에서 지원되는 HTML](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-html.md)을 참조하세요._

## CSS 요구 사항<a name="css-requirements"></a>

### 지원되는 선택자 및 속성 <a name="supported-selectors-and-properties"></a>

_[이메일용 AMP에서 지원되는 CSS](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-css.md)를 참조하세요._

### AMP 문서에 CSS 지정<a name="specifying-css-in-an-amp-document"></a>

AMP 문서의 모든 CSS는 헤더 내의 `<style amp-custom>`태그에 포함되거나 인라인 `style` 속성으로 포함되어야 합니다.

[sourcecode:html]
...

<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>

...

</head>
[/sourcecode]

참고: 전체 `<style>` 태그는 50,000 바이트를 초과할 수 없습니다. 유효성 검사기가 크기를 검사합니다.

## 문서 크기 <a name="document-dimensions"></a>

- **최적의 너비**: 800px 이하(그 이상의 문서나 콘텐츠는 일부 클라이언트에서 예기치 않게 잘릴 수 있음).

- **높이**: 변수, 클라이언트는 사용자가 콘텐츠를 스크롤하게 허용.

## 유효성 검사 <a name="validation"></a>

이메일 메시지가 이메일용 AMP 형식을 충족하는지 확인하는 데 AMP의 기존 유효성 검사 도구를 사용할 수 있습니다.

자세한 내용은 [AMP 이메일 유효성 검사](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/)를 참조하세요.

## 개인정보 보호 및 보안 <a name="privacy-and-security"></a>

### 이메일 열람 및 상호작용 추적 <a name="tracking-email-opens-and-interaction"></a>

AMPHTML을 사용하면 일반 HTML 이메일과 마찬가지로 픽셀 추적 기술을 사용해 이메일 열람을 추적할 수 있습니다. 또한 외부 서비스의 데이터에 대한 모든 사용자 개시 요청도 사용자가 메시지와 상호작용하고 있음을 나타냅니다. 이메일 클라이언트는 원격 이미지 로딩 또는 기타 외부 요청의 로딩을 비활성화하는 옵션을 사용자에게 제공할 수 있습니다.

### AMP 전용 분석 <a name="amp-specific-analytics"></a>

다음의 AMP 전용 분석 기술은 지원되지 않습니다.

- [AMP `CLIENT_ID`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [변수 대체 ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### 컴포넌트별 고려 사항<a name="component-specific-considerations"></a>

[`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) 또는 [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)의 이미지 요청은 사용자가 메시지와 상호작용하고 있음을 발신자에게 알려줍니다.

[`<amp-form>`](https://amp.dev/documentation/components/amp-form) 내의 리디렉션도 런타임에서 허용되지 않습니다.

## 피드백 및 지원 <a name="feedback--support"></a>

이메일용 AMP에 대한 지원 및 피드백을 제공하려면 다음 채널을 사용하세요: [ongoing-participation](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#ongoing-participation)
