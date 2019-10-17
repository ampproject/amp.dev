---
$title: التحقق من صحة صفحات AMP
---

لا تقتصر الميزة الأساسية لتطبيق AMP على زيادة سرعة صفحاتك تحميل، ولكنها تجعل صفحاتك سريعة على نحو يمكن معه *التحقق من صحتها*. وبناءً على ذلك، يمكن للجهات الأخرى، مثل Twitter أو Instagram أو بحث Google الثقة في عرض صفحات AMP للقرّاء من خلال طُرُق أكثر تشويقًا.

## كيف يمكنني معرفة ما اذا كانت صفحتي هي صفحة AMP صالحة؟

هناك عدة طرق متاحة للتحقق من صحة مستند AMP. وتؤدي جميعها
إلى النتيجة ذاتها، فيمكنك استخدام أي طريقة تناسب
نمط التطوير لديك بشكل أكبر.

بالإضافة إلى صلاحية AMP، قد تحتاج أيضًا إلى التأكد من أن مستند AMP [قابل للاكتشاف](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) لدى الأنظمة الأساسية التابعة لجهات خارجية.

### وحدة تحكم Developer Console بالمتصفّح.

تتوفّر أداة التحقق من صفحة صفحات AMP مصحوبة بمكتبة AMP JS، وبالتالي فهو متاحة في كل صفحة من صفحات AMP بشكل فوري. للتحقق من الصحة:

  1. فتح صفحة AMP في متصفحك
  1. أضف "`#development=1`" إلى عنوان URL، على سبيل المثال، `http://localhost:8000/released.amp.html#development=1`.
  1. افتح [وحدة تحكم Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) وابحث عن أخطاء التحقق من الصحة.

ستبدو أخطاء Developer Console على النحو التالي:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" layout="responsive" alt="Screen grab of AMP Validator errors in chrome developer console"></amp-img>

### واجهة الويب

