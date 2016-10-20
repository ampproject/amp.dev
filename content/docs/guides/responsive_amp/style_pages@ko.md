---
$title: 지원하는 CSS
$order: 0
---
[TOC]

모든 웹페이지처럼, AMP 페이지도 CSS를 사용할 수 있지만,
[커스텀 폰트](#the-custom-fonts-exception)를 제외한 외부 스타일시트를 불러올 수는 없습니다.
또한 몇가지 스타일은 성능에 영향을 줘서 허용하지 않습니다.
인라인 스타일 속성도 허용하지 않습니다.

모든 스타일은 문서의 head 내에 존재해야 합니다
([Add styles to a page](/docs/guides/validate.html#add-styles-to-a-page)를 참고).
하지만 CSS 전처리기를 사용할 수 있으며 더 나은 콘텐츠 관리를 위해 정적 페이지를 빌드하는 템플릿을 사용할 수 있습니다.

{% call callout('노트', type='note') %}
    AMP 컴포넌트는 반응형 페이지를 꽤 쉽게 작성하기 위한 기본 스타일을 가지고 있습니다.
    스타일은 [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css)에 정의되어 있습니다.
{% endcall %}

## 허용하지 않는 스타일

아래 스타일은 AMP 페이지에서 허용하지 않습니다:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">허용하지 않는 스타일</th>
      <th data-th="Description">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">인라인 스타일 속성</td>
      <td data-th="Description">모든 스타일은 반드시 페이지의 <code>&lt;head&gt;</code> 내에서,
      <code>&lt;style amp-custom&gt;</code> 태그와 함께 정의해야 합니다.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!important</code> 수식어 </td>
      <td data-th="Description">사용을 허용하지 않습니다.
      이는 AMP가 요소의 사이즈 규칙을 강제하는 걸 가능하게 하는데 필요한 요구사항입니다.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description"><a href="#the-custom-fonts-exception">커스텀 폰트</a>를 제외하고는 모두 허용하지 않습니다.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>* </code> (전역 셀렉터)</td>
      <td data-th="Description">성능에 부정적인 영향을 주며 다른 셀렉터 제한을 회피하는 데 사용될 수 있습니다.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">전역 셀렉터를 시뮬레이션하는 데 사용될 수 있습니다.</td>
    </tr>
    <tr>
      <td data-th="Banned style">의사 셀렉터, 의사 클래스, 의사 요소</td>
      <td data-th="Description">
      의사 셀렉터, 의사 클래스, 의사 요소는 태그명을 포함하는 셀렉터 및 <code>amp-</code>로 시작하지 않는 태그명에서만 허용합니다.
      괜찮은 예제: <code>a:hover, div:last-of-type</code>
      괜찮지 않은 예제: <code>amp-img:hover, amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>-amp-</code> 클래스 및 <code>i-amp-</code> 요소명</td>
      <td data-th="Description">
      작성자의 스타일 시트 내 클래스명은 <code>-amp-</code> 문자열로 시작해서는 안됩니다.
      이들은 AMP 런타임 시 내부에서 사용하기 위해 예약되어 있습니다.
      이에 따라서, 유저의 스타일 시트는 <code>-amp-</code> 클래스와 <code>i-amp</code> 태그를 CSS 셀렉터로 참조하지 않아야합니다.
      </td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>behavior</code>, <code>-moz-binding</code></td>
      <td data-th="Description">보안 이유로 인해 허용하지 않는 속성입니다.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>filter</code></td>
      <td data-th="Description">성능 문제로 인한 블랙리스트입니다.</td>
    </tr>
  </tbody>
</table>

## 제한적으로 사용할 수 있는 스타일

아래 스타일은 허용하지만, 지원값을 제한합니다:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">제한적으로 사용할 수 있는 스타일</th>
      <th data-th="Description">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Restricted style"><code>transition</code> 속성</td>
      <td data-th="Description">GPU 가속 속성에서만 허용합니다 (현재는 <code>opacity</code>, <code>transform</code>, <code>-vendorPrefix-transform</code>).</td>
    </tr>
    <tr>
      <td data-th="Restricted style"><code>@keyframes {...}</code></td>
      <td data-th="Description">GPU 가속 속성에서만 허용합니다 (현재는 <code>opacity</code>, <code>transform</code>, <code>-vendorPrefix-transform</code>).</td>
    </tr>
  </tbody>
</table>

## 커스텀 폰트 예외

AMP 페이지는 커스텀 폰트를 제외한 외부 스타일 시트는 포함하지 못합니다.
커스텀 폰트를 참조하기 위한 두가지 지원 방법은,
허용하는 폰트 제공자를 가리키는 link 태그 사용 혹은 `@font-face`를 포함하는 것입니다.

폰트 제공자는 CSS 전용 통합을 지원하고 HTTPS로 폰트를 전달하는 허용하는 것만 사용 가능합니다.
현재는, 아래 origin을 허용되며, link 태그를 이용해 폰트를 제공할 수 있습니다:

* Typography.com: **https://cloud.typography.com**
* Fonts.com: **https://fast.fonts.net**
* Google Fonts: **https://fonts.googleapis.com**
* Font Awesome: **https://maxcdn.bootstrapcdn.com**

허용하는 폰트 제공자를 가리키는 link 태그 예제입니다, Google Fonts:

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

대신하여, [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)를 사용할 수 있습니다.
폰트들은 `@font-face`를 이용해 포함되며 반드시 HTTP나 HTTPS 스킴으로 가져와야 합니다.

## CSS 전처리기 사용

전처리기로 생성된 결과값은 다른 웹 페이지와 동일하게 잘 동작합니다.
예를 들어, [ampproject.org](https://www.ampproject.org/) 사이트는 [Sass](http://sass-lang.com/)를 사용합니다.
([ampproject.org](https://www.ampproject.org/) 사이트를 만들기 위한 정적 AMP 페이지를
[Grow](http://grow.io/)를 이용해 빌드합니다)

전처리기를 사용할 때, 무엇을 포함할 지 특별한 주의를 기해야 하며,
페이지에서 사용하는 것만 로드해야합니다.

예를 들어, [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html)은
모든 필수 AMP 마크업과 `*.scss` 소스 파일에서 인라인 CSS를 포함합니다.

또한 [`amp-youtube`](/docs/reference/extended/amp-youtube.html)를 위한 커스텀 요소 스크립트를 포함하여,
여러 다른 것들 사이에서, 사이트 사이의 많은 페이지는 유튜브 비디오를 포함할 수 있습니다.

[sourcecode:html]{% raw %}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">

  <title>Accelerated Mobile Pages Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="https://www.ampproject.org{{doc.url.path}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
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

위 포맷의 AMP HTML이 어떻게 해석되는 지 보려면,
[ampproject.org](https://www.ampproject.org/) 내의 아무 페이지의 소스보기를 하면 됩니다.
(크롬에서는, 오른쪽 클릭 후 `View Page Source`를 누르면 됩니다.)
