---
$title: 制作自适应 AMP 网页
toc: true
---

在 AMP 中制作自适应元素非常简单：只需在其中添加 `layout=responsive` 即可。

[TOC]

## 制作自适应图片

所有外部加载的资源（包括图片）都必须具有指定的尺寸和位置，以确保网页在资源加载期间不会跳动和重排。

要制作自适应图片，请指定宽度和高度，设置自适应布局，然后使用 [`srcset`](/docs/guides/responsive/style_pages.html) 指明对于不同的屏幕尺寸所用的图片资源：

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

此 `amp-img` 元素的宽度根据其容器元素的宽度自动调整，高度则根据由指定宽度和高度确定的宽高比自动设定：

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857" layout="responsive"></amp-img>

另请参阅 [AMP by Example 的 amp-img](https://ampbyexample.com/components/amp-img/)。

## 向网页添加样式

将所有样式添加到文档标头中的 `<style amp-custom>` 标记中。例如：

[sourcecode:html]
<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html" >
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
[/sourcecode]

**重要提示**：AMP 中不允许使用多个 `<style amp-custom>` 标记，确保您的网页中只有一个。

借助常见 CSS 属性，使用类或元素选择器来定义组件样式。例如：

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**重要提示**：检查 AMP 是否支持您的样式；出于性能方面的考虑，AMP 不支持某些样式（另请参阅[支持的 CSS](/docs/guides/responsive/style_pages.html)）。

## 尺寸和位置元素

AMP 将文档布局从资源加载中分离开来，这样 AMP 就能够加载网页的布局，而无需等待资源加载。

通过提供 `width` 和 `height` 属性，为所有可见的 AMP 元素指定尺寸和位置。这两种属性暗含元素的宽高比，相应元素可根据容器尺寸进行调整。

将布局设置为自适应。这样一来，元素的宽度将根据其容器元素的宽度来设定，高度则根据由宽度和高度属性确定的宽高比自动重新调整。

详细了解 [AMP 中支持的布局](/docs/guides/responsive/control_layout.html)。

## 验证样式和布局

使用 AMP 验证工具测试您网页的 CSS 和布局值。

验证工具将确认您网页的 CSS 是否超过 50000 字节的限制，检查是否使用了禁止的样式，并检查网页是否采用了受支持的布局，格式是否正确无误。另请参阅完整的[样式和布局错误](/docs/reference/validation_errors.html#style-and-layout-errors)列表。

下方是控制台中的一个错误示例，网页的 CSS 超出 50000 字节的限制：

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

详细了解如何[验证 AMP 网页](/docs/guides/validate.html)，包括如何找出样式错误并进行修复。
