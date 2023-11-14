---
$title: amp-addthis
$category@: social
teaser:
  text: AddThis 웹사이트 도구 삽입을 표시합니다.
---


<!--
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



[AddThis](https://www.addthis.com) 웹사이트 도구 삽입을 표시합니다.

<table>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-addthis" src="https://ampjs.org/v0/amp-addthis-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
</table>


## 왜 AddThis를 사용해야 하나요? <a name="why-addthis"></a>

`amp-addthis` 구성요소는 보기 좋고 단순한 공유 버튼을 제공합니다. 웹사이트 방문자가 Messenger, WhatsApp, Facebook, Twitter, Pinterest 등 200개 이상의 소셜 채널에서 콘텐츠를 손쉽게 공유할 수 있습니다.

AddThis는 전 세계에서 60개 이상의 언어로 콘텐츠를 공유하며 순 사용자 수가 20억 이상인 천 오백만 개 이상의 웹사이트로부터 신뢰를 받고 있습니다.

## 공유 버튼 <a name="share-buttons"></a>

### 플로팅 <a name="floating"></a>

페이지 측면, 상단 또는 하단에 배치되며 독자가 스크롤할 때 따라갑니다. 눈에 너무 띄지 않으면서 공유를 촉진할 수 있는 좋은 방법입니다.

예:
```html
<!--
  이 예에서는 자리표시자 pubId가 사용됩니다.
  https://www.addthis.com/dashboard에서 계정을 생성한 후
  자신만의 pubId 값으로 변경하세요.
-->
<amp-addthis
  width="320"
  height="92"    
  layout="responsive"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="957l"
  data-widget-type="floating">
</amp-addthis>
```

### 인라인 <a name="inline"></a>

원활한 공유 환경을 위해 콘텐츠에 공유 버튼을 통합합니다.

예:
```html
<!--
  이 예에서는 자리표시자 pubId가 사용됩니다.
  https://www.addthis.com/dashboard에서 계정을 생성한 후
  자신만의 pubId 값으로 변경하세요.
-->
<amp-addthis
  width="320"
  height="92"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="mv93"
  data-widget-type="inline">
</amp-addthis>
```

## 속성 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>data-pub-id</strong></td>
    <td>로그인 후 <a href="https://addthis.com/dashboard">AddThis 대시보드</a>의 URL에 있는 AddThis 게시자 ID입니다. 예를 들어 <code>https://www.addthis.com/dashboard#gallery/pub/ra-5c191331410932ff</code> URL에서는 <code>ra-5c191331410932ff</code>가 게시자 ID입니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-id</strong></td>
    <td>표시되는 도구의 AddThis 위젯 ID로, <a href="https://addthis.com/dashboard">AddThis 대시보드</a>에도 있습니다. 특정 도구의 위젯 ID는 AddThis 대시보드에서 그 도구를 열고 URL의 마지막 부분을 복사하여 찾을 수 있습니다. 예를 들어 <code>https://www.addthis.com/dashboard#tool-config/pub/ra-5c191331410932ff/widgetId/957l</code> URL에서는 <code>957l</code>이 위젯 ID입니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-type</strong></td>
    <td>위젯 유형을 설명하는 속성입니다.
      <ul>
        <li>플로팅: <code>data-widget-type="floating"</code></li>
        <li>인라인: <code>data-widget-type="inline"</code></li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-title</strong></td>
      <td>선택사항입니다. 설정하는 경우 공유가 실행될 때 AddThis 도구에서 공유를 시도할 제목입니다. 설정하지 않으면 <code>amp-addthis</code> 태그를 포함하는 문서의 제목이 사용됩니다.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-url</strong></td>
      <td>선택사항입니다. 설정하는 경우 공유가 실행될 때 AddThis 도구에서 공유를 시도할 URL입니다. 설정하지 않으면 <code>amp-addthis</code>를 포함하는 문서의  <code>location.href</code> 속성이 사용됩니다.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-media</strong></td>
      <td>선택사항입니다. 설정하는 경우 공유가 실행될 때 AddThis 도구에서 공유를 시도할 미디어(예: 이미지 또는 동영상) 부분의 URL입니다. 설정하지 않으면 정의되지 않은 상태로 남습니다.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-description</strong></td>
      <td>선택사항입니다. 설정하는 경우 공유가 실행될 때 AddThis 도구에서 공유를 시도할 페이지의 설명입니다. 설정하지 않으면 정의되지 않은 상태로 남습니다.</td>
    </tr>
  </table>

## 구현 문서 <a name="implementation-documentation"></a>

1. 아직 만들지 않았다면  [https://www.addthis.com/register](https://www.addthis.com/register)에서 AddThis 계정을 만들어야 합니다. AddThis 계정은 비용을 전혀 들이지 않고 만들 수 있으며, 이 계정을 통해 Google의 전체 웹사이트 도구뿐 아니라 심도 있는 분석 보고서에 액세스하여 내 사이트의 소셜 트래픽을 더욱 효과적으로 파악할 수 있습니다.
1. [대시보드](https://addthis.com/dashboard)로 이동하여 공유 버튼을 맞춤설정합니다. AMP에서는 현재 플로팅 및 인라인 공유 버튼만 지원합니다.
1. 공유 버튼을 원하는 대로 맞춤설정한 후 '도구 활성화'를 누릅니다. 그러면 코드 가져오기 페이지로 리디렉션됩니다.
1. 마지막으로 인라인 코드를 복사하여 공유 버튼을 표시할 페이지의 본문 섹션에 붙여넣습니다. 플로팅 공유 버튼의 경우 도구의 설정에서 설정한 위치에 따라 이 버튼이 화면의 왼쪽이나 오른쪽에 자동으로 표시되므로 이 코드를 본문 아무 곳에나 배치해도 됩니다.

끝났습니다. 이제 페이지에 공유 버튼이 표시됩니다.

단계별 안내는 [YouTube 동영상](https://www.youtube.com/watch?v=BSkuAB4er2o)을 확인하세요.
<amp-youtube width="480" height="270" data-videoid="BSkuAB4er2o" layout="responsive"></amp-youtube>

## 유효성 검사 <a name="validation"></a>

AMP 유효성 검사기 사양의 [amp-addthis 규칙](https://github.com/ampproject/amphtml/blob/main/extensions/amp-addthis/validator-amp-addthis.protoascii)을 참조하세요.

## 개인정보 보호 <a name="privacy"></a>

[http://www.addthis.com/privacy/privacy-policy/](http://www.addthis.com/privacy/privacy-policy/)

AddThis 도구와 AddThis 툴바는 최종 사용자가 게시자 사이트와 상호작용하는 데 사용하거나 툴바 사용자가 AddThis 툴바와 상호작용하는 데 사용하는 기기에서 정보('AddThis 데이터')를 수집합니다.

AddThis 데이터는 다음 항목으로 구성될 수 있습니다.

* IP(인터넷 프로토콜) 주소, 모바일 앱 개발자가 자신의 모바일 앱을 사용하는 사용자를 식별할 수 있게 하는 MAID(모바일 광고 ID), 모바일 애플리케이션 ID, 브라우저 유형, 브라우저 언어, 운영체제 유형, 최종 사용자가 게시자 사이트 또는 툴바를 방문한 날짜 및 시간
* 툴바를 사용한 사용자
* 최종 사용자가 게시자 사이트를 방문한 기간, 최종 사용자가 게시자 사이트에서 콘텐츠를 공유하는 동작, 최종 사용자가 게시자 사이트에서 스크롤하는 동작 등 게시자 사이트에서의 동작
* 최종 사용자가 게시자 사이트를 찾아 탐색하는 데 사용한 참조 URL 및 웹 검색
* AddThis 툴바 검색 기능에 입력한 키워드, 툴바 사용자가 AddThis 툴바를 다운로드, 설치 또는 제거하는지 여부 및 그 시기
* 최종 사용자가 AddThis 도구를 사용하는 빈도 및 툴바 사용자가 AddThis 툴바를 사용하는 빈도에 관한 정보
* 최종 사용자 및 툴바 사용자의 IP 주소에서 파생된 지리적 위치 데이터

AddThis 데이터는 관련 법에 따라 필요한 범위 내에서 개인 정보로 취급됩니다. 게시자는 AddThis 서비스 약관에 따라 필요한 모든 최종 사용자 동의 및 승인을 받아야 하며 최종 사용자로부터 수집한 AddThis 데이터를 Oracle에 제공하는 데 필요한 모든 알림을 제공해야 합니다.

## 지원 <a name="support"></a>

AMP에서 AddThis 구현에 관한 문의사항이 있거나 도움이 필요하면 [여기](https://www.addthis.com/support/)에서 티켓을 제출하거나 [help@addthis.com](mailto%3ahelp@addthis.com)에 이메일을 보내어 지원팀에 문의하시기 바랍니다.
