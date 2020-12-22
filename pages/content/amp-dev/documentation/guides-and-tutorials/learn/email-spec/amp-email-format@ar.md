---
"$title": تنسيق AMP للبريد الإلكتروني
order: '1'
formats:
- email
teaser:
  text: 'لغة الترميز المطلوبة '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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

تمثل AMP تقنية تختص بتطوير صفحات ويب فائقة السرعة لعملاء الأجهزة المحمولة. وتعد AMP مجموعة من علامات HTML المدعومة بـ JavaScript والتي تتيح الوظائف بسهولة مع التركيز الإضافي على الأداء والأمان. ويوجد [مكونات AMP](https://amp.dev/documentation/components/) لكل شيء بدء من وحدات العرض الدوار، ومرورًا بعناصر نماذج الاستجابة، وحتى استلام محتوى حديث من نقاط النهاية البعيدة.

يوفر تنسيق AMP للبريد الإلكتروني [مجموعة فرعية من مكونات AMP](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md) التي يمكنك استخدامها في رسائل البريد الإلكتروني. ويمكن لمستلمي رسائل AMP الإلكترونية عرض مكونات AMP والتفاعل معها مباشرة في البريد الإلكتروني.

## لغة الترميز المطلوبة

يمثل الرمز التالي أدنى مقدار من لغة الترميز التي تشكل رسالة AMP إلكترونية:

[sourcecode:html]
<!DOCTYPE html>
<html ⚡4email>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

يجب ما يلي بالنسبة لرسالة AMP الإلكترونية

- <a name="dctp"></a>تبدأ بنوع مستند `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a>تحتوي على علامة `<html ⚡4email>` عالية المستوى (يتم قبول `<html amp4email>` أيضًا). [🔗](#ampd)
- <a name="crps"></a>تحتوي على علامات `<head>` و`<body>` (وهي اختيارية في HTML). [🔗](#crps)
- <a name="chrs"></a>تحتوي على علامة `<meta charset="utf-8">` كفرع أول لعلامة الرأس الخاصة بها. [🔗](#chrs)
- <a name="scrpt"></a>تحتوي على علامة `<script async src="https://cdn.ampproject.org/v0.js"></script>` داخل علامة الرأس الخاصة بها. [🔗](#scrpt)
- <a name="boilerplate"></a>تحتوي على القالب الأساسي amp4email (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) داخل علامة الرأس الخاصة بها لإخفاء المحتوى مبدئيًا حتى يتم تحميلAMP JS. [🔗](#boilerplate)

يجب ألا تتجاوز لغة ترميز AMPHTML بأكملها حجم 200000 بايت.

## الهيكل والعرض <a name="structure-and-rendering"></a>

يعتمد AMP للبريد الإلكتروني على النوع الفرعي `multipart/alternative` من [MIME](https://en.wikipedia.org/wiki/MIME)، كما هو محدد في  [RFC 1521، القسم 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

*لمزيد من المعلومات، راجع [الهيكل والعرض لرسائل AMP الإلكترونية](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-structure.md).*

## مكونات AMP المدعومة<a name="supported-amp-components"></a>

*راجع [المكونات المدعومة مع AMP للبريد الإلكتروني](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md).*

## متطلباتHTML <a name="html-requirements"></a>

*راجع [HTML المدعوم في AMP للبريد الإلكتروني](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-html.md).*

## متطلبات CSS<a name="css-requirements"></a>

### المحددات والخواص المدعومة <a name="supported-selectors-and-properties"></a>

*راجع [CSS المدعومة في AMP للبريد الإلكتروني](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-css.md).*

### تحديد CSS في مستند AMP<a name="specifying-css-in-an-amp-document"></a>

جميع CSS في أي مستند AMP يجب تضمينها في علامة `<style amp-custom>` داخل الرأس أو كسمة `style` مدمجة.

[sourcecode:html]
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>
...
</head>
[/sourcecode]

ملاحظة: لا يمكن أن تتجاوز علامة `<style>` بأكملها حجم 50000 بايت. سوف تفحص أداة التدقيق هذا الأمر.

## أبعاد المستند <a name="document-dimensions"></a>

- **العرض المثالي**: 800 بكسل أو أقل (أي مستند ومحتوى أعرض قد يتم اقتصاصة بشكل غير متوقع على بعض العملاء).

- **الارتفاع**: متغير، يسمح العميل للمستخدم بالتمرير عبر المحتوى.

## التحقق من الصحة <a name="validation"></a>

للتأكد من أن رسائلك الإلكترونية تستوفي المعايير الصارمة لتنسيق AMP للبريد الإلكتروني، يمكنك استخدام أدوات التحقق الموجودة من AMP.

راجع [التحقق من AMP للبريد الإلكتروني](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/) لمزيد من المعلومات.

## الخصوصية والأمان <a name="privacy-and-security"></a>

### تتبع فتح البريد الإلكتروني والتفاعل <a name="tracking-email-opens-and-interaction"></a>

يسمح AMPHTML بتتبع فتح البريد الإلكتروني باستخدام تقنيات تتبع البكسل، بنفس الطريقة مع رسائل HTML الإلكترونية العادية. وسوف تشير أي طلبات يطلقها المستخدم للبيانات من خدمات خارجية أيضًا إلى أن المستخدم يتفاعل مع الرسالة. قد يوفر عملاء البريد الإلكتروني للمستخدمين القدرة على تعطيل تحميل الصور عن بعد والطلبات الخارجية الأخرى.

### التحليلات الخاصة بـ AMP<a name="amp-specific-analytics"></a>

لا يتم دعم تقنيات التحليل الخاصة بـ AMP التالية:

- [AMP `CLIENT_ID`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [استبدال المتغير ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### الاعتبارات الخاصة بالمكون <a name="component-specific-considerations"></a>

يمكن أن تشير طلبات الصور داخل [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) أو [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) للمرسل بأن المستخدم يتفاعل مع الرسالة.

غير مسموح بعمليات إعادة التوجيه في [`<amp-form>`](https://amp.dev/documentation/components/amp-form) في وقت التشغيل.

## التعقيبات والدعم <a name="feedback--support"></a>

للحصول على دعم وتقديم تعقيبات بشأن AMP للبريد الإلكتروني، يرجى استخدام القناة التالية: [المشاركة المستمرة](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#ongoing-participation)
