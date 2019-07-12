---
$category@: dynamic-content
formats:
  - websites
  - email
  - ads
teaser:
  text: >-
    Allows elements to mutate in response to user actions or data changes via
    data binding and simple JS-like expressions.
---

# amp-bind

يضيف المكوِّن تفاعلاً مخصصًا باستخدام ربط البيانات والتعبيرات.


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

[جدول المحتويات]

<table>
  <tr>
    <td class="col-fourty"><strong>النص البرمجي المطلوب</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>أمثلة</strong></td>
    <td>
      <ul>
        <li><a href="https://ampbyexample.com/components/amp-bind/">مثال تمهيدي للترميز مع التعليقات التوضيحية</a></li>
        <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">مثال لمنصّات عرض بصور متغيّرة ومرتبطة مع التعليقات التوضيحية</a></li>
        <li><a href="https://ampbyexample.com/samples_templates/product/">مثال لصفحة منتج في التجارة الإلكترونية مع التعليقات التوضيحية</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>البرامج التعليمية</strong></td>
    <td><a href="https://www.ampproject.org/docs/tutorials/interactivity">إنشاء صفحات AMP التفاعلية</a></td>
  </tr>
</table>

# نظرة عامة

يتيح لك المكوِّن `amp-bind` إضافة تفاعل ذي حالة مخصصة إلى صفحات AMP من خلال ربط البيانات والتعبيرات المشابهة لجافا سكريبت.

<figure class="alignment-wrapper  margin-">
<amp-youtube width="480" height="270" data-videoid="xzCFU8b5fCU" layout="responsive"></amp-youtube>
<figcaption>شاهِد هذا الفيديو للحصول على مقدمة عن amp-bind.</figcaption></figure>

# مثال بسيط

في المثال التالي، يؤدي النقر على الزر إلى تغيير نص العنصر `&lt;p&gt;` من "Hello World" إلى "Hello amp-bind".

```html
<p [text]="'Hello ' + foo">Hello World</p>

<button on="tap:AMP.setState({foo: 'amp-bind'})">Say "Hello amp-bind"</button>
```

[tip type="note"]
لا يعمل "amp-bind" على تقييم التعبيرات عند تحميل الصفحة وذلك للحفاظ على الأداء ولتجنب خطر التخطي غير المتوقع للمحتوى. ويعني هذا أنه يجب إعطاء حالة تلقائية للعناصر المرئية وعدم الاعتماد على "amp-bind" للعرض الأولي.
[/tip]

### كيف يعمل؟

يحتوي "amp-bind" على ثلاثة مكونات رئيسية:

1. [State](#state): حالة JSON قابلة للتحويل على نطاق المستند. في المثال أعلاه، الحالة فارغة قبل النقر على الزر.  أما بعد النقر، تصبح الحالة `{foo: 'amp-bind'}`.
2. [Expressions](#expressions): هذه تعبيرات تشبيه جافا سكريبت وتشير إلى **state**. يحتوي المثال أعلاه على تعبير واحد هو `'Hello ' + foo` والذي يربط السلسلة الحرفية `'Hello '` مع متغير الحالة `foo`.
يمكن استخدام ما يصل إلى 100 معامل كحد أقصى في التعبير.
3. [Bindings](#bindings): هذه سمات خاصة لخاصية `[property]` النموذج التي تربط خاصية العنصر بالتعبير **expression**. يحتوي المثال أعلاه على ربط واحد هو `[text]` والذي يعدّل نص العنصر `` كلما تغيرت قيمة التعبير.

يحتاج `amp-bind` إلى عناية خاصة لضمان السرعة والأمان وجودة الأداء على صفحات AMP.

### مثال أكثر تعقيدًا

```html
<!-- Store complex nested JSON data in <amp-state> elements. -->
<amp-state id="myAnimals">
  <script type="application/json">
    {
      "dog": {
        "imageUrl": "/img/dog.jpg",
        "style": "greenBackground"
      },
      "cat": {
        "imageUrl": "/img/cat.jpg",
        "style": "redBackground"
      }
    }
  </script>
</amp-state>

<p [text]="'This is a ' + currentAnimal + '.'">This is a dog.</p>

<!-- CSS classes can also be added or removed with [class]. -->
<p class="greenBackground" [class]="myAnimals[currentAnimal].style">
  Each animal has a different background color.
</p>

<!-- Or change an image's src with the [src] binding. -->
<amp-img width="300" height="200" src="/img/dog.jpg"
    [src]="myAnimals[currentAnimal].imageUrl">
</amp-img>

<button on="tap:AMP.setState({currentAnimal: 'cat'})">Set to Cat</button>
```

عند الضغط على الزر:

1. يتم تعديل **الحالة** بـ `currentAnimal` الذي يتم تحديده على أنه `'cat'`.
2. يتم تقييم **التعبيرات** التي تعتمد على الحالة `currentAnimal`:

    * `'This is a ' + currentAnimal + '.'` =&gt; `'This is a cat.'`
    * `myAnimals[currentAnimal].style` =&gt; `'redBackground'`
    * `myAnimals[currentAnimal].imageUrl` =&gt;  `/img/cat.jpg`</li>

3. يتم تعديل **عمليات الربط** التي تعتمد على التعبيرات التي تم تغييرها:
    * نص عنصر `<p>` الأول سيصبح "This is a cat."
    * السمة `class` للعنصر `<p>` الثاني ستصبح "redBackground".
    * العنصر `amp-img` سيعرض صورة قطة.</li>

[tip type="success"]
[شاهِد **العرض التوضيحي المباشر**](https://ampbyexample.com/components/amp-bind/) لهذا المثال مع تعليقات توضيحية للترميز.
[/tip]

# التفاصيل

# الحالة

كل مستند AMP يستخدم `amp-bind` له بيانات JSON أو **حالة** قابلة للتحويل على نطاق المستند.

# إعداد الحالة باستخدام `amp-state`

يمكن إعداد حالة `amp-bind` باستخدام المكوِّن `amp-state`:

```html
<amp-state id="myState">
  <script type="application/json">
    {
      "foo": "bar"
    }
  </script>
</amp-state>
```

يمكن أن تشير [التعبيرات](#expressions) إلى متغيرات الحالة عبر بنية النقاط. في هذا المثال، سيتم تقييم `myState.foo` إلى `"bar"`.

* الحد الأقصى لحجم JSON للعنصر الثانوي للعنصر `<amp-state>` هو 100 كيلوبايت.
* يمكن للعنصر `<amp-state>` أيضًا تحديد عنوان CORS URL بدلاً من نص برمجي لعنصر JSON الثانوي. يمكن مراجعة [الملحق](#amp-state-specification) للحصول على التفاصيل.

# إعادة تحميل الحالة

يتيح هذ المكوِّن الإجراء `refresh` الذي يمكن استخدامه لإعادة تحميل محتوى الحالة.

```html
<amp-state id="amp-state" ...></amp-state>
<!-- Clicking the button will refresh and refetch the json in amp-state. -->
<button on="tap:amp-state.refresh"></button>
```

# تعديل الحالة باستخدام `AMP.setState()`

يُدمِج الإجراء [`AMP.setState()`](../../spec/amp-actions-and-ents.md#amp) كائنًا حرفيًا في الحالة. عند الضغط على الزر أدناه مثلاً، سيعمل `AMP.setState()` على [الدمج العميق](#deep-merge-with-ampsetstate) للكائن الحرفي مع الحالة.

```html
<!-- Like JavaScript, you can reference existing
     variables in the values of the  object literal. -->
<button on="tap:AMP.setState({foo: 'bar', baz: myAmpState.someVariable})"></button>
```

بشكل عام، سيتم دمج الكائنات المدمجة بحد أقصى للعمق يساوي 10. يمكن إلغاء كل المتغيرات، بما في ذلك المتغيرات التي قدمها `amp-state`.

عند تشغيل الإجراء `AMP.setState()` بواسطة أحداث معينة، يمكنه أيضًا الوصول إلى البيانات المتعلقة بالأحداث في الخاصية `event`.

```html
<!-- The "change" event of this <input> element contains
     a "value" variable that can be referenced via "event.value". -->
<input type="range" on="change:AMP.setState({myRangeValue: event.value})">
```

# تعديل السجلّ باستخدام `AMP.pushState()`

يشبه الإجراء [`AMP.pushState()`](../../spec/amp-actions-and-ents.md#amp) الإجراء `AMP.setState()` إلا أنه يدفع إدخالاً جديدًا في حِزم سجلّ التصفُّح. يؤدي دفع إدخال السجلّ هذا (بالانتقال إلى الخلف مثلاً) إلى استعادة القيمة السابقة للمتغيرات التي عينها `AMP.pushState()`.

على سبيل المثال:
```html
<button on="tap:AMP.pushState({foo: '123'})">Set 'foo' to 123</button>
```

* سيؤدي النقر على الزر إلى تعيين المتغير `foo` على 123 ودفع إدخال سجلّ جديد.
* سيؤدي الانتقال إلى الخلف إلى استعادة `foo` قيمتها السابقة وهي "bar" (أي ما يعادل استدعاء `AMP.setState({foo: 'bar'})`.

# التعبيرات

التعبيرات تشبه جافا سكريبت مع بعض الاختلافات المهمة.

# الاختلافات التي تميّزها عن جافا سكريبت

* قد تصل التعبيرات فقط إلى [حالة](#state) المستند الحاوية.
* **ليست** للتعبيرات إمكانية الوصول إلى المتغيرات العمومية مثل `window` أو `document`.
* لا يمكن استخدام سوى [الدالات المدرجة في القائمة البيضاء](#white-listed-functions) وعوامل التشغيل.
* غير مسموح عمومًا بالدالات والفئات والحلقات المخصصة. يُسمح بالدالات السهمية كمعلَمات، مثل `Array.prototype.map`.
* المتغيرات غير المحددة وarray-index-out-of-bound تعرض `null` بدلاً من `undefined` أو إظهار الأخطاء.
* للتعبير الواحد حاليًا حد قيمته 50 معاملًا بغرض جودة الأداء. يرجى [الاتصال بنا](https://github.com/ampproject/amphtml/issues/new) إذا لم يكن هذا كافيًا لحالة الاستخدام لديك.

يمكن العثور على القواعد الكاملة للتعبيرات وتنفيذها في [bind-expr-impl.jison](./0.1/bind-expr-impl.jison) و[bind-expression.js](./0.1/bind-expression.js).

# أمثلة

جميع ما يلي تعبيرات صالحة:

```javascript
1 + '1'           // 11
1 + (+'1')        // 2
!0                // true
null || 'default' // 'default'
```

# الدالات المدرجة في القائمة البيضاء

<table>
  <tr>
    <th>نوع الكائن </th>
    <th>الدالات</th>
    <th>مثال</th>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods"><code>Array</code></a><sup>1</sup></td>
    <td class="col-thirty">
      <code>concat</code><br>
      <code>filter</code><br>
      <code>includes</code><br>
      <code>indexOf</code><br>
      <code>join</code><br>
      <code>lastIndexOf</code><br>
      <code>map</code><br>
      <code>reduce</code><br>
      <code>slice</code><br>
      <code>some</code><br>
      <code>sort</code> (not-in-place)<br>
      <code>splice</code> (not-in-place)<br>
    </td>
    <td>
      <pre>// Returns [1, 2, 3].
        [3, 2, 1].sort()</pre>
        <pre>// Returns [1, 3, 5].
          [1, 2, 3].map((x, i) =&gt; x + i)</pre>
          <pre>// Returns 6.
            [1, 2, 3].reduce((x, y) =&gt; x + y)</pre>
          </td>
        </tr>
        <tr>
          <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Methods"><code>Number</code></a></td>
          <td>
            <code>toExponential</code><br>
            <code>toFixed</code><br>
            <code>toPrecision</code><br>
            <code>toString</code>
            |
            <pre>// Returns 3.
              (3.14).toFixed()</pre>
              <pre>// Returns '3.14'.
                (3.14).toString()</pre>
              </td>
            </tr>
            <tr>
              <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods"><code>String</code></a></td>
              <td>
                <code>charAt</code><br>
                <code>charCodeAt</code><br>
                <code>concat</code><br>
                <code>indexOf</code><br>
                <code>lastIndexOf</code><br>
                <code>slice</code><br>
                <code>split</code><br>
                <code>substr</code><br>
                <code>substring</code><br>
                <code>toLowerCase</code><br>
                <code>toUpperCase</code></td>
                <td>
                  <pre>// Returns 'abcdef'.
                    abc'.concat('def')</pre>
                  </td>
                </tr>
                <tr>
                  <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math"><code>Math</code></a><sup>2</sup></td>
                  <td>
                    <code>abs</code><br>
                    <code>ceil</code><br>
                    <code>floor</code><br>
                    <code>max</code><br>
                    <code>min</code><br>
                    <code>random</code><br>
                    <code>round</code><br>
                    <code>sign</code></td>
                    <td>
                      <pre>// Returns 1.
                        abs(-1)</pre>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>Object</code></a><sup>2</sup></td>
                      <td>
                        <code>keys</code><br>
                        <code>values</code>
                        |
                        <pre>// Returns ['a', 'b'].
                          keys({a: 1, b: 2})</pre>
                          <pre>// Returns [1, 2].
                            values({a: 1, b: 2}</pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects"><code>Global</code></a><sup>2</sup>
                          </td>
                          <td>
                            <code>encodeURI</code><br>
                            <code>encodeURIComponent</code>
                          </td>
                          <td>
                            <pre>// Returns 'Hello%20world'.
                              encodeURIComponent('Hello world')</pre>
                            </td>
                          </tr>
                        </table>


<sup>1</sup>لا يمكن أن تحتوي الدالات السهمية ذات المعلَمة الفردية على أقواس، استخدِم مثلاً `x => x + 1` بدلاً من `(x) => x + 1`. وتعرض أيضًا `sort()` و`splice()` نسخًا معدّلة بدلاً العمل في مكانها.

<sup>2</sup>الدالات الثابتة لا تستخدم كمساحات أسماء، استخدِم مثلاً `abs(-1)` بدلاً من `Math.abs(-1)`.

# تحديد وحدات الماكرو باستخدام `amp-bind-macro`

يمكن إعادة استخدام أجزاء التعبير `amp-bind` من خلال تحديد `amp-bind-macro`. يتيح لك العنصر `amp-bind-macro` تحديد تعبير يأخذ وسيطات صفرية أو أكثر ويشير إلى الحالة الحالية. يمكن استدعاء وحدة ماكرو كدالة من خلال الإشارة إلى قيمة سمتها `id` من أي مكان في المستند.

```html
<amp-bind-macro id="circleArea" arguments="radius" expression="3.14 * radius * radius"></amp-bind-macro>

<div>
  The circle has an area of <span [text]="circleArea(myCircle.radius)">0</span>.
</div>
```

يمكن لوحدة الماكرو أيضًا استدعاء وحدات ماكرو أخرى <i>يكون قد تم تحديدها قبلها</i>. لا يمكن لوحدة الماكرو استدعاء نفسها بشكل متكرر.

# عمليات الربط

**الربط** سمة خاصة للخاصية `[property]` للنموذج تربط خاصية العنصر بأحد [التعبيرات](#expressions). ويمكن أيضًا استخدام بنية متوافقة مع XML في شكل `data-amp-bind-property`.

عندما تتغير **الحالة**، يتم إعادة تقييم التعبيرات ويتم تعديل خصائص العناصر المرتبطة بنتائج التعبيرات الجديدة.

يتيح `amp-bind` روابط البيانات في أربعة أنواع من حالة العنصر:

<table>
  <tr>
    <th>النوع</th>
    <th>السمات</th>
    <th>التفاصيل</th>
  </tr>
  <tr>
    <td class="col-thirty"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent"><code>Node.textContent</code></a></td>
    <td class="col-thirty"><code>[text]</code></td>
    <td>سمة متاحة في معظم العناصر النصية.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class">فئات CSS</a></td>
    <td><code>[class]</code></td>
    <td>يجب أن تكون نتيجة التعبير سلسلة محددة بمسافة.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden">السمة <code>hidden</code></a></td>
    <td><code>[hidden]</code></td>
    <td>يجب أن تكون تعبيرًا منطقيًا.</td>
  </tr>
  <tr>
    <td>حجم <a href="https://www.ampproject.org/docs/reference/components">عناصر AMP</a></td>
    <td><code>[width]</code><br><code>[height]</code></td>
    <td>تغيّر عرض و/أو ارتفاع عنصر AMP.</td>
  </tr>
  <tr>
    <td>السمات الخاصة بالعناصر</td>
    <td><a href="#element-specific-attributes">متنوعة</a></td>
    <td></td>
  </tr>
</table>


ملاحظات عن عمليات الربط:

* إن الربط بـ `innerHTML` غير مسموح به لأسباب تتعلق بالأمان.
* يتم تصحيح جميع عمليات ربط السمات من القيم غير الآمنة (مثل `javascript:)`.
* يؤدي التعبير المنطقي إلى تبديل السمات المنطقية على سبيل المثال: `<amp-video [controls]="expr"...>`. عندما يتم تقييم `expr` إلى `true`، يحتوي العنصر `<amp-video>` على السمة `controls`. عند تقييم `expr` إلى `false`، تتم إزالة السمة `controls`.
* يمكن أن تكون أحرف الأقواس `[` and `]` في أسماء السمات مشكلة عند كتابة XML (مثل XHTML وJSX) أو كتابة السمات عبر واجهات برمجة التطبيقات DOM. في هذه الحالات، استخدِم البنية البديلة `data-amp-bind-x="foo"` بدلاً من `[x]="foo"`.

# السمات الخاصة بالعناصر

يُسمح فقط بالربط مع المكونات والسمات التالية:

<table>
  <tr>
    <th>المكوِّن</th>
    <th>السمات</th>
    <th>السلوك</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>&lt;amp-brightcove&gt;</code></td>
    <td class="col-fourty"><code>[data-account]</code><br><code>[data-embed]</code><br><code>[data-player]</code><br><code>[data-player-id]</code><br><code>[data-playlist-id]</code><br><code>[data-video-id]</code></td>
    <td class="col-thirty">يغيّر فيديو Brightcove المعروض.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-carousel type=slides&gt;</code></td>
    <td><code>[slide]</code>*<sup>*</sup></td>
    <td>يغيّر فهرس الشريحة المعروض حاليًا. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">اطّلِع على مثال</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-date-picker&gt;</code></td>
    <td>
      <code>[min]</code><br>
      <code>[max]</code>
    </td>
    <td>
      يعيّن أقرب تاريخ يمكن اختياره.<br>
      يعيّن أبعد تاريخ يمكن اختياره.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-google-document-embed&gt;</code></td>
    <td><code>[src]</code><br><code>[title]</code></td>
    <td>يعرض المستند على عنوان URL المُعدَل.<br>يغيّر عنوان المستند.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-iframe&gt;</code></td>
    <td><code>[src]</code></td>
    <td>يغيّر عنوان URL لمصدر إطار iframe.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-img&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[src]</code><br><code>[srcset]</code></td>
    <td>عند الربط بـ <code>[src]</code>، احرص أيضًا على الربط بـ <code>[srcset]</code> لجعل الربط يعمل على ذاكرة التخزين المؤقت.<br>اطّلِع على <a href="https://www.ampproject.org/docs/reference/components/media/amp-img#attributes">سمات amp-img</a> المقابلة.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-lightbox&gt;</code></td>
    <td><code>[open]</code><sup>*</sup>*</td>
    <td>
      يبدّل العرض المبسط. نصيحة: استخدِم <code>on="lightboxClose: AMP.setState(...)"</code> لتعديل المتغيرات عند غلق العرض المبسط.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-list&gt;</code></td>
    <td><code>[src]</code></td>
    <td>
      إذا كان التعبير عبارة عن سلسلة، يجلب المكَوِن JSON ويعرضه من عنوان URL للسلسلة. إذا كان التعبير كائنًا أو مصفوفة، سيعرض بيانات التعبير.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-selector&gt;</code></td>
    <td><code>[selected]</code>*<sup>*</sup><br><code>[disabled]</code></td>
    <td>يغيّر العناصر الثانوية المختارة حاليًا<br>التي حددتها قيم السمة <code>option</code>. يتيح عمل قائمة قيم مفصولة بينها فواصل للاختيار من متعدد. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">اطّلِع على مثال</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-state&gt;</code></td>
    <td><code>[src]</code></td>
    <td>يجلب JSON من عنوان URL الجديد ويدمجه في الحالة الحالية. <em>لاحظ أن التعديل التالي سيتجاهل العناصر <code>&lt;amp-state&gt;</code> لمنع الدورات.</em></td>
  </tr>
  <tr>
    <td><code>&lt;amp-video&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[controls]</code><br><code>[loop]</code><br><code>[poster]</code><br><code>[preload]</code><br><code>[src]</code></td>
    <td>اطّلِع على <a href="https://www.ampproject.org/docs/reference/components/media/amp-video#attributes">سمات amp-video</a> المقابلة.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-youtube&gt;</code></td>
    <td><code>[data-videoid]</code></td>
    <td>يغيّر فيديو YouTube المعروض.</td>
  </tr>
  <tr>
    <td><code>&lt;a&gt;</code></td>
    <td><code>[href]</code></td>
    <td>يغيّر الرابط.</td>
  </tr>
  <tr>
    <td><code>&lt;button&gt;</code></td>
    <td><code>[disabled]</code><br><code>[type]</code><br><code>[value]</code></td>
    <td>اطّلِع على <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes">سمات الزر</a> المقابلة.</td>
  </tr>
  <tr>
    <td><code>&lt;details&gt;</code></td>
    <td><code>[open]</code></td>
    <td>اطّلِع على <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#Attributes">سمات التفاصيل</a> المقابلة.</td>
  </tr>
  <tr>
    <td><code>&lt;fieldset&gt;</code></td>
    <td><code>[disabled]</code></td>
    <td>يفعّل مجموعة الحقول أو يوقفها.</td>
  </tr>
  <tr>
    <td><code>&lt;image&gt;</code></td>
    <td><code>[xlink:href]</code><br>
      | اطّلِع على <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image">سمات الصور</a> المقابلة.</td>
    </tr>
    <tr>
      <td><code>&lt;input&gt;</code></td>
      <td><code>[accept]</code><br><code>[accessKey]</code><br><code>[autocomplete]</code><br><code>[checked]</code><br><code>[disabled]</code><br><code>[height]</code><br><code>[inputmode]</code><br><code>[max]</code><br><code>[maxlength]</code><br><code>[min]</code><br><code>[minlength]</code><br><code>[multiple]</code><br><code>[pattern]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[selectiondirection]</code><br><code>[size]</code><br><code>[spellcheck]</code><br><code>[step]</code><br><code>[type]</code><br><code>[value]</code><br><code>[width]</code></td>
      <td>اطّلِع على <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">سمات الإدخالات</a> المقابلة.</td>
    </tr>
    <tr>
      <td><code>&lt;option&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code><br><code>[selected]</code><br><code>[value]</code></td>
      <td>اطّلِع على <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#Attributes">سمات الخيارات</a> المقابلة.</td>
    </tr>
    <tr>
      <td><code>&lt;optgroup&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code></td>
      <td>اطّلِع على <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup#Attributes">سمات optgroup</a> المقابلة.</td>
    </tr>
    <tr>
      <td><code>&lt;select&gt;</code></td>
      <td><code>[autofocus]</code><br><code>[disabled]</code><br><code>[multiple]</code><br><code>[required]</code><br><code>[size]</code></td>
      <td>اطّلِع على <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#Attributes">سمات select</a> المقابلة.</td>
    </tr>
    <tr>
      <td><code>&lt;source&gt;</code></td>
      <td><code>[src]</code><br><code>[type]</code></td>
      <td>اطّلِع على <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#Attributes">سمات source</a> المقابلة.</td>
    </tr>
    <tr>
      <td><code>&lt;track&gt;</code></td>
      <td><code>[label]</code><br><code>[src]</code><br><code>[srclang]</code></td>
      <td>اطّلِع على <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track#Attributes">سمات track</a> المقابلة.</td>
    </tr>
    <tr>
      <td><code>&lt;textarea&gt;</code></td>
      <td><code>[autocomplete]</code><br><code>[autofocus]</code><br><code>[cols]</code><br><code>[disabled]</code><br><code>[maxlength]</code><br><code>[minlength]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[rows]</code><br><code>[selectiondirection]</code><br><code>[selectionend]</code><br><code>[selectionstart]</code><br><code>[spellcheck]</code><br><code>[wrap]</code></td>
      <td>اطّلِع على <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#Attributes">سمات textarea</a> المقابلة.</td>
    </tr>
  </table>


<sup>*</sup>* تشير إلى سمات قابلة للربط ليس لها نظير غير قابل للربط.

# تصحيح الأخطاء

اختبِر في وضع مطور البرامج (باستخدام جزء عنوان URL `#development=1`) لإبراز التحذيرات والأخطاء أثناء التطوير والوصول إلى الوظائف الخاصة لتصحيح الأخطاء.

# التحذيرات

في وضع مطور البرامج، سيصدر `amp-bind` تحذيرًا عندما لا تتطابق القيمة التلقائية لسمة مرتبطة مع النتيجة الأولية للتعبير المقابل. يمكن أن يساعد هذا في منع الطفرات غير المقصودة الناجمة عن التغييرات في متغيرات الحالة الأخرى. مثال:

```html
<!-- The element's default class value ('def') doesn't match the expression result for [class] ('abc'),
     so a warning will be issued in development mode. -->
<p [class]="'abc'" class="def"></p>

```

في وضع مطور البرامج، سيصدر `amp-bind` أيضًا تحذيرًا عند الوصول إلى محتوى المتغيرات أو الخصائص غير المحددة. يمكن أن يساعد هذا أيضًا في منع الطفرات غير المقصودة بسبب نتائج التعبير `null`. مثال:

```html
<amp-state id="myAmpState">
  <script type="application/json">
    { "foo": 123 }
  </script>
</amp-state>

<!-- The amp-state#myAmpState does not have a `bar` variable, so a warning
     will be issued in development mode. -->
<p [text]="myAmpState.bar">Some placeholder text.</p>
```

# الأخطاء

هناك عدة أنواع من أخطاء وقت التشغيل التي يمكن مواجهتها عند التعامل مع `amp-bind`.

<table>
  <tr>
    <th>النوع</th>
    <th>الرسالة</th>
    <th>الاقتراح</th>
  </tr>
  <tr>
    <td class="col-thirty">الربط غير صالح</td>
    <td class="col-fourty"><em>Binding to [someBogusAttribute] on &lt;P&gt; is not allowed</em>.</td>
    <td class="col-thirty">استخدِم فقط <a href="#element-specific-attributes">عمليات الربط المدرجة في القائمة البيضاء</a>.</td>
  </tr>
  <tr>
    <td>خطأ في البنية</td>
    <td><em>Expression compilation error in...</em></td>
    <td>تحقق من التعبير بحثًا عن الأخطاء الإملائية.</td>
  </tr>
  <tr>
    <td>الدالات غير مدرجة في القائمة البيضاء</td>
    <td><em>alert is not a supported function.</em></td>
    <td>استخدِم فقط <a href="#white-listed-functions">الدالات المدرجة في القائمة البيضاء</a>.</td>
  </tr>
  <tr>
    <td>نتيجة مصحَحة</td>
    <td><em>"javascript:alert(1)" is not a valid result for [href].</em></td>
    <td>تجنب بروتوكولات URL المحظورة أو التعبيرات المحظورة التي تخفق في "مدقق AMP".</td>
  </tr>
  <tr>
    <td>مخالفة CSP</td>
    <td><em>Refused to create a worker from 'blob:...' because it violates the following Content Security Policy directive...</em></td>
    <td>أضِف <code>default-src blob:</code> إلى سياسة أمان المحتوى للأصل. يفوض <code>amp-bind</code> العمل المُكلِف إلى <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Dedicated_workers">عامل ويب مخصص</a> لضمان الأداء الجيد.</td>
  </tr>
</table>

# حالة تصحيح الأخطاء

استخدِم `AMP.printState()` لطباعة الحالة الحالية إلى وحدة التحكم.

# الملحق

# مواصفات `<amp-state>`

قد يحتوي عنصر `amp-state` على عنصر `<script>` الثانوي **أو** سمة `src` التي تحتوي على عنوان CORS URL إلى نقطة نهاية JSON بعيدة، ولكن ليس على كليهما.

```html
<amp-state id="myLocalState">
  <script type="application/json">
    {
      "foo": "bar"
    }
  </script>
</amp-state>

<amp-state id="myRemoteState" src="https://data.com/articles.json">
</amp-state>
```

# إرسال XHR في دفعات

AMP ترسل XMLHttpRequests (XHRs) إلى نقاط نهاية JSON في دفعات، أي أنه يمكنك استخدام طلب بيانات JSON واحد كمصدر بيانات لعدة مستهلكين (عدة عناصر `amp-state` مثلاً) على صفحة AMP.  على سبيل المثال، إذا أرسل العنصر `amp-state` طلب XHR إلى نقطة نهاية، وكان الطلب في رحلته، لن يتم تشغيل جميع طلبات XHR اللاحقة إلى نقطة النهاية ونفسها وسيتم عرض النتائج من طلب XHR الأول.

# السمات

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>هي عنوان URL لنقطة النهاية البعيدة التي ستعرض JSON الذي سيعمل على تعديل <code>amp-state</code> هذا. ويجب أن تكون خدمة CORS HTTP.
      تتيح السمة <code>src</code> جميع استبدالات متغيرات عنوان URL القياسية. اطّلِع على <a href="../../spec/amp-var-substitutions.md">دليل الاستبدالات</a> للحصول على المزيد من المعلومات.
      [tip type="important"]
      يجب أن تنفذ نقطة النهاية المتطلبات المحددة في مواصفات <a href="https://www.ampproject.org/docs/fundamentals/amp-cors-requests">طلبات CORS في AMP</a>.
      [/tip]
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>credentials (اختيارية)</strong></td>
    <td>تعرِّف هذه السمة خيار <code>credentials</code> بالشكل الذي تحدده <a href="https://fetch.spec.whatwg.org/">واجهة برمجة تطبيقات الجلب</a>.
      <ul>
        <li>القيم المسموح بها: `omit` و`include`</li>
        <li>القيمة التلقائية: `omit`</li>
      </ul>
      لإرسال بيانات الاعتماد، مرِر قيمة <code>include</code>. إذا تم تعيين هذه القيمة، يجب أن تتبع الاستجابة <a href="https://www.ampproject.org/docs/fundamentals/amp-cors-requests#cors-security-in-amp">إرشادات الأمان AMP CORS</a>.</td>
    </tr>
  </table>


# الدمج العميق باستخدام `AMP.setState()`

عندما يتم استدعاء `AMP.setState()`، يدمج `amp-bind` الكائن الحرفي المتوفر بعمق مع الحالة الحالية. تتم كتابة جميع المتغيرات من الكائن الحرفي إلى الحالة مباشرة باستثناء الكائنات المدمجة والتي يتم دمجها بشكل متكرر. يتم دائمًا إلغاء العناصر الأولية والمصفوفات في الحالة بمتغيرات تحمل الاسم نفسه في الكائن الحرفي.

راجع المثال التالي:

```javascript
{
<!-- State is empty -->
}
```

```html
<button on="tap:AMP.setState({employee: {name: 'John Smith', age: 47, vehicle: 'Car'}})"...></button>
<button on="tap:AMP.setState({employee: {age: 64}})"...></button>
```

عند الضغط على الزر الأول، تتغير الحالة إلى:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 47,
    vehicle: 'Car',
  }
}
```

عند الضغط على الزر الثاني، سيدمج `amp-bind` الوسيطة الحرفية للكائن `{employee: {age: 64}}` بشكل متكرر في الحالة الحالية.

```javascript
{
  employee: {
    name: 'John Smith',
    age: 64,
    vehicle: 'Car',
  }
}
```

تم تعديل `employee.age` إلا أن المفاتيح `employee.name` و`employee.vehicle` لم تتغير.

يُذكر أن `amp-bind` ستعطي خطأ إذا استدعيت `AMP.setState()` بكائن حرفي يحتوي على مراجع دائرية.

# إزالة متغير

أزِل متغير حالة قائم عن طريق تعيين قيمته إلى القيمة `null` في `AMP.setState()`. بالبدء من الحالة في المثال السابق، سيؤدي الضغط إلى:

```html
<button on="tap:AMP.setState({employee: {vehicle: null}})"...></button>
```

تغيير الحالة إلى:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 48,
  }
}
```

بالمثل:

```html
<button on="tap:AMP.setState({employee: null})"...></button>
```

تغيير الحالة إلى:

```javascript
{
<!-- State is empty -->
}
```

# قواعد التعبيرات

القواعد المشابهة لـ BNF لتعبيرات `amp-bind`:

```text
expr:
    operation
  | invocation
  | member_access
  | '(' expr ')'
  | variable
  | literal

operation:
    '!' expr
  | '-' expr
  | '+' expr
  | expr '+' expr
  | expr '-' expr
  | expr '*' expr
  | expr '/' expr
  | expr '%' expr
  | expr '&&' expr
  | expr '||' expr
  | expr '<=' expr
  | expr '<' expr
  | expr '>=' expr
  | expr '>' expr
  | expr '!=' expr
  | expr '==' expr
  | expr '?' expr ':' expr

invocation:
    expr '.' NAME args

args:
    '(' ')'
  | '(' array ')'
  ;

member_access:
    expr member
  ;

member:
    '.' NAME
  | '[' expr ']'

variable:
    NAME
  ;

literal:
    STRING
  | NUMBER
  | TRUE
  | FALSE
  | NULL
  | object_literal
  | array_literal

array_literal:
    '[' ']'
  | '[' array ']'

array:
    expr
  | array ',' expr

object_literal:
    '{' '}'
  | '{' object '}'

object:
    key_value
  | object ',' key_value

key_value:
  expr ':' expr
```
