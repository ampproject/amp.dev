---
"$title": Include third-party content
"$order": '9'
description: تعلم كيفية تضمين مكونات الأطراف الثالثة في صفحاتك...
formats:
- websites
components:
- iframe
- facebook
author: Meggin
contributors:
- pbakaus
- bpaduch
---

تعرَّف على كيفية تضمين مكوّنات من جهات خارجية في صفحاتك.

## تضمين تغريدة

يمكنك تضمين إحدى تغريدات Twitter في صفحتك باستخدام العنصر [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

لتضمين تغريدة في صفحتك، عليك أولاً تضمين النص البرمجي التالي في `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

يتم حاليًا تغيير أحجام التغريدات تلقائيًا بشكل نسبي لملاءمة الحجم المتوفّر، ولكن قد يؤدي هذا إلى مظهر غير مثالي. يمكنك تعديل العرض والارتفاع المقدمين يدويًا أو استخدام سمة الوسائط لتحديد نسبة العرض إلى الارتفاع بناءً على عرض الشاشة.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

[tip type="tip"] <strong>تلميح –</strong> انظر المزيد من أمثلة <a><code>amp-twitter</code></a> في <a class="" href="https://gitlocalize.com/repo/4863/ar/pages/content/amp-dev/documentation/examples/documentation/amp-twitter.html">توضيح AMP بالأمثلة</a>. [/tip]

## تضمين Instagram

قم بتضمين Instagram في صفحتك باستخدام عنصر [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) .

لتضمين Instagram، قم أولا بتضمين النص البرمجي التالي في `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram"
  src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

يمكنك تضمين الرمز القصير لبيانات Instagram والمتوفّر في عنوان URL لصورة Instagram. على سبيل المثال، في `https://instagram.com/p/fBwFP`، يكون `fBwFP` هو الرمز القصير للبيانات. كما يستخدم Instagram أيضًا نسبة ثابتة للعرض إلى الارتفاع للتنسيقات سريعة الاستجابة، وهكذا يجب أن تكون قيمة العرض والارتفاع عامة.

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

[tip type="tip"] <strong>تلميح –</strong> انظر المزيد من أمثلة <a><code>amp-instagram</code></a> في <a>توضيح AMP بالأمثلة</a>. [/tip]

## عرض مشاركة أو فيديو Facebook

يمكن عرض منشور أو فيديو Facebook في صفحتك باستخدام العنصر <a><code>amp-facebook</code></a>.

يجب تضمين النص البرمجي التالي في <code><head></code>:

[sourcecode:html]
<script async custom-element="amp-facebook"
  src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### مثال - تضمين مشاركة

مصدر الرمز:

```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```

معاينة: <amp-facebook width="476" height="316" layout="responsive" data-embed-as="video" data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"> </amp-facebook>

##### مثال - تضمين فيديو

مصدر الرمز:

```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```

معاينة: {amp-facebook0} {/amp-facebook0}

[tip type="tip"] <strong>تلميح –</strong> انظر المزيد من أمثلة <a><code>amp-facebook</code></a> في <a>توضيح AMP بالأمثلة</a>. [/tip]

## تضمين فيديو youtube

يمكنك تضمين فيديو youtube في صفحتك باستخدام العنصر <a><code>amp-youtube</code></a>.

يجب تضمين النص البرمجي التالي في `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

يمكن العثور على مُعرّف <code>data-videoid</code> لموقع Youtube في كل عنوان URL لصفحة فيديو على Youtube. فمثلاً، في <code>https://www.youtube.com/watch?v=Z1q71gFeRqM</code>، يكون <code>Z1q71gFeRqM</code> هو معرّف الفيديو.

استخدم <code>layout="responsive"</code> لعرض التنسيقات الصحيحة لمقاطع الفيديو بنسبة عرض إلى ارتفاع تبلغ 16:9:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

[tip type="tip"] <strong>تلميح –</strong> انظر المزيد من أمثلة <a><code>amp-youtube</code></a> في <a>توضيح AMP بالأمثلة</a>. [/tip]

## عرض أحد الإعلانات

يمكن عرض أحد الإعلانات في الصفحة باستخدام عنصر <a><code>amp-ad</code></a>. يتم فقط دعم الإعلانات المقدمة عن طريق HTTPS.

غير مسموح بتشغيل JavaScript مقدمة من شبكة إعلانية داخل مستند AMP. وبدلاً من ذلك، يحمّل وقت تشغيل AMP إطار iframe من أصل مختلف (من خلال وضع حماية إطارات iframe) ويعمل على تنفيذ جافا سكريبت المقدمة من الشبكة الإعلانية داخل وضع حماية إطارات iframe هذا.

يجب تحديد عرض وارتفاع الإعلان، ونوع الشبكة الإعلانية. ويُحدد <code>type</code> نموذج الشبكة الإعلانية. وتتطلب أنواع الإعلانات المختلفة سمات <code>data-*</code> مختلفة.

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
</amp-ad>
```
[/example]

في حالة دعم ذلك من شبكة الإعلانات، فقم بتضمين `placeholder` ليتم عرضه في حالة عدم توفر أي إعلان:

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
  <div placeholder>Have a great day!</div>
</amp-ad>
```
[/example]

يدعم AMP مجموعة كبيرة من الشبكات. راجع [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) للتعرف على القائمة الكاملة.

[tip type="read-on"] **تابع القراءة –** تعلم المزيد حول الإعلانات في دليل [تقديم الإعلانات على AMP](../../../../documentation/guides-and-tutorials/develop/monetization/index.md). [/tip]
