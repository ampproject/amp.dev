---
'$title': Include an image
$order: 2
description: ほとんどの HTML タグは、そのまま AMP HTML でも使用できますが、中には <img> タグのように同等か少し高機能のカスタム AMP HTML タグに置き換えなくてはいけないものがあります
author: pbakaus
contributors:
  - bpaduch
---

ほとんどの HTML タグは、そのまま AMP HTML でも使用できますが、中には `<img>` タグのように同等か少し高機能のカスタム AMP HTML タグに置き換えなくてはいけないものがあります（一部のタグは問題があるため、使用が一切禁止されています。詳細については、[仕様書の HTML タグ](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)の内容をご覧ください）。

以下のコードは追加のマークアップを使った例で、ページ内にイメージを埋め込んでいます。

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

[tip type="read-on"] **参考情報:** `<img>` タグの代わりに [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) タグを使っている理由や、使用できるタグの種類については、[画像や動画を含める](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)をご覧ください。[/tip]
