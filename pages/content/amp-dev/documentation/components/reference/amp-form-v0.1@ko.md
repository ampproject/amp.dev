---
$category@: dynamic-content
formats:
  - websites
  - email
  - ads
teaser:
  text: Allows you to create forms to submit input fields in an AMP document.
toc: true
$title: amp-form
---

<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



<table>
  <tr>
    <td width="40%"><strong>설명</strong></td>
    <td><code>form</code>과 <code>input</code> 태그를 만들 수 있습니다.</td>
  </tr>
  <tr>
    <td><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">지원되는 레이아웃</a></strong></td>
    <td>해당 사항 없음</td>
  </tr>
  <tr>
    <td><strong>예</strong></td>
    <td>AMP By Example의 <a href="https://ampbyexample.com/components/amp-form/">amp-form</a> 예를 참조하세요.</td>
  </tr>
</table>


# 동작 <a name="behavior"></a>

`amp-form` 확장 프로그램을 사용하면 AMP 문서에서 입력 필드를 제출하기 위한 양식(`<form>`)을 만들 수 있습니다. `amp-form` 확장 프로그램에서는 브라우저에서 누락된 일부 동작에 [polyfill](#polyfills)도 제공합니다.

[tip type="important"]
양식의 데이터를 제출하는 경우 서버 엔드포인트에서 [CORS 보안](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)의 요구사항을 구현해야 합니다.
[/tip]

`<form>`을 만들기 전에 `<amp-form>` 확장 프로그램의 필수 스크립트를 포함해야 합니다. 그러지 않으면 잘못된 문서가 됩니다. 값 제출 이외의 용도로 `input` 태그를 사용하는 경우(예: `<form>` 내부가 아닌 위치에서 입력) `amp-form` 확장 프로그램을 로드하지 않아도 됩니다.

다음은 기본 양식의 예입니다.

[example preview="inline" playground="true" imports="amp-form" template="amp-mustache"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"{% if not format=='email'%}  
    target="_top"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          required>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          required>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
    <div submit-success>
      <template type="amp-mustache">
        Subscription successful!
      </template>
    </div>
    <div submit-error>
      <template type="amp-mustache">
        Subscription failed!
      </template>
    </div>
  </form>
```
[/example]

# 속성 <a name="attributes"></a>

# target <a name="target"></a>

양식을 제출한 후 양식 응답을 표시할 위치를 표시합니다. 값은 `_blank` 또는 `_top`이어야 합니다.

# action <a name="action"></a>

양식 입력을 처리할 서버 엔드포인트를 지정합니다. 값은 `https` URL(절대 또는 상대)이어야 하며 CDN의 링크가 아니어야 합니다.

* `method=GET`의 경우: 이 속성 또는 [`action-xhr`](#action-xhr)을 사용하세요.
* `method=POST`의 경우: [`action-xhr`](#action-xhr) 속성을 사용하세요.

[tip type="note"]
`target` 및 `action` 속성은 비xhr GET 요청에만 사용하세요. AMP 런타임에서는 `action-xhr`을 사용하여 요청하고 `action`과 `target`을 무시합니다. `action-xhr`이 제공되지 않은 경우 AMP에서 `action` 엔드포인트에 GET 요청을 시행하고 `target`을 사용하여 새 창을 엽니다(`_blank`인 경우). `amp-form` 확장 프로그램을 로드하지 못하는 경우 AMP 런타임에서 `action` 및 `target`을 사용하도록 대체할 수 있습니다.
[/tip]

# action-xhr <a name="action-xhr"></a>

XMLHttpRequest(XHR)를 통해 양식 입력을 처리하고 양식을 제출하는 서버 엔드포인트를 지정합니다. XHR 요청(AJAX 요청이라고도 함)을 통해 브라우저에서 페이지를 완전히 로드하거나 새 페이지를 열지 않고 요청을 시행합니다. 브라우저에서 사용 가능한 경우 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)를 사용하여 백그라운드에서 요청을 보내고 이전 브라우저의 경우 [XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)로 대체합니다.

[tip type="important"]
XHR 엔드포인트에서 [CORS 보안](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)의 요구사항을 구현해야 합니다.
[/tip]

이 속성은 `method=POST`에 필요하며 `method=GET`의 경우 선택사항입니다.

`action-xhr`의 값은 `action`과 같거나 다른 엔드포인트일 수 있으며 위와 동일한 `action` 요구사항이 있습니다.

양식을 성공적으로 제출한 후 사용자를 리디렉션하는 방법에 관해 알아보려면 아래의 [제출 후 리디렉션](#redirecting-after-a-submission) 섹션을 참조하세요.

# 기타 양식 속성 <a name="other-form-attributes"></a>

기타 모든 [양식 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)은 선택사항입니다.

# custom-validation-reporting <a name="custom-validation-reporting"></a>

맞춤 유효성 검사 보고 전략을 사용 설정하고 선택하는 선택적 속성입니다. 유효한 값은 `show-first-on-submit`, `show-all-on-submit` 또는 `as-you-go` 중 하나입니다.

자세한 내용은 [맞춤 유효성 검사](#custom-validations) 섹션을 참조하세요.

# 입력 및 필드 <a name="inputs-and-fields"></a>

**허용됨**:

* 기타 양식 관련 요소. 예: `<textarea>`, `<select>`, `<option>`, `<fieldset>`, `<label>`, `<input type=text>`, `<input type=submit>` 등
* `<form method=POST action-xhr>` 내부의 `<input type=password>` 및 `<input type=file>`
* [`amp-selector`](amp-selector.md)

**허용되지 않음**:

* `<input type=button>`, `<input type=image>`
* 입력에 있는 대부분의 양식 관련 속성. 예: `form`, `formaction`, `formtarget`, `formmethod` 등

해당 규칙 중 일부를 완화하는 일은 나중에 다시 고려해 볼 수 있습니다. 필요한 경우 [Google에 알리고](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#suggestions-and-feature-requests) 사용 사례를 제공해 주세요.

유효한 입력 및 필드에 관한 세부정보는 AMP 유효성 검사기 사양의 [amp-form 규칙](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)을 참조하세요.

# 작업 <a name="actions"></a>

`amp-form` 요소에서는 다음 작업을 노출합니다.

| 작업 | 설명 |
|--------|-------------|
| `submit` | 링크 탭하기 또는 [입력 변경 시 양식 제출](#input-events)과 같은 특정 작업에서 양식 제출을 트리거할 수 있습니다. |
| `clear` | 양식의 각 입력에 있는 값을 비웁니다. 그러면 사용자가 다시 양식을 빠르게 채울 수 있습니다. |

[tip type="read-on"]
[AMP의 작업 및 이벤트](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)에 관해 자세히 알아보세요.
[/tip]

# 이벤트 <a name="events"></a>

`amp-form`에서는 다음 이벤트를 노출합니다.

| 이벤트 | 실행 조건 |
|-------|-------------|
| `submit` | 양식이 제출되었으나 아직 완료되기 전입니다. |
| `submit-success` | 양식 제출이 완료되었으며 성공 응답이 수신됩니다. |
| `submit-error` | 양식 제출이 완료되었으며 오류 응답이 수신됩니다. |
| `verify` | 비동기 확인이 시작됩니다. |
| `verify-error` | 비동기 확인이 완료되었으며 오류 응답이 수신됩니다. |
| `valid` | 양식의 유효성 검사 상태가 "유효함"으로 변경됩니다(관련 [보고 전략](#reporting-strategies)에 따름). |
| `invalid` | 양식의 유효성 검사 상태가 "잘못됨"으로 변경됩니다(관련 [보고 전략](#reporting-strategies)에 따름). |

해당 이벤트는 [`on` 속성](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on)을 통해 사용할 수 있습니다.

예를 들어 다음은 `submit-success` 및 `submit-error` 이벤트를 모두 수신하고 이벤트에 따라 서로 다른 라이트박스를 표시합니다.

```html

<form ...="" on="submit-success:success-lightbox;submit-error:error-lightbox">
</form>

```

[여기에서 전체 예](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html)를 참조하세요.

# 입력 이벤트 <a name="input-events"></a>

AMP에서는 하위 `<input>` 요소에 `change` 및 `input-debounced` 이벤트를 노출합니다. 따라서 입력 값이 변경될 때 [`on` 속성](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on)을 사용하여 어떤 요소에서도 작업을 실행할 수 있습니다.

예를 들어, 일반적인 사용 사례는 입력 변경 시 양식을 제출하는 것입니다(설문조사에 응답하기 위해 라디오 버튼 선택, 페이지를 번역하기 위해 `select` 입력에서 언어 선택 등).

[example preview="inline" playground="true" imports="amp-form"]
```html
<form id="myform"
    method="post"
    action-xhr="https://example.com/myform"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <input name="answer1"
          value="Value 1"
          type="radio"
          on="change:myform.submit">Value 1
      </label>
      <label>
        <input name="answer1"
          value="Value 2"
          type="radio"
          on="change:myform.submit">Value 2
      </label>
    </fieldset>
  </form>
```
[/example]

[여기에서 전체 예](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html)를 참조하세요.

# 애널리틱스 트리거 <a name="analytics-triggers"></a>

`amp-form` 확장 프로그램에서 사용자가 [amp-analytics](amp-analytics.md) 구성에서 추적할 수 있는 다음과 같은 이벤트를 트리거합니다.

| 이벤트                     | 실행 조건                        |
|---------------------------|-----------------------------------|
| `amp-form-submit`         | 양식 요청이 시작됩니다.      |
| `amp-form-submit-success` | 성공 응답이 수신됩니다(즉, 응답의 상태가 `2XX`인 경우). |
| `amp-form-submit-error`   | 실패 응답이 수신되었습니다(즉, 응답의 상태가 `2XX`가 아닌 경우). |

다음 예에서와 같이 해당 이벤트를 보내도록 애널리틱스를 구성할 수 있습니다.

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "event": "https://www.example.com/analytics/event?eid=${eventId}",
        "searchEvent": "https://www.example.com/analytics/search?formId=${formId}&query=${formFields[query]}"
      },
      "triggers": {
        "formSubmit": {
          "on": "amp-form-submit",
          "request": "searchEvent"
        },
        "formSubmitSuccess": {
          "on": "amp-form-submit-success",
          "request": "event",
          "vars": {
            "eventId": "form-submit-success"
          }
        },
        "formSubmitError": {
          "on": "amp-form-submit-error",
          "request": "event",
          "vars": {
            "eventId": "form-submit-error"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

이 세 이벤트에서는 특정 양식과 양식의 필드에 해당하는 변수 세트를 생성합니다. 이 변수는 애널리틱스에 사용할 수 있습니다.

예를 들어 다음 양식에는 하나의 필드가 있습니다.

```html

<form id="submit_form" action-xhr="/comment" method="POST">
  <input type="text" name="comment">
    <input type="submit" value="댓글">
    </form>
```
`amp-form-submit`, `amp-form-submit-success` 또는 `amp-form-submit-error` 이벤트가 실행되면 양식에 지정된 값을 포함하는 다음 변수를 생성합니다.

  * `formId`
  * `formFields[comment]`

# 성공/오류 응답 렌더링 <a name="successerror-response-rendering"></a>

[확장 템플릿](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#templates)(예: [amp-mustache](amp-mustache.md))을 사용하여 양식에서 성공 또는 오류 응답을 렌더링하거나 [amp-bind](amp-bind.md) 및 다음 응답 속성을 사용하여 데이터 결합을 통해 성공 응답을 렌더링할 수 있습니다.

| 응답 속성 | 설명 |
|-----------|---------------------|
| `submit-success` | 성공 응답이 수신되어(즉, 상태가 `2XX`) 성공 메시지를 표시하는 데 사용할 수 있습니다. |
| `submit-error` | 실패 응답이 수신되어(즉, 상태가 `2XX`가 아님) 제출 오류를 표시하는 데 사용할 수 있습니다.  |
| `submitting` | 양식을 제출할 때 메시지를 표시하는 데 사용할 수 있습니다. 이 속성의 템플릿은 표시를 위해 양식의 입력 필드에 액세스할 수 있습니다. `submitting` 속성 사용 방법은 [아래의 전체 양식 예](#example-submitting)를 참조하세요. |

# 템플릿을 사용하여 응답 렌더링하기 <a name="to-render-responses-with-templating"></a>

* `<form>` 요소의 *모든 직접 하위 요소*에 응답 속성을 적용합니다*.
* `<template></template>` 또는 `<script type="text/plain"></script>` 태그를 통해 템플릿을 내부에 포함하거나 `template="id_of_other_template"` 속성으로 템플릿을 참조하여 하위 요소에 응답을 렌더링합니다.
* 응답의 유효한 JSON 객체를 `submit-success` 및 `submit-error`에 제공합니다. 성공과 오류 응답에는 모두 `Content-Type: application/json` 헤더가 있어야 합니다.

<a id="example-submitting"></a>

# 예: 양식에서 성공, 오류 및 제출 메시지 표시 <a name="example-form-displays-success-error-and-submitting-messages"></a>

다음 예에서 응답은 양식 내부의 인라인 템플릿에 렌더링됩니다.

```html
{% raw %}<form ...>
  <fieldset>
    <input type="text" name="firstName">
      ...
    </fieldset>
    <div verify-error="">
      <template type="amp-mustache">
        양식에 실수가 있습니다.
        {{#verifyErrors}}{{message}}{{/verifyErrors}}
    </template>
  </div>
  <div submitting="">
    <template type="amp-mustache">
      양식 제출 중... {{name}}을(를) 기다려 주셔서 감사합니다.
    </template>
  </div>
  <div submit-success="">
    <template type="amp-mustache">
      성공 {{name}}님, 구독해 주셔서 감사합니다. {{email}} 이메일에서 구독을 확인해 주세요. 그러면 {{#interests}}<b>{{name}}</b>{{/interests}}에 관한 주간 기사를 받아 보실 수 있습니다.
    </template>
  </div>
  <div submit-error="">
    <template type="amp-mustache">
      죄송합니다. {{name}}, {{message}}.
    </template>
  </div>
</form>
{% endraw %}
```

게시자의 `action-xhr` 엔드포인트에서 다음 JSON 응답을 반환합니다.

성공 시:

```json
{
  "name": "Jane Miller",
  "interests": [{"name": "Basketball"}, {"name": "Swimming"}, {"name": "Reading"}],
  "email": "email@example.com"
}
```

오류 시:
```json
{
  "name": "Jane Miller",
  "message": "The email (email@example.com) you used is already subscribed."
}
```

`submit-success` 및 `submit-error` 속성을 사용하여 요소에 설정된 템플릿 ID를 `template` 속성 값으로 사용하면 문서의 앞부분에서 정의된 참조 템플릿에 응답을 렌더링할 수 있습니다.

```html
{% raw %}<template id="submit_success_template" type="amp-mustache">
  성공 {{name}}님, 구독해 주셔서 감사합니다. {{email}} 이메일에서 구독을 확인해 주세요. 그러면 {{#interests}}<b>{{name}}</b>{{/interests}}에 관한 주간 기사를 받아 보실 수 있습니다.
</template>
<template id="submit_error_template" type="amp-mustache">
  죄송합니다. {{name}}, {{message}}.
</template></p>

<form ...="">
  <fieldset>
    ...
  </fieldset>
  <div submit-success="" template="submit_success_template"></div>
  <div submit-error="" template="submit_error_template"></div>
</form>
{% endraw %}
```

[여기에서 전체 예](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html)를 참조하세요.

# 데이터 결합을 사용하여 성공 응답 렌더링하기 <a name="to-render-a-successful-response-with-data-binding"></a>

* [on 속성](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)을 사용하여 양식 *submit-success* 속성을 [`AMP.setState()`](amp-bind.md#updating-state-with-amp.setstate%28%29)로 결합합니다.
* `event` 속성을 사용하여 응답 데이터를 캡처합니다.
* 원하는 요소에 상태 속성을 추가하여 양식 응답을 결합합니다.

다음 예에서는 [`amp-bind`](amp-bind.md)를 사용하는 양식 `submit-success` 응답을 보여줍니다.
```html
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Subscribe to our newsletter</p>
<form method="post"
      action-xhr="/components/amp-form/submit-form-input-text-xhr"
      target="_ top"
      on="submit-success: AMP.setState({'subscribe': event.response.name})">
  <div>
    <input type="text"
        name="name"
        placeholder="Name..."
        required>
    <input type="email"
      name="email"
      placeholder="Email..."
      required>
  </div>
  <input type="submit" value="Subscribe">
</form>
```

양식을 성공적으로 제출하면 다음과 비슷한 JSON 응답이 반환됩니다.

```json
{
  "name": "Jane Miller",
  "email": "email@example.com"
}
```
Then `amp-bind` updates the `<p>` element's text to match the `subscibe` state:

```html
...
  <p [text]="'Thanks, ' + subscribe +'!  You have successfully subscribed.'">Thanks Jane Miller!  You have successfully subscribed.</p>
...
```

# 제출 후 리디렉션 <a name="redirecting-after-a-submission"></a>

`AMP-Redirect-To` 응답 헤더를 설정하고 리디렉션 URL을 지정하여 성공적으로 양식을 제출한 후 사용자를 새 페이지로 리디렉션할 수 있습니다. 리디렉션 URL은 HTTPS URL이어야 합니다. 그렇지 않으면 AMP에서 오류가 발생하고 리디렉션이 발생하지 않습니다.  HTTP 응답 헤더는 서버를 통해 구성됩니다.

허용된 헤더 목록에 `AMP-Redirect-To`가 포함되도록 `Access-Control-Expose-Headers` 응답 헤더를 업데이트하세요.  [AMP의 CORS 보안](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)에서 이 헤더에 관해 자세히 알아보세요.

*응답 헤더 예:*

```text
AMP-Redirect-To: https://example.com/forms/thank-you
Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To
```

[tip type="success"]
양식 제출 후 리디렉션 사용에 관해 보여주는 AMP By Example의 [업데이트를 사용하여 양식 제출하기](https://ampbyexample.com/components/amp-form/#form-submission-with-page-update) 및 [제품 페이지](https://ampbyexample.com/samples_templates/product_page/#product-page)를 확인하세요.
[/tip]

# 맞춤 유효성 검사 <a name="custom-validations"></a>

`amp-form` 확장 프로그램을 사용하면 `show-first-on-submit`, `show-all-on-submit` 또는 `as-you-go` 중 하나의 보고 전략과 함께 `custom-validation-reporting` 속성을 사용하여 자체 맞춤 유효성 검사 UI를 빌드할 수 있습니다.

양식에서 맞춤 유효성 검사를 지정하려면 다음을 따르세요.

1. `form`의 `custom-validation-reporting` 속성을 [유효성 검사 보고 전략](#reporting-strategies) 중 하나로 설정합니다.
1. 특수 속성으로 표시된 자체 유효성 검사 UI를 제공합니다. AMP에서 특수 속성을 탐색하여 사용자가 지정한 보고 전략에 따라 적절한 시기에 보고합니다.

예를 들면 다음과 같습니다.

[example preview="inline" playground="true" imports="amp-form"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"
    custom-validation-reporting="show-all-on-submit"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          id="name5"
          required
          pattern="\w+\s\w+">
        <span visible-when-invalid="valueMissing"
          validation-for="name5"></span>
        <span visible-when-invalid="patternMismatch"
          validation-for="name5">
          Please enter your first and last name separated by a space (e.g. Jane Miller)
        </span>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          id="email5"
          required>
        <span visible-when-invalid="valueMissing"
          validation-for="email5"></span>
        <span visible-when-invalid="typeMismatch"
          validation-for="email5"></span>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
  </form>
```
[/example]

더 많은 예는 [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html)을 참조하세요.

유효성 검사 메시지의 경우 요소에 텍스트 콘텐츠가 포함되지 않은 경우 AMP에서 브라우저의 기본 유효성 검사 메시지로 요소를 채웁니다. 위의 예에서 `name5` 입력이 비어 있으며 유효성 검사가 시작된 경우(즉, 사용자가 양식을 제출하려고 시도함) AMP에서 `<span visible-when-invalid="valueMissing" validation-for="name5"></span>`을 브라우저의 유효성 검사 메시지로 채우고 사용자에게 `span`을 표시합니다.

[tip type="important"]
입력에 있을 수 있는 각 유형의 잘못된 상태에 해당하는 자체 유효성 검사 UI를 제공해야 합니다. 해당 UI가 없으면 누락된 오류 상태에 해당하는 `custom-validation-reporting`이 표시되지 않습니다. 유효성 검사 상태는 [공식 W3C HTML 유효성 검사 보고 문서](https://www.w3.org/TR/html50/forms.html#validitystate)에서 확인할 수 있습니다.
[/tip]

# 보고 전략 <a name="reporting-strategies"></a>

`custom-validation-reporting` 속성에 다음 보고 옵션 중 하나를 지정하세요.

# 제출 시 첫 번째 오류 표시 <a name="show-first-on-submit"></a>

`show-first-on-submit` 보고 옵션은 기본 유효성 검사가 시작되면 브라우저의 기본 동작을 모방합니다. 첫 번째 유효성 검사 오류를 찾으면 표시하고 중지합니다.

# 제출 시 모든 오류 표시 <a name="show-all-on-submit"></a>

`show-all-on-submit` 보고 옵션은 양식 제출 시 모든 잘못된 입력에 관한 유효성 검사 오류를 모두 표시합니다. 이 속성은 유효성 검사 요약을 표시하려는 경우 유용합니다.

# 진행하면서 오류 표시 <a name="as-you-go"></a>

`as-you-go` 보고 옵션을 사용하면 사용자가 입력과 상호 작용하면서 유효성 검사 메시지를 볼 수 있습니다. 예를 들어 잘못된 이메일 주소를 입력하면 바로 오류가 표시됩니다.  값을 정정하고 나면 오류가 사라집니다.

# 상호 작용 및 제출 <a name="interact-and-submit"></a>

`interact-and-submit` 보고 옵션은 `show-all-on-submit`와 `as-you-go`의 동작을 결합합니다. 개별 필드에서 상호 작용 직후에 오류를 표시하며 양식 제출 시 잘못된 필드의 오류를 모두 표시합니다.

# 확인 <a name="verification"></a>

HTML5 유효성 검사에서는 페이지에서 사용 가능한 정보(예: 값이 특정 패턴과 일치)만을 기반으로 하여 의견을 제공합니다. `amp-form` 확인을 사용하면 HTML5 유효성 검사 자체만으로는 제공하지 못하는 의견을 사용자에게 제공할 수 있습니다. 예를 들어 양식에서 확인을 사용하여 이메일 주소가 이미 등록되었는지 확인할 수 있습니다. 또 다른 사용 사례로 구/군/시 필드와 우편번호 필드가 서로 일치하는지 확인할 수 있습니다.

예를 들어 다음과 같습니다.
```html
{% raw %}<h4>확인 예제</h4>
<form method="post" action-xhr="/form/verify-json/post" verify-xhr="/form/verify-json/post"{% if not format=='email'%}   target="_blank"{% endif %}>
  <fieldset>
    <label>
      <span>이메일</span>
      <input type="text" name="email" required="">
      </label>
      <label>
        <span>우편번호</span>
        <input type="tel" name="zip" required="" pattern="[0-9]{5}(-[0-9]{4})?">
        </label>
        <label>
          <span>구/군/시</span>
          <input type="text" name="city" required="">
          </label>
          <label>
            <span>문서</span>
            <input type="file" name="document" no-verify="">
            </label>
            <div class="spinner"></div>
            <input type="submit" value="제출">
            </fieldset>
            <div submit-success="">
              <template type="amp-mustache">
                <p>축하합니다. {{email}}(으)로 등록되었습니다.</p>
              </template>
            </div>
            <div submit-error="">
              <template type="amp-mustache">
                {{#verifyErrors}}
              <p>{{message}}</p>
              {{/verifyErrors}}
            {{^verifyErrors}}
          <p>문제가 발생했습니다. 나중에 다시 시도하시겠습니까?</p>
          {{/verifyErrors}}
      </template>
    </div>
  </form>
{% endraw %}
```

양식에서 요청이 공식 제출이 아니라 확인 요청임을 서버에 알리는 힌트로서 양식 데이터의 일부로 `__amp_form_verify` 필드를 보냅니다.
이로 인해 동일한 엔드포인트가 제출과 확인 모두에 사용되는 경우 서버에서 확인 요청을 저장하지 않는다는 사실을 알게 되므로 유용합니다.

다음은 확인에서 오류 응답이 표시되는 방식입니다.
```json
{
  "verifyErrors": [
    {"name": "email", "message": "That email is already taken."},
    {"name": "zip", "message": "The city and zip do not match."}
  ]
}
```

`verify-xhr` 요청에서 필드를 제거하려면 `no-verify` 속성을 입력 요소에 추가합니다.

더 많은 예는 [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html)을 참조하세요.

# 대체 변수 <a name="variable-substitutions"></a>

`amp-form` 확장 프로그램에서는 `data-amp-replace` 속성이 있으며 숨겨져 있는 입력에 [플랫폼 대체 변수](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)를 사용할 수 있습니다. 양식을 제출할 때마다 `amp-form`을 통해 양식에서 모든 `input[type=hidden][data-amp-replace]`를 찾고 `value` 속성에 대체 변수를 적용하여 대체 결과로 바꿉니다.

`data-amp-replace`에서 사용한 변수의 공백으로 구분된 문자열을 지정하여 각 입력에서 각 대체에 사용할 변수를 제공해야 합니다(아래 예 참조). AMP에서는 명시적으로 지정되지 않은 변수는 대체하지 않습니다.

다음은 제출 전후의 입력 상태 예입니다(대체 애널리틱스가 아니라 대체 변수의 플랫폼 구문을 사용해야 한다는 점에 유의).
```html
<!-- Initial Load -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: CANONICAL_URL - RANDOM - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="CLIENT_ID(myid)"
        data-amp-replace="CLIENT_ID">
  ...
</form>
```

사용자가 양식을 제출하려고 하면 AMP에서 변수를 분석하고 모든 필드의 필드 `value` 속성을 올바른 대체로 업데이트하려고 시도합니다. XHR 제출의 경우 모든 변수가 대체되어 분석될 가능성이 큽니다. 그러나 비XHR GET 제출에서 비동기-분석이 필요한 값은 이전에 분석되지 않았으므로 사용하지 못할 수 있습니다. 예를 들어 `CLIENT_ID`가 이전에 분석되고 캐시되지 않은 경우 분석되지 않습니다.

```html
<!-- User submits the form, variables values are resolved into fields' value -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: https://example.com/hello - 0.242513759125 - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="amp:asqar893yfaiufhbas9g879ab9cha0cja0sga87scgas9ocnas0ch"
        data-amp-replace="CLIENT_ID">
    ...
</form>
```

위의 `CANONICAL_HOSTNAME`은 첫 번째 필드의 `data-amp-replace` 속성을 통해 허용 목록에 포함되지 않았으므로 대체되지 않았습니다.

후속 제출에서는 매번 대체가 발생합니다. [AMP의 대체 변수](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)에 관해 자세히 알아보세요.

# Polyfill <a name="polyfills"></a>

`amp-form` 확장 프로그램에서는 일부 브라우저에서 누락되었거나 다음 버전의 CSS에서 구현되는 동작과 기능에 polyfill을 제공합니다.

# 잘못된 제출 차단 및 유효성 검사 메시지 도움말 풍선 <a name="invalid-submit-blocking-and-validation-message-bubble"></a>

현재(2016년 8월 일자) 웹킷 기반 엔진을 사용하는 브라우저에서는 잘못된 양식 제출을 지원하지 않습니다. 여기에는 모든 플랫폼의 Safari와 모든 iOS 브라우저가 포함됩니다. `amp-form` 확장 프로그램에서는 이 동작에 polyfill을 제공하여 잘못된 제출을 차단하고 잘못된 입력에서 유효성 검사 메시지 도움말 풍선을 표시합니다.

# 사용자 상호작용 가상 클래스 <a name="user-interaction-pseudo-classes"></a>

`:user-invalid` 및 `:user-valid` 가상 클래스는 [향후 CSS Selectors 4 사양](https://drafts.csswg.org/selectors-4/#user-pseudos)의 일부이며 몇 가지 기준을 기반으로 잘못된/유효한 필드의 스타일을 지정하는 후크를 향상하도록 도입되었습니다.

`:invalid`와 `:user-invalid` 사이의 주요 차이점 중 하나는 요소에 적용되는 시기입니다. `:user-invalid` 클래스는 사용자와 필드의 중요한 상호 작용 이후에 적용됩니다(예: 사용자가 필드에 입력하거나 필드에서 흐리게 표시).

`amp-form` 확장 프로그램에서 가상 클래스에 polyfill을 지원하는 [클래스](#classes-and-css-hooks)를 제공합니다. `amp-form` 확장 프로그램에서는 상위 `fieldset` 요소와 `form`에도 클래스를 채웁니다.

# `<textarea>` 유효성 검사 <a name="-validation"></a>

정규 표현식 일치는 `<textarea>`를 제외하고 대부분의 입력 요소에서 기본적으로 지원되는 공통 유효성 검사 기능입니다. Google에서는 이 기능을 polyfill로 제공하고 `<textarea>` 요소에서 `pattern` 속성을 지원합니다.

AMP 양식은 `<textarea>` 요소에 `autoexpand` 속성을 제공합니다. 그러면 textarea를 사용하여 사용자의 입력 행을 조정하도록 필드의 최대 크기까지 확장하고 줄일 수 있습니다. 사용자가 수동으로 필드의 크기를 조정하는 경우 자동 확장 동작이 제거됩니다.

```html
<textarea autoexpand></textarea>
```

# 스타일 지정 <a name="styling"></a>

# 클래스 및 CSS 후크 <a name="classes-and-css-hooks"></a>

`amp-form` 확장 프로그램에서는 게시자가 양식과 입력의 스타일을 지정하도록 클래스와 CSS 후크를 제공합니다.

다음 클래스는 양식 제출 상태를 나타내는 데 사용할 수 있습니다.

* `.amp-form-initial`
* `.amp-form-verify`
* `.amp-form-verify-error`
* `.amp-form-submitting`
* `.amp-form-submit-success`
* `.amp-form-submit-error`

다음 클래스는 [사용자 상호작용 가상 클래스의 polyfill](#user-interaction-pseudo-classes)입니다.

* `.user-valid`
* `.user-invalid`

게시자가 이 클래스를 사용하여 사용자의 작업에 응답하도록 입력과 필드 세트의 스타일을 지정할 수 있습니다(예: 사용자가 흐리게 표시한 후 잘못된 입력을 빨간색 테두리로 강조표시).

이 클래스의 사용 방법은 [여기에서 전체 예](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html)를 참조하세요.

[tip type="success"]
AMP 페이지에서 사용할 수 있는 사전에 스타일이 지정된 응답형 AMP 양식 요소는 [AMP 시작](https://ampstart.com/components#form-elements)을 방문하세요.
[/tip]

# 보안 고려사항 <a name="security-considerations"></a>

# XSRF로부터 보호 <a name="protecting-against-xsrf"></a>

[AMP CORS 사양](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)의 세부정보를 따르는 것 외에도 ['상태 변경 요청 처리'](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)#processing-state-changing-requests) 섹션에 각별히 유의하여 [XSRF 공격](https://en.wikipedia.org/wiki/Cross-site_request_forgery)으로부터 보호하세요. 이 공격에서는 공격자가 사용자 몰래 현재 사용자 세션을 사용하여 무단 명령을 실행할 수 있습니다.

사용자의 입력을 받을 때 일반적으로 다음과 같은 점에 유의하세요.

* 상태 변경 요청에는 POST만 사용합니다.
* 탐색 용도로만 비XHR GET을 사용합니다(예: 검색).
    * 비XHR GET 요청에서 정확한 원본/헤더를 수신하지 못하며 백엔드에서 위의 메커니즘을 사용하여 XSRF를 막을 수 없습니다.
    * 일반적으로 탐색 또는 정보 검색 용도로만 XHR/비XHR GET 요청을 사용합니다.</li>
* 비XHR POST 요청은 AMP 문서에서 허용되지 않습니다. 브라우저 전반의 요청에서 `Origin` 헤더 설정이 일치하지 않기 때문입니다. 또한 XSRF를 막기 위해 비XHR POST 요청 지원이 복잡해지는 문제가 발생합니다. AMP팀에서 이 요구사항을 나중에 재검토할 수 있습니다. 비XHR POST 요청 지원이 필요하다고 판단되면 문제를 신고해 주세요.
