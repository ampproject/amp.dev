---
$title: جعل صفحتك قابلة للاكتشاف
---

في بعض الحالات، قد تحتاج إلى توفّر نسخة بخلاف AMP ونسخة AMP للصفحة نفسها، كمقالة إخبارية مثلاً. فكّر في ما يلي: في حالة عثور بحث Google على نسخة بخلاف AMP لتلك الصفحة، فكيف يتعرّف على وجود نسخة AMP لتلك الصفحة؟

### ربط الصفحات باستخدام `<link>`

لحل هذه المشكلة، نضيف معلومات عن صفحة AMP إلى الصفحة التي لا تنتمي إلى AMP وبالعكس، في صيغة علامات `<link>` في `<head>`.

أضف ما يلي إلى الصفحة التي لا تنتمي إلى AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

وأضف ما يلي إلى صفحة AMP:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### ماذا لو كانت لديّ صفحة واحدة فقط؟

إذا كانت لديك صفحة واحدة فقط، وتلك الصفحة هي صفحة AMP، فيجب مع ذلك إضافة الرابط الأساسي إليها، والذي سيشير إلى نفسه بطبيعة الحال:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

## التكامل مع الأنظمة الأساسية التابعة لجهات خارجية من خلال بيانات وصفية إضافية <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

في بعض الأحيان، يحتاج أحد المواقع التابعة لجهات خارجية (والذي يضمّن صفحة AMP أو روابط تشير إليها) إلى معرفة مزيد من المعلومات عن صفحتك بخلاف كونها صفحة AMP. وتتلخّص الأسئلة التي ربما يطرحها النظام الأساسي بشأن صفحتك في أشياء مثل: "هل تلك مقالة إخبارية؟"، "أم أنه مقطع فيديو؟"، أو "هل بالصفحة لقطة شاشة ووصف قصير؟".

وليس هذا مرتبطًا بصفحات AMP فحسب، بل يتعلق بجميع صفحات الويب. وبالنسبة إلى بعض الأنظمة الأساسية، تكون هذه البيانات الوصفية شيئًا إضافيًا، وبالنسبة إلى غيرها تكون شرطًا، مما يعني أنها **لن تعرض روابط إلى المحتوى التابع لك إذا لم تضمّن البيانات الوصفية الصحيحة**. تأكد من تضمين البيانات الوصفية الصحيحة للأنظمة الأساسية التي تريد للمحتوى أن يظهر بها.

### استخدام Schema.org لمعظم محركات البحث

تقدم [Schema.org](http://schema.org/) مصطلحات مفتوحة لإضافة البيانات الوصفية إلى كل شيء. وفي حالة AMP، فإن الخصائص التي تعطي المعنى داخل السياق تتضمن نوع المحتوى المحدد (مثل "مقالة إخبارية") والعنوان وتاريخ النشر وصور المعاينة المرتبطة.

مثال:‏

[sourcecode:html]
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
[/sourcecode]

يمكن الاطلاع على المزيد من الأمثلة في [مجلد أمثلة ampproject](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples)، بما في ذلك بنية سمة HTML البدلية.

ملاحظة: يعتبر تعريف Schema.org شرطًا لجعل المحتوى التابع لك مؤهلاً للظهور في النسخة التجريبية من [المكتبة الدوّارة لأخبار بحث Google (جرّبها على الجوّال)](https://g.co/ampdemo).
راجع أيضًا [أهم الأخبار المتعلقة بـ AMP](https://developers.google.com/structured-data/carousels/top-stories)، و[أداة اختبار البيانات المنظمة](https://developers.google.com/structured-data/testing-tool/).

### البيانات الوصفية الأخرى للمزيد من الأنظمة الأساسية

انتقل إلى [Social Discovery guide at Web Fundamentals](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) لمعرفة المزيد حول جميع الطرق المختلفة الأخرى لإعداد المحتوى التابع لك للاكتشاف والتوزيع.
