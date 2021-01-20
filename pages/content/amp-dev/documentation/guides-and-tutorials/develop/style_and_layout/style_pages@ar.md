---
$title: لغة CSS المعتمدة
---

مثل كل صفحات الويب، يتم تحديد أنماط صحفات AMP باستخدام لغة CSS،
ولكن لا يمكنك الإشارة إلى أوراق الأنماط الخارجية
(باستثناء [الخطوط المخصصة](#the-custom-fonts-exception)).
وهناك أيضًا أنماط معيّنة غير مسموح بها نظرًا لأغراض متعلقة بالأداء؛
فسمات الأنماط المضمّنة غير مسموح بها.

يجب أن تبقى جميع الأنماط في رأس المستند
(راجع [إضافة أنماط إلى إحدى الصفحات](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)).
ولكن يمكنك استخدام المعالجات التمهيدية والنماذج في CSS لإنشاء صفحات ثابتة
لإدارة المحتوى التابع لك على نحو أفضل.

[tip type="note"]

تتوفّر مكوّنات AMP مع أنماط افتراضية
لجعل إنشاء الصفحات التفاعلية سهلاً على نحو معقول.
ويتم تحديد هذه الأنماط في
[`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css).

[/tip]

## استخدام معالجات CSS التمهيدية <a name="using-css-preprocessors"></a>

يعمل الناتج الناشئ عن المعالجات التمهيدية في AMP تمامًا مثل أي صفحة ويب أخرى.
على سبيل المثال، يستخدم الموقع [amp.dev](https://amp.dev/) لغة
[Sass](http://sass-lang.com/).
(ونحن نستخدم [Grow](http://grow.io/) لإنشاء صفحات AMP الثابتة
التي يتكوّن منها موقع [amp.dev](https://amp.dev/).)

عند استخدام المعالجات التمهيدية،
عليك بالانتباه بشكل خاص إلى العناصر التي يتم تضمينها؛ فلا تحمّل سوى العناصر التي تستخدمها صفحاتك.
فمثلاً، يتضمّن
[head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html)
جميع ترميزات AMP المطلوبة ولغة CSS المضمّنة من ملفات المصدر `*.scss`.
كما يتضمّن أيضًا النص البرمجي للعنصر المخصص لـ
<a href="../../../../documentation/components/reference/amp-youtube.md"><code>amp-youtube</code></a>، وغيره،
وهكذا يمكن أن تتضمن العديد من الصفحات في الموقع مقاطع فيديو youtube مضمّنة.

[sourcecode:html] {% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>AMP Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %} [/sourcecode]

للاطلاع على كيفية تحويل ما سبق إلى AMP HTML منسّق،
اعرض مصدر أي صفحة في [amp.dev](https://amp.dev/).
(في Chrome، انقر بزر الماوس الأيمن و`اعرض مصدر الصفحة`.)

## أنماط غير مسموح بها

لا يُسمح بالأنماط التالية في صفحات AMP:

<table>
  <thead>
    <tr>
      <th data-th="Banned style">النمط المحظور</th>
      <th data-th="Description">الوصف</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">سمات النمط المضمّنة</td>
      <td data-th="Description">يجب تحديد جميع الأنماط في <code>&lt;head&gt;</code> بالصفحة،
       ضمن علامة <code>&lt;style amp-custom&gt;</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style">محدد الأهمية <code>!</code> </td>
      <td data-th="Description">غير مسموح باستخدامه.
      وهذا شرط ضروري لتمكين AMP من تطبيق قواعد تغيير حجم العنصر.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description">غير مسموح باستخدامه باستثناء <a href="#استثناء-الخطوط-المخصصة">الخطوط المخصصة</a>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code> (المحدد العام)</td>
      <td data-th="Description">الآثار السلبية للأداء ويمكن استخدامه
      للتحايل على قيود المحددات الأخرى.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">يمكن استخدامه لمحاكاة المحدد العام.</td>
    </tr>
    <tr>
      <td data-th="Banned style">المحددات الصورية، والفئات الصورية، والعناصر الصورية</td>
      <td data-th="Description">لا يُسمح للمحددات الصورية والفئات الصورية والعناصر الصورية إلا
      في المحددات التي تحتوي على أسماء علامات ويجب ألا تبدأ أسماء العلامات تلك بـ <code>amp-</code>.
      مثال صحيح: <code>a:hover, div:last-of-type</code>
      مثال غير صحيح: <code>amp-img:hover, amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style">أسماء فئات <code>-amp-</code> وعلامات <code>i-amp-</code></td>
      <td data-th="Description">لا يمكن أن تبدأ أسماء الفئات، في أوراق أنماط المؤلف، بالسلسلة <code>-amp-</code>. وهو محجوزة للاستخدام الداخلي فقط من خلال وقت تشغيل AMP. ويترتب على ذلك، أن ورقة أنماط المستخدم لا يمكنها الإشارة إلى محددات CSS لفئات <code>-amp-</code> وعلامات <code>i-amp</code>.</td>
    </tr>
  </tbody>
</table>

## خصائص النقل والصور المتحركة المدرجة بالقائمة البيضاء <a name="the-custom-fonts-exception"></a>

لا يسمح AMP سوى بعمليات النقل والرسوم المتحركة للخصائص
التي يمكن تسريعها من خلال وحدة معالجة الرسومات في برامج التصفّح الشائعة.
يضم مشروع AMP حاليًا `opacity` و`transform` و
و`-vendorPrefix-transform`.

في الأمثلة التالية، يجب أن تكون `<property>` في القائمة البيضاء:

- `transition <property> (Also -vendorPrefix-transition)`
- @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

لا يمكن تحديد نمط الخاصية `overflow` (و`overflow-y`, `overflow-x`)
كـ “auto” أو “scroll”.
ولا يمكن أن يكون لدى أي عنصر محدد بواسط المستخدم في مستند AMP شريط تمرير.

## استثناء الخطوط المخصصة <a name="استثناء-الخطوط-المخصصة"></a>

لا يمكن أن تحتوي صفحات AMP على أوراق أنماط خارجية، باستثناء الخطوط المخصصة.
تتمثل الطريقتان المتوافقتان مع الإشارة إلى الخطوط المخصصة
في علامات الروابط التي تشير إلى مقدمي الخطوط المدرجين في القائمة البيضان وتضمين `@font-face`.

لا يمكن وضع مقدمي الخطوط في القائمة البيضاء إلا
في حالة توافقها مع عمليات دمج ر ف قط وعرضها من خلال HTTPS.
وفي الوقت الحالي، لا تحوي القائمة البيضاء سوى هذه الأصول
حيث يُسمح لها بعرض الخطوط من خلال علامات الروابط:

- [https://fast.fonts.net](https://fast.fonts.net)
- [https://fonts.googleapis.com](https://fonts.googleapis.com)

نموذج لعلامة رابط تشير إلى مقدم خطوط مدرج بالقائمة البيضاء، وهو Google Fonts:

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

بدلاً من ذلك، يمكنك استخدام <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face">`@font-face`</a>.
ينبغي جلب الخطوط المتضمّنة عبر `@font-face` من
من خلال نظام HTTP أو HTTPS.
