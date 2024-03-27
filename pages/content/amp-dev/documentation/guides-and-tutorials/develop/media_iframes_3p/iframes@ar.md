---
'$title': تضمين iframes
$order: 10
description: تعرف على طريقة عرض تضمين محتوى الوسائط في صفحاتك، وطريقة استخدام iframe لعرض محتوى متقدم خارج حدود AMP.
formats:
  - websites
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## الأساسيات

يمكنك عرض iframe في صفحتك عن طريق استخدام العنصر [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md).

إن Iframe مفيدة بشكل خاص في AMP لعرض المحتوى غير المدعوم في سياق الصفحة الرئيسية، مثل المحتوى الذي يتطلب JavaScript من تأليف المستخدم.

### متطلبات `amp-iframe`

- يجب أن تكون على الأقل **600بكسل** أو **75%** من منفذ العرض الأول بعيدًا عن الجزء العلوي (باستثناء إطارات iframes التي تستخدم [`placeholder`](#using-placeholders)).
- يمكن طلب الموارد عبر HTTPS فقط، ويجب ألا تكون في الأصل نفسه مثل الحاوية، إلا إذا لم تحدد السماح-بالأصل-نفسه.

[tip type="read-on"] **تابع القراءة –** تعرف على المزيد حول [المواصفات الكاملة لـ `amp-iframe`](../../../../documentation/components/reference/amp-iframe.md). [/tip]

### تضمين النص البرمجي

لتضمين [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) في صفحتك، قم أولًا بتضمين النص البرمجي التالي في `<head>`، الذي يقوم بتحميل الرمز الإضافي للمكون الممتد:

[sourcecode:html]

<script async custom-element="amp-iframe"
  src="https://ampjs.org/v0/amp-iframe-0.1.js"></script>

[/sourcecode]

### كتابة لغة الترميز

في المثال التالي، قمنا بإنشاء [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) سريع الاستجابة لدمج خرائط جوجل عبر [واجهة برمجة التطبيقات لدمج خرائط جوجل](https://developers.google.com/maps/documentation/embed/guide):

```html
<amp-iframe
  width="200"
  height="100"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe"
>
</amp-iframe>
```

## استخدام العناصر النائبة <a name="using-placeholders"></a>

يمكنك عرض [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) في الجزء الأعلى من المستند، بشرط أن يحتوي [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) على عنصر بالسمة `placeholder`، (على سبيل المثال، عنصر [`amp-img`](../../../../documentation/components/reference/amp-img.md)) والذي سيتم عرضه كعنصر نائب حتى يصبح إطار iframe جاهزًا للعرض.

[tip type="read-on"] **تابع القراءة –**: تعرف على المزيد حول العناصر النائبة في [Iframe بالعناصر النائبة](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder). [/tip]

أمثلة مع العناصر النائبة:

```html
<amp-iframe
  width="400"
  height="225"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://giphy.com/embed/OWabwoEn7ezug"
>
  <amp-img
    placeholder
    layout="fill"
    src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"
  ></amp-img>
</amp-iframe>
```

يعرض على النحو التالي:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## أمثلة

يمكنك العثور على المزيد من أمثلة [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) المتقدمة في [أمثلة استخدام AMP](../../../../documentation/examples/documentation/amp-iframe.html).
