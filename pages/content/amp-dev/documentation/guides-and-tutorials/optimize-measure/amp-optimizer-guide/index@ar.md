---
"$title": استخدام أداة AMP Optimizer
"$order": '2'
"$hidden": 'true'
description: أدوات AMP Optimizer هي أدوات توفر تحسينات في ذاكرة التخزين المؤقت لصفحات AMP لموقعك. يُعد استخدام أداة AMP Optimizer أمرًا أساسيًا لإنشاء تجربة رائعة للصفحة وتحقيق الامتثال "لأصول الويب الأساسية". يوضح هذا الدليل كيفية استخدام أداة AMP Optimizer على أفضل وجه لتحسين صفحات AMP.
formats:
- websites
- stories
author: sebastianbenz
---

أداوت AMP Optimizer هي أدوات توفر تحسينات في ذاكرة التخزين المؤقت لصفحات AMP لموقعك. يُعد استخدام أداة AMP Optimizer عاملاً أساسيًا في خلق [تجربة صفحة](https://developers.google.com/search/docs/guides/page-experience) رائعة وتحقيق التوافق مع [أصول الويب الأساسية](https://web.dev/vitals/). إذا كنت تريد معرفة المزيد حول كيفية عمل أداة AMP Optimizer، فاطّلع على [دليل تحسينات AMP التفصيلي](explainer.md).

## أليس AMP سريعًا بالفعل؟

قد تفكر: مهلاً – أليس من المفترض أن يكون AMP سريعًا خارج الصندوق؟ وستكون محقًا في ذلك: تم تحسين وقت تشغيل AMP للسرعة وتحميل جميع صفحات AMP الصالحة بسرعة. ومع ذلك، هناك تحسينات إضافية للأداء يمكنك تنفيذها على خادمك لمساعدة المستعرض في تحميل صفحات AMP بشكل أسرع.

في البداية، كانت تعرض ذاكرات التخزين المؤقت لصفحات AMP غالبية صفحات AMP. أجرت ذاكرات التخزين المؤقت هذه تحسينات إضافية على الصفحات لضمان تجربة مستخدم قوية. ولكن بمرور الوقت، بدأت المزيد من الأسطح في الارتباط بصفحات AMP وبدأ المطورون في إنشاء مواقع إلكترونية كاملة باستخدام AMP. لهذا السبب بدأ فريق AMP العمل على "أدوات تحسين AMP" للسماح للجميع بخدمة صفحات AMP مع ذاكرة التخزين المؤقت AMP مثل الأداء على أصلهم.

## تكامل أداة AMP Optimizer

هناك ثلاث طرق لاستخدام أداة تحسين AMP:

1. استخدم منشئ موقع أو نظام إدارة محتوى (CMS) مع تكامل أداة تحسين مدمجة.
2. يمكنك جعل أداة AMP Optimizer تتكامل مع نظام الإنشاء أو الخادم لديك.
3. يمكنك جعل أداة AMP Optimizer تتكامل بيئة الاستضافة الخاصة بك.

### أدوات إنشاء الموقع ونظام إدارة المحتوى

أفضل طريقة لنشر AMP المحسّن هي استخدام منشئ الموقع أو نظام إدارة المحتوى (CMS) مع دعم "أداة AMP Optimizer" المدمجة. في هذه الحالة، سيتم تحسين صفحات AMP تلقائيًا. حاليًا، تدمج مولدات المواقع وأنظمة إدارة المحتوى التالية "أداة AMP Optimizer":

- [WordPress](https://wordpress.org/) عبر [المكون الإضافي من AMP WordPress](https://wordpress.org/plugins/amp/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/) عبر [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/)
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### عمليات تكامل مخصصة للإنشاء أو الخادم

يمكنك أيضًا دمج AMP Optimizer بنفسك. تتوفر العديد من إضافات AMP Optimizer مفتوحة المصدر:

- [AMP Optimizer (Node.js)](node-amp-optimizer.md): هي عبارة عن مكتبة تستند إلى Node.js لإنتاج صفحات AMP محسنة. تحقق من دليل البدء الخاص بنا هنا على amp.dev. يتم صيانة هذه الإضافة من خلال فريق AMP.
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer): وهو عبارة عن منفذ Python الخاص بعقدة AMP Optimizer.

هناك عمليات تكامل مختلفة للصفحات التي يتم عرضها ديناميكيًا بواسطة الخادم والمواقع الثابتة:

1. **وقت الإنشاء**: للمواقع الثابتة، من الأفضل تحسين صفحات AMP كجزء من الإصدار. يُعد هذا الأسلوب مثاليًا لأن تحسين صفحات AMP لا يؤثر على أداء العرض. اطّلع على [ ](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp)[هذا المثال لتكامل أداة AMP Optimizer + Gulp](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp).
2. **وقت العرض**: إذا كانت مواقع الويب تتمتع بطبيعة أكثر ديناميكية أو غير قادرة على تطبيق التحويلات بشكل ثابت، فيمكن إجراء التحسين بعد عرض مستندات AMP في الخادم. في هذه الحالة، لضمان أوقات عرض سريعة، من الأفضل تخزين الصفحات المحولة مؤقتًا للطلبات اللاحقة. يمكن أن يحدث التخزين المؤقت على مستوى شبكة تسليم المحتوى (CDN)، أو على البنية الأساسية الداخلية للموقع (على سبيل المثال: Memcached)، أو حتى على الخادم نفسه، إذا كانت مجموعة الصفحات صغيرة بما يكفي لتناسب الذاكرة. لمعرفة المزيد حول هذا النهج، اطّلع على [هذا العرض التوضيحي لدمج "أداة AMP Optimizer" في Express.JS](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express).

### عمليات تكامل مزوّد الاستضافة

يسمح بعض مزوّدي الاستضافة بتشغيل منطق مخصص عند نشر صفحة ويب أو عرضها. يمكن أن يكون هذا خيارًا رائعًا لتكامل أداة تحسين AMP. أمثلة التكامل هي:

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [عمال Cloudflare](https://workers.cloudflare.com/) ([تأتي قريبًا](https://github.com/ampproject/amp-toolbox/issues/878))
- صورة عامل إرساء AMP ([تأتي قريبًا](https://github.com/ampproject/amp-toolbox/issues/879))
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
