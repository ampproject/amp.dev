---
'$title': 유효성 검사 오류 해결
$order: 2
description: 이 섹션에서는 AMP 페이지의 AMP 유효성 검사 오류 및 해결 방법을 살펴봅니다. 콘솔에 따라 오류가 아래와 다른 순서로 나타날 수 있습니다.
---

이 섹션에서는 AMP 페이지에 있는 AMP 유효성 검사 오류 및 해결 방법을 살펴봅니다. 콘솔에 따라 오류가 아래와 다른 순서로 나타날 수 있습니다.

## 문자 집합 포함

우선 다음 오류를 해결해 보겠습니다.

<pre class="error-text">
The mandatory tag 'meta charset=utf-8' is missing or incorrect.
</pre>

AMP에서 텍스트를 올바르게 표시하려면 페이지의 문자 집합을 지정해야 합니다. 또한 메타 문자 집합 정보는 `<head> ` 태그의 첫 번째 하위 요소여야 합니다. 이 태그를 첫 번째로 사용해야 하는 이유는 메타 문자 집합 태그 앞에 추가된 콘텐츠를 다시 해석하는 일을 피하기 위해서입니다.

다음 코드를 `<head>` 태그의 첫 번째 줄에 **추가**합니다.

```html
<meta charset="utf-8" />
```

파일을 **저장**하고 페이지를 새로고침합니다. 문자 집합 오류가 더 이상 표시되지 않는지 확인합니다.

## 표준 링크 포함

이제 다음 오류를 살펴보겠습니다.

<pre class="error-text">
The mandatory tag 'link rel=canonical' is missing or incorrect.
</pre>

모든 AMP 문서에는 해당 문서의 '표준' 버전을 참조하는 링크가 있어야 합니다. 이 가이드에 포함되어 있는 [페이지를 검색할 수 있도록 설정](discoverable.md) 단계에서 표준 페이지란 무엇이며 표준 연결에 사용할 수 있는 접근방식으로는 어떤 것이 있는지 자세히 알아보겠습니다.

이 가이드에서는 변환 중인 원본 HTML 문서를 표준 페이지로 간주합니다.

계속해서 `<meta charset="utf-8" />` 태그 아래에 다음 코드를 **추가**합니다.

```html
<link rel="canonical" href="/article.html" />
```

[tip type="note"] 독립된 표준 AMP 페이지도 만들 수 있습니다. 여전히 표준 링크는 필요하며 AMP 문서 자체를 가리켜야 합니다.

```html
<link rel="canonical" href="article.amp.html" />
```

[/tip]

이제 페이지를 **새로고침**합니다. 아직 수정해야 할 오류가 많지만 표준 링크 오류는 모두 사라졌습니다.

## AMP 속성 지정

페이지를 AMP 문서로 선언하려면 페이지의 루트 `<html>` 요소에 속성이 필요합니다.

<pre class="error-text">
The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'
The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.
</pre>

위에 표시된 오류는 다음과 같이 `<html>` 태그에 `⚡` 속성을 추가하면 간단히 해결됩니다.

```html
<html ⚡ lang="en"></html>
```

이제 페이지를 새로고침하고 두 오류가 모두 사라졌는지 확인합니다.

[tip type="note"] `⚡`을 지정하는 것이 권장되는 방법이지만 다음과 같이 `⚡` 속성 자리에 `amp` 속성을 사용할 수도 있습니다.

```html
<html amp lang="en"></html>
```

[/tip]

## 표시 영역 지정

이제 다음 오류를 해결해 보겠습니다.

<pre class="error-text">
The mandatory tag 'meta name=viewport' is missing or incorrect.
</pre>

AMP에서는 표시 영역의 `width` 및 `minimum-scale`을 정의해야 합니다. 이 값은 각각 `device-width` 및 `1`로 정의되어야 합니다. 표시 영역은 HTML 페이지의 `<head>`에 포함되어 있는 일반적인 태그입니다.

표시 영역 오류를 해결하려면 다음의 HTML 스니펫을 `<head>` 태그에 추가합니다.

```html
<meta name="viewport" content="width=device-width" />
```

