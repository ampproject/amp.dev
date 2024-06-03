---
$title: التحميل المسبق لمكونات حظر العرض
$order: 40
tags:
- lcp
- fid
---

اسمح للمستخدمين برؤية المحتوى والتفاعل معه في أسرع وقت ممكن عن طريق التحميل المسبق للمكونات التي قد تحظر العرض الأول. إذ تتضمن مكونات حظر العرض التي يجب الانتباه لها [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) و[`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/). قم بتحميلها مسبقًا بتضمين السمة `rel="preload"` في النص البرمجي للاستيراد الخاص بها:

```
<link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
```

استخدام [أداة تحسين AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) للقيام بذلك تلقائيًا!
