---
'$title': التفاصيل الفنية لقصة الويب
$order: 1
description: التفاصيل الفنية لقصة الويب
'$category': Develop
formats:
  - stories
author: CrystalOnScript
---

يشرح هذا الدليل كل التفاصيل الفنية وأفضل الممارسات التي يجب معرفتها لإنشاء قصص الويب بنجاح باستخدام AMP.

## AMP صالح

تُعد قصة الويب من الناحية الفنية صفحة ويب واحدة تم إنشاؤها باستخدام AMP وتلتزم بمواصفات AMP:

- البدء بنوع المستند
  <span><code><!doctype html></code></span>.
- تضمين العلامة `<html ⚡>` `<html amp>` من المستوى الأعلى.
- تضمين العلامات `<head>` and `<body>`.
- تضمين العلامة ` <meta charset="utf-8">` على أنها التابع الأول للعلامة `<head>`.
- تضمين العلامة `<script async src="https://ampjs.org/v0.js"></script>` tag inside their `<head>`. وكأفضل ممارسة، يجب تضمين النص في أقرب وقت ممكن في `<head>`.
- تضمين العلامة a` <link rel="canonical" href="page/url">` داخل `<head>` مع المدلال النصي الترابطي الذي يشير إلى عنوان URL لقصة الويب.
- تضمين العلامة `<meta name="viewport" content="width=device-width">` داخل العلامة `<head>`. يوصى أيضًا بتضمين المقياس الأولي=1.
- تضمين الرمز [AMP boilerplate](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) في العلامة `<head>`.

يتمثل الاختلاف بين صفحة ويب AMP وقصة ويب تم إنشاؤها باستخدام AMP في المكوِّن [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories). إذ إنه الفرع المباشر الوحيد لـ `<body>` الخاص بالمستند، ويجب أن يحتوي على السمة `standalone`. ويتم تحديد جميع صفحات قصة الويب وعناصرها وطبقاتها ضمن العلامات `<amp-story>`.

```html
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://ampjs.org/v0.js"></script>
    <script
      async
      custom-element="amp-video"
      src="https://ampjs.org/v0/amp-video-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-story"
      src="https://ampjs.org/v0/amp-story-1.0.js"
    ></script>
    <style amp-custom>
      ...;
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story
      standalone
      title="Joy of Pets"
      publisher="AMP tutorials"
      publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
      poster-portrait-src="assets/cover.jpg"
    >
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img
            src="assets/cover.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>The Joy of Pets</h1>
          <p>By AMP Tutorials</p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 1 -->
      <amp-story-page id="page1">
        <amp-story-grid-layer template="vertical">
          <h1>Cats</h1>
          <amp-img
            src="assets/cat.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
          <q
            >Dogs come when they're called. Cats take a message and get back to
            you. --Mary Bly</q
          >
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```

اتبع [البرنامج التعليمي لإنشاء قصة ويب الأولى](../start/visual_story/?format=stories) و[اقرأ الوثائق المرجعية لـ amp-story](../../components/reference/amp-story/?format=stories) لمعرفة المزيد.

## ذروة الأداء وتجربة المستخدم

قد يشاهد المستخدمون قصص الويب في مناطق ذات اتصال شبكة منخفض أو أجهزة قديمة. تأكد من أنهم يستمتعون بتجربتهم باتباع أفضل الممارسات.

### لون الخلفية

حدد لون الخلفية لكل صفحة قصة ويب. يوفر وجود لون الخلفية عنصرًا احتياطيًا جيدًا إذا كانت ظروف المستخدم تمنعهم من تنزيل أصول الفيديو أو الصور. اختر لونًا يمثل اللون السائد لمادة الخلفية المقصودة للصفحة، أو استخدم سمة ألوان متناسقة لجميع صفحات القصة. تأكد من اختلاف لون الخلفية عن النص لسهولة القراءة.

حدد لون الخلفية للصفحات داخل العلامات `<style amp-custom>` في رأس مستند قصة الويب أو المضمنة في المكون [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories).

### وضع العناصر في طبقات

