---
$category@: presentation
formats:
  - websites
  - stories
teaser:
  text: 풍부한 시각적 스토리텔링 형식입니다.
---



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

# amp-story

<table>
  <tr>
    <td width="40%"><strong>설명</strong></td>
    <td>풍부한 시각적 스토리텔링 형식입니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>지원 대상</strong></td>
    <td><div><a href="https://www.ampproject.org/docs/reference/experimental.html">실험용</a></div></td>
  </tr>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">지원되는 레이아웃</a></strong></td>
    <td>없음</td>
  </tr>
  <tr>
    <td width="40%"><strong>예</strong></td>
    <td><ul>
      <li>AMP By Example의 <a href="https://ampbyexample.com/stories/introduction/amp_story_hello_world/">Hello World</a> 샘플을 참조하세요.</li>
      <li><a href="https://www.ampproject.org/docs/tutorials/visual_story">시각적 AMP 스토리 작성하기</a> 가이드에서 알아보세요.</li>
    </ul></td>
  </tr>
</table>

[tip type="caution"]
이 구성요소는 실험적 요소이며 현재 개발 중입니다. 문제가 있으면 [GitHub에서 문제를 신고](https://github.com/ampproject/amphtml/issues/new)하세요.
[/tip]



## 버전 메모

| 버전 | 설명                                                            |
|-------|----------------------------------------------------------------------|
| 1.0     | 2018년 7월 16일 이후 최신 버전입니다.                                     |
| 0.1     | 처음으로 구현되는 형식입니다.  지원이 중단되었으며 2019-03-19에 삭제됩니다. |

## 0.1에서 1.0으로 이전

2018년 7월 16일 현재, 버전 0.1은 지원이 중단된 것으로 간주되며 2019년 3월 19일에 삭제됩니다.  사용자의 스토리가 버전 1.0을 사용하도록 자동 업그레이드되므로 약간의 브레이킹 체인지가 발생할 수 있습니다.  올바른 기능과 디자인을 사용할 수 있도록 이 날짜 이전에 페이지를 버전 1.0으로 직접 이전하는 것이 좋습니다.

### 새로운 북엔드 기능

amp-stories 북엔드에 새 기능을 추가했으므로, 더 풍부한 구성요소를 지원하고 시각적 레이아웃을 사용할 수 있습니다. 몇 가지 변경사항은 다음과 같습니다.

* 공유 공급자는 JSON 구성에 따라 정렬됩니다.
* 새로운 북엔드 구성요소:
    * 클릭 유도문안 링크
    * 텍스트 상자
    * 세로 모드 및 가로 모드 카드</li>

이 새로운 기능을 사용하려면 다음과 같은 필수 속성이 있는 `<amp-story-bookend>` 태그를 `<amp-story>`의 마지막 하위 요소로 추가합니다.

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `src` and `layout=nodisplay` are required. -->
  <amp-story-bookend src="bookendv1.json" layout="nodisplay">
  </amp-story-bookend>
</amp-story>
```

[amp-story-bookend](#bookend-amp-story-bookend) 섹션에서 새로운 구성요소와 JSON 구성에서 해당 구성요소를 지정하는 방법에 관해 자세히 알아보세요.

### 새로운 메타데이터 요구사항

`<amp-story>` 요소에 새로운 메타데이터 속성을 추가했습니다. 이러한 메타데이터 속성은 AMP 스토리 생태계 전체에서 스토리 미리보기를 표시하는 데 사용합니다. 예를 들어 해당 속성은 관련 기사의 북엔드에서 매력적인 미리보기 링크를 렌더링하는 데 사용할 수 있습니다. 이러한 속성을 제공하면 다가올 AMP 스토리의 풍부한 삽입 환경에 맞게 스토리를 대비할 수 있습니다.

```html
<!--</code>title<code>,</code>publisher<code>,</code>publisher-logo-src<code>and</code>poster-portrait-src'가 곧 필수가 됩니다. -->
<amp-story title="내 스토리" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"></amp-story></p>

<!-- <code>poster-square-src</code> and <code>poster-landscape-src</code> are optional, but strongly recommended. -->
<amp-story title="내 스토리" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg" poster-square-src="https://example.com/my-story/poster/1x1.jpg" poster-landscape-src="https://example.com/my-story/poster/4x3.jpg">
```

이러한 메타데이터 속성은 페이지에서 구조화된 데이터(예: JSON-LD)를 보완할 뿐, 대체하지는 않습니다. AMP 스토리를 포함하여 모든 AMP 페이지에 [구조화된 데이터](https://developers.google.com/search/docs/data-types/article#amp-sd)를 추가하는 것이 좋습니다.

새 속성:

| 속성 | 설명 |
|--|--|
| `title`[필수] | 스토리의 제목입니다. |
| `publisher`[필수] | 스토리 게시자의 이름입니다. |
| `publisher-logo-src`[필수] | 정사각형 형식(가로세로 비율 1x1)의 게시자 로고입니다. |
| `poster-portrait-src`[필수] | 세로 모드 형식(가로세로 비율 3x4)의 스토리 포스터입니다. |
| `poster-square-src` | 정사각형 형식(가로세로 비율 1x1)의 스토리 포스터입니다. |
| `poster-landscape-src` | 가로 모드 형식(가로세로 비율 4x3)의 스토리 포스터입니다. |

#### `publisher-logo-src` 지침

다음 지침은 게시자 로고의 이미지에 적용됩니다.

* 파일은 `.jpg`, `.png` 또는 `.gif` 등의 래스터 파일이어야 합니다.  `.svg` 또는 `.eps` 같은 벡터 파일은 사용하지 않습니다.
* 애니메이션 gifs와 같은 애니메이션 이미지는 사용하지 않습니다.
* 로고의 그래픽 부분을 배경색 위에서 알아볼 수 있어야 합니다.

<table>
  <tr>
    <td>
      <amp-img alt="흰색 배경에 파란색 텍스트가 있는 로고" width="107" height="112" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-1.png" layout="fixed">
        <noscript>
          <img alt="흰색 배경에 파란색 텍스트가 있는 로고" src="img/publisher-logo-1.png">
        </noscript>
      </amp-img>
      우선 적용
    </td>
    <td>
      <amp-img alt="파란색 배경에 흰색 텍스트가 있는 로고" width="107" height="101" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-2.png" layout="fixed">
        <noscript>
          <img alt="파란색 배경에 흰색 텍스트가 있는 로고" src="img/publisher-logo-2.png">
        </noscript>
      </amp-img>
      우선 적용
    </td>
    <td>
      <amp-img alt="파란색 배경에 파란색 텍스트가 있는 로고" width="103" height="102" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-3.png" layout="fixed">
        <noscript>
          <img alt="파란색 배경에 파란색 텍스트가 있는 로고" src="img/publisher-logo-3.png">
        </noscript>
      </amp-img>
      사용하지 않음
    </td>
  </tr>
</table>

* 로고 모양은 직사각형이 아니라 정사각형이어야 합니다.
* 배경색은 투명하지 않아야 합니다.
* 브랜드마다 AMP 스토리 전체에서 일관된 하나의 로고를 사용합니다.
* 로고는 최소 96 x 96픽셀이어야 합니다.

#### 포스터 지침(`poster-portrait-src`, `poster-landscape-src` 및 `poster-square-src`용)

스토리 포스터 이미지에는 다음 지침이 적용됩니다.

* 포스터 이미지는 전체 AMP 스토리를 잘 나타내야 합니다.
* 사용자가 AMP 스토리를 시작할 때 포스터 이미지가 표시되어야 합니다.  그러나 메타데이터에서 사용되는 이미지 파일 URL은 스토리의 첫 페이지에서 사용한 URL과 정확하게 일치하지 않아도 됩니다.  메타데이터에서 사용하는 URL에는 미리보기 용도로 시행하는 사소한 스타일 변경, 자르기 및 크기 조정이 포함됩니다.
* 포스터 이미지는 `.jpg`, `.png` 또는 `.gif` 같은 래스터 파일이어야 합니다.  `.svg` 또는 `.eps` 같은 벡터 파일은 사용하지 않습니다.
* 포스터 이미지의 가로세로 비율은 세로 모드의 경우 3x4, 가로 모드의 경우 4x3, 정사각형의 경우 1x1이어야 합니다.
* 포스터 이미지가 동영상의 프레임에서 파생되는 경우 미리보기 이미지는 동영상을 잘 나타내야 합니다. 예를 들어 동영상의 첫 번째 프레임은 동영상을 제대로 나타내지 않는 경우가 많습니다.
* 각 포스터 이미지는 다음과 같은 권장 최소 크기를 충족해야 합니다.
    * 세로 모드: 696 x 928픽셀
    * 가로 모드: 928 x 696픽셀
    * 정사각형: 928 x 928픽셀</li>

## 개요

`amp-story` 확장 프로그램에서는 스토리텔링 환경으로 통합할 수 있는 시각적 콘텐츠를 표시하는 새로운 형식을 제공합니다. AMP 스토리를 사용하면 사용자에게 바이트 크기의 시각적으로 풍부한 정보와 콘텐츠를 제공할 수 있습니다.

<figure class="centered-fig">
  <amp-anim width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="AMP 스토리 예" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
    </noscript>
  </amp-anim>
</figure>

## AMP 스토리 형식

[AMP 스토리](#story%3a-amp-story)는 [페이지](#pages%3a-amp-story-page)로 구성된 전체 AMP HTML 문서입니다. 페이지에는 [레이어](#layers%3a-amp-story-grid-layer)가 있고, 레이어에는 미디어, 분석, 텍스트 등의 AMP 및 HTML 요소가 있습니다.

<amp-img alt="AMP 스토리 태그 계층 구조" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="AMP 스토리 태그 계층 구조" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png">
  </noscript>
</amp-img>

### 상용구

다음 마크업은 알맞은 시작점 또는 상용구입니다. 이 마크업을 복사하여 확장자가 `.html`인 파일에 저장합니다.

```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>Hello, amp-story</title>
    <link rel="canonical" href="http://example.ampproject.org/my-story.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal
    both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript>
      <style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none
        }
      </style>
    </noscript>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="my-first-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>Hello, amp-story!</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="my-second-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg2.gif" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>The End</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-bookend src="bookendv1.json" layout="nodisplay">
      </amp-story-bookend>
    </amp-story>
  </body>
