---
$title: amp-form
$category@: dynamic-content
formats:
  - websites
  - email
  - ads
teaser:
  text: Allows you to create forms to submit input fields in an AMP document.
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
    <td width="40%"><strong>الوصف</strong></td>
    <td>يسمح لك هذا المكّوِن بإنشاء العلامتَين <code>form</code> و<code>input</code>.</td>
  </tr>
  <tr>
    <td><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-form" src="https://ampjs.org/v0/amp-form-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">التنسيقات المعتمدة</a></strong></td>
    <td>لا ينطبق</td>
  </tr>
  <tr>
    <td><strong>أمثلة</strong></td>
    <td>راجِع <a href="https://ampbyexample.com/components/amp-form/">مثال amp-form</a> على موقع "AMP بالمثال".</td>
  </tr>
</table>


[جدول المحتويات]

# السلوك <a name="behavior"></a>

تتيح لك الإضافة `amp-form` إنشاء نماذج (`<form>`) لإرسال حقول الإدخال في مستند AMP. وتوفر الإضافة `amp-form` أيضًا [تعويضات](#polyfills) لبعض السلوكيات المفقودة في المتصفحات.

[tip type="important"]
إذا كنت ترسل بيانات في النموذج، يجب أن تنفذ نقطة نهاية الخادم لديك متطلبات [أمان CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).
[/tip]

قبل إنشاء `<form>`، يجب تضمين النص البرمجي المطلوب للإضافة `<amp-form>`، وإلا فلن يكون المستند صالحًا. إذا كنت تستخدم علامات `input` لأغراض أخرى غير إرسال قيمها (مثل الإدخالات غير الموجودة في `<form>`)، لن تحتاج إلى تحميل الإضافة `amp-form`.

فيما يلي مثال لنموذج أساسي:

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

# السمات <a name="attributes"></a>

# target <a name="target"></a>

تشير إلى مكان عرض استجابة النموذج بعد إرساله. ويجب أن تكون القيمة `_blank` أو `_top`.

# action <a name="action"></a>

تحدد نقطة نهاية الخادم لمعالجة إدخال النموذج. يجب أن تكون القيمة عنوان URL مبدوءًا بـ `https` (مطلق أو نسبي) ويجب ألا تكون رابطًا إلى شبكة عرض المحتوى.

* بالنسبة إلى `method=GET`: استخدِم هذه السمة أو [`action-xhr`](#action-xhr).
* بالنسبة إلى `method=POST`: استخدِم السمة [`action-xhr`](#action-xhr).

[tip type="note"]

 يتم استخدام سمات `target` و`action` فقط لطلبات GET غير xhr. سيستخدم وقت تشغيل AMP `action-xhr` لإنشاء الطلب وسيتجاهل `action` و`target`. عند عدم توفر `action-xhr`، ينشئ AMP طلب GET إلى نقطة النهاية `action` ويستخدم `target` لفتح نافذة جديدة (إذا كانت `_blank`). قد يعود وقت تشغيل AMP أيضًا إلى استخدام `action` و`target` في حالات تعذّر تحميل الإضافة `amp-form`.

[/tip]

# action-xhr <a name="action-xhr"></a>

تحدد نقطة نهاية الخادم لمعالجة إدخال النموذج وإرساله عبر XMLHttpRequest (XHR). طلب XHR (الذي يسمى أحيانًا طلب AJAX) هو طلب يقدمه المتصفح بدون تحميل كامل للصفحة أو فتح صفحة جديدة. سترسل المتصفحات الطلب في الخلفية باستخدام [واجهة برمجة تطبيقات الجلب](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) متى توفرت وترجع إلى استخدام [واجهة برمجة تطبيقات XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) للمتصفحات الأقدم.

[tip type="important"]

يجب أن تنفذ نقطة نهاية متطلبات [أمان CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

[/tip]

هذه السمة مطلوبة للطريقة `method=POST` واختيارية للطريقة `method=GET`.

يمكن أن تكون قيمة `action-xhr` هي نقطة نهاية `action` نفسها أو نقطة نهاية مختلفة ويكون للقيمة نفس متطلبات `action` أعلاه.

لمعرفة المزيد عن إعادة توجيه المستخدِم بعد إرسال النموذج بنجاح، يمكنك مراجعة القسم [إعادة التوجيه بعد إرسال النموذج](#redirecting-after-a-submission) أدناه.

# السمات الأخرى للنموذج <a name="other-form-attributes"></a>

جميع [سمات النموذج](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) الأخرى اختيارية.

# custom-validation-reporting <a name="custom-validation-reporting"></a>

هذه سمة اختيارية تُستخدم لتفعيل واختيار استراتيجية مخصصة لإعداد تقارير التحقق من الصحة. وقيمها الصالحة واحدة مما يلي: `show-first-on-submit` أو `show-all-on-submit` أو `as-you-go`.

راجِع قسم [التحقق المخصص](#custom-validations) لمعرفة المزيد من التفاصيل.

# الإدخالات والحقول <a name="inputs-and-fields"></a>

**المسموح بها**:

* العناصر الأخرى ذات الصلة بالنموذج، بما في ذلك: `<textarea>` و`<select>` و`<option>` و`<fieldset>` و`<label>` و`<input type=text>` و`<input type=submit>` وما إلى ذلك
* `<input type=password>` و`<input type=file>` في `<form method=POST action-xhr>`
* [`amp-selector`](amp-selector.md)

**غير المسموح بها**:

* `<input type=button>` و`<input type=image>`
* معظم السمات المتعلقة بالنموذج في الإدخالات ومنها: `form` و`formaction` و`formtarget` و`formmethod` وغيرها

(قد يتم مستقبلاً إعادة النظر في تخفيف بعض هذه القواعد - [يرجى إعلامنا](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md#suggestions-and-feature-requests) إذا كنت تحتاج هذه الإدخالات أو الحقول مع تقديم حالات استخدام).

للحصول على تفاصيل حول الإدخالات والحقول الصحيحة، راجِع [قواعد amp-form](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) في مواصفات مدقق AMP.

# الإجراءات <a name="actions"></a>

يقدم العنصر `amp-form` الإجراءات التالية:

| الإجراء | الوصف |
|--------|-------------|
| `submit` | يتيح لك تشغيل إرسال النموذج عند حدوث إجراء محدد، مثل النقر على رابط أو [إرسال نموذج عن تغيير الإدخالات](#input-events). |
| `clear` | يعمل على تفريغ القيم من كل الإدخالات في النموذج. ويسمح هذا للمستخدِمين بسرعة ملء النماذج مرة ثانية. |

[tip type="read-on"]
تعرّف عن [الإجراءات والأحداث في AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md).
[/tip]

# الأحداث <a name="events"></a>

يعرض `amp-form` الأحداث التالية:

| الحدث | موعد تنشيطه |
|-------|-------------|
| `submit` | عند إرسال النموذج وقبل اكتمال الإرسال |
| `submit-success` | عند إتمام إرسال النموذج وعرض الاستجابة "ناجح" |
| `submit-error` | عند إتمام إرسال النموذج وعرض الاستجابة "خطأ" |
| `verify` | بدء التحقق غير المتزامن |
| `verify-error` | عند إتمام التحقق غير المتزامن وعرض الاستجابة "خطأ" |
| `valid` | عند تغير حالة التحقق للنموذج إلى "صالح" (وفقًا [لاستراتيجية إعداد التقارير](#reporting-strategies)) |
| `invalid` | عند تغير حالة التحقق للنموذج إلى "غير صالح" (وفقًا [لاستراتيجية إعداد التقارير](#reporting-strategies)) |

يمكن استخدام هذه الأحداث عبر [السمة `on`](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on).

يستجيب النموذج في المثال التالي إلى أحداث `submit-success` و`submit-error` ويظهر عروضًا مبسطة اعتمادًا على الحدث:

```html

<form ...="" on="submit-success:success-lightbox;submit-error:error-lightbox">
</form>

```

يمكن الاطّلاع على [المثال بالكامل هنا](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# أحداث الإدخال <a name="input-events"></a>

تعرض AMP أحداث `change` و`input-debounced` في عناصر `<input>` الثانوية. يتيح لك ذلك استخدام [السمة `on`](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on) لتنفيذ إجراء على أي عنصر عند تغيّر قيمة الإدخال.

من بين حالات الاستخدام الشائعة مثلاً إرسال نموذج عند تغير الإدخال (تحديد زر الاختيار للإجابة على استطلاع أو اختيار اللغة من الإدخال `select` لترجمة الصفحة، وغير ذلك).

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

يمكن الاطّلاع على [المثال بالكامل هنا](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# مشغلات التحليلات <a name="analytics-triggers"></a>

تؤدي الإضافة `amp-form` إلى تشغيل الأحداث التالية التي يمكنك تتبعها في تهيئة [amp-analytics](amp-analytics.md):

| الحدث                     | موعد تنشيطه                        |
|---------------------------|-----------------------------------|
| `amp-form-submit`         | عند بدء طلب نموذج      |
| `amp-form-submit-success` | عند تلقي استجابة ناجحة (أي عندما تكون حالة الاستجابة `2XX`) |
| `amp-form-submit-error`   | عند تلقي استجابة غير ناجحة (أي عندما لا تكون حالة الاستجابة `2XX`) |

يمكنك تهيئة التحليلات لإرسال هذه الأحداث كما في المثال التالي:

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

تنشئ الأحداث الثلاثة مجموعة من المتغيرات التي تتوافق مع النموذج المحدد والحقول الواردة فيه. يمكن استخدام هذه المتغيرات للتحليلات.

يحتوي النموذج التالي مثلاً على حقل واحد:

```html

<form id="submit_form" action-xhr="/comment" method="POST">
<input type="text" name="comment">
<input type="submit" value="تعليق">
</form>

```

عند تنشيط الحدث `amp-form-submit` أو `amp-form-submit-success` أو `amp-form-submit-error`، ينشئ المتغيرات التالية التي تحتوي على القيم التي تم تحديدها في النموذج:

* `formId`
* `formFields[comment]`

# عرض استجابة النجاح/الخطأ <a name="successerror-response-rendering"></a>

يمكنك عرض استجابات النجاح أو الخطأ في النموذج باستخدام [النماذج الموسَّعة](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#templates)، مثل [amp-mustache](amp-mustache.md)، أو عرض استجابات النجاح من خلال ربط البيانات باستخدام [amp-bind](amp-bind.md) وسمات الاستجابة التالية:

| سمة الاستجابة | الوصف |
|-----------|---------------------|
| `submit-success` | يمكن استخدامها لعرض رسالة نجاح في حال نجاح الاستجابة (أي أن تكون حالتها `2XX`). |
| `submit-error` | يمكن استخدامها لعرض رسالة "خطأ في الإرسال" في حال عدم نجاح الاستجابة (أي ألا تكون حالتها `2XX`).  |
| `submitting` | يمكن استخدامها لعرض رسالة عند إرسال النموذج. يتمتع نموذج هذه السمة بحق الوصول إلى حقول إدخالات النموذج لغرض عرض أي رسائل. يرجى الاطّلاع على [مثال النموذج الكامل أدناه](#example-submitting) لمعرفة كيفية استخدام السمة `submitting`. |

# لعرض الاستجابات باستخدام النماذج، يمكنك: <a name="to-render-responses-with-templating"></a>

* تطبيق سمة استجابة على *أي عنصر ثانوي مباشر* للعنصر `<form>`
* عرض الاستجابة في العنصر الثانوي من خلال إدراج نموذج عبر العلامة `<template></template>` أو `<script type="text/plain"></script>` داخل العنصر أو بالإشارة إلى النموذج باستخدام السمة `template="id_of_other_template"`
* توفير كائن JSON صالح للاستجابة للسمة `submit-success` و`submit-error`. يجب أن تحتوي استجابات النجاح والخطأ على الرأس `Content-Type: application/json`.

<a id="example-submitting"></a>

# مثال: نموذج يعرض رسائل النجاح والخطأ والإرسال <a name="example-form-displays-success-error-and-submitting-messages"></a>

في المثال التالي، يتم عرض الاستجابات في نموذج مضمّن داخل النموذج.

```html
{% raw %}<form ...>
  <fieldset>
    <input type="text" name="firstName" />
    ...
  </fieldset>
  <div verify-error>
    <template type="amp-mustache">
      There is a mistake in the form!
      {{#verifyErrors}}{{message}}{{/verifyErrors}}
    </template>
  </div>
  <div submitting>
    <template type="amp-mustache">
      Form submitting... Thank you for waiting {{name}}.
    </template>
  </div>
  <div submit-success>
    <template type="amp-mustache">
      Success! Thanks {{name}} for subscribing! Please make sure to check your email {{email}}
      to confirm! After that we'll start sending you weekly articles on {{#interests}}<b>{{name}}</b> {{/interests}}.
    </template>
  </div>
  <div submit-error>
    <template type="amp-mustache">
      Oops! {{name}}, {{message}}.
    </template>
  </div>
</form>
{% endraw %}
```

تعرض نقطة نهاية `action-xhr` للناشر استجابات JSON التالية:

عند النجاح:

```json
{
  "name": "Jane Miller",
  "interests": [{"name": "Basketball"}, {"name": "Swimming"}, {"name": "Reading"}],
  "email": "email@example.com"
}
```

عند حدوث خطأ:
```json
{
  "name": "Jane Miller",
  "message": "The email (email@example.com) you used is already subscribed."
}
```

يمكنك عرض الاستجابات في نموذج مرجعي تم تعريفه مسبقًا في المستند باستخدام معرّف النموذج كقيمة لسمة `template` وتعيين العناصر ذات السمات `submit-success` `submit-error`.

```html
{% raw %}<template type="amp-mustache" id="submit_success_template">
  Success! Thanks {{name}} for subscribing! Please make sure to check your email {{email}}
  to confirm! After that we'll start sending you weekly articles on {{#interests}}<b>{{name}}</b> {{/interests}}.
</template>
<template type="amp-mustache" id="submit_error_template">
  Oops! {{name}}, {{message}}.
</template>

<form ...>
  <fieldset>
  ...
  </fieldset>
  <div submit-success template="submit_success_template"></div>
  <div submit-error template="submit_error_template"></div>
</form>
{% endraw %}
```

يمكن الاطّلاع على [المثال بالكامل هنا](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# لعرض استجابة ناجحة باستخدام ربط البيانات <a name="to-render-a-successful-response-with-data-binding"></a>

* استخدِم [السمة on](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) لربط سمة النموذج *submit-success* بالإجراء [`AMP.setState()`](amp-bind.md#updating-state-with-amp.setstate%28%29).
* استخدِم الخاصية `event` لاستخراج بيانات الاستجابة.
* أضِف سمة الحالة إلى العنصر المطلوب لربط استجابة النموذج.

يوضح المثال التالي استجابة `submit-success` للنموذج باستخدام [`amp-bind`](amp-bind.md):
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

عند إرسال النموذج بنجاح، سيعرض استجابة JSON مشابهة لما يلي:

```json
{
  "name": "Jane Miller",
  "email": "email@example.com"
}
```
ثم يعدّل `amp-bind` نص العنصر `<p>` لمطابقة الحالة `subscibe`:

```html
...
  <p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Thanks Jane Miller! You have successfully subscribed.</p>
...
```

# إعادة التوجيه بعد إرسال النموذج <a name="redirecting-after-a-submission"></a>

يمكنك إعادة توجيه المستخدِمين إلى صفحة جديدة بعد إرسال النموذج بنجاح عن طريق تعيين رأس الاستجابة `AMP-Redirect-To` وتحديد عنوان URL لإعادة التوجيه. يجب أن يكون عنوان URL هذا هو عنوان HTTPS URL، وإلا ستعرض AMP رسالة خطأ ولن تتم إعادة التوجيه.  تتم تهيئة رؤوس استجابة HTTP عبر الخادم لديك.

احرِص على تعديل رأس الاستجابة `Access-Control-Expose-Headers` لتضمين `AMP-Redirect-To` إلى قائمة الرؤوس المسموح بها.  يمكنك التعرّف على مزيد من المعلومات عن هذه الرؤوس في [أمان CORS في AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

*مثال لرؤوس الاستجابة:*

```text
AMP-Redirect-To: https://example.com/forms/thank-you
Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To
```

[tip type="success"]

راجِع [إرسال النموذج مع التعديل](https://ampbyexample.com/components/amp-form/#form-submission-with-page-update) في موقع "AMP بالمثال" و[صفحة المنتج](https://ampbyexample.com/samples_templates/product_page/#product-page) للحصول على توضيح لاستخدام إعادة التوجيه بعد إرسال النموذج.

[/tip]

# عمليات التحقق المخصصة <a name="custom-validations"></a>

تتيح لك الإضافة `amp-form` إنشاء واجهة مستخدِم مخصصة للتحقق باستخدام السمة `custom-validation-reporting` جنبًا إلى جنب مع إحدى استراتيجيات إعداد التقارير التالية: `show-first-on-submit` أو `show-all-on-submit` أو `as-you-go` .

لتحديد التحقق المخصص من صحة البيانات في النموذج:

1. عيِّن السمة `custom-validation-reporting` في `form` على إحدى [إستراتيجيات إعداد تقارير التحقق من صحة البيانات](#reporting-strategies).
2. وفِّر واجهة مستخدِم التحقق مع ترميزها بسمات خاصة. ستكتشف AMP السمات الخاصة وتبلغ عنها في الوقت المناسب اعتمادًا على استراتيجية إعداد التقارير التي حددتها.

وفي ما يلي مثال لذلك:

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

لمزيد من الأمثلة، راجِع [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

بالنسبة إلى رسائل التحقق من صحة البيانات، إذا كان العنصر لا يتضمن محتوى نصيًا، ستعمل AMP على ملئه بالرسالة التلقائية للمتصفح للتحقق من صحة البيانات. في المثال أعلاه، عندما يكون الإدخال `name5` فارغًا ويتم بدء التحقق من صحة البيانات (حاول المستخدِم مثلاً إرسال النموذج)، ستملأ AMP `<span visible-when-invalid="valueMissing" validation-for="name5"></span>` برسالة التحقق للمتصفح وتعرض العلامة `span` هذه للمستخدِم.

[tip type="important"]
يجب تقديم واجهة مستخدِم للتحقق من صحة البيانات الخاصة بك لكل نوع من الحالات غير الصالحة التي يمكن أن يمر بها الإدخال. في حال عدم توفير هذه الواجهات، فلن يرى المستخدموِن أي `custom-validation-reporting` لحالة الخطأ المتعلقة بفقدان الإدخالات. يمكن العثور على حالات الصلاحية في [وثائق W3C الرسمية المتعلقة بإعداد تقارير التحقق من صحة HTML](https://www.w3.org/TR/html50/forms.html#validitystate).
[/tip]

# استراتيجيات إعداد التقارير <a name="reporting-strategies"></a>

حدِّد أحد خيارات إعداد التقارير التالية للسمة `custom-validation-reporting`:

# Show First on Submit <a name="show-first-on-submit"></a>

يحاكي خيار إعداد التقارير `show-first-on-submit` السلوك التلقائي للمتصفح عند بدء عملية التحقق التلقائية من صحة البيانات. ويعرض أول خطأ يجده في عملية التحقق ثم يتوقف عند هذا الحد.

# Show All on Submit <a name="show-all-on-submit"></a>

يعرض خيار إعداد التقارير `show-all-on-submit` جميع أخطاء التحقق من جميع الإدخالات غير الصالحة عند إرسال النموذج. ويفيد إذا أردت عرض ملخص لعمليات التحقق من صحة البيانات.

# As You Go <a name="as-you-go"></a>

يتيح خيار إعداد التقارير `as-you-go` للمستخدِم رؤية رسائل التحقق من صحة البيانات أثناء تفاعله مع الإدخال. إذا كتب المستخدِم مثلاً عنوان بريد إلكتروني غير صالح، سيرى المستخدِم الخطأ على الفور.  وبعد تصحيح القيمة، يختفي الخطأ.

# Interact and Submit <a name="interact-and-submit"></a>

يجمع خيار إعداد التقارير `interact-and-submit` بين سلوك `show-all-on-submit` و`as-you-go`. ستعرض الحقول الفردية أي أخطاء فور التفاعل، وستظهر أخطاء جميع الحقول غير الصالحة عند إرسال النموذج.

# التأكيد <a name="verification"></a>

يعطي التحقق من توافق HTML5 تعليقات بناءً على المعلومات المتوفرة فقط على الصفحة، مثل ما إذا كانت القيمة تتطابق مع نمط معين. مع التأكيد في `amp-form` يمكنك إعطاء المستخدِم ملاحظات لا يمكن للتحقق من توافق HTML5 بمفرده تقديمها. يمكن أن يستخدم النموذج مثلاً التأكيد للتحقق مما إذا كان عنوان بريد إلكتروني مسجلاً. ويأتي تأكيد تطابق حقل المدينة وحقل الرمز البريدي بين حالات الاستخدام الأخرى.

في ما يلي مثال لذلك:
```html
{% raw %}
<h4>Verification example</h4>
<form
  method="post"
  action-xhr="/form/verify-json/post"
  verify-xhr="/form/verify-json/post"{% if not format=='email'%}  
  target="_blank"{% endif %}>
    <fieldset>
        <label>
            <span>Email</span>
            <input type="text" name="email" required>
        </label>
        <label>
            <span>Zip Code</span>
            <input type="tel" name="zip" required pattern="[0-9]{5}(-[0-9]{4})?">
        </label>
        <label>
            <span>City</span>
            <input type="text" name="city" required>
        </label>
        <label>
            <span>Document</span>
            <input type="file" name="document" no-verify>
        </label>
        <div class="spinner"></div>
        <input type="submit" value="Submit">
    </fieldset>
    <div submit-success>
        <template type="amp-mustache">
            <p>Congratulations! You are registered with {{email}}</p>
        </template>
    </div>
    <div submit-error>
        <template type="amp-mustache">
            {{#verifyErrors}}
                <p>{{message}}</p>
            {{/verifyErrors}}
            {{^verifyErrors}}
                <p>Something went wrong. Try again later?</p>
            {{/verifyErrors}}
        </template>
    </div>
</form>
{% endraw %}
```

يرسل النموذج حقل `__amp_form_verify` باعتباره جزءًا من بيانات النموذج كتلميح إلى الخادم بأن الطلب عبارة عن طلب للتأكيد وليس إرسالاً رسميًا.
ويفيد هذا في إعلام الخادم بعدم تخزين طلب التحقق إذا تم استخدام نقطة النهاية نفسها للتأكيد ولإرسال النموذج.

في ما يلي مثال لشكل استجابة الخطأ للتأكيد:
```json
{
  "verifyErrors": [
    {"name": "email", "message": "That email is already taken."},
    {"name": "zip", "message": "The city and zip do not match."}
  ]
}
```

لإزالة حقل من طلب `verify-xhr`، أضِف السمة `no-verify` إلى عنصر الإدخال.

لمزيد من الأمثلة، راجِع [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# استبدال المتغيرات <a name="variable-substitutions"></a>

تتيح الإضافة `amp-form` [استبدال المتغيرات في المنصة](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) للإدخالات المخفية والتي تحتوي على السمة `data-amp-replace`. عند كل عملية إرسال للنموذج، يعثر `amp-form` على كل `input[type=hidden][data-amp-replace]` في النموذج ويطبق استبدال المتغيرات على السمة `value` ويغيّرها بنتيجة الاستبدال.

عليك تقديم المتغيرات التي تستخدمها لكل استبدال في كل إدخال عن طريق تحديد سلسلة مفصول بينها بمسافات من المتغيرات المستخدَمة في `data-amp-replace` (انظر المثال أدناه). لن تستبدل AMP المتغيرات التي لم يتم تحديدها بشكل صريح.

في ما يلي مثال لإدخالات قبل الاستبدال وبعده (لاحظ أنك تحتاج إلى استخدام بنية المنصة لاستبدالات المتغيرات وليس الاستبدالات التحليلية):
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

بعد أن يحاول المستخدِم إرسال النموذج، ستحاول AMP حل المتغيرات وتعديل سمة `value` لجميع الحقول بالاستبدالات المناسبة. بالنسبة إلى عمليات إرسال XHR، يتم على الأرجح استبدال جميع المتغيرات وحلها. ومع ذلك، في عمليات الإرسال غير XHR GET، قد لا تتوفر القيم التي تتطلب حلاً غير متزامن بسبب عدم حلها مسبقًا. لن يتم مثلاً حل القيمة `CLIENT_ID` إذا لم يتم حلها وتخزينها مؤقتًا مسبقًا.

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

لاحظ أنه لم يتم استبدال `CANONICAL_HOSTNAME` في المثال أعلاه لأنه لم يكن في القائمة البيضاء من خلال السمة `data-amp-replace` في الحقل الأول.

ستحدث عمليات الاستبدال عند كل إرسال لاحق. يمكنك قراءة المزيد عن [عمليات استبدال المتغيرات في AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md).

# تعويض الميزات المفقودة من المتصفحات <a name="polyfills"></a>

توفر الإضافة `amp-form` تعويضات للسلوكيات والوظائف المفقودة من بعض المتصفحات أو الجاري تنفيذها في الإصدار التالي من CSS.

# حظر الإرسال غير الصالح وفقاعة رسائل التحقق <a name="invalid-submit-blocking-and-validation-message-bubble"></a>

لا تتيح المتصفحات التي تستخدم محركات مستندة إلى الويب حاليًا (اعتبارًا من آب (أغسطس) 2016) عمليات إرسال النماذج غير الصالحة. وتشمل المتصفح Safari على جميع المنصات بالإضافة إلى جميع متصفحات iOS. تعوّض الإضافة `amp-form` هذا السلوك لحظر أي عمليات إرسال غير صالحة وتعرض فقاعات لرسائل التحقق من الإدخالات غير صالحة.

# الفئات الزائفة المستندة إلى تفاعل المستخدِم <a name="user-interaction-pseudo-classes"></a>

إن الفئات الزائفة `:user-invalid` و`:user-valid` جزء من [المواصفات المستقبلية لمحددات CSS 4](https://drafts.csswg.org/selectors-4/#user-pseudos) ويتم استخدامها لإتاحة عناصر الهوك بشكل أفضل بهدف تصميم الحقول الصالحة/غير الصالحة بناء على بضع معايير.

إن وقت استخدام `:invalid` و`:user-invalid` على العنصر واحد من أوجه الاختلاف الرئيسية بينهما. يتم تطبيق الفئة `:user-invalid` بعد تفاعل مهم من المستخدِم مع الحقل (كأن يكتب المستخدِم في الحقل أو يتم تعتيم الحقل عنه).

توفر الإضافة `amp-form` [فئات](#classes-and-css-hooks) لتعويض ما تفقده هذه الفئات الزائفة. تنشر الإضافة `amp-form` أيضًا هذه الفئات على عناصر `fieldset` للكيانات الأصلية و`form`.

# التحقق من `<textarea>` <a name="-validation"></a>

مطابقة التعبيرات العادية هي ميزة تحقق شائعة متاحة بشكل أصلي على معظم عناصر الإدخال، باستثناء `<textarea>`. ونعمل على تعويض هذه الوظيفة ونتيح السمة `pattern` على عناصر `<textarea>`.

يوفر AMP Form سمة `autoexpand` لعناصر `<textarea>`. ويتيح هذا لـ textarea التوسع والتقليص لاستيعاب صفوف إدخال المستخدِم، وصولاً إلى الحجم الأقصى للحقل. إذا غيّر المستخدِم حجم الحقل يدويًا، ستتم إزالة السلوك autoexpand.

```html
<textarea autoexpand></textarea>
```

# التصميم <a name="styling"></a>

# الفئات وعناصر الهوك CSS <a name="classes-and-css-hooks"></a>

توفر الإضافة `amp-form` فئات وعناصر الهوك CSS للناشرين لتصميم النماذج والإدخالات.

يمكن استخدام الفئات التالية لبيان حالة إرسال النموذج:

* `.amp-form-initial`
* `.amp-form-verify`
* `.amp-form-verify-error`
* `.amp-form-submitting`
* `.amp-form-submit-success`
* `.amp-form-submit-error`

الفئات التالية عبارة عن [تعويض للفئات المزيفة المستندة إلى تفاعل المستخدِم](#user-interaction-pseudo-classes):

* `.user-valid`
* `.user-invalid`

يمكن للناشرين استخدام هذه الفئات لتصميم الإدخالات والحقول بحيث تتجاوب مع إجراءات المستخدِم (مثل تمييز إدخال غير صالح بحد أحمر بعد تعتيم المستخدِم له).

انظر [المثال الكامل هنا](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html) لهذا الاستخدام.

[tip type="success"]

انتقِل إلى الموقع [AMP Start](https://ampstart.com/components#form-elements) للاطّلاع على عناصر AMP form المتجاوبة المُصمَّمة مسبقًا التي يمكن استخدامها في صفحات AMP.

[/tip]

# الاعتبارات الأمنية <a name="security-considerations"></a>

# الحماية من XSRF <a name="protecting-against-xsrf"></a>

بالإضافة إلى اتباع التفاصيل الواردة في [مواصفات AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)، يُرجى توجيه العناية الفائقة للقسم ["معالجة طلبات تغيير الحالة" ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)#processing-state-changing-requests) للحماية من [هجمات XSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) التي ينفذ فيها المهاجم أوامر غير مصرح بها باستخدام الجلسة الحالية للمستخدِم بدون علمه.

ضع في اعتبارك النقاط التالية بشكل عام عند قبول إدخال من المستخدِم:

* استخدِم POST فقط لطلبات تغيير الحالة.
* استخدِم طلبات GET غير XHR لأغراض التنقل فقط (مثل البحث).
    * لن تحصل طلبات GET غير XHR على أصل دقيق/ رؤوس دقيقة ولن تتمكن الخلفيات من الحماية من XSRF باستخدام الآلية المذكورة أعلاه.
    * بشكل عام، استخدِم طلبات GET من النوع XHR أو غيره للتنقل أو استرداد المعلومات فقط.</li>
* غير مسموح بطلبات POST غير XHR في مستندات AMP. ويرجع ذلك إلى تناقض تعيين رأس `Origin` على هذه الطلبات عبر المتصفحات. وسيتم تقديم المضاعفات الداعمة في الحماية من XSRF. وقد تتم إعادة النظر في هذا الأمر وتقديمه لاحقًا لذا يرجى تقديم موضوع إذا كنت تعتقد بضرورة هذا.
