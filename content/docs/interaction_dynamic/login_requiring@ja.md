---
$title: ログインが必要な AMP ページを作成する
$order: 4
numbered: 1
---
ページ上でユーザーが行う操作（たとえば「コメントを投稿する」）は、ログインフローを使って条件付けできます。AMP ページにログインフローを実装するには、[amp-access](https://www.ampproject.org/ja/docs/reference/components/amp-access) コンポーネントと [amp-form](https://www.ampproject.org/ja/docs/reference/components/amp-form) コンポーネントを組み合わせて使用します。
{% call callout('ヒント', type='success') %}
実装のサンプルを用意しています。[ampbyexample.com](https://ampbyexample.com) の[コメント欄の例](https://ampbyexample.com/samples_templates/comment_section/)をご覧ください。
{% endcall %}

[コメント欄の例](https://ampbyexample.com/samples_templates/comment_section/)では、`amp-access` と `amp-form` を組み合わせて、ユーザーがログインしているときのみ有効になるコメント欄を作成しています。このサンプルの仕組みを理解するため、ユーザーがページ上で行う操作を順番に見ていきましょう。

{% include "/views/partials/sub_nav.html" %}

<div class="prev-next-buttons">
<a class="button" href="/ja/docs/tutorials/login_requiring/login.html"><span class="arrow-next">始める</span></a>
</div>
