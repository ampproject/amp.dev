---
$title: Accelerated Mobile Pages 概览

cta:
  title: 下一个常见问题解答
  link_text: 平台和技术公司参与
  link_url: /content/support/faqs/platform-involvement.md

faq:
  - title: 什么是 Accelerated Mobile Pages 项目？
    answer: |
      Accelerated Mobile Pages (AMP) 项目是一个开放源代码计划，是发布商和技术公司围绕所有各方（发布商、消费者平台、广告主、创作者和用户）对整个移动内容生态系统的优化需求展开讨论后采取的行动。

      如今，我们都希望内容能够飞快加载并可轻松浏览。但现实情况是，内容可能需要好几秒才能完成加载，或者加载缓慢的网页因为用户放弃浏览而根本没有完全加载。Accelerated Mobile Pages 是几乎瞬间就能完成加载的网页，让我们离为所有用户打造更好的移动网页这一目标又近了一步。
  - title: Accelerated Mobile Pages 有哪些优势？
    answer: |
      速度至关重要，而瞬间完成加载则是理想状态。研究表明，网页加载速度越慢，跳出率越高。使用 AMP 格式能够大幅提高内容的吸引力，促使用户浏览更多内容并与之互动。不过，该项目并不只是关注速度和性能。我们还希望推广增强型分发，以便发布商和广告主能够充分发挥开放式网络的潜力，使内容能够在各种平台和应用中快速呈现出来，从而获得更高收入。
  - title: Accelerated Mobile Pages 的运作方式如何？
    answer: |
      除了有限的几个获准使用的技术功能是由开放源代码 AMP 规范定义和约束的之外，Accelerated Mobile Pages 与任何其他 HTML 网页并无二致。就像所有网页一样，Accelerated Mobile Pages 能够在所有新型浏览器或应用 WebView 中加载。

      AMP 文件能够充分利用各种将速度放在首位的技术和架构方式，以便为用户提供更快的加载体验。AMP 开发者可以使用非常丰富而且还在不断扩大的网络组件库。借助该组件库，AMP 开发者能够嵌入富媒体对象（例如视频和社交信息）、展示广告或收集分析数据。我们的目标不是使内容具有一致的外观和风格，而是在网页之间打造更为相同的技术核心，以便缩短加载时间。

      此外，AMP 文件可以缓存在云端，以便缩短内容呈现到用户的移动设备上所用的时间。通过使用 AMP 格式，内容制作者可将 AMP 文件中的内容设计为可供第三方缓存。在这种框架下，发布商和广告主可以继续掌控自己的内容，而平台可以轻松缓存或镜像内容，从而以最快的速度为用户提供内容。Google 提供了可供所有人免费使用的 [Google AMP Cache](https://developers.google.com/amp/cache/)，并且所有 AMP 都将由 Google AMP Cache 进行缓存。其他公司也可以构建自己的 AMP 缓存。

      总而言之，我们的目标是将有限的技术功能与围绕缓存构建的分发系统相结合，借此提高网页性能并发展更多受众群体。
  - title: Accelerated Mobile Pages 项目为何要开源？
    answer: |
      参与该项目的公司希望针对各个环节优化移动网页，而不是仅仅针对一个平台、一组技术、一部分发布商或广告主进行优化。通过使该项目开源，所有人都可以就如何加快移动网页速度分享和贡献自己的想法和代码。我们才刚刚踏上这一征程，并真诚希望其他发布商、广告主和技术公司与我们携手同行。
  - title: 谁可以使用 Accelerated Mobile Pages？
    answer: |
      该项目面向生态系统中的所有参与方（发布商、消费者平台、广告主和创作者）开放。要了解使用 AMP 的部分公司和网站，请前往[“支持的平台、供应商和合作伙伴”页面](/zh_cn/support/faqs/supported-platforms.html)。
  - title: 使用 Accelerated Mobile Pages 的结果是什么？
    answer: |
      通过使用 AMP 格式，内容制作者可将 AMP 文件中的内容设计为可供第三方抓取、编入索引/展示（需遵循漫游器排除协议）和缓存。
  - title: 使用 Accelerated Mobile Pages 时，我有哪些责任？
    answer: |
      如果发布商或广告主从浏览其 AMP 网页的用户那收集数据，那么此类数据收集行为受其隐私权政策的约束。发布商或广告主必须披露其隐私权政策，最好在其每个 AMP 网页中添加指向隐私权政策的链接。

      此外，许多管辖区（例如欧盟）的法律规定，网站必须告知访问者有关网站（包括 AMP 网页）使用的 Cookie 和其他形式的本地存储内容的信息。在许多情况下，这些法律还要求网站征得用户同意。网站有责任根据 Cookie 的使用情况确定合适的通知类型。要了解有关生成 Cookie 通知的其他信息和工具，请访问 www.cookiechoices.org。请注意，借助 AMP 组件 [amp-user-notification](/zh_cn/docs/reference/components/amp-user-notification.html)，您可以向用户显示可关闭的通知。

      如果 AMP 网页显示在第三方平台上的查看工具（例如 Google 搜索上的 Google AMP 查看工具）中，那么该查看工具可能是混合环境，AMP 网页和第三方平台可以在其中各自收集关于用户的数据。在这种情况下，每一方的数据收集行为都会受该方的隐私权政策约束（即，在混合查看工具环境中，AMP 网页收集的数据受该网页的隐私权政策约束，第三方平台收集的数据受该平台的隐私权政策约束）。各方有责任披露其隐私权政策并遵守相关数据条例，包括与使用 Cookie 相关的欧洲法律。
  - title: 哪种内容最适合使用 Accelerated Mobile Pages？
    answer: |
      我们的目标是让所有内容（从新闻报道到视频，从博客到商务网页以及 GIF）都能使用 Accelerated Mobile Pages。
  - title: 让我的内容采用 Accelerated Mobile Pages 会增加工作量吗？
    answer: |
      简言之，会增加，但不会增加很多。由于“AMP HTML”完全是在现有网络技术基础上打造出来的，因此开发流程与发布商和广告主如今已在使用的流程完全相同。发布商和广告主可以通过 GitHub 熟悉 [AMP HTML 规范](/zh_cn/docs/fundamentals/spec.html)。已经习惯使用当前流程的发布商和广告主很快就能掌握相关技巧。
  - title: 发布商或广告主如何将内容添加到 AMP HTML 中？
    answer: |
      发布商和内容管理系统 (CMS) 提供商可以将 AMP HTML 与其 CMS 相集成，以生成 AMP 内容。Automattic 已经发布了 [WordPress AMP 插件](https://wordpress.org/plugins/amp/)，我们希望所有内容管理系统都能增加对 AMP HTML 网页的支持。
  - title: AMP 仅适用于移动设备吗？
    answer: |
      AMP 在设计时考虑了自适应理念，以便支持所有屏幕尺寸。但是，第三方平台的某些功能（例如，Google 的“焦点新闻”轮换展示）可能专为移动版体验而设计。请与第三方平台联系，了解他们如何使用 AMP。要详细了解移动版和桌面版 AMP 网页，请参阅 Paul Bakaus 的博文 [About that ‘mobile’ in Accelerated Mobile Pages](https://paulbakaus.com/2016/07/01/about-that-mobile-in-accelerated-mobile-pages/)（Accelerated Mobile Pages 中的“mobile”的含义）。

---
