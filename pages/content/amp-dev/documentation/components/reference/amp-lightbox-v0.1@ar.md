---
$title: amp-lightbox
$category@: layout
formats:
  - websites
  - ads
  - email
teaser:
  text: Displays elements in a full-viewport “lightbox” modal.
---



<!--
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



<table>
  <tr>
    <td width="40%"><strong>الوصف</strong></td>
    <td>يعرض العناصر في شكل عرض مبسط بالحجم الكامل.</td>
  </tr>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td width="40%"><strong>أمثلة</strong></td>
    <td>يمكن الاطّلاع على <a href="https://ampbyexample.com/components/amp-lightbox/">مثال amp-lightbox</a> في الموقع "AMP بالمثال".</td>
  </tr>
</table>


[جدول المحتويات]

## السُلوك <a name="behavior"></a>

يحدد المكوِّن `amp-lightbox` العناصر الثانوية التي يتم عرضها في تراكب/شكل إطار العرض الكامل. عندما ينقر المستخدِم على عنصر (مثل زر)، فإن معرّف `amp-lightbox` المُشَار إليه في السمة `on` للعنصر يؤدي إلى ظهور العرض المبسط بحيث يأخذ حجم كامل الإطار ويعرض عناصر `amp-lightbox` الثانوية.

يؤدي الضغط على مفتاح escape في لوحة المفاتيح إلى غلق العرض المبسط. أو بدلاً من ذلك، يؤدي تعيين السمة `on` على عنصر واحد أو أكثر في العرض المبسط وتعيين طريقته على `close` إلى إغلاق العرض المبسط عند النقر على العنصر.

```html
<button on="tap:quote-lb">See Quote</button>
<amp-lightbox id="quote-lb" layout="nodisplay">
    <blockquote>"Don't talk to me about JavaScript fatigue" - Horse JS</blockquote>
    <button on="tap:quote-lb.close">Nice!</button>
</amp-lightbox>
```

[tip type="read-on"]
يوجد أيضًا المكوِّن [`<amp-image-lightbox>`](amp-image-lightbox.md) لعرض الصور في العرض المبسط.
[/tip]

## السمات <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>animate-in (اختياريّة)</strong></td>
    <td>تحدد نمط حركة فتح العرض المبسط. وسيتم تعيين هذا تلقائيًا على <code>fade-in</code>. والقيم الصالحة هي <code>fade-in</code> و<code>fly-in-bottom</code> و<code>fly-in-top</code>.
      <br><br>
      <strong>ملاحظة</strong>: تعمل الحركة <code>fly-in-*</code> على الإعداد المسبق لتعديل الخاصية <code>transform</code> للعنصر <code>amp-lightbox</code>. لا تعتمد على تحويل العنصر <code>amp-lightbox</code> مباشرة. إذا احتجت إلى تطبيق تحويل، عيِّنه على عنصر مدمج بدلاً من ذلك.</td>
  </tr>
  <tr>
    <td width="40%"><strong>close-button (مطلوبة في إعلانات AMPHTML)</strong></td>
    <td>تعرض رأس زر الإغلاق أعلى العرض المبسط. هذه السمة مطلوبة وصالحة للاستخدام مع <a href="#a4a">إعلانات AMPHTML</a> فقط.</td>
  </tr>
  <tr>
    <td width="40%"><strong>id (مطلوبة)</strong></td>
    <td>معرّف فريد للعرض المبسط.</td>
  </tr>
  <tr>
    <td width="40%"><strong>layout (مطلوبة)</strong></td>
    <td>يجب تعيينها على <code>nodisplay</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>scrollable (اختياريّة)</strong></td>
    <td>عند توفر السمة <code>scrollable</code>، يمكن تمرير محتوى العرض المبسط عندما يتجاوز ارتفاع إعلان العرض المبسط.
      <br><br>
      <strong>ملاحظة</strong>: غير مسموح بالسمة <code>scrollable</code> عند استخدام <code>&lt;amp-lightbox&gt;</code> داخل إعلان AMPHTML. اقرأ القسم <a href="#a4a">استخدام amp-lightbox في إعلانات AMPHTML</a> للحصول على التفاصيل.</td>
  </tr>
  <tr>
    <td width="40%"><strong>scrollable (اختياريّة)</strong></td>
    <td></td>
  </tr>
</table>


## التصميم <a name="styling"></a>

يمكنك تصميم `amp-lightbox` باستخدام CSS القياسي.

## الإجراءات <a name="actions"></a>

يعرض `amp-lightbox` الإجراءات التالية التي يمكنك استخدام [بنية on في AMP لتشغيلها](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md):

<table>
  <tr>
    <th width="20%">الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>open</code> (تلقائي)</td>
    <td>يفتح العرض المبسط.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>يغلق العرض المبسط.</td>
  </tr>
</table>


## <a id="a4a"></a> استخدام `amp-lightbox` في إعلانات AMPHTML <a name="a4a"></a>

