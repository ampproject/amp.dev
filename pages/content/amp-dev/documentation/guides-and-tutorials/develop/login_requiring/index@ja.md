---
"$title": ログインが必要な AMP ページの作成
"$order": '0'
description: ページ上でユーザーが行う操作（たとえば「コメントを投稿する」）は、ログインフローを使って条件付けできます。AMP ページにログインフローを実装するには、 ...
numbered: '1'
"$hidden": 'true'
formats:
- websites
---

ページ上でユーザーが行う操作（たとえば「コメントを投稿する」）は、ログインフローを使って条件付けできます。AMP ページにログインフローを実装するには、[`amp-access`](../../../../documentation/components/reference/amp-access.md) コンポーネントに <a><code>amp-form</code></a> コンポーネントを組み合わせて使用します。

[tip type="tip"] <strong>ヒント:</strong> 実装のサンプルを用意しています。<a>ampbyexample.com</a> の[コメント欄の例](../../../../documentation/examples/documentation/Comment_Section.html)をご覧ください。[/tip]

[コメント欄の例](../../../../documentation/examples/documentation/Comment_Section.html)は <a><code>amp-access</code></a>と [`amp-form`](../../../../documentation/components/reference/amp-form.md) を組み合わせて、ユーザーがログインしているときのみ有効になるコメントセクションを作成しています。このサンプルの仕組みを理解するため、ユーザーがページ上で行う操作を順番に見ていきましょう。
