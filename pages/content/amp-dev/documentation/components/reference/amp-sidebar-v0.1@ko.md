---
$category@: layout
formats:
  - websites
  - email
teaser:
  text: >-
    탐색, 링크, 버튼, 메뉴 등 임시 액세스용 메타 콘텐츠를 표시하는 방법을 제공합니다.
toc: true
$title: amp-sidebar
---



<!--
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



<table>
  <tr>
    <td width="40%"><strong>설명</strong></td>
    <td>
      사이드바에서는 탐색, 링크, 버튼, 메뉴 등 임시 액세스용 메타 콘텐츠를 표시할 수 있습니다. 사이드바는 버튼 탭을 통해 표시할 수 있으며, 기본 콘텐츠는 아래에 계속 표시됩니다.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>예</strong></td>
    <td>AMP By Example의 <a href="https://ampbyexample.com/components/amp-sidebar/">amp-sidebar 예</a>를 참조하세요.</td>
  </tr>
</table>

## 개요 <a name="overview"></a>

`<amp-sidebar>`에서는 탐색 링크, 버튼, 메뉴 등의 임시 액세스용 메타 콘텐츠를 숨깁니다. `<amp-sidebar>`는 버튼 탭에서 amp-sidebar 외부를 탭하여 열고 닫을 수 있습니다.
그러나 미디어 쿼리를 허용하는 선택적 속성을 사용하여 사이트의 다른 부분에 메타 콘텐츠를 표시할 수 있습니다. 하위 `<nav toolbar="(media query)" toolbar-target="elementID">` 요소를 사용하면 사이드바의 콘텐츠를 기본 콘텐츠의 다른 부분에 표시할 수 있습니다.

## 동작 <a name="behavior"></a>

* `<amp-sidebar>`는 `<body>`의 직속 하위 요소여야 합니다.
* 사이드바는 페이지의 왼쪽 또는 오른쪽에만 표시될 수 있습니다.
* `<amp-sidebar>`에는 올바른 HTML 요소(AMP에서 지원)가 포함될 수 있습니다.
* `<amp-sidebar>`에는 다음 AMP 요소가 포함될 수 있습니다.
    * `<amp-accordion>`
    * `<amp-img>`
    * `<amp-fit-text>`
    * `<amp-list>`
    * `<amp-live-list>`
    * `<amp-social-share>`</li>
* 사이드바의 최대 높이는 100vh입니다. 높이가 100vh를 초과하면 세로 스크롤 막대가 표시됩니다. CSS에서 기본 높이는 100vh로 설정되고 CSS에서 재정의할 수 있습니다.
* 사이드바의 너비는 CSS를 사용하여 설정하고 조정할 수 있습니다(최소 너비는 45픽셀).
* 터치 확대/축소는 `amp-sidebar`에서 사용되지 않으며 사이드바가 열려 있으면 마스킹됩니다.

*예:*

