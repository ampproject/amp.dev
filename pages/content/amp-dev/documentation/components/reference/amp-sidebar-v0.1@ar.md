---
$category@: layout
formats:
  - websites
  - email
teaser:
  text: >-
    Provides a way to display meta content intended for temporary access such as navigation, links, buttons, menus.
toc: true
$title: amp-sidebar
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



[جدول المحتويات]

<table>
  <tr>
    <td width="40%"><strong>الوصف</strong></td>
    <td>
      يوفر الشريط الجانبي طريقة لعرض محتوى وصفي مخصص للوصول المؤقت (روابط التنقل والأزرار والقوائم وغيرها). يمكن إظهار الشريط الجانبي بالنقر على زر بينما يظل المحتوى الرئيسي مرئيًا أسفله.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>أمثلة</strong></td>
    <td>اطّلِع على <a href="https://ampbyexample.com/components/amp-sidebar/">مثال amp-sidebar</a> في الموقع "AMP بالمثال".</td>
  </tr>
</table>

## نظرة عامة <a name="overview"></a>

يخفي المكوِّن `<amp-sidebar>` محتوى وصفيًا مخصصًا للوصول المؤقت (روابط التنقل والأزرار والقوائم وغيرها). يمكن فتح `<amp-sidebar>` وإغلاقه بالنقر على الأزرار والنقر خارج amp-sidebar.
ومع ذلك، يمكن استخدام السمات الاختيارية التي تقبل الاستعلامات عن الوسائط لعرض محتوى وصفي في أجزاء أخرى من الموقع. تسمح عناصر `<nav toolbar="(media query)" toolbar-target="elementID">` الثانوية بعرض المحتوى داخل الشريط الجانبي على أجزاء أخرى من المحتوى الرئيسي.

## السلوك <a name="behavior"></a>

* يجب أن يكون `<amp-sidebar>` عنصر `<body>` ثانوي مباشر.
* يمكن للشريط الجانبي الظهور فقط على الجانب الأيسر أو الأيمن من الصفحة.
* قد يحتوي `<amp-sidebar>` على أي عناصر HTML صالحة (تقبلها AMP).
* قد يحتوي `<amp-sidebar>` على أي من عناصر AMP التالية:
    * `<amp-accordion>`
    * `<amp-img>`
    * `<amp-fit-text>`
    * `<amp-list>`
    * `<amp-live-list>`
    * `<amp-social-share>`</li>
* يبلغ أقصى ارتفاع للشريط الجانبي 100vh، وإذا تجاوز الارتفاع 100vh، يظهر عندها شريط التمرير الرأسي. يتم ضبط الارتفاع التلقائي على 100vh في CSS ويمكن إلغاء هذه القيمة في CSS.
* يمكن ضبط عرض الشريط الجانبي وضبطه باستخدام CSS (الحد الأدنى للعرض هو 45px).
* يتم إيقاف التكبير/التصغير باللمس على `amp-sidebar` ويكون قناعًا عند فتح الشريط الجانبي.

*مثال:*

