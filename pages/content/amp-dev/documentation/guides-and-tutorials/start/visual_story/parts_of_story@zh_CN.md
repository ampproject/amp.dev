---
"$title": 了解 AMP 故事的组成部分
"$order": '2'
description: 网页故事是一种全屏直观叙事体验，可以使用图片、视频、图形、音频等传递信息。非常适合…
author: bpaduch
---

网页故事是一种全屏直观叙事体验，可以使用图片、视频、图形、音频等传递信息。非常适合希望获得零碎、具有丰富视觉效果的内容的用户。

网页故事的基本要素是各个**网页**。这些网页又由各个**图层**组成，图层包含基本的 HTML 和 AMP **元素**。

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

每个要素都会被转换成 AMP 组件，其中故事用 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 表示，网页用 `amp-story-page` 表示，图层用 `amp-story-grid-layer` 表示。

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

我们开始使用 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 容器创建网页故事吧。
