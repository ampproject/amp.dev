---
$title: تضمين صورة
---

يمكن استخدام معظم علامات HTML مباشرةً في <span dir="ltr" class="nowrap">AMP HTML</span>، لكن بعض العلامات، مثل علامة `<img>`، يتم استبدالها بعلامات <span dir="ltr" class="nowrap">AMP HTML</span> مكافئة أو مخصصة محسّنة بعض الشيء (وتم حظر بضع العلامات المسببة للأخطاء حظرًا تامًا، انظر [علامات HTML في المواصفة](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).

لتوضيح المظهر الذي يمكن أن يبدو عليه الترميز الإضافي، إليك الشفرة المطلوبة لتضمين صورة في الصفحة:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

للتعرّف على أسباب إقدامنا على استبدال العلامات، مثل استبدال `<img>` بـ [`<amp-img>`](../../../../documentation/components/reference/amp-img.md)، وكم عدد المتاح منها، يُرجى الانتقال إلى [تضمين إطارات Iframe والوسائط](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md).
