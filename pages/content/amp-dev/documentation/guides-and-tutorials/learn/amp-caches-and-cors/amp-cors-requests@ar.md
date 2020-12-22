---
"$title": اشتراك المصادر في الموارد في AMP
order: '12'
formats:
- websites
- email
- stories
- ads
teaser:
  text: تستفيد العديد من مكونات AMP وملحقاته من نقاط النهاية عن بُعد باستخدام
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

تستفيد العديد من مكونات AMP وملحقاته من نقاط النهاية عن بُعد باستخدام طلبات اشتراك المصادر في الموارد. ويشرح هذا المستند الجوانب الرئيسية لاستخدام اشتراك المصادر في الموارد في AMP. ولمعرفة المزيد عن اشتراك المصادر في الموارد نفسه، راجع [مواصفات اشتراك المصادر في الموارد الخاص بـ W3](https://www.w3.org/TR/cors/).

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#why-do-i-need-cors-for-my-own-origin-" data-md-type="link">لمَ أحتاج إلى اشتراك المصادر في الموارد من أجل الأصل الخاص بي؟</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">استخدام ملفات تعريف الارتباط لطلبات اشتراك المصادر في الموارد</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">أمان اشتراك المصادر في الموارد في AMP</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">التحقق من طلبات اشتراك المصادر في الموارد</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link">1) السماح بالطلبات لأصول محددة في اشتراك المصادر في الموارد</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) السماح بطلبات الأصول نفسها</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">إرسال ترويسات استجابة لاشتراك المصادر في الموارد</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered"><a href="#access-control-allow-origin-origin" data-md-type="link">Access-Control-Allow-Origin: </a></li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">معالجة طلبات تغيير الحالات</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link">مثال عمليات المراجعة: تسليم طلبات اشتراك المصادر في الموارد واستجاباته</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">اختبار اشتراك المصادر في الموارد في AMP</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## لماذا أحتاج إلى اشتراك المصادر في الموارد من أجل الأصل الخاص بي؟ <a name="why-do-i-need-cors-for-my-own-origin"></a>

قد يختلط عليك أمر احتياجك إلى اشتراك المصادر في الموارد للطلبات للأصل الخاص بك، دعنا نتعمق في هذا الأمر.

تعمل مكونات AMP التي تُحضِر البيانات الديناميكية (مثل amp-form وamp-list وغيرهما) على إنشاء طلبات اشتراك المصادر في الموارد لنقاط النهاية عن بُعد لاسترداد البيانات. وإذا كانت صفحة AMP الخاصة بك تتضمن مثل هذه المكونات، فستحتاج إلى التعامل مع اشتراك المصادر في الموارد حتى لا تفشل هذه الطلبات.

لنوضح هذا الأمر بمثال:

لنفترض أن لديك صفحة AMP تسرد المنتجات بالأسعار، ومن أجل تحديث الأسعار على الصفحة؛ ينقر المستخدم على زر ما، والذي يسترد أحدث الأسعار من نقطة نهاية JSON (يتم ذلك عبر مكونamp-list). إذ إن JSON موجود في النطاق الخاص بك.

حسنًا، لذا ستكون الصفحة *في النطاق الخاص بي* ويكون JSON *في النطاق الخاص بي*. لا أرى أي مشكلة!

ولكن كيف وصل المستخدم إلى صفحة AMP الخاصة بك؟ هل هي صفحة يتم الوصول إليها لأنها مخزنة في ذاكرة التخزين المؤقت؟ من المحتمل جدًا أن المستخدم لديك لم يصل إلى صفحة AMP الخاصة بك مباشرةً، ولكن بدلًا عن ذلك؛ اكتشف صفحتك من خلال نظام أساسي آخر. على سبيل المثال، يستخدم بحث Google ذاكرة التخزين المؤقت لصفحات AMP من Google لعرض صفحات AMP بسرعة؛ هذه صفحات موجودة في ذاكرة تخزين مؤقت يتم عرضها من ذاكرة AMP للتخزين المؤقت من Google، وهو نطاق *مختلف*. وعندما ينقر المستخدم فوق الزر لتحديث الأسعار على صفحتك، ترسل صفحة AMP الموجودة في ذاكرة التخزين المؤقت طلبًا إلى نطاقك الأصلي للحصول على الأسعار، وهو ما يمثل عدم تطابق بين الأصول (ذاكرة التخزين المؤقت -> النطاق الأصلي). من أجل السماح بمثل هذه الطلبات متعددة المصادر، تحتاج إلى التعامل مع اشتراك المصادر في الموارد، وإلا سيفشل الطلب.

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript><img alt="CORS و Cache" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png"></noscript></amp-img>

**حسنًا، ماذا عليَّ أن أفعل؟**

1. بالنسبة إلى صفحات AMP التي تُحضِر بيانات ديناميكية، تأكد من اختبار النسخة الموجودة في ذاكرة التخزين المؤقت لتلك الصفحات؛ *لا تنفذ الاختبار على نطاقك الخاص فقط*. (راجع قسم [اختبار اشتراك المصادر في الموارد في AMP](#testing-cors-in-amp) أدناه)
2. اتبع التعليمات الواردة في هذا المستند للتعامل مع طلبات اشتراك المصادر في الموارد واستجاباته.

## استخدام ملفات تعريف الارتباط لطلبات اشتراك المصادر في الموارد <a name="utilizing-cookies-for-cors-requests"></a>

تقوم معظم مكونات AMP التي تستخدم طلبات اشتراك المصادر في الموارد إما بتعيين [وضع بيانات الاعتماد](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) تلقائيًا أو السماح للمصمم بتمكينه اختياريًا. على سبيل المثال، يُحضِر المكوِّن [`amp-list`](https://amp.dev/documentation/components/amp-list) المحتوى الديناميكي من نقطة نهاية JSON لاشتراك المصادر في الموارد، ويسمح للمصمم بتعيين وضع بيانات الاعتماد من خلال السمة `credentials`.

*مثال: تضمين محتوى مخصص في amp-list عبر ملفات تعريف الارتباط*

[sourcecode:html]
<amp-list
  credentials="include"
  src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"
>
  <template type="amp-mustache">
    Your personal offer: ${% raw %}{{price}}{% endraw %}
  </template>
</amp-list>
[/sourcecode]

من خلال تحديد وضع بيانات الاعتماد، يمكن أن يحتوي الأصل على ملفات تعريف الارتباط في طلب اشتراك المصادر في الموارد وأيضًا تعيين ملفات تعريف الارتباط في الاستجابة (تخضع [لقيود ملفات تعريف الارتباط للطرف الثالث](#third-party-cookie-restrictions)).

### قيود ملفات تعريف الارتباط للطرف الثالث <a name="third-party-cookie-restrictions"></a>

تنطبق قيود ملفات تعريف الارتباط للطرف الثالث نفسها والمحددة في المتصفح أيضًا على طلبات اشتراك المصادر في الموارد المعتمدة في AMP. إذ تعتمد هذه القيود على المتصفح والنظام الأساسي، ولكن بالنسبة لبعض المتصفحات؛ يمكن للأصل تعيين ملفات تعريف الارتباط فقط إذا كان المستخدم قد زار الأصل في نافذة الطرف الأول (العليا) مسبقًا. أو بعبارة أخرى، بعد أن يقوم المستخدم بزيارة موقع الويب الأصلي مباشرةً فقط. بالنظر إلى ذلك، لا يمكن للخدمة التي يتم الوصول إليها عبر اشتراك المصادر في الموارد أن تفترض أنها ستكون قادرة على تعيين ملفات تعريف الارتباط افتراضيًا.

## أمان اشتراك المصادر في الموارد في AMP <a name="cors-security-in-amp"></a>

لضمان طلبات واستجابات صالحة وآمنة لصفحات AMP الخاصة بك، يجب عليك:

1. [التحقق من الطلب](#verify-cors-requests).
2. [إرسال ترويسات الاستجابة المناسبة](#send-cors-response-headers).

إذا كنت تستخدم عقد في الخلفية، فيمكنك استخدام [البرامج الوسيطة لاشتراك المصادر في الموارد في AMP](https://www.npmjs.com/package/amp-toolbox-cors)، والتي تعد جزءًا من [صندوق أدوات AMP](https://github.com/ampproject/amp-toolbox).

### التحقق من طلبات اشتراك المصادر في الموارد <a name="verify-cors-requests"></a>

عند استلام نقطة النهاية لديك طلب اشتراك المصادر في الموارد:

1. [تحقق من أن ترويسة <code>Origin</code> لاشتراك المصادر في الموارد هي أصل مسموح به (أصل الناشر + ذاكرة AMP للتخزين المؤقت](#verify-cors-header).
2. [إذا لم يكن هناك عنوان أصل، فتحقق من أن الطلب من الأصل نفسه (عبر `AMP-Same-Origin`)](#allow-same-origin-requests).

#### 1) السماح بالطلبات لأصول اشتراك المصادر في الموارد المحددة <a name="1-allow-requests-for-specific-cors-origins"></a>

<span id="verify-cors-header"></span>

تتلقى نقاط نهاية اشتراك المصادر في الموارد الأصل الطالب عبر ترويسة HTTP `Origin`. ويجب أن تسمح نقاط النهاية فقط بالطلبات من: (1) أصل الناشر، و(2) كل أصل `cacheDomain` مُدرج في [https://cdn.ampproject.org/caches.json](https://cdn.ampproject.org/caches.json).

على سبيل المثال، يجب أن تسمح نقاط النهاية بالطلبات ممن:

- النطاق الفرعي لذاكرة AMP للتخزين المؤقت من Google: `https://<publisher's domain>.cdn.ampproject.org` <br>(على سبيل المثال، `https://nytimes-com.cdn.ampproject.org`)

[tip type="read-on"] للحصول على معلومات حول تنسيقات عنوان URL لذاكرة التخزين المؤقت لصفحات AMP، راجع الموارد التالية:

- [نظرة عامة على ذاكرة AMP للتخزين المؤقت من Google](https://developers.google.com/amp/cache/overview) [/tip]

#### 2) السماح بطلبات الأصول نفسها <a name="2-allow-same-origin-requests"></a>

<span id="allow-same-origin-requests"></span>

بالنسبة إلى طلبات الأصل نفسه حيث تكون ترويسة `Origin` مفقودة، تعيِّن AMP الترويسة المخصصة التالية:

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

يتم إرسال هذه الترويسة المخصصة بواسطة وقت تشغيل AMP عندما يتم تقديم طلب نقل المعلومات من الأصل نفسه (أي المستند المقدم من عنوان URL غير مخصص لذاكرة التخزين المؤقت). والسماح بالطلبات التي تحتوي على العنوان `AMP-Same-Origin: true`.

### إرسال ترويسات استجابة اشتراك المصادر في الموارد <a name="send-cors-response-headers"></a>

بعد التحقق من طلب اشتراك المصادر في الموارد، يجب أن تحتوي استجابة HTTP الناتجة على الترويسات التالية:

##### Access-Control-Allow-Origin: <origin> </origin><a name="access-control-allow-origin-origin"></a>

تعد هذه الترويسة أحد مطالب <a href="https://www.w3.org/TR/cors/">مواصفات اشتراك المصادر في الموارد لـ W3</a>، حيث يشير <code>origin</code> إلى الأصل الطالب الذي تم السماح به عبر ترويسة طلب <code>Origin</code> لاشتراك المصادر في الموارد (على سبيل المثال، <code>"https://<publisher's subdomain>.cdn.ampproject.org"</code>).

على الرغم من أن مواصفات اشتراك المصادر في الموارد لـ W3 تسمح بإرجاع قيمة <code>*</code> في الاستجابة، يجب عليك من أجل تحسين الأمان:

- إذا كانت ترويسة `Origin` موجودة، فتحقق من صحة قيمة الترويسة <code>Origin</code> وارتدادها.

### معالجة طلبات تغيير الحالات <a name="processing-state-changing-requests"></a>

[tip type="important"] نفذ عمليات التحقق من الصحة هذه *قبل* معالجة الطلب. إذ يساعد التحقق من الصحة هذا على توفير الحماية ضد هجمات تزوير الطلب عبر المواقع، وتجنب معالجة طلبات المصادر غير الموثوق بها. [/tip]

وقبل معالجة الطلبات التي قد تغير حالة نظامك (على سبيل المثال، اشتراك المستخدم في قائمة بريدية أو إلغاء الاشتراك منها)، تحقق مما يلي:

**إذا تم تعيين ترويسة `Origin`**:

1. إذا كان الأصل لا يتطابق مع إحدى القيم التالية، فتوقف وأعِد استجابة خطأ:

    - `<publisher's domain>.cdn.ampproject.org`
    - مصدر الناشر (يُعرف على أنه المصدر الخاص بك)

    حينما تمثل `*` تطابق حرف بدل، وليس علامة نجمة فعلية ( * ).

2. خلاف ذلك، ابدأ في معالجة الطلب.

**إذا لم يتم تعيين ترويسة `Origin`**:

1. تحقق من أن الطلب يحتوي على الترويسة `AMP-Same-Origin: true`. وإذا كان الطلب لا يحتوي على هذه الترويسة، فتوقف وأعِد استجابة خطأ.
2. خلاف ذلك، ابدأ في معالجة الطلب.

## مثال عمليات المراجعة: تسليم طلبات اشتراك المصادر في الموارد واستجاباته <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

هناك سيناريوهان يجب حسابهما في طلبات اشتراك المصادر في الموارد لنقطة النهاية الخاصة بك:

1. طلب من الأصل نفسه.
2. طلب من أصل مخزن في ذاكرة تخزين مؤقت (من ذاكرة AMP للتخزين المؤقت).

لنستعرض هذه السيناريوهات بمثال؛ في مثالنا، ندير الموقع `example.com` الذي يستضيف صفحة AMP باسم `article-amp.html.` وتحتوي صفحة AMP على `amp-list` لاسترداد البيانات الديناميكية من ملف `data.json` الذي تتم استضافته أيضًا على `example.com`. ونريد معالجة الطلبات الواردة إلى ملف `data.json` التي تأتي من صفحة AMP. إذ يمكن أن تكون هذه الطلبات من صفحة AMP على الأصل نفسه (غير مخزنة في ذاكرة التخزين المؤقت) أو من صفحة AMP على أصل مختلف (نسخة مخزنة في ذاكرة التخزين المؤقت).

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript><img alt="مثال CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png"></noscript></amp-img>

### الأصول المسموح بها <a name="allowed-origins"></a>

استنادًا إلى ما نعرفه عن اشتراك المصادر في الموارد وAMP (من [التحقق من طلبات اشتراك المصادر في الموارد](#verify-cors-requests) أعلاه)؛ سنسمح بالطلبات لمثالنا من النطاقات التالية:

- `example.com` --- نطاق الناشر
- `example-com.cdn.ampproject.org` --- النطاق الفرعي لذاكرة AMP للتخزين المؤقت من Google

### ترويسات الاستجابة للطلبات المسموح بها <a name="response-headers-for-allowed-requests"></a>

بالنسبة للطلبات من الأصول المسموح بها، ستتضمن استجابتنا الترويسات التالية:

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

هذه عبارة عن ترويسات استجابة إضافية قد نضمِّنها في استجابة اشتراك المصادر في الموارد لدينا:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### منطق صوري لاشتراك المصادر في الموارد <a name="pseudo-cors-logic"></a>

يمكن تبسيط منطقنا للتعامل مع طلبات اشتراك المصادر في الموارد واستجاباته في الرمز الصوري التالي:

[sourcecode:text]
IF CORS header present
   IF origin IN allowed-origins
      allow request & send response
   ELSE
      deny request
ELSE
   IF "AMP-Same-Origin: true"
      allow request & send response
   ELSE
      deny request
[/sourcecode]

#### نموذج رمز اشتراك المصادر في الموارد <a name="cors-sample-code"></a>

إليك نموذج لدالة JavaScript يمكننا استخدامها للتعامل مع طلبات اشتراك المصادر في الموارد واستجاباته:

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
  var unauthorized = 'Unauthorized Request';
  var origin;
  var allowedOrigins = [
    'https://example.com',
    'https://example-com.cdn.ampproject.org',
    'https://cdn.ampproject.org',
  ];
  var allowedSourceOrigin = 'https://example.com'; //publisher's origin
  // If same origin
  if (req.headers['amp-same-origin'] == 'true') {
    origin = sourceOrigin;
    // If allowed CORS origin & allowed source origin
  } else if (
    allowedOrigins.indexOf(req.headers.origin) != -1 &&
    sourceOrigin == allowedSourceOrigin
  ) {
    origin = req.headers.origin;
  } else {
    res.statusCode = 403;
    res.end(JSON.stringify({message: unauthorized}));
    throw unauthorized;
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**ملحوظة**: للحصول على نموذج رمز يعمل، راجع [amp-cors.js](https://github.com/ampproject/amphtml/blob/master/build-system/server/amp-cors.js).

### السيناريو 1: الحصول على طلب من صفحة AMP في الأصل نفسه<a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

في السيناريو التالي، تطلب صفحة `article-amp.html` الملف `data.json`؛ والأصول نفسها.

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript><img alt="مثال CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png"></noscript></amp-img>

إذا قمنا بفحص الطلب، فسنجد:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

ونظرًا لأن هذا الطلب من الأصل نفسه، فلا توجد ترويسة `Origin` ولكن ترويسة طلب AMP المخصص لـ `AMP-Same-Origin: true` موجودة. يمكننا السماح بهذا الطلب لأنه من الأصل نفسه (`https://example.com`).

وستكون ترويسات استجابتنا عبارة عن:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### السيناريو 2: احصل على طلب من صفحة AMP مخزنة مؤقتًا <a name="scenario-2-get-request-from-cached-amp-page"></a>

في السيناريو التالي، تطلب الصفحة `article-amp.html` المخزنة في ذاكرة AMP للتخزين المؤقت من Google ملف `data.json`؛ والأصول مختلفة.

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript><img alt="مثال CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png"></noscript></amp-img>

إذا قمنا بفحص هذا الطلب، فسنجد:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

نظرًا لأن هذا الطلب يحتوي على ترويسة `Origin`، فسنتحقق من أنه من أصل مسموح به. ويمكننا السماح بهذا الطلب لأنه من أصل مسموح به.

وستكون ترويسات استجابتنا عبارة عن:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## العمل مع الخطوط المخزنة في ذاكرة التخزين المؤقت <a name="working-with-cached-fonts"></a>

تخزن ذاكرة AMP للتخزين المؤقت من Google مستندات AMP HTML والصور والخطوط لتحسين سرعة صفحة AMP. وأثناء تسريع صفحة AMP، نريد أيضًا توخي الحذر حيال تأمين الموارد المخزنة مؤقتًا. وسنجري تغييرًا في طريقة استجابة ذاكرة AMP للتخزين المؤقت لمواردها المخزنة مؤقتًا، عادةً للخطوط، وذلك من خلال احترام قيمة الأصل `Access-Control-Allow-Origin`.

### السلوك السابق (قبل أكتوبر 2019) <a name="past-behavior-before-october-2019"></a>

عند تحميل صفحة AMP لـ `https://example.com/some/font.ttf` من السمة `@font-face src`، ستخزِّن ذاكرة AMP للتخزين المؤقت ملف الخط مؤقتًا وخدمة المورد على النحو التالي مع وجود حرف البدل `Access-Control-Allow-Origin`.

- عنوان URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Access-Control-Allow-Origin: *

### السلوك الجديد (أكتوبر 2019 وما بعده) <a name="new-behavior-october-2019-and-after"></a>

في حين أن التنفيذ الحالي مسموح به، فقد يؤدي ذلك إلى استخدام غير متوقع للخطوط من مواقع عبر الأصل. أما في هذا التغيير، ستبدأ ذاكرة AMP للتخزين المؤقت في الاستجابة بقيمة `Access-Control-Allow-Origin` نفسها التي يستجيب لها الخادم الأصلي. ولتحميل الخطوط تحميلًا صحيحًا من مستند AMP المخزن مؤقتًا، ستحتاج إلى قبول أصل ذاكرة AMP للتخزين المؤقت عبر الترويسة.

وسيكون نموذج التطبيق عبارة عن:

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
  var unauthorized = 'Unauthorized Request';
  var allowedOrigins = [
    'https://example.com',
    'https://example-com.cdn.ampproject.org',
  ];
  // If allowed CORS origin
  if (allowedOrigins.indexOf(req.headers.origin) != -1) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  } else {
    res.statusCode = 403;
    res.end(JSON.stringify({message: unauthorized}));
    throw unauthorized;
  }
}
[/sourcecode]

على سبيل المثال، إذا أردت تحميل /some/font.ttf في `https://example.com/amp.html`، فيجب أن يستجيب خادم الأصل بالترويسة Access-Control-Allow-Origin على النحو الموضح أدناه.

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript><img alt="مثال على خط CORS" src="https://amp.dev/static/img/docs/cors-font.jpg"></noscript></amp-img>

[tip type="note"] إذا كان بالإمكان الوصول إلى ملف الخط الخاص بك من أي مصدر، فيمكنك الرد باستخدام حرف البدل `Access-Control-Allow-Origin`، كما أن ذاكرة AMP للتخزين المؤقت ستكرر هذه القيمة مما يعني أنها ستستجيب بـ `Access-Control-Allow-Origin: * `. وإذا كان لديك هذا الإعداد بالفعل، فلا داعي لتغيير أي شيء. [/tip]

إننا نخطط لإجراء هذا التغيير في منتصف أكتوبر 2019 تقريبًا ونتوقع من كل ناشري AMP الذين يستخدمون الخطوط ذاتية الاستضافة التحقق من تأثرها.

#### خطة بدء التنفيذ <a name="roll-out-plan"></a>

- 2019-09-30: يحتوي الإصدار على عناصر تحكم أكثر دقة في النطاقات التي ينطبق عليها هذا التغيير. ويجب بدء تنفيذ هذا الإصدار هذا الأسبوع.
- 2019-10-07: سيتم تمكين نطاقات الاختبار للاختبار اليدوي.
- 2019-10-14: (لكن اعتمادًا على طريقة سريان الاختبار): سيتم طرح الميزة بشكل عام.

تابع المشكلات ذات الصلة [من هنا.](https://github.com/ampproject/amphtml/issues/24834)

## اختبار اشتراك المصادر في الموارد <a name="testing-cors-in-amp"></a>

عند اختبار صفحات AMP، تأكد من تضمين اختبارات من الإصدارات المخزنة مؤقتًا لصفحات AMP لديك.

### تحقق من صحة الصفحة عبر عنوان URL لذاكرة التخزين المؤقت <a name="verify-the-page-via-the-cache-url"></a>

لضمان عرض صفحة AMP المخزنة مؤقتًا وتشغيلها تشغيلها صحيحًا:

1. من المتصفح، افتح عنوان URL الذي ستستخدمه ذاكرة AMP للتخزين المؤقت من أجل الوصول إلى صفحة AMP. ويمكنك تحديد تنسيق عنوان URL لذاكرة التخزين المؤقت من [الأداة في AMP حسب المثال](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/).

    على سبيل المثال:

    - عنوان URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
    - تنسيق عنوان URL لذاكرة AMP  للتخزين المؤقت: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. افتح أدوات تطوير متصفحك وتحقق من عدم وجود أخطاء وأن جميع الموارد تم تحميلها تحميلًا صحيحًا.

### تحقق من صحة ترويسة استجابة الخادم لديك <a name="verify-your-server-response-headers"></a>

يمكنك استخدام الأمر `curl` للتحقق من أن خادمك يرسل ترويسات استجابة HTTP الصحيحة. ففي الأمر `curl`، قدم عنوان URL للطلب وأي ترويسات مخصصة ترغب في إضافتها.

**بناء الجملة**: `curl <request-url> -H <custom-header> - I`

#### اختبار الطلب من الأصل نفسه <a name="test-request-from-same-origin"></a>

في طلب الأصل نفسه، يضيف نظام AMP ترويسة `AMP-Same-Origin:true` المخصصة.

إليك أمر curl الخاص بنا لاختبار طلب من `https://ampbyexample.com` إلى ملف `examples.json` (على النطاق نفسه):

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

تُظهر النتائج من الأمر ترويسات الاستجابة الصحيحة (ملحوظة: تم إخفاء المعلومات الإضافية):

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### اختبار طلب من صحفة AMP المخزنة مؤقتًا <a name="test-request-from-cached-amp-page"></a>

في طلب اشتراك المصادر في الموارد والذي لا يكون من النطاق نفسه (أي ذاكرة التخزين المؤقت)، تكوين الترويسة `origin` جزءًا من الطلب.

وفيما يلي أمر curl الخاص بنا لاختبار طلب من صفحة AMP المخزنة في ذاكرة AMP للتخزين المؤقت من Google إلى الملف `amples.json`:

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

تُظهر النتائج من الأمر ترويسات الاستجابة الصحيحة:

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```
