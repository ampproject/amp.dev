---
'$title': العناصر المتحركة
$order: 6
description: يمكنك تحسين قصة الويب على نحو أفضل عن طريق تطبيق عمليات دخول الرسوم المتحركة على العناصر الموجودة داخل الصفحة. على سبيل المثال، يمكنك جعل العنوان الخاص بك يتحرك من ...
components:
  - anim
author: bpaduch
---

يمكنك تحسين قصة الويب على نحو أفضل عن طريق تطبيق عمليات دخول الرسوم المتحركة على العناصر الموجودة داخل الصفحة. على سبيل المثال، يمكنك جعل العنوان يتحرك للداخل من اليسار، أو يسقط في الصفحة، أو يتلاشى، وهكذا. إذ يوفر إطار عمل قصة AMP الرسوم المتحركة التالية المعدة مسبقًا لاستخدامها في قصة الويب:

<table>
<thead><tr>
  <th width="50%">الإعداد المسبق للرسوم المتحركة</th>
  <th width="25%">المدة الافتراضية (مللي ثانية)</th>
  <th width="25%">التأخير الافتراضي (مللي ثانية)</th>
</tr></thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

لتطبيق دخول متحرك على عنصر، يجب عليك تحديد <code>animate-in=""</code> بإحدى قيم الإعدادات المسبقة للرسوم المتحركة. على سبيل المثال، لإسقاط نصوص في صفحة، أضف `animate-in="drop"` إلى عنصر النص:

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="note"] استكشف تأثيرات الحركة المختلفة عن طريق إضافة السمة `animate-in="<animation preset>"` إلى عناصر في صفحات قصتك. [/tip]

## توقيت الرسوم المتحركة

يحتوي كل إعداد مسبق للرسوم المتحركة على قيمة زمنية افتراضية مضمنة لـ:

- **التأخير**: مقدار الوقت لتأخير بدء الرسوم المتحركة. على سبيل المثال، يعني التأخير بمقدار 3 ثوانٍ أن الرسوم المتحركة تدخل الصفحة بعد 3 ثوانٍ. ويبدأ التأخير بمقدار 0 ثانية في الرسوم المتحركة على الفور.
- **المدة**: مقدار الوقت الذي تظهر فيه الصورة المتحركة. على سبيل المثال، تستغرق حركة التلاشي من البداية إلى النهاية 500 مللي ثانية.

يمكنك تخصيص توقيت الرسوم المتحركة عن طريق تغيير التأخير أو المدة من خلال السمتين `animate-in-delay` و`animate-in-duration`. في المثال التالي، يتحرك `my-element` إلى الداخل من يسار الصفحة بعد 3 ثوانٍ، ويتحرك تمامًا إلى الداخل خلال 0.5 ثوانٍ:

```html
<amp-story-page id="my-page">
  ...
  <p
    class="my-element"
    animate-in="fly-in-left"
    animate-in-delay="0.3s"
    animate-in-duration="0.5s"
  >
    I'm going to fly into the page from the left!
  </p>
</amp-story-page>
```

## تحريك صفحتنا الأخيرة

تتكون صفحة قصة الويب الأخيرة من طبقتين: الطبقة الأولى عبارة عن مجموعة من صور الحيوانات، بينما تعرض الطبقة الثانية نصوص شعار. لإنشاء هذه الصفحة، **أضف** الرمز التالي بعد صفحة القصة السابقة الخاصة بك مباشرةً:

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img
        src="assets/cat.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/dog.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/bird.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/rabbit.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```

أعد تحميل قصة AMP في متصفحك، وتحقق من أن الصفحة تُعرض عرضًا صحيحًا وتبدو على النحو التالي:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

تبدو رائعة ولكن كل شيء ثابت! لنبدأ في تحريكها!

سنبدأ بتحريك دخول نص الشعار ونجعله "يتحرك فجأة" من يمين الصفحة. أضف `animate-in="whoosh-in-right"` إلى عنصر `<p>` على النحو التالي:

```html
<p class="banner-text" animate-in="whoosh-in-right">
  Pets can lower your stress levels!
</p>
```

أعد تحميل صفحة قصتك في متصفحك، وتحقق من تحرك الشعار على نحو مفاجئ.

بعد ذلك، دعنا نجعل كل الصور تتلاشى. أضف `animate-in="fade-in"` إلى كل عنصر من عناصر [`amp-img`](../../../../documentation/components/reference/amp-img.md) حتى يبدو الرمز على النحو التالي:

```html
<amp-img
  src="assets/cat.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/dog.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/bird.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/rabbit.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
```

إذا قمت بتحديث الصفحة وإعادة تحميلها، فإن كل صورة من الصور تتلاشى، وهذا رائع؛ لكنك بالكاد تستطيع ملاحظة التأثير لأن كل الصور تتلاشى في الوقت نفسه! يمكننا تحسين التأثير المرئي من خلال تغيير توقيت هذه الرسوم المتحركة.

دعنا نؤخر دخول الصورة الأولى بحيث يقترب من وقت انتهاء دخول شعار النص، على سبيل المثال ثوانٍ، ويمكن أن تأتي الصور الثلاث المتبقية خلال ثانيتين بعد دخول الصورة السابقة. لكل عنصر من عناصر [`amp-img`](../../../../documentation/components/reference/amp-img.md)؛ أضف `animate-in-delay=""` بقيمة التأخير الزمني المناسبة. ويجب أن يبدو الرمز الخاص بك على النحو التالي:

```html
<amp-img
  src="assets/cat.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="0.4s"
>
</amp-img>
<amp-img
  src="assets/dog.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="0.6s"
>
</amp-img>
<amp-img
  src="assets/bird.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay=".8s"
>
</amp-img>
<amp-img
  src="assets/rabbit.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="1s"
>
</amp-img>
```

قم تحديث وإعادة تحميل قصتك، يجب أن تبدو صفحتك الأخيرة كما يلي:

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

هناك الكثير من الاحتمالات باستخدام الرسوم المتحركة في قصص الويب (على سبيل المثال، الجمع بين الرسوم المتحركة وتسلسلها)، وهذا البرنامج التعليمي يعرفِك على القليل بشأنها فقط. لمعرفة المزيد حول الرسوم المتحركة، راجع الوثائق المرجعية [`amp-story`](../../../../documentation/components/reference/amp-story.md).
