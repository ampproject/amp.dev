---
"$title": كيفية تكوين التحليلات الأساسية لصفحات AMP الخاصة بك
"$order": '100'
description: عادةً ما يتم دمج منصات التحليلات في المواقع الإلكترونية من خلال الأوامر الجاهزة المضمّنة الخاصة بـ JavaScript، واستدعاءات الوظائف، التي تؤدي إلى أحداث يتم إرسالها مرة أخرى إلى نظام التحليلات.
tutorial: 'true'
formats:
- websites
- stories
- ads
---

عادةً ما يتم دمج منصات التحليلات في المواقع الإلكترونية من خلال الأوامر الجاهزة المضمّنة الخاصة بـ JavaScript، واستدعاءات الوظائف، التي تؤدي إلى أحداث يتم إرسالها مرة أخرى إلى نظام التحليلات. تُوفر AMP بنية تكوين JSON مرنة لتكرار هذه العملية للعديد من شركاء التحليلات.

[tip] **ملحوظة –** إذا كنت تستخدم Google Analytics كموفر للتحليلات، تعلم [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md). [/tip]

## بما يتماشى مع السياق: التحليلات على الصفحات غير الداعمة لـ AMP

فيما يلي مثال على تتبع Google Analytics التقليدي المستند إلى JavaScript. سنعيد كتابة هذا في تنسيق [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) JSON ولكن أولاً، دعنا نلقي نظرة على الطريقة التقليدية:

```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```

JavaScript هذا بسيط للغاية؛ حيث يرسل إشعارًا لتتبع حدث مشاهدة الصفحة.

## الخطوة الأولى: تضمين النص البرمجي الخاص بـ `amp-analytics`

لتكرار هذه الوظيفة في AMP، يجب علينا أولاً **تضمين** مكتبة مكونات [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) في `<head>` الخاص بمستندنا:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

## الخطوة الثانية: إضافة رمز التكوين

Then, let's **add** the [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) component to the end of the `body` of the document:

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    }
  }
}
</script>
</amp-analytics>
```

تمامًا كما هو الحال مع مثال JavaScript في أعلى هذه الصفحة، سيرسل هذا الأمر السريع الخاص بـ [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) إشعارًا إلى Google Analytics يشير إلى أنه تمت زيارة هذه الصفحة.

لجعل هذه أكثر تحديدًا قمنا بتعيين `type` إلى `googleanalytics` ثم في JSON، أنشأنا مُشغلاً أطلقنا عليه اسم "مشاهدة الصفحة الافتراضية".  سينطلق هذا المُشغل عندما تكون الصفحة مرئية (بسبب `"on": "visible"`) وعندما ينطلق سنرسل طلب تحليلات `pageview` إلى Google Analytics مع `vars` الذي قمنا بتحديده.

يُعد JSON المستخدم لتكوين [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) تنسيقًا مرنًا للغاية لوصف بيانات التحليلات المراد إرسالها ومتى يتم إرسالها. يحتوي [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) على تفاصيل كاملة عن التنسيق.

## الخطوة 3: إضافة المزيد من المُشغلات

بناءً على المثال أعلاه، يمكننا **إضافة** مُشغل آخر باسم `"click on #header trigger"`:

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    },
    "click on #header trigger": {
      "on": "click",
      "selector": "#header",
      "request": "event",
      "vars": {
        "eventCategory": "examples",
        "eventAction": "clicked-header"
      }
    }
  }
}
</script>
</amp-analytics>
```

As you can guess from the name of this new trigger it will fire when the element with the ID `"header"` is clicked (specified by `"on": "click"` and `"selector": "#header"`).  When this trigger fires, we'll send the `event` request to our analytics provider, specifying a couple of variables to include in the request.

If you have a custom tracking platform that you want to integrate with, you can still use [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) and define your own personalized URL endpoints to send tracking data to. Learn more in the [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) component reference documentation.

[tip type="note"] **ملحوظة –**  `“UA-YYYY-Y”` هو مثال لحساب Google Analytics؛ يجب استبداله بشفرة تتبع Google Analytics للموقع الإلكتروني الخاص بك إذا كنت تستخدم هذا المثال على موقعك. [/tip]

[tip type="tip"] **TIP –** If you are interested in a simpler tracking system, you might want to take a look at [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md). If you only need to track pageviews, [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md) it is a lighter-weight solution than [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) because it only aims to solve the requirements of traditional pixel tracking. Learn more in the [Analytics: the basics guide](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
