---
'$title': AMP HTML 사양
$order: 8
formats:
  - websites
teaser:
  text: AMP HTML은 특정 기본 성능 특성을 보장하는 방식으로 뉴스 기사와 같은 콘텐츠 페이지를 작성하기위한 HTML의 하위 집합입니다.
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-format.md.
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

AMP HTML은 특정 기본 성능 특성을 보장하는 방식으로 뉴스 기사와 같은 콘텐츠 페이지를 작성하기위한 HTML의 하위 집합입니다.

HTML의 하위 집합이기 때문에 HTML을 통해 사용할 수있는 전체 태그 및 기능 집합에 몇 가지 제한이 있지만 새로운 렌더링 엔진을 개발할 필요가 없습니다. 기존 사용자 에이전트는 다른 모든 HTML과 마찬가지로 AMP HTML을 렌더링 할 수 있습니다.

[tip type="read-on"] If you're primarily interested in what's allowed in AMP and what isn't, watch our [primer video on AMP's limitations](https://www.youtube.com/watch?v=Gv8A4CktajQ). [/tip]

또한 AMP HTML 문서를 웹 서버에 업로드하고 다른 HTML 문서처럼 제공 할 수 있습니다. 서버에 대한 특별한 구성이 필요하지 않습니다. 그러나 AMP 문서를 프록시하는 특수 AMP 제공 시스템을 통해 선택적으로 제공되도록 설계되었습니다. 이러한 문서는 고유 한 출처에서 제공되며 추가 성능 이점을 제공하는 문서에 변환을 적용 할 수 있습니다. 이러한 서비스 시스템이 수행 할 수있는 불완전한 최적화 목록은 다음과 같습니다.

- 이미지 참조를 뷰어의 뷰포트에 맞는 크기의 이미지로 바꿉니다.
- 스크롤없이 볼 수있는 부분에 표시되는 인라인 이미지입니다.
- 인라인 CSS 변수.
- 확장 된 구성 요소를 미리로드합니다.
- HTML 및 CSS를 축소합니다.

AMP HTML은 기여되었지만 중앙에서 관리되고 호스팅되는 맞춤 요소 집합을 사용하여 AMP HTML 문서에서 찾을 수있는 이미지 갤러리와 같은 고급 기능을 구현합니다. 사용자 정의 CSS를 사용하여 문서의 스타일을 지정할 수 있지만 사용자 정의 요소를 통해 제공되는 것 이상으로 작성된 JavaScript는 성능 목표에 도달 할 수 없습니다.

콘텐츠 제작자는 AMP 형식을 사용하여 AMP 파일의 콘텐츠를 제 3자가 크롤링 (robots.txt 제한에 따름), 캐시 및 표시 할 수 있도록합니다.

## 공연<a name="performance"></a>

예측 가능한 성능은 AMP HTML의 핵심 설계 목표입니다. 주로 사용자가 페이지의 콘텐츠를 소비 / 사용할 수있을 때까지 시간을 단축하는 것을 목표로합니다. 구체적으로 이것은 다음을 의미합니다.

- 문서를 렌더링하고 완전히 레이아웃하는 데 필요한 HTTP 요청을 최소화해야합니다.
- 이미지 또는 광고와 같은 리소스는 사용자가 볼 가능성이있는 경우에만 다운로드해야합니다.
- 브라우저는 해당 리소스를 가져 오지 않고도 페이지의 모든 리소스에 필요한 공간을 계산할 수 있어야합니다.

## AMP HTML 형식<a name="the-amp-html-format"></a>

### 샘플 문서<a name="sample-document"></a>

[sourcecode:html]

<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Sample document</title>
    <link rel="canonical" href="./regular-html-version.html" />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <style amp-custom>
      h1 {
        color: red;
      }
    </style>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Article headline",
        "image": ["thumbnail1.jpg"],
        "datePublished": "2015-02-05T08:00:00+08:00"
      }
    </script>
    <script
      async
      custom-element="amp-carousel"
      src="https://ampjs.org/v0/amp-carousel-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-ad"
      src="https://ampjs.org/v0/amp-ad-0.1.js"
    ></script>
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
    <script async src="https://ampjs.org/v0.js"></script>
  </head>
  <body>
    <h1>Sample document</h1>
    <p>
      Some text
      <amp-img src="sample.jpg" width="300" height="300"></amp-img>
    </p>
    <amp-ad
      width="300"
      height="250"
      type="a9"
      data-aax_size="300x250"
      data-aax_pubname="test123"
      data-aax_src="302"
    >
    </amp-ad>
  </body>
