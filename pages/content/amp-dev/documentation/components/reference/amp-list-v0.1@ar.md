---
$title: amp-list
$category@: dynamic-content
formats:
  - websites
  - email
  - stories
teaser:
  text: Dynamically downloads data and creates list items using a template.
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



يجلب هذا المكوِّن المحتوى ديناميكيًا من نقطة نهاية CORS JSON ويعرضه باستخدام النموذج المرفق.

<table>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
    <td>fill وfixed وfixed-height وflex-item وnodisplay وresponsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>أمثلة</strong></td>
    <td>اطّلِع على <a href="https://ampbyexample.com/components/amp-list/">مثال amp-list</a> في الموقع "AMP بالمثال".</td>
  </tr>
</table>


## الاستخدام <a name="usage"></a>

يجلب المكوِّن `<amp-list>` المحتوى الديناميكي من نقطة نهاية CORS JSON. وتحتوي استجابة نقطة النهاية على بيانات يتم عرضها في النموذج المحدد.

[tip type="important"]

يجب أن تنفذ نقطة النهاية المتطلبات المحددة في مواصفات [طلبات CORS في AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).

[/tip]

يمكنك تحديد النموذج بإحدى طريقتين:

* السمة `template` التي تشير إلى معرّف `template` حالي أو إلى عنصر `script` حالي
* `template` أو عنصر `script` مدمج مباشرة داخل العنصر `amp-list`

راجِع [نماذج رمز HTML لصفحات AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-html-templates.md) للحصول على مزيد من التفاصيل عن النماذج.

*مثال: عرض قائمة ديناميكية*

في المثال التالي، نسترد بيانات JSON التي تحتوي على عناوين URL وعناوين رئيسية ونعرض المحتوى في [نموذج amp-mustache](amp-mustache.md) مدمج.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
  {% endraw %}</template>
</amp-list>
```
[/example]

في ما يلي ملف JSON الذي استخدمناه:

```json
{
 "items": [
   {
     "title": "AMP YouTube Channel",
     "url": "https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw"
   },
   {
     "title": "AMP.dev",
     "url": "https://amp.dev/"
   },
   {
     "title": "AMP Validator",
     "url": "https://validator.amp.dev/"
   },
   {
     "title": "AMP Playground",
     "url": "https://playground.amp.dev/"
   }
 ]
}
```
في ما يلي تصميم المحتوى الذي تم جلبه:

```css
amp-list div[role="list"] {
  display: grid;
  grid-gap: 0.5em;
}
```

## السلوك <a name="behavior"></a>

دائمًا ما يتم إرسال الطلب من العميل، حتى إذا تم عرض المستند من ذاكرة تخزين AMP المؤقت. يتم تشغيل التحميل باستخدام قواعد AMP العادية بناءً على مدى بُعد العنصر عن إطار العرض الحالي.

إذا احتاج `<amp-list>` إلى مساحة أكبر بعد التحميل، يطلب من وقت تشغيل AMP تعديل ارتفاعه باستخدام تدفق AMP العادي. إذا تعذر على وقت تشغيل AMP تلبية طلب الارتفاع الجديد، يعرض العنصر `overflow` عند توفره. ومع ذلك، لاحظ أن الموضع المعتاد لعناصر `<amp-list>` في أسفل المستند يضمن دائمًا لوقت تشغيل AMP إمكانية تغيير حجمها.

يضيف المكوِّن `<amp-list>` تلقائيًا دور `list` ARIA إلى عنصر القائمة ودور `listitem` إلى العناصر التي يعرضها النموذج.

### إرسال طلبات XHR على دفعات <a name="xhr-batching"></a>

ترسل AMP طلبات XMLHttpRequest (XHR) على دفعات إلى نقاط نهاية JSON، وهو ما يعني إمكانية استخدام طلب بيانات JSON واحد كمصدر بيانات لعدة مستهلكين (مثال: عناصر `<amp-list>` متعددة) على صفحة AMP واحدة.  إذا أرسل مثلاً المكّوِن `<amp-list>` طلب XHR إلى نقطة نهاية، لن يتم، أثناء إرسال الطلب، تشغيل جميع طلبات XHR اللاحقة إلى نقطة النهاية نفسها بل سيتم عرض النتائج من طلب XHR الأول.

في `<amp-list>`، يمكنك استخدام السمة [`items`](#items-optional) لعرض مجموعة فرعية من استجابة JSON، ما يتيح لك توفر عدة عناصر `<amp-list>` تعرض محتوى مختلفًا لكنها تشترك في طلب XHR واحد.

### تحديد السمة overflow <a name="specifying-an-overflow"></a>

يمكن أن يحتوي العنصر `<amp-list>` اختياريًا على عنصر بالسمة `overflow`. ويظهر هذا العنصر إذا تعذر على وقت تشغيل AMP تغيير حجم العنصر `<amp-list>` كما هو مطلوب.

*مثال: عرض overflow عند حاجة القائمة إلى مساحة إضافية*

في المثال التالي، نعرض قائمة بصور وعناوين. يعرض "وقت تشغيل AMP" عنصر overflow لأن محتوى `<amp-list>` يتطلب مساحة أكبر من المساحة المتاحة.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="140"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-data.json">
  <template type="amp-mustache">{% raw %}
    <div class="image-entry">
      <amp-img src="{{imageUrl}}"
        width="100"
        height="75"></amp-img>
      <span class="image-title">{{title}}</span>
    </div>
  {% endraw %}</template>
  <div overflow
    class="list-overflow">
    See more
  </div>
</amp-list>
```
[/example]

