---
'$title': 将分析工具与 AMP 集成
$order: 1
formats:
  - websites
  - stories
teaser:
  text: '概述 '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## 概述

如果您面向发布商运行一种软件即服务工具来帮助他们更好地理解流量和访问者，您可能需要将服务集成到 `ams -analytics` 中。这样，您的客户可以查看他们的 AMP HTML 网页的流量模式。

## 准备工作 <a name="before-you-begin"></a>

在将您的分析服务添加到 AMP HTML 运行时之前，您可能需要执行以下操作：

- 在 AMP HTML 文档中确定您的分析服务所需的[变量](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)和[请求](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#requests)种类。
- 确定可导致从与您的服务相关的网页发送分析请求的触发器。
- 考虑您是否以及如何跨第一方和第三方 AMP 上下文[跟踪用户](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)。
- 确定您的分析信息中心如何处理 AMP 流量。
- 确定 `amp-analytics` 中缺失的功能，在[文件请求](https://github.com/ampproject/amphtml/issues/new)中请求所需功能。
- AMP Analytics 会将其变量发送到一个预配置的端点。如果您还没有端点，请查看[此示例](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)，简要了解如何构建端点。
  - 对于除 `iframe` 之外的所有传输类型，变量均在 HTTPS 请求中作为查询字符串参数发送。
  - 对于 `iframe` 传输类型，将创建一个 iframe 并通过 `window.postMessage` 向其发送变量。在这种情况下，消息不需要是网址。此选项仅适用于获得 MRC 认证的供应商。
- 考虑与 `amp-analytics` 集成将对您可能有的任何政策（尤其是隐私权政策）或协议产生何种影响。

## 将您的配置添加到 AMP HTML 运行时 <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. 创建一个[意图实现问题](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features)，表明您要将您的分析服务配置添加到 AMP HTML 的运行时。确保在您的说明中添加 **cc @ampproject/wg-analytics**。
2. 开发一个补丁来实现以下内容：
   1. 在 vendors [文件夹](https://github.com/ampproject/amphtml/tree/master/extensions/amp-analytics/0.1/vendors)中创建一个新的配置 json 文件 `${vendorName}.json`，其中包括默认选项之外的所有选项，例如：
      1. `"vars": {}` 表示额外的默认变量。
      2. `"requests": {}` 表示您的服务将使用的请求。
      3. `"optout"`：如果需要。我们目前没有一个很好的选择退出系统，欢迎您与我们联系，帮助我们设计一个，以便更好地为您所用。
      4. `"warningMessage"`：如果需要。在控制台中显示来自供应商的警告信息（如弃用或迁移）。
   2. 如果您正在使用 iframe 传输，也可以向包含 `"*vendor-name*": "*url*"` 的 iframe-transport-vendors.js 中的 ANALYTICS_IFRAME_TRANSPORT_CONFIG 添加一个新行
   3. [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) 参考中的示例。
   4. [extensions/amp-analytics/0.1/test/vendor-requests.json ](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json) 文件中的测试。
   5. 将您的分析服务添加到 [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./analytics-vendors-list.md) 文件中的支持供应商列表。包括类型、说明，以及您的用法文档的链接。
3. 测试您放入 [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) 中的新示例，以确保示例中的命中按预期运行。例如，将收集所需数据并在分析信息中心显示。
4. 使用此补丁提交一个拉取请求，并提及意图实现问题。
5. 更新您的服务的用法文档并通知客户。
6. 强烈建议[在 AMP 仓库外部维护集成测试](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests)。

## 跟踪代码管理器 <a name="tag-managers"></a>

在与 AMP Analytics 集成时，跟踪代码管理服务有两个选项：

- **端点方式**：充当 `amp-analytics` 的附加端点，并在后端进行营销管理。
- **配置方式**：通过对每个发布商唯一的动态生成 JSON 配置文件执行跟踪代码管理。

端点方式与上一部分中详细介绍的标准方式相同。配置方式包含为 amp-analytics 创建一种独特的配置，该配置特定于每个发布商，并包括他们所有的兼容分析软件包。发布商将使用一种与下面所示代码类似的语法来添加配置：

[sourcecode:html]
<amp-analytics
config="https://my-awesome-tag-manager.example.com/user-id.json"

> </amp-analytics>
> [/sourcecode]

要采用此方式，请查看 AMP Analytics 发布商集成的文档。

## 更多资源 <a name="further-resources"></a>

- 深入挖掘：[为何不能单单使用一个 iframe？](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/why-not-iframe.md)
- 深入挖掘：[使用 AMP 管理未经过身份验证的用户状态](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)
- [amp-analytics sample](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics) 参考文档
- [amp-analytics 变量](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)参考文档
