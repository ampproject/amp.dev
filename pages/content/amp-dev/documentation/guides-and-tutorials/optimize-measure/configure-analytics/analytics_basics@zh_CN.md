---
"$title": 'Analytics: the basics'
"$order": '0'
description: AMP 提供了以下两个组件，可满足您的分析和衡量需求：amp-pixel 和 amp-analytics。两个组件都会将分析数据发送到定义的端点。
formats:
- websites
- stories
---

从这里开始了解 AMP 分析的相关基础知识。

## 使用 amp-pixel 还是 amp-analytics？ <a name="use-amp-pixel-or-amp-analytics"></a>

AMP 提供了以下两个组件，可满足您的分析和衡量需求：[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 和 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)。两个组件都会将分析数据发送到定义的端点。

如果您只是跟踪诸如简单的[跟踪像素](https://en.wikipedia.org/wiki/Web_beacon#Implementation)之类的行为，则可以使用 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 组件，它提供了基本的网页浏览跟踪功能；网页浏览数据将发送到定义的网址。某些与供应商的集成功能可能需要使用此组件，在这种情况下，这些集成功能将指定确切的网址端点。

对于大多数分析解决方案，请使用 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)。[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 也提供了网页浏览跟踪功能。此外，您还可以跟踪用户与任何类型的网页内容的互动情况，包括链接点击和按钮点击。[filter formats="网站"]而且，您还可以衡量用户在网页上滚动浏览了多少内容、用户是否与社交媒体进行了互动等信息。[/filter] [filter formats="故事"]而且，您还可以衡量用户在故事中浏览了多少内容、用户是否与互动元素进行了互动。[/filter]

[tip type="read-on"] 请参阅[深入了解 AMP 分析](deep_dive_analytics.md)。[/tip]

在与 AMP 平台集成的过程中，各个提供商均提供了预定义的 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 配置，以便能够轻松地捕获数据并推送到其跟踪工具。您可以通过[分析供应商](analytics-vendors.md)列表访问各个供应商文档。

您可以在网页中同时使用 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 和 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) ：[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 用于简单的网页浏览跟踪，[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 则用于所有其他跟踪。此外，您还可以多次添加各个标记。如果您与多家分析提供商合作，则需要为每个解决方案都添加一个标记。请注意，AMP 网页越简单，越可以为用户带来出色的体验。因此，如果您不需要额外标记，就不要使用。

## 创建简单的分析配置

了解如何创建简单的 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 和 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 配置。

### 简单的 `amp-pixel` 配置

要创建简单的 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 配置，请在 AMP 网页的正文中插入如下所示的类似内容：

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

在此示例中，网页浏览数据将与一个随机数一起发送到定义的网址。`RANDOM` 变量是 [AMP 平台中诸多替换变量](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)中的一个。点击此处详细了解[变量替换](analytics_basics.md)。

[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 组件是内置组件，因此您无需像处理 AMP 扩展组件（包括 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)）一样为其添加包含声明。但您应将 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 标记放在尽可能靠近 `<body>` 开头的位置。只有当标记本身进入视线范围内时，跟踪像素才会触发。如果将 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 放在靠近网页底部的位置，则可能不会触发跟踪像素。

### 简单的 `amp-analytics` 配置

要创建简单的 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 配置，您必须首先将以下 `custom-element` 声明包含在 AMP 文档的 `<head>` 中（另请参阅[组件包含声明](../../../../documentation/components/index.html)）：

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

以下示例与 [`amp-pixel` 示例](../../../../documentation/components/reference/amp-pixel.md)类似。每当用户浏览网页时，系统均会触发触发器事件，并将网页浏览数据与一个随机 ID 一起发送到定义的网址：

```html
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
```

在上面的示例中，我们将一个名为 pageview 的请求定义为 `https://foo.com/pixel?RANDOM`。如前所述，RANDOM 将被替换为一个随机数，因此实际上，最终显示的请求将如下所示：`https://foo.com/pixel?0.23479283687235653498734`。

当网页变得可见（使用触发器关键字 `visible` 指定）时，事件将触发，并发送 `pageview` 请求。触发器属性决定了 pageview 请求何时触发。详细了解[请求和触发器](deep_dive_analytics.md#requests-triggers--transports)。

[filter formats="故事"]

## AMP 故事的默认配置

网站的典型用户行为历程因故事而异。在某个网站上，用户可能会阅读标题，滚动到网页底部，与表单交互，然后再点击下一个网页的链接。故事占据整个视口，用户点按即可前进，无需滚动。

{{ image('/static/img/docs/guides/analytics-pages.png', 660, 501, alt='PWA 图片' ) }}

许多人想要将故事中每一个新的 [`<amp-story-page>`](../../../../documentation/components/reference/amp-story-page.md) 视为一次新的网页浏览，因为屏幕间的内容大不相同。不过，网页只是完整故事中的一个元素，用户通常需要查看多个故事网页才能了解故事脉络。因此，如何衡量像网页浏览这样简单的操作对我们的分析方式有很大影响。

{{ image('/static/img/docs/guides/analytics-setup-stories.png', 1037, 528, alt='PWA 图片' ) }}

借助 AMP 分析，您可以使用任何分析供应商轻松地实现上述分析。例如，对于 Google Analytics（分析）的[全局网站代码](https://developers.google.com/gtagjs/)，配置将如以下片段所示。

```html
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
```

此默认配置应该会为您提供一个完整的有效 AMP 故事配置。

如果您有兴趣了解默认配置以外的其他配置，请阅读 [AMP 故事的分析](https://blog.amp.dev/2019/08/28/analytics-for-your-amp-stories/?_gl=1*pw0bu5*_ga*MzM1MjQ0ODE5LjE1NjUwMzU1MTg)，查找使用 Google Analytics（分析）可以实现的更高级用例。

[/filter]

## 变量替换 <a name="variable-substitution"></a>

[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 和 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 组件均允许所有标准网址变量替换（请参阅 [AMP HTML 变量替换](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)）。在以下示例中，网页浏览请求将随当前 AMP 文档的规范网址、其标题以及[客户端 ID](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) 一起发送到相应网址：

```html
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
```

由于 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 标记的简单性，它只可包括平台定义的变量或 AMP 运行时可从 AMP 网页中解析的变量。在上面的示例中，平台会填充 `canonicalURL` 和 `clientId(site-user-id)` 的值。 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 标记可包括与 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 相同的变量，以及标记配置内唯一定义的变量。

在请求字符串中，请为网页或平台定义的变量使用 `${varName}` 格式。在构建分析请求时，[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 标记会将模板替换为其实际值（另请参阅 [`amp-analytics` 中支持的变量](../../../../documentation/components/reference/amp-analytics.md)。）

在以下 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 示例中，网页浏览请求将发送到相应网址，其中还包含从变量替换中提取的其他数据（某些由平台提供，某些在 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 配置中直接定义）：

```html
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
```

在上面的示例中，变量 `account` 和 `title` 是在 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 配置中定义的。变量 `canonicalUrl` 和 `clientId` 不是在配置中定义的，因此它们的值将被平台替换。

[tip type="important"] **重要提示**：变量替换非常灵活；您可以在不同位置定义相同的变量，并且 AMP 运行时会按相应的优先顺序解析值（请参阅[变量替换顺序](deep_dive_analytics.md#variable-substitution-ordering)）。[/tip]

## 用户识别 <a name="user-identification"></a>

网站使用 Cookie 在浏览器中存储与用户相关的信息。Cookie 可用于判断用户之前是否访问过某个网站。在 AMP 中，网页可通过发布商的网站提供，也可通过缓存（例如 Google AMP 缓存）提供。发布商的网站和缓存很可能具有不同的网域。为了安全起见，浏览器可能（并且通常）会限制访问其他网域的 Cookie（另请参阅[跨来源跟踪用户](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)）。

默认情况下，不管用户是从发布商的原始网站还是通过缓存访问网页，AMP 都将管理客户端 ID 的配置。AMP 生成的客户端 ID 的值为 `"amp-"` 后跟一个随机 `base64` 编码字符串，如果同一用户再次访问某网页，该用户的客户端 ID 将保持不变。

在任何情况下，AMP 都负责管理客户端 ID 的读取和写入。当某个网页通过缓存提供或以其他方式显示在发布商原始网站浏览环境之外时，尤其需要注意这一点。在这种情况下，系统将无法访问发布商网站的 Cookie。

如果从发布商的网站中提供 AMP 网页，则可以向 AMP 使用的客户端 ID 框架说明要查找和使用的后备 Cookie。在这种情况下，`clientId` 变量的 `cid-scope-cookie-fallback-name` 参数将被解读为 Cookie 名称。格式可能显示为 `CLIENT_ID(cid-scope-cookie-fallback-name)` 或 `${clientId(cid-scope-cookie-fallback-name)}`。

例如：

```html
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
```

如果 AMP 发现此 Cookie 已设置，则客户端 ID 替换将返回 Cookie 的值。如果 AMP 发现此 Cookie 未设置，则 AMP 将生成一个值，格式为 `amp-`，后跟一个随机 base64 编码字符串。

如需详细了解客户端 ID 替换（包括如何添加可选的用户通知 ID），请参阅 [AMP 分析中支持的变量](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)。

了解详情：要想继续了解分析相关知识，请参阅[深入了解 AMP 分析](deep_dive_analytics.md)和[用例](use_cases.md)。
