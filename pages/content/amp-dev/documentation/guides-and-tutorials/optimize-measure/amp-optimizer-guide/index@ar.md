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

## Isn’t AMP already fast?

You may be thinking: wait – isn’t AMP supposed to be fast out-of-the-box? And you would be right: the AMP runtime is optimized for speed and all valid AMP pages load fast. However, there are additional performance optimizations you can implement on your server to help the browser load AMP pages even faster.

In the beginning, AMP caches served the majority of AMP pages. These caches performed additional optimizations on pages to guarantee a strong user experience. But, over time, more surfaces started linking to AMP pages and developers began building entire websites with AMP. That's why the AMP team has started working on AMP Optimizers to allow everyone to serve AMP pages with AMP Cache like performance on their own origin.

## تكامل أداة AMP Optimizer

There are three ways to use an AMP optimizer:

1. Use a site generator or CMS with a built-in optimizer integration.
2. يمكنك جعل أداة AMP Optimizer تتكامل مع نظام الإنشاء أو الخادم لديك.
3. يمكنك جعل أداة AMP Optimizer تتكامل بيئة الاستضافة الخاصة بك.

### CMS & Site Generators

أفضل طريقة لنشر AMP المحسّن هي استخدام منشئ الموقع أو نظام إدارة المحتوى (CMS) مع دعم "أداة AMP Optimizer" المدمجة. في هذه الحالة، سيتم تحسين صفحات AMP تلقائيًا. حاليًا، تدمج مولدات المواقع وأنظمة إدارة المحتوى التالية "أداة AMP Optimizer":

- [WordPress](https://wordpress.org/) via the [AMP WordPress Plugin](https://wordpress.org/plugins/amp/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/) via the [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/)
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### Custom Build or Server Integrations

يمكنك أيضًا دمج AMP Optimizer بنفسك. تتوفر العديد من إضافات AMP Optimizer مفتوحة المصدر:

- [AMP Optimizer (Node.js)](node-amp-optimizer.md): هي عبارة عن مكتبة تستند إلى Node.js لإنتاج صفحات AMP محسنة. تحقق من دليل البدء الخاص بنا هنا على amp.dev. يتم صيانة هذه الإضافة من خلال فريق AMP.
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer): a Python port of the Node AMP Optimizer.

There are different integrations for pages rendered dynamically by your server and static sites:

1. **وقت الإنشاء**: للمواقع الثابتة، من الأفضل تحسين صفحات AMP كجزء من الإصدار. يُعد هذا الأسلوب مثاليًا لأن تحسين صفحات AMP لا يؤثر على أداء العرض. اطّلع على [ ](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp)[هذا المثال لتكامل أداة AMP Optimizer + Gulp](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp).
2. **وقت العرض**: إذا كانت مواقع الويب تتمتع بطبيعة أكثر ديناميكية أو غير قادرة على تطبيق التحويلات بشكل ثابت، فيمكن إجراء التحسين بعد عرض مستندات AMP في الخادم. في هذه الحالة، لضمان أوقات عرض سريعة، من الأفضل تخزين الصفحات المحولة مؤقتًا للطلبات اللاحقة. يمكن أن يحدث التخزين المؤقت على مستوى شبكة تسليم المحتوى (CDN)، أو على البنية الأساسية الداخلية للموقع (على سبيل المثال: Memcached)، أو حتى على الخادم نفسه، إذا كانت مجموعة الصفحات صغيرة بما يكفي لتناسب الذاكرة. لمعرفة المزيد حول هذا النهج، اطّلع على [هذا العرض التوضيحي لدمج "أداة AMP Optimizer" في Express.JS](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express).

### Hosting Provider Integrations

Some hosting providers allow running custom logic when deploying or serving a webpage. This can be a great option to integrate AMP Optimizer. Example integrations are:

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/) ([coming soon](https://github.com/ampproject/amp-toolbox/issues/878))
- AMP Optimizer Docker Image ([coming soon](https://github.com/ampproject/amp-toolbox/issues/879))
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
