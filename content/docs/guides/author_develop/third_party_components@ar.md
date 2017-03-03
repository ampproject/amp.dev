---
$title: تضمين المحتوى من جهات خارجية
---

تعرَّف على كيفية تضمين مكوّنات من جهات خارجية في صفحاتك.

[TOC]

## تضمين تغريدة

يمكنك تضمين إحدى تغريدات Twitter في صفحتك
باستخدام العنصر [`amp-twitter`](/docs/reference/extended/amp-twitter.html).

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

مثال لـ `amp-twitter` من
[مثال twitter.amp](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html):

[sourcecode:html]
<amp-twitter width="390" height="50"
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
[/sourcecode]

## تضمين Instagram

يمكنك تضمين Instagram في صفحتك
باستخدام العنصر <a href="/docs/reference/extended/amp-instagram.html">`amp-instagram`</a>.

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

[sourcecode:html]
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
[/sourcecode]

## عرض مشاركة أو فيديو Facebook

يمكنك عرض مشاركة أو فيديو Facebook في صفحتك
باستخدام العنصر [`amp-facebook`](/docs/reference/extended/amp-facebook.html).

يجب تضمين النص البرمجي التالي في `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

مثال - تضمين مشاركة:

[sourcecode:html]
<amp-facebook width=486 height=657
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
[/sourcecode]

مثال - تضمين فيديو:

[sourcecode:html]
<amp-facebook width=552 height=574
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
[/sourcecode]

## تضمين فيديو youtube

يمكنك تضمين فيديو youtube في صفحتك
باستخدام العنصر <a href="/docs/reference/extended/amp-youtube.html">`amp-youtube`</a>.

يجب تضمين النص البرمجي التالي في `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

يمكن العثور على مُعرّف `data-videoid` لموقع Youtube في كل عنوان URL لصفحة فيديو على Youtube.
فمثلاً، في https://www.youtube.com/watch?v=Z1q71gFeRqM،
يكون Z1q71gFeRqM هو معرّف الفيديو.

استخدم `layout="responsive"` لعرض التنسيقات الصحيحة لمقاطع الفيديو بنسبة عرض إلى ارتفاع تبلغ 16:9:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
[/sourcecode]

## عرض أحد الإعلانات

يمكنك عرض إعلان في صفحتك
باستخدام العنصر <a href="/docs/reference/amp-ad.html">`amp-ad`</a>.
والإعلانات المعروضة من خلال HTTPS هي وحدها المعتمدة.

غير مسموح بتشغيل جافا سكريبت مقدمة من شبكة إعلانية داخل مستند AMP.
وبدلاً من ذلك، يحمّل وقت تشغيل AMP إطار iframe من
أصل مختلف (من خلال وضع حماية إطارات iframe)
ويعمل على تنفيذ جافا سكريبت المقدمة من الشبكة الإعلانية داخل وضع حماية إطارات iframe هذا.

يجب تحديد عرض وارتفاع الإعلان، ونوع الشبكة الإعلانية.
ويُحدد `type` نموذج الشبكة الإعلانية.
وتتطلب أنواع الإعلانات المختلفة سمات `data-*` مختلفة.

[sourcecode:html]
<amp-ad width="300" height="250"
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
[/sourcecode]

إذا كان ذلك متاحًا من الشبكة،
يمكنك تضمين `placeholder`
لعرضه إذا لم يكن الإعلان متاحًا:

[sourcecode:html]
<amp-ad width="300" height="250"
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
[/sourcecode]

يتوافق AMP مع مجموعة كبيرة من الشبكات الإعلانية. راجع [إشارة إلى قائمة كاملة](/docs/reference/amp-ad.html#supported-ad-networks).
