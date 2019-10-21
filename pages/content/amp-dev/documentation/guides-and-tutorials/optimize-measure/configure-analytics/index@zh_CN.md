---
$title: 配置分析工具
---

## 在开始之前做出决定

所有的分析解决方案都要根据以下情况来制定：您需要哪些数据，以及
您打算如何分析这些数据。请在开始之前做出以下决定：

* 您将使用第三方分析工具还是您自己的内部解决方案来分析用户
互动情况？
* 您将衡量哪些用户行为来了解用户互动情况？

### 将数据发送给供应商还是自己？

如果您有自己的内部解决方案可用于衡量用户互动情况，
那么您只需有一个网址，就能将 AMP 分析与该解决方案集成。
您会将数据发送到该网址。
您也可将数据发送到多个网址。
例如，您可以将网页浏览量数据发送到一个网址，
将社交互动数据发送到另一个网址。

AMP 分析的设计宗旨是“一次衡量，多方报告”。
如果您已在与一个或多个分析服务供应商合作，
请查阅[分析服务供应商](analytics-vendors.md)列表，看看他们是否已将自己的解决方案与 AMP 集成。
如果已与 AMP 集成，请查看相应供应商的配置详情并按照说明操作。

倘若分析服务供应商未与 AMP 集成，
请联系相应供应商以寻求支持。
我们也建议您[在 AMP 项目中创建一个问题](https://github.com/ampproject/amphtml/issues/new)，
以请求添加该供应商。
另请参阅
[在 AMP HTML 中集成您的分析工具](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md)。

### 您需要哪些数据？

您需要获取哪些用户数据来衡量互动情况？
您必须先确定这些数据，然后才能进行配置。

关于数据，您需要考虑以下几个要点：

* 您是想仅跟踪网页浏览量，还是也要跟踪用户互动模式
（另请参阅 [amp-pixel 或 amp-analytics](analytics_basics.md#use-amp-pixel-or-amp-analytics)）？
* 您要获取与您的用户、您的内容、
设备或浏览器相关的哪些类型的数据（另请参阅[变量替换](analytics_basics.md#variable-substitution)）？
* 您将如何识别您的用户（另请参阅[用户识别](analytics_basics.md#user-identification)）？

[tip type="read-on"]

若想进一步了解与分析相关的信息，请参阅[分析：基础知识](analytics_basics.md)。

[/tip]
