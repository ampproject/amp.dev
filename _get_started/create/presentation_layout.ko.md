---
layout: page
title: 프레젠테이션 및 레이아웃 수정
order: 2
locale: ko
---

## 프레젠테이션 수정

AMP는 웹페이지이며, 페이지와 그 요소의 스타일링은 공통 CSS 속성을 사용하여 수행됩니다. `<head>`에서 `<style amp-custom>`이라는 인라인 스타일시트에 있는 클래스 또는 요소 선택기를 사용하는 스타일 요소:

{% highlight html %}
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
{% endhighlight %}

모든 AMP 페이지에는 하나의 스타일시트만 삽입될 수 있으며, 특정 선택기는 사용이 허용되지 않습니다. [스타일링에 대해 자세히 알아보세요](/docs/guides/responsive/style_pages.html).

## 레이아웃 제어

AMP는 요소의 레이아웃을 페이지에 배치할 때 더 엄격한 규칙을 따릅니다. 일반 HTML 페이지에서는 거의 대부분 CSS를 사용하여 요소의 레이아웃을 배치합니다. 그러나 성능상의 이유로, AMP에서는 처음부터 모든 요소의 크기를 명시적으로 설정해야 합니다.

AMP가 페이지를 렌더링하고 배치하는 방법과 레이아웃을 수정하는 방법은 [레이아웃 제어 방법](/docs/guides/responsive/control_layout.html)에서 자세히 알아보세요.

{% include button.html title="4단계로 계속" link="/docs/get_started/create/preview_and_validate.ko.html" %}
