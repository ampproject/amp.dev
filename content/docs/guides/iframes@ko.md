---
$title: iframe 포함하기
---
[TOC]

페이지에 미디어 콘텐츠를 표시하고 iframe 을 사용하여 AMP 의 제약을 넘어서는 고급 콘텐츠를 표시하는 방법을 자세히 알아보세요.

## 기본사항

[`amp-iframe`](/ko/docs/reference/components/amp-iframe.html) 요소를 사용하여 페이지에 iframe 을 표시할 수 있습니다.

iframe 은 사용자가 제작한 자바스크립트가 필요한 콘텐츠 등 AMP 의 메인 페이지 컨텍스트에서 지원되지 않는 콘텐츠를 표시할 때 특히 유용합니다.

### `amp-iframe` 요구사항

* 첫 번째 표시 영역이 상단에서부터 최소 **600px** 또는 **75%** 떨어져 있어야 합니다.
* HTTPS 를 통해서만 리소스를 요청할 수 있으며, allow-same-origin을 지정하지 않는 한 컨테이너와 동일한 출처에 있을 수 없습니다.

{% call callout('읽어보기', type='read') %}
[<code>amp-iframe</code> 전체 사양](/ko/docs/reference/components/amp-iframe.html)
에서 자세한 내용을 알아보세요. {% endcall %}

### 스크립트 포함

페이지에 `amp-iframe` 을 포함하려면 우선 다음 스크립트를 `<head>` 에 포함합니다. 이는 확장 구성요소를 위한 다음과 같은 추가 코드를 로드합니다.

[sourcecode:html]
<script async custom-element="amp-iframe"
    src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

### 마크업 작성

`amp-iframe` 예시입니다: 

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=europe">
</amp-iframe>
```

Preview: 

<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=europe">
</amp-iframe>

## 자리표시자 사용하기

'amp-iframe'에 속성이 'placeholder'인 요소(예: 'amp-img' 요소)가 포함되어 있는 경우, 문서 상단에 'amp-iframe'을 표시할 수 있습니다. 이러한 요소는 iframe을 표시할 준비가 될 때까지 자리표시자로 렌더링됩니다.

{% call callout('읽어보기', type='read') %}
[자리표시자가 포함된 iframe](/ko/docs/reference/components/amp-iframe.html#iframe-with-placeholder)에서 자리표시자에 관해 자세히 알아보세요.
{% endcall %}


자리표시자 사용 예:

```html
<amp-iframe width="400" height="225"
sandbox="allow-scripts allow-same-origin"
layout="responsive"
src="https://giphy.com/embed/OWabwoEn7ezug">
<amp-img placeholder layout="fill"
src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>
```
다음과 같이 렌더링됩니다:

<amp-iframe width="400" height="225"
sandbox="allow-scripts allow-same-origin"
layout="responsive"
src="https://giphy.com/embed/OWabwoEn7ezug">
<amp-img placeholder layout="fill"
src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>

## 예시

[고급 데모 페이지](https://ampbyexample.com/components/amp-iframe/) 에서 더 복잡한 예를 확인할 수 있으며.

