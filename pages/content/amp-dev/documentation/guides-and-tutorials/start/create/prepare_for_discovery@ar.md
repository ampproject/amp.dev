---
"$title": Prepare your page for discovery and distribution
"$order": '4'
description: 'في بعض الحالات، قد تحتاج إلى امتلاك إصدار تابع لـ AMP وآخر غير تابع لها من الصفحة، مثل مقالة إخبارية. ضع هذا في حسبانك: إذا عثر بحث Google على ...'
author: pbakaus
contributors:
- bpaduch
---

في بعض الحالات، قد تحتاج إلى امتلاك إصدار تابع لـ AMP وآخر غير تابع لها من الصفحة، مثل مقالة إخبارية. ضع هذا في حسبانك: إذا عثر بحث Google على الإصدار غير التابع لـ AMP من تلك الصفحة، *فكيف يعرف بوجود إصدار تابع لـ AMP منها*؟

## ربط الصفحات باستخدام <code><link></code>

للتأكيد على أنه يجب معاملة الإصدار غير التابع من صفحة AMP وصفحة AMP على أنهما "مقترنين" معًا، نضيف المعلومات بشأن صفحة AMP إلى الصفحة غير التابعة لـ AMP، والعكس صحيح، في شكل علامات `<link>` في `<head>`.

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

[tip type="read-on"] **تابع القراءة –** تعلم المزيد حول كيف يعثر Google على صفحات AMP في [إرشادات بحث Google لصفحات AMP](https://support.google.com/webmasters/answer/6340290). [/tip]
