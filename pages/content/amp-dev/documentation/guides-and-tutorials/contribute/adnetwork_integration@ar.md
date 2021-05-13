---
'$title': التكامل مع AMP لعرض الإعلانات المرئية
$order: 5
description: هذا الدليل مخصص لشبكات الإعلانات التي ترغب في التكامل مع AMP لعرض الإعلانات المرئية على صفحات AMP.
formats:
  - ads
---

هذا الدليل مخصص لشبكات الإعلانات التي ترغب في التكامل مع AMP لعرض الإعلانات المرئية على صفحات AMP.

## نظرة عامة

بوصفك خادم إعلانات، يمكنك التكامل مع AMP لعرض إعلانات HTML التقليدية على صفحات AMP، بالإضافة إلى عرض إعلانات [AMPHTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md).

##### ترغب في عرض إعلانات HTML التقليدية؟

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### ترغب في عرض إعلانات AMPHTML؟

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md) (على سبيل المثال، إذا لم تكن قد أنشأت واحدة بالفعل لخدمة إعلانات HTML التقليدية).
2. [إنشاء تكامل الإحضار السريع لعرض إعلانات AMPHTML](#creating-a-fast-fetch-integration).

## إنشاء `amp-ad` <a name="creating-an-amp-ad"></a>

بوصفك خادم إعلانات، يقوم الناشرون الذين تدعمهم بتضمين مكتبة JavaScript التي توفرها ويضعون "مقتطفات إعلانية" متنوعة تعتمد على مكتبة JavaScript لإحضار الإعلانات وعرضها على موقع الويب الخاص بالناشر. ونظرًا لأن AMP لا تسمح للناشرين بتنفيذ JavaScript عشوائيًا، سيلزمك المساهمة في رمز AMP مفتوح المصدر للسماح للعلامة [`amp-ad`](../../../documentation/components/reference/amp-ad.md) بطلب الإعلانات من خادم الإعلانات.

[tip type="note"] **ملحوظة –** يمكنك استخدام التنفيذ [`amp-ad`](../../../documentation/components/reference/amp-ad.md) هذا لعرض إعلانات HTML التقليدية **و**AMPHTML. [/tip]

على سبيل المثال، يمكن استدعاء خادم Amazon A9 باستخدام التركيب التالي:

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

في الرمز أعلاه، تحدد السمة `type` شبكة الإعلانات، والتي تكون في هذه الحالة A9. فيما تعتمد سمات `data-*` على المعلمات التي يتوقعها خادم Amazon A9 لعرض الإعلان. ويوضح لك ملف [`a9.js`](https://github.com/ampproject/amphtml/blob/main/ads/a9.js) طريقة تعيين المعلمات لإجراء استدعاء JavaScript لعنوان URL لخادم A9. ويتم إلحاق المعلمات المقابلة التي تم تمريرها من خلال العلامة [`amp-ad`](../../../documentation/components/reference/amp-ad.md) بعنوان URL لإرجاع إعلان.

للحصول على الإرشادات حول طريقة إنشاء تكامل [`amp-ad`](../../../documentation/components/reference/amp-ad.md)، راجع [دمج شبكات الإعلانات في AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

## إنشاء تكامل إحضار سريع <a name="creating-a-fast-fetch-integration"></a>

يُعد [الإحضار السريع](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/) إحدى آليات AMP التي تفصل طلب الإعلان عن الاستجابة له، مما يسمح بحدوث طلبات الإعلان في وقت مبكر من دورة حياة الصفحة، ولا تُعرَض الإعلانات إلا عندما يكون من المرجح أن يشاهدها المستخدمون. ويوفر الإحضار السريع معاملة تفضيلية لإعلانات AMPHTML التي تم التحقق منها على إعلانات HTML التقليدية. وضمن الجلب السريع، إذا فشل التحقق من صحة أحد الإعلانات، يتم تغطية هذا الإعلان في iframe عبر النطاقات لوضع الحماية له بعيدًا عن بقية مستند AMP. وبالعكس، تتم كتابة التحقق من صحة إعلان AMPHTML مباشرة في الصفحة. ويعالج الإحضار السريع كلاً من إعلانات AMP والتي لا تدعم AMP؛ حيث لا توجد طلبات إعلان إضافية مطلوبة للإعلانات التي يفشل التحقق من صحتها.

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Fast Fetch Integration flow', caption='Fast Fetch Integration flow' ) }}

لعرض إعلانات AMPHTML من خادم الإعلانات لديك، يجب عليك توفير تكامل الإحضار السريع الذي يتضمن:

1. Supporting SSL network communication.
2. Providing JavaScript to build the ad request (example implementations: [AdSense](https://github.com/ampproject/amphtml/tree/main/extensions/amp-ad-network-adsense-impl) & [DoubleClick](https://github.com/ampproject/amphtml/tree/main/extensions/amp-ad-network-doubleclick-impl)).
3. التحقق من صحة وتوقيع المواد الإبداعية من خلال خدمة التحقق من الصحة. إذ يوفر [Cloudflare](https://blog.cloudflare.com/firebolt/) خدمة التحقق من إعلان AMP، مما يمكِّن أي مزود إعلانات مستقل من تقديم إعلانات أسرع وأخف وأكثر جاذبية.

للحصول على الإرشادات حول إنشاء تكامل الإحضار السريع، راجع [دليل تنفيذ شبكة الإحضار السريع](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/Network-Impl-Guide.md).

## موارد ذات صلة

- [`amp-ad`](../../../documentation/components/reference/amp-ad.md)
- [قائمة مزودي الإعلانات المدعومين](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
- [إدخال مدونة يصف إطلاق الإحضار السريع](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)
