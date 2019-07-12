---
$category@: layout
formats:
  - websites
  - email
  - ads
teaser:
  text: Displays multiple similar pieces of content along a horizontal axis.
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

# amp-carousel

منصّة عرض بعناصر متغيّرة لعرض عدة عناصر محتوى متشابهة متغيّرة على محور أفقي؛ وتهدف إلى توفير مرونة عالية وأداء عالٍ.

<table>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">التنسيقات المعتمدة</a></strong></td>
    <td>
      <ul>
        <li>منصّة عرض بعناصر متغيّرة: fixed وfixed-height وnodisplay.</li>
        <li>الشرائح: fill وfixed وfixed-height وflex-item وnodisplay وresponsive.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>أمثلة</strong></td>
    <td>من موقع "AMP بالمثال":<ul>
      <li><a href="https://ampbyexample.com/components/amp-carousel/">مثال amp-carousel</a></li>
      <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/">معارض الصور باستخدام amp-carousel</a></li></ul></td>
    </tr>
  </table>

# السلوك

يُعتبر كل عنصر من العناصر الثانوية المباشرة للمكوِّن `amp-carousel` عنصرًا في منصّة عرض بعناصر متغيّرة. قد يكون لكل من هذه العقد أيضًا عناصر HTML ثانوية عشوائية.

تتكون منصّة العرض ذات العناصر المتغيّرة من عدد عشوائي من العناصر بالإضافة إلى أسهم اختياريّة للتنقل للتقدم إلى عنصر أو الرجوع إلى آخر.

تتنقل منصّة العرض ذات العناصر المتغيّرة بين العناصر عند تمرير المستخدِم سريعًا أو استخدام مفاتيح الأسهم أو النقر على أسهم التنقل الاختياريّة.

<!--مثال مدمج - للعرض في ampproject.org -->

<div>
  <amp-iframe height="313"
              src="https://ampproject-b5f4c.firebaseapp.com/examples/ampcarousel.basic.embed.html"
              layout="fixed-height"
              sandbox="allow-scripts allow-forms allow-same-origin"
              resizable>
  <div aria-label="عرض المزيد" overflow="" tabindex="0" role="button">عرض الترميز الكامل</div>
  <div placeholder=""></div>
  </amp-iframe>
</div>

# التقدم إلى شريحة محددة

سيؤدي تعيين طريقة للسمة `on` في عنصر لتنفيذ `tap:carousel-id.goToSlide(index=N)`، عند نقر المستخدِم، إلى انتقال منصّة عرض بعناصر متغيّرة ذات المعرف "carousel-id" إلى الشريحة بالفهرس index=N (ستكون الشريحة الأولى عند index=0 والشريحة الثانية عند  index=1 وهكذا).

في المثال التالي، لدينا منصّة عرض بثلاث صور مع أزرار معاينة أسفل المنصّة. عندما ينقر المستخدِم على أحد الأزرار، يتم عرض عنصر المنصّة المقابل.

<!--مثال مدمج - للعرض في ampproject.org -->

<div>
<amp-iframe height="878"
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampcarousel.advance-slide.embed.html"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable>
<div aria-label="عرض المزيد" overflow="" tabindex="0" role="button">عرض الترميز الكامل</div>
<div placeholder=""></div>
</amp-iframe>
</div>

# السمات

