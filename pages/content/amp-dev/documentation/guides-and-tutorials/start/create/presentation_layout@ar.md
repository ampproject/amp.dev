---
"$title": تعديل المظهر والتخطيط
"$order": '3'
description: صفحات AMP هي صفحات ويب؛ حيث يتم أي تخطيط نمط للصفحة وعناصرها باستخدام خواص CSS الشائعة. يمكن ضبط نمط العناصر باستخدام محددات الفئة أو العناصر ...
author: pbakaus
contributors:
- bpaduch
---

## تعديل المظهر

صفحات AMP هي صفحات ويب؛ صفحات AMP هي صفحات ويب؛ حيث يتم أي تخطيط نمط للصفحة وعناصرها باستخدام خواص CSS الشائعة. يمكن ضبط نمط العناصر باستخدام محددات الفئة أو العناصر في صفحة أنماط مضمة في `<head>`، والتي تُسمى <span dir="ltr" class="nowrap"><code><style amp-custom></code></span>:

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

يمكن لكل صفحة AMP أن تحتوي فقط على ورقة أنماط واحدة مضمّنة وأنماط مدمجة، وهناك محدّدات معينة ليس مسموح لك باستخدامها. [تعرّف على كل المعلومات بخصوص التحكم في الأنماط](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## التحكم في التخطيط

تتبع AMP قواعد أكثر صرامة عند تخطيط العناصر في الصفحة. في صفحة HTML عادية، أنت تقريبًا تستخدم CSS حصريًا لتخطيط العناصر. لكن لأسباب تتعلق بالأداء، يتطلب AMP أن تتميز كل العناصر بحجم واضح محدّد منذ البداية.

[tip type="read-on"] **اقرأ –** تعرّف على كيفية عرض AMP للصفحة وتخطيطاتها وكيف يمكنك تعديل التخطيط في [استعلامات التخطيط والوسائط](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]
