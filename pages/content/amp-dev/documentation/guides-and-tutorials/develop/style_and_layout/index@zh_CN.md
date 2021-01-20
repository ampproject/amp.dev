---
$title: 样式和布局
---

AMP HTML 网页的样式和布局与普通的 HTML 网页非常类似，均采用 CSS。

 不过，出于性能和易用性方面的考虑，AMP 限制在某些情况下使用 CSS，但扩展了一些自适应设计功能（例如 [占位符和备用行为](placeholders.md)
、 [通过 srcset 实现的高级艺术指导](art_direction.md)以及 [layout 属性](control_layout.md) 等功能），以更好地控制您元素的显示方式。

提示: 在 AMP 中制作自适应元素非常简单：只需在其中添加 `layout="responsive"` 即可。要详细了解 AMP 中的自适应设计，请转到[制作自适应 AMP 网页](responsive_design.md)。

[video src='https://www.youtube.com/watch?v=y6kA3u3GIws' caption='观看 UpperQuad 工作人员介绍 AMP 项目网站重新设计相关内容（包括初次使用 AMP 会遇到的难题）的视频。']

## 向网页添加样式 <a name="add-styles-to-a-page"></a>

 将所有 CSS 添加到文档标头中的 `<style amp-custom>` 标记中。例如：

[sourcecode:html]
<!doctype html>
<head>
...
<style amp-custom>
/* any custom styles go here. */
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
...
</head>
[/sourcecode]

重要提示: AMP 中不允许使用多个 `<style amp-custom>` 标记，因此确保您的网页中只有一个此标记。

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

重要提示: 检查 AMP 是否支持您的样式；出于性能方面的考虑，AMP 不支持某些样式（另请参阅[支持的 CSS](style_pages.md)）。

## 将布局样式设为自适应

通过提供 `width` 和 `height` 属性，为所有可见的 AMP 元素指定尺寸和位置。这两种属性暗含元素的宽高比，相应元素可根据容器尺寸进行调整。

将布局设置为自适应。这样一来，元素的宽度将根据其容器元素的宽度来设定，高度则根据由宽度和高度属性确定的宽高比自动重新调整。

阅读: 详细了解 [AMP 中支持的布局](control_layout.md)

## 提供占位符和备用行为

AMP 内置了对占位符和备用行为的支持，您的用户再也不用呆呆看着空白的屏幕了。

阅读: 详细了解[占位符和备用行为](placeholders.md)

## 对图片进行艺术指导

AMP 支持 `srcset` 和 `sizes` 属性，以便您能够更加精确地控制要在哪种情景下加载哪些图片。

阅读: 详细了解如何[通过 srcset 和 sizes 进行艺术指导](art_direction.md)

## 验证样式和布局

使用 AMP 验证工具测试您网页的 CSS 和布局值。

 验证工具将确认您网页的 CSS 是否超过 75000 字节的限制，检查网页是否使用了禁止的样式，并检查网页是否采用了受支持的布局且格式是否正确无误。另请参阅完整的[样式和布局错误](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md#style-and-layout-errors) 列表。

下方是 Search Console 中的一个错误示例，网页的 CSS 超出 75000 字节的限制：

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

阅读: 详细了解如何[验证 AMP 网页并解决存在的问题](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)
