---
'$title': إنشاء غلاف للإعلان
$order: 0
description: '"باستخدام محرر النصوص المفضل لديك، قم بإنشاء ملف HTML باسم my-amphtml-ad.html. وانسخ لغة ترميز HTML التالية إلى ذلك الملف: ..."'
---

يُعد [رمز HTML المطلوب لإعلان AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) أحد صيغ [AMPHTML المطلوب لصفحة AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md). دعنا نتعرف على الرمز المطلوب من خلال إنشاء غلاف إعلان AMPHTML الخاص بنا.

باستخدام محرر النصوص المفضل لديك، قم بإنشاء ملف HTML باسم my-amphtml-ad.html. وانسخ لغة ترميز HTML التالية إلى ذلك الملف:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My amphtml ad</title>
    <meta name="viewport" content="width=device-width" />
  </head>
  <body></body>
</html>
```

لغة الترميز هذه لملف HTML أساسي وصالح، لاحظ أننا قمنا بتضمين علامة منفذ العرض `meta` حتى يكون لدينا [منفذ عرض سريع الاستجابة](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#controlling-the-viewport).

والآن، دعنا نعدِّل HTML لجعله إعلان AMPHTML.

في العلامة `<html>`، أضف السمة `⚡4ads`، التي تحدد المستند كإعلان AMPHTML. بدلًا عن ذلك، يمكنك تحديد السمة `amp4ads`، التي تعد صالحة أيضًا.

```html
<!DOCTYPE html>
<html ⚡4ads>
  <head>
    ...
  </head>
</html>
```

[tip type="note"] **ملحوظة –** على عكس صفحات AMP، [لا تتطلب إعلانات AMPHTML علامة`<link rel="canonical">`](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#amphtml-ad-format-rules). [/tip]

تتطلب إعلانات AMPHTML إصدارها الخاص من وقت تشغيل AMP، لذا أضف علامة `<script>` التالية إلى قسم `<head>` من المستند الخاص بك:

```html
<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
```

تتطلب تصميمات إعلانات AMPHTML خط نمط [معياري](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#boilerplate) مختلفًا وبسيطًا إلى حد كبير عما تتطلبه صفحات AMP. أضف لرمز التالي إلى قسم `<head>`:

```html
<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>
```

لتحديد نمط إعلان AMPHTML الخاص بك، يجب أن تكون CSS مضمنة في مستند AMPHTML باستخدام علامات <code><style amp-custom></style></code> في القسم <code><head></code>. ونظرًا لأننا نعرض إعلانًا مصورًا أساسيًا، فإننا لا نطلب أي CSS، لذلك لن نضيف هذه العلامات.

[tip type="note"] **ملحوظة –** بالنسبة لإعلانات AMPHTML، يبلغ الحد الأقصى لحجم صفحة الأنماط المضمنة _20 كيلو بايت_. اعرف المزيد عن [متطلبات CSS في مواصفات إعلان AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#css). [/tip]

إليك الكود الكامل لملف HTML الخاص بك:

```html
<!DOCTYPE html>
<html ⚡4ads>
  <head>
    <meta charset="utf-8" />
    <title>My amphtml ad</title>
    <meta name="viewport" content="width=device-width" />
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
    <style amp4ads-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
  </head>
  <body></body>
</html>
```

والآن لديك إعلان AMPHTML صالح، وإن كان فارغًا نوعًا ما؛ لنقم بإنشاء الإعلان المصور.