[tip type="note"]

إن استخدام المكوِّن `amp-lightbox` في إعلانات AMPHTML [تجريبي](../../../documentation/guides-and-tutorials/learn/experimental.md) وخاضع للتطوير المستمر. لاستخدام `amp-lightbox` في إعلانات AMPHTML، [فعِّل التجربة `amp-lightbox-a4a-proto`](http://cdn.ampproject.org/experiments.html).

[/tip]

هناك بعض الاختلافات بين استخدام `amp-lightbox` في مستندات AMP العادية و[الإعلانات المكتوبة باللغة AMPHTML](../../../documentation/guides-and-tutorials/learn/a4a_spec.md):

### السمة close-button مطلوبة <a name="requires-close-button"></a>

تكون السمة `close-button` مطلوبة بالنسبة إلى إعلانات AMPHTML. تؤدي هذه السمة إلى عرض رأس أعلى العرض المبسط. ويحتوي الرأس على زر الإغلاق وتصنيف مكتوب عليه "إعلان". ترجع أسباب طلب هذا الرأس إلى ما يلي:

* إعداد تجربة متسقة للمستخدِم يمكن التنبؤ بها لإعلانات AMPHTML
* التأكد من وجود نقطة خروج دائمة للعرض المبسط، وإلا يمكن لتصميم الإعلان اختراق محتوى مستندات المضيف بفعالية من خلال العرض المبسط.

السمة `close-button` مطلوبة ولا يُسمح بها إلا في إعلانات AMPHTML. في مستندات AMP العادية، يمكنك تقديم زر الإغلاق في أي مكان تحتاج إليه كجزء من محتوى `<amp-lightbox>`.

### غير مسموح بإعلانات العرض المبسط القابلة للتمرير <a name="scrollable-lightboxes-are-disallowed"></a>

بالنسبة إلى إعلانات AMPHTML، لا يُسمح باستخدام إعلانات العرض المبسط القابلة للتمرير.

### الخلفية شفافة <a name="transparent-background"></a>

عندما تستخدم `<amp-lightbox>` في إعلانات AMPHTML، تصبح خلفية العنصر `<body>` شفافة لأن وقت تشغيل AMP يغيّر حجم محتوى تصميم الإعلان ويعيد تنظيمه قبل توسيع العرض المبسط. يتم ذلك لمنع حدوث "قفزة" بصرية في التصميم أثناء فتح الإعلان. إذا كان تصميم إعلانك يحتاج إلى خلفية، عيّنها على حاوية متوسطة (مثل `<div>` بالحجم الكامل) بدلاً من `<body>`.

عند تشغيل إعلان AMPHTML في بيئة خارجية (في مستند غير AMP مثلاً)، يتوسط التصميم في إطار العرض ثم يتم توسيعه. ويحدث هذا لأن إطارات iframe الخارجية تحتاج إلى الاعتماد على واجهة برمجة تطبيقات postMessage لتفعيل ميزات مثل تغيير حجم الإطار، وهو ما يحدث بشكل غير متزامن، لذا فإن توسيط التصميم أولاً يتيح انتقالاً سلسًا بدون حدوث قفزات مرئية.

### أمثلة على الانتقال في العرض المبسط لإعلانات AMPHTML <a name="examples-of-transitions-in-lightbox-for-amphtml-ads"></a>

في الأمثلة أدناه، نوضح شكل الانتقال لإعلان AMPHTML يحتوي على السمة `animate-in="fly-in-bottom"` وقد تم تعيينها على عنصر العرض المبسط لإعلان AMPHTML في إطار iframe صديق وإعلان AMPHTML في iframe خارجي.

##### إطارات iframe صديقة (من ذاكرة التخزين المؤقت لصفحات AMP مثلاً) <a name="on-friendly-iframes-eg-coming-from-an-amp-cache"></a>

<amp-img alt="إعلان العرض المبسط في إطار iframe صديق" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/lightbox-ad-fie.gif" layout="fixed">
<noscript>
<img alt="إعلان العرض المبسط في إطار iframe صديق" src="../../spec/img/lightbox-ad-fie.gif">
</noscript>
</amp-img>

##### إطارات iframe خارجية (من خارج ذاكرة التخزين المؤقت لصفحات AMP مثلاً) <a name="on-third-party-iframes-eg-outside-the-amp-cache"></a>

<amp-img alt="إعلان العرض المبسط في إطار iframe خارجي" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/lightbox-ad-3p.gif" layout="fixed">
<noscript>
<img alt="إعلان العرض المبسط في إطار iframe خارجي" src="../../spec/img/lightbox-ad-3p.gif">
</noscript>
</amp-img>

## التحقق <a name="validation"></a>

اطِّلع على [قواعد amp-lightbox](https://github.com/ampproject/amphtml/blob/main/extensions/amp-lightbox/validator-amp-lightbox.protoascii) في مواصفات مدقق AMP.
