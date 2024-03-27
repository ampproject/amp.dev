---
'$title': 광고용 AMP 사양
$order: 3
formats:
  - ads
teaser:
  text: 표준에 대한 변경 사항을 제안하고 싶다면 [구현 목적] 문서에 코멘트를 남겨주세요.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

_표준에 대한 변경 사항을 제안하려면 [구현 목적](https://github.com/ampproject/amphtml/issues/4264)_ 문서에 코멘트를 남겨주세요.

AMPHTML 광고는 AMP 페이지에서 빠르고 효과적인 광고를 렌더링하는 데 적합한 메커니즘입니다. 브라우저에서 AMPHTML 광고 문서(이하 "AMP 광고")를 빠르고 원활하게 렌더링하고 사용자 경험의 품질 저하를 방지하려면 AMP 광고에서 일련의 유효성 검사 규칙이 준수되어야 합니다. [AMP 형식 규칙](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml)과 유사하게 AMPHTML 광고는 허용된 태그, 기능 및 확장 프로그램의 제한된 집합에 액세스할 수 있습니다.

## AMPHTML 광고 형식 규칙<a name="amphtml-ad-format-rules"></a>

하단에서 달리 명시되지 않는 한 이곳에 참조용으로 포함된 [AMP 형식 규칙](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html)이 광고에서 준수되어야 합니다. 예를 들어, AMPHTML 광고 [상용구](#boilerplate)는 AMP 표준 상용구와는 차이가 있습니다.

또한 광고에서 다음 규칙이 준수되어야 합니다.

<table>
<thead><tr>
  <th>규칙</th>
  <th>설명</th>
</tr></thead>
<tbody>
<tr>
<td>
<code>&lt;html ⚡4ads></code> 또는 <code>&lt;html amp4ads></code> 유형을 사용해야 함.</td>
<td>검사기가 광고 문서를 일반 AMP 문서 또는 제한된 AMPHTML 문서로 식별하여 적절히 배정할 수 있습니다.</td>
</tr>
<tr>
<td>런타임 스크립트로 <code>https://ampjs.org/v0.js</code> 대신 <code>&lt;script async src="https://ampjs.org/amp4ads-v0.js"></script></code> 포함.</td>
<td>교차 출처 iframes에서 지원되는 AMPHTML 광고에 적합한 맞춤형 런타임 동작을 사용할 수 있습니다.</td>
</tr>
<tr>
<td>
<code>&lt;link rel="canonical"></code> 태그 포함 불가.</td>
<td>광고에 "비 AMP 정규 버전"이 없고 독립적인 검색 인덱싱이 지원되지 않으므로 자체 참조가 유용하지 않습니다.</td>
</tr>
<tr>
<td>
<code>&lt;meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code> 형식의 경우 HTML 헤드에 선택적 메타 태그를 식별자로 포함 가능. 이러한 메타 태그는 <code>amp4ads-v0.js</code> 스크립트보다 먼저 표시되어야 함. <code>vendor</code> 및<code>id</code>의 값은 [0-9a-zA-Z_-]만이 포함된 문자열. <code>type</code> 값은 <code>creative-id</code> 또는 <code>impression-id</code>.</td>
<td>사용자 지정 식별자는 효과 또는 광고를 식별하는 데 사용할 수 있습니다. 보고 또는 디버깅에 도움을 줄 수 있습니다. <br><br><p>예시:</p>
<pre>
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=creative-id,id=1283474">
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=impression-id,id=xIsjdf921S"></pre>
</td>
</tr>
<tr>
<td>
<code>&lt;amp-analytics></code> 가시성 추적은 <a>Issue #4018</a> 및 <a href="https://github.com/ampproject/amphtml/issues/4018">PR #4368</a>에 정의된 것처럼 <code>"visibilitySpec": { "selector": "amp-ad" }</code>를 통해 전체 광고 선택자만을 대상으로 함. 특히 광고의 요소 선택자는 대상으로 할 수 없음.</td>
<td>일부 사례에서 AMPHTML 광고가 iframe에서 광고를 렌더링하도록 선택할 수 있습니다. 이런 경우 호스트 페이지 분석은 전체 iframe만을 대상으로 하며 더욱 세밀하게 조정된 선택자에 대한 액세스는 허용되지 않습니다. <br><br> <p>예시:</p> <pre>
&lt;amp-analytics id="nestedAnalytics">
  &lt;script type="application/json">
  {
    "requests": {
      "visibility": "https://example.com/nestedAmpAnalytics"
    },
    "triggers": {
      "visibilitySpec": {
      "selector": "amp-ad",
      "visiblePercentageMin": 50,
      "continuousTimeMin": 1000
      }
    }
  }
  &lt;/script>
&lt;/amp-analytics>
</pre> <p>이러한 구성은 감싸는 광고의 50%가 1초간 지속적으로 표시될 경우 <code>https://example.com/nestedAmpAnalytics</code> URL로 요청을 전송합니다.</p>
</td>
</tr>
</tbody>
</table>

### 상용구 <a name="boilerplate"></a>

AMPHTML 광고에는 [일반 AMP 문서](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md)와는 다르고 훨씬 단순한 상용구 스타일 라인이 필요합니다.

[sourcecode:html]

<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>

[/sourcecode]

<em>설명:</em> <code>amp-boilerplate</code> 스타일은 AMP 런타임이 준비되고 숨김 처리를 해제할 수 있을 때까지 본문 콘텐츠를 숨깁니다. Javascript가 비활성화되거나 AMP 런타임이 로딩에 실패하더라도 기본 상용구를 통해 콘텐츠가 최종적으로 표시될 수 있습니다. 하지만 AMPHTML 광고에서는 Javascript가 전적으로 비활성화된 경우 AMPHTML 광고는 실행되지 않으며 어떤 광고도 표시되지 않습니다. 그렇기에 <code><noscript></code> 섹션도 필요 없는 것이죠. AMP 런타임 없는 경우 AMPHTML 광고가 의존하는 대다수의 요소(예: 가시성 추적을 위한 분석, 콘텐츠 표시를 위한 <code>amp-img</code>)는 지원되지 않으므로 오류가 있는 광고를 표시하기보단 아무 광고도 표시하지 않는 편이 낫습니다.

마지막으로 AMPHTML 광고 상용구는 <code>amp-boilerplate</code>보다는 <code>amp-a4a-boilerplate</code>를 사용합니다. 따라서 검사기가 쉽게 이를 식별하며 더 정확한 오류 메시지를 생성할 수 있어 개발자에게 유용합니다.

<a>일반 AMP 상용구</a>에 적용되는 상용구 텍스트 전환 규칙과 동일한 규칙이 적용됩니다.

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>규칙</th>
  <th>설명</th>
</tr></thead>
<tbody>
  <tr>
    <td>크리에이티브 CSS에서 <code>position:fixed</code> 및<code>position:sticky</code> 사용 금지.</td>
    <td>
<code>position:fixed</code>은 AMPHTML 광고가 의존하는 섀도 DOM에 포함되지 않습니다. 또한 AMP로 작성된 광고의 경우 이미 고정 포지션 사용이 허용되지 않습니다.</td>
  </tr>
  <tr>
    <td> <code>touch-action</code> 사용 금지.</td>
    <td>
<code>touch-action</code>을 조작 가능한 광고는 호스트 문서를 스크롤하는 사용자 기능을 저하할 수 있습니다.</td>
  </tr>
  <tr>
    <td>크리에이티브 CSS는 20,000 바이트로 제한.</td>
    <td>대용량 CSS 블록으로 인해 광고 크기가 너무 커지면 네트워크 지연이 늘어나고 페이지 성능이 저해됩니다.</td>
  </tr>
  <tr>
    <td>트랜지션 및 애니메이션에 추가 제한 사항 적용.</td>
    <td>광고가 화면이 표시되지 않거나 시스템 리소스가 부족한 경우에 광고에 포함된 모든 애니메이션을 중단하려면 AMP는 그러한 애니메이션을 제어할 수 있어야 합니다.</td>
  </tr>
  <tr>
    <td>특정 벤더 전용 접두어는 검사 목적의 접두어를 제외한 동일한 기호의 별칭으로 간주함. 즉 CSS 검사 규칙에서 <code>foo</code>가 금지된 경우 <code>-vendor-foo</code> 기호도 금지됨.</td>
    <td>일부 벤더 전용 접두어가 포함된 속성은 해당 규칙에 따라 금지되거나 제한된 속성에 동등한 기능을 제공합니다.<br><br><p>예시: <code>-webkit-transition</code> 및 <code>-moz-transition</code>은<code>transition</code>의 별칭으로 간주됩니다.  <code>transition</code>이 그대로 허용되는 컨텍스트에서만 해당 별칭도 허용됩니다(하단의 <a href="#selectors">선택자</a> 섹션 참조).</p>
</td>
  </tr>
</tbody>
</table>

#### CSS 애니메이션 및 트랜지션 <a name="css-animations-and-transitions"></a>

##### 선택자 <a name="selectors"></a>

마지막으로 AMPHTML 광고는 `amp-boilerplate`보다는 `amp-a4a-boilerplate`를 사용하므로 검사기에서 쉽게 식별할 수 있으며 보다 정확한 오류 메시지가 생성하여 개발자를 지원합니다.

- `transition`, `animation`, `transform`, `visibility` 또는`opacity` 속성만을 포함합니다.

  _설명:_ 페이지 성능에 필요한 경우 AMP 런타임이 컨텍스트의 클래스를 제거하여 애니메이션을 비활성화할 수 있습니다.

**적합**

[sourcecode:css]
.box {
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

**부적합**

CSS 클래스에서 속성이 허용되지 않습니다.

[sourcecode:css]
.box {
color: red; // non-animation property not allowed in animation selector
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

##### 트랜지션 및 애니메이션 지원 속성 <a name="transitionable-and-animatable-properties"></a>

트랜지션 적용 가능한 유일한 속성은 opacity(투명도 지정) 및 transform(변형)입니다.([설명](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/))

**적합**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**부적합**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**적합**

[sourcecode:css]
@keyframes turn {
from {
transform: rotate(180deg);
}

to {
transform: rotate(90deg);
}
}
[/sourcecode]

**부적합**

[sourcecode:css]
@keyframes slidein {
from {
margin-left: 100%;
width: 300%;
}

to {
margin-left: 0%;
width: 100%;
}
}
[/sourcecode]

### 허용되는 AMP 확장자 및 기본 태그 <a name="allowed-amp-extensions-and-builtins"></a>

다음은 AMPHTML 광고에서 _허용되는_ AMP 확장 모듈 및 AMP 기본 태그입니다. 명시적으로 열거되지 않은 확장자 또는 기본 태그는 허용되지 않습니다.

- [amp-accordion](https://amp.dev/documentation/components/amp-accordion)
- [amp-ad-exit](https://amp.dev/documentation/components/amp-ad-exit)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- [amp-anim](https://amp.dev/documentation/components/amp-anim)
- [amp-animation](https://amp.dev/documentation/components/amp-animation)
- [amp-audio](https://amp.dev/documentation/components/amp-audio)
- [amp-bind](https://amp.dev/documentation/components/amp-bind)
- [amp-carousel](https://amp.dev/documentation/components/amp-carousel)
- [amp-fit-text](https://amp.dev/documentation/components/amp-fit-text)
- [amp-font](https://amp.dev/documentation/components/amp-font)
- [amp-form](https://amp.dev/documentation/components/amp-form)
- [amp-img](https://amp.dev/documentation/components/amp-img)
- [amp-layout](https://amp.dev/documentation/components/amp-layout)
- [amp-lightbox](https://amp.dev/documentation/components/amp-lightbox)
- amp-mraid: 실험적으로 지원. 이 태그를 사용하려는 경우 [wg-monetization](https://github.com/ampproject/wg-monetization/issues/new)에서 이슈를 생성하세요.
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

포함되지 않은 대다수의 항목은 성능 개선 또는 AMPHTML 광고의 분석 간소화를 위해 누락되었습니다.

_예시:_ `<amp-ad>`는 이 목록에 포함되지 않습니다. 그 이유는 `<amp-ad>` 내부에 `<amp-ad>`가 허용될 경우 무제한으로 워터폴 방식의 광고 로딩이 이루어지기 때문이며 이는 AMPHTML 광고 성능 목표에 부합하지 않습니다.

_예시:_ `<amp-iframe>`는 이 목록에 포함되지 않습니다. 허용되지 않는 이유는 광고에서 임의의 Javascript를 실행하고 임의의 콘텐츠를 로드하는 데 이 태그를 사용할 수 있기 때문입니다. 이러한 기능을 사용하고자 하는 광고는 <a>a4aRegistry</a> 엔트리에서 <code>false</code>를 반환하거나 기존의 '3p iframe' 광고 렌더링 메커니즘을 사용해야 합니다.

_예시:_ `<amp-facebook>`, `<amp-instagram>`, `<amp-twitter>` 및 `<amp-youtube>`는 모두 `<amp-iframe>`과 동일한 사유로 포함되지 않습니다. 해당 태그들은 iframes를 생성하여 리소스가 무제한으로 사용될 수 있습니다.

_예시:_ `<amp-ad-network-*-impl>`는 목록에 포함되지 않습니다. `<amp-ad>` 태그는 구현 태그에 대한 위임을 처리합니다. 광고에 이러한 태그가 직접 포함되어선 안 됩니다.

_예시:_ `<amp-lightbox>`는 아직 포함되지 않습니다. 그 이유는 일부 AMPHTML 광고가 iframe에서 렌더링될 수 있으며 현재로서는 iframe 외부에서 광고가 확장할 수 있는 메커니즘이 없기 때문입니다. 향후 입증된 수요가 있을 경우 해당 태그 지원이 추가될 수 있습니다.

### HTML 태그 <a name="html-tags"></a>

아래 항목은 AMPHTML 광고에서 _허용되는_ 태그입니다. 명시적으로 허용되지 않은 태그는 사용 금지입니다. 이 목록은 일반 [AMP 태그 추가 허용 목록](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/../../spec/amp-tag-addendum.md)의 하위 집합입니다. 해당 목록과 마찬가지로 이 목록의 항목도 [HTML 요소](http://www.w3.org/TR/html5/single-page.html#html-elements)의 섹션 4에 명시된 HTML5 사양과 일치하는 순서로 열거됩니다.

포함되지 않은 대다수의 항목은 성능 개선이 목적이거나 HTML5 표준이 아닌 태그이므로 누락되었습니다. 예를 들어 `<noscript>` 태그가 누락된 이유는 AMPHTML 광고가 사용 가능한 JavaScript에 의존하므로 `<noscript>` 블록은 실행되지 않으며 결과적으로 광고 크기가 커지고 대역폭과 지연만 소모될 것이기 때문입니다. 이와 유사하게 `<acronym>`, `<big>` 등도 HTML5와 호환되지 않으므로 허용되지 않습니다.

#### 4.1 루트 요소 <a name="41-the-root-element"></a>

4.1.1 `<html>`

- `<html ⚡4ads>` 또는 `<html amp4ads>` 유형을 사용해야 합니다.

#### 4.2 문서 메타데이터 <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- `<link rel=stylesheet>`를 제외한 `<link rel=...>` 태그는 허용되지 않습니다.

- **참고:** 일반 AMP와는 달리 `<link rel="canonical">` 태그는 허용되지 않습니다.

  4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 섹션 <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>` 및 `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 콘텐츠 그룹 지정<a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 텍스트 레벨 시맨틱 <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 편집<a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 임베디드 콘텐츠 <a name="47-embedded-content"></a>

- 4.7 임베디드 콘텐츠는 `<amp-img>` 또는 `<amp-video>` 등의 AMP 태그를 통해서만 지원됩니다.

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

HTML5 네임스페이스에 SVG 태그가 포함되지 않으며 해당 태그들은 섹션 ID 없이 하단에 열거되어 있습니다.

` <svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<title> `

#### 4.9 태뷸러 데이터<a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 양식 <a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 스크립팅 <a name="411-scripting"></a>

- 일반 AMP 문서처럼 광고의 `<head>` 태그에도 `<script async src="https://ampjs.org/amp4ads-v0.js"></script>` 태그가 포함되어야 합니다.
- 일반 AMP와 달리 `<noscript>`는 허용되지 않습니다.
  - _설명:_ AMPHTML 광고의 경우 Javascript 사용이 약간이라도 가능해야 하므로 AMPHTML 광고에서 `<noscript>` 블록은 쓸모가 없으며 네트워크 대역폭만 소모합니다.
- 일반 AMP와는 달리 `<script type="application/ld+json">`은 허용되지 않습니다.
  - _설명:_ JSON LD는 호스트 페이지의 구조화된 데이터 마크업에 사용됩니다. 하지만 광고는 스탠드얼론 문서가 아니며 구조화된 데이터를 포함하지 않습니다. 내부의 JSON LD 블록은 네트워크 대역폭만 소모합니다.
- 모든 기타 스크립팅 규칙 및 예외는 일반 AMP 규칙 및 예외와 일치합니다.
