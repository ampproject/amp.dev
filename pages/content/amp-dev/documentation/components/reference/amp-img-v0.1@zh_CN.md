---
$title: amp-img
$category@: media
teaser:
  text: 替换 HTML5 img 标记。
---


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



<table>
  <tr>
    <td class="col-fourty"><strong>说明</strong></td>
    <td>由运行时管理，可替代 HTML <code>img</code> 标记。</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、intrinsic、nodisplay、responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-img/">amp-img 示例</a>。</td>
  </tr>
</table>


# 行为 <a name="behavior"></a>

运行时可能会根据视口位置、系统资源、连接带宽或其他因素选择延迟或优先加载资源。通过 `amp-img` 组件，运行时能够以这种方式有效管理图片资源。

与所有外部抓取的 AMP 资源一样，必须提前为 `amp-img` 组件指定确切尺寸（以 `width`/`height` 的方式指定），这样一来，浏览器即使不抓取图片，也能知道宽高比。实际布局行为由 `layout` 属性决定。

[tip type="read-on"]
详细了解 [AMP HTML 布局系统](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)规范中的布局以及[支持的布局](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute)。
[/tip]

# 示例：显示自适应图片 <a name="example-displaying-a-responsive-image"></a>

在下面的示例中，我们通过设置 `layout=responsive` 来展示一张能够根据视口尺寸自行调整大小的图片。该图片会根据通过 `width` 和 `height` 指定的宽高比进行缩放。

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive">
</amp-img>
```
[/example]

[tip type="read-on"]
如需了解自适应 AMP 网页，请参阅[制作自适应 AMP 网页](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md)指南。
[/tip]

如果 `amp-img` 组件请求的资源未能成功加载，则该资源所对应的空间将为空白，除非提供了 [`fallback`](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#fallback) 子级。仅对初始布局执行后备操作；如果在初始布局完成之后进行后续的 src 更改（例如，通过调整大小和 srcset），则不会执行后备操作，以免影响性能。

# 示例：指定后备图片 <a name="example-specifying-a-fallback-image"></a>

在下面的示例中，如果浏览器不支持 WebP，则会显示后备 JPG 图片：

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

您可以使用 CSS 选择器和元素本身的样式设置占位符背景颜色或其他视觉效果。

图片说明等其他图片功能可通过标准 HTML（例如，`figure` 和 `figcaption`）实现。

[tip type="read-on"]
如需详细了解如何使用 `amp-img`，请参阅以下资源：

* [占位符和后备元素](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)
* [添加图片和视频](../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)
[/tip]

# 属性 <a name="attributes"></a>

**src**

该属性与 `img` 标记中的 `src` 属性类似。该属性的值必须是指向可公开缓存的图片文件的网址。提取 AMP 文件以指向相应图片的缓存版本时，缓存提供商可能会重写这些网址。

**srcset**

与 `img` 标记中的 `srcset` 属性相同。对于不支持 `srcset` 的浏览器，`<amp-img>` 默认使用 `src`。如果仅提供 `srcset` 而不提供 `src`，则系统将选择 `srcset` 中的第一个网址。

**sizes**

与 `img` 标记中的 `sizes` 属性相同。

[tip type="read-on"]
如需了解 `sizes` 和 `srcset` 的用法，请参阅[通过 srcset、sizes 和 heights 设置自适应图片](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md)。
[/tip]

**alt**

替代文字的字符串，与 `img` 中的 `alt` 属性类似。

**attribution**

用于说明图片归属信息的字符串。例如，`attribution="CC courtesy of Cats on Flicker"`

**height** 和 **width**

图片的确切尺寸，供 AMP runtime 用于在不抓取图片的情况下确定宽高比。

**常见属性**

此元素包含扩展到 AMP 组件的[常见属性](../../../documentation/guides-and-tutorials/learn/common_attributes.md)。

# 样式设置 <a name="styling"></a>

可通过 CSS 属性直接设置 `amp-img` 的样式。例如，可通过以下代码将占位符背景颜色设置为灰色：

```css
amp-img {
  background-color: grey;
  }
