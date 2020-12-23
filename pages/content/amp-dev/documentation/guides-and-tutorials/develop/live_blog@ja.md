---
"$title": ライブブログを作成する
"$order": '102'
description: Live blogs are web pages that are updated frequently throughout an on-going event, such as a sporting event or an election. In AMP, you can implement a live blog by using ...
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- bpaduch
---

ライブブログは、スポーツイベントや選挙などのイベント開催中に頻繁に更新されるウェブページです。AMP では、[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) コンポーネントを使用してライブブログを実装できます。

This tutorial provides a short overview of the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) component and focuses on some implementation details for live blogs, like [pagination](#pagination) and [deep linking](#deeplinking). We'll use AMP By Example's [live blog sample](live_blog.md) to illustrate implementing live blogs in AMP.

[tip type="tip"] **TIP –** Use the [LiveBlogPosting](http://schema.org/LiveBlogPosting) metadata markup so your blog can be integrated with third-party platform features. [/tip]

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## `amp-live-list` の概要

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

では、このコードを見ていきましょう。

[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) コンポーネントは 1 ページに複数存在する可能性があるため、それぞれに一意の ID を指定する必要があります。この例では、一意の ID として `my-live-list` を指定しています。

The `data-poll-interval` attribute specifies how often polls should occur; if the host document is updated, the update should be available to the user after the next time interval.

Every time a new item is added to the host document, the `<button update on="tap:my-live-list.update">` element shows a "You have updates" button which, when clicked, triggers the page to show the latest posts.

ライブブログは、投稿が増えてページが長くなってしまうことがあります。`data-max-items-per-page` 属性を使用すると、ライブブログに追加できる項目の数を指定できます。更新後の項目数が `data-max-items-per-page` で指定した数を超えると、超えた分だけ古い更新から順に削除されます。たとえば、現在のページに 9 個の項目があり、`data-max-items-per-page` が 10 に設定されているとします。ここで、最新の更新によって新しい項目が 3 つ追加されると、古い順に 2 つの項目が更新されたページから削除されます。

[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 内では、すべてのブログ投稿を `<div items></div>` の子にする必要があります。各投稿は項目として参照されるため、それぞれの項目には一意の `id` と `data-sort-time` が必要です。

## 実装の詳細

Now that you’re familiar with the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) component, let’s figure out how to implement a more complex live blog. Read on to learn more about how to implement pagination, and how deep linking works.

### Pagination <a name="pagination"></a>

Long blogs could use pagination to improve performance by limiting the number of blog items to display on a page. To implement pagination, in the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) component, add the `<div pagination></div>`, then insert any markup you need for pagination (for example, a page number or a link to the next and previous page).

With pagination, the simple code we used earlier becomes:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">更新があります</button>
  <div items></div>
  <div pagination>
    <nav>
      <ul>
        <li>1</li>
        <li>次へ</li>
      </ul>
     </nav>
   </div>
</amp-live-list>
```

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample_pg2.png', 700, 1441, align='right third') }}

ナビゲーション項目は、ホストされるページを更新して正しく設定する必要があります。たとえば[ライブブログのサンプル](live_blog.md) では、サーバー側のテンプレートを使用してページをレンダリングしています。また、クエリ パラメータを使用して、ページの最初に表示するブログ項目を指定しています。ページの最大項目数を 5 つに制限しているため、サーバーが生成した項目数が 5 つを超えると、ユーザーがメインページを開いたときに、ナビゲーション領域に [次へ] 要素が表示されます。詳しくは、[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) をご覧ください。

ブログ投稿の項目数が `data-max-items-per-page` で指定した最大項目数を超えると、古いブログ項目は [次へ] ページ（ページ 2 など）に表示されます。[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) コンポーネントでサーバーを一定間隔でポーリングし、項目が変更されていないか確認する動作は、ユーザーが最初のページにいないときには必要ありません。

ポーリングを停止するには、ホストするページに `disabled` 属性を追加します。ライブブログのサンプルでは、この動作をサーバー側のテンプレートで実行しています。リクエストされたページが 1 ページ目でない場合は、無効にした属性を [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) コンポーネントに追加しています。

### ディープリンク <a name="deeplinking"></a>

ブログ投稿を公開する際は、共有などの機能を利用できるようにするため、投稿へのディープリンクをできるようにすることが重要です。[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) では、ブログ項目の `id` を使うだけでディープリンクできます。たとえば、[https://amp.dev/documentation/examples/news-publishing/live_blog/preview/index.html#post3](../../../documentation/examples/previews/Live_Blog.html#post3) とすると、ID が `post3` のブログ投稿に直接移動できます。

AMP By Example uses a cookie to in the [live blog sample](live_blog.md) to generate fresh content, so if it’s the first time you are landing on the page, the post with id “post3” might not be available, in that case, you are redirected to the first post.

## リソース

詳細については、下記の関連資料をご覧ください。

- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) reference documentation
- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [AMP BY Example's Live blog sample](live_blog.md)
