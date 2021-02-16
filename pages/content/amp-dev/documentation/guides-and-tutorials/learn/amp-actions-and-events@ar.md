---
'$title': الإجراءات والأحداث
$order: 0
formats:
  - الموقع الإلكتروني
  - القصص
  - الإعلانات
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

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

[tip type="ملحوظة"] تغطي هذه الوثائق الإجراءات والأحداث الخاصة بمواقع الويب والقصص والإعلانات الخاصة بـ AMP. اقرأ [الإجراءات والأحداث في بريد AMP الإلكتروني](https://github.com/ampproject/amphtml/blob/master/spec/amp-email-actions-and-events.md) لتنسيق البريد الإلكتروني الخاص بـ AMP. [/tip]

يتم استخدام السمة `on` لتثبيت معالجات الحدث في العناصر. إذ تعتمد الأحداث المدعومة على العنصر.

القيمة لبناء الجملة عبارة عن لغة بسيطة محددة بالمجال خاصة بالنموذج:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

راجع الجدول أدناه لتوصيفات كل جزء من بناء الجملة.

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

يمكن إظهار عنصر إذا كان مخفيًا مسبقًا عن طريق الإجراء `hide` أو `toggleVisibility` أو من خلال استخدام سمة [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden). حيث إن إجراء `show` لا يدعم العناصر المخفية عن طريق CSS `display:none` أو `layout=nodisplay` الخاصة بـ AMP.

على سبيل المثال، ما يلي ممكن في AMP:

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## الأحداث المحددة بالعنصر <a name="element-specific-events"></a>

### \* - كل العناصر <a name="---all-elements"></a>

<table>
  <tr>
    <th>الحدث</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>التشغيل عند النقر فوق/الضغط على العنصر.</td>
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
  <!-- change -->
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
  <!-- input-debounced -->
  <tr>
    <td><code>input-debounced</code></td>
    <td>التشغيل عند تغيير قيمة العنصر. وهذا مماثل لحدث <code>change</code> القياسي، لكنه يقوم بعملية التشغيل فقط عند مرور 300 مللي ثانية بعد توقف تغيير قيمة الإدخال.</td>
    <td>العناصر التي تشغِّل حدث <code>input</code>.</td>
    <td>مماثل لبيانات حدث <code>change</code>.</td>
  </tr>
    <!-- input-throttled -->
  <tr>
    <td><code>input-throttled</code></td>
    <td>التشغيل عند تغيير قيمة العنصر. وهذا مماثل لحدث <code>change</code> القياسي، لكن تتم عملية التقييد من أجل التشغيل مرة واحدة على الأكثر كل 100 مللي ثانية أثناء تغيير قيمة الإدخال.</td>
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
    <td>التشغيل عن تمديد قسم أكورديون.</td>
    <td>لا يوجد.</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>التشغيل عند طي قسم أكوروديون.</td>
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
    <td><pre>// Slide number.<br>event.index</pre></td>
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
    <td><code>changeToLayoutContainer</code></td>
    <td>تحديث تخطيط <code>amp-list</code> إلى <code>layout="CONTAINTER"</code> للسماح <a href="https://github.com/ampproject/amphtml/blob/master/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">بتغيير الحجم الديناميكي</a>.</td>
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
    <td><pre>// Target element's "option" attribute value.<br>event.targetOption<br>// Array of "option" attribute values of all selected elements.<br>event.selectedOptions</pre></td>
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

### amp-state <a name="amp-state-1"></a>

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

### amp-video, amp-youtube <a name="amp-video-amp-youtube"></a>

<table>
  <tr>
    <th width="25%">الحدث</th>
    <th width="35%">الوصف</th>
    <th width="40%">البيانات</th>
  </tr>
  <tr>
    <td> <code>firstPlay</code>(منخفض الثقة)</td>
    <td>التشغيل في المرة الأولى التي يتم فيها تشغيل الفيديو. في مقاطع الفيديو التي يتم تشغيلها تلقائيًا، يتم تشغيله بمجرد تفاعل المستخدم مع الفيديو. وهذا الحدث منخفض الثقة مما يعني عدم إمكانية تشغيل معظم الإجراءات؛ يمكن فقط تشغيل الإجراءات منخفضة الثقة مثل إجراءات <code>amp-animation</code>.</td>
    <td></td>
  </tr>
  <tr>
    <td> <code>timeUpdate</code>(منخفضة الثقة)</td>
    <td>التشغيل عند تغيير موضع تشغيل مقطع الفيديو. ويتم التحكم في تردد الحدث بواسطة AMP ويتم ضبطه حاليًا على فترات زمنية تبلغ 1 ثانية. وهذا الحدث منخفض الثقة مما يعني عدم إمكانية تشغيل معظم الإجراءات؛ يمكن فقط تشغيل الإجراءات منخفضة الثقة مثل إجراءات <code>amp-animation</code>.</td>
    <td>يشير <code>{time, percent}</code><code>time</code> إلى الوقت الحالي بالثواني، أما <code>percent</code> عبارة عن رقم بين 0 و1 ويشير إلى الموضع الحالي كنسبة للوقت الإجمالي.</td>
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
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>التشغيل عند وجود خطأ في استجابة إرسال النموذج.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
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
    <td><code>scrollTo(duration=INTEGER, position=STRING)</code></td>
    <td>لتمرير عنصر للعرض باستخدام حركة سلسة. <br><code>duration</code> اختياري. يحدد طول الحركة بالمللي ثانية. إذا لم يتم تحديد ذلك، فسيتم استخدام مبلغ متعلق بفرق التمرير أقل أو يساوي 500 مللي ثانية. <br><code>position</code> اختياري. أحد <code>top</code>، <code>center</code> أو <code>bottom</code> (افتراضي <code>top</code>). لتحديد موضع العنصر بالنسبة إلى منفذ العرض بعد التمرير. <br>كأفضل ممارسة لإمكانية الوصول، قم بإقران هذا باستدعاء <code>focus()</code> للتركيز على العنصر الذي يتم التمرير إليه.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>التسبب في إكساب العنصر الهدف للتركيز. لخسارة التركيز <code>focus</code>     على عنصر آخر (عنصر أصل). إننا ننصح بشدة بعدفقدان التركيز على  <code>body</code>/<code>documentElement</code>     لأسباب تتعلق بإمكانية الوصول.</td>
  </tr>
</table>

### amp-audio <a name="amp-audio"></a>

<table>
  <tr>
    <th width="20%">الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>يشغل الصوت. وهو عبارة عن تعليمة غير فعالة إذا كان العنصر <code>&lt;amp-audio></code> تابعًا لـ <code>&lt;amp-story></code>.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>يوقف الصوت مؤقتًا. وهو عبارة عن تعليمة غير فعالة إذا كان العنصر <code>&lt;amp-audio></code> تابعًا لـ <code>&lt;amp-story></code>.</td>
  </tr>
</table>

### amp-bodymovin-animation <a name="amp-bodymovin-animation"></a>

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>تشغيل الرسوم المتحركة.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>إيقاف تشغيل الرسوم المتحركة مؤقتًا.</td>
  </tr>
  <tr>
    <td><code>stop</code></td>
    <td>إيقاف الرسوم المتحركة.</td>
  </tr>
  <tr>
    <td><code>seekTo(time=INTEGER)</code></td>
    <td>تعيين الوقت الحالي للرسوم المتحركة على القيمة المحددة وإيقاف الرسوم المتحركة مؤقتًا.</td>
  </tr>
  <tr>
    <td><code>seekTo(percent=[0,1])</code></td>
    <td>استخدام قيمة النسبة المئوية المحددة لتحديد الوقت الحالي للرسوم المتحركة إلى القيمة المحددة وإيقاف الحركة مؤقتًا.</td>
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
    <td>تبديل الحالات <code>expanded</code> و<code>collapsed</code> الخاصة بالأقسام <code>amp-accordion</code>. عند الاستدعاء من دون وسيطات، يقوم بتدبيل كل الأقسام القابلة للطي. قم بتشغيل قسم معين من خلال توفير معرِّف القسم: <code>on="tap:myAccordion.toggle(section='section-id')"</code>.</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>توسيع الأقسام الخاصة بالأكورديون. إذا تم توسيع القسم بالفعل، فسيظل موسعًا. وعندما يتم استدعاؤه بدون وسيطات، فإنه يقوم بتوسيع كل أقسام الأكورديون. قم بتشغيل قسم معين من خلال توفير معرِّف القسم: <code>on="tap:myAccordion.expand(section='section-id')"</code>.</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>طي أقسام الأكورديون. إذا كان القسم مطويًا بالفعل، فإنه يظل مطويًا. وعندما يتم استدعاؤه بدون وسيطات، فإنه يقوم بطي كل أقسام الأكورديون. قم بتشغيل قسم معين من خلال توفير معرِّف القسم: <code>on="tap:myAccordion.collapse(section='section-id')"</code>.</td>
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
  <tr>
    <td><code>toggleAutoplay(toggleOn=true|false)</code></td>
    <td>تبديل حالة التشغيل التلقائي للمكتبة. <code>toggleOn</code> اختياري.</td>
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

### amp-lightbox-gallery <a name="amp-lightbox-gallery"></a>

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>open</code></td>
    <td>فتح معرض Lightbox. إذ يمكن تشغيله عن طريق النقر فوق عنصر آخر، إذا قمت بتحديد معرِّف الصورة: `on="tap:amp-lightbox-gallery.open(id='image-id')"`.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>تحديث البيانات من <code>src</code> وإعادة عرض القائمة.</td>
  </tr>
</table>

### amp-live-list <a name="amp-live-list"></a>

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>update (default)</code></td>
    <td>تحديث عناصر DOM لعرض المحتوى المحدَّث.</td>
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
    <td>لنقل التحديد إلى أسفل حسب قيمة "دلتا". إذ يتم تعيين قيمة "دلتا" الافتراضية إلى 1. إذا لم يتم تحديد أي خيارات، فإن الحالة المحددة ستصبح قيمة الخيار الأول.</td>
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

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>تحديث البيانات عند السمة `src` أثناء تجاهل ذاكرة التخزين المؤقت للمتصفح.</td>
  </tr>
</table>

### amp-user-notification <a name="amp-user-notification"></a>

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>dismiss (default)</code></td>
    <td>إخفاء عنصر إشعار المستخدم المشار إليه.</td>
  </tr>
</table>

### عناصر الفيديو <a name="video-elements"></a>

يتم دعم الإجراءات أدناه في عناصر فيديو AMP التالية: `amp-video`، `amp-youtube`، `amp-3q-player`، `amp-brid-player`، `amp-dailymotion`، `amp-delight-player`، `amp-ima-video`.

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>تشغيل الفيديو.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>إيقاف تشغيل الفيديو مؤقتًا.</td>
  </tr>
  <tr>
    <td><code>mute</code></td>
    <td>كتم صوت الفيديو.</td>
  </tr>
  <tr>
    <td><code>unmute</code></td>
    <td>إلغاء كتم صوت الفيديو.</td>
  </tr>
  <tr>
    <td><code>fullscreencenter</code></td>
    <td>تشغيل الفيديو في وضع ملء الشاشة.</td>
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
    <td><code>navigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>نقل النافذة الحالية إلى عنوان URL محدد، وذلك إلى الهدف المحدد الاختياري إذا تم توفيره (حاليًا يدعم <code>_top</code> و<code>_blank </code> فقط). ويمكن تحديد معلمة <code>opener</code> الاختيارية باستخدام هدف <code>_blank</code> للسماح للصفحات المفتوحة حديثًا بالوصول إلى <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/opener"><code>window.opener<code></code></code></a>. يدعم <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md">استبدالات URL القياسية</a>.</p>
      <p><strong>تحذير:</strong> يوصى باستخدام روابط <code><a></code> العادية حيثما كان ذلك ممكنًا نظرًا لأن <code>AMP.navigateTo{/ code2} لا تتعرف عليها برامج زحف الويب.</code></p>
    </td>
  </tr>
  <tr>
    <td><code>closeOrNavigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>محاولة إغلاق النافذة إذا كان مسموحًا، وخلاف ذلك يقوم بنقل المماثل إلى الإجراء <code>navigateTo</code>. مفيد لحالات الاستخدام حيث قد يحتاج زر "رجوع" إلى إغلاق النافذة إذا تم فتحه في نافذة جديدة من الصفحة السابقة أو التنقل إذا لم يتم فتحه.</p>
      <p><strong>تحذير:</strong> يوصى باستخدام روابط <code><a></code> العادية حيثما كان ذلك ممكنًا نظرًا لأن <code>AMP.closeOrNavigateTo</code> لم تتعرف عليها برامج زحف الويب.</p>
    </td>
  </tr>
  <tr>
    <td><code>goBack</code></td>
    <td>التنقل رجوعًا في السجل.</td>
  </tr>
  <tr>
    <td><code>print</code></td>
    <td>فتح مربع حوار الطباعة من أجل طباعة الصفحة الحالية.</td>
  </tr>
  <tr>
    <td>scrollTo(id=STRING, duration=INTEGER, position=STRING)</td>
    <td>للتمرير إلى معرف العنصر المقدم في الصفحة الحالية.</td>
  </tr>
  <tr>
    <td>optoutOfCid</td>
    <td>رفض إنشاء معرِّف العميل لجميع النطاقات.</td>
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
  <tr>
    <td>
<code>pushState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>يتطلب <a href="https://amp.dev/documentation/components/amp-bind.html#modifying-history-with-amppushstate">amp-bind</a>.</p>
      <p>دمج ثابت كائن في الحالة القابلة للربط ودفع إدخال جديد إلى مكدس سجل المتصفح. وسيؤدي عرض الإدخال إلى استعادة القيم السابقة للمتغيرات (في هذا المثال، <code>foo</code>).</p>
</td>
  </tr>
</table>

<sup>1</sup>عند الاستخدام مع <a href="#multiple-actions-for-one-event">إجراءات متعددة</a>، ستنتظر الإجراءات اللاحقة حتى اكتمال <code>setState()</code> أو <code>pushState()</code> قبل الطلب. ويسمح فقط بـ <code>setState()</code> أو <code>pushState()</code> لكل حدث.

### Target: amp-access <a name="target-amp-access"></a>

يتم توفير الهدف `amp-access` عن طريق المكون [amp-access](https://amp.dev/documentation/components/amp-access.html).

يكون الهدف `amp-access` خاصًا للأسباب التالية:

1. لا يمكنك تقديم معرِّف عشوائي لهذا الهدف. فالهدف دائمًا `amp-access`.
2. تعتمد الإجراءات لـ `amp-access` ديناميكيًا على [تكوين وصول AMP](https://amp.dev/documentation/components/amp-access#configuration).

راجع [التفاصيل](https://amp.dev/documentation/components/amp-access#login-link) حول استخدام الهدف `amp-access`.
