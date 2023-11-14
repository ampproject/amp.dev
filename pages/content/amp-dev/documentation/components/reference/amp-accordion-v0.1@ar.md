---
$title: amp-accordion
$category@: layout
formats:
  - websites
  - email
  - ads
teaser:
  text: >-
    Provides a way for viewers to have a glance at the outline of the content
    and jump to a section of their choice at will.
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



يوفّر هذا المكّوِن طريقة للمشاهدين لإلقاء نظرة على مخطط المحتوى والانتقال إلى أي قسم. ويفيد هذا في أجهزة الجوال عند الحاجة إلى التمرير في قسم مكون من جملتين فقط.

<table>
  <tr>
    <td class="col-fourty"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-accordion" src="https://ampjs.org/v0/amp-accordion-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
    <td>container</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>أمثلة</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-accordion/">مثال توضيحي لترميز amp-accordion</a></td>
  </tr>
</table>


## السُلوك <a name="behavior"></a>

يتيح لك المكوِّن `amp-accordion` عرض أقسام محتوى قابلة للتصغير والتوسيع. يُعتبر كل عنصر من العناصر الثانوية المباشرة للمكّوِن `amp-accordion` قسمًا من accordion. يجب أن تكون كل عقدة من هذه العقد علامة `<section>`.

* يمكن أن يحتوي `amp-accordion` على عنصر `<section>` واحد أو أكثر كعناصر ثانوية مباشرة له.
* يجب أن يحتوي كل `<section>` بالضبط على عنصرَين ثانويَين مباشرَين.
* يمثل العنصر الثانوي الأول (من القسم) عنوان القسم ويجب أن يكون عنصر عنوان (واحد من `h1` أو `h2` أو ... أو `h6` أو `header`).
* يمكن أن يكون العنصر الثانوي الثاني (من القسم) أي علامة مسموح بها في شفرة HTML لصفحات AMP ويمثل محتوى القسم.
* يؤدي النقر على عنوان القسم إلى توسيع القسم أو تصغيره.
* سيتم الاحتفاظ بحالة التصغير/التوسيع لكل قسم في العنصر `amp-accordion` على مستوى الجلسة. لإيقاف الحفاظ على هذه الحالة، أضِف السمة `disable-session-states` إلى العنصر `amp-accordion`.

#### مثال: عرض accordion <a name="example-displaying-an-accordion"></a>

في هذا المثال، نعرض ثلاثة أقسام حيث يتم توسيع القسم الثالث عند تحميل الصفحة.  وتم أيضًا إيقاف الحفاظ على حالة التصغير/التوسيع من خلال تعيين `disable-session-states`.

[example preview="inline" playground="true" imports="amp-accordion"]
```html
<amp-accordion{% if not format=='email'%} disable-session-states{% endif %}>
  <section>
    <h2>Section 1</h2>
    <p>Content in section 1.</p>
  </section>
  <section>
    <h2>Section 2</h2>
    <div>Content in section 2.</div>
  </section>
  <section expanded>
    <h2>Section 3</h2>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/squirrel.jpg"
      width="320"
      height="256"></amp-img>
  </section>
</amp-accordion>
```
[/example]

[tip type="success"]

