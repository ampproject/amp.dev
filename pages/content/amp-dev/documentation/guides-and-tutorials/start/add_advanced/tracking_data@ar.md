---
"$title": تتبع الانخراط مع التحليلات
"$order": '4'
description: عادةً ما يتم دمج منصات التحليلات في المواقع الإلكترونية من خلال الأوامر الجاهزة المضمّنة الخاصة بـ JavaScript، واستدعاءات الوظائف، التي تؤدي إلى أحداث يتم إرسالها مرة أخرى إلى نظام التحليلات.
---

Analytics platforms are commonly integrated into websites through inline JavaScript snippets and function calls, which trigger events that are sent back to the analytics system. AMP provides a flexible JSON configuration syntax to replicate this process for several analytics partners.

فيما يلي مثال على تتبع Google Analytics التقليدي المستند إلى JavaScript. سنعيد كتابة هذا في تنسيق [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) JSON ولكن أولاً، دعنا نلقي نظرة على الطريقة التقليدية:

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

لتكرار هذه الوظيفة في AMP، يجب علينا أولاً **تضمين** مكتبة مكونات [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) في `<head>` الخاص بمستندنا:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

بعد ذلك، دعونا **نُضيف** مكوّن <a><code data-md-type="codespan">amp-analytics</code></a>  إلى نهاية <code>body</code> الخاص بالمستند:

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

تمامًا كما هو الحال مع مثال JavaScript في أعلى هذه الصفحة، سيرسل هذا الأمر السريع الخاص بـ [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) إشعارًا إلى Google Analytics يشير إلى أنه تمت زيارة هذه الصفحة.

لجعل هذه أكثر تحديدًا قمنا بتعيين `type` إلى `googleanalytics` ثم في JSON، أنشأنا مُشغلاً أطلقنا عليه اسم "مشاهدة الصفحة الافتراضية".  سينطلق هذا المُشغل عندما تكون الصفحة مرئية (بسبب `"on": "visible"`) وعندما ينطلق سنرسل طلب تحليلات `pageview` إلى Google Analytics مع `vars` الذي قمنا بتحديده.

يُعد JSON المستخدم لتكوين [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) تنسيقًا مرنًا للغاية لوصف بيانات التحليلات المراد إرسالها ومتى يتم إرسالها. يحتوي [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) على تفاصيل كاملة عن التنسيق.

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

سينطلق هذا المشغل الجديد، مثلما نستنبط من اسمه، عند النقر فوق العنصر الذي يحمل المُعرّف `"header"` (المُحدد من قِبل `"on": "click"` و`"selector": "#header"`). وعندما ينطلق المُشغل، سنرسل طلب `event` إلى موفر التحليلات الخاص بنا، مع تحديد بضع متغيرات لتضمينها في الطلب.

إذا كان لديك نظام تتبع مخصص ترغب في الاندماج معه، فلا يزال بإمكانك استخدام [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) وتحديد نقاط نهاية URL المخصصة لإرسال بيانات التتبع إليها. تعرّف على المزيد في المستندات المرجعية لمكوِّن [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

[tip type="note"] **ملحوظة –**  `“UA-YYYY-Y”` هو مثال لحساب Google Analytics؛ يجب استبداله بشفرة تتبع Google Analytics للموقع الإلكتروني الخاص بك إذا كنت تستخدم هذا المثال على موقعك. [/tip]

[tip type="tip"] **ملحوظة –** إذا كنت مهتمًا بنظام تتبع أبسط، فقد ترغب في إلقاء نظرة على [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). إذا كنت بحاجة فقط إلى تتبع مشاهدات الصفحة، فإن [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) هو حل أخف وزنًا من [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) لأنه يهدف فقط إلى حل متطلبات تتبع البكسل التقليدي. تعرف على المزيد في [التحليلات: دليل الأسس](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
