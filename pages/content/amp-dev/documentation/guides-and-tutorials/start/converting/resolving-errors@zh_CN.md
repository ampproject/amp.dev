---
"$title": 解决验证错误
"$order": '2'
description: 在本部分中，我们将讲解 AMP 网页中的 AMP 验证错误及其解决方法。请注意，这些错误可能会在您的控制台中以不同的顺序出现。
---

在本部分中，我们将讲解 AMP 网页中的 AMP 验证错误及其解决方法。请注意，这些错误可能会在您的控制台中以不同的顺序出现。

## 添加字符集

首先，我们将修正以下错误：

<pre class="error-text">
The mandatory tag 'meta charset=utf-8' is missing or incorrect.
</pre>

要正确显示文字，AMP 要求您为网页指定字符集。此外，元字符集信息必须是 `<head>` 标记的第一个子级。之所以必须将此标记作为第一个子级，是为了避免重复解析在元字符集标记前面添加的内容。

将以下代码**添加**为 `<head>` 标记的第一行代码：

```html
<meta charset="utf-8" />
```

**保存**文件并重新加载网页。验证字符集错误是否不再出现。

## 添加规范链接

现在，我们来看看以下错误：

<pre class="error-text">
The mandatory tag 'link rel=canonical' is missing or incorrect.
</pre>

每个 AMP 文档都需要拥有引用该文档“规范”版本的链接。在本教程的[使您的网页可被轻松发现](discoverable.md)步骤中，我们将详细了解规范网页的定义，以及实现规范关联的不同方式。

对于本教程，我们将要转换的原始 HTML 报道视为规范网页。

请将以下代码**添加**到 `<meta charset="utf-8" />` 标记下方：

```html
<link rel="canonical" href="/article.html">
```

[tip type="note"] 您可以创建独立的规范 AMP 网页。在这种情况下，规范链接仍是必需的，但应指向 AMP 报道本身：

```html
<link rel="canonical" href="article.amp.html">
```

[/tip]

现在，**重新加载**网页。虽然仍有很多错误需要修正，但规范链接错误已不复存在。

## 指定 AMP 属性

AMP 要求网页的根 `<html>` 元素中具有相关属性，以将网页声明为 AMP 文档。

<pre class="error-text">
The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'
The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.
</pre>

只需将 `⚡` 属性添加到 `<html>` 标记，即可解决上述错误，如下所示：

```html
<html ⚡ lang="en">
```

现在，请重新加载网页并检查这两个错误是否已消失。

[tip type="note"] 虽然建议您指定 `⚡`，但您也可以使用 `amp` 属性来替代 `⚡` 属性，如下所示：

```html
<html amp lang="en">
```

[/tip]

## 指定视口

接下来，我们将解决以下错误：

<pre class="error-text">
The mandatory tag 'meta name=viewport' is missing or incorrect.
</pre>

AMP 要求您为视口定义 `width` 和 `minimum-scale`。这两个值必须分别定义为 `device-width` 和 `1`。视口是 HTML 网页的 `<head>` 中包含的常用标记。

要解决视口错误，请将以下 HTML 代码段添加到 `<head>` 标记中：

```html
<meta name="viewport" content="width=device-width">
```

