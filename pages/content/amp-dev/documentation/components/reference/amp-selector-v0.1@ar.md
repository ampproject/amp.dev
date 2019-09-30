---
$title: amp-selector
$category@: dynamic-content
formats:
  - websites
  - email
teaser:
  text: >-
    Represents a control that presents a menu of options and lets the user
    choose from it. it.
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



يمثل هذا المكّوِن عنصر التحكم الذي يوفر قائمة الخيارات ويتيح للمستخدِم الاختيار من بينها.

<table>
  <tr>
    <td class="col-fourty" width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
    <td>الكل</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>أمثلة</strong></td>
    <td>اطلّع على <a href="https://ampbyexample.com/components/amp-selector/">مثال amp-selector</a> في الموقع "AMP بالمثال".</td>
  </tr>
</table>

[جدول المحتويات]

## السُلوك <a name="behavior"></a>

مُحدِد AMP عبارة عن عنصر التحكم الذي يوفر قائمة بالخيارات ويتيح للمستخدِم اختيار أحدها أو العديد منها، علمًا بأن أنواع محتوى الخيارات لا يقتصر على النص فقط.

* يمكن أن يحتوي `amp-selector` على أي عنصر عشوائي من عناصر HTML أو مكونات AMP (مثال: `amp-carousel` أو `amp-img` أو ما إلى ذلك).
* لا يمكن أن يحتوي `amp-selector` على أي عناصر تحكم `amp-selector` مدمجة.
* يمكن تعيين الخيارات القابلة للاختيار بإضافة السمة `option` إلى العنصر وتحديد قيمة للسمة (مثال: `<li option='value'></li>`).
* يمكن تعيين الخيارات الموقوفة بإضافة السمة `disabled` إلى العنصر (مثال: `<li option='d' disabled></li>`).
* يمكن تعيين الخيارات المحددة مسبقًا بإضافة السمة `selected` إلى العنصر (مثال: `<li option='b' selected></li>`).
* لإتاحة تعدد الاختيارات، أضِف السمة `multiple` إلى العنصر `amp-selector`.  يتيح العنصر `amp-selector` تلقائيًا اختيارًا واحدًا في المرة.
* لإيقاف `amp-selector` بأكمله، أضِف السمة `disabled` إلى العنصر `amp-selector`.
* عندما يحتوي `amp-selector` على السمة `name` ويكون `amp-selector` داخل العلامة `form`، وحدثت عملية إرسال على النموذج، يعمل `amp-selector` بمثابة مجموعة زر اختيار/مربع اختيار ويُرسل القيم المختارة (التي تم تعيينها للخيار) المقابلة لاسم `amp-selector`.

مثال:

```html

<form id="form1" action="/" method="get" target="_blank">
  <amp-selector name="single_image_select" layout="container">
    <ul>
      <li><amp-img src="/img1.png" width="50" height="50" option="1"></amp-img></li>
      <li><amp-img src="/img2.png" width="50" height="50" option="2"></amp-img></li>
      <li option="na" selected="">لا شيء مما سبق</li>
    </ul>
  </amp-selector>
  <amp-selector name="multi_image_select" layout="container" multiple="">
    <amp-img src="/img1.png" width="50" height="50" option="1"></amp-img>
    <amp-img src="/img2.png" width="50" height="50" option="2"></amp-img>
    <amp-img src="/img3.png" width="50" height="50" option="3"></amp-img>
  </amp-selector>
  <amp-selector name="multi_image_select_1" layout="container" multiple="">
    <amp-carousel id="carousel-1" width="200" height="60" controls="">
      <amp-img src="/img1.png" width="80" height="60" option="a"></amp-img>
      <amp-img src="/img2.png" width="80" height="60" option="b" selected=""></amp-img>
      <amp-img src="/img3.png" width="80" height="60" option="c"></amp-img>
      <amp-img src="/img4.png" width="80" height="60" option="d" disabled=""></amp-img>
    </amp-carousel>
  </amp-selector>
</form>
<amp-selector name="multi_image_select_2" layout="container" multiple="" form="form1">
  <amp-carousel height="300" id="carousel-1" type="slides" width="400" controls="">
    <amp-img height="60" src="/img1.png" width="80" option="a"></amp-img>
    <amp-img height="60" src="/img2.png" width="80" option="b" selected=""></amp-img>
    <amp-img height="60" src="/img3.png" width="80" option="c"></amp-img>
    <amp-img height="60" src="/img4.png" width="80" option="d"></amp-img>
  </amp-carousel>
</amp-selector>
```