يمكن استخدام أداة التحقق من صحة صفحات AMP كواجهة ويب على الموقع
[validator.ampproject.org](https://validator.ampproject.org/). وتُظهر
هذه الواجهة الأخطاء المعروضة بشكل مضمّن مع مصدر HTML للصفحة.
تعد الواجهة محررًا تفاعليًا: حيث تؤدي التغييرات المُجراة على مصدر html إلى
إعادة التحقق من الصحة بشكل تفاعلي.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" layout="responsive" alt="Screen grab of validator.ampproject.org with error examples."></amp-img>

### إضافة المتصفح

يمكن الوصول إلى أداة التحقق من صحة صفحات AMP بشكل مباشر من شريط أدوات المتصفّح باستخدام
إحدى إضافات المتصفّح. أثناء التصفّح، ستتحقق الأداة تلقائيًا من صحة كل صفحة من صفحات AMP
التي تمت زيارتها وستعرض مؤشرًا مرئيًا لصلاحية الصفحة في صورة رمز
ملوّن.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" layout="fixed" alt="Red AMP icon indicating invalid AMP document."></amp-img>

    </td>
    <td>عند وجود أخطاء في صفحة AMP، سيظهر رمز
      الإضافة بلون أحمر ويعرض عدد الأخطاء التي حدثت.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" layout="fixed" alt="Green AMP icon indicating valid AMP document."></amp-img>

    </td>
    <td>عند عدم وجود أخطاء في صفحة AMP، سيعرض الرمز لونًا
      أخضر مع بيان عدد التحذيرات، إن وجدت.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" layout="fixed" alt="Blue AMP icon indicating AMP HTML variant if clicked."></amp-img>

    </td>
    <td>إذا لم تكن الصفحة من صفحات AMP ولكن الصفحة تشير إلى توفّر إصدار AMP،
      فسيظهر الرمز بلون أزرق مع رمز رابط، حيث يؤدي النقر على
      الإضافة إلى إعادة توجيه المتصفّح إلى إصدار AMP.
    </td>
  </tr>
</table>

إضافة التحقق من صحة صفحات AMP للمتصفّحين
[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) و[Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### أداة سطر الأوامر

كشرط مسبق، قد تحتاج إلى تثبيت <a href="https://docs.npmjs.com/getting-started/installing-node">Node.js مع مدير الحزمة الخاص بها
`npm` على النظام الذي تستخدمه</a>.

لتثبيت [أداة سطر الأوامر لأداة التحقق من صحة AMP HTML](https://www.npmjs.com/package/amphtml-validator)، اكتب `npm install -g amphtml-validator`.

والآن، هيّا نتحقق من صحة صفحة AMP HTML حقيقية.

[sourcecode:console]
$ amphtml-validator https://amp.dev/
https://amp.dev/: PASS
[/sourcecode]

لا غرابة في صحة صفحة AMP HTML هذه. هيّا نجرّب صفحة غير صالحة:
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). لتشغيل الأمر `amphtml-validator` يمكنك تقديم عنوان URL للصفحة أو اسم ملف محلي. نزّل [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) واحفظه في ملف، ثم شغّل:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
...
[/sourcecode]

تتضمّن صيغة رسائل الخطأ من اسم الملف، والسطر، والعمود، والرسالة،
والتي عادة ما تكون متبوعة برابط إلى مرجع AMP HTML. بعض برامج التحرير، بما في ذلك Emacs
(ابحث عن أمر التجميع ووضع التجميع)، يمكنها ترجمة هذه الصيغة وتمكينك من
الانتقال إلى الأخطاء في الملف الأصلي.

كنقطة بداية جيدة لإنشاء صفحة AMP التابعة لك، جرّب [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

تقدّم أداة سطر الأوامر ميزات إضافية تشمل إيقاف تشغيل
اللون، أو طباعة ناتج JSON، أو تشغيل إصدار معيّن من
جافا سكريبت لأداة التحقق من الصحة (تشغّل أحدث نص برمجي منشور بشكل افتراضي).

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## ماذا يحدث إذا كانت صفحتي غير صالحة؟

لا يقتصر دور أداة التحقق من صحة صفحات AMP على كونها وسيلة مساعدة لك أثناء التطوير. فهي تُستخدم أيضًا من قِبل أنظمة أساسية مثل Twitter أو Google حيث يتم دمج صفحات AMP التابعة لك في المحتوى ونتائج البحث التابعة لهما. علاوة على ذلك، فإنهما لا يطلبان عادة الصفحات من خادمك بشكل مباشر، ولكنهما يستخدمان ذاكرة التخزين المؤقت لصفحات AMP من Google، وهي عبارة عن خدمة مجانية تخزّن صفحاتك مؤقتًا وتجعلها متاحة في أي مكان بالعالم، وهكذا يتم تحميلها بشكل أسرع.

في حال اكتشاف خدمة التحقق من صحة صفحات AMP أحد الأخطاء في صفحتك، لن تتمكن مواقع الجهات الخارجية على الويب من اكتشافها وتوزيعها ولن تظهر في ذاكرة التخزين المؤقت لصفحات AMP من Google. وبناءً على ذلك، لن تفقد مزايا السرعة التي توفّرها ذاكرة التخزين المؤقت فقط، ولكن قد لا تظهر صفحتك في العديد من الأماكن! وسيكون هذا أمرًا مزعجًا، فهيّا بنا نعمل على ألا يحدث.

## كيف يمكنني إصلاح أخطاء التحقق من الصحة؟

معظم أخطاء التحقق من الصحة سهلة المعالجة والإصلاح. تأمّل علامة HTML هذه:

`<img src="cat.png">`

والتي ينتج عنها خطأ التحقق من صحة صفحات AMP التالي، كما هو موضح في هذه الأدوات مختلفة:

* وحدة تحكم Developer Console بالمتصفّح
<amp-img alt="AMP error: The tag &#39;img&#39; may only appear as a descendant of tag &#39;noscript&#39;. Did you mean &#39;amp-img&#39;? line 11, column 2" height="30" src="/static/img/docs/validator_console_imgerror.png" width="696" layout="responsive"></amp-img>
* واجهة الويب
<amp-img alt="AMP error: The tag &#39;img&#39; may only appear as a descendant of tag &#39;noscript&#39;. Did you mean &#39;amp-img&#39;? line 11, column 2" height="58" src="/static/img/docs/validator_webui_imgerror.png" width="676" layout="responsive"></amp-img>
* <amp-img alt="AMP error: The tag &#39;img&#39; may only appear as a descendant of tag &#39;noscript&#39;. Did you mean &#39;amp-img&#39;? line 11, column 2" height="108" src="/static/img/docs/validator_extension_imgerror.png" width="724" layout="responsive"></amp-img>

تقدّم كل أداة عدة معلومات كما يلي:

  1. الموقع (السطر والعمود) في مستند HTML الذي ورد به الخطأ
     ، حيث يمكن النقر عليه في بي بضع الواجهات لتمييز الموقع. وفي هذه الحالة
     ، تظهر المشكلة في السطر 11، بالعمود 2.
  1. سطر نصّي يصف الخطأ. وفي هذه الحالة، يشير النص إلى
     استخدامنا لعلامة `<img>` في حين كان يجب استخدام علامة [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).
  1. رابط إلى مستند ذي صلة يتعلق بالخطأ. في هذه الحالة،
     مستندات لعلامة [`<amp-img>`](../../../../documentation/components/reference/amp-img.md). ولا تنشئ كل الأخطاء
     روابط للمستندات.

بعد إعادة قراءة المواصفات بعناية، تبيّن لنا أننا نستخدم علامة `<img>`، في حين كان يجب استخدم علامة [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).

لفهم القائمة الكاملة للأخطاء المحتملة بشكل أفضل،
راجع [دليل أخطاء التحقق من صحة صفحات AMP](validation_errors.md).
إذا كنت لا تزال تعاني من مشكلات بعد التقييم بعناية، يمكنك <a href="http://stackoverflow.com/questions/tagged/amp-html">طرح
سؤال</a> وسنحاول المساعدة.
