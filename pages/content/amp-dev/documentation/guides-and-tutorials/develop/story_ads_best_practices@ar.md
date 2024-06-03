---
'$title': أفضل الممارسات لإنشاء إعلان قصة ويب
$order: 16
description: تعد قصص الويب تجربة قابلة للنقر بملء الشاشة تغمر القراء في المحتوى. يجب أن يكون للإعلانات التي تظهر في قصص الويب تصميم متسق ومتماسك مع تجربة مستخدم قصص الويب.
formats:
  - ads
  - stories
---

تعد قصص الويب تجربة قابلة للنقر بملء الشاشة تغمر القراء في المحتوى. يجب أن يكون للإعلانات التي تظهر في قصص الويب تصميم متسق ومتماسك مع تجربة مستخدم قصص الويب. وهذا يمنع تجربة المستخدم المتعارضة أو المتقطعة. فيما يوضح هذا الدليل كيفية إنشاء إعلان لقصص الويب.

## مبادئ إعلانات قصص الويب

لا تتكامل أشكال الإعلانات الحالية، مثل الشعارات والمربعات، بشكل جيد مع تنسيق قصص الويب. كما الإعلانات الكلاسيكية بطيئة ومتقطعة وتشعر بأنها في غير مكانها في تجربة القصة.

تتوافق إعلانات قصة الويب مع المبادئ التالية:

- إعلانات AMPHTML الصالحة: تتبع التصنيف الفني نفسه كالإعلانات التقليدية [AMPHTML ad](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md).
- المرئيات أولًا: حالة دعوة جذابة وظاهرة ومدفوعة بالسياق.
- أصلية: تحتوي صفحة الإعلان على الأبعاد نفسها مثل صفحة القصة الأصلية.
- نموذج التفاعل نفسه: يمكن للمستخدم المتابعة إلى الشاشة التالية تمامًا كما يفعل مع صفحة القصة الأصلية.
- سريعة: لا يظهر الإعلان للمستخدم في حالة نصف محملة أبدًا.

لتحقيق الاتساق مع هذه المبادئ، يحدد وقت تشغيل قصة الويب الموضع المناسب لصفحة إعلان وسط قصة ويب، اقرأ المزيد حول آليات موضع الإعلان في [الإعلان في قصص الويب](advertise_amp_stories.md).

## نموذج إعلان قصة ويب

تعد إعلانات قصة الويب إعلانات AMPHTML، ولكنها تتطلب بيانات علامة وصفية وتفي بمواصفات التخطيط المحددة وعناصر واجهة المستخدم المطلوبة. وسيتضمن إعلان قصة الويب دائمًا زر دعوة إلى اتخاذ إجراء وتسمية إعلان معروضة كإخلاء نصي أعلى الصفحة.

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='مثال على إعلان قصة AMP', caption='مثال على إعلان قصة AMP ', align='' ) }}

للحفاظ على اتساق تجربة المستخدم، تقع مسؤولية عرض تسمية الإعلان وزر الدعوة لاتخاذ إجراء على عاتق وقت تشعيل قصة الويب.

[tip type="important"] **مهم–** يكون زر الدعوة لاتخاذ إجراء وحده هو القابل للنقر فوقه في إعلان قصة ويب، لذا تذكر هذا الأمر دائمًا عند تطوير تصميمك. [/tip]

## بيانات العلامة الوصفية

تحدد بيانات علامة التعريف ما إذا كان الإعلان يستوفي تنسيق قصة ويب أم لا، كما يعين قيمة تعداد نص زر الدعوة لاتخاذ إجراء، ويوجه نحو المكان الذي سيرسل الزر إليه المستخدِم وكذا نوع الصفحة.

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <!-- Specifies where the user is directed -->
    <meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

    <!-- Specifies the call to action button text enum -->
    <meta name="amp-cta-type" content="EXPLORE">

    <!-- Specifies what type of landing page the user is direct to -->
    <meta name="amp-cta-landing-page-type" content="NONAMP">

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>
     amp-img {height: 100vh}
    </style>
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>

  </head>
  <body>
    <amp-img src=%%FILE:JPG1%% layout="responsive" height="1280" width="720"></amp-img>
  </body>
</html>
[/sourcecode]

