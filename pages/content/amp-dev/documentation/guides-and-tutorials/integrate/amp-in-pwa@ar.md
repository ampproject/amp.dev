---
'$title': استخدام AMP كمصدر بيانات لتطبيق الويب التقدمي (PWA)
$order: 1
description: إذا استثمرت في AMP ولكنك لم تبني بعد تطبيق ويب تراكمي، فإن صفحات AMP يمكن أن تبسط بصورة كبيرة عملية التطوير لديك إلى تطبيق ويب تراكمي.
formats:
  - websites
author: pbakaus
---

إذا استثمرت في AMP ولكنك لم تبني بعد تطبيق ويب تراكمي، فإن صفحات AMP يمكن أن تبسط بصورة كبيرة عملية التطوير لديك إلى تطبيق ويب تراكمي. في هذا الدليل سوف تتعلم كيف تستهلك AMP داخل تطبيق الويب التراكمي واستخدام صفحات AMP الموجودة لديك كمصدر بيانات.

## من JSON إلى AMP

في السيناريو الأكثر شيوعًا، يكون تطبيق الويب التراكمي عبارة عن تطبيق من صفحة فردية يتصل بواجهة برمجة تطبيقات JSON عن طريق Ajax. ترجع واجهة برمجة تطبيقات JSON هذه مجموعات من البيانات لتوجيه التنقل، والمحتوى الفعلي لإظهار المقالات.

وعليك بعد ذلك المتابعة وتحويل المحتوى الخام إلى HTML قابل للاستخدام وعرضه على العميل. هذه العملية مكلفة ويصعب صيانتها في العادة. بدلا من ذلك، يمكنك إعادة استخدام صفحات AMP الموجودة بالفعل كمصدر بيانات. والأفضل من ذلك كله، أن AMP يسهل تنفيذ ذلك من خلال بضع سطور من الرموز البرمجية.

## تضمين "AMP ظل" في تطبيق الويب التراكمي

تتمثل الخطوة الأولى في تضمين إصدار خاص من AMP يسمى "AMP الظل" في تطبيق الويب التراكمي الخاص بك. نعم، هذا صحيح – أنت تقوم بتحميل مكتبة AMP إلى صفحة المستوى الأعلى، ولكنك لا تريد بالفعل التحكم في محتوى المستوى الأعلى. إنه يقوم فقط "بتضخيم" أجزاء من الصفحة الخاصة بنا والتي تخبر بها.

قم بتضمين AMP ظل في رأس الصفحة، مثل:

[sourcecode:html]

<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>

[/sourcecode]

### كيف تعرف أن واجهة برمجة التطبيقات لـ AMP الظل جاهزة للاستخدام؟

نوصي بأن تقوم بتحميل مكتبة AMP الظل باستخدام السمة `async`. هذا يعني أنه يتعين عليك استخدام نهج خاص لفهم متى يتم تحميل المكتبة بالكامل ومتى تصبح جاهزة للاستخدام.

الإشارة الصحيحة التي يلزم ملاحظتها هي توفر متغير `AMP` العمومي، فيما يستخدم AMP الظل “[نهج تحميل الوظيفة غير المتزامن](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)” للمساعدة في هذا الأمر. فكر في استخدام هذا الرمز:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
// AMP is now available.
});
[/sourcecode]

سوف يعمل هذا الرمز وسيتم إطلاق أي عدد من مرات رد الاتصال المضافة بهذه الطريقة عندما يكون AMP متوفرًا، ولكن لماذا؟

يُترجم هذا الرمز إلى:

1. "إذا كان window.AMP غير موجود، فقم بإنشاء صفيف فارغ ليحل محله"
2. "ثم ادفع وظيفة رد الاتصال إلى الصفيف الذي يجب تنفيذه عندما يكون AMP جاهزًا"

سوف يعمل لأن مكتبة AMP الظل سوف تدرك عند التحميل، أن هناك بالفعل صفيف من مرات رد الاتصال تحت `window.AMP`، ثم تعالج قائمة الانتظار بأكملها. إذا قمت لاحقًا بتنفيذ نفس الوظيفة مرة أخرى، فسوف تظل تعمل، نظرًا لأن AMP يستبدل `window.AMP` بنفسه ويستخدم طريقة <code>push</code> مخصصة والتي تبسط تشغيل رد الاتصال مباشرة.

[tip type="tip"] **تلميح –** لجعل الرمز السابق من الممارسات السهلة، نوصي أن تقوم بطيه إلى Promise، ثم استخدم دائمًا Promise المذكور قبل التعامل مع تطبيق برمجة التطبيقات لـ AMP. راجع [رمز React التجريبي](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20) على سبيل المثال. [/tip]

