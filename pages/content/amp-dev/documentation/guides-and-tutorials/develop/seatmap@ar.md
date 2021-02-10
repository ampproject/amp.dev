---
'$title': إنشاء خريطة مقاعد
$order: 104
description: تُعد خرائط المقاعد جزءًا مهمًا من تطبيقات الويب لحجز التذاكر، لكن التنفيذ في AMP قد يكون صعبًا، أكمل القراءة للتعرف على طريقة تنفيذ خريطة مقاعد في AMP من خلال
tutorial: 'true'
formats:
  - websites
author: kul3r4
contributors:
  - pbakaus
---

تُعد خرائط المقاعد جزءًا مهمًا من تطبيقات الويب لحجز التذاكر، لكن التنفيذ في AMP قد يكون صعبًا، أكمل القراءة للتعرف على طريقة تنفيذ خريطة مقاعد في AMP من خلال استخدام مجموعة من مكونات AMP المتاحة.

[tip] هناك مثال حي على تنفيذ الممارسات الموصوفة أدناه متوفر [هنا](../../../documentation/examples/documentation/SeatMap.html). [/tip]

## مكونات AMP اللازمة

لنبدأ بمراجعة المكونات اللازمة:

### amp-pan-zoom

يسمح [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) بتكبير المحتوى وتحريكه عبر النقر المزدوج والتصغير، حيث يعمل هذا المكون قاعدةً لتنفيذ خريطة المقاعد.

### amp-list

يقوم [`amp-list`](../../../documentation/components/reference/amp-list.md) بإحضار المحتوى على نحو ديناميكي من نقطة نهاية CORS JSON وعرضه باستخدام نموذج مزوّد، كما تستخدَم لجلب التوافر الحالي لخريطة المقعد؛ وذلك ليتسنى للمستخدمين الحصول على أحدث البيانات دائمًا.

### amp-bind

يضيف [`amp-bind`](../../../documentation/components/reference/amp-bind.md) تفاعلية إلى الصفحة، وهو مكون مطلوب هنا لتتبع عدد المقاعد التي تم تحديدها.

### amp-selector

يمثل [`amp-selector`](../../../documentation/components/reference/amp-selector.md) عنصر التحكم الذي يعرض قائمة خيارات ويدع المستخدم يقوم باختياره، ويمكن اعتبار خريطة المقاعد بأكملها قائمة خيارات حيثما يعد كل مقعد عبارة عن خيار، كما أنه يجعل الحالة المحددة للمقاعد أسهل بكثير من خلال السماح لك باستخدام تعبيرات CSS، على سبيل المثال: التعبير التالي يملأ مقعدًا باللون البرتقالي بمجرد تحديده

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## المتطلبات

1. لرسم خريطة مقاعد على أنها SVG حيثما يتم عرض كل مقعد حسب عنصر `rect`، فأنت تحتاج معلومات عن كل مقعد: الموقع `x` و`y`، `width` و`height` وربما `rx` و`ry` لتقريب زوايا المستطيلات.
2. معرِّف فريد لكل مقعد يمكن استخدامه لإجراء الحجز.
3. قياس لكامل العرض والطول لخريطة المقاعد ليتم استخدامه في معلمة `viewbox`.

## رسم خريطة المقاعد

يتم رسم خريطة المقاعد هندسيًا من خلال [`amp-list`](../../../documentation/components/reference/amp-list.md) و[`amp-mustache`](../../../documentation/components/reference/amp-mustache.md). بعد استلام البيانات من استدعاء [`amp-list`](../../../documentation/components/reference/amp-list.md)، يمكنك استخدام هذه البيانات لإجراء عملية التكرار عبر المقاعد:

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## تصميم المقاعد غير المتوفرة

في المثال أعلاه، يُعد `{% raw %}{{unavailable}}{% endraw %}` قيمة حقل تم إرجاعه من خلال نقطة نهاية JSON وتستخدَم لتصميم مقعد غير متوفر، فيما لا يسمح لك هذا النهج بإزالة المعلمات مثل `option="{{id}}"` في حالة ما إذا كان هناك مقعد غير متوفر، حيث لا يمكن للنموذج عمل التفاف كامل لعنصر الصفحة `<html>`.

فيما يوجد نهج بديل وأكثر إسهابًا وهو تكرار العلامات كما يلي:

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## تحجيم خريطة المقاعد لديك

ما لم تكون خريطة المقاعد لديك ثابتة، يكون من الصعب قياس حجم [`amp-list`](../../../documentation/components/reference/amp-list.md) الذي يتضمن خريطة المقاعد، حيث يحتاج [`amp-list`](../../../documentation/components/reference/amp-list.md) إما أبعاد ثابتة أو استخدام `layout="fill"` (لاستخدام المساحة المتوفرة من الحاوية الأصل)، هناك طريقتان لمعالجة هذه المشكلة:

1. حساب المساحة المتوفرة في الصفحة بمجرد معرفتك للمساحة المستخدمة من قبل المكونات الأخرى مثل الترويسة والتذييل، إذ يمكن إجراء هذا الحساب في CSS من خلال استخدام تعبير `calc` وتعيينه على أنه `min-height` لشعبة أصل خاصة بـ [`amp-list`](../../../documentation/components/reference/amp-list.md).
2. استخدام تنسيق مرن عند معرفة ارتفاع تخطيط الصفحة.

## تصميم المكون amp-pan-zoom

في حالة استخدام النهج الموصوف في القسم السابق، فإن [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) تحتاج إلى استخدام `layout="fill"` أيضًا.

[tip type="tip"] **تلميح–** للإبقاء على مساحة بيضاء حول خريطة المقاعد ويظل بالإمكان جعلها جزء من منطقة التصغير والتكبير:

- أضف شعبة التفاف لـ SVG
- أضف مساحة متروكة

إذا لم يكن لديك شعبة التفاف وأضفت هامشًا إلى SVG بدلًا عن ذلك، فلن يجعل ذلك الهوامش جزءًا من منطقة التصغير والتكبير. [/tip]

## معالجة الحالة

عندما ينقر المستخدمون فوق مقاعد مختلفة، من الممكن تتبع `id` المقعد المحدد في متغير باستخدام إما `amp-state` أو من خلال:

- إضافة تعبير [`amp-bind`](../../../documentation/components/reference/amp-bind.md) لكل مقعد لإدراج المقعد المحدد في قائمة
- أو استخدام [`amp-selector`](../../../documentation/components/reference/amp-selector.md) مع الإجراء `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` ليتسنى إدراج كل المقاعد المحددة إلى قائمة

بينما لا يتطلب النهج الأول المكون الإضافي [`amp-selector`](../../../documentation/components/reference/amp-selector.md)، بإمكانه إكمال خريطة المقاعد ببطء شديد نظرًا لأن كل تعبير [`amp-bind`](../../../documentation/components/reference/amp-bind.md) سيتم تقييمه عند تحديد/إلغاء تحديد كل مقعد.

كما يسمح لك النهج الثاني أيضًا بتخفيض تكرار التعبير [`amp-bind`](../../../documentation/components/reference/amp-bind.md) لكل مقعد سيتم عرضه من خلال النموذج.

## بنية HTML النهائية

إليك HTML النهائية لخريطة المقاعد، كمرجع:

[sourcecode:html]
{% raw %}<div class="seatmap-container">
<amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
<template type="amp-mustache">
<amp-pan-zoom layout="fill" class="seatmap">
<amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
<div class="svg-container">
<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>
</div>
</amp-selector>
</amp-pan-zoom>
</template>
</amp-list>

</div>{% endraw %}
[/sourcecode]