在 AMP 中，必须为 `width` 和 `minimum-scale` 指定值。定义 `initial-scale` 不是一项强制性要求，但在移动网站开发中通常都会指定此值，所以我们建议您也这么做。要详细了解视口和自适应设计，请参阅[配置视口](https://developers.google.com/speed/docs/insights/ConfigureViewport)。

和之前一样，**重新加载**网页并检查错误是否已消失。

## 替换外部样式表

以下错误与使用样式表有关：

<pre class="error-text">
The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.
</pre>

具体来说，此错误涉及的是 `<head>` 标记中的下列样式表链接标记：

```html
<link href="base.css" rel="stylesheet" />
```

问题在于，这是一个外部样式表引用。在 AMP 网页中，为尽可能缩短文档的加载用时，您不能添加外部样式表。相反，您必须使用 <code><style amp-custom></style></code> 标记在 AMP 文档中以内嵌的方式添加所有样式表规则。

```html
<style amp-custom>

/* The content from base.css */

</style>
```

接下来，我们来解决这个错误：

1. **移除** `<head>` 中指向外部样式表的 `<link>` 标记，然后将其替换为内嵌的 `<style amp-custom></style>` 标记。样式标记中的 `amp-custom` 属性必须提供。
2. 将 [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) 文件中的所有样式**复制**到 `<style amp-custom></style>` 标记中。

和之前一样，**重新加载**网页并验证样式表错误是否已消失。

[tip type="note"] **注**：除了必须采用内嵌样式以外，所有样式信息的文件大小还不能超过 50 KB 的上限。您应该先使用  [SASS](http://sass-lang.com/) 等 CSS 预处理器缩减您的 CSS 的大小，然后再将 CSS 内嵌到 AMP 网页中。[/tip]

[tip type="important"] <strong>重要提示</strong>：整个 AMP 文档中只能有一个样式标记。如果 AMP 网页引用了多个外部样式表，则您需要将这些样式表整理为一组规则。要了解哪些 CSS 规则在 AMP 中有效，请参阅[受支持的 CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md)。[/tip]

## 排除第三方 JavaScript

虽然对于 AMP 网页，您可以通过内嵌 CSS 的方式相对轻松地重新制作样式表，但 JavaScript 却并非如此。

<pre class="error-text">
The tag 'script' is disallowed except in specific forms.
</pre>

一般来说，只有符合以下两项主要要求的脚本才允许在 AMP 中使用：

1. 所有 JavaScript 都必须是异步的（即，在脚本代码中添加 `async` 属性）。
2. JavaScript 用于 AMP 库以及网页中的任何 AMP 组件。

这样实际上排除了在 AMP 中使用任何由用户生成的 JavaScript/第三方 JavaScript 的行为，如下所述的情况除外。

[tip type="note"] 对由用户生成的脚本/第三方脚本的限制只存在以下例外情况：

1. 将元数据添加到网页或配置 AMP 组件的脚本。这些脚本将具有类型属性 `application/ld+json` 或 `application/json`。
2. iframe 中包含的脚本。在 iframe 中添加 JavaScript 应该是在万不得已时才使用的措施。应尽可能地将 JavaScript 功能替换为使用 [AMP 组件](../../../../documentation/components/index.html)。在下一部分中，我们将探索我们的第一个 AMP 组件。 [/tip]

尝试打开外部 [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js) 文件。发现了什么？此文件应该不含任何 JavaScript 代码，并且只包含如下所示的信息注释：

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

由于此外部 JavaScript 文件并不是网站的功能性组件，因此我们可以安全地移除整个引用。

从文档中**移除**以下外部 JavaScript 引用：

```html
<script type="text/javascript" src="base.js"></script>
```

现在，**重新加载**网页并验证脚本错误是否已消失。

## 添加 AMP CSS 样板

以下错误涉及缺失的样板代码：

<pre class="error-text">
The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.
The mandatory tag 'head > style : boilerplate' is missing or incorrect.
The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.
</pre>

每个 AMP 文档都必须具有以下 AMP 样板代码：

```html
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
```

将该样板代码**添加**到文档的 `<head>` 标记底部。

`<style amp-boilerplate>` 标记最初会隐藏正文内容，直到 AMP JavaScript 库加载完毕为止，然后正文内容才会呈现。AMP 之所以这样做，是为了防止系统呈现无样式内容，也称为无样式内容闪烁 (FOUC)。这样可以确保网页的所有内容会同时显示，并且首屏中的所有内容都会一起呈现，从而实现具有真正即时感的用户体验。第二个标记可在浏览器停用 JavaScript 时还原此逻辑。

## 将 `<img>` 替换为 `<amp-img>`

AMP 不支持默认 HTML 对应项来显示媒体，这就解释了出现以下错误的原因：

<pre class="error-text">
The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
</pre>

AMP 拥有一个专门用来替换 `<img>` 标记的网络组件，即 [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) 标记：

```html
<amp-img src="mountains.jpg"></amp-img>
```

将 `<img>` 标记**替换**为上述 [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) 标记，然后再次运行验证工具。您应该会遇到几个新的错误：

<pre class="error-text">
Layout not supported: container
The implied layout 'CONTAINER' is not supported by tag 'amp-img'.
</pre>

为什么 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 触发了另一个错误？因为 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 不能直接替代传统 HTML img 标记。使用 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 时还须遵守其他要求。

### AMP 布局系统

该布局错误告诉我们，[`amp-img`](../../../../documentation/components/reference/amp-img.md) 不支持 `container` 布局类型。AMP 设计中最重要的概念之一就是注重减少呈现网页所需的 DOM 重排量。

为了减少 DOM 重排量，AMP 包括了一个布局系统，以确保在下载和呈现网页的生命周期中尽早地了解网页布局。

下图对 HTML 网页通常采用的布局方式和 AMP 施行的布局方式进行了对比。请注意，在左侧的方式中，每次加载广告或图片时，文字都会重排。AMP 的布局方式可以避免移动文字，即使图片和广告需要很长时间才能加载完成也是如此。

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="内容的常见布局方式与 AMP 布局方式之间的比较") }}

