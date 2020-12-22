---
"$title": تنسيق عنوان URL على AMP Cache ومعالجة الطلبات
"$order": '9'
toc: 'false'
formats:
- websites
- stories
- ads
author: Gregable
contributors:
- sebastianbenz
---

في هذا المستند، ستتعرّف على تنسيق عنوان URL على AMP Cache وكيفية معالجتها للطلبات.

## تنسيق عنوان URL

When possible, the Google AMP Cache will create a subdomain for each AMP document's domain by first converting it from [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) to UTF-8. The caches replaces every `-` (dash) with `--` (2 dashes) and replace every `.` (dot) with `-` (dash). For example, `pub.com` will map to `pub-com.cdn.ampproject.org`.

يمكنك استخدام حاسبة عناوين URL التالية لتحويل عنوان URL إلى إصدار مخزن AMP مؤقت:

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] استخدم وحدة [AMP-Toolbox Cache URL](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url) [Node.js](https://nodejs.org) لترجمة عنوان URL من الأصل إلى تنسيق عنوان URL على AMP Cache. [/tip]

ويقدّم هذا المستند وصفًا لما يلي:

- بنية عنوان URL على مخزن AMP Cache مؤقت.
- كيفية التنبؤ بالشكل الذي ستظهر عليه عناوين URL على مخزن AMP مؤقت.
- How to reverse an AMP Cache Origin header to determine what its publisher domain was.

## بروتوكول أسماء النطاقات

All documents use https protocol on AMP caches.

## لاحقة اسم النطاق

All AMP Caches are registered in a JSON file, found online on the [AMPHTML Repository](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). An example cache record in this file will look like:

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

يخدم مخزن AMP Cache المؤقت السجلات على النطاق المحدد من قِبل `cacheDomain`. وفي هذه الحالة، يصبح النطاق `cdn.ampproject.org`.

This document uses URLs with `cdn.ampproject.org` as examples, but other caches typically use a similar URL structure.

## بادئة اسم النطاق

يُعرَض مخزن AMP Cache المؤقت على عنوان URL بديل، مثل `example-com.cdn.ampproject.org`. ويصبح أول مكوّن يحتوي على نقط من اسم النطاق الأصلي في المثال، `example.com`, بتنسيق `example-com`. ويشير هذا المستند إلى هذه السلسلة التي لا تحتوي على نقاط، `example-com`، لتكون "بادئة النطاق". راجع المثال أدناه للاطّلاع على الخوارزمية التي تُجري هذا التحويل.

لا تُستخدَم المكوّنات التي تحتوي على نقاط متعددة في هذه البادئة، مثل `example.com.cdn.ampproject.org`، نظرًا لقيد شهادات https (TLS)، [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1):

```
قد تحتوي الأسماء على حرف البدل * والذي يعتبر مطابقًا لأي مكون مفرد لاسم النطاق أو جزء من مكون. على سبيل المثال، *.a.com يطابق foo.a.com لكن لا يطابق bar.foo.a.com.
```

يمكن أن يصل طول مجالات الناشر إلى 255 حرفًا، بينما تقتصر بادئة كل مجال على 63 حرفًا، بحسب [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11) الذي ينصّ على:

```
يتراوح طول أي تصنيف في حدود ثمانيّة واحدة (1) إلى 63 ثمانيّة. ويقتصر طول اسم النطاق الكامل على عدد 255 ثمانيّة (بما يشمل الفاصلات).
```

يتم تمثيل جميع نطاقات الناشرين على هيئة بادئة نطاق فريد. وتحاول الخوارزمية المخصصة لفعل ذلك أن تجعل عملية التمثيل قابلة للقراءة البشرية. ومع ذلك، ترجع عملية التمثيل لاستخدام تجزئة آمنة لنطاقات الناشرين إذا كانت طويلة للغاية، وفي الحالات الموصوفة أدناه:

### الخوارزمية الأساسية

فيما يلي الخوارزمية الأساسية لتحويل نطاق ناشر إلى بادئة نطاق:

1. نفِّذ التعليمة البرمجية لفك الترميز Punycode Decode على نطاق الناشرين. راجِع [RFC 3492](https://tools.ietf.org/html/rfc3492)
2. استبدل أي حرف "`-`" (واصلة) في مُخرَج الخطوة 1 لتحل محله "`--`" (واصلتان).
3. استبدل أي حرف "`.`" (نقطة) في مُخرَج الخطوة 2 لتحل محله "`-`" (واصلة).
4. إذا كان مُخرَج الخطوة 3 يحتوي على "`-`" (واصلة) عند كلا الموضعين 3 و4، فمن ثمّ أضِف إلى مُخرَج الخطوة 3 بادئة "`0-`" وأضِف لاحقة "`-0`". راجِع [#26205](https://github.com/ampproject/amphtml/issues/26205) للاطّلاع على الخلفية.
5. نفِّذ التعليمة البرمجية للترميز Punycode Encode على مُخرَج الخطوة 3. راجِع [RFC 3492](https://tools.ietf.org/html/rfc3492)

فيما يلي بضعة أمثلة على الخوارزمية الأساسية:

<table>
  <tr>
   <td>
<strong>نطاق الناشر</strong>
   </td>
   <td>
<strong>بادئة النطاق</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)    </td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)    </td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

بعد تشغيل الخوارزمية الأساسية، إذا لم تكن بادئة النطاق عبارة عن تصنيف صالح لنظام أسماء النطاقات (DNS)، وفقط في هذه الحالة، ننفّذ "الخوارزمية الاحتياطية" الموضّحة أدناه.

لا تعدّ بادئة النطاق تصنيفًا غير صالح لنظام أسماء النطاقات (DNS) إذا كانت أطول من 63 حرفًا

### الخوارزمية الاحتياطية

فيما يلي الخوارزمية الاحتياطية المصممة لتحويل نطاق ناشرين إلى بادئة نطاق:

1. ابدأ بتجزئة نطاق الناشرين باستخدام SHA256.
2. استخدم الأمر Base32 Escape على مخرج الخطوة 1.
3. أزِل آخر 4 أحرف من مخرج الخطوة 2، والتي تكون دائمًا عبارة عن أحرف `=` (يساوي).

سينتج عن الخوارزمية الاحتياطية سلسلة من 52 حرفًا مثل السلسلة التالية بدون أي `-` (واصلة): `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.

### الخوارزمية المركّبة

تكون الخوارزمية المركّبة على النحو التالي:

1. نفِّذ "الخوارزمية الأساسية". إذا كان المخرج عبارة عن تصنيف صالح لنظام أسماء النطاقات ( DNS)، ألحِق لاحقة نطاق Cache ونفِّذ تعليمة الإرجاع البرمجية، على سبيل المثال `example-com.cdn.ampproject.org`. وإلا، عليك المتابعة إلى الخطوة 2.
2. نفِّذ "الخوارزمية الاحتياطية". وألحِق لاحقة نطاق Cache ونفِّذ تعليمة الإرجاع البرمجية، على سبيل المثال: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

## مسار عنوان URL

يكون "المسار" لعنوان URL على AMP Cache مكوّنًا دائمًا من واحد أو أكثر من أدلة البادئة، مثل `/c`، متبوعة بترميز وسيط `/s` فقط إذا كان عنوان URL للناشرين هو http `s`، متبوعة بعنوان URL لمستند الناشر بدون البروتوكول.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Image displaying cached URL formats') }}

The prefix directories, such as `/c` correspond to different types of serving that an AMP Cache may perform. Different AMP Caches may support different serving types, and this is not an exhaustive list:

- `/c` - <strong>C</strong>ontent (المحتوى): هذا مستند AMP يتم عرضه كصفحة مستقلة يمكن الربط بها مباشرةً في بعض الواجهات.
- `/v` - <strong>V</strong>iewer (العارض): هذا أيضًا مستند AMP، ولكن يتم عرضه في [عارض AMP](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer) وهو عبارة عن بيئة إطار يعرض مستند AMP في سياق "صفحة نتائج بحث" أو واجهة أخرى.
- `/wp` - <strong>W</strong>eb <strong>P</strong>ackage: This is an AMP document served as a [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/), a Web Package technology. These URLs act as redirects to the publisher’s own origin.
- `/cert` - <strong>Cert</strong>ificate (الشهادة): هذه شهادة عامة للاستخدام مع نموذج [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/).
- `/i` - <strong>I</strong>mage (الصورة): هذه صورة يتم عرضها من قبل مخزن AMP المؤقت، عادةً كمورد فرعي للمستند.
- `/ii` - <strong>I</strong>mage (الصورة): هذه أيضًا صورة يتم عرضها من قِبل AMP Cache، ولكنها عادةً ما تُدمج مع معلّمات cache-configuring الأخرى مثل `/ii/w800` والتي تشير إلى قيمة maximum-width (حد أقصى للعرض) يطلبها المستند. ويمكن للمخزن المؤقت إنتاج صور بمقياس مختلف هنا من أجل حفظ النطاق الترددي للمتصفّح.

In addition, AMP Caches may choose append special query parameters to the document URL which are not part of the publisher document query. For example, [`<amp-live-list>`](../../../components/reference/amp-live-list.md) makes refresh requests by fetching a document with the parameter `amp_latest_update_time<`. These parameters are not passed to the origin when the document is crawled, but are strictly present to configure the request to the AMP Cache.

## أصول CORS

يستخدم العديد من الناشرين طلبات CORS من مستند AMP لديهم لاسترجاع بيانات إضافية. وتعمل طلبات CORS عن طريق إرسال رأس صفحة `Origin:` HTTP في الطلب الذي يحدد أصل المستند الذي يعدّ الطلب. وكما هو ظاهر أعلاه، يكون أصل المستند مختلفًا على مخزن AMP Cache المؤقت مقارنةً بحاله على المستند الأصلي. في أقسام أسماء النطاقات الواردة أعلاه، يمكنك العثور على الخوارزمية المطلوبة لتحديد أصل عنوان URL لمخزن AMP Cache مؤقت مقدّم لعنوان URL للناشر. فيما يلي حدّدنا الخوارزمية العكسية لإعادة فك شفرة رأس صفحة طلب CORS `Origin:` إلى نطاق ناشرين أصلي.

### أصل AMP Cache إلى نطاق الناشر

ستبدو رأس صفحة AMP Cache Origin كواحدة من الأمثلة التالية:

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

First, remove the protocol prefix (`https://`) and the AMP Cache domain suffix, such as `.cdn.ampproject.org`. The suffix may be from any one of the caches listed in [caches.json](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). The remaining string will be the “domain prefix”. In the case of the above two examples, the “domain prefix is:

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

بعد ذلك، تحقّق مما إذا كانت "بادئة النطاق" تحتوي على الأقل ‘`-`’ (واصلة) واحدة. حيث يعدّ احتواؤها على واصلة واحدة أو أكثر هو الحالة الأكثر شيوعًا إلى الآن. وإذا لم تكن "بادئة النطاق" تحتوي على ‘`-`’ (واصلة) واحدة على الأقل، لا يمكن عكس "أصل AMP Cache" مباشرةً. وبدلاً من ذلك، إذا كنت تعلم مجموعة نطاقات الناشرين المحتملة، يمكنك إنشاء مجموعة "أصول AMP Cache" باستخدام خوارزمية "اسم النطاق" المذكورة في بدايات هذا المستند. ويمكنك من ثمّ التحقق من صحتها في مقابل المجموعة الثابتة.

تفترض بقية الخوارزمية أن "بادئة النطاق" تحتوي على ‘`-`’ (واصلة) واحدة على الأقل.

1. إذا كانت بادئة النطاق تبدأ بـ `xn--`، نفِّذ التعليمة البرمجية لفك الترميز punycode decode على "بادئة النطاق". على سبيل المثال، التعليمة البرمجية `xn---com-p33b41770a` تصبح `⚡😊-com`. راجِع [RFC 3492](https://tools.ietf.org/html/rfc3492) للتعرّف على punycode.
2. إذا كانت بادئة النطاق تبدأ بـ "`0-`" وتنتهي بـ "`-0`"، يمكنك تجريد كل من البادئة "`0-`" واللاحقة "-0".
3. كرِّر على مستوى مخرج الأحرف بدءًا من الخطوة 2 بالترتيب، مصدرًا إياها بترتيب مصادفتها. عندما تصادفك "`-`" (واصلة), حرِّر سريعًا عند الحرف التالي. وإذا كان الحرف التالي أيضًا "`-`" (واصلة)، تجاوز كلا الحرفين من الإدخال وأصدِر "`-`" (واصلة) مفردة. إذا كان الحرف التالي أي حرف آخر، تجاوز فقط "`-`" (الواصلة) المفردة وأصدِر "`.`" (نقطة).  على سبيل المثال، التعليمة البرمجية `a--b-example-com` تصبح `a-b.example.com`.
4. نفِّذ التعليمة البرمجية للترميز Punycode encode على نتيجة الخطوة 3. راجِع [RFC 3492](https://tools.ietf.org/html/rfc3492) للتعرّف علىpunycode.

The result of Step 4 will be the Publisher Domain. The protocol is unavailable from the domain itself, but is either `http` or `https`. The port is always the default for the protocol.

## معالجة إعادة التوجيه والأخطاء

إليك بعض الأمثلة على كيفية معالجة AMP Cache لعمليات إعادة التوجيه والأخطاء:

**عمليات إعادة التوجيه**

يتّبع AMP Cache عمليات إعادة التوجيه عند تحليل عناوين URL على AMP. على سبيل المثال، في حال إعادة توجيه عنوان URL إلى عنوان URL آخر على AMP:

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

ومن ثمّ، سترجع AMP Cache بمحتوى عملية إعادة التوجيه التي تم تحليلها لعنوان URL الأصلي.

مثال: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

ملاحظة هامة: في حال نقل موقع ملفات AMP على خادمك، تأكّد من إعداد عملية إعادة توجيه من الموقع القديم إلى الموقع الجديد.

**لم يتم العثور عليه**

عند عدم العثور على صفحة ما في AMP Cache، ستظهر صفحة خطأ وترجِع بحالة 404.

مثال: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**صفحة AMP غير صالحة**

عندما تكون صفحة ما عبارة عن صفحة AMP غير صالحة، ستعمل AMP Cache على إعادة التوجيه إلى الصفحة المتعارَف عليه.

مثال: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**أخطاء الخادم**

في حال رجوع عنوان URL بأخطاء في الخادم من النوع 5XX، سترجع AMP Cache بحالة 404.

مثال: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)