في المثال التالي، نستخدم `amp-sidebar` لتضمين عناصر التنقل. ومع ذلك، يتم تعيين العنصر الثاني والرابع وNav Item 2 وNav Item 4 لمعرّف عنصر على الصفحة. وباستخدام السمة [`on`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/../../spec/amp-actions-and-events.md)، يمكننا التمرير بسلاسة إلى العنصر باستخدام معرّف العنصر و`scrollTo`.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>
</amp-sidebar>
```

### فتح الشريط الجانبي وإغلاقه <a name="opening-and-closing-the-sidebar"></a>

للتبديل أو فتح الشريط الجانبي أو إغلاقه عند النقر على العنصر، اضبط سمة الإجراء [`on`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) على العنصر وحدّد أحد أساليب الإجراءات التالية:

<table>
  <tr>
    <th>الإجراء</th>
    <th>الوصف</th>
  </tr>
  <tr>
    <td>open (تلقائي)</td>
    <td>يفتح الشريط الجانبي.</td>
  </tr>
  <tr>
    <td>close</td>
    <td>يغلق الشريط الجانبي.</td>
  </tr>
  <tr>
    <td>toggle</td>
    <td>يبدّل حالة الشريط الجانبي.</td>
  </tr>
</table>

إذا نقر المستخدم مرة أخرى على منطقة المحتوى الرئيسي المرئي جزئيًا، سيؤدي هذا إلى إغلاق الشريط الجانبي.

أو سيؤدي الضغط على مفتاح escape بلوحة المفاتيح إلى إغلاق الشريط الجانبي كذلك.

*مثال:*

```html
<button class="hamburger" on='tap:sidebar1.toggle'></button>
<button on='tap:sidebar1'>Open</button>
<button on='tap:sidebar1.open'>Open</button>
<button on='tap:sidebar1.close'>x</button>
```

### Toolbar <a name="toolbar"></a>

يمكنك إنشاء عنصر `toolbar` يتم عرضه في `<body>` عن طريق تحديد السمة `toolbar` باستعلام عن الوسائط وتحديد السمة `toolbar-target` بمعرّف عنصر في عنصر `<nav>` هو عنصر ثانوي لـ `<amp-sidebar>`. يكرر `toolbar` العنصر `<nav>` وعناصره الثانوية ويضيف العنصر إلى العنصر `toolbar-target`.

#### السلوك <a name="behavior-1"></a>

* قد ينفذ الشريط الجانبي أشرطة الأدوات بإضافة عناصر التنقل باستخدام السمة `toolbar` والسمة `toolbar-target`.
* يجب أن يكون عنصر التنقل عنصر `<amp-sidebar>` ثانويًا ويتبع هذا التنسيق: `<nav toolbar="(media-query)" toolbar-target="elementID">`.
    * هذا مثال لاستخدام صالح لشريط الأدوات: `<nav toolbar="(max-width: 1024px)" toolbar-target="target-element">`.</li>
* يجب أن يحتوي التنقل المتضمن سمة شريط الأدوات على عنصر `<ul>` واحد يحتوي على عناصر `<li>`.
    * قد تحتوي العناصر `<li>` على أي عناصر HTML صالحة (تقبلها AMP) أو أي من عناصر AMP يقبلها `<amp-sidebar>`.</li>
* يتم تطبيق سلوك شريط الأدوات فقط عندما يكون الاستعلام عن وسائط للسمة `toolbar` صالحًا. ويجب أيضًا توفر عنصر بمعرّف السمة `toolbar-target` على الصفحة ليتم تطبيق شريط الأدوات.

*مثال: شريط الأدوات الأساسي*

في المثال التالي، نعرض `toolbar` إذا كان عرض النافذة أقل من 767px أو يساويها. يحتوي `toolbar` على عنصر إدخال بحث. سيتم إلحاق العنصر `toolbar` بالعنصر `<div id="target-element">`.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Search..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>
```

## تصميم شريط الأدوات <a name="styling-toolbar"></a>

سيكون للعنصر `toolbar` داخل العنصر `<amp-sidebar>` فئات مُطبّقة على العنصر بناءً على ما إذا كان عنصر `toolbar-target` معروضًا أو مخفيًا. ويفيد هذا في تطبيق تصميمات مختلفة على العنصر `toolbar` ثم العنصر `toolbar-target`. والفئات هي: `amp-sidebar-toolbar-target-shown` و`amp-sidebar-toolbar-target-hidden`. يتم تطبيق الفئة `amp-sidebar-toolbar-target-shown` على العنصر `toolbar` عندما يكون العنصر `toolbar-target` معروضًا. يتم تطبيق الفئة `amp-sidebar-toolbar-target-hidden` على العنصر `toolbar` عندما يكون العنصر `toolbar-target` مخفيًا.

*مثال: فئات حالة شريط الأدوات*

في المثال التالي، نعرض `toolbar` إذا كان عرض النافذة أقل من 767px أو يساويها. يحتوي `toolbar` على عنصر إدخال بحث. سيتم إلحاق العنصر `toolbar` بالعنصر `<div id="target-element">`. ومع ذلك، أضفنا بعض التصميمات المخصصة لإخفاء العنصر `toolbar` عند عرض العنصر `<div id="toolbar-target">`.

