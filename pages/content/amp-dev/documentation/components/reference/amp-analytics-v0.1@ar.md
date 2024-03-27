---
$title: amp-analytics
$category@: ads-analytics
formats:
  - websites
  - email
  - ads
teaser:
  text: Captures analytics data from an AMP document.
---


<!--
Copyright 2019 The AMP HTML Authors. All Rights Reserved.

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



يعمل هذا المكّوِن على استخلاص بيانات التحليلات من مستند AMP.

<table>
  <tr>
    <td class="col-fourty"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-analytics" src="https://ampjs.org/v0/amp-analytics-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>أمثلة</strong></td>
    <td>راجع <a href="https://ampbyexample.com/components/amp-analytics/">مثال amp-analytics</a> على موقع "AMP بالمثال".</td>
  </tr>
</table>

[جدول المحتويات]

## هل سترسل التحليلات إلى حل تابع لمورد أم إلى حل داخلي؟ <a name="sending-analytics-to-a-vendor-or-in-house"></a>

قيل البدء في استخدام AMP Analytics على موقعك، تحتاج أولاً إلى اتخاذ قرار بشأن هل ستستخدم أدوات تحليلات خارجية لتحليل تفاعل المستخدم أم ستستخدم حل مملوك لك.

[tip type="read-on"]
احصل على المعلومات الكاملة عن AMP Analytics في دليل [تهيئة التحليلات](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md).
[/tip]

### إرسال البيانات إلى مورد التحليلات <a name="analytics-vendors"></a>

تم تصميم AMP Analytics خصيصًا لإجراء القياس مرة واحدة وإعداد الكثير من التقارير بناء عليه. فإذا كنت تعمل مع مورد واحد للتحليلات أو أكثر، راجِع قائمة [موردي التحليلات](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) لتعرف مدى تكامل حلولهم مع AMP.

بالنسبة إلى موردي التحليلات المتكاملة مع صفحات AMP:

1. في العلامة `<amp-analytics>`، أضِف السمة `type` وعيّن قيمتها على [المورد](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) المحدد.
2. حدِد البيانات التي تريد استخلاصها وتتبعها، وحدِد تلك التفاصيل في بيانات التهيئة. راجع وثائق المورد للحصول على تعليمات بشأن استخلاص بيانات التحليلات.

