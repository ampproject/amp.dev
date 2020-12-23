---
"$title": 创建图片广告
"$order": '1'
description: 我们的广告是一个简单的图片，其中带有指向宣传的网站的超链接。我们将使用 amp-img 标记显示图片。代码如下：…
---

在 AMPHTML 广告文档的 `<body>` 中，您可以添加 HTML 和 AMP 标记；但是，并非允许所有标记。请参阅 [AMPHTML 广告规范](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins)查看允许使用的标记的列表。

我们的广告是一个简单的图片，其中带有指向宣传的网站的超链接。我们将使用 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 标记显示图片。代码如下：

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
</body>
```

如果您在浏览器中打开 html 文件后，应看到以下图片：

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='了解 AMP 广告') }}

如果点击图片广告，将转至宣传的网站（即 AMP 项目网站）。