`width` 및 `minimum-scale`에 지정된 값은 AMP에서 요구되는 값입니다. `initial-scale` 정의는 필수 항목은 아니지만 모바일 웹 개발 과정에 일반적으로 포함되며 권장되는 사항입니다. [표시 영역 구성](https://developers.google.com/speed/docs/insights/ConfigureViewport)에서 표시 영역 및 반응형 디자인에 관해 자세히 알아볼 수 있습니다.

이전과 마찬가지로 페이지를 **새로고침**하고 오류가 사라졌는지 확인합니다.

## 외부 스타일시트 교체

다음의 오류는 스타일시트 사용과 관련되어 있습니다.

<pre class="error-text">
The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.
</pre>

특히 이 오류는 `<head>` 태그에 있는 다음과 같은 스타일시트 링크 태그와 관련되어 있습니다.

```html
<link href="base.css" rel="stylesheet" />
```

문제는 외부 스타일시트를 참조한 데서 발생합니다. 문서를 가능한 한 빨리 로드하기 위해 AMP에는 외부 스타일시트를 포함할 수 없습니다. 대신 모든 스타일시트 규칙은 `<style amp-custom></style>` 태그를 사용하여 AMP 문서에 인라인으로 추가되어야 합니다.

```html
<style amp-custom>
  /* The content from base.css */
</style>
```

이제 오류를 해결해 보겠습니다.

1. `<head>`에서 외부 스타일시트를 가리키는 `<link>` 태그를 **삭제**하고 이를 인라인 `<style amp-custom></style>` 태그로 교체합니다. 스타일 태그의 `amp-custom` 속성은 필수입니다.
2. [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) 파일에 있는 모든 스타일을 **복사**하여 `<style amp-custom></style>` 태그에 붙여넣습니다.

다시 한번 페이지를 **새로고침**하고 스타일시트 오류가 사라졌는지 확인합니다.

[tip type="note"] 인라인 스타일링이 필요할 뿐 아니라 모든 스타일링 정보의 파일 크기가 75KB로 제한됩니다. AMP 페이지에 CSS를 인라인 처리하기 전에 [SASS](http://sass-lang.com/)와 같은 CSS 사전 처리기를 사용하여 CSS를 축소해야 합니다. [/tip]

[tip type="important"] 전체 AMP 문서에 대해 스타일 태그를 1개만 사용할 수 있습니다. AMP 페이지에서 참조하는 외부 스타일시트가 여러 개인 경우 이러한 스타일시트를 하나의 규칙 세트로 조합해야 합니다. AMP에서 어떤 CSS 규칙이 유효한지 알아보려면 [지원되는 CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md)를 확인하세요. [/tip]

## 타사 자바스크립트 제외

CSS를 인라인 처리하면 스타일시트를 AMP로 비교적 쉽게 다시 작성할 수 있지만 자바스크립트에서는 그렇지 않습니다.

<pre class="error-text">
The tag 'script' is disallowed except in specific forms.
</pre>

일반적으로 AMP에서 스크립트는 두 가지 주요 요구사항을 따르는 경우에만 허용됩니다.

1. 모든 자바스크립트는 비동기식이어야 합니다(즉, 스크립트 태그에 `async` 속성을 포함해야 함).
2. AMP 라이브러리 및 페이지에 있는 AMP 구성요소용으로 자바스크립트를 사용해야 합니다.

이와 같은 요구사항으로 인해 다음에 명시된 경우를 제외하고는 AMP에서 모든 사용자 생성/타사 자바스크립트의 사용이 사실상 배제됩니다.

[tip type="note"] 사용자 생성/타사 스크립트 사용 제한의 유일한 예외는 다음과 같습니다.

1. 스크립트가 페이지에 메타데이터를 추가하거나 AMP 구성요소를 구성합니다. 이러한 스크립트에는 `application/ld+json` 또는 `application/json` 유형 속성이 포함됩니다.
2. 스크립트가 iframes에 포함되어 있습니다. iframe에 자바스크립트를 포함하는 일은 최후의 수단으로 생각해야 합니다. 가능하다면 자바스크립트 기능은 [AMP 구성요소](../../../../documentation/components/index.html)를 사용하여 대체해야 합니다. 다음 섹션에서 첫 번째 AMP 구성요소를 살펴보겠습니다. [/tip]

외부 [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js) 파일을 열어 보세요. 무엇이 표시되나요? 이 파일에는 자바스크립트 코드가 없어야 하며 다음과 같은 정보의 주석만 포함되어 있어야 합니다.

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

이 외부 자바스크립트 파일은 웹사이트의 기능 구성요소가 아니므로 참조를 완전히 삭제할 수 있습니다.

문서에서 다음 외부 자바스크립트 참조를 **삭제**합니다.

```html
<script type="text/javascript" src="base.js"></script>
```

이제 페이지를 **새로고침**하고 스크립트 오류가 사라졌는지 확인합니다.

## AMP CSS 상용구 포함

다음 오류는 누락된 상용구 코드를 참조합니다.

<pre class="error-text">
The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.
The mandatory tag 'head > style : boilerplate' is missing or incorrect.
The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.
</pre>

모든 AMP 문서에는 다음과 같은 AMP 상용구 코드가 필요합니다.

```html
<style amp-boilerplate>
  body {
    -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    animation: -amp-start 8s steps(1, end) 0s 1 normal both;
  }
  @-webkit-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-moz-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-ms-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-o-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }</style
><noscript
  ><style amp-boilerplate>
    body {
      -webkit-animation: none;
      -moz-animation: none;
      -ms-animation: none;
      animation: none;
    }
  </style></noscript
>
```

문서의 `<head>` 태그 하단에 위의 상용구 코드를 **추가**합니다.

`<style amp-boilerplate>` 태그를 사용하면 AMP 자바스크립트 라이브러리가 로드될 때까지 본문 콘텐츠가 숨겨지며, 그런 다음 콘텐츠가 렌더링됩니다. AMP에서는 스타일이 적용되지 않은 콘텐츠가 렌더링되는 일, 즉 FOUC(Flash Of Unstyled Content)를 방지하기 위해 이러한 작업을 수행합니다. 이를 통해 페이지의 콘텐츠가 한꺼번에 표시되며 스크롤 없이 볼 수 있는 부분이 한 번에 렌더링되므로 사용자 환경에서 진정한 의미의 즉각성을 경험할 수 있습니다. 두 번째 태그는 자바스크립트가 브라우저에서 사용 중지된 경우 이 논리를 되돌립니다.

## `<img>`를 `<amp-img>`로 대체

AMP에서는 미디어를 표시할 때 기본 HTML의 상응하는 페이지를 지원하지 않으므로 다음과 같은 오류가 발생합니다.

<pre class="error-text">
The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
</pre>

AMP에는 `<img>` 태그를 대체하기 위해 특별히 만들어진 웹 구성요소인 [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) 태그가 있습니다.

```html
<amp-img src="mountains.jpg"></amp-img>
```

`<img>` 태그를 위에 설명된 [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) 태그로 **교체**하고 검사기를 다시 실행합니다. 다음과 같이 여러 가지 새로운 오류가 표시될 것입니다.

<pre class="error-text">
Layout not supported: container
The implied layout 'CONTAINER' is not supported by tag 'amp-img'.
</pre>

[`amp-img`](../../../../documentation/components/reference/amp-img.md)가 다른 오류를 유발하는 이유는 무엇일까요? [`amp-img`](../../../../documentation/components/reference/amp-img.md)는 전통적인 HTML img 태그를 직접적으로 대체하지 않기 때문입니다. [`amp-img`](../../../../documentation/components/reference/amp-img.md)를 사용하려면 추가 요구사항이 있습니다.

### AMP 레이아웃 시스템

레이아웃 오류를 통해 [`amp-img`](../../../../documentation/components/reference/amp-img.md)가 `container` 레이아웃 유형을 지원하지 않는다는 사실을 알았습니다. AMP 디자인에서 가장 중요한 개념 중 하나는 웹페이지를 렌더링하는 데 필요한 DOM 리플로우의 양을 줄이는 것입니다.

DOM 리플로우를 줄이기 위해 AMP에는 페이지를 다운로드하고 렌더링하는 주기 중 페이지의 레이아웃을 가능한 한 빠르게 파악하기 위한 레이아웃 시스템이 포함되어 있습니다.

아래 이미지는 HTML 페이지가 어떻게 배치되는지를 AMP의 접근방식과 비교하여 보여줍니다. 왼쪽에서 광고 또는 이미지가 로드될 때마다 텍스트가 어떻게 리플로우되는지 유심히 살펴보세요. 반면 AMP의 레이아웃 접근방식에서는 이미지 및 광고가 로드되는 데 시간이 오래 걸리더라도 텍스트가 왔다갔다 움직이지 않습니다.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption='일반적인 콘텐츠 배치 방식과 AMP의 접근방식 비교') }}

