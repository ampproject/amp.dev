---
layout: page
title: AMP 如何提升性能
order: 2
locale: zh-cn
---

下面汇总的优化措施是 AMP 页面可以瞬时快速加载的原因：

{% include toc.html %}

AMP 工程主管 Malte Ubl 在下面的视频中提供了与本文章内容类似的介绍，如果您更倾向于收听音频而不是阅读文字，请观看此视频。

<amp-youtube
    data-videoid="hVRkG1CQScA"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

## 仅允许异步脚本

JavaScript 功能强大，几乎可以修改页面的各个方面，不过，它也会阻碍 DOM 的构建，延缓页面渲染（另请参见[使用 JavaScript 添加交互](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)）。



为了避免 JavaScript 延缓页面渲染，AMP 仅允许异步 JavaScript。
 

AMP 页面不能包含作者自己编写的任何 JavaScript。
使用自定义 AMP 元素而不是 JavaScript 来处理互动页面功能。

自定义 AMP 元素的内部可能会有 JavaScript，但是这些代码均经过精心设计，不会导致性能下降。


虽然在 iframe 中允许第三方 JS，不过它不会阻碍渲染。

例如，如果第三方 JS 使用[严重影响性能的 `document.write` API](http://www.stevesouders.com/blog/2012/04/10/dont-docwrite-scripts/)，它也不会阻碍主页面渲染。



## 静态确定所有资源的大小

图片、广告或 iframe 等外部资源必须在 HTML 中声明其大小，以便 AMP 可以在资源下载前确定每个元素的大小和位置。

AMP 不必等待所有资源都下载完成就可以直接加载页面布局。

AMP 将文档布局与资源布局脱钩。
布局整个文档（[包括字体](#font-triggering-must-be-efficient)）只需要一个 HTTP 请求。

由于 AMP 经过优化，可以在浏览器中避免会消耗大量资源的样式重新计算和布局，因此资源加载时不会存在任何重新布局。


## 不让扩展机制阻碍渲染

AMP 不会让扩展机制阻碍页面渲染。
AMP 支持[灯箱](/docs/reference/extended/amp-lightbox.html)、[Instagram 嵌入代码](/docs/reference/extended/amp-instagram.html)、[Twitter 消息](/docs/reference/extended/amp-twitter.html)等对象的扩展。



尽管这些对象需要额外的 HTTP 请求，
但这些请求不会阻碍页面布局和渲染。 

使用自定义脚本的任何页面都必须告诉 AMP 系统其最终会有自定义标记。

例如，[`amp-iframe`](/docs/reference/extended/amp-iframe.html) 脚本会告诉系统将有一个 `amp-iframe` 标记。

AMP 甚至会在了解 iframe 框将要包含的内容前先行创建此框： 

{% highlight html %}
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight %}

## 将所有第三方 JavaScript 保存在非关键路径下

第三方 JS 喜欢使用同步 JS 加载，
也喜欢对更多同步脚本进行 `document.write` 操作。
例如，如果您有五个广告，每个广告都在 1 秒的延时连接下进行三次同步加载，那么仅仅加载 JS 就需要 18 秒。

 

AMP 页面允许第三方 JavaScript，不过仅限在沙盒环境下的 iframe 中。
将这些 JS 限制在 iframe 中后，它们就不会阻碍主页面的执行。
即使第三方 JS 触发了多次样式重新计算，
它们微小的 iframe 也只有非常少的 DOM。 

样式重新计算和布局通常与 DOM 大小相关，因此，与页面的样式和布局重新计算相比，iframe 重新计算非常快。



## 所有 CSS 都必须内嵌并具有大小限值

CSS 会阻碍所有渲染和页面加载，并且往往变得臃肿。
在 AMP HTML 页面中，只允许内嵌样式。
与大多数网页相比，这一限制可从关键渲染路径中移除 1 个或多个 HTTP 请求。


另外，内嵌样式表最大为 50 KB。
虽然此大小对非常复杂的页面来说已经足够大，页面作者仍需要践行良好的 CSS 风格。


## 字体触发必须高效

网络字体超大，因此[网络字体优化](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)对性能至关重要。


在一个具有少量同步脚本和外部样式表的典型页面上，浏览器会等待这些大字体都出现后才开始下载字体。


而 AMP 系统在字体开始下载前不会发出 HTTP 请求。
这是因为 AMP 中的所有 JS 都有异步属性，并且仅允许内嵌样式表；不存在会阻碍浏览器下载字体的 HTTP 请求。



## 最大程度减少样式重新计算次数

每次测量某些元素时，由于浏览器需要布局整个页面，系统都会触发会消耗大量资源的样式重新计算。

在 AMP 页面中，所有 DOM 读取都发生在写入之前。
这样可以确保每帧最多只有一次样式重新计算。

详细了解样式和布局重新计算对[渲染性能](https://developers.google.com/web/fundamentals/performance/rendering/)的影响。


## 仅运行 GPU 加速动画

快速优化的唯一方式是在 GPU 上运行优化。
GPU 了解图层，知道如何在这些图层上展示元素。GPU 可以移动、淡化图层，但无法更新页面布局。它将该任务交给浏览器执行，这并不是一种很好的做法。



动画相关 CSS 的规则确保动画可以进行 GPU 加速。
具体而言，AMP 仅允许在变形和不透明度上进行动画处理和变换，因此不需要页面布局。

详细了解[使用变形和不透明度进行动画变更](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)。


## 设定资源加载的优先级

AMP 可以控制所有资源下载：它会设定资源加载的优先级、仅加载需要的内容，以及预提取具有延迟加载特性的资源。
 

下载资源时，AMP 会优化下载，以便优先下载当前最重要的资源。

图片和广告仅在位于首屏、用户可能会查看或者快速滚动到它们时下载。
  

AMP 还会预提取具有延迟加载特性的资源。
资源加载尽可能晚，但预提取则尽可能早。
这样一来，加载速度非常快，不过只有在资源实际向用户显示时才会使用 CPU。


## 瞬时加载页面

大量使用全新的 [preconnect API](http://www.w3.org/TR/resource-hints/#dfn-preconnect)，从而确保 HTTP 请求的速度尽可能快。

这样，在用户明确指明想要前往某个页面之前，该页面就可以渲染完成；在用户实际选择页面之前，页面就可能已经准备就绪，进而实现瞬时加载。




所有网络内容都可以应用预渲染，但这一过程也需要使用一些带宽和 CPU。
AMP 已经过优化，可以减少这两种因素的消耗。预渲染仅下载首屏资源，并且不会渲染可能要消耗大量 CPU 的资源。


在 AMP 文档进行预渲染以实现瞬时加载时，实际上只会下载首屏资源。

在 AMP 文档进行预渲染以实现瞬时加载时，不会下载可能要使用大量 CPU 的资源（例如第三方 iframe）。
 

详细了解 [AMP HTML 为什么无法充分利用预加载扫描器](https://medium.com/@cramforce/why-amp-html-does-not-take-full-advantage-of-the-preload-scanner-7e7f788aa94e)。


## 帮助提高 AMP 速度
AMP 是一个开源项目。
我们需要您的帮助来提高 AMP 速度。
了解[如何贡献](/docs/support/contribute.html)。
