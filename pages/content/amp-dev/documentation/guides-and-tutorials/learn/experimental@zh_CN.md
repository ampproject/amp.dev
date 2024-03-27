---
$title: 实验性功能
---

[AMP 实验性组件](https://github.com/ampproject/amphtml/tree/main/tools/experiments)
是已发布但尚不能广泛使用的功能，因此我们采用**实验性**状态对其进行保护。

在这些功能完全发布之前，开发者和用户可以选择启用它们。
不过，在使用这些功能时要务必谨慎，因为它们可能包含错误或产生意外的负面效果。

## 选择启用 AMP 开发者版

通过使用 AMP 开发者版，可以为浏览器启用更高版本的 AMP JS 库。

AMP 开发者版**可能不太稳定**，并且可能包含仅限部分用户使用的功能。如果您想帮忙测试 AMP 的新版本、报告错误，或创建需要使用尚未面向所有用户提供的新功能的文档，请选择启用此选项。

选择启用开发者版有以下好处：

- 可测试和使用尚未面向所有用户提供的新功能。
- 在质量检查 (QA) 中使用，以确保您的网站与下一版 AMP 兼容。

如果您发现某个问题似乎只出现在开发者版 AMP 中，请[报告问题](https://github.com/ampproject/amphtml/issues/new)并附上此问题的说明。请务必添加可重现该问题的网页对应的网址。

要为浏览器选择启用 AMP 开发者版，请转到 [AMP 实验性功能页面](https://ampjs.org/experiments.html)，然后启用“AMP 开发者版”实验性功能。要接收有关 AMP 的重要/重大变更的通知，请订阅 [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce) 网上论坛。

## 启用实验性组件

#### 从 cdn.ampproject.org 提供的内容

对于从 [https://cdn.ampproject.org](https://cdn.ampproject.org) 提供的内容，
请转到 [AMP 实验性功能页面](https://ampjs.org/experiments.html)，
然后开启（或关闭）任何实验性组件以将其启用（停用）。选择启用实验性组件后，系统会在浏览器上设置 Cookie，以便在通过 Google AMP 缓存提供的所有 AMP 网页上启用实验性功能。

#### 从其他网域提供的内容

对于从任何其他网域提供的内容，当利用以下方式启用开发模式后，可以在开发工具控制台中开启或关闭实验性功能：

```js
AMP.toggleExperiment('experiment')
```

包含实验性功能的所有 AMP 文件均无法成功通过
[AMP 验证](validation-workflow/validate_amp.md)。
对于可直接在生产环境中使用的 AMP 文档，请移除此类实验性组件。

## 为特定文档启用实验性功能

文档可以选择启用特定实验性功能。为此，只需将 `amp-experiments-opt-in` 名称的元标记放在 HTML 文档标头中 AMP 脚本 (`https://ampjs.org/v0.js`) 的前面即可。该元标记的内容值是要选择启用的实验性功能的实验 ID 字符串（以英文逗号分隔）。

```html
<head>
  ...
  <meta name="amp-experiments-opt-in" content="experiment-a,experiment-b">
  <!-- The meta tag needs to be placed before the AMP runtime script.-->
  <script async src="https://ampjs.org/v0.js"></script>
  ...
</head>
```

这样，就可以为文档的所有访问者启用指定的实验性功能了。但是，并非所有实验性功能都支持文档级选择启用。如需已列入白名单的实验性功能的完整列表，请查看相关项目的 `prod-config.json` 文件中的 `allow-doc-opt-in` 属性。请注意，为文档启用实验性功能后，用户可以选择停用此功能来改变此设置。
 
