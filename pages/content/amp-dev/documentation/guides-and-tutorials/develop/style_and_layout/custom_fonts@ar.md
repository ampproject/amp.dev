---
"$title": إضافة خطوط مخصصة
"$order": '6'
description: لا يمكن أن تحتوي صفحات AMP على صفحات أنماط خارجية، باستثناء الخطوط المخصصة. ويمكنك تضمين الخطوط المخصصة في صفحتك بطريقتين ...
formats:
- websites
- ads
- stories
author: pbakaus
---

لا يمكن أن تحتوي صفحات AMP على صفحات أنماط خارجية، باستثناء الخطوط المخصصة. ويمكنك تضمين الخطوط المخصصة في صفحتك بطريقتين:

1. من خلال علامة `<link>` (مزودي الخطوط المدرجين في قائمة السماح فقط)
2. عبر `@font-face` (لا قيود مفروضة، جميع الخطوط مسموح بها)

### 1. استخدام `<link>`

استخدم علامة `<link>` (عادة في رأس صفحتك)، مثل:

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

الأصول التالية مدرجة في قائمة السماح ومسموح بها لعرض الخط عبر علامات الارتباط:

- Typography.com: **https://cloud.typography.com**
- Fonts.com: **https://fast.fonts.net**
- Google Fonts: **https://fonts.googleapis.com**
- Typekit: **https://use.typekit.net**
- Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

### 2. استخدام `@font-face`

بدلًا عن ذلك، يمكنك استخدام [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) ضمن صفحة الأنماط الخاصة بـ AMP لديك:

[sourcecode:html]
<style amp-custom>
  @font-face {
    font-family: "Bitstream Vera Serif Bold";
    src: url("https://somedomain.org/VeraSeBd.ttf");
  }

  body {
    font-family: "Bitstream Vera Serif Bold", serif;
  }
</style>
[/sourcecode]

[tip type="note"] **ملحوظة –**  يجب إحضار الخطوط المضمنة في `@font-face` عبر مخطط HTTP أو HTTPS. [/tip]
