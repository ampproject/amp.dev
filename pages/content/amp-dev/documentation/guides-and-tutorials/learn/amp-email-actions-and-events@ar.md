---
'$title': الإجراءات والأحداث في بريد AMP الإلكتروني
$order: 0
formats:
  - البريد الإلكتروني
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-email-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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

[tip type="ملحوظة"] يغطي هذا المستند الإجراءات والأحداث في تنسيق بريد AMP الإلكتروني، اقرأ [الإجراءات والأحداث](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-actions-and-events.md) لمواقع ويب AMP وقصصها وإعلاناتها. [/tip]

يتم استخدام السمة `on` لتثبيت معالجات الحدث في العناصر. يتم دعم تلك الأحداث في العنصر.

تُعد قيمة بناء الجملة لغة نموذجية بسيطة خاصة بالمجال:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

انظر الجدول أدناه للحصول على توصيفات كل جزء من بناء الجملة.

<table>
  <tr>
    <th width="30%">بناء الجملة</th>
    <th width="18%">مطلوب؟</th>
    <th width="42%">الوصف</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>نعم</td>
    <td>اسم الحدث الذي يظهره العنصر.</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>نعم</td>
    <td>هذا هو معرّف نموذج كائن المستند للعنصر، أو <a href="#special-targets">هدف خاص</a> محدد مسبقًا تريد تنفيذ إجراء عليه ردًا على الحدث. في المثال التالي، <code>targetId </code> هو معرف نموذج كائن المستند للهدف <code>amp-lightbox</code>،<code>photo-slides</code>. <pre><amp-lightbox id = "photo-slides"> </amp-lightbox>
<button on = "tap: photo-slides">Show Images</button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>لا</td>
    <td>هذا للعناصر التي تتضمن إجراءات افتراضية.<p>وهذه هي الطريقة التي يقوم بها العنصر الهدف (مشار إليه من قبل <code>targetId</code>) بإظهاره وترغب في تنفيذه عند تشغيل الحدث.</p> <p>وتتضمن AMP مفهومًا للإجراء الافتراضي الذي يمكن للعناصر تنفيذه. لذا عند حذف <code>methodName</code> سيقوم AMP بتنفيذ الطريقة الافتراضية.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>لا</td>
    <td>قد تقبل بعض الإجراءات الوسيطات، إذا كانت موثَّقة. ويتم تحديد الوسيطات بين هلالين في ترقيم <code>key=value</code>. وتكون القيم المقبولة عبارة عن:       <ul>         <li>سلاسل بسيطة من دون قوسين: <code>simple-value</code> </li>         <li>سلاسل بين قوسين: <code>"string value"</code> أو <code>'string value'</code> </li>         <li>قيم ثنائية: <code>true</code> أو <code>false</code> </li>         <li>أرقام: <code>11</code> أو <code>1.1</code> </li>         <li>إشارة بناء الجملة بنقطة إلى بيانات الحدث: <code>event.someDataVariableName</code> </li>       </ul>
</td>
  </tr>
</table>

## معالجة أحداث متعددة <a name="handling-multiple-events"></a>

يمكنك الاستماع إلى أحداث متعددة في عنصر من خلال فصل الأحداث بفاصلة منقوطة `;`.

مثال: `on="submit-success:lightbox1;submit-error:lightbox2"`

## إجراءات متعددة لحدث واحد <a name="multiple-actions-for-one-event"></a>

يمكنك تنفيذ الإجراءات بتسلسل للحدث نفسه من خلال فصل الإجراءات بفاصلة "،".

مثال: `on="tap:target1.actionA,target2.actionB"`

## الأحداث والإجراءات المحددة عالميًا <a name="globally-defined-events-and-actions"></a>

يحدد AMP حدث `tap` عالميًا بحيث يمكنك الاستماع إلى أحد عناصر HTML (بما في ذلك عناصر AMP).

كما أن AMP يحدد أيضًا إجراءات `hide`، و`show` و`toggleVisibility` عالميًا التي يمكنك تشغيلها في أي عنصر HTML.

[tip type="note"]

يمكن إظهار عنصر إذا كان مخفيًا مسبقًا عن طريق الإجراء `hide` أو `toggleVisibility` أو من خلال استخدام سمة [`مخفية`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden). حيث إن إجراء `show` لا يدعم العناصر المخفية عن طريق CSS `display:none` أو `layout=nodisplay` الخاصة بـ AMP.

على سبيل المثال، ما يلي ممكن في AMP:

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## أحداث محددة بالعنصر <a name="element-specific-events"></a><a name="element-specific-events"></a>

### \* - كل العناصر <a name="---all-elements"></a>

<table>
  <tr>
    <th>الحدث</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>التشغيل عند النقر فوق/الضغط على العنصر</td>
  </tr>
</table>

