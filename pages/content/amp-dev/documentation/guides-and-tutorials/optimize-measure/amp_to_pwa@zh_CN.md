---
'$title': 将 AMP 网站转换成 PWA
$order: 10
description: 通过在浏览器中缓存资源，PWA 可以向用户提供数据、素材资源和离线网页，保证用户参与其中并获得相关信息。
tutorial: 'true'
formats:
  - websites
author: crystalonscript
---

渐进式 Web 应用可以借助 [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) 实现丰富的离线能力，并且能够在不同的网络条件下提供一致的用户体验。通过在浏览器中缓存资源，PWA 可以向用户提供数据、素材资源和离线网页，保证用户参与其中并获得相关信息。

本教程将帮助您了解如何通过添加 Web 清单和由 AMP Service Worker 提供支持的 Service Worker，将 AMP 网站转换成具有离线功能的可安装 PWA。

# 下载并运行入门代码

从[这里](/static/files/tutorials/amptopwa.zip)下载入门代码。

使用本地网络服务器预览网站。

[tip type="default"] **提示**：针对快速网络服务器，请运行 `python -m SimpleHTTPServer`。[/tip]

您应该能够查看名为“Lyrical Lightning”的移动魔术音乐节的着陆页。它的首页上包含一个链接，可供查看乐队的演出日程和舞台。

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='PWA 图片' ) }}

我们网站的用户在参加活动期间可能需要查看演出日程，而活动现场的网络连接质量可能时好时坏。这是将网站转换为可安装到用户主屏幕的 PWA 的绝佳用例，PWA 即使在离线状态下也能够提供所有关键功能。

# 创建 Web 应用清单

[Web 应用清单](https://developers.google.com/web/fundamentals/web-app-manifest/)是一个简单的 JSON 文件，可向浏览器告知您的网络应用的相关信息及其在用户的移动设备或桌面设备上“安装”后的行为。许多浏览器都要求具有清单才能显示[“添加到主屏幕”提示](https://developers.google.com/web/fundamentals/app-install-banners/)。

使用以下代码将名为 `manifest.json` 的文件添加到您的仓库：

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# 添加 AMP Service Worker

Service Worker 是浏览器在后台运行的脚本。有别于网页，Service Worker 可以通过缓存请求来提高性能和提供离线功能，从而有效扩展浏览器功能。从头开始构建 Service Worker 可行但较为耗时。诸如 Workbox 一类的库将有所帮助，但 AMP 通过提供 [AMP Service Worker](https://github.com/ampproject/amp-sw) 进一步简化了构建流程。借助 AMP Service Worker，AMP 可以直接自动完成许多步骤，包括缓存 AMP 脚本、素材资源和文档，以及实现诸如[导航预加载](https://developers.google.com/web/updates/2017/02/navigation-preload)等常用最佳做法。

安装后，AMP Service Worker 会根据用户请求自动[缓存 AMP 脚本](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching)和[文档](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching)。我们将从添加基本的 AMP Service Worker 开始。

## 创建 Service Worker 文件

创建名为 `sw.js` 的文件并添加以下代码：

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

只需两行代码，即可将 AMP Service Worker 导入到您的 Service Worker 中并对其进行初始化。

## 在您的 AMP 网页中自动安装您的 Service Worker

AMP 网站可以使用 [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) 组件在浏览器的后台安装 Service Worker，并且不会影响用户在浏览网页内容时的体验。

将所需的脚本代码放置在 `index.html` 的 head 中，将 `<amp-install-serviceworker>` 元素放置在 `<body>` 内：

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **重要提示**：应从根目录 (`/sw.js`) 提供 Service Worker，以便能够缓存您网站中的所有内容。[/tip]

`<amp-install-serviceworker>` 可以通过创建 iframe 并运行 `data-iframe-src` 文件来安装 Service Worker。请创建 `install-sw.html` 文件并添加以下代码：

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

iframe 可以将 AMP Service Worker 文件注册到浏览器中。

# 自定义缓存内容

AMP Service Worker 具有内置优势，支持根据应用需求优化可以配置的可选字段。

我们的音乐节应用将缓存我们的图片素材资源、预提取配置列表链接并指定离线网页。

## 缓存素材资源

您可以配置 AMP Service Worker 来[缓存素材资源](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching)，例如图片、视频和字体。我们将使用它来缓存我们的背景图片和 AMP 徽标。打开 `sw.js` 文件，并将其更新为以下代码：

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

我们已将缓存策略指定为[缓存优先](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)。这意味着应用将优先尝试从缓存中提供图片，然后再请求网络中的任何内容。由于我们不会更新背景图片或 AMP 徽标，因此这种模式对于此应用特别实用。

## 预提取链接

AMP Service Worker 会预提取具有 `data-rel=prefetch` 属性的链接。这样一来，即使尚未访问，用户也可以离线查看这些网页。我们将该属性添加到 `lineup.html` 的链接标记内。

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# 显示离线网页

为了应对意外情况或用户点击未预提取的网页的链接这一状况，我们将添加离线网页来提供一致且符合品牌形象的用户体验，而不是显示通用的浏览器离线网页。[在此下载 `offline.html`](/static/files/tutorials/offline.zip) 并将 `sw.js` 更新为以下代码：

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# 测试您的 PWA

您可以通过 [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps) 来测试您的 AMP Service Worker 是否缓存了所需素材资源并提供了理想的离线解决方案。

我们将通过 DevTools 面板测试 Lyrical Lyghtning，方法是在 Windows 系统上按 `Ctrl + Shift + I` 或在 Mac 系统上按 `Cmd + Opt + I`。您也可以右键点击页面，然后从菜单中选择 `inspect`。然后选择 `Application` 以查看您的 Service Worker 注册信息。

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='在 lyrical lyghtning PWA 上打开的 DevTools 面板' ) }}

点击 `offline` 框以切换到离线模式。点击 `see full lineup` 链接并转到 `offline.html` 以检查素材资源是否已正确缓存和预提取。

[tip type="default"] **提示**：要对渐进式 Web 应用的功能进行全面分析，请运行 [Google 的 Lighhouse 工具](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool)以生成报告。[/tip]

# 恭喜！

您已经使用 AMP 成功创建一个 PWA！在本教程中，您已了解如何执行以下操作：

- 创建 [Web 应用清单](https://developers.google.com/web/fundamentals/web-app-manifest/)
- 使用 [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) 在 AMP 中安装 Service Worker
- 自定义 [AMP Service Worker ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)
- [预提取链接](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- 创建离线网页

阅读有关 [Service Worker](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) 和[离线 UX 注意事项](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux)的更多信息。了解如何[基于分析跟踪互动](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html)并遵循有关[如何配置 AMP 网页的基本分析](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html)的教程。
