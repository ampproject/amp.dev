---
$title: 글꼴 추가
---

문서를 가능한 한 빨리 로드하기 위해 AMP에는 외부 스타일시트를 포함할 수 없습니다. 하지만 이 규칙에는 **글꼴**이라는 한 가지 예외가 있습니다.

AMP 페이지에 맞춤 글꼴을 삽입하는 방법은 다음과 같이 2가지가 있습니다.

1. `<link>` 태그를 통해 삽입: 허용된 제공업체의 글꼴만 사용 가능
2. `@font-face` CSS 규칙으로 삽입: 제한 없이 모든 글꼴 사용 가능

이 가이드에서는 `<link>` 태그를 사용하여 페이지에 글꼴을 추가해 보겠습니다. 다음과 같이 `<head>`에 스타일시트 링크를 **추가**하여 Raleway 글꼴을 요청합니다.

```html
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway">
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

페이지를 **새로고침**하여 바뀐 스타일을 확인해 보세요. 또한 AMP 유효성 검사 도구에서 나온 결과를 살펴보세요.  이 외부 스타일시트 요청에는 오류가 없어야 합니다.

[tip type="note"]
문서에 글꼴을 추가하는 데는 추가 구성요소가 필요하지 않습니다. 단, [`amp-font`](/ko/docs/reference/components/amp-font.html)라는 구성요소가 있습니다. `amp-font` 구성요소는 웹 글꼴을 로드하는 데 사용되지는 않지만, 필요한 경우 웹 글꼴이 제대로 로드되었으며 적절히 응답하는지 확인하는 데 사용할 수 있습니다.

amp-font를 사용하여 글꼴이 완전히 로드될 때까지 텍스트를 숨겨서 텍스트가 임시 글꼴에서 사용하려는 글꼴로 변경되는 모습을 사용자가 보지 못하게 할 수 있습니다. 글꼴 로드에 실패하면 임시 글꼴을 대신 표시하는 것이 좋습니다. 사용자가 텍스트를 아예 읽지 못하는 최악의 상황은 방지해야 하기 때문입니다. 자세한 내용은 [`amp-font`](/ko/docs/reference/components/amp-font.html) 문서를 참조하세요.
[/tip]

이제 AMP 뉴스 기사가 완성되었습니다. 뉴스 기사는 다음과 같이 표시됩니다.

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='완성된 뉴스 기사') }}


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/navigating.md', locale=doc.locale).url.path}}"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">다음</span></a>
</div>
