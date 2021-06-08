---
'$title': هيكلة وإظهار رسائل AMP الإلكترونية
$order: 2
formats:
  - email
teaser:
  text: 'تجري هيكلة البريد الإلكتروني '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-structure.md.
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

تجري هيكلة البريد الإلكتروني كشجرة MIME. تحتوي شجرة MIME هذه على نص الرسالة وأي مرفقات بالبريد الإلكتروني.

لتضمين AMP داخل بريد إلكتروني، أضف جزء MIME جديد بنوع محتوى `text/x-amp-html` كتابع لـ`multipart/alternative`. يجب أن يتواجد بجانب أجزاء `text/html` أو `text/plain` الموجودة. هذا يضمن أن رسالة البريد الإلكتروني تعمل على جميع العملاء.

<amp-img alt="AMP for Email MIME Parts Diagram" layout="responsive" width="752" height="246" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/amp-email-mime-parts.png"><noscript data-md-type="raw_html" data-segment-id="12596198"><img data-md-type="raw_html" alt="مخطط أجزاء AMP للبريد الإلكتروني MIME" src="../img/amp-email-mime-parts.png"></noscript></amp-img>

لمزيد من المعلومات حول النوع الفرعي `multipart/alternative` ، راجع [RFC 1521، القسم 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

## معلومات إضافية <a name="additional-information"></a>

يجب إدراج الجزء `text/x-amp-html` أسفل عقدة `multipart/alternative`. لا يمكن أن تتضمن رسالة البريد الإلكتروني أكثر من جزء `text/x-amp-html` واحد داخل عقدة `multipart/alternative`.

يجب أن يحتوي `multipart/alternative` على عقدة (`text/plain` أو `text/html`) واحدة على الأقل غير مدعومة من AMP بالإضافة إلى عقدة `text/x-amp-html`. سوف يتم عرض هذا الأمر للمستخدمين الذين لا يدعم عملاء البريد الإلكتروني لديهم AMP أو الذين ينسحبون عن طريق إعدادات موفر البريد الإلكتروني.

ملاحظة: بعض عملاء البريد الإلكتروني[[1]](https://openradar.appspot.com/radar?id=6054696888303616) يُظهرون فقط جزء MIME الأخير، لذا نوصي بوضع جزء MIME بالقيمة `text/x-amp-html` _قبل_ جزء MIME بالقيمة `text/html`.

### دلالات الرد/إعادة التوجيه <a name="replyingforwarding-semantics"></a>

يزيل عميل البريد الإلكتروني جزء `text/x-amp-html` من شجرة MIME عندما يرد أحد المستخدمين أو يعيد إرسال رسالة AMP الإلكترونية.

### انتهاء الصلاحية <a name="expiry"></a>

قد يوقف عميل البريد الإلكتروني عرض جزء AMP من البريد الإلكتروني بعد فترة معينة من الوقت، مثل 30 يومًا. في هذه الحالة، سوف تعرض رسائل البريد الإلكتروني الجزء `text/html` أو `text/plain`.

## مثال <a name="example"></a>

<!-- prettier-ignore-start -->

[sourcecode:html]
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: An AMP email!
Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae
Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae
Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
Hello World in AMP!
</body>
</html>
--001a114634ac3555ae05525685ae
Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae--
[/sourcecode]

<!-- prettier-ignore-end -->
