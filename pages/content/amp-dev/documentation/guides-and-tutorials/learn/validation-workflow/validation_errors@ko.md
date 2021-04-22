---
$title: AMP 유효성 검사 오류
---

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

유효한 AMP 문서에는 유효성 검사 오류가 있어서는 안 됩니다.
이 문서의 목적은 [AMP 페이지의 유효성을 검사](validate_amp.md)할 때
발견할 수 있는 모든 유효성 검사 오류를 더 잘 이해하고
해결할 수 있도록 도움을 드리는 것입니다.
유효성 검사 오류에 관한 전체 내용을 대략적으로 살펴보려면
[AMP 유효성 검사 도구 사양](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)을 확인하시기 바랍니다.

## AMP HTML 태그와 속성 오류

### 필수 태그 누락

<table>
   <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>MANDATORY_TAG_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The mandatory tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>필수 HTML 태그를 추가(또는 수정)합니다.</td>
  </tr>
</table>

모든 AMP 문서에는 다음 태그가 있어야 합니다:

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

이러한 필수 태그에는 <a href="https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii">AMP 유효성 검사 도구 사양</a>에 `mandatory: true` 필드가 있어야 합니다.
이러한 태그는 [AMP 사양](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)에서도 언급됩니다.

### 다른 태그에 필요한 태그 누락

<table>
  </tr>
   <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>필요한 HTML 태그를 추가(또는 수정)합니다.</td>
  </tr>
</table>

유효성 검사 도구는 AMP 문서에서 확장 구성요소를 발견했으나
이에 상응하는 `<script>`를 찾을 수 없을 때
`TAG_REQUIRED_BY_MISSING` 오류를 표시합니다.

[확장 구성요소](../../../../documentation/components/index.html)는
맞춤 요소로서 AMP 문서에 명시적으로 포함되어야 합니다.
이 오류를 해결하려면 확장 구성요소의 참조 페이지로 이동한 다음
필요한 스크립트를 복사하여 AMP 문서 `<head>`에 붙여넣으세요.

### 허용되지 않는 태그

<table>
   <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>DISALLOWED_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The tag '%1' is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>허용되지 않는 태그를 삭제합니다.</td>
  </tr>
</table>

태그는 허용된 것만 사용할 수 있기 때문에 허용되지 않는 모든 태그를
나열한 목록은 존재하지 않습니다. 하지만 [AMP 사양](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)에서
허용되지 않는 태그의 광범위한 목록을 확인할 수 있습니다.

### 맞춤 자바스크립트는 허용되지 않음

<table>
   <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>DISALLOWED_SCRIPT_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"Custom JavaScript is not allowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>해당 자바스크립트 태그를 삭제합니다.</td>
  </tr>
</table>

AMP 형식에서는 AMP 프로젝트에서 자체 제공하는 자바스크립트 파일이 아닌
맞춤 자바스크립트를 페이지에 추가할 수 없습니다. 일반적으로 필요한 자바스크립트는
대부분 HTML 라이브러리에서 상응하는 구현 방식을 찾을 수 있습니다. [AMP
구성요소](../../../../documentation/components/index.html)에서 AMP HTML 페이지를
향상하는 데 사용할 수 있는 구성요소를 확인하세요.

필요한 자바스크립트 사용 사례를 찾을 수 없다면 AMP 프로젝트에
새로운 구성요소를 추가할 수도 있습니다. 자세한 내용은 AMP 프로젝트의
[참여하기](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md)
문서를 확인하세요.

### 필수 속성 누락

<table>
   <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>MANDATORY_ATTR_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The mandatory attribute '%1' is missing in tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>태그에 필수 속성을 추가합니다.</td>
  </tr>
</table>

[AMP 유효성 검사 도구 사양](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)에
AMP 태그의 필수 속성이 정의되어 있습니다.
태그를 검색하고
명시된 속성을 확인한 다음
`mandatory: true`가 있는지 확인하세요.
각 AMP 태그의 필수 속성은
태그 사양에도 명시되어 있습니다.

