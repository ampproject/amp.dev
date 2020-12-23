---
"$title": 添加图片
"$order": '2'
description: 大多数 HTML 标记都可以直接在 AMP HTML 中使用，但某些标记（例如 <img> 标记）被替换为等效标记或略微增强的自定义 AMP HTML 标记
author: pbakaus
contributors:
- bpaduch
---

大多数 HTML 标记都可以直接在 AMP HTML 中使用，但某些标记（例如 `<img>` 标记）被替换为等效标记或略微增强的自定义 AMP HTML 标记（少数存在问题的标记会被完全禁止使用，请参阅[规范中的 HTML 标记](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)）。

要演示其他标记，以下是在网页中嵌入图片所需的代码：

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

[tip type="read-on"] **延伸阅读**：如需了解我们为何要将诸如 `<img>` 等标记替换为 [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) 以及有多少标记可用，请参阅[添加图片和视频](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)。[/tip]
