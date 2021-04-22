---
$title: amp-mustache
$category@: dynamic-content
formats:
  - websites
  - email
  - ads
teaser:
  text: Allows rendering of Mustache.js templates.
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



يسمح بعرض [Moustache.js](https://github.com/janl/mustache.js/).

<table>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>أمثلة</strong></td>
    <td>يمكن الاطّلاع على مثال <a href="https://ampbyexample.com/components/amp-mustache/">amp-mustache مع الشرح</a> في الموقع "AMP بالمثال".</td>
  </tr>
</table>

[جدول المحتويات]

## ملاحظات عن الإصدارات <a name="version-notes"></a>

| الإصدار | الوصف |
|-------|-----|
| 0.2 | يتيح عناصر `<svg>` ويقلل حجم الحزمة (12.2 كيلو بايت مقابل 20.5 كيلو بايت، مضغوط بتنسيق gzip).ينقل البيانات إلى مكتبة HTML أحدث وأنظف (Caja إلى DOMPurify). قد يحدِث هذا تغييرات قد تؤدي إلى عطل بسبب الاختلافات في القائمة البيضاء للعلامات والسمات. ننصح باختبار صفحاتك أولاً قبل الدفع بها إلى الإنتاج للتأكد من عدم تأثير التغييرات التي أُجريت على الترميز الذي تم إنشاؤه في الوظائف. |
| 0.1 | تنفيذ مبدئي |

## البنية <a name="syntax"></a>

Moustache هو بنية نموذج بمنطق أقل. راجِع [مستندات Moustache.js](https://github.com/janl/mustache.js/) للحصول على المزيد من التفاصيل. في ما يلي بعض علامات Mustache الأساسية:

* {% raw %}`{{variable}}`{% endraw %}: علامة متغير تعطي القيمة HTML التي تتضمن حروف إلغاء للمتغير.
* {% raw %}`{{#section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: علامة قسم يمكنها اختبار وجود متغير وتكراره إذا كان مصفوفة.
* {% raw %}`{{^section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: علامة مقلوبة يمكنها اختبار عدم وجود متغير.
* {% raw %}`{{{unescaped}}}`{% endraw %}: HTML لا تتضمن حروف إلغاء ومقيدة من حيث الترميز الذي قد تعطيه (انظر "القيود" أدناه).

## الاستخدام <a name="usage"></a>

يجب تعريف نموذج `amp-mustache` واستخدامه وفقًا [لمواصفات نماذج AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-html-templates.md).

يجب أولاً إعلان/تحميل `amp-mustache` على هذا النحو:

```html

<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
```

يمكن بعد ذلك تعريف نماذج Mustache في علامة `script` أو `template` هكذا:

```html
{% raw %}<!-- Using template tag. -->
<template type="amp-mustache">
  Hello {{world}}!
</template>
{% endraw %}
```
أو

<!-- Using script tag. -->
```html
{% raw %}<script type="text/plain" template="amp-mustache">
  Hello {{world}}!
</script>
{% endraw %}
```

استخدِم علامة `template` متى أمكن حيث يوفر التحقق من صحة AMP تلميحات مفيدة عن dev-x. استخدام النموذج `script` لحالات الحافة ومشاكل إنشاء النموذج في سياق الجداول. راجِع قسم "الجداول" أدناه.

يتم تحديد أسلوب اكتشاف النموذج وموعد عرضه وكيفية توفير البيانات من قبِل عنصر AMP الهدف الذي يستخدم هذا النموذج لعرض محتواه (في شكل [amp-list](amp-list.md) مثلاً أو [amp-form](amp-form.md) أو غيره).

## القيود <a name="restrictions"></a>

### التحقق <a name="validation"></a>

مثل جميع نماذج AMP ، يجب أن تكون نماذج `amp-mustache` أجزاء DOM جيدة التنظيم. ويعني هذا، من بين أمور أخرى، أنه لا يمكنك استخدام `amp-mustache` في ما يلي:

* حساب اسم العلامة: على سبيل المثال، {% raw %}`<{{tagName}}>`{% endraw %} غير مسموح به.
* حساب اسم السمة: على سبيل المثال، `<div {{attrName}}=something>` غير مسموح به.

تم تنظيف مخرجات "triple-mustache" لتسمح فقط بالعلامات التالية: `a`, `b`, `br`, `caption`, `colgroup`, `code`, `del`, `div`, `em`, `i`, `ins`, `li`, `mark`, `ol`, `p`, `q`, `s`, `small`, `span`, `strong`, `sub`, `sup`, `table`, `tbody`, `time`, `td`, `th`, `thead`, `tfoot`, `tr`, `u`, `ul`.

### التنظيف <a name="sanitization"></a>

يتم تنظيف مخرجات Mustache لدواعي الأمان وللحفاظ على صلاحية AMP. قد يؤدي هذا إلى إزالة بعض العناصر والسمات في صمت.

## المخاطر <a name="pitfalls"></a>

### النماذج المدمجة <a name="nested-templates"></a>

وفقًا "للتحقق من صحة AMP"، يجب ألا تكون عناصر `<template>` عناصر ثانوية لعناصر `<template>` أخرى. يمكن أن يحدث هذا عند دمج مكونَين يستخدمان النماذج، مثل `amp-list` و`amp-form`.

للتغلب على هذا، يمكن أيضًا الإشارة إلى عناصر `<template>` باستخدام `id` عبر السمة `template` في المكوِّن. مثال:

```html
{% raw %}<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}
```

يمكن أيضًا تمثيله على النحو التالي:

```html
{% raw %}<!-- Externalize templates to avoid nesting. -->
<template type="amp-mustache" id="myTemplate">
  <div>{{title}}</div>
</template>

<amp-list id="myList" src="https://foo.com/list.json" template="myTemplate">
</amp-list>
{% endraw %}
```

### الجداول <a name="tables"></a>

يجب تحديد سلاسل نماذج AMP في عناصر `<template>` وهو ما قد يؤدي إلى حدوث سلوك غير متوقع بسبب تحليل المتصفح. يمكن مثلاً أن تتسبب عناصر `<table>` في [إعادة ترتيب العلامات التي بها خلل في الدمج](https://www.w3.org/TR/html5/syntax.html#unexpected-markup-in-tables) في النص. في المثال التالي:

```html
{% raw %}<template type="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</template>
{% endraw %}
```

سيعيد المتصفح ترتيب عقد النص {% raw %}`{{#foo}}`{% endraw %} و{% raw %}`{{/foo}}`{% endraw %}:

```html
{% raw %}{{#foo}}
{{/foo}}
<table>
  <tr>
    <td></td>
  </tr>
</table>
{% endraw %}
```

تتضمن الحلول التفاف أقسام Mustache في تعليقات HTML (مثل {% raw %}`<!-- {{#bar}} -->`{% endraw %}) باستخدام عناصر لا تخص الجداول مثل `<div>` بدلاً منه أو باستخدام علامة `<script type="text/plain">` لتحديد النماذج.

```html
{% raw %}<script type="text/plain" template="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</script>
{% endraw %}
```

### حروف إلغاء علامات الاقتباس <a name="quote-escaping"></a>

عند استخدام `amp-mustache` لحساب قيم السمات، يمكن أن تمثل حروف إلغاء علامات الاقتباس مشكلة. مثال:

```html
{% raw %}<template type="amp-mustache">
  <!-- A double-quote (") in foo will cause malformed HTML. -->
  <amp-img alt="{{foo}}" src="example.jpg" width=100 height=100></amp-img>

  <!-- A single-quote (') or double-quote (") in bar will cause an AMP runtime parse error. -->
  <button on="tap:AMP.setState({foo: '{{bar}}'})">Click me</button>
</template>
{% endraw %}
```

لن ينجح استخدام رموز أحرف HTML في المتغير {% raw %}`{{foo}}`{% endraw %} أو {% raw %}`{{bar}}`{% endraw %} حيث إن Moustache سيتضمن أحرف الإلغاء `&` (مثال: `&quot;` -> `&amp;quot;`). يتمثل أحد الحلول البديلة في استخدام أحرف facsimile مثل ′ ( `&prime;` ) و″ ( `&Prime;`).

هناك [اقتراح مفتوح للنقاش](https://github.com/ampproject/amphtml/issues/8395) بإجراء هذا الاستبدال في `amp-mustache` بدلاً من ذلك. يرجى التعليق على المشكلة إذا أردت دعمها.

### كيانات HTML <a name="html-entities"></a>

لا يتم حفظ كيانات HTML في عناصر `<template>`.

قد تكون هذه مشكلة إذا أردت عرض `<template>` يحتوي على نص أنشأه المستخدِمون على جانب الخادم وذلك لأنه سيتم التعامل مع النص الذي يحتوي على {% raw %}`{{` و`}}` و`{{{` و`}}}`{% endraw %} كأنه قسم Mustache. لن ينجح مثلاً استبدال {% raw %}`{{`{% endraw %} بكيانات HTML `&lcub;&lcub;` لأنها لا يتم حفظها عند تحليل المتصفح لـ `<template>`.

وتشمل الحلول البديلة استبدال السلاسل مثل {% raw %} `{{` {% endraw %} بأحرف مختلفة أو تجريدها مباشرة من المحتوى الذي أنشأه المستخدِمون.

## التحقق <a name="validation-1"></a>

اطِّلع على [قواعد amp-mustache](https://github.com/ampproject/amphtml/blob/main/extensions/amp-mustache/validator-amp-mustache.protoascii) في مواصفات مدقق AMP.
