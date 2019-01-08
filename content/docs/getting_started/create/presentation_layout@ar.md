---
$title: تعديل المظهر والتنسيق
---

## تعديل المظهر

صفحات AMP هي صفحات ويب؛ وأي تحكم في أنماط الصفحة وعناصرها يجري باستخدام خصائص CSS الشائعة. تحكّم في أنماط العناصر باستخدام محدّدات الفئة أو العنصر في ورقة أنماط مضمّنة في `<head>`، والتي تُسمى<span dir="ltr" class="nowrap">`<style amp-custom>`</span>:

[sourcecode:html]
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
[/sourcecode]

يمكن لكل صفحة AMP أن تحتوي فقط على ورقة أنماط واحدة مضمّنة، وهناك محدّدات معينة ليس مسموح لك باستخدامها. [تعرّف على كل المعلومات بخصوص التحكم في الأنماط]({{g.doc('/content/docs/design/responsive_amp/style_pages.md', locale=doc.locale).url.path}}).

## التحكم في التنسيق

تتبع AMP قواعد أكثر صرامة عند تنسيق العناصر في الصفحة. في صفحة HTML عادية، أنت تقريبًا تستخدم CSS حصريًا لتنسيق العناصر. لكن لأسباب تتعلق بالأداء، يتطلب AMP أن تتميز كل العناصر بحجم واضح محدّد منذ البداية.

تعرّف على كيفية عرض AMP للصفحة وتنسيقها وكيف يمكنك تعديل التنسيق في [كيفية التحكم في التنسيق]({{g.doc('/content/docs/design/responsive_amp/control_layout.md', locale=doc.locale).url.path}}).

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/docs/getting_started/create/include_image.md', locale=doc.locale).url.path}}"><span class="arrow-prev">سابق</span></a>
  <a class="button next-button" href="{{g.doc('/content/docs/getting_started/create/preview_and_validate.md', locale=doc.locale).url.path}}"><span class="arrow-next">التالى</span></a>
</div>