</html>
[/sourcecode]

### 필수 마크 업<a name="required-markup"></a>

AMP HTML 문서는

- <a name="dctp"></a>doctype `<!doctype html>` . [🔗](#dctp)
- <a name="ampd"></a>최상위 `<html ⚡>` 태그를 포함합니다 ( `<html amp>` 도 허용됨). [🔗](#ampd)
- <a name="crps"></a>`<head>` 및 `<body>` 태그를 포함합니다 (HTML에서는 선택 사항 임). [🔗](#crps)
- <a name="canon"></a>AMP HTML 문서의 일반 HTML 버전을 가리키는 `<link rel="canonical" href="$SOME_URL">` 태그를 머리 안에 포함하거나 그러한 HTML 버전이없는 경우 자체를 가리 킵니다. [🔗](#canon)
- <a name="chrs"></a>head 태그의 첫 번째 자식으로 `<meta charset="utf-8">` 태그를 포함합니다. [🔗](#chrs)
- <a name="vprt"></a>head 태그 안에 `<meta name="viewport" content="width=device-width">` 태그를 포함합니다. 또한 `minimum-scale=1` 및 `initial-scale=1` 을 포함하는 것이 좋습니다. [🔗](#vprt)
- <a name="scrpt"></a>head 태그 안에 `<script async src="https://ampjs.org/v0.js"></script>` 태그를 포함합니다. [🔗](#scrpt)
- <a name="boilerplate"></a>head 태그에 [AMP 상용구 코드](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md) ( `head > style[amp-boilerplate]` 및 `noscript > style[amp-boilerplate]` )를 포함합니다. [🔗](#boilerplate)

### 메타 데이터<a name="metadata"></a>

AMP HTML 문서는 표준화 된 메타 데이터 ( [Open Graph Protocol](http://ogp.me/) , [Twitter Cards](https://dev.twitter.com/cards/overview) 등)로 주석 처리하는 것이 좋습니다.

또한 AMP HTML 문서는 [schema.org/CreativeWork](https://schema.org/CreativeWork) 또는 [schema.org/NewsArticle](https://schema.org/NewsArticle) 또는 [schema.org/BlogPosting](https://schema.org/BlogPosting) 과 같은보다 구체적인 유형으로 마크 업하는 것이 좋습니다.

### HTML 태그<a name="html-tags"></a>

HTML 태그는 AMP HTML에서 변경없이 사용할 수 있습니다. 특정 태그에는 동등한 맞춤 태그 (예 : `<img>` 및 `<amp-img>` )가 있으며 다른 태그는 완전히 금지됩니다.

<table>
  <tr>
    <th width="30%">꼬리표</th>
    <th>AMP HTML의 상태</th>
  </tr>
  <tr>
    <td width="30%">script</td>
    <td>유형이 <code>application/ld+json</code> , <code>application/json</code> 또는 <code>text/plain</code> 이 아닌 경우 금지됩니다. (필요에 따라 실행 불가능한 다른 값을 추가 할 수 있습니다.) 예외는 AMP 런타임을로드하기위한 필수 스크립트 태그와 확장 구성 요소를로드하기위한 스크립트 태그입니다.</td>
  </tr>
  <tr>
    <td width="30%">noscript</td>
    <td>Allowed. Can be used anywhere in the document. If specified, the content inside the <code>&lt;noscript></code> element displays if JavaScript is disabled by the user.</td>
  </tr>
  <tr>
    <td width="30%">base</td>
    <td>금지.</td>
  </tr>
  <tr>
    <td width="30%">img</td>
    <td>Replaced with <code>amp-img</code>.<br>         Please note: <code>&lt;img></code> is a <a href="https://www.w3.org/TR/html5/syntax.html#void-elements">Void Element according to HTML5</a>, so it does not have an end tag. However, <code>&lt;amp-img></code> does have an end tag <code>&lt;/amp-img></code>.</td>
  </tr>
    <tr>
    <td width="30%">picture</td>
    <td>Prohibited. Serve different image formats by using the <a href="https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders?format=websites">fallback</a> attribute or provide multiple <a href="https://amp.dev/documentation/components/amp-img#attributes"><code>srcset</code> on <code>&lt;amp-img></code></a>.</td>
  </tr>
  <tr>
    <td width="30%">video</td>
    <td>
<code>amp-video</code> 로 대체되었습니다.</td>
  </tr>
  <tr>
    <td width="30%">audio</td>
    <td>
<code>amp-audio</code> 로 대체되었습니다.</td>
  </tr>
  <tr>
    <td width="30%">iframe</td>
    <td>
<code>amp-iframe</code> 대체되었습니다.</td>
  </tr>
    <tr>
    <td width="30%">frame</td>
    <td>금지.</td>
  </tr>
  <tr>
    <td width="30%">frameset</td>
    <td>금지.</td>
  </tr>
  <tr>
    <td width="30%">object</td>
    <td>금지.</td>
  </tr>
  <tr>
    <td width="30%">param</td>
    <td>금지.</td>
  </tr>
  <tr>
    <td width="30%">applet</td>
    <td>금지.</td>
  </tr>
  <tr>
    <td width="30%">embed</td>
    <td>금지.</td>
  </tr>
  <tr>
    <td width="30%">form</td>
    <td>허용됩니다. <a href="https://amp.dev/documentation/components/amp-form">amp-form</a> 확장을 포함해야합니다.</td>
  </tr>
  <tr>
    <td width="30%">input elements</td>
    <td>Mostly allowed with <a href="https://amp.dev/documentation/components/amp-form#inputs-and-fields">exception of some input types</a>, namely, <code>&lt;input type="button"></code>, <code>&lt;button type="image"></code> are invalid. Related tags are also allowed: <code>&lt;fieldset></code>, <code>&lt;label></code>
</td>
  </tr>
  <tr>
    <td width="30%">button</td>
    <td>허용됩니다.</td>
  </tr>
  <tr>
    <td width="30%"><code>style</code></td>
    <td>
<a href="#boilerplate">amp-boilerplate에 필요한 스타일 태그입니다</a> . 사용자 지정 스타일 지정을 위해 head 태그에 하나의 추가 스타일 태그가 허용됩니다. 이 스타일 태그에는 <code>amp-custom</code> 속성이 있어야합니다. <a href="#cust">🔗</a>
</td>
  </tr>
  <tr>
    <td width="30%">link</td>
    <td>
<a>microformats.org</a>에 등록된 <code>rel</code> 값은 허용됨. <code>rel</code> 값이 허용 목록에서 누락된 경우, <a href="https://github.com/ampproject/amphtml/issues/new">이슈를 제출해 주세요</a>. <code>stylesheet</code> 및  <code>preconnect</code>, <code>prerender</code>, <code>prefetch</code>처럼 브라우저에 부작용을 초래하는 기타 값은 허용되지 않습니다. 허용 목록에 포함된 글꼴 제공 업체에서 스타일시트를 가져오는 특수한 사례가 있습니다.</td>
  </tr>
  <tr>
    <td width="30%">meta</td>
    <td>
<code>http-equiv</code> 속성은 특정 허용 값에 사용할 수 있습니다. 자세한 내용은 <a href="https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii">AMP 유효성 검사기 사양</a> 을 참조하세요.</td>
  </tr>
  <tr>
    <td width="30%"><code>a</code></td>
    <td>
<code>href</code> 속성 값은 <code>javascript:</code> 시작하지 않아야합니다. 설정된 경우 <code>target</code> 속성 값은 <code>_blank</code> 여야합니다. 그렇지 않으면 허용됩니다. <a href="#ancr">🔗</a>
</td>
  </tr>
  <tr>
    <td width="30%">svg</td>
    <td>대부분의 SVG 요소가 허용됩니다.</td>
  </tr>
</table>

유효성 검사기 구현 시 HTML5 사양에 기반하며 상단의 태그들은 제거된 허용 목록을 사용해야 합니다. [AMP 태그 부록](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-tag-addendum.md)을 참조하세요.

### 코멘트<a name="comments"></a>

조건부 HTML 주석은 허용되지 않습니다.

### HTML 속성<a name="html-attributes"></a>

`on` 시작하는 속성 이름 (예 : `onclick` 또는 `onmouseover` )은 AMP HTML에서 허용되지 않습니다. 리터럴 이름을 가진 속성 `on` (접미 말 없음) 허용됩니다.

xmlns, xml : lang, xml : base 및 xml : space와 같은 XML 관련 속성은 AMP HTML에서 허용되지 않습니다.

`i-amp-` 프리픽스가 붙은 내부 AMP 속성은 AMP HTML에서 허용되지 않습니다.

### 클래스<a name="classes"></a>

Internal AMP class names prefixed with `-amp-` and `i-amp-` are disallowed in AMP HTML.

`amp-` 접두사가 붙은 클래스 이름의 의미는 [AMP 문서](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-css-classes.md) 를 참조하십시오. 이러한 클래스의 사용이 허용되며 AMP 런타임 및 확장의 일부 기능을 맞춤 설정할 수 있습니다.

다른 모든 제작 된 클래스 이름은 AMP HTML 마크 업에서 허용됩니다.

### ID<a name="ids"></a>

Certain ID names are disallowed in AMP HTML, such as IDs prefixed with `-amp-` and `i-amp-` that may conflict with internal AMP IDs.

`amp-access` 와 같이 이러한 확장에서 제공하는 기능과 충돌하지 않도록 `amp-` 및 `AMP` ID를 사용하기 전에 특정 확장에 대한 AMP 문서를 참조하세요.

View the full list of disallowed ID names by searching for `mandatory-id-attr` [here](https://github.com/ampproject/amphtml/blob/main/docs/spec/../validator/validator-main.protoascii).

### 연결<a name="links"></a>

`javascript:` 스키마는 허용되지 않습니다.

### 스타일 시트<a name="stylesheets"></a>

주요 시맨틱 태그 및 AMP 사용자 정의 요소는 기본 스타일과 함께 제공되어 반응 형 문서를 합리적으로 쉽게 작성할 수 있습니다. 기본 스타일을 선택 해제하는 옵션은 나중에 추가 될 수 있습니다.

#### @-규칙<a name="-rules"></a>

스타일 시트에는 다음 @-규칙이 허용됩니다.

`@font-face` , `@keyframes` , `@media` , `@page` , `@supports` .

`@import` 는 허용되지 않습니다. 다른 것들은 향후 추가 될 수 있습니다.

#### 작성자 스타일 시트<a name="author-stylesheets"></a>

작성자는 문서 헤드 또는 인라인 스타일에있는 단일 `<style amp-custom>` 태그를 사용하여 문서에 사용자 정의 스타일을 추가 할 수 있습니다.

`@keyframes` 규칙은 `<style amp-custom>` 에서 허용됩니다. 그러나 너무 많은 경우 AMP 문서의 끝에 있어야하는 추가 `<style amp-keyframes>` 태그에 배치하는 것이 좋습니다. 자세한 내용은이 문서의 [키 프레임 스타일 시트](#keyframes-stylesheet) 섹션을 참조하십시오.

#### 선택자<a name="selectors"></a>

작성자 스타일 시트의 선택기에는 다음 제한 사항이 적용됩니다.

##### 클래스 및 태그 이름<a name="class-and-tag-names"></a>

Class names, IDs, tag names and attributes, in author stylesheets, may not start with the string `-amp-` and `i-amp-`. These are reserved for internal use by the AMP runtime. It follows, that the user's stylesheet may not reference CSS selectors for `-amp-` classes, `i-amp-` IDs and `i-amp-` tags and attributes. These classes, IDs and tag/attribute names are not meant to be customized by authors. Authors, however, can override styles of `amp-` classes and tags for any CSS properties not explicitly forbidden by these components' spec.

To prevent usage of attribute selectors to circumvent class name limitations it is generally not allowed for CSS selectors to contain tokens and strings starting with `-amp-` and `i-amp-`.

#### 중대한<a name="important"></a>

`!important` 한정자를 사용할 수 없습니다. 이는 AMP가 요소 크기 조정 불변을 적용 할 수 있도록하는 데 필요한 요구 사항입니다.

#### 속성<a name="properties"></a>

AMP는 일반 브라우저에서 GPU 가속화가 지원되는 속성의 트랜지션 및 애니메이션만 허용합니다. 현재 허용되는 목록은 다음과 같습니다: `opacity`, `transform`(`-vendorPrefix-transform`도 허용).

다음 예시에서 `<property>`는 상단의 허용 목록에 포함되어야 합니다.

- `transition <property>` (또한 -vendorPrefix-transition)
- `@keyframes name { from: {<property>: value} to {<property: value>} }` (또한 `@-vendorPrefix-keyframes` )

#### 최대 크기<a name="maximum-size"></a>

작성자 스타일 시트 또는 인라인 스타일이 함께 75,000 바이트보다 큰 경우 유효성 검사 오류입니다.

### 키 프레임 스타일 시트<a name="keyframes-stylesheet"></a>

`<style amp-custom>` 외에도 제작자는 키 프레임 애니메이션에 특별히 허용되는 `<style amp-keyframes>` 태그를 추가 할 수도 있습니다.

다음 제한 사항이 `<style amp-keyframes>` 태그에 적용됩니다.

1. 문서의 `<body>` 요소의 마지막 자식으로 만 배치 될 수 있습니다.
2. 만 포함 할 수 있습니다 `@keyframes` , `@media` , `@supports` 규칙과 조합.
3. 500,000 바이트보다 클 수 없습니다.

`<style amp-keyframes>` 태그가 존재하는 이유는 키 프레임 규칙이 적당히 복잡한 애니메이션의 경우에도 종종 부피가 커서 CSS 파싱 속도가 느려지고 콘텐츠가 가득한 첫 번째 페인트로 이어지기 때문입니다. 그러나 이러한 규칙은 종종 `<style amp-custom>` 에 부과 된 크기 제한을 초과합니다. 이러한 키 프레임 선언을 `<style amp-keyframes>` 의 문서 하단에 배치하면 크기 제한을 초과 할 수 있습니다. 또한 키 프레임은 렌더링 차단이 아니기 때문에 콘텐츠가있는 첫 번째 페인트를 차단하여 파싱하는 것도 방지합니다.

예:

[sourcecode:html]

<style amp-keyframes>
@keyframes anim1 {}

@media (min-width: 600px) {
  @keyframes anim1 {}
}
</style>
</body>
[/sourcecode]

### 맞춤 글꼴<a name="custom-fonts"></a>

작성자는 사용자 지정 글꼴용 스타일시트도 포함할 수 있습니다. 지원되는 2가지 방식은 허용 목록의 글꼴 제공 업체로 연결되는 태그 링크 및 `@font-face` 사용입니다.

예:

[sourcecode:html]

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Tangerine"
/>
[/sourcecode]

폰트 제공 업체가 CSS 전용 통합을 지원하거나 HTTPS를 통해 지원되는 경우 허용 목록에 포함할 수 있습니다. 현재 태그 링크를 통한 글꼴 제공 시 허용되는 출처는 다음과 같습니다.

- Fonts.com : `https://fast.fonts.net`
- Google 글꼴 : `https://fonts.googleapis.com`
- Font Awesome : `https://maxcdn.bootstrapcdn.com, https://use.fontawesome.com`
- [Typekit](https://helpx.adobe.com/typekit/using/google-amp.html): `https://use.typekit.net/kitId.css` (replace `kitId` accordingly)

구현 자 참고 :이 목록에 추가하려면 AMP 캐시 CSP 규칙을 변경해야합니다.

Authors are free to include all custom fonts via an `@font-face` CSS instruction via their custom CSS. Fonts included via `@font-face` must be fetched via the HTTP or HTTPS scheme.

## AMP 런타임<a name="amp-runtime"></a>

AMP 런타임은 모든 AMP 문서 내에서 실행되는 자바 스크립트의 일부입니다. AMP 맞춤 요소에 대한 구현을 제공하고, 리소스로드 및 우선 순위를 관리하며, 개발 중에 사용할 AMP HTML 용 런타임 유효성 검사기를 선택적으로 포함합니다.

AMP 런타임은 AMP 문서의 필수 `<script src="https://ampjs.org/v0.js"></script>` 태그를 통해로드됩니다.<code></code> .

AMP 런타임은 모든 페이지의 개발 모드에 배치 할 수 있습니다. 개발 모드는 삽입 된 페이지에서 AMP 유효성 검사를 트리거하여 유효성 검사 상태와 모든 오류를 자바 스크립트 개발자 콘솔에 내 보냅니다. 개발 모드는 페이지 URL에 `#development=1` 을 추가하여 실행할 수 있습니다.

## 자원<a name="resources"></a>

AMP HTML 파일에 이미지, 동영상, 오디오 파일 또는 광고와 같은 리소스를 포함할 시에는 `<amp-img>` 등의 사용자 지정 요소를 사용해야 합니다. 사용자에게 리소스가 로드 및 표시되는 여부와 그 시점이 AMP 런타임을 통해 결정되므로 "관리되는 리소스"라고 지칭합니다.

AMP 런타임의로드 동작에 대한 특별한 보장은 없지만 일반적으로 리소스를 충분히 빠르게로드하여 사용자가 가능한 경우보고 싶어하는 시간에로드되도록해야합니다. 런타임은 현재 뷰포트에있는 리소스의 우선 순위를 지정하고 뷰포트의 변경 사항을 예측하고 그에 따라 리소스를 미리로드해야합니다.

AMP 런타임은 언제든지 현재 뷰포트에없는 리소스를 언로드하거나 iframe과 같은 리소스 컨테이너를 재사용하여 전체 RAM 소비를 줄일 수 있습니다.

## AMP 구성 요소<a name="amp-components"></a>

AMP HTML은 “AMP 컴포넌트”라는 사용자 지정 요소를 활용하여 `<img>` 및 `<video>` 등의 기본 제공 리로스 로딩 태그를 대체하고 이미지 라이트박스 또는 캐러셀 등의 복잡한 인터랙션 기능을 구현합니다.

지원되는 구성 요소에 대한 자세한 내용은 [AMP 구성 요소 사양](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-components.md) 을 참조하세요.

지원되는 AMP 구성 요소에는 두 가지 유형이 있습니다.

1. 내장
2. 펼친

기본 제공 구성 요소는 항상 AMP 문서에서 사용할 수 있으며 `<amp-img>` 와 같은 전용 맞춤 요소가 있습니다. 확장 된 구성 요소는 문서에 명시 적으로 포함되어야합니다.

### 공통 속성<a name="common-attributes"></a>

#### `layout` , `width` , `height` , `media` , `placeholder` , `fallback`<a name="layout-width-height-media-placeholder-fallback"></a>

이러한 속성은 요소의 레이아웃을 정의합니다. 여기서 핵심 목표는 요소를 표시 할 수 있고 JavaScript 또는 원격 리소스를 다운로드하기 전에 해당 공간을 적절하게 예약 할 수 있도록하는 것입니다.

See the [AMP Layout System](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-layout.md) for details about the layout system.

#### `on` <a name="on"></a>

`on` 속성은 요소에 이벤트 핸들러를 설치하는 데 사용됩니다. 지원되는 이벤트는 요소에 따라 다릅니다.

구문의 값은 다음 형식의 간단한 도메인 특정 언어입니다.

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
[/sourcecode]

예 : `on="tap:fooId.showLightbox"`

`methodName` 이 생략되면 요소에 대해 정의 된 경우 기본 메소드가 실행됩니다. 예 : `on="tap:fooId"`

문서화 된 경우 일부 작업은 인수를 허용 할 수 있습니다. 인수는 `key=value` 표기법에서 괄호 사이에 정의됩니다. 허용되는 값은 다음과 같습니다.

- 인용되지 않은 단순 문자열 : `simple-value` ;
- 인용 된 문자열 : `"string value"` 또는 `'string value'` ;
- 부울 값 : `true` 또는 `false` ;
- 숫자 : `11` 또는 `1.1` .

세미콜론으로 두 이벤트를 구분하여 요소에서 여러 이벤트를 수신 할 수 있습니다 `;` .

예 : `on="submit-success:lightbox1;submit-error:lightbox2"`

[AMP 작업 및 이벤트](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-actions-and-events.md) 에 대해 자세히 알아보세요.

### 확장 구성 요소<a name="extended-components"></a>

확장 구성 요소는 반드시 AMP 런타임과 함께 제공되지 않는 구성 요소입니다. 대신 문서에 명시 적으로 포함되어야합니다.

확장 구성 요소는 다음과 같이 문서 헤드에 `<script>` 태그를 포함하여로드됩니다.

[sourcecode:html]

<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>

[/sourcecode]

`<script>` 태그에는 `async` 특성이 있어야하며 요소의 이름을 참조하는 `custom-element` 특성이 있어야합니다.

런타임 구현은 이름을 사용하여 이러한 요소에 대한 자리 표시자를 렌더링 할 수 있습니다.

The script URL must start with `https://cdn.ampproject.org` and must follow a very strict pattern of `/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js`.

##### URL<a name="url"></a>

확장 구성 요소의 URL은 다음과 같은 형식입니다.

[sourcecode:http]
https://ampjs.org/$RUNTIME_VERSION/$ELEMENT_NAME-$ELEMENT_VERSION.js
[/sourcecode]

##### 버전 관리<a name="versioning"></a>

[AMP 버전 관리 정책을](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-versioning-policy.md) 참조하세요.

### 템플릿<a name="templates"></a>

템플릿은 언어 별 템플릿 및 제공된 JSON 데이터를 기반으로 HTML 콘텐츠를 렌더링합니다.

지원되는 템플릿에 대한 자세한 내용은 [AMP 템플릿 사양](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-templates.md) 을 참조하세요.

템플릿은 AMP 런타임과 함께 제공되지 않으며 확장 요소와 마찬가지로 다운로드해야합니다. 확장 구성 요소는 다음과 같이 문서 헤드에 `<script>` 태그를 포함하여로드됩니다.

[sourcecode:html]

<script
  async
  custom-template="amp-mustache"
  src="https://ampjs.org/v0/amp-mustache-0.2.js"
></script>

[/sourcecode]

The `<script>` tag must have an `async` attribute and must have a `custom-template` attribute referencing the type of the template. The script URL must start with `https://cdn.ampproject.org` and must follow a very strict pattern of `/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js`.

템플릿은 문서에서 다음과 같이 선언됩니다.

[sourcecode:html]
<template type="amp-mustache" id="template1">
Hello {% raw %}{{you}}{% endraw %}!
</template>
[/sourcecode]

`type` 속성은 필수이며 선언 된 `custom-template` 스크립트를 참조해야합니다.

`id` 속성은 선택 사항입니다. 개별 AMP 요소는 자체 템플릿을 검색합니다. 일반적인 시나리오에는 하위 항목 사이에서 또는 ID로 참조되는 `<template>` 찾는 AMP 요소가 포함됩니다.

템플릿 요소 내의 구문은 특정 템플릿 언어에 따라 다릅니다. 그러나 템플릿 언어는 AMP 내에서 제한 될 수 있습니다. 예를 들어, "템플릿"요소에 따라 모든 프로덕션은 올바른 형식의 유효한 DOM을 거쳐야합니다. AMP 유효 출력을 보장하기 위해 모든 템플릿 출력도 삭제됩니다.

템플릿의 구문 및 제한 사항에 대해 알아 보려면 [템플릿 설명서를 참조하십시오](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-templates.md#templates) .

##### URL<a name="url-1"></a>

확장 구성 요소의 URL은 다음과 같은 형식입니다.

[sourcecode:http]
https://ampjs.org/$RUNTIME_VERSION/$TEMPLATE_TYPE-$TEMPLATE_VERSION.js
[/sourcecode]

##### 버전 관리<a name="versioning-1"></a>

자세한 내용은 사용자 정의 요소 버전 관리를 참조하십시오.

## 보안<a name="security"></a>

AMP HTML 문서는 `unsafe-inline` 및 `unsafe-eval` 키워드를 포함하지 않는 콘텐츠 보안 정책과 함께 제공 될 때 오류를 트리거하지 않아야합니다.

AMP HTML 형식은 항상 그렇도록 설계되었습니다.

모든 AMP 템플릿 요소는 AMP 저장소에 제출되기 전에 AMP 보안 검토를 거쳐야합니다.

## SVG<a name="svg"></a>

현재 다음 SVG 요소가 허용됩니다.

- 기본 : "g", "glyph", "glyphRef", "image", "marker", "metadata", "path", "solidcolor", "svg", "switch", "view"
- 모양 : "circle", "ellipse", "line", "polygon", "polyline", "rect"
- text : "text", "textPath", "tref", "tspan"
- 렌더링 : "clipPath", "filter", "hkern", "linearGradient", "mask", "pattern", "radialGradient", "vkern"
- 특수 : "defs"(위의 모든 하위 항목이 여기에 허용됨), "symbol", "use"
- 필터 : "feColorMatrix", "feComposite", "feGaussianBlur", "feMerge", "feMergeNode", "feOffset", "foreignObject"
- ARIA : "desc", "title"

뿐만 아니라 다음 속성 :

- "xlink : href": "#"로 시작하는 URI 만 허용됩니다.
- "스타일"

## AMP 문서 검색<a name="amp-document-discovery"></a>

아래에 설명 된 메커니즘은 소프트웨어가 표준 문서에 대한 AMP 버전이 있는지 여부를 확인하는 표준화 된 방법을 제공합니다.

If an AMP document exists that is an alternative representation of a canonical document, then the canonical document should point to the AMP document via a `link` tag with the [relation "amphtml"](http://microformats.org/wiki/existing-rel-values#HTML5_link_type_extensions).

예:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html" />
[/sourcecode]

AMP 문서 자체는 "canonical"관계가있는 `link` 태그를 통해 표준 문서를 다시 가리킬 것으로 예상됩니다.

예:

[sourcecode:html]

<link
  rel="canonical"
  href="https://www.example.com/url/to/canonical/document.html"
/>
[/sourcecode]

(단일 리소스가 동시에 AMP _와_ 표준 문서 인 경우 표준 관계는 자신을 가리켜 야하며 "amphtml"관계가 필요하지 않습니다.)

AMP를 사용하는 시스템과의 광범위한 호환성을 위해 자바 스크립트를 실행하지 않고도 "amphtml"관계를 읽을 수 있어야합니다. (즉, 태그는 자바 스크립트를 통해 삽입되지 않고 원시 HTML에 있어야합니다.)