```html
<style amp-custom="">

  .amp-sidebar-toolbar-target-shown {
      display: none;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Search..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

[tip type="success"]
يمكنك الاطّلاع على أمثلة توضيحية في موقع [AMP بالمثال](https://ampbyexample.com/components/amp-sidebar/).
[/tip]

## الشريط الجانبي للقصص <a name="sidebar-for-stories"></a>

من المقبول استخدام `amp-sidebar` داخل [المكوِّن](../../../about/stories.html) `amp-story`.

### السلوك <a name="behavior-2"></a>

* يجب أن يكون `<amp-sidebar>` عنصرًا ثانويًا مباشرًا للمكوِّن `<amp-story>`.
* يتم ضبط الشريط الجانبي افتراضيًا على الجانب "start" لمستندات AMP العادية، ما يعني الجانب الأيمن للغات من اليسار إلى اليمين والجانب الأيسر للغات من اليمين إلى اليسار.
* يحتوي `<amp-sidebar>` على اللون الأبيض كلون خلفية تلقائي ويمكن إلغاؤه في CSS.
* يتم تنفيذ أقصى عرض للمكوِّن `<amp-sidebar>` عند `280px` و `320px` لتجارب جهاز كمبيوتر سطح المكتب.
* سيظهر زر التصميم "hamburger" الذي يفتح/يغلق الشريط الجانبي في واجهة المستخدم للقصة.

هناك قيود معينة على السمات والميزات المسموح بها لتوفير تجربة واجهة مستخدم متسقة عبر منصة القصص. فيما يلي سمات وميزات `amp-sidebar` المسموح بها في `amp-story`.

### السمات المسموح بها <a name="allowed-attributes"></a>

* [layout](#layout)
* [data-close-button-aria-label](#data)
* [السمات المشتركة](#common)

*مثال: الشريط الجانبي الأساسي في القصة*

يعرض المثال التالي `amp-sidebar` بسيطًا داخل `amp-story`.

```html
...
<body>
  <amp-story standalone>
  <amp-sidebar id="sidebar1" layout="nodisplay">
    <ul>
      <li><a href="https://amp.dev"> External Link </a></li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
    </ul>
  </amp-sidebar>
  <amp-story-page id="cover">
    <amp-story-grid-layer template="fill">
      <h1>Hello World</h1>
      <p>This is the cover page of this story.</p>
    </amp-story-grid-layer>
  </amp-story-page>
  ...
