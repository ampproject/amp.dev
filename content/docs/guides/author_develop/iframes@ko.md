---
$title: iframe 가져오기
$order: 2
toc: true
---
[TOC]


페이지 내에서 미디어 콘텐츠를 처리하는 방법과 AMP 지원 범주 외의 고급 콘텐츠를 표현하기 위한 iframe의 사용법을 배워봅시다.

## The basics

페이지에서 iframe을 보여줄 때 [`amp-iframe`](/docs/reference/components/amp-iframe.html)을 사용합니다.

iframe은 사용자가 작성한 자바스크립트가 필요한 콘텐츠 같이  AMP 메인 페이지 컨텍스트에서 지원하지 않는 콘텐츠를 나타내는 데 특히 유용합니다.

`amp-iframe` 요구 사항:

* 최초 뷰포트의 상단으로부터 최소한 **600px**이나 **75%** 이상 떨어져 있어야 합니다.
* HTTPS 리소스를 불러오는 것만 가능하며, allow-same-origin으로 정의되지 않은 경우,
컨테이너 origin이 같아서는 안됩니다.

<aside class="note">
  <strong>팁:</strong>
  <span>더 자세한 내용은 <a href="/docs/reference/components/amp-iframe.html">full specification for <code>amp-iframe</code></a>을 참고하세요.</span>
</aside>

## script 가져오기

`amp-iframe`을 페이지에서 사용하려면,
컴포넌트를 확장하기 위한 추가 코드를 로드하기 위해 `<head>`에 아래 스크립트를 먼저 추가해야합니다.

[sourcecode:html]
<script async custom-element="amp-iframe"
  src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

## 마크업 작성하기

[released.amp example](https://github.com/ampproject/amphtml/blob/master/examples/released.amp.html)에서 가져온
`amp-iframe` 예제입니다:

[sourcecode:html]
<amp-iframe width=300 height=300
    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=Alameda,%20CA">
</amp-iframe>
[/sourcecode]

## 예제

더 자세한 예제는 [advanced demo page](https://ampbyexample.com/components/amp-iframe/)에서 찾아볼 수 있으며,
아래와 같이 `<amp-iframe>`을 가져올 수 있습니다:

<amp-iframe width=300 height=300
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://ampbyexample.com/components/amp-iframe/">
</amp-iframe>