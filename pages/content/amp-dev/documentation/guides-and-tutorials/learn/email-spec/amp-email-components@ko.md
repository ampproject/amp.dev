---
'$title': 이메일용 AMP 지원 컴포넌트
$order: 3
formats:
  - email
teaser:
  text: 아래 내용은 현재 AMP 이메일 메시지에서 지원되는 AMP 컴포넌트 목록입니다. 컴포넌트는 다음과 같은 카테고리로 분류됩니다.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md.
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

아래 내용은 현재 AMP 이메일 메시지에서 지원되는 {0}AMP 컴포넌트{/0} 목록입니다. 컴포넌트는 다음과 같은 카테고리로 분류됩니다.

- [동적 콘텐츠 ](#dynamic-content)
- [레이아웃](#layout)
- [미디어](#media)

## 동적 콘텐츠 <a name="dynamic-content"></a>

| 요소                                                                                                                                                                           | 설명                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<amp-form>`](https://amp.dev/documentation/components/amp-form)                                                                                                              | 양식 요소. action-xhr 속성은 일반 액션 속성의 자리에 사용되어야 합니다. 응답을 렌더링하는 데 `<template type="amp-mustache">`와 함께 사용할 수 있습니다. <br><br>**참고:** [제출 후 리디렉션](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission)은 허용되지 않습니다. |
| [`<amp-selector>`](https://amp.dev/documentation/components/amp-selector)                                                                                                      | 양식 내에서 사용되는 다중 선택 위젯.                                                                                                                                                                                                                                                                  |
| [`amp-bind`](https://amp.dev/documentation/components/amp-bind) 및 [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | AMP의 간단한 스크립팅 언어로 요소 간 인터랙션을 위한 상태 시스템 조작을 지원합니다. 또한 특정 이벤트 동작 추가 시에도 사용될 수 있습니다.<br><br>**참고:** `[href]` 또는 `[src]`와 바인딩은 금지되며 `AMP.print`, `AMP.navigateTo` 및 `AMP.goBack` 액션 사용도 금지됩니다.                            |
| [`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification)                                                                               | `<amp-state>`는 `amp-bind`로 사용되는 초기 상태를 정의합니다.<br><br>**참고:** `src` 속성은 현재 지원되지 않습니다.                                                                                                                                                                                   |
| [`<amp-list>`](https://amp.dev/documentation/components/amp-list)                                                                                                              | [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache)가 렌더링하는 JSON 데이터를 원격으로 가져옵니다.<br><br>**참고:** `[src]` 속성과 바인딩은 허용되지 않습니다. `credentials="include"`도 금지됩니다.                                                                           |
| [`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache)                                                                                      | `amp-list` 호출 결과를 렌더링하는 Mustache 템플릿 마크업.                                                                                                                                                                                                                                             |

## 레이아웃 <a name="layout"></a>

| 요소                                                                                                         | 설명                                                    |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| [레이아웃 속성](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | 레이아웃 동작은 레이아웃 속성에 따라 결정됩니다.        |
| [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)                                  | 다른 섹션의 표시/숨김 처리를 원활하게 지원하는 UI 요소. |
| [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel)                                    | 캐러셀 UI 컴포넌트.                                     |
| [`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text)                                    | 특정 영역에 맞춰 텍스트를 설정하는 헬퍼 컴포넌트.       |
| [`<amp-layout>`](https://amp.dev/documentation/components/amp-layout)                                        | 반응형 레이아웃 기반의 가로세로비를 갖는 컨테이너.      |
| [`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar)                                      | 탐색 용도의 사이드바.                                   |
| [`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago)                                      | 편리한 타임스탬프 렌더링 방식 제공.                     |

## 미디어 <a name="media"></a>

| 요소                                                              | 설명                                                                                    |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [`<amp-img>`](https://amp.dev/documentation/components/amp-img)   | `<img>`를 대체하는 AMP 컴포넌트.<br><br>**참고:** `[src]`와 바인딩은 허용되지 않습니다. |
| [`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | GIF 파일 임베딩.<br><br>**참고:** `[src]`와 바인딩은 허용되지 않습니다.                 |
