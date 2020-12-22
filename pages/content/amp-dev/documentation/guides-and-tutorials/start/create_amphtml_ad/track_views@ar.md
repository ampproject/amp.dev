---
"$title": تتبع مشاهدات الإعلان
"$order": '2'
description: ضمن إعلانات AMPHTML، يمكنك تتبع المقاييس باستخدام مكون amp-pixel أو amp-analytics. في نموذجنا الأساسي، سنضيف القدرة على تتبع مشاهدات الصفحة ...
---

ضمن إعلانات AMPHTML، يمكنك تتبع المقاييس باستخدام المكون [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) أو [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). وفي نموذجنا الأساسي، سنضيف القدرة على تتبع مشاهدات الصفحة باستخدام المكون `amp-pixel` والإشارة إلى عنوان URL الذي يسجل مشاهدات الصفحة (في هذه الحالة، عنوان URL وهمي):

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
<amp-pixel src="https://www.amp.dev/tracker/foo"></amp-pixel>
</body>
```

هذا كل شيء، لقد أنشأت إعلان AMPHTML الخاص بك!

قبل تحميل إعلانك على خادم الإعلانات، هناك خطوة أخيرة ينبغي عليك اتخاذها؛ التأكد من صحة تركيب إعلانك.