انتقِل إلى الموقع [AMP بالمثال](https://ampbyexample.com/components/amp-accordion/) لمشاهدة المزيد من العروض التوضيحية للمكّوِن `amp-accordion`.

[/tip]

### الأحداث <a name="events"></a>

سيتم تشغيل الأحداث التالية في `section` من `accordion`.

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>يتم تشغيل هذا الحدث على <code>section</code> المستهدف ويغيّر من الحالة تصغير إلى الحالة توسيع. يُرجى ملاحظة أن طلب <code>expand</code> على <code>section</code> قيد التوسيع أصلاً لن يؤدي إلى تشغيل هذا الحدث.</td>
  </tr>
  <tr>
    <td width="40%"><strong><strong><code>collapse</code></strong></strong></td>
    <td>يتم تشغيل هذا الحدث على <code>section</code> المستهدف ويغيّر من الحالة توسيع إلى الحالة تصغير. يُرجى ملاحظة أن طلب <code>collapse</code> على <code>section</code> قيد التصغير أصلاً لن يؤدي إلى تشغيل هذا الحدث.</td>
  </tr>
</table>

### الإجراءات <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>يتم تشغيل هذا الحدث على <code>section</code> المستهدف ويغيّر من الحالة تصغير إلى الحالة توسيع. يُرجى ملاحظة أن طلب <code>expand</code> على <code>section</code> قيد التوسيع أصلاً لن يؤدي إلى تشغيل هذا الحدث.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>toggle</code></strong></td>
    <td>يبدّل هذا الإجراء بين الحالة <code>expanded</code> و<code>collapsed</code> للمكّوِن <code>amp-accordion</code>. عند طلب الإجراء بدون أي وسيطات، فإنه يبدل بين جميع أقسام accordion. يمكن تحديد قسم واحد باستخدام الوسيطة <code>section</code> و` id` المقابل كقيمة لها.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>يعمل هذا الإجراء على توسيع <code>amp-accordion</code>. إذا كانت الحالة <code>expanded</code>، ستظل هكذا. عند طلب الإجراء بدون أي وسيطات، فإنه يوسّع جميع أقسام accordion. يمكن تحديد قسم واحد باستخدام الوسيطة <code>section</code> و<code>id</code> المقابل كقيمة لها.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>يعمل هذا الإجراء على تصغير <code>amp-accordion</code>. إذا كانت الحالة <code>collapsed</code>، ستظل هكذا. عند طلب الإجراء بدون أي وسيطات، فإنه يصغّر جميع أقسام accordion. يمكن تحديد قسم واحد باستخدام الوسيطة <code>section</code> و <code>id</code> المقابل كقيمة لها.</td>
  </tr>
</table>

#### السمات <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong><code>animate</code></strong></td>
    <td>عيِّن هذه السمة على <code>&lt;amp-accordion&gt;</code> لتحريك التوسيع / التصغير لجميع أقسام accordion.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>disable-session-states</code></strong></td>
    <td>عيِّن هذه السمة على <code>&lt;amp-accordion&gt;</code> لإيقاف الحفاظ على حالة accordion من حيث التصغير/التوسيع.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expanded</code></strong></td>
    <td>عيِّن هذه السمة على <code>&lt;section&gt;</code> لعرض القسم موسّعًا عند تحميل الصفحة.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand-single-section</code></strong></td>
    <td>عيِّن هذه السمة على <code>&lt;amp-accordion&gt;</code> للسماح بتوسيع <code>&lt;section&gt;</code> واحد فقط في المرة الواحدة. إذا ركّز المستخدم على <code>&lt;section&gt;</code> واحد، سيتم تصغير أي <code>&lt;section&gt;</code> آخر كان قيد التوسيع سابقًا.</td>
  </tr>
</table>

## التصميم <a name="styling"></a>

* يمكنك استخدام محدد العنصر `amp-accordion` لتصميمه بحرية.
* عناصر `amp-accordion` هي دائمًا `display: block`.
* لا يمكن أن تكون عناصر `<section>` والعنوان والمحتوى قابلة للتعويم.
* عندما يتم توسيع القسم، يكون للعنصر `<section>` السمة `expanded`.
* يمحو عنصر المحتوى عناصره الثانوية بنفسه باستخدام `overflow: hidden` وبالتالي لا يمكن أن يحتوي على أشرطة التمرير.
* يتم تعيين هوامش عناصر `<amp-accordion>` و`<section>` والعنوان والمحتوى على 0 ويمكن إلغاء هذا في التصميمات المخصصة.
* كل من عناصر العنوان والمحتوى `position: relative`.

## التحقق <a name="validation"></a>

اطِّلع على [قواعد amp-accordion](https://github.com/ampproject/amphtml/blob/main/extensions/amp-accordion/validator-amp-accordion.protoascii) في مواصفات مدقق AMP.