</body>
```

## السمات <a name="attributes"></a>

##### side <a name="side"></a>

تشير إلى جانب الصفحة الذي يجب فتح الشريط الجانبي منه، إما `left` أو `right`.  في حال عدم تحديد `side`، سيتم اكتساب قيمة `side` من السمة `dir` للعلامة `body` (`ltr` => `left` و`rtl` => `right`). وفي حال عدم توفر `dir`، يتم ضبط `side` تلقائيًا على `left`.

##### layout <a name="layout"></a>

تحدد تنسيق عرض الشريط الجانبي الذي يجب أن يكون `nodisplay`.

##### open <a name="open"></a>

تتوفر هذه السمة عندما يكون الشريط الجانبي مفتوحًا.

##### data-close-button-aria-label <a name="data"></a>

سمة اختيارية تُستخدَم لتحديد تصنيف ARIA لزر الإغلاق المضَاف لسهولة الاستخدام.

##### toolbar <a name="toolbar-1"></a>

تتوفر هذه السمة على عناصر `<nav toolbar="(media-query)" toolbar-target="elementID">` الثانوية وتقبل الاستعلام عن الوسائط عن وقت عرض شريط الأدوات. راجِع قسم [شريط الأدوات](#toolbar) للحصول على مزيد من المعلومات عن استخدام أشرطة الأدوات.

##### toolbar-target <a name="toolbar-target"></a>

تتوفر هذه السمة على عنصر `<nav toolbar="(media-query)" toolbar-target="elementID">` الثانوي وتقبل معرّف عنصر على الصفحة.  ستضع السمة `toolbar-target` شريط الأدوات في المعرّف المحدَد للعنصر في الصفحة، بدون التصميم التلقائي لشريط الأدوات. راجِع قسم [شريط الأدوات](#toolbar) للحصول على مزيد من المعلومات عن استخدام أشرطة الأدوات.

##### السمات المشتركة <a name="common"></a>

يتضمن هذا العنصر [السمات المشتركة](../../../documentation/guides-and-tutorials/learn/common_attributes.md) التي تشمل مكونات AMP.

## التصميم <a name="styling"></a>

يمكن تصميم المكوِّن `amp-sidebar` باستخدام CSS القياسي.

* قد يتم تحديد `width` للمكوِّن `amp-sidebar` لضبط العرض بين قيم الحد الأدنى (45px) والأقصى (80vw) المُعدَة مسبقًا.
* يمكن تحديد ارتفاع `amp-sidebar` لضبط ارتفاع الشريط الجانبي، إذا لزم الأمر. إذا تجاوز الارتفاع 100vw، سيكون للشريط الجانبي شريط تمرير رأسي. يبلغ ارتفاع الشريط الجانبي المُعَد مسبقًا 100vw ويمكن إلغاؤه في CSS لجعله أقل.
* يتم إظهار الحالة الحالية للشريط الجانبي من خلال السمة `open` التي يتم تعيينها على علامة `amp-sidebar` عندما يكون الشريط الجانبي مفتوحًا على الصفحة.

[tip type="success"]
انتقِل إلى الموقع [AMP Start](https://ampstart.com/components#navigation) للاطّلاع على قوائم التنقل المتجاوبة المُصمَمة مسبقًا التي يمكن استخدامها في صفحات AMP.
[/tip]

## التمرير التلقائي داخل المناطق الكاملة <a name="auto-scrolling-within-overflowing-areas"></a>

يمكن أن يمرر `amp-sidebar` تلقائيًا الحاوية الكاملة إلى العنصر الأول المضَاف إلى السمة `autoscroll` في كل من حالات الشريط الجانبي وشريط الأدوات.

هذه الميزة مفيدة عند التعامل مع قائمة التنقل الطويلة والرغبة في أن يتم تمرير الشريط الجانبي إلى عناصر التنقل الحالية عند تحميل الصفحة.

عند استخدام الميزة `toolbar`، تعمل `autoscroll` فقط إذا تم تعيين العنصر `<nav toolbar>` على `overflow: auto` أو `overflow: scroll`.

```html
<style amp-custom="">

  nav [toolbar] {
    overflow: auto;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>Nav item 1</li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
      <li autoscroll class="currentPage">Nav item 4</li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

يُرجى الاطّلاع على [ملف الأمثلة هذا](https://github.com/ampproject/amphtml/blob/master/examples/amp-sidebar-autoscroll.amp.html) لمعرفة أمثلة عملية للترميز.

## اعتبارات تجربة المُستخدِم <a name="ux-considerations"></a>

عند استخدام `<amp-sidebar>`، ضع في اعتبارك أن المستخدمين سيعرضون غالبًا صفحتك على الهاتف الجوال في عارض صفحات AMP وهو ما قد يعرض رأسًا ثابتة الموضع. بالإضافة إلى ذلك، غالبًا ما تعرض المتصفحات رأسها الثابت في أعلى الصفحة. لذا فإن إضافة عنصر آخر ثابت الموضع إلى أعلى الشاشة قد تؤدي إلى شغل قدر كبير من مساحة شاشة الجوال بمحتوى لا يمنح المستخدِم معلومات جديدة.

لهذا السبب نوصي بعدم وضع خصائص فتح الشريط الجانبي في رأس ثابت بالعرض الكامل.

## التحقق <a name="validation"></a>

اطِّلع على [قواعد amp-sidebar](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/validator-amp-sidebar.protoascii) في مواصفات مدقق AMP.
