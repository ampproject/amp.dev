---
$title: ログインが必要な AMP ページを作成する
---
ページ上でユーザーが行う操作（たとえば「コメントを投稿する」）は、ログインフローを使って条件付けできます。AMP ページにログインフローを実装するには、[`amp-access`](../../../../documentation/components/reference/amp-access.md) コンポーネントを組み合わせて使用します。

ヒント: 実装のサンプルを用意しています。[ampbyexample.com](../../../../documentation/examples/index.html) の[コメント欄の例](../../../../documentation/examples/documentation/Comment_Section.html)をご覧ください。

[コメント欄の例],[`amp-access`](../../../../documentation/examples/documentation/Comment_Section.html).url.path}}) と [`amp-form`](../../../../documentation/components/reference/amp-form.md) を組み合わせて、ユーザーがログインしているときのみ有効になるコメント欄を作成しています。このサンプルの仕組みを理解するため、ユーザーがページ上で行う操作を順番に見ていきましょう。