في ما يلي ترميز CSS للعنصر `overflow`:

```css
.list-overflow[overflow] {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
```

### العنصر النائب والعنصر الاحتياطي <a name="placeholder-and-fallback"></a>

يتيح المكوِّن `<amp-list>` اختياريًّا عنصرًا نائبًا و/أو عنصرًا احتياطيًا.

* *العنصر النائب* هو عنصر ثانوي له السمة `placeholder`. ويظهر هذا العنصر حتى يتم تحميل `<amp-list>` بنجاح. في حال توفير عنصر احتياطي، فسيتم إخفاء العنصر النائب عند تعذّر تحميل `<amp-list>`.
* *العنصر الاحتياطي* هو عنصر ثانوي له السمة `fallback`. ويظهر هذا العنصر إذا تعذّر تحميل `<amp-list>`.

يمكنك معرفة المزيد من المعلومات في [العناصر النائبة والعناصر الاحتياطية](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). وتجدر ملاحظة أن العنصر الثانوي الواحد لا يمكن أن يكون عنصرًا نائبًا واحتياطيًا معًا.

```html
<amp-list src="https://foo.com/list.json">
  <div placeholder>Loading ...</div>
  <div fallback>Failed to load data.</div>
</amp-list>
```

### تحديث البيانات <a name="refreshing-data"></a>

يعرض العنصر `<amp-list>` الإجراء `refresh` الذي يمكن للعناصر الأخرى الإشارة إليه في السمات `on="tap:..."`.

```html
{% raw %}<button on="tap:myList.refresh">Refresh List</button>
<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}
```

### تغيير الحجم الديناميكي <a name="dynamic-resizing"></a>

##### تجريبي: amp-list-resizable-children <a name="experiment-amp-list-resizable-children"></a>

في العديد من الحالات، قد نحتاج إلى `<amp-list>` لتغيير الحجم حسب تفاعل المستخدِم. ومن أمثلة هذا ما يلي: عندما يحتوي `<amp-list>` على المكوِّن amp-accordion الذي قد ينقر المستخدِم عليه أو عندما يغير محتوى `<amp-list>` حجمه بسبب فئات CSS مرتبطة أو عندما يتغير عدد العناصر داخل `<amp-list>` بسبب سمة `[src]` مرتبطة. يتعامل الإجراء `changeToLayoutContainer` مع هذا عن طريق تغيير amp list إلى `layout="CONTAINER"` عند تشغيل هذا الإجراء. انظر المثال التالي:

```html
{% raw %}<button on="list.changeToLayoutContainer()">Show Grid</button>
<amp-list id="list"
          width="396" height="80" layout="responsive"
          src="/test/manual/amp-list-data.json?RANDOM">
  <template type="amp-mustache">
    {{title}}
  </template>
</amp-list>
{% endraw %}
```

هذا الإجراء متاح تجريبيًا ضمن `amp-list-resizable-children`.

## السمات <a name="attributes"></a>

##### src (مطلوبة) <a name="src-required"></a>

تمثل عنوان URL لنقطة النهاية البعيدة التي تعرض JSON والذي سيتم عرضه داخل المكوِّن `<amp-list>` هذا. ويجب أن تكون خدمة CORS HTTP. ويجب أن يكون HTTPS هو بروتوكول عنوان URL.

[tip type="important"]

