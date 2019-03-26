---
$title: ログインが必要な AMP ページを作成する
---
ページ上でユーザーが行う操作（たとえば「コメントを投稿する」）は、ログインフローを使って条件付けできます。AMP ページにログインフローを実装するには、[`amp-access`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-access.md', locale=doc.locale).url.path}}) コンポーネントを組み合わせて使用します。

ヒント: 実装のサンプルを用意しています。[ampbyexample.com]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}}) の[コメント欄の例](https://ampbyexample.com/samples_templates/comment_section/)をご覧ください。

[コメント欄の例],[`amp-access`]({{g.doc('/content/amp-dev/documentation/examples/documentation/Comment_Section.html', locale=doc.locale).url.path}}).url.path}}) と [`amp-form`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}) を組み合わせて、ユーザーがログインしているときのみ有効になるコメント欄を作成しています。このサンプルの仕組みを理解するため、ユーザーがページ上で行う操作を順番に見ていきましょう。
