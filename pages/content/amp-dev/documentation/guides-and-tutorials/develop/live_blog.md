---
$title: Create a live blog
$order: 102
description: 'Live blogs are web pages that are updated frequently throughout an on-going event, such as a sporting event or an election. In AMP, you can implement a live blog by using ...'
tutorial: true

formats:
    - websites

author: kul3r4
contributors:
  - bpaduch
---

Live blogs are web pages that are updated frequently throughout an on-going event, such as a sporting event or an election. In AMP, you can implement a live blog by using the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) component.

This tutorial provides a short overview of the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) component and focuses on some implementation details for live blogs, like [pagination](#pagination) and [deep linking](#deeplinking). We'll use AMP By Example's [live blog sample](live_blog.md) to illustrate implementing live blogs in AMP.

[tip type="tip"]
**TIP –** Use the [LiveBlogPosting](http://schema.org/LiveBlogPosting) metadata markup so your blog can be integrated with third-party platform features.
[/tip]

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## Overview of `amp-live-list`

The [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) component regularly polls the host document for new content and updates the user's browser as new items become available. This means that each time a new blog post needs to be added, the host document should be updated by the CMS to include the update in both the body and the [metadata](../../../documentation/examples/documentation/Live_Blog.html#metadata) section of the page.

This is what the initial code for the blog could look like:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
</amp-live-list>
```

Let's look at this code:

Each [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) component requires a unique id as there could be more than one on a page.  In this example, we specified `my-live-list` as the unique id.

The `data-poll-interval` attribute specifies how often polls should occur; if the host document is updated, the update should be available to the user after the next time interval.

Every time a new item is added to the host document, the `<button update on="tap:my-live-list.update">` element shows a "You have updates" button which, when clicked, triggers the page to show the latest posts.

Live blogs can grow and make the page too long. You can use the `data-max-items-per-page` attribute to specify how many items can be added to the live blog. If the number of items after an update exceeds `data-max-items-per-page`, the oldest updates exceeding this number are removed. For example, if the page currently has 9 items and `data-max-items-per-page` is set to 10, and 3 new items arrive in the latest update, the two oldest items are removed from the page with the latest update.

All blog posts in the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) must be children of `<div items></div>`. By referring to each post as an item, every item must have a unique `id` and a `data-sort-time`.

## Implementation details

Now that you’re familiar with the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) component, let’s figure out how to implement a more complex live blog. Read on to learn more about how to implement pagination, and how deep linking works.

### Pagination <a name="pagination"></a>

Long blogs could use pagination to improve performance by limiting the number of blog items to display on a page. To implement pagination, in the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) component, add the `<div pagination></div>`, then insert any markup you need for pagination (for example, a page number or a link to the next and previous page).

With pagination, the simple code we used earlier becomes:

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

It’s your responsibility to populate the navigation items correctly by updating the hosted page. For example, in the [live blog sample](live_blog.md) we render the page via a server-side template and we use a query parameter to specify what the first blog item of the page should be. We limit the size of the page to 5 items, so if the server has generated more than 5 items, a user landing on the main page will see the "Next" element in the navigation area. Refer to [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) for details.

After the size of blog posts has exceeded the maximum number of items specified by `data-max-items-per-page`, the older blog items are displayed in the “Next” pages, for example on page 2. Given that the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) polls the server at intervals to see if there is any change in the items, there's no need to poll the server if the user isn't on the first page.

You can add the disabled attribute to  the hosted page to prevent the polling mechanism. In the live blog sample, we perform this behavior in  a server-side template; when the requested page is not the first one, we add the disabled attribute to the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) component.

### Deeplinking <a name="deeplinking"></a>

When you publish a blog post, it’s important to be able to deep link to the post to enable features like sharing. With [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md), deep linking is possible by simply using the `id` of the blog item. For example, [https://amp.dev/documentation/examples/news-publishing/live_blog/preview/index.html#post3](../../../documentation/examples/previews/Live_Blog.html#post3) allows you to navigate directly to the blog post with the `post3` id.

AMP By Example uses a cookie to in the [live blog sample](live_blog.md) to generate fresh content, so if it’s the first time you are landing on the page, the post with id “post3” might not be available, in that case, you are redirected to the first post.

## Resources

Learn more from these resources:

- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) reference documentation
- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [AMP BY Example's Live blog sample](live_blog.md)