```

# 提示和技巧 <a name="tips--tricks"></a>

# 放大图片，但不超过最大宽度 <a name="scaling-an-image-up-to-a-maximum-width"></a>

如果您希望图片随着窗口大小的调整而缩放，但宽度不超过最大宽度（这样，拉伸图片时不会超过窗口宽度），请执行以下操作：

1. 为 `<amp-img>` 设置 `layout=responsive`。
1. 在图片的容器中，指定 `max-width:<max width to display image>` CSS 属性。为何在容器中指定？这是因为 `layout=responsive` 的 `amp-img` 元素是块级元素，而 `<img>` 是内嵌元素。****或者，您可以在 CSS 中为 amp-img 元素设置 `display: inline-block`。

# 自适应布局和固有布局之间的区别 <a name="the-difference-between-responsive-and-intrinsic-layout"></a>

使用 `responsive` 和 `intrinsic` 布局都可以创建能够自动缩放的图片。这两种布局的主要区别在于，`intrinsic` 布局使用 SVG 图片作为其缩放元素。这样一来，它就与标准的 HTML 图片具有相同的行为方式，同时保留浏览器知道图片在初始布局上的尺寸这一优势。`intrinsic` 布局具有固定尺寸，且会不断扩大悬浮式 `div`，直至其达到自然图片尺寸或 CSS 上限（如 `max-width`）。在悬浮式 `div` 中，`responsive` 布局将呈现 0x0，这是因为其尺寸继承自父级，而父级在处于悬浮状态时没有自然尺寸。

# 设置尺寸固定的图片 <a name="setting-a-fixed-sized-image"></a>

如果您希望图片以固定尺寸显示，请执行以下操作：

1. 为 `<amp-img>` 设置 `layout=fixed`。
1. 指定 `width` 和 `height`。

[tip type="read-on"]
如果您没有指定 `layout` 属性，可了解一下[推断布局](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)。
[/tip]

# 设置宽高比 <a name="setting-the-aspect-ratio"></a>

对于自适应图片，`width` 和 `height` 无需与 `amp-img` 的宽度和高度完全匹配；这些值只需要能够实现相同的宽高比即可。

例如，您可以只指定 `width="1.33"` 和 `height="1"`，而不是指定 `width="900"` 和 `height="675"`。

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="1.33"
  height="1"
  layout="responsive">
</amp-img>
```
[/example]

# 为不同的屏幕分辨率设置多个源文件 <a name="setting-multiple-source-files-for-different-screen-resolutions"></a>

要提供同一张图片的不同分辨率，应使用 [`srcset`](#attributes) 属性，这些分辨率的宽高比要全部相同。浏览器将根据用户设备的屏幕分辨率和宽度，通过 `srcset` 自动选择最适合的文件。

相比之下，[`media`](../../../documentation/guides-and-tutorials/learn/common_attributes.md#media) 属性用于显示或隐藏 AMP 组件，并且应在设计自适应布局时使用。要显示宽高比不同的图片，适当的方法是使用多个 `<amp-img>` 组件，每个组件的 `media` 属性都与显示每个实例的屏幕宽度一致。

如需了解详情，请参阅[制作自适应 AMP 网页](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#displaying-responsive-images)指南。

# 使尺寸未知的图片的宽高比保持不变 <a name="maintaining-the-aspect-ratio-for-images-with-unknown-dimensions"></a>

AMP 布局系统需要提前知道图片的宽高比，然后才能抓取图片；但在某些情况下，您可能不知道图片的尺寸。要显示尺寸未知的图片并使其宽高比保持不变，请将 AMP 的 [`fill`](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) 布局与 [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/) CSS 属性结合使用。如需了解详情，请参阅 AMP By Example 的[如何支持尺寸未知的图片](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions)。

# 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-img 规则](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)。
