---
layout: page
title: Analytics：基础知识
order: 0
locale: zh-cn
---

从这里开始了解 AMP Analytics 的相关基础知识。

{% include toc.html %}

## 使用 amp-pixel 还是 amp-analytics？

AMP 提供了两个组件，可满足您的分析和测量需求：
[amp-pixel](/docs/reference/amp-pixel.html) 和
[amp-analytics](/docs/reference/extended/amp-analytics.html)。
两个选项都可将分析数据发送到定义的端点。

如果您在寻求像简单的[跟踪像素](https://en.wikipedia.org/wiki/Web_beacon#Implementation)这样的行为，则使用 `amp-pixel` 组件，它提供了基本的页面视图跟踪功能；页面视图数据将发送到定义的 URL。



某些与供应商的集成可能需要此组件，在这种情况下，集成将指定确切的 URL 端点。对于大多数分析解决方案，请使用 `amp-analytics`。



页面视图跟踪功能在 `amp-analytics` 中也有效。
但您也可以使用任何类型的页面内容（包括链接点击和按钮点击）来跟踪用户互动。

并且，您可以测量用户在页面上滚动了多长距离、用户是否与社交媒体互动等信息（请参阅[深入了解 AMP Analytics](/docs/guides/analytics/deep_dive_analytics.html)）。




在与 AMP 平台集成的过程中，提供商提供了预定义的 `amp-analytics` 配置，以便能够轻松地捕获数据并推送到其跟踪工具。


从
[amp-analytics 规范](/docs/reference/extended/amp-analytics.html)中访问供应商文档。

您可以在页面中同时使用 `amp-pixel` 和 `amp-analytics`：
`amp-pixel` 用于简单的页面视图跟踪，而 `amp-analytics` 用于所有其他跟踪。

您也可以多次添加每个标记。
如果与多家分析供应商合作，则每个解决方案需要一个标记。

请谨记，越简单的 AMP 页面越适合于用户，因此，如果您不需要额外标记，就不要使用。


## 创建简单的分析配置

了解如何创建简单的
[amp-pixel](/docs/reference/amp-pixel.html) 和
[amp-analytics](/docs/reference/extended/amp-analytics.html) 配置。

### 简单的 amp-pixel 配置

如需创建简单的 `amp-pixel` 配置，请在 AMP 页面的正文中插入如下内容：


{% highlight html %}
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
{% endhighlight %}

在此示例中，页面视图数据将与一个随机数一起发送到定义的 URL。

`RANDOM` 变量是
[AMP 平台的诸多替代变量](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)中的其中一个。
在此处详细了解[变量替代](/docs/guides/analytics/analytics_basics.html#variable-substitution)。


[amp-pixel](/docs/reference/amp-pixel.html) 组件是内置组件，因此您无需像为 AMP 扩展组件（包括 `amp-analytics`）指明包含声明一样来指明包含声明。



但您应将 `amp-pixel` 标记放在尽可能靠近 `<body>` 开头的位置。

只有当标记进入视图本身时，才会触发跟踪像素功能。
如果 `amp-pixel` 放在靠近页面底部的位置，则可能不会触发。


### 简单的 amp-analytics 配置

如需创建简单的
[amp-analytics](/docs/reference/extended/amp-analytics.html) 配置，
您必须将此 `custom-element` 声明包括在 AMP 文档的 `<head>` 中（另请参阅[组件包含声明](/docs/reference/extended.html#component-inclusion-declaration)）：



{% highlight html %}
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
{% endhighlight %}

以下示例类似于 [`amp-pixel` 示例](/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration)。
页面每次可见时，系统均将触发触发器事件，并将页面视图数据与一个随机 ID 一起发送到定义的 URL：

 

{% highlight html %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
{% endhighlight %}

在上面的示例中，我们将一个名为 pageview 的请求定义为 https://foo.com/pixel?RANDOM。如前所述，RANDOM 将被替代为一个随机数，因此实际上，请求最终的显示是像 https://foo.com/pixel?0.23479283687235653498734 这样。

当页面变为可见（使用触发器关键字 `visible` 指定）时，事件将触发，并发送 `pageview` 请求。


触发器属性确定 pageview 请求何时触发。
详细了解[请求和触发器](/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports)。

## 变量替代

[amp-pixel](/docs/reference/amp-pixel.html) 和
[amp-analytics](/docs/reference/extended/amp-analytics.html) 组件都允许所有标准 URL 变量替代（请参阅

[AMP HTML 变量替代](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)）。
在下面的示例中，页面视图请求将随当前 AMP 文档的规范 URL、其标题以及[客户端 ID](/docs/guides/analytics/analytics_basics.html#user-identification) 一起发送到 URL：




{% highlight html %}
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
{% endhighlight %}

`amp-pixel` 标记很简单，可以只包括平台定义的变量，或包括 AMP 运行时可从 AMP 页面中解析的变量。


在上面的示例中，平台填充了
`canonicalURL` 和 `clientId(site-user-id)` 的值。

`amp-analytics` 标记可包括与 `amp-pixel` 相同的变量，以及标记配置内唯一定义的变量。


在请求字符串中为页面或平台定义的变量使用 `${varName}` 格式。

在构建分析请求时，`amp-analytics` 标记会将模板替换为其实际值（另请参阅
[amp-analytics 中支持的变量](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)）。


在下面的 `amp-analytics` 示例中，页面视图请求将发送到 URL，其中包含从变量替代（某些由平台定义，某些以内联方式在 `amp-analytics` 配置内定义）中提取的其他数据：






{% highlight html %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "someEvent": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }  
}
</script>
</amp-analytics>
{% endhighlight %}

在上面的示例中，变量 `account` 和 `title` 是在 `amp-analytics` 配置中定义的。


`canonicalUrl` 和 `clientId` 变量不是在配置中定义的，因此其值将被平台替代。


**重要说明：** 变量替代非常灵活；
您可以在不同位置定义相同的变量，并且 AMP 运行时将按此优先顺序分析值（请参阅[变量替代顺序](/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)）。



## 用户识别

网站使用 Cookie 在浏览器中存储特定于用户的信息。
可以使用 Cookie 来指明用户之前已访问了某个网站。
在 AMP 中，可以从发布者的网站或缓存（比如 Google AMP Cache）中加载页面。


发布者的网站和缓存可能具有不同的域。
出于安全原因，浏览器可能会（并且通常将）限制访问另一个域的 Cookie（另请参阅[跨来源跟踪用户](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md)）。




默认情况下，不管是从发布者的原始网站还是通过缓存访问页面，AMP 都将管理客户端 ID 的配置。

AMP 生成的客户端 ID 的值为 `"amp-"`，后跟一个随机 `base64` 编码字符串，如果相同用户再次访问页面，该用户的客户端 ID 将保持不变。



在所有情况下，AMP 都会管理客户端 ID 的读取和写入。
如果某个页面通过缓存加载或以其他方式显示在发布者原始网站查看上下文的外部，则需要特别关注这一点。


在这种情况下，将无法访问发布者网站的 Cookie。

如果从发布者的网站中加载 AMP 页面，则可以向 AMP 使用的客户端 ID 框架指明要查找和使用的回退 Cookie。


在这种情况下，`clientId` 变量的
`cid-scope-cookie-fallback-name` 参数将被解释为 Cookie 名称。

格式可能显示为
`CLIENT_ID(cid-scope-cookie-fallback-name)` 或
`${clientId(cid-scope-cookie-fallback-name)}`。

例如：

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
{% endhighlight %}

如果 AMP 发现此 Cookie 已设置，则客户端 ID 替代项将返回 Cookie 的值。

如果 AMP 发现此 Cookie 未设置，则 AMP 将生成一个值，格式为 `amp-`，后跟一个随机 base64 编码字符串。



如需详细了解客户端 ID 替代项，包括如何添加可选的用户通知 ID，请参阅 [AMP 分析中支持的变量](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)。

