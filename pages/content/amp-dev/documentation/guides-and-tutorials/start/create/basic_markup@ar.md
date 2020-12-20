---
$title: إنشاء صفحة AMP HTML
---

يمثل الترميز التالي نقطة بداية مناسبة أو نصًا معياريًا.
انسخه واحفظه في ملف بإضافة ‎.html.

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

المحتوى في النص الأساسي واضح حتى الآن. لكن هناك الكثير من الشفرات الإضافية في عنوان الصفحة، والتي قد لا تبدو واضحةً مباشرةً. هيا نحلل الترميز المطلوب.

## الترميز المطلوب

يُشترط في مستندات <span dir="ltr" class="nowrap">AMP HTML</span>:

  - أن تبدأ بـ doctype <span dir="ltr" class="nowrap">`<!doctype html>`</span>.
  - أن تحتوي على علامة المستوى الأعلى <span dir="ltr" class="nowrap">`<html ⚡>`</span> (تكون <span dir="ltr" class="nowrap">`<html amp>`</span> مقبولة كذلك).
  - أن تحتوي على العلامتين `<head>` و`<body>` (هما علامتان اختياريتان في HTML).
  - أن تحتوي على العلامة <span dir="ltr" class="nowrap">`<link rel="canonical" href="$SOME_URL">`</span> داخل عنوانها، والتي تشير إلى إصدار HTML العادي لمستند <span dir="ltr" class="nowrap">AMP HTML</span> أو إلى نفسها إذا لم يكن إصدار HTML من هذا القبيل موجودًا.
  - أن تحتوي على العلامة <span dir="ltr" class="nowrap">`<meta charset="utf-8">`</span> بوصفها التابع الأول للعلامة head.
  - أن تحتوي على العلامة <span dir="ltr" class="nowrap">`<meta name="viewport" content="width=device-width">لموصى به أيضًا تضمين <span dir="ltr" class="nowrap">initial-scale=1</span>.
  - أن تحتوي على العلامة <span dir="ltr" class="nowrap">`<script async src="https://cdn.ampproject.org/v0.js"></script>`</span> بوصفها العنصر الأخير في head (يشمل هذا مكتبة <span dir="ltr" class="nowrap">AMP JS</span> ويقوم بتحميلها).
  - أن تحتوي على ما يلي في العلامة `<head>`:
    <span dir="ltr">`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`</span>

## البيانات الوصفية الاختيارية

بالإضافة إلى المتطلبات المجرّدة، كذلك يتضمن النموذج تعريف <span dir="ltr" class="nowrap">Schema.org</span> في العنوان، والتي لا تمثل متطلبًا صارمًا لـ AMP، لكنها متطلب لتوزيع محتواك في مواقع معينة، على سبيل المثال في [العرض التوضيحي لسلسلة عرض أخبار بحث Google (جرّبه على هاتفك)](https://g.co/ampdemo).

للتعرّف على المزيد بشأن كل البيانات الوصفية التي ستحتاجها في العديد من المواقع الأخرى، أي Twitter، [استكشف نماذجنا](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples). للتعرّف بصفة خاصة على AMP في بحث Google، انظر [أهم الأخبار باستخدام AMP](https://developers.google.com/structured-data/carousels/top-stories).

<hr>

أخبار سارّة! هذا كل ما نحتاجه لإنشاء صفحتنا الأولى في AMP، لكن ليس هناك الكثير مما يجري، بطبيعة الحال، في النص الأساسي حتى اللحظة. في القسم التالي، سوف نتناول كيفية إضافة أساسيات، مثل الصور وعناصر AMP المخصصة، وكيفية إضفاء نمط على صفحتك، وتطوير تنسيق سريع الاستجابة.
