---
"$title": Include an image
"$order": '2'
description: يمكن استخدام معظم علامات HTML مباشرةً في AMP HTML ولكن بعض العلامات مثل علامة <img> ، يتم استبدالها بعلامات AMP HTML مكافئة أو مخصصة محسنة بعض الشيء.
author: pbakaus
contributors:
- bpaduch
---

يمكن استخدام معظم علامات HTML مباشرةً في <span dir="ltr" class="nowrap">AMP HTML</span>، لكن بعض العلامات، مثل علامة `<img>`، يتم استبدالها بعلامات <span dir="ltr" class="nowrap">AMP HTML</span> مكافئة أو مخصصة محسّنة بعض الشيء (وتم حظر بضع العلامات المسببة للأخطاء حظرًا تامًا، انظر [علامات HTML في المواصفة](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).

لتوضيح المظهر الذي يمكن أن يبدو عليه الترميز الإضافي، إليك الرمز المطلوبة لتضمين صورة في الصفحة:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

[tip type="read-on"] **تابع قراءة –** للتعرّف على أسباب إقدامنا على استبدال العلامات، مثل استبدال `<img>` بـ [`<amp-img>`](../../../../documentation/components/reference/amp-img.md)، وكم عدد المتوفر منها زر [تضمين الصور والفيديو](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md). [/tip]
