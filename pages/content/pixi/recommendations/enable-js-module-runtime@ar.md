---
$title: استخدام إصدار وحدة JavaScript الخاصة بوقت تشغيل AMP
$order: 25
tags:
- lcp
- fid
---

من المهم احترام مستخدميك والنطاق الترددي لديهم. إذ يمكن أن يؤدي استخدام [وحدات JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) إلى إحداث فرق إيجابي كبير في أداء صفحتك في متصفحات الويب الحديثة. ويمكنك تفعيل إصدار وحدة JavaScript من وقت تشغيل AMP بالإضافة إلى مكونات AMP باستخدام علامة [`experimentEsm`](https://www.npmjs.com/package/@ampproject/toolbox-optimizer#experimentesm) مع أحدث إصدار من [أداة تحسين AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/). ويؤدي الحفاظ على تطبيقك محدثًا إلى تقسيم برامج JavaScript إلى وحدات منفصلة، ولا يستورد إلا ما هو مطلوب! يرجى ملاحظة أنه نظرًا لأن هذه الميزة تجريبية (سيتم إطلاقها قريبًا!)، فإن استخدام هذه الميزة سيجعل صفحة AMP الخاصة بك غير صالحة.
