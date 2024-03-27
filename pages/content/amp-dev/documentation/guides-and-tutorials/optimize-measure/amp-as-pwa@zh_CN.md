---
$title: 为 AMP 网页启用渐进式网页应用功能
---

{{ image('/static/img/docs/pwamp_add_to_homescreen.png', 848, 1500, align='right third', caption='AMPbyExample 触发了“添加到主屏幕”提示。') }}

很多网站根本不需要 AMP 范畴之外的功能。例如，[Examples](../../../documentation/examples/index.html) 既是一个 AMP 网站，又是一款渐进式网页应用。

1. 它具有[网络应用清单](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/)，因此会向用户显示“添加到主屏幕”这一横幅提示。
1. 它具有 [Service Worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)，因此可实现诸多功能（其中包括允许离线访问）。

如果某位用户通过某个支持 AMP 的平台访问 [Examples](../../../documentation/examples/index.html)，然后通过执行点击操作进入该网站以继续进行浏览之旅，该用户就会从 AMP 缓存转到源网域。当然，该网站仍会使用 AMP 库，但由于该网站现在位于源网域，它就可以使用 Service Worker、可以提示用户进行安装，等等。

Service Worker 无法与网页的 AMP 缓存版本互动。请在用户进入您的源网域以继续进行浏览之旅时使用 Service Worker。

## 添加网络应用清单

向您的 AMP 网页添加[网络应用清单](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/)可确保用户能够将您的网站安装到其设备的主屏幕上。AMP 网页中的网络应用清单并无任何特别之处。

首先，创建以下清单：

[sourcecode:json]
{
  "short_name": "ABE",
  "name": "AMPByExample",
  "icons": [
    {
      "src": "launcher-icon-1x.png",
      "type": "image/png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-2x.png",
      "type": "image/png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-4x.png",
      "type": "image/png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html?launcher=true"
}
[/sourcecode]

然后，从您 AMP 网页的 `<head>` 链接到该清单。

[sourcecode:html]
<link rel="manifest" href="/manifest.json">
[/sourcecode]

提示: 如有需要，请[在“网页基础知识”网站上详细了解网络应用清单](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/)。

## 安装 Service Worker 以允许离线访问

Service Worker 是您的网页与服务器之间的客户端代理，可用于打造出色的离线体验、快速加载应用 Shell 场景以及发送推送通知。

注意: 如果您不熟悉 Service Worker 这一概念，请[在“网页基础知识”网站上阅读相关简介](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)。

您需要在一个给定的网页上注册 Service Worker，否则浏览器将无法找到或运行该文件。默认情况下，注册过程是借助[少量 JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration) 完成的。在 AMP 网页上，您可以使用 [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) 组件实现同样的目的。

为此，请先通过 [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) 组件的脚本在您网页的 `<head>`中添加该组件：

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

然后，在您 `<body>` 中的某个位置添加以下内容（请酌情进行修改以使其指向您的实际 Service Worker）：

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

如果用户已转到您的源网域中的 AMP 网页上（此时的情况已不同于通常由 AMP 缓存提供的首次点击），Service Worker 便会接管后续工作，并可完成[无数的精彩操作](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux)。

## 通过 Service Worker 扩展 AMP 网页

借助上述方法，您既可允许用户离线访问您的 AMP 网站，也可**在您的网页由源网域提供后**立即扩展这些网页。这是因为您可通过 Service Worker 的 `fetch` 事件修改响应，并返回您想发出的任何响应：

[sourcecode:js]
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })

        // Modify the response here before it goes out..
        ...

        return response || fetchPromise;
      })
    })
  );
});
[/sourcecode]

通过这种方法，您可以修改您的 AMP 网页以及相关的各种附加功能
（如果不修改，则会无法顺利通过 [AMP 验证](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)），例如：

* 需要使用自定义 JS 的动态功能。
* 专为您的网站定制/仅与您的网站相关的组件。
