---
$title: Create a live blog
$order: 5
toc: true
tutorial: true
---

[TOC]

Live blogs are web pages that are updated frequently throughout an on-going event, such as the Super Bowl.

A live blog can be implemented in AMP via the `amp-live-list` component using the LiveBlogPosting markup. To see a sample implementation that you can use as a starting point, visit the [live blog sample](https://www.ampbyexample.com/samples_templates/live_blog/) at [ampbyexample.com](https://www.ampbyexample.com).

This tutorial offers a short overview of the `amp-live-list` component and focuses on some implementation details like pagination and deep linking, all using the live blog sample as an example.

## Amp-live-list overview

The `amp-live-list` component regularly polls the host document for updated content and updates the end user's browser as new items become available. This means that every time a new blog post needs to be added, the host document should be updated by the CMS to include the update in both the body and the metadata section.

This is how an initial blog could look like:

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates!</button>
  <div items></div>
</amp-live-list>
[/sourcecode]

The `data-poll-interval` attribute allows you to specify how often polls should occur; if the host document is updated, the update should be available to the user after the next time interval.

Every time a new item is added to the host document, the `<button update on="tap:my-live-list.update">` element shows a button which, when clicked, will trigger the page to show the latest posts.

Live blogs could grow making the page too long, the `data-max-items-per-page` attribute allows you to specify how many items can be added to the live blog page. If the number of items after an update exceed `data-max-items-per-page`, the oldest updates exceeding this number will be removed. For instance, if the page currently has 9 items, `data-max-items-per-page` is set to 10, and 3 new items arrive in the latest update, the two oldest items will be removed from the page with the latest update.

`amp-live-list` requires all the posts to be children of the tag `<div items></div>`. By referring to each post as an item, every item should have an unique `id` and a `data-sort-time`.

## Live Blog implementation details

Now that you’re familiar with the `amp-live-list` component, let’s figure out how to implement a more complex live blog. Read on to learn more about how to implement pagination, and how deep linking is going to work.

##Pagination

Long blogs could use pagination to improve performance by limiting the number of blog items to display on a page. To implement pagination, add the `<div pagination></div>` element within the `amp-live-list` component, then insert any markup you need for pagination (for example, a page number or a link to the next and previous page).

When using pagination, the simple code we used earlier becomes:

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates!</button>
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
[/sourcecode]

It’s your responsibility to populate the navigation items correctly by updating the hosted page. For example, in the [live blog sample](https://www.ampbyexample.com/samples_templates/live_blog/) we render the page via a server-side template and we use a query parameter to specify what the first blog item of the page should be. We limit the size of the page to 5 items, so if the server has generated more than 5 items, when a user lands on the main page it should show the Next element in the navigation area.

<amp-img src="/static/img/liveblog-pagination.png" alt="Live blog pagination" height="526" width="300"></amp-img>

After the size of blog posts has exceeded the maximum number of items specified by `data-max-items-per-page`, the older blog items are displayed in the “Next” pages, for example on page 2. Given that the `amp-live-list` polls the server at intervals to see if there is any change in the items, there's no need to poll the server if the user isn't on the first page.

You can add the disabled attribute to  the hosted page to prevent the polling mechanism. In the live blog sample, we perform this behavior in  a server-side template; when the requested page is not the first one, we add the disabled attribute to the amp-live-list component.

## Deeplinking

When you publish a blog post, it’s important to be able to deep link to the post to enable features like sharing. With `amp-live-list`, deep linking is possible by simply using the id of the blog item. For example, [https://ampbyexample.com/samples_templates/live_blog/preview/#post3](https://ampbyexample.com/samples_templates/live_blog/preview/#post3) allows you to navigate directly to the blog post with id “post3”.

In the [live blog sample](https://www.ampbyexample.com/samples_templates/live_blog/) we are using a technique based on a cookie to generate fresh content (see More on the Live Blog sample section for more details on that), so if it’s the first time you are landing on the page, the post with id “post3” might not be available, in that case we redirect to the first post.
