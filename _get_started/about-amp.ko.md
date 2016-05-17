---
layout: page
title: AMP란?
order: 0
locale: ko
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

AMP는 빠르게 렌더링되는 정적 콘텐츠용 웹페이지를 만드는 한 방법입니다.
실제로 작동하는 AMP는 세 가지 다른 부분으로 구성됩니다:

{% include toc.html %}

**AMP HTML**은 안정적인 성능을 위한 제한이 있으며
또한 기본 HTML을 넘어 리치 콘텐츠를 작성하기 위한 확장이 있는 HTML입니다.
**AMP JS** 라이브러리는 AMP HTML 페이지의 빠른 렌더링을 보장합니다.
**Google AMP Cache**(선택 항목)는 AMP HTML 페이지를 제공합니다.

## AMP HTML

기본적으로 AMP HTML은 사용자 지정 AMP 속성으로 확장되는 HTML입니다.
가장 간단한 AMP HTML 파일은 다음과 같습니다.

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

AMP HTML 페이지에 있는 대부분의 태그는 일반 HTML 태그이지만,
일부 HTML 태그는 AMP 전용 태그로 대체됩니다(참고 항목
[AMP 사양의 HTML 태그](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).
AMP HTML 구성 요소라고 불리는 이러한 사용자 지정 요소는
효율적인 방식으로 일반 패턴을 쉽게 구현하도록 해줍니다.

예를 들어, [`amp-img`](/docs/reference/amp-img.html) 태그는
아직 지원되지 않는 브라우저에서도 `srcset` 지원을 완벽하게 제공합니다.
[첫 번째 AMP HTML 페이지 만들기](/docs/get_started/create_page.html) 방법에 대해 알아보세요.

## AMP JS

[AMP JS 라이브러리](https://github.com/ampproject/amphtml/tree/master/src)는
페이지의 빠른 렌더링을 보장하기 위해
모든 [AMP의 성능 모범 사례](/docs/get_started/technical_overview.html)를 구현하고,
리소스 로드를 관리하며, 위에 언급된 사용자 지정 태그를 제공합니다.

최적화의 최대 난제 중 하나는, 외부 리소스에서 들어오는 모든 것들을 비동기화하기 때문에, 페이지에 있는 어느 것도 렌더링되는 것을 막을 수 없다는 점입니다.

기타 성능 기법에는 모든 iframe의 샌드박싱, 리소스가 로드되기 전에 페이지에 있는 모든 요소의 레이아웃 미리 계산, 느린 CSS 선택기의 비활성화가 포함됩니다.

[최적화](/docs/get_started/technical_overview.html) 뿐만 아니라 제한에 대해 자세히 알아보려면, [AMP HTML 사양](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)을 참조하세요.

## Google AMP Cache

Google AMP Cache는 모든 유효한 AMP 문서를 전달하기 위한
프록시 기반 콘텐츠 전달 네트워크입니다.
이 캐시는 AMP HTML 페이지를 가져와서 캐싱하여 페이지 성능을 자동으로 개선해 줍니다.
Google AMP Cache를 사용할 경우, 최대의 효율성을 위해 문서,
모든 JS 파일 및 모든 이미지는
[HTTP 2.0](https://http2.github.io/)을 사용 중인 동일한 위치에서 로드됩니다.

이 캐시는 내장
[유효성 검사 시스템](https://github.com/ampproject/amphtml/tree/master/validator)도 제공합니다.
이 시스템은 페이지의 작동을 보증하며,
페이지가 외부 리소스에 종속되지 않도록 합니다.
유효성 검사 시스템은 일련의 어설션을 실행하여,
페이지의 마크업이 AMP HTML 사양을 충족하는지 확인합니다.

또 다른 버전의 유효성 검사기에는 모든 AMP 페이지가 번들로 제공됩니다. 이 버전에서는 페이지가
렌더링될 때 유효성 검사 오류를 브라우저 콘솔에 직접 기록할 수 있으므로, 코드의 복잡한 변경이 성능과 사용자 경험에
얼마나 영향을 미치는지 확인할 수 있습니다.

[AMP HTML 페이지 테스트](/docs/guides/validate.html)에 대해 자세히 알아보세요.
