---
'$title': تكامل تقنيات الإعلانات الخاصة بك مع AMP
$order: 3
formats:
  - ads
teaser:
  text: إذا كنت موفر تقنية إعلانات تبحث عن التكامل مع AMP HTML، فيرجى مراجعة الإرشادات أدناه.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

إذا كنت موفر تقنية إعلانات تبحث عن التكامل مع AMP HTML، فيرجى مراجعة الإرشادات أدناه. لضمان أدنى زمن انتقال وأفضل جودة، يرجى اتباع الإرشادات المسردة [هنا](https://github.com/ampproject/amphtml/blob/main/ads/../3p/README.md#ads) قبل إرسال طلب سحب إلى مشروع AMP مفتوح المصدر. للحصول على توجيه عام بشأن كيفية البدء بالمساهمة في AMP، يرجى مراجعة [CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/main/ads/../CONTRIBUTING.md).

## خادم الإعلانات <a name="ad-server"></a>

_الأمثلة : DFP أو A9_

مع دور خادم الإعلانات، يقوم الناشرون الذين تدعهم بتضمين مكتبة JavaScript التي تقدمها ويضعون العديد من "قصاصات الإعلانات البرمجية" التي تعتمد على مكتبة JavaScript لجلب الإعلانات وعرضها على موقع الناشر على الويب.

نظرًا لأن AMP لا يسمح للناشرين بتنفيذ JavaScript إجباري، يلزمك المساهمة في ترميز AMP مفتوح المصدر للسماح لعلامة `amp-ad` بطلب الإعلانات من خادم الإعلانات الخاص بك.

على سبيل المثال: يمكن استدعاء خادم Amazon A9 باستخدام البنية التالية:

[sourcecode:html]
<amp-ad
width="300"
height="250"
type="a9"
data-aax_size="300x250"
data-aax_pubname="test123"
data-aax_src="302"

> </amp-ad>
> [/sourcecode]

لاحظ أن كل واحدة من السمات التي تتبع `type` تعتمد على المعلمات التي يتوقعها خادم Amazon’s A9 من أجل تسليم الإعلان. يعرض لك ملف [a9.js](https://github.com/ampproject/amphtml/blob/main/ads/./a9.js) كيف يتم تعيين المعلمات لعمل استدعاء JavaScript الذي يستدعي خادم A9 عن طريق `https://c.amazon-adsystem.com/aax2/assoc.js` URL. ويتم إلحاق المعلمات المقابلة التي تمررها علامة إعلانات AMP إلى URL لإرجاع الإعلان.

لمعرفة التفاصيل حول كيفية تكامل شبكة الإعلانات الخاصة بك مع AMP، راجع [تكامل شبكات الإعلانات في AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

## المنصة من طرف المورد (SSP) أو Ad Exchange <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

_الأمثلة : Rubicon أو Criteo أو Appnexus، أو Ad-Exchange_

إذا كنت تمثل منصة من طرف البيع وتريد أن يتم استدعاؤك مباشرة من صفحة ويب الناشر، فستحتاج إلى اتباع نفس التوجيهات المسردة أعلاه للتكامل مع خادم الإعلانات. ومن خلال إضافة قيمة `type` الخاصة بك إلى علامة amp-ad يتم السماح لك بتوزيع العلامة مباشرة إلى الناشرين، لكي يمكنهم إدراج علاماتك مباشرة في صفحات AMP الخاصة بهم.

علاوة على ذلك، تعمل منصات SSP مع الناشر لنقل تدفق علامات إعلانات SSP في الخادم الخاص بهم. في هذه الحالة، تأكد من أن جميع الأصول الجاري تحميلها بواسطة التعليمة البرمجية الخاصة بك في العمل الإبداعي لخادم الإعلانات مبنية من HTTPS. يوجد بعض القيود بشأن بعض تنسيقات الإعلانات مثل العناصر القابلة للتوسع، لذا نوصي بأن تختبر معظم تنسيقات الأعمال الإبداعية شائعة التسليم مع الناشرين.

## وكالة الإعلانات <a name="ad-agency"></a>

_الأمثلة : Essence أو Omnicom_

تعاون مع الناشر لضمان أن الأعمال الإبداعية التي تطورها متوافقة مع AMP. نظرًا لأن جميع الأعمال الإبداعية المقدمة إلى أطر iframes يتم تحديد حجمها عند استدعاء الإعلان، تأكد من أن العمل الإبداعي الخاص بك لا يحاول تعديل حجم iframe.

تأكد أن جميع الأصول التي هي جزء من العمل الإبداعي قد تم طلبها باستخدام HTTPS. لا يتم دعم بعض تنسيقات الإعلانات بالكامل في هذه اللحظة ونوصي باختبار الأعمال الإبداعية في بيئة AMP. تشمل بعد الأمثلة: عناصر الوسائط المنسقة القابلة للتوسعة والإعلانات التداخلية والإعلانات على مستوى الصفحة.

## مشغل الفيديو <a name="video-player"></a>

_الأمثلة : Brightcove أو Ooyala_

مشغل الفيديو الذي يعمل مع صفحات HTML العادية لن يعمل في AMP وبالتالي يجب إنشاء علامة خاصة تسمح لـ AMP Runtime بتحميل المشغل الخاص بك. أنشأت Brightcove علامة [amp-brightcove](https://github.com/ampproject/amphtml/blob/main/extensions/amp-brightcove/amp-brightcove.md) مخصصة تسمح بتشغيل الوسائط والإعلانات في صفحات AMP.

ويمكن استدعاء مشغل Brightcove بواسطة ما يلي:

[sourcecode:html]
<amp-brightcove
data-account="1290862519001"
data-video-id="ref:amp-docs-sample"
data-player="S1Tt8cgaM"
layout="responsive"
width="480"
height="270"

> </amp-brightcove>
> [/sourcecode]

للحصول على تعليمات حول كيفية تطوير علامة amp مثل Brightcove، انظر [طلب السحب هذا](https://github.com/ampproject/amphtml/pull/1052).

## شبكة إعلانات الفيديو <a name="video-ad-network"></a>

_الأمثلة : Tremor أو Brightroll_

إذا كنت تمثل شبكة إعلانات فيديو، فيرجى العمل مع الناشر لضمان ما يلي:

- تقديم جميع أصول الفيديو عن طريق HTTPS
- مشغل فيديو الناشر يتضمن دعم AMP

## منصة إدارة البيانات (DMP) <a name="data-management-platform-dmp"></a>

_الأمثلة : KRUX أو Bluekai_

راجع [كيفية تحسين تكوين الإعلانات المخصصة](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration).

يمكنك استخدام نهجًا مماثلا لتعزيز استدعاء الإعلان من خلال تمرير شرائح الجمهور التي تحصل عليها من ملفات تعريف الارتباط للمستخدم إلى استدعاء الإعلان.

## موفر قابلية العرض <a name="viewability-provider"></a>

_الأمثلة : MOAT أو Integral Ad Science_

في العادة يتكامل موفرو قابلية العرض مع الناشرين عن طريق أدوات التفاف الأعمال الإبداعية لخادم الإعلانات. إذا كان الحال كذلك، تأكد من أن أداة التفاف الأعمال الإبداعية تحمل جميع الأصول عبر HTTPS.

على سبيل المثال مع MOAT، تأكد من أنه تم تحويل `http://js.moatads.com` إلى `https://z.moatads.com`

راجع أيضًا نهج استخدام [نمط مراقب نقاط التقاطع](https://github.com/ampproject/amphtml/blob/main/ads/README.md#ad-viewability).

## منصة التوصية بالمحتوى <a name="content-recommendation-platform"></a>

_الأمثلة : Taboola أو Outbrain_

تكون مفيدة إذا كانت بعض أجزاء JavaScript مدمجة في موقع ويب الناشر اليوم ولكن النهج لن يعمل في صفحات AMP. إذا كنت ترغب في التوصية بمحتوى على إحدى صفحات AMP، فعندئذ نوصيك بأن تستخدم ملحق [`amp-embed`](https://amp.dev/documentation/components/amp-ad) لطلب تفاصيل المحتوى. راجع مثال [Taboola](https://github.com/ampproject/amphtml/blob/main/ads/taboola.md).
