---
"$title": 通过分析跟踪互动
"$order": '4'
description: 分析平台通常通过内嵌 JavaScript 代码段和函数调用集成到网站中，这些代码段和函数调用可以触发能够发送回分析系统的事件。
---

分析平台通常通过内嵌 JavaScript 代码段和函数调用集成到网站中，这些代码段和函数调用可以触发能够发送回分析系统的事件。AMP 提供了灵活的 JSON 配置语法，可以对多个分析合作伙伴复制此过程。

以下是由 JavaScript 提供支持的 Google Analytics（分析）传统跟踪代码段示例。我们会以 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) JSON 格式重写它，不过在此之前，我们先来了解一下这种传统方式：

```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```

此 JavaScript 代码段非常简单；它通过发送通知来跟踪网页浏览事件。

为了能够在 AMP 中复制此功能，我们必须先在文档的 `<head>` 中**添加** [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 组件库：

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

然后，将 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 组件**添加**到文档的 `body` 末尾处：

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    }
  }
}
</script>
</amp-analytics>
```

与本页顶部的 JavaScript 示例一样，此 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 代码段会向 Google Analytics（分析）发送通知，以表明某个网页已被浏览。

为了达成此目的，我们已将 `type` 设为 `googleanalytics`，随后也在 JSON 中创建了一个名为“default pageview”的触发器。此触发器将在网页可见时触发（由 `"on": "visible"` 引发）；当它触发时，我们会使用已指定的 `vars` 向 Google Analytics（分析）发送 `pageview` 分析请求。

用于配置 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 的 JSON 是一种非常灵活的格式，可用于描述要发送哪些分析数据以及何时发送这些数据。[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 详尽地介绍了该格式。

在上述示例的基础上，我们可以再**添加**一个名为 `"click on #header trigger"` 的触发器：

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    },
    "click on #header trigger": {
      "on": "click",
      "selector": "#header",
      "request": "event",
      "vars": {
        "eventCategory": "examples",
        "eventAction": "clicked-header"
      }
    }
  }
}
</script>
</amp-analytics>
```

从这个新触发器的名称可以猜出，它会在用户点击 ID 为 `"header"` 的元素时触发（由已指定的 `"on": "click"` 和 `"selector": "#header"` 指定）。当此触发器触发时，我们会向分析服务提供商发送 `event` 请求，并同样会在请求中指定几个变量。

如果您想与某个自定义跟踪平台集成，仍可以使用 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 组件并指定要将跟踪数据发送到的个性化网址端点。要了解详情，请参阅 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 组件参考文档。

[tip type="note"] <strong>注</strong>：`“UA-YYYY-Y”` 是一个示例 Google Analytics（分析）帐号；如果您要在自己的网站上使用此示例，则应将其替换为您网站的 Google Analytics（分析）跟踪代码。[/tip]

[tip type="tip"] 提示：如果您想使用一种更简单的跟踪系统，不妨了解一下 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)。如果您只需要跟踪网页浏览，那么与 [`amp-analytics`](../../../../documentation/components/reference/amp-pixel.md) 相比，[`amp-pixel`](../../../../documentation/components/reference/amp-analytics.md) 是一种更轻量化的解决方案，因为它仅用于解决传统像素跟踪要求。要了解详情，请参阅[分析：基础知识指南](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md)。[/tip]
