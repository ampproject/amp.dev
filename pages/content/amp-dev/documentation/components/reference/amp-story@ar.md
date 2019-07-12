---
$category@: presentation
formats:
  - websites
teaser:
  text: A rich, visual storytelling format.
---



<!---
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

       Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS-IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
-->

# amp-story

<table>
  <tr>
    <td width="40%"><strong>الوصف</strong></td>
    <td>تنسيق مرئي غني بالتفاصيل لسرد القصص</td>
  </tr>
  <tr>
    <td width="40%"><strong>مدى التوفّر</strong></td>
    <td><div><a href="https://www.ampproject.org/docs/reference/experimental.html">تجريبي</a></div></td>
  </tr>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">التنسيقات المعتمدة</a></strong></td>
    <td>لا شيء</td>
  </tr>
  <tr>
    <td width="40%"><strong>أمثلة</strong></td>
    <td><ul>
      <li>يمكنك الاطلّاع على مثال <a href="https://ampbyexample.com/stories/introduction/amp_story_hello_world/">Hello World</a> في الموقع "AMP بالمثال".</li>
      <li>يمكنك التعلم من البرنامج التعليمي <a href="https://www.ampproject.org/docs/tutorials/visual_story">إنشاء سجل AMP مرئي</a>.</li>
    </ul></td>
  </tr>
</table>

