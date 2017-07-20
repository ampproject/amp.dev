---
$title: iframe 포함하기
$order: 2
$category: Develop
components:
  - iframe 
toc: true
---
[TOC]

페이지에 미디어 콘텐츠를 표시하고 iframe 을 사용하여 AMP 의 제약을 넘어서는 고급 콘텐츠를 표시하는 방법을 자세히 알아보세요.

## 기본사항

[`amp-iframe`](/ko/docs/reference/components/amp-iframe.html) 요소를 사용하여 페이지에 iframe 을 표시할 수 있습니다.

iframe 은 사용자가 제작한 자바스크립트가 필요한 콘텐츠 등 AMP 의 메인 페이지 컨텍스트에서 지원되지 않는 콘텐츠를 표시할 때 특히 유용합니다.

### `amp-iframe` 요구사항:

* 첫 번째 표시 영역이 상단에서부터 최소 **600px** 또는 **75%** 떨어져 있어야 합니다.
* HTTPS 를 통해서만 리소스를 요청할 수 있으며, allow-same-origin을 지정하지 않는 한 컨테이너와 동일한 출처에 있을 수 없습니다.

{% call callout('도움말', type='read') %}
[<code>amp-iframe</code> 전체 사양](/ko/docs/reference/components/amp-iframe.html)
에서 자세한 내용을 알아보세요. {% endcall %}

### 스크립트 포함

페이지에 `amp-iframe` 을 포함하려면 우선 다음 스크립트를 `<head>` 에 포함합니다. 이는 확장 구성요소를 위한 다음과 같은 추가 코드를 로드합니다.

[sourcecode:html]
<script async custom-element="amp-iframe"
    src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

### 마크업 작성

예시에서 가져온 `amp-iframe` 예시입니다: 

[sourcecode:html]
<amp-iframe width=300 height=300
    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=Alameda,%20CA">
</amp-iframe>
[/sourcecode]

## 예시

[고급 데모 페이지](https://ampbyexample.com/components/amp-iframe/) 에서 더 복잡한 예를 확인할 수 있으며, 이러한 예는 아래에 `<amp-iframe>` 으로 삽입되어 있습니다:

<amp-iframe width=300 height=300
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://ampbyexample.com/components/amp-iframe/embed">
</amp-iframe>

