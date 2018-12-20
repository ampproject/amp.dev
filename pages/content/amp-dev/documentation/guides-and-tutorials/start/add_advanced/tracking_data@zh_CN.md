---
$title: 利用分析工具跟踪互动情况
---

分析平台常常会通过内嵌 JavaScript 代码段和函数调用（可触发会被发回至分析系统的事件）集成到网站中。AMP 提供了灵活的 JSON 配置语法，以便为多个分析合作伙伴复制此过程。

以下是由 JavaScript 提供支持的 Google Analytics（分析）传统跟踪代码段示例。我们会以 [amp-analytics](/zh_cn/docs/reference/components/amp-analytics.html) JSON 格式重写它，不过在此之前，我们先来了解一下这种传统方法：

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

为了能够在 AMP 中复制此功能，我们必须先在文档的 `<head>` 中**添加** [amp-analytics](/zh_cn/docs/reference/components/amp-analytics.html) 组件库：

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

然后，将 `amp-analytics` 组件**添加**到文档的 `body` 末尾处：

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

与本页顶部的 JavaScript 示例一样，此 `amp-analytics` 代码段会向 Google Analytics（分析）发送通知，以表明某个网页已被浏览。

为了达成此目的，我们已将 `type` 设为 `googleanalytics`，随后也在 JSON 中创建了一个名为“default pageview”的触发器。此触发器将在网页可见时触发（由 `"on": "visible"` 引发）；当它触发时，我们会使用已指定的 `vars` 向 Google Analytics（分析）发送 `pageview` 分析请求。

用于配置 `amp-analytics` 的 JSON 是一种非常灵活的格式，可用于描述要发送哪些分析数据以及何时发送这些数据。[“amp-analytics”页面中的“指定配置数据”部分](/zh_cn/docs/reference/components/amp-analytics.html#specifying-configuration-data)详尽地介绍了该格式。

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

从这个新触发器的名称可以猜出，该触发器会在用户点击 ID 为 `"header"` 的元素时触发（由已指定的 `"on": "click"` 和 `"selector": "#header"` 引发）。当此触发器触发时，我们会向分析服务提供商发送 `event` 请求，并同样会在请求中指定几个变量。

如果您想与某个自定义跟踪平台集成，则仍可使用 `amp-analytics` 组件并指定要将跟踪数据发送到的个性化网址端点。有关详情，请参阅 [amp-analytics](/zh_cn/docs/reference/components/amp-analytics.html) 组件参考文档。

[tip type="note"]
`“UA-YYYY-Y”` 是一个示例 Google Analytics（分析）帐号；如果您要在自己的网站上使用此示例，则应将其替换为您网站的 Google Analytics（分析）跟踪代码。
[/tip]

[tip]
如果您想使用一种更简单的跟踪系统，不妨了解一下 [amp-pixel](/zh_cn/docs/reference/components/amp-pixel.html)。如果您只需要跟踪网页浏览情况，amp-pixel 无疑是一种比 amp-analytics 更简便的解决方案，因为它的唯一目标就是满足传统像素跟踪的需求。有关详情，请参阅[“分析：基础知识”指南]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md', locale=doc.locale).url.path}})。
[/tip]

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/adding_carousels.md', locale=doc.locale).url.path}}"><span class="arrow-prev">上一页</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/navigating.md', locale=doc.locale).url.path}}"><span class="arrow-next">下一页</span></a>
</div>
