---
$title: 包括图像
---

大多数 HTML 标记都可在 AMP HTML 中直接使用，但某些标记（例如 `<img>` 标记）被替换为等效标记或略微增强的自定义 AMP HTML 标记（少数存在问题的标记会被完全禁止使用，请参阅[规范中的 HTML 标记](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)）。

以下是在页面中嵌入图像所需的代码，用于演示其他标记是什么样的：

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

阅读: 如需了解我们为何要将诸如 `<img>` 等标记替换为 [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) 以及有多少标记可用，请查看[添加图片和视频](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)。