يوصى باختيار علامة <code>amp-cta-type tag</code> من [خيارات نص زر الدعوة لاتخاذ إجراء المتوفرة](#call-to-action-button-text-enum). وستقوم AMP تلقائيًا بتوطين الخيارات المحددة مسبقًا عند الاقتضاء.

وكما أنه يُسمَح بالنص المخصص، لكن ستحتاج إلى تنفيذ عملية التوطين الخاصة بك.

## تعداد نص زر الدعوة إلى اتخاذ إجراء <a name="call-to-action-button-text-enum"></a>

يمكن تكوين زر الدعوة لاتخاذ إجراء من مجموعة محددة مسبقًا من الخيارات:

- `APPLY_NOW`: "تطبيق الآن"
- `BOOK_NOW`: "حجز"
- `BUY_TICKETS`: "شراء تذاكر"
- `DOWNLOAD`: "تنزيل"
- `EXPLORE`: "استكشف الآن"
- `GET_NOW`: "احصل عليه الآن"
- `INSTALL`: "تثبيت الآن"
- `LISTEN`: "الاستماع الآن"
- `MORE`: "المزيد"
- `OPEN_APP`: "فتح التطبيق"
- `ORDER_NOW`: "طلب الآن"
- `PLAY`: "تشغيل"
- `READ`: "القراءة الآن"
- `SHOP`: "التسوق الآن"
- `SHOWTIMES`: "أوقات العرض"
- `SIGN_UP`: "تسجيل"
- `SUBSCRIBE`: "الاشتراك الآن"
- `USE_APP`: "استخدام التطبيق"
- `VIEW`: "عرض"
- `WATCH`: "مشاهدة"
- `WATCH_EPISODE`: "مشاهدة الحلقة"

[tip type="note"] **ملحوظة–** إن الروابط العميقة التي ستظهر ليست مدعومة، لكن الروابط إلى صفحات App Store أو Google Play مدعومة باستخدام http/https. إذ يتم تحديد تعداد نص زر الدعوة لاتخاذ إجراء في التحميل الأساسي لاستجابة الإعلان. [/tip]

إذا احتجت إلى الدعم لتعداد نص زر الدعوة لاتخاذ إجراء جديد، يرجى فتح [مشكلات GitHub ](https://github.com/ampproject/amphtml/issues/new).

## صفحة هبوط الإعلانات

يمكنك تحديد أحد الخيارات الثلاثة لصفحة هبوط إعلان قصة الويب.

- `STORY`: صفحة الهبوط عبارة عن قصة [لها رعاية](story_ads_best_practices.md#sponsored-story).
- `AMP`: صفحة الهبوط عبارة عن صفحة AMP صالحة.
- `NONAMP`: أي نوع آخر من صفحات الويب.

## التخطيط

قصص AMP أفقية وبملء الشاشة. مطلوب إعلانات القصة لمطابقة هذا الشكل لتوفير تجربة مستخدم متسقة.

## أبعاد التراكب

يتراكب تصنيف الإعلان على شريط متدرج داكن عبر عرض الإعلان بالكامل ويمتد من الأعلى إلى 46 بكسل لأسفل.

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='شرح تراكب الإعلان', caption='يقع تراكب الإعلان في الجزء العلوي', align='' ) }}

يقع زر الدعوة لاتخاذ إجراء في 32 بكسل من الأسفل ويتم توسيطه أفقيًا، وهو 120 بكسل × 36 بكسل.

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='شرح زر الدعوة لاتخاذ إجراء', caption='يقع زر الدعوة لاتخاذ إجراء بالقرب من الجزء السفلي', align='' ) }}

## الصور ومقاطع الفيديو

