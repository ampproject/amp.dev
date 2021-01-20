---
"$title": Supported CSS
description: 모든 웹페이지와 마찬가지로 AMP 페이지는 CSS로 스타일이 지정되지만 사용자 지정 글꼴을 제외한 외부 스타일시트는 참조할 수 없습니다. 또한 특정 스타일은 허용되지 않습니다...
formats:
- websites
- email
- ads
- stories
author: Meggin
contributors:
- pbakaus
- CrystalOnScript
- bpaduch
- choumx
---

모든 웹페이지와 마찬가지로 AMP 페이지는 CSS로 스타일이 지정되지만 [맞춤 글꼴](#the-custom-fonts-exception) 외 외부 스타일시트는 참조할 수 없습니다. 또한 특정 스타일은 성능상의 이유로 허용되지 않습니다. 인라인 스타일 속성도 허용되지 않습니다.

모든 스타일은 문서 헤드에 배치되어야 합니다 ([페이지에 스타일 추가](index.md#add-styles-to-a-page) 참조). 하지만 CSS 전처리기 및 템플릿을 사용하여 정적 페이지를 만들 수 있으며, 이를 통해 콘텐츠를 더 효과적으로 관리할 수 있습니다.

참고: AMP 구성요소에는 기본 스타일이 제공되므로 반응형 페이지를 비교적 간편하게 제작할 수 있습니다. 이러한 스타일은 [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css) 에 정의되어 있습니다.

다음 스타일은 AMP 페이지에서 허용되지 않습니다.

## 허용되지 않는 스타일

다음과 같은 @-규칙이 스타일시트에서 허용됩니다.

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">금지된 스타일</th>
      <th data-th="Description">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">
<code>!important</code> 한정자</td>
      <td data-th="Description">
<code>!important</code> 한정자를 style 작성에 사용하거나 <code>!important</code> 한정자가 적용된 style을 HTML 엘리먼트에서 사용할 수 없습니다. AMP 에서 엘리먼트 크기 조정 규칙을 시행하기 위한 필수 요구사항입니다.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code><link rel=”stylesheet”></code></td>
      <td data-th="Description">
<a href="#the-custom-fonts-exception">맞춤 글꼴</a> 이외의 경우에는 사용할 수 없습니다.</td>
    </tr>
    <tr>
      <td data-th="Banned style">
<code>i-amphtml-</code> 클래스 및 <code>i-amphtml-</code> 태그 이름</td>
      <td data-th="Description">정규 표현식 `(^|\W)i-amphtml-`가 포함된 클래스 및 태그는 검사기에서 허용되지 않으며 AMP 프레임워크에서 내부용으로만 사용할 수 있습니다. 따라서 사용자의 스타일시트는 <code>i-amphtml-</code> 클래스 및 태그에 CSS 선택자를 참조할 수 없습니다.</td>
    </tr>
  </tbody>
</table>

## 제한된 스타일

성능 최적화를 위해 허용된 스타일에서 다음의 값은 제한해야 합니다.

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">제한된 스타일</th>
      <th data-th="Description">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Restricted style">
<code>transition</code> 속성</td>
      <td data-th="Description"> GPU 가속이 가능한 속성만 허용됨(현재 <code>opacity</code>, <code>transform</code>, <code>-vendorPrefix-transform</code>).</td>
    </tr>
    <tr>
      <td data-th="Restricted style"><code>@keyframes {...}</code></td>
      <td data-th="Description"> GPU 가속이 가능한 속성만 허용됨(현재 <code>opacity</code>, <code>transform</code>, <code>-vendorPrefix-transform</code>).</td>
    </tr>
  </tbody>
</table>

## 맞춤 글꼴은 허용됨 <a name="the-custom-fonts-exception"></a>

AMP 페이지에 외부 스타일시트를 포함할 수 없지만 사용자 지정 글꼴은 예외입니다.

전처리기로 생성된 출력은 다른 웹페이지에서와 마찬가지로 AMP에서도 제대로 작동합니다. 예를 들어, [amp.dev](https://amp.dev/) 사이트는 [Sass](http://sass-lang.com/) 를 사용합니다. ([Grow](http://grow.io/) 를 통해 [amp.dev](https://amp.dev/) 를 구성하는 정적 AMP 페이지가 생성됩니다.)

## CSS 전처리기 사용하기 <a name="using-css-preprocessors"></a>

전처리기를 사용할 때는 포함하는 항목에 특히 주의해야 합니다. 페이지에서 사용하는 항목만 로드하세요. 예를 들어, [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) 에는 모든 필수 AMP 마크업과 `*.scss` 소스 파일의 인라인 CSS가 포함됩니다. 또한 [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) 등의 커스텀 엘리먼트용 스크립트를 포함하여 YouTube 동영상 등을 사이트의 여러 페이지에 넣을 수 있도록 했습니다.

전처리기를 사용할 때 포함하는 항목에 특히주의하십시오. 페이지에서 사용하는 것만로드합니다. 예를 들어 [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) 에는 `*.scss` 소스 파일의 모든 필수 AMP 마크 업과 인라인 CSS가 포함됩니다. 또한 [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) 대한 맞춤 요소 스크립트도 포함되어 있으므로 사이트의 많은 페이지에 삽입 된 YouTube 동영상이 포함될 수 있습니다.

[sourcecode:html]{% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>AMP Project</title>
  <link rel="icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %}[/sourcecode]

위의 예시가 AMP HTML 형식에서 어떻게 표시되는지 확인하려면 [amp.dev](https://amp.dev/)에서 아무 페이지나 눌러 소스를 확인해보세요(Chrome의 경우 마우스 오른쪽 버튼 클릭 후 `페이지 소스 보기`).
