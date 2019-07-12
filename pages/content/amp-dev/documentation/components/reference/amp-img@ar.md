---
$category@: media
formats:
  - websites
  - email
  - ads
  - stories
teaser:
  text: Replaces the HTML5 img tag.
---


<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

# amp-img


<table>
  <tr>
    <td class="col-fourty"><strong>الوصف</strong></td>
    <td>بديل للعلامة HTML <code>img</code> يديره وقت التشغيل.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">التنسيقات المعتمدة</a></strong></td>
    <td>fill وfixed وfixed-height وflex-item وintrinsic وnodisplay وresponsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>أمثلة</strong></td>
    <td>اطِّلع على <a href="https://ampbyexample.com/components/amp-img/">مثال amp-img</a> في الموقع "AMP بالمثال".</td>
  </tr>
</table>

[جدول المحتويات]

# السلوك

قد يختار وقت التشغيل تأخير تحميل الموارد أو تحديد أولوية تحميلها بناءً على موضع إطار العرض أو موارد النظام أو النطاق الترددي للاتصال أو عوامل أخرى. وهكذا تتيح مكونات `amp-img` لوقت التشغيل إدارة موارد الصور بفعالية.

يجب إعطاء مكونات `amp-img`، شأنها شأن مثل جميع موارد AMP التي يتم جلبها من الخارج، حجمًا صريحًا (كما في `width` / `height`) بشكل مسبق، بحيث يمكن التعرّف على نسبة العرض إلى الارتفاع بدون جلب الصورة. يتم تحديد سلوك التنسيق الفعلي عن طريق السمة `layout`.

