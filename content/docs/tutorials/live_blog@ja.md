---
$title: ライブブログを作成する
---

[TOC]

ライブブログとは、イベント（たとえばスーパーボウル）の開催中に頻繁に更新されるウェブページです。

ライブブログを AMP で実装するには、 `amp-live-list` コンポーネントの マークアップを使用します。 開発に利用できる実装サンプルは、[ライブブログのサンプル](https://www.ampbyexample.com/samples_templates/live_blog/)（[ampbyexample.com](https://www.ampbyexample.com)）から入手できます。

このチュートリアルでは、 `amp-live-list` コンポーネントについて簡単に説明した後、ライブブログのサンプルを例として、ページ指定やディープリンクについて解説します。

## Amp-live-list の概要

`amp-live-list` コンポーネントは、ホスト ドキュメントを定期的にポーリングし、コンテンツが更新されていないか確認します。ポーリングによって新しい項目が見つかったら、エンドユーザーのブラウザを更新します。つまり、新しいブログ投稿を追加するたびに、CMS でホスト ドキュメントを更新し、本文とメタデータ セクションの両方に更新を反映する必要があるということです。

まずは次のようなシンプルなブログから始めます。

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
    <button update on="tap:my-live-list.update">更新があります！</button>
    <div items></div>
</amp-live-list>
[/sourcecode]

`data-poll-interval` 属性を使うと、ポーリングの間隔を指定できます。ホスト ドキュメントが更新されていた場合は、次のポーリング時にユーザーのブラウザが更新されます。

ホスト ドキュメントに新しい項目が追加されるたびに、`<button update on="tap:my-live-list.update">` 要素によってボタンが表示され、これをクリックすると最新の投稿を表示するページがトリガーされます。

ライブブログは、投稿が増えてページが長くなってしまうことがあります。`data-max-items-per-page` 属性を使用すると、ライブブログ ページに追加できる項目の数を指定できます。更新後の項目数が `data-max-items-per-page` を超える場合は、超えた分だけ古い更新から順に削除されます。たとえば、現在のページに 9 個の項目があり、`data-max-items-per-page` が 10 に設定されているとします。ここで、最新の更新によって新しい項目が 3 つ追加されると、古い順に 2 つの項目がページから削除されます。

`amp-live-list` では、すべての投稿をタグ `<div items></div>` の子にする必要があります。各投稿を項目として参照することで、すべての項目に固有の `id` と `data-sort-time` が割り当てられます。

## ライブブログの実装の詳細

`amp-live-list` の概要が理解できたところで、より複雑なライブブログを実装する方法を説明しましょう。以下では、ページ指定を実装する方法と、ディープリンクの仕組みについて解説します。

## ページ指定

ブログが長い場合は、ページ指定を使用して 1 ページに表示されるブログ項目数を制限することでパフォーマンスを向上できます。ページ指定を実装するには、`<div pagination></div>` 要素を `amp-live-list` コンポーネント内に追加し、ページ指定に必要なマークアップ（たとえば、ページ番号、次または前のページへのリンクなど）を挿入します。

ページ指定を実装するには、さきほどのシンプルなコードを次のように変更します。

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
    <button update on="tap:my-live-list.update">更新があります！</button>
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
[/sourcecode]

ナビゲーション項目は別途、ホストするページに変更を加えて配置する必要があります。たとえば [ライブブログのサンプル](https://www.ampbyexample.com/samples_templates/live_blog/)では、サーバー側のテンプレートを使用してページをレンダリングしています。また、クエリ パラメータを使用して、ページの最初に表示するブログ項目を指定しています。ページの最大項目数を 5 つに制限しているため、サーバーによって生成された項目数が 5 つを超えると、ユーザーがメインページを開いたときにナビゲーション領域に [次へ] 要素が表示されます。

<amp-img src="/static/img/liveblog-pagination.png" alt="Live blog pagination" height="526" width="300"></amp-img>

ブログ投稿の項目数が `data-max-items-per-page` の最大項目数を超えると、古いブログ項目は [次へ] ページ（たとえばページ 2）に表示されます。`amp-live-list` を使用してサーバーを一定の間隔でポーリングし項目が変更されていないか確認する動作は、ユーザーが最初のページにいないときには必要はありません。

ポーリングを停止するには、ホストするページに無効にした属性を追加します。ライブブログのサンプルでは、この動作をサーバー側のテンプレートで実行しています。リクエストされたのが最初のページでない場合は、無効にした属性を amp-live-list コンポーネントに追加しています。

## ディープリンク

ブログ投稿を公開する際は、投稿にディープリンクできるようにすることが重要です。これにより、たとえば投稿を簡単に共有できるようになります。`amp-live-list` では、ブログ投稿の ID を使って簡単にディープリンクできます。たとえば、[https://ampbyexample.com/samples_templates/live_blog/preview/#post3](https://ampbyexample.com/samples_templates/live_blog/preview/#post3) とすると、ID "post3"でブログ投稿に直接移動できます。

[ライブブログのサンプル](https://www.ampbyexample.com/samples_templates/live_blog/)では、cookie に基づく手法で新しいコンテンツを生成しているため（詳しくは、ライブブログのサンプルの [More] をご覧ください）、初めてページを表示したときには、ID "post3"の投稿にはアクセスできない可能性があります。その場合は、最初の投稿にリダイレクトします。