借助 AMP 布局系统，您可以按照多种方式放置和缩放网页中的元素：固定尺寸、自适应设计、固定高度等。

在本文的情况中，布局系统推断 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 的布局类型是 `container` 类型。不过，`container` 类型仅适用于包含子元素的元素。`container` 类型与 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 标记不兼容，因此才会出现此错误。

为什么会推断为 `container` 类型？因为我们没有为 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 标记指定 `height` 属性。在 HTML 中，您可以通过始终为网页中的元素指定固定的宽度和高度来减少重排量。在 AMP 中，您需要为 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 元素定义宽度和高度，让 AMP 能够预先确定该元素的宽高比。

将 `width` 和 `height` **添加**到 [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) 标记中，如下所示：

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

刷新网页并检查验证工具；您应该不会再看到任何错误！

您现在已经获得了一篇有效的 AMP 文档，但图片的显示效果并不好，因为它在网页中的位置很不自然。默认情况下，当您为 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 指定高度和宽度后，AMP 会将大小固定为您指定的值；但如果 AMP 能够对图片进行缩放，使其能够以*自适应的方式*进行拉伸并适应网页的布局，无论屏幕尺寸多大都没关系，那岂不是很棒吗？

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="我们的图片不是自适应图片。") }}

幸运的是，AMP 可以根据您指定的宽度和高度来确定元素的宽高比。这样一来，AMP 布局系统便可以按照多种方式放置和缩放元素。`layout` 属性会告知 AMP 您想要如何放置和缩放元素。

我们将 layout 属性**设为** `responsive`，让图片能够缩放并调整大小：

```html
<amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
```

瞧！图片采用了正确的宽高比，并以自适应的方式填满了屏幕的整个宽度。

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="我们的图片现在是自适应图片了！") }}

[tip type="read-on"] <strong>延伸阅读</strong>：要详细了解 AMP 布局系统，请参阅 [AMP 布局规范](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)。[/tip]

## 成功了！

现在，您的 AMP 文档应该会大致如下所示：

```html
<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width">

    <link rel="canonical" href="/article.html">
    <link rel="shortcut icon" href="amp_favicon.png">

    <title>News Article</title>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>

      <amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
    </article>
  </body>
</html>
```

刷新网页，看看控制台的输出结果。您应该会看到以下消息：

<pre class="success-text">
AMP validation successful.
</pre>

### 常见问题解答

- [什么是 DOM 重排？](http://stackoverflow.com/a/27637245)
- [如果未定义 layout 属性，会怎样？](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [如果未定义宽度和高度，会怎样？](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