</html>
```

본문 콘텐츠에서는 페이지가 두 개인 스토리를 만듭니다.  각 페이지에는 전면 백그라운드 이미지가 있으며, 그 상단에는 간단한 텍스트 문자열이 있습니다.

### amp-story의 필수 마크업

AMP 스토리 HTML 형식은 [유효한 AMP HTML 문서와 동일한 마크업 요구사항](https://www.ampproject.org/docs/reference/spec#required-markup)과 다음 추가 요구사항을 따릅니다.

| 규칙 | 설명 |
|----|---|
| `<amp-story standalone>` 요소가 `<body>`의 유일한 하위 요소입니다. | 문서가 AMP 스토리임을 식별합니다. |
| `<script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js" custom-element="amp-story"></script>` 태그가 `<head>` 태그의 세 번째 하위 요소로 포함되어 있습니다. | amp-story JS 라이브러리를 포함하고 로드합니다. |
| `<link rel="canonical" href="$STORY_URL">` 태그가 `<head>`에 포함되어 있습니다. | 링크에서 스토리 자체를 가리키며, 스토리를 표준 문서로 식별합니다. |

## 스토리: `amp-story`

`amp-story` 구성요소는 전체 스토리를 나타냅니다.  구성요소 자체에서 동작 및 탐색 처리와 앱 셸 UI(컨트롤, 진행률 표시줄 등) 삽입으로 UI 셸을 구현합니다.

<figure class="centered-fig">
  <amp-anim alt="amp-story 예" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="amp-story 예" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
    </noscript>
  </amp-anim>
</figure>

### 예

```html
<amp-story
    standalone
    title="My Story"
    publisher="The AMP Team"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
    poster-square-src="https://example.com/my-story/poster/1x1.jpg"
    poster-landscape-src="https://example.com/my-story/poster/4x3.jpg"
    background-audio="my.mp3">
    <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-bookend src="./related.json"></amp-story-bookend>
</amp-story>
```

### 속성

##### standalone[필수]

AMP 문서가 스토리임을 식별합니다.

##### title[필수]

스토리의 제목입니다.

##### publisher[필수]

스토리 게시자의 이름입니다.

##### publisher-logo-src[필수]

정사각형 형식(가로세로 비율 1x1)으로 된 스토리 게시자 로고의 URL입니다. 예를 들어 `publisher-logo-src="https://example.com/logo/1x1.png"`입니다. 여기서 1x1.png는 36x36픽셀 로고입니다.

##### poster-portrait-src[필수]

