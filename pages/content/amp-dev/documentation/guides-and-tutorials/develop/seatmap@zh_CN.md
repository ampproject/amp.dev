---
"$title": 创建座位图
"$order": '104'
description: 座位图是票务平台网络应用的重要组成部分，但是在 AMP 中实现座位图相当困难。继续阅读以了解如何通过组合使用可用的 AMP 组件…
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- pbakaus
---

座位图是票务平台网络应用的重要组成部分，但是在 AMP 中实现座位图相当困难。继续阅读以了解如何通过组合使用可用的 AMP 组件在 AMP 中实现座位图。

[tip] [此处](../../../documentation/examples/documentation/SeatMap.html)提供了一个实现下面介绍的做法的生动示例。[/tip]

## 需要的 AMP 组件

我们从检查所需的组件开始：

### amp-pan-zoom

[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) 允许通过点按两次和双指张合来缩放和平移内容。此组件用作座位图实现的基础。

### amp-list

[`amp-list`](../../../documentation/components/reference/amp-list.md) 可从 CORS JSON 端点动态获取内容，并使用提供的模板渲染这些内容。用于获取当前的座位图可用性，以便用户始终获得最新数据。

### amp-bind

[`amp-bind`](../../../documentation/components/reference/amp-bind.md) 可向页面中添加交互。需要使用该组件跟踪已被选择的座位数量。

### amp-selector

[`amp-selector`](../../../documentation/components/reference/amp-selector.md) 表示一个控件，此控件会呈现一个选项菜单并允许用户从中进行选择。可将整个座位图视为一个选项菜单，其中每个座位都是一个选项。通过允许使用 CSS 表达式，您可以更轻松地为座位的选择状态设计样式。例如，以下表达式会在某个座位被选择后用橙色填充该座位。

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## 要求

1. 要将座位图绘制为其中的每个座位都由 `rect` 元素表示的 SVG，您需要每个座位的信息：位置 `x` 与 `y`、`width` 与 `height`，以及可能的 `rx` 与 `ry`（用于使矩形的角变为圆角） 。
2. 可用于预订的具体座位的唯一标识符。
3. 要在 `viewbox` 特性中使用的座位图的整个宽度和高度的度量。

## 绘制座位图

通过 [`amp-list`](../../../documentation/components/reference/amp-list.md) 和 [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md) 渲染座位图。从 [`amp-list`](../../../documentation/components/reference/amp-list.md) 调用中接收到数据后，可以使用所述数据遍历各个座位：

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## 为不可用的座位设计样式

在上面的示例中，`{% raw %}{{unavailable}}{% endraw %}` 是 JSON 端点所返回字段的值，用于为不可用的座位设计样式。这种方法不允许您在座位不可用的情况下移除 `option="{{id}}"` 之类的特性，因为模板无法封装整个页面的 `<html>` 元素。

另一种更冗长的方法是按如下方式重复标记：

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## 调整座位图大小

除非您的座位图大小固定不变，否则很难调整包含座位图的 [`amp-list`](../../../documentation/components/reference/amp-list.md) 的大小。[`amp-list`](../../../documentation/components/reference/amp-list.md) 需要固定尺寸或使用 `layout="fill"`（以使用父容器的可用空间）。有两种方法可解决此问题：

1. 在了解页眉和页脚等其他组件使用的空间后，计算页面上的可用空间。通过使用 `calc` 表达式并将其指定为 [`amp-list`](../../../documentation/components/reference/amp-list.md) 的父 div 的 `min-height`，可以在 CSS 中完成此计算。
2. 了解页面布局的高度时，使用弹性布局。

## 为 amp-pan-zoom 设计样式

如果使用上一部分中介绍的方法，[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) 还需要使用 `layout="fill"`。

[tip type="tip"] **提示** - 要在座位图周围保留一些空白，并且仍使其成为双指张合与缩放区域的一部分，请执行以下操作：

- 为 svg 添加包装 div
- 添加填充

如果您没有包装 div，而是向 SVG 中添加边距，则此边距不会成为双指张合与缩放区域的一部分。[/tip]

## 处理状态

当用户点击不同的座位时，可通过使用 `amp-state` 来跟踪变量中的选定座位 `id`，具体方法如下：

- 为每个座位添加一个 [`amp-bind`](../../../documentation/components/reference/amp-bind.md) 表达式以将选定座位添加到列表中
- 或者将 [`amp-selector`](../../../documentation/components/reference/amp-selector.md) 与操作 `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` 一起使用，以便将所有选定座位添加到列表中

尽管第一种方法不需要额外的组件 [`amp-selector`](../../../documentation/components/reference/amp-selector.md)，但它会使座位图变得非常慢，因为每次选择/取消选择座位时都会评估所有 [`amp-bind`](../../../documentation/components/reference/amp-bind.md) 表达式。

第二种方法还让您可以减少将由模板渲染的每个座位的 [`amp-bind`](../../../documentation/components/reference/amp-bind.md) 表达式的重复。

## 最终 HTML 结构

作为参考，下面给出了座位图的最终 HTML：

[sourcecode:html]
{% raw %}<div class="seatmap-container">
  <amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
    <template type="amp-mustache">
      <amp-pan-zoom layout="fill" class="seatmap">
        <amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
          <div class="svg-container">
            <svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
            {{#seats}}
              <rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
            {{/seats}}
            </svg>
          </div>
        </amp-selector>
      </amp-pan-zoom>
    </template>
  </amp-list>
</div>{% endraw %}
[/sourcecode]
