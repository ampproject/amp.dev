---
"$title": بناء صفحة HTML عادية
"$order": '1'
description: في دليل المشروع، ستجد ملفًا باسم article.html. وهذا عبارة عن مقال إخباري ننشئ فيه صفحة مكافئة لصفحات AMP من أجل ...
---

في دليل المشروع، ستجد ملفًا باسم [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) وهذا عبارة عن مقال إخباري ننشئ فيه صفحة مكافئة لصفحات AMP من أجل

1. **نسخ** رمز ملف `article.html `بأكمله ولصقه في ملف جديد.
2. **حفظ** الملف الجديد على أنه `article.amp.html`.

[tip type="note"] **ملحوظة–** ليس عليك تسمية ملفات AMP باسم `.amp.html`. في الواقع، يمكن أن تحتوي ملفات AMP على أي امتداد ترغب فيه، ومن الشائع رؤية الناشرين يفرقون بين صفحات AMP وإصداراتها الأساسية باستخدام المعلمات في عنوان URL. على سبيل المثال: `http://publisher.com/article.html?amp`. [/tip]

يجب أن يكون ملف `article.amp.html` الخاص بك على النحو التالي:

```html
<!doctype html>
<html lang="en">
  <head>

    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>
    </article>
    <img src="mountains.jpg">
  </body>
</html>
```

هذه صفحة مبسطة عن قصد بها عناصر مقالات إخبارية ثابتة شائعة: CSS وJavaScript وعلامة صور.

وتُعد نسخة AMP من المقال مجرد نسخة من المقال الأصلي في الوقت الحالي، دعنا نحولها إلى AMP.

للبدء، سنضيف ملف مكتبة AMP، وهذا وحده لن يجعل ملفك الجديد صفحة AMP صالحة، لكننا سنرى أدناه الطريقة التي يمكن أن تساعدنا مكتبة AMP بها في معرفة ما نحتاج إلى القيام به لإصلاح ذلك الأمر.

لتضمين مكتبة AMP، **أضف** هذا السطر إلى أسفل علامة `<head>`:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

**حمِّل** صفحة `article.amp.html` الجديدة في متصفحك من [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html) ثم **افتح** [وحدة تحكم المطور](https://developer.chrome.com/devtools/docs/console) في Chrome (أو متصفحك المفضل).

عند فحص خرج JavaScript في وحدة تحكم المطور، (تأكد من تحديد علامة التبويب وحدة التحكم)، يجب أن ترى إدخال السجل التالي:

```text
Powered by AMP ⚡ HTML
```

تتضمن مكتبة AMP [أداة التحقق من صحة AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) والتي ستخبرك إذا كان هناك أي شيء يمنع صفحتك من أن تكون مستند AMP صالحًا. **مكِّن** أداة التحقق من صحة AMP عن طريق إضافة معرِّف الجزء التالي إلى عنوان URL للمستند:

```text
#development=1
```

على سبيل المثال:

```text
http://localhost:8000/article.amp.html#development=1
```

في وحدة تحكم المطور، من المفترض أن تتلقى العديد من أخطاء التحقق من الصحة (قد تحتاج إلى تحديث الصفحة يدويًا في متصفحك للاطلاع على هذه الأخطاء):

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='AMP validation errors for our sample') }}

لجعل هذا مستند AMP صالحًا، سيتعين علينا إصلاح كل هذه الأخطاء؛ وهو بالضبط ما سنفعله في codelab هذا.

,قبل أن نقوم بهذا الأمر، دعنا **نحاكي** تجربة جهاز هاتف محمول في أدوات مطوري المتصفح لأننا نعمل على مقال إخباري للهاتف المحمول. على سبيل المثال، في Chrome DevTools، انقر فوق رمز الهاتف المحمول، وحدد جهازًا محمولًا من القائمة.

يجب أن ترى دقة محاكاة الهاتف المحمول في متصفحك على النحو التالي:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Mobile simulation of our AMP page') }}

إننا جاهزون الآن للعمل! دعنا نتصفح أخطاء التحقق من الصحة واحدة تلو الأخرى ونتناول طريقة ارتباطها بـ AMP.
