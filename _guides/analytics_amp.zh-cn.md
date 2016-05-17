---
layout: page
title: 配置 Analytics
order: 5
folder: analytics
locale: zh-cn
---

## 在开始之前决定

所有分析解决方案都是在了解您所需的数据以及您打算如何分析这些数据的基础上构建的。
在开始之前决定：

* 您是否将使用第三方分析工具来分析用户互动，还是要使用您自己的内部解决方案进行分析？

* 您将衡量哪些用户行为来了解用户互动？将数据发送给供应商还是自己？

### 

如果您自己已有用来衡量用户互动的内部解决方案，则您只需一个 URL 便可将 AMP Analytics 与该解决方案集成。

您将在其中发送数据。
您也可以将数据发送到不同的 URL。
例如，您可以将页面视图数据发送到一个 URL，将社交数据发送到另一个 URL。


AMP Analytics 经过专门设计，测量一次便可报告给多方。
如果您已经在与一家或多家分析供应商合作，请查看
[amp-analytics 规范](/docs/reference/extended/amp-analytics.html)，了解这些供应商是否已将其解决方案与 AMP 集成。


如果已集成，则只需从规范中链接到其文档，开始按照相关说明进行操作即可。


如果分析供应商尚未与 AMP 集成，请与该供应商联系，要求其提供相关支持。

同时，我们建议您[在 AMP 项目中创建问题](https://github.com/ampproject/amphtml/issues/new)，请求添加供应商。

另请参阅[在 AMP HTML 中集成您的分析工具](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md)。


### 您需要什么数据？

您将捕获哪些用户相关数据来衡量互动？
您必须先明确这些数据才能对其进行配置。

请考虑以下几个关键数据点：

* 您是仅跟踪页面视图，还是跟踪其他用户互动模式（另请参阅 [amp-pixel 或 amp-analytics](/docs/guides/analytics/analytics_basics.html#use-amp-pixel-or-amp-analytics)）？

* 您将捕获哪些类型的用户相关数据，内容、设备还是浏览器（另请参阅[变量替代项](/docs/guides/analytics/analytics_basics.html#variable-substition)）？

* 您将如何识别用户（另请参阅[用户识别](/docs/guides/analytics/analytics_basics.html#user-identification)）？