يجب أن تكون الصور ومقاطع الفيديو المضمنة في إعلان قصة AMP بملء الشاشة القياسي 4: 3. ويجب أن تستخدم الإعلانات التي تتضمن فيديو [ملصق](../../../documentation/components/reference/amp-video.md#poster) الأبعاد الموصى بها لصورة الملصق وهي 720 بكسل (720 عرض × 1280 ارتفاع).

[sourcecode:html]
<amp-video controls
  width="720"
  height="1280"
  layout="responsive"
  poster="images/kitten-playing.png">

  <source src="videos/kitten-playing.webm"
    type="video/webm" />
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
[/sourcecode]

### الصورة

يمكن تحجيم صور الخلفية إلى ملء الشاشة. ويعد CSS التالي طريقة ناجحة لاقتصاص مقاطع الفيديو والصور وتوسيطها.

[sourcecode:html]

<style amp-custom>
    amp-img, amp-video {
        height: 100vh;
    }
    amp-video video {
        object-fit: cover;
    }
    amp-img img{
        object-fit: cover;
    }
</style>

[/sourcecode]

### مقطع الفيديو

#### حدد `<source>` مقابل `src`

عند تحديد المصدر لـ [`amp-video`](../../../documentation/components/reference/amp-video.md)

مثال: تحديد ملفات مصدر متعددة

[sourcecode:html]
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">

  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
[/sourcecode]

#### حجم الفيديو ومدته

للحصول على الأداء الأمثل، يجب أن تهدف إلى توفير مقاطع فيديو لا يزيد حجمها عن 4 ميجابايت. إذ تسمح أحجام الملفات الأصغر بالتنزيل بشكل أسرع، لذا اجعل الأشياء صغيرة قدر الإمكان.

#### تنسيقات الفيديو

إذا كان بإمكانك تقديم تنسيق فيديو واحد فقط، فقدم **MP4**. على الرغم من ذلك، حيثما أمكن، استخدم فيديو **HLS** وحدد MP4 كإجراء احتياطي للمتصفحات التي لا تدعم فيديو HLS حتى الآن. إذ يقوم HLS بأداء دفق معدل البت التكيفي، حيث يمكن تغيير جودة الفيديو لتناسب اتصال شبكة المستخدم.

[tip type="note"] **ملحوظة–** إن تنسيق الفيديو HLS غير مدعوم في متصفح Chrome لسطح المكتب (ولا حتى من خلال المحاكاة)، لذا فإن تحديد تنسيق احتياطي MP4 مطلوب لأي زيارات سطح مكتب إلى صفحتك. ولتصحيح أخطاء مقاطع فيديو HLS، ستحتاج إلى استخدام جهاز محمول فعلي عبر تصحيح أخطاء USB. [/tip]

#### دقة الفيديو

Web Story videos are always vertical (i.e., portrait view), with an expected aspect ratio of 16:9. Use the recommended resolution for the video streaming type:

<table>
  <thead>
    <tr>
     <th>نوع دفق الفيديو</th>
     <th>الدقة</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>غير قابل للتكيف</td>
     <td>720 x 1280 بكسل</td>
    </tr>
    <tr>
     <td>قابل للتكيف</td>
     <td>720 x 1280 بكسل<br>540 x 960 بكسل<br>360 x 480 بكسل</td>
    </tr>
  </tbody>
</table>

[tip type="note"] **ملحوظة–** بالنسبة للأجهزة المحمولة التي تختلف عن نسبة العرض إلى الارتفاع 16:9، قد يتم اقتصاص الفيديو أفقيًا أو رأسيًا لملاءمة إطار العرض. [/tip]

#### ترميز الفيديو

1. لتنسيق MP4، استخدم `H.264`.
2. لتنسيق WEBM، استخدم `VP9`.
3. لتنسيق HLS أو DASH، استخدم `H.264`.

#### جودة الفيديو

##### تخصيص تحويل الشفرة

هناك العديد من الأدوات التي يمكنك استخدامها لترميز مقاطع الفيديو وضبط جودة الفيديو أثناء الترميز. إليك عدد قليل منها:

<table>
  <thead>
    <tr>
     <th>الأداة</th>
     <th>الملحوظات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a></td>
     <td>التخصيصات الموصى بها:       <ul>         <li>لتنسيق MP4، استخدم <code>-crf 23</code>.</li>         <li>لتنسيق WEBM، استخدم <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a></td>
     <td>التخصيصات الموصى بها:       <ul>         <li>لتنسيقMP4، استخدم <code>-crf 23</code>.</li>         <li>لتنسيقWEBM، استخدم <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>برنامج تشفير يمكنه أيضًا إخراج تنسيق HLS بما في ذلك قائمة التشغيل.</td>
    </tr>
  </tbody>
</table>

##### حجم مقطع فيديو HLS

تأكد من أن حجم مقاطع HLS الخاصة بك لا تزيد مدتها عن 10 ثوانٍ.

## حيوية

ثمة بعض المحاذير للرسوم المتحركة في القصص، مثل مفهوم ما هو "مرئي". على سبيل المثال: في عرض سطح المكتب الخاص بـ "3 panel"، قد يكون تصميمك مرئيًا على الصفحة ولكن ليس التركيز المركزي بعد. ويمكن أن يمثل هذا الأمر مشكلة إذا كان التأثير المطلوب هو بدء الرسوم المتحركة عندما تصبح الصفحة نقطة التركيز الرئيسية.

للمساعدة في ذلك، ستضيف AMP سمة خاصة `amp-story-visible` إلى النص الأساسي للمواد الإبداعية عندما تكون هي نقطة البؤرة في كل سياقات العرض، ومن المستحسن إطلاق رسوم متحركة بناءً على هذه الإشارة.

مثال: سيتم تنشيط هذه الرسوم المتحركة عندما يتم التركيز على الصفحة، وإعادة التشغيل إذا نقر مستخدم فوق صفحة أخرى في القصة وعاد إليها.

[sourcecode:html]

<style amp-custom>
    body[amp-story-visible] .my-animation-class {
      animation: 2s my-animation-name;
    }
</style>

[/sourcecode]

## قصة لها رعاية <a name="sponsored-story"></a>

تكون القصة التي لها رعاية موجودة كعنوان URL على الويب، مما يتيح توجيه حركة مرور المستخدم إلى قصة لها رعاية من زر الدعوة لاتخاذ إجراء في إعلان قصة AMP، إذ إن القصة التي لها رعاية عبارة عن قصة AMP، لكن مع التركيز على تجربة إعلانية غامرة وواسعة.

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='زر دعوة لاتخاذ إجراء يوجِّه إلى قصة لها رعاية', caption='زر دعوة لاتخاذ إجراء يوجِّه إلى قصة لها رعاية', align='' ) }}

اقرأ المزيد حول إنشاء [قصة ويب من هنا](../start/create_successful_stories.md).