يجب أن تنفذ نقطة النهاية المتطلبات المحددة في مواصفات [طلبات CORS في AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).

[/tip]

قد يتم حذف السمة `src` في حال توفر السمة `[src]`. ويفيد هذا عند عرض المحتوى نتيجة إيماءة من المستخدِم بدلاً من تحميل الصفحة عند العمل باستخدام [`amp-bind`](amp-bind.md).

##### credentials (اختياريّة) <a name="credentials-optional"></a>

تعرِّف هذه السمة خيار `credentials` بالشكل الذي تحدده [واجهة برمجة تطبيقات الجلب](https://fetch.spec.whatwg.org/).

* القيم المسموح بها: `omit` و`include`
* القيمة التلقائية: `omit`

لإرسال بيانات الاعتماد، مرِر القيمة `include`. إذا تم تعيين هذه القيمة، يجب أن تتبع الاستجابة [إرشادات الأمان AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

في ما يلي مثال يحدد تضمين بيانات الاعتماد لعرض محتوى مخصص في قائمة:

```html
{% raw %}<amp-list credentials="include"
    src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${{price}}
  </template>
</amp-list>
{% endraw %}
```

##### items (اختياريّة) <a name="items-optional"></a>

تحدد التعبير للعثور على موقع المصفوفة المراد عرضها داخل الاستجابة. وهو تعبير بترميز منقوط يتنقل عبر حقول استجابة JSON.
بشكل تلقائي، يتوقع المكوِّن `<amp-list>` مصفوفة، وقد يتم استخدام السمة `single-item` لتحميل البيانات من الكائن.

* القيمة التلقائية هي `"items"`. والاستجابة المتوقعة: `{items: [...]}`.
* إذا كانت الاستجابة هي المصفوفة المرادة نفسها، استخدِم القيمة `"."`. الاستجابة المتوقعة: `[...]`.
* يُسمح بالتنقل المدمج (مثال: `"field1.field2"` ). الاستجابة المتوقعة: `{field1: {field2: [...]}}`.

عند تحديد `items="items"` (وهي القيمة التلقائية)، يجب أن تكون الاستجابة كائن JSON يحتوي على خاصية مصفوفة تسمى `"items"`:
```text
{
  "items": [...]
}
```

#### max-items (اختياريّة) <a name="max-items-optional"></a>

قيمة عددية تحدد الحد الأقصى لطول مصفوفة العناصر المراد عرضها.
سيتم اقتطاع المصفوفة `items` إلى إدخالات `max-items` إذا تجاوزت القيمة المعروضة `max-items`.

#### single-item (اختياريّة) <a name="single-item-optional"></a>

يتسبب `<amp-list>` في معالجة النتيجة المعروضة كما لو كانت مصفوفة عنصر واحد. سيتم التفاف استجابة الكائن في مصفوفة بحيث تتصرف `{items: {...}}` كما لو كانت `{items: [{...}]}`.

#### reset-on-refresh (اختياريّة) <a name="reset-on-refresh-optional"></a>

تعرض هذه السمة مؤشر تحميل وعنصر نائب مرة أخرى عند تحديث مصدر القائمة عبر `amp-bind` أو الإجراء `refresh()`.

بشكل تلقائي، لن يتم تشغيل هذا إلا عند عمليات التحديث التي تؤدي إلى الجلب من الشبكة. لإعادة التعيين عند جميع عمليات التحديث، استخدِم `reset-on-refresh="always"`.

#### [is-layout-container] (تجريبية واختياريّة) <a name="binding-optional"></a>

هذه سمة قابلة للربط ويجب أن تكون false دائمًا بشكل تلقائي. عند تعيينها على true عبر `bind`، فإنها تغير تنسيق `<amp-list>` إلى تنسيق `CONTAINER`. وتفيد هذه السمة في معالجة تغيير الحجم الديناميكي لقائمة amp-list. لا يمكن أن تكون هذه السمة true بشكل تلقائي للسبب نفسه الذي يجعل `<amp-list>` لا يتيح التنسيق `CONTAINER`، ألا وهو احتمال حدوث قفزات في المحتوى عند التحميل الأول. هذه السمة متاحة تجريبيًا ضمن `amp-list-resizable-children`. أو يمكن أيضًا استخدام الإجراء `changeToLayoutContainer`.

#### binding (اختياريّة) <a name="is-layout-container-optional"></a>

بالنسبة إلى الصفحات التي تستخدم `<amp-list>` والتي تستخدم أيضًا `amp-bind`، تتحكم هذه السمة في ما إذا كان سيتم حظر عرض تقييم الارتباطات (مثل `[text]`) في العناصر الثانوية المعروضة أم لا.

ننصح باستخدام `binding="no"` أو `binding="refresh"` للحصول على أداء أسرع.

* `binding="no"`: عدم حظر العرض مطلقًا **(الأسرع)**
* `binding="refresh"`: عدم حظر العرض عند التحميل الأولي **(أسرع)**
* `binding="always"`: حظر العرض دائمًا **(بطيء)**

في حال توفير السمة `binding`، تكون القيمة التلقائية `always`.

## تجريبي: تحميل المزيد والتمرير اللانهائي (amp-list-load-more) <a name="common-attributes"></a>

لقد أدخلنا التجربة `amp-list-load-more` كتنفيذ للتقسيم على صفحات والتمرير اللانهائي في `<amp-list>`. يمكنك تفعيل هذه الميزة عن طريق تشغيل التجربة "amp-list-load-more" في [صفحة التجارب](https://cdn.ampproject.org/experiments.html) وإضافة السمة `load-more` إلى `<amp-list>`. هذه الميزة في نطاق التجربة حاليًا، وقد تتغير واجهات برمجة التطبيقات النهائية.

#### مثال للاستخدام <a name="load-more-and-infinite-scroll"></a>

```html
<amp-list height="200" src="https://my.rest.endpoint/" width="100" load-more="auto">
  <template type="amp-mustache">
  // ...
  </template>
</amp-list>

```

للحصول على أمثلة عملية، يرجى الاطّلاع على [test/manual/amp-list/infinite-scroll-1.amp.html](https://github.com/ampproject/amphtml/blob/main/test/manual/amp-list/infinite-scroll-1.amp.html) و[test/manual/amp-list/infinite-scroll-2.amp.html](https://github.com/ampproject/amphtml/blob/main/test/manual/amp-list/infinite-scroll-1.amp.html).

### السمات <a name="sample-usage"></a>

#### load-more (إلزامية) <a name="attributes-1"></a>

تقبل هذه السمة قيمتين: "auto" أو "manual". سيؤدي تعيين قيمة هذه السمة على "manual" إلى إظهار زر "load-more" في نهاية `<amp-list>`. أما تعيين قيمة هذه السمة على "auto" سيؤدي إلى تحميل `<amp-list>` للمزيد من العناصر تلقائيًا بطول ثلاثة إطارات عرض للأسفل للحصول على تأثير بالتمرير اللانهائي.

#### load-more-bookmark (اختياريّة) <a name="load-more-mandatory"></a>

تحدد هذه السمة اسم الحقل في البيانات المعروضة وستوفر عنوان url للعناصر التالية المراد تحميلها. إذا لم يتم تحديد هذه السمة، يتوقع `<amp-list>` أن يكون لحمولة json الحقل `load-more-src`، والذي يتوافق مع عنوان url التالي المطلوب تحميله. في حال ظهور هذا الحقل باسم آخر، يمكنك تحديد اسم هذا الحقل عبر الحقل `load-more-bookmark`.في مثال الحمولة التالي، سنحدد `load-more-bookmark="next"`.

```
{ "items": [...], "next": "https://url.to.load" }
```

### تخصيص عناصر load-more <a name="load-more-bookmark-optional"></a>

يحتوي `<amp-list>` الذي به السمة `load-more` على عناصر واجهة المستخدم التالية: زر load-more وأداة التحميل وعنصر load-failed واختياريًا إعلان يميّز نهاية القائمة. يمكن تخصيص هذه العناصر من خلال توفير عناصر `<amp-list-load-more>` كعناصر ثانوية للمكوِّن `<amp-list>` بالسمات التالية:

#### load-more-button <a name="customizing-load-more-elements"></a>

عنصر `<amp-list-load-more>` بالسمة `load-more-button` يظهر في نهاية القائمة (لإجراء load-more يدويًا) إذا كان هناك المزيد من العناصر المراد تحميلها. سيؤدي النقر على هذا العنصر إلى تشغيل عملية جلب لتحميل المزيد من العناصر من عنوان url المتوفر في الحقل `load-more-src` أو حقل البيانات المعروضة المطابقة للسمة `load-more-bookmark`. يمكن تخصيص هذا العنصر من خلال توفير `<amp-list>` بعنصر ثانوي يحتوي على السمة `load-more-button`.

##### مثال: <a name="load-more-button"></a>

```html
<amp-list load-more="manual" src="https://www.load.more.example.com/" width="400" height="800">
...
  <amp-list-load-more load-more-button>
    <button>See More</button> /* My custom see more button */
  </amp-list-load-more>
</amp-list>
```

يمكن تصميم هذا العنصر وفقًا لنموذج عبر المكوِّن `amp-mustache`.

##### مثال: <a name="example"></a>

```html
{% raw %}<amp-list load-more="auto" width="100" height="500" src="https://www.load.more.example.com/">
  ...
  <amp-list-load-more load-more-button>
    <template type="amp-mustache">
      Showing {{#count}} out of {{#total}} items
      <button>
        Click here to see more!
      </button>
    </template>
  </amp-list-load-more>
</amp-list>
{% endraw %}
```

#### load-more-loading <a name="example-1"></a>

هذا العنصر عبارة عن أداة تحميل يتم عرضه إذا وصل المستخدِم إلى نهاية القائمة ولا يزال المحتوى قيد التحميل، أو يتم عرضه نتيجة للنقر على العنصر `load-more-button` (بينما لا تزال عناصر `<amp-list>` الثانوية الجديدة قيد التحميل). يمكن تخصيص هذا العنصر من خلال توفير `<amp-list>` بعنصر ثانوي يحتوي على السمة `load-more-loading`. المثال أدناه:
```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-loading>
    <svg>...</svg> /* My custom loader */
  </amp-list-load-more>
</amp-list>
```

#### load-more-failed <a name="load-more-loading"></a>

عنصر `<amp-list-load-more>` يحتوي على السمة `load-more-failed` ويحتوي على زر به السمة `load-more-clickable` يتم عرضه أسفل `<amp-list>` في حال تعذّر التحميل. سيؤدي النقر على هذا العنصر إلى تشغيل عملية إعادة تحميل عنوان url الذي تعذّر. يمكن تخصيص هذا العنصر من خلال توفير `<amp-list>` بعنصر ثانوي يحتوي على السمة `load-more-failed`. المثال التالي:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <button>Unable to Load More</button>
  </amp-list-load-more>
</amp-list>
```

في المثال أعلاه، العنصر `load-more-failed` قابل للنقر عليه بشكل كامل. ومع ذلك، فإن النمط الشائع لهذا العنصر هو عنصر "تعذر التحميل" غير قابل للنقر عمومًا ويحتوي على زر "إعادة التحميل" قابل للنقر. ولتنفيذ ذلك، يمكنك الحصول على عنصر غير قابل للنقر عمومًا به زر يحتوي على العنصر `load-more-clickable`. مثال:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <div>
      Here is some unclickable text saying sorry loading failed.
    </div>
    <button load-more-clickable>Click me to reload!</button>
  </amp-list-load-more>
</amp-list>
```

#### load-more-end <a name="load-more-failed"></a>

لا يتم توفير هذا العنصر تلقائيًا ولكن إذا تم إرفاق عنصر `<amp-list-load-more>` يحتوي على السمة `load-more-end` بـ `<amp-list>` كعنصر ثانوي، يتم عرض هذا العنصر في الجزء السفلي من `<amp-list>` إذا لم يكن هناك المزيد من العناصر.  يمكن تصميم هذا العنصر وفقًا لنموذج عبر المكوِّن `amp-mustache`. المثال التالي:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-end>
    Congratulations! You've reached the end. /* Custom load-end element */
  </amp-list-load-more>
</amp-list>
```

##### السمات المشتركة <a name="load-more-end"></a>

يتضمن هذا العنصر [السمات المشتركة](../../../documentation/guides-and-tutorials/learn/common_attributes.md) التي تشمل مكونات AMP.

## الاستبدالات <a name="substitutions"></a>

يتيح `<amp-list>` جميع استبدالات متغيرات عناوين URL القياسية.
اطّلِع على [دليل الاستبدالات](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md) للحصول على المزيد من المعلومات.

مثال:
```html
<amp-list src="https://foo.com/list.json?RANDOM"></amp-list>
```
قد ترسل طلبًا إلى عنوان مثل `https://foo.com/list.json?0.8390278471201` حيث إنه يتم إنشاء قيمة RANDOM عشوائيًا عند كل مرة ظهور.

## التحقق <a name="validation"></a>

اطِّلع على [قواعد amp-list](https://github.com/ampproject/amphtml/blob/main/extensions/amp-list/validator-amp-list.protoascii) في مواصفات مدقق AMP.