세로 모드 형식(가로세로 비율 3x4)으로 된 [스토리 포스터](#posters)의 URL입니다.

##### supports-landscape[선택사항]

휴대기기에서는 가로 모드 방향 지원을 사용하고 데스크톱 기기에서는 전면 가로 모드 환경을 사용합니다.

##### background-audio[선택사항]

스토리 전체에서 재생되는 오디오 파일의 URL입니다.

##### poster-square-src[선택사항]

정사각형 형식(가로세로 비율 1x1)으로 된 [스토리 포스터](#posters)의 URL입니다.

##### poster-landscape-src[선택사항]

가로 모드 형식(가로세로 비율 4x3)으로 된 [스토리 포스터](#posters)의 URL입니다.

### 포스터

'포스터'는 스토리가 로드될 때까지 UI에 표시되는 이미지입니다. 일반적으로 포스터가 스토리의 첫 화면이 되지만, 스토리를 나타내는 어떤 이미지든 사용할 수 있습니다.

### 하위 요소(amp-story에 속함)

`<amp-story>` 구성요소에는 각각 스토리의 개별 화면을 담고 있는 하나 이상의 [`<amp-story-page>`](#pages%3a-amp-story-page) 구성요소가 포함되어 있습니다.  문서 순서에 가장 먼저 지정된 페이지가 스토리에 표시되는 첫 번째 페이지입니다.

### 가로 모드 방향과 전면 데스크톱 환경 선택

`supports-landscape` 속성이 `<amp-story>` 요소에 지정된 경우 다음을 시행합니다.

* 휴대기기를 가로 모드 방향으로 들면 스토리를 볼 수 있습니다.
* 데스크톱 환경을 몰입형 전면 모드로 변경하여 세 개의 세로 모드 패널 환경을 바꿉니다.

사용법: `<amp-story ... supports-landscape>...</amp-story>`

<figure class="centered-fig">
  <span class="special-char">이전:</span>
  <amp-anim alt="세 개의 패널로 구성된 데스크톱 환경" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif"></noscript>
  </amp-anim>
  <span class="special-char">이후:</span>
  <amp-anim alt="데스크톱 전면 환경" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif"></noscript>
  </amp-anim>
</figure>

## 페이지: `amp-story-page`

`<amp-story-page>` 구성요소는 스토리의 단일 페이지에 표시할 콘텐츠를 나타냅니다.

<figure class="centered-fig">
  <amp-anim alt="1페이지 예" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif" layout="fixed">
    <noscript>
      <img alt="1페이지 예" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif">
      </noscript>
    </amp-anim>
  </figure>
  <figure class="centered-fig">
    <amp-anim alt="2페이지 예" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif" layout="fixed">
      <noscript>
        <img alt="2페이지 예" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif">
        </noscript>
      </amp-anim>
    </figure>

### 예

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-video layout="fill" src="background.mp4" poster="background.png" muted autoplay></amp-video>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical">
    <h1>These are the Top 5 World's Most...</h1>
    <p>Jon Bersch</p>
    <p>May 18</p>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="thirds">
    <amp-img grid-area="bottom-third" src="a-logo.svg" width="64" height="64"></amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

### 속성

##### id[필수]

페이지의 고유 식별자입니다. CSS에서 페이지와 하위 항목의 스타일을 지정하는 데 사용할 수 있고, URL 단편에서 페이지를 고유하게 식별하는 데도 사용합니다.

##### auto-advance-after[선택사항]

다음 페이지로 자동 진행하는 시기를 지정합니다.  생략하면 페이지가 자동으로 진행되지 않습니다. `auto-advance-after`의 값은 다음 중 하나여야 합니다.

* 자동으로 다음 페이지로 진행하기 전에 대기해야 하는 포지티브 [시간](https://developer.mozilla.org/ko-KR/docs/Web/CSS/time)
* 자동 진행이 트리거되려면 완료해야 하는 [HTMLMediaElement](https://developer.mozilla.org/ko-KR/docs/Web/API/HTMLMediaElement) 또는 video-interface 동영상의 ID

예:

```html
<amp-story-page id="tokyo" auto-advance-after="1s">
```

##### background-audio[선택사항]

이 페이지가 표시되는 동안 재생되는 오디오 파일의 URI입니다.

예:

```html
<amp-story-page id="zurich" background-audio="./media/switzerland.mp3">
```

### 하위 요소(amp-story-page에 속함)

`<amp-story-page>` 구성요소에는 하나 이상의 [레이어](#layers)가 포함되어 있습니다.  레이어는 상향식으로 누적됩니다(DOM에 지정된 첫 번째 레이어가 하단에 오고 DOM에 지정된 마지막 레이어가 상단에 옴).

## 레이어

레이어는 서로 겹쳐 누적되므로 원하는 시각적 효과를 낼 수 있습니다.

### `amp-story-grid-layer`

`<amp-story-grid-layer>` 구성요소는 하위 요소를 그리드에 배치하며,  [CSS 그리드 사양](https://www.w3.org/TR/css-grid-1/)을 기반으로 구현됩니다.

<div class="flex-images">
  <amp-img alt="레이어 1" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif" width="200" height="355" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif"></noscript>
  </amp-img>
  <span class="special-char">+</span>
  <amp-img alt="레이어 2" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg"></noscript></amp-img>
    <span class="special-char">+</span>
    <amp-img alt="레이어 3" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg" width="200" layout="flex-item">
      <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg"></noscript></amp-img>
      <span class="special-char">=</span>
      <amp-img alt="모든 레이어" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif" width="200" layout="flex-item">
        <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif"></noscript></amp-img>
      </div>

#### 속성

##### template[필수]

`template` 속성을 사용하여 그리드 레이어의 레이아웃을 결정합니다. 사용 가능한 템플릿은 아래 [템플릿](#templates) 섹션에 설명되어 있습니다.

##### grid-area[선택사항]

이 속성은 `<amp-story-grid-layer>`의 하위 요소에 지정됩니다. `grid-area`를 통해서는 이 속성을 포함하는 요소가 표시되어야 하는 이름이 있는 영역(해당 레이어를 정의하는 `template` 사용)을 지정합니다.

예:

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### 템플릿

다음은 그리드 레이어의 레이아웃을 지정하는 데 사용할 수 있는 템플릿입니다.

[tip type="success"]
사용 중인 레이아웃 템플릿을 보려면 [AMP By Example의 레이아웃 데모](https://ampbyexample.com/stories/features/layouts/)를 확인하세요.
[/tip]

##### fill

`fill` 템플릿에서는 첫 번째 하위 요소를 전면으로 표시합니다. 기타 모든 하위 요소는 표시되지 않습니다.

이름 영역: (없음)

예:

<amp-img alt="Fill 템플릿 예" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Horizontal 템플릿 예" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png">
  </noscript>
</amp-img>

```html
<amp-story-grid-layer template="fill">
  <amp-img src="cat.jpg"></amp-img>
</amp-story-grid-layer>
```

##### vertical

`vertical` 템플릿은 Y축을 따라 요소를 배치합니다.  기본적으로 요소가 상단에 정렬되고 X축을 따라 화면 전체를 차지할 수 있습니다.

이름 영역: (없음)

<amp-img alt="Vertical 템플릿 예" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Horizontal 템플릿 예" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png">
  </noscript>
</amp-img>

```html
<amp-story-grid-layer template="vertical">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### horizontal

`horizontal` 템플릿은 X축을 따라 요소를 배치합니다.  기본적으로 요소가 행의 시작 부분에 정렬되고 Y축을 따라 화면 전체를 차지할 수 있습니다.

이름 영역: (없음)

<amp-img alt="Horizontal 템플릿 예" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Horizontal 템플릿 예" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png">
  </noscript>
</amp-img>

```html
<amp-story-grid-layer template="horizontal">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### thirds

`thirds` 템플릿을 사용하면 화면을 가로로 삼등분하여 각 영역에 콘텐츠를 배치할 수 있습니다.

이름이 있는 영역:

* `upper-third`
* `middle-third`
* `lower-third`

<amp-img alt="Horizontal 템플릿 예" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Thirds 템플릿 예" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png">
  </noscript>
</amp-img>

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### 하위 요소

`amp-story-grid-layer`에는 다음 요소를 포함할 수 있습니다.

**차목**: 이 목록은 시간 경과에 따라 확장됩니다.

<table>
  <tr>
    <th width="40%">영역
    </th><th>허용되는 태그 </th>
  </tr>
  <tr>
    <td>미디어</td>
    <td>
      <ul>
        <li><code>&lt;amp-audio></code></li>
        <li><code>&lt;amp-gfycat></code></li>
        <li><code>&lt;amp-google-vrview-image></code></li>
        <li><code>&lt;amp-img></code></li>
        <li><code>&lt;amp-video></code></li>
        <li><code>&lt;source></code></li>
        <li><code>&lt;track></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>분석 및 측정</td>
    <td>
      <ul>
        <li><code>&lt;amp-analytics></code></li>
        <li><code>&lt;amp-experiment></code></li>
        <li><code>&lt;amp-pixel></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>섹션 나누기</td>
    <td>
      <ul>
        <li><code>&lt;address></code></li>
        <li><code>&lt;article></code></li>
        <li><code>&lt;aside></code></li>
        <li><code>&lt;footer></code></li>
        <li><code>&lt;h1>-<h6></code></li>
        <li><code>&lt;header></code></li>
        <li><code>&lt;hgroup></code></li>
        <li><code>&lt;nav></code></li>
        <li><code>&lt;section></code></li>
        <li><code>&lt;amp-story-cta-layer></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>텍스트</td>
    <td>
      <ul>
        <li><code>&lt;abbr></code></li>
        <li><code>&lt;amp-fit-text></code></li>
        <li><code>&lt;amp-font></code></li>
        <li><code>&lt;amp-gist></code></li>
        <li><code>&lt;b></code></li>
        <li><code>&lt;bdi></code></li>
        <li><code>&lt;bdo></code></li>
        <li><code>&lt;blockquote></code></li>
        <li><code>&lt;br></code></li>
        <li><code>&lt;cite></code></li>
        <li><code>&lt;code></code></li>
        <li><code>&lt;data></code></li>
        <li><code>&lt;del></code></li>
        <li><code>&lt;dfn></code></li>
        <li><code>&lt;div></code></li>
        <li><code>&lt;em></code></li>
        <li><code>&lt;figcaption></code></li>
        <li><code>&lt;figure></code></li>
        <li><code>&lt;hr></code></li>
        <li><code>&lt;i></code></li>
        <li><code>&lt;ins></code></li>
        <li><code>&lt;kbd></code></li>
        <li><code>&lt;main></code></li>
        <li><code>&lt;mark></code></li>
        <li><code>&lt;p></code></li>
        <li><code>&lt;pre></code></li>
        <li><code>&lt;q></code></li>
        <li><code>&lt;rp></code></li>
        <li><code>&lt;rt></code></li>
        <li><code>&lt;rtc></code></li>
        <li><code>&lt;ruby></code></li>
        <li><code>&lt;s></code></li>
        <li><code>&lt;samp></code></li>
        <li><code>&lt;small></code></li>
        <li><code>&lt;span></code></li>
        <li><code>&lt;strong></code></li>
        <li><code>&lt;sub></code></li>
        <li><code>&lt;sup></code></li>
        <li><code>&lt;time></code></li>
        <li><code>&lt;u></code></li>
        <li><code>&lt;var></code></li>
        <li><code>&lt;wbr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>목록</td>
    <td>
      <ul>
        <li><code>&lt;amp-list></code></li>
        <li><code>&lt;amp-live-list></code></li>
        <li><code>&lt;dd></code></li>
        <li><code>&lt;dl></code></li>
        <li><code>&lt;dt></code></li>
        <li><code>&lt;li></code></li>
        <li><code>&lt;ol></code></li>
        <li><code>&lt;ul></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>표</td>
    <td>
      <ul>
        <li><code>&lt;caption></code></li>
        <li><code>&lt;col></code></li>
        <li><code>&lt;colgroup></code></li>
        <li><code>&lt;table></code></li>
        <li><code>&lt;tbody></code></li>
        <li><code>&lt;td></code></li>
        <li><code>&lt;tfoot></code></li>
        <li><code>&lt;th></code></li>
        <li><code>&lt;thead></code></li>
        <li><code>&lt;tr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>기타</td>
    <td>
      <ul>
        <li><code>&lt;amp-install-serviceworker></code></li>
        <li><code>&lt;noscript></code></li>
      </ul>
    </td>
  </tr>
</table>

### `amp-story-cta-layer`

`<amp-story-cta-layer>` 구성요소를 사용하면 `<amp-story-page>`에서 `<a>` 및 `<button>` 요소를 사용할 수 있습니다.

#### 제약사항

* 지정된 경우 `<amp-story-cta-layer>` 요소는 `<amp-story-page>`의 마지막 레이어여야 합니다. 결과적으로 모든 `<amp-story-page>`에 `<amp-story-cta-layer>` 요소가 정확히 하나 또는 정확히 0개가 있을 수 있습니다.
* 이 레이어의 위치와 크기는 조정할 수 없습니다. 항상 페이지 너비의 100%와 페이지 높이의 20%를 사용하고 페이지 하단에 정렬됩니다.

#### 예

```html
<amp-story-page id="vertical-template-thirds">
  <amp-story-grid-layer template="thirds">
    <div class="content" grid-area="upper-third">Paragraph 1</div>
    <div class="content" grid-area="middle-third">Paragraph 2</div>
    <div class="content" grid-area="lower-third">Paragraph 3</div>
  </amp-story-grid-layer>
  <amp-story-cta-layer>
    <a href="https://www.ampproject.org" class="button">Outlink here!</a>
  </amp-story-cta-layer>
</amp-story-page>
```

<amp-img alt="CTA 레이어" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png" width="404" height="678" layout="fixed">
  <noscript>
    <img width="404" height="678" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png">
  </noscript>
</amp-img>

[예제 디렉토리에 있는 전체 예](https://github.com/ampproject/amphtml/blob/master/examples/amp-story/cta-layer-outlink.html)

#### 하위 요소

`amp-story-cta-layer`를 사용하면 `amp-story-grid-layer`와 거의 동일한 하위 요소를 사용할 수 있고, 추가로 `<a>`와 `<button>` 태그를 사용할 수 있습니다.

지원되는 하위 요소의 업데이트된 목록을 보려면 유효성 검사 규칙의 [amp-story-cta-layer-allowed-descendants](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) 필드를 확인하세요.

## 페이지 첨부파일

### `amp-story-page-attachment`

<amp-img alt="AMP 스토리 페이지 첨부파일" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif" width="240" height="480" layout="fixed">
  <noscript>
    <img alt="AMP 스토리 페이지 첨부파일" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif">
  </noscript>
</amp-img>

스토리 페이지에 추가 콘텐츠를 첨부합니다.

스토리 페이지 첨부파일을 사용하면 특정 페이지에 AMPHTML 콘텐츠를 제공할 수 있습니다. 이 콘텐츠는 '위로 스와이프' 동작 또는 클릭 유도문안 요소를 탭하여 표시할 수 있습니다.
첨부파일을 구성한 모든 페이지 하단에 첨부파일을 열도록 요청하는 UI 메시지가 자동으로 추가됩니다.

`<amp-story-page-attachment>` 요소는 `<amp-story-page>`의 마지막 하위 요소여야 하며 `layout="nodisplay"` 속성이 있어야 합니다. 첨부파일 AMPHTML 콘텐츠는 `<amp-story-page-attachment>` 태그의 AMP 스토리에 인라인으로 제공해야 합니다.

### 허용된 콘텐츠와 구성요소

스토리 페이지 첨부파일을 사용하면 제3자 동영상 플레이어 또는 소셜 미디어 삽입과 같이 아래 나열된 추가 구성요소와 함께 AMP 스토리와 동일한 HTML 요소를 사용할 수 있습니다. 즉, 너무 상세하거나 AMP 스토리 페이지에서 허용되지 않는 콘텐츠를 추가할 수 있습니다.

<details>
  <summary>페이지 첨부파일에서 허용되는 AMP 구성요소 목록</summary>

  * `<amp-3d-gltf>`
  * `<amp-3q-player>`
  * `<amp-accordion>`
  * `<amp-audio>`
  * `<amp-beopinion>`
  * `<amp-bodymovin-animation>`
  * `<amp-brid-player>`
  * `<amp-brightcove>`
  * `<amp-byside-content>`
  * `<amp-call-tracking>`
  * `<amp-carousel>`
  * `<amp-dailymotion>`
  * `<amp-date-countdown>`
  * `<amp-embedly-card>`
  * `<amp-facebook>`
  * `<amp-facebook-comments>`
  * `<amp-facebook-like>`
  * `<amp-facebook-page>`
  * `<amp-fit-text>`
  * `<amp-fx-collection>`
  * `<amp-fx-flying-carpet>`
  * `<amp-gfycat>`
  * `<amp-gfycat>`
  * `<amp-gist>`
  * `<amp-gist>`
  * `<amp-google-document-embed>`
  * `<amp-google-vrview-image>`
  * `<amp-google-vrview-image>`
  * `<amp-hulu>`
  * `<amp-ima-video>`
  * `<amp-image-slider>`
  * `<amp-img>`
  * `<amp-imgur>`
  * `<amp-instagram>`
  * `<amp-izlesene>`
  * `<amp-jwplayer>`
  * `<amp-kaltura-player>`
  * `<amp-list>`
  * `<amp-list>`
  * `<amp-live-list>`
  * `<amp-live-list>`
  * `<amp-mathml>`
  * `<amp-mowplayer>`
  * `<amp-nexxtv-player>`
  * `<amp-o2-player>`
  * `<amp-ooyala-player>`
  * `<amp-pan-zoom>`
  * `<amp-pinterest>`
  * `<amp-playbuzz>`
  * `<amp-powr-player>`
  * `<amp-reach-player>`
  * `<amp-reddit>`
  * `<amp-riddle-quiz>`
  * `<amp-soundcloud>`
  * `<amp-springboard-player>`
  * `<amp-timeago>`
  * `<amp-twitter>`
  * `<amp-video>`
  * `<amp-video-iframe>`
  * `<amp-vimeo>`
  * `<amp-vine>`
  * `<amp-viqeo-player>`
  * `<amp-vk>`
  * `<amp-wistia-player>`
  * `<amp-yotpo>`
  * `<amp-youtube>`

</details>

### 예

```html
<amp-story-page id="foo">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600">
    </amp-story-grid-layer>
    <amp-story-page-attachment layout="nodisplay">
      <h1>My title</h1>
      <p>Lots of interesting text with <a href="https://example.ampproject.org">links</a>!</p>
      <p>More text and a YouTube video!</p>
      <amp-youtube
          data-videoid="b4Vhdr8jtx0"
          layout="responsive"
          width="480" height="270">
      </amp-youtube>
    <p>And a tweet!</p>
    <amp-twitter
        data-tweetid="885634330868850689"
        layout="responsive"
        width="480" height="270">
    </amp-twitter>
  </amp-story-page-attachment>
</amp-story-page>
```

## 애니메이션

`<amp-story-page>`의 모든 요소에는 시작 애니메이션이 있습니다.

요소에서 [애니메이션 속성](#animation-attributes) 조합을 지정하여 애니메이션을 구성할 수 있습니다. 추가 AMP 확장 프로그램이나 구성이 필요하지 않습니다.

### 애니메이션 효과

다음 애니메이션 효과는 AMP 스토리에 미리 설정되어 있습니다.

| 미리 설정된 이름       | 기본 지속 기간(ms) | 기본 지연 시간(ms) |
|-----------------|---------------------| ------------------ |
| `drop`            | 1600                  | 0 |
| `fade-in`         | 500                   | 0 |
| `fly-in-bottom`   | 500                   | 0 |
| `fly-in-left`     | 500                   | 0 |
| `fly-in-right`    | 500                   | 0 |
| `fly-in-top`      | 500                   | 0 |
| `pulse`           | 500                   | 0 |
| `rotate-in-left`  | 700                   | 0 |
| `rotate-in-right` | 700                   | 0 |
| `twirl-in`        | 1000                  | 0 |
| `whoosh-in-left`  | 500                   | 0 |
| `whoosh-in-right` | 500                   | 0 |
| `pan-left`        | 1000                  | 0 |
| `pan-right`       | 1000                  | 0 |
| `pan-down`        | 1000                  | 0 |
| `pan-up`          | 1000                  | 0 |
| `zoom-in`         | 1000                  | 0 |
| `zoom-out`        | 1000                  | 0 |

[tip type="success"]
AMP By Example에서 [모든 AMP 스토리 애니메이션의 라이브 데모](https://ampbyexample.com/stories/features/animations/)를 참조하세요.
[/tip]

### 애니메이션 속성

##### animate-in[필수]

이 속성을 사용하여 시작 [애니메이션 사전 설정](#animation-effects)의 이름을 지정합니다.

*예*: 표제가 페이지 왼쪽에서 날아 들어옵니다.

```html

<h2 animate-in="fly-in-left">
  왼쪽에서 날아 들어옴
</h2>

```

##### animate-in-duration[선택사항]

이 속성을 사용하여 시작 애니메이션의 지속 기간을 초 또는 밀리초(예: 0.2s 또는 200ms) 단위로 지정합니다. 기본 지속 기간은 사용자가 지정한 애니메이션 미리 설정에 따라 달라집니다.

*예*: 표제가 페이지 왼쪽에서 날아 들어오며 애니메이션은 0.5초 이내에 완료됩니다.

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s">
  왼쪽에서 날아 들어옴
</h2>

```

##### animate-in-delay[선택사항]

이 속성을 사용하여 애니메이션을 시작하기 전에 지연되는 시간을 지정합니다. 이 값은 0 이상이어야 하며 초 또는 밀리초 단위로 지정해야 합니다(예: 0.2s 또는 200ms). 기본 지연 기간은 사용자가 지정한 애니메이션 사전 설정에 따라 달라집니다.

*예*: 0.4초 후에 페이지 왼쪽에서 표제가 날아 들어오고 0.5초 이내에 시작 부분이 완료됩니다.

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s" animate-in-delay="0.4s">
  왼쪽에서 날아 들어옴
</h2>

```

[tip type="note"]
애니메이션 지연 시간은 정확하지 않을 수 있습니다. 첫 번째 애니메이션 요소를 스캔할 때 백그라운드에서 `amp-animation` 확장 프로그램을 로드하면 지연 시간이 늘어날 수 있습니다. 속성 규칙은 *이 애니메이션을 최소 N밀리초 동안 지연*으로 정의합니다. 이 규칙은 지연이 0초인 요소를 포함하여 모든 요소에 적용됩니다.
[/tip]

##### animate-in-after[선택사항]

이 속성을 사용하여 애니메이션을 연쇄적으로 연결하거나 순차적으로 지정합니다(예: 애니메이션1을 완료한 후에 애니메이션2 시작). 이 요소의 애니메이션이 따를 애니메이션 요소의 ID를 지정합니다. 이 요소는 같은 `<amp-story-page>`에 있어야 합니다. 이전 요소의 애니메이션이 완료되고 나면 지연 시간이 적용됩니다. 자세한 정보는 아래 [애니메이션 순서 지정](#sequencing-animations) 섹션을 참조하세요.

예를 들어 다음 코드에서 `object2` 애니메이션은 `object1`이 시작을 완료하면 이어서 시작됩니다.

```html
<amp-story-page id="page1">
  <amp-story-grid-layer template="vertical">
    <div id="object1"
        animate-in="rotate-in-left">
      1
    </div>
    <div id="object2"
        animate-in="fly-in-right"
        animate-in-after="object1">
      2. <!-- will start after object1 has finished -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

##### scale-start, scale-end[선택사항, `zoom-in` 및 `zoom-out` 애니메이션과만 작동]

이 두 속성을 사용하여 확대 및 축소 애니메이션의 매개변수를 자세히 지정합니다. 이 값은 0 이상이어야 하며 소수가 허용됩니다. 확대의 경우 기본값은 scale-start: 1과 scale-end: 3이며, 축소의 기본값은 그 반대입니다.

*예*: 이미지 크기가 4초 동안 2배에서 5배로 확대됩니다.

```html
<amp-img animate-in="zoom-in" scale-start="2" scale-end="5" animate-in-duration="4s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-x[선택사항, `pan-left` 및 `pan-right` 애니메이션과만 작동]

이 속성을 사용하면 왼쪽으로 이동/오른쪽으로 이동 애니메이션으로 이미지의 가로 이동을 지정합니다. 이 값은 0픽셀 이상이어야 합니다. 기본값은 지정된 이미지의 전체 너비를 화면 이동합니다.

*예*: 이미지를 10초 동안 왼쪽으로 200픽셀 화면 이동합니다.

```html
<amp-img animate-in="pan-left" translate-x="200px" animate-in-duration="10s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-y[선택사항, `pan-up` 및 `pan-down` 애니메이션과만 작동]

이 속성을 사용하면 위로 이동/아래로 이동 애니메이션으로 이미지의 세로 화면 이동을 지정할 수 있습니다. 이 값은 0픽셀 이상이어야 합니다. 기본값은 지정된 이미지의 전체 높이를 이동합니다.

*예*: 이미지를 15초 동안 50픽셀 아래로 이동합니다.

```html
<amp-img animate-in="pan-down" translate-y="50px" animate-in-duration="15s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

### 애니메이션 순서 지정

애니메이션을 순서대로 연결하려면 `animate-in-after` 속성을 사용합니다. 연쇄적으로 지정된 모든 요소는 같은 `<amp-story-page>`에 있어야 합니다. `animate-in-after` 속성을 사용하지 않는 요소는 순차 연쇄에 속하지 않으며 페이지 시작 시 개별적으로 시작합니다.

```html
<amp-story-page id="my-sequencing-page">
  <amp-story-grid-layer template="vertical">
    <div class="circle"
        animate-in="drop-in"
        animate-in-duration="1.8s">
        1. <!-- will start independently -->
    </div>
    <div id="rotate-in-left-obj"
        class="square"
        animate-in="rotate-in-left"
        animate-in-after="fade-in-obj"
        animate-in-delay="0.2s">
        2. <!-- will start after fade-in-obj has finished -->
    </div>
    <div class="square"
        animate-in-after="rotate-in-left-obj"
        animate-in="whoosh-in-right"
        animate-in-delay="0.2s">
        3. <!-- will start after rotate-in-left-obj has finished -->
    </div>
    <div id="fade-in-obj"
        class="circle"
        animate-in="fade-in"
        animate-in-duration="2.2s">
        1. <!-- will start independently -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

### 여러 애니메이션 결합

한 요소에 여러 시작 애니메이션을 적용할 수 있습니다(예: 요소가 페이지에 날아 들어오는 동시에 점점 사라짐). 한 요소에 두 개 이상의 사전 설정 애니메이션을 할당할 수 없지만, 다른 시작 애니메이션이 있는 여러 요소를 중첩하여 하나로 결합할 수 있습니다.

```html

<div animate-in="fly-in-left">
  <div animate-in="fade-in">
    날다가 점점 사라집니다.
  </div>
</div>

```

[tip type="note"]
개별 요소의 애니메이션이 끝나고 난 후 조합된 애니메이션을 시작해야 하는 경우, 애니메이션을 구성하는 중첩 요소 모두의 `animate-in-after` 속성이 동일한 `id`로 설정되었는지 확인하세요.
[/tip]

## 북엔드: `amp-story-bookend`

`amp-story-bookend`는 스토리의 마지막 화면입니다. 관련 링크, 공유 옵션, 클릭 유도문안 링크 등을 포함합니다.

<figure class="centered-fig">
  <amp-anim alt="관련 기사 예" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif" layout="fixed">
    <noscript>
      <img alt="관련 기사 예" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif">
      </noscript>
    </amp-anim>
  </figure>

  사용하려면 필수 속성인 `layout=nodisplay`와 함께 `<amp-story-bookend>` 태그를 `<amp-story>`의 하위 요소로 포함하세요.
  그런 다음 개별 파일에서 JSON 구성을 지정하고 `src` 속성을 통해 가져오거나 인라인에 둘 수 있습니다.

  `src` 속성을 통해 JSON 구성 가져오기:

  ```html
  <amp-story standalone>
    <amp-story-page id="cover">
      ...
    </amp-story-page>
    <!-- `layout=nodisplay` is required. -->
    <amp-story-bookend src="bookendv1.json" layout=nodisplay>
    </amp-story-bookend>
    <amp-story>
      ```

서버에서 북엔드 구성을 가져오지 않으려면 인라인에 지정할 수도 있습니다.

```html
<amp-story standalone>
  ...
  <amp-story-bookend layout=nodisplay>
    <script type="application/json">
      {
        bookendVersion: "v1.0",
        shareProviders: [ ... ],
        components: [ ... ]
      }
    </script>
  </amp-story-bookend>
</amp-story>
```

다음으로 JSON 구성을 채워야 합니다. 여기에서 북엔드를 맞춤설정합니다. 구성의 전체 구조는 다음과 같습니다.

```text
{
  bookendVersion: "v1.0",
  shareProviders: [
    ...
  ],
  components: [
    ...
  ]
}
```

첫 번째 행을 포함하여 v1.0 버전을 사용 중임을 지정해야 합니다.

#### 북엔드 구성요소

북엔드는 다양한 구성요소로 구성됩니다. 해당 구성요소는 기사, 클릭 유도문안 링크, 텍스트 등이 될 수 있습니다.

해당 요소는 구성된 JSON의 `components` 필드에 지정됩니다. 예제는 아래 [예제 JSON 응답](#example-json-response) 섹션을 확인하세요.

##### heading

<code>heading</code> 구성요소에는 기사 그룹에 제목을 추가하는 데 사용할 수 있는 ```text</code> 필드가 있습니다.

```json
{
  type: "heading",
  text: "More to Read"
}
```

<amp-img alt="북엔드 heading 구성요소" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-heading.png" width="386" height="123" layout="fixed">
  <noscript>
    <img alt="북엔드 heading 구성요소" src="img/amp-story-bookend-component-heading.png">
  </noscript>
</amp-img>

##### small

`small` 구성요소는 관련 기사에 링크하는 데 사용할 수 있습니다. 이 구성요소에는 `title`, `url` 및 선택적으로 `image` 필드가 필요합니다.

```json
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/article.html",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="북엔드 small 구성요소" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-small.png" width="379" height="192" layout="fixed">
  <noscript>
    <img alt="북엔드 small 구성요소" src="img/amp-story-bookend-component-small.png">
  </noscript>
</amp-img>

##### landscape

`landscape` 구성요소는 동영상과 같은 대체 콘텐츠 형식에 사용할 수 있습니다. 이 구성요소에는 `title`, `url` 및 `image` 필드가 필요합니다. 선택적으로 제목 위에 부제목을 표시하는 `category` 필드를 추가할 수 있습니다.

```json
{
  type: "landscape",
  title: "TRAPPIST-1 Planets May Still Be Wet Enough for Life",
  url: "http://example.com/article.html",
  category: "astronomy",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="북엔드 landscape 구성요소" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-landscape.png" width="388" height="410" layout="fixed">
  <noscript>
    <img alt="북엔드 landscape 구성요소" src="img/amp-story-bookend-component-landscape.png">
    </noscript>
  </amp-img>

##### portrait

`portrait` 구성요소는 다른 스토리에 링크하는 데 사용할 수 있습니다. 이 구성요소에는 `title`, `url` 및 `image` 필드가 필요합니다. 선택적으로 제목 위에 부제목을 표시하는 `category` 필드를 추가할 수 있습니다.

```json
{
  type: "portrait",
  category: "Science",
  title: "New discovery found",
  url: "http://example.com/article.html",
  image: "http://placehold.it/312x416"
}
```

<amp-img alt="북엔드 portrait 구성요소" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-portrait.png" width="382" height="522" layout="fixed">
  <noscript>
    <img alt="북엔드 portrait 구성요소" src="img/amp-story-bookend-component-portrait.png">
  </noscript>
</amp-img>

##### cta-link

<code>cta-link</code> 구성요소를 사용하면 클릭 유도문안(예: <code>Read More</code> 또는 <code>Subscribe</code>)의 링크를 지정할 수 있습니다. 이 구성요소에는 링크의 배열을 지정하는 <code>links</code> 키가 있습니다. 각 링크는 ```text</code>와 <code>url</code> 값이 있는 개체입니다.

```json
{
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup"
      },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
}
```

<amp-img alt="북엔드 cta-links 구성요소" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-cta-links.png" width="381" height="81" layout="fixed">
  <noscript>
    <img alt="북엔드 cta-links 구성요소" src="img/amp-story-bookend-component-cta-links.png">
  </noscript>
</amp-img>

##### textbox

```textbox</code> 구성요소를 사용하면 북엔드 안에 텍스트를 지정할 수 있습니다(예: 사진 크레딧). 이 구성요소에는 배열의 각 요소가 텍스트 행인 <code>text</code> 배열이 필요합니다.

```json
{
  type: "textbox",
  text: [
    Food by Enrique McPizza,
    Choreography by Gabriel Filly,
    Script by Alan Ecma S.,
    Direction by Jon Tarantino
  ]
}
```

<amp-img alt="북엔드 textbox 구성요소" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-textbox.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="북엔드 textbox 구성요소" src="img/amp-story-bookend-component-textbox.png">
  </noscript>
</amp-img>

**AMP 간 링크**

AMP 뷰어에 표시되는 문서에서 링크는 대개 `_top`을 탐색하거나 새로운 창에서 열립니다. 그러나 AMP 페이지의 링크는 뷰어에 계속 표시될 수 있습니다. 이 동작을 사용하려면 링크를 지원하는 구성요소에 `"amphtml": true`를 추가합니다. 예:

```json
...
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/my-amp-document.html",
  image: "http://placehold.it/256x128",
  amphtml: true
},
{
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup",
      amphtml: true
      },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
},
...
```

#### 소셜 공유

소셜 공유의 구성은 응답 개체의 `shareProviders` 필드에 정의되며 선택사항입니다.

이 필드에는 문자열이 포함되어야 합니다. 여기서 각 문자열은 공유 제공자의 이름(예: `twitter`)을 나타냅니다.

추가 매개변수가 필요하면 키-값 쌍이 있는 개체를 사용해야 합니다. 개체에는 제공자의 이름에 해당하는 값(예: `facebook`)이 있는 `provider` 키가 있어야 합니다. 다음 키-값은 공유 제공자에 따라 다릅니다.

사용 가능한 제공자 목록은 [amp-social-share](https://www.ampproject.org/docs/reference/components/amp-social-share) 구성요소에 있는 목록과 같습니다.

이러한 제공자의 사용 가능한 매개변수 조합은 각각 다릅니다([`data-param-*` 참조](https://www.ampproject.org/docs/reference/components/amp-social-share#data-param-%2a)). 구성 개체에서는 `data-param-` 접두사 없이 해당 매개변수를 사용합니다(예: `data-param-app_id`는 구성 개체에서 `app_id`로 표시됨).

#### JSON 구성

`<amp-story-bookend>`에는 북엔드의 JSON 구성을 가리키는 `src` 속성이 있어야 합니다. 이 속성은 GET 요청을 받아 북엔드의 콘텐츠가 포함된 JSON 응답을 돌려주는 URL 엔드포인트로 설명되어 있습니다.  생략하면 amp-story 구성요소에서 최종 화면의 기본 UI를 렌더링합니다. 시스템에서 관련 기사와 인기 있는 기사를 렌더링하는 데 필요한 데이터를 가져와야 합니다.  이 데이터는 정적 JSON 파일에서 제공하거나 동적으로 생성합니다(예: 현재 인기 있는 내용을 계산하는 용도).

#### 예제 JSON 응답

```text
{
  // You must specify version v1.0.
  bookendVersion: "v1.0",
  shareProviders: [
    email,
    tumblr,
    {
      provider: "twitter",
      // You can add custom sharing parameters depending on the social platform.
      text: "This is custom share text that I would like for the Twitter platform"
    },
    {
      provider: "facebook",
      // Facebook requires an</code>app_id` param
      app_id: "MY_FACEBOOK_APP_ID"
    }
  ],
  components: [
    {
      type: "heading",
      text: "More to read"
    },
    {
      type: "small",
      title: "This is India an the best places you should go",
      url: "<a href="
      http: //example.com/article.html">http://example.com/article.html</a>",
        image: "<a href="
      http: //placehold.it/256x128">http://placehold.it/256x128</a>"
    },
    ...
  ]
}
```

## AMP 스토리에서 사용할 수 있는 기타 구성요소

다음은 스토리별 주의사항이 있는 AMP 스토리에서 사용 가능한 기타 구성요소입니다.

* [amp-sidebar](https://www.ampproject.org/docs/reference/components/amp-sidebar#sidebar-for-stories)
* [amp-consent](https://www.ampproject.org/docs/reference/components/amp-consent#prompt-ui-for-stories)

더 일반적으로 사용할 수 있는 구성요소는 [허용된 하위 요소 목록](https://www.ampproject.org/docs/reference/components/amp-story#children)을 참조하세요.

## 유효성 검사

AMP 유효성 검사기 사양에서 [amp-story 규칙](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii)을 참조하세요.

## 현지화

스토리를 현지화하려면 스토리의 `<html>` 태그에서 `lang` 속성에 언어 코드를 포함합니다(예: 영어는 `<html lang="en">`).  지원되는 언어 코드는 다음과 같습니다.

* ar(아랍어)
* de(독일어)
* en-GB(영국 영어)
* en(미국 영어)
* es-419(중앙/라틴 아메리카 스페인어)
* es(스페인 스페인어)
* fr-CA(캐나다 프랑스어)
* fr(프랑스 프랑스어)
* hi(힌두어)
* id(인도네시아어)
* it(이탈리아어)
* ja(일본어)
* ko(한국어)
* nl(네덜란드어)
* no(노르웨이어)
* pt-BR(브라질 포르투갈어)
* pt(포르투갈 포르투갈어)
* ru(러시아어)
* tr(터키어)
* vi(베트남어)
* zh-TW(중국어 번체)
* zh(중국어 간체)

또한 오른쪽에서 왼쪽으로 쓰는 언어의 경우 스토리의 `<html>` 태그에 `dir="rtl"` 속성을 포함할 수 있습니다.  이 속성은 `<html lang="ar" dir="rtl">`과 같은 언어 코드와도 함께 사용할 수 있습니다.

## 관련 리소스

* [가이드: 시각적 AMP 스토리 작성하기](https://www.ampproject.org/docs/tutorials/visual_story)
* [AMP By Example의 샘플](https://ampbyexample.com/stories/#stories/introduction)
* [AMP 스토리 작성하기 권장사항](https://www.ampproject.org/docs/guides/amp_story_best_practices)

</amp-story></body>
