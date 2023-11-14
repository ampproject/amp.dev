---
$title: amp-mustache
$category@: dynamic-content
teaser:
    text:  Mustache.js 템플릿의 렌더링을 허용합니다.
---


<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

       Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS-IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
-->



[Mustache.js](https://github.com/janl/mustache.js/)의 렌더링을 허용합니다.

<table>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td>
      <div>
          <code>&lt;script async custom-template="amp-mustache" src="https://ampjs.org/v0/amp-mustache-0.2.js">&lt;/script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>예</strong></td>
    <td>AMP By Example의 <a href="https://ampbyexample.com/components/amp-mustache/">주석 처리된 amp-mustache</a> 예를 참조하세요.</td>
  </tr>
</table>


## 버전 참고사항 <a name="version-notes"></a>

| 버전 | 설명 |
|-------|-----|
| 0.2 | `<svg>` 요소 및 감소한 번들 크기(12.2KB 대비 20.5KB, gzip으로 압축됨)를 지원합니다.최신 HTML Sanitizer 라이브러리로 이전합니다(Caja에서 DOMPurify로). 태그와 속성 허용 목록의 차이로 인해 약간의 브레이킹 체인지가 발생할 수 있습니다. 생성된 마크업의 변경사항이 기능에 영향을 미치지 않는지 확인하기 위해 프로덕션에 푸시하기 전에 페이지를 테스트하는 것이 좋습니다. |
| 0.1 | 처음으로 구현되는 형식입니다. |

## 구문 <a name="syntax"></a>

Mustache는 로직이 없는 템플릿 구문입니다. 자세한 내용은 [Mustache.js 문서](https://github.com/janl/mustache.js/)를 참조하세요. 핵심 Mustache 태그 중 일부는 다음과 같습니다.

* {% raw %}`{{variable}}`{% endraw %}: 변수 태그입니다. 변수의 HTML-이스케이프 값을 출력합니다.
* {% raw %}`{{#section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: 섹션 태그입니다. 변수가 있는지 테스트하고 변수가 배열이면 테스트를 반복합니다.
* {% raw %}`{{^section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: 역 태그입니다. 변수가 없는지 테스트합니다.
* {% raw %}`{{{unescaped}}}`{% endraw %}: 이스케이프되지 않은 HTML입니다. 출력할 수 있는 마크업에 제한이 있습니다(아래 '제한사항' 참조).

## 사용 <a name="usage"></a>

[AMP 템플릿 사양](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-templates.md)에 따라 `amp-mustache` 템플릿을
정의하고 사용해야 합니다.

먼저 `amp-mustache`를 선언/로드해야 합니다.

```html
<script src="https://ampjs.org/v0/amp-mustache-0.2.js" async="" custom-template="amp-mustache"></script>
```

그리고 나서 다음과 같이 `script` 또는 `template` 태그로 Mustache 템플릿을 정의할 수 있습니다.

[sourcecode:html]
{% raw %}<!-- Using template tag. -->
<template type="amp-mustache">
  안녕하세요 {{world}}
</template>
{% endraw %}[/sourcecode]
또는

<!-- Using script tag. -->
[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  안녕하세요  {{world}}!
</script>
{% endraw %}[/sourcecode]

AMP 유효성 검사기에서 유용한 dev-x 힌트를 제공하므로 가능할 때마다 `template` 태그를 사용합니다. 표 컨텍스트에서 템플릿을 생성하는 것과 관련된 문제와 예외 사례에는 `script` 템플릿을 사용합니다. 자세한 정보는 아래 '표' 섹션을 참조하세요.

템플릿 탐색 방법, 템플릿 렌더링 시기, 데이터 제공 방식은 모두 이 템플릿을 사용하여 콘텐츠를 렌더링(예: [amp-list](amp-list.md), [amp-form](amp-form.md) 등에서)하는 타겟 AMP 요소를 통해 결정합니다.

## 제한사항 <a name="restrictions"></a>

### 유효성 검사 <a name="validation"></a>

모든 AMP 템플릿과 마찬가지로 `amp-mustache` 템플릿은 올바른 형식의 DOM 단편이어야 합니다. 즉,
무엇보다도 `amp-mustache`를 사용하여 다음을 할 수 없습니다.

* 태그 이름 계산. 예: {% raw %}`<{{tagName}}>`{% endraw %}은 허용되지 않습니다.
* 속성 이름 계산. 예: {% raw %}`<div {{attrName}}=something>`{% endraw %} 은 허용되지 않습니다.

'triple-mustache'의 출력은 다음 태그만 허용하도록 정리됩니다. `a`, `b`, `br`, `caption`, `colgroup`, `code`, `del`, `div`, `em`, `i`, `ins`, `li`, `mark`, `ol`, `p`, `q`, `s`, `small`, `span`, `strong`, `sub`, `sup`, `table`, `tbody`, `time`, `td`, `th`, `thead`, `tfoot`, `tr`, `u`, `ul`.

### 정리 <a name="sanitization"></a>

Mustache 출력은 보안상의 이유 및 AMP 유효성을 유지하기 위해 정리됩니다. 따라서 특정 요소와 속성이 자동으로 삭제될 수 있습니다.

## 일반적인 문제 <a name="pitfalls"></a>

### 중첩된 템플릿 <a name="nested-templates"></a>

각각의 AMP 유효성 검사에서 `<template>` 요소는 다른 `<template>` 요소의 하위 요소가 아니어야 합니다. 이 문제는 템플릿을 사용하는 두 구성요소를 중첩할 때 발생할 수 있습니다(예: `amp-list` 및 `amp-form`).

이 문제를 임시로 해결하기 위해 구성요소의 `<template>` 속성을 통해 `id`에서도 `template` 요소를 참조할 수 있습니다. 예:

[sourcecode:html]
{% raw %}<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}[/sourcecode]

다음으로도 표현할 수 있습니다.

[sourcecode:html]
{% raw %}<!-- Externalize templates to avoid nesting. -->
<template type="amp-mustache" id="myTemplate">
  <div>{{title}}</div>
</template>

<amp-list id="myList" src="https://foo.com/list.json" template="myTemplate">
</amp-list>
{% endraw %}[/sourcecode]

### 표 <a name="tables"></a>

AMP 템플릿 문자열은 `<template>` 요소에 지정해야 하므로 브라우저 파싱 시 예상치 못한 동작이 발생할 수 있습니다. 예를 들어 `<table>` 요소를 사용하면 텍스트의 [상위 요소 지원](https://www.w3.org/TR/html5/syntax.html#unexpected-markup-in-tables)이 발생하기도 합니다. 다음 예를 참조하세요.

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</template>
{% endraw %}[/sourcecode]

브라우저에서 {% raw %}`{{#foo}}`{% endraw %}와 {% raw %}`{{/foo}}`{% endraw %} 텍스트 노드의 상위 요소를 지원합니다.

[sourcecode:html]
{% raw %}{{#foo}}
{{/foo}}
<table>
  <tr>
    <td></td>
  </tr>
</table>
{% endraw %}[/sourcecode]

임시 해결책으로는 Mustache 섹션을 HTML 주석문(예: {% raw %}`<!-- {{#bar}} -->`{% endraw %})으로 래핑하거나 `<div>`와 같이 표가 아닌 요소를 대신 사용하거나 `<script type="text/plain">` 태그를 사용하여 템플릿을 정의하는 방법이 있습니다.

[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</script>
{% endraw %}[/sourcecode]

### 인용부호 이스케이프 <a name="quote-escaping"></a>

`amp-mustache`를 사용하여 속성 값을 계산할 때 인용 부호 이스케이프가 문제가 될 수 있습니다. 예:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <!-- A double-quote (") in foo will cause malformed HTML. -->
  <amp-img alt="{{foo}}" src="example.jpg" width=100 height=100></amp-img>

  <!-- A single-quote (') or double-quote (") in bar will cause an AMP runtime parse error. -->
  <button on="tap:AMP.setState({foo: '{{bar}}'})">Click me</button>
</template>
{% endraw %}[/sourcecode]

Mustache에서 `&amp;` 문자를 HTML 이스케이프 처리하므로(예: `&quot;` -&gt; `&amp;quot;`), {% raw %}`{{foo}}`{% endraw %} 또는 {% raw %}`{{bar}}`{% endraw %} 변수에서 HTML 문자 코드를 사용할 수 없습니다. 임시 해결 방법은 복제 문자(예: ′(`&prime;`) 및 ″(`&Prime;`))를 사용하는 것입니다.

대신 `amp-mustache`에서 이 대체를 해결하기 위한 [공개 제안](https://github.com/ampproject/amphtml/issues/8395)이 있습니다. 이 문제를 지원하고 싶다면 이 문제에 관한 의견을 주세요.

### HTML 개체 <a name="html-entities"></a>

HTML 개체는 `<template>` 요소에서 유지되지 않습니다.

{% raw %}`{{`, `}}`, `{{{`, `}}}`{% endraw %}를 포함하는 사용자 제작 텍스트가 Mustache 섹션으로 처리되므로, 사용자 제작 텍스트를 포함하는 `<template>`을 서버 측에서 렌더링하려는 경우 문제가 될 수 있습니다. 예를 들어 {% raw %}`{{`{% endraw %}를 HTML 개체 `&lcub;&lcub;`로 교체하는 작업은 브라우저에서 `<template>`을 파싱할 때 이 개체가 유지되지 않으므로 작동하지 않습니다.

{% raw %}`{{`{% endraw %}와 같은 문자열을 다른 문자로 교체하거나 사용자 제작 콘텐츠에서 완전히 제거하는 해결 방법도 있습니다.

## 유효성 검사 <a name="validation-1"></a>

AMP 유효성 검사기 사양에서 [amp-mustache 규칙](https://github.com/ampproject/amphtml/blob/main/extensions/amp-mustache/validator-amp-mustache.protoascii)을 참조하세요.
