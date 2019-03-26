---
$title: ライブブログを作成する
---

ライブブログは、スポーツ イベントや選挙などのイベント開催中に頻繁に更新されるウェブページです。AMP では、[`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) コンポーネントを使用してライブブログを実装できます。

このチュートリアルでは、[`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) コンポーネントの概要を簡単に紹介し、[ページ指定],[ディープリンク],[ライブブログのサンプル]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/live_blog.md', locale=doc.locale).url.path}}#pagination) を使用します。

ヒント: [LiveBlogPosting](http://schema.org/LiveBlogPosting) メタデータ マークアップを使用して、ブログをサードパーティ プラットフォームの機能と統合することができます。

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## `amp-live-list` の概要

[`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) コンポーネントは、ホスト ドキュメントを定期的にポーリングして新しいコンテンツがないか確認し、新しい項目が利用できるようになったらユーザーのブラウザを更新します。つまり、新しいブログ投稿を追加するたびに、CMS でホスト ドキュメントを更新し、ページの本文と[メタデータ]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/live_blog.md', locale=doc.locale).url.path}}) セクションの両方に更新を含める必要があるということです。

たとえば、次のようなシンプルなブログのコードがあるとします。

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">更新があります</button>
  <div items></div>
</amp-live-list>
```

では、このコードを見ていきましょう。

[`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) コンポーネントは 1 ページに複数存在する可能性があるため、それぞれに一意の ID を指定する必要があります。この例では、一意の ID として `my-live-list` を指定しています。

`data-poll-interval` 属性を使うと、ポーリングの間隔を指定できます。ホスト ドキュメントが更新された場合、その更新は次回のポーリング後に利用できるようになります。

ホスト ドキュメントに新しい項目が追加されるたびに、`<button update on="tap:my-live-list.update">` 要素によって [更新があります] ボタンが表示され、これをクリックすると最新の投稿を表示するページがトリガーされます。

ライブブログは、投稿が増えてページが長くなってしまうことがあります。`data-max-items-per-page` 属性を使用すると、ライブブログに追加できる項目の数を指定できます。更新後の項目数が `data-max-items-per-page` で指定した数を超えると、超えた分だけ古い更新から順に削除されます。たとえば、現在のページに 9 個の項目があり、`data-max-items-per-page` が 10 に設定されているとします。ここで、最新の更新によって新しい項目が 3 つ追加されると、古い順に 2 つの項目が更新されたページから削除されます。

[`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) 内では、すべてのブログ投稿を `<div items></div>` の子にする必要があります。各投稿は項目として参照されるため、それぞれの項目には一意の `id` と `data-sort-time` が必要です。

## 実装の詳細

[`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) コンポーネントについて理解できたところで、より複雑なライブブログを実装する方法を説明しましょう。以下では、ページ指定を実装する方法と、ディープリンクの仕組みについて解説します。

### ページ指定

ブログが長い場合は、ページ指定を使用して 1 ページに表示されるブログ項目数を制限することでパフォーマンスを向上できます。ページ指定を実装するには、[`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) コンポーネントに `<div pagination></div>` を追加し、ページ指定に必要なマークアップ（ページ番号、次ページや前ページへのリンクなど）を挿入します。

ページ指定を実装するには、先ほどのシンプルなコードを次のように変更します。

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

ナビゲーション項目は、ホストされるページを更新して正しく設定する必要があります。たとえば[ライブブログのサンプル]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/live_blog.md', locale=doc.locale).url.path}}) では、サーバー側のテンプレートを使用してページをレンダリングしています。また、クエリ パラメータを使用して、ページの最初に表示するブログ項目を指定しています。ページの最大項目数を 5 つに制限しているため、サーバーが生成した項目数が 5 つを超えると、ユーザーがメインページを開いたときに、ナビゲーション領域に [次へ] 要素が表示されます。詳しくは、[`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) をご覧ください。

ブログ投稿の項目数が `data-max-items-per-page` で指定した最大項目数を超えると、古いブログ項目は [次へ] ページ（ページ 2 など）に表示されます。[`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) コンポーネントでサーバーを一定間隔でポーリングし、項目が変更されていないか確認する動作は、ユーザーが最初のページにいないときには必要ありません。

ポーリングを停止するには、ホストするページに `disabled` 属性を追加します。ライブブログのサンプルでは、この動作をサーバー側のテンプレートで実行しています。リクエストされたページが 1 ページ目でない場合は、無効にした属性を [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) コンポーネントに追加しています。

### ディープリンク

ブログ投稿を公開する際は、共有などの機能を利用できるようにするため、投稿へのディープリンクをできるようにすることが重要です。[`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) では、ブログ項目の `id` を使うだけでディープリンクできます。たとえば、[https://ampbyexample.com/samples_templates/live_blog/preview/#post3](https://ampbyexample.com/samples_templates/live_blog/preview/#post3) とすると、ID が `post3` のブログ投稿に直接移動できます。

AMP by Example の[ライブブログのサンプル](https://www.ampbyexample.com/samples_templates/live_blog/)では、Cookie を使用して新しいコンテンツを生成しているため、初めてページを表示したときには、ID “post3” の投稿にアクセスできない可能性があります。その場合は、最初の投稿にリダイレクトされます。

## 関連資料

詳細については、下記の関連資料をご覧ください。

- [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) に関する関連ドキュメント
- [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}})
- [AMP by Example のライブブログのサンプル]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/live_blog.md', locale=doc.locale).url.path}})
