---
'$title': 文档类型
$order: 1
description: amp.dev 接受的文档贡献类型
formats:
  - websites
  - stories
  - ads
  - email
author: CrystalOnScript
toc: 'false'
---

下文简要概括了 amp.dev 接受的文档贡献类型：

- [入门教程](documentation-types.md?format=websites#introductory-tutorial)
- [高级教程](documentation-types.md?format=websites#advanced-tutorial)
- [入门指南](documentation-types.md?format=websites#introductory-guide)
- [概念指南](documentation-types.md?format=websites#concept-guide)
- [参考文档](documentation-types.md?format=websites#reference-documentation)

## 入门教程 <a name="introductory-tutorial"></a>

入门教程可以帮助开发者了解技术的总体思路，从编码开始，最终可以完成基本的“Hello World”项目。入门教程展示了如何逐步构建 AMP 的关键功能。将入门教程与内嵌代码示例和/或可下载的示例搭配使用，开发者只需进行极少量的微调，便可运行下载的示例。

amp.dev 示例：

- [创建您的第一个 AMP 网页](../../../../documentation/guides-and-tutorials/start/create/index.md?format=websites)
- [创作您的第一个 AMP 故事](../../../../documentation/guides-and-tutorials/start/visual_story/index.md?format=stories)
- [制作您的第一个 AMPHTML 广告](../../../../documentation/guides-and-tutorials/start/create_amphtml_ad/index.md?format=ads)

<table>
  <tr>
   <td>
<strong>正确做法</strong>
   </td>
   <td>
<strong>错误做法</strong>
   </td>
  </tr>
  <tr>
   <td>提供指导时，简要进行说明，并尽量减少操作步骤。</td>
   <td>深入介绍项目细微差别。教程的教学结果可以通过多种方式实现，但重点不是介绍每一种途径，而是展示一种适合的途径。</td>
  </tr>
  <tr>
   <td>简化环境和工具的设置。</td>
   <td>假定开发者熟悉产品并且具备专家级编码能力。</td>
  </tr>
  <tr>
   <td>确保示例看起来简单。</td>
   <td>样式复杂，除非教程介绍的是样式。</td>
  </tr>
  <tr>
   <td>每一步均有屏幕截图，并提供最终演示。</td>
   <td>仅提供代码示例。</td>
  </tr>
  <tr>
   <td>创建号召性用语。向开发者展示后续应跟进的操作。</td>
   <td>将示例与进一步说明混在一起。如果您认为跟进内容不足，请考虑提交问题，请求提供指南或教程。</td>
  </tr>
</table>

## 高级教程 <a name="advanced-tutorial"></a>

高级教程可以帮助开发者完成具体任务。它假设开发者对 AMP 有一定的了解。此类教程应阐述如何打造体验、集成功能或解决实现任务。

amp.dev 示例：

- [如何为 AMP 网页配置基本分析](../../../../documentation/guides-and-tutorials/optimize-measure/tracking-engagement.md?format=websites)
- [使用 amp-script 将自定义 JavaScript 添加到 AMP 网页](../../../../documentation/guides-and-tutorials/develop/custom-javascript-tutorial.md?format=websites)
- [将 AMP 网站转换成 PWA](../../../../documentation/guides-and-tutorials/optimize-measure/amp_to_pwa.md?format=websites)

<table>
  <tr>
   <td>
<strong>正确做法</strong>
   </td>
   <td>
<strong>错误做法</strong>
   </td>
  </tr>
  <tr>
   <td>借助一个清晰的最终项目提供分步说明。</td>
   <td>提供详尽的细节并且过于详细地叙述概念。</td>
  </tr>
  <tr>
   <td>提供代码示例或可下载的入门代码。同时，提供最终完整项目下载。</td>
   <td>提供替代示例或过程，达到最终结果。</td>
  </tr>
  <tr>
   <td>创建即插即用环境。</td>
   <td>链接到设置教程。教程应当独立。</td>
  </tr>
</table>

## 入门指南 <a name="introductory-guide"></a>

入门指南概述开始使用 AMP 的相关信息。它应当确定功能，描述功能是什么，最终介绍功能的作用。入门指南应当向开发者介绍功能的基本要求，而不指导他们实现功能。如果您按照代码示例逐步完成整个过程，可能就会编写教程。如果您概述 AMP 组件的所有编程元素，可能就会编写参考文档。

amp.dev 示例：

- [AMP 电子邮件基础知识](../../../../documentation/guides-and-tutorials/learn/email_fundamentals.md?format=email)
- [常见元素属性](../../../../documentation/guides-and-tutorials/learn/common_attributes.md?format=websites)

<table>
  <tr>
   <td>
<strong>正确做法</strong>
   </td>
   <td>
<strong>错误做法</strong>
   </td>
  </tr>
  <tr>
   <td>确定文档的涵盖范围。</td>
   <td>分解成分步过程。</td>
  </tr>
  <tr>
   <td>介绍功能和概念。链接到详细介绍高级用法的参考文档。</td>
   <td>过于详尽地描述。</td>
  </tr>
  <tr>
   <td>提供代码示例和真实示例。</td>
   <td>创建一个完整应用。链接到示例或演示，进一步探讨。</td>
  </tr>
  <tr>
   <td>列出技术应用和限制。</td>
   <td>列出每一种可能的技术应用及其实现原理。</td>
  </tr>
</table>

## 概念指南 <a name="concept-guide"></a>

概念指南可以帮助开发者更加深入地了解 AMP。它类似于地形图，以高程变化等详细信息来展示区域内的各种路线，但不规定穿过地形的具体路线。概念指南解释功能是什么及其作用原理，而不是说明如何构建功能。

amp.dev 示例：

- [动画和过渡](../../../../documentation/guides-and-tutorials/develop/animations/triggering_css_animations.md?format=websites)
- [通过分析跟踪互动](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md?format=websites)
- [样式和布局](../../../../documentation/guides-and-tutorials/develop/style_and_layout/index.md?format=websites)

<table>
  <tr>
   <td>
<strong>正确做法</strong>
   </td>
   <td>
<strong>错误做法</strong>
   </td>
  </tr>
  <tr>
   <td>为开发者提供在构造解决方案时所需的全部元素。</td>
   <td>主动引导开发者达到具体的最终状态。</td>
  </tr>
  <tr>
   <td>涵盖主题区域的方方面面。</td>
   <td>关注具体任务。</td>
  </tr>
  <tr>
   <td>加入视觉辅助元素，例如图表或屏幕截图。</td>
   <td>过度考虑，向[推广工作小组](https://github.com/ampproject/wg-outreach)请求视觉辅助元素帮助。</td>
  </tr>
  <tr>
   <td>提供代码示例和其他指南链接。</td>
   <td>提供最终项目下载，或者偏离主题。</td>
  </tr>
</table>

## 参考文档 <a name="reference-documentation"></a>

参考文档列出 AMP 组件的所有编程元素，其中包含详细的行为信息，并且可供扫描。参考文档应当包括典型的代码示例并展示一些用例。

amp.dev 参考文档位于 [AMP 组件目录](../../../../documentation/components/index.html?format=websites)下。

[tip type="important"] AMP 参考文档应贡献到 [AMPHTML 仓库](https://github.com/ampproject/amphtml)中。[/tip]

<table>
  <tr>
   <td>
<strong>正确做法</strong>
   </td>
   <td>
<strong>错误做法</strong>
   </td>
  </tr>
  <tr>
   <td>利用简明扼要的语言解释组件的工作原理。</td>
   <td>解释过程或构建项目。</td>
  </tr>
  <tr>
   <td>采用易于扫描的文档标题、章节标题和副标题结构。</td>
   <td>使用抽象的名称对内容分组。</td>
  </tr>
  <tr>
   <td>提供代码段来展示组件用法。</td>
   <td>创建完整的演示应用。</td>
  </tr>
</table>