### عناصر الإدخال <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">الحدث</th>
    <th width="30%">الوصف</th>
    <th width="40%">العناصر</th>
    <th>البيانات</th>
  </tr>
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">التشغيل عند تغيير قيمة العنصر وتنفيذها.       <p>       وتعكس خصائص البيانات تلك الأشياء في <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> و<a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>.</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value<br>event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value</pre>
    </td>
  </tr>
  <tr>
    <td><code>input-debounced</code></td>
    <td>التشغيل عند تغيير قيمة العنصر. وهذا مماثل لحدث <code>change</code> القياسي، لكنه يقوم بعملية التشغيل فقط عند مرور 300 مللي ثانية بعد توقف تغيير قيمة الإدخال.</td>
    <td>العناصر التي تشغِّل حدث <code>input</code>.</td>
    <td>مماثل لبيانات حدث <code>change</code>.</td>
  </tr>
  <tr>
    <td><code>input-throttled</code></td>
    <td>التشغيل عند تغيير قيمة العنصر. وهذا مماثل لحدث <code>change</code> القياسي، لكن تتم عملية التقييد من أجل التشغيل مرة واحدة على الأكثر كل 300 مللي ثانية أثناء تغيير قيمة الإدخال.</td>
    <td>العناصر التي تشغِّل حدث <code>input</code>.</td>
    <td>مماثل لبيانات حدث <code>change</code>.</td>
  </tr>
</table>

### amp-accordion > قسم <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">الحدث</th>
    <th width="35%">الوصف</th>
    <th width="40%">البيانات</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>التشغيل عن تمديد قسم الأكوروديون.</td>
    <td>لا يوجد.</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>التشغيل عند طي قسم الأكوروديون.</td>
    <td>لا يوجد.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th width="25%">الحدث</th>
    <th width="35%">الوصف</th>
    <th width="40%">البيانات</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>التشغيل عند تغيير شريحة المكتبة الحالية.</td>
    <td><pre>// رقم الشريحة.<br>event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">الحدث</th>
    <th width="35%">الوصف</th>
    <th width="40%">البيانات</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>التشغيل عندما يكون lightbox مرئيًا بالكامل.</td>
    <td>لا يوجد</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>التشغيل عدما يكون lightbox مغلقًا بالكامل.</td>
    <td>لا يوجد</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">الحدث</th>
    <th width="35%">الوصف</th>
    <th width="40%">البيانات</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(انخفاض مستوى الثقة)</td>
    <td>التشغيل عند فشل إحضار البيانات.</td>
    <td>لا يوجد</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">الحدث</th>
    <th width="35%">الوصف</th>
    <th width="40%">البيانات</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>التشغيل عند تحديد أو إلغاء تحديد خيار.</td>
    <td><pre>\\ قيمة سمة "الخيار" الخاصة بالعنصر الهدف. الحدث. صفيفة {code0}event.targetOption{/code0}<br> الخاصة بقيم سمة "الخيار" لكل العناصر المحددة. {code2}event.selectedOptions{/code2}</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">الحدث</th>
    <th width="35%">الوصف</th>
    <th width="40%">البيانات</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>التشغيل عندما يكون الشريط الجانبي مفتوح بالكامل بعد انتهاء النقل.</td>
    <td>لا يوجد</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>التشغيل عندما يكون الشريط الجانبي مغلق بالكامل بعد انتهاء النقل.</td>
    <td>لا يوجد</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th width="25%">الحدث</th>
    <th width="35%">الوصف</th>
    <th width="40%">البيانات</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(انخفاض مستوى الثقة)</td>
    <td>التشغيل عند فشل إحضار البيانات.</td>
    <td>لا يوجد</td>
  </tr>
</table>

### النموذج <a name="form"></a>

<table>
  <tr>
    <th width="25%">الحدث</th>
    <th width="35%">الوصف</th>
    <th width="40%">البيانات</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>التشغيل عند إرسال النموذج.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>Fired when the form submission response is success.</td>
    <td><pre>// استجابة JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>التشغيل عند وجود خطأ في استجابة إرسال النموذج.</td>
    <td><pre>// استجابة JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>التشغيل عندما يكون النموذج صالحًا.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>التشغيل عندما يكون النموذج غير صالح.</td>
    <td></td>
  </tr>
</table>

## الإجراءات المحددة بالعنصر <a name="element-specific-actions"></a>

