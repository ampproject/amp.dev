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
    <td width="40%"><strong>说明</strong></td>
    <td>允许创建 <code>form</code> 和 <code>input</code> 标记。</td>
  </tr>
  <tr>
    <td><strong>必需的脚本</strong></td>
      <td><code>&lt;script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">支持的布局</a></strong></td>
    <td>无</td>
  </tr>
  <tr>
    <td><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-form/">amp-form</a> 示例。</td>
  </tr>
</table>


# 行为 <a name="behavior"></a>

通过 `amp-form` 扩展组件，您可以创建表单 (`<form>`)，以在 AMP 文档中提交输入字段。`amp-form` 扩展组件还提供 [polyfill](#polyfills)，用于处理浏览器中的某些缺失行为。

[tip type="important"]
如果在表单中提交数据，您的服务器端点必须符合 [CORS 安全性](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)要求。
[/tip]

您必须先为 `<amp-form>` 扩展组件添加所需脚本，然后再创建 `<form>`，否则文档将无效。如果您将 `input` 标记用于提交输入值之外的用途（例如，不在 `<form>` 内的输入），则无需加载 `amp-form` 扩展组件。

下面是一个基本表单示例：

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

# 属性 <a name="attributes"></a>

# target <a name="target"></a>

用于指明提交表单后表单回应的显示位置。该值必须为 `_blank` 或 `_top`。

# action <a name="action"></a>

用于指定处理表单输入的服务器端点。该值必须是 `https` 网址（绝对网址或相对网址），且不得是指向 CDN 的链接。

* 对于 `method=GET`：使用此属性或 [`action-xhr`](#action-xhr)。
* 对于 `method=POST`：使用 [`action-xhr`](#action-xhr) 属性。

[tip type="note"]
`target` 和 `action` 属性仅用于非 xhr GET 请求。AMP runtime 会使用 `action-xhr` 发出请求，并会忽略 `action` 和 `target`。如果未提供 `action-xhr`，则 AMP 会向 `action` 端点发出 GET 请求，并使用 `target` 打开新窗口（如果 target 值为 `_blank`）。如果 `amp-form` 扩展组件加载失败，AMP runtime 可能还会回退为使用 `action` 和 `target`。
[/tip]

# action-xhr <a name="action-xhr"></a>

用于指定通过 XMLHttpRequest (XHR) 处理表单输入和提交表单的服务器端点。XHR 请求（有时称为 AJAX 请求）是指浏览器无需完全加载页面或打开新页面即可发出的请求。浏览器会使用 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)（如果有）在后台发送请求，而旧版浏览器则会回退为使用 [XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)。

[tip type="important"]
您的 XHR 端点必须符合 [CORS 安全性](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)要求。
[/tip]

对于 `method=POST`，此属性是必需项，而对于 `method=GET`，此属性是可选项。

`action-xhr` 与 `action` 的值可以是相同的端点，也可以是不同的端点，且需要遵守上述 `action` 要求。

如需了解如何在成功提交表单后重定向用户，请参阅下面的[提交后重定向](#redirecting-after-a-submission)部分。

# 其他表单属性 <a name="other-form-attributes"></a>

所有其他[表单属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)都是可选的。

# custom-validation-reporting <a name="custom-validation-reporting"></a>

这是一个可选属性，可用于启用和选择自定义验证报告策略。有效值包括：`show-first-on-submit`、`show-all-on-submit` 或 `as-you-go`。

如需了解更多详情，请参阅[自定义验证](#custom-validations)部分。

# 输入和字段 <a name="inputs-and-fields"></a>

**支持的内容**：

* 其他与表单相关的元素，包括：`<textarea>`、`<select>`、`<option>`、`<fieldset>`、`<label>`、`<input type=text>`、`<input type=submit>` 等等。
* `<form method=POST action-xhr>` 中的 `<input type=password>` 和 `<input type=file>`。
* [`amp-selector`](amp-selector.md)

**不支持的内容**：

* `<input type=button>`、`<input type=image>`
* 输入时大部分与表单相关的属性，包括：`form`、`formaction`、`formtarget`、`formmethod` 等等。

（将来我们可能会重新考虑放松上述部分规则 - 如果您需要这些规则，[请告知我们](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#suggestions-and-feature-requests)并提供相关用例）。

如需详细了解有效输入和字段，请参阅 AMP 验证工具规范中的 [amp-form 规则](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)。

# 操作 <a name="actions"></a>

`amp-form` 提供了以下操作：

| 操作 | 说明 |
|--------|-------------|
| `submit` | 允许您针对特定操作（例如，点按链接，或[更改输入时提交表单](#input-events)）触发表单提交。 |
| `clear` | 清空表单里每个输入中的值。这样一来，用户可以再次快速填写表单。 |

[tip type="read-on"]：详细了解 [AMP 中的操作和事件](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)。
[/tip]

# 事件 <a name="events"></a>

`amp-form` 提供了以下事件：

| 事件 | 触发时间 |
|-------|-------------|
| `submit` | 在表单已提交且提交完成之前。 |
| `submit-success` | 在表单提交已完成且响应成功时。 |
| `submit-error` | 在表单提交已完成且响应错误时。
 |
| `verify` | 在发起异步验证时。 |
| `verify-error` | 在异步验证已完成且响应错误时。 |
| `valid` | 在表单验证状态更改为“有效”时（根据其[报告策略](#reporting-strategies)）。 |
| `invalid` | 在表单验证状态更改为“无效”时（根据其[报告策略](#reporting-strategies)）。 |

您可以通过 [`on` 属性](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on)使用这些事件。

例如，以下代码会监听 `submit-success` 和 `submit-error` 事件，并显示不同的灯箱，具体取决于对应的事件：

```html

<form ...="" on="submit-success:success-lightbox;submit-error:error-lightbox">
</form>

```

如需查看完整示例，请点击[此处](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html)。

# 输入事件 <a name="input-events"></a>

AMP 针对子 `<input>` 元素提供 `change` 和 `input-debounced` 事件。这样一来，输入值发生更改时，您可以使用 [`on` 属性](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on)针对任何元素执行操作。

我们以一个常见用例为例，在输入发生更改时提交表单（通过选择单选按钮来回复意见调查、从 `select` 输入中选择一种语言来翻译网页，等等）。

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

如需查看完整示例，请点击[此处](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html)。

# 分析触发器 <a name="analytics-triggers"></a>

`amp-form` 扩展组件会触发以下事件，您可以在 [amp-analytics](amp-analytics.md) 配置中跟踪这些事件：

| 事件 | 触发时间 |
|---------------------------|-----------------------------------|
| `amp-form-submit`         | 在发起表单请求时。 |
| `amp-form-submit-success` | 在收到成功响应（即响应状态为 `2XX`）时。 |
| `amp-form-submit-error`   | 在收到失败响应（即响应状态不为 `2XX`）时。 |

您可以对分析进行配置，以发送这些事件，如下例所示：

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

这三个事件都会生成一组变量，这些变量与特定表单及其中的字段相对应。这些变量可用于进行分析。

例如，以下表单包含一个字段：

```html
<form id="submit_form" action-xhr="/comment" method="POST">
  <input type="text" name="comment">
    <input type="submit" value="评论">
    </form>
```

当 `amp-form-submit`、`amp-form-submit-success` 或 `amp-form-submit-error` 事件触发时，会生成以下变量，这些变量包含表单中指定的值：

  * `formId`
  * `formFields[comment]`

# 成功/错误响应呈现 <a name="successerror-response-rendering"></a>

您可以使用[扩展模板](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#templates)（如 [amp-mustache](amp-mustache.md)）在表单中呈现成功或错误响应，也可以通过将数据与 [amp-bind](amp-bind.md) 及以下响应属性绑定来呈现成功响应：

| 响应属性 | 说明 |
|-----------|---------------------|
| `submit-success` | 可用于在响应成功（即响应状态为 `2XX`）时显示成功消息。 |
| `submit-error` | 可用于在响应失败（即响应状态不为 `2XX`）时显示提交错误。 |
| `submitting` | 可用于在表单提交时显示消息。该属性的模板有权访问表单的输入字段，可用于任何显示目的。如需了解如何使用 `submitting` 属性，请参阅[下面的完整表单示例](#example-submitting)。 |

# 通过模板呈现响应的具体步骤： <a name="to-render-responses-with-templating"></a>

* 将响应属性应用于 `<form>` 元素的任何直接子集。**
* 通过以下两种方式在子元素中呈现响应：通过子元素内的 `<template></template>` 或 `<script type="text/plain"></script>` 标记添加模板；通过 `template="id_of_other_template"` 属性引用模板。
* 为 `submit-success` 和 `submit-error` 响应提供有效 JSON 对象。无论成功响应还是错误响应，均应包含 `Content-Type: application/json` 标头。

<a id="example-submitting"></a>

# 示例：表单显示成功、错误和正在提交消息 <a name="example-form-displays-success-error-and-submitting-messages"></a>

在下面的示例中，响应呈现在表单内嵌模板中。

```html
{% raw %}<form ...="">
  <fieldset>
    <input type="text" name="firstName">
      ...
    </fieldset>
    <div verify-error="">
      <template type="amp-mustache">
        表单中存在错误！
        {{#verifyErrors}}{{message}}{{/verifyErrors}}
    </template>
  </div>
  <div submitting="">
    <template type="amp-mustache">
      表单正在提交…{{name}}，感谢您耐心等待。
    </template>
  </div>
  <div submit-success="">
    <template type="amp-mustache">
      成功！{{name}}，感谢您订阅！请务必检查您的电子邮件 {{email}} 进行确认！之后，我们会开始每周向您发送一次有关{{#interests}}<b>{{name}}</b>{{/interests}}的文章。
    </template>
  </div>
  <div submit-error="">
    <template type="amp-mustache">
      糟糕！{{name}}，{{message}}。
    </template>
  </div>
</form>
{% endraw %}
```

发布商的 `action-xhr` 端点返回以下 JSON 响应：

成功时，返回以下内容：

```json
{
  "name": "Jane Miller",
  "interests": [{"name": "Basketball"}, {"name": "Swimming"}, {"name": "Reading"}],
  "email": "email@example.com"
}
```

错误时，返回以下内容：
```json
{
  "name": "Jane Miller",
  "message": "The email (email@example.com) you used is already subscribed."
}
```

通过将模板 ID 用作 `template` 属性（针对具有 `submit-success` 和 `submit-error` 属性的元素进行设置）的值，您可以使用之前在文档中指定的参考模板呈现响应。

```html
{% raw %}<template id="submit_success_template" type="amp-mustache">
  成功！{{name}}，感谢您订阅！请务必检查您的电子邮件 {{email}} 进行确认！之后，我们会开始每周向您发送一次有关{{#interests}}<b>{{name}}</b>{{/interests}}的文章。
</template>
<template id="submit_error_template" type="amp-mustache">
  糟糕！{{name}}，{{message}}。
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

如需查看完整示例，请点击[此处](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html)。

# 通过数据绑定呈现成功响应的具体步骤 <a name="to-render-a-successful-response-with-data-binding"></a>

* 使用 [on 属性](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)将表单 submit-success 属性绑定到 [`AMP.setState()`](amp-bind.md#updating-state-with-amp.setstate%28%29)。**
* 使用 `event` 属性捕获响应数据。
* 将状态属性添加到所需元素，以绑定表单响应。

下面的示例展示了使用 [`amp-bind`](amp-bind.md) 的表单 `submit-success` 响应：
```html
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Subscribe to our newsletter</p>
<form method="post"
    action-xhr="/components/amp-form/submit-form-input-text-xhr"
    target="_top"
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

表单成功提交后，会返回类似于以下内容的 JSON 响应：

```json
{
  "name": "Jane Miller",
  "email": "email@example.com"
}
```
然后，`amp-bind` 会更新 `<p>` 元素的文本，以匹配 `subscibe` 状态：

```html
...
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Thanks Jane Miller! You have successfully subscribed.</p>
...
```

# 提交后重定向 <a name="redirecting-after-a-submission"></a>

您可以设置 `AMP-Redirect-To` 响应标头并指定重定向网址，以在成功提交表单后将用户重定向到新页面。重定向网址必须为 HTTPS 网址，否则 AMP 会抛出错误且重定向操作不会执行。HTTP 响应标头是通过您的服务器配置的。

请务必更新 `Access-Control-Expose-Headers` 响应标头，以在受支持的标头列表中添加 `AMP-Redirect-To`。如需详细了解这些标头，请参阅 [AMP 中的 CORS 安全性](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)。

*响应标头示例：*

```text
AMP-Redirect-To: https://example.com/forms/thank-you
Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To
```

[tip type="success"]
如需了解如何在提交表单后进行重定向，请查看 AMP By Example 的[更新后提交表单](https://ampbyexample.com/components/amp-form/#form-submission-with-page-update)和[产品页面](https://ampbyexample.com/samples_templates/product_page/#product-page)。
[/tip]

# 自定义验证 <a name="custom-validations"></a>

通过 `amp-form` 扩展组件，您可以使用 `custom-validation-reporting` 属性及以下报告策略之一构建自己的自定义验证界面：`show-first-on-submit`、`show-all-on-submit` 或 `as-you-go`。

要对表单指定自定义验证，请执行以下操作：

1. 将您的 `form` 上的 `custom-validation-reporting` 属性设为[验证报告策略](#reporting-strategies)之一。
1. 提供您自己的用特殊属性标记的验证界面。AMP 会发现这些特殊属性并适时进行报告，具体取决于您指定的报告策略。

示例如下：

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

如需查看更多示例，请参阅 [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html)。

对于验证消息，如果您的元素中没有包含任何文本内容，AMP 会使用浏览器的默认验证消息进行填充。在上面的示例中，当 `name5` 输入为空且验证已启动（即用户尝试提交表单）时，AMP 会使用浏览器的验证消息填充 `<span visible-when-invalid="valueMissing" validation-for="name5"></span>`，并向用户显示该 `span`。

[tip type="important"]
您必须为每种可能的无效输入状态提供自己的验证界面。如果未提供这些界面，用户将看不到缺失错误状态的任何 `custom-validation-reporting`。如需查看有效性状态，请参阅[官方 W3C HTML 验证报告文档](https://www.w3.org/TR/html50/forms.html#validitystate)。
[/tip]

# 报告策略 <a name="reporting-strategies"></a>

用于为 `custom-validation-reporting` 属性指定以下报告选项之一：

# Show First on Submit <a name="show-first-on-submit"></a>

指定 `show-first-on-submit` 这一报告选项后，系统会在默认验证启动时模拟浏览器的默认行为。该选项会显示其发现的第一个验证错误，然后停止验证。

# Show All on Submit <a name="show-all-on-submit"></a>

指定 `show-all-on-submit` 这一报告选项后，系统会在表单提交时显示所有无效输入的所有验证错误。如果您想要显示验证摘要，则该选项非常有用。

# As You Go <a name="as-you-go"></a>

指定 `as-you-go` 这一报告选项后，您的用户可以在输入过程中看到验证消息。例如，如果用户输入的电子邮件地址无效，他们会立即看到相应的错误。用户更改该值后，相应错误就会消失。

# Interact and Submit <a name="interact-and-submit"></a>

`interact-and-submit` 这一报告选项结合了 `show-all-on-submit` 和 `as-you-go` 的行为。各个字段会在用户与字段互动后立即显示可能的错误，并且在提交时，表单会显示所有无效字段的错误。

# 验证 <a name="verification"></a>

HTML5 验证仅根据页面上的信息提供反馈，例如某个值是否与特定格式匹配。通过 `amp-form` 验证，您可以向用户提供 HTML5 验证自己无法提供的反馈。例如，表单可以通过验证来检查某个电子邮件地址是否已被注册。下面我们介绍另一个使用场景：验证城市字段和邮政编码字段是否互相匹配。

示例如下：
```html
{% raw %}<h4>验证示例</h4>
<form method="post" action-xhr="/form/verify-json/post" verify-xhr="/form/verify-json/post"{% if not format=='email'%}   target="_blank"{% endif %}>
  <fieldset>
    <label>
      <span>电子邮件地址</span>
      <input type="text" name="email" required="">
      </label>
      <label>
        <span>邮政编码</span>
        <input type="tel" name="zip" required="" pattern="[0-9]{5}(-[0-9]{4})?">
        </label>
        <label>
          <span>城市</span>
          <input type="text" name="city" required="">
          </label>
          <label>
            <span>文档</span>
            <input type="file" name="document" no-verify="">
            </label>
            <div class="spinner"></div>
            <input type="submit" value="提交">
            </fieldset>
            <div submit-success="">
              <template type="amp-mustache">
                <p>恭喜！您已使用 {{email}} 完成注册</p>
              </template>
            </div>
            <div submit-error="">
              <template type="amp-mustache">
                {{#verifyErrors}}
              <p>{{message}}</p>
              {{/verifyErrors}}
            {{^verifyErrors}}
          <p>出了点问题。要稍后重试吗？</p>
          {{/verifyErrors}}
      </template>
    </div>
  </form>
{% endraw %}
```

该表单会将 `__amp_form_verify` 字段作为表单数据的一部分发送到服务器，用于提示服务器：该请求属于验证请求，而不是正式提交。此操作非常有用，如果使用同一端点进行验证和提交，则服务器会知道不要存储该验证请求。

下面介绍了错误响应应该如何查找验证：
```json
  {
    "verifyErrors": [
      {"name": "email", "message": "That email is already taken."},
      {"name": "zip", "message": "The city and zip do not match."}
  ]
}
```

要从 `verify-xhr` 请求中移除字段，请将 `no-verify` 属性添加到输入元素。

如需查看更多示例，请参阅 [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html)。

# 变量替换 <a name="variable-substitutions"></a>

`amp-form` 扩展组件支持对已隐藏且具有 `data-amp-replace` 属性的输入进行[平台变量替换](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)。每次提交表单时，`amp-form` 都会查找表单内的所有 `input[type=hidden][data-amp-replace]`，然后对其 `value` 属性应用变量替换，并将其替换为结果值。

您必须针对每次输入提供要用于每次替换的变量，具体方法如下：指定在 `data-amp-replace` 中使用的一连串以空格分隔的变量（请参阅下面的示例）。AMP 不会替换未明确指定的变量。

下面的示例介绍了输入在替换前后的情况（请注意，您需要使用变量替换的平台语法，而不是分析语法）：
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

用户尝试提交表单后，AMP 会尝试解析相应变量，并使用相应替换变量更新所有字段的 `value` 属性。对于 XHR 提交，AMP 很可能会替换和解析所有变量。不过，在非 XHR GET 提交中，需要异步解析的值可能会因之前未进行解析而不可用。例如，如果之前未解析和缓存 `CLIENT_ID`，则 AMP 不会对其进行解析。

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

请注意，上述 `CANONICAL_HOSTNAME` 未通过第一个字段中的 `data-amp-replace` 属性进入白名单中，因此未进行替换。

每次进行后续提交时都会进行替换。详细了解 [AMP 中的变量替换](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)。

# Polyfill <a name="polyfills"></a>

`amp-form` 扩展组件会提供 polyfill，用于处理某些浏览器中缺失或要在下一版 CSS 中实现的行为和功能。

# 无效提交屏蔽和验证消息气泡 <a name="invalid-submit-blocking-and-validation-message-bubble"></a>

目前（截至 2016 年 8 月）使用基于 webkit 的引擎的浏览器不支持提交无效表单。这些浏览器包括在所有平台上使用的 Safari 以及所有 iOS 浏览器。`amp-form` 扩展组件会对此行为执行 polyfill 操作，以屏蔽任何无效提交，并在用户输入无效内容时显示验证消息气泡。

# 用户互动伪类 <a name="user-interaction-pseudo-classes"></a>

`:user-invalid` 和 `:user-valid` 伪类是[未来推出的 CSS 选择器 4 规范](https://drafts.csswg.org/selectors-4/#user-pseudos)的一部分，引入这些伪类是为了根据一些条件，在设置无效/有效字段样式时提供更好的钩子。

`:invalid` 和 `:user-invalid` 之间的主要区别之一是应用于元素的时间。`:user-invalid` 类会在用户与字段进行明显互动后应用于元素（例如，用户在字段中输入内容，或在字段中进行模糊处理）。

`amp-form` 扩展组件会提供各种[类](#classes-and-css-hooks)，以对这些伪类执行 polyfill 操作。`amp-form` 扩展组件还会将这些类传播到祖级 `fieldset` 元素和 `form`。

# `<textarea>` 验证 <a name="-validation"></a>

正则表达式匹配是大多数输入元素（`<textarea>` 除外）原生支持的一种常见验证功能。我们会对此功能执行 polyfill 操作，并支持在 `<textarea>` 元素上使用 `pattern` 属性。

AMP 表单会为 `<textarea>` 元素提供 `autoexpand` 属性。这样一来，textarea 可以进行扩缩，以适应用户的输入行，最多可到字段大小上限。如果用户手动调整字段大小，则 autoexpand 行为将被移除。

```html
<textarea autoexpand></textarea>
```

# 样式设置 <a name="styling"></a>

# 类和 CSS 钩子 <a name="classes-and-css-hooks"></a>

`amp-form` 扩展组件为发布商提供类和 CSS 钩子，以便他们设置表单和输入的样式。

以下类可用于指明表单提交状态：

* `.amp-form-initial`
* `.amp-form-verify`
* `.amp-form-verify-error`
* `.amp-form-submitting`
* `.amp-form-submit-success`
* `.amp-form-submit-error`

以下类是[针对用户互动伪类的 polyfill](#user-interaction-pseudo-classes)：

* `.user-valid`
* `.user-invalid`

发布商可以使用这些类设置输入和字段集的样式，以响应用户操作（例如，当用户在无效输入中进行模糊处理后，使用红色边框进行突出显示）。

如需了解如何使用这些类，请点击[此处](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html)查看完整示例。

[tip type="ll callout('提示：</b><a class="type_success"]
如需了解您可以在 AMP 网页中使用的自适应、已预设样式的 AMP 表单元素，请访问 [AMP Start](https://ampstart.com/components#form-elements)。
[/tip]

# 安全注意事项 <a name="security-considerations"></a>

# 抵御 XSRF <a name="protecting-against-xsrf"></a>

除了遵循 [AMP CORS 规范](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)中的详细规定之外，还请特别注意[处理状态更改请求](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)#processing-state-changing-requests)部分，以抵御 [XSRF 攻击](https://en.wikipedia.org/wiki/Cross-site_request_forgery)（即攻击者会在用户不知情的情况下使用当前用户会话执行未经授权的命令）。

一般来说，在接受用户输入时，请注意以下几点：

* 仅将 POST 用于状态更改请求。
* 仅将非 XHR GET 用于导航（例如，Google 搜索）。
    * 非 XHR GET 请求不会接收准确的来源/标头，并且后端无法使用上述机制抵御 XSRF。
    * 一般来说，XHR/非 XHR GET 请求仅用于导航或信息检索。</li>
* AMP 文档中不支持非 XHR POST 请求。这是因为在各个浏览器之间为这些请求设置 `Origin` 标头会导致不一致。此外，在抵御 XSRF 时，支持该功能会带来复杂问题。我们之后可能会重新考虑和推出该功能；如果您认为这一功能必不可少，请提出问题。
