---
$title: amp-access-laterpay
$category@: dynamic-content
formats:
  - websites
teaser:
  text: >-
    Allows publishers to easily integrate with the LaterPay micropayments
    platform.
---

<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



يتيح المكوِّن `amp-access-laterpay` للناشرين سهولة التكامل مع منصة [LaterPay](https://www.laterpay.net) للدفعات الصغيرة. ويستند المكّوِن إلى [AMP Access](amp-access.md) كما يتطلبه أيضًا.

<table>
  <tr>
    <td class="col-fourty"><strong>النصوص البرمجية المطلوبة</strong></td>
    <td>
      <small>لاحظ أنك تحتاج إلى نصوص برمجية لكل من "amp-access-laterpay" و"amp-access" و"amp-analytics".</small>
      <div>
        <code>&lt;script async custom-element="amp-access" src="https://cdn.ampproject.org/v0/amp-access-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-access-laterpay" src="https://cdn.ampproject.org/v0/amp-access-laterpay-0.2.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td><strong>أمثلة</strong></td>
    <td>يمكن الاطّلاع على <a href="https://ampbyexample.com/components/amp-access-laterpay/">مثال amp-access-laterpay بالشرح</a> في الموقع "AMP بالمثال".</td>
  </tr>
</table>



## السلوك <a name="behavior"></a>

[LaterPay](https://laterpay.net) عبارة عن منصة للدفعات الصغيرة تتيح للمستخدِمين شراء أي محتوى على الإنترنت بنقرتين فقط والحصول على إمكانية الوصول الفوري إلى المحتوى - بدون تسجيل مسبق أو تقديم بيانات شخصية أو إجراء دفع. ولا يدفع المستخدِمون إلا بعد أن يبلغ مجموع مشترياتهم قيمة 5 دولارات أو 5 يورو على جميع مواقع الويب. يمكن لموفري المحتوى بيع عناصر فردية أو بطاقات محددة الوقت، مما يسمح بالوصول إلى المحتوى بسعر موحد أو لوقت محدد.

إذا كنت تُجري التكامل مع LaterPay من خلال [تكامل Connector Script](https://docs.laterpay.net/connector/)، لن تتمكن من استخدام هذا التكامل على صفحات AMP. أما `amp-access-laterpay` فهو يماثل Connector Script، حيث يوفر مجموعة مماثلة من الميزات لكن تم إنشاؤه لصفحات AMP.

من الممكن أيضًا بيع المحتوى عبر LaterPay ببساطة من خلال استخدام `amp-access-laterpay` كطريقة وحيدة للتكامل.

يستخدم المكوِّن `amp-access-laterpay` AMP Access داخليًا لتوفير سلوك مشابه "للوصول إلى AMP"، لكنه مصمم للاستخدام مع خدمة LaterPay.

إذا كانت خدمة "نظام حظر الاشتراك غير المدفوع" مملوكة لك، وتريد استخدامها مع AMP Access ومع LaterPay في نفس الصفحة، من [الممكن أيضًا تحقيق ذلك](#using-amp-access-laterpay-together-with-amp-access).

لا يتطلب المكوِّن `amp-access-laterpay` تفويضًا أو تهيئة الرد على فحص الاتصال لأنه يتم تهيئته مسبقًا للعمل مع خدمة LaterPay. ولا يتطلب كذلك إعدادًا يدويًا لروابط تسجيل الدخول.

يمكن تهيئة خيارات الشراء المختلفة على حساب الناشر على LaterPay، وسيعمل المكوِّن على استرداد التهيئة وإنشاء قائمة بخيارات الشراء المتاحة.

لمعرفة خطوات تهيئة خيارات الشراء، يمكنك الرجوع إلى المستندات التي تتناول تهيئة [LaterPay Connector](https://docs.laterpay.net/connector/configuration/)، وهو عبارة عن التكامل مع واجهة LaterPay الأمامية الحالية.

يمكن تصميم القائمة التي تم إنشاؤها وعرضها وفقًا لتفضيلات الناشر.

يعتمد هذا المكّوِن أيضًا على [ترميز المحتوى المتوفر بحق الوصول](amp-access.md#access-content-markup) لإظهار المحتوى وإخفائه.

## التهيئة <a name="configuration"></a>

تشبه التهيئة AMP Access، لكن لا يلزمها التفويض ولا الرد على فحص الاتصال ولا روابط تسجيل الدخول.

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "property": value
    }
  }
</script>

```

يمكن تعيين القيم التالية في كائن التهيئة `laterpay`:

<table>
  <tr>
    <th class="col-fourty">الخاصية</th>
    <th class="col-twenty">القيم</th>
    <th class="col-fourty">الوصف</th>
  </tr>
  <tr>
    <td><code>articleTitleSelector</code></td>
    <td>محدد CSS <strong>مطلوب</strong></td>
    <td>محدد CSS الذي يحدد العنصر في الصفحة الذي يحتوي على عنوان المقالة. وسيضمن ذلك احتواء الصفحة المعروضة لشراء المقالة على هذا العنوان بحيث يكون المستخدِم على علم بما يشتريه.</td>
  </tr>
  <tr>
    <td><code>articleId</code></td>
    <td>قائمة المعرفات المفصولة بفواصل</td>
    <td>يتم تلقائيًا استخدام عنوان URL لمقالة لمطابقته بخيار شراء، ولكن بدلاً من تحديد مسار عنوان URL لخيار الشراء، يمكنك تعيين معرّف المقالة في LaterPay Connector-UI ثم استخدام الخاصية <code>articleId</code> لمطابقة المقالة مع خيار الشراء.
      <br>
      يعد ذلك ضروريًا في الحالات التي تكون فيها مطابقة خيار الشراء بعنوان URL للمقالة غير مرنة بدرجة كافية. راجِع <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/article_id/">صفحة تهيئة LaterPay Connector()</a>
      للتعرّف على بعض الأمثلة للسيناريوهات التي يكون فيها هذا مفيدًا.</td>
  </tr>
  <tr>
    <td><code>jwt</code></td>
    <td>رمز JWT مميز لتهيئة الدفع الديناميكي</td>
    <td>يتيح لك هذا الخيار تحديد "رمز JSON مميز للويب" مُوقّع باستخدام تهيئة للمحتوى المدفوع المتاح. هذا يعني أنه يمكنك توفير تهيئة في الصفحة، يتم إنشاؤه برمجيًا في صفحاتك بدلاً من تحديدها يدويًا على واجهة Connector Admin في LaterPay. قد يفيد هذا
      بشكل خاص عند تهيئة عمليات الشراء الفردية لعدة مقالات مختلفة.
      <br>
      إذا أردت الحصول على مزيد من المعلومات عن إنشاء هذا الرمز المميز والمحتوى الذي يمكن تحديده فيه، يرجى الرجوع إلى مستندات <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/config_token/#jwt-object-properties">واجهة
        برمجة تطبيقات JWT للمحتوى المدفوع</a> في LaterPay لمعرفة تكامل Connector Script.
    </td>
  </tr>
  <tr>
    <td><code>locale</code></td>
    <td>سلسلة</td>
    <td>تحدد نمط تنسيق السعر المناسب للمنطقة المحلية.</td>
  </tr>
  <tr>
    <td><code>localeMessages</code></td>
    <td>كائن</td>
    <td>تسمح للناشر بتخصيص النص في قائمة خيارات الشراء التي تم إنشاؤها أو أقلمته. يُرجى مراجعة قسم <a href="#localization">الأقلمة</a> للحصول على مزيد من المعلومات.</td>
  </tr>
  <tr>
    <td><code>scrollToTopAfterAuth</code></td>
    <td>منطقي</td>
    <td>إذا كانت القيمة true، تعمل الخاصية على تمرير الصفحة إلى الأعلى بعد نجاح عملية التفويض. قد يفيد هذا إذا كان مكان ظهور مربع الحوار منخفضًا للغاية في الصفحة، ويمكن أن يلتبس على المستخدِم موضع التمرير الحالي بعد العودة إلى الصفحة.</td>
  </tr>
  <tr>
    <td><code>region</code></td>
    <td>سلسلة</td>
    <td>حدِّد هل أنت في <code>eu</code> أو <code>us</code> من <a href="https://connectormwi.laterpay.net/docs/regions-environments-locales.html">منطقتي LaterPa</a>y.</td>
  </tr>
  <tr>
    <td><code>sandbox</code></td>
    <td>منطقي</td>
    <td>تكون مطلوبة فقط إذا كنت تستخدم وضع الحماية لاختبار تهيئة الخادم. تحتاج أيضًا إلى استخدام <a href="../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime">وضع مطوّر البرامج</a> في AMP.</td>
  </tr>
</table>

## استخدام ترميز المحتوى المتوفر بحق الوصول وعرض قائمة الشراء <a name="using-access-content-markup-and-showing-the-purchase-list"></a>

يجب استخدام "ترميز المحتوى المتوفر بحق الوصول" بالطريقة نفسها المستخدَمة مع AMP Access.

يعرض العنصر الذي يحتوي على المعرّف `amp-access-laterpay-dialog` قائمة بخيارات الشراء عندما لا يكون لدى المستخدِم حق الوصول إلى المقالة. تحتوي هذه القائمة على تصميم أساسي ويمكن تخصيصها لجعلها أكثر اندماجًا مع صفحة الناشر.

احرص على إضافة الفئة `amp-access-laterpay` إذا أردت استخدام التصميم التلقائي.

```html
<section amp-access="NOT error AND NOT access" amp-access-hide>
  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section amp-access="error" amp-access-hide class="error-section">
  Oops... Something broke.
</section>

<div amp-access="access" amp-access-hide>
  <p>...article content...</p>
</div>

```

## التصميم <a name="styling"></a>

يتم تطبيق فئات متعددة على بعض العناصر في الترميز الذي تم إنشاؤه. يمكن إحالة العناصر التي لا تحتوي على فئات بشكل لا لبس فيه من خلال محددات عناصر CSS.

توجد بعض تنسيقات CSS الأساسية، لكننا ننصح بأن يعمل الناشرون على تصميم مربع الحوار بحيث يتناسب مع روح وشكل صفحاتهم.

تبدو البنية التي تم إنشاؤها لمربع الحوار كما يلي:

```html

<div id="amp-access-laterpay-dialog" class="amp-access-laterpay">
  <div class="amp-access-laterpay-container">
    <p class="amp-access-laterpay-header">
      Optional, appears if header locale message is defined.
    </p>
    <ul>
      <li>
        <label>
          <input name="purchaseOption" type="radio" />
          <div class="amp-access-laterpay-metadata">
            <span class="amp-access-laterpay-title">Purchase option title</span>
            <p class="amp-access-laterpay-description">Purchase option description</p>
          </div>
        </label>
        <p class="amp-access-laterpay-price-container">
          <span class="amp-access-laterpay-price">0.15</span>
          <sup class="amp-access-laterpay-currency">USD</sup>
        </p>
      </li>
      <!-- ... more list items for other purchase options ... -->
    </ul>
    <button class="amp-access-laterpay-purchase-button">Buy Now</button>
    <p class="amp-access-laterpay-already-purchased-container">
      <a href="...">I already bought this</a>
    </p>
    <p class="amp-access-laterpay-footer">
      Optional, appears if footer locale message is defined.
    </p>
  </div>
  <p class="amp-access-laterpay-badge">Powered by <a href="https://laterpay.net" target="_blank">LaterPay</a></p>
</div>

```

## الأقلمة <a name="localization"></a>

يحدد الناشر في LaterPay Connector UI النص المعروض في مربع حوار خيارات الشراء.

النص المتبقي هو جزء من المكّوِن الموسَع ويمكن تغييره وأقلمته من خلال خيارات التهيئة كما يلي:

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "localeMessages": {
        "messageKey": "message value"
      }
    }
  }
</script>

```

يمكن ترجمة مفاتيح الرسائل التالية أو تخصيصها، لكن مع ملاحظة وجوب احتفاظها بمعناها الأصلي وهدفها.

<table>
  <tr>
    <th class="col-fourty">المفتاح</th>
    <th class="col-fourty">الوصف</th>
    <th>القيمة التلقائية</th>
  </tr>
  <tr>
    <td><code>payLaterButton</code></td>
    <td>النص المعروض في زر الشراء للخيارات التي يمكن دفعها لاحقًا.</td>
    <td>'Buy Now، Pay Later'</td>
  </tr>
  <tr>
    <td><code>payNowButton</code></td>
    <td>النص المعروض في زر الشراء للخيارات التي يجب دفعها عند لحظة الشراء.</td>
    <td>'Buy Now'</td>
  </tr>
  <tr>
    <td><code>defaultButton</code></td>
    <td>النص التلقائي المعروض على زر الشراء قبل تحديد أي خيار.</td>
    <td>'Buy Now'</td>
  </tr>
  <tr>
    <td><code>alreadyPurchasedLink</code></td>
    <td>إذا اشترى المستخدِم المقالة في الماضي لكنه فقد ملفات تعريف الارتباط لديه (أو يستخدم جهازًا آخرًا)، يمكنه استخدام هذا الرابط لتسجيل الدخول إلى LaterPay واستعادة مشترياته.</td>
    <td>'I already bought this'</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>header</code></td>
    <td>نص رأس اختياري.</td>
    <td></td>
  </tr>
  <tr>
    <td class="col-fourty"><code>footer</code></td>
    <td>نص تذييل اختياري.</td>
    <td></td>
  </tr>
</table>

## التحليلات <a name="analytics"></a>

بالنظر إلى استناد `amp-access-laterpay` إلى `amp-access`، فإنه يتيح جميع [أحداث التحليلات](amp-access.md#integration-with-amp-analytics) التي أرسلها `amp-access`.

تمت تهيئة جميع الأمثلة على [https://ampexample.laterpay.net/](https://ampexample.laterpay.net/) لإرسال أحداث التحليلات لذا يمكنك الاطّلاع عليها للحصول على أمثلة أكثر اكتمالًا عن شكل هذا عمليًا.

## استخدام AMP Access LaterPay مع AMP Access <a name="using-amp-access-laterpay-together-with-amp-access"></a>

إذا كان لديك نظام اشتراك حالي وتعتزم استخدام LaterPay فقط لمبيعات المقالات الفردية، من الممكن أن تتعايش طريقتا البيع على نفس الصفحة، باستخدام كل من AMP Access وAMP Access LaterPay معًا.

يُرجى أولاً الرجوع إلى مستندات [AMP Access](amp-access.md) لمعرفة خطوات تهيئة "AMP Access" باستخدام "نظام حظر الاشتراك غير المدفوع" الحالي.

يشرح القسم [تعدد موفري خدمات الوصول](amp-access.md#multiple-access-providers) كيفية إعداد عدة موفري خدمات باستخدام مساحات الأسماء.

عند استخدامه مع LaterPay ومع تكامل مع "نظام حظر الاشتراك غير المدفوع"، يمكن أن تبدو التهيئة الضرورية كما يلي:

```html

<script id="amp-access" type="application/json">
  [
    {
      "vendor": "laterpay",
      "laterpay": {
        "region": "us"
      },
      "namespace": "laterpay"
    },
    {
      "authorization":
          "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
      "pingback":
          "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
      "login":
          "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
      "authorizationFallbackResponse": {"error": true},
      "namespace": "publishername"
    }
  ]
</script>

```

حيث يمكن أن يكون ترميز المحتوى المتوفر بحق الوصول في النهاية بالشكل التالي:

```html
<section amp-access="NOT error AND NOT laterpay.access AND NOT publishername.access" amp-access-hide>
  <p>
    <a on="tap:amp-access.login-publishername">Login here to access your PublisherName subscription.</a>
  </p>

  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section amp-access="error" amp-access-hide class="error-section">
  Oops... Something broke.
</section>

<div amp-access="laterpay.access OR publishername.access" amp-access-hide>
  <p>...article content...</p>
</div>

```

يمكنك الحصول على مثال أكثر اكتمالاً على [https://ampexample.laterpay.net/dual-amp-access.html](https://ampexample.laterpay.net/dual-amp-access.html)

## مستندات ذات صلة <a name="related-documentation"></a>

* [AMP Access](amp-access.md)
* [LaterPay](https://www.laterpay.net)
* [LaterPay: كيف تجري الدفعات الصغيرة؟](https://docs.laterpay.net/how_we_do_micropayments/)
* [LaterPay Connector](https://connectormwi.laterpay.net/docs/index.html) - يشبه AMP Access LaterPay لكنه يُستخدم للصفحات غير AMP.

## التحقق <a name="validation"></a>

اطِّلع على [قواعد amp-access-laterpay](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access-laterpay/validator-amp-access-laterpay.protoascii) في مواصفات مدقق AMP.