[tip type="read-on"]
تعرّف على المزيد من المعلومات عن التنسيقات في مواصفات [نظام تنسيقات رمز HTML لصفحات AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md) و[التنسيقات المعتمدة](https://www.ampproject.org/docs/guides/responsive/control_layout.html#the-layout-attribute).

[/tip]

# مثال: عرض صورة متجاوبة

في المثال التالي، نعرض صورة تستجيب لحجم إطار العرض عن طريق تعيين `layout=responsive`.  فالصورة تمتد وتتقلص وفقًا لنسبة العرض إلى الارتفاع التي تحددها سماتا `width` و `height`.

<div>
<amp-iframe height="193" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
<div aria-label="عرض المزيد" overflow="" tabindex="0" role="button">عرض الترميز الكامل</div>
<div placeholder=""></div>
</amp-iframe>
</div>

[tip type="read-on"]

تعرّف على صفحات AMP المتجاوبة في دليل [إنشاء صفحات AMP متجاوبة](https://www.ampproject.org/docs/guides/responsive/responsive_design.html).

[/tip]

في حال تعذُّر تحميل المورد الذي يطلبه المكوِّن `amp-img`، ستكون المساحة فارغة ما لم يتم توفير عنصر [`fallback`](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md#fallback) الثانوي. يتم تنفيذ العنصر الاحتياطي على التنسيق الأولي أما تغييرات src اللاحقة بعد التنسيق الأولي (من خلال تغيير الحجم + srcset مثلاً) لن يكون لها عنصر احتياطي منعًا للآثار المترتبة على الأداء.

# مثال: تحديد صورة احتياطية

في المثال التالي، إذا كان المتصفح لا يتيح عمل WebP، سيتم عرض صورة JPG الاحتياطية:

<div>
<amp-iframe height="271" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.fallback.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
<div aria-label="عرض المزيد" overflow="" tabindex="0" role="button">عرض الترميز الكامل</div>
<div placeholder=""></div>
</amp-iframe>
</div>

يمكن تعيين لون خلفية أو تأثير مرئي آخر لعنصر نائب باستخدام المحدِّد CSS والنمط على العنصر نفسه.

يمكن تطبيق ميزات صور إضافية مثل التسميات التوضيحية باستخدام HTML القياسي (مثل `figure` و`figcaption`).

[tip type="read-on"]

تعرّف على مزيد من المعلومات عن استخدام `amp-img` من الموارد التالية:

* [العناصر النائبة والعناصر الاحتياطية](https://www.ampproject.org/docs/design/responsive/placeholders)
* [تضمين الصور والفيديوهات](https://www.ampproject.org/docs/media/amp_replacements)

[/tip]

# السمات

**src**

تشبه هذه السمة سمة `src` على العلامة `img`. يجب أن تكون القيمة عنوان URL يوجّه إلى ملف صورة قابل للتخزين المؤقت بشكل علني. يمكن لموفري ذاكرة التخزين المؤقت إعادة كتابة عناوين URL هذه عند عرض ملفات AMP للإشارة إلى نسخة مخبأة من الصورة.

**srcset**

هي نفس السمة `srcset` على العلامة `img`. بالنسبة إلى المتصفحات التي لا تتيح `srcset`، سيتم تعيين `<amp-img>` تلقائيًا على استخدام `src`. في حال توفير `srcset` فقط بدون `src`، سيتم اختيار تحديد عنوان URL الأول في `srcset`.

**sizes**

هي نفس السمة `sizes` في العلامة `img`.

[tip type="read-on"]

يمكنك الاطّلاع على [الصور المتجاوبة باستخدام السمات srcset وsizes وheights](https://www.ampproject.org/docs/design/responsive/art_direction) لمعرفة استخدام `sizes` و`srcset`.

[/tip]

**alt**

سلسلة من نص بديل تشبه السمة `alt` في `img`.

**attribution**

سلسلة تشير إلى إسناد الصورة. مثال: `attribution="CC courtesy of Cats on Flicker"`

**height** و**width**

الحجم الواضح للصورة الذي يستخدمه وقت تشغيل AMP لتحديد نسبة العرض إلى الارتفاع بدون جلب الصورة.

**السمات المشتركة**

يتضمن هذا العنصر [السمات المشتركة](https://www.ampproject.org/docs/reference/common_attributes) التي تشمل مكونات AMP.

# التصميم

يمكن تصميم `amp-img` مباشرة عبر خصائص CSS. يمكن مثلاً إعداد عنصر نائب للخلفية الرمادية من خلال:

```css
amp-img {
  background-color: grey;
}
```

# نصائح

# تحجيم صورة بما يصل إلى العرض الأقصى

إذا أردت تغيير حجم الصورة مع تغير حجم النافذة ولكن بحد أقصى للعرض (بحيث لا تخرج الصورة عن عرضها):

1. عيِّن `layout=responsive` للمكوِّن `<amp-img>`.
2. في حاوية الصورة، حدّد السمة `max-width:<max width to display image>` للغة CSS.  لماذا في الحاوية؟  عنصر `amp-img` له `layout=responsive` هو عنصر *حظر المستوى* حيث إن `<img>` *مضمّنة*. أو يمكنك تعيين `display: inline-block` في CSS للعنصر amp-img.

# الفرق بين التنسيق المتجاوب والأساسي

يعمل كل من التنسيق `intrinsic` و`responsive` على إنشاء صورة سيتم تحجيمها تلقائيًا.  والفرق الرئيسي بينهما هو أن التنسيق `intrinsic` يستخدم صورة SVG كعنصر تحجيم.  هذا سيجعلها تتصرف بنفس طريقة صورة HTML القياسية مع الحفاظ على ميزة إعلام المتصفح بحجم الصورة في التنسيق الأولي. وسيكون للتنسيق `intrinsic` حجم أساسي ثم يعمل على تضخيم عنصر `div` عائم حتى يصل إلى حجم الصورة الطبيعي أو إلى قيد CSS مثل `max-width`. أما التنسيق `responsive` فسيعرض 0x0 في عنصر `div` عائم لأنه يأخذ حجمه من العنصر الرئيسي الذي لا يكون له حجم طبيعي عندما يصبح عائمًا.

# تعيين صورة بحجم ثابت

إذا أردت عرض الصورة بحجم ثابت:

1. عيِّن `layout=fixed` للمكوِّن `<amp-img>`.
2. حدِّد `width` و`height`.

[tip type="read-on"]

تعرّف على المزيد عن [التنسيق المُستنتَج](https://www.ampproject.org/docs/design/responsive/control_layout#what-if-the-layout-attribute-isn%E2%80%99t-specified?) في حال عدم تحديد السمة `layout`.

[/tip]

# تعيين نسبة العرض إلى الارتفاع

بالنسبة إلى الصور المتجاوبة، ليس من الضروري مطابقة `width` و`height` للعرض والارتفاع الدقيقين للمكوِّن `amp-img` حيث يلزم فقط أن تؤدي هذه القيم إلى نسبة العرض إلى الارتفاع نفسها.

على سبيل المثال، بدلاً من تحديد `width="900"` و`height="675"`، يمكنك فقط تحديد `width="1.33"` و`height="1"`.

<div>
<amp-iframe height="193"
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.aspectratio.embed.html"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable>
<div aria-label="عرض المزيد" overflow="" tabindex="0" role="button">عرض الترميز الكامل</div>
<div placeholder=""></div>
</amp-iframe>
</div>

# تعيين ملفات مصدر متعددة للحصول على درجات دقة للشاشات المختلفة

يجب استخدام السمة [`srcset`](#attributes) لتوفير درجات دقة مختلفة للصورة نفسها، والتي لها جميعها نسبة العرض إلى الارتفاع نفسها. سيختار المتصفح تلقائيًا الملف الأنسب من `srcset` استنادًا إلى درجة دقة الشاشة وعرض جهاز المستخدِم.

في المقابل، تعرض السمة [`media`](https://www.ampproject.org/docs/reference/common_attributes#media) مكونات AMP أو تخفيها، ويجب استخدامها عند تصميم التنسيقات المتجاوبة. تتمثل الطريقة المناسبة لعرض الصور بنسب عرض إلى ارتفاع مختلفة في استخدام عدة مكونات `<amp-img>` لكل منها سمة `media` تتوافق مع عرض الشاشة المراد ظهور كل مثيل عليها.

راجِع دليل [إنشاء صفحات AMP المتجاوبة](https://www.ampproject.org/docs/design/responsive/responsive_design#displaying-responsive-images) للحصول على مزيد من التفاصيل.

# الحفاظ على نسبة العرض إلى الارتفاع للصور ذات الأبعاد غير المعروفة

يتطلب نظام تنسيقات AMP نسبة العرض إلى الارتفاع للصورة مسبقًا قبل جلبها، ومع ذلك قد تكون أبعاد الصورة غير معروفة في بعض الحالات. ولعرض صور ذات أبعاد غير معروفة والحفاظ على نسب العرض إلى الارتفاع، ادمج التنسيق [`fill`](https://www.ampproject.org/docs/design/responsive/control_layout#the-layout-attribute) لصفحات AMP مع الخاصية [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/) للغة CSS. ويمكن الاطّلاع على [خطوات إتاحة الصور غير معروفة الأبعاد](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions) في الموقع "AMP بالمثال" للحصول على المزيد من المعلومات.

# التحقق

اطِّلع على [قواعد amp-img](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) في مواصفات مدقق AMP.