AMP 레이아웃 시스템에서는 페이지에 있는 구성요소가 크기 고정, 반응형 디자인, 높이 고정 등 다양한 방식으로 배치 및 확장될 수 있습니다.

여기서는 레이아웃 시스템이 [`amp-img`](../../../../documentation/components/reference/amp-img.md)의 레이아웃 유형을 `container` 유형으로 추정했습니다. 하지만 `container` 유형은 하위 요소가 포함되어 있는 요소에만 적용할 수 있습니다. `container` 유형은 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 태그와 호환되지 않기 때문에 오류가 발생했습니다.

`container` 유형을 추정한 이유는 무엇일까요? [`amp-img`](../../../../documentation/components/reference/amp-img.md) 태그에 `height` 속성을 지정하지 않았기 때문입니다. HTML에서는 페이지에 있는 요소에 고정된 너비와 높이를 지정함으로써 리플로우를 줄일 수 있습니다. AMP에서는 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 요소의 가로 세로 비율을 사전에 결정할 수 있도록 해당 요소의 너비와 높이를 정의해야 합니다.

다음과 같이 [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) 태그에 `width` 및 `height`를 **추가**합니다.

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

페이지를 새로고침하고 검사기를 확인합니다. 더 이상 오류가 표시되지 않아야 합니다.

