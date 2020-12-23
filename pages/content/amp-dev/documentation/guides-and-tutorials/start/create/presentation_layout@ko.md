---
"$title": 표현 및 레이아웃 수정
"$order": '3'
description: AMP는 웹페이지이며, 페이지와 요소의 스타일링 시 일반 CSS 속성이 사용됩니다. 클래스 또는 요소 선택자 등을 활용하여 스타일을 지정...
author: pbakaus
contributors:
- bpaduch
---

## 표현 수정

AMP는 웹페이지이며, 페이지와 요소의 스타일링 시 일반 CSS 속성이 사용됩니다. `<head>`에 삽입된 스타일시트인 `<style amp-custom>`의 클래스 또는 요소 선택자 등을 활용하여 스타일을 지정하세요.

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

모든 AMP 페이지에는 하나의 스타일시트 및 인라인 스타일만 삽입할 수 있으며, 특정 선택자는 사용 불가합니다. [스타일링에 대해 자세히 알아보세요](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## 레이아웃 제어

AMP는 요소를 페이지에 배치할 때 보다 엄격한 규칙이 적용됩니다. 일반적인 HTML 페이지의 경우 요소 배치 시 거의 대부분의 CSS를 사용할 수 있지만 성능상의 이유로 AMP에서는 처음부터 모든 요소의 크기를 명시적으로 설정해야 합니다.

[tip type="read-on"] **읽어보기 –** AMP에서 페이지를 렌더링하고 배치하는 방법과 레이아웃을 수정하는 방법을 자세히 알아보려면 [레이아웃 및 미디어 쿼리](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)를 참조하세요. [/tip]
