---
layout: page
title: イメージを含める
order: 1
locale: ja
---

ほとんどの HTML タグは、そのまま AMP HTML でも使用できますが、中には `<img>` タグのように同等か少し高機能のカスタム AMP HTML タグに置き換えなくてはいけないものがあります（一部のタグは問題があるため、使用が一切禁止されています。詳細については、[仕様書の HTML タグ](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)の内容をご覧ください）。

以下のコードは追加のマークアップを使った例で、ページ内にイメージを埋め込んでいます。

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

`<img>` タグの代わりに `<amp-img>` タグを使っている理由や、使用できるタグの種類については、[iframe とメディアを含める](/docs/guides/amp_replacements.html)をご覧ください。

{% include button.html title="ステップ 3 に進む" link="/docs/get_started/create/presentation_layout.ja.html" %}
