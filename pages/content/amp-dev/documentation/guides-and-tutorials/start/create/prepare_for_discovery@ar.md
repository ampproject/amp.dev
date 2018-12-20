---
$title: تحضير صفحتك للاكتشاف والتوزيع
---

في بعض الحالات، قد تحتاج إلى امتلاك إصدار تابع لـ AMP وآخر غير تابع لها من الصفحة، مثل مقالة إخبارية. ضع هذا في حسبانك: إذا عثر بحث Google على الإصدار غير التابع لـ AMP من تلك الصفحة، *فكيف يعرف بوجود إصدار تابع لـ AMP منها*؟

## ربط الصفحات بـ &lt;link>

لحل هذه المشكلة، نضيف المعلومات بشأن صفحة AMP إلى الصفحة غير التابعة لـ AMP، والعكس صحيح، في شكل علامات `<link>` في `<head>`.

أضف ما يلي إلى الصفحة غير التابعة لـ AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

وهذا لصفحة AMP

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## ماذا إن كان المتوفر لدي صفحة واحدة فقط؟

إذا كانت لديك صفحة واحدة فقط، وكانت هذه الصفحة صفحة AMP، يجب عليك مع ذلك إضافة رابط متعارف عليه إليها، وهو ما يجعلها ببساطة تشير إلى نفسها:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/preview_and_validate.md', locale=doc.locale).url.path}}"><span class="arrow-prev">سابق</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/publish.md', locale=doc.locale).url.path}}"><span class="arrow-next">التالى</span></a>
</div>
