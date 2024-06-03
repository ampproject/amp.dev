---
'$title': تضمين القصص في صفحات الويب
$order: 3
description: يتيح لك مشغل قصص الويب تضمين القصص التي يمكن للمستخدمين الضغط أو النقر عليها داخل صفحة ويب. اتبع هذا الدليل خطوة بخطوة لتعلم الطريقة.
formats:
  - websites
  - stories
---

تمثل القصص تجربة غامرة ملء الشاشة. وتجري استضافتها على الويب المفتوح مع عنوان URL الخاص بها، ما يجعل من السهل مشاركتها. ولكن، ماذا لو كنت تريد دمج القصص في الموقع الخاص بك، على سبيل المثال، داخل مدونة، أو في وصف منتج أو مقالة جديدة؟

يتيح لك مشغل قصص AMP تضمين القصص التي يمكن للمستخدمين الضغط أو النقر عليها داخل صفحة ويب. اتبع هذا الدليل خطوة بخطوة لتعلم الطريقة.

# عرض القصص في صفحة غير مدعومة من AMP

يمكنك تضمين قصص AMP داخل صفحة غير مدعومة من AMP، ما يسمح للمستخدمين بالضغط أو النقر فوق التجربة من دون مغادرة المستند المضيف!

[example preview="top-frame" playground="false"]

```html
<!doctype html>
    <head>
      <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```

[/example]

## تضمين مشغل قصص AMP

يتطلب عرض قصة AMP في صفحة غير مدعومة من AMP استعمال العنصر [`amp-story-player`](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-story-player.md).

### استيراد النصوص البرمجية

قم بتضمين النصين البرمجيين المطلوبين في رأس المستند:

```html
<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
<link
  href="https://cdn.ampproject.org/amp-story-player-v0.css"
  rel="stylesheet"
  type="text/css"
/>
```

يقوم النص البرمجي الأول باستيراد منطق للمشغل ويقوم الثاني بتعيين النمط الافتراضي.

### تحديد قصة

قم بتضمين العنصر `<amp-story-player>` داخل المستند `body`. ثم حدد القصة المرغوبة من خلال وضع علامة `<a>` داخل عنصر `<amp-story-player>`. قم بالإشارة إلى `href` في موقع القصة. وقد يشير `href` إلى عنوان URL لقصة مستضافة أو مسار بديل. ضع عنوان القصة داخل علامات `<a>`.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
  >
    Stories in AMP - Hello World
  </a>
</amp-story-player>
```

### تحديد حجم المشغل

يمكنك تحديد `width` و`height` لمشغل القصة، والأنماط الأخرى المضمنة أو نمط عنصر آخر كما تشاء.

```html
<body>
  ...
  <amp-story-player style="width: 360px; height: 600px;">
    ...
  </amp-story-player>
  ...
</body>
```

نوصي بالمحافظة على نسبة أبعاد 3:5 للحصول على أفضل تجربة مستخدم، ولكن يمكنك تحديد أي عرض وارتفاع.

#### تعيين حجم سريع الاستجابة

تعمل استجابة مشغل القصص مثل أي عنصر كتلة آخر. استخدم CSS للمحافظة على نسب أبعاد العرض والارتفاع، مثل المثال أدناه:

```html
<amp-story-player style="width: 50vw; height: 83.35vw;"> ... </amp-story-player>
```

### توفير عنصر نائب

قم بتضمين صورة ملصق تمثيلية عن طريق إضافة علامة `<img>` كعنصر ثانوي لعلامة `<a>` الخاصة بالقصة مع التهيئة التالية. فيما يعرض مشغل قصة AMP هذه الصورة أثناء تحميل القصة الكاملة.

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a href="https://www.example.com/story.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes this story.
  </a>
</amp-story-player>
```

للحصول على أفضل تجربة مستخدم، نوصي بشدة بتضمين صورة ملصق. إذا لم تقم بتضمين صورة ملصق، فسيعرض مشغل القصص حلقة تحميل بخلفية رمادية.

## تضمين قصص متعددة

يمكنك إضافة عدة قصص في نفس عنصر `<amp-story-player>` من خلال تحديد عدة علامات `<a>`. يعرض المشغل صفحة غلاف القصة الثانية بعد أن يضغط المستخدم على الأولى.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

يمكنك تضمين العديد من مثيلات `<amp-story-player>` حسب الرغبة. فهي تعرض عارضات فردية.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

# عرض القصص في صفحة AMP

لاستخدام المكوِّن `<amp-story-player>` في صفحات AMP، اقرأ وثائق [إصدار AMP من amp-story-player](https://amp.dev/documentation/components/amp-story-player/?format=stories).
