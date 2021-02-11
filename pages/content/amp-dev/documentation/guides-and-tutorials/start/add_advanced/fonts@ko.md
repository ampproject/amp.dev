---
'$title': Adding fonts
$order: 6
description: 'AMP 페이지에 사용자 지정 글꼴을 삽입하는 방법은 다음과 같이 2가지가 있습니다. 1. <link> 태그를 통해 삽입: 허용된 제공업체의 글꼴만 사용 가능. 2...'
---

문서 로드 시간 최적화를 위해 AMP에 외부 스타일시트를 사용할 수 없습니다. 하지만 이 규칙에 **글꼴**이라는 한 가지 예외가 있습니다.

AMP 페이지에 사용자 지정 글꼴을 삽입하는 방법은 다음과 같이 2가지가 있습니다.

1. `<link>` 태그를 통해 삽입: 허용된 제공업체의 글꼴만 사용 가능
2. `@font-face` CSS 규칙으로 삽입: 제한 없이 모든 글꼴 사용 가능

이 가이드에서는 `<link>` 태그를 사용하여 페이지에 글꼴을 추가해 보겠습니다. 다음과 같이 `<head>`에 스타일시트 링크를 **추가**하여 Raleway 글꼴을 요청합니다.

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://fonts.googleapis.com/css?family=Raleway"
/>
```

이제 다음과 같이 CSS `body` 선택자를 **업데이트**하여 Raleway 글꼴을 참조합니다.

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

페이지를 **새로고침**하여 바뀐 스타일을 확인해 보세요. 또한 AMP 검사기의 결과를 살펴보세요. 외부 스타일시트 요청에는 오류가 없어야 합니다.

[tip type="note"] 일반적으로 빠른 AMP 사이트에서도 웹 글꼴은 오류를 초래할 수 있습니다. <a><code>font-display</code></a> CSS 속성을 활용하여 글꼴의 로딩 동작을 최적화하세요. [/tip]

이제 AMP 뉴스 기사가 완성되었습니다. 뉴스 기사는 다음과 같이 표시됩니다.

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Completed news article') }}
