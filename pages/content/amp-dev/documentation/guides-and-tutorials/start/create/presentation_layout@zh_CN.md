---
"$title": 修改呈现形式和布局
"$order": '3'
description: AMP 网页是一些网页；网页及其元素的任何样式设置操作都是使用常见 CSS 属性完成的。使用类或 <head> 中名为 <style amp-custom> 的嵌入式样式表中…
author: pbakaus
contributors:
- bpaduch
---

## 修改呈现形式

AMP 网页是一些网页；网页及其元素的任何样式设置操作都是使用常见 CSS 属性完成的。使用类或 `<head>` 中名为 `<style amp-custom>` 的嵌入式样式表中的元素选择器来设置元素的样式：

[sourcecode:html]
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
[/sourcecode]

每个 AMP 网页都只能有一个嵌入式样式表和一些内嵌样式，并且还有一部分不允许您使用的选择器。[了解所有样式设置的相关信息](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md)。

## 控制布局

在网页上放置元素时，AMP 遵循更严格的规则。在常规 HTML 网页上，您几乎完全使用 CSS 来放置元素。但是，出于性能原因，AMP 要求所有元素从一开始就必须设置显式大小。

[tip type="read-on"] <strong>延伸阅读</strong>：如需详细了解 AMP 如何呈现网页和设置网页布局，以及如何修改布局，请参阅[控制与媒体查询](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)。[/tip]