### \* (كل العناصر) <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>إخفاء العنصر الهدف.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>إظهار العنصر الهدف، إذا أصبح     <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">عنصر <code>autofocus</code></a> مرئيًا كنتيجة لذلك، فإنه يكتسب التركيز.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>تبديل رؤية العنص الهدف. إذا أصبح     <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">عنصر <code>autofocus</code></a> مرئيًا كنتيجة لذلك، فإنه يكتسب التركيز.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>تبديل فئة العنصر الهدف. حيث إن <code>force</code> اختياري، وفي حالة التحديد؛ يضمن إضافة الفئة فقط لكن من دون إزالتها في حالة التعيين إلى <code>true</code>، والإزالة فقط من دون إضافة في حالة التعيين إلى <code>false</code>.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>التسبب في إكساب العنصر الهدف للتركيز. لخسارة التركيز <code>focus</code>     على عنصر آخر (عنصر أصل). إننا ننصح بشدة بعدفقدان التركيز على  <code>body</code>/<code>documentElement</code>     لأسباب تتعلق بإمكانية الوصول.</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>تبديل الحالات <code>expanded</code> و<code>collapsed</code> الخاصة بالأقسام <code>amp-accordion</code>. عند الاستدعاء من دون وسيطات، يقوم بتدبيل كل الأقسام القابلة للطي. قم بتشغيل قسم معين من خلال توفير معرِّف القسم: <code>on="tap:myAccordion.toggle(section=</code>
</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>توسيع الأقسام الخاصة بالأكورديون. إذا تم توسيع القسم بالفعل، فسيظل موسعًا. وعندما يتم استدعاؤه بدون وسيطات، فإنه يقوم بتسويع كل أقسام الأكورديون. قم بتشغيل قسم معين من خلال توفير معرِّف القسم: <code>on="tap:myAccordion.expand(section='section-id')"</code>.</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>طي أقسام الأكورديون. إذا كان القسم مطويًا بالفعل، فإنه يظل مطويًا. وعندما يتم استدعاؤه بدون وسيطات، فإنه يقوم بطي كل أقسام الأكورديون. قم بتشغيل قسم معين من خلال توفير معرِّف القسم: <code>on="tap:myAccordion.collapse(section=</code>
</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>تقدم المكتبة إلى فهرس شرائح محدد.</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>فتح lightbox للصورة مع كون الصورة المصدر هي التي أدت إلى تشغيل الإجراء.</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>فتح lightbox.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>إغلاق lightbox.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th width="25%">الحدث</th>
    <th width="35%">الوصف</th>
    <th width="40%">البيانات</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>تحديث مخطط <code>amp-list</code> إلى <code>layout="CONTAINTER"</code> للسماح <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">بتغيير الحجم الديناميكي</a>.</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(انخفاض مستوى الثقة)</td>
    <td>التشغيل عند فشل إحضار البيانات.</td>
    <td>لا يوجد</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>إزالة كل التحديدات من <code>amp-selector</code> محددة.</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>لنقل التحديد إلى أعلى حسب قيمة "دلتا". إذ يتم تعيين قيمة "دلتا" الافتراضية إلى -1. إذا لم يتم تحديد أي خيارات، فإن الحالة المحددة ستصبح قيمة الخيار الأخير.</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>لنقل التحديد إلى أسفل حسب قيمة "دلتا". إذ يتم تعيين قيمة "دلتا" الافتراضية إلى 1. إذا لم يتم تحديد أي خيارات، فإن الحالة المحددة ستصبح قيمة الخيار الأخير.</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>تبديل التطبيق الخاص "بالمحدد". إذا كانت سمة التحديد غير موجودة، فإن هذا الإجراء يضيفها. وإذا كانت سمة التحديد موجودة، فإن هذا الإجراء يزيلها. ويمكنك فرض إضافة أو إزالة والاحتفاظ بها عن طريق تضمين قيمة منطقية في وسيطة "القيمة". وستفرض قيمة "صحيح" إضافة السمة "المحددة" وعدم إزالتها إذا كانت موجودة بالفعل. وستؤدي القيمة "خطأ" إلى إزالة السمة، ولكن لن تضيفها في حالة عدم وجودها.</td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>فتح الشريط الجانبي.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>إغلاق الشريط الجانبي.</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>تبديل حالة الشريط الجانبي.</td>
  </tr>
</table>

### النموذج <a name="form-1"></a>

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>إزالة كل القيم في إدخالات النموذج.</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>إرسال النموذج.</td>
  </tr>
</table>

## الأهداف الخاصة <a name="special-targets"></a>

فيما يلي أهداف يوفرها نظام AMP لها متطلبات خاصة:

### الهدف: AMP <a name="target-amp"></a>

يتم توفير هدف `AMP` عن طريق وقت تشغيل AMP وإجراءات تنفيذ عالية المستوى من شأنها تطبيق المستند بأكمله.

<table>
  <tr>
    <th width="40%">الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>يتطلب <a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>.</p>
      <p>دمج ثابت كائن في الحالة القابلة للربط.</p>
      <p></p>
    </td>
  </tr>
</table>

<sup>1</sup> عند الاستخدام مع <a href="#multiple-actions-for-one-event">إجراءات متعددة</a>، ستنتظر الإجراءات اللاحقة حتى يكتمل <code>setState()</code> قبل الاستدعاء. يُسمح فقط باستخدام <code>setState()</code> واحد لكل حدث.
