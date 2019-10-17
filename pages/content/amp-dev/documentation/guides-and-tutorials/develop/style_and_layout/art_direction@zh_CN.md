---
$title: 借助 srcset、sizes 和 heights 属性制作自适应图片
---

## srcset

您可以使用 `srcset` 属性通过不同的媒体表达式来控制元素的资源。尤其是，您可以将其用于所有 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 标记，以指定不同屏幕尺寸下所用的图片资源。

在这个简单的示例中，`srcset` 指定了不同屏幕宽度下所用的图片。`w` 描述符可将列表中每张图片的宽度告知浏览器：

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w">
</amp-img>
```
[/example]

注意: AMP 在所有浏览器上都支持具有 `w` 描述符的 srcset。

要详细了解如何使用 `srcset` 制作自适应图片，请参阅[使用自适应图片（现在）](http://alistapart.com/article/using-responsive-images-now)。

## sizes

您还可以将 `sizes` 属性与 `srcset` 结合使用。`sizes` 属性描述如何根据任何媒体表达式来计算元素尺寸。根据计算得来的元素尺寸，用户代理可选择由 `srcset` 属性提供的尺寸最接近的来源。

请查看以下示例：

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw">
</amp-img>
```
[/example]

`sizes` 属性进行了以下定义：当视口的宽度为 650px 或以上时，元素的宽度将为视口尺寸的 50%。例如，如果视口宽度为 800px，则元素的宽度设为 400px。然后，浏览器会在假定设备的像素宽高比为 1 的前提下选择接近 400px 的 `srcset` 资源（在本例中为 `narrow.jpg` (320px)）。

重要提示: 如果在指定 sizes 属性的同时也指定了宽度和高度，则布局默认为 `responsive`。

要详细了解 `sizes` 和 `srcset` 属性如何与媒体查询相匹配，请参阅这篇 [Srcset 和 sizes](https://ericportis.com/posts/2014/srcset-sizes/) 博文。

## heights

所有支持 `responsive` 布局的 AMP 自定义元素也支持 `heights` 属性。与 [img sizes 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)类似，此属性的值是基于媒体表达式的尺寸表达式，但是存在以下两个主要差异：

1. 它会应用于元素的高度，而非宽度。
2. 允许使用百分比值，例如 `86%`。如果使用百分比值，则该值表示元素宽度的百分比。

如果在指定 `heights` 属性的同时也指定了 `width` 和 `height`，则 `layout` 默认为 `responsive`。

示例：

[example preview="top-frame" playground="true"]
```html
<amp-img alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%">
</amp-img>
```
[/example]

在此示例中，该元素的高度默认是宽度的 80%，但对于宽度大于 `500px` 的视口而言，其高度上限是 `200px`。