## محو الاختيارات <a name="clearing-selections"></a>

لمحو جميع الاختيارات عند النقر على العنصر، عيِّن سمة الإجراء [`on`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) على العنصر وحدِد المعرّف `id` للعنصر AMP Selector بطريقة الإجراء `clear`.

مثال:

```html
<button on="tap:mySelector.clear">Clear Selection</button>
<amp-selector id="mySelector" layout="container" multiple>
  <div option>Option One</div>
  <div option>Option Two</div>
  <div option>Option Three</div>
</amp-selector>
```

[tip type="success"]

يمكنك الاطّلاع على أمثلة توضيحية في موقع [AMP بالمثال](https://ampbyexample.com/components/amp-selector/).

[/tip]

## السمات <a name="attributes"></a>

### السمات في المكّوِن `<amp-selector>` <a name="attributes-on-"></a>

<table>
  <tr>
    <td width="40%"><strong>disabled وform وmultiple وname</strong></td>
    <td>تعمل السمات الواردة أعلاه بنفس طريقة العمل في عنصر HTML القياسي [`<select>`](https://developer.mozilla.org/en/docs/Web/HTML/Element/select) element.</select></td>
  </tr>
  <tr>
    <td width="40%"><strong>keyboard-select-mode</strong></td>
    <td>تحدد السمة <code>keyboard-select-mode</code> سلوك التنقل باستخدام لوحة المفاتيح للخيارات في `<amp-selector>`.

      <ul><li><code>none</code> (تلقائي): يغيّر المفتاح Tab التركيز بين العناصر في `<amp-selector>`. يجب على المستخدِم الضغط على مفتاح الإدخال أو المسافة لتغيير الاختيار. وهذا ويتم إيقاف مفاتيح الأسهم. </amp-selector></li><li>
        <code>focus</code>: ينقل المفتاح Tab التركيز إلى `<amp-selector>`. ينتقل المستخدِم بين العناصر باستخدام مفاتيح الأسهم. ويجب الضغط على مفتاح الإدخال أو المسافة لتغيير الاختيار.</amp-selector></li><li>
          <code>select</code>: ينقل المفتاح Tab التركيز إلى `<amp-selector>`. يتغير الاختيار مع تنقل المستخدِم بين الخيارات باستخدام مفاتيح الأسهم. </amp-selector></li></ul></amp-selector></td>
  </tr>
</table>

### السمات في خيارات `<amp-selector>` <a name="attributes-on--options"></a>

<table>
  <tr>
    <td width="40%"><strong>option</strong></td>
    <td>تشير إلى إمكانية اختيار هذا الخيار.  إذا تم تحديد قيمة، يتم إرسال محتوى القيمة مع النموذج.</td>
  </tr>
  <tr>
    <td width="40%"><strong>disabled، selected</strong></td>
    <td>تعمل السمات الواردة أعلاه بنفس طريقة العمل في عنصر HTML القياسي [`<option>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option).</option></td>
  </tr>
</table>

## الأحداث <a name="events"></a>

قد تؤدي الأحداث إلى تشغيل الإجراءات على مكونات AMP الأخرى باستخدام السمة `on`.
مثال: `on="select: my-tab.show"`

يمكنك قراءة المزيد عن [الإجراءات والأحداث في AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md).

<table>
  <tr>
    <td width="40%"><strong>select</strong></td>
    <td>يؤدي `amp-selector` إلى تشغيل الحدث `select` عندما يحدد المستخدِم خيارًا.
      تعمل المحدِدات المتعددة والمحدِدات الفردية على تشغيل هذا الحدث عند اختيار خيارات أو إلغاء اختيارها.
      هذا ولا يؤدي النقر على الخيارات المتوقفة إلى تشغيل الحدث `select`.
      <ul>
        <li>
          يحتوي `event.targetOption` على قيمة السمة `option` للعنصر المختار.</li>
          <li>
            يحتوي `event.selectedOptions` على مصفوفة قيم السمة `option` لجميع العناصر المختارة.
          </li>
      </ul>
    </td>
  </tr>
</table>

## التحقق <a name="validation"></a>

اطّلع على [قواعد amp-selector](https://github.com/ampproject/amphtml/blob/master/extensions/amp-selector/validator-amp-selector.protoascii) في مواصفات مدقق AMP.
