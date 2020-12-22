---
"$title": Preview and validate
"$order": '5'
description: "يمكن معاينة صفحة AMP تمامًا مثلما تعاين أي موقع ويب HTML ثابت آخر. لا توجد خطوة إنشاء أو معالجة مسبقة مطلوبة. يمكنك اختيار إما:..."
author: pbakaus
contributors:
- bpaduch
---

## المعاينة

يمكن معاينة صفحة AMP تمامًا مثلما تعاين أي موقع ويب HTML ثابت آخر. لا توجد خطوة إنشاء أو معالجة مسبقة مطلوبة. يمكنك اختيار إما:

- **فتح الصفحة مباشرةً في المتصفح من نظام الملفات** (قد لا تعمل بعض العناصر بسبب فشل XMLHttpRequests).
- **استخدام خادم ويب محلي، مثل Apache 2 أو Nginx**. *(تلميح: لتسريع خادم الويب، شغّل<span dir="ltr" class="nowrap"><code>python -m SimpleHTTPServer</code></span>.)*

## التحقق

بعد ذلك، تأكّد من أن صفحة AMP **صفحة AMP صالحة بالفعل**، وإلا فلن يتم اكتشافها وتوزيعها بواسطة منصات الأطراف الثالثة، مثل بحث Google. للتحقق:

1. افتح صفحتك في متصفحك.
2. أضف "
    <span dir="ltr" class="nowrap"><code>#development=1</code></span>" إلى عنوان URL، على سبيل المثال،
    <span dir="ltr" class="nowrap"><code>http://localhost:8000/released.amp.html#development=1</code></span>.
3. افتح [وحدة تحكم <span dir="ltr" class="nowrap">Chrome DevTools</span>](https://developers.google.com/web/tools/chrome-devtools/debug/console/) وابحث عن أخطاء التحقق من الصحة.

[tip type="read-on"] <strong>تابع قراءة –</strong> <a>تعلم المزيد حول التحقق من الصحة</a>، وماذا تفعل عندما تظهر أخطاء. [/tip]
