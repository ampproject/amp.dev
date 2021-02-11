---
'$title': ページの検出と配信の準備
$order: 4
description: ニュース記事のように、同じページに対して AMP バージョンと非 AMP バージョンのページをそれぞれ用意したい場合を考えましょう。たておば、Google 検索 ...
author: pbakaus
contributors:
  - bpaduch
---

ニュース記事のように、同じページに対して AMP バージョンと非 AMP バージョンのページをそれぞれ用意したい場合を考えましょう。たとえば Google 検索で、あるページの非 AMP バージョンを検出した場合、そのページには AMP バージョンも存在することを知らせるにはどうしたらよいでしょうか。

## <code><link></code> によるページのリンク

非 AMP ページと AMP ページを一組としてこの課題を解決するには、`<head>` 内の `<link>` タグという形で、AMP ページの情報を非 AMP ページに追加します。同様に、非 AMP ページの情報は AMP ページに追加します。

以下を非 AMP ページに追加します。

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

また、以下を AMP ページに追加します。

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## 1 ページしかない場合

1 ページしか存在せず、それが AMP ページである場合も、正規のリンクを追加して単純に自身を指定する必要があります。

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **参考情報:**Google を使った AMP ページの検索については詳しくは、[AMP ページの Google 検索ガイドライン](https://support.google.com/webmasters/answer/6340290)をご覧ください。 [/tip]
