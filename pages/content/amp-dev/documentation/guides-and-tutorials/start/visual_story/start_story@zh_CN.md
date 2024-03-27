---
'$title': 开始创作故事
$order: 3
description: amp-story 组件可以呈现一个完整的网页故事，它用作故事中所有页面的容器。此外，amp-story 组件还负责 …
author: bpaduch
---

[`amp-story`](../../../../documentation/components/reference/amp-story.md) 组件可以呈现一个完整的网页故事，它用作故事中所有页面的容器。此外，[`amp-story`](../../../../documentation/components/reference/amp-story.md) 组件还负责创建界面外壳，包括处理手势和浏览。

[`amp-story`](../../../../documentation/components/reference/amp-story.md) 组件属于自定义 AMP 组件，与所有自定义组件一样，您必须将该组件的关联脚本添加到 AMP 文档中。

在文本编辑器中**打开** `pets.html` 文件，然后在 `<head>` 部分**添加**以下脚本：

```html
<head>
  <script
    async
    custom-element="amp-story"
    src="https://ampjs.org/v0/amp-story-1.0.js"
  ></script>
</head>
```

将 `<amp-story>` 元素**添加**到文档的 `<body>` 中，并指定强制属性 `standalone`，具体如下所示：

```html
<body>
  <amp-story standalone> </amp-story>
</body>
```

务必要注意的是，为了使 AMP 故事有效，`<body>` 元素必须只有一个子级，即 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 组件；其他所有元素均位于 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 中。

## 提供元信息

为了可以在网络上搜索到这些故事，需要使用特定的元数据来为故事提供小细节，例如：

- 故事标题，使用 `title` 属性表示（例如，“宠物带来的欢乐”）。
- 发布商名称，使用 `publisher` 属性表示（例如，“AMP 教程”）。
- 发布商徽标，使用 `publisher-logo-src` 属性表示。这是徽标图片的网址，按 1x1 的宽高比以正方形表示。
- 故事的海报图片，使用 `poster-portrait-src` 属性表示。这是海报的网址，图片必须以 3x4 的宽高比纵向显示。

我们将上述属性添加到 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 标记中：

```html
<amp-story
  standalone
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
  poster-portrait-src="assets/cover.jpg"
></amp-story>
```

除了上述必需属性外，还可以应用其他属性。要了解详情，请参阅 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 参考文档的[属性](../../../../documentation/components/reference/amp-story.md#attributes)部分。

[tip type="note"] **注**：这些元数据属性是对页面上所有结构化数据（例如 JSON-LD）的补充，而不会取代这些数据。为了确保网页故事在所有平台上可被轻松发现，应当将[结构化数据](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata)添加到所有 AMP 网页，包括 AMP 故事。[/tip]

现在，我们制作了没有任何内容的故事外壳。我们来创建该页面。
