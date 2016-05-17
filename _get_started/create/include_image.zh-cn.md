---
layout: page
title: 包括图像
order: 1
locale: zh-cn
---

大多数 HTML 标记都可在 AMP HTML 中直接使用，但某些标记（例如 `<img>` 标记）被替换为等效标记或略微增强的自定义 AMP HTML 标记（少数存在问题的标记会被完全禁止使用，请参阅[规范中的 HTML 标记](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)）。

以下是在页面中嵌入图像所需的代码，用于演示其他标记是什么样的：

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

如需了解我们为何要将诸如 `<img>` 等标记替换为 `<amp-img>` 以及有多少标记可用，请查看[包括 Iframe 和媒体](/docs/guides/amp_replacements.html)。

{% include button.html title="继续执行步骤 3" link="/docs/get_started/create/presentation_layout.zh-cn.html" %}