다음 예에서는 이동 항목을 포함하는 데 `amp-sidebar`를 사용합니다. 그러나 두 번째와 네 번째 항목인, Nav Item 2와 Nav Item 4는 페이지에 있는 요소 ID에 할당됩니다. [`on`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) 속성을 사용하면 요소 ID와 `scrollTo`를 사용하여 요소까지 원활하게 스크롤할 수 있습니다.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>
</amp-sidebar>
```

### 사이드바 열기 및 닫기 <a name="opening-and-closing-the-sidebar"></a>

전환하려면 요소를 탭하거나 클릭할 때 사이드바를 열거나 닫은 후 요소에서 [`on`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) 작업 속성을 설정하고 다음 작업 방법 중 하나를 지정합니다.

<table>
  <tr>
    <th>작업</th>
    <th>설명</th>
  </tr>
  <tr>
    <td>open(기본값)</td>
    <td>사이드바를 엽니다.</td>
  </tr>
  <tr>
    <td>close</td>
    <td>사이드바를 닫습니다.</td>
  </tr>
  <tr>
    <td>toggle</td>
    <td>사이드바 상태를 전환합니다.</td>
  </tr>
</table>

사용자가 부분적으로 표시되는 기본 콘텐츠 영역을 다시 탭하면 사이드바가 닫힙니다.

또는 키보드의 Esc 키를 눌러도 사이드바가 닫힙니다.

*예:*

```html
<button class="hamburger" on='tap:sidebar1.toggle'></button>
<button on='tap:sidebar1'>Open</button>
<button on='tap:sidebar1.open'>Open</button>
<button on='tap:sidebar1.close'>x</button>
```

### 툴바 <a name="toolbar"></a>

미디어 쿼리가 있는 `toolbar` 속성 및 `<amp-sidebar>`의 하위 요소인 `<nav>` 요소의 요소 ID가 있는 `toolbar-target` 속성을 지정하여 `<body>`에 표시되는 `toolbar` 요소를 생성할 수 있습니다. `toolbar`는 `<nav>` 요소와 하위 요소를 복제하고 해당 요소를 `toolbar-target` 요소에 추가합니다.

#### 동작 <a name="behavior-1"></a>

* 사이드바에서는 `toolbar` 속성과 `toolbar-target` 속성이 있는 nav 요소를 추가하여 툴바를 구현할 수 있습니다.
* nav 요소는 `<amp-sidebar>`의 하위 요소이어야 하며 `<nav toolbar="(media-query)" toolbar-target="elementID">` 형식을 따라야 합니다.
    * 예를 들어 툴바의 올바른 사용법은 다음과 같습니다. `<nav toolbar="(max-width: 1024px)" toolbar-target="target-element">`.</li>
* 툴바 속성을 포함하는 nav에는 `<li>` 요소를 포함하는 단일 `<ul>` 요소만 포함해야 합니다.
    * `<li>` 요소에는 올바른 HTML 요소(AMP에서 지원됨) 또는 `<amp-sidebar>`에서 지원하는 AMP 요소가 포함될 수 있습니다.</li>
* 툴바 동작은 `toolbar` 속성 미디어 쿼리가 유효한 동안에만 적용됩니다. 또한 `toolbar-target` 속성 ID가 있는 요소가 페이지에 있어야 툴바가 적용됩니다.

*예: 기본 툴바*

다음 예에서는 창 너비가 767픽셀 이하인 경우 `toolbar`를 표시합니다. `toolbar`에는 검색 입력 요소가 포함되어 있습니다. `toolbar` 요소는 `<div id="target-element">` 요소에 추가됩니다.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="검색..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

## 툴바 스타일 지정 <a name="styling-toolbar"></a>

`<amp-sidebar>` 요소의 `toolbar` 요소에는 `toolbar-target` 요소를 표시하는지 아니면 숨기는지에 따라 요소에 적용되는 클래스가 있습니다. `toolbar` 요소와 `toolbar-target` 요소에 순서대로 다른 스타일을 적용하는 데 유용합니다. 클래스는 `amp-sidebar-toolbar-target-shown` 및 `amp-sidebar-toolbar-target-hidden`입니다. `toolbar-target` 요소가 표시되면 `amp-sidebar-toolbar-target-shown` 클래스가 `toolbar` 요소에 적용됩니다. `toolbar-target` 요소를 숨기면 `amp-sidebar-toolbar-target-hidden` 클래스가 `toolbar` 요소에 적용됩니다.

*예: 툴바 상태 클래스*

다음 예에서는 창 너비가 767픽셀 이하인 경우 `toolbar`를 표시합니다. `toolbar`에는 검색 입력 요소가 포함되어 있습니다. `toolbar` 요소는 `<div id="target-element">` 요소에 추가됩니다. 그러나 `<div id="toolbar-target">` 요소가 표시되면 `toolbar` 요소를 숨기도록 몇 가지 맞춤 스타일을 추가했습니다.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="검색..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

[tip type="success"]
[AMP By Example](https://ampbyexample.com/components/amp-sidebar/)에서 라이브 데모를 참조하세요.
[/tip]

## 스토리용 사이드바 <a name="sidebar-for-stories"></a>

`amp-sidebar` 사용은 `amp-story` [구성요소](../../../about/stories.html)에서 지원됩니다.

### 동작 <a name="behavior-2"></a>

* `<amp-sidebar>`는 `<amp-story>`의 직속 하위 요소여야 합니다.
* 사이드바는 일반 AMP 문서의 '시작'하는 쪽으로 기본값이 지정됩니다. 즉, 왼쪽에서 오른쪽으로 쓰는 언어의 경우 오른쪽이고, 오른쪽에서 왼쪽으로 쓰는 언어의 경우 왼쪽입니다.
* `<amp-sidebar>`의 기본 배경색은 흰색이며 CSS에서 재정의할 수 있습니다.
* 데스크톱 환경에서 `<amp-sidebar>`의 최대 너비는 `280px` 및 `320px`이 적용됩니다.
* 사이드바를 여는/닫는 '햄버거' 스타일 버튼이 스토리 UI에 표시됩니다.

전체 스토리 플랫폼에서 일관된 UI 환경을 제공하기 위해 허용되는 속성과 기능의 제한사항이 있습니다. 다음은 `amp-story`에서 허용되는 `amp-sidebar`의 속성과 기능입니다.

### 허용되는 속성 <a name="allowed-attributes"></a>

* [layout](#layout)
* [data-close-button-aria-label](#data)
* [공통 속성](#common)

*예: 스토리의 기본 사이드바*

다음 예에서는 `amp-story`의 단순 `amp-sidebar`를 보여줍니다.

```html
...
<body>
  <amp-story standalone>
  <amp-sidebar id="sidebar1" layout="nodisplay">
    <ul>
      <li><a href="https://amp.dev"> External Link </a></li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
    </ul>
  </amp-sidebar>
  <amp-story-page id="cover">
    <amp-story-grid-layer template="fill">
      <h1>Hello World</h1>
      <p>This is the cover page of this story.</p>
    </amp-story-grid-layer>
  </amp-story-page>
  ...
