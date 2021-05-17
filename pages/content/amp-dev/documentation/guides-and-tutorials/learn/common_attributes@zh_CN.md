---
'$title': 常见属性
$order: 1
description: AMP 提供了一系列可供很多 AMP 组件（和 HTML 元素）使用的常见属性。本文档将逐一介绍每种常见属性。
toc: 'true'
---

AMP 提供了一系列可供很多 AMP 组件（和 HTML 元素）使用的常见属性。本文档将逐一介绍每种常见属性。

## fallback

fallback 是一种惯例，可让相应元素告知读者，浏览器不支持该元素或未能成功加载所需的基础资源。`fallback` 属性可用于任何具有以下特征的 HTML 元素：即此类元素是某个支持备用行为的 AMP 元素的直接子级。fallback 的确切行为取决于元素的实现方式，但通常情况下，备用元素会代替常规元素显示。

常用于：图片、动画、音频和视频

示例：

```html
<amp-img src="invalid.jpg" height="400" width="300" layout="responsive">
  <div fallback style="background-color: #ccc; display: flex; justify-content: center; align-items: center;">
    Could not load image
  </div>
</amp-img>
```
有关详情，请参阅[占位符和备用行为](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)。

## heights

所有支持 `responsive` 布局的 AMP 元素也都支持 `heights` 属性。此属性的值是一个基于媒体表达式的 sizes 表达式，类似于 [`img` 标记中的 sizes 属性](https://developer.mozilla.org/zh_CN/docs/Web/HTML/Element/img)，但有以下两项主要区别：

1. 该值适用于元素的高度，但不适用于宽度。
2. 允许采用百分比值。百分比值表示元素的高度占宽度的百分比。例如，如果值为 `80%`，则表示元素的高度将是宽度的 80%。

注意: 如果同时指定了 `heights` 属性及 `width` 和 `height`，则 `layout` 默认为 `responsive`。

示例：

```html
<amp-img
  src="amp.png"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
```

有关详情，请参阅[关于 srcset、sizes 和 heights 的艺术指导](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md)。

## layout

AMP 提供了一系列[布局](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute)，以用于指定某个 AMP 组件在文档布局中的行为方式。您可通过下述方法为某个组件指定一种布局：为该元素添加 `layout` 属性，并指定一个受支持的布局值（请参阅该元素的文档以了解哪些值受支持）。

示例：

```html
<amp-img
  src="/img/amp.jpg"
  width="1080"
  height="610"
  layout="responsive"
  alt="an image"
>
</amp-img>
```

有关详情，请参阅[布局和媒体查询](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)以及[布局规范](amp-html-layout/index.md)。

## media <a name="media"></a>

所有 AMP 元素均支持 `media` 属性。`media` 的值是一条媒体查询。如果查询不匹配，系统便既不会呈现相应元素，也不会获取其资源和可能存在的子资源。如果浏览器窗口改变了尺寸或屏幕方向，系统则会重新评估媒体查询，并会根据所得出的新结果来隐藏和显示各元素。

示例：

```html
<amp-img
  media="(min-width: 650px)"
  src="wide.jpg"
  width="466"
  height="355"
  layout="responsive"
></amp-img>
<amp-img
  media="(max-width: 649px)"
  src="narrow.jpg"
  width="527"
  height="193"
  layout="responsive"
></amp-img>
```

有关详情，请参阅[布局和媒体查询](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries)。

## noloading

`noloading` 属性用于表明是否应该对此元素**停用**“‘正在加载’指示器”。很多 AMP 元素都会显示“‘正在加载’指示器”（这是一个基本动画，旨在表明相应元素尚未加载完毕）。

常用于：图片、动画、视频和广告

示例：

```html
<amp-img src="card.jpg" noloading height="190" width="297" layout="responsive">
</amp-img>
```

## on

`on` 属性用于在元素中安装事件处理脚本。所支持的事件取决于元素本身。

常用于：灯箱、边栏、实时列表和表单

语法：

```text
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
```

示例：

```html
<button on="tap:my-lightbox">Open lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay"> ... </amp-lightbox>
```

有关详情，请参阅 [AMP 中的操作和事件](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-actions-and-events.md)。

## placeholder

`placeholder` 属性用于表明标有此属性的元素会充当父级 AMP 元素的占位符。该属性可用于任何具有以下特征的 HTML 元素：即此类元素是某个支持占位符的 AMP 元素的直接子级。默认情况下，即使 AMP 元素的资源尚未下载完毕或尚未完成初始化，与该 AMP 元素对应的占位符也会立即显示。一旦准备就绪，该 AMP 元素通常就会隐藏其占位符并显示所需的实际内容。placeholder 的确切行为取决于元素的实现方式。

常用于：图片、动画、视频和广告

示例：

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
```

有关详情，请参阅[占位符和备用行为](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)。

## sizes

所有支持 `responsive` 布局的 AMP 元素也都支持 `sizes` 属性。`sizes` 属性的值是一个 sizes 表达式，如 [`img` 标记中的 sizes 属性](https://developer.mozilla.org/zh_CN/docs/Web/HTML/Element/img)所述，但该属性适用于所有元素，而不是仅仅适用于图片。

示例：

```html
<amp-img
  src="amp.png"
  width="400"
  height="300"
  layout="responsive"
  sizes="(min-width: 320px) 320px, 100vw"
>
</amp-img>
```

将产生以下嵌套的`img`标签：

```html
<img
  decoding="async"
  src="amp.png"
  sizes="(min-width: 320px) 320px, 100vw"
  class="i-amphtml-fill-content i-amphtml-replaced-content"
/>
```

有关详情，请参阅[关于 srcset、sizes 和 heights 的艺术指导](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md)。

## width 和 height

对于某些[布局](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute)，AMP 组件必须具有包含整数像素值的 `width` 和 `height` 属性。

示例：

```html
<amp-anim width="245" height="300" src="/img/cat.gif" alt="cat animation">
</amp-anim>
```

有关详情，请参阅[布局和媒体查询](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)以及[布局规范](amp-html-layout/index.md)。
