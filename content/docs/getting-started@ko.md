---
$title: 시작하기
---
[TOC]

이 문서는 AMP를 시작하기 위한 퀵 스타트 가이드입니다.

더 자세한 설명은 [첫번째 AMP 페이지 만들기](/ko/docs/tutorials/create.html)
튜토리얼을 살펴보시길 바랍니다.

### 1단계: AMP HTML 템플릿 가져오기

아래는 AMP 페이지에서 필요한 기본 HTML입니다.

```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello AMP world</title>
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Hello AMP World!</h1>
  </body>
</html>
```

{% call callout('읽어보기', type='read') %}
AMP 페이지를 위한 [필수 마크업](/ko/docs/reference/spec.html#required-markup)에 대해서 살펴보세요.
{% endcall %}

### 2단계: 페이지에 컴포넌트 추가하기

AMP 페이지에 컴포넌트를 추가해봅시다. 예를 들어 이미지는 다음과 같이 추가할 수 있습니다.

```html
<amp-img src="https://www.ampproject.org/examples/images/amp.jpg"
  width="900" height="508" layout="responsive"></amp-img>
```

또는 유튜브 비디오도 다음과 같이 추가할 수 있습니다.

```html
<!-- 이 스크립트는 amp-youtube 요소를 사용하기 위해 반드시 <head> 섹션 내에 포함해야합니다. -->
<script async custom-element="amp-youtube"
      src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>

...

<amp-youtube data-videoid="9Cfxm7cikMY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
```

외에도 더 많은 컴포넌트를 넣을 수 있습니다.
[AMP에서 사용 가능한 컴포넌트](/ko/docs/reference/components.html) 목록을 살펴보세요.

### 3단계: 요소 스타일하기

AMP 페이지의 요소를 스타일하기 위해, 문서의 `<head>` 요소 내의
`<style amp-custom>` 안에 CSS를 인라인 스타일시트로 넣을 수 있습니다.

```html
<style amp-custom>
  amp-img {
    margin: 0.5em;
  }
  body {
    max-width: 900px;
  }
</style>
```

{% call callout('읽어보기', type='read') %}
AMP 페이지에서 [지원하는 CSS](/ko/docs/guides/responsive/style_pages.html)에 대해 살펴보세요.
{% endcall %}

### 4단계: AMP HTML 검증하기

AMP 페이지가 유효한 AMP HTML인 지 확인하기 위해
[AMP 검증기](https://validator.ampproject.org/)를 사용해 검증할 수 있습니다.

사용 가능한 다른 검증 도구를 살펴보려면, [AMP 페이지
검증하기](/ko/docs/guides/validate.html)를 살펴보시길 바랍니다.

### 다음 단계

AMP 페이지의 기본을 더 깊이 살펴보고 싶다면, [첫번째 AMP 페이지
만들기](/ko/docs/tutorials/create.html)를 살펴보시길 바랍니다.

도움이 될 리소스 목록은 다음을 참조하세요.

* [페이지를 더 발견할 수 있게 만들기](/ko/docs/guides/discovery.html)
* [Analytics 구성](/ko/docs/guides/analytics_amp.html)
* [사용자 참여 향상하기](/ko/docs/guides/engagement.html)
* [AMP BY Example](https://ampbyexample.com/)에서 라이브 데모를 볼 수 있습니다.
