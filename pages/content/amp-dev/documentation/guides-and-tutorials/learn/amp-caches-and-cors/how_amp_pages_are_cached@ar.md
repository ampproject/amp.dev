---
"$title": كيف يتم عمل تخزين مؤقت لصفحات AMP
"$order": '0'
description: في هذا المستند، سوف تتعرف على دور ذاكرة AMP للتخزين المؤقت في منظومة AMP المتكاملة، وكيف يتم عمل تخزين مؤقت لصفحة AMP الخاصة بك.
formats:
- websites
- stories
- ads
---

في هذا المستند، سوف تتعرف على دور ذاكرة AMP للتخزين المؤقت في منظومة AMP المتكاملة، وكيف يتم عمل تخزين مؤقت لصفحة AMP الخاصة بك.

## ما هي ذاكرة AMP للتخزين المؤقت؟

ذاكرة AMP للتخزين المؤقت هي شبكة تسليم محتوى (CDN) تعتمد على الوكيل لتسليم مستندات AMP صالحة. صممت ذاكرات AMP للتخزين المؤقت لأجل:

1. خدمة صفحات AMP صالحة فقط.
2. السماح بتحميل صفحات AMP مسبقًا بكفاءة وأمان.
3. تنفيذ تحسينات أداء إضافية على المحتوى مفيدة للمستخدم.

[tip type="note"] مستندات بريد AMP الإلكتروني هي مثال من ذاكرة AMP للتخزين المؤقت. [/tip]

تعلم المزيد حول ذاكرات AMP للتخزين المؤقت في فيديو يوتيوب أدناه، أو في منشور مدونة [لماذا توجد ذاكرات AMP للتخزين المؤقت](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456).

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='Watch this video to learn why AMP Caches exist.']

## ما هي ذاكرات AMP للتخزين المؤقت المتوفرة؟<br />يوجد حاليًا مزودان لذاكرة التخزين المؤقت لصفحات AMP:<[br />ذاكرة Google AMP للتخزين ا](https://developers.google.com/amp/cache/)لمؤقت

يوجد حاليًا مزودان لذاكرة التخزين المؤقت لصفحات AMP:

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

يمثل AMP نظامًا متكاملا مفتوحًا فيما يشجع AMP بنشاط على تطوير المزيد من ذاكرات AMP للتخزين المؤقت. لتعلم الم[زيد حول  إنشاء](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c) ذاكرات AMP للتخزين المؤقت، راجع [إرشادات ذاكرة AMP للتخزين المؤقت](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).<br>ذاكرة Bing AMP

## كيف أختار ذاكرة AMP للتخزين المؤقت؟

كناشر، أنت لا تختار ذاكرة AMP للتخزين المؤقت، وإنما تقوم *المنصة فعليا* بالربط بالمحتوى الخاص بك والذي يختار ذاكرة AMP للتخزين المؤقت (إن وجدت) المطلوب استخدامها.

This is an inversion of the typical model where content delivery is the responsibility of the publisher.  However, this model allows platforms to provide their users with predictable load performance and among other things allows them to ensure required security and privacy invariants during AMP’s pre-rendering phase. To learn about the strict guidelines for creating AMP Caches, see the [AMP Cache Guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## هل يمكنني الانسحاب من ذاكرة التخزين المؤقت؟

Caching is a core part of the AMP ecosystem. Publishing a valid AMP document automatically opts it into cache delivery.

Should you desire not to have your document cached, one option is to remove the `amp` attribute from the HTML tag. This makes the document technically invalid AMP, while not impacting the functionality of the document.

## من يطالب بصفحات AMP المخزنة مؤقتًا؟

يمكن لمنصات (مثل بحث Google وGoogle News وBing) وتطبيقات المحمول الوصول إلى صفحات AMP المخزنة مؤقتًا. ويمكن أن ترتبط تطبيقات المحمول بمحتوى AMP المخزن مؤقتًا عن طريق URL (انظر [واجهة برمجة تطبيقات AMP URL](https://developers.google.com/amp/cache/use-amp-url)) من Google أو عن طريق وحدات XHR العابرة للأصول في تطبيقات الويب التقدمية (تعلم المزيد في [تضمين واستخدام AMP كبيانات مصدر](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)).

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## كيف يتم عمل تخزين مؤقت لصفحة AMP الخاصة بي؟

By using the AMP format, you are making your content available to be cached by AMP Caches. There are a few ways that your AMP page can end up in an AMP Cache:

- **الاكتشاف من المنصة**:  تكتشف المنصات محتوى AMP الخاص بك عن طريق علامة `<html ⚡>` أو `<html amp>` وتقوم بعمل تخزين مؤقت للمحتوى. على سبيل المثال، يسجل Google Search المحتوى؛ ومع أي صحفة AMP صالحة ومحددة، تتم إضافة المحتوى إلى ذاكرة Google AMP للتخزين المؤقت.

- **Cache URL request**: Platforms can specifically request an AMP page by using the AMP Cache URL format.  The AMP Cache acts as a reverse proxy, therefore, when the platform accesses the page, it results in the page being cached automatically.

    - Google AMP Cache URL example: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"] **ملاحظة –** عنوان URL لذاكرة AMP للتخزين المؤقت ليس عنوان URL للتعامل مع المستخدم، بمعنى، أن المستخدمين في العادة لا يطلب المحتوى عن طريق عناوين URL هذه. [/tip]

- **Publisher addition**: Publishers can specifically add the AMP page to the AMP Cache.  This option is applicable only to the Google AMP Cache (see [Google AMP Cache: Update AMP Content](https://developers.google.com/amp/cache/update-cache)).

## موارد إضافية

- [AMP Project's AMP Cache guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)
- [Google AMP Cache overview](https://developers.google.com/amp/cache/overview)
- [Bing AMP Cache Documentation](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
