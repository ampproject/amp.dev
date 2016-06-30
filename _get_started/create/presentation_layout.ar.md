---
layout: page
title: تعديل المظهر والتنسيق
order: 2
locale: ar
---

## تعديل المظهر

صفحات AMP هي صفحات ويب؛ وأي تحكم في أنماط الصفحة وعناصرها يجري باستخدام خصائص CSS الشائعة. تحكّم في أنماط العناصر باستخدام محدّدات الفئة أو العنصر في ورقة أنماط مضمّنة في `<head>`، والتي تُسمى<span dir="ltr" class="nowrap">`<style amp-custom>`</span>:

{% highlight html %}
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
{% endhighlight %}

يمكن لكل صفحة AMP أن تحتوي فقط على ورقة أنماط واحدة مضمّنة، وهناك محدّدات معينة ليس مسموح لك باستخدامها. [تعرّف على كل المعلومات بخصوص التحكم في الأنماط](/docs/guides/responsive/style_pages.html).

## التحكم في التنسيق

تتبع AMP قواعد أكثر صرامة عند تنسيق العناصر في الصفحة. في صفحة HTML عادية، أنت تقريبًا تستخدم CSS حصريًا لتنسيق العناصر. لكن لأسباب تتعلق بالأداء، يتطلب AMP أن تتميز كل العناصر بحجم واضح محدّد منذ البداية.

تعرّف على كيفية عرض AMP للصفحة وتنسيقها وكيف يمكنك تعديل التنسيق في [كيفية التحكم في التنسيق](/docs/guides/responsive/control_layout.html).

{% include button.html title="المتابعة إلى الخطوة 4" link="/docs/get_started/create/preview_and_validate.ar.html" %}
