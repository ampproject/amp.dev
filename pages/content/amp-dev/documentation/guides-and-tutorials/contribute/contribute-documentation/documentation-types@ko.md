---
"$title": 문서 유형
"$order": '1'
description: amp.dev에서 허용되는 문서 기여 유형
formats:
- websites
- stories
- ads
- email
author: CrystalOnScript
toc: 'false'
---

아래 목록은 amp.dev에서 허용되는 문서 기여 유형의 간략한 개요입니다.

- [입문 튜토리얼](documentation-types.md?format=websites#introductory-tutorial)
- [심화 튜토리얼](documentation-types.md?format=websites#advanced-tutorial)
- [입문 가이드](documentation-types.md?format=websites#introductory-guide)
- [컨셉 가이드](documentation-types.md?format=websites#concept-guide)
- [참조 문서](documentation-types.md?format=websites#reference-documentation)

## 입문 튜토리얼 <a name="introductory-tutorial"></a>

입문 튜토리얼은 개발자가 기술의 일반적 아이디어를 이해하는 데 유용합니다. 코딩부터 시작하여 기본 "Hello World" 프로젝트까지 완료할 수 있습니다. 입문 튜토리얼은 AMP 주요 기능을 빌드하는 방식을 프로세스별로 차근차근 알려줍니다. 개발자가 약간만 변경하여 실행할 수 있는 인라인 코드 샘플 또는 다운로드 가능한 샘플을 입문 튜토리얼과 함께 활용해 보세요.

amp.dev 예제:

- [첫 AMP 페이지 제작](../../../../documentation/guides-and-tutorials/start/create/index.md?format=websites)
- [첫 AMP 스토리 제작](../../../../documentation/guides-and-tutorials/start/visual_story/index.md?format=stories)
- [첫 AMPHTML 광고 제작](../../../../documentation/guides-and-tutorials/start/create_amphtml_ad/index.md?format=ads)

<table>
  <tr>
   <td>
<strong>Do</strong>
   </td>
   <td>
<strong>Don’t</strong>
   </td>
  </tr>
  <tr>
   <td>간략한 설명과 최소한의 단계로 구성된 가이드 제공하기.</td>
   <td>프로젝트의 세부 사항까지 설명하기. 튜토리얼 결과를 달성하는 데 필요한 많은 단계가 있을 테지만 모든 길을 보여주는 것이 아닌 하나의, 좋은 길을 보여주는 것이 중요.</td>
  </tr>
  <tr>
   <td>간소화된 환경 및 설정 도구 제공하기.</td>
   <td>개발자가 제품에 익숙하고 숙련된 코딩 능력을 갖추고 있다고 가정하기.</td>
  </tr>
  <tr>
   <td>샘플은 시각적으로 깔끔하게 유지하기.</td>
   <td>스타일링에 관한 튜토리얼이 아닌 데도 스타일을 복잡하게 구성하기.</td>
  </tr>
  <tr>
   <td>각 단계의 스크린샷과 완성 데모 제공하기.</td>
   <td>코드 샘플만 제공하기.</td>
  </tr>
  <tr>
   <td>행동 유도 버튼을 생성하여 개발자가 다음으로 실행할 작업을 알려주기.</td>
   <td>추가 설명과 예제를 하나로 제공하기. 후속 자료가 부족하다고 느껴질 경우 가이드 또는 튜토리얼 이슈를 생성하는 것도 고려할 것.</td>
  </tr>
</table>

## 심화 튜토리얼 <a name="advanced-tutorial"></a>

심화 튜토리얼은 개발자가 특정 작업을 완수하도록 지원하며, 개발자가 AMP를 어느 정도 알고 있다고 가정합니다. 심화 튜토리얼을 통해 경험을 빌드하고 기능을 통합하며 구현 작업을 처리하는 방식을 배워 보세요.

amp.dev 예제:

- [AMP 페이지 기본 분석을 구성하는 방법](../../../../documentation/guides-and-tutorials/optimize-measure/tracking-engagement.md?format=websites)
- [amp-script를 활용해 AMP 페이지에 사용자 지정 JavaScript 추가](../../../../documentation/guides-and-tutorials/develop/custom-javascript-tutorial.md?format=websites)
- <a>AMP 사이트를 PWA로 전환하기</a>

<table>
  <tr>
   <td>
<strong>Do</strong>
   </td>
   <td>
<strong>Don’t</strong>
   </td>
  </tr>
  <tr>
   <td>명확한 최종 프로젝트가 있는 단계별 지침 제공하기.</td>
   <td>부담스러운 세부 사항 및 지나치게 세세한 컨셉 제공하기.</td>
  </tr>
  <tr>
   <td>코드 샘플 또는 다운로드 가능한 스타터 코드 제공하기. 더불어 최종 및 완료 프로젝트를 다운로드할 수 있게 지원하기.</td>
   <td>최종 결과를 달성하기 위한 다른 예제나 프로세스 제공하기.</td>
  </tr>
  <tr>
   <td>플러그 앤 플레이 환경 제작하기.</td>
   <td>설정 튜토리얼로 연결되는 링크. 튜토리얼은 그 자체로 충분한 것이어야 함.</td>
  </tr>
</table>

## 입문 가이드 <a name="introductory-guide"></a>

입문 가이드는 AMP 개발 시작을 위한 관련 정보를 간략히 제공합니다. 기능을 식별하고 해당 기능에 대한 설명한 후 어떤 역할을 하는지 알려주며 가이드를 마무리하면 좋습니다. 입문 가이드에서는 개발자가 기능을 구현하도록 지시하지 않고 기본 요건만을 소개합니다. 코드 샘플을 사용해 단계별로 프로세스를 설명한다면 튜토리얼을 작성하고 있는 것입니다. AMP 컴포넌트의 모든 프로그래밍 요소를 설명한다면 참조 문서를 작성하고 있는 것입니다.

amp.dev 예제:

- [AMP 이메일 기본](../../../../documentation/guides-and-tutorials/learn/email_fundamentals.md?format=email)
- [일반적인 요소 속성](../../../../documentation/guides-and-tutorials/learn/common_attributes.md?format=websites)

<table>
  <tr>
   <td>
<strong>Do</strong>
   </td>
   <td>
<strong>Don’t</strong>
   </td>
  </tr>
  <tr>
   <td>문서에서 다룰 주제를 확인하기.</td>
   <td>단계별 프로세스로 쪼개어 보기.</td>
  </tr>
  <tr>
   <td>기능 및 컨셉을 소개하기. 활용과 관련한 세부 정보는 참조 문서 링크로 제공.</td>
   <td>부담스러운 세부 사항을 설명하기.</td>
  </tr>
  <tr>
   <td>코드 샘플과 실제 사례 제공하기.</td>
   <td>전체 앱을 제작하기. 그 대신 추가로 탐색할 수 있도록 예제나 데모의 링크 제공.</td>
  </tr>
  <tr>
   <td>기술 활용 및 제한 사항 나열하기.</td>
   <td>가능한 모든 기술 활용 및 구현 방법 나열하기.</td>
  </tr>
</table>

## 컨셉 가이드 <a name="concept-guide"></a>

컨셉 가이드는 개발자가 AMP를 심층적으로 이해하는 데 유용하며, 토포그래픽 지도와 같은 역할을 합니다. 지역의 고도 변화와 같은 세부 정보가 포함된 여러 갈래의 길을 보여주지만 특정한 길을 제시하지는 않습니다. 기능에 대해 설명하고 그 기능을 빌드하는 방법보다는 작동 원리를 알려줍니다.

amp.dev 예제:

- [애니메이션 & 전환](../../../../documentation/guides-and-tutorials/develop/animations/triggering_css_animations.md?format=websites)
- [분석을 활용한 참여 추적](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md?format=websites)
- [스타일 & 레이아웃](../../../../documentation/guides-and-tutorials/develop/style_and_layout/index.md?format=websites)

<table>
  <tr>
   <td>
<strong>Do</strong>
   </td>
   <td>
<strong>Don’t</strong>
   </td>
  </tr>
  <tr>
   <td>솔루션 구축에 필요한 모든 요소를 개발자에게 제공하기.</td>
   <td>개발자에게 최종 상태를 적극적으로 알려주기.</td>
  </tr>
  <tr>
   <td>주제 영역의 모든 측면을 설명하기.</td>
   <td>특정 작업에만 집중하기.</td>
  </tr>
  <tr>
   <td>다이어그램 또는 스크린샷과 같은 시각 보조 자료 포함하기.</td>
   <td>심각하게 고민하기. [아웃리치 워킹그룹](https://github.com/ampproject/wg-outreach)의 시각 보조 자료 지원을 요청할 수 있음.</td>
  </tr>
  <tr>
   <td>코드 샘플 및 다른 가이드로 연결되는 링크 제공하기.</td>
   <td>완료된 프로젝트 또는 연관성 없는 자료 다운로드 제공하기.</td>
  </tr>
</table>

## 참조 문서 <a name="reference-documentation"></a>

참조 문서는 AMP 컴포넌트의 모든 프로그래밍 요소를 나열합니다. 자세한 동작 정보를 제공하며 훑어볼 수 있게 설계되어 있습니다. 참조 문서는 모범 코드 샘플을 포함하고 활용 사례를 제시해야 합니다.

amp.dev 참조 문서는 [AMP 컴포넌트 카탈로그](../../../../documentation/components/index.html?format=websites)에서 확인할 수 있습니다.

[tip type="important"] AMP 참조 문서는[AMPHTML 저장소](https://github.com/ampproject/amphtml)에 기여됩니다. [/tip]

<table>
  <tr>
   <td>
<strong>Do</strong>
   </td>
   <td>
<strong>Don’t</strong>
   </td>
  </tr>
  <tr>
   <td>컴포넌트의 작동 방식을 명확하고 간결하게 작성하기.</td>
   <td>프로세스를 설명하거나 프로젝트를 빌드하기.</td>
  </tr>
  <tr>
   <td>훑어보기 쉬운 제목, 1차 소제목, 2차 소제목으로 구조화.</td>
   <td>추상적인 제목으로 콘텐츠를 묶어서 제공하기.</td>
  </tr>
  <tr>
   <td>컴포넌트 활용을 보여주는 코드 조각 제공하기.</td>
   <td>전체 데모 애플리케이션 제작하기.</td>
  </tr>
</table>
