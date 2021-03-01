---
'$title': تكامل أداة التحليلات لديك مع AMP
$order: 1
formats:
  - websites
  - stories
teaser:
  text: نظرة عامة
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## نظرة عامة <a></a>

إذا كنت تستخدم أداة توفير البرامج كخدمة للناشرين لفهم الزيارات فهمًا أفضل، فقد ترغب في دمج خدمتك في `amp-analytics`. إذ سيمكِّن هذا الدمج عملائك من عرض أنماط الزيارات لصفحات AMP HTML الخاصة بهم.

## قبل البدء <a name="before-you-begin"></a>

قبل أن تتمكن من إضافة خدمة التحليلات إلى وقت تشغيل AMP HTML ، قد تحتاج إلى:

- تحديد أنواع [المتغيرات](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md) و[الطلبات](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#requests) التي ستحتاجها في مستند AMP HTML لخدمة التحليلات لديك.
- تحديد ما إذا كانت الوظيفة الإضافية للتجميع مطلوبة لإنشاء عنوان url النهائي في حالة استخدام الطلبات بسلوك التجميع.
- الوضع في الحسبان ما إذا كنت ستقوم [بتتبع المستخدمين عبر](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md) سياقات AMP للطرف الأول والطرف الثالث وطريقة القيام بذلك.
- تحديد طريقة تعامل لوحة بيانات التحليلات مع زيارات AMP.
- تحديد أي وظائف مفقودة في `amp-analytics`، و[طلبات الملفات](https://github.com/ampproject/amphtml/issues/new) للميزات المطلوبة.
- ترسل تحليلات AMP متغيراتها إلى نقطة نهاية مسبقة التكوين. إذا لم يكن لديك نقطة نهاية حالية بالفعل، فراجع [هذا النموذج](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample) للحصول على نظرة عامة حول طريقة إنشاء نقطة نهاية.
  - بالنسبة إلى كل أنواع النقل باستثناء `iframe`، يتم إرسال المتغيرات كمعلمات سلسلة استعلامات في طلب HTTPS.
  - أما بالنسبة لنوع النقل `iframe`، يتم إنشاء iframe وإرسال المتغيرات إليه عبر `window.postMessage`. ولا يلزم في هذه الحالة أن تكون الرسالة عبارة عن عنوان URL. إذ إن هذا الخيار متاح فقط للبائعين المعتمدين من مجلس تقييم الوسائط (MRC).
- تدبر في طريقة تأثير التكامل مع `amp-analytics` على أي سياسات (خاصة سياسة الخصوصية) أو الاتفاقيات التي قد تكون لديك.

## إضافة التهيئة الخاصة بك إلى وقت تشغيل AMP HTML <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. أنشئ [إصدار انتواء التنفيذ](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features) يفيد بأنك ستضيف تكوين خدمة التحليلات إلى وقت تشغيل AMP HTML. وتأكد من تضمين**cc @ampproject/wg-analytics** في الوصف الخاص بك.
2. طوِّر تصحيحًا من شأنه تنفيذ ما يلي:
   1. ملف json جديد للتهيئة `${vendorName}.json` في [مجلد](https://github.com/ampproject/amphtml/tree/master/extensions/amp-analytics/0.1/vendors) البائعين بما في ذلك أي خيارات تتجاوز الإعداد الافتراضي، مثل:
      1. `"vars": {}` للمتغيرات الافتراضية الإضافية.
      2. `"requests": {}` للطلبات التي ستستخدمها خدمتك.
      3. `"optout":` عند الحاجة. وليس لدينا حاليًا نظام رفض جيد، لذا يُرجى التواصل معنا لمساعدتنا في تصميم نظام يناسبك.
      4. `"warningMessage":` عند الحاجة. إذ يعرض معلومات تحذير من البائع (مثل الإهمال أو الترحيل) في وحدة التحكم.
   2. إذا كنت تستخدم نقل iframe، فأضف أيضًا سطرًا جديدًا إلى ANALYTICS_IFRAME_TRANSPORT_CONFIG في iframe-transport-vendors.js يحتوي على `"*vendor-name*": "*url*"`
   3. مثال في المرجع [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html).
   4. اختبار في الملف [extensions/amp-analytics/0.1/test/vendor-requests.json ](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json).
   5. أضف خدمة التحليلات إلى قائمة البائعين المدعومين في ملف[extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./analytics-vendors-list.md). وضمِّن النوع والوصف والرابط في وثائق الاستخدام الخاصة بك.
3. اختبر المثال الجديد الذي أدخلته في [amples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) للتأكد من أن النتائج من المثال تسير على النحو المتوقع. على سبيل المثال، يتم جمع البيانات المطلوبة وعرضها في لوحة معلومات التحليلات الخاصة بك.
4. أرسل طلب سحب مع هذا التصحيح، مع الإشارة إلى إصدار انتواء التنفيذ.
5. حدِّث وثائق استخدام الخدمة الخاصة بك وأبلغ عملاءك.
6. يوصى بشدة بإجراء [اختبار تكامل خارج مخزون AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests).

## مديرو العلامات <a name="tag-managers"></a>

تتضمن خدمات إدارة العلامات خيارين للتكامل مع تحليلات AMP:

- **نهج نقطة النهاية:** العمل كنقطة نهاية إضافية لـ `amp-analytics`، وإجراء إدارة التسويق في الخلفية.
- **نهج التكوين:** إجراء إدارة العلامات عبر ملف تكوين JSON يتم إنشاؤه ديناميكيًا ويكون فريدًا لكل ناشر.

يُعد نهج نقطة النهاية النهج القياسي نفسه المفصل في القسم السابق. فيما يتكون نهج التكوين من إنشاء تكوين فريد لـ amp-analytics خاصًا بكل ناشر ويتضمن جميع حزم التحليلات المتوافقة. وقد يقوم الناشر بتضمين التكوين باستخدام بنية مشابهة لما يلي:

[sourcecode:html]
<amp-analytics
config="https://my-awesome-tag-manager.example.com/user-id.json"

> </amp-analytics>
> [/sourcecode]

لاتباع هذا النهج، راجع الوثائق لتكامل الناشرين مع تحليلات AMP.

## المزيد من المصادر <a name="further-resources"></a>

- تعمق: [لماذا لا نستخدم iframe فقط؟](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/why-not-iframe.md)
- تعمق: [إدارة حالة مستخدم غير مصادق عليه باستخدام AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)
- [نماذج amp-analytics](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- وثائق مرجعية لـ [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- الوثائق المرجعية [لمتغيرات amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)
