---
$title: 深入了解 AMP Analytics
toc: true
---
[TOC]


本指南将深入探讨
[amp-analytics 组件](/docs/reference/extended/amp-analytics.html)，
将示例 `amp-analytics` 配置分解为以下关键构建基块：

本指南的其余部分均使用此配置示例，
此示例跟踪页面视图和用户的链接点击，
并将分析数据发送到第三方提供程序
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)：

[sourcecode:html]
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
[/sourcecode]

**注：** 上面的示例代码是为了帮助您学习，绝不是一个真实示例。如果您使用分析提供程序，上面的示例可能没有意义；提供程序配置会降低复杂性。有关示例配置，请查阅分析提供程序的文档。

## 在何处发送分析数据：类型属性

AMP 设计为可支持两种常见数据集合模式：

* 发布者拥有的端点针对内部分析系统的获取。
* 供应商拥有的端点针对与供应商解决方案
（例如，[Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html)、[Chartbeat](http://support.chartbeat.com/docs/)、[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)）的互操作性的获取。

如需将分析数据发送到分析提供程序，
请在 `amp-analytics` 标记中包括 `type` 属性，并将其值设置为相应的供应商（如
[amp-analytics 规范](/docs/reference/extended/amp-analytics.html)中所定义）。


例如：`<amp-analytics type="googleanalytics">` 将分析数据发送给
第三方分析提供程序 Google Analytics。
如需将数据发送到发布者拥有的端点，
只需不包括 `type` 属性即可；
系统会将分析数据发送到每个[请求](/zh_cn/docs/guides/analytics/deep_dive_analytics.html#发送什么数据：requests-属性)对应的已定义端点。


可以通过分析供应商配置快速开始使用 `amp-analytics`。

您应查阅供应商的文档和
帮助资源以获得进一步的指导。
如前所述，已与 AMP 集成的供应商的列表以及指向其特定文档的链接可在
[amp-analytics 规范](/docs/reference/extended/amp-analytics.html)中找到。



如果您是分析供应商，
请详细了解[将自己的分析配置集成到 AMP HTML 中](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md)。


## 加载远程配置：config 属性

您不必在 APM 页面上完全包括
`amp-analytics` 的所有配置。
取而代之的是，您可以调用一个远程 URL
来获取所有或部分配置。

这样您就可以执行各种操作，例如根据特定请求修改配置。

如果您是发布者，可以控制远程文件，
则可执行任何必要的服务器处理
来构建配置数据。

加载远程配置的第一步是在 `amp-analytics` 标记中包括 config 属性：


[sourcecode:html]
<amp-analytics config="https://example.com/analytics.account.config.json">
[/sourcecode]

下一步是创建位于远程 URL 中的 JSON 内容。
在这个简单的示例中，
JSON 对象中包含的配置只是分析帐户的变量值。

`https://example.com/analytics.account.config.json` 中的示例内容：

[sourcecode:html]
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
[/sourcecode]

最后一步是确保已将远程文件中的内容拉取到 `amp-analytics` 配置中的适当位置。

在此处的 `pageview` 和 `event` 请求中，`account` 变量值自动设置为远程 URL 中的帐户值 (`"account": "UA-XXXXX-Y"`)：



[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

**重要说明：** AMP 不会对多次使用同一变量进行验证。
将按照变量替代优先顺序来填充值，远程 URL 中的值拥有最高优先顺序（请参阅[变量替代顺序](/zh_cn/docs/guides/analytics/deep_dive_analytics.html#变量替代顺序)）。



## 请求、触发器和传输

`requests` 属性定义“发送什么数据”
（例如，`pageviews`、`events`），
以及在何处发送数据（用于传输数据的 URL）。

`triggers` 属性描述应在何时发送分析数据，
例如，在用户查看页面时，在用户点击链接时。

`transport` 属性指定发送请求的方式，
更具体地说，就是协议。

请继续阅读以了解有关这些配置的详细信息。
（您也可以在
[amp-analytics 参考](/docs/reference/extended/amp-analytics.html)中阅读有关这些配置的信息。）

### 发送什么数据：requests 属性

`request-name` 在触发器配置中使用，用于指定应发送什么请求来响应特定事件。

`request-value` 是一个 `https` URL。
这些值可能包括可引用其他请求或变量的占位符标记。


[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

某些分析提供程序（包括 Google Analytics）
已经提供了配置，
您可通过 `type` 属性来使用该配置。
如果您要使用分析提供程序，
则可能无需包括 `requests` 信息。
请参阅供应商文档，了解是否需要配置 `requests` 以及如何配置。


#### 追加请求 URL：额外的 URL 参数

[extraUrlParams](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#extra-url-params)
属性指定要通过常用“&foo=baz”约定追加到请求 URL 查询字符串的附加参数。

`amp-analytics` 示例将附加参数  <code>cd1</code>
添加到请求，并将参数值设置为“AMP”：

[sourcecode:html]
  "extraUrlParams": {
    "cd1": "AMP"
  }
[/sourcecode]

### 何时发送数据：triggers 属性

`triggers` 属性描述应在何时发送分析请求。
它包含 trigger-name 和 trigger-configuration 的键值对。
触发器名称可以是由
字母数字字符 (a-zA-Z0-9) 组成的任何字符串。

例如，
以下 `amp-analytics` 元素配置为在第一次加载文档以及每次点击 `a` 标记时将请求发送到 `https://example.com/analytics`：



[sourcecode:html]
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
  "trackAnchorClicks": {
    "on": "click",
    "selector": "a",
    "request": "event",
    "vars": {
      "eventId": "42",
      "eventLabel": "clicked on a link"
    }
  }
}
[/sourcecode]

AMP 支持以下触发器配置：

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">触发器配置</th>
      <th data-th="Description">说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code>（必需）</td>
      <td data-th="Description">要侦听的事件。有效值为 <code>click</code>、<code>scroll</code>、<code>timer</code> 和 <code>visible</code>。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code>（必需）</td>
      <td data-th="Description">要发送的请求的名称（在 <a href="/zh_cn/docs/guides/analytics/deep_dive_analytics.html#发送什么数据：requests-属性">请求中指定</a>）。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">包含键值对的对象，用于重写顶级配置中定义的 <code>vars</code>，或用于指定对于此触发器唯一的 <code>vars</code>（另请参阅<a href="/zh_cn/docs/guides/analytics/deep_dive_analytics.html#变量替代顺序">变量替代顺序</a>）。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code>（当 <code>on</code> 设置为 <code>click</code> 时为必需）</td>
      <td data-th="Description">CSS 选择器用于细化应跟踪哪些元素。使用值 <code>*</code> 来跟踪所有元素。此配置与 <code>click</code> 触发器结合使用。了解如何使用选择器来<a href="/zh_cn/docs/guides/analytics/use_cases.html#跟踪页面点击s">跟踪页面点击</a>和<a href="/zh_cn/docs/guides/analytics/use_cases.html#跟踪社交互动">社交互动</a>。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code>（当 <code>on</code> 设置为 <code>scroll</code> 时为必需）</td>
      <td data-th="Description">控制在哪些条件下页面滚动时将触发 <code>scroll</code> 事件。此对象可包含 <code>verticalBoundaries</code> 和 <code>horizontalBoundaries</code>。至少需要其中一个属性才能触发 <code>scroll</code> 事件。两个属性的值都应该是数字数组，其中包含作为滚动事件生成依据的边界。请参阅这个有关<a href="/zh_cn/docs/guides/analytics/use_cases.html#跟踪滚动">跟踪滚动</a>的示例。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code>（当 <code>on</code> 设置为 <code>timer</code> 时为必需）</td>
      <td data-th="Description">控制何时触发 <code>timer</code> 事件。定时器将立即触发，并在之后按指定的间隔触发。此配置与 <code>timer</code> 触发器结合使用。</td>
    </tr>
  </tbody>
</table>

**重要说明：** 配置中优先级较低的触发器将被配置中优先级较高的同名触发器覆盖（请参阅[变量替代顺序](/zh_cn/docs/guides/analytics/deep_dive_analytics.html#变量替代顺序)）。



### 如何发送数据：transport 属性

`transport` 属性指定发送请求的方式，
默认情况下会启用以下三种方法：

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">传输方法</th>
      <th data-th="Description">说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">指明可使用 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> 来传输请求。这将发送一个 <code>POST</code> 请求，其中包含凭据和空的正文。</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">指明可使用 <code>XMLHttpRequest</code> 来传输请求。这将发送一个 <code>POST</code> 请求，其中包含凭据和空的正文。</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">指明可通过生成 <code>Image</code> 标记来发送请求。这将发送 <code>GET</code> 请求。</td>
    </tr>
  </tbody>
</table>

只会使用一种传输方法，并且该方法是已启用、获允许并且可用的最高优先级方法。


优先级为 `beacon` > `xhrpost` > `image`。
如果客户端的用户代理不支持某种方法，则使用已启用的下一最高优先级方法。


只有在想要限制传输选项时才需要在配置中包括 `transport` 属性，否则您可能会停止请求。



在下面的示例中，`beacon` 和 `xhrpost` 设置为 false，因此，即使这些方法的优先级高于 `image`，也不会使用它们。


如果客户端的用户代理支持 `image` 方法，则会使用该方法；否则不会发送任何请求。


[sourcecode:html]
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
[/sourcecode]

## 变量替代顺序

AMP 按以下优先顺序使用值填充变量：

1. 远程配置（通过 `config`）。
2. 嵌套在 `triggers` 内的触发器内部的`vars`。
3. 嵌套在 `amp-analytics` 内的顶级 `vars`。
4. 平台提供的值。

此示例中有一个远程配置，变量在顶级中、触发器中以及平台级别中定义：


[sourcecode:html]
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
[/sourcecode]

如果在多个位置定义了同一 `var`，则将根据变量优先顺序设置一次该变量的值。

因此，如果远程配置将 `account` 定义为上面示例中的 UA-XXXXX-Y，则各个 var 的值将如下所示：


<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">值</th>
      <th data-th="Defined By" class="col-thirty">定义者</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">平台</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">触发器</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">远程配置</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">触发器</td>
    </tr>
  </tbody>
</table>
