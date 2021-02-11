---
'$title': 体裁とレイアウトの変更
$order: 3
description: AMP ページはウェブページであるため、ページやその中に含まれる要素のスタイリングには、必ず共通する CSS プロパティを使用します。以下のように ...
author: pbakaus
contributors:
  - bpaduch
---

## 体裁の変更

AMP ページはウェブページであるため、ページやその中に含まれる要素のスタイリングには、必ず共通の CSS プロパティを使用します。要素は、`<head>` 内の `<style amp-custom>` という埋め込みスタイルシートに含まれるクラスまたは要素セレクタを使ってスタイリングしてください。

[sourcecode:html]

<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>

[/sourcecode]

各 AMP ページで使える埋め込みスタイルシートとインラインスタイルは 1 つだけで、使用できないセレクタもいくつかあります。[スタイリングの詳細については、こちらをご確認ください](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md)。

## レイアウトの制御

AMP は厳密な規則に従って、ページ上に要素を配置します。通常の HTML ページは CSS を使って要素を配置することがほとんどですが、AMP ではパフォーマンスを上げるために、すべての要素のサイズを最初から明示的に設定する必要があります。

AMP ページのレンダリングやレイアウトの方法、レイアウトの変更方法については[レイアウトの制御方法](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)をご覧ください。