[tip type="important"]
هذا المكوِّن قيد التجربة والتطوير. للإبلاغ عن أي مشاكل، يُرجى [ملء مشكلة لدى GitHub](https://github.com/ampproject/amphtml/issues/new).
[/tip]

[جدول المحتويات]

## ملاحظات عن الإصدارات

| الإصدار | الوصف                                                            |
|-------|----------------------------------------------------------------------|
| 1.0     | الإصدار الحالي، منذ 16-7-2018                                     |
| 0.1     | التنفيذ الأوليّ  وقد تم إيقافه وستتم إزالته في 19-3-2019. |

## الترحيل من 0.1 إلى 1.0

اعتبارًا من 16-7-2018، يعتبر الإصدار 0.1 متوقفًا، وستتم إزالته في 19-3-2019.  قد يحدِث هذا تغييرات ربما تؤدي إلى أعطال، حيث ستتم ترقية سجلاتك تلقائيًا لاستخدام الإصدار 1.0.  وننصح بترحيل الصفحات يدويًا إلى الإصدار 1.0 قبل هذا التاريخ لضمان سلامة الوظائف والتصميم.

### إمكانات جديدة للشاشة الختامية

لقد أضفنا إمكانات جديدة إلى شاشة amp-stories الختامية، ما يتيح عمل المكوِّن والتنسيقات المرئية بشكل أكثر ثراءً. بعض التغييرات تشمل ما يلي:

* يتم فرز موفري المشاركة وفقًا لتهيئة JSON.
* مكونات جديدة للشاشة الختامية:
    * روابط للحث على اتخاذ إجراء
    * مربع نص
    * بطاقات باتجاه أفقي وعمودي</li>

لاستخدام هذه الإمكانات الجديدة، أضِف العلامة `<amp-story-bookend>` كآخر عنصر ثانوي في `<amp-story>` مع السمات المطلوبة مثل:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `src` and `layout=nodisplay` are required. -->
  <amp-story-bookend src="bookendv1.json" layout="nodisplay">
  </amp-story-bookend>
<amp-story>
```

تعرّف على المزيد حول المكونات الجديدة وكيفية تحديدها في تهيئة JSON في القسم [amp-story-bookend](#bookend-amp-story-bookend).

### متطلبات جديدة للبيانات الوصفية

لقد أضفنا سمات جديدة للبيانات الوصفية للعنصر `<amp-story>`. سيتم استخدام هذه السمات لعرض معاينة للسجل عبر منظومة "سجلّ AMP" المتكاملة. يمكن مثلاً استخدام هذه السمات لعرض رابط جذاب للمعاينة في الشاشة الختامية من السجل المعني. ويضمن توفير هذه السمات أيضًا أن يكون السجل جاهزًا للتجارب المضمّنة المنسّقة التي ستظهر مستقبلاً في سجلات AMP.

ستكون السمات

```html
<!-- title وpublisher<code> وpublisher-logo-src وposter-portrait-src` مطلوبة قريبًا. -->
<amp-story title="سجلي" standalone
    publisher="The AMP Team"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg">

<!-- السمات poster-square-src وposter-landscape-src اختياريّة لكننا ننصح باستخدامها بشدة. -->
<amp-story title="سجلي" standalone
    publisher="The AMP Team"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
    poster-square-src="https://example.com/my-story/poster/1x1.jpg"
    poster-landscape-src="https://example.com/my-story/poster/4x3.jpg">
```

يُرجى العلم بأن سمات البيانات الوصفية هذه مكمِلة وليست بديلة لأي من البيانات المنظّمة (مثل JSON-LD) على الصفحة. ونكرر نصيحتنا بإضافة [البيانات المنظّمة](https://developers.google.com/search/docs/data-types/article#amp-sd) إلى جميع صفحات AMP، بما في ذلك سجلات AMP.

السمات الجديدة:

| السمة | الوصف |
|--|--|
| `title` [مطلوبة] | عنوان السجلّ |
| `publisher` [مطلوبة] | اسم ناشر السجلّ |
| `publisher-logo-src` [مطلوبة] | شعار الناشر بتنسيق مربع (نسبة العرض إلى الارتفاع 1×1) |
| `poster-portrait-src` [مطلوبة] | ملصق السجلّ بتنسيق عمودي (نسبة عرض إلى ارتفاع 3×4) |
| `poster-square-src` | ملصق السجلّ بتنسيق مربع (نسبة العرض إلى الارتفاع 1x1) |
| `poster-landscape-src` | ملصق السجلّ بتنسيق أفقي (نسبة عرض إلى ارتفاع 3×4) |

#### إرشادات `publisher-logo-src`

تنطبق الإرشادات التالية على صورة شعار الناشر:

* يجب أن يكون الملف ملفًا نقطيًا، مثل `.jpg` أو `.png` أو `.gif`.  تجنب ملفات المتجهات، مثل `.svg` أو `.eps`.
* تجنب الصور المتحركة، مثل ملفات GIF المتحركة.
* يجب أن يكون جزء الرسم من الشعار واضحًا على لون الخلفية.

<table>
  <tr>
    <td>
      <amp-img alt="شعار به نص أزرق على خلفية بيضاء" width="107" height="112" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-1.png" layout="fixed">
        <noscript>
          <img alt="شعار به نص أزرق على خلفية بيضاء" src="img/publisher-logo-1.png">
        </noscript>
      </amp-img>
      مُفضل
    </td>
    <td>
      <amp-img alt="شعار به نص أبيض على خلفية زرقاء" width="107" height="101" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-2.png" layout="fixed">
        <noscript>
          <img alt="شعار به نص أبيض على خلفية زرقاء" src="img/publisher-logo-2.png">
        </noscript>
      </amp-img>
      مُفضل
    </td>
    <td>
      <amp-img alt="شعار به نص أزرق على خلفية زرقاء" width="103" height="102" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-3.png" layout="fixed">
        <noscript>
          <img alt="شعار به نص أزرق على خلفية زرقاء" src="img/publisher-logo-3.png">
        </noscript>
      </amp-img>
      تجنب هذا
    </td>
  </tr>
</table>

* يجب أن يكون شكل الشعار مربعًا وليس مستطيلًا.
* يجب ألا يكون لون الخلفية شفافًا.
* استخدم شعارًا واحدًا لكل علامة تجارية ثابتة في سجلات AMP.
* يجب ألا يقل حجم الشعار عن 96× 96 بكسل.

#### إرشادات الملصقات (للسمات `poster-portrait-src` و`poster-landscape-src` و`poster-square-src`)

تنطبق الإرشادات التالية على صور ملصقات السجلات:

* يجب أن تمثل صورة الملصق سجلّ AMP بأكمله.
* يجب أن تكون صورة الملصق مرئية للمستخدم عندما يشغِّل سجلّ AMP.  ومع ذلك، لا يجب أن يتطابق عنوان URL لملف الصورة المستخدَم في البيانات الوصفية تمامًا مع عنوان URL المستخدَم في الصفحة الأولى من السجلّ.  يمكن أن يتضمن عنوان URL المستخدَم في البيانات الوصفية تغيير الحجم أو الاقتصاص أو إجراء تغييرات بسيطة في التصميم لغرض المعاينة.
* يجب أن تكون صورة الملصق ملفًا نقطيًا، مثل `.jpg` أو `.png` أو `.gif`.  تجنب ملفات المتجهات، مثل `.svg` أو `.eps`.
* يجب أن تكون نسبة العرض إلى الارتفاع 3x4 لصورة الملصق بالاتجاه العمودي و4x3 للاتجاه الأفقي و1×1 للمربع.
* إذا كانت صورة الملصق مشتقة من إطار في الفيديو، يجب أن يكون الصورة المصغرة ممثلة له. غالبًا ما يكون الإطار الأول في الفيديو مثلاً غير مُعبِر عنه.
* يجب أن تفي جميع صور الملصقات بالحجم الأدنى المقترح:
    * الاتجاه العمودي: 696 بكسل × 928 بكسل
    * الاتجاه الأفقي: 928 بكسل × 696 بكسل
    * المربع: 928 بكسل × 928 بكسل</li>

## نظرة عامة

توفّر الإضافة `amp-story` تنسيقًا جديدًا لعرض المحتوى المرئي لتجميعه في تجربة تمثل سردًا لقصة. يمكنك توفير المعلومات والمحتوى المنسّق مرئيًا بحجم صغير للمستخدمين وذلك باستخدام سجلّ AMP.

<figure class="centered-fig">
<amp-anim width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
<noscript>
<img alt="مثال على سجلّ AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
</noscript>
</amp-anim>
</figure>

## تنسيق سجلّ AMP

[سجلّ AMP](#story%3a-amp-story) عبارة عن مستند كامل برمز HTML لصفحات AMP يتكون من [صفحات](#pages%3a-amp-story-page)، تحتوي على [طبقات](#layers%3a-amp-story-grid-layer) والتي تشتمل بدورها على عناصر AMP وHTML، مثل الوسائط أو التحليلات أو النص أو غير ذلك.

<amp-img alt="التسلسل الهرمي لعلامات سجلّ AMP" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png" width="591" height="358" layout="fixed">
<noscript>
<img alt="التسلسل الهرمي لعلامات سجلّ AMP" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png">
</noscript>
</amp-img>

### النص الأساسي

الترميز التالي هو نقطة بداية جيدة أو نص أساسي. فانسخه في ملف واحفظه بالامتداد `.html`.

```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>Hello, amp-story</title>
    <link rel="canonical" href="http://example.ampproject.org/my-story.html" />
    <meta name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="my-first-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg"
              width="900" height="1600">
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>Hello, amp-story!</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="my-second-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg2.gif"
              width="900" height="1600">
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>The End</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-bookend src="bookendv1.json" layout="nodisplay">
      </amp-story-bookend>
    </amp-story>
  </body>
</html>
```

ينشئ المحتوى في هذا النص سجلاً من صفحتين.  تتضمن كل منهما صورة خلفية بحجم الصفحة الكامل وسلسلة نص بسيطة أعلى الصورة.

### الترميز المطلوب للعنصر amp-story

يتّبع تنسيق HTML لسجلات AMP [متطلبات الترميز نفسها لمستند صالح برمز HTML لصفحات AMP](https://www.ampproject.org/docs/reference/spec#required-markup)، إلى جانب المتطلبات الإضافية التالية:

| القاعدة | الوصف |
|----|---|
| العنصر `<amp-story standalone>` هو العنصر الثانوي الوحيد للعنصر `<body>`. | لتحديد أن المستند عبارة عن سجلّ AMP |
| ضمِّن العلامة `<script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js" custom-element="amp-story"></script>` كعنصر ثانوي ثالث للعلامة `<head>`. | لتضمين مكتبة JS للمكوِّن amp-story وتحمليها |
| ضمِّن العلامة `<link rel="canonical" href="$STORY_URL">` في `<head>`. | يوجه الرابط إلى السجل نفسه، مع تعريف السجلّ بأنه المستند الأساسي. |

## السجلّ: `amp-story`

يمثل المكوِّن `amp-story` سجلاً كاملاً.  ينفذ المكّوِن نفسه هيكل واجهة مستخدِم، بما في ذلك معالجة الإيماءات والتنقل وإدخال واجهة المستخدِم  لهيكل التطبيق (عناصر التحكم وشريط التقدم وغيره).

<figure class="centered-fig">
<amp-anim alt="amp-story example" width="300" height="533" layout="fixed" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
  <noscript>
  <img alt="amp-story example" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" />
</noscript>
</amp-anim>
</figure>

### مثال

```html
<amp-story
    standalone
    title="My Story"
    publisher="The AMP Team"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
    poster-square-src="https://example.com/my-story/poster/1x1.jpg"
    poster-landscape-src="https://example.com/my-story/poster/4x3.jpg"
    background-audio="my.mp3">
  <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-bookend src="./related.json"></amp-story-bookend>
</amp-story>
```

### السمات

##### standalone [مطلوبة]

لتحديد أن المستند عبارة عن سجلّ AMP

##### title [مطلوبة]

عنوان السجلّ

##### publisher [مطلوبة]

اسم ناشر السجلّ

##### publisher-logo-src [مطلوبة]

عنوان URL لشعار ناشر السجل بتنسيق المربع (نسبة العرض إلى الارتفاع 1×1). على سبيل المثال: `publisher-logo-src="https://example.com/logo/1x1.png"` حيث 1x1.png شعار بحجم 36x36 بكسل

##### poster-portrait-src [مطلوبة]

عنوان URL [لملصق السجل](#posters) بتنسيق عمودي (نسبة عرض إلى ارتفاع 3×4)

##### supports-landscape [اختيارية]

لتمكين عمل الاتجاه الأفقي على الأجهزة الجوالة وتجربة الاتجاه العمودي بحجم الصورة كاملة على أجهزة سطح المكتب

##### background-audio [اختيارية]

عنوان URL لملف الصوت الذي يتم تشغيله خلال السجل

##### poster-square-src [اختيارية]

عنوان URL [لملصق السجل](#posters) بتنسيق المربع (نسبة العرض إلى الارتفاع 1×1)

##### poster-landscape-src [اختيارية]

عنوان URL [لملصق السجل](#posters) بتنسيق الاتجاه الأفقي (نسبة العرض إلى الارتفاع 1×1)

### الملصقات

"الملصق" عبارة عن صورة تُعرض في واجهة المستخدِم إلى أن يتم تحميل السجلّ. عادة ما يكون الملصق هو أول شاشة في السجل بالرغم من إمكانية استخدام أي صورة تمثل السجل.

### العناصر الثانوية (للمكوِّن amp-story)

يحتوي المكوِّن `<amp-story>` على واحد أو أكثر من المكونات [`<amp-story-page>`](#pages%3a-amp-story-page) التي تتضمن كل الشاشات الفردية للسجلّ.  وتظهر الصفحة الأولى المحددة في ترتيب المستند كأول صفحة في السجلّ.

### تمكين الاتجاه الأفقي وتجربة حجم الصورة الكاملة على سطح المكتب

في حال تحديد السمة `supports-landscape` في العنصر `<amp-story>`، سيتم ما يلي:

* السماح بعرض السجل عندما يكون الجهاز الجوال في وضع أفقي
* تغيير التجربة على سطح المكتب إلى الوضع الكامل المجسم بدلاً من التجربة التلقائية للوحات الثلاثة بالاتجاه العمودي

الاستخدام: `<amp-story ... supports-landscape>...</amp-story>`

<figure class="centered-fig">
  <span class="special-char">قبل:</span>
  <amp-anim alt="تجربة اللوحات الثلاثة على سطح المكتب" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif" width="400" layout="flex-item">
  <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif"></noscript>
  </amp-anim>
  <span class="special-char">بعد:</span>
  <amp-anim alt="تجربة حجم الصورة الكامل لسطح المكتب" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif" width="400" layout="flex-item">
  <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif"></noscript>
  </amp-anim>
</figure>

## الصفحات: `amp-story-page`

يمثل المكوِّن `<amp-story-page>` المحتوى الذي سيتم عرضه على صفحة واحدة من السجل.

<figure class="centered-fig">
<amp-anim alt="مثال للصفحة 1" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif" layout="fixed">
<noscript>
<img alt="مثال للصفحة 1" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif">
</noscript>
</amp-anim>
</figure>
<figure class="centered-fig">
<amp-anim alt="مثال للصفحة 2" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif" layout="fixed">
<noscript>
<img alt="مثال للصفحة 2" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif">
</noscript>
</amp-anim>
</figure>

### مثال

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-video layout="fill" src="background.mp4" poster="background.png" muted autoplay></amp-video>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical">
    <h1>These are the Top 5 World's Most...</h1>
    <p>Jon Bersch</p>
    <p>May 18</p>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="thirds">
    <amp-img grid-area="bottom-third" src="a-logo.svg" width="64" height="64"></amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

### السمات

##### id [مطلوبة]

هذه السمة هي معرّف فريد للصفحة. يمكن استخدامها لتنسيق نمط الصفحة وعناصرها التابعة في CSS، كما تُستخدم لتعريف الصفحة بشكل فريد في جزء عنوان URL.

##### auto-advance-after [اختيارية]

تحدد السمة وقت الانتقال التلقائي إلى الصفحة التالية.  وعند إسقاطها، لن يتم الانتقال تلقائيًا إلى الصفحة التالية. يجب أن تكون قيمة `auto-advance-after` أي مما يلي:

* مقدار موجب [للوقت](https://developer.mozilla.org/en-US/docs/Web/CSS/time) يجب انتظاره قبل أن تنتقل الصفحة تلقائيًا إلى الصفحة التالية
* معّرف للعنصر [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) أو للفيديو video-interface الذي يؤدي إكماله إلى تشغيل التقدم التلقائي

مثال:

```html
<amp-story-page id="tokyo" auto-advance-after="1s">;
```

##### background-audio [اختيارية]

معرف الموارد المنتظم لملف الصوت الذي يتم تشغيله أثناء عرض هذه الصفحة

مثال:

```html
<amp-story-page id="zurich" background-audio="./media/switzerland.mp3">;
```

### العناصر الثانوية (للمكوِّن amp-story-page)

يحتوي المكوِّن `<amp-story-page>` على [طبقة](#layers) واحدة أو أكثر.  ويتم ترتيب الطبقات بالعكس (بحيث تكون الطبقة الأولى المحددة في DOM في القاع والطبقة الأخيرة المحددة في DOM في الأعلى).

## الطبقات

يتم تكديس الطبقات فوق بعضها البعض لإنشاء التأثير المرئي المطلوب.

### `amp-story-grid-layer`

يضع المكوِّن `<amp-story-grid-layer>` عناصره الثانوية في شكل شبكة.  ويستند تنفيذه على [مواصفات شبكة CSS](https://www.w3.org/TR/css-grid-1/).

<div class="flex-images">
<amp-img alt="الطبقة 1" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif" width="200" height="355" layout="flex-item">
<noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif"></noscript>
</amp-img>
<span class="special-char">+</span>
<amp-img alt="الطبقة 2" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg" width="200" layout="flex-item">
<noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg"></noscript></amp-img>
<span class="special-char">+</span>
<amp-img alt="الطبقة 3" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg" width="200" layout="flex-item">
<noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg"></noscript></amp-img>
<span class="special-char">=</span>
<amp-img alt="جميع الطبقات" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif" width="200" layout="flex-item">
<noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif"></noscript></amp-img>
</div>

#### السمات

##### template [مطلوبة]

تحدد السمة `template` تنسيق الطبقة الشبكية. وقد تم شرح النماذج المتاحة في قسم [النماذج](#templates) أدناه.

##### grid-area [اختيارية]

يتم تحديد هذه السمة بناء على العناصر الثانوية للمكوِّن `<amp-story-grid-layer>`. تحدد  `grid-area` المنطقة المعينة (من استخدام `template` الذي يحددها) التي يجب أن يظهر فيها العنصر المُتضمِّن لهذه السمة.

مثال:

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### النماذج

في ما يلي النماذج المتاحة لتحديد تنسيق الطبقة الشبكية.

[tip type="success"]
للاطّلاع على نماذج التنسيق المستخدمة، يمكنك مراجعة [العرض التوضيحي للتنسيقات في موقع "AMP بالمثال"](https://ampbyexample.com/stories/features/layouts/).
[/tip]

##### fill

يعرض النموذج `fill` العنصر الثانوي الأول بحجمه الكامل. ولا تظهر جميع العناصر الثانوية الأخرى.

المناطق المعينة: (لا شيء)

مثال:

<amp-img alt="مثال للنموذج Fill" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png" width="145" height="255" layout="fixed">
<noscript>
<img alt="مثال للنموذج Horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png">
</noscript>
</amp-img>

```html
<amp-story-grid-layer template="fill">
  <amp-img src="cat.jpg"></amp-img>
</amp-story-grid-layer>
```

##### vertical

يضع النموذج `vertical` عناصر بطول المحور الصادي.  وتتم تلقائيًا محاذاة عناصره إلى الأعلى، ويمكن أن تأخذ كامل الشاشة بطول المحور السيني.

المناطق المعينة: (لا شيء)

<amp-img alt="مثال للنموذج Vertical" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png" width="145" height="255" layout="fixed">
<noscript>
<img alt="مثال للنموذج Horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png">
</noscript>
</amp-img>

```html
<amp-story-grid-layer template="vertical">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### horizontal

يضع النموذج `horizontal` عناصره بطول المحور السيني.  وتتم تلقائيًا محاذاة عناصره إلى بداية السطر، ويمكن أن تأخذ كامل الشاشة بطول المحور الصادي.

المناطق المعينة: (لا شيء)

<amp-img alt="مثال للنموذج Horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png" width="145" height="255" layout="fixed">
<noscript>
<img alt="مثال للنموذج Horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png">
</noscript>
</amp-img>

```html
<amp-story-grid-layer template="horizontal">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### thirds

يقسّم النموذج `thirds` الشاشة إلى ثلاثة صفوف متساوية، ويتيح لك إدخال محتوى في كل منطقة.

المناطق المعينة:

* `upper-third`
* `middle-third`
* `lower-third`

<amp-img alt="مثال للنموذج Horizontal" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png" width="145" height="255" layout="fixed">
<noscript>
<img alt="مثال للنموذج Thirds" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png">
</noscript>
</amp-img>

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### العناصر الثانوية

يمكن أن يحتوي المكوِّن `amp-story-grid-layer` على أي من العناصر التالية:

**ملاحظة**: ستتم زيادة هذه القائمة بمرور الوقت.

<table>
  <tr>
    <th width="40%">المنطقة
    </th><th>العلامات المسموح بها </th>
  </tr>
  <tr>
    <td>الوسائط</td>
    <td>
      <ul>
        <li><code>&lt;audio&gt;</code></li>
        <li><code>&lt;amp-gfycat&gt;</code></li>
        <li><code>&lt;amp-google-vrviemage&gt;</code></li>
        <li><code>&lt;amp-img&gt;</code></li>
        <li><code>&lt;amp-video&gt;</code></li>
        <li><code>&lt;source&gt;</code></li>
        <li><code>&lt;track&gt;</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>التحليلات والقياس</td>
    <td>
      <ul>
        <li><code>&lt;amp-analytics&gt;</code></li>
        <li><code>&lt;amp-experiment&gt;</code></li>
        <li><code>&lt;amp-pixel&gt;</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>الفقرات</td>
    <td>
      <ul>
        <li><code>&lt;address&gt;</code></li>
        <li><code>&lt;article&gt;</code></li>
        <li><code>&lt;aside&gt;</code></li>
        <li><code>&lt;footer&gt;</code></li>
        <li><code>&lt;h1&gt;-&lt;h6&gt;</code></li>
        <li><code>&lt;header&gt;</code></li>
        <li><code>&lt;hgroup&gt;</code></li>
        <li><code>&lt;nav&gt;</code></li>
        <li><code>&lt;section&gt;</code></li>
        <li><code>&lt;amp-story-cta-layer&gt;</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>النص</td>
    <td>
      <ul>
        <li><code>&lt;abbr&gt;</code></li>
        <li><code>&lt;amp-fit-text&gt;</code></li>
        <li><code>&lt;amp-font&gt;</code></li>
        <li><code>&lt;amp-gist&gt;</code></li>
        <li><code>&lt;b&gt;</code></li>
        <li><code>&lt;bdi&gt;</code></li>
        <li><code>&lt;bdo&gt;</code></li>
        <li><code>&lt;blockquote&gt;</code></li>
        <li><code>&lt;br&gt;</code></li>
        <li><code>&lt;cite&gt;</code></li>
        <li><code>&lt;code&gt;</code></li>
        <li><code>&lt;data&gt;</code></li>
        <li><code>&lt;del&gt;</code></li>
        <li><code>&lt;dfn&gt;</code></li>
        <li><code>&lt;div&gt;</code></li>
        <li><code>&lt;em&gt;</code></li>
        <li><code>&lt;figcaption&gt;</code></li>
        <li><code>&lt;figure&gt;</code></li>
        <li><code>&lt;hr&gt;</code></li>
        <li><code>&lt;i&gt;</code></li>
        <li><code>&lt;ins&gt;</code></li>
        <li><code>&lt;kbd&gt;</code></li>
        <li><code>&lt;main&gt;</code></li>
        <li><code>&lt;mark&gt;</code></li>
        <li><code>&lt;p&gt;</code></li>
        <li><code>&lt;pre&gt;</code></li>
        <li><code>&lt;q&gt;</code></li>
        <li><code>&lt;rp&gt;</code></li>
        <li><code>&lt;rt&gt;</code></li>
        <li><code>&lt;rtc&gt;</code></li>
        <li><code>&lt;ruby&gt;</code></li>
        <li><code>&lt;s&gt;</code></li>
        <li><code>&lt;samp&gt;</code></li>
        <li><code>&lt;small&gt;</code></li>
        <li><code>&lt;span&gt;</code></li>
        <li><code>&lt;strong&gt;</code></li>
        <li><code>&lt;sub&gt;</code></li>
        <li><code>&lt;sup&gt;</code></li>
        <li><code>&lt;time&gt;</code></li>
        <li><code>&lt;u&gt;</code></li>
        <li><code>&lt;var&gt;</code></li>
        <li><code>&lt;wbr&gt;</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>القوائم</td>
    <td>
      <ul>
        <li><code>&lt;p-list&gt;</code></li>
        <li><code>&lt;amp-live-list&gt;</code></li>
        <li><code>&lt;dd&gt;</code></li>
        <li><code>&lt;dl&gt;</code></li>
        <li><code>&lt;dt&gt;</code></li>
        <li><code>&lt;li&gt;</code></li>
        <li><code>&lt;ol&gt;</code></li>
        <li><code>&lt;ul&gt;</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>الجداول</td>
    <td>
      <ul>
        <li><code>&lt;caption&gt;</code></li>
        <li><code>&lt;col&gt;</code></li>
        <li><code>&lt;colgroup&gt;</code></li>
        <li><code>&lt;table&gt;</code></li>
        <li><code>&lt;tbody&gt;</code></li>
        <li><code>&lt;td&gt;</code></li>
        <li><code>&lt;tfoot&gt;</code></li>
        <li><code>&lt;th&gt;</code></li>
        <li><code>&lt;thead&gt;</code></li>
        <li><code>&lt;tr&gt;</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>غير ذلك</td>
    <td>
      <ul>
        <li><code>&lt;amp-install-serviceworker&gt;</code></li>
        <li><code>&lt;noscript&gt;</code></li>
      </ul>
    </td>
  </tr>
</table>

### `amp-story-cta-layer`

يتيح المكوِّن `<amp-story-cta-layer>` استخدام العنصرين `<a>` و`<button>` في `<amp-story-page>`.

#### القيود

* يجب أن يكون العنصر `<amp-story-cta-layer>` آخر طبقة في `<amp-story-page>` في حال تحديده. وبالتالي، يمكن أن يحتوي كل مكوِّن من `<amp-story-page>` على عنصر واحد من `<amp-story-cta-layer>` أو لا يحتوي على أي منها.
* لا يمكن التحكم في تحديد ترتيب هذه الطبقة وحجمها. فهي دائمًا ما تكون 100% من عرض الصفحة و20٪ من ارتفاعها، مع المحاذاة إلى أسفل الصفحة.

#### مثال

```html
<amp-story-page id="vertical-template-thirds">
  <amp-story-grid-layer template="thirds">
    <div class="content" grid-area="upper-third">Paragraph 1</div>
    <div class="content" grid-area="middle-third">Paragraph 2</div>
    <div class="content" grid-area="lower-third">Paragraph 3</div>
  </amp-story-grid-layer>
  <amp-story-cta-layer>
    <a href="https://www.ampproject.org" class="button">Outlink here!</a>
  </amp-story-cta-layer>
</amp-story-page>
```

<amp-img alt="طبقة حث المستخدم على اتخاذ إجراء" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png" width="404" height="678" layout="fixed">
<noscript>
<img width="404" height="678" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png">
</noscript>
</amp-img>

[يمكن العثور على مثال كامل في دليل الأمثلة.](https://github.com/ampproject/amphtml/blob/master/examples/amp-story/cta-layer-outlink.html)

#### العناصر الثانوية

يتيح المكوِّن `amp-story-cta-layer` تقريبًا نفس العناصر التابعة للمكوِّن `amp-story-grid-layer`، بالإضافة إلى إتاحة العلامتين `<a>` و`<button>`.

للحصول على قائمة معدّلة بالعناصر الثانوية المعتمدة، احرص على الاطّلاع على الحقل [amp-story-cta-layer-allowed-descendants](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) في قواعد التحقق.

## مرفقات الصفحة

### `amp-story-page-attachment`

<amp-img alt="مرفق صفحات سجلّ AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif" width="240" height="480" layout="fixed">
<noscript>
<img alt="مرفق صفحات سجلّ AMP" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif">
</noscript>
</amp-img>

يمكنك إرفاق محتوى إضافي إلى صفحة السجل.

تتيح لك مرفقات صفحات السجل إمكانية توفير محتوى إضافي برمز HTML لصفحات AMP معينة. ويمكن للمستخدِمين إظهار هذا المحتوى باستخدام الإيماءة "التمرير لأعلى" أو النقر على عنصر حث المستخدِم على اتخاذ إجراء.
وسيظهر في أسفل كل صفحة تتم تهيئتها بمرفق رسالة مطالبة في جهة المستخدم لفتح المرفق.

يجب أن يكون العنصر `<amp-story-page-attachment>` آخر عنصر ثانوي للمكوِّن `<amp-story-page>` ويجب أن يحتوي على السمة `layout="nodisplay"`. ويُتوقع توفير محتوى رمز HTML لصفحات AMP المرفق مضمنًّا في سجلّ AMP، في هذه العلامة `<amp-story-page-attachment>`.

### المحتوى المسموح به والمكونات المسموح بها

تقبل مرفقات صفحات السجل عناصر HTML نفسها التي يقبلها سجلّ AMP، بالإضافة إلى المكونات الواردة أدناه، مثل مشغلات الفيديو التابعة لجهات خارجية أو التضمينات في وسائل التواصل الاجتماعي. ويعني هذا أنه يمكنك إضافة محتوى آخر مطول للغاية أو غير مسموح به في صفحة سجلّ AMP.

<details>
  <summary>قائمة بمكونات AMP المسموح بها في مرفق الصفحة:</summary>
  <ul>
    <li><code>&lt;amp-3d-gltf></code></li>
    <li><code>&lt;amp-3q-player></code></li>
    <li><code>&lt;amp-accordion></code></li>
    <li><code>&lt;amp-audio></code></li>
    <li><code>&lt;amp-beopinion></code></li>
    <li><code>&lt;amp-bodymovin-animation></code></li>
    <li><code>&lt;amp-brid-player></code></li>
    <li><code>&lt;amp-brightcove></code></li>
    <li><code>&lt;amp-byside-content></code></li>
    <li><code>&lt;amp-call-tracking></code></li>
    <li><code>&lt;amp-carousel></code></li>
    <li><code>&lt;amp-dailymotion></code></li>
    <li><code>&lt;amp-date-countdown></code></li>
    <li><code>&lt;amp-embedly-card></code></li>
    <li><code>&lt;amp-facebook></code></li>
    <li><code>&lt;amp-facebook-comments></code></li>
    <li><code>&lt;amp-facebook-like></code></li>
    <li><code>&lt;amp-facebook-page></code></li>
    <li><code>&lt;amp-fit-text></code></li>
    <li><code>&lt;amp-fx-collection></code></li>
    <li><code>&lt;amp-fx-flying-carpet></code></li>
    <li><code>&lt;amp-gfycat></code></li>
    <li><code>&lt;amp-gfycat></code></li>
    <li><code>&lt;amp-gist></code></li>
    <li><code>&lt;amp-gist></code></li>
    <li><code>&lt;amp-google-document-embed></code></li>
    <li><code>&lt;amp-google-vrview-image></code></li>
    <li><code>&lt;amp-google-vrview-image></code></li>
    <li><code>&lt;amp-hulu></code></li>
    <li><code>&lt;amp-ima-video></code></li>
    <li><code>&lt;amp-image-slider></code></li>
    <li><code>&lt;amp-img></code></li>
    <li><code>&lt;amp-imgur></code></li>
    <li><code>&lt;amp-instagram></code></li>
    <li><code>&lt;amp-izlesene></code></li>
    <li><code>&lt;amp-jwplayer></code></li>
    <li><code>&lt;amp-kaltura-player></code></li>
    <li><code>&lt;amp-list></code></li>
    <li><code>&lt;amp-list></code></li>
    <li><code>&lt;amp-live-list></code></li>
    <li><code>&lt;amp-live-list></code></li>
    <li><code>&lt;amp-mathml></code></li>
    <li><code>&lt;amp-mowplayer></code></li>
    <li><code>&lt;amp-nexxtv-player></code></li>
    <li><code>&lt;amp-o2-player></code></li>
    <li><code>&lt;amp-ooyala-player></code></li>
    <li><code>&lt;amp-pan-zoom></code></li>
    <li><code>&lt;amp-pinterest></code></li>
    <li><code>&lt;amp-playbuzz></code></li>
    <li><code>&lt;amp-powr-player></code></li>
    <li><code>&lt;amp-reach-player></code></li>
    <li><code>&lt;amp-reddit></code></li>
    <li><code>&lt;amp-riddle-quiz></code></li>
    <li><code>&lt;amp-soundcloud></code></li>
    <li><code>&lt;amp-springboard-player></code></li>
    <li><code>&lt;amp-timeago></code></li>
    <li><code>&lt;amp-twitter></code></li>
    <li><code>&lt;amp-video></code></li>
    <li><code>&lt;amp-video-iframe></code></li>
    <li><code>&lt;amp-vimeo></code></li>
    <li><code>&lt;amp-vine></code></li>
    <li><code>&lt;amp-viqeo-player></code></li>
    <li><code>&lt;amp-vk></code></li>
    <li><code>&lt;amp-wistia-player></code></li>
    <li><code>&lt;amp-yotpo></code></li>
    <li><code>&lt;amp-youtube></code></li>
  </ul>
</details>

### مثال

```html
<amp-story-page id="foo">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600">
  </amp-story-grid-layer>
  <amp-story-page-attachment layout="nodisplay">
    <h1>My title</h1>
    <p>Lots of interesting text with <a href="https://example.ampproject.org">links</a>!</p>
    <p>More text and a YouTube video!</p>
    <amp-youtube
        data-videoid="b4Vhdr8jtx0"
        layout="responsive"
        width="480" height="270">
    </amp-youtube>
    <p>And a tweet!</p>
    <amp-twitter
        data-tweetid="885634330868850689"
        layout="responsive"
        width="480" height="270">
    </amp-twitter>
  </amp-story-page-attachment>
</amp-story-page>
```

## الحركات

يمكن إضافة حركة لدخول كل مكوِّن من `<amp-story-page>`.

يمكنك تهيئة الحركات من خلال تحديد مجموعة من [سمات الحركات](#animation-attributes) في العنصر، بدون الحاجة إلى إضافات AMP أخرى أو المزيد من التهيئة.

### تأثيرات الحركات

تتوفر تأثيرات الحركات التالية كإعدادات مسبقة لسجلات AMP:

| اسم الإعداد المسبق       | المدة التلقائية (ملي ثانية) | المهلة التلقائية (ملي ثانية) |
|-----------------|---------------------| ------------------ |
| `drop`            | 1600                  | 0 |
| `fade-in`         | 500                   | 0 |
| `fly-in-bottom`   | 500                   | 0 |
| `fly-in-left`     | 500                   | 0 |
| `fly-in-right`    | 500                   | 0 |
| `fly-in-top`      | 500                   | 0 |
| `pulse`           | 500                   | 0 |
| `rotate-in-left`  | 700                   | 0 |
| `rotate-in-right` | 700                   | 0 |
| `twirl-in`        | 1000                  | 0 |
| `whoosh-in-left`  | 500                   | 0 |
| `whoosh-in-right` | 500                   | 0 |
| `pan-left`        | 1000                  | 0 |
| `pan-right`       | 1000                  | 0 |
| `pan-down`        | 1000                  | 0 |
| `pan-up`          | 1000                  | 0 |
| `zoom-in`         | 1000                  | 0 |
| `zoom-out`        | 1000                  | 0 |

[tip type="success"]
اطّلع على [عرض توضيحي مباشر لجميع الحركات لسجلات AMP](https://ampbyexample.com/stories/features/animations/) على الموقع "AMP بالمثال".
[/tip]

### سمات الحركات

##### animate-in [مطلوبة]

استخدِم هذه السمة لتحديد اسم [الإعداد المسبق لحركة](#animation-effects) الدخول.

*مثال*: العنوان يدخل من يسار الصفحة.

```html

<h2 animate-in="fly-in-left">
Fly from left!
</h2>

```

##### animate-in-duration [اختيارية]

استخدِم هذه السمة لتحديد مدة حركة الدخول بالثواني أو بالملي ثانية (مثال: 0.2 ثانية أو 200 ملي ثانية). تعتمد المدة التلقائية على الإعداد المسبق الذي حددته للحركة.

*مثال*: العنوان يدخل من يسار الصفحة وتنتهي الحركة خلال نصف ثانية.

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s">
Fly from left!
</h2>

```

##### animate-in-delay [اختيارية]

استخدِم هذه السمة لتحديد المهلة الممنوحة قبل بدء الحركة. يجب أن تكون القيمة أكبر من 0 أو تساويه، بالثواني أو بالملي ثانية (مثال: 0.2 ثانية أو 200 ملي ثانية). وتعتمد المهلة التلقائية على الإعداد المسبق الذي حددته للحركة.

*مثال*: بعد 0.4 ثانية، يدخل العنوان من يسار الصفحة وينتهي دخوله خلال 0.5 ثانية.

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s" animate-in-delay="0.4s">
Fly from left!
</h2>

```

[tip type="note"]
ليس هناك ما يضمن دقة مهلة انتهاء الحركة. فقد تحدث تأخيرات إضافية نتيجة تحميل الإضافة `amp-animation` في الخلفية عند فحص العنصر المتحرك الأول. يتم تحديد السمة كما يلي: *مهلة هذه الحركة لا تقل عن (س) ملي ثانية*. وينطبق هذا على جميع العناصر بما في ذلك العناصر التي لها مهلة 0 ثانية.
[/tip]

##### animate-in-after [اختيارية]

استخدِم هذه السمة لسلسلة أو متوالية من الحركات (مثل: تبدأ الحركة 2 بعد اكتمال الحركة 1). حدّد معرّف العنصر المتحرك الذي ستتبعه حركة هذا العنصر. يجب أن يكون العنصر متوفرًا على نفس `<amp-story-page>`. ويتم تطبيق المهلة بعد انتهاء حركة العنصر السابق. للحصول على مزيد من التفاصيل، اطّلع على القسم [الحركات المتوالية](#sequencing-animations) أدناه.

في الترميز التالي مثلاً، يدخل `object2` بعد اكتمال دخول `object1`:

```html
<amp-story-page id="page1">
  <amp-story-grid-layer template="vertical">
    <div id="object1"
        animate-in="rotate-in-left">
        1
    </div>
    <div id="object2"
        animate-in="fly-in-right"
        animate-in-after="object1">
        2 <!-- will start after object1 has finished -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

##### scale-start وscale-end [اختيارية، وتعمل فقط مع حركتَي `zoom-in` و`zoom-out`]

استخدِم هاتين السمتين لتحديد معلَمات إضافية لحركتَي zoom-in وzoom-out. يجب أن تكون القيمة أكبر من 0 أو تساويه، ويُسمح باستخدام الكسور العشرية. وستكون القيمة التلقائية للبداية التدريجية هي 1 والنهاية التدريجية هي 3 بالنسبة إلى zoom-in، والعكس صحيح بالنسبة إلى zoom-out.

*مثال*: يتم تكبير الصورة من 2x إلى 5x من حجمها خلال 4 ثوانٍ.

```html
<amp-img animate-in="zoom-in" scale-start="2" scale-end="5" animate-in-duration="4s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-x [اختيارية، وتعمل فقط مع حركتَي `pan-left` و`pan-right`]

استخدِم هذه السمة لتحديد التدوير الأفقي للصورة في الحركة pan-left/pan-right. يجب أن تكون القيمة أكبر من 0 أو تساويه بالبكسل. ستكون القيمة التلقائية تدوير العرض الكامل للصورة المحددة.

*مثال*: تدوير الصورة 200 بكسل إلى اليسار خلال 10 ثوانٍ.

```html
<amp-img animate-in="pan-left" translate-x="200px" animate-in-duration="10s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-y [اختيارية، وتعمل فقط مع حركتَي `pan-up` و`pan-down`]

استخدِم هذه السمة لتحديد التدوير الرأسي للصورة في الحركة pan-up/pan-down. يجب أن تكون القيمة أكبر من 0 أو تساويه بالبكسل. ستكون القيمة التلقائية تدوير الارتفاع الكامل للصورة المحددة.

*مثال*: تدوير الصورة 50 بكسل لأسفل خلال 15 ثانية.

```html
<amp-img animate-in="pan-down" translate-y="50px" animate-in-duration="15s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

### الحركات المتوالية

استخدِم السمة `animate-in-after` لعمل متوالية من الحركات. يجب أن تكون جميع العناصر متوفرة على `<amp-story-page>` نفسها. ولن تنتمي العناصر التي ليس بها السمة `animate-in-after` إلى سلسلة متوالية وسيتم تشغيلها بشكل مستقل عند دخولها الصفحة.

```html
<amp-story-page id="my-sequencing-page">
  <amp-story-grid-layer template="vertical">
    <div class="circle"
        animate-in="drop-in"
        animate-in-duration="1.8s">
      1 <!-- will start independently -->
    </div>
    <div id="rotate-in-left-obj"
        class="square"
        animate-in="rotate-in-left"
        animate-in-after="fade-in-obj"
        animate-in-delay="0.2s">
      2 <!-- will start after fade-in-obj has finished -->
    </div>
    <div class="square"
        animate-in-after="rotate-in-left-obj"
        animate-in="whoosh-in-right"
        animate-in-delay="0.2s">
      3 <!-- will start after rotate-in-left-obj has finished -->
    </div>
    <div id="fade-in-obj"
        class="circle"
        animate-in="fade-in"
        animate-in-duration="2.2s">
      1 <!-- will start independently -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

### الجمع بين عدة حركات

يمكنك تطبيق حركات متعددة لدخول عنصر واحد (مثال: يدخل العنصر إلى الصفحة طائرًا ويتلاشى في نفس الوقت). لا يمكن تعيين أكثر من إعداد حركة مسبق للعنصر الواحد، ومع ذلك يمكن دمج العناصر ذات حركات الدخول المختلفة ليكون عنصرًا واحدًا.

```html
<div animate-in="fly-in-left">
   <div animate-in="fade-in">
     I will fly-in and fade-in!
   </div>
</div>
```

[tip type="note"]
إذا كان من المفترض أن تبدأ حركة مركبة بعد نهاية حركة عنصر مستقل، احرص على تعيين السمة `animate-in-after`على نفس `id` في كل العناصر المدمجة المكوِّنة للحركة.
[/tip]

## الشاشة الختامية: `amp-story-bookend`

العلامة `amp-story-bookend` هي الشاشة الختامية للسجل. وتحتوي على الروابط ذات الصلة وخيارات المشاركة وروابط حث المستخدِم على اتخاذ إجراء والمزيد.

<figure class="centered-fig">
<amp-anim alt="مثال على المقالة ذات الصلة" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif" layout="fixed">
<noscript>
<img alt="مثال على المقالة ذات الصلة" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif">
</noscript>
</amp-anim>
</figure>

لاستخدام هذه العلامة، أدرِج `<amp-story-bookend>` كعنصر ثانوي في `<amp-story>` مع السمة المطلوبة `layout=nodisplay`.
يمكنك بعدها تحديد التهيئة JSON في ملف منفصل واستيرادها من خلال السمة `src` أو يمكنك وضعها مضمَّنة.

استيراد التهيئة JSON من خلال السمة `src`:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `layout=nodisplay` is required. -->
  <amp-story-bookend src="bookendv1.json" layout=nodisplay>
  </amp-story-bookend>
<amp-story>
```

إذا لم تكن تريد جلب تهيئة الشاشة الختامية من الخادم، يمكنك أيضًا تحديدها بشكل مضمَّن:

```html
<amp-story standalone>
  ...
  <amp-story-bookend layout=nodisplay>
    <script type="application/json">
      {
        "bookendVersion": "v1.0",
        "shareProviders": [ ... ],
        "components": [ ... ]
     }
    </script>
  </amp-story-bookend>
<amp-story>
```

عليك بعد ذلك ملء التهيئة JSON. وهذه هي مرحلة تخصيص الشاشة الختامية. وتبدو البنية العامة للتهيئة كما يلي:

```text
{
  "bookendVersion": "v1.0",
  "shareProviders": [
    ...
  ],
  "components": [
    ...
  ]
}
```

يجب تحديد أنك تستخدم الإصدار 1.0 عن طريق تضمين السطر الأول.

#### مكونات الشاشة الختامية:

تتألف الشاشة الختامية من مجموعة متنوعة من المكونات. ويمكن أن تكون مقالات أو روابط لحث المستخدِم على اتخاذ إجراء أو نص أو غير ذلك المزيد.

ويتم تحديدها في الحقل `components` من تهيئة JSON. ويمكنك مراجعة القسم [مثال على استجابة JSON](#example-json-response) أدناه للاطّلاع على مثال.

##### heading

يتضمن المكوِّن <code>heading</code> الحقل ```text</code> الذي يمكن استخدامه لإضافة عنوان لمجموعة مقالات.

```json
{
  "type": "heading",
  "text": "More to Read"
}
```

<amp-img alt="المكوِّن heading للشاشة الختامية"
src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-heading.png" width="386" height="123" layout="fixed">
  <noscript>
    <img alt="المكوِّن heading للشاشة الختامية" src="img/amp-story-bookend-component-heading.png">
  </noscript>
</amp-img>

##### small

يمكن استخدام المكوِّن `small` لربط المقالات ذات الصلة. ويتطلب الحقول التالية: `title` و`url` ويمكن اختياريًا استخدام الحقل `image`.

```json
{
type: "small",
title: "This is India an the best places you should go",
url: "http://example.com/article.html",
image: "http://placehold.it/256x128"
}
```

<amp-img alt="المكوِّن small للشاشة الختامية" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-small.png" width="379" height="192" layout="fixed">
<noscript>
<img alt="المكوِّن small للشاشة الختامية" src="img/amp-story-bookend-component-small.png">
</noscript>
</amp-img>

##### landscape

يمكن استخدام المكوِّن `landscape` لتنسيقات المحتوى البديلة، مثل الفيديو. ويتطلب الحقول التالية: `title` و`url` و`image`. ويمكن اختياريًا إضافة الحقل `category` الذي يعرض عنوانًا فرعيًا فوق العنوان الرئيسي.

```json
{
  "type": "landscape",
  "title": "TRAPPIST-1 Planets May Still Be Wet Enough for Life",
  "url": "http://example.com/article.html",
  "category": "astronomy",
  "image": "http://placehold.it/256x128"
}
```

<amp-img alt="المكوِّن landscape للشاشة الختامية" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-landscape.png" width="388" height="410" layout="fixed">
  <noscript>
    <img alt="المكوِّن landscape للشاشة الختامية" src="img/amp-story-bookend-component-landscape.png">
  </noscript>
</amp-img>

##### portrait

يمكن استخدام المكوِّن `portrait` للربط بسجلات أخرى. ويتطلب الحقول التالية: `title` و`url` و`image`. ويمكن اختياريًا إضافة الحقل `category` الذي يعرض عنوانًا فرعيًا فوق العنوان الرئيسي.

```json
{
  "type": "portrait",
  "category": "Science",
  "title": "New discovery found",
  "url": "http://example.com/article.html",
  "image": "http://placehold.it/312x416"
}
```

<amp-img alt="المكوِّن portrait للشاشة الختامية" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-portrait.png" width="382" height="522" layout="fixed">
  <noscript>
    <img alt="المكوِّن portrait للشاشة الختامية" src="img/amp-story-bookend-component-portrait.png">
  </noscript>
</amp-img>

##### cta-link

يتيح لك المكوِّن <code>cta-link</code> تحديد روابط لحث المستخدِم على اتخاذ إجراء (مثال: <code>Read More</code> أو <code>Subscribe</code>). ويحتوي هذا المكوِّن على المفتاح <code>links</code> الذي يحدد مصفوفة من الروابط. يمثل كل رابط منها كائنًا به قيم ```text</code> و<code>url</code>.

```json
{
type: "cta-link",
links: [
{
text: "Sign Up",
url: "example.com/signup"
},
{
text: "Subscribe",
url: "example.com/subscribe"
}
]
}
```

<amp-img alt="المكوِّن portrait للشاشة الختامية" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-cta-links.png" width="381" height="81" layout="fixed">
<noscript>
<img alt="المكوِّن portrait للشاشة الختامية" src="img/amp-story-bookend-component-cta-links.png">
</noscript>
</amp-img>

##### textbox

يتيح المكوِّن ```textbox</code> لك تحديد النص في الشاشة الختامية (مثال: المساهمون في الصورة). يتطلب هذا المكوِّن الصفيف <code>text</code> حيث يكون كل عنصر من عناصر الصفيف عبارة عن سطر من النص.

```json
{
  "type": "textbox",
  "text": [
    "Food by Enrique McPizza",
    "Choreography by Gabriel Filly",
    "Script by Alan Ecma S.",
    "Direction by Jon Tarantino"
  ]
}
```

<amp-img alt="المكوِّن textbox للشاشة الختامية" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-textbox.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="المكوِّن textbox للشاشة الختامية" src="img/amp-story-bookend-component-textbox.png">
  </noscript>
</amp-img>

**ربط صفحة AMP بصفحة AMP**

بالنسبة إلى المستندات التي تُعرض في عارِض صفحات AMP، عادة ما تنقل الروابط إلى `_top` أو تُفتح في نافذة جديدة. ومع ذلك، قد يستمر عرض الروابط التي تؤدي إلى صفحات AMP في العارض. ولتفعيل هذا السلوك، أضِف `"amphtml": true` إلى المكوِّن الذي يتيح عمل الروابط. مثال:

```json
...
{
  "type": "small",
  "title": "This is India an the best places you should go",
  "url": "http://example.com/my-amp-document.html",
  "image": "http://placehold.it/256x128",
  "amphtml": true
},
{
  "type": "cta-link",
  "links": [
    {
      "text": "Sign Up",
      "url": "example.com/signup",
      "amphtml": true
    },
    {
      "text": "Subscribe",
      "url": "example.com/subscribe"
    }
  ]
},
...
```

#### المشاركة على شبكات التواصل الاجتماعي

يتم تحديد تهيئة المشاركة على شبكات التواصل الاجتماعي في الحقل `shareProviders` من كائن الاستجابة وهو حقل اختياري.

يجب أن يحتوي هذا الحقل على سلسلة، تمثل كل حلقة فيها اسم موفر خدمة المشاركة (مثل `twitter`).

عند الحاجة إلى معلَمات إضافية، يجب استخدام كائن له أزواج المفتاح/القيمة. يجب أن يحتوي الكائن على `provider` رئيسي بقيمة (مثل `facebook`) يتوافق مع اسم الموفر. تعتمد أزواج المفتاح/القيمة التالية على موفر خدمة المشاركة.

قائمة الموفرين المتاحين هي نفس القائمة للمكوِّن [amp-social-share](https://www.ampproject.org/docs/reference/components/amp-social-share).

يحتوي كل من هؤلاء الموفرين على مجموعة مختلفة من المعلَمات المتاحة ([اطّلع على `data-param-*`](https://www.ampproject.org/docs/reference/components/amp-social-share#data-param-%2a)). يأخذ كائن التهيئة هذه المعلَمات بدون البادئة `data-param-` (مثال: ستظهر `data-param-app_id` في كائن التهيئة باسم `app_id`).

#### التهيئة JSON

يجب أن تحتوي العلامة `<amp-story-bookend>` على السمة `src` التي توجِه إلى تهيئة JSON للشاشة الختامية. وتوصف بأنها نقطة نهاية عنوان URL التي تقبل طلبات GET وتعرض استجابة JSON بمحتوى الشاشة الختامية.  وفي حال إسقاط العلامة، يعرض المكوِّن amp-story واجهة مستخدم تلقائية لشاشة النهاية. وتقع على النظام مسؤولية جلب البيانات الضرورية لعرض المقالات ذات الصلة والمقالات الرائجة.  ويمكن عرض هذا من ملف JSON ثابت أو يتم إنشاؤه ديناميكًا (لحساب المقالات الرائجة حاليًا مثلاً).

#### مثال على استجابة JSON

```text
// You must specify version v1.0.
"bookendVersion": "v1.0",
"shareProviders": [
  "email",
  "tumblr",
  {
    "provider": "twitter",
    // You can add custom sharing parameters depending on the social platform.
    "text": "This is custom share text that I would like for the Twitter platform"
  },
  {
    "provider": "facebook",
    // Facebook requires an `app_id` param
    "app_id": "MY_FACEBOOK_APP_ID"
  }
],
"components": [
    {
      "type": "heading",
      "text": "More to read"
    },
    {
      "type": "small",
      "title": "This is India an the best places you should go",
      "url": "http://example.com/article.html",
      "image": "http://placehold.it/256x128"
    },
    ...
  ]
}
```

## المكونات الأخرى التي يمكن استخدامها في سجلات AMP

في ما يلي المكونات الأخرى التي يمكن استخدامها في سجلات AMP والتي تتطلب بعض التحذيرات الخاصة بالسجل.

* [amp-sidebar](https://www.ampproject.org/docs/reference/components/amp-sidebar#sidebar-for-stories)
* [amp-consent](https://www.ampproject.org/docs/reference/components/amp-consent#prompt-ui-for-stories)

لمعرفة المزيد عن المكونات المستخدَمة عمومًا، يمكنك الاطّلاع على [قائمة العناصر الثانوية المسموح بها](https://www.ampproject.org/docs/reference/components/amp-story#children).

## التحقق

اطّلِع على [قواعد amp-story](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) في مواصفات مدقق AMP.

## الأقلمة

لأقلمة سجلك، أدرِج رمز اللغة في السمة `lang` في العلامة `<html>` في السجلّ، مثل `<html lang="en">` للغة الإنجليزية.  رموز اللغات المعتمدة كالتالي:

* ar (العربية)
* de (الألمانية)
* en-GB (الإنجليزية، المملكة المتحدة)
* en (الإنجليزية، الولايات المتحدة)
* es-419 (الإسبانية، أمريكا الوسطى/اللاتينية)
* es (الإسبانية، إسبانيا)
* fr-CA (الفرنسية، كندا)
* fr (الفرنسية، فرنسا)
* hi (الهندية)
* id (الإندونيسية)
* it (الإيطالية)
* ja (اليابانية)
* ko (الكورية)
* nl (الهولندية)
* no (النرويجية)
* pt-BR (البرتغالية، البرازيل)
* pt (البرتغالية، البرتغال)
* ru (الروسية)
* tr (التركية)
* vi (الفيتنامية)
* zh-TW (الصينية التقليدية)
* zh (الصينية المبسطة)

بالإضافة إلى ذلك، يمكنك تضمين السمة `dir="rtl"` في العلامة `<html>` في سجلك بالنسبة إلى اللغات التي تُكتب من اليمين إلى اليسار.  وقد يتم استخدام هذا مع رمز اللغة أيضًا، مثل `<html lang="ar" dir="rtl">`.

## موارد ذات الصلة

* [البرنامج التعليمي: إنشاء سجلّ AMP مرئي](https://www.ampproject.org/docs/tutorials/visual_story)
* [أمثلة من موقع "AMP بالمثال"](https://ampbyexample.com/stories/#stories/introduction)
* [أفضل الممارسات لإنشاء سجلّ AMP](https://www.ampproject.org/docs/guides/amp_story_best_practices)

</amp-story></body>
