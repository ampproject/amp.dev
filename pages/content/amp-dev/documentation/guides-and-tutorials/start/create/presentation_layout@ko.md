---
$title: 표현 및 레이아웃 수정하기
---

##  표현 수정하기

AMP는 웹페이지이며, 페이지와 요소의 스타일링은 일반적인 CSS 속성을 사용합니다. `<head>` 에서 `<style amp-custom>` 을 사용해 인라인 스타일 시트를 사용할 수 있으며, 여기서 클래스 또는 요소 셀렉터 등을 사용할 수 있습니다:

[sourcecode:html]
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
[/sourcecode]

모든 AMP 페이지에는 하나의 스타일시트만 삽입할 수 있으며, 특정 셀렉터는 사용이 불가합니다. [스타일링에 대해 자세히 알아보세요](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## 레이아웃 제어하기

AMP는 요소를 페이지에 배치할 때 엄격한 규칙을 따릅니다. 일반적인 HTML 페이지에서는 요소를 배치하기 위해 거의 대부분의 CSS를 사용합니다. 하지만 성능상의 이슈로 AMP에서는 처음부터 모든 요소의 크기를 명시적으로 설정해야합니다.

[tip type="read-on"]
**READ ON –** 
AMP가 페이지를 렌더링하고 배치하는 방법과 레이아웃을 어떻게 수정할 수 있는 지에 대해서는 [레이아웃과 미디어쿼리](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md))에서 자세히 알아보세요.
[/tip]
