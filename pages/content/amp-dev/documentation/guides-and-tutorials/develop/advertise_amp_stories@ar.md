---
'$title': الإعلان في قصص الويب
$order: 3
description: تعد قصص الويب تجربة ملء شاشة قابلة للنقر عليها وتجعل القراء ينغمرون في المحتوى. فيما يسمح الإعلان باستخدام قصة AMP بالتكامل السلس من دون انقطاع...
formats:
  - stories
author: CrystalOnScript
---

تعد قصص الويب تجربة ملء شاشة قابلة للنقر عليها وتجعل القراء ينغمرون في المحتوى. فيما يسمح الإعلان باستخدام قصة AMP بالتكامل السلس من دون انقطاع مع رحلة المستخدم، مما يبقيهم متفاعلين ومنبهرين بالمنصة.

## موضع الإعلان

تستخدم قصص الويب مكون [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) لإملاء مقدار الإعلانات وموضعها.

تمثل [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) أداة طي حول المكون [`amp-ad`](../../../documentation/components/reference/amp-ad.md) والذي يقوم ديناميكيًا بإدراج أحد الإعلانات أو أكثر أثناء قراءة المستخدم لمحتويات القصة. لضمان أفضل تجربة للمستخدم:

1. تكون الإعلانات معروضة مسبقًا من خلال وقت تشغيل قصص الويب وبعدها يتم إدراجها. وهذا يضمن ألا يتعرض المستخدم أبدًا لظهور صفحة فارغة أو إعلان لم يتم تحميله.

2. يتم تحسين كثافة الإعلان حسب نسبة أبعاد المحتوى لمنع التشبع المفرط. ويحدد المكون [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) توقيت وموضع إدراج الإعلان أثناء تقدم المستخدم في القراءة.

تضع قصة الويب الإعلان الأول في وقت ما بعد أول صفحتين بهدف تحسين أرباح عملية التسييل وتجربة المستخدم.

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img></amp-anim>

[tip type="note"] **ملحوظة –** تقوم قصة الويب الطويلة بإتاحة مزيد من الفرص لوضع الإعلان. وسيستمر تحسين خوارزمية الموضع الفعلي للإعلان بمرور الوقت. [/tip]

## تفاعل المستخدم

يمكن للمستخدمين تجاوز الإعلان بالطريقة نفسها مثل صفحات القصص العادية؛ من خلال الضغط على ثلثي الشاشة جهة اليمين.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='صورة توضح لمستخدمي المنطقة إمكانية النقر لتخطي الإعلان', caption='يمكن للمستخدمين تخطي الإعلانات من خلال الضغط على ثلثي الشاشة جهة اليمين.', align='' ) }}

يمكن للمستخدمين التفاعل مباشرة مع الإعلان من خلال النقر فوق زر [الدعوة إلى اتخاذ إجراء](story_ads_best_practices.md#call-to-action-button-text-enum) المعروض من قبل النظام والذي يظهر في الثلث السفلي من إعلانات قصة الويب. يمكن تكوين الزر لإرسال المستخدم إلى عنوان URL عشوائيًا (أو إلى متجر تطبيقات ذي صلة).

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='صورة توضح إعادة توجيه المستخدمين إلى وجهة مقصودة للإعلان، لكن بإمكانهم العودة إلى القصة.', caption='تتم إعادة توجيه المستخدمين إلى وجهة هبوط للإعلان، لكن بإمكانهم العودة إلى القصة.', align='' ) }}

## تكوين قصة ويب للإعلانات

لا يمكن لقصص الويب دعم [`amp-ad`](../../../documentation/components/reference/amp-ad.md) مباشرة على الصفحة. بدلًا من ذلك؛ يتم جلب جميع الإعلانات وعرضها بواسطة المكون [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md). ويجب وضع المكون [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) مباشرة كعنصر فرعي لـ [`amp-story`](../../../documentation/components/reference/amp-story.md).

[sourcecode:html]
<amp-story>
<amp-story-auto-ads>
<script type="application/json">
{
"ad-attributes": {
// ad server configuration
}
}
</script>
</amp-story-auto-ads>
<amp-story-page>
...
</amp-story>
[/sourcecode]

بخلاف [`amp-ad`](../../../documentation/components/reference/amp-ad.md) العادي، لا يلزم استعمال `<fallback>` أو `<placeholder>`، نظرًا لأنه يتم عرض إعلانات قصص الويب بمجرد إظهارها بالكامل.

## البدء مع قصص الويب

تكون أسهل طريقة لتضمين الإعلانات في قصة الويب لديك عبارة عن تقديم الإعلانات من خادم إعلانات مدعوم.

فيما يلي منصات الإعلانات التي تدعم حاليًا إعلانات قصص الويب:

- مدير إعلانات Google
  - [إعلانات Direct sold](https://support.google.com/admanager/answer/9038178)
  - [إعلانات Programmatic](https://support.google.com/admanager/answer/9416436)
- Google AdSense ستنضم قريبًا
- يمكن تكامل منصات إعلانات أخرى (توصل معنا [لمزيد من التفاصيل عبر Github](https://github.com/ampproject/amphtml/issues/30769))
- Mgid
  - [إعلانات Direct sold](https://help.mgid.com/generate-revenue-with-amp-web-stories)

إذا كنت معلنًا مهتمًا بعرض إعلاناتك داخل قصص الويب، فيرجى [التواصل معنا](mailto:story-ads-wg@google.com) لمزيد من المعلومات.

يمكن أيضًا للناشرين وضع إعلانات مخصصة إذا قاموا بإعداد خادم الإعلانات الخاص بهم. [العملية بالتفصيل موضحة هنا](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

[tip type="note"] اقرأ [حركة بيانات الأعمال الإبداعية المخصصة في قصص الويب](https://support.google.com/admanager/answer/9038178) لمزيد من المعلومات حول رفع الإعلانات إلى مدير إعلانات Google وراجع الدليل الخاص بنا حول [أفضل الممارسات لإنشاء إعلانات قصص AMP](story_ads_best_practices.md). [/tip]
