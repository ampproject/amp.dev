---
'$title': AMP 发布核对清单
$order: 0
description: 自适应网络设计旨在构建对用户需求做出响应的浮动网页，这些网页适合设备的屏幕大小和方向。您可以实现…
formats:
  - websites
author: CrystalOnScript
contributors:
  - sebastianbenz
---

按照以下核对清单操作，可以让网站提供最全面的 AMP 体验！

# 确保验证 AMP 规范

AMP 自带大量优势，例如，从 AMP 缓存预加载内容，从而减少用户等待时间。要利用这些优势，网页必须是有效的 AMP 文档。如果发布的网页含有 AMP 验证工具报告的错误，这些网页将无法由 AMP 缓存编制索引，并且可能作为错误网页提供。

使用以下工具，不再发布无效的 AMP 网页：

- [验证 AMP 网页](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [AMP 验证工具](https://validator.ampproject.org/)
- [Google AMP 测试工具](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [AMP 工具](../../../documentation/tools.html?format=websites)

# 向缓存的 AMP 网页授予服务器访问权限

好消息是，有效的 AMP 网页会自动选择加入现有的所有 AMP 缓存！这意味着，您的用户体验内容会安全有效地进行加载。这种类型的优化很出色，但同时也带来了一个小问题。系统将从您自己的域以外的域为某些用户提供 AMP 网页。这可能会导致网页在使用动态 AMP 组件（例如 [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) 或 [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites)）时无法访问网站数据。这些类型的错误属于跨源资源共享（或者称为 CORS）问题。通过从所有可用的 [AMP 缓存](https://ampjs.org/caches.json)发出 CORS 请求，可以安全操作！如果在后端中使用 Node.js，则可以使用 [amp-cors 中间件](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors)。

详细了解如何授予服务器访问权限：

- [如何缓存 AMP 网页 ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [AMP 中的 CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- 适用于 Node.js 的 [AMP CORS 中间件](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors)

# 使用 Signed Exchange 安全地共享内容

通过 Signed Exchange (SXG) 共享内容时，可以保留您的域的网址并简化分析。使用 SXG 提供 AMP 网页时，数字签名会将文档与其声明网址相关联，以此保护您的信息。这种行为将用户会话和 Cookie 视为第一方，填补了可能存在的分析差距。实现 SXG，除了（而不是取代）常规 AMP 内容外，还会传送签名的 AMP 内容。

详细了解如何实现 Signed Exchange：

- [使用 Signed Exchange 提供 AMP](signed-exchange.md?format=websites)
- [Signed HTTP Exchange](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [Cloudflare AMP 真实网址](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [使用 Signed Exchange 实现更出色的 AMP 网址和更简单的分析 (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# 测试缓存的网页

AMP 缓存用于存储图片、字体和网页内容，以便在用户需要时提供您的内容。因此，重要的是测试 AMP 缓存提供的这些 AMP 网页的外观和作用是否符合预期。

将 AMP 网页添加到 AMP 缓存时，使用[浏览器的开发者工具](https://developers.google.com/web/tools/chrome-devtools/)确认所有外部资源均可加载。请记住以下列出的各项：

- 图片
- 视频
- amp-analytics 端点
- amp-pixel 端点
- 自定义字体
- iframe

详细了解 AMP 缓存：

- [使用 Google AMP 缓存](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [Google 中的 AMP，Google AMP 缓存](https://developers.google.com/amp/cache/overview)
- [调试 AMP 缓存问题](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [AMP 缓存的网址格式和请求处理](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# 确保您的 AMP 文件可被搜索引擎轻松发现

仅在 AMP 中构建（AMP 优先）的网页以及具有成对 AMP（配对的 AMP）的网页均需要确保自身可被轻松发现！所有 AMP 网页均要求 `<link rel="canonical" href="$SOME_URL">` 位于 `<head>` 中。AMP 优先网页需要与自身关联，与非 AMP 网页配对的 AMP 网页需要彼此关联。

确保 [Schema.org](https://schema.org/) 元数据会添加有用的信息！其他网站和搜索引擎可能要求满足此条件才能共享内容。

Web Robots、Web Wanderers、Crawlers 或 Spiders 都是用于搜索内容的程序的名称。它们遍历网络，帮助搜索引擎为网络内容编制索引，使用户查询可以获得正确的结果！在 `robots.txt` 文件中加入相应的说明并设置适合的标头，确保搜索者可以找到您的网站。

请勿在 [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en) 文件中排除抓取工具。

```
User-agent: *
Disallow: /amp/                            <= don't!
```

请勿将 `noindex` 漫游器元标记添加到 AMP HTML 文件中。

```
<meta name="robots" content="noindex" />   <= don't!
```

请勿将 `noindex` 作为 AMP 文件的 X-Robots-Tag HTTP 标头添加。

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

了解如何使您的网页可被轻松发现：

- [使您的网页可被轻松发现](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [漫游器元标记和 X-Robots-Tag HTTP 标头规范](https://developers.google.com/search/reference/robots_meta_tag)
- [AMP 编制索引常见问题解答](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# 衡量用户流量和历程

收集正确的指标对于进行有用的分析至关重要。在测试将 AMP 引入到网站对用户产生的影响时，请确保衡量合适的指标。如果分析不考虑 AMP 产生的差异，可能会出现漏报、误报或不相关的结果。请确保您了解所需结果以及如何衡量该结果！

详细了解如何为 AMP 设置合适的分析：

- [您的 AMP 测试未执行，现在怎么办？](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [缓存与非缓存分析](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [衡量用户在 AMP 缓存和网站上的历程](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [衡量成功：AMP 分析和实验中的最新变化 (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [使用 Signed Exchange 实现更出色的 AMP 网址和更简单的分析 (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
