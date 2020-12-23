---
"$title": 制作实时博客
"$order": '102'
description: Live blogs are web pages that are updated frequently throughout an on-going event, such as a sporting event or an election. In AMP, you can implement a live blog by using ...
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- bpaduch
---

实时博客是在整个持续性事件（如体育赛事或选举）中频繁更新的网页。在 AMP 中，您可以使用 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 组件实现实时博客。

本教程简要概述了 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 组件，并重点介绍了实时博客的一些实现细节，例如[分页](#pagination)和[深层链接](#deeplinking)。我们将使用 AMP By Example 的[实时博客示例](live_blog.md)来说明如何在 AMP 中实现实时博客。

请使用 [LiveBlogPosting](http://schema.org/LiveBlogPosting) 元数据标记，以便让您的博客能够与第三方平台功能集成。

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## amp-live-list

[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 组件会定期轮询主文档以查找新内容，并在出现新条目后更新用户的浏览器。这意味着每当需要添加新博文时，CMS 都应该更新主文档，以便将更新内容添加到网页的正文和[元数据](../../../documentation/examples/documentation/Live_Blog.html#metadata)部分。 博客的初始代码如下所示：

这是该博客的初始代码如下所示：

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
</amp-live-list>
```

我们来看看这段代码：

每个 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 组件都需要一个唯一 ID，因为一个网页上可能存在多个这种组件。在本例中，我们指定了 `my-live-list` 作为唯一 ID。

`data-poll-interval` 属性可指定轮询的发生频率；如果主文档已更新，则更新内容应在下一时间间隔过后提供给用户。

每次向主文档添加新条目时，`<button update on="tap:my-live-list.update">` 元素都会显示“您有更新”按钮；点击此按钮就会触发网页显示最新博文。

随着实时博客的内容增多，会导致网页过长。您可以使用 `data-max-items-per-page` 属性指定可向实时博客添加多少条目。如果更新后的条目数超过 `data-max-items-per-page`，系统就会移除超出此值的最早更新。例如，如果目前网页上有 9 个条目，并且 `data-max-items-per-page` 设为 10，此时最新的更新中出现了 3 个新条目，那么最新的更新会从网页中移除两个最早的条目。

[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 中的所有博文都必须是 `<div items></div>` 的子级。我们将每篇博文都称为一个条目，每个条目都必须拥有唯一 `id` 和 `data-sort-time`。

## 实现细节

现在，您已熟悉 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 组件；接下来，我们来了解下如何实现更复杂的实时博客。请继续阅读，详细了解分页的实现方法和深层链接的工作原理。

### 分页 <a name="pagination"></a>

较长的博客可以使用分页来提升性能，方法是限制一个网页上显示的博客条目的数量。要实现分页，请在 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 组件中添加 `<div pagination></div>`，然后插入分页所需的任何标记（例如，页码或指向下一页和上一页的链接）。

分页后，我们之前使用的简单代码将变为如下所示的代码：

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
  <div pagination>
    <nav>
      <ul>
        <li>1</li>
        <li>Next</li>
      </ul>
     </nav>
   </div>
</amp-live-list>
```

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample_pg2.png', 700, 1441, align='right third') }}

您需要通过更新托管的网页来正确地填充导航项。例如，在[实时博客示例](live_blog.md)中，我们通过服务器端模板呈现网页，并使用查询参数指定网页的第一个博客条目应该是什么。我们将网页大小限制为 5 个条目，因此如果服务器生成了 5 个以上的条目，那么在用户进入到主网页时，系统就会在导航区域中显示“下一页”元素。有关详情，请参阅 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)。

在博文大小超出 `data-max-items-per-page` 指定的条目数量上限后，更早的博客条目就会显示在“下一页”（如第 2 页）。由于 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 每隔一段时间就会轮询一次服务器，查看条目是否有变化，因此，如果用户不在第一页上，则无需轮询服务器。

您可以将“已停用”属性添加到托管的网页以阻止轮询机制。在实时博客示例中，我们在服务器端模板中执行此行为；如果请求的网页不是第一个网页，我们就会将“已停用”属性添加到 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 组件。

### 深层链接 <a name="deeplinking"></a>

在您发布博文时，务必要能够深层链接到该博文，以便启用分享等功能。借助 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)，您只需使用博客条目的 `id` 即可实现深层链接。例如，点击 [https://amp.dev/documentation/examples/news-publishing/live_blog/preview/index.html#post3](../../../documentation/examples/previews/Live_Blog.html#post3) 可以直接转到 ID 为 `post3` 的博文。

AMP By Example 在[实时博客示例](live_blog.md)中使用 Cookie 生成新内容，因此如果您是首次进入到该网页，则可能无法访问 ID 为“post3”的博文；在这种情况下，系统会将您重定向到第一篇博文。

## 资源

要了解详细信息，请参阅以下资源：

- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 参考文档
- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [AMP BY Example 的实时博客示例](live_blog.md)
