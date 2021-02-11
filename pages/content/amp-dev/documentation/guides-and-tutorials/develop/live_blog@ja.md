---
'$title': ライブブログの作成
$order: 102
description: ライブブログは、スポーツイベントや選挙などのイベント開催中に頻繁に更新されるウェブページです。AMP では、 ...
tutorial: 'true'
formats:
  - ウェブサイト
author: kul3r4
contributors:
  - bpaduch
---

ライブブログは、スポーツイベントや選挙などのイベント開催中に頻繁に更新されるウェブページです。AMP では、[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) コンポーネントを使用してライブブログを実装できます。

このチュートリアルでは、[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) コンポーネントの概要を簡単に紹介し、[ページネーション](live_blog.md#pagination)や<a>ディープリンク</a>など、ライブブログの実装の詳細に焦点を当てています。AMP でのライブブログの実装を説明するために、AMP By Example の<a>ライブブログのサンプル</a>を使用します。

[tip type="tip"] <strong>ヒント :</strong> [LiveBlogPosting](http://schema.org/LiveBlogPosting) メタデータマークアップを使用して、ブログをサードパーティプラットフォームの機能と統合することができます。[/tip]

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## `amp-live-list` の概要

[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) コンポーネントは、ホストドキュメントを定期的にポーリングして新しいコンテンツがないか確認し、新しい項目が利用できるようになったらユーザーのブラウザを更新します。つまり、新しいブログ投稿を追加するたびに、CMS でホストドキュメントを更新し、ページの本文と[メタデータ](live_blog.md)セクションの両方に更新を含める必要があるということです。

次は、ブログの初期コードの例です。

```html
<amp-live-list
  id="my-live-list"
  data-poll-interval="15000"
  data-max-items-per-page="5"
>
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
</amp-live-list>
```

では、このコードを見ていきましょう。

[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) コンポーネントは 1 ページに複数存在する可能性があるため、それぞれに一意の ID を指定する必要があります。この例では、一意の ID として `my-live-list` を指定しています。

`data-poll-interval` 属性を使うと、ポーリングの間隔を指定できます。ホストドキュメントが更新された場合、その更新は次回のポーリング後に利用できるようになります。

ホストドキュメントに新しい項目が追加されるたびに、`<button update on="tap:my-live-list.update">` 要素によって [You have updates（更新があります）] ボタンが表示され、これをクリックすると最新の投稿を表示するページがトリガーされます。

ライブブログは、投稿が増えてページが長くなってしまうことがあります。`data-max-items-per-page` 属性を使用すると、ライブブログに追加できる項目の数を指定できます。更新後の項目数が `data-max-items-per-page` で指定した数を超えると、超えた分だけ古い更新から順に削除されます。たとえば、現在のページに 9 個の項目があり、`data-max-items-per-page` が 10 に設定されているとします。ここで、最新の更新によって新しい項目が 3 つ追加されると、古い順に 2 つの項目が更新されたページから削除されます。

[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 内では、すべてのブログ投稿を `<div items></div>` の子にする必要があります。各投稿は項目として参照されるため、それぞれの項目には一意の `id` と `data-sort-time` が必要です。

## 実装の詳細

[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) コンポーネントについて理解できたところで、より複雑なライブブログを実装する方法を説明しましょう。以下では、ページネーションを実装する方法と、ディープリンクの仕組みについて解説します。

### ページネーション <a name="pagination"></a>

ブログが長い場合は、ページネーションを使用して 1 ページに表示されるブログ項目数を制限することでパフォーマンスを向上できます。ページネーションを実装するには、[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) コンポーネントに `<div pagination></div>` を追加し、ページネーションに必要なマークアップ（ページ番号、次ページや前ページへのリンクなど）を挿入します。

ページネーションを使用すると、前に使用した単純なコードは次のようになります。

```html
<amp-live-list
  id="my-live-list"
  data-poll-interval="15000"
  data-max-items-per-page="5"
>
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

AMP By Example の[ライブブログのサンプル](live_blog.md)では、Cookie を使用して新しいコンテンツを生成しているため、初めてページを表示したときには、ID “post3” の投稿にアクセスできない可能性があります。その場合は、最初の投稿にリダイレクトされます。

## リソース

詳細については、下記の関連資料をご覧ください。

- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) に関するリファレンスドキュメント
- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [AMP BY Example のライブブログのサンプル](live_blog.md)
