---
$title: 사이트 탐색
---

[TOC]

대부분의 모바일 웹사이트에는 사이트 탐색 메뉴가 포함되어 있습니다. 탐색 메뉴는 형식이 매우 다양합니다. 이 가이드에서는 아래 예시를 통해 AMP 페이지에 탐색 메뉴를 추가해 보겠습니다.

- 가장 단순한 옵션인 홈페이지로 돌아가기 링크
- [amp-sidebar](/ko/docs/reference/components/amp-sidebar.html) 구성요소를 사용한 측면 탐색 메뉴

## 홈으로 돌아가기 링크

사용자를 홈페이지로 돌아가게 하면 쉽게 웹사이트의 탐색 메뉴를 이용할 수 있습니다.

`<header>` 태그를 링크가 포함된 아래 버전으로 **변경**해 보세요.

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img class="home-button" src="icons/home.png" width="36" height="36"></amp-img>
  </a>
<div class="site-name">뉴스 사이트</div>
</header>
```

그런 다음 인라인 CSS에 다음 스타일 규칙을 **추가**합니다.

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  flex: 1;
  margin-left: -36px;
}
article {
  margin-top: 50px;
}
```

이제 페이지를 **새로고침**해 보세요. 페이지 왼쪽 상단에 `homepage.html`로 연결되는 링크가 표시됩니다.  홈 아이콘을 클릭하면 어느 곳으로도 연결되지 않는 것을 바로 확인할 수 있습니다. `homepage.html` 파일이 없기 때문입니다.

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='홈 아이콘 탐색') }}

이 링크를 웹사이트의 홈페이지 URL로 변경하여 사용자가 웹사이트의 기존 탐색 메뉴를 통해 사이트의 다른 부분으로 이동하게 할 수 있습니다.

지금까지 설명한 방법은 웹사이트의 기존 탐색 메뉴를 활용하는 가장 단순한 접근방식입니다. 이제 사이트 탐색에 보다 자주 이용되는 옵션을 살펴보겠습니다.


## 사이드바로 탐색

페이지 측면에 메뉴 아이콘을 추가하여 이 아이콘을 클릭하면 일련의 탐색 링크가 표시되도록 하는 탐색 기술이 많이 쓰이고 있습니다. AMP에서는 [amp-sidebar](/ko/docs/reference/components/amp-sidebar.html) 구성요소를 사용하여 이러한 탐색 메뉴를 만들 수 있습니다.

먼저 다음과 같이 `amp-sidebar` 구성요소의 자바스크립트를 `<head>` 태그에 **추가**해야 합니다.

```html
<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
```

다음으로 메뉴 아이콘이 표시되게 해 보겠습니다.  아이콘을 탭하면 사이드바가 열립니다. `<header>`를 다음 코드로 **변경**하면 홈 아이콘 대신 ['햄버거'](https://en.wikipedia.org/wiki/Hamburger_button) 아이콘이 표시됩니다.

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">☰</div>
  <div class="site-name">뉴스 사이트</div>
</header>
```

위의 코드에서는 `amp-sidebar` 요소의 [`on`](https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md) 액션 속성으로 사이드바를 `전환`합니다. 이 요소는 `sidebar1` ID로 표시되어 있습니다.  사이드바를 추가해 보겠습니다.


`</header>` 바로 뒤에 다음 HTML을 **추가**하세요.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div role="button" aria-label="close sidebar" on="tap:sidebar1.toggle" tabindex="0" class="close-sidebar">✕</div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

사이드바는 숨겨져 있지만 사용자가 햄버거 아이콘을 탭하면 화면 왼쪽에서 메뉴가 표시됩니다.  X 아이콘을 탭하면 메뉴가 닫힙니다.

마지막으로 인라인 CSS에 다음 스타일 규칙을 **추가**하세요.

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom:10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

사이드바를 확인해 보겠습니다. **새로고침**하여 AMP 페이지를 다시 로드하세요.  그러면 다음과 같이 표시될 것입니다.

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='사이드바 메뉴 탐색') }}

멋진 페이지가 완성되었습니다.  이제 맞춤 글꼴을 추가하여 마무리하겠습니다.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/tracking_data.md', locale=doc.locale).url.path}}"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/fonts.md', locale=doc.locale).url.path}}"><span class="arrow-next">다음</span></a>
</div>