### 잘못된 속성 값

<table>
   <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>INVALID_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>속성을 유효한 값으로 수정합니다.</td>
  </tr>
</table>

이 오류는 HTML 태그에 이름은 허용되나
값은 허용되지 않는 속성이 있다는 의미입니다.
예를 들어 URL의 값이 잘못되었을 때 이 오류가 흔히 발생합니다.
모든 URL 값(`href` 및 `src` 속성)은 다음의
[가능한 속성 값](http://www.w3schools.com/tags/att_a_href.asp) 중 하나와 일치해야 합니다.

<strong>중요:</strong> AMP의 URL 값 대부분은 HTTPS를 요구합니다.
이 오류가 발생하는 이유가 분명하지 않다면
관련 AMP 태그 사양에서 속성이 HTTPS를
요구하는지 확인하시기 바랍니다.

### 허용되지 않는 속성

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>DISALLOWED_ATTR</td>
  </tr>
  <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The attribute '%1' may not appear in tag '%2'."</td>
  </tr>
  <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>HTML 태그에서 속성을 삭제합니다.</td>
  </tr>
</table>

속성은 허용된 것만 사용할 수 있기 때문에 허용되지 않는 모든 속성을 나열한 목록은 존재하지 않습니다.
각 태그에서 지원되는 속성을 확인하려면 HTML 태그를 검색한 다음
[AMP 유효성 검사 도구 사양](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)에서
`attrs`를 확인하시기 바랍니다.

태그별로 허용되는 구체적인 속성 외에도
모든 AMP 태그는 `$GLOBAL_ATTRS`에서 허용된 모든 속성을 사용할 수 있습니다.
접두사 `'data-'`가 사용된 속성도 모두 허용됩니다.

### 필수 텍스트가 누락되거나 잘못됨

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>MANDATORY_CDATA_MISSING_OR_INCORRECT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>태그에 필수 텍스트를 추가하거나 수정합니다.</td>
  </tr>
</table>

CDATA는 시작 및 끝 HTML 태그 사이에 위치한 콘텐츠 데이터이며
현재 허용 목록 및 금지 목록을 모두 사용하여 평가됩니다.
CDATA가 필수인 태그는 다음과 같습니다.

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

및

[sourcecode:html]
<style amp-custom>
[/sourcecode]

이 오류에 대한 상세 메시지는 다음 중 하나일 수 있습니다:

* "Mandatory style boilerplate (js enabled)"
* "Mandatory style boilerplate (noscript)"
* "Disallowed -amp- CSS class name prefix"
* "Disallowed !important attribute in CSS"
* "Disallowed &#64;charset in CSS"
* "Disallowed &#64;import in CSS"
* "Disallowed @namespace in CSS"
* "Disallowed @supports in CSS"
* "Disallowed @document in CSS"
* "Disallowed @page in CSS"
* "Disallowed @viewport in CSS"

### 태그 내 허용되지 않는 텍스트

<table>
   <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>CDATA_VIOLATES_DENYLIST</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>허용되지 않는 텍스트를 삭제합니다.</td>
  </tr>
</table>

특정 CSS 데이터는 필수적인 CSS AMP 규칙의
유효성을 검사하기 위해 금지되었습니다.

다음은 금지된 CSS 데이터 목록입니다.
([AMP 유효성 검사 도구 사양의 `disallowed_cdata_regex`](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)도 참조하시기 바랍니다.):

* `"\\.i?-amp-"` ("CSS -amp- class name prefix")
* `"!important"`
* `"charset"`
* `"&#64;import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### 태그의 속성 내에서 허용되지 않는 특성

<table>
   <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>DISALLOWED_PROPERTY_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The property '%1' in attribute '%2' in tag '%3' is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>해당 속성에서 허용되지 않는 특성을 삭제합니다.</td>
  </tr>
</table>

이 오류는 허용되지 않는 특성 이름이 속성 내에 있을 경우 발생합니다.
이 맥락에서 특성(property)이란 속성 내의 구조화된 키/값 데이터를 의미합니다.
예를 들어
`<meta name="viewport content="width=device-width;minimum-scale=1">`에서
`width`와 `minimum-scale`이 특성 이름입니다.

다음은 DISALLOWED_PROPERTY_IN_ATTR_VALUE 오류를 유발합니다:

`<meta name="viewport content="width=device-width;invalidfoo=1">`

다음의 예에서도
오류가 발생합니다:

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

다음과 같이 수정되어야 합니다: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`

### 잘못된 특성 값

<table>
   <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>잘못된 특성 값을 수정합니다.</td>
  </tr>
</table>

이 오류는 속성 내 특성 값이 잘못된 경우에 발생합니다.
이 맥락에서 특성(property)이란 속성 내의 구조화된 키/값 데이터를 의미합니다.
예를 들어
`<meta name="viewport content="width=device-width;minimum-scale=1">`에서
`device-width`와 `1`은 특성 값입니다.

다음은 INVALID_PROPERTY_VALUE_IN_ATTR_VALUE 오류를 유발합니다:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

참고: 값이 없는 속성(예: [`amp-video`](../../../../documentation/components/reference/amp-video.md) 구성요소의 `autoplay`, `controls`, `loop` 속성)을 출력하려고 할 때 HTML 개발 과정에서 `true`와 같이 기본값이지만 유효하지 않은 값(예: React를 사용하면 [기본적으로](https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true) `<amp-video autoplay="true" ...>`가 생성되는 경우)이 생성되는 경우 속성 이름을 값으로 출력하면 해결됩니다. 예를 들어 다음과 같습니다. `<amp-video autoplay="autoplay" ...>`

### URL 누락

<table>
  <tr>
    <td class="col-thirty"><strong>코드</strong></td>
    <td>MISSING_URL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>형식</strong></td>
    <td>"Missing URL for attribute '%1' in tag '%2'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>해결책</strong></td>
    <td>유효한 URL을 추가합니다.</td>
  </tr>
</table>

이 오류는 URL을 필요로 하는 속성에서 URL이 누락된 경우에 발생합니다.
예를 들어 `href`나 `src` 속성이 비어 있는 경우에 발생합니다.

### 잘못된 URL

<table>
  <tr>
    <td class="col-thirty"><strong>코드</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>형식</strong></td>
    <td>"Malformed URL '%3' for attribute '%1' in tag '%2'"</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>해결책</strong></td>
    <td>잘못된 URL을 수정합니다.</td>
  </tr>
</table>

이 오류는 속성에 URL이 포함되어 있으나
URL이 잘못된 경우에 발생합니다.

### 잘못된 URL 프로토콜

<table>
  <tr>
    <td class="col-thirty"><strong>코드</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>형식</strong></td>
    <td>Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>해결책</strong></td>
    <td>올바른 프로토콜로 변경합니다. 예를 들어 `http`를 `https`로 변경해야 할 수 있습니다.</td>
  </tr>
</table>

이 오류는 특정 프로토콜로 설정되어야 하는
`href` 또는 `src`가 포함된 태그에 발생합니다.
예를 들어 `https`를 필요로 하는 태그가 많습니다.

### 속성에서 필수 특성 누락

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The property '%1' is missing from attribute '%2' in tag '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>누락된 특성을 추가합니다.</td>
  </tr>
</table>

현재 이 오류는 다음과 같은 필수 특성이 누락된 경우에 발생합니다:

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

이 속성은 다음의 예상 태그를 참조합니다:

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### 상호 배타적인 속성

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>MUTUALLY_EXCLUSIVE_ATTRS</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>상호 배타적인 속성 중 하나를 삭제합니다.</td>
  </tr>
</table>

이 오류는 태그에 상호 배타적인 속성이 포함되어 있을 때 발생합니다.
예를 들어 다음 태그에서는 하나의 속성만 허용됩니다:

* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` 또는 `srcdoc`
* [`amp-jwplayer`](../../../../documentation/components/reference/amp-jwplayer.md): `data-media-id` 또는 `data-playlist-id`

### 목록에서 필수 속성 누락

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>MANDATORY_ONEOF_ATTR_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The tag '%1' is missing a mandatory attribute - pick one of %2." </td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>제공된 속성 중에서 누락된 필수 속성을 선택하여 추가합니다.</td>
  </tr>
</table>

이 오류는 태그에 필요한 여러 속성 중
하나의 필수 속성이 누락된 경우 발생합니다.
예를 들어 다음 태그의 경우 두 가지 필수 속성 중에 하나가 포함되어야 합니다:

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` 또는 `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` 또는 `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` 또는 `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` 또는 `data-videoid`

### 잘못된 상위 태그

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>WRONG_PARENT_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The parent tag of tag '%1' is '%2', but it can only be '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>태그를 필요한 상위 태그의 직접 하위 태그로 만듭니다.</td>
  </tr>
</table>

특정 태그는 먼 상위 요소가 아닌 직접 상위 태그를 필요로 합니다.
다음의 목록에서 특정 태그에 필요한
상위 태그(태그, 상위순)를 확인할 수 있습니다:

* `!doctype`에는 상위 태그 `root`가 필요합니다.
* `html`에는 상위 태그 `!doctype`이 필요합니다.
* `head`에는 상위 태그 `html`이 필요합니다.
* `body`에는 상위 태그 `html`이 필요합니다.
* `link`에는 상위 태그 `head`가 필요합니다.
* `meta`에는 상위 태그 `head`가 필요합니다.
* `style amp-custom`에는 상위 태그 `head`가 필요합니다.
* `style`에는 상위 태그 `boilerplate(noscript)`가 필요합니다.
* `noscript`에는 상위 태그 `head`가 필요합니다.
* `script`에는 상위 태그 `head`가 필요합니다.
* `source`에는 미디어 태그([`amp-audio`](../../../../documentation/components/reference/amp-audio.md), [`amp-video`](../../../../documentation/components/reference/amp-video.md) 등)가 필요합니다.

### 허용되지 않는 태그 상위 요소

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>DISALLOWED_TAG_ANCESTOR</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The tag '%1' may not appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>허용되지 않는 중첩 태그를 삭제(또는 이동)합니다.</td>
  </tr>
</table>

이 오류는 태그가 유효성이 검사되지 않는
다른 태그의 하위 요소일 때 발생합니다.
현재 이 오류의 유일한 예로 <code>template</code> 태그가 있습니다.
이 태그는 다른 <code>template</code> 태그 아래에 중첩되어서는 안 됩니다.

### 필수 태그 상위 요소

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>MANDATORY_TAG_ANCESTOR</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The tag '%1' may only appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>태그를 삭제하거나 특정 태그의 하위 요소로 만듭니다.</td>
  </tr>
</table>

필수 하위 요소는
[AMP 유효성 검사 도구 사양](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)에
`mandatory_ancestor`로 정의되어 있습니다.

이 오류는 다음 태그에
`mandatory_ancestor`(태그, 상위 요소)가 누락된 경우 발생합니다:

* `img`는 `noscript`의 하위 요소여야 합니다.
* `video`는 `noscript`의 하위 요소여야 합니다.
* `audio`는 `noscript`의 하위 요소여야 합니다.
* `noscript`는`body`의 하위 요소여야 합니다.

### 힌트가 있는 필수 태그 상위 요소

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>MANDATORY_TAG_ANCESTOR_WITH_HINT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?'</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>태그를 삭제하거나, 태그를 특정 태그의 하위 요소로 만들거나, 힌트 태그로 교체합니다.</td>
  </tr>
</table>

이 오류는 다음의 태그 중 하나가 AMP 문서에 있지만
필수 상위 태그에 제대로 중첩되어 있지 않은 경우 발생합니다:

* `img`는 `noscript` 상위 태그 내에 위치해서는 안 됩니다.
* `video`는 `noscript` 상위 태그 내에 위치해서는 안 됩니다.
* `audio`는 `noscript` 상위 태그 내에 위치해서는 안 됩니다.
* `noscript`는 `body` 상위 태그 내에 위치해서는 안 됩니다.

### 고유 태그 중복

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>DUPLICATE_UNIQUE_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The tag '%1' appears more than once in the document."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>AMP 문서에서 중복된 태그 중 하나를 삭제합니다.</td>
  </tr>
</table>

이 오류는 태그의 인스턴스가 정확히 하나만 허용되는 상황에서
중복이 발견된 경우 발생합니다.

모든 고유 태그를 나열하면 다음과 같습니다:

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
* `<meta viewport>`
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://cdn.ampproject.org/v0.js">`

### 스타일 및 레이아웃 오류 <a name="style-and-layout-errors"></a>

스타일과 레이아웃 오류를 살펴보기 전에
AMP에서
[스타일링](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md)과
[레이아웃](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)이 어떻게 작동하는지 알아보는 것이 좋습니다.
AMP 페이지는 HTML 페이지이기 때문에 HTML 페이지와 스타일링이 거의 유사합니다.
하지만 페이지가 빨리 로드되게 하기 위해 몇 가지 제한사항이 있으며
AMP 유효성 검사 도구는 이러한 제한사항을 적용합니다.

레이아웃은 AMP 페이지에서 좀 더 기준이 까다롭습니다.
페이지에 표시되는 모든 태그는
사전 정의된 높이와 너비를 필요로 하며 이를 통해
렌더링 및 스크롤 문제가 크게 줄어듭니다.
하지만 직접 이러한 속성을 포함해야 하는 것은 아닙니다.
특정 레이아웃 유형의 경우
AMP 유효성 검사 도구에서 기본값을 추정하므로
오류를 표시하지 않습니다.

각 AMP 태그에는
[AMP 유효성 검사 도구 사양](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)에 정의된 것처럼
`supported_layouts` 목록이 있습니다.
지원되지 않는 레이아웃이 있는 경우 유효성 검사 도구에서 오류가 표시되며
사전 정의된 레이아웃의 유효성 검사 규칙을 확인합니다.

### 스타일시트가 너무 긴 경우

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>STYLESHEET_TOO_LONG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>''style' 태그에 지정된 작성자 스타일시트가 너무 깁니다. %1바이트로 표시되어 있으나 한도는 %2바이트입니다.'</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>스타일시트 크기를 75,000바이트 미만으로 조정합니다.</td>
  </tr>
</table>

AMP 유효성 검사 도구에서
`<style amp-custom>` 내의 스타일 콘텐츠 크기를 측정했을 때
50,000바이트 한도를 초과하는 경우 이 오류가 표시됩니다.

### CSS 구문 오류

<table>
   <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>CSS_SYNTAX</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"CSS syntax error in tag '%1' - %2."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>CSS 구문 오류를 수정합니다.</td>
  </tr>
</table>

이 오류는 지정된 태그에
CSS 구문 오류가 있을 때 발생합니다.
오류가 발생하는 원인을 알 수 없다면
[csslint](http://csslint.net/) 등의
온라인 CSS 유효성 검사 도구를 통해
CSS를 실행해 보시기 바랍니다.

### 특정 규칙의 CSS 구문 오류

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>CSS_SYNTAX_INVALID_AT_RULE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>해당 CSS 구문 오류를 수정합니다.</td>
  </tr>
</table>

이 오류는 AMP에서 몇 가지 규칙만이 허용되는
CSS 내 @ 규칙을 말합니다.
[AMP 사양](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)도 참조하세요.
예를 들어 <code>@import</code>는 허용되지 않습니다.
이 유효성 오류는
잘못된 규칙이 무엇인지 구체적으로 알려 주기 때문에
규칙을 수정하기 쉽습니다.

### 암시된 레이아웃을 AMP 태그가 지원하지 않음

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>IMPLIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The implied layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>태그에 올바른 레이아웃 속성을 제공합니다.</td>
  </tr>
</table>

이 오류는 AMP 태그에 특정 레이아웃을 지정하지 않았을 때
너비, 높이, 크기에 의해 암시되는 레이아웃이 지원되지 않을 때 발생합니다.
[AMP 유효성 검사 도구 사양](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)에서
태그의 `supported_layout` 값을 확인하시기 바랍니다.

실제 레이아웃 동작은 `layout` 속성에 따라 결정됩니다.
레이아웃이 작동하는 방법을 자세히 알아보려면
[레이아웃 제어 방법](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) 및
[AMP HTML 레이아웃 시스템 사양](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)을 참조하시기 바랍니다.

**참고:** 레이아웃을 지정하지 않고
`width` 및 `height` 값을 포함하지 않으면
레이아웃이 기본적으로 CONTAINER로 설정됩니다.
CONTAINER는 어떠한 AMP 태그에서도 지원되지 않으므로
유효성 검사 도구에 오류가 표시됩니다.
CONTAINER가 아닌 레이아웃을 지정하거나
`width` 또는 `height` 값을 추가하면 오류가 없어집니다.

### 암시적 레이아웃에서 허용되지 않는 속성

<table>
  <tr>
    <td class="col-thirty"><strong>코드</strong></td>
    <td>ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>형식</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>해결책</strong></td>
    <td>태그에서 허용되지 않는 속성을 삭제하거나
      속성을 허용하는 레이아웃을 지정합니다.</td>
  </tr>
</table>

이 오류는 AMP 태그에 특정 레이아웃을 지정하지 않았을 때
암시적 레이아웃에 허용되지 않는 속성이 포함되어 있을 때 발생합니다.
레이아웃 유형별로 허용되지 않는 속성은
[AMP HTML 레이아웃 시스템 사양](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)에 설명되어 있습니다.

### AMP 태그가 지정된 레이아웃을 지원하지 않음

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>SPECIFIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The specified layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>태그에서 지원하는 레이아웃을 지정합니다.</td>
  </tr>
</table>

이 오류는 태그에 지정된 레이아웃이
지원되지 않을 때 발생합니다.
[AMP 유효성 검사 도구 사양](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)에서
태그의 `supported_layout` 값을 확인하시기 바랍니다.

실제 레이아웃 동작은 `layout` 속성에 따라 결정됩니다.
레이아웃이 작동하는 방법을 자세히 알아보려면
[레이아웃 제어 방법](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) 및
[AMP HTML 레이아웃 시스템 사양](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)을 참조하시기 바랍니다.

### 지정된 레이아웃에서 허용되지 않는 속성

<table>
  <tr>
    <td class="col-thirty"><strong>코드</strong></td>
    <td>ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>형식</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>해결책</strong></td>
    <td>태그에서 허용되지 않는 속성을 삭제하거나
      속성을 허용하는 레이아웃을 지정합니다.</td>
  </tr>
</table>

이 오류는 AMP 태그에 특정 레이아웃을 지정했는데
레이아웃에 허용되지 않는 속성이 포함되어 있을 때 발생합니다.
레이아웃 유형별로 허용되지 않는 속성은
[AMP HTML 레이아웃 시스템 사양](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)에 설명되어 있습니다.

### 레이아웃에서 필요로 하는 속성 값이 잘못됨

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>ATTR_VALUE_REQUIRED_BY_LAYOUT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>속성을 지정된 값으로 설정합니다.</td>
  </tr>
</table>

이 오류는 속성 값이 지정된 레이아웃에 맞지 않을 때 발생합니다.
이 오류가 발생하는 이유를 이해하려면
[레이아웃의 다양한 동작](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute)을
숙지해야 합니다.

레이아웃을 `fixed-height`으로 설정하고
`height`와 `width` 수치를 포함했다고 생각해 봅시다.
`fixed-height` 레이아웃은 `height` 값을 취합니다.
따라서 `width` 속성은 존재하지 않거나 `auto`로 설정되어야 합니다.
이 경우 유효성 검사 도구에서 ATTR_VALUE_REQUIRED_BY_LAYOUT이 표시됩니다.

### 너비 및 높이 단위 불일치

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>너비와 높이를 일관된 단위로 제공합니다.</td>
  </tr>
</table>

`layout=fixed`의 경우를 제외하면
너비와 높이 속성은 동일한 단위로 표현되어야 합니다.
동일한 단위로 표시되지 않으면 이 오류가 발생합니다.

예를 들어 `<amp-img src="" layout="responsive" width="42px" height="42rem">`의 경우
다음의 오류 메시지가 표시됩니다:

'태그 '[`amp-img`](../../../../documentation/components/reference/amp-img.md) 의 너비와 높이 단위가 일치하지 않습니다. 너비는 'px'로 지정되어 있으며 높이는 'rem'으로 지정되어 있습니다.'

### 템플릿 오류

AMP 태그 내 구문이
[`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md)
등의 템플릿을 포함하도록 설계되어 있는 경우가 아니라면
AMP 페이지는 템플릿 구문을 포함할 수 없습니다.

소스 파일에서 생성된 결과에
템플릿이 포함되어 있지 않다면
소스 파일에 템플릿을 포함해도 괜찮습니다.
[CSS 프리프로세서 사용](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md#using-css-preprocessors) 방법을 참조하세요.

### 속성에 템플릿 구문 포함

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>TEMPLATE_IN_ATTR_NAME</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"Mustache template syntax in attribute name '%1' in tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>속성에서 Mustache 템플릿 구문을 삭제합니다.</td>
  </tr>
</table>

이 오류는 유효성 검사 도구가 속성 값에서
[Mustache 템플릿 구문](https://mustache.github.io/mustache.5.html)을
발견한 경우 발생합니다.

### 속성에 이스케이프 처리되지 않은 템플릿 구문 포함

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>UNESCAPED_TEMPLATE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>Mustache 템플릿을 이스케이프 처리합니다.</td>
  </tr>
</table>

이 오류는 유효성 검사 도구가 속성 값에서
[이스케이프 처리되지 않은 Mustache 템플릿 구문](https://mustache.github.io/mustache.5.html)을
발견한 경우 발생합니다.

### 속성에 템플릿 부분 포함

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>TEMPLATE_PARTIAL_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>Mustache 부분을 삭제합니다.</td>
  </tr>
</table>

이 오류는 유효성 검사 도구가 속성 값에서
[Mustache 부분](https://mustache.github.io/mustache.5.html)을
발견한 경우 발생합니다.

### 지원 중단 오류

### 지원 중단된 태그

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>DEPRECATED_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>오류 메시지가 아직 정의되지 않았습니다(지원 중단된 태그 없음).</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>지원 중단된 태그를 삭제합니다.</td>
  </tr>
</table>

이 경고는 이전에 유효했던 AMP 태그가 AMP 문서에서 발견되었을 때 표시됩니다.
이는 경고일 뿐이며 경고가 있는 AMP 문서도 여전히 유효합니다.
현재 지원 중단된 태그는 없습니다. 이 경고는 향후에 지원 중단된 태그가 발생할 경우 사용됩니다.

### 지원 중단된 속성

<table>
  <tr>
                <td class="col-thirty"><strong>코드</strong></td>
                <td>DEPRECATED_ATTR</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>형식</strong></td>
                <td>"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>해결책</strong></td>
                <td>지원 중단된 속성을 삭제하는 것이 좋습니다.</td>
  </tr>
</table>

이 경고는 이전에 유효했던 AMP 속성이 AMP 문서에서 발견되었을 때 표시됩니다.
이는 경고일 뿐이며 경고가 있는 AMP 문서도 여전히 유효합니다.

[AMP 유효성 검사 도구 사양](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)에서
`deprecation`을 검색하여 AMP 태그별로
지원 중단된 속성을 확인하시기 바랍니다.