## معالجة التنقل في تطبيق الويب التراكمي

ستظل تحتاج إلى تنفيذ هذه الخطوة يدويًا. وعمومًا، الأمر يعود إليك في اختيار طريقة عرض الارتباطات إلى المحتوى في مفهوم التنقل الخاص بك. إما عدد من القوائم؟ أو حزمة بطاقات؟

في السيناريو الشائع، سوف تجلب بعض رموز JSON التي ترجع عناوين URL المطلوبة مع بعض بيانات التعريف. وفي النهاية، يجب أن ينتهي بك الحال برد اتصال الوظيفة الذي يتم إطلاقه عندما ينقر المستخدم فوق أحد الارتباطات، ويجب أن يتضمن رد الاتصال المذكور عنوان URL لصفحة AMP المطلوبة. إذا كان لديك ذلك، فإنك تصبح جاهزًا للخطوة النهائية.

## استخدام واجهة برمجة التطبيقات لـ AMP الظل لعرض صفحة مدمجة

في النهاية، عندما تريد عرض المحتوى بعد إجراء من المستخدم، فقد حان الوقت لجلب مستند AMP المتعلق وترك AMP الظل يتولى الأمور. قم أولا بتنفيذ وظيفة لجلب الصفحة، والتي تشبه هذه الوظيفة:

[sourcecode:javascript]
function fetchDocument(url) {

// unfortunately fetch() does not support retrieving documents,
// so we have to resort to good old XMLHttpRequest.
var xhr = new XMLHttpRequest();

return new Promise(function(resolve, reject) {
xhr.open('GET', url, true);
xhr.responseType = 'document';
xhr.setRequestHeader('Accept', 'text/html');
xhr.onload = function() {
// .responseXML contains a ready-to-use Document object
resolve(xhr.responseXML);
};
xhr.send();
});
}
[/sourcecode]

[tip type="important"] **مهم –** لتبسيط مثال الرمز السابق، تخطينا معالجة الأخطاء. يجب أن تتأكد دائمًا من التقاط ومعالجة الأخطاء بذكاء. [/tip]

الآن لدينا كائن `Document` الجاهز، وحان الوقت لترك AMP يتولى الأمور ويعرضه. احصل على مرجع إلى عنصر DOM الذي يعمل كحاوية لمستند AMP، ثم قم باستدعاء `AMP.attachShadowDoc()`، كالتالي:

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
// Let AMP take over and render the page
var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] **تلميح –** قبل أن تسلم المستند بالفعل إلى AMP، يعتبر الوقت الآن مثاليًا لإزالة عناصر الصفحة التي تكون معقولة عند عرض صفحة AMP وحدها، ولكن ليس في الوضع المضمن: على سبيل المثال عناصر الرأس والتذييل. [/tip]

وهذا كل ما في الأمر! يتم عرض صفحة AMP كصفحة فرعية لتطبيق الويب التراكمي الإجمالي الخاص بك.

## التنظيف

تتمثل الفرص في أن المستخدمين سوف ينتقلون من AMP إلى AMP داخل تطبيق الويب التراكمي الخاص بك. عند التخلص من صفحة AMP، التي تم عرضها في السابق تأكد من إخبار AMP بذلك، كالتالي:

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

هذا سوف يخبر AMP أنك لم تعد تستخدم هذا المستند بعد الآن وسوف يخلي الذاكرة ويزيل العبء عن وحدة المعالجة المركزية.

## شاهد عمليًا

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

يمكنك مشاهدة نموذج "AMP في PWA" عمليًا في [مثال React](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) الذي بنيناه. إنه يظهر التحولات السلسة أثناء التنقل ويجلب مكون React بسيط يطوي الخطوات السابقة. إنه يجمع أفضل الطرق – رمز JavaScript المرن والمخصص في تطبيق الويب التراكمي، وAMP لتوجيه المحتوى.

- التقط رمز المصدر هنا: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
- استخدم مكون React المستقل عن طريق npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
- شاهده عمليًا هنا: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (الأفضل على محاكاة لهاتفك أو جهازك المحمول)

يمكنك أيضًا عرض مثال لتطبيق الويب التقدمي (PWA) وAMP باستخدام إطار عمل Polymer. يستخدم المثال [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) لتضمين صفحات AMP.

- التقط الرمز من هنا: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
- شاهده عمليًا من هنا: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)
