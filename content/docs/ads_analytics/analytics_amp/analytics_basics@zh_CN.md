---
$title: 分析：基础知识
$order: 0
toc: true
---

从这里开始了解 AMP 分析的相关基础知识。

[TOC]

## 使用 amp-pixel 还是 amp-analytics？


AMP 提供了以下两个组件，可满足您的分析和衡量需求：[amp-pixel](/zh_cn/docs/reference/amp-pixel.html) 和 [amp-analytics](/zh_cn/docs/reference/extended/amp-analytics.html)。两个组件都会将分析数据发送到定义的端点。


如果您只是跟踪诸如简单的[跟踪像素](https://en.wikipedia.org/wiki/Web_beacon#Implementation)之类的行为，则可以使用 `amp-pixel` 组件，它提供了基本的网页浏览跟踪功能；网页浏览数据将发送到定义的网址。某些与供应商的集成功能可能需要使用此组件，在这种情况下，这些集成功能将指定确切的网址端点。

对于大多数分析解决方案，请使用 `amp-analytics`。`amp-analytics` 也提供了网页浏览跟踪功能。此外，您还可以跟踪用户与任何类型的网页内容的互动情况，包括链接点击和按钮点击。而且，您还可以衡量用户在网页上滚动浏览了多少内容、用户是否与社交媒体进行了互动等信息。

{% call callout('了解详情', type='read') %}
请参阅[深入了解 AMP 分析](/zh_cn/docs/guides/analytics/deep_dive_analytics.html)。
{% endcall %}

在与 AMP 平台集成的过程中，各个提供商均提供了预定义的 `amp-analytics` 配置，以便能够轻松地捕获数据并推送到其跟踪工具。您可以通过[分析供应商](/zh_cn/docs/guides/analytics/analytics-vendors.html)列表访问各个供应商文档。

您可以在网页中同时使用 `amp-pixel` 和 `amp-analytics` ：`amp-pixel` 用于简单的网页浏览跟踪，`amp-analytics` 则用于所有其他跟踪。此外，您还可以多次添加各个标记。如果您与多家分析提供商合作，则需要为每个解决方案都添加一个标记。请注意，AMP 网页越简单，越可以为用户带来出色的体验。因此，如果您不需要额外标记，就不要使用。

## 创建简单的分析配置


了解如何创建简单的 [amp-pixel](/zh_cn/docs/reference/amp-pixel.html) 和 [amp-analytics](/zh_cn/docs/reference/extended/amp-analytics.html) 配置。

### amp-pixel 的简单配置

要创建简单的 `amp-pixel` 配置，请在 AMP 网页的正文中插入下方示例所示的类似内容：

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
[/sourcecode]

在此示例中，网页浏览数据将与一个随机数一起发送到定义的网址。`RANDOM` 变量是 [AMP 平台中诸多替换变量](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) 的一个。点击此处详细了解[变量替换](/zh_cn/docs/guides/analytics/analytics_basics.html#variable-substitution)。

[amp-pixel](/zh_cn/docs/reference/amp-pixel.html) 组件是内置组件，因此您无需像处理 AMP 扩展组件（包括 `amp-analytics` 一样为其指明包含声明。但您应将 `amp-pixel` 标记放在尽可能靠近 `<body>` 开头的位置。只有当标记本身进入视线范围内时，像素跟踪功能才会触发。如果将 `amp-pixel` 放在靠近网页底部的位置，则可能不会触发该功能。

### amp-analytics 的简单配置


要创建简单的 [amp-analytics](/zh_cn/docs/reference/extended/amp-analytics.html) 配置，您必须首先将以下 `custom-element` 声明包含在 AMP 文档的 `<head>` 中（另请参阅[组件包含声明](/zh_cn/docs/reference/extended.html#component-inclusion-declaration)）：

[sourcecode:html]

<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>

[/sourcecode]

以下示例与 [`amp-pixel` 示例](/zh_cn/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration)类似。每当用户浏览网页时，系统均会触发触发器事件，并将网页浏览数据与一个随机 ID 一起发送到定义的网址：

[sourcecode:html]
<amp-analytics>

<script type="application/json">

  {"requests":
    {"pageview": "https://foo.com/pixel?RANDOM
  ", },"triggers":
    {"trackPageview":
      {"on": "visible",
      "request": "pageview"

} } }</script>

</amp-analytics>
[/sourcecode]

在上面的示例中，我们将一个名为 pageview 的请求定义为 https://foo.com/pixel?RANDOM. 如前所述，RANDOM 将被替换为一个随机数，因此实际上，最终显示的请求将如下所示：https://foo.com/pixel?0.23479283687235653498734.

当用户开始浏览网页（使用触发器关键字 `visible` 指定）时，事件将触发，并发送 `pageview` 请求。触发器属性决定了 pageview 请求何时触发。详细了解[请求和触发器](/zh_cn/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports)。

## 变量替换

[amp-pixel](/zh_cn/docs/reference/amp-pixel.html) 和 [amp-analytics](/zh_cn/docs/reference/extended/amp-analytics.html) 组件均允许所有标准网址变量替换（请参阅 [AMP HTML 变量替换] (https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)）。在以下示例中，网页浏览请求将随当前 AMP 文档的规范网址、其 title 以及[客户端 ID](/zh_cn/docs/guides/analytics/analytics_basics.html#user-identification)一起发送到相应网址：

[sourcecode:html]
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
[/sourcecode]

由于 `amp-pixel` 标记的简单性，它只可包括平台定义的变量或 AMP 运行时可从 AMP 网页中解析的变量。在上面的示例中，平台会填充 `canonicalURL` 和 `clientId(site-user-id)` 的值。在构建分析请求时，`amp-analytics` 标记可包括与 `amp-pixel` 相同的变量，以及标记配置内唯一定义的变量。

在请求字符串中，网页或平台定义的变量请使用 `${varName}` 格式。在构建分析请求时，`amp-analytics` 标记会将模板替换为其实际的值（另请参阅 [amp-analytics 中支持的变量](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)）。

在以下 `amp-analytics` 示例中，网页浏览请求将发送到相应网址，其中还包含从变量替换中提取的其他数据（某些由平台提供，某些在 `amp-analytics` 配置中直接定义）：

[sourcecode:html]
<amp-analytics>

<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
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
[/sourcecode]

在上面的示例中，变量 `account` 和 `title` 是在 `amp-analytics` 配置中定义的。变量 `canonicalUrl` 和 `clientId` 不是在配置中定义的，因此它们的值将被平台替换。

{% call callout('重要提示', type='caution') %}
变量替换非常灵活；您可以在不同位置定义相同的变量，并且 AMP 运行期间系统会按相应优先顺序解析值（请参阅[变量替换顺序](/zh_cn/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)）。
{% endcall %}

## 用户识别


网站使用 Cookie 在浏览器中存储与用户相关的信息。Cookie 可用于判断用户之前是否访问过某个网站。在 AMP 中，网页可通过发布商的网站加载，也可通过缓存（例如 Google AMP 缓存）加载。发布商的网站和缓存很可能具有不同的网域。为了安全起见，浏览器可能（并且通常）会限制访问其他网域的 Cookie（另请参阅[跨来源跟踪用户](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)）。

默认情况下，不管用户是从发布商的原始网站还是通过缓存访问网页，AMP 都将管理客户端 ID 的配置。AMP 生成的客户端 ID 的值为 `"amp-"` `后跟一个随机 base64` 编码字符串，如果同一用户再次访问某网页，该用户的客户端 ID 将保持不变。

在任何情况下，AMP 都负责管理客户端 ID 的读取和写入。当某个网页通过缓存加载或以其他方式显示在发布商原始网站浏览环境之外时，尤其需要注意这一点。在这种情况下，系统将无法访问发布商网站的 Cookie。

如果从发布商的网站中加载 AMP 网页，则可以向 AMP 使用的客户端 ID 框架说明要查找和使用的后备 Cookie。在这种情况下，`cid-scope-cookie-fallback-name` 参数（属于 `clientId` 变量）将被解读为 Cookie 名称。格式可能显示为 `CLIENT_ID(cid-scope-cookie-fallback-name)` 或 `${clientId(cid-scope-cookie-fallback-name)}`。

例如：

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
[/sourcecode]

如果 AMP 发现此 Cookie 已设置，则客户端 ID 替换将返回 Cookie 的值。如果 AMP 发现此 Cookie 未设置，则 AMP 将生成一个值，格式为 `amp-` ，后跟一个随机 base64 编码字符串。


如需详细了解客户端 ID 替换（包括如何添加可选的用户通知 ID），请参阅 [AMP 分析中支持的变量](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)。

{% call callout('了解详情', type='read') %}
要继续了解分析相关知识，请参阅 [深入了解 AMP 分析](/zh_cn/docs/guides/analytics/deep_dive_analytics.html)和[使用情形](/zh_cn/docs/guides/analytics/use_cases.html)。
{% endcall %}