في حال عدم تكامل مورد التحليلات مع AMP، تواصل معه لطلب الدعم. ونشجعك أيضًا على إنشاء موضوع في مشروع AMP لطلب إضافة هذا المورد. يمكنك كذلك الاطّلاع على [تكامل أدوات التحليلات برمز HTML لصفحات AMP](../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md). أو اعمل مع المورد على إرسال البيانات إلى عناوين URL محددة لديه. تعرّف على مزيد من المعلومات في القسم [إرسال البيانات إلى حلول داخلية](#sending-data-in-house) أدناه.

*مثال: إرسال البيانات إلى موفر خارجي لخدمات التحليلات*

في المثال التالي، يتم إرسال بيانات التحليلات إلى Nielsen، وهي شركة خارجية توفّر خدمات تحليلات متكاملة مع AMP. يمكن الحصول على تفاصيل تهيئة بيانات تحليلات Nielsen في وثائق [Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

```html
<amp-analytics type="nielsen">
<script type="application/json">
{
  "vars": {
    "apid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "apv": "1.0",
    "apn": "My AMP Website",
    "section": "Entertainment",
    "segA": "Music",
    "segB": "News",
    "segC": "Google AMP"
  }
}
</script>
</amp-analytics>
```

### إرسال البيانات إلى حلول داخلية <a name="sending-data-in-house"></a>

إذا كان لديك حل داخلي مملوك لك لقياس تفاعل المستخدمين، لن تحتاج إلا إلى عنوان URL لتكامل AMP Analytics مع هذا الحل. ويمكنك أيضًا إرسال البيانات إلى عدة عناوين URL. يمكنك مثلاً إرسال بيانات مشاهدة الصفحة إلى عنوان URL وبيانات المشاركة الاجتماعية إلى عنوان URL آخر.

[tip type="note"]
إذا كان الحل الداخلي يتضمن العمل مع مورد تحليلات غير متكامل مع AMP، اعمل معه لتحديد معلومات التهيئة المطلوبة.
[/tip]

لإرسال البيانات إلى عنوان URL محدد:

1. حدِد البيانات التي تريد استخلاصها وتتبعها، و[حدِد تلك التفاصيل في بيانات التهيئة](#specifying-configuration-data).
2. في كائن التهيئة [`requests`](#requests)، حدِد نوع طلب التتبع (مثل، مشاهدة الصفحة أو أحداث لها مشغلات معيّنة) وعناوين URL للجهة التي تريد إرسال بيانات التتبع إليها.

[tip type="note"]
عند معالجة عناوين AMP URL في الرأس المُحيل لطلبات التحليلات، أزِل المعلَمة `usqp` أو تجاهلها. يستخدم Google هذه المعلَمة لتشغيل تجارب "لذاكرة التخزين المؤقت لصفحات AMP من Google".
[/tip]

*مثال: إرسال البيانات إلى عنوان URL*

في ما يلي مثال بسيط يتتبع مشاهدات الصفحة.  وفي كل مرة تتم فيها مشاهدة الصفحة، يتم تنشيط حدث المشغّل ويرسل بيانات مشاهدة الصفحة إلى عنوان URL المحدد بالإضافة إلى معرّف عشوائي.

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

[tip type="success"]
يمكنك الاطّلاع على [التحليلات: حالات الاستخدام](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/use_cases.md) لمعرفة بعض من حالات استخدام التتبع الشائعة (مثل مشاهدات الصفحة والنقرات على الصفحة والتمرير وغيرها).
[/tip]

## تحديد بيانات التهيئة <a name="specifying-configuration-data"></a>

في العنصر `<amp-analytics>`، حدِد كائن التهيئة JSON الذي يحتوي على تفاصيل المعلومات المراد قياسها وجهة إرسال بيانات التحليلات.

يتبع كائن تهيئة `<amp-analytics>` التنسيق التالي:

```javascript
{
  "requests": {
    request-name: request-value,
    ...
  },
  "vars": {
    var-name: var-value,
    ...
  },
  "extraUrlParams": {
    extraurlparam-name: extraurlparam-value,
    ...
  },
  "triggers": {
    trigger-name: trigger-object,
    ...
  },
  "transport": {
    "beacon": *boolean*,
    "xhrpost": *boolean*,
    "image": *boolean*,
  }
}
```

### التهيئة المضمّنة أو التهيئة عن بُعد <a name="inline-or-remote-configuration"></a>

يمكن تحديد بيانات التهيئة بشكل مضمّن أو جلبها عن بُعد من خلال تحديد عنوان URL في السمة `config`. بالإضافة إلى هذا، يمكن اختيار التهيئة المدمجة لموردي التحليلات المشهورين من خلال استخدام السمة `type`.

في حال استخدام البيانات من أكثر مصدر من هذه المصادر، سيتم دمج كائنات التهيئة (المتغيرات والطلبات والمشغلات) بحيث:

1. تكون للتهيئة عن بُعد الأولوية على التهيئة المضمنة.
2. تكون للتهيئة المضمّنة الأولوية على تهيئة المورد.

#### تحميل التهيئة عن بُعد <a name="loading-remote-configuration"></a>

لتحميل التهيئة عن بُعد، حدِد السمة `config` وعنوان URL لبيانات التهيئة في العنصر `<amp-analytics>`. يجب أن يتبع عنوان URL المحدد مخطط HTTPS. قد يتضمن العنوان [متغيرات عناوين URL لصفحات AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-subutions.md). ويمكنك الاطّلاع على السمة [`data-credentials`](#data-credentials) للوصول إلى ملف تعريف الارتباط. ويجب أن تتبع الاستجابة [إرشادات أمان CORS لصفحات AMP](https://github.com/ampproject/amphtml/blob/main/docs/specs-requests.md).

في هذا المثال، نحدِد السمة `config` لتحميل بيانات التهيئة من عنوان URL المحدد.

```html
<amp-analytics config="https://example.com/analytics.account.config.json">;
```

#### أداة إعادة كتابة التهيئة <a name="configuration-rewriter"></a>

تم تصميم ميزة "أداة إعادة كتابة التهيئة" للسماح لموفري خدمات التحليلات بإعادة كتابة التهيئة المتوفرة بشكل ديناميكي. وهي تشبه ميزة "التهيئة عن بُعد" لكنها تتضمن أيضًا أي تهيئة يوفرها المستخدِم في الطلب المُرسَل إلى الخادم. ويمكن لمورد التحليلات وحده تفعيل هذه الميزة في الوقت الحالي.

يحدد مورد التحليلات الخاصية configRewriter بعنوان URL للخادم.
```js
export const VENDOR_ANALYTICS_CONFIG = {
    ...
    'configRewriter': {
      'url': 'https://www.vendor.com/amp-config-rewriter',
    },
    ...
}
```

يرسل وقت التشغيل طلبًا يحتوي على التهيئة المضمّنة مدمجة مع التهيئة المتوفرة عن بُعد إلى نقطة نهاية configRewriter التي يوفرها المورد. يستخدم المورد هذا الجانب من خادم البيانات لإنشاء وعرض التهيئة الجديدة المُعاد كتابتها.

يدمج وقت التشغيل بعد ذلك جميع التهيئات المتوفرة لتحديد التهيئة النهائية بترتيب تنازلي من حيث الأولوية:
1. التهيئة المُعاد كتابتها
1. التهيئة المضمّنة
1. تهيئة المحدَدة من المورد

##### مجموعة المتغيرات <a name="variable-groups"></a>

"مجموعات المتغيرات" هي ميزة تسمح لموفري خدمات التحليلات بتجميع مجموعة محددة مسبقًا من المتغيرات التي يمكن للمستخدِم تفعيلها بسهولة. وسيتم بعد ذلك حل هذه المتغيرات وإرسالها إلى نقطة نهاية `configRewriter` المحددة.

يحتاج موفرو خدمات التحليلات إلى إنشاء كائن `varGroups` جديد في التهيئة `configRewriter` لتفعيل هذه الميزة. ويمكن للناشرين بعد ذلك تضمين `varGroups` التي أنشأها موفر معين والمراد تفعليها في تهيئة التحليلات لديهم. يمكن استخدام جميع المتغيرات التي يتيحها [دليل استبدالات رمز HTML لصفحات AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-subutions.md). *ملاحظة مهمة*: لن تعمل الصيغ ${varName}.

قد يكون هناك مثلاً مورد تأخذ تهيئته الشكل التالي:
```js
// This is predefined by vendor.
export const VENDOR_ANALYTICS_CONFIG = {
    ...
    'configRewriter': {
      'url': 'https://www.vendor.com/amp-config-rewriter',
      'varGroups' : {
        'group1': {
          'referrer': 'DOCUMENT_REFERRER',
          'source': 'SOURCE_URL',
        'group2': {
          'title': 'TITLE',
        },
      },
    },
    ...
}
```

يمكنك تحديد مجموعات المتغيرات المُفعَلة من خلال تضمين `{enabled: true}` لمجموعات `varGroups` المحددة ضمن تهيئة `<amp-analytics>` لدى الموفر. هذا ويُذكر أن `enabled` هي كلمة رئيسية محجوزة، ولا يمكن استخدامها كاسم لمتغير.

في المثال أدناه، تم تفعيل كل من `group1` و`group2`. وسيتم تجاهل أي مجموعات لم يتم تفعيلها بشكل محدد. وبعد ذلك يحل وقت التشغيل كل هذه المتغيرات المُفعَلة ويدمجها في كائن `configRewriter.vars` واحد الذي سيتم إرساله إلى عنوان URL لأداة إعادة كتابة التهيئة.

```html
/* Included on publisher page */
<amp-analytics type="myVendor" id="myVendor" data-credentials="include">
  <script type="application/json">
  {
    "configRewriter": {
      "varGroups": {
        "group1": {
          "enabled": true
        },
        "group2": {
          "enabled": true
        }
      }
    }
  }
  </script>
</amp-analytics>
```

في هذا المثال، سيبدو نص الطلب كما يلي:
```json
/* Sent to configuration rewriter server. */
"configRewriter": {
  "vars": {
    "referrer": "https://www.example.com",
    "source": "https://www.amp.dev",
    "title": "Cool Amp Tips"
  }
}
```

### كائنات بيانات التهيئة <a name="configuration-data-objects"></a>

#### الكائن Requests <a name="requests"></a>

يحدد كائن التهيئة `requests` عناوين URL المستخدمة لنقل البيانات إلى منصة التحليلات وكذلك سلوك تجميع الطلب والإبلاغ عنه. يحدد `request-name` الطلب الواجب إرساله استجابة لحدث معين (مثال: `pageview` أو `event` أو غيره). تحتوي `request-value` على عنوان URL مبدوءًا بـ https، وقد تتضمن القيمة رموزًا مميزة للعناصر النائبة التي تشير إلى طلبات أو متغيرات أخرى. يمكن أيضًا أن تكون `request-value` كائنًا يحتوي على تهيئات طلب اختيارية.

##### تهيئات الطلبات <a name="request-configs"></a>

خصائص تعريف الطلب باستخدام كائن هي:
- `baseUrl`: خاصية تعرِّف عنوان URL للطلب (مطلوبة).
- `reportWindow`: خاصية اختيارية لتحديد الوقت (بالثانية) لوقف الإبلاغ عن الطلبات. يلغي المشغل الذي يتضمن `important: true` القيد الأقصى لنافذة الإبلاغ.

في هذا المثال، جميع الطلبات صالحة.

```javascript
"requests": {
  "base": "https://example.com/analytics?a=${account}&u=${canonicalUrl}&t=${title}",
  "pageview": {
    "baseUrl": "${base}&type=pageview"
  },
  "event": {
    "baseUrl": "${base}&type=event&eventId=${eventId}",
    "batchInterval": 5,
    "reportWindow" : 30
  }
}
```

لدى بعض موفري خدمات التحليلات تهيئة جاهزة مسبقًا، والتي تستخدمها من خلال السمة `type`. إذا كنت تستخدم موفر تحليلات، قد لا تحتاج إلى تضمين معلومات الطلبات. راجع وثائق المورد لمعرفة ما إذا كانت هناك حاجة لتهيئة الطلبات وكيفيتها.

##### تهيئة التجميع <a name="batching-configs"></a>

يمكنك تحديد سلوك التجميع في تهيئة الطلب لتقليل عدد فحص الاتصالات للطلبات. يتم إلحاق أي [`extraUrlParams`](#extra-url-params) ناتجة من `triggers` التي تستخدم الطلب نفسه بالخاصية `baseUrl` في الطلب.

خصائص التجميع هي:
- `batchInterval`: تحدد هذه الخاصية الفاصل الزمني (بالثانية) لتدفق فحص اتصالات الطلبات في صف التجميع. يمكن أن تكون `batchInterval` رقمًا أو مصفوفة أرقام (الحد الأدنى للفاصل الزمني هو 200 ملي ثانية). سيراعي الطلب كل قيمة في المصفوفة ثم يكرر قيمة الفاصل الأخير (أو القيمة الفردية) عند وصوله إلى نهاية المصفوفة.

ترسل التهيئة التالية مثلاً فحص اتصال طلب واحد كل ثانيتين، بفحص اتصال واحد على النحو التالي:
`https://example.com/analytics?rc=1&amp;rc=2`.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": 2,
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

ترسل التهيئة التالية فحص اتصال الطلب الأول بعد ثانية واحدة ثم ترسل طلبًا كل 3 ثوانٍ. يبدو شكل فحص اتصال الطلب الأول `https://example.com/analytics?rc=1` ويأخذ فحص اتصال الطلب الثاني الشكل `https://example.com/analytics?rc=2&amp;rc=3&amp;rc=4`.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": [1, 3],
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

#### الكائن Vars <a name="vars"></a>

يعرّف المكوِّن `amp-analytics` العديد من المتغيرات الأساسية التي يمكن استخدامها في الطلبات. تتوفر قائمة بجميع هذه المتغيرات في [دليل متغيرات `amp-analytics`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md). بالإضافة إلى ذلك، تُقبل جميع المتغيرات التي يتيحها [دليل استبدالات رمز HTML لصفحات AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-subutions.md).

يمكن استخدام كائن التهيئة `vars` لتحديد أزواج المفتاح/القيمة الجديدة أو لإلغاء المتغيرات الحالية التي يمكن الإشارة إليها في قيم `request`. وتستخدم المتغيرات الجديدة بشكل شائع لتحديد معلومات معينة عن الناشر.  ويمكن استخدام المصفوفات لتحديد قائمة من القيم التي يجب أن يكون عنوان URL مشفرًا بشكل منفصل مع الحفاظ على مُحدِد الفاصلة.

```javascript
"vars": {
  "account": "ABC123",
  "countryCode": "tr",
  "tags": ["Swift,Jonathan", "Gulliver's Travels"]
}
```

#### الكائن Extra URL Params <a name="extra-url-params"></a>

يحدد كائن التهيئة `extraUrlParams` معلَمات إضافية يتم تضمينها في الطلب. يتم تلقائيًا إلحاق معلَمات عناوين URL الإضافية بسلسلة طلب البحث لعنوان URL للطلب عبر اصطلاح "&amp;foo=baz" المعتاد.

في ما يلي مثال يُلحق `&a=1&b=2&c=3` بالطلب:

```javascript
"extraUrlParams": {
  "a": "1",
  "b": "2",
  "c": "3"
}
```

قد يتم إرسال `extraUrlParams` عبر نص الطلب بدلاً من عنوان URL في حالة تفعيل `useBody` وإرسال الطلب عبر طريقة النقل `beacon` أو `xhrpost`. في هذه الحالة، لن تكون المعلَمات عبارة عن عناوين URL مشفرة أو مسطحة. راجع [الخيار Use Body للكائن Extra URL Params](#use-body-for-extra-url-params) للحصول على مزيد من التفاصيل.

تحدد السمة `extraUrlParamsReplaceMap` خريطة للمفاتيح والقيم التي تعمل كمعلَمات لـ `String.replace()` لمعالجة المفاتيح مسبقًا في تهيئة `extraUrlParams`. إذا كانت التهيئة `extraUrlParams` مثلاً تحدد `"page.title": "The title of my page"` وتحدد `extraUrlParamsReplaceMap` الصفحة `"page.": "_p_"`، سيتم إلحاق `&_p_title=The%20title%20of%20my%20page%20 `بالطلب.

لا يلزم استخدام `extraUrlParamsReplaceMap` لاستخدام `extraUrlParams`. إذا لم يتم تحديد `extraUrlParamsReplaceMap`، لن يحدث أي استبدال للسلاسل ويتم استخدام السلاسل المحددة في `extraUrlParams` كما هي.

في حال تفعيل `useBody` وإرسال الطلب عبر طريقة النقل `beacon` أو `xhrpost`، لن يتم استبدال سلسلة `extraUrlParamsReplaceMap` إلا على مفاتيح المستوى الأعلى في `extraUrlParams`.

#### الكائن Triggers <a name="triggers"></a>

يوضح كائن التهيئة `triggers` متى يجب إرسال طلب التحليلات. تحتوي السمة `triggers` على زوج المفتاح/القيمة trigger-name وtrigger-configuration. يمكن أن يكون trigger-name أي سلسلة تتكون من أحرف أبجدية رقمية (a-zA-Z0-9). تلغي المشغلات من التهيئة ذات الأولوية الأعلى المشغلات التي تحمل الأسماء نفسها من التهيئة ذات الأولوية الأقل.

* `on` (مطلوبة): هذه السمة هي الحدث الذي سينشط له المشغِل. وقيمها الصالحة هي: `render-start` و`ini-load` و`click` و`scroll` و`timer` و`visible` و`hidden` و`user-error` و[`access-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md) و[`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md).
* `request` (مطلوبة): هذه السمة هي اسم الطلب الذي سيتم إرساله (كما هو محدد في القسم `requests`).
* `vars`: كائن يحتوي على أزواج المفتاح/القيمة ويُستخدَم لإلغاء `vars` المحددة في التهيئة ذات المستوى الأعلى أو لتحديد المتغيرات الفريدة لهذا المشغِل.
* يمكن تحديد `important` للعمل مع الطلبات التي تتيح سلوك التجميع أو نافذة الإبلاغ. يمكن أن يساعد تعيين `important` على `true` في تدفق صف الطلبات المجمعة مع بعض المشغلات المعينة. في هذه الحالة، من الممكن تقليل عدد فحص اتصالات الطلبات بدون فقد أحداث المشغلات المهمة. يمكن أن يؤدي تعيين `important` على `true` أيضًا إلى إلغاء قيمة `reportWindow` للطلب وإرسال فحص اتصالات الطلبات المهمة.
* يمكن تحديد `selector` و`selectionMethod` لبعض المشغلات، مثل `click` و`visible`. يمكن مراجعة [محدِّد العناصر](#element-selector) للحصول على التفاصيل.
* `scrollSpec` (مطلوبة عند تعيين `on` على `scroll`): يتم استخدام هذه التهيئة بالتزامن مع المشغِل `scroll`. يُرجى الاطّلاع على التفاصيل أدناه.
* `timerSpec` (مطلوبة عند تعيين `on` على `timer`): يتم استخدام هذه التهيئة بالتزامن مع المشغل `timer`. يُرجى الاطّلاع على التفاصيل أدناه.
* `sampleSpec` يتم استخدام هذا الكائن لتحديد أسلوب جمع عينات من الطلبات قبل إرسالها. يسمح هذا الإعداد بجمع العينات استنادًا إلى الإدخال العشوائي أو إلى المتغيرات الأخرى التي تتيحها المنصة. يحتوي الكائن على تهيئة لتحديد إدخال يُستخدَم لإنشاء تجزئة وعتبة يجب على التجزئة الوصول إليها.
    * `sampleOn` يتم توسيع نموذج السلسلة هذا عن طريق ملء المتغيرات في المنصة ثم تجزئتها لإنشاء رقم لأغراض منطق العينات الموضح أسفل العتبة أدناه.
    * `threshold` يتم استخدام هذه التهيئة لفلترة الطلبات التي لا تلبي معايير معينة: يجب أن يكون المنطق التالي صحيحًا `HASH(sampleOn) < threshold` حتى يتم إرسال الطلب إلى مورد التحليلات.</li>
* `videoSpec` (تُستخدَم عند تعيين `on` على `video-*`) يتم استخدام هذه التهيئة بالتزامن مع المشغلات [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md).

يمكن استخدام التهيئة التالية مثلاً لجمع عينة قدرها 50٪ من الطلبات بناءً على الإدخال العشوائي أو قدرها 1٪ بناءً على معرّف العميل.

```javascript
'triggers': {
  'sampledOnRandom': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${random}',
      'threshold': 50,
    },
  },
  'sampledOnClientId': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${clientId(cookieName)}',
      'threshold': 1,
    },
  },
},
```

##### محدِّد العناصر <a name="element-selector"></a>

تسمح بعض المشغلات، مثل `click` و`visible`، بتحديد عنصر واحد أو مجموعة من العناصر باستخدام خصائص المحدِّد. يمكن للمشغلات المختلفة تطبيق قيود وتفسيرات مختلفة على العناصر المختارة، مثل ما إذا كان المحدِّد ينطبق على كل العناصر المتطابقة أو على العنصر الأول، أو أي العناصر التي يمكن مطابقتها: هل هي جميع العناصر أو عناصر AMP فقط. يمكنك الاطّلاع على وثائق كل مشغِل ذي صلة للحصول على المزيد من التفاصيل.

خصائص المحدِّد هي:

- `selector` يتم استخدام هذه الخاصية للعثور على عنصر أو مجموعة من العناصر باستخدام الطلب CSS/DOM. يمكن تغيير دلالات كيفية مطابقة العنصر باستخدام `selectionMethod`. يمكن أن تكون قيمة هذه الخاصية واحدة مما يلي:
- محدِّد CSS صالح، مثل `#ad1` أو `amp-ad`.
- `:root` - محدِّد خاص يطابق جذر المستند.
- `selectionMethod` عند تحديدها، يمكن أن تحتوي هذه الخاصية على إحدى القيمتَين: `scope` أو `closest`. تسمح `scope` باختيار عنصر داخل العنصر الرئيسي للعلامة `amp-analytics`. تبحث `closest` عن أقرب كيان أصل للعلامة `amp-analytics` يُرضي المحدِّد المذكور. القيمة التلقائية هي `scope`.

##### مشغِل بدء عرض المستند المضمّن <a name="embed-render-start-trigger"></a>

قد تبلّغ عناصر AMP التي تعمل على تضمين مستندات أخرى في إطارات iframe (مثل الإعلانات) عن حدث بدء العرض (`"on": "render-start"`). يتم إطلاق هذا الحدث عادةً بمجرد إمكانية تأكيد بدء عرض المستند المضمَّن. راجع وثائق عنصر AMP المعين لمعرفة ما إذا كان يطلق هذا الحدث.

يجب أن يحتوي مشغِل عنصر التضمين على [`selector`](#element-selector) يشير إلى العنصر المضمَّن:
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request",
    "selector": "#embed1"
  }
}
```

يمكن أيضًا إطلاق حدث بدء العرض من قِبل المستند نفسه ويمكن تهيئته كما يلي:
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request"
  }
}
```

##### مشغِل التحميل الأولي <a name="initial-load-trigger"></a>

يتم تشغيل حدث التحميل الأولي (`"on": "ini-load"`) عند تحميل المحتوى الأولي لعنصر AMP أو مستند AMP.

يتم تعريف "التحميل الأولي" تبعًا للحاوية وحجمها الأولي.
للحديث بشكل أكثر تحديدًا:

- بالنسبة إلى المستند: جميع العناصر في إطار العرض الأول.
- بالنسبة إلى عنصر التضمين: جميع عناصر المحتوى في مستند التضمين التي يتم وضعها في الحجم الأولي لعنصر التضمين.
- بالنسبة إلى عنصر AMP بسيط (مثل `amp-img`): الموارد نفسها، مثل صورة أو فيديو.

يجب أن يحتوي مشغِل عنصر التضمين أو عنصر AMP على [`selector`](#element-selector) يشير إلى العنصر:
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request",
    "selector": "#embed1"
  }
}
```

يمكن أيضًا إطلاق حدث التحميل الأولي من قِبل المستند نفسه ويمكن تهيئته كما يلي:
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request"
  }
}
```

##### مشغِل مستوى رؤية الصفحة والعنصر <a name="page-and-element-visibility-trigger"></a>

استخدِم مشغِل مستوى رؤية الصفحة (`"on": "visible"`) لتنشيط طلب عندما تصبح الصفحة مرئية. يمكن تهيئة تنشيط هذا المشغِل باستخدام `visibilitySpec`.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
  }
}
```

يمكن تهيئة مشغِل مستوى رؤية العنصر لأي عنصر AMP أو جذر المستند باستخدام [`selector`](#element-selector). سيتم تنشيط المشغِل عندما يتطابق العنصر المحدد مع معلَمات مستوى الرؤية التي يمكن تخصيصها باستخدام `visibilitySpec`.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "elementview",
    "selector": "#ad1",
    "visibilitySpec": {/* optional visibility spec */}
  }
}
```

لاحظ أنه يمكن استخدام المحدِّد لتحديد عنصر واحد فقط، وليس مجموعة. يمكن أن يكون العنصر إما [عنصر AMP تم توسيعه](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-tag-addendum.md#amp-specific-tags) أو جذر المستند.

ينتظر مشغِل مستوى رؤية العنصر الإشارة التي تحددها الخاصية `waitFor` في `visibilitySpec` قبل تتبع مستوى رؤية العنصر. إذا لم يتم تحديد `waitFor`، ينتظر إشارة [`ini-load`](#initial-load-trigger) للعنصر. ويمكنك مراجعة مستندات `waitFor` للحصول على مزيد من التفاصيل.
في حالة تحديد `reportWhen`، ينتظر المشغِل هذه الإشارة قبل إرسال الحدث. ويفيد هذا مثلاً في إرسال أحداث التحليلات عند إغلاق الصفحة.

##### مشغِل الخطأ <a name="error-trigger"></a>

يتم تشغيل حدث خطأ المستخدم (`"on": "user-error"`) عند حدوث خطأ عائد إلى مؤلف الصفحة أو إلى البرنامج المستخدَم في نشر الصفحة. ويتضمن هذا، على سبيل المثال لا الحصر، التهيئة الخاطئة لأحد مكونات AMP أو الإعلانات التي بها تهيئة خاطئة أو التأكيدات التي أخفقت. هذا ويتم الإبلاغ عن أخطاء المستخدِم أيضًا في وحدة تحكم مطوّر البرامج.

```javascript
"triggers": {
  "userError": {
    "on": "user-error",
     "request": "error"
  }
}
```
[tip type="note"]
ملاحظة: هناك [مشكلة معروفة](https://github.com/ampproject/amphtml/issues/10891) تمثل في أن المشغِل لا يزال يُبلغ عن أخطاء من تضمينات A4A iframe، والتي لا صلة لها بالصفحة.
[/tip]

**<a id="visibility-spec"></a>مواصفات مستوى الرؤية**

`visibilitySpec` عبارة عن مجموعة من الشروط والخصائص التي يمكن تطبيقها على المشغِل `visible` أو `hidden` لتغيير وقت تنشيطهما. إذا تم تحديد عدة خصائص، يجب أن تكون جميعها true حتى يتم تنشيط الطلب. خصائص التهيئة المقبولة في `visibilitySpec` هي:

- `waitFor` : تشير هذه الخاصية إلى أنه يجب على مشغِل مستوى الرؤية انتظار إشارة معينة قبل تتبع مستوى الرؤية. القيم المقبولة لها هي `none` و`ini-load` و`render-start`. في حال عدم تحديد `waitFor`، يتم استخدام القيمة التلقائية [`ini-load`](#initial-load-trigger) عند ذكر محدِّد، وإلا يتم استخدام القيمة `none`.
- `reportWhen` : تشير هذه الخاصية إلى أنه يجب على مشغِل مستوى الرؤية انتظار إشارة معينة قبل إرسال المشغِل. القيمة الوحيدة المقبولة هي `documentExit`. ولا يمكن استخدام `reportWhen` و`repeat` معًا في visibilitySpec نفسها. لاحظ أنه عند تحديد `reportWhen`، سيتم إرسال الإبلاغ في نفس وقت الإشارة حتى إذا لم يتم الوفاء بمتطلبات مستوى الرؤية في ذلك الوقت أو لم يتم الوفاء بها من قبل. سيتم ملء أي متغيرات ذات صلة (`totalVisibleTime` وغيره) وفقًا لمتطلبات مستوى الرؤية في `visibilitySpec`.
- `continuousTimeMin` و`continuousTimeMax` : تشير هذه الخصائص إلى وجوب تنشيط الطلب عندما يكون العنصر (أي جزء منه) داخل إطار العرض لفترة زمنية مستمرة تتراوح بين الحد الأدنى والحد الأقصى للأوقات المحددة. يتم التعبير عن الأوقات بالملي ثانية. ويتم استخدام القيمة التلقائية 0 مع `continuousTimeMin` عند عدم تحديدها.
- `totalTimeMin` و`totalTimeMax`: تشير هذه الخصائص إلى أنه يجب تنشيط الطلب عندما يكون العنصر (أي جزء منه) داخل إطار العرض لمدة زمنية إجمالية تتراوح بين الحد الأدنى والحد الأقصى للأوقات المحددة. يتم التعبير عن الأوقات بالملي ثانية. ويتم استخدام القيمة التلقائية 0 مع `totalTimeMin` عند عدم تحديدها.
- `visiblePercentageMin` و`visiblePercentageMax` : تشير هذه الخصائص إلى أنه يجب تنشيط الطلب عندما تكون النسبة المرئية من العنصر داخل إطار العرض تتراوح بين الحد الأدنى والحد الأقصى للنسب المئوية المحددة. هذا ويُذكر أن القيم المئوية بين 0 و100هي قيم صالحة. لاحظ أن الحد الأعلى (`visiblePercentageMax`) مشمولاً. يعد الحد الأدنى (`visiblePercentageMin`) مُستبعَدًا، ما لم يتم تعيين كلا الحدين على 0 أو على 100. في حال تعيين الحدين على 0، يتم تنشيط المشغِل عندما يكون العنصر غير مرئي. في حال تعيين الحدين على 100، يتم تنشيط المشغِل عندما يكون العنصر مرئيًا بالكامل. عند تحديد هذه الخصائص بالإضافة إلى الخصائص الأخرى المتعلقة بالتوقيت، يتم فقط حساب الوقت الذي تكون فيه هذه الخصائص مستوفاة. القيم التلقائية للخصائص `visiblePercentageMin` و`visiblePercentageMax` هي 0 و100 على التوالي.
- `repeat`: إذا تم تعيين هذه الخاصية على `true`، يتم تنشيط المشغِل في كل مرة يتم فيها استيفاء شروط `visibilitySpec`. في المثال التالي، إذا تم تمرير العنصر إلى منطقة العرض بنسبة 51٪ ثم 49٪ ثم 51٪ مرة أخرى، يتم تنشيط المشغِل مرتين. ومع ذلك، إذا كانت الخاصية `repeat` بالقيمة `false`، سيتم تنشيط المشغِل مرة واحدة. القيمة التلقائية للخاصية `repeat` هي `false`. ولا يمكن استخدام `reportWhen` و`repeat` معًا في visibilitySpec نفسها.

```javascript
visibilitySpec: {
  visiblePercentageMin: 50,
  repeat: true,
}
```

يمكن استخدام `visiblePercentageThresholds` كطريقة مختصرة لإنشاء عدة مثيلات من `visibilitySpec`، والتي تختلف فقط في الخاصيتَين `visiblePercentageMin` و`visiblePercentageMax`. الحالتان التاليتان مثلاً متكافئتان:

```javascript
// مشغلان لهما visibilitySpec تختلف فقط في الخاصيتَين visiblePercentageMin وvisiblePercentageMax:
"triggers": {
  "pageView_30_to_40": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 30,
      "visiblePercentageMax": 40,
      "continuousTimeMin": 1000,
    }
  }

  "pageView_40_to_50": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 40,
      "visiblePercentageMax": 50,
      "continuousTimeMin": 1000,
    }
  }
}

// مشغل واحد مكافئ للمشغلين أعلاه:
"triggers": {
  "pageView": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageThresholds": [[30, 40], [40, 50]],
      "continuousTimeMin": 1000,
    }
  }
}
```

بالإضافة إلى الشروط المذكورة أعلاه، تعمل `visibilitySpec` أيضًا على تفعيل بعض المتغيرات الموثقة [هنا](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#visibility-variables).

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "waitFor": "ini-load",
      "reportWhen": "documentExit",
      "visiblePercentageMin": 20,
      "totalTimeMin": 500,
      "continuousTimeMin": 200
    }
  }
}
```

بالإضافة إلى المتغيرات المقدَمة كجزء من المشغلات، يمكنك أيضًا تحديد [متغيرات إضافية كسمة بيانات](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-dattribute) أو تحديد ما يُلغيها. وإذا تم استخدام سمات البيانات هذه، يجب أن تكون جزءًا من العنصر التي تم تعيينه ليكون [`selector`](#element-selector).

##### مشغِل النقر <a name="click-trigger"></a>

استخدِم مشغِل النقر (`"on": "click"`) لتنشيط طلب عند النقر على عنصر محدد. استخدِم [`selector`](#element-selector) للتحكم في العناصر التي تؤدي إلى تنشيط هذا الطلب. وسيتم تنشيط المشغِل لجميع العناصر المطابِقة للمحدِّد الذي تم تعيينه.

```javascript
"vars": {
  "id1": "#socialButtonId",
  "id2": ".shareButtonClass"
},
"triggers": {
  "anchorClicks": {
    "on": "click",
    "selector": "a, ${id1}, ${id2}",
    "request": "event",
    "vars": {
      "eventId": 128
    }
  }
}
```

بالإضافة إلى المتغيرات المقدَمة كجزء من المشغلات، يمكنك أيضًا تحديد [متغيرات إضافية كسمة بيانات](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-dattribute) أو تحديد ما يُلغيها. وإذا تم استخدام سمات البيانات هذه، يجب أن تكون جزءًا من العنصر التي تم تعيينه ليكون `selector`.

##### مشغِل التمرير <a name="scroll-trigger"></a>

استخدِم مشغِل التمرير (`"on": "scroll"`) لتنشيط طلب عند تمرير الصفحة بشروط معينة. يوفر هذا المشغِل [متغيرات خاصة](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#interaction) تشير إلى الحدود التي أدت إلى إرسال الطلب. استخدِم `scrollSpec` للتحكم في وقت تنشيط هذا المشغِل:
- `scrollSpec`: يمكن أن يحتوي هذا الكائن على `verticalBoundaries` و`horizontalBoundaries`. ويلزم توفير خاصية على الأقل من الخاصيتين حتى ينشط حدث التمرير. يجب أن تكون قيم الخاصيتين مصفوفات أرقام تحتوي على الحدود التي يتم عندها إنشاء حدث التمرير. في مقتطف الرمز التالي مثلاً، سيتم تنشيط حدث التمرير عند تمرير الصفحة رأسيًا بنسبة 25٪ و50٪ و90٪. بالإضافة إلى ذلك، سيتم أيضًا تنشيط الحدث عند تمرير الصفحة أفقيًا إلى 90٪ من عرض التمرير. ويتم تقريب حدود التمرير إلى أقرب مضاعفات `5` للحفاظ على أداء الصفحة.

```javascript
"triggers": {
  "scrollPings": {
    "on": "scroll",
    "scrollSpec": {
      "verticalBoundaries": [25, 50, 90],
      "horizontalBoundaries": [90]
    },
    "request": "event"
  }
}
```

##### مشغِل الموقّت <a name="timer-trigger"></a>

استخدِم مشغِل المؤقّت (`"on": "timer"`) لتنشيط الطلب بعد فاصل زمني منتظم. استخدِم `timerSpec` للتحكم في وقت تنشيط هذا المشغِل:

- `timerSpec`: هي مواصفات للمشغلات من النوع `timer`. ما لم يتم تحديد `startSpec`، سيتم تشغيل المؤقّت فورًا (افتراضيًا، مع إمكانية إلغاء تعيينه) على أن يتم تشغيله بعد ذلك حسب الفاصل الزمني المحدد.
    - `interval` تكون مدة الموقّت بالثواني.
    - `maxTimerLength` الحد الأقصى لمدة تشغيل الموقّت، بالثواني. سيتم تشغيل طلب إضافي عند بلوغ `maxTimerLength`. هذا ويُذكر أن القيمة التلقائية هي ساعتين. عند توفير `stopSpec`، ولكن بدون تحديد maxTimerLength، ستكون اللانهاية هي القيمة التلقائية.
    - تُستخدَم `immediate` لتشغيل الموقّت على الفور أو لا. وتكون القيمة التلقائية المنطقية هي true.

```javascript
"triggers": {
  "pageTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 10,
      "maxTimerLength": 600
    },
    "request": "pagetime"
  }
}
```

لتهيئة مؤقّت لأحداث المستخدِم، استخدِم:

- `startSpec`: مواصفات لوقت تشغيل المؤقّت. استخدِم القيمة `on` و`selector` لتتبع أحداث معينة. في حال التهيئة باستخدام `startSpec` لكن بدون `stopSpec`، سيتوقف المؤقّت بعد بلوغ `maxTimerLength` فقط.
- `stopSpec`: مواصفات لوقت إيقاف الموقّت. في حال التهيئة باستخدام `stopSpec` ولكن بدون `startSpec`، سيبدأ المؤقّت على الفور لكن سيتوقف فقط على الحدث المحدد.

```javascript
"triggers": {
  "videoPlayTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 5,
      "startSpec": {
        "on": "video-play",
        "selector": "amp-video"
      },
      "stopSpec": {
        "on": "video-pause",
        "selector": "amp-video"
      }
    },
    "request": "videoRequest"
  }
}
```

راجع مواصفات [المشغلات](#triggers) للحصول على تفاصيل حول إنشاء مشغلات مؤقّت مدمجة. ويُذكر أنه لا يُسمح باستخدام مشغِل مؤقّت لبدء مؤقّت أو إيقافه.

##### مشغِل الصفحة المخفية <a name="hidden-trigger"></a>

استخدِم مشغِل الصفحة المخفية (`"on": "hidden"`) لتنشيط الطلب عندما تصبح الصفحة مخفية.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
  }
}
```

يمكن تضمين [`visibilitySpec`](#visibility-spec) بحيث يتم تنشيط الطلب فقط في حال استيفاء شروط مدة الرؤية.
```json
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
    "visibilitySpec": {
      "selector": "#anim-id",
      "visiblePercentageMin": 20,
      "totalTimeMin": 3000,
    }
  }
}
```
تعني التهيئة أعلاه ما يلي:

<blockquote>
عندما تصبح الصفحة مخفية، يتم تنشيط الطلب إذا كان العنصر #anim-id مرئيًا (أكثر من 20٪ من مساحة إطار العرض) لأكثر من 3 ثوانٍ إجمالاً.
</blockquote>

##### مشغلات الوصول <a name="access-triggers"></a>

يصدِّر نظام AMP Access الكثير من الأحداث لحالات مختلفة في تدفق الوصول. ويمكنك الاطّلاع على [AMP Access وAnalytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md) للحصول على تفاصيل حول مشغلات الوصول (`"on": "access-*"`).

#### مشغلات تحليلات الفيديو <a name="video-analytics-triggers"></a>

توفر تحليلات الفيديو العديد من المشغلات (`"on": "video-*"`) التي يمكن للناشرين استخدامها لتتبع الأحداث المختلفة التي تحدث أثناء عمر الفيديو. تتوفر المزيد من التفاصيل في [تحليلات فيديو AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md).

#### الكائن Transport <a name="transport"></a>

يحدد كائن التهيئة `transport` الكيفية التي بها إرسال الطلب. وتكون قيمته كائنًا ذا حقول يشير إلى طرق النقل المقبولة.

* تشير القيمة `beacon` إلى إمكانية استخدام [`navigator.sendBeacon`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) لنقل الطلب. وترسل طلب POST مع بيانات اعتماد. سيتم إرسال الطلب فارغًا ما لم تكن true هي قيمة الخيار `useBody`. انظر [الخيار Use Body للكائن Extra URL Params](#use-body-for-extra-url-params) للحصول على مزيد من المعلومات عن `useBody`.
* تشير القيمة `xhrpost` إلى إمكانية استخدام `XMLHttpRequest` لإرسال الطلب. وترسل طلب POST مع بيانات اعتماد. سيتم إرسال الطلب فارغًا ما لم تكن true هي قيمة الخيار `useBody`. انظر [الخيار Use Body للكائن Extra URL Params](#use-body-for-extra-url-params) للحصول على مزيد من المعلومات عن `useBody`.
* تشير القيمة `image` إلى إمكانية إرسال الطلب من خلال إنشاء العلامة `Image`. وترسل طلب GET. ويمكنك تعيين `"image": {"suppressWarnings": true}` لإيقاف تحذيرات وحدة التحكم بسبب الاستجابات الفارغة أو إخفاق الطلبات.

قد يستخدم الموردون المعتمدون من MRC آلية نقل رابعة هي "نقل إطار iframe"، عن طريق إضافة سلسلة عنوان URL إلى iframe-transport-vendors.js. وتشير هذه إلى وجوب إنشاء إطار iframe، مع تعيين السمة `src` على عنوان URL هذا، وعندها سيتم إرسال الطلبات إلى إطار iframe هذا من خلال `window.postMessage()` . في هذه الحالة، لا يلزم أن تكون الطلبات عناوين URL كاملة. لا يمكن تحديد `iframe` إلا في `iframe-transport-vendors.js`، وليس ضمن العلامة `amp-analytics` ولا عبر التهيئة عن بُعد. علاوة على ذلك، قد يرسل إطار المورد استجابة يتم استخدامها بواسطة amp-ad-exit. راجع [analytics-iframe-transport-remote-frame.html](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) و[fake_amp_ad_with_iframe_transport.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html): يرسل الملف الأول الكائن JSON{'collected-data': 'abc'} للاستجابة ويستخدم الملف الثاني هذا الكائن لاستبدال 'abc' بـ 'bar_' في عنوان URL النهائي.

إذا تم تفعيل أكثر من طريقة نقل من المذكورة أعلاه، يكون ترتيب الأولوية كما يلي: `iframe` &gt; `beacon` &gt; `xhrpost` &gt; `image`. سيتم استخدام طريقة نقل واحدة فقط على أن تكون الطريقة المقبولة والمتاحة ذات الأولوية الأعلى. إذا كان وكيل المستخدم لدى العميل لا يتيح طريقة، سيتم استخدام الطريقة ذات الأولوية الأعلى التي تم تفعيلها. ويُذكر أنه يتم تفعيل جميع الطرق الأربعة أعلاه تلقائيًا.

في المثال أدناه، لم يتم تحديد عنوان URL للإطار `iframe`، وتم تعيين `beacon` و`xhrpost` على `false`، لذلك لن يتم استخدامهما على الرغم من أنهما أعلى أولوية من `image`. وسيتم تعيين `image` على `true` تلقائيًا، ولكن هذا معلن صراحة هنا. إذا كان وكيل المستخدم لدى العميل يتيح الطريقة `image`، فسيتم استخدامها، وإلا لن يتم إرسال أي طلب.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true
}
```

يمكنك الاطّلاع على [هذا المثال الذي ينفذ واجهة برمجة تطبيقات العميل بالنقل بالطريقة iframe](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) و[مثال الصفحة التي تتضمن إطار iframe هذا](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport.amp.html) للتعرّف على المزيد من المعلومات. يعمل هذا المثال على تحميل [إعلان غير حقيقي](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html) يحتوي على العلامة `amp-analytics`. يُذكر أن محتوى هذا الإعلان يتضمن بعض تعليمات التهيئة الإضافية التي يجب اتباعها.

##### الخيار Use Body للكائن Extra URL Params <a name="use-body-for-extra-url-params"></a>

يشير خيار التهيئة `useBody` إلى ما إذا كان سيتم تضمين الكائن `extraUrlParams` أو لا في نص طلب POST بدلاً من عنوان URL كمعامِلات طلب البحث ذات عناوين URL المشفرة.

يتوفر `useBody` لطريقتي النقل `beacon` و`xhrpost` فقط. إذا كانت true هي قيمة الخيار `useBody` وتم استخدامه بالتزامن مع أي من هاتين الطريقتين، سيتم إرسال `extraUrlParams` في نص الطلب POST. إذا لم يكن الحال هكذا، يتم إرسال الطلب فارغًا ويتم تضمين `extraUrlParams` كمعلَمات عناوين URL.

مع `useBody`، يمكنك تضمين كائنات مدمجة في `extraUrlParams`. ومع ذلك، إذا استخدم الطلب خيارات النقل الأخرى التي لا تتيح عمل `useBody` (مثل `image`)، سيتم تحويل هذه الكائنات المدمجة إلى سلسلة تُضاف إلى عنوان URL باعتبارها `[object Object]`.

```javascript
"transport": {
  "beacon": true,
  "xhrpost": true,
  "useBody": true,
  "image": false
}
```

##### سياسة المُحيل <a name="referrer-policy"></a>

يمكن تحديد سياسة المُحيل في الحقل `referrerPolicy` في تهيئة `transport`. لا يتم حاليًا سوى إتاحة `no-referrer`.
هذا ويُذكر أن سياسة المُحيل متاحة فقط لنقل `image`. إذا تم تحديد `referrerPolicy: no-referrer`، سيتم إلغاء طرق النقل `beacon` و`xhrpost` لتكون `false`.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true,
  "referrerPolicy": "no-referrer"
}
```

#### الميزة Linkers <a name="linkers"></a>

تُستخدم الميزة `linkers` لتفعيل مزامنة المعرفات عبر النطاقات. ستستخدم `amp-analytics` [كائن تهيئة](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md#format) لإنشاء "سلسلة رابط" يتم إلحاقها بالروابط الصادرة المحددة على الصفحة باعتبارها معلَمة عنوان URL. عندما ينقر المستخدِم على أحد هذه الروابط، ستقرأ الصفحة الوجهة سلسلة الرابط من معلَمة عنوان URL لإجراء مزامنة المعرفات. يستخدم هذا عادةً للانضمام إلى جلسات المستخدِم عبر نطاق خادم AMP الوكيل ونطاق الناشر.

يتم توضيح التفاصيل المتعلقة بإعداد تهيئة الرابط في [إعادة توجيه معرفات الرابط](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md).

إذا كنت بحاجة إلى استيعاب هذه المعلَمة، توفّر صفحة [تلقي معرفات الرابط](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md) المعلومات المتعلقة بكيفية إنشاء هذه المعلمة.

#### الميزة Cookies <a name="cookies"></a>

تتيح الميزة `cookies` كتابة ملف تعريف الارتباط إلى النطاق الأصل من خلال استخلاص المعلومات [`QUERY_PARAM`](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#query-parameter) و[`LINKER_PARAM`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#linker-param) من عنوان URL للمستند. ويمكن استخدامها مع ميزات `linkers` لإجراء مزامنة المعرفات من نطاق خادم AMP الوكيل مع صفحات AMP على نطاق الناشر.

يمكن العثور على تفاصيل حول إعداد تهيئة `cookies` في [تلقي معلمات الروابط على صفحات AMP.](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#receiving-linker-params-on-amp-pages)

## التحقق <a name="validation"></a>

اطّلِع على [قواعد amp-analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/validator-amp-analytics.protoascii) في مواصفات مدقق AMP.

### السمات الصالحة للمكّوِن `<amp-analytics>` <a name="valid-attributes-for-"></a>

في ما يلي السمات الصالحة للمكّوِن `amp-analytics`:

**type**

تحدد هذه السمة نوع المورد.  ويمكنك مراجعة قائمة [موردي التحليلات](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) للحصول على التفاصيل.

مثال:

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json"></amp-analytics>
```

**config**

هذه سمة اختيارية يمكن استخدامها لتحميل تهيئة من عنوان URL بعيد محدد. يجب أن يستخدم عنوان URL المحدد المخطط HTTPS. يمكنك أيضًا مراجعة السمة `data-include-credentials` أدناه. قد يتضمن العنوان [متغيرات عناوين URL لصفحات AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-subutions.md). ويجب أن تتبع الاستجابة [إرشادات أمان CORS لصفحات AMP](https://github.com/ampproject/amphtml/blob/main/docs/specs-requests.md).

مثال:

```html
<amp-analytics config="https://example.com/analytics.config.json"></amp-analytics>
```

**data-credentials**<a name="data-credentials"></a>

في حال تعيين هذه السمة على `include`، سيؤدي ذلك إلى تفعيل القدرة على قراءة ملفات تعريف الارتباط وكتابتها بناءً على الطلب المحدد عبر السمة `config`. وهذه السمة اختيارية.

**data-consent-notification-id**

إذا تم توفير هذه السمة، لن تعالج الصفحة طلبات التحليلات إلى أن يؤكد (يقبل) المستخدِم [amp-user-notification](amp-user-notification.md) الذي به معرّف عنصر HTML المحدد. وهذه السمة اختيارية.

## التحليلات لمكونات AMP <a name="analytics-for-amp-components"></a>

يمكن لمطوري مكونات AMP تنفيذ مجموعة من البيانات باستخدام AMP Analytics. ويُرجى الرجوع إلى [تنفيذ التحليلات لمكونات AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-components-analytics.md) للحصول على المزيد من المعلومات.
