---
$title: تضمين المحتوى من جهات خارجية
---

تعرَّف على كيفية تضمين مكوّنات من جهات خارجية في صفحاتك.

[TOC]

## تضمين تغريدة

يمكنك تضمين إحدى تغريدات Twitter في صفحتك
باستخدام العنصر [`amp-twitter`](/docs/reference/components/amp-twitter.html).

لتضمين تغريدة في صفحتك،
عليك أولاً بتضمين النص البرمجي التالي في `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

يتم حاليًا تغيير أحجام التغريدات تلقائيًا بشكل نسبي
لملاءمة الحجم المتوفّر،
ولكن قد يؤدي هذا إلى مظهر غير مثالي.
يمكنك تعديل العرض والارتفاع المقدمين يدويًا أو استخدام سمة الوسائط
لتحديد نسبة العرض إلى الارتفاع بناءً على عرض الشاشة.

<!-- embedded twitter example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.twitter.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## تضمين Instagram

يمكنك تضمين Instagram في صفحتك
باستخدام العنصر <a href="/docs/reference/components/amp-instagram.html">`amp-instagram`</a>.

لتضمين Instagram،
عليك أولاً بتضمين النص البرمجي التالي في `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

يمكنك تضمين الرمز القصير لبيانات Instagram والمتوفّر في عنوان URL لصورة Instagram.
على سبيل المثال، في `https://instagram.com/p/fBwFP`،
يكون `fBwFP` هو الرمز القصير للبيانات.
كما يستخدم Instagram أيضًا نسبة ثابتة للعرض إلى الارتفاع للتنسيقات سريعة الاستجابة،
وهكذا يجب أن تكون قيمة العرض والارتفاع عامة.

<!-- embedded Instagram example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.instagram.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## عرض مشاركة أو فيديو Facebook

يمكنك عرض مشاركة أو فيديو Facebook في صفحتك
باستخدام العنصر [`amp-facebook`](/docs/reference/components/amp-facebook.html).

يجب تضمين النص البرمجي التالي في `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### مثال - تضمين مشاركة

مصدر الرمز:
```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```
معاينة:
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>

##### مثال - تضمين فيديو

مصدر الرمز:
```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```
معاينة:
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>

## تضمين فيديو youtube

يمكنك تضمين فيديو youtube في صفحتك
باستخدام العنصر <a href="/docs/reference/components/amp-youtube.html">`amp-youtube`</a>.

يجب تضمين النص البرمجي التالي في `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

يمكن العثور على مُعرّف `data-videoid` لموقع Youtube في كل عنوان URL لصفحة فيديو على Youtube.
فمثلاً، في `https://www.youtube.com/watch?v=Z1q71gFeRqM`،
يكون `Z1q71gFeRqM` هو معرّف الفيديو.

استخدم `layout="responsive"` لعرض التنسيقات الصحيحة لمقاطع الفيديو بنسبة عرض إلى ارتفاع تبلغ 16:9:

<!-- embedded youtube example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.youtube.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## عرض أحد الإعلانات

يمكنك عرض إعلان في صفحتك
باستخدام العنصر <a href="/docs/reference/components/amp-ad.html">`amp-ad`</a>.
والإعلانات المعروضة من خلال HTTPS هي وحدها المعتمدة.

غير مسموح بتشغيل جافا سكريبت مقدمة من شبكة إعلانية داخل مستند AMP.
وبدلاً من ذلك، يحمّل وقت تشغيل AMP إطار iframe من
أصل مختلف (من خلال وضع حماية إطارات iframe)
ويعمل على تنفيذ جافا سكريبت المقدمة من الشبكة الإعلانية داخل وضع حماية إطارات iframe هذا.

يجب تحديد عرض وارتفاع الإعلان، ونوع الشبكة الإعلانية.
ويُحدد `type` نموذج الشبكة الإعلانية.
وتتطلب أنواع الإعلانات المختلفة سمات `data-*` مختلفة.

<!-- embedded ad example -->
<div>
<amp-iframe height="212"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

إذا كان ذلك متاحًا من الشبكة،
يمكنك تضمين `placeholder`
لعرضه إذا لم يكن الإعلان متاحًا:

<!-- embedded ad example -->
<div>
<amp-iframe height="232"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-placeholder.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

يتوافق AMP مع مجموعة كبيرة من الشبكات الإعلانية. راجع [إشارة إلى قائمة كاملة](/docs/reference/components/amp-ad.html#supported-ad-networks).
