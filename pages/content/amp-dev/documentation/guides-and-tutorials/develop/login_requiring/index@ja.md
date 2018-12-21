---
$title: ログインが必要な AMP ページを作成する
---
ページ上でユーザーが行う操作（たとえば「コメントを投稿する」）は、ログインフローを使って条件付けできます。AMP ページにログインフローを実装するには、[amp-access](/ja/docs/reference/components/amp-access.html) コンポーネントと [amp-form](/ja/docs/reference/components/amp-form.html) コンポーネントを組み合わせて使用します。

ヒント: 実装のサンプルを用意しています。[ampbyexample.com](https://ampbyexample.com) の[コメント欄の例](https://ampbyexample.com/samples_templates/comment_section/)をご覧ください。

[コメント欄の例](https://ampbyexample.com/samples_templates/comment_section/)では、`amp-access` と `amp-form` を組み合わせて、ユーザーがログインしているときのみ有効になるコメント欄を作成しています。このサンプルの仕組みを理解するため、ユーザーがページ上で行う操作を順番に見ていきましょう。



<div class="prev-next-buttons">
<a class="button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/login.md', locale=doc.locale).url.path}}"><span class="arrow-next">始める</span></a>
</div>
