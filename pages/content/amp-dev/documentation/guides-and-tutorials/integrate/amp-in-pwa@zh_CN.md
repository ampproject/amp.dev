---
'$title': 将 AMP 用作 PWA 的数据源
$order: 1
description: 如果您对 AMP 感兴趣，但尚未构建渐进式 Web 应用，那么您的 AMP 网页可以极大地简化您的渐进式 Web 应用的开发工作。
formats:
  - websites
author: pbakaus
---

如果您对 AMP 感兴趣，但尚未构建渐进式 Web 应用，那么您的 AMP 网页可以极大地简化您的渐进式 Web 应用的开发工作。本指南将向您介绍如何在渐进式 Web 应用中使用 AMP 以及如何将现有 AMP 网页用作数据源。

## 从 JSON 到 AMP

在最常见的情况下，渐进式 Web 应用是一款通过 Ajax 连接到 JSON API 的单页应用。随后，此 JSON API 会返回多组数据以支持导航，并会返回实际内容以呈现报道。

然后，您会继续操作，将原始内容转换成易用的 HTML，并将其呈现在客户端上。此过程不仅开销大，而且通常难以维护。因此，您不妨改为将自己现有的 AMP 网页重复用作内容来源。最棒的是，借助 AMP，您只需使用几行代码即可轻松实现这一点。

## 在渐进式 Web 应用中添加“Shadow AMP”

第一步是在您的渐进式 Web 应用中添加一种特殊版本的 AMP，称为“Shadow AMP”。对，就是这样 - 您在顶级网页中加载 AMP 库，但 AMP 库实际上并不会控制顶级内容。它只会按照您的要求，将我们网页的部分内容转换成对应的 AMP 版本。

在您网页的 head 中添加 Shadow AMP，所需代码如下所示：

[sourcecode:html]

<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>

[/sourcecode]

### 如何判断 Shadow AMP API 是否已可供使用？

我们建议您在设置好 `async` 属性的前提下加载 Shadow AMP 库。不过，这意味着您需要借助某种方式来判断该库是否已加载完毕且可供使用。

您要观察的信号是全局 `AMP` 变量的可用性，并且 Shadow AMP 会使用“[异步函数加载方式](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)”来帮助您进行观察。您可以考虑使用如下代码：

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
// AMP is now available.
});
[/sourcecode]

此代码会正常运行，而且以这种方式添加的任何数量的回调都确实会在 AMP 可用时触发，但为什么会这样呢？

此代码可实现以下操作：

1. “如果 window.AMP 不存在，则创建一个空数组来占据其位置”
2. “然后，将一个应在 AMP 就绪时执行的回调函数推送到该数组中”

此代码之所以会正常运行，是因为 Shadow AMP 库在实际加载时会发现 `window.AMP` 下已有一个回调数组，然后便会处理整个队列。如果您日后再次执行同一函数，此代码仍会正常运行，因为 Shadow AMP 会使用其自身以及一种能立即触发回调的自定义 `push` 方法来替换 `window.AMP`。

[tip type="tip"] <strong>提示</strong>：为了使上述代码示例切实可行，我们建议您将其封装在 Promise 中，然后始终在使用 AMP API 之前先使用此 Promise。有关示例，请查看我们的 [React 演示代码](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20)。[/tip]

## 在渐进式 Web 应用中实现导航机制

您仍需要手动实现此步骤。毕竟，如何在导航机制中展示内容链接由您决定。是以一些列表的形式？还是以一堆卡片的形式？

在常见情况下，您需要获取某个 JSON，而此 JSON 需要能够返回多个包含一些元数据且依序排列的网址。最终，您应达到的结果是：每当用户点击其中任一链接时，便会触发相应的函数回调，并且此回调应包括请求的 AMP 网页的网址。如果您能达到这样的结果，就可以开始执行最后一个步骤了。

## 使用 Shadow AMP API 以内嵌的方式呈现网页

最后，当您想在用户操作后展示内容时，便可获取相关的 AMP 文档，并让 Shadow AMP 接管后续事宜。首先，实现一个函数以获取相应网页，所需代码与以下代码类似：

[sourcecode:javascript]
function fetchDocument(url) {

// unfortunately fetch() does not support retrieving documents,
// so we have to resort to good old XMLHttpRequest.
var xhr = new XMLHttpRequest();

return new Promise(function(resolve, reject) {
xhr.open('GET', url, true);
xhr.responseType = 'document';
xhr.setRequestHeader('Accept', 'text/html');
xhr.onload = function() {
// .responseXML contains a ready-to-use Document object
resolve(xhr.responseXML);
};
xhr.send();
});
}
[/sourcecode]

[tip type="important"] <strong>重要提示</strong>：为了简化上述代码示例，我们跳过了错误处理过程。您应始终确保能够有效地捕捉并处理错误。[/tip]

由于现在我们已经拥有即时可用的 `Document` 对象，接下来就该让 AMP 接管并呈现文档了。获取对作为 AMP 文档容器的 DOM 元素的引用，然后调用 `AMP.attachShadowDoc()`，所需代码如下所示：

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
// Let AMP take over and render the page
var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] <strong>提示</strong>：将文档实际移交给 AMP 之前的这段时间是移除以下内容的绝好时机：在 AMP 网页单独展示时有用但在嵌入模式中无用的网页元素（例如页脚和页眉）。[/tip]

大功告成！现在，您的 AMP 网页就会作为整个渐进式 Web 应用中的一个子级进行呈现了。

## 即时清理

很可能会发生的情况是：用户会在您的渐进式 Web 应用中从一个 AMP 网页导航到另一个 AMP 网页。在舍弃之前呈现的 AMP 网页时，请始终确保将此事告知 AMP，所需代码如下所示：

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

这样即可让 AMP 知道您已不再使用此文档，同时也可释放内存并降低 CPU 开销。

## 了解实际运作

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

您可以在我们制作的 [React 示例](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)中了解“PWA 中的 AMP”模式的实际运作。该示例演示了导航过程中的平滑过渡，并附有一个将上述各步骤囊括在内的简单 React 组件。在该模式中，两者（渐进式 Web 应用中灵活的自定义 JavaScript，以及 AMP）实现了强强联合，因为它们都能最大限度地发挥各自对内容加载速度的积极影响。

- 获取源代码：[https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
- 通过 npm 单独使用 React 组件：[https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
- 查看实际运作：[https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/)（最好通过手机或移动设备模拟器查看）

您还可以查看一个使用 Polymer 框架的 PWA + AMP 示例。该示例使用 [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) 嵌入 AMP 网页。

- 获取代码：[https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
- 查看实际运作：[https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)
