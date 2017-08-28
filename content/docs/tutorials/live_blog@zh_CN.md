---
$title: 制作直播博客
---

[TOC]

直播博客是指在持续进行的活动（例如超级碗）期间不断更新的网页。

您可以使用 LiveBlogPosting 标记通过 `amp-live-list` 组件在 AMP 中实施直播博客。要查看可供您参考的实施示例，请访问[直播博客示例](https://www.ampbyexample.com/samples_templates/live_blog/)（网址为 [ampbyexample.com）](https://www.ampbyexample.com)。

本教程简要介绍了 `amp-live-list` 组件，并重点介绍了一些实施详情（如分页和深层链接），所有这些均使用直播博客示例作为例子。

## Amp-live-list 概览

`amp-live-list` 组件会定期轮询主文档以查看是否有更新内容，并在出现新内容时更新最终用户的浏览器。这意味着，每当需要添加新博文时，CMS 应该会更新主文档，以在正文和元数据部分添加更新内容。

初始博客可能如下所示：

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
    <button update on="tap:my-live-list.update">您有更新内容！</button>
    <div items></div>
</amp-live-list>
[/sourcecode]

通过 `data-poll-interval` 属性，您可以指定应进行轮询的频率；如果主文档已更新，则应该在下一次时间间隔之后向用户提供更新内容。

每次向主文档中添加新内容时，`<button update on="tap:my-live-list.update">` 元素都会显示一个按钮，点击该按钮会触发页面显示最新博文。

直播博客可能会因不断更新而导致页面冗长；您可以通过 `data-max-items-per-page` 属性指定可以向直播博客页面添加多少项内容。如果博客内容在更新后超过 `data-max-items-per-page` 项，则超出此数量的最早更新内容会被移除。例如，如果相应页面当前有 9 项内容，`data-max-items-per-page` 设为 10，而最近一次更新增加了 3 项新内容，那么在本次更新时最早的 2 项内容会被移除。

`amp-live-list` 要求所有博文均为 `<div items></div>` 标记的子级。通过将每篇博文作为一项内容来引用，每项内容都应该有一个唯一 `id` 和 `data-sort-time`。

## 直播博客的实施详情

现在，您已经熟悉了 `amp-live-list` 组件，我们来了解如何实施更复杂的直播博客。请继续阅读，详细了解如何实施分页以及深层链接的工作原理。

## 分页

通过限制页面上显示的博客内容的数量，长博客可以使用分页来改进效果。要实施分页，请添加 `<div pagination></div>` 元素 （在 `amp-live-list` 组件内添加），然后插入进行分页所需的任何标记 (例如，转到下一页和上一页的页码或链接）。

使用分页后，我们之前使用的简单代码就变成了以下样式：

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
    <button update on="tap:my-live-list.update">您有更新内容！</button>
    <div items></div>
    <div pagination>
        <nav>
            <ul>
                <li>1</li>
                <li>下一页</li>
            </ul>
        </nav>
    </div>
</amp-live-list>
[/sourcecode]

您负责通过更新托管页面来正确填充导航内容。例如，在[直播博客示例](https://www.ampbyexample.com/samples_templates/live_blog/)中，我们通过服务器端模板呈现该页面，同时使用查询参数来指定页面的第一项博客内容应该是什么。我们将页面的大小限制为 5 项内容；如果服务器生成的内容超过 5 项，那么当用户转到主页面时，该页面应在导航区域显示 Next（下一页）元素。

<amp-img src="/static/img/liveblog-pagination.png" alt="Live blog pagination" height="526" width="300"></amp-img>

如果博文的大小超出 `data-max-items-per-page` 所指定的内容数量上限，较早的博客内容就会显示在 &ldquo;下一页&rdquo; 页面中，例如第 2 页。由于 `amp-live-list` 会定期轮询服务器以查看内容是否发生更改，因此，如果用户不在第一页，则不需要轮询服务器。

您可以通过向托管页面添加 disabled 属性来阻止轮询机制。在直播博客示例中，我们在服务器端模板中执行此操作；如果所请求的页面不是第一页，我们会向 amp-live-list 组件添加 disabled 属性。

## 深层链接

当您发布一篇博文时，务必要添加指向该博文的深层链接，以启用分享等功能。借助 `amp-live-list`，只需使用博客内容的 ID 即可实现深层链接。例如，[https://ampbyexample.com/samples_templates/live_blog/preview/#post3](https://ampbyexample.com/samples_templates/live_blog/preview/#post3)允许您使用 ID"post3" 直接导航到该博文。

在[直播博客示例](https://www.ampbyexample.com/samples_templates/live_blog/)中，我们使用基于 Cookie 的技术来生成新内容（有关更多详情，请参阅直播博客示例部分的 &ldquo;更多&rdquo;）。因此，如果您首次转到该页面，则 ID"post3" 的博文可能不会显示出来，在这种情况下，我们会重定向至第一篇博文。