이제 AMP 문서가 유효해졌습니다. 하지만 페이지에서 이미지 위치가 어색하여 이미지가 멋져 보이지 않습니다. [`amp-img`](../../../../documentation/components/reference/amp-img.md)의 높이와 너비를 지정하면 기본적으로 AMP가 사용자가 지정한 값으로 크기를 조정합니다. 하지만 AMP에서 어떤 화면이든 페이지 크기에 _반응하여_ 이미지를 알맞게 늘려준다면 좋지 않을까요?

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption='이미지가 반응하지 않습니다') }}

AMP는 사용자가 지정한 너비와 높이에 따라 해당 요소의 가로 세로 비율을 계산할 수 있습니다. 이를 통해 AMP 레이아웃 시스템에서는 다양한 방법으로 요소를 배치하고 크기를 조정합니다. `layout` 속성은 AMP에 사용자가 요소를 어떻게 배치하고 늘리고 싶어 하는지 알려줍니다.

이미지를 늘리고 크기를 조정할 수 있도록 레이아웃 속성을 `responsive`로 **설정**해 봅시다.

```html
<amp-img
  src="mountains.jpg"
  layout="responsive"
  width="266"
  height="150"
></amp-img>
```

완료되었습니다. 이미지의 가로 세로 비율이 알맞게 변경되었으며 화면 너비에 맞춰 화면을 채우고 있습니다.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption='이미지가 반응합니다!') }}

[tip type="read-on"] [AMP 레이아웃 사양](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)에서 AMP 레이아웃 시스템에 관해 자세하게 알아보세요. [/tip]

## 성공입니다.

이제 AMP 문서가 다음과 같이 작성되어 있어야 합니다.

```html
<!DOCTYPE html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />

    <link rel="canonical" href="/article.html" />
    <link rel="shortcut icon" href="amp_favicon.png" />

    <title>News Article</title>

    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>

      <amp-img
        src="mountains.jpg"
        layout="responsive"
        width="266"
        height="150"
      ></amp-img>
    </article>
  </body>
</html>
```

페이지를 새로고침하고 콘솔 출력을 확인합니다. 다음 메시지가 표시되어야 합니다.

<pre class="success-text">
AMP validation successful.
</pre>

### 자주 묻는 질문(FAQ)

- [DOM 리플로우란 무엇인가요?](http://stackoverflow.com/a/27637245)
- [레이아웃 속성이 지정되지 않은 경우에는 어떻게 하나요?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [너비와 높이가 정의되지 않은 경우에는 어떻게 하나요?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
