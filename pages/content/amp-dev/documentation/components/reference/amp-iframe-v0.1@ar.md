---
$title: amp-iframe
$category@: layout
formats:
  - websites
teaser:
  text: Displays an iframe.
---


<!--
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



يعرض هذا المكوِّن إطار iframe.

[جدول المحتويات]

<table>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
    <td>fill وfixed وfixed-height وflex-item وintrinsic وnodisplay وresponsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>أمثلة</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-iframe/">مثال توضيحي لترميز amp-iframe</a></td>
  </tr>
</table>

# السلوك <a name="behavior"></a>

يتميز المكوِّن `amp-iframe` بعدة اختلافات مهمة عن إطارات vanilla iframe المصممة لزيادة الأمان وتجنب ملفات AMP التي يسيطر عليها إطار iframe واحد:

* قد لا يظهر `amp-iframe` بالقرب من أعلى المستند (باستثناء إطارات iframe التي تستخدم `placeholder` كما هو موضح [أدناه](#iframe-with-placeholder)). يجب أن يقع iframe على بعد 600 بكسل من الأعلى أو ألا يقع ضمن 75٪ الأولى من إطار العرض عند التمرير إلى الأعلى، أيهما أقل.
* تتم إضافة إطار amp-iframe تلقائيًا إلى وضع الحماية (راجِع [التفاصيل](#sandbox)).
* يجب على `amp-iframe` طلب الموارد فقط عبر HTTPS أو من data-URI أو عبر السمة `srcdoc`.
* يجب ألا يكون `amp-iframe` في نفس الأصل الذي تقع فيه الحاوية إلا في حال عدم السماح بسياسة `allow-same-origin` في السمة `sandbox`. راجِع مستند ["سياسة أصل إطارات Iframe"](https://github.com/ampproject/amphtml/blob/main/spec/amp-iframe-origin-policy.md) للحصول على مزيد من التفاصيل عن الأصول المسموح بها في iframe.

*مثال: تضمين إحدى "خرائط Google" في amp-iframe*

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAyAS599A2GGPKTmtNr9CptD61LE4gN6oQ&q=iceland">
</amp-iframe>
```

يتم عرضها كما يلي:

<amp-iframe width="200" height="100" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&amp;q=iceland" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0">
</amp-iframe>

[tip type="success"]
يمكنك الاطّلاع على مزيد من العروض التوضيحية للمكوِّن `amp-iframe` عند الانتقال إلى الموقع [AMP بالمثال](https://ampbyexample.com/components/amp-iframe/).
[/tip]

# استخدام amp-iframe للإعلان <a name="usage-of-amp-iframe-for-advertising"></a>

**يجب عدم** استخدام `amp-iframe` لعرض الإعلانات كغرض أساسي. فلا بأس من استخدام `amp-iframe` لعرض فيديوهات تكون الإعلانات جزءًا منها. قد يتم تنفيذ سياسة AMP هذه بعدم عرض إطارات iframe المعنّية.

يجب أن تستخدم الإعلانات [`amp-ad`](amp-ad.md) بدلاً من ذلك.

في ما يلي أسباب هذه السياسة:

* ينفذ `amp-iframe` وضع الحماية كما يتم تطبيق الوضع أيضًا على إطارات iframe الثانوية. وهو ما يعني احتمال تعطّل الصفحات المقصودة، حتى لو بدا أن الإعلان نفسه يعمل.
* لا يوفر `amp-iframe` أي آلية لتمرير التهيئة إلى iframe.
* لا يحتوي `amp-iframe` على آلية لتغيير حجم إطارات iframe يتم التحكم فيها بالكامل.
* قد لا تكون معلومات إمكانية العرض متاحة للمكّوِن `amp-iframe`.

# السمات <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>تتصرف السمة <code>src</code> بشكل أساسي كما تتصرف في إطار iframe القياسي باستثناء واحد: تتم إضافة الجزء <code>#amp=1</code> إلى عنوان URL حتى تعرف المستندات المصدر أنها مضمنّة في سياق AMP. تتم إضافة هذا الجزء فقط إذا كان عنوان URL الذي تحدده <code>src</code> لا يحتوي أصلاً على هذا الجزء.</td>
  </tr>
  <tr>
    <td width="40%"><strong>srcdoc وframeborder وallowfullscreen وallowpaymentrequest وallowtransparency وreferrerpolicy</strong></td>
    <td>يجب أن تتصرف جميع هذه السمات كما تتصرف في iframe القياسية.
      <br>
      إذا لم يتم تحديد <code>frameborder</code>، سيتم تعيينها افتراضيًا على <code>0</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>sandbox</strong><a name="sandbox"></a></td>
    <td>إطارات iframe التي تم إنشاؤها باستخدام <code>amp-iframe</code> يتم دائمًا تحديد السمة <code>sandbox</code> عليها. تكون القيمة فارغة تلقائيًا، ما يعني أنها "في وضع الحماية بحده الأقصى". يمكن تفعيل إطار iframe بحيث يكون وضع الحماية له أقل وذلك بتعيين قيم <code>sandbox</code>. يُسمح بجميع القيم التي تتيحها المتصفحات. تتيح مثلاً تعيين <code>sandbox="allow-scripts"</code> لإطار iframe بتشغيل جافا سكريبت أو يتيح <code>sandbox="allow-scripts allow-same-origin"</code> لإطار iframe بتشغيل جافا سكريبت وإرسال طلبات غير CORS XHR وقراءة/كتابة ملفات تعريف الارتباط.
    <br><br>
    إذا كنت تضيف إطار iframe إلى مستند لم يتم إنشاؤه تحديدًا مع وضع الحماية في الاعتبار، ستحتاج على الأرجح إلى إضافة <code>allow-scripts allow-same-origin</code> إلى السمة <code>sandbox</code> وقد تحتاج إلى السماح بإمكانات إضافية.
    <br><br>
    لاحظ أيضًا أن وضع الحماية ينطبق على جميع النوافذ المفتوحة من إطار iframe المضاف إليه هذا الوضع. ويشمل هذا النوافذ الجديدة التي تم إنشاؤها بالربط بـ <code>target=_ blank</code> (أضِف <code>allow-popups</code> للسماح بحدوث ذلك). إن إضافة <code>allow-popups-to-escape-sandbox</code> إلى السمة <code>sandbox</code> يجعل تلك النوافذ الجديدة تتصرف مثل النوافذ الجديدة غير المضاف إليها وضع الحماية. وهذا على الأرجح ما تتوقعه وتريده في معظم الوقت. ولسوء الحظ، لا يتيح Chrome إلا <code>allow-popups-to-escape-sandbox</code> من هذه الكتابة.
    <br><br>
    راجِع <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox">مستندات عن MDN</a> للحصول على مزيد من التفاصيل عن السمة sandbox.</td>
  </tr>
  <tr>
    <td width="40%"><strong>السمات المشتركة</strong></td>
    <td>يتضمن هذا العنصر <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">السمات المشتركة</a> التي تشمل مكونات AMP.</td>
  </tr>
</table>


# إطار iframe له عنصر نائب <a name="iframe-with-placeholder"></a>

من الممكن ظهور `amp-iframe` في الجزء العلوي من المستند عندما يحتوي `amp-iframe` على عنصر `placeholder` كما هو موضح في المثال أدناه.

* يجب أن يحتوي `amp-iframe` على عنصر به السمة `placeholder`، (مثل عنصر `amp-img`) والذي سيتم عرضه كعنصر نائب إلى أن يصبح إطار iframe جاهزًا للعرض.
* يمكن التعرّف على جاهزية إطار iframe من خلال `onload` للإطار أو من خلال الرسالة `embed-ready` `postMessage` التي سيتم إرسالها من مستند الإطار، أيهما يحدث أولاً.

*مثال: إطار iframe له عنصر نائب*

```html
<amp-iframe width=300 height=300
   layout="responsive"
   sandbox="allow-scripts allow-same-origin"
   src="https://foo.com/iframe">
 <amp-img layout="fill" src="https://foo.com/foo.png" placeholder></amp-img>
</amp-iframe>
```

*مثال: طلب تضمين إطار iframe جاهز*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-ready'
}, '*');
```

# تغيير حجم الإطار iframe <a name="iframe-resizing"></a>

يجب أن يكون للمكوِّن `amp-iframe` تنسيق ثابت محدد كما هو الحال مع أي عنصر AMP آخر. ومع ذلك، من الممكن تغيير حجم `amp-iframe` عند وقت التشغيل. لإجراء ذلك:

1 يجب تعريف `amp-iframe` بالسمة `resizable`.
1 يجب أن يحتوي `amp-iframe` على عنصر `overflow` ثانوي.
1 يجب أن يعيّن `amp-iframe` سمة وضع الحماية `allow-same-origin`.
1 يجب أن يرسل مستند iframe طلب `embed-size` كرسالة نافذة.
1 سيتم رفض طلب `embed-size` إذا كان ارتفاع الطلب أقل من حد معين (100 بكسل).

لاحظ أن `resizable` يلغي قيمة `scrolling` المُعيّنة على `no`.

*مثال: `amp-iframe` به عنصر `overflow`*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    resizable
    src="https://foo.com/iframe">
  <div overflow tabindex=0 role=button aria-label="Read more">Read more!</div>
</amp-iframe>
```

*مثال: طلب تغيير حجم iframe*

```javascript
window.parent.postMessage({
sentinel: 'amp',
type: 'embed-size',
height: document.body.scrollHeight
}, '*');
```

بعد تلقي هذه الرسالة، يحاول وقت تشغيل AMP تلبية الطلب في أقرب وقت ممكن، ولكنه يأخذ في الاعتبار الموضع الذي يقرأ فيه القارئ حاليًا، سواء كان التمرير مستمرًا وأي عوامل أخرى تتعلق بتجربة المستخدِم أو الأداء. إذا تعذر على وقت التشغيل تلبية طلب تغيير الحجم، سيعرض `amp-iframe` عنصر `overflow`. يؤدي النقر على عنصر `overflow` إلى تغيير حجم `amp-iframe` فورًا لأنه يتم تشغيله بواسطة إجراء مستخدِم.

في ما يلي بعض العوامل التي تؤثر على سرعة تنفيذ تغيير الحجم:

* ما إذا يتم تشغيل تغيير الحجم بواسطة إجراء المستخدِم
* ما إذا يتم طلب تغيير الحجم لإطار iframe نشط حاليًا
* ما إذا يتم طلب تغيير الحجم لإطار iframe أسفل إطار العرض أو أعلاه

# إمكانية عرض إطار iframe <a name="iframe-viewability"></a>

يمكن لإطارات iframe إرسال رسالة `send-intersections` إلى العناصر الرئيسية لبدء تلقي [سجلات تغيّر](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) أنماط IntersectionObserver لتقاطع إطار iframe مع إطار العرض للعنصر الرئيسي.

*ملاحظة: في الأمثلة التالية، نفترض أن النص البرمجي يقع في إطار iframe الذي تم إنشاؤه، حيث `window.parent` هى النافذة العلوية. إذا كان النص البرمجي يقع في إطار iframe مدمج، غيّر `window.parent` إلى نافذة AMP العلوية.*

*مثال: طلب `send-intersections` لإطار iframe*

```javascript
window.parent.postMessage({
sentinel: 'amp',
type: 'send-intersections'
}, '*');
```

يمكن لإطار iframe معالجة رسالة `intersection` من النافذة الرئيسية لتلقي بيانات التقاطع.

*مثال: طلب `send-intersections` لإطار iframe*

```javascript
window.addEventListener('message', function(event) {
  if (event.source != window.parent ||
      event.origin == window.location.origin ||
      !event.data ||
      event.data.sentinel != 'amp' ||
      event.data.type != 'intersection') {
    return;
  }
  event.data.changes.forEach(function (change) {
    console.log(change);
  });
});
```

سيتم إرسال رسالة التقاطع بواسطة العنصر الرئيسي إلى iframe عندما يتحرك iframe داخل إطار العرض أو خارجه (أو يكون مرئيًا بشكل جزئي)، أي عندما يتم تمرير iframe أو تغيير حجمه.

# تتبع/تحليلات iframe <a name="trackinganalytics-iframes"></a>

ننصح بشدة باستخدام المكوِّن [`amp-analytics`](amp-analytics.md) لأغراض التحليل لأنه حل أكثر قوة وفعالية وكمال ويمكنك تهيئته لمجموعة واسعة من موردي التحليلات.

لا تسمح AMP إلا باستخدام إطار iframe واحد لكل صفحة لأغراض التحليل والتتبع. للحفاظ على الموارد، ستتم إزالة إطارات iframe هذه من DOM بعد 5 ثوان من تحميلها، ويعتبر هذا وقتًا كافيًا لإكمال أي عمل مطلوب إنجازه.

يتم تحديد إطارات iframes على أنها إطارات للتتبع/التحليل إذا بدا أنها لا تخدم أي غرض مباشر للمستخدِم كأن تكون غير مرئية أو صغيرة.

# إرشادات: استخدِم مكونات AMP بدلاً من amp-iframe <a name="guideline-use-existing-amp-components-over-amp-iframe"></a>

يجب اعتبار المكوِّن `amp-iframe` عنصرًا احتياطيًا إذا كانت تجربة المستخدِم المطلوبة غير ممكنة بوسائل أخرى في AMP، أي غياب [مكون AMP](../../../documentation/components/index.html) متوفر لحالة الاستخدام. ويرجع هذا إلى تعدد فوائد استخدام مكوِّن AMP مصمم لحالة استخدام معينة مثل:

* تحسين إدارة أفضل الموارد والأداء
* يمكن أن توفر المكونات المخصصة صور عناصر نائبة مضمّنة في بعض الحالات. يعني هذا الحصول مثلاً على الصورة المصغرة الصحيحة للفيديو قبل تحميله كما يقلل من الجهد المبذول في الترميز لإضافة عنصر نائب يدويًا.
* تغيير الحجم المضمَّن وهو ما يعني أن محتوى iframe ذا الحجم غير المتوقع يمكن أن يظهر للمستخدِم في أغلب الأحيان كما لو كان أصليًا في الصفحة، وليس في إطار قابل للتمرير.
* يمكن إنشاء ميزات إضافية أخرى (مثل التشغيل التلقائي لمشغّلات الفيديو).

# التحقق <a name="validation"></a>

اطِّلع على [قواعد amp-iframe](https://github.com/ampproject/amphtml/blob/main/extensions/amp-iframe/validator-amp-iframe.protoascii) في مواصفات مدقق AMP.
