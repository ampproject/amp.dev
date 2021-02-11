---
'$title': استيعاب أجزاء قصة AMP
$order: 2
description: تُعد قصة الويب تجربة سرد قصص مرئية بملء الشاشة تنقل المعلومات مع الصور ومقاطع الفيديو والرسومات والصوت وغير ذلك. إنها مثالية للمستخدمين ...
author: bpaduch
---

تُعد قصة الويب تجربة سرد قصص مرئية بملء الشاشة تنقل المعلومات مع الصور ومقاطع الفيديو والرسومات والصوت وغير ذلك. إنها مثالية للمستخدمين الذين يرغبون في محتوى ثري مرئيًا بحجم صغير.

وتتمثل المكونات الأساسية التي تدخل في قصة الويب في **الصفحات** الفردية. وتتألف هذه الصفحات بدورها من **طبقات** فردية تحتوي على **عناصر** HTML وAMP الأساسية

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

وتتم ترجمة كل من هذه المكونات إلى مكونات AMP، حيث يتم تمثيل القصة عن طريق [`amp-story`](../../../../documentation/components/reference/amp-story.md)، ويتم تمثيل الصفحة عن طريق `amp-story-page`، ويتم تمثيل الطبقات عن طريق `amp-story-grid-layer`.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

لنبدأ في إنشاء قصة الويب باستخدام الحاوية [`amp-story`](../../../../documentation/components/reference/amp-story.md).