<table>
  <tr>
    <td width="40%"><strong>type</strong></td>
    <td>تحدد نوع العرض عناصر منصّة العرض ذات العناصر المتغيّرة، والذي يمكن أن يكون:
  <ul>
    <li><code>carousel</code> (تلقائي): يتم عرض جميع الشرائح وتكون قابلة للتمرير أفقيًا. يتيح هذا النوع التنسيقات التالية فقط: <code>fixed</code> و<code>fixed-height</code> و<code>nodisplay</code>.</li>
    <li><code>slides</code>: يعرض هذا النوع شريحة واحدة في المرة. يتيح هذا النوع التنسيقات التالية: <code>fill</code> و<code>fixed</code> و<code>fixed-height</code> و<code>flex-item</code> و<code>nodisplay</code> و<code>responsive</code>.</li>
    </ul></td>
  </tr>
  <tr>
    <td width="40%"><strong>height (مطلوبة)</strong></td>
    <td>تحدد ارتفاع منصّة العرض بالبكسل.</td>
  </tr>
  <tr>
    <td width="40%"><strong>controls (اختياريّة)</strong></td>
    <td>تعرض بشكل دائم السهم الأيمن والأيسر للمستخدِم للتنقل بين عناصر منصّة العرض على أجهزة الجوال.
      تختفي أسهم التنقل تلقائيًا بعد بضع ثوانٍ على الهاتف الجوال.
      يمكن أيضًا التحكم في رؤية الأسهم من خلال التصميم، ويمكن استخدام الاستعلام عن الوسائط لعرض الأسهم فقط في عرض شاشات معينة. على جهاز كمبيوتر سطح المكتب، يتم دائمًا عرض الأسهم ما لم يكن هناك عنصر ثانوي واحد.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-next-button-aria-label (اختياريّة)</strong></td>
    <td>تعيّن السمة aria-label لـ <code>amp-carousel-button-next</code>. في حال عدم توفير أي قيمة، سيتم تعيين القيمة التلقائية للسمة aria-label على 'Next item in carousel'.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-prev-button-aria-label (اختياريّة)</strong></td>
    <td>تعيّن السمة aria-label لـ <code>amp-carousel-button-prev</code>. في حال عدم توفير أي قيمة، سيتم تعيين القيمة التلقائية للسمة aria-label' على 'Previous item in carousel'.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-button-count-format (اختياريّة)</strong></td>
    <td>سلسلة تنسيق تأخذ الشكل <code>(%s of %s)</code> وتستخدم كلاحقة للسمة aria-label لـ <code>amp-carousel-button-next</code>/<code>amp-carousel-button-prev</code>. ويوفر هذا معلومات لمستخدِمي قارئ الشاشة عن مدى تقدمهم في منصّة العرض. في حال عدم توفير أي قيمة، سيتم تعيين القيمة التلقائية على '(%s of %s)'.</td>
  </tr>
  <tr>
    <td width="40%"><strong>autoplay (اختياريّة)</strong></td>
    <td>تعمل على التقدم إلى الشريحة التالية بدون تدخل من المستخدِم.<br>
      في حال توفرها بدون قيمة:
      <ul>
        <li>بشكل تلقائي، تعمل على الانتقال إلى الشريحة التالية بفاصل زمني 5000 ملي ثانية (5 ثوانٍ)، ويمكن إلغاء هذا من خلال السمة <code>delay</code>.</li>
        <li>تعمل على إرفاق السمة <code>loop</code> بالمكّوِن <code>amp-carousel</code> في حال عدم توفر <code>loop</code>.</li>
        <li>يتطلب توفر شريحتين على الأقل حتى يحدث التشغيل التلقائي.</li>
        <li>تنطبق فقط على منصّات عرض بعناصر متغيّرة من النوع <code>type = slides</code>.</li>
      </ul>
      في حال توفرها بقيمة:
      <ul>
        <li>تعمل على إرفاق السمة <code>loop</code> بالمكّوِن <code>amp-carousel</code> في حال عدم توفر <code>loop</code>.</li>
        <li>تزيل السمة <code>loop</code> بعد الوصول إلى عدد مرات التكرار المطلوب.</li>
      </ul></td>
  </tr>
  <tr>
    <td width="40%"><strong>delay (اختياريّة)</strong></td>
    <td>تحدد مدة (بالملي ثانية) فاصل الانتقال إلى الشريحة التالية عند تفعيل <code>autoplay</code>. لا تنطبق السمة <code>delay</code> إلا على منصات العرض من النوع <code>type=slides</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>loop (اختياريّة)</strong></td>
    <td>تسمح للمستخدِم بالتقدم بعد العنصر الأول أو العنصر الأخير. ويجب أن يكون هناك 3 شرائح على الأقل حتى يحدث التكرار. لا تنطبق السمة <code>loop</code> إلا على منصات العرض من النوع <code>type=slides</code>.
      <em>مثال: لعرض منصّة عرض بعناصر متغيّرة من النوع slides مع عناصر التحكم والتكرار والتشغيل التلقائي المتأخر</em>
      <!--مثال مدمج - للعرض في ampproject.org -->
      <div>
        <amp-iframe height="446"
                    src="https://ampproject-b5f4c.firebaseapp.com/examples/ampcarousel.controls.embed.html"
                    layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin"
                    resizable>
          <div aria-label="عرض المزيد" overflow="" tabindex="0" role="button">عرض الترميز الكامل</div>
          <div placeholder=""></div>
        </amp-iframe>
      </div></td>
    </tr>
    <tr>
      <td width="40%"><strong>السمات المشتركة</strong></td>
      <td>يتضمن هذا العنصر <a href="https://www.ampproject.org/docs/reference/common_attributes">السمات المشتركة</a> التي تشمل مكونات AMP.</td>
    </tr>
</table>


# التصميم

* يمكنك استخدام محدد العنصر `amp-carousel` لتصميمه بحرية.
* يمكنك استخدام محدد الفئة `.amp-carousel-slide` لاستهداف عناصر منصّة العرض.
* يكون زر `amp-carousel` مخفيًا عند تعطيله.
* بشكل تلقائي، يستخدم `.amp-carousel-button` صورة SVG مضمّنة كصورة background-image للأزرار. يمكنك إلغاء ذلك باستخدام صورة SVG أو صورة خاصة بك كما في المثال أدناه.

*مثال: صورة SVG مضمّنة تلقائيًا للزر `.amp-carousel-button`*

```css
.amp-carousel-button-prev {
  left: 16px;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" fill="#fff" /></svg>');
}
```

*مثال: إلغاء صورة SVG المضمنّة تلقائيًا للزر `.amp-carousel-button`*

```css
.amp-carousel-button-prev {
  left: 5%;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" fill="#fff" /></svg>');
}
```

# التحقق

اطِّلع على [قواعد amp-carousel](https://github.com/ampproject/amphtml/blob/master/extensions/amp-carousel/validator-amp-carousel.protoascii) في مواصفات مدقق AMP.