تحتوي ترويسة النظام على عناصر تحكم مثل أيقونات كتم الصوت والمشاركة. ويظهر بمؤشر z أعلى من صورة الخلفية والفيديو. تأكد من عدم تغطية هذه الرموز للمعلومات الأساسية.

### نسبة العرض إلى الارتفاع

قم بتصميم قصة ويب بنسبة عرض إلى ارتفاع تبلغ 9:16. نظرًا لاختلاف ارتفاع الصفحة وعرضها عبر المتصفحات، فلا تضع الأجهزة المحتوى الأساسي بالقرب من حواف الصفحة.

### صور الملصقات

يتم عرض صورة الملصق للمستخدم أثناء تنزيل الفيديو. ويجب أن تكون صورة الملصق ممثلة للفيديو للسماح بانتقال سلس. حدد صورة ملصق عن طريق إضافة السمة `poster` إلى عنصر amp-video وتوجيهها إلى موقع الصورة.

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## مقطع الفيديو

يجب إضافة كل مقاطع الفيديو عبر المكوِّن [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories).

```
<amp-video controls
  width="640"
  height="360"
  layout="responsive"
  poster="/static/inline-examples/images/kitten-playing.png">
  <source src="/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

### الدقة والجودة

قم بترميز مقاطع الفيديو لضبط الجودة للتحسينات الموصى بها التالية:

<table>
  <tr>
   <td>MP4</td>
   <td>-crf 23</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>-b:v 1M</td>
  </tr>
</table>

حاول إبقاء مقاطع HLS أقل من 10 ثوانٍ في المدة.

### التنسيق والحجم

اجعل مقاطع الفيديو بمساحة أقل من 4 ميجابايت للحصول على الأداء الأمثل. ضع في الحسبان تقسيم مقاطع الفيديو الكبيرة على عدة صفحات.

إذا كان بإمكانك تقديم تنسيق فيديو واحد فقط، فقم بتوفير MP4. وإن أمكن، استخدم فيديو HLS وحدد MP4 كعنصر احتياطي لتوافق المتصفح. واستخدم برنامج ترميز الفيديو التالي:

<table>
  <tr>
   <td>MP4، وHLS، وDASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### تحديد &lt;source&gt; vs src

استخدم العناصر الفرعية `<source>` داخل المكون `<amp-video>` لتحديد مصدر الفيديو عبر السمة `src`. ويتيح لك استخدام عنصر `<source>` تحديد نوع الفيديو وإضافة مصادر احتياطية للفيديو. ويجب استخدام السمة `type` لتحديد نوع MIME. واستخدم `application/x-mpegurl` أو `application/vnd.apple.mpegurl` لمقاطع فيديو HLS. وبالنسبة إلى كل أنواع الفيديو الأخرى، استخدم بادئة MIME `video/` واتبعها بتنسيق الفيديو، مثل `”video/mp4”`.

```html
<amp-video
  id="video-page1"
  autoplay
  loop
  layout="fill"
  poster="https://example.com/media/poster.jpg"
>
  <source
    src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl"
  />
  <source src="https://amp-example.com/media/movie.mp4" type="video/mp4" />
</amp-video>
```

### التقدم التلقائي بعد مقاطع الفيديو

تحدد السمة [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) التي تعرضها amp-story-page ما إذا كان ينبغي تقدم صفحة القصة وكذا توقيت وجوب نقر المستخدم فوقها. للتقدم بعد مقطع فيديو، قم بتوجيه السمة إلى معرِّف الفيديو.

```html
<amp-story-page auto-advance-after="myvideo"></amp-story-page>
```

## تجربة سطح المكتب

يدعم تنسيق قصة الويب [تجربة اختيارية لسطح المكتب](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in). إذ يؤدي هذا الأمر إلى تغيير تجربة سطح المكتب إلى وضع الشاشة الكاملة، ليحل محل تجربة اللوحات التصويرية الثلاثة الافتراضية ويسمح لمستخدمي الأجهزة المحمولة بعرض توقيت حمل أجهزتهم أفقيًا.

اشترك في دعم سطح المكتب عن طريق إضافة السمة `supports-landscape` إلى المكون `<amp-story>`.

```html
<amp-story
  standalone
  supports-landscape
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
</amp-story>
```
