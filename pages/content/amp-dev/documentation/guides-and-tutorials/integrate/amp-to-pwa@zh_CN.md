---
$title: 通过 AMP 网页预加载 PWA
$order: 1
description: 推荐采取的策略：将一个 AMP 网页作为您网站的进入点，然后让 PWA 在后台做好准备并切换到…
formats:
  - websites
author: pbakaus
---

推荐采取的策略：**将一个 AMP 网页作为您网站的进入点**，然后**让 PWA 在后台做好准备**并切换到 PWA 以便用户继续浏览之旅：

- 将所有的内容分支页面（包含具体内容的页面，而非概览页面）发布为 AMP 网页，以便提供近乎即时的加载体验。
- 当用户浏览您的内容时，这些 AMP 网页会使用 AMP 的专用元素 [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) 让缓存和 PWA Shell 做好准备。
- 当用户点击您网站上的另一个链接（例如，点击底部的号召性用语，以便获得与应用更相似的体验）时，Service Worker 会拦截相应请求，接管相应网页并改为加载 PWA Shell。

要想了解为何要使用此开发模式以及如何使用它，请继续阅读下文。

## 通过关联到 PWA，让用户行为历程更顺畅

### 使用 AMP 进行初始用户获取

AMP 是所谓的**分支页面**的理想解决方案；分支页面是指用户通过某个搜索引擎、朋友分享的某个链接或另一网站上的某个链接而自然发现的内容网页。由于 AMP 具有[专门的预呈现功能](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/)，因此 AMP 网页的加载速度极快，这便意味着流失率会大幅降低（最新的 [DoubleClick 研究](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/)表明，**在所有用户中，有超过 53% 的用户会在 3 秒钟后流失**）。

### 使用 PWA 提升互动度和参与度

另一方面，渐进式 Web 应用可大幅提升互动度并吸引用户进行深入互动，但不具备 AMP 网页的*首次加载即时交付*特征。渐进式 Web 应用的核心是一种名为 Service Worker 的技术，该技术是一种客户端代理，让您能够为网页缓存各种素材资源，但上述 Service Worker 只有在首次加载完成*之后*才会开始起作用。

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='对比 AMP 和 PWA 的优点与缺点。') }}

## 使用 `amp-install-serviceworker` 让 PWA 做好准备

AMP 技术能够从 AMP 网页内安装渐进式 Web 应用的 Service Worker - 对，即使相应 AMP 网页是由 AMP 缓存提供也能如此！如果操作正确，（从您的某一个 AMP 网页中）指向您的 PWA 的链接会给用户带来近乎即时交付内容的感觉，与首次跳转到 AMP 网页的体验相似。

[tip type="tip"] <strong>提示</strong>：如果您还不熟悉 Service Worker，我们强烈建议您学习一下 Jake Archibald 的 [Udacity 课程](https://www.udacity.com/course/offline-web-applications--ud899)。[/tip]

首先，使用 [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) 在您的所有 AMP 网页上安装 Service Worker；为此，请先通过相应脚本在您网页的 `<head>` 中添加该组件：

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

然后，在您 `<body>` 中的某个位置添加以下内容（请酌情进行修改以使其指向您的实际 Service Worker）：

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

最后，在 Service Worker 的安装步骤中，缓存 PWA 将会需要的所有资源：

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
[/sourcecode]

[tip type="tip"] <strong>提示</strong>：您也可以采用更简单的方式设置 Service Worker。请查看 [Service Worker 辅助工具库](https://github.com/GoogleChrome/sw-helpers)。[/tip]

## 将 AMP 网页上的所有链接都指向 PWA

可能会发生的情况是：您的 AMP 网页上的大多数链接都会指向更多内容网页。您可以采用两种策略来确保后续的链接点击能够将 AMP 网页“升级”为渐进式 Web 应用，[具体取决于您使用 AMP 的方式](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md)：

### 1. 如果您的规范网页有对应的 AMP 网页

在这种情况下，您不仅拥有规范网站（非 AMP 网站），还生成链接到这些规范网页的 AMP 网页。这是目前最常见的 AMP 使用方式，此方式意味着您的 AMP 网页上的链接很可能会链接到您网站的规范版本。**好消息：如果您的规范网站是您的 PWA，您已经设置完毕**。

### 2. 如果您的规范网站是 AMP 网站

在这种情况下，您的规范网页*即是*您的 AMP 网页：您使用 AMP 构建自己的整个网站，并且只是将 AMP 用作内容库（有趣的是，您阅读本文时所在的网站就是采用这种方式构建的）。**在这种情况下，您的 AMP 网页上的大多数链接都会指向其他 AMP 网页。**

现在，您可以将 PWA 部署在单独的路径（例如 `your-domain.com/pwa`）上，并使用已开始运行的 Service Worker**&nbsp;在有人点击 AMP 网页上的链接时拦截相应的浏览器导航**：

[sourcecode:javascript]
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

关于这种技术，特别有趣的是，您在采用渐进增强的方式从 AMP 跳转到 PWA。不过，这也意味着（其实现状正是如此），尚不支持 Service Worker 的浏览器只会从 AMP 跳转到 AMP，并且永远无法实际导航到 PWA。

AMP 采用一种名为 [Shell 网址重写](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite)的方式来解决此问题。通过向 [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) 标记添加后备网址格式，您可以指示 AMP 在检测不到任何对 Service Worker 的支持时重写相应网页上的所有匹配链接，以便改为跳转到另一个旧版 Shell 网址：

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

设置好上述属性后，在相应 AMP 网页上发生的所有后续点击都会跳转到您的 PWA，而无论采用何种 Service Worker。

[tip type="read-on"] <strong>延伸阅读</strong>：您已经掌握不少相关知识和技巧了，为什么不重复使用您的现有 AMP 网页来构建 PWA 呢？[操作方法](amp-in-pwa.md)。[/tip]
