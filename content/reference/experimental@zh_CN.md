---
$title: 实验性功能
$order: 5
---

[AMP 实验性组件](https://github.com/ampproject/amphtml/tree/master/tools/experiments)是已经发布但尚不能广泛使用的功
能，因此我们采用实验性状态对其进行保护。

在这些功能完全发布之前，开发者和用户可以选择启用它们。不过，在使用这些功能时要务必谨慎，因为它们可能包含错误或产生意外的负面效果。

## 选择启用 AMP 开发者版

通过使用 AMP 开发者版，可以为浏览器启用更高版本的 AMP JS 库。

AMP 开发者版**可能不太稳定，** 而且可能包含尚未面向所有用户提供的功能。 如果您想帮助测试 AMP 的新版本，报告错误或创建文档（需要使用尚未面向所有用户提供的新功能），请选择启用此选项。

选择启用开发者版有以下好处：

- 可测试和使用尚未面向所有用户提供的新功能。
- 可在质量保证使用，以确保您的网站与下一版 AMP 兼容。

如果您发现某个问题好像只在 AMP 开发者版中出现，请[提交问题，](https://github.com/ampproject/amphtml/issues/new) 并随附该问题的说明。请始终在问题说明中附上指向可重现该问题的网页的网址。

要为您的浏览器选择启用 AMP 开发者版，请转到 [AMP 实验性功能页面，](https://cdn.ampproject.org/experiments.html) 然后启用 "AMP Dev Channel" 实验性功能。要接收有关 AMP 的重要/重大变更的通知，请订阅 [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce) 邮寄名单。

## 启用实验性组件

对于从 [https://cdn.ampproject.org](https://cdn.ampproject.org) 提供的内容，请转到 [AMP 实验性功能页面，](https://cdn.ampproject.org/experiments.html) 然后打开（或关闭）任何实验性组件以将其启用（停用）。 选择启用任何实验性组件后，系统都会在您的浏览器上设置 Cookie，以便允许在通过 Google AMP 缓存提供的所有 AMP 网页上使用相应的实验性功能。

对于从任何其他网域提供的内容，当利用以下方式启用开发模式后，可以在开发工具控制台中打开或关闭实验性功能：

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

包含实验性功能的所有 AMP 文件均无法成功通过 
[AMP 验证](/zh_cn/docs/guides/validate.html)。
对于可直接在生产环境中使用的 AMP 文档，请移除此类实验性组件。

