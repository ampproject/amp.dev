---
'$title': إنشاء الإعلان المصور
$order: 1
description: '"إعلاننا عبارة عن صورة بسيطة مع ارتباط تشعبي للموقع المعلن عنه؛ سنعرض الصورة باستخدام علامة amp-img. إليك الرمز: ..."'
---

داخل `<body>` الخاص بمستند إعلان AMPHTML، يمكنك تضمين علامات HTML وAMP؛ على الرغم من ذلك، لا يُسمح بجميع العلامات. راجع [مواصفات إعلان AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins) للحصول على قائمة بالعلامات المسموح بها.

إعلاننا عبارة عن صورة بسيطة مع ارتباط تشعبي للموقع المعلن عنه؛ سنعرض الصورة باستخدام العلامة [`amp-img`](../../../../documentation/components/reference/amp-img.md). إليك الرمز:

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img
      width="300"
      height="250"
      alt="Learn amp"
      src="/static/img/docs/ads/amp-300x250.png"
    ></amp-img>
  </a>
</body>
```

إذا فتحت ملف html الخاص بك في متصفحك، يجب أن ترى الصورة التالية:

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='اعرف المزيد عن إعلان AMP') }}

إذا نقرت فوق الإعلان المصور، فسيتم نقلك إلى الموقع المعلن عنه (على سبيل المثال، موقع مشروع AMP).
