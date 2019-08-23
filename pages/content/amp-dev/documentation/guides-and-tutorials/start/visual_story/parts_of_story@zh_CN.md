---
$title: 了解 AMP 故事的各个组成部分
---

AMP 故事借助图片、视频、图形、音频等多种方式来传递信息，可提供一种引人入胜的全屏叙事体验。如果您的用户需要的是短小且视觉效果丰富的内容，AMP 故事无疑是您的上乘之选。

AMP 故事的基本构成要素是一个个的**页面**，而这些页面又是由一个个含有基本 HTML 和 AMP **元素**的**图层**构成。

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

每个要素都会被转换成 AMP 组件，其中故事用 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 表示，页面用 `amp-story-page` 表示，图层用 `amp-story-grid-layer` 表示。

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

下面我们就开始使用 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 容器来创作故事吧！