</body>
```

## 속성 <a name="attributes"></a>

##### side <a name="side"></a>

페이지에서 사이드바가 열리는 쪽을 나타냅니다(`left` 또는 `right`).  `side`가 지정되지 않은 경우 `side` 값은 `body` 태그의 `dir` 속성(`ltr` => `left` , `rtl` => `right`)에서 상속합니다. `dir`이 없으면 `side`가 기본적으로 `left`가 됩니다.

##### layout <a name="layout"></a>

사이드바의 표시 레이아웃을 지정하며, `nodisplay`여야 합니다.

##### open <a name="open"></a>

이 속성은 사이드바가 열리면 표시됩니다.

##### data-close-button-aria-label <a name="data"></a>

접근성을 위해 추가한 닫기 버튼의 ARIA 레이블을 설정하는 데 사용하는 선택적 속성입니다.

##### toolbar <a name="toolbar-1"></a>

이 속성은 하위 `<nav toolbar="(media-query)" toolbar-target="elementID">` 요소에 표시되며, 툴바를 표시할 때 미디어 쿼리를 허용합니다. 툴바 사용에 관한 자세한 정보는 [툴바](#toolbar-1) 섹션을 참조하세요.

##### toolbar-target <a name="toolbar-target"></a>

이 속성은 하위 `<nav toolbar="(media-query)" toolbar-target="elementID">`에 표시되며 페이지에서 요소의 ID를 허용합니다.  `toolbar-target` 속성을 사용하면 기본 툴바 스타일링을 사용하지 않고 페이지에서 요소의 지정된 ID에 툴바를 배치합니다. 툴바 사용에 관한 자세한 정보는 [툴바](#toolbar-1) 섹션을 참조하세요.

##### 공통 속성 <a name="common"></a>

이 요소에는 AMP 구성요소로 확장된 [공통 속성](../../../documentation/guides-and-tutorials/learn/common_attributes.md)이 포함됩니다.

## 스타일 지정 <a name="styling"></a>

`amp-sidebar` 구성요소는 표준 CSS를 사용하여 스타일을 지정할 수 있습니다.

* `amp-sidebar`의 `width`는 미리 설정된 최소값(45픽셀)과 최대값(80vw) 사이의 너비로 조정하도록 설정할 수 있습니다.
* `amp-sidebar`의 높이는 필요한 경우 사이드바의 높이를 조정하도록 설정할 수 있습니다. 높이가 100vw를 초과하면 사이드바에 세로 스크롤 막대가 생깁니다. 사이드바의 미리 설정된 높이는 100vw이며 높이를 줄이려면 CSS에서 재정의할 수 있습니다.
* 사이드바의 현재 상태는 사이드바가 페이지에서 열려 있을 때 `amp-sidebar` 태그에 설정되는 `open` 속성을 통해 공개됩니다.

[tip type="success"]
AMP 페이지에서 사용할 수 있으며 스타일이 미리 지정되고 즉각적으로 반응하는 탐색 메뉴를 보려면 [AMP 시작](https://ampstart.com/components#navigation)을 방문하세요.
[/tip]

## 오버플로 영역에서 자동 스크롤 <a name="auto-scrolling-within-overflowing-areas"></a>

`amp-sidebar`는 사이드바와 툴바 케이스의 속성으로 `autoscroll`을 사용하여 꾸민 첫 번째 요소로 오버플로 컨테이너를 자동으로 스크롤할 수 있습니다.

이 기능은 긴 탐색 목록을 처리하며 페이지를 로드할 때 사이드바에서 현재 탐색 항목으로 스크롤하게 하려는 경우 유용합니다.

`toolbar` 기능을 사용하면 `<nav toolbar>` 요소가 `overflow: auto` 또는 `overflow: scroll`로 설정된 경우에만 `autoscroll`이 작동합니다.

```html
<style amp-custom="">

  nav [toolbar] {
    overflow: auto;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>Nav item 1</li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
      <li autoscroll class="currentPage">Nav item 4</li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

작동하는 예제 코드는 [이 예제 파일](https://github.com/ampproject/amphtml/blob/main/examples/amp-sidebar-autoscroll.amp.html)을 참조하세요.

## UX 고려사항 <a name="ux-considerations"></a>

`<amp-sidebar>`를 사용할 때 사용자가 AMP 뷰어에서 모바일로 페이지를 보는 경우가 많으므로 고정 위치 헤더가 표시될 수 있다는 점에 유의하세요. 또한 브라우저에서 페이지 상단에 고유한 고정 헤더를 표시하는 경우가 잦습니다. 화면 상단에 또 다른 고정 위치 요소를 추가하면 사용자에게 새로운 정보를 제공하지 않는 콘텐츠가 모바일 화면 공간을 상당히 많이 차지하게 됩니다.

따라서 사이드바를 여는 데 사용하는 여유 공간을 전체 너비의 고정 헤더에 두지 않는 것이 좋습니다.

## 유효성 검사 <a name="validation"></a>

AMP 유효성 검증기 사양에서 [amp-sidebar 규칙](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/validator-amp-sidebar.protoascii)을 참조하세요.
