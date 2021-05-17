---
'$title': المكونات المدعومة مع AMP للبريد الإلكتروني
$order: 3
formats:
  - email
teaser:
  text: 'فيما يلي قائمة بمكونات AMP المدعومة حاليًا في رسائل AMP الإلكترونية. ويتم تجميع المكونات تحت الفئات التالية:'
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md.
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

فيما يلي قائمة بـ [مكونات AMP](https://amp.dev/documentation/components/?format=email) المدعومة حاليًا في رسائل AMP الإلكترونية. ويجري تجميع المكونات تحت الفئات التالية:

- [المحتوى الديناميكي ](#dynamic-content)
- [التخطيط](#layout)
- [الوسائط](#media)

## المحتوى الديناميكي <a name="dynamic-content"></a>

| العنصر                                                                                                                                                                       | الوصف                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<amp-form>`](https://amp.dev/documentation/components/amp-form)                                                                                                            | عنصر النموذج. يجب استخدام سمة action-xhr بدلا من سمة الإجراء العادية. حيث يمكن استخدامها مع `<template type="amp-mustache">` لإظهار استجابة. <br><br>**ملاحظة: **غير مسموح [بإعادة التوجيه بعد الإرسال](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission). |
| [`<amp-selector>`](https://amp.dev/documentation/components/amp-selector)                                                                                                    | عنصر واجهة مستخدم للاختيار المتعدد للاستخدام داخل نموذج.                                                                                                                                                                                                                                    |
| [`amp-bind`](https://amp.dev/documentation/components/amp-bind) و[`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | لغة نصوص برمجية بسيطة في AMP تسمح باستخدام تسلسل حالات للتفاعلات بين العناصر. ويمكن أيضًا استخدامها لإضافة سلوك في أحداث معينة.<br><br>**ملاحظة:** يحظر ربطها بـ `[href]` أو `[src]`. يحظر أيضًا استخدام إجراءات `AMP.print` و `AMP.navigateTo` و`AMP.goBack`.                              |
| [`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification)                                                                             | يتم استخدام `<amp-state>` لتعريف الحالة الأولية المستخدمة من جانب `amp-bind`.<br><br>**ملاحظة:** لا يتم حاليا دعم السمة `src`.                                                                                                                                                              |
| [`<amp-list>`](https://amp.dev/documentation/components/amp-list)                                                                                                            | يجلب بيانات JSON عن بعد والتي سيتم عرضها بواسطة [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache).<br><br>**ملاحظة:** غير مسموح الربط بسمة `[src]`. يحظر أيضًا تضمين بيانات اعتماد المستخدم مع `credentials="include"`.                                             |
| [`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache)                                                                                    | لغة ترميز قالب شارب لعرض نتائج `amp-list`.                                                                                                                                                                                                                                                  |

## التخطيط <a name="layout"></a>

| العنصر                                                                                                      | الوصف                                                     |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [سمات التخطيط](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | يتحدد سلوك التخطيط بواسطة سمة التخطيط                     |
| [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)                                 | عنصر واجهة مستخدم لتسهيل عرض/إخفاء أقسام مختلفة.          |
| [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel)                                   | مكون واجهة مستخدم UI.                                     |
| [`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text)                                   | مكون مساعدة لاحتواء النص داخل منطقة معينة.                |
| [`<amp-layout>`](https://amp.dev/documentation/components/amp-layout)                                       | حاوية يمكن أن تتضمن نسبة أبعاد تبعًا للتخطيطات الاستجابة. |
| [`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar)                                     | شريط جانبي لأغراض التنقل.                                 |
| [`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago)                                     | يوفر طريقة ملائمة لإظهار الطوابع الزمنية.                 |

## الوسائط <a name="media"></a>

| العنصر                                                            | الوصف                                                                       |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [`<amp-img>`](https://amp.dev/documentation/components/amp-img)   | مكون AMP يحل محل `<img>`.<br><br>**ملاحظة:** الربط بـ `[src]` غير مسموح به. |
| [`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | ملفات GIF المدمجة.<br><br>**ملاحظة:** الربط بـ `[src]` غير مسموح به.        |
